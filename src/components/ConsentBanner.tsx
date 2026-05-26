import { Link } from 'react-router-dom';
import { useConsent } from '../lib/consent';

const ConsentBanner = () => {
  const { consent, acceptAll, rejectNonEssential, openPreferences } = useConsent();

  if (consent.decided) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-banner-title"
      aria-describedby="consent-banner-body"
      className="fixed bottom-0 left-0 right-0 z-[90] bg-svn-dark text-white border-t-4 border-svn-orange shadow-2xl"
    >
      <div className="max-w-[1280px] mx-auto px-6 py-6 md:py-7 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <h2 id="consent-banner-title" className="text-sm font-black uppercase tracking-widest text-svn-orange mb-2">
            Your Privacy
          </h2>
          <p id="consent-banner-body" className="text-sm md:text-base text-gray-300 leading-relaxed">
            We use cookies and similar technologies to make this site work and, with your permission, to measure how visitors use it so we can improve our content and services. Read our{' '}
            <Link to="/privacy-policy" className="text-svn-orange underline hover:text-white transition-colors">
              Privacy Policy
            </Link>{' '}
            for details.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:flex-nowrap md:justify-end">
          <button
            type="button"
            onClick={openPreferences}
            className="px-5 py-3 border border-white/30 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-svn-orange focus:ring-offset-2 focus:ring-offset-svn-dark"
          >
            Customize
          </button>
          <button
            type="button"
            onClick={rejectNonEssential}
            className="px-5 py-3 border border-white/30 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-svn-orange focus:ring-offset-2 focus:ring-offset-svn-dark"
          >
            Necessary only
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="px-5 py-3 bg-svn-orange text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-svn-dark"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
