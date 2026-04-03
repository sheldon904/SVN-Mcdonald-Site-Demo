import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const MarketReportsPage = () => {
  const reports = [
    {
      title: "January 2026 Market Report",
      description: "Latest economic updates and commercial real estate market performance for January 2026.",
      date: "Jan 2026",
      image: "/images/reports/economic-updates.webp",
      pdfUrl: "/images/pdfs/Economic-Update_12.30.25.pdf"
    },
    {
      title: "December 2025 Market Report",
      description: "Year-end review and comprehensive analysis of the Central Florida market for December 2025.",
      date: "Dec 2025",
      image: "/images/reports/economic-updates.webp",
      pdfUrl: "/images/pdfs/Economic-Update_11.26.25.pdf"
    },
    {
      title: "November 2025 Market Report",
      description: "Monthly economic indicators and market trends analysis for November 2025.",
      date: "Nov 2025",
      image: "/images/reports/economic-updates.webp",
      pdfUrl: "/images/pdfs/Economic-Update_10.30.25.pdf"
    },
    {
      title: "October 2025 Market Report",
      description: "Detailed breakdown of transaction volume and sector performance for October 2025.",
      date: "Oct 2025",
      image: "/images/reports/economic-updates.webp",
      pdfUrl: "/images/pdfs/Economic-Update_10.16.25.pdf"
    },
    {
      title: "September 2025 Market Report",
      description: "Analyzing the shifting landscape of Ocala real estate for September 2025.",
      date: "Sep 2025",
      image: "/images/reports/economic-updates.webp",
      pdfUrl: "/images/pdfs/Economic-Update_9.11.25.pdf"
    },
    {
      title: "August 2025 Market Report",
      description: "Summer market overview and economic impact study for August 2025.",
      date: "Aug 2025",
      image: "/images/reports/economic-updates.webp",
      pdfUrl: "/images/pdfs/Economic-Update_8.14.25.pdf"
    },
    {
      title: "July 2025 Market Report",
      description: "Mid-year market analysis for Central Florida commercial real estate.",
      date: "Jul 2025",
      image: "/images/reports/economic-updates.webp",
      pdfUrl: "/images/pdfs/Economic-Update_7.24.25.pdf"
    },
    {
      title: "May 2025 Market Report",
      description: "Spring market trends and economic indicators for May 2025.",
      date: "May 2025",
      image: "/images/reports/economic-updates.webp",
      pdfUrl: "/images/pdfs/Economic-Update_5.15.25.pdf"
    },
    {
      title: "February 2025 Market Report",
      description: "Q1 market conditions and commercial real estate outlook for February 2025.",
      date: "Feb 2025",
      image: "/images/reports/economic-updates.webp",
      pdfUrl: "/images/pdfs/Economic-Update_2.13.25.pdf"
    },
    {
      title: "July 2024 Market Report",
      description: "Mid-year review of commercial real estate activity for July 2024.",
      date: "Jul 2024",
      image: "/images/reports/economic-updates.webp",
      pdfUrl: "https://341133.fs1.hubspotusercontent-na1.net/hubfs/341133/Economic%20Update_7.12.24.pdf"
    },
    {
      title: "April 2023 Market Report",
      description: "Spring commercial real estate market analysis for April 2023.",
      date: "Apr 2023",
      image: "/images/reports/economic-updates.webp",
      pdfUrl: "https://341133.fs1.hubspotusercontent-na1.net/hubfs/341133/Economic%20Update_4.14.23-1.pdf"
    },
    {
      title: "December 2022 Market Report",
      description: "Year-end commercial real estate market review for December 2022.",
      date: "Dec 2022",
      image: "/images/reports/economic-updates.webp",
      pdfUrl: "https://341133.fs1.hubspotusercontent-na1.net/hubfs/341133/Economic%20Update_12.30.22.pdf"
    },
    {
      title: "The WEC Effect Report",
      description: "Analyzing the transformative impact of the World Equestrian Center on Ocala land values.",
      date: "Special",
      image: "/images/reports/economic-updates.webp",
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
      <StructuredData breadcrumbs={[
        { name: 'Home', url: 'https://svnmcdonald.com' },
        { name: 'Market Reports', url: 'https://svnmcdonald.com/market-reports' },
      ]} />
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
                  {report.pdfUrl ? (
                    <a href={report.pdfUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
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
                    </a>
                  ) : (
                    <>
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
                    </>
                  )}
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
                  ) : report.pdfUrl ? (
                    <a href={report.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-svn-dark hover:text-svn-orange transition-colors group mt-auto">
                      Download Report
                      <Download size={16} className="group-hover:translate-y-0.5 transition-transform duration-300" />
                    </a>
                  ) : null}
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
