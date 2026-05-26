import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useConsent } from '../lib/consent';

const ConsentPreferencesModal = () => {
  const { consent, preferencesOpen, closePreferences, acceptAll, rejectNonEssential, setAnalytics } = useConsent();
  const [analyticsDraft, setAnalyticsDraft] = useState(consent.analytics);

  useEffect(() => {
    if (preferencesOpen) {
      setAnalyticsDraft(consent.analytics);
    }
  }, [preferencesOpen, consent.analytics]);

  useEffect(() => {
    if (!preferencesOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePreferences();
    };
    document.addEventListener('keydown', handler);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [preferencesOpen, closePreferences]);

  if (!preferencesOpen) return null;

  const savePreferences = () => {
    setAnalytics(analyticsDraft);
    closePreferences();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-prefs-title"
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 p-0 md:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) closePreferences();
      }}
    >
      <div className="relative w-full md:max-w-2xl bg-white rounded-t-2xl md:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 md:px-8 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 id="consent-prefs-title" className="text-xl md:text-2xl font-black text-svn-dark uppercase tracking-tight">
            Cookie Preferences
          </h2>
          <button
            type="button"
            onClick={closePreferences}
            aria-label="Close cookie preferences"
            className="p-2 text-svn-dark hover:text-svn-orange transition-colors focus:outline-none focus:ring-2 focus:ring-svn-orange rounded"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-6 md:px-8 py-6 space-y-6">
          <p className="text-gray-600 leading-relaxed">
            We use cookies and similar technologies on this site. You can choose which categories you allow. Necessary cookies are required for the site to function and cannot be turned off. See our{' '}
            <Link to="/privacy-policy" className="text-svn-orange underline hover:text-orange-600" onClick={closePreferences}>
              Privacy Policy
            </Link>
            {' '}for more details.
          </p>

          <div className="border border-gray-200 rounded-lg p-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="text-base font-bold text-svn-dark uppercase tracking-wider">Strictly Necessary</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">Always active</p>
              </div>
              <div className="flex-shrink-0 inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-400 text-xs font-bold uppercase tracking-widest">
                Required
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              These cookies are essential for the website to function properly. They enable basic features like page navigation, form submission, and remembering your cookie preferences. The site cannot work properly without them.
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="text-base font-bold text-svn-dark uppercase tracking-wider">Analytics &amp; Marketing</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">Optional</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  checked={analyticsDraft}
                  onChange={(e) => setAnalyticsDraft(e.target.checked)}
                  className="sr-only peer"
                  aria-label="Enable analytics and marketing cookies"
                />
                <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-checked:bg-svn-orange peer-focus:ring-2 peer-focus:ring-svn-orange peer-focus:ring-offset-2 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-transform peer-checked:after:translate-x-5" />
              </label>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              These cookies help us understand how visitors use the site so we can improve content and performance. This includes Google Tag Manager (which loads Google Analytics) and a small first-party logger that records anonymous page-view and interaction events. We never sell this data.
            </p>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            Note: Errors and security-related events are always logged for site reliability and are not used for analytics or advertising.
          </p>
        </div>

        <div className="sticky bottom-0 bg-white px-6 md:px-8 py-5 border-t border-gray-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={rejectNonEssential}
            className="px-5 py-3 border border-gray-300 text-svn-dark text-xs font-black uppercase tracking-widest rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-svn-orange focus:ring-offset-2"
          >
            Reject all
          </button>
          <button
            type="button"
            onClick={savePreferences}
            className="px-5 py-3 border border-svn-dark text-svn-dark text-xs font-black uppercase tracking-widest rounded-full hover:bg-svn-dark hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-svn-orange focus:ring-offset-2"
          >
            Save preferences
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="px-5 py-3 bg-svn-orange text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-svn-orange focus:ring-offset-2"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentPreferencesModal;
