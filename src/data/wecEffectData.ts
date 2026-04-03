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
  { year: 2023, inner: 51565, middle: 27994, outer: 20593 },
  { year: 2024, inner: 67384, middle: 43181, outer: 24355 },
  { year: 2025, inner: 45524, middle: 40283, outer: 23905 },
];

// ── Year-over-Year % Changes ───────────────────────────────────

export interface YoYData {
  year: number;
  inner: number;   // % change
  middle: number;
  outer: number;
}

export const YOY_DATA: YoYData[] = [
  { year: 2023, inner: 1.19,   middle: -1.88, outer: 22.83 },
  { year: 2024, inner: 30.68,  middle: 54.25, outer: 18.27 },
  { year: 2025, inner: -32.44, middle: -6.71, outer: -1.85 },
];

export const MAX_PRICE = Math.max(...YEARLY_DATA.flatMap(d => [d.inner, d.middle, d.outer]));

// ── Headline Stats ──────────────────────────────────────────────

export interface HeadlineStat {
  value: string;
  label: string;
}

export const HEADLINE_STATS: HeadlineStat[] = [
  { value: '400+',   label: 'Transactions Analyzed' },
  { value: '-32.4%', label: '0–6 Mi YoY Decline' },
  { value: '18 mi',  label: 'Influence Radius' },
  { value: '4 yrs',  label: 'Data Span 2022–2025' },
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
    title: '2025 Prices Declined',
    desc: 'Following a market peak in 2024, all three distance segments saw a decline in average values for 2025 — perhaps indicating a hot market catching its breath.',
  },
  {
    icon: 'MapPin',
    title: '18-Mile Influence',
    desc: "Equestrian-minded land buyers considered eastern Levy County close enough to access WEC amenities, extending the third distance segment to 18 miles from the Grand Outdoor Arena.",
  },
  {
    icon: 'Scale',
    title: 'Inner Band Led the Decline',
    desc: 'The 0–6 Miles segment saw the steepest drop at -32.44% YoY, from $67,384 to $45,524/acre. The 6–9 and 9–18 segments declined -6.71% and -1.85%, respectively.',
  },
  {
    icon: 'Landmark',
    title: 'Unprecedented Demand Persists',
    desc: "The WEC has created unprecedented demand for agriculturally zoned vacant land in both Marion and Levy Counties, with 400+ tracked transactions across four years.",
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
    text: "The World Equestrian Center opened in January 2021, reshaping Ocala's land market. After rapid appreciation through 2024, prices cooled in 2025.",
    startProgress: 0.02,
    endProgress: 0.15,
  },
  {
    text: 'Within 6 miles, land peaked at $67,384/acre in 2024 before declining -32.44% to $45,524/acre in 2025 — the steepest correction of any band.',
    startProgress: 0.15,
    endProgress: 0.30,
  },
  {
    text: 'At 6–9 miles, prices rose from $28,530 in 2022 to $43,181 in 2024, then eased -6.71% to $40,283/acre in 2025.',
    startProgress: 0.30,
    endProgress: 0.45,
  },
  {
    text: 'The 9–18 mile band — now extended into Levy County — saw the smallest decline at just -1.85%, from $24,355 to $23,905/acre.',
    startProgress: 0.45,
    endProgress: 0.70,
  },
  {
    text: 'The WEC Effect remains real: unprecedented demand across Marion and Levy Counties, with a hot market catching its breath in 2025.',
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
    price: '$45,524/ac',
    position: destinationPoint(WEC_CENTER.lat, WEC_CENTER.lng, 45, 3),
    progressThreshold: RING_THRESHOLDS.inner,
  },
  {
    bandId: 'middle',
    bandLabel: '6–9 Miles',
    price: '$40,283/ac',
    position: destinationPoint(WEC_CENTER.lat, WEC_CENTER.lng, 45, 7.5),
    progressThreshold: RING_THRESHOLDS.middle,
  },
  {
    bandId: 'outer',
    bandLabel: '9–18 Miles',
    price: '$23,905/ac',
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
