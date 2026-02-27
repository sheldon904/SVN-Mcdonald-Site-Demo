// ── WEC Effect Data ─────────────────────────────────────────────
// Source: SVN McDonald WEC Effect Excel files (2022-2025)

export const WEC_CENTER = { lat: 29.1039, lng: -82.1765 } as const;

// ── Distance Bands ──────────────────────────────────────────────

export interface DistanceBand {
  id: 'inner' | 'middle' | 'outer';
  label: string;
  milesMin: number;
  milesMax: number;
  color: string;        // fill color
  fillOpacity: number;  // base fill opacity
  strokeOpacity: number;
}

export const DISTANCE_BANDS: DistanceBand[] = [
  { id: 'inner',  label: '0–6 Miles',  milesMin: 0, milesMax: 6,  color: '#EC6C26', fillOpacity: 0.35, strokeOpacity: 1.0 },
  { id: 'middle', label: '6–9 Miles',  milesMin: 6, milesMax: 9,  color: '#EC6C26', fillOpacity: 0.20, strokeOpacity: 0.6 },
  { id: 'outer',  label: '9–18 Miles', milesMin: 9, milesMax: 18, color: '#EC6C26', fillOpacity: 0.08, strokeOpacity: 0.3 },
];

// ── Yearly Price Per Acre ───────────────────────────────────────

export interface YearlyData {
  year: number;
  inner: number;   // 0-6 mi $/acre
  middle: number;  // 6-9 mi $/acre
  outer: number;   // 9-18 mi $/acre
}

export const YEARLY_DATA: YearlyData[] = [
  { year: 2022, inner: 50957, middle: 28530, outer: 16765 },
  { year: 2023, inner: 51656, middle: 27994, outer: 20593 },
  { year: 2024, inner: 64800, middle: 60800, outer: 31500 },
  { year: 2025, inner: 45524, middle: 40283, outer: 23905 },
];

export const MAX_PRICE = Math.max(...YEARLY_DATA.flatMap(d => [d.inner, d.middle, d.outer]));

// ── Headline Stats ──────────────────────────────────────────────

export interface HeadlineStat {
  value: string;
  label: string;
}

export const HEADLINE_STATS: HeadlineStat[] = [
  { value: '400+',  label: 'Transactions Analyzed' },
  { value: '159%',  label: 'Peak Growth 0–6 Mi' },
  { value: '18 mi', label: 'Influence Radius' },
  { value: '4 yrs', label: 'Data Span 2022–2025' },
];

// ── Findings ────────────────────────────────────────────────────

export interface Finding {
  icon: 'TrendingUp' | 'MapPin' | 'Scale' | 'Landmark';
  title: string;
  desc: string;
}

export const FINDINGS: Finding[] = [
  {
    icon: 'TrendingUp',
    title: '159% Peak Growth',
    desc: 'Within 6 miles of the WEC, average price per acre surged from $50,957 in 2022 to a peak of $64,800 in 2024 — a 27% increase in just two years.',
  },
  {
    icon: 'MapPin',
    title: '18-Mile Influence',
    desc: "The WEC's economic impact extends across three distinct bands, with measurable price premiums even 9–18 miles from the center.",
  },
  {
    icon: 'Scale',
    title: 'Distance Premium',
    desc: 'In 2024, land within 6 miles averaged $64,800/acre — more than double the $31,500/acre seen 9–18 miles away.',
  },
  {
    icon: 'Landmark',
    title: 'Horse Capital Catalyst',
    desc: "The WEC has solidified Ocala's position, with 400+ tracked transactions confirming sustained demand across all distance bands.",
  },
];

// ── Scroll Captions ─────────────────────────────────────────────

export interface WecScrollCaption {
  text: string;
  startProgress: number;
  endProgress: number;
}

export const SCROLL_CAPTIONS: WecScrollCaption[] = [
  {
    text: "The World Equestrian Center opened in January 2021, instantly reshaping Ocala's land market. We tracked 400+ transactions across 4 years to measure its reach.",
    startProgress: 0.02,
    endProgress: 0.15,
  },
  {
    text: 'Within 6 miles, land averaged $64,800/acre in 2024 — a 27% jump from 2022. This inner band shows the strongest and most consistent premium.',
    startProgress: 0.15,
    endProgress: 0.30,
  },
  {
    text: "At 6–9 miles, prices more than doubled — from $28,530 in 2022 to $60,800 in 2024. The WEC's gravitational pull extends well beyond its gates.",
    startProgress: 0.30,
    endProgress: 0.45,
  },
  {
    text: 'Even 9–18 miles out, the effect is real. Prices rose from $16,765 to $31,500/acre — an 88% increase driven by spillover demand.',
    startProgress: 0.45,
    endProgress: 0.70,
  },
  {
    text: 'The WEC Effect is clear: a multi-layered economic force reaching 18 miles, with proximity to the center commanding dramatic premiums.',
    startProgress: 0.70,
    endProgress: 1.0,
  },
];

