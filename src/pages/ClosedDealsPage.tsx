import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Calendar } from 'lucide-react';

const ClosedDealsPage = () => {
  const deals = [
    {
      title: "Trailhead Logistics Center",
      location: "Ocala, FL",
      price: "943,000 SF Leased",
      date: "Sep 2025",
      image: "https://svnmcdonald.com/wp-content/uploads/2024/02/trailhead-logistics-center.webp",
      type: "Industrial"
    },
    {
      title: "550 Acre Jumbolair",
      location: "Ocala, FL",
      price: "$9,500,000",
      date: "Sep 2025",
      image: "https://svnmcdonald.com/wp-content/uploads/2024/09/Jumbolair-Aviation-Estates-1.webp",
      type: "Residential"
    },
    {
      title: "Aurora Oak Residential",
      location: "Ocala, FL",
      price: "$7,000,000+",
      date: "Sep 2025",
      image: "https://svnmcdonald.com/wp-content/uploads/2024/09/Aurora-Oak.webp",
      type: "Land"
    },
    {
      title: "NNN Jiffy Lube",
      location: "Jacksonville, FL",
      price: "7.00 CAP",
      date: "2024",
      image: "https://svnmcdonald.com/wp-content/uploads/2024/01/Jiffy-Lube.webp",
      type: "Retail"
    },
    {
      title: "276+/- Acres Dunnellon",
      location: "Levy County, FL",
      price: "Sold",
      date: "2024",
      image: "https://svnmcdonald.com/wp-content/uploads/2024/01/Dunnellon-Land.webp",
      type: "Land"
    },
    {
      title: "Corporate Campus",
      location: "Ocala, FL",
      price: "$5,500,000",
      date: "Archive",
      image: "https://svnmcdonald.com/wp-content/uploads/2021/04/Corporate-Campus.webp",
      type: "Office"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <Navbar />
      
      <PageHeader 
        title="Closed" 
        highlightedText="Deals" 
        subtitle="A track record of success in Central Florida commercial real estate."
        backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2273&q=80"
      />

      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map((deal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={deal.image} 
                    alt={deal.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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

export default ClosedDealsPage;
