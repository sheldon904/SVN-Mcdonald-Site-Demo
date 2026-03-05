import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShowcaseCTA = () => {
  return (
    <section className="px-6 py-16">
      <div className="max-w-[1280px] mx-auto">
        <div className="bg-svn-orange rounded-3xl p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">
              Contact Our Experts
            </h2>
            <p className="text-lg font-medium text-white/90 leading-relaxed">
              Looking to buy, sell, or lease commercial property in Central Florida? Our team brings national reach with deep local expertise.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4">
            <a
              href="tel:3522884491"
              className="bg-svn-dark text-white px-8 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white hover:text-svn-dark transition-all duration-300 shadow-xl flex items-center justify-center gap-3"
            >
              <Phone size={18} />
              Call Us
            </a>
            <Link
              to="/contact"
              className="bg-white/20 backdrop-blur text-white px-8 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white hover:text-svn-orange transition-all duration-300 border border-white/30 flex items-center justify-center gap-3"
            >
              Contact Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseCTA;
