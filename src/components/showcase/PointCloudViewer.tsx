import { useRef, useEffect, useCallback } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import type { ShowcaseProperty, MapCameraWaypoint } from '../../data/showcaseProperties';

// Configure API key once at module scope
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
  const readyRef = useRef(false);
  const initRef = useRef(false);

  // Initialize Google Maps 3D
  useEffect(() => {
    if (!containerRef.current || initRef.current) return;
    initRef.current = true;

    onStatusChange('loading');

    let cancelled = false;

    (async () => {
      try {
        // Load maps3d library — this triggers the Google Maps script load
        await importLibrary('maps3d');

        if (cancelled) return;

        // Create the element using DOM API (more reliable with custom elements)
        const map3d = document.createElement('gmp-map-3d') as google.maps.maps3d.Map3DElement;

        // Set initial camera from first waypoint via attributes
        const wp0 = property.waypoints[0];
        map3d.setAttribute('center', `${wp0.center.lat},${wp0.center.lng},${wp0.center.altitude}`);
        map3d.setAttribute('heading', String(wp0.heading));
        map3d.setAttribute('tilt', String(wp0.tilt));
        map3d.setAttribute('range', String(wp0.range));

        // Fill the container
        map3d.style.width = '100%';
        map3d.style.height = '100%';
        map3d.style.display = 'block';
        map3d.style.position = 'absolute';
        map3d.style.inset = '0';

        containerRef.current!.appendChild(map3d);
        map3dRef.current = map3d;

        // Listen for the steady event (tiles loaded, camera settled)
        map3d.addEventListener('gmp-steadychange', ((e: Event) => {
          const detail = (e as CustomEvent).detail;
          if (detail?.isSteady && !cancelled) {
            readyRef.current = true;
            onStatusChange('loaded');
          }
        }) as EventListener);

        // Fallback: report loaded after 4s even if steady event never fires
        setTimeout(() => {
          if (!cancelled && !readyRef.current) {
            readyRef.current = true;
            onStatusChange('loaded');
          }
        }, 4000);

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
      readyRef.current = false;
      initRef.current = false;
    };
  }, [property.waypoints, onStatusChange]);

  // Animation loop: sync 3D camera to scroll progress
  const animate = useCallback(() => {
    const map3d = map3dRef.current;
    if (map3d && readyRef.current) {
      const progress = progressRef.current ?? 0;
      const cam = interpolateWaypoints(property.waypoints, progress);

      // Set camera via properties (works after element is connected)
      map3d.center = { lat: cam.lat, lng: cam.lng, altitude: cam.altitude };
      map3d.heading = cam.heading;
      map3d.tilt = cam.tilt;
      map3d.range = cam.range;
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
      style={{ touchAction: 'none', position: 'relative' }}
    />
  );
};

export default PointCloudViewer;
