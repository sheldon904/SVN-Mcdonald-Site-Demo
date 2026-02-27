import { useRef, useEffect, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { ShowcaseProperty, MapCameraWaypoint } from '../../data/showcaseProperties';

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

// Convert range (meters) to MapLibre zoom level
function rangeToZoom(range: number): number {
  return 17.5 - Math.log2(Math.max(range, 50) / 150);
}

function interpolateWaypoints(
  waypoints: MapCameraWaypoint[],
  progress: number
): { center: [number, number]; zoom: number; pitch: number; bearing: number } {
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

  const range = lerp(wp0.range, wp1.range, st);

  return {
    center: [
      lerp(wp0.center.lng, wp1.center.lng, st),
      lerp(wp0.center.lat, wp1.center.lat, st),
    ],
    zoom: rangeToZoom(range),
    pitch: Math.min(85, lerp(wp0.tilt, wp1.tilt, st)),
    bearing: lerpBearing(wp0.heading, wp1.heading, st),
  };
}

const PointCloudViewer = ({ property, progressRef, onStatusChange }: PointCloudViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const rafRef = useRef<number>(0);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current) return;

    onStatusChange('loading');

    const wp0 = property.waypoints[0];

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          satellite: {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
            maxzoom: 19,
            attribution: '&copy; Esri',
          },
        },
        layers: [
          {
            id: 'satellite-layer',
            type: 'raster',
            source: 'satellite',
            paint: {
              'raster-saturation': 0.15,
              'raster-contrast': 0.15,
              'raster-brightness-min': 0.05,
            },
          },
        ],
      },
      center: [wp0.center.lng, wp0.center.lat],
      zoom: rangeToZoom(wp0.range),
      maxPitch: 0,
      pitch: 0,
      bearing: wp0.heading,
      interactive: false,
      fadeDuration: 0,
      attributionControl: false,
    });

    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

    map.on('load', () => onStatusChange('loaded'));
    map.on('error', () => onStatusChange('error'));

    mapRef.current = map;

    return () => {
      cancelAnimationFrame(rafRef.current);
      map.remove();
      mapRef.current = null;
    };
  }, [property.waypoints, property.mapCenter, onStatusChange]);

  // Animation loop: sync map camera to scroll progress
  const animate = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    const progress = progressRef.current ?? 0;
    const cam = interpolateWaypoints(property.waypoints, progress);

    map.jumpTo({
      center: cam.center,
      zoom: cam.zoom,
      bearing: cam.bearing,
    });

    rafRef.current = requestAnimationFrame(animate);
  }, [property.waypoints, progressRef]);

  // Start animation once map is ready
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const startAnim = () => {
      rafRef.current = requestAnimationFrame(animate);
    };

    if (map.loaded()) {
      startAnim();
    } else {
      map.on('load', startAnim);
    }

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
