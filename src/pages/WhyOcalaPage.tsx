import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Truck,
  Home,
  Briefcase,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import FAQStructuredData from '../components/FAQStructuredData';
import { ocalaMarketFAQ } from '../data/faqData';

const PAGE_URL = 'https://svnmcdonald.com/why-ocala';
const LAST_UPDATED_ISO = '2026-05-21';
const LAST_UPDATED_LABEL = 'May 2026';

// ---------------------------------------------------------------------------
// Data — every figure is sourced in the "Sources & methodology" section below.
// Update these values as new Census / U-Haul / BLS releases come out.
// ---------------------------------------------------------------------------

const keyStats: { value: string; label: string; source: string }[] = [
  { value: '442,660', label: 'Metro population (July 2025)', source: 'U.S. Census Bureau' },
  { value: '#1', label: 'Fastest-growing U.S. metro — two years running', source: 'U.S. Census Bureau' },
  { value: '+66,700', label: 'New residents since the 2020 Census', source: 'U.S. Census Bureau' },
  { value: '3.4%', label: 'Population growth, 2024–2025', source: 'U.S. Census Bureau' },
  { value: '#1', label: 'U.S. growth city for in-migration', source: 'U-Haul Growth Index 2024' },
  { value: '~45/day', label: 'New residents moving in (2023–24)', source: 'U.S. Census Bureau' },
];

const populationRows: { period: string; population: string; change: string }[] = [
  { period: '2020 (decennial Census)', population: '375,908', change: 'baseline' },
  { period: 'July 2024 (estimate)', population: '428,000', change: '+4.0% YoY (2023–24)' },
  { period: 'July 2025 (estimate)', population: '442,660', change: '+3.4% YoY (2024–25)' },
];

const rankings: { category: string; standing: string; source: string }[] = [
  { category: 'Population growth (% change)', standing: '#1 U.S. metro — 2023–24 and 2024–25', source: 'U.S. Census Bureau' },
  { category: 'In-migration (U-Haul Growth Index)', standing: '#1 U.S. growth city — 2024 (3rd time in 4 years)', source: 'U-Haul' },
  { category: 'Future job growth', standing: 'Forbes Top 10 metro, multiple consecutive years', source: 'Forbes' },
  { category: 'Net new residents added', standing: '48th nationally — from the 146th-largest metro', source: 'U.S. Census Bureau' },
  { category: 'Manufacturing workforce share', standing: '≈2× the Florida state average', source: 'Ocala CEP / BLS' },
];

const industrialUsers: { name: string; detail: string }[] = [
  { name: 'Amazon', detail: '1,085,280 SF warehouse acquired for ~$97.7M (2025) + a 617,000 SF building, plus its original fulfillment center' },
  { name: 'Chewy', detail: 'Major e-commerce distribution center in the I-75 commerce park' },
  { name: 'FedEx', detail: 'Regional distribution / logistics operation' },
  { name: 'AutoZone', detail: 'Distribution center within the ~500-acre commerce park' },
  { name: 'Dollar Tree', detail: 'Large-format distribution presence' },
  { name: 'Owens Corning', detail: 'Manufacturing operation anchoring the industrial base' },
];

const growthCorridors: string[] = [
  'Marion Oaks',
  'Southwest Ocala',
  'State Road 200 corridor',
  'World Equestrian Center corridor',
  'Silver Springs Shores',
  'Belleview / Summerfield',
];

