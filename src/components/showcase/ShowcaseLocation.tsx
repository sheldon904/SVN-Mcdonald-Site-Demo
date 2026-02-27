import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { ShowcaseProperty } from '../../data/showcaseProperties';

interface ShowcaseLocationProps {
  property: ShowcaseProperty;
}

const ShowcaseLocation = ({ property }: ShowcaseLocationProps) => {
  const { locationContext } = property;

  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-xl"
          >
            <img
              src={locationContext.satelliteImage}
              alt={`${property.title} location`}
              className="w-full h-[350px] md:h-[450px] object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Right: Content */}
          <div>
            <div className="w-20 h-1.5 bg-svn-orange mb-8" />
            <h2 className="text-3xl md:text-4xl font-black text-svn-dark uppercase tracking-tight mb-6 leading-tight">
              Location <span className="text-svn-orange">Context</span>
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10">
              {locationContext.description}
            </p>

            <div className="space-y-4">
              {locationContext.landmarks.map((landmark, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 bg-[#F6F6F6] rounded-xl px-5 py-4"
                >
                  <div className="bg-svn-orange/10 p-2 rounded-full flex-shrink-0">
                    <MapPin size={16} className="text-svn-orange" />
                  </div>
                  <span className="text-sm font-bold text-svn-dark">{landmark}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseLocation;
