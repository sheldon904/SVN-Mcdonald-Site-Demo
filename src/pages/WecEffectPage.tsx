import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { TrendingUp, MapPin, Scale, Landmark, ArrowRight } from 'lucide-react';

const WecEffectPage = () => {
  const findings = [
    {
      icon: <TrendingUp className="text-svn-orange" size={32} />,
      title: "200% Increase",
      desc: "Land values in areas near the WEC have increased by over 200% since its opening in January 2021."
    },
    {
      icon: <MapPin className="text-svn-orange" size={32} />,
      title: "15 Mile Influence",
      desc: "The economic impact extends up to 15 miles, with the most dramatic shifts within 6 miles of the center."
    },
    {
      icon: <Scale className="text-svn-orange" size={32} />,
      title: "Value Range",
      desc: "In 2023, land prices ranged from $10,974 per acre to a high of $143,117 per acre depending on proximity."
    },
    {
      icon: <Landmark className="text-svn-orange" size={32} />,
      title: "Horse Capital",
      desc: "The WEC has solidified Ocala's reputation, leveraging its unique 'No. 8 soil' and ideal equestrian climate."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title="The WEC Effect - World Equestrian Center Impact Report"
        description="Discover how the World Equestrian Center has transformed Ocala's real estate market. Land values up 200% with SVN McDonald's comprehensive analysis."
        canonical="https://svnmcdonald.com/wec-effect"
      />
      <Navbar />
      
      <PageHeader 
        title="The WEC" 
        highlightedText="Effect" 
        subtitle="Analyzing the transformative impact of the World Equestrian Center on Ocala's real estate market."
        backgroundImage="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80"
      />

      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          {/* Main Content & Data Viz */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
            <div>
              <h2 className="text-4xl font-black text-svn-dark uppercase tracking-tighter mb-8">A Market <span className="text-svn-orange">Transformed</span></h2>
              <div className="prose prose-lg text-gray-500 leading-relaxed mb-10">
                <p>
                  The opening of the World Equestrian Center (WEC) in January 2021 marked a turning point for Central Florida's commercial and agricultural real estate. Our comprehensive analysis of over 300 land transactions reveals a landscape fundamentally altered by this world-class facility.
                </p>
                <p>
                  As the "Horse Capital of the World," Ocala has always possessed natural advantages—limestone-rich soil and mild winters. The WEC has acted as a catalyst, concentrating demand and driving values to unprecedented heights.
                </p>
              </div>
              
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 mb-8">
                <h3 className="text-2xl font-black text-svn-dark uppercase tracking-tight mb-8">Land Value Growth <span className="text-svn-orange">(Per Acre)</span></h3>
                <div className="space-y-8">
                  {[
                    { year: "2019 (Pre-WEC)", value: "$28,400", width: "30%" },
                    { year: "2021 (Opening)", value: "$45,200", width: "55%" },
                    { year: "2023 (Current)", value: "$73,600", width: "100%", highlight: true }
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm font-bold uppercase tracking-widest mb-3">
                        <span className={item.highlight ? "text-svn-orange" : "text-gray-400"}>{item.year}</span>
                        <span className="text-svn-dark font-black">{item.value}</span>
                      </div>
                      <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: item.width }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          className={`h-full rounded-full ${item.highlight ? "bg-svn-orange" : "bg-svn-dark/20"}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  *Based on analysis of vacant land within 6 miles of the World Equestrian Center.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-svn-dark p-12 rounded-3xl text-white mb-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-svn-orange/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-svn-orange/30 transition-colors" />
                <h4 className="text-svn-orange font-bold uppercase tracking-widest text-xs mb-4">Market Insight</h4>
                <p className="text-2xl font-black uppercase tracking-tight leading-tight mb-6">
                  "The influence of the WEC is not just local; it has created a 15-mile radius of economic acceleration."
                </p>
                <div className="w-12 h-1 bg-svn-orange" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {findings.map((finding, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="mb-6">{finding.icon}</div>
                    <h3 className="text-lg font-black text-svn-dark uppercase tracking-tight mb-2">{finding.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed font-medium">{finding.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-svn-orange rounded-3xl p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                Get the Full WEC Effect Report
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed mb-0">
                Are you looking to capitalize on the growth in Ocala? Our team can provide deep insights into land values and opportunities.
              </p>
            </div>
            <div className="relative z-10">
              <a href="tel:3522743800" className="bg-svn-dark text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-svn-dark transition-all duration-300 shadow-xl flex items-center justify-center gap-3">
                Contact Our Experts <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WecEffectPage;
