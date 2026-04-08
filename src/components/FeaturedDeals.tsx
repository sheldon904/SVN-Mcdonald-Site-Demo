import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Warehouse, Factory, TreePine } from 'lucide-react';
import { showcaseProperties, SHOWCASE_SLUGS } from '../data/showcaseProperties';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'single-tenant-leased-943000-sf-trailhead-logistics-center': Warehouse,
  'ocala-75-industrial-lease': Factory,
  '78-acres-in-horse-country': TreePine,
};

interface FeaturedDealsProps {
  /** Show section heading — true on home page, false on closed deals page */
  showHeading?: boolean;
}

const FeaturedDeals = ({ showHeading = true }: FeaturedDealsProps) => {
  return (
    <section className="py-14 md:py-24 bg-svn-dark px-4 md:px-6 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        {showHeading && (
          <div className="mb-10 md:mb-16 text-center">
            <div className="w-16 md:w-20 h-1.5 bg-svn-orange mx-auto mb-5 md:mb-6" />
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-3 md:mb-4">
              Featured <span className="text-svn-orange">Deals</span>
            </h2>
            <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
              Landmark transactions that define our expertise in Central Florida commercial real estate.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          {SHOWCASE_SLUGS.map((slug, index) => {
            const property = showcaseProperties[slug];
            const Icon = iconMap[slug] || TreePine;

            return (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  to={`/closed-deals/${slug}`}
                  className="group block relative h-[360px] md:h-[520px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"
                >
                  {/* Background image */}
                  <img
                    src={property.heroImage}
                    alt={property.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={520}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Status badge */}
                  <div className="absolute top-5 left-5 z-10">
                    <span className="bg-svn-orange text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-md">
                      {property.status}
                    </span>
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-5 right-5 z-10">
                    <span className="bg-white/10 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md border border-white/20">
                      {property.type}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-5 md:p-7 flex flex-col justify-end z-10">
                    <Icon size={28} className="text-svn-orange mb-3 md:mb-4 md:w-8 md:h-8" strokeWidth={1.5} />

                    <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight mb-1.5 md:mb-2 leading-tight">
                      {property.title}
                    </h3>

                    <p className="text-white/60 text-sm font-medium mb-1">
                      {property.location}
                    </p>

                    <div className="flex items-baseline gap-2 mb-3 md:mb-4">
                      <span className="text-svn-orange font-black text-lg md:text-xl">
                        {property.price}
                      </span>
                      <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                        {property.priceLabel}
                      </span>
                    </div>

                    <p className="text-white/50 text-xs md:text-sm font-medium leading-relaxed mb-4 md:mb-6 line-clamp-2">
                      {property.subtitle}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-3">
                      <span className="text-white text-xs font-black uppercase tracking-[0.15em] group-hover:text-svn-orange transition-colors">
                        View Deal
                      </span>
                      <div className="w-8 h-8 rounded-full bg-svn-orange/20 flex items-center justify-center transition-all group-hover:bg-svn-orange group-hover:translate-x-1">
                        <ArrowRight size={14} className="text-svn-orange group-hover:text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Orange bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-svn-orange/0 group-hover:bg-svn-orange transition-colors duration-300" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;
