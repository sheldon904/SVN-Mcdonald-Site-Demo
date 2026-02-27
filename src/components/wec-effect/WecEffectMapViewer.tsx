import { useRef, useEffect, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  WEC_CENTER,
  PRICE_LABELS,
  MAP_WAYPOINTS,
  generateCircleCoords,
} from '../../data/wecEffectData';
import type { WecMapWaypoint } from '../../data/wecEffectData';

// ── Math helpers ────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpBearing(a: number, b: number, t: number) {
  let diff = b - a;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return a + diff * t;
}

function rangeToZoom(range: number) {
  return 17.5 - Math.log2(Math.max(range, 50) / 150);
}

function interpolateWaypoints(waypoints: WecMapWaypoint[], progress: number) {
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
    center: [lerp(wp0.center.lng, wp1.center.lng, st), lerp(wp0.center.lat, wp1.center.lat, st)] as [number, number],
    zoom: rangeToZoom(lerp(wp0.range, wp1.range, st)),
    pitch: Math.min(85, lerp(wp0.tilt, wp1.tilt, st)),
    bearing: lerpBearing(wp0.heading, wp1.heading, st),
  };
}

// ── Canvas gradient generator ───────────────────────────────────

function createGradientImage(): string {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const cx = size / 2;
  const gradient = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
  // Strong orange ombre: solid center → transparent edge
  gradient.addColorStop(0, 'rgba(236, 108, 38, 0.6)');
  gradient.addColorStop(0.15, 'rgba(236, 108, 38, 0.50)');
  gradient.addColorStop(0.333, 'rgba(236, 108, 38, 0.35)'); // 6mi boundary
  gradient.addColorStop(0.5, 'rgba(236, 108, 38, 0.20)');   // 9mi boundary
  gradient.addColorStop(0.75, 'rgba(236, 108, 38, 0.08)');
  gradient.addColorStop(1, 'rgba(236, 108, 38, 0)');         // 18mi edge

  // Draw as circle (not square) so edges are round
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cx, cx, 0, Math.PI * 2);
  ctx.fill();

  return canvas.toDataURL();
}

// ── Component ───────────────────────────────────────────────────

interface WecEffectMapViewerProps {
  progressRef: React.RefObject<number>;
  onStatusChange: (status: 'loading' | 'loaded' | 'error') => void;
}

