import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TreePine, Building2, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black">
      {/* ===== MOBILE HERO (< md) ===== */}
      <div className="md:hidden">
        {/* Full-screen hero with headline */}
        <div className="relative min-h-[70vh] flex flex-col items-center justify-center px-6">
          <img
            src="/78-acres-horse-country-hero.jpg"
            alt="Central Florida Real Estate"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            fetchPriority="high"
            decoding="sync"
            width={768}
            height={429}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center pt-32"
          >
            <h1 className="text-4xl font-[800] text-white tracking-[-0.02em] leading-[1.1] uppercase drop-shadow-lg">
              National Reach.<br />
              <span className="text-white">Local Expertise.</span>
            </h1>
            <p className="text-sm text-white/70 font-medium mt-3 max-w-xs mx-auto leading-relaxed">
              Central Florida's premier commercial and land real estate brokerage.
            </p>
          </motion.div>

          {/* Two compact cards at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-10 grid grid-cols-2 gap-3 w-full max-w-sm mt-10 mb-6"
          >
            <Link
              to="/land-properties"
              className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 text-center group"
            >
              <div className="w-11 h-11 rounded-full bg-svn-orange/20 border border-svn-orange flex items-center justify-center mx-auto mb-3 group-active:bg-svn-orange transition-colors">
                <TreePine size={20} className="text-white" />
              </div>
              <h2 className="text-sm font-black text-white uppercase tracking-tight mb-1">
                Land
              </h2>
              <p className="text-[10px] text-white/50 font-medium leading-tight mb-3">
                Agricultural, equestrian & development land
              </p>
              <span className="inline-flex items-center gap-1.5 text-svn-orange text-[10px] font-bold uppercase tracking-widest">
                Explore <ArrowRight size={10} />
              </span>
            </Link>

            <Link
              to="/commercial-properties"
              className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 text-center group"
            >
              <div className="w-11 h-11 rounded-full bg-svn-orange/20 border border-svn-orange flex items-center justify-center mx-auto mb-3 group-active:bg-svn-orange transition-colors">
                <Building2 size={20} className="text-white" />
              </div>
              <h2 className="text-sm font-black text-white uppercase tracking-tight mb-1">
                Commercial
              </h2>
              <p className="text-[10px] text-white/50 font-medium leading-tight mb-3">
                Retail, office, industrial & investment
              </p>
              <span className="inline-flex items-center gap-1.5 text-svn-orange text-[10px] font-bold uppercase tracking-widest">
                Explore <ArrowRight size={10} />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ===== DESKTOP HERO (md+) ===== */}
      <div className="hidden md:block">
        {/* Top branding bar */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center pt-36 pb-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-[800] text-white tracking-[-0.02em] leading-[1.1] uppercase drop-shadow-lg">
              National Reach.<br />
              <span className="text-white">Local Expertise.</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-lg text-white/80 font-[500] mt-4 max-w-xl mx-auto leading-relaxed"
            >
              Central Florida's premier commercial and land real estate brokerage.
            </motion.p>
          </motion.div>
        </div>

        {/* Split Hero Panels */}
        <div className="flex flex-row min-h-screen">
          {/* Land Panel */}
          <Link
            to="/land-properties"
            className="relative flex-1 group cursor-pointer overflow-hidden"
          >
            <img
              src="/78-acres-horse-country-hero.jpg"
              alt="Central Florida Land Properties"
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
              fetchPriority="high"
              decoding="sync"
              width={1920}
              height={1073}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/10 z-10" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-8 z-10"
            >
              <div className="w-16 h-16 rounded-full bg-svn-orange/20 border-2 border-svn-orange flex items-center justify-center mb-5 group-hover:bg-svn-orange group-hover:scale-110 transition-all duration-300">
                <TreePine size={28} className="text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight text-center mb-3">
                Land <span className="text-svn-orange">Listings</span>
              </h2>
              <p className="text-white/60 text-base max-w-sm text-center mb-6 font-medium">
                Agricultural, development, equestrian, and conservation land throughout Central Florida.
              </p>
              <span className="bg-svn-orange hover:bg-white hover:text-svn-orange text-white px-8 py-4 rounded-[10px] font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-xl border-2 border-svn-orange group-hover:shadow-svn-orange/25 group-hover:shadow-2xl">
                Explore Land
              </span>
            </motion.div>
          </Link>

          {/* Commercial Panel */}
          <Link
            to="/commercial-properties"
            className="relative flex-1 group cursor-pointer overflow-hidden"
          >
            <img
              src="/trailhead-logistics-hero.jpg"
              alt="Central Florida Commercial Properties"
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
              loading="eager"
              decoding="async"
              width={1920}
              height={1073}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-8 z-10"
            >
              <div className="w-16 h-16 rounded-full bg-svn-orange/20 border-2 border-svn-orange flex items-center justify-center mb-5 group-hover:bg-svn-orange group-hover:scale-110 transition-all duration-300">
                <Building2 size={28} className="text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight text-center mb-3">
                Commercial <span className="text-svn-orange">Listings</span>
              </h2>
              <p className="text-white/60 text-base max-w-sm text-center mb-6 font-medium">
                Retail, office, industrial, multi-family, and investment properties across the I-75 corridor.
              </p>
              <span className="bg-transparent hover:bg-svn-orange border-2 border-white hover:border-svn-orange text-white px-8 py-4 rounded-[10px] font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-xl group-hover:shadow-svn-orange/25 group-hover:shadow-2xl">
                Explore Commercial
              </span>
            </motion.div>
          </Link>
        </div>

        {/* Decorative side lines */}
        <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-white/5 hidden xl:block" />
        <div className="absolute right-6 top-0 bottom-0 w-[1px] bg-white/5 hidden xl:block" />
      </div>
    </div>
  );
};

export default Hero;
