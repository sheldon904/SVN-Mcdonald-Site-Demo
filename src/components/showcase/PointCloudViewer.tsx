import { useRef, useEffect, useCallback } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import type { ShowcaseProperty, MapCameraWaypoint } from '../../data/showcaseProperties';

// Cesium Ion free-tier token (satellite imagery + world terrain + OSM buildings)
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
  const st = t * t * (3 - 2 * t); // smoothstep

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

  // Initialize Cesium viewer
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
          requestRenderMode: false,
          msaaSamples: 4,
        });

        if (cancelled) { viewer.destroy(); return; }

        // Disable all user interaction — scroll drives the camera
        const controller = viewer.scene.screenSpaceCameraController;
        controller.enableRotate = false;
        controller.enableTranslate = false;
        controller.enableZoom = false;
        controller.enableTilt = false;
        controller.enableLook = false;

        // Add OSM 3D buildings
        try {
          const buildings = await Cesium.createOsmBuildingsAsync();
          if (!cancelled) viewer.scene.primitives.add(buildings);
        } catch {
          // Buildings are optional — continue without them
        }

        // Set initial camera position
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

        // Report loaded once initial tiles are in
        const removeListener = viewer.scene.globe.tileLoadProgressEvent.addEventListener(
          (remaining: number) => {
            if (remaining === 0 && !readyRef.current) {
              readyRef.current = true;
              if (!cancelled) onStatusChange('loaded');
              removeListener();
            }
          }
        );

        // Fallback: report loaded after 5s
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
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
      readyRef.current = false;
    };
  }, [property.waypoints, onStatusChange]);

  // Animation loop: sync camera to scroll progress
  const animate = useCallback(() => {
    const viewer = viewerRef.current;
    if (viewer && !viewer.isDestroyed() && readyRef.current) {
      const progress = progressRef.current ?? 0;
      const cam = interpolateWaypoints(property.waypoints, progress);

      viewer.camera.lookAt(
        Cesium.Cartesian3.fromDegrees(cam.lng, cam.lat, cam.altitude),
        new Cesium.HeadingPitchRange(
          Cesium.Math.toRadians(cam.heading),
          Cesium.Math.toRadians(cam.tilt - 90), // tilt 0=down → pitch -90°, tilt 90=horizon → pitch 0°
          cam.range
        )
      );
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [property.waypoints, progressRef]);

  // Start animation loop
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
