import { useRef, useEffect, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  WEC_CENTER,
  DISTANCE_BANDS,
  PRICE_LABELS,
  RING_THRESHOLDS,
  MAP_WAYPOINTS,
  generateCircleCoords,
} from '../../data/wecEffectData';
import type { WecMapWaypoint } from '../../data/wecEffectData';

// ── Math helpers (from PointCloudViewer) ────────────────────────

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

function interpolateWaypoints(
  waypoints: WecMapWaypoint[],
  progress: number,
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
    center: [
      lerp(wp0.center.lng, wp1.center.lng, st),
      lerp(wp0.center.lat, wp1.center.lat, st),
    ] as [number, number],
    zoom: rangeToZoom(lerp(wp0.range, wp1.range, st)),
    pitch: Math.min(85, lerp(wp0.tilt, wp1.tilt, st)),
    bearing: lerpBearing(wp0.heading, wp1.heading, st),
  };
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
  const layersReadyRef = useRef(false);
  const prevRingVisibility = useRef({ inner: false, middle: false, outer: false });

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
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
            maxzoom: 19,
            attribution: '&copy; Esri',
          },
          'terrain-dem': {
            type: 'raster-dem',
            tiles: [
              'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
            ],
            tileSize: 256,
            maxzoom: 15,
            encoding: 'terrarium',
          },
          'hillshade-source': {
            type: 'raster-dem',
            tiles: [
              'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
            ],
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
            paint: {
              'raster-saturation': 0.1,
              'raster-contrast': 0.1,
              'raster-brightness-min': 0.05,
            },
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
              'fill-extrusion-color': [
                'interpolate', ['linear'], ['zoom'],
                14, '#c4b9a8',
                16, '#d4c9b8',
              ],
              'fill-extrusion-height': [
                'case',
                ['has', 'render_height'], ['get', 'render_height'],
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

    map.on('load', () => {
      addRingLayers(map);
      addPulseCenterMarker(map);
      addPriceMarkers(map);
      layersReadyRef.current = true;
      onStatusChange('loaded');
    });

    // Only treat style-level errors as fatal (not tile 404s)
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

  // ── Add GeoJSON concentric ring layers ──────────────────────

  const addRingLayers = useCallback((map: maplibregl.Map) => {
    for (const band of DISTANCE_BANDS) {
      const outerCoords = generateCircleCoords(WEC_CENTER.lat, WEC_CENTER.lng, band.milesMax);
      const innerCoords = band.milesMin > 0
        ? generateCircleCoords(WEC_CENTER.lat, WEC_CENTER.lng, band.milesMin)
        : generateCircleCoords(WEC_CENTER.lat, WEC_CENTER.lng, 0.3); // small center hole

      // GeoJSON polygon with hole (outer ring CCW for fill, inner ring CW for hole)
      const geojson: GeoJSON.Feature = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [outerCoords, innerCoords.reverse()],
        },
      };

      map.addSource(`ring-${band.id}`, { type: 'geojson', data: geojson });

      // Fill layer
      map.addLayer({
        id: `ring-fill-${band.id}`,
        type: 'fill',
        source: `ring-${band.id}`,
        paint: {
          'fill-color': band.color,
          'fill-opacity': 0, // start invisible
        },
      });

      // Stroke layer
      map.addLayer({
        id: `ring-stroke-${band.id}`,
        type: 'line',
        source: `ring-${band.id}`,
        paint: {
          'line-color': band.color,
          'line-width': band.id === 'inner' ? 2 : band.id === 'middle' ? 1.5 : 1,
          'line-opacity': 0, // start invisible
        },
      });
    }
  }, []);

  // ── Pulsing WEC center marker ───────────────────────────────

  const addPulseCenterMarker = useCallback((map: maplibregl.Map) => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div style="position:relative;width:24px;height:24px;">
        <div style="position:absolute;inset:0;border-radius:50%;background:#EC6C26;opacity:0.4;animation:wec-pulse 2s ease-out infinite;"></div>
        <div style="position:absolute;top:50%;left:50%;width:12px;height:12px;transform:translate(-50%,-50%);border-radius:50%;background:#EC6C26;box-shadow:0 0 8px rgba(236,108,38,0.6);"></div>
      </div>
    `;

    // Inject keyframes if not already present
    if (!document.getElementById('wec-pulse-style')) {
      const style = document.createElement('style');
      style.id = 'wec-pulse-style';
      style.textContent = `
        @keyframes wec-pulse {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    new maplibregl.Marker({ element: el, anchor: 'center' })
      .setLngLat([WEC_CENTER.lng, WEC_CENTER.lat])
      .addTo(map);
  }, []);

  // ── Floating price label markers ────────────────────────────

  const addPriceMarkers = useCallback((map: maplibregl.Map) => {
    for (const label of PRICE_LABELS) {
      const el = document.createElement('div');
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.5s ease';
      el.className = 'wec-price-label';
      el.setAttribute('data-band', label.bandId);
      el.innerHTML = `
        <div style="background:rgba(0,0,0,0.6);backdrop-filter:blur(12px);border-radius:8px;padding:6px 12px;border:1px solid rgba(255,255,255,0.2);white-space:nowrap;">
          <div style="color:#fff;font-weight:900;font-size:13px;font-family:Montserrat,sans-serif;">${label.price}</div>
          <div style="color:rgba(255,255,255,0.5);font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;font-family:Montserrat,sans-serif;">${label.bandLabel}</div>
        </div>
      `;

      const marker = new maplibregl.Marker({ element: el, anchor: 'bottom-left' })
        .setLngLat([label.position.lng, label.position.lat])
        .addTo(map);

      markersRef.current.push(marker);
    }
  }, []);

  // ── RAF animation loop ──────────────────────────────────────

  const animate = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    const progress = progressRef.current ?? 0;

    // Camera orbit
    const cam = interpolateWaypoints(MAP_WAYPOINTS, progress);
    map.jumpTo({
      center: cam.center,
      zoom: cam.zoom,
      pitch: cam.pitch,
      bearing: cam.bearing,
    });

    // Ring visibility (only update paint when threshold crossed AND layers are ready)
    if (layersReadyRef.current) {
      const thresholds = { inner: RING_THRESHOLDS.inner, middle: RING_THRESHOLDS.middle, outer: RING_THRESHOLDS.outer };
      for (const [bandId, threshold] of Object.entries(thresholds)) {
        const visible = progress > threshold;
        const key = bandId as keyof typeof prevRingVisibility.current;
        if (visible !== prevRingVisibility.current[key]) {
          const band = DISTANCE_BANDS.find(b => b.id === bandId)!;
          try {
            map.setPaintProperty(`ring-fill-${bandId}`, 'fill-opacity', visible ? band.fillOpacity : 0);
            map.setPaintProperty(`ring-stroke-${bandId}`, 'line-opacity', visible ? band.strokeOpacity : 0);
            // Only mark as toggled after successful paint update
            prevRingVisibility.current[key] = visible;
          } catch {
            // Will retry next frame
          }
        }
      }
    }

    // Price label visibility
    const labels = containerRef.current?.querySelectorAll('.wec-price-label');
    if (labels) {
      labels.forEach(el => {
        const bandId = (el as HTMLElement).getAttribute('data-band');
        const label = PRICE_LABELS.find(l => l.bandId === bandId);
        if (label) {
          (el as HTMLElement).style.opacity = progress > label.progressThreshold ? '1' : '0';
        }
      });
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [progressRef]);

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

export default WecEffectMapViewer;