const sources: { label: string; url: string }[] = [
  { label: 'U.S. Census Bureau — Metro & Micro Area Population Estimates (Vintage 2025)', url: 'https://www.census.gov/programs-surveys/popest.html' },
  { label: 'University of Florida, Bureau of Economic and Business Research (BEBR)', url: 'https://www.bebr.ufl.edu/population/' },
  { label: 'U-Haul Growth Index — Top U.S. Growth Cities', url: 'https://www.uhaul.com/Articles/About/U-Haul-Growth-Metros-And-Cities-Of-2024-Dallas-Top-Metro-for-IN-Migration-33084/' },
  { label: 'U.S. Bureau of Labor Statistics — Ocala, FL economic data', url: 'https://www.bls.gov/regions/southeast/florida.htm' },
  { label: 'Federal Reserve (FRED) — Marion County, FL building permits', url: 'https://fred.stlouisfed.org/series/BPPRIV012083' },
  { label: 'Ocala Metro CEP (Chamber & Economic Partnership)', url: 'https://ocalacep.com/' },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "Why Ocala? The Market Data Behind America's Fastest-Growing Metro",
  description:
    "A data-driven look at why the Ocala / Marion County metro was ranked the #1 fastest-growing metro area in the United States — population, migration, industrial growth, jobs, and what it means for Central Florida commercial real estate.",
  datePublished: LAST_UPDATED_ISO,
  dateModified: LAST_UPDATED_ISO,
  image: 'https://svnmcdonald.com/images/hero/hwy-484-ocala-1920.jpg',
  author: {
    '@type': 'Organization',
    '@id': 'https://svnmcdonald.com/#organization',
    name: 'SVN McDonald & Company',
  },
  publisher: { '@id': 'https://svnmcdonald.com/#organization' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
};

const sectionIcon = 'text-svn-orange flex-shrink-0';

const WhyOcalaPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F6F6] overflow-x-hidden">
      <SEOHead
        title="Why Ocala? The Data Behind America's Fastest-Growing Metro"
        description="Why is the Ocala / Marion County metro the #1 fastest-growing metro in the U.S.? A sourced breakdown of population, migration, industrial growth, jobs, and the Central Florida real estate opportunity."
        canonical={PAGE_URL}
        ogType="article"
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Home', url: 'https://svnmcdonald.com' },
          { name: 'Why Ocala', url: PAGE_URL },
        ]}
      />
      <FAQStructuredData faqs={ocalaMarketFAQ} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <Navbar />

      <main id="main-content">
      {/* Hero */}
      <header className="relative bg-svn-dark pt-32 pb-20 md:pt-48 md:pb-28 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero/hwy-484-ocala-1920.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width={1920}
            height={1080}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-svn-dark to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="w-20 h-1.5 bg-svn-orange mb-8" />
            <p className="text-svn-orange text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-5">
              Market Data · Ocala &amp; Marion County, Florida
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight mb-8 leading-[1.05]">
              Why <span className="text-svn-orange">Ocala?</span> The Data Behind America&apos;s Fastest-Growing Metro
            </h1>
            <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed max-w-3xl">
              For two consecutive years, the U.S. Census Bureau ranked the Ocala metro the
              fastest-growing in the United States. Here is what the numbers actually say —
              population, migration, industrial expansion, jobs — and what it means for
              Central Florida commercial real estate.
            </p>
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mt-8">
              Last updated {LAST_UPDATED_LABEL} · SVN McDonald &amp; Company Research
            </p>
          </motion.div>
        </div>
      </header>

      {/* Key stats — TL;DR */}
      <section aria-label="Key statistics" className="py-16 md:py-20 px-6 -mt-px">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {keyStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col"
              >
                <span className="text-4xl md:text-5xl font-black text-svn-orange tracking-tight">
                  {stat.value}
                </span>
                <span className="text-svn-dark font-semibold mt-3 leading-snug">
                  {stat.label}
                </span>
                <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider mt-auto pt-3">
                  Source: {stat.source}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-[1000px] mx-auto px-6 pb-8">
        {/* Section: how fast */}
        <section className="py-10 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp size={28} className={sectionIcon} aria-hidden="true" />
            <h2 className="text-2xl md:text-4xl font-black text-svn-dark uppercase tracking-tight">
              How fast is Ocala growing?
            </h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            The Ocala metropolitan area — which is coterminous with Marion County — reached an
            estimated <strong className="text-svn-dark">442,660 residents as of July 1, 2025</strong>,
            according to the U.S. Census Bureau. That is an increase of more than{' '}
            <strong className="text-svn-dark">66,700 people since the 2020 Census</strong>, or
            roughly <strong className="text-svn-dark">17.8% in five years</strong>. The Census
            Bureau named Ocala the <strong className="text-svn-dark">#1 fastest-growing metro in
            the United States</strong> by percentage growth in both its 2023–2024 and 2024–2025
            population estimates — the second year in a row at the top of the national list.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left border-collapse">
              <caption className="sr-only">Ocala metro population, 2020 to 2025</caption>
              <thead>
                <tr className="bg-svn-dark text-white">
                  <th scope="col" className="px-5 py-4 text-sm font-bold uppercase tracking-wider">Period</th>
                  <th scope="col" className="px-5 py-4 text-sm font-bold uppercase tracking-wider">Population</th>
                  <th scope="col" className="px-5 py-4 text-sm font-bold uppercase tracking-wider">Annual change</th>
                </tr>
              </thead>
              <tbody>
                {populationRows.map((row) => (
                  <tr key={row.period} className="border-t border-gray-100">
                    <td className="px-5 py-4 text-svn-dark font-medium">{row.period}</td>
                    <td className="px-5 py-4 text-svn-dark font-black">{row.population}</td>
                    <td className="px-5 py-4 text-gray-500">{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Source: U.S. Census Bureau Vintage 2025 population estimates. 2024 figure approximate.
            Ocala MSA = Marion County, FL.
          </p>
        </section>

        {/* Section: why moving */}
        <section className="py-10 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Users size={28} className={sectionIcon} aria-hidden="true" />
            <h2 className="text-2xl md:text-4xl font-black text-svn-dark uppercase tracking-tight">
              Why are people moving to Ocala?
            </h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            In 2023–2024, an estimated <strong className="text-svn-dark">318 people per week — about
            45 per day</strong> — moved into the Ocala market. U-Haul named Ocala its{' '}
            <strong className="text-svn-dark">#1 U.S. growth city for in-migration in 2024</strong>,
            the third time in four years it has topped that index, with 53.7% of one-way truck
            traffic inbound. The recurring reasons:
          </p>
          <ul className="grid md:grid-cols-2 gap-3 text-gray-700">
            {[
              'Lower cost of living and land prices than Orlando, Tampa, and South Florida',
              'Interstate 75 access — within a few hours of most of Florida’s population',
              'Rapid job growth in manufacturing, distribution, and healthcare',
              'Retirement and lifestyle migration, including 55+ communities',
              'Remote workers relocating from higher-cost states',
              'The World Equestrian Center drawing visitors, residents, and investment',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-100">
                <span className="text-svn-orange font-black mt-0.5">›</span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section: industrial */}
        <section className="py-10 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Truck size={28} className={sectionIcon} aria-hidden="true" />
            <h2 className="text-2xl md:text-4xl font-black text-svn-dark uppercase tracking-tight">
              The industrial &amp; logistics boom
            </h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Ocala has transformed from a market known for equestrian, retirement, and healthcare
            into one of the Southeast&apos;s fastest-growing secondary logistics hubs. The
            <strong className="text-svn-dark"> Ocala/Marion County Commerce Park</strong> and
            <strong className="text-svn-dark"> Florida Crossroads Logistics Center</strong> along
            I-75 now anchor a roughly 500-acre cluster of national distributors:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {industrialUsers.map((user) => (
              <div key={user.name} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-black text-svn-dark uppercase tracking-tight mb-1">{user.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{user.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 leading-relaxed">
            That absorption has driven up trucking demand, warehouse occupancy, and industrial land
            values across the corridor. See current{' '}
            <Link to="/properties/industrial" className="text-svn-orange-text font-bold underline underline-offset-2 hover:text-svn-orange">
              Ocala industrial &amp; warehouse listings
            </Link>{' '}
            for active opportunities.
          </p>
        </section>

        {/* Section: housing */}
        <section className="py-10 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Home size={28} className={sectionIcon} aria-hidden="true" />
            <h2 className="text-2xl md:text-4xl font-black text-svn-dark uppercase tracking-tight">
              Housing &amp; construction
            </h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            To keep pace with in-migration, Marion County authorized nearly{' '}
            <strong className="text-svn-dark">6,730 new housing units by building permit in 2024</strong>{' '}
            (Federal Reserve / Census data). Master-planned communities and single-family rooftops
            are concentrated in a handful of high-growth submarkets:
          </p>
          <div className="flex flex-wrap gap-3">
            {growthCorridors.map((area) => (
              <span
                key={area}
                className="bg-white border border-gray-200 rounded-full px-5 py-2 text-svn-dark font-semibold text-sm shadow-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </section>

        {/* Section: jobs */}
        <section className="py-10 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase size={28} className={sectionIcon} aria-hidden="true" />
            <h2 className="text-2xl md:text-4xl font-black text-svn-dark uppercase tracking-tight">
              Jobs &amp; the economy
            </h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            <em>Forbes</em> has named the Ocala MSA to its{' '}
            <strong className="text-svn-dark">Top 10 metros for future job growth</strong> for
            multiple consecutive years, with projected job growth more than double the national
            average. Hiring is strongest in transportation and warehousing, manufacturing,
            healthcare, construction, and professional services — and the share of the local labor
            force in manufacturing runs roughly <strong className="text-svn-dark">twice the Florida
            state average</strong>. Continued in-migration keeps feeding the workforce that
            employers need.
          </p>
        </section>

        {/* Rankings table */}
        <section className="py-10 border-t border-gray-200">
          <h2 className="text-2xl md:text-4xl font-black text-svn-dark uppercase tracking-tight mb-6">
            Ocala&apos;s national rankings at a glance
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left border-collapse">
              <caption className="sr-only">Ocala metro national rankings by category</caption>
              <thead>
                <tr className="bg-svn-dark text-white">
                  <th scope="col" className="px-5 py-4 text-sm font-bold uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-5 py-4 text-sm font-bold uppercase tracking-wider">National standing</th>
                  <th scope="col" className="px-5 py-4 text-sm font-bold uppercase tracking-wider">Source</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((row) => (
                  <tr key={row.category} className="border-t border-gray-100 align-top">
                    <td className="px-5 py-4 text-svn-dark font-semibold">{row.category}</td>
                    <td className="px-5 py-4 text-gray-700">{row.standing}</td>
                    <td className="px-5 py-4 text-gray-400 text-sm">{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Investor thesis */}
        <section className="py-10 border-t border-gray-200">
          <h2 className="text-2xl md:text-4xl font-black text-svn-dark uppercase tracking-tight mb-6">
            Why national investors are watching Ocala
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Institutional capital increasingly views Ocala the way it viewed{' '}
            <strong className="text-svn-dark">Lakeland 10–15 years ago</strong> or{' '}
            <strong className="text-svn-dark">Jacksonville&apos;s industrial market a generation
            ago</strong>: an emerging secondary market with cheaper land, favorable taxes, available
            workforce, central-Florida access, and explosive population growth — at lower barriers
            to entry than Orlando or Tampa. The result is institutional warehouse development, IOS
            (industrial outdoor storage) interest, large master-planned projects, medical-office
            growth, and retail following the rooftops. For a deeper look at how one catalyst is
            reshaping land values, read our{' '}
            <Link to="/wec-effect" className="text-svn-orange-text font-bold underline underline-offset-2 hover:text-svn-orange">
              World Equestrian Center land report
            </Link>.
          </p>
        </section>

        {/* FAQ */}
        <section className="py-10 border-t border-gray-200">
          <h2 className="text-2xl md:text-4xl font-black text-svn-dark uppercase tracking-tight mb-8">
            Ocala growth: frequently asked questions
          </h2>
          <div className="space-y-4">
            {ocalaMarketFAQ.map((faq) => (
              <div key={faq.question} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-svn-dark mb-2">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="py-10 border-t border-gray-200">
          <h2 className="text-xl md:text-2xl font-black text-svn-dark uppercase tracking-tight mb-5">
            Sources &amp; methodology
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-5">
            Figures on this page are drawn from primary public data sources, current as of{' '}
            {LAST_UPDATED_LABEL}. The Ocala Metropolitan Statistical Area is coterminous with Marion
            County, Florida. We update this page as new estimates are released.
          </p>
          <ul className="space-y-2">
            {sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 text-svn-orange-text hover:text-svn-orange font-medium text-sm"
                >
                  <ExternalLink size={14} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="underline underline-offset-2">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* CTA */}
      <section className="bg-svn-dark py-20 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
            Invest in the fastest-growing metro in America
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            SVN McDonald &amp; Company is Ocala&apos;s commercial and land brokerage. If you want to
            buy, sell, or invest in the Marion County market, our research team can put this data to
            work for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 bg-svn-orange text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded hover:bg-svn-orange-text transition-colors group"
            >
              Talk to our Ocala team
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/commercial-properties"
              className="inline-flex items-center justify-center gap-3 bg-white/10 text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded hover:bg-white/20 transition-colors"
            >
              Browse commercial listings
            </Link>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhyOcalaPage;
