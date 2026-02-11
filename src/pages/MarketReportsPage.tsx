import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

const MarketReportsPage = () => {
  const reports = [
    {
      title: "Q3 2024 Market Report",
      description: "Comprehensive analysis of Central Florida's commercial real estate market performance for the third quarter of 2024.",
      date: "Oct 2024",
      size: "2.4 MB",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80"
    },
    {
      title: "Ocala Industrial Overview",
      description: "In-depth look at the industrial sector in Ocala, including vacancy rates, absorption, and development pipeline.",
      date: "Sep 2024",
      size: "1.8 MB",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2370&q=80"
    },
    {
      title: "The WEC Effect Report",
      description: "Analyzing the economic impact of the World Equestrian Center on the local real estate market.",
      date: "Aug 2024",
      size: "3.1 MB",
      image: "https://images.unsplash.com/photo-1534438097545-a2c22c57f01b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80"
    },
    {
      title: "Q2 2024 Market Report",
      description: "Mid-year review of market trends, sales volume, and pricing strategies.",
      date: "Jul 2024",
      size: "2.2 MB",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <Navbar />
      
      <PageHeader 
        title="Market" 
        highlightedText="Reports" 
        subtitle="Stay informed with the latest data and insights from our research team."
        backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80"
      />

      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reports.map((report, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row"
              >
                <div className="md:w-1/3 relative h-48 md:h-auto">
                  <img 
                    src={report.image} 
                    alt={report.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-svn-dark/60 flex items-center justify-center">
                    <FileText size={48} className="text-white opacity-80" />
                  </div>
                </div>
                
                <div className="p-8 md:w-2/3 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-svn-orange uppercase tracking-widest bg-svn-orange/10 px-2 py-1 rounded">
                      {report.date}
                    </span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {report.size}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-svn-dark uppercase tracking-tight mb-4">{report.title}</h3>
                  <p className="text-gray-500 mb-8 flex-1 leading-relaxed">
                    {report.description}
                  </p>
                  
                  <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-svn-dark hover:text-svn-orange transition-colors group mt-auto">
                    Download Report 
                    <Download size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MarketReportsPage;
