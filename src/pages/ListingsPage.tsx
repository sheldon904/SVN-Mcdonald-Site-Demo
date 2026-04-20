import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BuildoutListing from '../components/BuildoutListing';
import { BUILDOUT_LAND_TOKEN, BUILDOUT_COMMERCIAL_TOKEN } from '../components/BuildoutListing';
import TeamBanner from '../components/TeamBanner';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, MapPin } from 'lucide-react';

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
              At SVN McDonald & Company, land is in our DNA. We speak the language of ranches, horse farms, large-acreage tracts, pasture lands, production farms, recreational properties, and transition land. Ranch stewardship has been an integral part of each of our family stories, shaping how we understand, evaluate, and market land. We know the feeling of saddling a horse at daybreak, walking a fenceline, thinning pines, planting a food plot with your kids, or resting in the shade of a live oak after a long day outdoors. These aren't just fleeting moments; they're treasured memories that connect us to our clients and to the land we're fortunate to help steward.
            </p>
            <p>
              Since 2007, we've been headquartered in the heart of Florida's horse country and are trusted advisors for landowners across Marion, Alachua, Lake, Sumter, and Levy counties. We help families, individuals, and companies market their land confidently to achieve the highest possible value in the shortest time. Our team combines local roots and boots-on-the-ground knowledge with global marketing horsepower to guide you through every step of the land journey with care and expertise.
            </p>
          </div>
        </div>

        {/* WEC Effect CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center lg:items-start pt-8 lg:pt-0"
        >
          <Link
            to="/wec-effect"
            className="bg-svn-orange text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white hover:text-svn-dark transition-all duration-300 shadow-xl flex items-center gap-3 whitespace-nowrap border-2 border-svn-orange"
          >
            The WEC Effect <ArrowRight size={18} />
          </Link>
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
              Since 2007, SVN McDonald & Company has served as a trusted partner in commercial and industrial real estate throughout Ocala and Central Florida. With deep local knowledge, a global marketing platform, and a love of commercial properties, we help property owners, investors, developers, and families navigate complex transactions with confidence. From big-box warehouses, medium-bay spaces, build-to-suit opportunities, NNN investment sales, and land for development, our team brings decades of combined experience to every deal. We understand how to navigate the finer details that impact commercial value—whether it's zoning codes, utility access, traffic flow, or future land use. We know what's at stake and work hard to create value for our clients while supporting strategic growth in the communities we serve.
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
              { icon: <TrendingUp size={24} className="text-svn-orange" />, stat: '#1', label: 'Fastest Growing Metro in the Nation' },
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
      <StructuredData breadcrumbs={[
        { name: 'Home', url: 'https://svnmcdonald.com' },
        { name: isLand ? 'Land Properties' : 'Commercial Properties', url: `https://svnmcdonald.com/${isLand ? 'land' : 'commercial'}-properties` },
      ]} />
      <Navbar />

      {/* Header with H1 */}
      <div className="bg-svn-dark pt-32 pb-16 md:pt-44 md:pb-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="w-20 h-1.5 bg-svn-orange mb-8" />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-tight">
            {isLand ? 'Land' : 'Commercial'}{' '}
            <span className="text-svn-orange">Properties</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mt-6">
            {isLand
              ? 'Browse premier land listings across Ocala and Central Florida.'
              : 'Explore commercial real estate listings across Central Florida.'}
          </p>
        </div>
      </div>

      <main>

        {/* Editorial Intro (land vs. commercial) */}
        {isLand ? <LandIntro /> : <CommercialIntro />}

        {/* Buildout Inventory Grid + Map */}
        <section className="py-16 px-6 bg-[#F6F6F6]">
          <div className="max-w-[1280px] mx-auto">
            <BuildoutListing
              pluginType="inventory"
              containerId={isLand ? 'land-buildout-container' : 'commercial-buildout-container'}
              token={isLand ? BUILDOUT_LAND_TOKEN : BUILDOUT_COMMERCIAL_TOKEN}
            />
          </div>
        </section>

        {/* Market Report CTA */}
        <ReportCTA isLand={isLand} />

        {/* Regional Sub-Links */}
        <RegionalLinks />

        {/* Team Banner */}
        <TeamBanner image={isLand ? "/images/properties/land-experts-aerial.jpg" : "/images/properties/commercial-experts-building.jpg"} />
      </main>

      <Footer />
    </div>
  );
};

export default ListingsPage;
