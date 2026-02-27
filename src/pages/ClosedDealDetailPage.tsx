import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Calendar, Phone, ArrowLeft, Tag } from 'lucide-react';
import { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import ShowcaseLoadingSkeleton from '../components/showcase/ShowcaseLoadingSkeleton';
import { closedDeals, FALLBACK_IMAGE } from '../data/closedDeals';
import { isShowcaseSlug, showcaseProperties } from '../data/showcaseProperties';

const ShowcasePage = lazy(() => import('../components/showcase/ShowcasePage'));

const ClosedDealDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const deal = closedDeals.find((d) => d.slug === slug);

  // Showcase pages get the cinematic 3D experience
  if (slug && isShowcaseSlug(slug)) {
    const showcaseProperty = showcaseProperties[slug];
    return (
      <Suspense fallback={<ShowcaseLoadingSkeleton />}>
        <ShowcasePage property={showcaseProperty} />
      </Suspense>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-[#F6F6F6]">
        <SEOHead
          title="Deal Not Found"
          description="The closed deal you are looking for does not exist."
          noindex={true}
        />
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl font-extrabold text-svn-dark mb-4">Deal Not Found</h1>
          <p className="text-gray-500 text-lg mb-8">
            Sorry, the deal you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/closed-deals"
            className="inline-flex items-center gap-2 bg-svn-orange text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full hover:bg-orange-600 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Closed Deals
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const recentDeals = closedDeals
    .filter((d) => d.slug !== deal.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title={deal.title}
        description={deal.description.slice(0, 160)}
        ogImage={deal.image}
        canonical={`https://svnmcdonald.com/closed-deals/${deal.slug}`}
      />
      <Navbar />

      {/* Hero Image */}
      <div className="relative w-full h-[340px] md:h-[500px] overflow-hidden">
        <img
          src={deal.image}
          alt={deal.title}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-[1280px] mx-auto">
            <Link
              to="/closed-deals"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs mb-6"
            >
              <ArrowLeft size={14} />
              Back to Closed Deals
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-svn-orange text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-md">
                Sold
              </span>
              <span className="text-white text-xs font-bold uppercase tracking-widest border border-white/30 px-3 py-1 rounded backdrop-blur-sm">
                {deal.type}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

            {/* Left Column - Deal Details (2/3) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 min-w-0 lg:w-2/3"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-svn-dark uppercase tracking-tight mb-8 leading-tight">
                {deal.title}
              </h1>

              {/* Metadata Badges */}
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-sm border border-gray-100">
                  <MapPin size={16} className="text-svn-orange" />
                  <span className="text-sm font-bold text-gray-700">{deal.location}</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-sm border border-gray-100">
                  <DollarSign size={16} className="text-svn-orange" />
                  <span className="text-sm font-bold text-svn-dark">{deal.price}</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-sm border border-gray-100">
                  <Calendar size={16} className="text-svn-orange" />
                  <span className="text-sm font-bold text-gray-700">Closed: {deal.date}</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-sm border border-gray-100">
                  <Tag size={16} className="text-svn-orange" />
                  <span className="text-sm font-bold text-gray-700">{deal.type}</span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl p-8 md:p-10 shadow-sm border border-gray-100 mb-10">
                <h2 className="text-xl font-black text-svn-dark uppercase tracking-tight mb-6">
                  About This Deal
                </h2>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  {deal.description}
                </p>
              </div>

              {/* Call Bartow Button */}
              <a
                href="tel:3522743800"
                className="inline-flex items-center gap-3 bg-svn-orange text-white font-black uppercase tracking-widest text-sm px-10 py-5 rounded-full hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
              >
                <Phone size={18} />
                Call Bartow
              </a>
            </motion.div>

            {/* Right Column - Sidebar (1/3) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full lg:w-1/3 flex-shrink-0"
            >
              {/* Contact Us Card */}
              <div className="bg-svn-dark rounded-xl p-8 text-white mb-8">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-svn-orange mb-6">
                  Contact Us To Get Started
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-8">
                  If you're on the hunt to sell or lease Ocala commercial property, you've come to the right place. If you're looking for a residential Realtor, that's not in our wheelhouse and we'll be happy to refer you to a number of residential professionals in our community.
                </p>
                <a
                  href="tel:3522743800"
                  className="flex items-center gap-4 text-white hover:text-svn-orange transition-colors font-bold text-sm mb-6"
                >
                  <div className="bg-svn-orange p-2.5 rounded-full">
                    <Phone size={16} />
                  </div>
                  (352) 274-3800
                </a>
                <Link
                  to="/contact"
                  className="block w-full bg-svn-orange text-white text-center px-6 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-orange-600 transition-colors"
                >
                  Contact Us
                </Link>
              </div>

              {/* Recent Deals Card */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-svn-dark mb-6">
                  Recent <span className="text-svn-orange">Deals</span>
                </h3>
                <div className="space-y-5">
                  {recentDeals.map((recentDeal) => (
                    <Link
                      key={recentDeal.slug}
                      to={`/closed-deals/${recentDeal.slug}`}
                      className="group flex gap-4 items-start"
                    >
                      <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={recentDeal.image}
                          alt={recentDeal.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-svn-dark group-hover:text-svn-orange transition-colors line-clamp-2 leading-tight">
                          {recentDeal.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">{recentDeal.location}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/closed-deals"
                  className="block mt-6 text-center text-sm font-black uppercase tracking-widest text-svn-orange hover:text-orange-600 transition-colors"
                >
                  View All Deals
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClosedDealDetailPage;
