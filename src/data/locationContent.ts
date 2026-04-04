import type { PropertyType } from './propertyTypes';
import type { Location } from './locations';

const BASE_URL = 'https://svnmcdonald.com';

export interface GeoPageContent {
  seoTitle: string;
  seoDescription: string;
  h1Title: string;
  h1Highlighted: string;
  subtitle: string;
  introParagraphs: string[];
  locationHighlights: { title: string; description: string }[];
  parentTypeUrl: string;
  breadcrumbs: { name: string; url: string }[];
}

// ---------------------------------------------------------------------------
// Location-specific angles for each property type + location combination.
// The 11 "legacy" property types that had geo pages on the old WordPress site
// receive fully hand-crafted angles for all 7 locations. The 4 remaining types
// (equestrian, retail, residential-development, warehouse) use a fallback
// composed from the location\'s marketContext fields.
// ---------------------------------------------------------------------------

type LocationAngleMap = Record<string, Record<string, string>>;

const locationAngles: LocationAngleMap = {
  // =========================================================================
  // RANCH
  // =========================================================================
  'ranch': {
    'ocala-fl':
      'Ocala sits at the epicenter of Central Florida\'s ranching culture, where the World Equestrian Center has intensified demand for ranch properties within a 15-mile radius. Land along US 441 south of the city and west toward Dunnellon features improved Bahia and Bermuda grass pastures underlain by the region\'s signature No. 8 limestone soil. The Marion County Livestock Market on NW 65th Street remains a functioning auction facility, and the nearby Farmland Preservation Area ensures large tracts stay in agricultural use. Ranchers here benefit from I-75 access for cattle transport to processing facilities in Lakeland and the Panhandle.',
    'gainesville-fl':
      'Gainesville\'s ranch market draws a distinct buyer profile: university-affiliated professionals, retired academics, and veterinary practitioners seeking working ranches within 30 minutes of UF. Properties south of Paynes Prairie State Preserve and west along SR 24 toward Archer offer open grazing land with panoramic views. UF\'s College of Veterinary Medicine provides world-class large-animal care minutes away, a material advantage for serious cattle operators. The younger, educated workforce in Alachua County also drives demand for lifestyle ranches where families combine agricultural living with proximity to Gainesville\'s cultural amenities.',
    'clermont-fl':
      'Ranch properties in the Clermont area occupy a niche market where South Lake County\'s rolling hills meet the flat pasturelands stretching north toward Groveland and Minneola. The terrain along CR 561 and west of US 27 still supports small cattle operations despite residential encroachment from Orlando commuter subdivisions. Ranches here command a premium for their proximity to the Orlando metro — a 45-minute drive puts owners at Orlando International Airport. Buyers include investors banking on residential conversion potential as Clermont\'s population continues its explosive growth trajectory along the SR 50 corridor.',
    'marion-county':
      'Marion County\'s 1,663 square miles encompass some of the most productive ranch country in the southeastern United States. The county\'s vast interior — from the Dunnellon corridor along the Withlacoochee River to the pine flatwoods east of the Ocala National Forest — supports commercial cow-calf operations on tracts ranging from 100 to 5,000+ acres. The county commission has maintained agricultural zoning protections that discourage speculative subdivision of working ranches, and Greenbelt exemptions keep carrying costs manageable. Marion County is also home to multiple feed and farm supply dealers, large-animal veterinarians, and fencing contractors that form the infrastructure backbone for ranching operations.',
    'lake-county':
      'Lake County\'s ranch market benefits from dual demand drivers: ranchers seeking productive grazing land in the county\'s central and northern tiers, and investors targeting parcels in the path of residential growth from the south. Properties along CR 48 between Leesburg and Mount Dora, as well as north of Eustis toward the Ocala National Forest boundary, offer improved pastures at prices below Marion County comparables. The Villages\' southward expansion into the Sumter-Lake border zone has pushed land values higher in northern Lake County, making ranches along US 441 near Lady Lake increasingly attractive for long-term appreciation plays.',
    'alachua-county':
      'Alachua County\'s western and southern reaches — from Newberry and Archer south toward Levy County — contain some of the most affordable ranch land within an hour of a major university town. These areas feature open prairie, hammock-bordered pastures, and gentle terrain well-suited to cow-calf production. The county\'s agricultural heritage is anchored by multi-generational ranching families, and the University of Florida\'s IFAS Extension service provides technical support for forage management, herd health, and sustainable grazing practices. Properties along SR 26 west and SR 121 south offer acreage at a meaningful discount to WEC-influenced Marion County values while maintaining easy access to Gainesville\'s amenities.',
    'sumter-county':
      'Sumter County represents a rapidly evolving ranch market where agricultural land is being converted to residential use at a pace unmatched anywhere in Florida. The Villages\' continued expansion southward and westward through the county has created extraordinary appreciation for ranch tracts in the development path. Ranches along CR 470 and west of US 301 still function as working cattle operations, but owners face increasing development pressure as rooftops approach. For operators, Sumter County\'s proximity to the Lakeland and Ocala livestock markets keeps cow-calf operations viable; for investors, the conversion premium on ranchland near The Villages\' expansion boundary represents one of the state\'s most compelling land plays.',
  },

  // =========================================================================
  // OFFICE
  // =========================================================================
  'office': {
    'ocala-fl':
      'Ocala\'s office market is driven by the healthcare expansion of AdventHealth Ocala and HCA Florida Ocala Hospital, both of which have catalyzed clusters of specialty medical offices along SR 200 and SW 17th Street. The downtown Ocala square district has experienced a renaissance with law firms, financial advisors, and coworking operators leasing renovated historic buildings. Office vacancy in the city has tightened as professional services firms relocating from South Florida take advantage of lease rates that are 40-50% below comparable space in Broward or Palm Beach counties. The WEC\'s economic ripple effect has also generated demand for ancillary professional space — accounting, insurance, and property management offices serving the equestrian community.',
    'gainesville-fl':
      'Gainesville\'s office market is uniquely anchored by the University of Florida and UF Health Shands Hospital, which together employ over 40,000 workers and generate persistent demand for medical office, research flex space, and professional services offices. The Innovation Hub and Sid Martin Biotech Incubator produce high-growth startups that graduate into conventional office space along SW 2nd Avenue and the Celebration Pointe mixed-use district. Tenants benefit from access to UF\'s talent pipeline, and office properties near campus enjoy vacancy rates well below state averages. The presence of a major research university creates a recession-resistant demand base that distinguishes Gainesville from purely growth-dependent office markets.',
    'clermont-fl':
      'Clermont\'s office market is in a growth phase, driven by the city\'s transformation from a bedroom community into a self-contained economic center. Medical office demand leads the way — South Lake Hospital (Orlando Health) and expanding urgent-care and specialty clinics along SR 50 have generated significant need for purpose-built medical space. Professional services firms, insurance agencies, and financial advisors are also establishing offices to serve Clermont\'s rapidly expanding residential population. Available Class A office space remains limited, and new construction is absorbing quickly as businesses seek to capture market share in South Lake County before lease rates climb to match the area\'s surging demographics.',
    'marion-county':
      'Marion County\'s office market spans a wide geographic and quality range, from modern Class A buildings along the SR 200 commercial spine to small professional offices in the rural communities of Belleview, Dunnellon, and Reddick. The county\'s healthcare sector is the dominant driver of office demand — AdventHealth, HCA, and a growing roster of specialty practitioners require medical office space that meets modern clinical standards. Government office demand anchors the downtown Ocala submarket, where the Marion County judicial complex and administrative buildings are located. The county\'s competitive office lease rates attract businesses that serve the broader multi-county region, positioning Marion County as a cost-effective hub for professional operations.',
    'lake-county':
      'Lake County\'s office market is bifurcated between the high-growth southern tier around Clermont and the more established central corridor anchored by Leesburg, Eustis, and Tavares. In the south, medical and professional office demand is driven by rapid population growth and the need for local services that keep residents from commuting to Orlando. In central Lake County, the county courthouse complex in Tavares and AdventHealth Waterman in Leesburg generate stable government and healthcare office demand. The county\'s position along Florida\'s Turnpike and US 27 corridors provides office tenants with access to both the Orlando metro and the Ocala-Gainesville region, making it a strategic location for businesses with multi-market service areas.',
    'alachua-county':
      'Alachua County\'s office market revolves around Gainesville\'s institutional core but extends into emerging suburban nodes. Celebration Pointe and Butler Town Center have introduced Class A office product that competes with traditional university-area space for professional and medical tenants. Western Alachua County — particularly the city of Alachua along US 441 — has seen new office development catering to tech firms and biotech companies graduating from UF\'s incubator programs. The county\'s educated workforce and high quality of life attract professional service firms that might otherwise locate in Jacksonville or Tampa, and office vacancy remains consistently below the statewide average. Medical office demand is anchored by UF Health\'s sprawling campus and affiliated practices throughout the county.',
    'sumter-county':
      'Sumter County\'s office market is almost entirely shaped by The Villages retirement community and the healthcare infrastructure it demands. Medical office is the dominant property type, with primary care, cardiology, orthopedics, and ophthalmology practices competing for space near The Villages\' town squares and along US 301 and SR 44. Professional offices serving estate planning attorneys, financial advisors, and insurance brokers also thrive, as The Villages\' retirees require a full suite of professional services. Supply has not kept pace with demand, and medical office lease rates in The Villages trade area exceed those in Ocala and Gainesville. For investors, medical office properties with long-term leases to established practices offer some of the most attractive risk-adjusted returns in the region.',
  },

  // =========================================================================
  // MULTI-FAMILY
  // =========================================================================
  'multi-family': {
    'ocala-fl':
      'Ocala\'s multi-family market has tightened significantly as in-migration from South Florida and the Northeast has accelerated. Apartment occupancy rates routinely exceed 95%, and rent growth has outpaced state averages for five consecutive years. The city\'s employment base — anchored by AdventHealth, AutoZone\'s distribution center, WEC-related hospitality jobs, and a growing logistics sector along I-75 — supports workforce housing demand across all price points. New Class A apartment communities along SR 200 and near the I-75/US 27 interchange are absorbing rapidly, while older B and C properties present value-add opportunities for investors willing to renovate and reposition.',
    'gainesville-fl':
      'Gainesville\'s multi-family market benefits from a uniquely diversified demand base: 60,000+ UF students, 30,000+ university and hospital employees, and a growing cohort of young professionals in the biotech and tech sectors. Student housing near campus commands premium per-bed rents, while conventional apartments in suburban locations like Butler Plaza and Celebration Pointe serve non-student renters. The city\'s rental rate is among the highest in Florida (over 55% of households rent), creating a structural demand floor that insulates the market from cyclical swings. Multi-family investors in Gainesville benefit from recession-resistant institutional employment and a continuously replenishing tenant pool.',
    'clermont-fl':
      'Clermont\'s multi-family market is in a supply-constrained growth phase. The city\'s rapid residential expansion has been dominated by single-family homes, leaving the rental apartment inventory undersized relative to the population. Orlando commuters who cannot yet afford homeownership in South Lake County\'s increasingly expensive single-family market represent a large, growing renter pool. New apartment developments along US 27 and near the SR 50/Hancock Road intersection are absorbing at pace, and institutional investors have identified Clermont as an under-supplied submarket within the broader Orlando MSA. Multi-family development sites with entitlements are in high demand.',
    'marion-county':
      'Marion County\'s multi-family market reflects the broader county\'s demographic momentum — population growth exceeding 3% annually has strained the existing rental housing stock. The county\'s workforce housing challenge is acute: entry-level employees at distribution centers, healthcare facilities, and WEC-related businesses need affordable rental options that are in critically short supply. Multi-family development has concentrated along the SR 200 corridor and near the I-75 interchanges, but demand extends countywide. Investors find Marion County attractive because cap rates run 75-150 basis points above comparable Orlando properties, while rent growth fundamentals remain equally strong.',
    'lake-county':
      'Lake County\'s multi-family market benefits from the same dual growth drivers that power its broader economy: Orlando commuter demand from the south and Villages spillover from the north. In southern Lake County, young families and service-industry workers who cannot afford single-family homes in the Clermont-Minneola corridor create intense rental demand. In northern Lake County, workforce housing is needed for employees serving The Villages\' retail, healthcare, and service economy. The county\'s turnpike access and position between two job centers make it attractive for renters who need flexibility, and multi-family absorption rates have been among the highest in the Orlando metro.',
    'alachua-county':
      'Alachua County\'s multi-family market operates in two distinct tiers. Within Gainesville, student housing and conventional apartments compete for a deep tenant pool driven by UF\'s 60,000+ students and Shands\' 13,000+ employees. Outside the city, the county\'s rural communities along US 441 and SR 121 see limited multi-family activity, though new development near the city of Alachua is beginning to address workforce housing demand for employees of the expanding Progress Corporate Park tenants. The county\'s high renter percentage, institutional employment stability, and consistent population growth make it one of the most fundamentally sound multi-family markets in North Central Florida.',
    'sumter-county':
      'Sumter County\'s multi-family market addresses a niche that The Villages itself does not serve: workforce housing for the tens of thousands of employees who staff the retirement community\'s restaurants, golf courses, healthcare facilities, and retail establishments. Many of these workers commute from Ocala, Leesburg, or Wildwood because affordable rental housing within Sumter County is scarce. This supply gap represents a significant multi-family investment opportunity — workforce apartment communities near Wildwood, Bushnell, and the US 301 corridor can capture tenants currently making 30-to-60-minute commutes. The guaranteed demand from The Villages\' massive service economy provides a structural floor for rental occupancy.',
  },

  // =========================================================================
  // INDUSTRIAL
  // =========================================================================
  'industrial': {
    'ocala-fl':
      'Ocala\'s industrial market has gained national attention as companies recognize the city\'s strategic position along the I-75 corridor midway between Tampa and Jacksonville. FedEx Ground, Chewy, and AutoZone all operate major distribution facilities in the city, and recent speculative industrial development near the I-75/SR 326 and I-75/US 27 interchanges has attracted new tenants ranging from building materials suppliers to e-commerce fulfillment operations. The city offers industrial lease rates that are 30-40% below Tampa and Orlando, while same-day truck delivery to 80% of Florida\'s population makes Ocala a compelling logistics hub. Marion County\'s pro-development permitting process accelerates construction timelines for build-to-suit projects.',
    'gainesville-fl':
      'Gainesville\'s industrial market serves a specialized tenant base driven by the University of Florida\'s research and biotechnology ecosystem. The Sid Martin Biotech Incubator has produced companies that require GMP-compliant manufacturing space, cold storage, and lab-flex facilities not found in typical industrial parks. Beyond biotech, the city\'s industrial inventory along NW 13th Street, Waldo Road, and the Progress Corporate Park corridor accommodates building materials, food distribution, and light manufacturing tenants. UF\'s research grants funnel millions into local enterprises that need industrial space, creating a demand driver unique among Florida industrial markets. Gainesville Regional Airport\'s cargo capabilities add logistics capacity for time-sensitive shipments.',
    'clermont-fl':
      'Clermont\'s industrial market is emerging as South Lake County transitions from a purely residential-growth story to a diversified economy requiring warehouse, flex, and light manufacturing space. The US 27 corridor south of the city and parcels near the Florida\'s Turnpike interchange have attracted industrial interest from operators seeking proximity to the Orlando metro\'s 2.5 million consumers without paying Orange County industrial rents. Small-bay industrial and flex-warehouse product is particularly undersupplied, as local contractors, service businesses, and e-commerce operators compete for limited inventory. Industrial land along SR 50 west of the Turnpike represents a development frontier for speculative and build-to-suit warehouse projects.',
    'marion-county':
      'Marion County\'s industrial market spans the I-75 corridor from the Belleview interchange in the south to the SR 326/US 27 interchange in the north, with additional pockets along US 301 and SR 40. The county has established itself as a tier-two logistics market that offers substantial cost savings over Tampa and Orlando while maintaining excellent transportation access. The Ocala/Marion County Commerce Park and emerging industrial nodes near I-75 interchanges provide shovel-ready sites with full infrastructure. The county\'s industrial tenant base is diversifying beyond traditional distribution into advanced manufacturing, food processing, and e-commerce fulfillment — reflecting the maturation of the local economy from a primarily agricultural base to a multi-sector powerhouse.',
    'lake-county':
      'Lake County\'s industrial market is positioned at the intersection of the Orlando metro\'s northward expansion and the I-75 corridor\'s gravitational pull. The county\'s turnpike access through the Clermont-Minneola area and US 27 corridor creates efficient freight routes to Central and South Florida consumer markets. In northern Lake County, the Leesburg and Eustis areas offer affordable industrial land and buildings for operators serving both the local market and The Villages\' supply chain. Institutional industrial developers have identified Lake County as one of the Orlando MSA\'s next growth frontiers for warehouse and distribution facilities, and new speculative construction is underway along key transportation corridors.',
    'alachua-county':
      'Alachua County\'s industrial market benefits from UF\'s innovation pipeline and the county\'s position along the I-75 corridor between Ocala and Jacksonville. The Progress Corporate Park near the city of Alachua has attracted a cluster of technology and biotech companies requiring specialized flex-industrial space, while more traditional industrial tenants are located along Waldo Road and NW 13th Street in Gainesville. The county\'s rail connectivity serves industrial users with bulk shipping needs, and Gainesville Regional Airport handles cargo operations for time-sensitive freight. Industrial vacancy in Alachua County remains tight, and the limited supply of modern warehouse space has pushed some tenants to consider build-to-suit options on available industrial-zoned parcels.',
    'sumter-county':
      'Sumter County\'s industrial market is small but growing rapidly as The Villages\' expansion generates demand for building materials storage, contractor yards, and distribution space. The US 301 corridor through Wildwood and Bushnell has emerged as the county\'s primary industrial node, benefiting from Florida\'s Turnpike access at the Wildwood interchange. Industrial tenants include concrete suppliers, lumber yards, HVAC distributors, and other construction-oriented businesses serving the residential building boom. The limited existing industrial inventory means that new entrants often face tight supply and must consider build-to-suit development. For investors, industrial properties in Sumter County benefit from the structural demand created by The Villages\' ongoing construction pipeline, which shows no sign of slowing.',
  },

  // =========================================================================
  // TRIPLE-NET-NNN
  // =========================================================================
  'triple-net-nnn': {
    'ocala-fl':
      'Ocala\'s triple-net market has deepened considerably as national retailers, restaurant franchises, and healthcare tenants have expanded into the market. Dollar General, Wawa, Tidal Wave Auto Spa, and Heartland Dental are among the credit tenants that have executed NNN leases on newly constructed pad sites along SR 200, US 441, and near I-75 interchanges. Cap rates in Ocala typically run 25-75 basis points above comparable NNN properties in Orlando or Tampa, making the city a compelling destination for income-focused investors and 1031 exchange buyers. The WEC\'s economic stimulus has also generated NNN opportunities in the hospitality and convenience sectors that are unique to this market.',
    'gainesville-fl':
      'Gainesville\'s NNN market benefits from the stabilizing influence of the University of Florida and its 60,000-student population, which drives tenant demand for fast-casual restaurants, convenience stores, and healthcare services. Starbucks, Chick-fil-A, and national pharmacy chains operate NNN-leased locations throughout the market, while medical NNN properties anchored by UF Health-affiliated practices offer investors exposure to recession-resistant healthcare demand. The SW Archer Road and Newberry Road corridors are particularly active NNN markets, with new pad site development absorbing quickly. Gainesville\'s institutional economic base provides NNN investors with lower tenant turnover risk compared to markets dependent on a single growth driver.',
    'clermont-fl':
      'Clermont\'s NNN market is white-hot, driven by the massive residential rooftop growth in South Lake County that has attracted a wave of national retail and restaurant tenants. The US 27 and SR 50 corridors are lined with recently constructed NNN properties leased to tenants including Wawa, Dutch Bros, Aldi, and medical operators. Investors in Clermont NNN properties benefit from a rapidly expanding consumer base — the city\'s trade area population has nearly doubled in 15 years — and cap rates that remain competitive despite strong demand. The limited remaining pad site inventory along these corridors suggests that existing NNN assets will appreciate as new development opportunities become scarcer.',
    'marion-county':
      'Marion County\'s NNN investment market spans from established retail corridors in Ocala to emerging commercial nodes along the I-75 growth corridor and the SR 200/SW 60th Avenue spine. The county\'s 390,000+ population and strong growth trajectory have attracted an increasingly diverse roster of NNN tenants, including national quick-service restaurants, auto parts retailers, medical clinics, and dollar stores. County-wide cap rates typically offer a meaningful yield premium over urban Florida NNN markets, while rent escalations built into new leases protect against inflation erosion. Marion County\'s favorable tax environment — no state income tax and competitive millage rates — enhances after-tax investment returns for NNN property owners.',
    'lake-county':
      'Lake County\'s NNN market reflects the county\'s position as one of Central Florida\'s fastest-growing jurisdictions. National tenants have followed the rooftops, and NNN-leased properties anchored by 7-Eleven, Dollar General, Taco Bell, and healthcare operators line the US 27 and US 441 corridors. The county\'s dual growth engines — Orlando commuter expansion in the south and Villages spillover in the north — create NNN investment opportunities across a wide geographic footprint. Investors benefit from the ability to assemble a diversified NNN portfolio within a single county, spanning convenience, medical, and restaurant tenants at varying price points and cap rates. Turnpike-adjacent NNN properties command particularly strong investor interest.',
    'alachua-county':
      'Alachua County\'s NNN market is characterized by strong institutional demand drivers and a tenant mix anchored by healthcare, education-adjacent, and essential service operators. NNN-leased properties near UF\'s campus, along Newberry Road, and at Celebration Pointe benefit from the university\'s recession-resistant economic base. Medical NNN properties are particularly sought-after, as UF Health\'s expansion has spawned dozens of affiliated practices occupying single-tenant buildings throughout the county. Investors in Alachua County NNN assets enjoy lower volatility than purely growth-dependent markets because the tenant demand base is fundamentally tied to a top-5 public university and a Level I trauma center — institutions that are not going anywhere.',
    'sumter-county':
      'Sumter County\'s NNN market is arguably the most supply-constrained in Central Florida. The Villages\' 130,000+ retirees generate per-capita consumer spending that far exceeds regional averages, yet the commercial inventory has not kept pace with the residential buildout. This imbalance drives intense competition for NNN properties in The Villages trade area, where Publix, Walgreens, and national restaurant tenants operate profitable locations with strong unit-level economics. Cap rates for NNN properties near The Villages\' town squares trade at premium levels, reflecting investor confidence in the guaranteed demand from a captive, high-spending consumer base. For 1031 exchange buyers, a Sumter County NNN property offers a rare combination of yield, stability, and long-term appreciation.',
  },

  // =========================================================================
  // TIMBER
  // =========================================================================
  'timber': {
    'ocala-fl':
      'Timber properties near Ocala occupy a transitional market niche where managed pine plantations meet the expanding footprint of the Ocala metro area. Tracts along the western edge of the Ocala National Forest and south toward the Withlacoochee State Forest feature mature slash and loblolly pine stands with merchantable volumes that generate harvest income. The proximity to Ocala\'s growth boundary means these properties carry a dual value proposition: current timber income plus long-term highest-and-best-use potential as the population pushes outward. Local sawmills and pulpwood purchasers along US 441 and SR 200 provide ready markets for harvested timber, and Marion County\'s agricultural exemptions keep holding costs manageable during the growth cycle.',
    'gainesville-fl':
      'The timber market around Gainesville encompasses large tracts in western and southern Alachua County where slash pine plantations and mixed hardwood-pine stands have been managed for decades. Properties along SR 24 west toward Bronson and south along US 441 toward Micanopy offer productive timberland at prices below Marion County\'s WEC-inflated values. Proximity to the University of Florida\'s School of Forest, Fisheries, and Geomatic Sciences provides access to the latest silviculture research and forest management expertise. Timber buyers in this area include a mix of institutional investors seeking portfolio diversification, hunting enthusiasts who value the recreational co-use, and conservation-minded purchasers interested in easement programs through the USDA\'s Forest Legacy initiative.',
    'clermont-fl':
      'Timber properties in the greater Clermont area are increasingly scarce as residential development has consumed much of South Lake County\'s formerly forested land. Remaining timber tracts are found north and west of the city, in the transition zone toward the Green Swamp and Withlacoochee State Forest. These properties carry significant optionality: timber income today, with development or conservation value tomorrow. The rolling topography and sand pine scrub habitat that characterize the Green Swamp fringe support different management strategies than the flatwoods pine plantations found further north. Investors evaluating timber near Clermont must weigh current harvest economics against the escalating land values driven by Orlando\'s westward suburban expansion.',
    'marion-county':
      'Marion County is one of Central Florida\'s most significant timber-producing jurisdictions, with managed pine plantations covering tens of thousands of acres across the county\'s rural interior. The Ocala National Forest — while federally managed — anchors a timber ecosystem that supports private operations on adjacent and nearby tracts. The county\'s long growing season produces some of the fastest pine growth rates in the United States, with slash pine reaching pulpwood size in 12-15 years and sawtimber quality in 22-25 years. Multiple timber buyers, including Rayonier and other institutional purchasers, maintain active operations in the county. For investors, Marion County timberland offers a compelling combination of biological growth, land appreciation tied to the WEC\'s growth effect, and recreational value for hunting and outdoor pursuits.',
    'lake-county':
      'Lake County\'s timber market occupies the corridor between the Ocala National Forest to the north and the Green Swamp to the south, where managed pine plantations and natural forest stands have historically supported commercial harvesting. Properties along CR 42 east of Eustis and in the Paisley-Altoona corridor near the national forest boundary offer productive timberland with recreational co-use potential. The county\'s position along Florida\'s Turnpike provides efficient transportation to mills and pulpwood purchasers. However, development pressure from both the Orlando metro\'s northward expansion and The Villages\' southward growth has placed a premium on timber tracts that may have near-term conversion potential, making Lake County timberland a dual-return investment.',
    'alachua-county':
      'Alachua County\'s 969 square miles include significant timberland resources, particularly in the western half of the county where the terrain transitions from suburban Gainesville to rural agricultural and silvicultural land. Properties along SR 26 west of Newberry and in the Wacahoota and Monteocha areas feature well-managed slash pine stands and mixed hardwood bottoms along creek drainages. The county\'s timber market benefits from proximity to UF\'s forestry research programs and a network of independent loggers and timber buyers who service the region. Conservation easement programs are particularly active in Alachua County, and timber properties that qualify for the Florida Forever or Rural and Family Lands programs can generate tax benefits that materially improve overall investment returns.',
    'sumter-county':
      'Sumter County\'s timber market is defined by the tension between silvicultural production and The Villages\' insatiable appetite for developable land. Large timber tracts in the county\'s western and southern reaches — along CR 470 and south of SR 44 — still support commercial pine operations, but owners increasingly receive inquiries from residential developers seeking to acquire timberland for conversion. This dynamic creates a unique investment thesis: purchase productive timberland at forestry-based valuations, harvest current timber income, and hold for the development premium that materializes as The Villages continues its multi-decade expansion. Pine plantations near Bushnell and Webster remain viable timber operations, with local mills and pulpwood buyers providing consistent demand for harvested wood.',
  },

  // =========================================================================
  // SELF-STORAGE
  // =========================================================================
  'self-storage': {
    'ocala-fl':
      'Ocala\'s self-storage market is one of the strongest in North Central Florida, driven by rapid in-migration, a growing equestrian community with specialized storage needs, and a transient seasonal population associated with the World Equestrian Center. Facilities along SR 200, US 441, and near the I-75 interchanges benefit from high visibility and easy access. Climate-controlled units command premium rates in Ocala\'s hot, humid environment, and the equestrian sector generates unique demand for tack rooms, trailer storage, and equipment bays that most markets do not experience. Occupancy rates at well-managed Ocala facilities consistently exceed 90%, and new facility development has been absorbed quickly by the market\'s expanding population base.',
    'gainesville-fl':
      'Gainesville\'s self-storage market is uniquely influenced by the University of Florida\'s academic calendar. Each May and August, tens of thousands of students move in and out, creating predictable seasonal demand spikes for short-term storage. Beyond the student population, Gainesville\'s growing base of young professionals, Shands Hospital employees, and retirees generates year-round storage demand. Facilities near campus along SW Archer Road and NW 13th Street capture the student market, while suburban facilities in the Butler Plaza and Celebration Pointe areas serve conventional residential tenants. The city\'s high renter percentage — over 55% of households — correlates strongly with self-storage demand, as renters typically have less on-site storage space than homeowners.',
    'clermont-fl':
      'Clermont\'s self-storage market is supply-constrained relative to its explosive population growth. New residents arriving from the Orlando metro and other high-cost markets often require storage during home construction, downsizing, or the transition from renting to owning. The US 27 and SR 50 corridors have attracted modern, climate-controlled facilities, but demand continues to outpace new supply as South Lake County adds thousands of new households annually. Self-storage operators in Clermont benefit from a consumer base with above-average household incomes and the lifestyle-driven storage needs that come with lake recreation — boats, kayaks, jet skis, and outdoor equipment all require secure, accessible storage. The limited remaining commercial land along prime corridors ensures barriers to entry for new competitors.',
    'marion-county':
      'Marion County\'s self-storage market mirrors the county\'s population growth story: consistent expansion across the geographic footprint, with particular strength along the SR 200 corridor, near I-75 interchanges, and in the Belleview-Summerfield corridor in the southeastern part of the county. The county\'s demographics are particularly favorable for self-storage demand — downsizing retirees, newly arrived families in transition, military families from nearby bases, and the equestrian community all generate above-average per-capita storage consumption. Marion County\'s competitive land costs allow operators to build larger facilities with better unit mix and amenity packages than comparable builds in higher-cost markets, translating into superior per-square-foot returns and faster lease-up timelines.',
    'lake-county':
      'Lake County\'s self-storage demand is fueled by the county\'s extraordinary residential growth rate and the demographic mix of its new residents. In the south, Orlando commuters moving to Clermont, Groveland, and Minneola drive conventional self-storage demand. In the north, retirees influenced by The Villages\' expansion create a different demand profile — downsizing seniors who need long-term storage for furniture, collectibles, and seasonal items. Facilities along US 27, US 441, and Florida\'s Turnpike benefit from major-corridor visibility and regional accessibility. Lake County\'s position between two population growth poles means the self-storage market has multiple, independent demand drivers that reduce vacancy risk and support stable revenue growth.',
    'alachua-county':
      'Alachua County\'s self-storage market serves a diversified tenant base that includes UF students, hospital workers, military families from the region, and a growing population of remote workers and retirees drawn to Gainesville\'s quality of life. Facilities in the Gainesville urban core capture student and renter demand, while newer facilities along I-75 at Celebration Pointe and near the city of Alachua serve the county\'s expanding suburban population. The county\'s 280,000+ residents and high percentage of renters create a favorable demand-to-supply ratio for self-storage operators. Climate-controlled units are essential in this market, as Florida\'s humidity can damage furniture, documents, and electronics — tenants willingly pay a premium for temperature- and moisture-controlled environments.',
    'sumter-county':
      'Sumter County\'s self-storage market is one of the most compelling in Florida, driven by The Villages\' massive retirement population. Downsizing retirees who move from 3,000+ square-foot northern homes into 1,500-square-foot villa-style residences represent an enormous and recurring storage demand source. Additionally, golf cart storage, RV and boat storage, and seasonal items for snowbird residents who maintain dual residences all contribute to Sumter County\'s outsized per-capita storage demand. Existing facilities near The Villages\' town squares operate at near-full occupancy with waiting lists, and new development has been constrained by limited commercial-zoned land. For investors, self-storage in The Villages trade area offers sector-leading occupancy rates and the ability to command premium rents unmatched in the broader Central Florida market.',
  },

  // =========================================================================
  // ACREAGE
  // =========================================================================
  'acreage': {
    'ocala-fl':
      'Ocala\'s acreage market has been transformed by the World Equestrian Center, which has driven land values within a 15-mile radius to levels unseen in the region\'s history. Parcels along US 441 south toward Belleview, west along SR 200, and in the Farmland Preservation Area west of the city are among the most sought-after acreage listings in Central Florida. The city\'s position at the intersection of I-75 and US 441 provides acreage owners with unmatched transportation access for agricultural, equestrian, and commercial uses. Ocala\'s acreage buyers range from equestrian operators seeking turnkey horse farms to developers assembling land for residential communities that will house the region\'s surging population.',
    'gainesville-fl':
      'Acreage around Gainesville offers a distinct value proposition: large rural tracts within 30 minutes of a top-5 public university, a Level I trauma center, and a vibrant cultural scene. Properties south of Paynes Prairie along US 441, west toward Newberry along SR 26, and in the Archer-Monteocha corridor provide acreage at prices meaningfully below Marion County\'s WEC-influenced market. UF professors, physicians, and retirees seeking a rural lifestyle with urban access form a deep buyer pool. Agricultural acreage in Alachua County qualifies for Greenbelt tax exemptions, and conservation easement programs through the Florida Forever initiative provide additional financial incentives for landowners willing to protect large tracts from development.',
    'clermont-fl':
      'Acreage in the Clermont market occupies a shrinking inventory as South Lake County\'s residential development wave converts rural land to rooftops at an accelerating pace. Remaining parcels along CR 561, west of US 27 toward the Green Swamp, and in the Groveland-Mascotte corridor represent some of the last large tracts in the Orlando metro\'s western growth path. This scarcity drives premium pricing — acreage buyers in Clermont are often developers or investors who recognize that the finite supply of large parcels near Orlando\'s suburban edge will only become more valuable as the population grows. The rolling topography and chain-of-lakes setting give Clermont acreage a scenic character distinct from the flat pasturelands found further north.',
    'marion-county':
      'Marion County\'s 1,663 square miles offer one of the deepest acreage markets in Florida, with properties ranging from 5-acre mini-farms to 5,000+ acre cattle and timber tracts. The county\'s diverse geography — from the limestone ridges of the western horse country to the pine flatwoods east of the Ocala National Forest — supports a wide range of agricultural and recreational land uses. The county commission\'s Farmland Preservation Area zoning protects large tracts in the prime equestrian zone west of Ocala, while growth corridors along I-75 and SR 200 offer acreage with development potential. Marion County acreage consistently attracts both agricultural operators seeking productive land and investors positioning for long-term appreciation driven by the WEC effect and regional population growth.',
    'lake-county':
      'Lake County\'s acreage market reflects the tension between agricultural heritage and rapid residential growth. In the southern tier, large tracts are increasingly rare and command development-oriented pricing as builders seek land to serve Orlando commuters. In the central and northern parts of the county, acreage along CR 48, near the Ocala National Forest, and in the Lake Yale area remains more affordable and better suited to agricultural and recreational use. The Villages\' expansion into northern Lake County has lifted acreage values near Lady Lake and Fruitland Park, while Florida\'s Turnpike access adds value to properties positioned along major transportation corridors. Lake County acreage buyers span the spectrum from hobby farmers to national homebuilders seeking their next master-planned community site.',
    'alachua-county':
      'Alachua County offers some of the most affordable acreage within commuting distance of a major Florida university and research hospital. Western Alachua County — Newberry, Archer, and the Cross Creek area — features large parcels of productive farmland, pasture, and mixed-use acreage at prices well below Marion County\'s WEC-driven market. The county\'s 969 square miles provide ample inventory for buyers seeking 20 to 500+ acre tracts for cattle operations, timber management, conservation, or long-term investment. UF\'s IFAS Extension service offers technical support for landowners managing agricultural acreage, and the county\'s active conservation easement programs provide tax benefits for protecting large tracts. For investors, Alachua County acreage represents a value play relative to neighboring Marion County, with similar productive potential and growing demand.',
    'sumter-county':
      'Sumter County\'s acreage market is among the most dynamic in Florida, as The Villages\' expansion systematically converts agricultural and timber tracts into residential communities. Acreage in the development path — particularly along CR 470, west of US 301, and south of SR 44 — carries a significant premium reflecting its near-term conversion potential. Properties further from the development boundary, in the Webster-Center Hill area, remain priced closer to agricultural values and attract both working farmers and speculative investors. The county\'s rapid land conversion rate means today\'s 100-acre cattle pasture may be tomorrow\'s 250-lot residential subdivision, creating an investment dynamic where timing and location within the development path determine returns. Understanding The Villages\' expansion timeline is essential to pricing Sumter County acreage correctly.',
  },

  // =========================================================================
  // HUNTING-RECREATION
  // =========================================================================
  'hunting-recreation': {
    'ocala-fl':
      'Ocala\'s proximity to the Ocala National Forest — the southernmost national forest in the continental United States — makes it a premier base for hunting and recreational property ownership. Private tracts east of the city along SR 40 and CR 314 border the national forest, benefiting from wildlife corridors that support healthy populations of white-tailed deer, Osceola turkey, and feral hog. Spring-fed runs like Silver Springs and the Ocklawaha River add fishing and paddling opportunities. The Farmland Preservation Area west of Ocala also supports recreational properties where hunting leases supplement agricultural income. Buyers range from local sportsmen to out-of-state investors seeking a Florida hunting retreat with I-75 accessibility.',
    'gainesville-fl':
      'The Gainesville area offers hunting and recreational properties that benefit from adjacency to Paynes Prairie Preserve State Park, the Lochloosa Wildlife Management Area, and the vast Goethe State Forest to the west. Properties south of the city along US 441 toward Micanopy and Cross Creek provide access to some of the best bass fishing in Florida, with Orange Lake and Lochloosa Lake offering world-class largemouth habitat. The upland areas west of Gainesville along SR 26 feature mixed pine-hardwood habitat ideal for deer and turkey hunting. Recreational buyers in this market value the proximity to Gainesville\'s dining, cultural events, and UF sporting events — a combination of outdoor lifestyle and urban access that few Florida hunting markets can match.',
    'clermont-fl':
      'Hunting and recreational properties near Clermont are found in the transition zone between South Lake County\'s suburban development and the wilder landscapes of the Green Swamp and Withlacoochee State Forest to the north and west. Parcels along CR 33, north toward Howey-in-the-Hills, and west toward the Green Swamp wilderness preserve offer habitat for deer, turkey, and hog hunting within 45 minutes of Orlando. The chain of lakes in the Clermont area — including Lake Louisa, Lake Minnehaha, and the Clermont Chain — provide outstanding bass fishing and water recreation. The proximity to Orlando\'s 2.5 million residents creates strong demand for recreational retreats, and properties with lake frontage or public land adjacency command significant premiums.',
    'marion-county':
      'Marion County is one of Central Florida\'s most diverse hunting and recreational markets, with properties spanning the eastern pine flatwoods near the Ocala National Forest to the hardwood hammocks and creek bottoms of the western Withlacoochee River corridor. The county\'s 1,663 square miles support varied habitat types that sustain deer, turkey, hog, quail, and waterfowl populations. The Ocala National Forest\'s 400,000+ acres create a wildlife reservoir that benefits adjacent private lands, and the Cross Florida Greenway corridor provides additional public access for hiking and equestrian trails. Marion County recreational tracts often carry dual value — timber income from managed stands and recreational lease revenue from hunting clubs — making them productive assets beyond their lifestyle appeal.',
    'lake-county':
      'Lake County\'s hunting and recreational properties occupy the corridor between the Ocala National Forest to the north and the Green Swamp to the south, with the county\'s namesake lakes adding a water-recreation dimension not found in neighboring jurisdictions. The Paisley and Altoona areas in northeastern Lake County border the national forest and support deer, turkey, and hog hunting on mixed pine-palmetto habitat. The Lake Yale and Dora Canal areas offer some of the best freshwater fishing in Central Florida. Lake County\'s recreational market benefits from its accessibility — Florida\'s Turnpike and US 441 provide direct routes from the Orlando metro — making these properties practical weekend retreats for the region\'s large urban population.',
    'alachua-county':
      'Alachua County\'s hunting and recreational market benefits from the county\'s significant public land resources, including the Goethe State Forest, Paynes Prairie Preserve, and multiple wildlife management areas that create wildlife corridors benefiting private adjacent tracts. Western Alachua County\'s open prairies and pine flatwoods support deer and turkey populations, while the lake system around Newnan\'s Lake, Orange Lake, and Lochloosa provides outstanding waterfowl hunting and bass fishing. Recreational properties in the Cross Creek and Micanopy areas carry literary cachet — Marjorie Kinnan Rawlings wrote her Pulitzer Prize-winning novel here — adding cultural appeal to the outdoor lifestyle. Alachua County\'s affordable land prices relative to Marion County make it an accessible market for first-time recreational property buyers.',
    'sumter-county':
      'Sumter County\'s hunting and recreational market exists in an unusual dynamic where working recreational tracts coexist with the explosive growth of The Villages. The county\'s western and southern reaches — along CR 478 and south of the Withlacoochee River — still support genuine hunting properties with deer, turkey, and hog habitat on mixed pine-palmetto and oak hammock terrain. However, the advancing residential frontier means recreational tracts closer to The Villages carry a development premium that may eventually exceed their recreational value. For hunters seeking a Florida property with strong wildlife populations and reasonable proximity to Tampa and Orlando, Sumter County\'s remaining rural western corridor offers one of the last affordable entry points in the I-75/US 301 corridor.',
  },

  // =========================================================================
  // FARM-NURSERY
  // =========================================================================
  'farm-nursery': {
    'ocala-fl':
      'Ocala and its immediate surroundings have supported a productive farm and nursery sector for generations, with the city\'s central Florida location, mild climate, and fertile soils creating ideal growing conditions. Container nurseries along US 301 and SR 35 south of Ocala produce ornamental plants, palms, and shade trees that are shipped to landscape contractors throughout the Southeast. Hay farms on improved Bahia grass pastures west of the city supply the equestrian community\'s insatiable demand for quality forage — the WEC alone has intensified local hay demand dramatically. The Marion County Farmers Market and Farm Bureau provide marketing channels for smaller produce operations, and the county\'s Greenbelt exemption program keeps property taxes manageable for active agricultural operations.',
    'gainesville-fl':
      'The Gainesville area supports a distinctive farm and nursery sector that benefits from the University of Florida\'s world-renowned Institute of Food and Agricultural Sciences (IFAS). Research farms operated by UF test new crop varieties, integrated pest management techniques, and sustainable growing practices that local farmers and nursery operators adopt. Properties along SR 24 toward Archer and south along US 441 feature productive farmland suitable for row crops, specialty vegetables, and container nursery operations. The proximity to Gainesville\'s farmers markets and the city\'s health-conscious, locally-sourced food culture creates premium direct-sales channels for small farms. Alachua County\'s cooler microclimate compared to South Florida also enables certain crops that struggle further south.',
    'clermont-fl':
      'Clermont\'s farm and nursery heritage traces to its citrus roots — the city was once known as the Gem of the Hills for its orange groves covering the rolling South Lake County landscape. While freezes and residential development have reduced citrus acreage, farm and nursery operations continue along the US 27 corridor and in the less-developed areas west of the city toward the Green Swamp. Container nurseries producing landscape plants for Orlando\'s construction boom find Clermont\'s proximity to the metro area an ideal distribution position. Small-farm operations growing blueberries, specialty vegetables, and organic produce serve the affluent Clermont consumer base through farmers markets and community-supported agriculture programs. The area\'s sandy soils and rolling terrain require irrigation infrastructure but support excellent drainage for container nursery production.',
    'marion-county':
      'Marion County is one of Florida\'s most important agricultural jurisdictions, with farm and nursery operations spanning the county\'s 1,663 square miles. The county\'s diverse agricultural base includes over 80,000 acres in hay production (primarily Bahia grass for the equestrian industry), significant cattle operations, container and field nurseries, and specialty crop farms. The Florida Department of Agriculture recognizes Marion County as a leading producer of both livestock and ornamental horticulture products. Nursery operations benefit from the county\'s sandy loam soils, abundant well water from the Floridan Aquifer, and proximity to I-75 for shipping to markets in Tampa, Orlando, Jacksonville, and Atlanta. The county\'s agricultural infrastructure — including feed mills, equipment dealers, and fertilizer suppliers — supports efficient farm and nursery operations of all scales.',
    'lake-county':
      'Lake County\'s farm and nursery market bridges the citrus heritage of its past with the horticulture-driven present. While devastating freezes in the 1980s ended much of the county\'s citrus production, the industry pivoted to container nurseries, ferneries, and specialty crop operations that thrive in the same sandy, well-drained soils. The Apopka-Zellwood corridor just south of the county line remains one of Florida\'s most productive nursery regions, and operators in southern Lake County benefit from proximity to this established supply chain. Farms along SR 19 and CR 48 produce hay, cattle, and specialty crops for local and regional markets. The county\'s position on Florida\'s Turnpike provides efficient freight access to both Central and South Florida landscape and construction markets.',
    'alachua-county':
      'Alachua County\'s farm and nursery sector is distinguished by its connection to the University of Florida\'s agricultural research enterprise. UF\'s IFAS extension agents work directly with county farmers on soil management, pest control, and crop diversification strategies. The county\'s western reaches — from Newberry south through Archer and into the Monteocha area — feature productive farmland used for hay, cattle, row crops, and small-scale vegetable operations. Nursery operations in Alachua County range from native plant specialists serving the ecological restoration market to conventional container nurseries growing landscape material for the construction industry. The county\'s active agricultural community and proximity to Gainesville\'s health-conscious consumer market support farm-to-table operations and direct-sales channels that can generate premium revenue on relatively modest acreage.',
    'sumter-county':
      'Sumter County\'s farm and nursery market is defined by the collision between traditional agriculture and The Villages\' development machine. Historic farming operations along CR 470, in the Webster area, and west of US 301 continue to produce cattle, hay, sod, and nursery stock, but the land beneath them is appreciating at rates driven by residential development demand rather than agricultural productivity. Nursery operations in Sumter County have found a reliable customer in The Villages\' landscaping requirements — the community\'s golf courses, common areas, and individual homes consume enormous volumes of ornamental plants, sod, and shade trees. For farm and nursery operators, the strategic question is whether to continue agricultural operations or capture the development premium. For investors, Sumter County farm properties offer the agricultural exemption tax benefit while appreciating toward their inevitable residential conversion value.',
  },

  // =========================================================================
  // COMMERCIAL (general)
  // =========================================================================
  'commercial': {
    'ocala-fl':
      'Ocala\'s commercial real estate market has diversified significantly since the World Equestrian Center\'s opening, with the SR 200 corridor, US 441/US 301 spine, and the I-75 interchange areas forming the city\'s three primary commercial nodes. Retail, office, medical, and hospitality properties are all experiencing tightening vacancy and rising rents as the market absorbs the WEC\'s multiplier effect. National tenants — from Wawa and Aldi to AdventHealth and HCA — continue expanding their Ocala footprints. The city\'s commercial lease rates remain 30-50% below Orlando and Tampa, attracting cost-conscious businesses while still generating attractive yields for investors. Downtown Ocala\'s historic square district has emerged as a boutique commercial submarket popular with restaurants, specialty retail, and creative office tenants.',
    'gainesville-fl':
      'Gainesville\'s commercial real estate market is fundamentally shaped by the University of Florida, which creates a stable demand base for all commercial property types. The SW Archer Road/Butler Plaza corridor is the city\'s primary retail destination, while Celebration Pointe has introduced a modern mixed-use format with national retail tenants, Class A office, and restaurants. Medical commercial properties — clinics, surgical centers, and specialty practices — cluster near UF Health Shands and along major corridors. The Innovation Hub area supports tech-oriented commercial space for startups. Gainesville\'s commercial market offers investors a rare combination of institutional demand stability and yield premiums over larger Florida metros, making it attractive for both local and out-of-state capital.',
    'clermont-fl':
      'Clermont\'s commercial market is racing to keep pace with one of the fastest-growing residential markets in the Orlando MSA. The US 27 and SR 50 corridors are the city\'s commercial arteries, with pad sites, shopping centers, and medical facilities absorbing quickly as national tenants chase the expanding rooftop count. Commercial vacancy in South Lake County is among the lowest in the region, and lease rates have climbed steadily as demand outstrips supply. The city\'s challenge is a good one for investors: too many consumers and not enough commercial space. Healthcare, dining, convenience retail, and professional services are all underrepresented relative to the population, creating a strong pipeline of new commercial development opportunities along the primary corridors.',
    'marion-county':
      'Marion County\'s commercial market spans a diverse geography, from the established SR 200 commercial corridor and downtown Ocala core to emerging nodes along I-75 interchanges and the SE US 441 corridor toward The Villages. The county\'s 390,000+ population and above-average growth rate support commercial demand across all property types: retail, office, medical, industrial, and hospitality. The WEC has been particularly catalytic for the commercial market, driving new hotel development, restaurant openings, and ancillary service businesses that did not exist before 2021. Marion County\'s competitive tax environment and cooperative development review process make it accessible for both local entrepreneurs and national commercial operators expanding into the region.',
    'lake-county':
      'Lake County\'s commercial market benefits from its position between the Orlando metro and the Ocala-Gainesville corridor, capturing growth from both directions. The southern tier around Clermont and Groveland is the county\'s commercial hotspot, with national retailers, restaurants, and healthcare operators competing for space along US 27 and SR 50. Central Lake County — anchored by Leesburg, Eustis, and the county seat of Tavares — maintains a stable commercial base supported by local government, AdventHealth Waterman hospital, and the service economy. Northern Lake County benefits from Villages spillover, with commercial development along US 441 near Lady Lake serving the retirement community\'s consumer needs. Florida\'s Turnpike access enhances the commercial appeal of properties along the county\'s eastern edge.',
    'alachua-county':
      'Alachua County\'s commercial real estate market is anchored by the institutional demand generated by the University of Florida and UF Health, but extends into suburban growth corridors that are diversifying the county\'s commercial inventory. Celebration Pointe, Butler Town Center, and the Innovation District represent modern commercial developments that have attracted national tenants and elevated the market\'s profile. The city of Alachua, along US 441 north of Gainesville, is emerging as a secondary commercial node driven by Progress Corporate Park employers and new residential growth. Alachua County\'s educated workforce, quality of life, and institutional stability attract commercial tenants who might otherwise locate in Jacksonville or Tampa, and vacancy rates across commercial property types remain consistently below state averages.',
    'sumter-county':
      'Sumter County\'s commercial market is arguably the most supply-constrained in Central Florida, and the imbalance between The Villages\' massive consumer spending power and the limited commercial inventory creates extraordinary opportunities. The town squares within The Villages are fully built-out and operate at maximum occupancy with premium rents. Commercial properties along US 301 in Wildwood and at key intersections throughout the county trade at values that reflect the guaranteed demand from 130,000+ retirees with high disposable incomes. For investors and developers, the challenge is finding available commercial-zoned land and navigating the entitlement process in a county where residential development has far outpaced commercial construction. Medical, retail, and convenience-oriented commercial properties in The Villages trade area consistently outperform broader market benchmarks.',
  },

  // =========================================================================
  // BELOW: Fallback types — equestrian, retail, residential-development, warehouse
  // These are handled by the fallback logic in getGeoPageContent.
  // We intentionally do NOT put them in locationAngles. The function will
  // compose content from the location\'s marketContext fields.
  // =========================================================================
};

