import { ArrowRight } from 'lucide-react';

const WecEffectCTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="bg-svn-orange rounded-3xl p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
              Get the Full WEC Effect Report
            </h2>
            <p className="text-lg font-medium text-white/90 leading-relaxed">
              Are you looking to capitalize on the growth in Ocala? Our team can provide deep insights into land values and opportunities.
            </p>
          </div>
          <div className="relative z-10">
            <a
              href="tel:3522884491"
              className="bg-svn-dark text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-svn-dark transition-all duration-300 shadow-xl flex items-center justify-center gap-3"
            >
              Contact Our Experts <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WecEffectCTA;
