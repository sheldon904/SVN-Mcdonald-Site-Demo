export interface Location {
  slug: string;
  name: string;
  shortName: string;
  county: string;
  isCity: boolean;
  geoCoordinates: { latitude: number; longitude: number };
  marketContext: {
    economicDrivers: string;
    growthNarrative: string;
    geographicAdvantage: string;
    investmentClimate: string;
  };
}

export const locations: Location[] = [
  {
    slug: 'ocala-fl',
    name: 'Ocala, FL',
    shortName: 'Ocala',
    county: 'Marion County',
    isCity: true,
    geoCoordinates: { latitude: 29.1872, longitude: -82.1402 },
    marketContext: {
      economicDrivers:
        'Ocala is the economic hub of Marion County, anchored by the World Equestrian Center, a $750M+ facility that has fundamentally reshaped the local economy since opening in January 2021. Major employers include AdventHealth Ocala, AutoZone\'s regional distribution center, and a growing logistics sector along the I-75 corridor. The equestrian industry alone contributes over $2.6 billion annually to the regional economy.',
      growthNarrative:
        'Ocala\'s population has surged past 70,000, with the broader metro area exceeding 390,000 residents. The city has consistently ranked among the fastest-growing metros in the United States, driven by the WEC\'s gravitational pull, affordable cost of living relative to South Florida, and aggressive infrastructure investment including I-75 interchange improvements and the SR 200 corridor expansion.',
      geographicAdvantage:
        'Positioned at the intersection of I-75 and US 441, Ocala provides direct highway access to Tampa (80 miles south), Orlando (80 miles southeast), Jacksonville (110 miles north), and Gainesville (35 miles north). The city sits at the geographic center of Florida, making it a natural logistics and distribution hub.',
      investmentClimate:
        'Florida\'s absence of state income tax, combined with Marion County\'s competitive millage rates and pro-development county commission, create a favorable environment for real estate investment. The WEC\'s continued expansion — including hotels, retail, and residential components — ensures sustained demand pressure on surrounding properties.',
    },
  },
  {
    slug: 'gainesville-fl',
    name: 'Gainesville, FL',
    shortName: 'Gainesville',
    county: 'Alachua County',
    isCity: true,
    geoCoordinates: { latitude: 29.6516, longitude: -82.3248 },
    marketContext: {
      economicDrivers:
        'Gainesville\'s economy is powered by the University of Florida, a top-5 public university with over 60,000 students and 30,000 employees, and UF Health Shands Hospital, a Level I trauma center and the region\'s largest employer. The city has cultivated a growing technology and biotech corridor, with UF\'s Innovation Hub and Sid Martin Biotech Incubator producing high-value startups that drive demand for office and flex-industrial space.',
      growthNarrative:
        'Gainesville\'s metro population exceeds 290,000 and continues to grow as UF expands its research footprint and the city attracts remote workers and retirees drawn by its cultural amenities, healthcare access, and affordability. New mixed-use developments like Celebration Pointe and Butler Town Center have introduced modern retail and residential inventory to the market.',
      geographicAdvantage:
        'Gainesville sits along the I-75 corridor, 35 miles north of Ocala and 110 miles north of Orlando. Gainesville Regional Airport provides commercial air service, and the city\'s position between Jacksonville and Tampa makes it accessible to major port and distribution networks. The surrounding Alachua County countryside offers large rural parcels just minutes from urban amenities.',
      investmentClimate:
        'The university presence creates a uniquely stable demand base for commercial and residential real estate. Student housing, medical office, and research-adjacent flex space are consistently in demand. Alachua County\'s educated workforce and institutional investment pipeline distinguish it from purely growth-driven markets.',
    },
  },
  {
    slug: 'clermont-fl',
    name: 'Clermont, FL',
    shortName: 'Clermont',
    county: 'Lake County',
    isCity: true,
    geoCoordinates: { latitude: 28.5494, longitude: -81.7729 },
    marketContext: {
      economicDrivers:
        'Clermont is the commercial gateway to South Lake County, serving a rapidly expanding population of Orlando commuters and retirees. Retail follows rooftops here — the SR 50 and US 27 corridors have attracted national retailers, restaurants, and healthcare providers including South Lake Hospital (part of Orlando Health). The Olympus community and other master-planned developments have driven significant commercial pad site demand.',
      growthNarrative:
        'Clermont has grown from a quiet citrus town to a city exceeding 50,000 residents, making it one of the fastest-growing cities in the Orlando metro area. South Lake County\'s rolling hills, chain of lakes, and proximity to Disney World and Universal Studios create a lifestyle appeal that continues to attract families and retirees from across the state.',
      geographicAdvantage:
        'Clermont\'s location along the US 27 and SR 50 corridors places it at the western edge of the Orlando metro, with direct access to Florida\'s Turnpike and the Western Beltway (SR 429). The city is 30 minutes from Orlando International Airport and 20 minutes from Walt Disney World, making it a strategic location for businesses serving the tourism and hospitality sectors.',
      investmentClimate:
        'The explosive residential growth in South Lake County has created a supply-demand imbalance for commercial space. Retail vacancy rates are among the lowest in the region, and industrial/warehouse demand is growing as e-commerce fulfillment centers seek proximity to the Orlando metro\'s 2.5 million consumers.',
    },
  },
  {
    slug: 'marion-county',
    name: 'Marion County, FL',
    shortName: 'Marion County',
    county: 'Marion County',
    isCity: false,
    geoCoordinates: { latitude: 29.2109, longitude: -82.0577 },
    marketContext: {
      economicDrivers:
        'Marion County\'s 1,663 square miles encompass a diverse economic base spanning equestrian, agriculture, healthcare, logistics, and manufacturing. The World Equestrian Center is the county\'s transformative economic catalyst, while established employers like FedEx Ground, AutoZone, Chewy, and AdventHealth provide employment stability. The county\'s agricultural heritage — cattle, horses, timber, and hay — remains a significant economic force.',
      growthNarrative:
        'Marion County\'s population has surpassed 390,000 and is projected to exceed 450,000 by 2035. Growth is concentrated along the I-75 corridor and the SR 200/SW 60th Avenue commercial spine, but the county\'s vast rural interior offers large tracts that are increasingly attractive to developers seeking entitled land for residential communities.',
      geographicAdvantage:
        'Marion County\'s central Florida location, bisected by I-75 and served by US 301, US 27, US 441, and SR 200, provides multimodal transportation access. The county is equidistant between Tampa and Jacksonville, and the Ocala International Airport (formerly Jim Taylor Field) accommodates corporate aviation and cargo operations.',
      investmentClimate:
        'The county commission has maintained a pro-growth, business-friendly posture, streamlining permitting and offering incentives for job-creating enterprises. Marion County\'s relatively low land basis compared to coastal Florida markets, combined with strong population growth and the WEC multiplier effect, make it one of the most compelling value propositions in the state for real estate investors.',
    },
  },
  {
    slug: 'lake-county',
    name: 'Lake County, FL',
    shortName: 'Lake County',
    county: 'Lake County',
    isCity: false,
    geoCoordinates: { latitude: 28.7717, longitude: -81.7184 },
    marketContext: {
      economicDrivers:
        'Lake County\'s economy is fueled by its position along the I-4 and US 27 growth corridors. The county serves as a bedroom community for Orlando while developing its own commercial identity through logistics, healthcare (AdventHealth Waterman, UF Health Leesburg), and retail development. The southern tier around Clermont is the primary growth engine, while Leesburg, Eustis, and Tavares anchor the central and northern portions.',
      growthNarrative:
        'Lake County has experienced explosive growth, with population exceeding 400,000 and new residential permits consistently ranking among the highest in Florida. The Villages retirement community spills into northern Lake County, creating outsized consumer spending in Sumter-adjacent areas. Master-planned communities in the south have driven demand for supporting commercial infrastructure.',
      geographicAdvantage:
        'Lake County is bisected by Florida\'s Turnpike and served by US 27, US 441, and SR 50. The county bridges the Orlando metro to the south with the Ocala/Gainesville corridor to the north. Direct turnpike access provides efficient freight movement, making northern Lake County increasingly attractive for distribution and warehousing operations.',
      investmentClimate:
        'The county\'s dual growth drivers — Orlando commuter expansion from the south and Villages spillover from the north — create investment opportunities across the entire property type spectrum. Commercial land along major corridors remains competitively priced relative to Orange and Seminole counties, attracting developers seeking lower basis points with strong absorption potential.',
    },
  },
  {
    slug: 'alachua-county',
    name: 'Alachua County, FL',
    shortName: 'Alachua County',
    county: 'Alachua County',
    isCity: false,
    geoCoordinates: { latitude: 29.6744, longitude: -82.3571 },
    marketContext: {
      economicDrivers:
        'Alachua County\'s economy revolves around the University of Florida, UF Health, and the innovation ecosystem they sustain. The county is home to Florida\'s premier biotech incubator (Sid Martin), a growing cybersecurity cluster, and Shands Teaching Hospital — the region\'s largest employer with over 13,000 workers. Beyond the university, the county\'s western and southern agricultural lands support cattle, hay, and timber operations.',
      growthNarrative:
        'Alachua County\'s population of 280,000+ reflects steady growth driven by UF\'s expansion, healthcare employment, and quality-of-life appeal. New developments along I-75 at Celebration Pointe and Butler Town Center have modernized the county\'s commercial inventory. The city of Alachua (distinct from Gainesville) has emerged as a growth node along the US 441 corridor.',
      geographicAdvantage:
        'Alachua County spans 969 square miles along the I-75 corridor between Ocala and Jacksonville. Its western half transitions to rural agricultural land, creating a diverse real estate landscape from urban infill to large rural tracts within a single county. Gainesville Regional Airport provides commercial service, and the county\'s rail connections serve industrial users.',
      investmentClimate:
        'The institutional stability of a major research university creates a recession-resistant commercial market. Student housing, medical office, and research park space enjoy consistent demand regardless of economic cycles. Rural Alachua County offers agricultural land at prices significantly below Marion County\'s WEC-influenced values, making it attractive for ranchers, farmers, and conservation-minded investors.',
    },
  },
  {
    slug: 'sumter-county',
    name: 'Sumter County, FL',
    shortName: 'Sumter County',
    county: 'Sumter County',
    isCity: false,
    geoCoordinates: { latitude: 28.6746, longitude: -82.0840 },
    marketContext: {
      economicDrivers:
        'Sumter County\'s economy is dominated by The Villages, the largest age-restricted community in the United States, with over 130,000 residents generating extraordinary per-capita consumer spending. Beyond The Villages, the county\'s traditional economic base includes agriculture, timber, and small-scale manufacturing along the US 301 and SR 44 corridors. Healthcare demand driven by the retirement population has created a growing medical services sector.',
      growthNarrative:
        'Sumter County has been the fastest-growing county in Florida — and frequently the entire United States — for over a decade. The Villages continues to expand southward and westward, converting agricultural and timber land into residential communities at a pace that outstrips commercial supply. This growth has pushed development pressure into previously rural areas of the county.',
      geographicAdvantage:
        'Sumter County is positioned between Ocala (Marion County) to the north and the Orlando metro (Lake County) to the south, along the US 301 and SR 44 corridors. Florida\'s Turnpike passes through the eastern portion, providing north-south freight connectivity. The county\'s central location makes it accessible to both the Tampa and Orlando labor markets.',
      investmentClimate:
        'The Villages\' retiree population creates a unique investment dynamic: extremely high consumer spending, demand for medical and retail services, and limited commercial supply relative to the residential base. Triple-net retail, medical office, and self-storage properties in The Villages trade area command premium cap rates. Land adjacent to The Villages\' expansion path has appreciated dramatically.',
    },
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getAllLocations(): Location[] {
  return locations;
}

export function getLocationSlugs(): string[] {
  return locations.map((l) => l.slug);
}
