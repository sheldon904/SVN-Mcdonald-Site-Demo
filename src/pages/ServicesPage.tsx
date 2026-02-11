import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, BarChart, LandPlot, Gavel, FileText, Megaphone, Calculator } from 'lucide-react';

const ServicesPage = () => {
  const location = useLocation();
  const path = location.pathname;

  // content map
  const services = {
    '/services': {
      title: 'Our',
      highlighted: 'Services',
      subtitle: 'Comprehensive commercial real estate solutions tailored to your unique needs.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2301&q=80',
      content: (
        <div className="space-y-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-8">Why Choose <span className="text-svn-orange">SVN McDonald</span></h2>
              <div className="space-y-6">
                {[
                  { title: "In-Depth Local Knowledge", desc: "We possess a profound understanding of the Central Florida market, enabling us to identify and leverage prime business opportunities for our clients." },
                  { title: "Tailored Solutions", desc: "We craft customized strategies and solutions to cater to the unique needs of both buyers and sellers, ensuring a seamless and efficient transaction process." },
                  { title: "Extensive Network", desc: "Leveraging a vast network of industry connections and partnerships, we maximize exposure and opportunities for our clients." },
                  { title: "Proven Success", desc: "Our history of successful business transactions speaks to our commitment to delivering exceptional results for our clients." },
                  { title: "Comprehensive Services", desc: "From valuation and negotiation to the final closing, we offer comprehensive services at every stage of the brokerage process." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <CheckCircle className="text-svn-orange flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-svn-dark uppercase tracking-wider text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2300&q=80" 
                alt="SVN Experience" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-svn-orange text-white p-8 rounded-2xl shadow-xl hidden lg:block">
                <div className="text-4xl font-black mb-1">30+</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em]">Years Experience</div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-4">Our Core <span className="text-svn-orange">Expertise</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto font-medium">We offer a comprehensive suite of real estate services tailored to meet your needs in the Central Florida market.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard 
                icon={<LandPlot size={40} />}
                title="Land Brokerage"
                desc="Expert guidance in buying and selling land for development, agriculture, or investment."
                link="/services/land-brokerage"
              />
              <ServiceCard 
                icon={<Gavel size={40} />}
                title="Land Auctions"
                desc="Accelerated marketing campaigns to maximize value through competitive bidding."
                link="/services/land-auctions"
              />
              <ServiceCard 
                icon={<FileText size={40} />}
                title="Conservation Easement"
                desc="Navigating complex regulations to preserve land while optimizing financial benefits."
                link="/services/conservation-easement"
              />
              <ServiceCard 
                icon={<BarChart size={40} />}
                title="Distressed/REO"
                desc="Strategic solutions for lenders and owners of distressed assets."
                link="/services/distressed-reo"
              />
              <ServiceCard 
                icon={<Megaphone size={40} />}
                title="Strategic Marketing"
                desc="Targeted campaigns that put your property in front of the right buyers."
                link="/services/strategic-marketing"
              />
              <ServiceCard 
                icon={<Calculator size={40} />}
                title="Valuation & Appraisal"
                desc="Accurate, data-driven property valuations to inform your investment decisions."
                link="/services/valuation-appraisal"
              />
            </div>
          </div>

          <div className="bg-svn-dark rounded-3xl p-12 md:p-20 text-white">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">SVN McDonald Has the <span className="text-svn-orange">Experience</span></h2>
              <div className="space-y-6 text-gray-400 font-medium leading-relaxed">
                <p>
                  Our team holds extensive expertise in waterfront properties, spanning diverse land types, market trends, and potential growth areas. Leveraging our profound insights, we provide a competitive advantage whether you're buying or selling expansive properties.
                </p>
                <p>
                  We specialize in understanding the nuances of each unique market. This local perspective ensures you receive accurate and timely information essential for your property decisions.
                </p>
                <div className="pt-8">
                  <a href="tel:3522743800" className="inline-flex items-center gap-4 text-svn-orange hover:text-white transition-colors font-black uppercase tracking-[0.2em]">
                    (352) 274-3800 <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    '/services/conservation-easement': {
      title: 'Conservation',
      highlighted: 'Easement',
      subtitle: "Protecting Florida's natural beauty while maximizing your land's potential.",
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2664&q=80',
      content: (
        <div className="prose prose-lg max-w-none text-gray-500">
          <p className="mb-6">
            A conservation easement is a voluntary legal agreement between a landowner and a land trust or government agency that permanently limits uses of the land in order to protect its conservation values.
          </p>
          <h3 className="text-2xl font-bold text-svn-dark mb-4">Benefits for Landowners</h3>
          <ul className="space-y-4 mb-8">
            {[
              "Income Tax Deduction: Donors of conservation easements may claim an income tax deduction.",
              "Estate Tax Reduction: Can significantly reduce estate taxes.",
              "Property Tax Stability: Keeps property taxes lower by locking in current use.",
              "Legacy: Ensures the land remains undeveloped for future generations."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="text-svn-orange flex-shrink-0 mt-1" size={20} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    '/services/distressed-reo': {
      title: 'Distressed / REO',
      highlighted: 'Properties',
      subtitle: 'Specialized solutions for financial institutions and asset managers.',
      image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2668&q=80',
      content: (
        <div className="prose prose-lg max-w-none text-gray-500">
           <p className="mb-6">
             We specialize in the disposition of distressed assets and Real Estate Owned (REO) properties. Our team works closely with lenders, receivers, and special servicers to maximize recovery values.
           </p>
           <h3 className="text-2xl font-bold text-svn-dark mb-4">Our Approach</h3>
           <p>
             We employ aggressive marketing strategies and leverage our national SVN network to find buyers quickly. From initial valuation to closing, we handle every step of the process with professionalism and speed.
           </p>
        </div>
      )
    },
    '/services/land-auctions': {
      title: 'Land',
      highlighted: 'Auctions',
      subtitle: 'Creating urgency and competition to drive maximum value.',
      image: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2702&q=80',
      content: (
        <div className="prose prose-lg max-w-none text-gray-500">
          <p className="mb-6">
            Auctions are an effective method for selling land, especially unique or high-demand properties. By setting a specific date for the sale, we create urgency among buyers.
          </p>
           <h3 className="text-2xl font-bold text-svn-dark mb-4">Why Auction?</h3>
           <ul className="space-y-4 mb-8">
            {[
              "Fixed Timeline: Sellers know exactly when the property will be sold.",
              "Competitive Bidding: Drives the price up to true market value.",
              "No Contingencies: Auction sales are typically 'as-is' with no contingencies.",
              "High Visibility: Intense marketing period generates maximum exposure."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="text-svn-orange flex-shrink-0 mt-1" size={20} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    '/services/land-brokerage': {
      title: 'Land',
      highlighted: 'Brokerage',
      subtitle: 'Decades of experience in Florida land sales and acquisitions.',
      image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2671&q=80',
      content: (
        <div className="prose prose-lg max-w-none text-gray-500">
          <p className="mb-6">
            Whether it's agricultural land, transitional land for development, or recreational acreage, our team has the expertise to guide you through the transaction.
          </p>
          <p>
            We understand zoning, land use, environmental constraints, and market trends that affect land value. Our deep local roots combined with SVN's national reach ensure your property gets the attention it deserves.
          </p>
        </div>
      )
    },
    '/services/strategic-marketing': {
      title: 'Strategic',
      highlighted: 'Marketing',
      subtitle: 'Showcasing your property to the world.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2574&q=80',
      content: (
        <div className="prose prose-lg max-w-none text-gray-500">
          <p className="mb-6">
            We don't just put a sign on the property. We create a comprehensive marketing package that tells the story of your asset.
          </p>
           <h3 className="text-2xl font-bold text-svn-dark mb-4">Marketing Channels</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm">
               <h4 className="font-bold text-svn-dark mb-2">Digital</h4>
               <p className="text-sm">Email campaigns, social media, listing portals (LoopNet, Crexi, Buildout).</p>
             </div>
             <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm">
               <h4 className="font-bold text-svn-dark mb-2">Print</h4>
               <p className="text-sm">Direct mail brochures, signage, industry publications.</p>
             </div>
             <div className="bg-white p-6 border border-gray-100 rounded-lg shadow-sm">
               <h4 className="font-bold text-svn-dark mb-2">Network</h4>
               <p className="text-sm">Internal SVN advisor network calls and collaborative brokerage community.</p>
             </div>
           </div>
        </div>
      )
    },
    '/services/valuation-appraisal': {
      title: 'Valuation &',
      highlighted: 'Appraisal',
      subtitle: 'Knowing the true value of your asset is the first step.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80',
      content: (
         <div className="prose prose-lg max-w-none text-gray-500">
          <p className="mb-6">
            We provide Broker Price Opinions (BPOs) and detailed market analyses to help you make informed decisions about holding, selling, or refinancing.
          </p>
          <p>
            Our valuations are backed by real-time market data, comparable sales, and income capitalization approaches where applicable.
          </p>
        </div>
      )
    },
    '/services/value-positioning': {
      title: 'Value',
      highlighted: 'Positioning',
      subtitle: 'Maximizing asset value through strategic market positioning.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80',
      content: (
        <div className="prose prose-lg max-w-none text-gray-500">
          <p className="mb-6">
            Our value positioning service goes beyond traditional appraisal. We analyze the highest and best use for your property to ensure it's positioned to attract the right buyers and command the highest price.
          </p>
          <h3 className="text-2xl font-bold text-svn-dark mb-4">Our Strategy</h3>
          <p>
            By identifying the unique strengths of your asset and aligning them with current market demand, we create a compelling narrative that resonates with investors and developers alike.
          </p>
        </div>
      )
    },
  };

  const currentService = services[path as keyof typeof services] || services['/services'];

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
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

// Helper component for the main services list
const ServiceCard = ({ icon, title, desc, link }: { icon: React.ReactNode, title: string, desc: string, link: string }) => (
  <motion.a 
    href={link}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white p-10 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col items-start"
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
  </motion.a>
);

export default ServicesPage;