// ---------------------------------------------------------------------------
// Category label helpers
// ---------------------------------------------------------------------------

function getCategoryLabel(category: 'land' | 'commercial'): string {
  return category === 'land' ? 'Land' : 'Commercial';
}

function getCategorySlug(category: 'land' | 'commercial'): string {
  return category === 'land' ? 'land' : 'commercial';
}

// ---------------------------------------------------------------------------
// Fallback angle generator for types without hand-crafted angles.
// Composes a unique paragraph from the location\'s marketContext fields,
// tailored to the property type.
// ---------------------------------------------------------------------------

function buildFallbackAngle(propertyType: PropertyType, location: Location): string {
  const ctx = location.marketContext;
  const typeName = propertyType.title.toLowerCase();

  if (propertyType.slug === 'equestrian') {
    return (
      ctx.economicDrivers.split('. ').slice(0, 2).join('. ') +
      '. The equestrian property market in ' +
      location.name +
      ' benefits from ' +
      (location.isCity
        ? 'the city\'s accessible location and established infrastructure that supports horse operations of all sizes.'
        : 'the county\'s diverse geography and agricultural heritage that support equestrian operations ranging from small hobby farms to large-scale training facilities.') +
      ' ' +
      ctx.geographicAdvantage.split('. ').slice(0, 1).join('. ') +
      ', making ' +
      location.shortName +
      ' a practical base for equestrian buyers seeking connectivity to competitions and veterinary services throughout the region.'
    );
  }

  if (propertyType.slug === 'retail') {
    return (
      ctx.growthNarrative.split('. ').slice(0, 2).join('. ') +
      '. This population momentum drives robust demand for retail space in ' +
      location.name +
      ', as national and regional tenants expand to capture the growing consumer base. ' +
      ctx.investmentClimate.split('. ').slice(0, 1).join('. ') +
      ', creating a favorable environment for retail property investment and development across ' +
      location.shortName +
      '\'s primary commercial corridors.'
    );
  }

  if (propertyType.slug === 'residential-development') {
    return (
      ctx.growthNarrative.split('. ').slice(0, 2).join('. ') +
      '. This growth trajectory has made ' +
      location.name +
      ' one of the most active residential development markets in Central Florida, with national and regional homebuilders competing for entitled land and finished lots. ' +
      ctx.geographicAdvantage.split('. ').slice(0, 1).join('. ') +
      ', ensuring that new residential communities in ' +
      location.shortName +
      ' offer buyers the transportation access and lifestyle amenities that drive strong absorption.'
    );
  }

  // warehouse
  return (
    ctx.geographicAdvantage.split('. ').slice(0, 2).join('. ') +
    '. This strategic positioning makes ' +
    location.name +
    ' increasingly attractive for warehouse and distribution operations that need efficient access to Florida\'s major consumer markets. ' +
    ctx.economicDrivers.split('. ').slice(0, 1).join('. ') +
    ', and the resulting employment base generates demand for ' +
    typeName +
    ' space across ' +
    location.shortName +
    '\'s primary transportation corridors.'
  );
}

