import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface StructuredDataProps {
  breadcrumbs?: BreadcrumbItem[];
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'RealEstateAgent'],
  '@id': 'https://svnmcdonald.com/#organization',
  name: 'SVN McDonald & Company',
  alternateName: 'SVN McDonald',
  description:
    "Central Florida's premier commercial and land real estate brokerage. Specializing in land sales, commercial properties, conservation easements, and investment real estate in Ocala and Marion County.",
  url: 'https://svnmcdonald.com',
  logo: 'https://svnmcdonald.com/images/logos/svn-logo.png',
  image:
    'https://svnmcdonald.com/images/hero/hwy-484-ocala-1920.jpg',
  telephone: '+1-352-274-3800',
  email: 'info@svnmcdonald.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '217 SE First AVE Unit 200',
    addressLocality: 'Ocala',
    addressRegion: 'FL',
    postalCode: '34471',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 29.1875,
    longitude: -82.1402,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  areaServed: [
    {
      '@type': 'City',
      name: 'Ocala',
      sameAs: 'https://en.wikipedia.org/wiki/Ocala,_Florida',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Marion County, Florida',
    },
    {
      '@type': 'State',
      name: 'Florida',
      sameAs: 'https://en.wikipedia.org/wiki/Florida',
    },
  ],
  priceRange: '$$$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Check, Wire Transfer',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Real Estate Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Land Brokerage' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Commercial Real Estate' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Conservation Easement' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Land Auctions' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Property Valuation' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Strategic Marketing' },
      },
    ],
  },
  sameAs: [
    'https://facebook.com/svnmcdonald',
    'https://youtube.com/@bartowmcdonald1803/featured',
    'https://linkedin.com/company/svn-mcdonald-company/',
    'https://www.instagram.com/svnmcdonald/',
  ],
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SVN McDonald & Company',
  url: 'https://svnmcdonald.com',
  publisher: { '@id': 'https://svnmcdonald.com/#organization' },
};

function buildBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export default function StructuredData({ breadcrumbs }: StructuredDataProps) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(webSiteSchema)}
      </script>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(buildBreadcrumbSchema(breadcrumbs))}
        </script>
      )}
    </Helmet>
  );
}
