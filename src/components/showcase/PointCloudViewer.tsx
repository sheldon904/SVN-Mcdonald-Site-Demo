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
  const st = t * t * (3 - 2 * t);

  return {
    center: [
      lerp(wp0.center.lng, wp1.center.lng, st),
      lerp(wp0.center.lat, wp1.center.lat, st),
    ],
    zoom: rangeToZoom(lerp(wp0.range, wp1.range, st)),
    pitch: Math.min(85, lerp(wp0.tilt, wp1.tilt, st)),
    bearing: lerpBearing(wp0.heading, wp1.heading, st),
  };
}

const PointCloudViewer = ({ property, progressRef, onStatusChange }: PointCloudViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    onStatusChange('loading');

    const wp0 = property.waypoints[0];

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          // Satellite imagery — free, no API key
          satellite: {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
            maxzoom: 19,
            attribution: '&copy; Esri',
          },
          // 3D terrain — AWS free elevation tiles
          'terrain-dem': {
            type: 'raster-dem',
            tiles: [
              'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
            ],
            tileSize: 256,
            maxzoom: 15,
            encoding: 'terrarium',
          },
          // Hillshade for visual depth
          'hillshade-source': {
            type: 'raster-dem',
            tiles: [
              'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
            ],
            tileSize: 256,
            maxzoom: 15,
            encoding: 'terrarium',
          },
          // OpenFreeMap vector tiles — free, no API key, unlimited
          openmaptiles: {
            type: 'vector',
            url: 'https://tiles.openfreemap.org/planet',
            attribution: '&copy; OpenStreetMap contributors',
          },
        },
        terrain: {
          source: 'terrain-dem',
          exaggeration: 1.5,
        },
        layers: [
          // Base satellite imagery
          {
            id: 'satellite-layer',
            type: 'raster',
            source: 'satellite',
            paint: {
              'raster-saturation': 0.1,
              'raster-contrast': 0.1,
              'raster-brightness-min': 0.05,
            },
          },
          // Hillshade for terrain shadows
          {
            id: 'hillshade-layer',
            type: 'hillshade',
            source: 'hillshade-source',
            paint: {
              'hillshade-shadow-color': '#000000',
              'hillshade-highlight-color': '#ffffff',
              'hillshade-accent-color': '#4a4a4a',
              'hillshade-exaggeration': 0.3,
              'hillshade-illumination-direction': 315,
            },
          },
          // 3D extruded buildings from OpenStreetMap
          {
            id: 'buildings-3d',
            type: 'fill-extrusion',
            source: 'openmaptiles',
            'source-layer': 'building',
            minzoom: 14,
            paint: {
              'fill-extrusion-color': [
                'interpolate', ['linear'], ['zoom'],
                14, '#c4b9a8',
                16, '#d4c9b8',
              ],
              'fill-extrusion-height': [
                'case',
                ['has', 'render_height'], ['get', 'render_height'],
                // Default heights based on likely building type
                10,
              ],
              'fill-extrusion-base': [
                'case',
                ['has', 'render_min_height'], ['get', 'render_min_height'],
                0,
              ],
              'fill-extrusion-opacity': [
                'interpolate', ['linear'], ['zoom'],
                14, 0.4,
                16, 0.7,
                18, 0.85,
              ],
            },
          },
        ],
      },
      center: [wp0.center.lng, wp0.center.lat],
      zoom: rangeToZoom(wp0.range),
      maxPitch: 85,
      pitch: Math.min(85, wp0.tilt),
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

  const animate = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    const progress = progressRef.current ?? 0;
    const cam = interpolateWaypoints(property.waypoints, progress);

    map.jumpTo({
      center: cam.center,
      zoom: cam.zoom,
      pitch: cam.pitch,
      bearing: cam.bearing,
    });

    rafRef.current = requestAnimationFrame(animate);
  }, [property.waypoints, progressRef]);

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
