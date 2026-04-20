import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import SEOHead from '../components/SEOHead';
import BuildoutListing from '../components/BuildoutListing';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  MapPin,
  Shield,
  Landmark,
  Leaf,
  BarChart,
} from 'lucide-react';
import { getPropertyTypeBySlug } from '../data/propertyTypes';
import { getLocationBySlug, getAllLocations } from '../data/locations';
import { getGeoPageContent } from '../data/locationContent';
import StructuredData from '../components/StructuredData';

const featureIcons = [TrendingUp, MapPin, Shield, Landmark, Leaf, BarChart];

const PropertyTypePage = () => {
  const { slug, location: locationSlug } = useParams<{ slug: string; location?: string }>();
  const propertyType = slug ? getPropertyTypeBySlug(slug) : undefined;
  const location = locationSlug ? getLocationBySlug(locationSlug) : undefined;
  const geoContent = (propertyType && location) ? getGeoPageContent(propertyType, location) : undefined;

  // Invalid location slug → 404
  if (locationSlug && propertyType && !location) {
    return (
      <div className="min-h-screen bg-[#F6F6F6]">
        <SEOHead
          title="Location Not Found"
          description="The location you are looking for does not exist."
          noindex={true}
        />
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl font-black text-svn-dark uppercase tracking-tight mb-4">
            Location Not Found
          </h1>
          <p className="text-gray-500 text-lg mb-8 max-w-md">
            Sorry, we could not find that location. Browse all {propertyType.title.toLowerCase()} properties instead.
          </p>
          <Link
            to={`/properties/${propertyType.slug}`}
            className="inline-flex items-center gap-2 bg-svn-orange text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full hover:bg-orange-600 transition-colors"
          >
            View All {propertyType.title} Properties
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (!propertyType) {
    return (
      <div className="min-h-screen bg-[#F6F6F6]">
        <SEOHead
          title="Property Type Not Found"
          description="The property type you are looking for does not exist."
          noindex={true}
        />
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl font-black text-svn-dark uppercase tracking-tight mb-4">
            Property Type Not Found
          </h1>
          <p className="text-gray-500 text-lg mb-8 max-w-md">
            Sorry, we could not find the property type you are looking for. Please
            browse our available property categories.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-svn-orange text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full hover:bg-orange-600 transition-colors"
          >
            Return Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title={geoContent ? geoContent.seoTitle : propertyType.seoTitle}
        description={geoContent ? geoContent.seoDescription : propertyType.seoDescription}
        canonical={geoContent
          ? `https://svnmcdonald.com/properties/${propertyType.slug}/${location!.slug}`
          : `https://svnmcdonald.com/properties/${propertyType.slug}`
        }
        geoPlacename={location?.shortName}
        geoPosition={location ? `${location.geoCoordinates.latitude};${location.geoCoordinates.longitude}` : undefined}
      />
      <StructuredData
        breadcrumbs={geoContent ? geoContent.breadcrumbs : [
          { name: 'Home', url: 'https://svnmcdonald.com' },
          { name: propertyType.category === 'land' ? 'Land Properties' : 'Commercial Properties', url: `https://svnmcdonald.com/${propertyType.category === 'land' ? 'land' : 'commercial'}-properties` },
          { name: propertyType.title, url: `https://svnmcdonald.com/properties/${propertyType.slug}` },
        ]}
      />
      <Navbar />

      {/* Back to parent link (geo pages only) */}
      {geoContent && (
        <div className="bg-svn-dark px-6 pt-28 md:pt-36 pb-0">
          <div className="max-w-[1280px] mx-auto">
            <Link
              to={`/properties/${propertyType.slug}`}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
            >
              <ArrowRight size={14} className="rotate-180" />
              All {propertyType.title} Properties
            </Link>
          </div>
        </div>
      )}

      <PageHeader
        title={geoContent ? geoContent.h1Title : propertyType.title}
        highlightedText={geoContent ? geoContent.h1Highlighted : propertyType.highlightedText}
        subtitle={geoContent ? geoContent.subtitle : propertyType.subtitle}
        backgroundImage={propertyType.heroImage}
      />

      {/* Editorial Intro Section */}
      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-8">
                  About{' '}
                  <span className="text-svn-orange">
                    {propertyType.title} {propertyType.highlightedText}
                    {geoContent && location ? ` in ${location.shortName}` : ''}
                  </span>
                </h2>
                <div className="space-y-6">
                  {(geoContent ? geoContent.introParagraphs : propertyType.intro).map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-500 text-lg font-medium leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-32"
              >
                <div className="bg-svn-dark p-10 rounded-3xl text-white mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-svn-orange/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                  <div className="relative z-10">
                    <h4 className="text-svn-orange font-bold uppercase tracking-widest text-xs mb-4">
                      Why SVN McDonald
                    </h4>
                    <p className="text-xl font-black uppercase tracking-tight leading-tight mb-6">
                      {geoContent && location ? `${location.shortName}'s` : "Central Florida\u2019s"} premier {propertyType.title.toLowerCase()}{' '}
                      real estate brokerage
                    </p>
                    <div className="space-y-4 text-gray-400 text-sm font-medium leading-relaxed">
                      <div className="flex items-start gap-3">
                        <CheckCircle
                          className="text-svn-orange flex-shrink-0 mt-0.5"
                          size={16}
                        />
                        <span>30+ years of local market expertise</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle
                          className="text-svn-orange flex-shrink-0 mt-0.5"
                          size={16}
                        />
                        <span>200+ SVN offices nationwide</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle
                          className="text-svn-orange flex-shrink-0 mt-0.5"
                          size={16}
                        />
                        <span>Proven track record of successful transactions</span>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-3 bg-svn-orange text-white px-6 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-svn-dark transition-all duration-300"
                      >
                        Get in Touch <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="text-sm font-black uppercase tracking-[0.2em] text-svn-dark mb-6">
                    Quick Contact
                  </h4>
                  <div className="space-y-4">
                    <a
                      href="tel:3522743800"
                      className="flex items-center gap-3 text-gray-500 hover:text-svn-orange transition-colors font-medium"
                    >
                      <span className="text-svn-orange font-black">P</span>
                      352.274.3800
                    </a>
                    <a
                      href="mailto:bartow.mcdonald@svn.com"
                      className="flex items-center gap-3 text-gray-500 hover:text-svn-orange transition-colors font-medium"
                    >
                      <span className="text-svn-orange font-black">E</span>
                      bartow.mcdonald@svn.com
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Highlights Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-4">
              Key <span className="text-svn-orange">Highlights</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium">
              What makes {propertyType.title.toLowerCase()} properties in{' '}
              {geoContent && location ? location.shortName : 'Central Florida'} a compelling opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Geo-specific highlights first, then standard features */}
            {geoContent && geoContent.locationHighlights.map((highlight, index) => {
              const IconComponent = featureIcons[index % featureIcons.length];
              return (
                <motion.div
                  key={`geo-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-svn-orange/5 p-10 rounded-2xl hover:shadow-xl transition-all duration-300 border border-svn-orange/20 group"
                >
                  <div className="w-14 h-14 bg-svn-orange/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-svn-orange transition-colors duration-300">
                    <IconComponent
                      size={28}
                      className="text-svn-orange group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-black text-svn-dark uppercase tracking-tight mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    {highlight.description}
                  </p>
                </motion.div>
              );
            })}
            {propertyType.features.map((feature, index) => {
              const IconComponent = featureIcons[index % featureIcons.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#F6F6F6] p-10 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="w-14 h-14 bg-svn-orange/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-svn-orange transition-colors duration-300">
                    <IconComponent
                      size={28}
                      className="text-svn-orange group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-black text-svn-dark uppercase tracking-tight mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Buildout Listing Embed */}
      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <div className="w-20 h-1.5 bg-svn-orange mb-8" />
              <h2 className="text-4xl md:text-5xl font-black text-svn-dark uppercase tracking-tight mb-6">
                Browse{' '}
                <span className="text-svn-orange">{propertyType.title}</span>{' '}
                Listings{geoContent && location ? ` in ${location.shortName}` : ''}
              </h2>
              <p className="text-gray-500 text-lg font-medium leading-relaxed">
                Explore our current inventory of {propertyType.title.toLowerCase()}{' '}
                properties available in the {geoContent && location ? `${location.shortName} area` : 'Central Florida market'}.
              </p>
            </motion.div>
          </div>

          <BuildoutListing
            pluginType={propertyType.buildoutType}
            containerId={`buildout-${propertyType.slug}`}
          />
        </div>
      </section>

      {/* Related Locations (geo pages only) */}
      {geoContent && location && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-4">
                Explore <span className="text-svn-orange">{propertyType.title}</span> Properties in Other Locations
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto font-medium">
                SVN McDonald & Company serves {propertyType.title.toLowerCase()} buyers and sellers across Central Florida.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getAllLocations()
                .filter((loc) => loc.slug !== location.slug)
                .map((loc) => (
                  <Link
                    key={loc.slug}
                    to={`/properties/${propertyType.slug}/${loc.slug}`}
                    className="flex items-center gap-3 bg-[#F6F6F6] hover:bg-svn-orange hover:text-white text-svn-dark rounded-xl p-5 font-bold text-sm uppercase tracking-wide transition-all duration-300 group border border-gray-100"
                  >
                    <MapPin size={16} className="text-svn-orange group-hover:text-white flex-shrink-0" />
                    {loc.name}
                  </Link>
                ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to={`/properties/${propertyType.slug}`}
                className="inline-flex items-center gap-3 text-svn-orange hover:text-orange-600 font-black uppercase tracking-widest text-sm transition-colors"
              >
                View All {propertyType.title} Properties in Central Florida
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA Section */}
      <section className="py-24 px-6 bg-[#181818]">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-svn-orange rounded-3xl p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                Interested in {propertyType.title} Properties{geoContent && location ? ` in ${location.shortName}` : ''}?
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed">
                Our experienced advisors are ready to help you navigate the{' '}
                {propertyType.title.toLowerCase()} market in{' '}
                {geoContent && location ? location.shortName : 'Central Florida'}.
                Whether you are buying, selling, or investing, SVN McDonald &
                Company delivers results.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="bg-svn-dark text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-svn-dark transition-all duration-300 shadow-xl flex items-center justify-center gap-3 whitespace-nowrap"
              >
                Contact Us <ArrowRight size={20} />
              </Link>
              <a
                href="tel:3522743800"
                className="bg-white/20 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-svn-orange transition-all duration-300 shadow-xl flex items-center justify-center gap-3 whitespace-nowrap backdrop-blur-sm"
              >
                352.274.3800
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertyTypePage;
