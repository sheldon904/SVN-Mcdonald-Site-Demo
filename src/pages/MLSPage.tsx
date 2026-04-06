import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { motion } from 'framer-motion';
import {
  Phone,
  Search,
  Building2,
  Factory,
  ShoppingBag,
  LandPlot,
  Home,
  Warehouse,
  TreePine,
  Tractor,
  ArrowRight,
  Globe,
  Users,
  Shield,
  BarChart,
  MapPin,
  Handshake,
  Briefcase,
  Package,
  Fence,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const propertyTypes = [
  { slug: 'commercial', label: 'Commercial', icon: Building2, description: 'Retail centers, mixed-use buildings, and general commercial properties across Central Florida.' },
  { slug: 'office', label: 'Office', icon: Briefcase, description: 'Class A, B, and C office space ranging from single-tenant professional suites to multi-story office buildings.' },
  { slug: 'retail', label: 'Retail', icon: ShoppingBag, description: 'Strip centers, standalone retail pads, restaurant spaces, and high-traffic storefront locations.' },
  { slug: 'industrial', label: 'Industrial', icon: Factory, description: 'Manufacturing facilities, flex-industrial buildings, and logistics properties along major corridors.' },
  { slug: 'warehouse', label: 'Warehouse', icon: Warehouse, description: 'Distribution centers, cold storage, and warehouse space with dock-high and grade-level loading.' },
  { slug: 'multi-family', label: 'Multi-Family', icon: Home, description: 'Apartment complexes, duplexes, fourplexes, and multi-unit residential investment properties.' },
  { slug: 'acreage', label: 'Acreage & Land', icon: LandPlot, description: 'Vacant land parcels, agricultural tracts, and development-ready sites across multiple counties.' },
  { slug: 'ranch', label: 'Ranch', icon: Tractor, description: 'Working cattle ranches, horse farms, and rural estates with agricultural exemptions in place.' },
  { slug: 'equestrian', label: 'Equestrian', icon: TreePine, description: 'Horse farms, training facilities, and properties within the World Equestrian Center influence zone.' },
  { slug: 'farm-nursery', label: 'Farm & Nursery', icon: Fence, description: 'Active nurseries, row crop operations, specialty agriculture, and value-added farming properties.' },
  { slug: 'self-storage', label: 'Self-Storage', icon: Package, description: 'Climate-controlled and drive-up self-storage facilities with strong cash-flow fundamentals.' },
  { slug: 'triple-net-nnn', label: 'Triple Net (NNN)', icon: BarChart, description: 'Single-tenant NNN investments with long-term leases and minimal landlord responsibility.' },
];

const markets = [
  { name: 'Ocala', slug: 'ocala-fl', county: 'Marion County', description: 'The economic hub of Marion County, home to the World Equestrian Center and one of the fastest-growing metros in America.' },
  { name: 'Gainesville', slug: 'gainesville-fl', county: 'Alachua County', description: 'University of Florida anchors a stable economy with strong demand for multi-family, office, and medical properties.' },
  { name: 'Clermont', slug: 'clermont-fl', county: 'Lake County', description: 'Rapidly expanding city on the western edge of the Orlando metro, drawing residential and commercial development.' },
  { name: 'Marion County', slug: 'marion-county', county: 'Marion County', description: 'Over 365,000 residents and 1,652 square miles of land encompassing Ocala and the surrounding rural communities.' },
  { name: 'Lake County', slug: 'lake-county', county: 'Lake County', description: 'Positioned between Orlando and Ocala, Lake County offers a diverse mix of suburban growth and agricultural heritage.' },
  { name: 'Alachua County', slug: 'alachua-county', county: 'Alachua County', description: 'North Central Florida\'s academic and healthcare corridor, driven by the University of Florida and UF Health system.' },
  { name: 'Sumter County', slug: 'sumter-county', county: 'Sumter County', description: 'Home to The Villages, one of the nation\'s largest and fastest-growing master-planned retirement communities.' },
];

const advisorBenefits = [
  { icon: Search, title: 'Full MLS Access', description: 'Our advisors have direct access to the complete Stellar MLS database, including off-market and pre-market listings that never appear on public websites. We monitor new listings daily and can alert you within hours of a property matching your criteria.' },
  { icon: Globe, title: 'SVN National Platform', description: 'SVN\'s network of 200+ offices and 2,000+ advisors across the United States means your property search is not limited to local listings. We can source investment opportunities, perform comparative market analysis, and connect you with co-brokerage partners nationwide.' },
  { icon: Shield, title: 'Market Expertise', description: 'Central Florida\'s commercial real estate market has unique dynamics driven by the World Equestrian Center, population migration, and Florida\'s tax-friendly environment. Our advisors bring decades of local experience to every search, ensuring you understand true market value.' },
  { icon: BarChart, title: 'Investment Analysis', description: 'Beyond finding properties, we help you analyze them. From cap rate and cash-on-cash return calculations to rent comparables and demographic studies, our team provides the financial due diligence institutional investors demand.' },
  { icon: Handshake, title: 'Negotiation & Closing', description: 'Our advisors negotiate on your behalf through every stage of the transaction. From letter of intent through due diligence and closing, we manage timelines, coordinate inspections, and protect your interests at the table.' },
  { icon: Users, title: 'Buyer Representation', description: 'As your exclusive buyer\'s agent, we have a fiduciary duty to represent your interests alone. We do not dual-represent sellers, ensuring you receive unbiased guidance, honest property assessments, and aggressive negotiation on price and terms.' },
];

const MLSPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title="MLS Property Search"
        description="Search the Stellar MLS for commercial, industrial, office, retail, multi-family, and land properties across Central Florida. SVN McDonald & Company provides full MLS access for Ocala, Marion County, Gainesville, Lake County, and surrounding markets."
        canonical="https://svnmcdonald.com/mls"
      />
      <StructuredData breadcrumbs={[
        { name: 'Home', url: 'https://svnmcdonald.com' },
        { name: 'MLS Search', url: 'https://svnmcdonald.com/mls' },
      ]} />
      <Navbar />

      <PageHeader
        title="MLS"
        highlightedText="Search"
        subtitle="Search the full Stellar MLS database for commercial & land properties"
      />

      {/* What Is the MLS */}
      <section className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-1.5 bg-svn-orange mb-10" />
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-svn-dark mb-8">
              What Is the <span className="text-svn-orange">MLS?</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-gray-600 text-lg leading-relaxed">
                The Multiple Listing Service, commonly known as the MLS, is the primary database that licensed real estate professionals use to list, search, and share property information. Unlike consumer-facing websites that aggregate partial data, the MLS contains the most comprehensive, accurate, and up-to-date property records available in the real estate industry. Every active listing, pending sale, and recently closed transaction is recorded in the MLS, providing a complete picture of market activity.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                For commercial real estate, the MLS serves a particularly important function. Commercial properties are often more difficult to find than residential homes because they are not always marketed on popular consumer platforms. Many investment-grade commercial properties, land parcels, and income-producing assets are listed exclusively on the MLS and shared only among licensed brokers. Without MLS access through a qualified advisor, buyers and investors may miss significant opportunities.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-gray-600 text-lg leading-relaxed">
                The MLS also plays a critical role in establishing fair market value. Because it records detailed transaction data including sale prices, days on market, price reductions, and concessions, the MLS enables appraisers, lenders, and advisors to perform accurate comparative market analyses. Whether you are buying, selling, or evaluating a commercial property for investment purposes, MLS data provides the empirical foundation for sound decision-making.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                At SVN McDonald & Company, our advisors maintain active MLS subscriptions and monitor the database daily for our clients. When you work with our team, you gain the benefit of full MLS access combined with local market intelligence, investment analysis expertise, and the national reach of the SVN platform. We do not simply send you automated listing alerts; we curate property opportunities that align with your specific acquisition criteria, budget, and investment timeline.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stellar MLS Coverage */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-1.5 bg-svn-orange mb-10" />
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-svn-dark mb-8">
              Stellar MLS <span className="text-svn-orange">Coverage</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="lg:col-span-3 space-y-6"
            >
              <p className="text-gray-600 text-lg leading-relaxed">
                Stellar MLS is the largest multiple listing service in Florida and one of the largest in the United States. With over 70,000 active listings at any given time and more than 80,000 participating real estate professionals, Stellar MLS provides the most comprehensive property database covering Central Florida, the Gulf Coast, and surrounding regions. The system covers more than 40 Florida counties, including every market where SVN McDonald & Company operates.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                For our clients in the Ocala, Gainesville, Clermont, and broader Central Florida corridor, Stellar MLS is the definitive source for commercial and land property data. The platform includes commercial sales, commercial leases, vacant land, agricultural properties, multi-family investments, and specialty property types that are underrepresented on national aggregation websites. Stellar MLS also integrates with commercial-specific platforms such as LoopNet and CoStar, ensuring maximum exposure for listed properties while providing buyers with the broadest possible inventory.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Stellar MLS updates in real time. When a new property is listed, a price is adjusted, or a sale closes, the change is reflected immediately. This speed of information is crucial in competitive markets like Marion County and Lake County, where desirable commercial properties and well-priced land parcels can receive multiple offers within days of listing. Our advisors leverage Stellar MLS's real-time data feeds to give our clients a first-mover advantage.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-[#F6F6F6] rounded-2xl p-8 space-y-6">
                <h3 className="text-xl font-black text-svn-dark uppercase tracking-wider">Stellar MLS at a Glance</h3>
                {[
                  { stat: '70,000+', label: 'Active Listings' },
                  { stat: '80,000+', label: 'Participating Agents' },
                  { stat: '40+', label: 'Florida Counties Covered' },
                  { stat: 'Real-Time', label: 'Listing Updates' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-2xl font-black text-svn-orange min-w-[100px]">{item.stat}</span>
                    <span className="text-gray-600 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="bg-svn-dark rounded-2xl p-8">
                <h3 className="text-lg font-black text-white uppercase tracking-wider mb-4">Need MLS Data?</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">Our advisors can pull custom MLS reports for any property type, price range, or geographic area in Central Florida.</p>
                <a
                  href="tel:3522884491"
                  className="inline-flex items-center gap-3 text-svn-orange hover:text-white transition-colors font-black uppercase tracking-widest text-sm"
                >
                  <Phone size={16} /> (352) 288-4491
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Commercial Property Types Available */}
      <section className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-1.5 bg-svn-orange mb-10" />
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-svn-dark mb-4">
              Commercial Property Types <span className="text-svn-orange">Available</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-3xl leading-relaxed mb-12">
              The Stellar MLS database includes every major category of commercial and land property. SVN McDonald & Company specializes in the following property types across Central Florida. Select a category below to explore active listings and market information.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyTypes.map((pt, index) => (
              <motion.div
                key={pt.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index, duration: 0.5 }}
              >
                <Link
                  to={`/properties/${pt.slug}`}
                  className="block bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-svn-orange/30 transition-all duration-300 h-full group"
                >
                  <div className="w-12 h-12 bg-svn-orange/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-svn-orange/20 transition-colors duration-300">
                    <pt.icon size={24} className="text-svn-orange" />
                  </div>
                  <h3 className="text-lg font-black text-svn-dark uppercase tracking-wider mb-3 group-hover:text-svn-orange transition-colors duration-300">
                    {pt.label}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {pt.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-svn-orange font-bold uppercase tracking-widest text-xs group-hover:gap-3 transition-all duration-300">
                    View Listings <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets We Serve */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-1.5 bg-svn-orange mb-10" />
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-svn-dark mb-4">
              Markets We <span className="text-svn-orange">Serve</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-3xl leading-relaxed mb-12">
              SVN McDonald & Company provides MLS search and advisory services across the Central Florida corridor, from Gainesville in the north to Clermont in the south. Our deep familiarity with each market ensures you receive localized intelligence that national brokerages cannot replicate. Select a market below to explore commercial property listings in that area.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map((market, index) => (
              <motion.div
                key={market.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index, duration: 0.5 }}
              >
                <Link
                  to={`/properties/commercial/${market.slug}`}
                  className="block bg-[#F6F6F6] rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-svn-orange/30 transition-all duration-300 h-full group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-svn-orange/10 rounded-full flex items-center justify-center group-hover:bg-svn-orange/20 transition-colors duration-300">
                      <MapPin size={20} className="text-svn-orange" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-svn-dark uppercase tracking-wider group-hover:text-svn-orange transition-colors duration-300">
                        {market.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{market.county}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {market.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-svn-orange font-bold uppercase tracking-widest text-xs group-hover:gap-3 transition-all duration-300">
                    Browse Properties <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work with SVN McDonald */}
      <section className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-1.5 bg-svn-orange mb-10" />
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-svn-dark mb-4">
              Why Work with SVN McDonald for Your <span className="text-svn-orange">Property Search?</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-3xl leading-relaxed mb-12">
              A property search is only as good as the advisor conducting it. While any licensed agent can pull a list of MLS results, SVN McDonald & Company brings a level of commercial real estate expertise, market intelligence, and transactional sophistication that sets us apart. Here is what our clients gain when they partner with our team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisorBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-svn-orange/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-svn-orange/20 transition-colors duration-300">
                  <benefit.icon size={28} className="text-svn-orange" />
                </div>
                <h3 className="font-black text-svn-dark uppercase tracking-wider text-sm mb-3">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Our MLS Search Process Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-1.5 bg-svn-orange mb-10" />
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-svn-dark mb-4">
              How Our MLS Search <span className="text-svn-orange">Process Works</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-3xl leading-relaxed mb-12">
              When you engage SVN McDonald & Company for a property search, we follow a structured process designed to save you time, surface the best opportunities, and position you for a successful acquisition.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Define Your Criteria', description: 'We begin with a detailed consultation to understand your property requirements including type, size, location, budget, timeline, and investment objectives. This ensures every search result is relevant and actionable.' },
              { step: '02', title: 'Search & Screen', description: 'Our advisors conduct a comprehensive MLS search across Stellar MLS, CoStar, and our internal database of off-market opportunities. We screen each result against your criteria, eliminating properties that do not fit before presenting options to you.' },
              { step: '03', title: 'Analyze & Tour', description: 'For shortlisted properties, we prepare financial analyses including cap rate projections, rent roll reviews, and comparable sales data. We coordinate property tours and provide candid assessments of condition, location, and market positioning.' },
              { step: '04', title: 'Negotiate & Close', description: 'Once you identify the right property, we draft the letter of intent, negotiate terms, manage the due diligence process, coordinate with attorneys and lenders, and guide the transaction through closing.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="relative"
              >
                <div className="bg-[#F6F6F6] rounded-2xl p-8 h-full border border-gray-100">
                  <span className="text-5xl font-black text-svn-orange/20 block mb-4">{item.step}</span>
                  <h3 className="font-black text-svn-dark uppercase tracking-wider text-sm mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark CTA Section */}
      <section className="py-24 bg-svn-dark text-white px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
              Ready to Start Your <span className="text-svn-orange">Property Search?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Our team has direct access to the full Stellar MLS database and can help you find exactly what you are looking for across Central Florida. Whether you need a single retail pad in Ocala, a multi-family investment in Gainesville, or a hundred-acre ranch in Marion County, we have the expertise to deliver results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="tel:3522884491"
                className="bg-svn-orange text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-svn-orange transition-all duration-300 shadow-xl flex items-center gap-3"
              >
                <Phone size={20} />
                352.288.4491
              </a>
              <Link
                to="/contact"
                className="bg-white text-svn-dark px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-svn-orange hover:text-white transition-all duration-300 shadow-xl"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MLSPage;