// ---------------------------------------------------------------------------
// Subtitle templates per property type slug
// ---------------------------------------------------------------------------

function buildSubtitle(propertyType: PropertyType, location: Location): string {
  const loc = location.name;

  const subtitleMap: Record<string, string> = {
    'acreage': 'Explore acreage properties for sale in ' + loc + ' — large tracts for agriculture, development, and long-term investment.',
    'commercial': 'Full-service commercial real estate solutions in ' + loc + ' for retail, office, industrial, and investment properties.',
    'equestrian': 'Premier horse farms and equestrian estates for sale in ' + loc + ', the heart of Florida\'s equestrian country.',
    'farm-nursery': 'Productive farm and nursery properties for sale in ' + loc + ' — from row crop operations to container nurseries.',
    'hunting-recreation': 'Hunting tracts and recreational land for sale in ' + loc + ' with diverse wildlife habitat and outdoor recreation.',
    'industrial': 'Industrial properties and sites for sale and lease in ' + loc + ' along Central Florida\'s premier logistics corridors.',
    'multi-family': 'Multi-family investment opportunities in ' + loc + ' — apartment complexes and development sites in a high-growth market.',
    'office': 'Office properties for sale and lease in ' + loc + ' — medical, professional, and Class A space for growing businesses.',
    'ranch': 'Working cattle ranches and lifestyle estates for sale in ' + loc + ' — Central Florida\'s premier ranching country.',
    'retail': 'Retail properties and pad sites for sale and lease in ' + loc + ' along high-traffic commercial corridors.',
    'residential-development': 'Residential development land and entitled sites for sale in ' + loc + ' for homebuilders and developers.',
    'self-storage': 'Self-storage properties and development sites for sale in ' + loc + ' — one of Central Florida\'s strongest storage markets.',
    'timber': 'Managed timberland and timber properties for sale in ' + loc + ' with income potential and long-term appreciation.',
    'triple-net-nnn': 'Triple net NNN investment properties for sale in ' + loc + ' — passive income backed by creditworthy tenants.',
    'warehouse': 'Warehouse and distribution properties for sale and lease in ' + loc + ' with strategic access to major freight corridors.',
  };

  return subtitleMap[propertyType.slug] || propertyType.subtitle;
}

