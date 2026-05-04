import { blogPosts } from '../src/data/blogPosts.js';
import { closedDeals } from '../src/data/closedDeals.js';
import { teamMembers } from '../src/data/teamMembers.js';
import { propertyTypes } from '../src/data/propertyTypes.js';
import { getAllLocations } from '../src/data/locations.js';

export function getAllRoutes(): string[] {
  return [
    // Static pages
    '/',
    '/land-properties',
    '/commercial-properties',
    '/contact',
    '/team',
    '/blog',
    '/services',
    '/services/land-brokerage',
    '/services/land-auctions',
    '/services/conservation-easement',
    '/services/distressed-reo',
    '/services/strategic-marketing',
    '/services/value-positioning',
    '/services/valuation-appraisal',
    '/services/types-of-commercial-real-estate',
    '/closed-deals',
    '/market-reports',
    '/wec-effect',
    '/privacy-policy',
    '/terms-of-use',
    '/accessibility-statement',
    '/mls',

    // Dynamic: team members
    ...teamMembers.map(m => `/team/${m.slug}`),

    // Dynamic: blog posts
    ...blogPosts.map(p => `/blog/${p.slug}`),

    // Dynamic: closed deals
    ...closedDeals.map(d => `/closed-deals/${d.slug}`),

    // Dynamic: property type base pages
    ...propertyTypes.map(p => `/properties/${p.slug}`),

    // Dynamic: property type × location geo pages
    ...propertyTypes.flatMap(p =>
      getAllLocations().map(l => `/properties/${p.slug}/${l.slug}`)
    ),
  ];
}
