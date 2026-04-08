import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import FAQStructuredData from '../components/FAQStructuredData';
import { servicesFAQ } from '../data/faqData';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, ArrowRight, BarChart, LandPlot, Gavel, FileText,
  Megaphone, Calculator, Building2, ShoppingBag, Factory, Home, Hotel,
  Landmark, Phone, TrendingUp, Search, Shield, Users, Handshake,
  Target, Globe, DollarSign, Clock, FileSearch, BarChart3, Layers,
  BookOpen, Award, MapPin, Mail, ChevronDown
} from 'lucide-react';

/* ─── Reusable Section Components ─── */

const WhyChooseSection = ({ items }: { items: { title: string; desc: string; icon?: React.ReactNode }[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-10">
      Why Choose <span className="text-svn-orange">SVN McDonald</span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
        >
          <div className="text-svn-orange mb-4 group-hover:scale-110 transition-transform duration-300">
            {item.icon || <CheckCircle size={32} />}
          </div>
          <h4 className="font-black text-svn-dark uppercase tracking-wider text-sm mb-3">{item.title}</h4>
          <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const ExperienceSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="bg-svn-dark rounded-3xl p-12 md:p-20 text-white"
  >
    <div className="max-w-3xl">
      <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">
        SVN McDonald Has the <span className="text-svn-orange">Experience</span>
      </h2>
      <div className="space-y-6 text-gray-400 font-medium leading-relaxed">
        <p>
          Our team holds extensive expertise spanning diverse land types, market trends, and potential growth areas. Leveraging our profound insights, we provide a competitive advantage whether you're buying or selling expansive properties.
        </p>
        <p>
          We specialize in understanding the nuances of each unique market. This local perspective ensures you receive accurate and timely information essential for your property decisions.
        </p>
        <div className="pt-8 flex flex-wrap gap-6">
          <a href="tel:3522743800" className="inline-flex items-center gap-4 text-svn-orange hover:text-white transition-colors font-black uppercase tracking-[0.2em]">
            <Phone size={18} /> (352) 274-3800
          </a>
          <Link to="/contact" className="inline-flex items-center gap-4 text-white hover:text-svn-orange transition-colors font-black uppercase tracking-[0.2em]">
            Send a Message <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
);

const CTABanner = ({ heading, description }: { heading: React.ReactNode; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="bg-svn-orange rounded-3xl p-12 md:p-16 text-white text-center"
  >
    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">{heading}</h2>
    <p className="text-white/80 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">{description}</p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
      <a
        href="tel:3522743800"
        className="inline-flex items-center gap-3 bg-white text-svn-dark font-black uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:bg-svn-dark hover:text-white transition-all duration-300"
      >
        <Phone size={16} /> (352) 274-3800
      </a>
      <Link
        to="/contact"
        className="inline-flex items-center gap-3 bg-transparent border-2 border-white text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-full hover:bg-white hover:text-svn-orange transition-all duration-300"
      >
        <Mail size={16} /> Send us a Message
      </Link>
    </div>
  </motion.div>
);

const ServicesNavStrip = () => {
  const allServices = [
    { label: 'Land Brokerage', path: '/services/land-brokerage' },
    { label: 'Land Auctions', path: '/services/land-auctions' },
    { label: 'Conservation Easement', path: '/services/conservation-easement' },
    { label: 'Distressed/REO', path: '/services/distressed-reo' },
    { label: 'Strategic Marketing', path: '/services/strategic-marketing' },
    { label: 'Value Positioning', path: '/services/value-positioning' },
    { label: 'Valuation & Appraisal', path: '/services/valuation-appraisal' },
    { label: 'Types of CRE', path: '/services/types-of-commercial-real-estate' },
  ];
  const location = useLocation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-black text-svn-dark uppercase tracking-tighter mb-6">Our <span className="text-svn-orange">Services</span></h3>
      <div className="flex flex-wrap gap-3">
        {allServices.map((s) => (
          <Link
            key={s.path}
            to={s.path}
            className={`text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-full transition-all duration-300 border ${
              location.pathname === s.path
                ? 'bg-svn-orange text-white border-svn-orange'
                : 'bg-white text-svn-dark border-gray-200 hover:border-svn-orange hover:text-svn-orange'
            }`}
          >
            {s.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

/* ─── FAQ Accordion ─── */

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <FAQStructuredData faqs={servicesFAQ} />
      <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-4">
        Frequently Asked <span className="text-svn-orange">Questions</span>
      </h2>
      <p className="text-gray-500 font-medium mb-10 max-w-2xl">
        Common questions about commercial real estate services in Ocala and Marion County, Florida.
      </p>
      <div className="space-y-4">
        {servicesFAQ.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left"
              >
                <span className="font-black text-svn-dark text-sm md:text-base uppercase tracking-wide flex-1">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-svn-orange"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <p className="text-gray-500 font-medium leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ─── Main Page Component ─── */

const ServicesPage = () => {
  const location = useLocation();
  const path = location.pathname;

  const services: Record<string, {
    title: string;
    highlighted: string;
    subtitle: string;
    image: string;
    seoTitle?: string;
    seoDescription?: string;
    content: React.ReactNode;
  }> = {

    /* ═══════════════════════════════════════════
       SERVICES HUB – /services
       ═══════════════════════════════════════════ */
    '/services': {
      title: 'Our',
      highlighted: 'Services',
      subtitle: 'Comprehensive commercial real estate solutions tailored to your unique needs in Central Florida.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2301&q=80',
      seoTitle: 'Commercial Real Estate Services | SVN McDonald & Company',
      seoDescription: 'Explore comprehensive commercial real estate services from SVN McDonald & Company in Central Florida — land brokerage, auctions, conservation easements, strategic marketing, and more.',
      content: (
        <div className="space-y-24">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-black text-svn-dark uppercase tracking-tighter mb-6">
              Commercial Real Estate Services with <span className="text-svn-orange">SVN McDonald</span> in Central Florida
            </h2>
            <p className="text-gray-500 font-medium leading-relaxed text-lg">
              Searching for a reliable partner to navigate the dynamic landscape of commercial real estate? Look no further than SVN McDonald and Company — your trusted ally in achieving unparalleled success. We offer tailored services designed to fulfill your specific needs, crafted to assist you in achieving your goals within the commercial real estate sector.
            </p>
          </motion.div>

          {/* Why Choose */}
          <WhyChooseSection items={[
            { title: "In-Depth Local Knowledge", desc: "We possess a profound understanding of the Central Florida market, enabling us to identify and leverage prime business opportunities for our clients.", icon: <MapPin size={32} /> },
            { title: "Tailored Solutions", desc: "We craft customized strategies and solutions to cater to the unique needs of both buyers and sellers, ensuring a seamless and efficient transaction process.", icon: <Target size={32} /> },
            { title: "Extensive Network", desc: "Leveraging a vast network of industry connections and partnerships, we maximize exposure and opportunities for our clients.", icon: <Globe size={32} /> },
            { title: "Proven Success", desc: "Our history of successful business transactions speaks to our commitment to delivering exceptional results for our clients.", icon: <Award size={32} /> },
            { title: "Comprehensive Services", desc: "From valuation and negotiation to the final closing, we offer comprehensive services at every stage of the brokerage process.", icon: <Layers size={32} /> },
            { title: "Client-Centric Approach", desc: "We believe in personalized, client-centric service, dedicated to achieving optimal outcomes for every client we serve.", icon: <Handshake size={32} /> },
          ]} />

          {/* Service Cards */}
          <div>
            <div className="text-center mb-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-4">Our Core <span className="text-svn-orange">Expertise</span></h2>
                <p className="text-gray-500 max-w-2xl mx-auto font-medium">We offer a comprehensive suite of real estate services tailored to meet your needs in the Central Florida market.</p>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard icon={<LandPlot size={40} />} title="Land Brokerage" desc="Premier land brokerage services connecting buyers and sellers across Central Florida with proven expertise." link="/services/land-brokerage" />
              <ServiceCard icon={<Gavel size={40} />} title="Land Auctions" desc="Specialized land auction services facilitating successful auctions for both sellers and buyers throughout Florida." link="/services/land-auctions" />
              <ServiceCard icon={<FileText size={40} />} title="Conservation Easement" desc="Navigating conservation easement options and land transactions with properties in conservation across Florida." link="/services/conservation-easement" />
              <ServiceCard icon={<BarChart size={40} />} title="Distressed/REO" desc="Helping investors identify and capitalize on distressed and REO properties with extensive local market knowledge." link="/services/distressed-reo" />
              <ServiceCard icon={<Megaphone size={40} />} title="Strategic Marketing" desc="Premium, strategically driven commercial real estate leasing and marketing services in Central Florida." link="/services/strategic-marketing" />
              <ServiceCard icon={<TrendingUp size={40} />} title="Value Positioning" desc="Value-driven, strategically positioned land brokerage services connecting buyers and sellers effectively." link="/services/value-positioning" />
              <ServiceCard icon={<Calculator size={40} />} title="Valuation & Appraisal" desc="Accurate property valuations with comprehensive analysis of local real estate markets and trends." link="/services/valuation-appraisal" />
              <ServiceCard icon={<Building2 size={40} />} title="Types of CRE" desc="Explore office, retail, industrial, multi-family, hospitality, and special purpose property opportunities." link="/services/types-of-commercial-real-estate" />
            </div>
          </div>

          {/* Experience */}
          <ExperienceSection />

          {/* FAQ Section */}
          <FAQAccordion />

          {/* CTA */}
          <CTABanner
            heading="Contact Us To Get Started"
            description="If you're on the hunt to sell or lease Ocala commercial property, you've come to the right place. Contact us today to explore how we can assist you with your commercial real estate needs."
          />
        </div>
      )
    },

    /* ═══════════════════════════════════════════
       CONSERVATION EASEMENT
       ═══════════════════════════════════════════ */
    '/services/conservation-easement': {
      title: 'Conservation',
      highlighted: 'Easement',
      subtitle: "Exploring conservation easement options and navigating land transactions with properties in conservation across Florida.",
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2664&q=80',
      seoTitle: 'Your Expert for Conservation Easement Florida | SVN McDonald',
      seoDescription: 'SVN McDonald & Company provides services for landowners including exploring conservation easement options and navigating land transactions with properties in conservation in Florida.',
      content: (
        <div className="space-y-24">
          {/* Intro Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <h2 className="text-3xl md:text-4xl font-black text-svn-dark uppercase tracking-tighter mb-8">
                Conservation Easement <span className="text-svn-orange">in Florida</span>
              </h2>
              <div className="space-y-6 text-gray-500 font-medium leading-relaxed">
                <p className="text-lg">
                  SVN McDonald and Company provides services for landowners, including exploring conservation easement options and navigating land transactions with properties already in conservation in Florida. Our team works closely with property owners and conservation entities to structure agreements that preserve natural resources while achieving each client's financial and long-term goals.
                </p>
                <p>
                  A conservation easement is a voluntary legal agreement between a landowner and a land trust or government agency that permanently limits uses of the land in order to protect its conservation values. It's a powerful tool for landowners who want to protect their property while retaining ownership.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-black text-svn-dark uppercase tracking-tight mb-6">Benefits for Landowners</h3>
                <ul className="space-y-5">
                  {[
                    { title: "Income Tax Deduction", desc: "Donors of conservation easements may claim a significant income tax deduction." },
                    { title: "Estate Tax Reduction", desc: "Can significantly reduce estate taxes, protecting family wealth across generations." },
                    { title: "Property Tax Stability", desc: "Keeps property taxes lower by locking in current agricultural or conservation use." },
                    { title: "Legacy Preservation", desc: "Ensures the land remains undeveloped for future generations while retaining ownership." },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="bg-svn-orange/10 rounded-full p-2 mt-0.5 flex-shrink-0">
                        <CheckCircle className="text-svn-orange" size={18} />
                      </div>
                      <div>
                        <span className="font-bold text-svn-dark text-sm uppercase tracking-wider">{item.title}</span>
                        <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Why Choose */}
          <WhyChooseSection items={[
            { title: "Local Expertise", desc: "Deep understanding of the Florida market for identifying optimal easement opportunities and structuring effective agreements.", icon: <MapPin size={32} /> },
            { title: "Tailored Strategies", desc: "Customized solutions for landowners and conservationists, ensuring each agreement meets unique needs.", icon: <Target size={32} /> },
            { title: "Extensive Connections", desc: "Broad industry relationships with conservation entities, land trusts, and agencies, expanding exposure and opportunities.", icon: <Globe size={32} /> },
            { title: "Proven Track Record", desc: "Successful history in conservation easement transactions demonstrates our commitment to delivering results.", icon: <Award size={32} /> },
            { title: "Comprehensive Services", desc: "Support from initial assessment through final agreements, guiding every step of the conservation process.", icon: <Layers size={32} /> },
            { title: "Client-Centric Focus", desc: "Personalized service prioritizing optimal outcomes for every landowner and conservation partner we work with.", icon: <Handshake size={32} /> },
          ]} />

          {/* Experience & CTA */}
          <ExperienceSection />
          <ServicesNavStrip />
          <CTABanner
            heading="Contact Us To Get Started"
            description="Contact us today to explore how we can assist you with your conservation easement needs and protect the land you love."
          />
        </div>
      )
    },

    /* ═══════════════════════════════════════════
       DISTRESSED / REO PROPERTIES
       ═══════════════════════════════════════════ */
    '/services/distressed-reo': {
      title: 'Distressed / REO',
      highlighted: 'Properties',
      subtitle: 'Discover hidden gems in the Florida distressed and REO property market with expert guidance.',
      image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2668&q=80',
      seoTitle: 'Distressed/REO Properties for Sale in Florida | SVN McDonald',
      seoDescription: 'SVN McDonald & Company specializes in helping investors identify and capitalize on distressed and REO properties in Ocala and Central Florida.',
      content: (
        <div className="space-y-24">
          {/* Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-svn-dark uppercase tracking-tighter mb-8">
                Distressed/REO Properties <span className="text-svn-orange">in Florida</span>
              </h2>
              <div className="space-y-6 text-gray-500 font-medium leading-relaxed">
                <p className="text-lg">
                  In the dynamic world of real estate investment, distressed and Real Estate Owned (REO) properties are hidden gems waiting to be discovered. These properties, typically under foreclosure or in financial distress, often neglected or abandoned, offer savvy investors opportunities to acquire real estate at substantial discounts.
                </p>
                <p>
                  Ocala's vibrant and growing market presents a wealth of opportunities in the distressed property sector. With strong market demand for quality real estate, investors can capitalize on these assets through renovation and rehabilitation, increasing market value and generating substantial returns on investment.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Distressed property investment opportunities"
                className="rounded-2xl shadow-2xl"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
              <div className="absolute -bottom-6 -right-6 bg-svn-orange text-white p-6 rounded-2xl shadow-xl hidden lg:block">
                <DollarSign size={32} className="mb-1" />
                <div className="text-[10px] font-bold uppercase tracking-[0.2em]">Below Market Value</div>
              </div>
            </motion.div>
          </div>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-10">
              Investment <span className="text-svn-orange">Opportunity</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: <DollarSign size={32} />, title: "Substantial Discounts", desc: "Acquire properties well below market value, creating immediate equity and strong investment returns." },
                { icon: <TrendingUp size={32} />, title: "Value-Add Potential", desc: "Transform distressed assets through strategic renovation and rehabilitation to dramatically increase market value." },
                { icon: <BarChart3 size={32} />, title: "Strong Market Demand", desc: "Ocala's growing population and economy drive demand for quality real estate, ensuring exit strategies for investors." },
                { icon: <Shield size={32} />, title: "Expert Due Diligence", desc: "Investing in distressed properties requires careful due diligence — our team provides thorough research into foreclosure procedures, property conditions, and potential risks." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex gap-6"
                >
                  <div className="text-svn-orange flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-black text-svn-dark uppercase tracking-wider text-sm mb-2">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Expertise */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-12 md:p-16 shadow-sm border border-gray-100"
          >
            <h2 className="text-3xl font-black text-svn-dark uppercase tracking-tighter mb-8">
              Your Partner in <span className="text-svn-orange">Distressed Assets</span>
            </h2>
            <div className="space-y-6 text-gray-500 font-medium leading-relaxed">
              <p>
                SVN McDonald & Company specializes in helping investors identify and capitalize on distressed and REO properties in Ocala and the surrounding Central Florida region. With extensive knowledge of the local market and a proven track record in real estate investment, our team is your trusted partner.
              </p>
              <p>
                We work closely with lenders, receivers, and special servicers to maximize recovery values. From initial valuation to closing, we employ aggressive marketing strategies and leverage our national SVN network to find qualified buyers quickly, handling every step of the process with professionalism and speed.
              </p>
              <p className="text-sm italic text-gray-400 border-l-4 border-svn-orange pl-6">
                Commercial real estate brokers based in Ocala, Florida focused on selling and leasing Land, Industrial, NNN, Retail, and Office properties in Marion, Lake, Alachua, and Sumter counties. If you're looking for a residential Realtor, that's not in our wheelhouse — we'll be happy to refer you to a number of residential professionals in our community.
              </p>
            </div>
          </motion.div>

          {/* Experience & CTA */}
          <ExperienceSection />
          <ServicesNavStrip />
          <CTABanner
            heading="Contact Us To Get Started"
            description="Ready to explore distressed and REO property opportunities in Central Florida? Contact us today to learn how we can help you capitalize on these investments."
          />
        </div>
      )
    },

    /* ═══════════════════════════════════════════
       LAND AUCTIONS
       ═══════════════════════════════════════════ */
    '/services/land-auctions': {
      title: 'Land',
      highlighted: 'Auctions',
      subtitle: 'Specialized land auction services throughout Florida, facilitating successful outcomes for sellers and buyers.',
      image: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2702&q=80',
      seoTitle: 'Your Expert for Land Auction Florida | SVN McDonald',
      seoDescription: 'SVN McDonald & Company provides specialized land auction services throughout Florida, facilitating auctions for both sellers and buyers with dedicated professionals.',
      content: (
        <div className="space-y-24">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-black text-svn-dark uppercase tracking-tighter mb-8">
              Land Auction <span className="text-svn-orange">in Florida</span>
            </h2>
            <div className="space-y-6 text-gray-500 font-medium leading-relaxed">
              <p className="text-lg">
                SVN McDonald and Company provides specialized land auction services throughout Florida, facilitating auctions for both sellers and buyers with dedicated professionals offering expertise in land auction processes. From auction preparation to execution and closing, we provide comprehensive services throughout the auction process.
              </p>
              <p>
                Auctions are an effective method for selling land, especially unique or high-demand properties. By setting a specific date for the sale, we create urgency among buyers and drive competitive bidding to maximize the value of your asset.
              </p>
            </div>
          </motion.div>

          {/* Auction Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-10">
              Why <span className="text-svn-orange">Auction?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: <Clock size={40} />, title: "Fixed Timeline", desc: "Sellers know exactly when the property will be sold. A defined close date creates certainty and streamlines the transaction for all parties." },
                { icon: <TrendingUp size={40} />, title: "Competitive Bidding", desc: "Multiple qualified buyers competing drives the price up to true market value — or above. The transparent process ensures fair pricing." },
                { icon: <Shield size={40} />, title: "No Contingencies", desc: "Auction sales are typically 'as-is' with no contingencies, eliminating the delays and uncertainties common in traditional negotiations." },
                { icon: <Megaphone size={40} />, title: "Maximum Exposure", desc: "An intense marketing period generates maximum visibility and urgency, attracting qualified buyers from local, regional, and national markets." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-svn-dark rounded-2xl p-10 text-white group hover:bg-svn-orange transition-all duration-500"
                >
                  <div className="text-svn-orange group-hover:text-white transition-colors duration-300 mb-6">{item.icon}</div>
                  <h4 className="font-black uppercase tracking-wider text-lg mb-3">{item.title}</h4>
                  <p className="text-gray-400 group-hover:text-white/80 text-sm leading-relaxed transition-colors duration-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why Choose */}
          <WhyChooseSection items={[
            { title: "Local Expertise", desc: "Deep understanding of Florida's land market enables successful auctions with maximum buyer interest and competitive pricing.", icon: <MapPin size={32} /> },
            { title: "Tailored Approach", desc: "Customized auction strategies to meet individual client needs, whether it's a large tract or a unique specialty property.", icon: <Target size={32} /> },
            { title: "Extensive Network", desc: "Broad industry connections amplify property exposure to qualified buyers across local, regional, and national markets.", icon: <Globe size={32} /> },
            { title: "Proven Track Record", desc: "History of successful land auctions demonstrates our commitment to delivering results that exceed expectations.", icon: <Award size={32} /> },
            { title: "Comprehensive Services", desc: "Full support from auction preparation to execution and closing — we handle every detail of the process.", icon: <Layers size={32} /> },
            { title: "Client-Centric Focus", desc: "Personalized service targeting optimal outcomes for every seller and buyer in the auction process.", icon: <Handshake size={32} /> },
          ]} />

          <ExperienceSection />
          <ServicesNavStrip />
          <CTABanner
            heading="Contact Us To Get Started"
            description="Contact us today to explore how a land auction can help you achieve the best possible price for your Florida property."
          />
        </div>
      )
    },

    /* ═══════════════════════════════════════════
       LAND BROKERAGE
       ═══════════════════════════════════════════ */
    '/services/land-brokerage': {
      title: 'Land',
      highlighted: 'Brokerage',
      subtitle: 'Premier land brokerage services connecting buyers and sellers across Central Florida with proven expertise.',
      image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2671&q=80',
      seoTitle: 'Your Expert in Florida Land Brokerage | SVN McDonald',
      seoDescription: 'SVN McDonald & Company proudly presents its premier land brokerage services in Central Florida, connecting buyers and sellers with proven expertise and local market knowledge.',
      content: (
        <div className="space-y-24">
          {/* Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-svn-dark uppercase tracking-tighter mb-8">
                Land Brokerage <span className="text-svn-orange">in Florida</span>
              </h2>
              <div className="space-y-6 text-gray-500 font-medium leading-relaxed">
                <p className="text-lg">
                  SVN McDonald and Company proudly presents its premier land brokerage services in Central Florida. With a proven track record of success, we specialize in connecting buyers and sellers in this thriving region.
                </p>
                <p>
                  Whether it's agricultural land, transitional land for development, or recreational acreage, our team has the expertise to guide you through every step of the transaction. We understand zoning, land use, environmental constraints, and market trends that affect land value.
                </p>
                <p>
                  Our deep local roots combined with SVN's national reach ensure your property gets the attention it deserves from qualified buyers across the country.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Florida land brokerage"
                className="rounded-2xl shadow-2xl"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
              <div className="absolute -bottom-8 -left-8 bg-svn-orange text-white p-8 rounded-2xl shadow-xl hidden lg:block">
                <div className="text-4xl font-black mb-1">30+</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em]">Years Experience</div>
              </div>
            </motion.div>
          </div>

          {/* Why Choose */}
          <WhyChooseSection items={[
            { title: "Extensive Local Knowledge", desc: "Profound understanding of the Central Florida land market, from Marion County ranch land to development corridors.", icon: <MapPin size={32} /> },
            { title: "Customized Solutions", desc: "Tailored strategies for buyers and sellers based on the specific property type, zoning, and investment goals.", icon: <Target size={32} /> },
            { title: "Strong Network", desc: "National SVN platform combined with deep local connections maximizes property exposure to qualified buyers.", icon: <Globe size={32} /> },
            { title: "Proven Track Record", desc: "Decades of successful land transactions in Central Florida demonstrate our expertise and dedication.", icon: <Award size={32} /> },
            { title: "Comprehensive Services", desc: "From initial market analysis to closing, we provide end-to-end support for every land transaction.", icon: <Layers size={32} /> },
            { title: "Client-Centric Approach", desc: "We are dedicated to delivering unparalleled expertise, professionalism, and results in every land transaction.", icon: <Handshake size={32} /> },
          ]} />

          {/* Closing statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-12 md:p-16 shadow-sm border border-gray-100 text-center"
          >
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-3xl mx-auto italic">
              "At SVN McDonald and Company, we are dedicated to delivering unparalleled expertise, professionalism, and results in every land transaction in Central Florida."
            </p>
          </motion.div>

          <ExperienceSection />
          <ServicesNavStrip />
          <CTABanner
            heading="Contact Us To Get Started"
            description="Whether you're buying or selling land in Central Florida, contact us today to discover how our premier land brokerage services can help you achieve your goals."
          />
        </div>
      )
    },

    /* ═══════════════════════════════════════════
       STRATEGIC MARKETING
       ═══════════════════════════════════════════ */
    '/services/strategic-marketing': {
      title: 'Strategic',
      highlighted: 'Marketing',
      subtitle: 'Premium, strategically driven commercial real estate and leasing services in Central Florida.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2574&q=80',
      seoTitle: 'Commercial Real Estate Strategic Marketing in Florida | SVN McDonald',
      seoDescription: 'SVN McDonald & Company presents premium, strategically driven commercial real estate marketing and leasing services in Central Florida with proven success.',
      content: (
        <div className="space-y-24">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-black text-svn-dark uppercase tracking-tighter mb-8">
              Strategic Marketing <span className="text-svn-orange">in Florida</span>
            </h2>
            <div className="space-y-6 text-gray-500 font-medium leading-relaxed">
              <p className="text-lg">
                SVN McDonald and Company presents premium, strategically driven commercial real estate and leasing services in Central Florida. With a proven track record of connecting landlords and tenants, our team of dedicated professionals is equipped with unmatched expertise and an intricate understanding of the local real estate landscape.
              </p>
              <p>
                We don't just put a sign on the property — we create a comprehensive marketing package that tells the compelling story of your asset and places it in front of the right audience at the right time.
              </p>
            </div>
          </motion.div>

          {/* Marketing Channels */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-10">
              Marketing <span className="text-svn-orange">Channels</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Globe size={48} />,
                  title: "Digital",
                  items: ["Email campaigns to targeted buyer lists", "Social media marketing across platforms", "Premium listing portals (LoopNet, Crexi, Buildout)", "SEO-optimized property pages", "Virtual tours and video marketing"]
                },
                {
                  icon: <BookOpen size={48} />,
                  title: "Print & Direct",
                  items: ["Professional marketing brochures", "Direct mail to qualified prospects", "Premium signage and property banners", "Industry publication advertising", "Branded property presentation packages"]
                },
                {
                  icon: <Users size={48} />,
                  title: "Network",
                  items: ["Internal SVN advisor network calls", "Collaborative brokerage community", "National SVN platform reach", "Industry events and conferences", "Targeted broker-to-broker outreach"]
                },
              ].map((channel, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="bg-svn-dark rounded-2xl p-10 text-white"
                >
                  <div className="text-svn-orange mb-6">{channel.icon}</div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-6">{channel.title}</h3>
                  <ul className="space-y-3">
                    {channel.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-400 text-sm">
                        <CheckCircle className="text-svn-orange flex-shrink-0 mt-0.5" size={14} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why Choose */}
          <WhyChooseSection items={[
            { title: "Local Market Mastery", desc: "Deep understanding of the Central Florida market enables identification of optimal commercial opportunities and targeted buyer pools.", icon: <MapPin size={32} /> },
            { title: "Tailored Marketing Strategies", desc: "Customized marketing solutions for both landlords and tenants, ensuring maximum exposure to qualified prospects.", icon: <Target size={32} /> },
            { title: "Extensive Network", desc: "Industry connections and the national SVN platform amplify property exposure far beyond the local market.", icon: <Globe size={32} /> },
            { title: "Proven Success", desc: "History of successful commercial transactions and leasing engagements demonstrates our marketing effectiveness.", icon: <Award size={32} /> },
            { title: "Comprehensive Offerings", desc: "Services from valuation through leasing agreements and disposition — a full-spectrum marketing approach.", icon: <Layers size={32} /> },
            { title: "Client-Centered Approach", desc: "Personalized, focused service that puts your property's unique value proposition at the center of every campaign.", icon: <Handshake size={32} /> },
          ]} />

          <ExperienceSection />
          <ServicesNavStrip />
          <CTABanner
            heading="Contact Us To Get Started"
            description="Ready to showcase your property to the right buyers? Contact us today to learn how our strategic marketing approach can maximize your asset's exposure and value."
          />
        </div>
      )
    },

    /* ═══════════════════════════════════════════
       VALUATION & APPRAISAL
       ═══════════════════════════════════════════ */
    '/services/valuation-appraisal': {
      title: 'Valuation &',
      highlighted: 'Appraisal',
      subtitle: 'Accurate, reliable property valuation services backed by local market expertise and advanced methodology.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80',
      seoTitle: 'Valuation Appraisal | SVN McDonald & Company',
      seoDescription: 'SVN McDonald & Company provides accurate property valuation appraisals with comprehensive local market analysis, advanced tools, and detailed reporting for informed real estate decisions.',
      content: (
        <div className="space-y-24">
          {/* Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-svn-dark uppercase tracking-tighter mb-8">
                What is <span className="text-svn-orange">Valuation Appraisal?</span>
              </h2>
              <div className="space-y-6 text-gray-500 font-medium leading-relaxed">
                <p className="text-lg">
                  At SVN McDonald & Co., we understand the importance of accurate property valuation appraisals in the real estate industry. Whether you're buying, selling, or leasing property, having a comprehensive understanding of its value is essential for making informed decisions.
                </p>
                <p>
                  Valuation appraisal is the process of determining the fair market value of a property based on various factors such as location, size, condition, and comparable sales. This process involves thorough research, analysis, and evaluation of the property to arrive at an accurate determination of worth.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-svn-dark rounded-2xl p-10 text-white">
                <h3 className="text-xl font-black uppercase tracking-tight mb-6 text-svn-orange">How Can We Help?</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Our team of experienced real estate professionals specializes in valuation appraisal services. We have extensive knowledge of the local market and access to advanced valuation tools and resources to provide precise and reliable property valuations.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We provide Broker Price Opinions (BPOs) and detailed market analyses to help you make informed decisions about holding, selling, or refinancing. Our valuations are backed by real-time market data, comparable sales, and income capitalization approaches where applicable.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-10">
              Our Valuation <span className="text-svn-orange">Process</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Market Analysis",
                  desc: "Comprehensive analysis of the local real estate market including recent sales data, comparable properties, and current market trends to establish a foundation for valuation."
                },
                {
                  step: "02",
                  title: "Property Evaluation",
                  desc: "Detailed inspection and assessment of the property, using our expertise and market information to calculate fair market value through multiple proven methodologies."
                },
                {
                  step: "03",
                  title: "Detailed Report",
                  desc: "Preparation of a comprehensive appraisal report outlining our findings, methodology, and conclusions — delivered with the speed and transparency you need."
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="text-8xl font-black text-svn-orange/10 absolute -top-4 -right-2">{item.step}</div>
                  <div className="relative z-10">
                    <h4 className="font-black text-svn-dark uppercase tracking-wider text-lg mb-4">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Unique Selling Points */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-12 md:p-16 shadow-sm border border-gray-100"
          >
            <h2 className="text-3xl font-black text-svn-dark uppercase tracking-tighter mb-8">
              Your Partners in <span className="text-svn-orange">Excellence</span>
            </h2>
            <div className="space-y-6 text-gray-500 font-medium leading-relaxed">
              <p>
                SVN McDonald is a local business, meaning we have a deep understanding of the local market dynamics and trends, allowing us to provide accurate valuations tailored to your specific needs.
              </p>
              <p>
                We understand that time is of the essence in real estate transactions, which is why we prioritize efficiency and strive to deliver timely appraisal reports to our clients. Additionally, we prioritize open communication, transparency, and integrity in all our dealings.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              {[
                { icon: <MapPin size={24} />, label: "Local Expertise" },
                { icon: <Clock size={24} />, label: "Fast Turnaround" },
                { icon: <Shield size={24} />, label: "Transparency" },
                { icon: <FileSearch size={24} />, label: "Detailed Reports" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="bg-svn-orange/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
                    <div className="text-svn-orange">{item.icon}</div>
                  </div>
                  <span className="text-xs font-bold text-svn-dark uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <ExperienceSection />
          <ServicesNavStrip />
          <CTABanner
            heading="Contact Us To Get Started"
            description="Trust the experts at SVN McDonald & Co. to provide you with accurate and reliable valuation appraisal services. Contact us today to schedule a consultation."
          />
        </div>
      )
    },

    /* ═══════════════════════════════════════════
       VALUE POSITIONING
       ═══════════════════════════════════════════ */
    '/services/value-positioning': {
      title: 'Value & Marketing',
      highlighted: 'Positioning',
      subtitle: 'Value-driven, strategically positioned land brokerage services connecting buyers and sellers in Central Florida.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80',
      seoTitle: 'Experts in Value and Marketing Positioning in Florida | SVN McDonald & Company',
      seoDescription: 'SVN McDonald & Company provides premier, value-driven, strategically positioned land brokerage services in Central Florida connecting buyers and sellers effectively.',
      content: (
        <div className="space-y-24">
          {/* Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-svn-dark uppercase tracking-tighter mb-8">
                Value and Marketing Positioning <span className="text-svn-orange">in Florida</span>
              </h2>
              <div className="space-y-6 text-gray-500 font-medium leading-relaxed">
                <p className="text-lg">
                  SVN McDonald and Company provides premier, value-driven, strategically positioned land brokerage services in Central Florida. The firm specializes in connecting buyers and sellers with dedicated professionals possessing extensive local real estate expertise.
                </p>
                <p>
                  Our value positioning service goes beyond traditional appraisal. We analyze the highest and best use for your property to ensure it's positioned to attract the right buyers and command the highest price. By identifying the unique strengths of your asset and aligning them with current market demand, we create a compelling narrative that resonates with investors and developers alike.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Value positioning strategy"
                className="rounded-2xl shadow-2xl"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
            </motion.div>
          </div>

          {/* Why Choose */}
          <WhyChooseSection items={[
            { title: "In-Depth Local Insight", desc: "Deep market understanding identifies prime land opportunities and positions assets for maximum buyer appeal.", icon: <Search size={32} /> },
            { title: "Tailored Strategies", desc: "Customized solutions for distinct buyer and seller needs, ensuring effective positioning for every unique property.", icon: <Target size={32} /> },
            { title: "Extensive Network", desc: "Industry connections and partnerships maximize property exposure to the right qualified buyers at the right time.", icon: <Globe size={32} /> },
            { title: "Proven Excellence", desc: "Successful transaction track record demonstrates our dedication to achieving top-dollar results for our clients.", icon: <Award size={32} /> },
            { title: "Comprehensive Services", desc: "Complete support from initial valuation and positioning strategy through marketing execution and closing.", icon: <Layers size={32} /> },
            { title: "Client-Centric Focus", desc: "Personalized service prioritizing optimal outcomes — your goals drive every decision we make.", icon: <Handshake size={32} /> },
          ]} />

          {/* Featured listings callout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-12 md:p-16 shadow-sm border border-gray-100"
          >
            <h2 className="text-3xl font-black text-svn-dark uppercase tracking-tighter mb-6">
              Featured <span className="text-svn-orange">Listings</span>
            </h2>
            <p className="text-gray-500 font-medium leading-relaxed mb-8">
              Our portfolio includes Triple Net properties, Farm Land, and Commercial Spaces across Central Florida. Each listing is strategically positioned with comprehensive market analysis and targeted marketing to attract qualified buyers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/land-properties" className="inline-flex items-center gap-2 bg-svn-dark text-white font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-full hover:bg-svn-orange transition-all duration-300">
                Land Listings <ArrowRight size={14} />
              </Link>
              <Link to="/commercial-properties" className="inline-flex items-center gap-2 bg-svn-dark text-white font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-full hover:bg-svn-orange transition-all duration-300">
                Commercial Listings <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          <ExperienceSection />
          <ServicesNavStrip />
          <CTABanner
            heading="Contact Us To Get Started"
            description="Let us position your property for maximum value. Contact us today to explore how our strategic approach can help you achieve the best results."
          />
        </div>
      )
    },

    /* ═══════════════════════════════════════════
       TYPES OF COMMERCIAL REAL ESTATE
       ═══════════════════════════════════════════ */
    '/services/types-of-commercial-real-estate': {
      title: 'Types of Commercial',
      highlighted: 'Real Estate',
      subtitle: 'Exploring the diverse commercial real estate opportunities in the Ocala and Central Florida market.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2300&q=80',
      seoTitle: 'Types of Commercial Real Estate | SVN McDonald & Company',
      seoDescription: 'Explore the six core types of commercial real estate in Ocala and Central Florida — office, retail, industrial, multi-family, hospitality, and special purpose properties.',
      content: (
        <div className="space-y-24">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-6">
              6 Types of <span className="text-svn-orange">Commercial Real Estate</span>
            </h2>
            <p className="text-gray-500 font-medium leading-relaxed text-lg">
              When diving into the realm of commercial real estate, we're here to help you understand the various types available and their unique characteristics. Whether you're an investor, business owner, or entrepreneur looking to expand, knowing the landscape can greatly influence your decision-making process.
            </p>
          </motion.div>

          {/* Property Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Building2 size={40} />,
                title: "Office Spaces",
                paragraphs: [
                  "Ocala boasts a vibrant office space market, catering to businesses of all sizes. From traditional corporate offices to co-working spaces, there are options to suit every need. Whether you seek a prestigious downtown address or a suburban office park, Ocala offers diverse choices for establishing your business presence.",
                  "The rise of remote and hybrid work has reshaped demand, but Central Florida's population growth continues to drive need for professional office environments. Medical office buildings near regional healthcare campuses represent a particularly strong sub-sector.",
                  "SVN McDonald & Company tracks lease rates, vacancy trends, and new construction across Marion County to help clients identify the right office investment or space for their business."
                ]
              },
              {
                icon: <ShoppingBag size={40} />,
                title: "Retail Properties",
                paragraphs: [
                  "Ocala's retail sector is dynamic, with options ranging from bustling shopping centers to quaint storefronts. Whether you're in the market for a prime location in a high-traffic area or a niche space in a specialized market, Ocala provides ample opportunities for retail ventures to thrive.",
                  "Triple net (NNN) leased retail properties are especially attractive to investors seeking passive income with minimal landlord responsibilities. National tenants such as pharmacies, quick-service restaurants, and dollar stores provide stable cash flow and creditworthy lease guarantees.",
                  "Our team analyzes traffic counts, demographics, and tenant mix to help clients find or position retail assets for maximum return in the Central Florida market."
                ]
              },
              {
                icon: <Factory size={40} />,
                title: "Industrial Properties",
                paragraphs: [
                  "With its strategic location and access to major transportation routes, Ocala is an ideal hub for industrial operations. Warehouses, distribution centers, and manufacturing facilities abound, offering businesses the infrastructure they need to succeed in today's competitive market.",
                  "E-commerce growth has accelerated demand for last-mile distribution and fulfillment centers throughout Central Florida. Marion County's business-friendly environment and available land for build-to-suit development attract both regional operators and national tenants.",
                  "SVN McDonald & Company helps investors and owner-occupants navigate site selection, zoning requirements, and lease structures in this high-demand asset class."
                ]
              },
              {
                icon: <Home size={40} />,
                title: "Multi-Family Housing",
                paragraphs: [
                  "Ocala's growing population fuels demand for multifamily housing options, including apartments, condominiums, and townhouses. Investors looking to capitalize on the city's housing market can find lucrative opportunities in both new developments and existing properties.",
                  "Significant population growth driven by the World Equestrian Center, retiree migration, and affordability compared to Orlando and Tampa translates into strong occupancy rates and rising rents for well-located multi-family assets.",
                  "Our team provides acquisition analysis, rent comparables, and disposition strategies for multi-family investors looking to capitalize on Central Florida's demographic tailwinds."
                ]
              },
              {
                icon: <Hotel size={40} />,
                title: "Hospitality Properties",
                paragraphs: [
                  "As a popular destination for tourists and visitors, Ocala boasts a vibrant hospitality sector. Hotels, resorts, and bed-and-breakfast establishments cater to both leisure and business travelers, providing a range of accommodations to suit every budget and preference.",
                  "The World Equestrian Center has transformed Ocala into a year-round destination, drawing hundreds of thousands of visitors annually. Branded select-service hotels, boutique properties, and extended-stay concepts all perform well in this market.",
                  "SVN McDonald & Company advises hospitality investors on site selection, feasibility analysis, and market positioning to capture this growing tourism economy."
                ]
              },
              {
                icon: <Landmark size={40} />,
                title: "Special Purpose Properties",
                paragraphs: [
                  "From healthcare facilities to educational institutions, Ocala offers a variety of special purpose properties to meet unique needs. These properties require specialized knowledge and expertise, making them an attractive niche for investors and developers.",
                  "Central Florida's aging population drives demand for medical offices, urgent care centers, and assisted living facilities. Meanwhile, rapid residential growth fuels the need for self-storage, childcare centers, and specialized retail like veterinary clinics.",
                  "Our advisors understand the nuances of special purpose valuation and help clients navigate the complexities of acquiring, developing, or disposing of these unique assets."
                ]
              },
            ].map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-svn-dark rounded-2xl p-8 flex flex-col items-start shadow-lg"
              >
                <div className="text-svn-orange mb-6">{type.icon}</div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">{type.title}</h3>
                <div className="text-gray-400 text-sm leading-relaxed space-y-3 flex-1">
                  {type.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Closing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-12 md:p-16 shadow-sm border border-gray-100 text-center"
          >
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-3xl mx-auto">
              Navigating the diverse landscape of commercial real estate in Ocala requires insight, experience, and local market knowledge. Whether you're seeking to lease, purchase, or invest, partnering with a reputable real estate broker can streamline the process and ensure success.
            </p>
            <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-3xl mx-auto mt-6">
              At SVN McDonald & Company, we specialize in connecting clients with the perfect commercial real estate opportunities in Ocala, FL. With our extensive network, personalized service, and in-depth expertise, we're committed to helping you achieve your goals in the vibrant Ocala market.
            </p>
          </motion.div>

          <ServicesNavStrip />
          <CTABanner
            heading="Ready to Invest in Commercial Real Estate?"
            description="Contact us today to learn more about how we can assist you in your commercial real estate endeavors in Ocala and Central Florida."
          />
        </div>
      )
    },
  };

  const currentService = services[path as keyof typeof services] || services['/services'];

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title={currentService.seoTitle || (currentService.title + ' ' + (currentService.highlighted || ''))}
        description={currentService.seoDescription || currentService.subtitle}
        canonical={"https://svnmcdonald.com" + path}
      />
      <StructuredData breadcrumbs={
        path === '/services'
          ? [
              { name: 'Home', url: 'https://svnmcdonald.com' },
              { name: 'Services', url: 'https://svnmcdonald.com/services' },
            ]
          : [
              { name: 'Home', url: 'https://svnmcdonald.com' },
              { name: 'Services', url: 'https://svnmcdonald.com/services' },
              { name: `${currentService.title} ${currentService.highlighted}`.trim(), url: `https://svnmcdonald.com${path}` },
            ]
      } />
      <Navbar />

      <PageHeader
        title={currentService.title}
        highlightedText={currentService.highlighted}
        subtitle={currentService.subtitle}
        backgroundImage={currentService.image}
      />

      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          {currentService.content}
        </div>
      </section>

      <Footer />
    </div>
  );
};

/* ─── Service Card Component ─── */
const ServiceCard = ({ icon, title, desc, link }: { icon: React.ReactNode; title: string; desc: string; link: string }) => (
  <Link to={link} className="bg-white p-10 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col items-start">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-start w-full"
    >
      <div className="text-svn-orange mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-black text-svn-dark uppercase tracking-tight mb-4 group-hover:text-svn-orange transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 font-medium leading-relaxed mb-8 flex-1">
        {desc}
      </p>
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-svn-dark group-hover:text-svn-orange transition-colors mt-auto">
        Learn More <ArrowRight size={14} />
      </div>
    </motion.div>
  </Link>
);

export default ServicesPage;
