import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import SEOHead from '../components/SEOHead';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Calendar } from 'lucide-react';

const deals = [
  {
    title: "17.59 +/- Commercial Acres Marion Oaks",
    location: "Marion Oaks, FL",
    price: "Sold",
    date: "Feb 2026",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/10/Hwy-484-Ocala-1920x1073.jpg",
    type: "Land"
  },
  {
    title: "78+/- Acres Horse Country",
    location: "NW Marion County, FL",
    price: "Sold",
    date: "Feb 2026",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/10/Hwy-484-Ocala-1920x1073.jpg",
    type: "Land"
  },
  {
    title: "Trailhead Logistics Center",
    location: "Ocala, FL",
    price: "943,000 SF Leased",
    date: "Feb 2026",
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
    title: "39 Acres Mixed Use I-75/Hwy 484",
    location: "Ocala, FL",
    price: "$5,700,000",
    date: "2024",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/10/Hwy-484-Ocala-1920x1073.jpg",
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
    title: "NNN Industrial",
    location: "Ocala, FL",
    price: "8.16 CAP",
    date: "2024",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg",
    type: "Industrial"
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
    title: "4,000 SF Warehouse",
    location: "Ocala, FL",
    price: "Sold",
    date: "2024",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg",
    type: "Industrial"
  },
  {
    title: "6,600 SF Warehouse",
    location: "Summerfield, FL",
    price: "Sold",
    date: "2024",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg",
    type: "Industrial"
  },
  {
    title: "35.28 +/- Residential Acres",
    location: "Marion County, FL",
    price: "Sold",
    date: "2023",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/10/Hwy-484-Ocala-1920x1073.jpg",
    type: "Land"
  },
  {
    title: "55,000 SF Covered Storage Heavy Industrial",
    location: "Ocala, FL",
    price: "Sold",
    date: "2023",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg",
    type: "Industrial"
  },
  {
    title: "Downtown Ocala Office",
    location: "Ocala, FL",
    price: "Sold",
    date: "2023",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg",
    type: "Office"
  },
  {
    title: "90,000 SF Industrial",
    location: "Ocala, FL",
    price: "$3,100,000",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg",
    type: "Industrial"
  },
  {
    title: "Shopping Center",
    location: "Ocala, FL",
    price: "$2,200,000",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg",
    type: "Retail"
  },
  {
    title: "153 Acres",
    location: "Marion County, FL",
    price: "$1,086,300",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/10/Hwy-484-Ocala-1920x1073.jpg",
    type: "Land"
  },
  {
    title: "182 Acres Reddick",
    location: "Reddick, FL",
    price: "$1,133,400",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/10/Hwy-484-Ocala-1920x1073.jpg",
    type: "Land"
  },
  {
    title: "115 Acres Citra",
    location: "Citra, FL",
    price: "$648,000",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/10/Hwy-484-Ocala-1920x1073.jpg",
    type: "Land"
  },
  {
    title: "145 Acres — 870 Residential Units",
    location: "Marion County, FL",
    price: "$4,926,300",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/10/Hwy-484-Ocala-1920x1073.jpg",
    type: "Land"
  },
  {
    title: "86,500 SF Warehouse",
    location: "Ocala, FL",
    price: "$3,190,000",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg",
    type: "Industrial"
  },
  {
    title: "Corporate Campus",
    location: "Ocala, FL",
    price: "$5,500,000",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2021/04/Corporate-Campus.webp",
    type: "Office"
  },
  {
    title: "34,056 SF Office",
    location: "Ocala, FL",
    price: "$2,200,000",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg",
    type: "Office"
  },
  {
    title: "11,364 SF Office",
    location: "Ocala, FL",
    price: "$1,700,000",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg",
    type: "Office"
  },
  {
    title: "34,825 SF Warehouse",
    location: "Ocala, FL",
    price: "$1,355,900",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg",
    type: "Industrial"
  },
  {
    title: "Outparcel Hwy 200",
    location: "Ocala, FL",
    price: "Sold",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg",
    type: "Retail"
  },
  {
    title: "42,000 SF Retail",
    location: "Ocala, FL",
    price: "Sold",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg",
    type: "Retail"
  },
  {
    title: "235-Unit Self Storage",
    location: "Marion County, FL",
    price: "$812,500",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg",
    type: "Self Storage"
  },
  {
    title: "25,000 SF Falcon Industrial Park",
    location: "Ocala, FL",
    price: "Leased",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg",
    type: "Industrial"
  },
  {
    title: "140 Residential Lots",
    location: "Marion County, FL",
    price: "Sold",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/10/Hwy-484-Ocala-1920x1073.jpg",
    type: "Land"
  },
  {
    title: "8,000 SF Office (Former Disney Welcome Center)",
    location: "Ocala, FL",
    price: "Sold",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg",
    type: "Office"
  },
  {
    title: "Bank Owned 78 Wooded Acres",
    location: "Marion County, FL",
    price: "Sold",
    date: "Archive",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/10/Hwy-484-Ocala-1920x1073.jpg",
    type: "Land"
  }
];

const categories = ["All", "Land", "Industrial", "Office", "Retail", "Residential", "Self Storage"] as const;

const ClosedDealsPage = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredDeals = activeFilter === "All"
    ? deals
    : deals.filter((deal) => deal.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title="Closed Deals & Transaction History"
        description="View SVN McDonald's track record of successful commercial real estate transactions in Central Florida. Land, retail, office, and industrial deals."
        canonical="https://svnmcdonald.com/closed-deals"
      />
      <Navbar />

      <PageHeader
        title="Closed"
        highlightedText="Deals"
        subtitle="A track record of success in Central Florida commercial real estate."
        backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2273&q=80"
      />

      <section className="py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full border transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-svn-orange text-white border-svn-orange"
                    : "bg-white text-gray-600 border-gray-200 hover:border-svn-orange hover:text-svn-orange"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDeals.map((deal, index) => (
              <motion.div
                key={deal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="400"
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
