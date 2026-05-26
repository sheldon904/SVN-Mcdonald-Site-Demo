import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { useConsent } from '../lib/consent';

const DoNotSellPage = () => {
  const { rejectNonEssential, consent } = useConsent();
  const [submitted, setSubmitted] = useState(false);

  const handleOptOut = () => {
    rejectNonEssential();
    setSubmitted(true);
  };

  const alreadyOptedOut = consent.decided && !consent.analytics;

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Do Not Sell or Share My Personal Information"
        description="California residents' right to opt out of the sale or sharing of personal information under the CCPA."
        canonical="https://svnmcdonald.com/do-not-sell"
        noindex={true}
      />
      <Navbar />
      <main id="main-content">
        <div className="h-20 bg-svn-dark" />

        <div className="max-w-4xl mx-auto py-24 px-6">
          <h1 className="text-4xl font-black text-svn-dark uppercase tracking-tight mb-6">
            Do Not Sell or Share My Personal Information
          </h1>
          <div className="w-20 h-1.5 bg-svn-orange mb-8" />

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              California residents have the right, under the California Consumer Privacy Act ("CCPA") and California Privacy Rights Act ("CPRA"), to opt out of the sale or sharing of their personal information.
            </p>

            <p>
              <strong>SVN McDonald &amp; Company does not sell your personal information for money, and we do not share it for cross-context behavioral advertising.</strong> However, the analytics services we use (such as Google Tag Manager and Google Analytics) may be considered "sharing" under California law when they receive your usage data to deliver advertising or measurement services.
            </p>

            <p>
              You can opt out of all optional analytics on the SVN McDonald site by clicking the button below. This will disable Google Tag Manager / Google Analytics and our first-party usage logger for this browser. You can re-enable them at any time through the "Cookie Preferences" link in the footer.
            </p>

            <div className="not-prose my-10 p-8 bg-gray-50 rounded-xl border border-gray-200">
              {submitted || alreadyOptedOut ? (
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-svn-dark mb-2">Your opt-out has been recorded</h2>
                    <p className="text-gray-600">
                      Optional analytics are disabled for this browser. You can change this at any time using the Cookie Preferences link in the footer.
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleOptOut}
                  className="inline-flex items-center gap-3 bg-svn-orange text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-svn-orange focus:ring-offset-2"
                >
                  Opt out of sharing
                </button>
              )}
            </div>

            <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">Submit a verifiable request</h2>
            <p>
              California residents may also submit a verifiable request to know, delete, or correct their personal information. To submit a request, contact us with the following information so we can verify your identity:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your full name</li>
              <li>The email address you used when contacting us (if applicable)</li>
              <li>A description of the request (know, delete, correct, opt out)</li>
            </ul>
            <p>
              <strong>Email:</strong> <a href="mailto:bartow.mcdonald@svn.com" className="text-svn-orange hover:underline">bartow.mcdonald@svn.com</a><br />
              <strong>Phone:</strong> <a href="tel:3522743800" className="text-svn-orange hover:underline">352.274.3800</a><br />
              <strong>Mail:</strong> SVN McDonald &amp; Company, 217 SE First AVE Unit 200, Ocala, FL 34471
            </p>
            <p>
              We will respond within 45 days, as required by California law, and we will not discriminate against you for exercising your rights.
            </p>

            <p className="mt-8">
              See our full <Link to="/privacy-policy" className="text-svn-orange hover:underline">Privacy Policy</Link> for more details.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoNotSellPage;
