import { motion } from 'framer-motion';
import { ArrowRight, TreePine, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

const mainServices: { title: string; subtitle: string; description: string; image: string; Icon: LucideIcon; href: string }[] = [
  {
    title: "SVN Land",
    subtitle: "Central Florida's Land Experts",
    description: "Specializing in agricultural, development, and conservation land throughout the Sunshine State.",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/10/Hwy-484-Ocala-1920x1073.jpg",
    Icon: TreePine,
    href: "/land-properties"
  },
  {
    title: "SVN Commercial",
    subtitle: "Premier Commercial Brokerage",
    description: "Full-service commercial real estate solutions for retail, office, industrial, and investment properties.",
    image: "https://svnmcdonald.com/wp-content/uploads/2024/06/TrafficBlog-.jpg",
    Icon: Building2,
    href: "/commercial-properties"
  }
];

const subServices = [
  "Conservation Easement",
  "Distressed/REO Properties",
  "Land Auctions",
  "Land Brokerage",
  "Strategic Marketing",
  "Value Positioning",
  "Valuation Appraisal"
];

const subServiceRoutes: Record<string, string> = {
  "Conservation Easement": "/services/conservation-easement",
  "Distressed/REO Properties": "/services/distressed-reo",
  "Land Auctions": "/services/land-auctions",
  "Land Brokerage": "/services/land-brokerage",
  "Strategic Marketing": "/services/strategic-marketing",
  "Value Positioning": "/services/value-positioning",
  "Valuation Appraisal": "/services/valuation-appraisal"
};

const Services = () => {
  return (
    <section className="py-14 md:py-24 bg-[#F6F6F6] px-4 md:px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 mb-12 md:mb-20">
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-[340px] md:h-[500px] rounded-xl md:rounded-[30px] overflow-hidden group cursor-pointer shadow-2xl"
            >
              <Link to={service.href}>
                <img
                  src={service.image}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  width={1920}
                  height={1073}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">
                  <service.Icon size={36} className="text-white mb-4 md:mb-6 md:w-12 md:h-12" strokeWidth={1.5} />
                  <h3 className="text-2xl md:text-4xl font-black text-white uppercase mb-2 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-svn-orange font-bold uppercase tracking-widest text-sm mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-white/70 max-w-sm mb-5 md:mb-8 font-medium text-sm md:text-base">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-3 text-white font-black uppercase tracking-[0.2em] text-sm group/btn">
                    Explore {service.title}
                    <div className="w-10 h-10 rounded-full bg-svn-orange flex items-center justify-center transition-transform group-hover/btn:translate-x-2">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-2xl md:rounded-[40px] p-6 md:p-12 shadow-xl border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="max-w-md">
              <h4 className="text-2xl font-black text-svn-dark uppercase mb-4">Specialized Services</h4>
              <p className="text-gray-500 font-medium">Beyond standard brokerage, we provide expert advisory across several specialized practice areas.</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-3">
              {subServices.map((sub) => (
                <Link key={sub} to={subServiceRoutes[sub]} className="px-6 py-3 bg-gray-50 text-svn-dark text-xs font-bold uppercase tracking-widest rounded-full hover:bg-svn-orange hover:text-white transition-colors cursor-pointer">
                  {sub}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