// ---------------------------------------------------------------------------
// Intro paragraph builders
// ---------------------------------------------------------------------------

function buildIntroP1(propertyType: PropertyType, location: Location): string {
  const typeName = propertyType.title.toLowerCase();
  const short = location.shortName;

  // City-specific openers
  if (location.slug === 'ocala-fl') {
    return short + ', the Horse Capital of the World and Marion County\'s economic hub, offers an exceptional market for ' + typeName + ' properties. Anchored by the World Equestrian Center and positioned at the crossroads of I-75 and US 441, Ocala combines strong growth fundamentals with a business-friendly environment that attracts ' + typeName + ' buyers and investors from across the state and nation.';
  }
  if (location.slug === 'gainesville-fl') {
    return short + ', home to the University of Florida and UF Health Shands Hospital, provides a uniquely stable foundation for ' + typeName + ' real estate. The city\'s knowledge-based economy, educated workforce, and consistent institutional demand create opportunities for ' + typeName + ' properties that are insulated from the volatility of purely growth-dependent markets.';
  }
  if (location.slug === 'clermont-fl') {
    return short + ' has emerged as one of the fastest-growing cities in the Orlando metro area, and its ' + typeName + ' market reflects that momentum. Located along the US 27 and SR 50 corridors in South Lake County, Clermont offers ' + typeName + ' buyers and investors access to a rapidly expanding consumer and employment base with direct connections to the broader Orlando region.';
  }
  if (location.slug === 'marion-county') {
    return short + ', spanning 1,663 square miles of diverse Central Florida landscape, offers one of the region\'s deepest markets for ' + typeName + ' properties. From the I-75 growth corridor to the rural interior, Marion County\'s ' + typeName + ' inventory serves a wide range of buyers seeking exposure to one of Florida\'s fastest-growing jurisdictions.';
  }
  if (location.slug === 'lake-county') {
    return short + ' sits at the convergence of two powerful growth forces: the Orlando metro\'s northward expansion and The Villages\' southward reach. This dual growth dynamic creates a compelling ' + typeName + ' market with opportunities spanning the county\'s diverse geography from the rolling hills of Clermont to the lakefront communities of Leesburg and Tavares.';
  }
  if (location.slug === 'alachua-county') {
    return short + ', anchored by the University of Florida and spanning 969 square miles of diverse terrain, offers a ' + typeName + ' market that balances institutional stability with rural opportunity. The county\'s ' + typeName + ' properties benefit from the recession-resistant demand generated by a top-5 public university and a Level I trauma center while providing access to affordable land and a high quality of life.';
  }
  // sumter-county
  return short + ', home to The Villages — the largest age-restricted retirement community in the United States — presents a ' + typeName + ' market unlike any other in Florida. The community\'s 130,000+ retirees generate extraordinary consumer demand and development pressure that define the ' + typeName + ' opportunity across the county.';
}

