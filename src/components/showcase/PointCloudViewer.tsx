import { useRef, useEffect, useCallback } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import type { ShowcaseProperty, MapCameraWaypoint } from '../../data/showcaseProperties';

// Configure API key once (idempotent — only first call matters)
setOptions({
  key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  v: 'alpha',
});

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
): { lat: number; lng: number; altitude: number; heading: number; tilt: number; range: number } {
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

  // Smoothstep for cinematic feel
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
  const map3dRef = useRef<google.maps.maps3d.Map3DElement | null>(null);
  const rafRef = useRef<number>(0);
  const initRef = useRef(false);

  // Initialize Google Maps 3D
  useEffect(() => {
    if (!containerRef.current || initRef.current) return;
    initRef.current = true;

    onStatusChange('loading');

    let cancelled = false;

    (async () => {
      try {
        // Load the maps3d library via the new functional API
        const { Map3DElement } = await importLibrary('maps3d');

        if (cancelled) return;

        // Create Map3DElement
        const wp0 = property.waypoints[0];
        const map3d = new Map3DElement({
          center: { lat: wp0.center.lat, lng: wp0.center.lng, altitude: wp0.center.altitude },
          heading: wp0.heading,
          tilt: wp0.tilt,
          range: wp0.range,
        });

        map3d.style.width = '100%';
        map3d.style.height = '100%';
        map3d.style.display = 'block';

        containerRef.current!.appendChild(map3d);
        map3dRef.current = map3d;

        // Report loaded after tiles begin streaming
        setTimeout(() => {
          if (!cancelled) onStatusChange('loaded');
        }, 1500);

      } catch (err) {
        console.error('Google Maps 3D init failed:', err);
        if (!cancelled) onStatusChange('error');
      }
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      if (map3dRef.current && containerRef.current) {
        try { containerRef.current.removeChild(map3dRef.current); } catch { /* already removed */ }
      }
      map3dRef.current = null;
      initRef.current = false;
    };
  }, [property.waypoints, onStatusChange]);

  // Animation loop: sync 3D camera to scroll progress
  const animate = useCallback(() => {
    const map3d = map3dRef.current;
    if (!map3d) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }

    const progress = progressRef.current ?? 0;
    const cam = interpolateWaypoints(property.waypoints, progress);

    map3d.center = { lat: cam.lat, lng: cam.lng, altitude: cam.altitude };
    map3d.heading = cam.heading;
    map3d.tilt = cam.tilt;
    map3d.range = cam.range;

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
