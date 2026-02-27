import { motion } from 'framer-motion';
import type { ShowcaseProperty } from '../../data/showcaseProperties';

interface ShowcaseStoryProps {
  property: ShowcaseProperty;
}

const ShowcaseStory = ({ property }: ShowcaseStoryProps) => {
  return (
    <section className="py-24 bg-[#F6F6F6] px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Story Text */}
          <div>
            <div className="w-20 h-1.5 bg-svn-orange mb-8" />
            <h2 className="text-3xl md:text-4xl font-black text-svn-dark uppercase tracking-tight mb-10 leading-tight">
              The <span className="text-svn-orange">Story</span>
            </h2>

            <div className="space-y-6">
              {property.storyParagraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-600 text-base md:text-lg leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Right: Pull Quote + Image */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-svn-dark p-10 md:p-12 rounded-3xl text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-svn-orange/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <h4 className="text-svn-orange font-bold uppercase tracking-widest text-xs mb-6 relative z-10">Featured Quote</h4>
              <p className="text-xl md:text-2xl font-black uppercase tracking-tight leading-tight mb-6 relative z-10">
                "{property.pullQuote.text}"
              </p>
              <div className="w-12 h-1 bg-svn-orange mb-4 relative z-10" />
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest relative z-10">
                — {property.pullQuote.attribution}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl overflow-hidden shadow-xl"
            >
              <img
                src={property.heroImage}
                alt={property.title}
                className="w-full h-[300px] md:h-[400px] object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseStory;
