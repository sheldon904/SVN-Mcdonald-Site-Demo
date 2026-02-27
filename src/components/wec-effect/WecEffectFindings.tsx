import { motion } from 'framer-motion';
import { TrendingUp, MapPin, Scale, Landmark } from 'lucide-react';
import { FINDINGS } from '../../data/wecEffectData';

const ICON_MAP = {
  TrendingUp,
  MapPin,
  Scale,
  Landmark,
} as const;

const WecEffectFindings = () => {
  return (
    <section className="py-24 px-6 bg-[#F6F6F6]">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-16">
          <div className="w-12 h-1 bg-svn-orange mb-6" />
          <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter">
            Key <span className="text-svn-orange">Findings</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FINDINGS.map((finding, index) => {
            const Icon = ICON_MAP[finding.icon];
            return (
              <motion.div
                key={finding.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-6">
                  <Icon className="text-svn-orange" size={32} />
                </div>
                <h3 className="text-lg font-black text-svn-dark uppercase tracking-tight mb-2">
                  {finding.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed font-medium">
                  {finding.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WecEffectFindings;
