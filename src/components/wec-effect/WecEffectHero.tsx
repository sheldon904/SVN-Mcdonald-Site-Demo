import { motion } from 'framer-motion';
import { ChevronDown, Download } from 'lucide-react';

const WecEffectHero = () => {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background - WEC aerial image */}
      <picture>
        <source
          type="image/webp"
          srcSet="/images/wec-center-hero-768.webp 768w, /images/wec-center-hero-1280.webp 1280w, /images/wec-center-hero-1920.webp 1920w"
          sizes="100vw"
        />
        <img
          src="/images/wec-center-hero-1920.jpg"
          srcSet="/images/wec-center-hero-768.jpg 768w, /images/wec-center-hero-1280.jpg 1280w, /images/wec-center-hero-1920.jpg 1920w"
          sizes="100vw"
          alt="World Equestrian Center grand arena at dusk"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={781}
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-16 md:pb-24">
        <div className="max-w-[1280px] mx-auto w-full">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-svn-orange text-white text-xs font-black uppercase tracking-[0.2em] py-1.5 px-4 rounded-md">
              SVN McDonald Research
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-none mb-4">
            The WEC <span className="text-svn-orange">Effect</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mb-6">
            Prices declined in 2025 for vacant, agriculturally zoned land 10 acres and larger. The Equestrian Land Report by SVN McDonald &amp; Co.
          </p>

          {/* Glassmorphic stat badge */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
              <span className="text-xs font-bold uppercase tracking-widest text-white/60 block">Comprehensive Study</span>
              <span className="text-2xl md:text-3xl font-black text-white">2022–2025</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 border border-white/20">
              <span className="text-xs font-bold uppercase tracking-widest text-white/60 block">Transactions Tracked</span>
              <span className="text-2xl md:text-3xl font-black text-white">400+</span>
            </div>
          </div>

          {/* Download CTA */}
          <div className="mt-8">
            <a
              href="/SVN2025WECEffect.pdf"
              download
              className="inline-flex items-center gap-3 bg-svn-orange text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs md:text-sm hover:bg-white hover:text-svn-orange transition-all duration-300 shadow-xl"
            >
              <Download size={18} /> Download the WEC Effect
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  );
};

export default WecEffectHero;
