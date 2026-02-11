import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-black">
      {/* Background Media */}
      <div className="absolute inset-0">
        <img 
          src="https://svnmcdonald.com/wp-content/uploads/2024/10/Hwy-484-Ocala-1920x1073.jpg"
          alt="Central Florida Real Estate"
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        {/* Gradients to match the original site's depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40" />
      </div>

      {/* Content Container - Matching Elementor's max-width */}
      <div className="relative h-full max-w-[1140px] mx-auto flex flex-col items-center md:items-start justify-center px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <div className="inline-block h-1 w-20 bg-svn-orange mb-8 md:mb-10" />
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[85px] font-[800] text-white tracking-[-0.02em] leading-[1.1] mb-8 uppercase">
            National Reach.<br />
            <span className="text-white">Local Expertise.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-white/90 font-[500] mb-12 max-w-2xl leading-relaxed">
            Taking collaboration in commercial and land real estate<br className="hidden md:block" /> to a whole new level.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/land-properties" className="bg-svn-orange hover:bg-white hover:text-svn-orange text-white px-10 py-5 rounded-[10px] font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-xl border-2 border-svn-orange text-center">
              SVN Land Listings
            </Link>
            <Link to="/commercial-properties" className="bg-transparent hover:bg-svn-orange border-2 border-white hover:border-svn-orange text-white px-10 py-5 rounded-[10px] font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-xl text-center">
              SVN Commercial Listings
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Side indicators (decorative lines common in Elementor designs) */}
      <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-white/10 hidden xl:block" />
      <div className="absolute right-10 top-0 bottom-0 w-[1px] bg-white/10 hidden xl:block" />
    </div>
  );
};

export default Hero;
