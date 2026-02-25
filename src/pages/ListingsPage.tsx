import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BuildoutListing from '../components/BuildoutListing';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const ListingsPage = () => {
  const location = useLocation();
  const isLand = location.pathname.includes('land');
  
  const title = isLand ? "Land" : "Commercial";
  const subtitle = isLand 
    ? "Explore our premier land opportunities in Central Florida, from agricultural acreage to development sites."
    : "Discover full-service commercial real estate solutions for retail, office, industrial, and investment properties.";

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title={isLand ? "Land Properties for Sale in Central Florida" : "Commercial Properties for Sale in Central Florida"}
        description={isLand ? "Browse SVN McDonald's premier land listings in Ocala and Central Florida. Agricultural, development, and investment land opportunities." : "Explore commercial real estate listings in Central Florida. Retail, office, industrial, and investment properties from SVN McDonald & Company."}
        canonical={isLand ? "https://svnmcdonald.com/land-properties" : "https://svnmcdonald.com/commercial-properties"}
      />
      <Navbar />
      
      {/* Header Spacer */}
      <div className="h-24 md:h-32 bg-svn-dark" />

      <main className="py-16 px-6">
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

          {/* 
            Note: If Buildout supports filtering by tags/categories via the API, 
            we could pass those as props here. For now, we show the full inventory 
            which is common for these plugins as they often have their own internal filters.
          */}
          <BuildoutListing pluginType="inventory" containerId="inventory-buildout-container" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ListingsPage;
