import { motion } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import type { ShowcaseProperty } from '../../data/showcaseProperties';

interface ShowcaseHeroProps {
  property: ShowcaseProperty;
}

const ShowcaseHero = ({ property }: ShowcaseHeroProps) => {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <img
        src={property.heroImage}
        alt={property.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-16 md:pb-24">
        <div className="max-w-[1280px] mx-auto w-full">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="bg-svn-orange text-white text-xs font-black uppercase tracking-[0.2em] py-1.5 px-4 rounded-md">
              {property.status}
            </span>
            <span className="text-white/70 text-xs font-bold uppercase tracking-widest border border-white/20 px-4 py-1.5 rounded backdrop-blur-sm">
              {property.type}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-none mb-4"
          >
            {property.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mb-6"
          >
            {property.subtitle}
          </motion.p>

          {/* Price + Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-6"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
              <span className="text-xs font-bold uppercase tracking-widest text-white/60 block">{property.priceLabel}</span>
              <span className="text-2xl md:text-3xl font-black text-white">{property.price}</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <MapPin size={16} />
              <span className="text-sm font-bold">{property.location}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ShowcaseHero;
