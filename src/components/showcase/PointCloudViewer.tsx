import { useRef, useEffect, useCallback } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import type { ShowcaseProperty, MapCameraWaypoint } from '../../data/showcaseProperties';

Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN || '';

interface PointCloudViewerProps {
  property: ShowcaseProperty;
  progressRef: React.RefObject<number>;
  onStatusChange: (status: 'loading' | 'loaded' | 'error') => void;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpBearing(a: number, b: number, t: number): number {
  let diff = b - a;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return a + diff * t;
}

function interpolateWaypoints(
  waypoints: MapCameraWaypoint[],
  progress: number
) {
  const p = Math.max(0, Math.min(1, progress));

  let i = 0;
  for (; i < waypoints.length - 1; i++) {
    if (p <= waypoints[i + 1].progress) break;
  }
  if (i >= waypoints.length - 1) i = waypoints.length - 2;

  const wp0 = waypoints[i];
  const wp1 = waypoints[i + 1];
  const segLen = wp1.progress - wp0.progress;
  const t = segLen > 0 ? (p - wp0.progress) / segLen : 0;
  const st = t * t * (3 - 2 * t);

  return {
    lat: lerp(wp0.center.lat, wp1.center.lat, st),
    lng: lerp(wp0.center.lng, wp1.center.lng, st),
    altitude: lerp(wp0.center.altitude, wp1.center.altitude, st),
    heading: lerpBearing(wp0.heading, wp1.heading, st),
    tilt: lerp(wp0.tilt, wp1.tilt, st),
    range: lerp(wp0.range, wp1.range, st),
  };
}

const PointCloudViewer = ({ property, progressRef, onStatusChange }: PointCloudViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Cesium.Viewer | null>(null);
  const rafRef = useRef<number>(0);
  const readyRef = useRef(false);
  const lastProgress = useRef(-1);

  useEffect(() => {
    if (!containerRef.current) return;

    onStatusChange('loading');

    let cancelled = false;

    (async () => {
      try {
        const viewer = new Cesium.Viewer(containerRef.current!, {
          terrain: Cesium.Terrain.fromWorldTerrain(),
          baseLayerPicker: false,
          geocoder: false,
          homeButton: false,
          sceneModePicker: false,
          navigationHelpButton: false,
          animation: false,
          timeline: false,
          fullscreenButton: false,
          infoBox: false,
          selectionIndicator: false,
          scene3DOnly: true,

          // --- PERF: only render when we request it ---
          requestRenderMode: true,
          maximumRenderTimeChange: Infinity,

          // --- PERF: no MSAA ---
          msaaSamples: 1,
        });

        if (cancelled) { viewer.destroy(); return; }

        // --- PERF: render at 75% resolution ---
        viewer.resolutionScale = 0.75;

        // --- PERF: accept coarser terrain tiles (default 2, higher = less detail) ---
        viewer.scene.globe.maximumScreenSpaceError = 6;

        // --- PERF: limit tile cache so memory stays low ---
        viewer.scene.globe.tileCacheSize = 50;

        // --- PERF: fog hides distant tiles so they don't load ---
        viewer.scene.fog.enabled = true;
        viewer.scene.fog.density = 0.001;

        // --- PERF: turn off expensive atmosphere/lighting ---
        viewer.scene.skyAtmosphere.show = false;
        viewer.scene.globe.enableLighting = false;
        viewer.scene.skyBox.show = false;
        viewer.scene.sun.show = false;
        viewer.scene.moon.show = false;
        viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#181818');

        // --- NO OSM buildings (biggest perf killer) ---

        // Disable all user interaction
        const ctrl = viewer.scene.screenSpaceCameraController;
        ctrl.enableRotate = false;
        ctrl.enableTranslate = false;
        ctrl.enableZoom = false;
        ctrl.enableTilt = false;
        ctrl.enableLook = false;

        // Set initial camera
        const wp0 = property.waypoints[0];
        viewer.camera.lookAt(
          Cesium.Cartesian3.fromDegrees(wp0.center.lng, wp0.center.lat, wp0.center.altitude),
          new Cesium.HeadingPitchRange(
            Cesium.Math.toRadians(wp0.heading),
            Cesium.Math.toRadians(wp0.tilt - 90),
            wp0.range
          )
        );

        viewerRef.current = viewer;

        // Report loaded once initial tiles stream in
        const removeListener = viewer.scene.globe.tileLoadProgressEvent.addEventListener(
          (remaining: number) => {
            if (remaining === 0 && !readyRef.current) {
              readyRef.current = true;
              if (!cancelled) onStatusChange('loaded');
              removeListener();
            }
          }
        );

        // Fallback timeout
        setTimeout(() => {
          if (!cancelled && !readyRef.current) {
            readyRef.current = true;
            onStatusChange('loaded');
          }
        }, 5000);

      } catch (err) {
        console.error('CesiumJS init failed:', err);
        if (!cancelled) onStatusChange('error');
      }
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy();
      }
      viewerRef.current = null;
      readyRef.current = false;
      lastProgress.current = -1;
    };
  }, [property.waypoints, onStatusChange]);

  // Animation loop — only updates Cesium when scroll progress actually changes
  const animate = useCallback(() => {
    const viewer = viewerRef.current;
    if (viewer && !viewer.isDestroyed() && readyRef.current) {
      const progress = progressRef.current ?? 0;

      // Skip if progress hasn't changed (saves GPU)
      if (Math.abs(progress - lastProgress.current) > 0.0005) {
        lastProgress.current = progress;
        const cam = interpolateWaypoints(property.waypoints, progress);

        viewer.camera.lookAt(
          Cesium.Cartesian3.fromDegrees(cam.lng, cam.lat, cam.altitude),
          new Cesium.HeadingPitchRange(
            Cesium.Math.toRadians(cam.heading),
            Cesium.Math.toRadians(cam.tilt - 90),
            cam.range
          )
        );

        // Tell Cesium to render this frame
        viewer.scene.requestRender();
      }
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [property.waypoints, progressRef]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
};

export default PointCloudViewer;
