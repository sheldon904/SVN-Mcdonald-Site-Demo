export interface ClosedDeal {
  title: string;
  slug: string;
  location: string;
  price: string;
  date: string;
  image: string;
  type: string;
  status: 'Sold' | 'Leased';
  description: string;
}

export const FALLBACK_IMAGE = "/images/hero/hwy-484-ocala-1920.jpg";

export const closedDeals: ClosedDeal[] = [
  {
    title: "Ocala 75",
    slug: "ocala-75-industrial-lease",
    location: "Ocala, FL",
    price: "175,640 SF",
    date: "Mar 2026",
    image: "/images/properties/ocala-75-hero.webp",
    type: "Industrial",
    status: "Leased",
    description: "Ocala 75 features flexible industrial spaces between 40,000–135,640 SF along the I-75 corridor. The brand-new facility also includes 105+ entitled acres for build-to-suit development. Co-listed with David Murphy and Monica Wonus of CBRE."
  },
  {
    title: "Office Space — 8.14 CAP",
    slug: "sold-office-space-ocala-8-14-cap",
    location: "Ocala, FL",
    price: "8.14 CAP",
    date: "Apr 2026",
    image: "/images/properties/office-space-ocala-sold.jpg",
    type: "Office",
    status: "Sold",
    description: "SVN McDonald & Company closed this office space investment at asking price with an 8.14 CAP rate in Ocala, FL. Bartow McDonald, Matthew Garff, and Stiles McDonald represented this transaction, demonstrating strong investor confidence in the Ocala office market."
  },
  {
    title: "17.59 +/- Commercial Acres Marion Oaks",
    slug: "17-59-commercial-acres-in-marion-oaks",
    location: "Marion Oaks, FL",
    price: "Sold",
    date: "Feb 2026",
    image: "/images/properties/17-59.webp",
    type: "Land",
    status: "Sold",
    description: "SVN McDonald & Company successfully represented the sale of 17.59 +/- commercial acres in Marion Oaks, one of Marion County's fastest-growing communities. This prime commercial land tract offers excellent development potential with strong surrounding residential growth."
  },
  {
    title: "78+/- Acres Horse Country",
    slug: "78-acres-in-horse-country",
    location: "NW Marion County, FL",
    price: "Sold",
    date: "Feb 2026",
    image: "/images/properties/78-acres-horse-country-new.jpg",
    type: "Land",
    status: "Sold",
    description: "78+/- pristine acres located in the heart of NW Marion County's renowned horse country. This beautiful property features rolling pastures and mature oaks, ideal for equestrian use or conservation."
  },
  {
    title: "Trailhead Logistics Center",
    slug: "single-tenant-leased-943000-sf-trailhead-logistics-center",
    location: "Ocala, FL",
    price: "943,000 SF Leased",
    date: "Feb 2026",
    image: "/trailhead-logistics-hero.jpg",
    type: "Industrial",
    status: "Leased",
    description: "SVN McDonald & Company played a key role in the single-tenant lease of the 943,000 square foot Trailhead Logistics Center in Ocala, FL. This state-of-the-art distribution facility represents one of the largest industrial transactions in Marion County history."
  },
  {
    title: "550 Acre Jumbolair",
    slug: "sold-550-acre-jumbolair",
    location: "Ocala, FL",
    price: "$9,500,000",
    date: "Sep 2025",
    image: "/images/properties/jumbolair-runway.jpg",
    type: "Residential",
    status: "Sold",
    description: "$9,500,000. Bring your Boeing! A mile of road can take you to a few places, but a mile of runway can take you anywhere in the world. Jumbolair is a world-class residential airpark community featuring a 7,550-foot runway, one of the longest private runways in the United States. This extraordinary 550-acre property includes luxury homes, hangars, and unmatched aviation amenities."
  },
  {
    title: "Aurora Oak Residential",
    slug: "sold-7m-41-22-residential-acres-in-ocala-fl",
    location: "Ocala, FL",
    price: "$7,000,000+",
    date: "Sep 2025",
    image: "/images/properties/aurora-oaks.webp",
    type: "Land",
    status: "Sold",
    description: "SVN McDonald & Company represented the sale of 41.22 residential development acres in Ocala, FL for over $7 million. The Aurora Oak property represents a premier residential development opportunity in one of Ocala's most desirable growth corridors."
  },
  {
    title: "39 Acres Mixed Use I-75/Hwy 484",
    slug: "39-acres-of-mixed-use-i-75-hwy-484",
    location: "Ocala, FL",
    price: "$5,700,000",
    date: "2024",
    image: "/images/properties/39-acres.webp",
    type: "Land",
    status: "Sold",
    description: "39 acres of prime mixed-use land located at the high-traffic intersection of I-75 and Highway 484 in Ocala. This strategic location offers exceptional visibility and access, making it ideal for commercial, retail, or mixed-use development."
  },
  {
    title: "NNN Jiffy Lube",
    slug: "sold-nnn-jiffy-lube-7-00-cap",
    location: "Jacksonville, FL",
    price: "7.00 CAP",
    date: "2024",
    image: "/images/properties/jl-1.webp",
    type: "Retail",
    status: "Sold",
    description: "SVN McDonald & Company facilitated the sale of this NNN Jiffy Lube investment property at a 7.00 CAP rate. This single-tenant net lease retail property provides stable, long-term income with a nationally recognized tenant."
  },
  {
    title: "NNN Industrial",
    slug: "sold-nnn-industrial-8-16-cap-for-sale",
    location: "Ocala, FL",
    price: "8.16 CAP",
    date: "2024",
    image: "/images/properties/tg-lee.webp",
    type: "Industrial",
    status: "Sold",
    description: "NNN industrial investment property sold at an 8.16 CAP rate in Ocala, FL. This triple-net leased industrial building offers investors reliable income with minimal landlord responsibilities."
  },
  {
    title: "276+/- Acres Dunnellon",
    slug: "276-acres-in-dunnellon-fl",
    location: "Levy County, FL",
    price: "Sold",
    date: "2024",
    image: "/images/properties/275.webp",
    type: "Land",
    status: "Sold",
    description: "276+/- acres of natural Florida land in Dunnellon, Levy County. This expansive property offers diverse terrain and potential for agricultural, recreational, or conservation use."
  },
  {
    title: "4,000 SF Warehouse",
    slug: "4000-sf-warehouse-in-ocala-fl",
    location: "Ocala, FL",
    price: "Sold",
    date: "2024",
    image: "/images/properties/milan.webp",
    type: "Industrial",
    status: "Sold",
    description: "4,000 square foot warehouse property in Ocala, FL. This well-maintained industrial space served the owner's business needs and was sold to accommodate new growth in the local market."
  },
  {
    title: "6,600 SF Warehouse",
    slug: "6600sf-warehouse-in-summerfield-fl",
    location: "Summerfield, FL",
    price: "Sold",
    date: "2024",
    image: "/images/properties/summerfield.webp",
    type: "Industrial",
    status: "Sold",
    description: "6,600 square foot warehouse facility in Summerfield, FL. Located in the southern portion of Marion County, this industrial property benefits from proximity to The Villages and growing demand for warehouse space."
  },
  {
    title: "35.28 +/- Residential Acres",
    slug: "35-28-residential-acres",
    location: "Marion County, FL",
    price: "Sold",
    date: "2023",
    image: "/images/properties/35-acres.webp",
    type: "Land",
    status: "Sold",
    description: "35.28 +/- acres of residential land in Marion County. When the day breaks and the light pours in through the live oaks, you know you're somewhere special. This picturesque property offers a rare opportunity for residential development in one of Florida's most sought-after counties."
  },
  {
    title: "55,000 SF Covered Storage Heavy Industrial",
    slug: "sold-55000sf-covered-storage-heavy-industrial-land-in-ocala-fl",
    location: "Ocala, FL",
    price: "Sold",
    date: "2023",
    image: "/images/properties/moxon.webp",
    type: "Industrial",
    status: "Sold",
    description: "55,000 square feet of covered storage on heavy industrial land in Ocala, FL. This substantial industrial property offers extensive covered storage capacity ideal for manufacturing, distribution, or heavy equipment operations."
  },
  {
    title: "Downtown Ocala Office",
    slug: "sold-downtown-ocala-office",
    location: "Ocala, FL",
    price: "Sold",
    date: "2023",
    image: "/images/properties/group-24.webp",
    type: "Office",
    status: "Sold",
    description: "Professional office building in the heart of downtown Ocala. This well-positioned property offers excellent visibility and walkability in Ocala's revitalized downtown district."
  },
  {
    title: "90,000 SF Industrial",
    slug: "sold-90000sf-industrial",
    location: "Ocala, FL",
    price: "$3,100,000",
    date: "Archive",
    image: "/images/properties/2014-ranch.webp",
    type: "Industrial",
    status: "Sold",
    description: "90,000 square foot industrial facility sold for $3,100,000 in Ocala, FL. This major industrial property represents one of the significant warehouse transactions in the local market."
  },
  {
    title: "Shopping Center",
    slug: "sold-shopping-center",
    location: "Ocala, FL",
    price: "$2,200,000",
    date: "Archive",
    image: "/images/properties/screen-shot-1120.webp",
    type: "Retail",
    status: "Sold",
    description: "Multi-tenant shopping center sold for $2,200,000 in Ocala, FL. Located in a high-traffic retail corridor with strong tenant mix and consistent occupancy."
  },
  {
    title: "153 Acres",
    slug: "sold-153-acres",
    location: "Marion County, FL",
    price: "$1,086,300",
    date: "Archive",
    image: "/images/properties/20190917-112106.webp",
    type: "Land",
    status: "Sold",
    description: "153 acres of land in Marion County sold for $1,086,300. This significant land tract offers diverse potential uses including agriculture, ranching, or future development."
  },
  {
    title: "182 Acres Reddick",
    slug: "sold-182-acres",
    location: "Reddick, FL",
    price: "$1,133,400",
    date: "Archive",
    image: "/images/properties/20190917-124800.webp",
    type: "Land",
    status: "Sold",
    description: "182 acres in Reddick, FL sold for $1,133,400. This expansive property in the northern portion of Marion County offers excellent agricultural and rural residential potential."
  },
  {
    title: "115 Acres Citra",
    slug: "sold-115-acres",
    location: "Citra, FL",
    price: "$648,000",
    date: "Archive",
    image: "/images/properties/20190917-121014.webp",
    type: "Land",
    status: "Sold",
    description: "115 acres of land in Citra, FL sold for $648,000. Located in the agricultural heart of Marion County, this property is well-suited for farming, citrus, or rural estate development."
  },
  {
    title: "145 Acres — 870 Residential Units",
    slug: "sold-145-acres",
    location: "Marion County, FL",
    price: "$4,926,300",
    date: "Archive",
    image: "/images/properties/nopath-41.webp",
    type: "Land",
    status: "Sold",
    description: "145 acres entitled for 870 residential units sold for $4,926,300 in Marion County. This significant development-ready land parcel represents a major residential growth opportunity in Central Florida's expanding market."
  },
  {
    title: "86,500 SF Warehouse",
    slug: "sold-86500sf-warehouse",
    location: "Ocala, FL",
    price: "$3,190,000",
    date: "Archive",
    image: "/images/properties/nopath-43.webp",
    type: "Industrial",
    status: "Sold",
    description: "86,500 square foot warehouse sold for $3,190,000 in Ocala, FL. This large-format industrial property served as a key distribution facility in the Central Florida logistics corridor."
  },
  {
    title: "Corporate Campus",
    slug: "sold-74000sf-office",
    location: "Ocala, FL",
    price: "$5,500,000",
    date: "Archive",
    image: "/images/properties/corporate-campus.png",
    type: "Office",
    status: "Sold",
    description: "74,000 square foot corporate campus sold for $5,500,000 in Ocala, FL. Bartow represented the seller in this significant office transaction. The property features a professional office environment with ample parking and modern amenities."
  },
  {
    title: "34,056 SF Office",
    slug: "sold-34056sf-office",
    location: "Ocala, FL",
    price: "$2,200,000",
    date: "Archive",
    image: "/images/properties/2016-exterior.webp",
    type: "Office",
    status: "Sold",
    description: "34,056 square foot office building sold for $2,200,000 in Ocala, FL. This well-maintained professional office property offered investors a solid return in Ocala's growing office market."
  },
  {
    title: "11,364 SF Office",
    slug: "sold-11364sf-office",
    location: "Ocala, FL",
    price: "$1,700,000",
    date: "Archive",
    image: "/images/properties/2016-aerial.webp",
    type: "Office",
    status: "Sold",
    description: "11,364 square foot office building sold for $1,700,000 in Ocala, FL. This professional office space is well-positioned for medical, legal, or corporate tenants."
  },
  {
    title: "34,825 SF Warehouse",
    slug: "sold-34825sf-warehouse",
    location: "Ocala, FL",
    price: "$1,355,900",
    date: "Archive",
    image: "/images/properties/screen-shot-1040.webp",
    type: "Industrial",
    status: "Sold",
    description: "34,825 square foot warehouse sold for $1,355,900 in Ocala, FL. This industrial property features clear-span construction and easy access to major transportation routes."
  },
  {
    title: "Outparcel Hwy 200",
    slug: "sold-outparcel-hwy-200",
    location: "Ocala, FL",
    price: "Sold",
    date: "Archive",
    image: "/images/properties/screen-shot-1043.webp",
    type: "Retail",
    status: "Sold",
    description: "Prime retail outparcel on Highway 200 in Ocala, FL. This high-visibility location along one of Ocala's busiest commercial corridors offers excellent frontage and traffic exposure."
  },
  {
    title: "42,000 SF Retail",
    slug: "sold-42000sf-retail",
    location: "Ocala, FL",
    price: "Sold",
    date: "Archive",
    image: "/images/properties/front-close.webp",
    type: "Retail",
    status: "Sold",
    description: "42,000 square foot retail center in Ocala, FL. This multi-tenant retail property was successfully sold, demonstrating continued investor confidence in the Ocala retail market."
  },
  {
    title: "235-Unit Self Storage",
    slug: "sold-235-unit-self-storage",
    location: "Marion County, FL",
    price: "$812,500",
    date: "Archive",
    image: "/images/properties/self-storage.webp",
    type: "Self Storage",
    status: "Sold",
    description: "235-unit self storage facility sold for $812,500 in Marion County, FL. This income-producing property benefits from growing demand for storage in the expanding Marion County market."
  },
  {
    title: "25,000 SF Falcon Industrial Park",
    slug: "leased-25000sf-falcon-industrial-park",
    location: "Ocala, FL",
    price: "Leased",
    date: "Archive",
    image: "/images/properties/industrial-building.webp",
    type: "Industrial",
    status: "Leased",
    description: "25,000 square foot industrial space leased in Falcon Industrial Park, Ocala, FL. This flex industrial space within one of Ocala's premier industrial parks was quickly leased to meet growing tenant demand."
  },
  {
    title: "140 Residential Lots",
    slug: "sold-140-residential-lots",
    location: "Marion County, FL",
    price: "Sold",
    date: "Archive",
    image: "/images/properties/entrance.webp",
    type: "Land",
    status: "Sold",
    description: "140 residential lots sold in Marion County, FL. This significant residential land transaction provided a developer with shovel-ready lots in one of Florida's fastest-growing housing markets."
  },
  {
    title: "8,000 SF Office (Former Disney Welcome Center)",
    slug: "sold-8000sf-office",
    location: "Ocala, FL",
    price: "Sold",
    date: "Archive",
    image: "/images/properties/nopath-57.webp",
    type: "Office",
    status: "Sold",
    description: "8,000 square foot office building, formerly the Disney Welcome Center, sold in Ocala, FL. This unique property with its distinctive architecture and prime location attracted strong buyer interest."
  },
  {
    title: "Bank Owned 78 Wooded Acres",
    slug: "sold-bank-owned-78-wooded-acres-hwy-441",
    location: "Marion County, FL",
    price: "Sold",
    date: "Archive",
    image: "/images/properties/full10.webp",
    type: "Land",
    status: "Sold",
    description: "78 wooded acres on Highway 441 in Marion County, FL. This bank-owned property was sold through SVN McDonald's distressed/REO services, providing the lender with a successful resolution and the buyer with prime land at a competitive price."
  }
];
