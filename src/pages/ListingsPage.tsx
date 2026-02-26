import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BuildoutListing from '../components/BuildoutListing';
import TeamBanner from '../components/TeamBanner';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, BarChart3, MapPin } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Static Data                                                        */
/* ------------------------------------------------------------------ */

const counties = ['Marion', 'Alachua', 'Lake', 'Levy', 'Sumter', 'Citrus'];
const cities = ['Ocala', 'Gainesville', 'Clermont', 'Leesburg'];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/** Editorial intro that sits above the Buildout embed */
const LandIntro = () => (
  <section className="py-24 px-6 bg-white">
    <div className="max-w-[1280px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        {/* Copy */}
        <div className="lg:col-span-2">
          <div className="w-20 h-1.5 bg-svn-orange mb-8" />
          <h2 className="text-4xl md:text-5xl font-black text-svn-dark uppercase tracking-tight mb-8 leading-tight">
            Central Florida <span className="text-svn-orange">Land for Sale</span>
          </h2>
          <div className="space-y-6 text-gray-500 text-lg font-medium leading-relaxed">
            <p>
              Since 2007, SVN McDonald & Company has been the premier land brokerage in
              Central Florida, helping landowners, investors, and developers navigate one
              of the state's most dynamic markets. Our expertise spans agricultural,
              equestrian, development, timber, and recreational land across Marion, Lake,
              Alachua, Levy, and Sumter counties.
            </p>
            <p>
              The opening of the World Equestrian Center in 2021 has had a transformative
              impact on land values throughout the region. Properties within a 15-mile
              radius of the facility have experienced significant appreciation, and
              demand continues to grow as Ocala solidifies its reputation as the
              "Horse Capital of the World." Our team tracks every transaction and market
              shift so our clients can make informed decisions.
            </p>
            <p>
              Whether you are seeking a 5-acre homestead or a 500-acre development
              parcel, our advisors combine deep local knowledge with the SVN national
              platform to connect you with opportunities that match your goals.
            </p>
          </div>
        </div>

        {/* Sidebar Quick-Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
        >
          <h3 className="text-lg font-black text-svn-dark uppercase tracking-tight mb-6">
            Land Market Snapshot
          </h3>
          <div className="space-y-6">
            {[
              { icon: <BarChart3 size={24} className="text-svn-orange" />, stat: '300+', label: 'Transactions analyzed' },
              { icon: <TrendingUp size={24} className="text-svn-orange" />, stat: '200%', label: 'Land value increase near WEC' },
              { icon: <MapPin size={24} className="text-svn-orange" />, stat: '5', label: 'Counties served' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-svn-orange/10 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-2xl font-black text-svn-dark">{item.stat}</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const CommercialIntro = () => (
  <section className="py-24 px-6 bg-white">
    <div className="max-w-[1280px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        {/* Copy */}
        <div className="lg:col-span-2">
          <div className="w-20 h-1.5 bg-svn-orange mb-8" />
          <h2 className="text-4xl md:text-5xl font-black text-svn-dark uppercase tracking-tight mb-8 leading-tight">
            Central Florida <span className="text-svn-orange">Commercial Properties</span>
          </h2>
          <div className="space-y-6 text-gray-500 text-lg font-medium leading-relaxed">
            <p>
              SVN McDonald & Company provides full-service commercial real estate
              brokerage across Central Florida, representing buyers, sellers, landlords,
              and tenants in office, retail, industrial, and warehouse transactions. Our
              advisors understand the nuances of every submarket from downtown Ocala to
              the I-75 corridor.
            </p>
            <p>
              Ocala's strategic position along Interstate 75 has fueled a surge in
              distribution, logistics, and light-industrial development. The region's
              lower cost of doing business, combined with a rapidly growing population,
              makes it one of Florida's most compelling commercial markets. Retail
              corridors continue to expand, and office demand is rising as employers
              relocate operations from South Florida and beyond.
            </p>
            <p>
              Our brokerage leverages the national SVN platform — with 200+ offices
              worldwide — to expose every listing to the widest possible buyer pool while
              maintaining the hands-on service that local clients expect.
            </p>
          </div>
        </div>

        {/* Sidebar Market Highlights Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
        >
          <h3 className="text-lg font-black text-svn-dark uppercase tracking-tight mb-6">
            Market Highlights
          </h3>
          <div className="space-y-6">
            {[
              { icon: <TrendingUp size={24} className="text-svn-orange" />, stat: 'Top 10', label: 'Fastest-growing FL metro' },
              { icon: <BarChart3 size={24} className="text-svn-orange" />, stat: '200+', label: 'SVN offices worldwide' },
              { icon: <MapPin size={24} className="text-svn-orange" />, stat: 'I-75', label: 'Strategic corridor access' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-svn-orange/10 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-2xl font-black text-svn-dark">{item.stat}</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/** Market Report / WEC Effect CTA card */
const ReportCTA = ({ isLand }: { isLand: boolean }) => {
  const heading = isLand
    ? 'The WEC Effect Report'
    : 'Monthly Market Reports';
  const description = isLand
    ? 'Discover how the World Equestrian Center has reshaped Ocala land values — with data on 300+ transactions and pricing trends across Marion County.'
    : 'Stay ahead of the market with our monthly economic updates covering commercial transaction volume, cap rates, vacancy, and sector performance.';
  const linkTo = isLand ? '/wec-effect' : '/market-reports';

  return (
    <section className="py-24 px-6 bg-[#F6F6F6]">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-svn-dark rounded-2xl p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-svn-orange/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold text-svn-orange uppercase tracking-widest mb-4 block">
              Featured Report
            </span>
            <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4 leading-tight">
              {heading}
            </h3>
            <p className="text-gray-400 text-lg font-medium leading-relaxed">
              {description}
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              to={linkTo}
              className="bg-svn-orange text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white hover:text-svn-dark transition-all duration-300 shadow-xl flex items-center gap-3 whitespace-nowrap"
            >
              View Report <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/** Grid of regional county / city labels */
const RegionalLinks = () => (
  <section className="py-24 px-6 bg-white">
    <div className="max-w-[1280px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="w-20 h-1.5 bg-svn-orange mb-8" />
        <h2 className="text-4xl md:text-5xl font-black text-svn-dark uppercase tracking-tight mb-4 leading-tight">
          Areas We <span className="text-svn-orange">Serve</span>
        </h2>
        <p className="text-gray-500 text-lg font-medium leading-relaxed mb-12 max-w-2xl">
          Our brokerage covers a broad region of Central Florida, providing expert
          market knowledge in every county and city we operate.
        </p>
      </motion.div>

      {/* Counties */}
      <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
        Counties
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-10">
        {counties.map((county, i) => (
          <motion.div
            key={county}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md hover:border-svn-orange/30 transition-all duration-300"
          >
            <MapPin size={20} className="text-svn-orange mx-auto mb-3" />
            <p className="text-sm font-black text-svn-dark uppercase tracking-widest">
              {county}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Cities */}
      <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
        Cities
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cities.map((city, i) => (
          <motion.div
            key={city}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md hover:border-svn-orange/30 transition-all duration-300"
          >
            <MapPin size={20} className="text-svn-orange mx-auto mb-3" />
            <p className="text-sm font-black text-svn-dark uppercase tracking-widest">
              {city}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

const ListingsPage = () => {
  const location = useLocation();
  const isLand = location.pathname.includes('land');

  const title = isLand ? 'Land' : 'Commercial';
  const subtitle = isLand
    ? 'Explore our premier land opportunities in Central Florida, from agricultural acreage to development sites.'
    : 'Discover full-service commercial real estate solutions for retail, office, industrial, and investment properties.';

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title={
          isLand
            ? 'Land Properties for Sale in Central Florida'
            : 'Commercial Properties for Sale in Central Florida'
        }
        description={
          isLand
            ? "Browse SVN McDonald's premier land listings in Ocala and Central Florida. Agricultural, development, and investment land opportunities."
            : 'Explore commercial real estate listings in Central Florida. Retail, office, industrial, and investment properties from SVN McDonald & Company.'
        }
        canonical={
          isLand
            ? 'https://svnmcdonald.com/land-properties'
            : 'https://svnmcdonald.com/commercial-properties'
        }
      />
      <Navbar />

      {/* Header Spacer */}
      <div className="h-24 md:h-32 bg-svn-dark" />

      {/* Page Title */}
      <main>
        <section className="py-16 px-6 bg-[#F6F6F6]">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl"
              >
                <div className="w-20 h-1.5 bg-svn-orange mb-8" />
                <h1 className="text-4xl md:text-6xl font-black text-svn-dark uppercase tracking-tight mb-6">
                  {title} <span className="text-svn-orange">Inventory</span>
                </h1>
                <p className="text-gray-500 text-lg font-medium leading-relaxed">
                  {subtitle}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Editorial Intro (land vs. commercial) */}
        {isLand ? <LandIntro /> : <CommercialIntro />}

        {/* Buildout Embed */}
        <section className="py-16 px-6 bg-[#F6F6F6]">
          <div className="max-w-[1280px] mx-auto">
            <BuildoutListing pluginType="inventory" containerId="inventory-buildout-container" />
          </div>
        </section>

        {/* Market Report CTA */}
        <ReportCTA isLand={isLand} />

        {/* Regional Sub-Links */}
        <RegionalLinks />

        {/* Team Banner */}
        <TeamBanner />
      </main>

      <Footer />
    </div>
  );
};

export default ListingsPage;
