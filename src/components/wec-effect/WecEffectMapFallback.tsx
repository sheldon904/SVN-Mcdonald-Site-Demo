import { motion } from 'framer-motion';
import { Monitor } from 'lucide-react';

interface WecEffectMapFallbackProps {
  reason: 'mobile' | 'no-webgl' | 'error';
}

const messages: Record<WecEffectMapFallbackProps['reason'], string> = {
  mobile: 'View on desktop for an interactive 3D satellite flyover with concentric impact zones',
  'no-webgl': 'Your browser does not support WebGL2. Try Chrome or Firefox for the 3D experience.',
  error: '3D satellite flyover is temporarily unavailable',
};

const WecEffectMapFallback = ({ reason }: WecEffectMapFallbackProps) => {
  return (
    <section className="relative w-full py-0">
      <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden bg-svn-dark">
        {/* Background satellite placeholder */}
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80"
          alt="Aerial view of Ocala region"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-svn-dark via-svn-dark/60 to-svn-dark/40" />

        {/* Concentric ring overlays (CSS circles) */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border-2 border-svn-orange/20 animate-pulse" style={{ animationDuration: '4s' }} />
          {/* Middle ring */}
          <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-svn-orange/40 animate-pulse" style={{ animationDuration: '3s' }} />
          {/* Inner ring */}
          <div className="absolute w-24 h-24 md:w-36 md:h-36 rounded-full border-2 border-svn-orange/70 animate-pulse" style={{ animationDuration: '2s' }} />
          {/* Center dot */}
          <div className="absolute w-3 h-3 rounded-full bg-svn-orange shadow-lg shadow-svn-orange/50" />

          {/* Price labels */}
          <div className="absolute text-right" style={{ top: '50%', right: 'calc(50% + 4.5rem)', transform: 'translateY(-50%)' }}>
            <div className="md:hidden">
              <span className="text-white font-black text-xs">$64,800/ac</span>
              <span className="block text-white/50 text-[9px] font-bold uppercase tracking-wider">0–6 mi</span>
            </div>
            <div className="hidden md:block" style={{ position: 'relative', right: '0.5rem' }}>
              <span className="text-white font-black text-sm">$64,800/ac</span>
              <span className="block text-white/50 text-[10px] font-bold uppercase tracking-wider">0–6 mi</span>
            </div>
          </div>

          <div className="absolute" style={{ top: 'calc(50% - 7rem)', left: '50%', transform: 'translateX(-50%)' }}>
            <div className="text-center">
              <span className="text-white font-black text-xs md:text-sm">$60,800/ac</span>
              <span className="block text-white/50 text-[9px] md:text-[10px] font-bold uppercase tracking-wider">6–9 mi</span>
            </div>
          </div>

          <div className="absolute" style={{ bottom: 'calc(50% - 10rem)', right: 'calc(50% - 11rem)' }}>
            <div className="text-center">
              <span className="text-white font-black text-xs md:text-sm">$31,500/ac</span>
              <span className="block text-white/50 text-[9px] md:text-[10px] font-bold uppercase tracking-wider">9–18 mi</span>
            </div>
          </div>
        </div>

        {/* Desktop message card */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
              <Monitor className="text-svn-orange mx-auto mb-3" size={32} />
              <h3 className="text-sm font-black text-white uppercase tracking-tight mb-2">
                3D Satellite Flyover
              </h3>
              <p className="text-xs text-white/70 font-medium">
                {messages[reason]}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WecEffectMapFallback;
