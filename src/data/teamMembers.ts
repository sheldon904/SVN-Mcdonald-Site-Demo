export interface TeamMember {
  slug: string;
  name: string;
  firstName: string;
  role: string;
  phone: string;
  email: string;
  image: string;
  bio: string;
  specialties: string[];
  education: string | null;
  sameAs: string[];
}

export const teamMembers: TeamMember[] = [
  {
    slug: "bartow-mcdonald",
    name: "Bartow McDonald IV",
    firstName: "Bartow",
    role: "Managing Director",
    phone: "",
    email: "bartow.mcdonald@svn.com",
    image: "/team/bartow-mcdonald.webp",
    bio: "Bartow McDonald IV serves as managing director for SVN | McDonald & Company in Ocala, FL, where he enjoys working on commercial real estate deals throughout Florida. With over 30 years of real estate experience in Central Florida, he brings unmatched depth of knowledge to every transaction.\n\nPrior to joining SVN, McDonald served as the vice president of acquisitions and development for Cope Properties, Inc. in Ocala, Florida where he was responsible for the acquisition, entitlement, and marketing of portfolio and client properties.\n\nPreviously, McDonald served as the founder and chief executive officer of two start-up companies; Bluewire, a service based electrical solutions company and StoreParts, an e-commerce company that supplied supply chain management technology to the supermarket and food retail industries. Before starting two companies, McDonald spent six years working for a fast-growing international manufacturing firm, where he gained in-depth industrial experience through his leadership positions in manufacturing operations, distribution, logistics and marketing.\n\nHe has served on the board of directors for RMI (Reciprocal Ministries International), the Ocala Chamber of Commerce, the Central Florida Commercial Association of Realtors, and as chairman of the regional advisory board for RBC Bank. In addition, he has participated as a conference speaker for the Florida Venture Capital Forum, the Food Marketing Institute and has been quoted in the Wall Street Journal, Forbes and the New York Times.\n\nMcDonald earned his MBA and Bachelor of Science from the University of Florida. Sight fishing and bow hunting are two things that will get him up before sunrise.",
    specialties: [
      "Land Brokerage",
      "Conservation Easements",
      "Commercial Sales & Leasing",
      "Investment Properties",
      "Development Land",
    ],
    education: "MBA & BS, University of Florida",
    sameAs: [
      "https://www.linkedin.com/in/bartowmcdonald/",
      "https://www.loopnet.com/profile/bartow-mcdonald/14091872/",
      "https://www.realtor.com/realestateagents/bartow-mcdonald_ocala_fl",
      "https://ocalacre.com/",
      "https://www.ratemyagent.com/real-estate-agent/bartow-mcdonald-iv-az73v",
      "https://www.homes.com/real-estate-agents/bartow-mcdonald/",
      "https://www.elementix.com/profile/bartow-mcdonald",
      "https://www.ocalafl.org/cep",
      "https://rocketreach.co/bartow-mcdonald-email_26956795",
      "https://www.totalcommercial.com/commercial-real-estate-agent/bartow-mcdonald-iv-ocala-fl",
    ],
  },
  {
    slug: "matthew-garff",
    name: "Matthew Garff",
    firstName: "Matthew",
    role: "Associate Advisor",
    phone: "(352) 644-1552",
    email: "matthew.garff@svn.com",
    image: "/team/matthew-garff.webp",
    bio: "Matthew Garff is an Associate Advisor at SVN | McDonald & Company in Ocala, FL. Growing up in Tampa, Florida, Matthew is from a heritage of farming and ranching, going back five generations. Today, he enjoys helping advise clients in the ever-changing commercial real estate market of North Central Florida.\n\nMatthew is passionate about agricultural land, ranch properties, and recreational land transactions. His deep understanding of the agricultural and equestrian markets in Central Florida allows him to bring exceptional insight to every deal.\n\nMatthew holds a Bachelor of Science in Economics from Brigham Young University. In his free time, he enjoys being on the water, especially on one of the many crystal clean springs that make central Florida such a great place to live and work.",
    specialties: [
      "Agricultural Land",
      "Ranch Properties",
      "Recreational Land",
      "Equestrian Properties",
    ],
    education: "BS Economics, Brigham Young University",
    sameAs: [
      "https://www.linkedin.com/in/matthew-garff/",
      "https://www.loopnet.com/profile/matthew-garff/",
      "https://www.traded.co/people/matthew-garff",
      "https://www.crexi.com/profile/matthew-garff-matthewgarff",
      "https://www.zoominfo.com/p/Matthew-Garff/",
    ],
  },
  {
    slug: "stiles-mcdonald",
    name: "Stiles McDonald",
    firstName: "Stiles",
    role: "Associate",
    phone: "(352) 288-4491",
    email: "stiles.mcdonald@svn.com",
    image: "/team/stiles-mcdonald.webp",
    bio: "Stiles McDonald is a 5th generation Floridian born into a family of avid outdoorsmen. This resulted in instilling him with a love of land and all things real estate, which has led to him working with SVN. He is passionate about bringing value to clients, and enjoys the process from start to finish.\n\nStiles brings a deep understanding of Florida's natural landscapes and rural properties to his work. His lifelong connection to the land and active involvement in the local community and outdoor recreation make him a natural fit for helping clients navigate land and rural property transactions.",
    specialties: [
      "Land Sales",
      "Timber Properties",
      "Hunting & Recreation Land",
      "Rural Properties",
    ],
    education: null,
    sameAs: [
      "https://www.linkedin.com/in/stiles-mcdonald/",
      "https://www.totalcommercial.com/commercial-real-estate-agent/stiles-mcdonald-ocala-fl",
      "https://www.realtor.com/realestateagents/stiles-mcdonald_ocala_fl",
      "https://www.homes.com/real-estate-agents/stiles-mcdonald/",
      "https://www.crexi.com/profile/stiles-mcdonald",
    ],
  },
];
