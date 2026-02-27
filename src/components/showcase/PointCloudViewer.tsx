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

// Interpolate bearing taking shortest path around 360
function lerpBearing(a: number, b: number, t: number): number {
  let diff = b - a;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return a + diff * t;
}

function interpolateWaypoints(
  waypoints: MapCameraWaypoint[],
  progress: number
): { center: [number, number]; zoom: number; pitch: number; bearing: number } {
  const p = Math.max(0, Math.min(1, progress));

  // Find surrounding waypoints
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
    center: [
      lerp(wp0.center[0], wp1.center[0], st),
      lerp(wp0.center[1], wp1.center[1], st),
    ],
    zoom: lerp(wp0.zoom, wp1.zoom, st),
    pitch: lerp(wp0.pitch, wp1.pitch, st),
    bearing: lerpBearing(wp0.bearing, wp1.bearing, st),
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

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          'satellite': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
            maxzoom: 19,
            attribution: '&copy; Esri &mdash; Esri, DigitalGlobe, GeoEye, USDA, USGS, AeroGRID, IGN',
          },
          // AWS Terrain Tiles — free, no API key, Terrarium encoding
          'terrain-dem': {
            type: 'raster-dem',
            tiles: [
              'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
            ],
            tileSize: 256,
            maxzoom: 15,
            encoding: 'terrarium',
          },
          // Hillshade for visual depth on the terrain surface
          'hillshade-source': {
            type: 'raster-dem',
            tiles: [
              'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
            ],
            tileSize: 256,
            maxzoom: 15,
            encoding: 'terrarium',
          },
        },
        // 3D terrain — Florida is flat so exaggerate 3x
        terrain: {
          source: 'terrain-dem',
          exaggeration: 3,
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
          // Hillshade layer adds shadows/depth to terrain
          {
            id: 'hillshade-layer',
            type: 'hillshade',
            source: 'hillshade-source',
            paint: {
              'hillshade-shadow-color': '#000000',
              'hillshade-highlight-color': '#ffffff',
              'hillshade-accent-color': '#4a4a4a',
              'hillshade-exaggeration': 0.5,
              'hillshade-illumination-direction': 315,
            },
          },
        ],
      },
      center: property.mapCenter,
      zoom: property.mapStartZoom,
      maxPitch: 85,
      pitch: 0,
      bearing: 0,
      interactive: false, // Scroll drives the camera, not user drag
      fadeDuration: 0,
      attributionControl: false,
    });

    // Add minimal attribution
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

    map.on('load', () => {
      onStatusChange('loaded');
    });

    map.on('error', () => {
      onStatusChange('error');
    });

    mapRef.current = map;

    return () => {
      cancelAnimationFrame(rafRef.current);
      map.remove();
      mapRef.current = null;
    };
  }, [property.mapCenter, property.mapStartZoom, onStatusChange]);

  // Animation loop: sync map camera to scroll progress
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
