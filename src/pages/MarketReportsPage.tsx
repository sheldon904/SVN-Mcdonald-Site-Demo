import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MarketReportsPage = () => {
  const reports = [
    {
      title: "January 2026 Market Report",
      description: "Latest economic updates and commercial real estate market performance for January 2026.",
      date: "Jan 2026",
      image: "https://svnmcdonald.com/wp-content/uploads/2023/05/economic-updates.webp"
    },
    {
      title: "December 2025 Market Report",
      description: "Year-end review and comprehensive analysis of the Central Florida market for December 2025.",
      date: "Dec 2025",
      image: "https://svnmcdonald.com/wp-content/uploads/2023/05/economic-updates.webp"
    },
    {
      title: "November 2025 Market Report",
      description: "Monthly economic indicators and market trends analysis for November 2025.",
      date: "Nov 2025",
      image: "https://svnmcdonald.com/wp-content/uploads/2023/05/economic-updates.webp"
    },
    {
      title: "October 2025 Market Report",
      description: "Detailed breakdown of transaction volume and sector performance for October 2025.",
      date: "Oct 2025",
      image: "https://svnmcdonald.com/wp-content/uploads/2023/05/economic-updates.webp"
    },
    {
      title: "September 2025 Market Report",
      description: "Analyzing the shifting landscape of Ocala real estate for September 2025.",
      date: "Sep 2025",
      image: "https://svnmcdonald.com/wp-content/uploads/2023/05/economic-updates.webp"
    },
    {
      title: "August 2025 Market Report",
      description: "Summer market overview and economic impact study for August 2025.",
      date: "Aug 2025",
      image: "https://svnmcdonald.com/wp-content/uploads/2023/05/economic-updates.webp"
    },
    {
      title: "The WEC Effect Report",
      description: "Analyzing the transformative impact of the World Equestrian Center on Ocala land values.",
      date: "Special",
      image: "https://svnmcdonald.com/wp-content/uploads/2023/05/economic-updates.webp",
      link: "/wec-effect"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title="Market Reports & Economic Updates"
        description="Access monthly commercial real estate market reports and economic analyses for Ocala and Central Florida from SVN McDonald & Company."
        canonical="https://svnmcdonald.com/market-reports"
      />
      <Navbar />
      
      <PageHeader 
        title="Market" 
        highlightedText="Reports" 
        subtitle="Stay informed with the latest data and insights from our research team."
        backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80"
      />

      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.map((report, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                <div className="relative h-64">
                  <img
                    src={report.image}
                    alt={report.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="400"
                  />
                  <div className="absolute inset-0 bg-svn-dark/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <FileText size={48} className="text-white" />
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-svn-orange uppercase tracking-widest bg-svn-orange/10 px-2 py-1 rounded">
                      {report.date}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-svn-dark uppercase tracking-tight mb-4">{report.title}</h3>
                  <p className="text-gray-500 mb-8 flex-1 leading-relaxed">
                    {report.description}
                  </p>
                  
                  {report.link ? (
                    <Link to={report.link} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-svn-dark hover:text-svn-orange transition-colors group mt-auto">
                      View Report 
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  ) : (
                    <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-svn-dark hover:text-svn-orange transition-colors group mt-auto">
                      Read More 
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  )}
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
