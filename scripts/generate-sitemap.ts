import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Import data from src
import { blogPosts } from '../src/data/blogPosts.js';
import { closedDeals } from '../src/data/closedDeals.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://svnmcdonald.com';

interface SitemapEntry {
  loc: string;
  changefreq: string;
  priority: string;
}

// Static pages (from the existing sitemap)
const staticPages: SitemapEntry[] = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/land-properties', changefreq: 'weekly', priority: '0.9' },
  { loc: '/commercial-properties', changefreq: 'weekly', priority: '0.9' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.8' },
  { loc: '/team', changefreq: 'monthly', priority: '0.7' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.9' },
  { loc: '/services', changefreq: 'monthly', priority: '0.8' },
  { loc: '/services/conservation-easement', changefreq: 'monthly', priority: '0.7' },
  { loc: '/services/distressed-reo', changefreq: 'monthly', priority: '0.7' },
  { loc: '/services/land-auctions', changefreq: 'monthly', priority: '0.7' },
  { loc: '/services/land-brokerage', changefreq: 'monthly', priority: '0.7' },
  { loc: '/services/strategic-marketing', changefreq: 'monthly', priority: '0.7' },
  { loc: '/services/value-positioning', changefreq: 'monthly', priority: '0.7' },
  { loc: '/services/valuation-appraisal', changefreq: 'monthly', priority: '0.7' },
  { loc: '/services/types-of-commercial-real-estate', changefreq: 'monthly', priority: '0.7' },
  { loc: '/closed-deals', changefreq: 'monthly', priority: '0.8' },
  { loc: '/market-reports', changefreq: 'monthly', priority: '0.8' },
  { loc: '/wec-effect', changefreq: 'monthly', priority: '0.8' },
  { loc: '/mls', changefreq: 'monthly', priority: '0.7' },
  // Team members
  { loc: '/team/bartow-mcdonald', changefreq: 'monthly', priority: '0.6' },
  { loc: '/team/matthew-garff', changefreq: 'monthly', priority: '0.6' },
  { loc: '/team/stiles-mcdonald', changefreq: 'monthly', priority: '0.6' },
  // Property types
  { loc: '/properties/acreage', changefreq: 'monthly', priority: '0.7' },
  { loc: '/properties/commercial', changefreq: 'monthly', priority: '0.7' },
  { loc: '/properties/equestrian', changefreq: 'monthly', priority: '0.7' },
  { loc: '/properties/farm-nursery', changefreq: 'monthly', priority: '0.7' },
  { loc: '/properties/hunting-recreation', changefreq: 'monthly', priority: '0.7' },
  { loc: '/properties/industrial', changefreq: 'monthly', priority: '0.7' },
  { loc: '/properties/multi-family', changefreq: 'monthly', priority: '0.7' },
  { loc: '/properties/office', changefreq: 'monthly', priority: '0.7' },
  { loc: '/properties/ranch', changefreq: 'monthly', priority: '0.7' },
  { loc: '/properties/retail', changefreq: 'monthly', priority: '0.7' },
  { loc: '/properties/residential-development', changefreq: 'monthly', priority: '0.7' },
  { loc: '/properties/self-storage', changefreq: 'monthly', priority: '0.7' },
  { loc: '/properties/timber', changefreq: 'monthly', priority: '0.7' },
  { loc: '/properties/triple-net-nnn', changefreq: 'monthly', priority: '0.7' },
  { loc: '/properties/warehouse', changefreq: 'monthly', priority: '0.7' },
  // Legal
  { loc: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { loc: '/terms-of-use', changefreq: 'yearly', priority: '0.3' },
  { loc: '/accessibility-statement', changefreq: 'yearly', priority: '0.3' },
];

// Dynamic pages from data
const blogPages: SitemapEntry[] = blogPosts.map((post) => ({
  loc: `/blog/${post.slug}`,
  changefreq: 'monthly',
  priority: '0.6',
}));

const dealPages: SitemapEntry[] = closedDeals.map((deal) => ({
  loc: `/closed-deals/${deal.slug}`,
  changefreq: 'yearly',
  priority: '0.5',
}));

const allPages = [...staticPages, ...blogPages, ...dealPages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outPath = path.resolve(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf-8');
console.log(`Sitemap generated: ${allPages.length} URLs → ${outPath}`);
