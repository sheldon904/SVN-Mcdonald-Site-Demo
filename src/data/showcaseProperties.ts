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
  'single-tenant-leased-943000-sf-trailhead-logistics-center',
  'ocala-75-industrial-lease',
  '78-acres-in-horse-country',
] as const;

export type ShowcaseSlug = typeof SHOWCASE_SLUGS[number];

export function isShowcaseSlug(slug: string): slug is ShowcaseSlug {
  return (SHOWCASE_SLUGS as readonly string[]).includes(slug);
}

export const showcaseProperties: Record<ShowcaseSlug, ShowcaseProperty> = {
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

  'ocala-75-industrial-lease': {
    slug: 'ocala-75-industrial-lease',
    title: 'Ocala 75',
    subtitle: 'Flexible industrial spaces from 40,000–135,640 SF on 105+ entitled acres along I-75.',
    location: 'Ocala, FL',
    price: '175,640 SF',
    priceLabel: 'For Lease',
    heroImage: '/images/properties/ocala-75-hero.webp',
    aerialFallbackImage: '/images/properties/ocala-75-aerial.webp',
    type: 'Industrial',
    status: 'FOR LEASE',

    mapCenter: { lat: 29.2135, lng: -82.1710 },
    waypoints: [
      // High overview — I-75 corridor and full site visible
      { center: { lat: 29.2135, lng: -82.1710, altitude: 0 }, heading: 0, tilt: 40, range: 3000, progress: 0.0 },
      // Tilt in toward the industrial park
      { center: { lat: 29.2135, lng: -82.1710, altitude: 0 }, heading: 45, tilt: 55, range: 1500, progress: 0.20 },
      // See the building footprint in context
      { center: { lat: 29.2125, lng: -82.1690, altitude: 0 }, heading: 90, tilt: 65, range: 700, progress: 0.40 },
      // Orbit — see loading docks and parking
      { center: { lat: 29.2130, lng: -82.1700, altitude: 15 }, heading: 180, tilt: 70, range: 400, progress: 0.60 },
      // Low approach — feel the scale of 175K SF
      { center: { lat: 29.2140, lng: -82.1720, altitude: 10 }, heading: 260, tilt: 76, range: 250, progress: 0.80 },
      // Pull-back with I-75 corridor context
      { center: { lat: 29.2135, lng: -82.1710, altitude: 0 }, heading: 315, tilt: 50, range: 2000, progress: 1.0 },
    ],
    scrollCaptions: [
      { text: 'Ocala 75: 175,640 SF of new industrial space along I-75', startProgress: 0.0, endProgress: 0.15 },
      { text: 'Flexible spaces from 40,000 to 135,640 SF', startProgress: 0.22, endProgress: 0.38 },
      { text: 'Brand-new construction delivered 2026', startProgress: 0.42, endProgress: 0.58 },
      { text: '105+ entitled acres for build-to-suit development', startProgress: 0.62, endProgress: 0.78 },
      { text: 'Direct I-75 access to Tampa, Orlando & Jacksonville', startProgress: 0.82, endProgress: 0.95 },
    ],

    stats: [
      { value: '175K', label: 'Square Feet' },
      { value: '105+', label: 'Entitled Acres' },
      { value: 'I-75', label: 'Direct Access' },
      { value: '2026', label: 'Delivery' },
    ],
    storyParagraphs: [
      'Ocala is home to some of the largest industrial investments in the state of Florida and continues growing in prominence as a central hub for industrial and logistics operations. Large corporations such as Amazon, AutoZone, Chewy, Costco, and FedEx have significant warehouse locations in Ocala, providing quick access to the Tampa, Orlando, and Jacksonville markets.',
      'Ocala 75 features flexible spaces between 40,000–135,640 SF being delivered March 2026. The facility offers modern clear heights, extensive dock loading, and infrastructure designed for high-volume distribution and manufacturing operations.',
      'In addition to the initial building, Ocala 75 features 105.53 acres of entitled industrial land available for build-to-suit and/or fee simple development for up to 1.2 million SF of additional industrial space — positioning it as one of the most significant industrial development opportunities in Central Florida.',
      'SVN McDonald & Company, in partnership with David Murphy and Monica Wonus of CBRE, is marketing Ocala 75 to national and regional tenants seeking strategic logistics positions along Florida\'s I-75 corridor.',
    ],
    pullQuote: {
      text: "Where Florida's I-75 corridor meets world-class industrial infrastructure.",
      attribution: 'SVN McDonald & Company',
    },
    locationContext: {
      description: 'Located along Interstate 75 in North Central Florida, Ocala is insulated from the coasts and provides quick access to the Orlando, Tampa, and Jacksonville markets. Residents and businesses alike enjoy a high quality of life and a relatively low cost of living. The scenic landscape is graced by the pastoral beauty of more than 1,500 horse farms and the World Equestrian Center.',
      landmarks: [
        'I-75 Interchange — Adjacent',
        'Orlando Metro — 80 miles',
        'Port of Tampa — 90 miles',
        'Jacksonville — 120 miles',
        'Ocala International Airport — 8 miles',
      ],
      satelliteImage: '/images/properties/ocala-75-aerial.webp',
    },

    seoTitle: 'Ocala 75 — 175K SF Industrial for Lease | SVN McDonald',
    seoDescription: 'Ocala 75 offers 175,640 SF of new industrial space for lease along I-75 in Ocala, FL. Flexible spaces from 40,000–135,640 SF with 105+ acres for build-to-suit.',
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
