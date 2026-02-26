export interface PropertyTypeFeature {
  title: string;
  description: string;
}

export interface PropertyType {
  slug: string;
  title: string;
  highlightedText: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  intro: string[];
  features: PropertyTypeFeature[];
  buildoutType: 'inventory';
  category: 'land' | 'commercial';
}

export const propertyTypes: PropertyType[] = [
  {
    slug: 'acreage',
    title: 'Acreage',
    highlightedText: 'Properties',
    subtitle: 'Expansive land parcels in Central Florida for agriculture, development, and long-term investment.',
    seoTitle: 'Acreage Properties for Sale in Ocala & Central Florida',
    seoDescription: 'Browse acreage properties for sale in Ocala, Marion County, and Central Florida. SVN McDonald & Company specializes in large land parcels for agriculture, development, and investment.',
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2664&q=80',
    intro: [
      'Central Florida offers some of the most compelling acreage opportunities in the southeastern United States. From rolling pasturelands in Marion County to expansive tracts along the I-75 growth corridor, acreage properties represent a cornerstone of the region\'s real estate market. Whether you are seeking land for agricultural operations, future residential development, or strategic long-term investment, the Ocala metro area delivers a rare combination of affordability, accessibility, and growth potential.',
      'The World Equestrian Center\'s arrival in 2021 has fundamentally reshaped the acreage landscape within a 15-mile radius of the facility. Land values in prime locations have increased by over 200%, and demand for large parcels continues to outpace supply. Properties with frontage on major corridors like US 27, SR 200, and SR 326 command premium pricing as both agricultural operators and developers compete for strategically positioned acreage.',
      'SVN McDonald & Company has brokered some of the region\'s most significant acreage transactions, leveraging decades of local expertise and the national SVN platform to connect sellers with qualified buyers. Our deep understanding of zoning, land use regulations, environmental constraints, and market trends ensures our clients make informed decisions on every acreage acquisition or disposition.'
    ],
    features: [
      { title: 'Agricultural Potential', description: 'Marion County\'s fertile soils and mild climate support cattle ranching, hay production, timber, and specialty crops year-round.' },
      { title: 'Development Upside', description: 'Transitional acreage near growth corridors offers significant long-term appreciation as the Ocala metro area expands.' },
      { title: 'WEC Proximity Premium', description: 'Parcels within the World Equestrian Center influence zone have seen dramatic value increases since 2021.' },
      { title: 'Tax Advantages', description: 'Agricultural exemptions and conservation easement programs can significantly reduce the carrying cost of large acreage holdings.' },
      { title: 'Water Resources', description: 'Central Florida\'s aquifer system and abundant rainfall provide reliable water access for agricultural and equestrian operations.' },
      { title: 'I-75 Corridor Access', description: 'Strategic proximity to Interstate 75 provides connectivity to Tampa, Orlando, Jacksonville, and beyond.' }
    ],
    buildoutType: 'inventory',
    category: 'land',
  },
  {
    slug: 'commercial',
    title: 'Commercial',
    highlightedText: 'Properties',
    subtitle: 'Full-service commercial real estate solutions for retail, office, industrial, and investment properties in Central Florida.',
    seoTitle: 'Commercial Properties for Sale & Lease in Ocala & Central Florida',
    seoDescription: 'Explore commercial real estate listings in Ocala, Marion County, and Central Florida. SVN McDonald offers retail, office, industrial, and investment properties with expert brokerage services.',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2300&q=80',
    intro: [
      'Ocala and the greater Central Florida region have emerged as one of the state\'s most dynamic commercial real estate markets. Fueled by population growth, infrastructure investment, and the transformative economic impact of the World Equestrian Center, commercial property demand across all sectors continues to accelerate. From established retail corridors along SR 200 to emerging industrial parks near I-75 interchanges, opportunities abound for investors, tenants, and developers.',
      'The Central Florida commercial market benefits from a diversified economic base that includes healthcare, logistics, equestrian industry, manufacturing, and tourism. Marion County\'s pro-business environment, competitive tax structure, and absence of a state income tax make it an attractive destination for businesses relocating from higher-cost markets. These fundamentals translate into strong occupancy rates, rising rental income, and healthy cap rates across commercial property types.',
      'SVN McDonald & Company provides comprehensive commercial brokerage services, from property valuation and strategic marketing to lease negotiation and transaction management. Our advisors combine granular local market knowledge with the resources of the SVN national platform, ensuring maximum exposure and optimal outcomes for every commercial property transaction.'
    ],
    features: [
      { title: 'Diverse Property Types', description: 'Access to retail, office, industrial, medical, and mixed-use commercial properties throughout the region.' },
      { title: 'Strong Market Fundamentals', description: 'Population growth, job creation, and business-friendly policies drive consistent demand for commercial space.' },
      { title: 'National SVN Network', description: 'Leverage 200+ offices and 2,000+ advisors nationwide for maximum buyer and tenant exposure.' },
      { title: 'Competitive Cap Rates', description: 'Central Florida commercial properties offer attractive yields compared to South Florida and other major metros.' },
      { title: 'Infrastructure Growth', description: 'I-75 widening, interchange improvements, and new road construction create emerging commercial nodes.' },
      { title: 'Lease Tax Advantage', description: 'Florida\'s declining commercial lease sales tax rate provides meaningful savings for tenants and landlords.' }
    ],
    buildoutType: 'inventory',
    category: 'commercial',
  },
  {
    slug: 'equestrian',
    title: 'Equestrian',
    highlightedText: 'Properties',
    subtitle: 'Premier horse farms and equestrian estates in the Horse Capital of the World.',
    seoTitle: 'Equestrian Properties & Horse Farms for Sale in Ocala, FL',
    seoDescription: 'Find equestrian properties and horse farms for sale in Ocala, the Horse Capital of the World. SVN McDonald specializes in premier equestrian real estate near the World Equestrian Center.',
    heroImage: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80',
    intro: [
      'Ocala, Florida is recognized worldwide as the Horse Capital of the World, and for good reason. The region\'s unique No. 8 limestone-rich soil produces strong, healthy bones in horses, while the mild subtropical climate allows year-round training and competition. With the opening of the World Equestrian Center in January 2021, Ocala has cemented its position as the premier destination for equestrian real estate in the United States.',
      'The equestrian property market in Marion County encompasses everything from turnkey training facilities with covered arenas and dozens of stalls to pastoral farms with rolling pastures and mature oak canopy. Properties near the WEC and the established Farmland Preservation Area command significant premiums, with values increasing dramatically since the center\'s opening. Buyers range from professional riders and trainers to lifestyle purchasers and investors seeking exposure to this unique asset class.',
      'SVN McDonald & Company understands the specialized requirements of equestrian properties better than any brokerage in the region. Our team evaluates soil quality, pasture condition, barn configurations, arena specifications, water access, and proximity to competition venues to accurately price and market these distinctive properties. Whether you are buying or selling, our expertise ensures you make the right move in this extraordinary market.'
    ],
    features: [
      { title: 'World Equestrian Center Access', description: 'Proximity to the $1 billion+ WEC facility, hosting year-round hunter/jumper, dressage, and western competitions.' },
      { title: 'Legendary Soil Quality', description: 'Marion County\'s No. 8 limestone soil is prized worldwide for developing strong equine bone structure.' },
      { title: 'Year-Round Training Climate', description: 'Mild winters and manageable summers allow uninterrupted training and competition schedules.' },
      { title: 'Established Infrastructure', description: 'Equine veterinary clinics, farriers, feed suppliers, and transportation services create a complete ecosystem.' },
      { title: 'Farmland Preservation Area', description: 'Protected zoning districts ensure the long-term viability of equestrian operations and rural character.' },
      { title: 'Global Buyer Network', description: 'SVN\'s international reach connects sellers with qualified equestrian buyers worldwide.' }
    ],
    buildoutType: 'inventory',
    category: 'land',
  },
  {
    slug: 'farm-nursery',
    title: 'Farm and Nursery',
    highlightedText: 'Properties',
    subtitle: 'Productive agricultural operations and nursery facilities across Central Florida.',
    seoTitle: 'Farm & Nursery Properties for Sale in Ocala & Central Florida',
    seoDescription: 'Browse farm and nursery properties for sale in Ocala and Central Florida. SVN McDonald specializes in agricultural operations, plant nurseries, and productive farmland in Marion County.',
    heroImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80',
    intro: [
      'Central Florida\'s agricultural heritage runs deep, and the region continues to support a thriving farm and nursery sector. Marion County\'s combination of fertile soils, abundant rainfall, mild winters, and proximity to major distribution routes makes it an ideal location for diverse agricultural operations. From row crop farms and cattle operations to ornamental plant nurseries and specialty growers, the area offers productive opportunities at prices well below South Florida comparables.',
      'The nursery industry in particular has flourished in Central Florida, benefiting from the state\'s massive landscape and construction markets. Container nurseries, field-grown tree farms, and sod operations generate strong revenue streams on relatively modest acreage. Meanwhile, traditional farming operations producing hay, cattle, vegetables, and citrus continue to anchor the rural economy and provide stable income for landowners.',
      'SVN McDonald & Company brings specialized knowledge of agricultural property valuation, including crop yield analysis, soil productivity assessments, irrigation infrastructure evaluation, and agricultural exemption considerations. Our team helps buyers identify the right farm or nursery property and assists sellers in positioning their agricultural assets for maximum market value.'
    ],
    features: [
      { title: 'Fertile Growing Conditions', description: 'Sandy loam soils, 50+ inches of annual rainfall, and a long growing season support diverse agricultural operations.' },
      { title: 'Nursery Industry Hub', description: 'Central Florida is a top nursery production region, supplying ornamental plants and trees across the Southeast.' },
      { title: 'Agricultural Tax Exemptions', description: 'Qualified farm and nursery operations benefit from significant property tax reductions under Florida\'s Greenbelt Law.' },
      { title: 'Distribution Advantages', description: 'I-75 and US 301 provide efficient shipping routes to markets in Tampa, Orlando, Jacksonville, and Atlanta.' },
      { title: 'Water Availability', description: 'Access to the Floridan Aquifer and surface water resources supports irrigation-intensive nursery and farm operations.' },
      { title: 'Diversification Options', description: 'Agritourism, U-pick operations, and equestrian boarding provide supplemental revenue streams for farm properties.' }
    ],
    buildoutType: 'inventory',
    category: 'land',
  },
  {
    slug: 'hunting-recreation',
    title: 'Hunting and Recreation',
    highlightedText: 'Properties',
    subtitle: 'Premier hunting tracts and recreational land in Central Florida\'s most scenic landscapes.',
    seoTitle: 'Hunting & Recreation Properties for Sale in Central Florida',
    seoDescription: 'Discover hunting and recreation properties for sale in Ocala and Central Florida. SVN McDonald offers premier hunting tracts, recreational land, and outdoor lifestyle properties in Marion County.',
    heroImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80',
    intro: [
      'Central Florida offers some of the finest hunting and recreational properties in the state, combining diverse wildlife habitat with accessible locations just minutes from urban amenities. The region\'s mosaic of hardwood hammocks, pine flatwoods, cypress swamps, and open prairies creates ideal conditions for white-tailed deer, wild turkey, feral hog, and waterfowl hunting. Properties near the Ocala National Forest and the Withlacoochee State Forest benefit from adjacency to vast public lands that enhance wildlife movement and population density.',
      'Beyond hunting, recreational properties in the Ocala region serve as retreats for fishing, hiking, horseback riding, ATV use, and family gatherings. Many tracts feature spring-fed creeks, natural ponds, or river frontage that add both recreational value and aesthetic appeal. The growing demand for outdoor lifestyle properties has made recreational land one of the most sought-after segments in the Central Florida market, particularly among buyers from South Florida and the Northeast seeking a rural escape.',
      'SVN McDonald & Company has extensive experience brokering hunting and recreational properties throughout the region. Our advisors evaluate wildlife management potential, habitat quality, access points, timber value, and conservation easement eligibility to provide comprehensive assessments for buyers and sellers of recreational land.'
    ],
    features: [
      { title: 'Diverse Wildlife Habitat', description: 'The region supports healthy populations of deer, turkey, hog, and waterfowl across varied ecosystems.' },
      { title: 'Proximity to Public Lands', description: 'Adjacency to the Ocala National Forest and state forests enhances wildlife corridors and hunting quality.' },
      { title: 'Water Features', description: 'Spring-fed creeks, natural lakes, and river frontage add recreational and aesthetic value to properties.' },
      { title: 'Conservation Easement Potential', description: 'Large recreational tracts may qualify for conservation easements, providing tax benefits while preserving habitat.' },
      { title: 'Timber Revenue', description: 'Managed timber stands on recreational properties generate income while improving wildlife habitat.' },
      { title: 'Lifestyle Investment', description: 'Recreational land offers personal enjoyment while appreciating in value as Central Florida\'s population grows.' }
    ],
    buildoutType: 'inventory',
    category: 'land',
  },
  {
    slug: 'industrial',
    title: 'Industrial',
    highlightedText: 'Properties',
    subtitle: 'Strategic industrial facilities and sites along Central Florida\'s premier logistics corridors.',
    seoTitle: 'Industrial Properties for Sale & Lease in Ocala & Central Florida',
    seoDescription: 'Find industrial properties for sale and lease in Ocala and Central Florida. SVN McDonald offers warehouses, manufacturing facilities, distribution centers, and industrial land along the I-75 corridor.',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80',
    intro: [
      'Central Florida\'s industrial real estate market is experiencing unprecedented growth, driven by the region\'s strategic position along the I-75 corridor connecting Tampa, Orlando, and Jacksonville. Marion County has emerged as a logistics and distribution hub, offering lower land costs and operating expenses compared to congested urban industrial markets while maintaining excellent connectivity to major population centers and port facilities.',
      'The expansion of I-75, ongoing interchange improvements, and the development of new industrial parks have created a surge in demand for manufacturing, distribution, and flex-industrial space. Major employers in automotive parts, building materials, food processing, and e-commerce fulfillment have established operations in the region, attracting a skilled workforce and supporting infrastructure that benefits the entire industrial ecosystem.',
      'SVN McDonald & Company provides expert industrial brokerage services, helping users find the right facility and investors identify high-yield industrial assets. Our team understands the critical factors in industrial site selection, including ceiling heights, dock configurations, power capacity, zoning classifications, and transportation access. We leverage the SVN national platform to source industrial tenants and buyers from across the country.'
    ],
    features: [
      { title: 'I-75 Corridor Location', description: 'Direct interstate access provides efficient freight movement to Florida\'s major metro areas and Southeast markets.' },
      { title: 'Lower Operating Costs', description: 'Industrial rents and land prices significantly below Tampa and Orlando, improving tenant and investor returns.' },
      { title: 'Growing Workforce', description: 'Marion County\'s expanding population provides a reliable labor pool for manufacturing and logistics operations.' },
      { title: 'Modern Facilities', description: 'New construction and recent renovations offer Class A industrial space with high clear heights and modern specs.' },
      { title: 'Flex-Industrial Options', description: 'Versatile flex space accommodates combinations of warehouse, showroom, office, and light manufacturing use.' },
      { title: 'Development Sites Available', description: 'Entitled and pre-certified industrial land parcels are available for build-to-suit and speculative development.' }
    ],
    buildoutType: 'inventory',
    category: 'commercial',
  },
  {
    slug: 'multi-family',
    title: 'Multi-Family',
    highlightedText: 'Properties',
    subtitle: 'Apartment complexes and multi-family investment opportunities in one of Florida\'s fastest-growing markets.',
    seoTitle: 'Multi-Family Properties for Sale in Ocala & Central Florida',
    seoDescription: 'Explore multi-family properties and apartment investments in Ocala and Central Florida. SVN McDonald offers apartment complexes, duplexes, and multi-family development opportunities in Marion County.',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80',
    intro: [
      'The multi-family sector in Central Florida is thriving as rapid population growth and rising home prices drive sustained rental demand. Marion County has consistently ranked among the fastest-growing counties in Florida, attracting residents from South Florida, the Northeast, and other high-cost markets. This migration wave, combined with the economic stimulus of the World Equestrian Center and expanding logistics sector, has created a fundamentally strong multi-family investment environment.',
      'Ocala\'s multi-family market offers compelling advantages for investors at every scale. Cap rates remain attractive compared to saturated South Florida and Orlando markets, while rent growth has outpaced state averages. New development continues to be absorbed quickly, and existing value-add properties present opportunities to improve returns through renovation and professional management. The region supports demand for workforce housing, market-rate apartments, and luxury rental communities.',
      'SVN McDonald & Company helps multi-family investors identify acquisition targets, evaluate underwriting assumptions, and execute transactions efficiently. Our team analyzes rent comparables, occupancy trends, operating expenses, and capital improvement potential to ensure our clients make data-driven investment decisions in the Central Florida multi-family market.'
    ],
    features: [
      { title: 'Strong Population Growth', description: 'Marion County\'s rapid population increase drives consistent demand for rental housing across all price points.' },
      { title: 'Attractive Cap Rates', description: 'Multi-family yields in the Ocala market exceed those in saturated Florida metros like Orlando and Tampa.' },
      { title: 'Rent Growth Momentum', description: 'Above-average rent increases reflect strong demand fundamentals and limited new supply in key submarkets.' },
      { title: 'Value-Add Potential', description: 'Aging apartment stock presents opportunities to increase NOI through renovation and repositioning strategies.' },
      { title: 'Development Opportunities', description: 'Zoned and entitled sites available for new multi-family construction to meet growing housing demand.' },
      { title: 'Workforce Housing Demand', description: 'Expanding healthcare, logistics, and equestrian employers drive demand for attainable workforce housing.' }
    ],
    buildoutType: 'inventory',
    category: 'commercial',
  },
  {
    slug: 'office',
    title: 'Office',
    highlightedText: 'Properties',
    subtitle: 'Professional office space for healthcare, financial services, and growing businesses in Central Florida.',
    seoTitle: 'Office Properties for Sale & Lease in Ocala & Central Florida',
    seoDescription: 'Browse office properties for sale and lease in Ocala and Central Florida. SVN McDonald offers medical office, professional office, and Class A/B office space throughout Marion County.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2301&q=80',
    intro: [
      'Ocala\'s office market reflects the evolving economic landscape of Central Florida, with strong demand driven by healthcare expansion, financial services growth, and an influx of professional services firms relocating from higher-cost markets. The region\'s medical office segment has been particularly robust, fueled by the expansion of AdventHealth Ocala, HCA Florida Ocala Hospital, and a growing network of specialty practices serving the area\'s increasing population.',
      'Professional office space along key corridors like SR 200, SW 17th Street, and the downtown Ocala district offers tenants modern amenities at rates significantly below Orlando and Tampa. The market supports a range of office formats, from single-tenant build-to-suits and medical office buildings to traditional multi-tenant Class A and B office parks. Coworking and flex office concepts have also gained traction as remote workers and small businesses seek professional workspace solutions.',
      'SVN McDonald & Company provides expert guidance for office property transactions, whether you are a tenant seeking the right space, an investor evaluating office assets, or a developer planning new construction. Our team analyzes lease structures, tenant credit, building systems, parking ratios, and location dynamics to help clients optimize their office real estate decisions in the Central Florida market.'
    ],
    features: [
      { title: 'Healthcare Sector Demand', description: 'Hospital expansions and specialty practice growth drive consistent demand for medical office space.' },
      { title: 'Competitive Lease Rates', description: 'Office rents well below Orlando and Tampa attract professional services firms and corporate relocations.' },
      { title: 'Modern Class A Options', description: 'Recently constructed office buildings offer premium finishes, efficient floor plans, and contemporary amenities.' },
      { title: 'Downtown Revitalization', description: 'Ocala\'s downtown square district is experiencing renewed interest from professional tenants and investors.' },
      { title: 'Medical Office Specialization', description: 'Purpose-built medical office buildings with appropriate parking, ADA compliance, and specialized infrastructure.' },
      { title: 'Net Lease Investment', description: 'Single-tenant office properties leased to creditworthy tenants offer stable, passive investment returns.' }
    ],
    buildoutType: 'inventory',
    category: 'commercial',
  },
  {
    slug: 'ranch',
    title: 'Ranch',
    highlightedText: 'Properties',
    subtitle: 'Working cattle ranches and lifestyle estates in Central Florida\'s premier ranching country.',
    seoTitle: 'Ranch Properties for Sale in Ocala & Central Florida',
    seoDescription: 'Find ranch properties for sale in Ocala, Marion County, and Central Florida. SVN McDonald specializes in working cattle ranches, lifestyle estates, and large ranch land near the World Equestrian Center.',
    heroImage: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2674&q=80',
    intro: [
      'Central Florida has been cattle country for generations, and the region\'s ranch properties continue to attract both working agricultural operators and lifestyle buyers seeking the rural Florida experience. Marion County\'s gently rolling terrain, improved pastures, and moderate climate create ideal conditions for year-round cattle grazing. The area\'s ranching heritage is visible in the landscape of board fences, oak-lined drives, and working corrals that define the countryside between Ocala and the Withlacoochee River.',
      'The World Equestrian Center\'s impact has brought new attention and value to ranch properties within its influence zone. Buyers increasingly view ranch land as a dual-purpose asset: a productive agricultural operation with significant development or conversion potential as the greater Ocala area continues to grow. Properties with improved pastures, cross-fencing, cattle working facilities, and reliable water sources are in particularly high demand.',
      'SVN McDonald & Company has deep roots in the Central Florida ranching community and understands the unique factors that drive ranch property values. Our advisors evaluate carrying capacity, pasture quality, water infrastructure, fencing condition, and proximity to livestock markets and equestrian facilities. We help ranchers sell at peak value and buyers find the right property for their operational or lifestyle goals.'
    ],
    features: [
      { title: 'Year-Round Grazing', description: 'Central Florida\'s mild climate eliminates the need for winter hay feeding, reducing operating costs significantly.' },
      { title: 'Improved Pastures', description: 'Bahia and Bermuda grass pastures with proper lime and fertilization programs support high stocking rates.' },
      { title: 'WEC Value Influence', description: 'Ranch properties near the World Equestrian Center benefit from significant land value appreciation and conversion potential.' },
      { title: 'Agricultural Exemptions', description: 'Active ranch operations qualify for Greenbelt agricultural exemptions, substantially reducing annual property taxes.' },
      { title: 'Water Resources', description: 'Wells, ponds, and natural waterways provide reliable water access for livestock operations across the region.' },
      { title: 'Conservation Programs', description: 'Large ranch tracts may qualify for conservation easements, providing income while preserving the land\'s agricultural character.' }
    ],
    buildoutType: 'inventory',
    category: 'land',
  },
  {
    slug: 'retail',
    title: 'Retail',
    highlightedText: 'Properties',
    subtitle: 'High-visibility retail locations and shopping centers serving Central Florida\'s growing consumer base.',
    seoTitle: 'Retail Properties for Sale & Lease in Ocala & Central Florida',
    seoDescription: 'Explore retail properties for sale and lease in Ocala and Central Florida. SVN McDonald offers shopping centers, NNN retail investments, and pad sites along high-traffic corridors in Marion County.',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80',
    intro: [
      'The retail real estate market in Central Florida is evolving rapidly as population growth reshapes the consumer landscape. Ocala\'s primary retail corridors along SR 200, US 441, and the I-75 interchange areas continue to attract national retailers, restaurant chains, and convenience-oriented tenants seeking to serve the region\'s expanding customer base. New retail development has accelerated to meet demand, with pad sites and outparcels commanding premium prices in high-traffic locations.',
      'Marion County\'s retail fundamentals are exceptionally strong. The area\'s population growth rate significantly exceeds national averages, household incomes are rising, and consumer spending patterns support robust retail demand across categories. The World Equestrian Center has introduced a substantial seasonal population that supports hospitality, dining, and specialty retail businesses, creating a unique retail dynamic not found in comparable mid-size markets.',
      'SVN McDonald & Company provides comprehensive retail brokerage services for investors, tenants, and developers. Our team analyzes traffic counts, demographics, co-tenancy requirements, and lease structures to identify optimal retail opportunities. We leverage our local relationships and the SVN national network to match properties with qualified retailers and investors seeking exposure to one of Florida\'s most dynamic growth markets.'
    ],
    features: [
      { title: 'High Traffic Corridors', description: 'SR 200, US 441, and I-75 interchange locations deliver strong daily traffic counts for maximum retail visibility.' },
      { title: 'Population-Driven Demand', description: 'Rapid residential growth creates consistent new demand for convenience, dining, and service-oriented retail.' },
      { title: 'National Tenant Interest', description: 'Major retail brands continue expanding into the Ocala market, validating the region\'s growth trajectory.' },
      { title: 'NNN Investment Grade', description: 'Single-tenant retail properties leased to credit tenants offer passive, predictable investment income.' },
      { title: 'WEC Seasonal Boost', description: 'The World Equestrian Center brings significant seasonal spending that enhances retail performance in surrounding areas.' },
      { title: 'Pad Site Development', description: 'Outparcels and pad sites at key intersections offer build-to-suit and ground lease opportunities for retailers.' }
    ],
    buildoutType: 'inventory',
    category: 'commercial',
  },
  {
    slug: 'residential-development',
    title: 'Residential Development',
    highlightedText: 'Properties',
    subtitle: 'Entitled land and development sites for residential builders in one of Florida\'s hottest growth markets.',
    seoTitle: 'Residential Development Land for Sale in Ocala & Central Florida',
    seoDescription: 'Find residential development properties and entitled land for sale in Ocala and Central Florida. SVN McDonald offers finished lots, raw land, and development sites for homebuilders in Marion County.',
    heroImage: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80',
    intro: [
      'Marion County has emerged as one of Florida\'s premier residential development markets, driven by an influx of new residents seeking affordable housing, lifestyle amenities, and proximity to the World Equestrian Center. National and regional homebuilders have committed to major projects throughout the county, absorbing finished lots and raw development land at a pace that reflects the market\'s underlying strength. Permit activity consistently ranks among the top counties in the state, and demand shows no signs of slowing.',
      'Residential development opportunities in the Ocala area range from fully entitled, infrastructure-ready lot communities to raw land parcels requiring entitlement and permitting. The diversity of available sites serves builders across all price points, from attainable workforce housing and townhome communities to master-planned neighborhoods with premium amenities. The region\'s relatively streamlined permitting process and cooperative local government add to its appeal for developers accustomed to more restrictive jurisdictions.',
      'SVN McDonald & Company is the go-to brokerage for residential development land in Central Florida. Our team tracks the entire development pipeline, from land assemblage and rezoning through lot takedown and builder acquisition. We connect landowners with qualified developers and help builders identify sites that match their product type, price point, and absorption projections.'
    ],
    features: [
      { title: 'Explosive Population Growth', description: 'Marion County\'s population growth rate far exceeds national averages, driving sustained demand for new housing.' },
      { title: 'Builder-Ready Lots', description: 'Finished and semi-finished lot inventory available for immediate vertical construction by production homebuilders.' },
      { title: 'Streamlined Permitting', description: 'Marion County\'s development review process is efficient and cooperative compared to more regulated Florida markets.' },
      { title: 'Diverse Product Types', description: 'Opportunities span single-family, townhome, active adult, and mixed-use residential development formats.' },
      { title: 'Infrastructure Investment', description: 'Road improvements, utility extensions, and new schools support continued residential expansion across the county.' },
      { title: 'Affordable Land Basis', description: 'Development land costs remain competitive, enabling builders to deliver homes at price points attractive to in-migrating buyers.' }
    ],
    buildoutType: 'inventory',
    category: 'land',
  },
  {
    slug: 'self-storage',
    title: 'Self Storage',
    highlightedText: 'Properties',
    subtitle: 'Self-storage investment opportunities in Central Florida\'s high-growth storage market.',
    seoTitle: 'Self Storage Properties for Sale in Ocala & Central Florida',
    seoDescription: 'Discover self storage properties and development opportunities in Ocala and Central Florida. SVN McDonald specializes in self-storage investments and facility transactions in Marion County.',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80',
    intro: [
      'Self-storage has become one of the most resilient and consistently performing commercial real estate asset classes, and Central Florida\'s growth dynamics make it an ideal market for storage investment. Population growth, household formation, downsizing retirees, and the transient nature of Florida\'s seasonal residents all contribute to robust demand for self-storage space in the Ocala metro area. The sector has demonstrated remarkable stability through economic cycles, maintaining high occupancy rates and steady revenue growth.',
      'Marion County\'s self-storage market is benefiting from the same demographic tailwinds driving the broader real estate market. New residents relocating from larger metros often require temporary storage during their transition, while the equestrian community generates demand for specialized storage of tack, equipment, and horse trailers. Modern climate-controlled facilities in prime retail locations command premium rents and attract quality tenants who value convenience and security.',
      'SVN McDonald & Company assists self-storage investors with acquisition, disposition, and development advisory. Our team evaluates trade areas, competitive supply, rental rate comparables, and management efficiency to help clients make informed investment decisions. Whether you are acquiring an existing facility, developing a new site, or expanding a current operation, our expertise in the Central Florida market provides a competitive advantage.'
    ],
    features: [
      { title: 'Recession-Resilient Asset', description: 'Self-storage maintains high occupancy and stable revenues through economic downturns, making it a defensive investment.' },
      { title: 'Population Growth Catalyst', description: 'Rapid in-migration to Marion County creates consistent new demand for personal and commercial storage.' },
      { title: 'Low Operating Costs', description: 'Minimal staffing requirements and straightforward maintenance make self-storage one of the most efficient property types.' },
      { title: 'Climate-Controlled Premium', description: 'Climate-controlled units command higher rents and attract quality tenants in Florida\'s hot, humid environment.' },
      { title: 'Equestrian Storage Niche', description: 'The horse industry generates specialized demand for tack, trailer, and equipment storage near equestrian venues.' },
      { title: 'Value-Add Conversion', description: 'Older facilities can be renovated with climate control, security upgrades, and professional management to increase NOI.' }
    ],
    buildoutType: 'inventory',
    category: 'commercial',
  },
  {
    slug: 'timber',
    title: 'Timber',
    highlightedText: 'Properties',
    subtitle: 'Managed timberland investments in Central Florida\'s productive pine and hardwood forests.',
    seoTitle: 'Timber Properties & Timberland for Sale in Central Florida',
    seoDescription: 'Browse timber properties and managed timberland for sale in Ocala and Central Florida. SVN McDonald offers pine plantation investments, hardwood tracts, and timber properties with hunting and recreation value.',
    heroImage: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2641&q=80',
    intro: [
      'Central Florida\'s timber industry has been a cornerstone of the regional economy for over a century, and managed timberland remains a compelling investment for buyers seeking income, appreciation, and portfolio diversification. The region\'s long growing season and abundant rainfall produce some of the fastest timber growth rates in the country, with slash pine and loblolly pine reaching merchantable size in 20-25 years. Marion, Levy, Citrus, and Sumter counties offer extensive tracts of productive timberland at prices that deliver attractive risk-adjusted returns.',
      'Timber properties in the Central Florida market offer a unique combination of current income and long-term value. Managed pine plantations generate periodic harvest revenue, while the underlying land appreciates as the Ocala metro area expands. Many timber tracts also provide excellent hunting and recreational opportunities, adding lifestyle value for owners who enjoy outdoor pursuits. Properties with mixed timber and pasture can support dual agricultural exemptions, further reducing carrying costs.',
      'SVN McDonald & Company provides specialized timber property brokerage services, drawing on our deep understanding of Central Florida\'s land market. Our team evaluates timber cruises, stand age and composition, road access, harvesting logistics, and highest-and-best-use potential for every timberland listing. We connect timber investors with the right properties and help landowners maximize value through strategic timing of sales.'
    ],
    features: [
      { title: 'Fast Growth Rates', description: 'Central Florida\'s climate produces some of the nation\'s fastest pine growth, shortening harvest rotations to 20-25 years.' },
      { title: 'Periodic Harvest Income', description: 'Thinning and final harvests generate revenue streams throughout the timber rotation cycle.' },
      { title: 'Land Appreciation', description: 'The underlying land value appreciates independently of timber, especially on tracts near growing population centers.' },
      { title: 'Tax Advantages', description: 'Timber income qualifies for capital gains treatment, and forest management expenses are deductible.' },
      { title: 'Recreational Co-Use', description: 'Timberland provides excellent hunting, fishing, and outdoor recreation opportunities between harvest cycles.' },
      { title: 'Conservation Easement Eligibility', description: 'Large timber tracts often qualify for conservation easements, providing significant tax benefits to landowners.' }
    ],
    buildoutType: 'inventory',
    category: 'land',
  },
  {
    slug: 'triple-net-nnn',
    title: 'Triple Net NNN',
    highlightedText: 'Properties',
    subtitle: 'Passive income investments with creditworthy tenants and predictable returns in Central Florida.',
    seoTitle: 'Triple Net NNN Properties for Sale in Ocala & Central Florida',
    seoDescription: 'Explore triple net NNN investment properties for sale in Ocala and Central Florida. SVN McDonald offers single-tenant NNN retail, medical, and commercial properties with stable, passive income.',
    heroImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80',
    intro: [
      'Triple net lease properties represent one of the most popular investment vehicles in commercial real estate, offering investors predictable, passive income with minimal management responsibilities. In a NNN lease structure, the tenant pays base rent plus all three major operating expenses: property taxes, insurance, and maintenance. This net-of-expenses income stream, typically backed by investment-grade or regional credit tenants, appeals to retirees, 1031 exchange buyers, and institutional investors seeking stable cash flow.',
      'Central Florida\'s NNN market benefits from the region\'s strong economic fundamentals and growing tenant base. National retailers, restaurant franchises, convenience stores, medical practices, and financial institutions continue to expand across Marion County, creating a steady supply of newly constructed, long-term leased NNN properties. Cap rates in the Ocala market typically offer a yield premium over comparable properties in South Florida and Orlando, making the region attractive for income-focused investors.',
      'SVN McDonald & Company is well-positioned to serve NNN investors through our local market expertise and the SVN national platform. We source off-market NNN opportunities, evaluate tenant creditworthiness and lease terms, and facilitate 1031 exchanges with seamless timing. Our advisors help sellers position NNN properties for maximum value by analyzing lease structure, remaining term, rental escalations, and comparable sales data.'
    ],
    features: [
      { title: 'Passive Income Stream', description: 'Tenants pay all operating expenses, delivering net income to investors with minimal landlord involvement.' },
      { title: 'Credit Tenant Quality', description: 'Investment-grade and regional credit tenants provide reliable, bankable income backed by strong balance sheets.' },
      { title: 'Attractive Cap Rates', description: 'Central Florida NNN yields exceed those in saturated metros, offering more income per dollar invested.' },
      { title: '1031 Exchange Friendly', description: 'NNN properties are ideal 1031 replacement assets for investors deferring capital gains from other real estate sales.' },
      { title: 'Annual Rent Escalations', description: 'Built-in rent increases protect investors from inflation and grow income over the lease term.' },
      { title: 'Diverse Tenant Sectors', description: 'Retail, medical, financial, and quick-service restaurant tenants provide diversification across NNN investment portfolios.' }
    ],
    buildoutType: 'inventory',
    category: 'commercial',
  },
  {
    slug: 'warehouse',
    title: 'Warehouse',
    highlightedText: 'Properties',
    subtitle: 'Distribution and warehouse facilities strategically located along Central Florida\'s major freight corridors.',
    seoTitle: 'Warehouse Properties for Sale & Lease in Ocala & Central Florida',
    seoDescription: 'Find warehouse and distribution properties for sale and lease in Ocala and Central Florida. SVN McDonald offers warehouse space, distribution centers, and logistics facilities along the I-75 corridor.',
    heroImage: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80',
    intro: [
      'The warehouse and distribution sector in Central Florida has experienced explosive growth as e-commerce expansion, supply chain reconfiguration, and Florida\'s population boom converge to drive demand for logistics space. The Ocala-Marion County corridor along I-75 has become a premier location for warehouse operations, offering a central position between Tampa, Orlando, and Jacksonville with significantly lower occupancy costs than those major metros. The result is a thriving warehouse market with tightening vacancy and rising rents.',
      'Modern warehouse requirements have evolved beyond simple storage. Today\'s distribution facilities demand high clear heights (28-36 feet), ample truck court depth, cross-dock configurations, and proximity to interstate access. The Ocala market is responding with new speculative and build-to-suit warehouse construction that meets these specifications. Existing warehouses with flexible configurations also serve a diverse tenant base including building materials suppliers, agricultural equipment dealers, and regional distributors.',
      'SVN McDonald & Company brings deep industrial real estate expertise to the warehouse sector, helping tenants find the right facility and investors capitalize on one of the strongest-performing asset classes in commercial real estate. Our team evaluates building specifications, site logistics, transportation access, and market comparables to deliver informed recommendations for every warehouse transaction in the Central Florida market.'
    ],
    features: [
      { title: 'I-75 Strategic Location', description: 'Central position between Tampa, Orlando, and Jacksonville provides efficient distribution to 80% of Florida\'s population.' },
      { title: 'Cost Advantage', description: 'Warehouse rents in the Ocala market are significantly below Tampa and Orlando, improving tenant operating margins.' },
      { title: 'Modern Specifications', description: 'New construction delivers high clear heights, deep truck courts, and cross-dock configurations demanded by logistics users.' },
      { title: 'E-Commerce Driven Demand', description: 'Last-mile and regional distribution requirements fuel steady demand for warehouse space across all size ranges.' },
      { title: 'Diverse User Base', description: 'Building materials, agricultural products, auto parts, and general merchandise distributors anchor the local warehouse market.' },
      { title: 'Strong Investment Returns', description: 'Warehouse properties deliver attractive yields with lower tenant improvement costs and longer lease terms than office or retail.' }
    ],
    buildoutType: 'inventory',
    category: 'commercial',
  },
];

export function getPropertyTypeBySlug(slug: string): PropertyType | undefined {
  return propertyTypes.find((pt) => pt.slug === slug);
}
