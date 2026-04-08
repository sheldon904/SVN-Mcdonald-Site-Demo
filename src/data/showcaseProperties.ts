export interface MapCameraWaypoint {
  center: { lat: number; lng: number; altitude: number };
  heading: number;  // compass: 0=N, 90=E, 180=S, 270=W
  tilt: number;     // 0=straight down, 90=horizontal
  range: number;    // meters from center
  progress: number; // 0–1 scroll position
}

export interface ScrollCaption {
  text: string;
  startProgress: number;
  endProgress: number;
}

export interface ShowcaseStat {
  value: string;
  label: string;
}

export interface ShowcaseProperty {
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  price: string;
  priceLabel: string;
  heroImage: string;
  aerialFallbackImage: string;
  type: string;
  status: string;

  // Google Maps 3D config
  mapCenter: { lat: number; lng: number };
  waypoints: MapCameraWaypoint[];
  scrollCaptions: ScrollCaption[];

  // Page content
  stats: ShowcaseStat[];
  storyParagraphs: string[];
  pullQuote: { text: string; attribution: string };
  locationContext: {
    description: string;
    landmarks: string[];
    satelliteImage: string;
  };

  // SEO
  seoTitle: string;
  seoDescription: string;
}

export const SHOWCASE_SLUGS = [
  'sold-550-acre-jumbolair',
  'single-tenant-leased-943000-sf-trailhead-logistics-center',
  '78-acres-in-horse-country',
] as const;

export type ShowcaseSlug = typeof SHOWCASE_SLUGS[number];

export function isShowcaseSlug(slug: string): slug is ShowcaseSlug {
  return (SHOWCASE_SLUGS as readonly string[]).includes(slug);
}