function buildIntroP3(propertyType: PropertyType, location: Location): string {
  const typeName = propertyType.title.toLowerCase();
  const loc = location.name;
  const short = location.shortName;

  return 'SVN McDonald & Company brings deep local expertise and the resources of the national SVN platform to every ' + typeName + ' transaction in ' + loc + '. Our advisors combine granular market knowledge of the ' + short + ' area with access to SVN\'s network of 200+ offices and 2,000+ advisors, ensuring maximum exposure for sellers and comprehensive market intelligence for buyers. Contact our team to discuss ' + typeName + ' opportunities in ' + loc + ' today.';
}

// ---------------------------------------------------------------------------
// Location highlights builder
// ---------------------------------------------------------------------------

function buildLocationHighlights(
  propertyType: PropertyType,
  location: Location
): { title: string; description: string }[] {
  const typeName = propertyType.title.toLowerCase();

  // Location-specific highlight sets
  const highlightSets: Record<string, Record<string, { title: string; description: string }[]>> = {
    'ocala-fl': {
      _default: [
        { title: 'WEC Economic Catalyst', description: 'The World Equestrian Center generates billions in annual economic impact, driving demand for ' + typeName + ' properties throughout the Ocala market.' },
        { title: 'I-75 / US 441 Crossroads', description: 'Ocala\'s position at the intersection of I-75 and US 441 provides direct access to Tampa, Orlando, Jacksonville, and the broader Southeast.' },
        { title: 'No State Income Tax', description: 'Florida\'s zero state income tax policy, combined with Marion County\'s competitive millage rates, enhances investment returns for ' + typeName + ' property owners.' },
      ],
    },
    'gainesville-fl': {
      _default: [
        { title: 'University of Florida Anchor', description: 'UF\'s 60,000+ students and 30,000+ employees create a recession-resistant demand base for ' + typeName + ' properties in the Gainesville market.' },
        { title: 'Healthcare Hub', description: 'UF Health Shands Hospital and the growing network of affiliated practices drive demand for ' + typeName + ' properties, particularly in the medical and professional services sectors.' },
        { title: 'Innovation Economy', description: 'UF\'s Innovation Hub and Sid Martin Biotech Incubator produce high-growth companies that generate demand for ' + typeName + ' space in Gainesville.' },
      ],
    },
    'clermont-fl': {
      _default: [
        { title: 'Orlando Metro Access', description: 'Clermont\'s location along SR 50 and US 27 provides direct access to the Orlando metro area, including Florida\'s Turnpike and the Western Beltway (SR 429).' },
        { title: 'Explosive Growth', description: 'South Lake County\'s population has doubled in 15 years, creating sustained demand for ' + typeName + ' properties across all price points.' },
        { title: 'Lifestyle Appeal', description: 'Clermont\'s rolling hills, chain of lakes, and proximity to Disney World and Universal Studios attract families and retirees who drive ' + typeName + ' demand.' },
      ],
    },
    'marion-county': {
      _default: [
        { title: '1,663 Square Miles of Opportunity', description: 'Marion County\'s vast geographic footprint offers ' + typeName + ' properties across diverse settings, from urban corridors to rural landscapes.' },
        { title: 'Population Exceeding 390,000', description: 'Rapid population growth drives demand for ' + typeName + ' properties as the county adds thousands of new residents annually.' },
        { title: 'Pro-Business Government', description: 'Marion County\'s business-friendly commission, streamlined permitting, and competitive tax rates create a favorable environment for ' + typeName + ' investment.' },
      ],
    },
    'lake-county': {
      _default: [
        { title: 'Dual Growth Drivers', description: 'Orlando commuter expansion from the south and Villages spillover from the north create ' + typeName + ' demand across Lake County\'s entire geographic footprint.' },
        { title: 'Turnpike & US 27 Access', description: 'Florida\'s Turnpike and US 27 provide efficient north-south transportation connectivity for ' + typeName + ' properties throughout the county.' },
        { title: 'Population Exceeding 400,000', description: 'Lake County\'s rapidly growing population generates sustained demand for ' + typeName + ' properties at all price levels.' },
      ],
    },
    'alachua-county': {
      _default: [
        { title: 'Institutional Stability', description: 'The University of Florida and UF Health provide recession-resistant demand for ' + typeName + ' properties, insulating Alachua County from cyclical market swings.' },
        { title: 'Educated Workforce', description: 'Alachua County\'s highly educated population attracts employers and drives demand for ' + typeName + ' properties across professional, technology, and healthcare sectors.' },
        { title: 'Affordable Entry Point', description: typeName.charAt(0).toUpperCase() + typeName.slice(1) + ' properties in Alachua County offer compelling value relative to neighboring Marion County and larger Florida metros.' },
      ],
    },
    'sumter-county': {
      _default: [
        { title: 'Villages Consumer Spending', description: 'The Villages\' 130,000+ retirees generate per-capita consumer spending that far exceeds regional averages, driving demand for ' + typeName + ' properties.' },
        { title: 'Fastest-Growing County', description: 'Sumter County has been among the fastest-growing counties in the entire United States for over a decade, fueling ' + typeName + ' demand.' },
        { title: 'Supply-Constrained Market', description: 'Commercial and land development has not kept pace with residential growth, creating scarcity-driven value for ' + typeName + ' properties in the county.' },
      ],
    },
  };

  const locHighlights = highlightSets[location.slug];
  if (locHighlights) {
    // Check for type-specific highlights first, then fall back to default
    return locHighlights[propertyType.slug] || locHighlights['_default'] || [];
  }
  return [];
}

