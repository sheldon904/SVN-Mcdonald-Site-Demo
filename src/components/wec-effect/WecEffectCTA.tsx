import { ArrowRight } from 'lucide-react';

const WecEffectCTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="bg-svn-orange rounded-3xl p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/60 mb-3">
              SVN McDonald &amp; Co.
            </h3>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
              What's My Property <span className="text-svn-dark">Worth?</span>
            </h2>
            <p className="text-base font-medium text-white/90 leading-relaxed mb-4">
              For over 20 years we've helped families navigate complex land and commercial real estate transactions in Ocala and the surrounding communities. Our expertise and commitment to our clients' success, combined with our powerful national marketing platform, enables us to create awesome value for our friends and clients.
            </p>
            <p className="text-lg font-bold text-white">
              We're here to help you.
            </p>
          </div>
          <div className="relative z-10 flex flex-col gap-4">
            <a
              href="tel:3522743800"
              className="bg-svn-dark text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-svn-dark transition-all duration-300 shadow-xl flex items-center justify-center gap-3"
            >
              Call 352-274-3800 <ArrowRight size={20} />
            </a>
            <a
              href="https://www.svnmcdonald.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-svn-dark transition-all duration-300 border border-white/20 flex items-center justify-center gap-3 text-sm"
            >
              svnmcdonald.com <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WecEffectCTA;
