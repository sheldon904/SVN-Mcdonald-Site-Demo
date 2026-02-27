import { motion } from 'framer-motion';
import type { ShowcaseStat } from '../../data/showcaseProperties';

interface ShowcaseStatsProps {
  stats: ShowcaseStat[];
  title: string;
}

const ShowcaseStats = ({ stats, title }: ShowcaseStatsProps) => {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <div className="w-20 h-1.5 bg-svn-orange mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-black text-svn-dark uppercase tracking-tight">
            Deal <span className="text-svn-orange">Highlights</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-svn-orange mb-3 transition-transform group-hover:scale-110 duration-300">
                {stat.value}
              </div>
              <div className="h-[2px] w-12 bg-gray-200 mx-auto mb-4 group-hover:w-full transition-all duration-500 group-hover:bg-svn-orange" />
              <p className="text-[10px] md:text-xs font-black text-svn-dark uppercase tracking-[0.2em] leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseStats;