// ---------------------------------------------------------------------------
// Main export function
// ---------------------------------------------------------------------------

export function getGeoPageContent(
  propertyType: PropertyType,
  location: Location
): GeoPageContent {
  const typeSlug = propertyType.slug;
  const locSlug = location.slug;
  const typeName = propertyType.title;
  const locName = location.name;
  const short = location.shortName;
  const county = location.county;
  const isCity = location.isCity;
  const category = propertyType.category;
  const categoryLabel = getCategoryLabel(category);
  const categorySlugStr = getCategorySlug(category);

  // SEO title
  const seoTitle = isCity
    ? typeName + ' Properties for Sale in ' + locName + ' | ' + county
    : typeName + ' Properties for Sale in ' + locName;

  // SEO description (~155 chars)
  const seoDescriptionMap: Record<string, string> = {
    'acreage': 'Browse acreage properties for sale in ' + locName + '. SVN McDonald & Company specializes in large land parcels for agriculture, development, and investment in ' + short + '.',
    'commercial': 'Explore commercial real estate in ' + locName + '. SVN McDonald & Company offers retail, office, industrial, and investment properties with expert brokerage in ' + short + '.',
    'equestrian': 'Find equestrian properties and horse farms for sale in ' + locName + '. SVN McDonald specializes in premier equestrian real estate in ' + short + '.',
    'farm-nursery': 'Browse farm and nursery properties for sale in ' + locName + '. SVN McDonald specializes in agricultural operations and nursery facilities in ' + short + '.',
    'hunting-recreation': 'Discover hunting and recreation properties for sale in ' + locName + '. SVN McDonald offers premier hunting tracts and outdoor lifestyle properties in ' + short + '.',
    'industrial': 'Find industrial properties for sale and lease in ' + locName + '. SVN McDonald offers warehouses, manufacturing facilities, and distribution space in ' + short + '.',
    'multi-family': 'Explore multi-family properties and apartment investments in ' + locName + '. SVN McDonald offers apartment complexes and development opportunities in ' + short + '.',
    'office': 'Browse office properties for sale and lease in ' + locName + '. SVN McDonald offers medical, professional, and Class A office space throughout ' + short + '.',
    'ranch': 'Find ranch properties for sale in ' + locName + '. SVN McDonald specializes in working cattle ranches, lifestyle estates, and large ranch land in ' + short + '.',
    'retail': 'Explore retail properties for sale and lease in ' + locName + '. SVN McDonald offers shopping centers, NNN retail, and pad sites along high-traffic corridors in ' + short + '.',
    'residential-development': 'Find residential development land for sale in ' + locName + '. SVN McDonald offers finished lots, entitled land, and development sites for homebuilders in ' + short + '.',
    'self-storage': 'Discover self-storage properties and development sites in ' + locName + '. SVN McDonald specializes in self-storage investments and facility transactions in ' + short + '.',
    'timber': 'Browse timber properties and managed timberland for sale in ' + locName + '. SVN McDonald offers pine plantations, hardwood tracts, and timber investment in ' + short + '.',
    'triple-net-nnn': 'Explore triple net NNN investment properties for sale in ' + locName + '. SVN McDonald offers single-tenant NNN properties with stable, passive income in ' + short + '.',
    'warehouse': 'Find warehouse and distribution properties for sale and lease in ' + locName + '. SVN McDonald offers logistics facilities along major corridors in ' + short + '.',
  };

  const seoDescription = seoDescriptionMap[typeSlug] || 'Browse ' + typeName.toLowerCase() + ' properties for sale in ' + locName + '. SVN McDonald & Company specializes in ' + typeName.toLowerCase() + ' real estate in ' + short + '.';

  // H1
  const h1Title = typeName + ' Properties in';
  const h1Highlighted = locName;

  // Subtitle
  const subtitle = buildSubtitle(propertyType, location);

  // Intro paragraphs
  const introP1 = buildIntroP1(propertyType, location);

  // P2: The local angle — hand-crafted or fallback
  let introP2: string;
  const typeAngles = locationAngles[typeSlug];
  if (typeAngles && typeAngles[locSlug]) {
    introP2 = typeAngles[locSlug];
  } else {
    introP2 = buildFallbackAngle(propertyType, location);
  }

  const introP3 = buildIntroP3(propertyType, location);

  // Location highlights
  const locationHighlights = buildLocationHighlights(propertyType, location);

  // Parent type URL
  const parentTypeUrl = BASE_URL + '/properties/' + categorySlugStr + '/' + typeSlug;

  // Breadcrumbs
  const breadcrumbs = [
    { name: 'Home', url: BASE_URL },
    { name: categoryLabel + ' Properties', url: BASE_URL + '/properties/' + categorySlugStr },
    { name: typeName + ' Properties', url: parentTypeUrl },
    { name: typeName + ' in ' + locName, url: parentTypeUrl + '/' + locSlug },
  ];

  return {
    seoTitle,
    seoDescription,
    h1Title,
    h1Highlighted,
    subtitle,
    introParagraphs: [introP1, introP2, introP3],
    locationHighlights,
    parentTypeUrl,
    breadcrumbs,
  };
}
