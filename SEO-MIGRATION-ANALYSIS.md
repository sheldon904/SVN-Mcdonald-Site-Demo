# SEO Migration Analysis: Current Live Site vs. This Repo

**Date:** April 4, 2026
**Scope:** Full SEO posture comparison between the live WordPress/Buildout site at svnmcdonald.com and this React/Vite/Vercel repository

---

## Executive Summary

This repo is **significantly superior** in SEO posture. Switching to it should **improve rankings** over the medium-to-long term, with only a minor temporary dip during re-indexing (1-4 weeks, standard for any site migration).

---

## Current Live Site (WordPress + Buildout)

| Aspect | Detail |
|--------|--------|
| Platform | WordPress CMS + Buildout listing embed |
| URL Pattern | Verbose WordPress slugs (e.g., `/office-properties/office-properties-in-clermont-florida/`) |
| Structured Data | Likely basic Yoast SEO schema (Organization + WebPage) |
| Indexed Pages | ~50-100 estimated |
| Listing URLs | Query parameters (`?propertyId=1119580-lease/`) — poor for SEO |
| Performance | WordPress TTFB + plugin overhead |

### Weaknesses

- Template-based CMS with limited markup control
- Redundant, verbose URL patterns
- Query-parameter property URLs (non-crawlable)
- Generic Yoast-generated meta tags
- No evidence of advanced schema (FAQ, Person, Article, RealEstateAgent)
- No geo meta tags
- WordPress plugin/theme overhead impacts page speed

---

## This Repo (React 19 + Vite + Vercel)

### On-Page SEO

| Feature | Implementation |
|---------|---------------|
| Title Tags | Dynamic per-page via `SEOHead.tsx` |
| Meta Descriptions | Custom per page |
| Canonical URLs | Auto-generated on every page |
| Open Graph | Full suite (type, locale, site_name, title, desc, url, image) |
| Twitter Cards | `summary_large_image` with @svnmcdonald handle |
| Geo Meta Tags | `geo.region`, `geo.placename`, `geo.position` per page |
| Heading Hierarchy | Proper H1-H2-H3 with sr-only H1 on hero pages |
| Image Alt Text | Comprehensive on all meaningful images |

### Structured Data (7 Schema Types)

| Schema | Details |
|--------|---------|
| LocalBusiness + RealEstateAgent | Full address, geo coords, hours, services, payment methods, area served |
| WebSite | Site-level schema |
| BreadcrumbList | Dynamic per-page |
| Article | Blog posts with headline, dates, author, publisher |
| FAQPage | Rich snippet eligible |
| Person + RealEstateAgent | Agent pages with specialties, education, worksFor |
| OfferCatalog | 6 service categories |

### Technical SEO

| Feature | Detail |
|---------|--------|
| Sitemap | 1,161 URLs with priorities and changefreq |
| URL Structure | Clean hierarchical `/properties/{type}/{location}` |
| Geo Pages | 105 property-type x location pages (15 types x 7 locations) |
| 301 Redirects | 200+ permanent redirects covering all known old WordPress URLs |
| Security Headers | X-Content-Type-Options, X-Frame-Options, Referrer-Policy |
| Cache | 1-year immutable on assets and fonts |
| Font Loading | Preload WOFF2, async Google Fonts, font-display: swap |
| Images | WebP, lazy loading, eager hero, fetchPriority high |
| Code Splitting | Vendor chunks (React, Motion, UI, Maps, GSAP) |
| Bot Rendering | Prerender.io middleware for search engine crawlers |

### Content Depth

| Area | Volume |
|------|--------|
| Property Type Pages | 15 unique types |
| Geo-Specific Pages | 105 pages |
| Blog Posts | 18 articles |
| Team Profiles | 3 agents with schema |
| Service Pages | 8 detailed pages |
| Total Sitemap URLs | 1,161 |

---

## Head-to-Head Comparison

| Factor | Current Site | This Repo | Winner |
|--------|-------------|-----------|--------|
| Structured Data | Basic Yoast | 7 schema types | **Repo** |
| Page Count | ~50-100 | 1,161 | **Repo** |
| Geo-Local SEO | Some geo pages | 105 purpose-built + geo meta | **Repo** |
| URL Quality | Redundant/query params | Clean hierarchy | **Repo** |
| Performance | WordPress overhead | Optimized SPA + code splitting | **Repo** |
| Meta Tags | Yoast generic | Custom per-page | **Repo** |
| Server Rendering | WordPress HTML | SPA + Prerender.io | Current site (slight) |
| Redirect Coverage | N/A | 200+ 301 redirects | **Repo** |
| Security Headers | Unknown | Full suite | **Repo** |

---

## Migration Risk Assessment

### Short-Term (Weeks 1-4): Minor Dip Expected

- Standard re-indexing period for any domain migration
- 301 redirects pass ~90-99% of link equity
- Prerender.io serves HTML to crawlers

### Medium-Term (Months 1-3): Recovery + Growth

- 105 new geo pages capture local search traffic
- Rich snippets from FAQ/Article/Person schema improve CTR
- Faster page speed improves Core Web Vitals signals

### Long-Term (Months 3+): Significant Improvement

- Architecturally superior SEO foundation
- 1,161-page sitemap is a local SEO powerhouse

---

## Critical Pre-Migration Checklist

### Must-Fix

1. **Set `PRERENDER_TOKEN`** in Vercel env vars — without this, non-Google bots see empty content
2. **Add `/waterfront-properties/` redirect** — currently indexed but missing from redirect map
3. **Add catch-all for Buildout query-param URLs** — `?propertyId=` pages are indexed

### Should-Fix

4. Submit updated sitemap to Google Search Console immediately after launch
5. Request indexing of key pages via URL Inspection tool
6. Monitor 404 errors in Search Console for 90 days post-launch
7. Test Prerender.io with `curl -A "googlebot"` after deployment

---

## Verdict

**This repo is the clear winner.** It represents a generational leap in SEO quality. The migration is safe provided the pre-migration checklist is completed. Rankings should improve significantly after the standard re-indexing period.