export const showcaseProperties: Record<ShowcaseSlug, ShowcaseProperty> = {
  'sold-550-acre-jumbolair': {
    slug: 'sold-550-acre-jumbolair',
    title: '550 Acre Jumbolair',
    subtitle: "A mile of runway can take you anywhere in the world.",
    location: 'Ocala, FL',
    price: '$9,500,000',
    priceLabel: 'Sale Price',
    heroImage: '/images/properties/jumbolair-aerial.jpg',
    aerialFallbackImage: '/images/properties/jumbolair-aerial.jpg',
    type: 'Residential Airpark',
    status: 'SOLD',

    mapCenter: { lat: 29.276966380116715, lng: -82.12062533071922 },
    waypoints: [
      // High overview — full 550 acres visible
      { center: { lat: 29.276966380116715, lng: -82.12062533071922, altitude: 0 }, heading: 0, tilt: 45, range: 2500, progress: 0.0 },
      // Push in, tilt to reveal runway in 3D
      { center: { lat: 29.276966380116715, lng: -82.12062533071922, altitude: 0 }, heading: 30, tilt: 55, range: 1200, progress: 0.15 },
      // Flying along the runway — see buildings in 3D
      { center: { lat: 29.2756, lng: -82.1179, altitude: 0 }, heading: 135, tilt: 65, range: 500, progress: 0.35 },
      // Low approach — near rooftop level
      { center: { lat: 29.2746, lng: -82.1164, altitude: 0 }, heading: 150, tilt: 75, range: 250, progress: 0.55 },
      // Close flyby of hangars and homes
      { center: { lat: 29.2766, lng: -82.1194, altitude: 0 }, heading: 220, tilt: 72, range: 200, progress: 0.75 },
      // Cinematic pull-back — property in full 3D context
      { center: { lat: 29.276966380116715, lng: -82.12062533071922, altitude: 0 }, heading: 320, tilt: 55, range: 1500, progress: 1.0 },
    ],
    scrollCaptions: [
      { text: '550 acres of world-class aviation community', startProgress: 0.0, endProgress: 0.12 },
      { text: '7,550-foot runway — one of the longest private runways in America', startProgress: 0.18, endProgress: 0.32 },
      { text: 'Flying the length of the runway', startProgress: 0.38, endProgress: 0.52 },
      { text: 'Approaching the residential hangars', startProgress: 0.58, endProgress: 0.72 },
      { text: 'Luxury homes with direct taxiway access', startProgress: 0.78, endProgress: 0.92 },
    ],

    stats: [
      { value: '$9.5M', label: 'Sale Price' },
      { value: '550', label: 'Acres' },
      { value: '7,550', label: 'Ft Runway' },
      { value: '1', label: 'of a Kind' },
    ],
    storyParagraphs: [
      'Bring your Boeing. A mile of road can take you a few places, but a mile of runway can take you anywhere in the world. Jumbolair is a world-class residential airpark community featuring a 7,550-foot runway — one of the longest private runways in the United States.',
      'This extraordinary 550-acre property includes luxury homes, private hangars, and unmatched aviation amenities. Residents taxi from their personal hangars directly to the runway, living the ultimate aviation lifestyle in the heart of Marion County.',
      'SVN McDonald & Company represented this landmark transaction, navigating the complexities of one of the most unique properties in the Southeast. The $9.5 million sale underscores the growing appeal of Ocala as a destination for discerning buyers seeking extraordinary properties.',
      'The property features mature oak-lined streets, a clubhouse, and direct access to some of the best flying weather in the country. With Ocala\'s growing prominence as a lifestyle destination, Jumbolair represents the intersection of aviation, luxury, and Florida living.',
    ],
    pullQuote: {
      text: "A mile of road can take you a few places, but a mile of runway can take you anywhere in the world.",
      attribution: 'Jumbolair Aviation Estates',
    },
    locationContext: {
      description: 'Located just minutes from downtown Ocala in Marion County, Jumbolair sits at the heart of Central Florida\'s equestrian and aviation corridor. The property benefits from Class C airspace access, year-round VFR flying weather, and proximity to I-75 for ground transportation.',
      landmarks: [
        'Ocala International Airport — 12 miles',
        'World Equestrian Center — 15 miles',
        'Downtown Ocala — 8 miles',
        'I-75 Interchange — 10 miles',
        'Gainesville Regional Airport — 35 miles',
      ],
      satelliteImage: '/images/properties/jumbolair.webp',
    },

    seoTitle: '550 Acre Jumbolair — $9.5M Airpark | SVN McDonald',
    seoDescription: 'SVN McDonald represented the $9.5M sale of 550-acre Jumbolair, a world-class residential airpark with a 7,550-foot runway in Ocala, FL.',
  },

  'single-tenant-leased-943000-sf-trailhead-logistics-center': {
    slug: 'single-tenant-leased-943000-sf-trailhead-logistics-center',
    title: 'Trailhead Logistics Center',
    subtitle: '943,000 square feet of state-of-the-art distribution.',
    location: 'Ocala, FL',
    price: '943,000 SF',
    priceLabel: 'Leased',
    heroImage: '/trailhead-logistics-hero.jpg',
    aerialFallbackImage: '/trailhead-logistics-hero.jpg',
    type: 'Industrial',
    status: 'LEASED',

    mapCenter: { lat: 29.031344556118352, lng: -82.16443964993272 },
    waypoints: [
      // I-75 corridor context — high overview
      { center: { lat: 29.031344556118352, lng: -82.16443964993272, altitude: 0 }, heading: 0, tilt: 40, range: 3000, progress: 0.0 },
      // Tilt in toward the industrial area
      { center: { lat: 29.031344556118352, lng: -82.16443964993272, altitude: 0 }, heading: 45, tilt: 55, range: 1500, progress: 0.20 },
      // See the massive footprint in 3D
      { center: { lat: 29.0303, lng: -82.1624, altitude: 0 }, heading: 90, tilt: 65, range: 600, progress: 0.40 },
      // Orbit the building — see roof, dock doors, parking
      { center: { lat: 29.0308, lng: -82.1634, altitude: 15 }, heading: 180, tilt: 70, range: 350, progress: 0.60 },
      // Near ground — feel the scale of 943K SF
      { center: { lat: 29.0318, lng: -82.1654, altitude: 10 }, heading: 250, tilt: 78, range: 200, progress: 0.80 },
      // Pull-back with full 3D
      { center: { lat: 29.031344556118352, lng: -82.16443964993272, altitude: 0 }, heading: 315, tilt: 55, range: 1800, progress: 1.0 },
    ],
    scrollCaptions: [
      { text: 'The I-75 corridor: Central Florida\'s logistics backbone', startProgress: 0.0, endProgress: 0.15 },
      { text: 'Approaching the 943,000 SF facility', startProgress: 0.22, endProgress: 0.38 },
      { text: 'One of the largest industrial footprints in Marion County', startProgress: 0.42, endProgress: 0.58 },
      { text: 'State-of-the-art distribution infrastructure', startProgress: 0.62, endProgress: 0.78 },
      { text: 'Strategic location along Florida\'s growth corridor', startProgress: 0.82, endProgress: 0.95 },
    ],

    stats: [
      { value: '943K', label: 'Square Feet' },
      { value: '#1', label: 'Largest Lease in County' },
      { value: 'I-75', label: 'Direct Corridor Access' },
      { value: '2026', label: 'Year Leased' },
    ],
    storyParagraphs: [
      'SVN McDonald & Company played a key role in the single-tenant lease of the 943,000 square foot Trailhead Logistics Center in Ocala, FL. This state-of-the-art distribution facility represents one of the largest industrial transactions in Marion County history.',
      'The Trailhead Logistics Center is strategically positioned along the I-75 corridor, providing direct access to Florida\'s major population centers. The facility features modern clear heights, extensive dock loading, and infrastructure designed for high-volume distribution operations.',
      'This transaction underscores the explosive growth of Ocala as a logistics and distribution hub. With competitive land costs, a growing workforce, and excellent interstate connectivity, Marion County continues to attract major industrial tenants seeking alternatives to congested metro markets.',
      'SVN McDonald\'s deep understanding of the local industrial market and national tenant relationships made this landmark transaction possible, further establishing the firm\'s leadership in Central Florida\'s commercial real estate landscape.',
    ],
    pullQuote: {
      text: "The largest single-tenant industrial lease in Marion County history.",
      attribution: 'SVN McDonald & Company',
    },
    locationContext: {
      description: 'Trailhead Logistics Center sits at the heart of Florida\'s I-75 corridor, one of the most important logistics arteries in the Southeast. The facility provides same-day access to Orlando, Tampa, Jacksonville, and the port of Miami.',
      landmarks: [
        'I-75 Interchange — Adjacent',
        'Port of Tampa — 90 miles',
        'Orlando Metro — 80 miles',
        'Jacksonville — 120 miles',
        'Ocala International Airport — 8 miles',
      ],
      satelliteImage: '/images/properties/trailhead-location-context.jpg',
    },

    seoTitle: 'Trailhead Logistics Center — 943K SF Lease | SVN McDonald',
    seoDescription: 'SVN McDonald facilitated the lease of the 943,000 SF Trailhead Logistics Center, the largest industrial transaction in Marion County history.',
  },

  '78-acres-in-horse-country': {
    slug: '78-acres-in-horse-country',
    title: '78+/- Acres Horse Country',
    subtitle: 'Rolling pastures and mature oaks in the heart of horse country.',
    location: 'NW Marion County, FL',
    price: '78+/- Acres',
    priceLabel: 'Sold',
    heroImage: '/images/properties/78-acres-horse-country-new.jpg',
    aerialFallbackImage: '/images/properties/78-acres-horse-country-new.jpg',
    type: 'Land',
    status: 'SOLD',

    mapCenter: { lat: 29.24578, lng: -82.37252 },
    waypoints: [
      // Overview — see the full 78 acres and surrounding farms
      { center: { lat: 29.24578, lng: -82.37252, altitude: 0 }, heading: 0, tilt: 40, range: 1800, progress: 0.0 },
      // Tilt to show rolling terrain in 3D
      { center: { lat: 29.24578, lng: -82.37252, altitude: 0 }, heading: 20, tilt: 55, range: 900, progress: 0.20 },
      // Fly across the pastures — see fence lines and trees
      { center: { lat: 29.24428, lng: -82.37452, altitude: 0 }, heading: 210, tilt: 65, range: 400, progress: 0.40 },
      // Near tree-top level — see individual oaks in 3D
      { center: { lat: 29.24528, lng: -82.37352, altitude: 10 }, heading: 280, tilt: 72, range: 200, progress: 0.60 },
      // Dramatic low angle across the landscape
      { center: { lat: 29.24678, lng: -82.37152, altitude: 5 }, heading: 350, tilt: 80, range: 150, progress: 0.80 },
      // Pull-back — property in horse country context
      { center: { lat: 29.24578, lng: -82.37252, altitude: 0 }, heading: 60, tilt: 50, range: 1200, progress: 1.0 },
    ],
    scrollCaptions: [
      { text: '78 pristine acres in NW Marion County', startProgress: 0.0, endProgress: 0.15 },
      { text: 'Gentle terrain and lush pastures', startProgress: 0.22, endProgress: 0.38 },
      { text: 'Flying across the rolling landscape', startProgress: 0.42, endProgress: 0.58 },
      { text: 'Mature oak clusters and natural beauty', startProgress: 0.62, endProgress: 0.78 },
      { text: 'The heart of Florida\'s horse country', startProgress: 0.82, endProgress: 0.95 },
    ],

    stats: [
      { value: '78+', label: 'Acres' },
      { value: 'NW', label: 'Marion County' },
      { value: '#1', label: 'Horse Country' },
      { value: '2026', label: 'Year Sold' },
    ],
    storyParagraphs: [
      '78+/- pristine acres located in the heart of NW Marion County\'s renowned horse country. This beautiful property features rolling pastures and mature oaks, ideal for equestrian use or conservation.',
      'NW Marion County is recognized worldwide as the "Horse Capital of the World," home to over 1,200 horse farms and the World Equestrian Center. This property sits in the epicenter of that legacy, surrounded by premier equestrian estates and training facilities.',
      'The land features the signature No. 8 limestone soil that makes Marion County uniquely suited for raising and training horses. Natural springs, mature live oaks, and gentle rolling terrain create an idyllic setting for any equestrian pursuit.',
      'SVN McDonald & Company leveraged deep local knowledge and relationships within the equestrian community to bring this transaction to a successful close, matching the right buyer with one of the area\'s most desirable parcels.',
    ],
    pullQuote: {
      text: "In the heart of the Horse Capital of the World, where the land itself is the legacy.",
      attribution: 'SVN McDonald & Company',
    },
    locationContext: {
      description: 'Located in the prestigious NW corridor of Marion County, this property is surrounded by world-class equestrian farms and training facilities. The area is home to the renowned No. 8 limestone soil and has produced more champions than any other region in the country.',
      landmarks: [
        'World Equestrian Center — 10 miles',
        'HITS Ocala — 8 miles',
        'Golden Ocala Golf & Equestrian — 5 miles',
        'Downtown Ocala — 12 miles',
        'Ocala National Forest — 15 miles',
      ],
      satelliteImage: '/images/properties/78-acres-horse-country-new.jpg',
    },

    seoTitle: '78+/- Acres Horse Country — NW Marion County | SVN McDonald',
    seoDescription: '78+/- pristine acres in NW Marion County\'s renowned horse country. Rolling pastures, mature oaks, ideal for equestrian use. Sold by SVN McDonald.',
  },
};
