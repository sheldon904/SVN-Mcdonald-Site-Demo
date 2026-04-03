import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { motion } from 'framer-motion';
import { Phone, Search, Map, Bell, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { icon: Search, label: '29,000+ Active Listings' },
  { icon: Map, label: 'Interactive Map Search' },
  { icon: Bell, label: 'Save Searches & Alerts' },
  { icon: Video, label: 'Virtual Tours' },
];

const MLSPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title="MLS Property Search"
        description="Search the full Stellar MLS database for commercial and land properties across Central Florida. Powered by SVN McDonald & Company."
        canonical="https://svnmcdonald.com/mls"
      />
      <StructuredData breadcrumbs={[
        { name: 'Home', url: 'https://svnmcdonald.com' },
        { name: 'MLS Search', url: 'https://svnmcdonald.com/mls' },
      ]} />
      <Navbar />

      <PageHeader
        title="MLS"
        highlightedText="Search"
        subtitle="Search the full Stellar MLS database"
      />

      {/* Coming Soon Section */}
      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-1.5 bg-svn-orange mx-auto mb-10" />
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-svn-dark mb-8">
              Coming <span className="text-svn-orange">Soon</span>
            </h2>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
              Our full MLS property search powered by Stellar MLS is being integrated. In the meantime, contact our team for property-specific inquiries.
            </p>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          >
            <a
              href="tel:3522884491"
              className="bg-svn-orange text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-svn-dark transition-all duration-300 shadow-xl flex items-center gap-3"
            >
              <Phone size={20} />
              352.288.4491
            </a>
            <Link
              to="/contact"
              className="bg-svn-dark text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-svn-orange transition-all duration-300 shadow-xl"
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-svn-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon size={28} className="text-svn-orange" />
                </div>
                <p className="text-lg font-bold text-svn-dark uppercase tracking-wider">
                  {feature.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark CTA Section */}
      <section className="py-24 bg-svn-dark text-white px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
              Need Help Finding a <span className="text-svn-orange">Property?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Our team has access to the full Stellar MLS database and can help you find exactly what you're looking for across Central Florida.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-svn-orange text-white px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-svn-orange transition-all duration-300 shadow-xl"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MLSPage;