// ── Map Camera Waypoints ────────────────────────────────────────
// 6 waypoints orbiting WEC center (heading 0→300°, tilt 30-55°, range 12-35km)

export interface WecMapWaypoint {
  center: { lat: number; lng: number; altitude: number };
  heading: number;
  tilt: number;
  range: number;     // meters from center
  progress: number;  // 0–1 scroll position
}

export const MAP_WAYPOINTS: WecMapWaypoint[] = [
  { center: { ...WEC_CENTER, altitude: 0 }, heading: 0,   tilt: 35, range: 22000, progress: 0.0  },
  { center: { ...WEC_CENTER, altitude: 0 }, heading: 45,  tilt: 42, range: 16000, progress: 0.15 },
  { center: { ...WEC_CENTER, altitude: 0 }, heading: 120, tilt: 48, range: 14000, progress: 0.30 },
  { center: { ...WEC_CENTER, altitude: 0 }, heading: 180, tilt: 52, range: 12000, progress: 0.45 },
  { center: { ...WEC_CENTER, altitude: 0 }, heading: 240, tilt: 55, range: 10000, progress: 0.70 },
  { center: { ...WEC_CENTER, altitude: 0 }, heading: 300, tilt: 45, range: 18000, progress: 1.0  },
];

// ── Ring Progress Thresholds ────────────────────────────────────
// When each ring fades in during scroll

export const RING_THRESHOLDS = {
  inner:  0.15,
  middle: 0.30,
  outer:  0.45,
} as const;

// ── Price Label Positions (NE bearing from center at band midpoint) ──

/** Compute a destination point given center, bearing (degrees), distance (miles) */
function destinationPoint(lat: number, lng: number, bearingDeg: number, distanceMiles: number) {
  const R = 3958.8; // Earth radius in miles
  const d = distanceMiles / R;
  const br = (bearingDeg * Math.PI) / 180;
  const lat1 = (lat * Math.PI) / 180;
  const lng1 = (lng * Math.PI) / 180;

  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(br),
  );
  const lng2 =
    lng1 +
    Math.atan2(
      Math.sin(br) * Math.sin(d) * Math.cos(lat1),
      Math.cos(d) - Math.sin(lat1) * Math.sin(lat2),
    );

  return { lat: (lat2 * 180) / Math.PI, lng: (lng2 * 180) / Math.PI };
}

export interface PriceLabel {
  bandId: 'inner' | 'middle' | 'outer';
  bandLabel: string;
  price: string;
  position: { lat: number; lng: number };
  progressThreshold: number;
}

export const PRICE_LABELS: PriceLabel[] = [
  {
    bandId: 'inner',
    bandLabel: '0–6 Miles',
    price: '$64,800/ac',
    position: destinationPoint(WEC_CENTER.lat, WEC_CENTER.lng, 45, 3),
    progressThreshold: RING_THRESHOLDS.inner,
  },
  {
    bandId: 'middle',
    bandLabel: '6–9 Miles',
    price: '$60,800/ac',
    position: destinationPoint(WEC_CENTER.lat, WEC_CENTER.lng, 45, 7.5),
    progressThreshold: RING_THRESHOLDS.middle,
  },
  {
    bandId: 'outer',
    bandLabel: '9–18 Miles',
    price: '$31,500/ac',
    position: destinationPoint(WEC_CENTER.lat, WEC_CENTER.lng, 45, 13.5),
    progressThreshold: RING_THRESHOLDS.outer,
  },
];

// ── GeoJSON Ring Generator ──────────────────────────────────────

/** Generate circle coordinates for GeoJSON polygon rings (CCW for outer, CW when reversed for holes) */
export function generateCircleCoords(
  centerLat: number,
  centerLng: number,
  radiusMiles: number,
  numPoints = 64,
): [number, number][] {
  const coords: [number, number][] = [];
  // Go counter-clockwise (360→0) so outer rings follow GeoJSON right-hand rule
  for (let i = 0; i <= numPoints; i++) {
    const bearing = 360 - (360 / numPoints) * i;
    const pt = destinationPoint(centerLat, centerLng, bearing, radiusMiles);
    coords.push([pt.lng, pt.lat]);
  }
  return coords;
}
