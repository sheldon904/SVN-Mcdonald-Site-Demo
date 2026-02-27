import { motion } from 'framer-motion';
import { HEADLINE_STATS } from '../../data/wecEffectData';

const WecEffectStats = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {HEADLINE_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <div className="w-12 h-1 bg-svn-orange mb-6 mx-auto md:mx-0" />
              <p className="text-4xl md:text-5xl font-black text-svn-dark tracking-tight mb-2">
                {stat.value}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WecEffectStats;
