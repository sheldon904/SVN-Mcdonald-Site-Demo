import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Calendar } from 'lucide-react';
import { closedDeals, FALLBACK_IMAGE } from '../data/closedDeals';
import FeaturedDeals from '../components/FeaturedDeals';

const categories = ["All", "Land", "Industrial", "Office", "Retail", "Residential", "Self Storage"] as const;

const ClosedDealsPage = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredDeals = activeFilter === "All"
    ? closedDeals
    : closedDeals.filter((deal) => deal.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title="Closed Deals & Transaction History"
        description="View SVN McDonald's track record of successful commercial real estate transactions in Central Florida. Land, retail, office, and industrial deals."
        canonical="https://svnmcdonald.com/closed-deals"
      />
      <StructuredData breadcrumbs={[
        { name: 'Home', url: 'https://svnmcdonald.com' },
        { name: 'Closed Deals', url: 'https://svnmcdonald.com/closed-deals' },
      ]} />
      <Navbar />

      <PageHeader
        title="Closed"
        highlightedText="Deals"
        subtitle="A track record of success in Central Florida commercial real estate."
        backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2273&q=80"
      />

      <FeaturedDeals showHeading={false} />

      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full border transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-svn-orange text-white border-svn-orange"
                    : "bg-white text-gray-600 border-gray-200 hover:border-svn-orange hover:text-svn-orange"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDeals.map((deal, index) => (
              <motion.div
                key={deal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                <Link to={`/closed-deals/${deal.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="400"
                      onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                    />
                    <div className="absolute top-4 right-4 bg-svn-orange text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-md">
                      Sold
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                       <span className="text-white text-xs font-bold uppercase tracking-widest border border-white/30 px-2 py-1 rounded backdrop-blur-sm">
                         {deal.type}
                       </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-svn-dark mb-4 line-clamp-1">{deal.title}</h3>

                    <div className="space-y-3 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-svn-orange" />
                        {deal.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-svn-orange" />
                        <span className="font-bold text-svn-dark">{deal.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-svn-orange" />
                        Closed: {deal.date}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <span className="text-sm font-black uppercase tracking-widest text-svn-orange group-hover:text-orange-600 transition-colors">
                        Read More
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClosedDealsPage;