const WecEffectMapViewer = ({ progressRef, onStatusChange }: WecEffectMapViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const rafRef = useRef<number>(0);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    onStatusChange('loading');

    const wp0 = MAP_WAYPOINTS[0];

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          satellite: {
            type: 'raster',
            tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
            tileSize: 256,
            maxzoom: 19,
            attribution: '&copy; Esri',
          },
          'terrain-dem': {
            type: 'raster-dem',
            tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
            tileSize: 256,
            maxzoom: 15,
            encoding: 'terrarium',
          },
          'hillshade-source': {
            type: 'raster-dem',
            tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
            tileSize: 256,
            maxzoom: 15,
            encoding: 'terrarium',
          },
          openmaptiles: {
            type: 'vector',
            url: 'https://tiles.openfreemap.org/planet',
            attribution: '&copy; OpenStreetMap contributors',
          },
        },
        terrain: { source: 'terrain-dem', exaggeration: 1.5 },
        layers: [
          {
            id: 'satellite-layer',
            type: 'raster',
            source: 'satellite',
            paint: { 'raster-saturation': 0.1, 'raster-contrast': 0.1, 'raster-brightness-min': 0.05 },
          },
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
          {
            id: 'buildings-3d',
            type: 'fill-extrusion',
            source: 'openmaptiles',
            'source-layer': 'building',
            minzoom: 14,
            paint: {
              'fill-extrusion-color': ['interpolate', ['linear'], ['zoom'], 14, '#c4b9a8', 16, '#d4c9b8'],
              'fill-extrusion-height': ['case', ['has', 'render_height'], ['get', 'render_height'], 10],
              'fill-extrusion-base': ['case', ['has', 'render_min_height'], ['get', 'render_min_height'], 0],
              'fill-extrusion-opacity': ['interpolate', ['linear'], ['zoom'], 14, 0.4, 16, 0.7, 18, 0.85],
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

    map.on('load', () => {
      addGradientOverlay(map);
      addBandBoundaryLines(map);
      addPulseCenterMarker(map);
      addPriceMarkers(map);
      onStatusChange('loaded');
    });

    map.on('error', (e) => {
      if (e.error && /style/i.test(e.error.message ?? '')) {
        onStatusChange('error');
      }
    });

    mapRef.current = map;

    return () => {
      cancelAnimationFrame(rafRef.current);
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, [onStatusChange]);

  // ── Radial gradient overlay (raster image) ──────────────────

  const addGradientOverlay = useCallback((map: maplibregl.Map) => {
    const dataUrl = createGradientImage();
    if (!dataUrl) return;

    // 18 miles converted to degrees from WEC center
    const latOffset = 18 / 69.0;
    const lngOffset = 18 / (69.0 * Math.cos((WEC_CENTER.lat * Math.PI) / 180));

    map.addSource('wec-gradient', {
      type: 'image',
      url: dataUrl,
      coordinates: [
        [WEC_CENTER.lng - lngOffset, WEC_CENTER.lat + latOffset], // top-left
        [WEC_CENTER.lng + lngOffset, WEC_CENTER.lat + latOffset], // top-right
        [WEC_CENTER.lng + lngOffset, WEC_CENTER.lat - latOffset], // bottom-right
        [WEC_CENTER.lng - lngOffset, WEC_CENTER.lat - latOffset], // bottom-left
      ],
    });

    map.addLayer({
      id: 'wec-gradient-layer',
      type: 'raster',
      source: 'wec-gradient',
      paint: {
        'raster-opacity': 0.9,
        'raster-fade-duration': 0,
      },
    });
  }, []);

  // ── Band boundary ring lines (6mi, 9mi, 18mi) ────────────

  const addBandBoundaryLines = useCallback((map: maplibregl.Map) => {
    const bands = [
      { radius: 6, width: 2.5, opacity: 0.9, dash: [1] as number[] },
      { radius: 9, width: 2, opacity: 0.6, dash: [4, 2] },
      { radius: 18, width: 1.5, opacity: 0.35, dash: [6, 3] },
    ];

    for (let i = 0; i < bands.length; i++) {
      const b = bands[i];
      const coords = generateCircleCoords(WEC_CENTER.lat, WEC_CENTER.lng, b.radius);

      map.addSource(`band-line-${i}`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: coords },
        },
      });

      map.addLayer({
        id: `band-line-${i}`,
        type: 'line',
        source: `band-line-${i}`,
        paint: {
          'line-color': '#EC6C26',
          'line-width': b.width,
          'line-opacity': b.opacity,
          'line-dasharray': b.dash,
        },
      });
    }
  }, []);

  // ── Pulsing WEC center marker ─────────────────────────────

  const addPulseCenterMarker = useCallback((map: maplibregl.Map) => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div style="position:relative;width:32px;height:32px;">
        <div style="position:absolute;inset:0;border-radius:50%;background:#EC6C26;opacity:0.4;animation:wec-pulse 2s ease-out infinite;"></div>
        <div style="position:absolute;inset:0;border-radius:50%;background:#EC6C26;opacity:0.2;animation:wec-pulse 2s ease-out infinite 0.5s;"></div>
        <div style="position:absolute;top:50%;left:50%;width:14px;height:14px;transform:translate(-50%,-50%);border-radius:50%;background:#EC6C26;box-shadow:0 0 12px rgba(236,108,38,0.8),0 0 24px rgba(236,108,38,0.4);"></div>
      </div>
    `;

    if (!document.getElementById('wec-pulse-style')) {
      const style = document.createElement('style');
      style.id = 'wec-pulse-style';
      style.textContent = `
        @keyframes wec-pulse {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(3); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    new maplibregl.Marker({ element: el, anchor: 'center' })
      .setLngLat([WEC_CENTER.lng, WEC_CENTER.lat])
      .addTo(map);
  }, []);

  // ── Floating price label markers ──────────────────────────

  const addPriceMarkers = useCallback((map: maplibregl.Map) => {
    for (const label of PRICE_LABELS) {
      const el = document.createElement('div');
      el.style.transition = 'opacity 0.5s ease';
      el.innerHTML = `
        <div style="background:rgba(0,0,0,0.7);backdrop-filter:blur(12px);border-radius:10px;padding:8px 14px;border:1px solid rgba(236,108,38,0.4);white-space:nowrap;box-shadow:0 4px 20px rgba(0,0,0,0.3);">
          <div style="color:#EC6C26;font-weight:900;font-size:15px;font-family:Montserrat,sans-serif;">${label.price}</div>
          <div style="color:rgba(255,255,255,0.6);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;font-family:Montserrat,sans-serif;">${label.bandLabel}</div>
        </div>
      `;

      const marker = new maplibregl.Marker({ element: el, anchor: 'bottom-left' })
        .setLngLat([label.position.lng, label.position.lat])
        .addTo(map);

      markersRef.current.push(marker);
    }
  }, []);

  // ── RAF animation loop ────────────────────────────────────

  const animate = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    const progress = progressRef.current ?? 0;
    const cam = interpolateWaypoints(MAP_WAYPOINTS, progress);
    map.jumpTo({
      center: cam.center,
      zoom: cam.zoom,
      pitch: cam.pitch,
      bearing: cam.bearing,
    });

    rafRef.current = requestAnimationFrame(animate);
  }, [progressRef]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const startAnim = () => { rafRef.current = requestAnimationFrame(animate); };
    if (map.loaded()) startAnim();
    else map.on('load', startAnim);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  return (
    <div ref={containerRef} className="w-full h-full" style={{ touchAction: 'none' }} />
  );
};

export default WecEffectMapViewer;
