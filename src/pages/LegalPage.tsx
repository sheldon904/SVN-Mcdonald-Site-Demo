import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { useLocation, Link } from 'react-router-dom';

const LegalPage = () => {
  const location = useLocation();
  const isPrivacy = location.pathname.includes('privacy');

  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Use';

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={isPrivacy ? 'Privacy Policy' : 'Terms of Use'}
        description={
          isPrivacy
            ? 'SVN McDonald & Company privacy policy. Learn how we collect, use, and protect your personal information.'
            : 'Terms of use for the SVN McDonald & Company website.'
        }
        canonical={
          isPrivacy
            ? 'https://svnmcdonald.com/privacy-policy'
            : 'https://svnmcdonald.com/terms-of-use'
        }
        noindex={true}
      />
      <Navbar />
      <main id="main-content">
      <div className="h-20 bg-svn-dark" />

      <div className="max-w-4xl mx-auto py-24 px-6">
        <h1 className="text-4xl font-black text-svn-dark uppercase tracking-tight mb-8">{title}</h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-gray-600"><strong>Last updated:</strong> May 26, 2026</p>

          {isPrivacy ? <PrivacyPolicy /> : <TermsOfUse />}
        </div>
      </div>
      </main>

      <Footer />
    </div>
  );
};

const PrivacyPolicy = () => (
  <>
    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">1. Introduction</h2>
    <p>
      SVN McDonald &amp; Company ("we", "our", or "us") operates the website at svnmcdonald.com (the "Site"). This Privacy Policy explains what information we collect, how we use it, who we share it with, and the choices you have. It applies to information collected through the Site and through inquiries you submit to us.
    </p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">2. Information We Collect</h2>
    <h3 className="text-svn-dark font-bold text-lg mt-6 mb-3">a. Information you provide</h3>
    <p>When you fill out our contact form or otherwise contact us, we collect:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Name (first and last)</li>
      <li>Email address</li>
      <li>Phone number (optional)</li>
      <li>The subject of your inquiry and the contents of your message</li>
    </ul>

    <h3 className="text-svn-dark font-bold text-lg mt-6 mb-3">b. Information collected automatically</h3>
    <p>
      When you visit the Site, we (and our service providers) may collect technical and usage data such as your IP address, browser type, device information, pages viewed, the date and time of your visit, and referring URLs. This is collected only when you have consented to analytics cookies (see Section 4).
    </p>

    <h3 className="text-svn-dark font-bold text-lg mt-6 mb-3">c. Information from third-party services</h3>
    <p>
      The Site uses third-party listing services (including Buildout) to display property data. Interaction with embedded listings may be collected by those third parties under their own privacy policies.
    </p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">3. How We Use Your Information</h2>
    <ul className="list-disc pl-6 space-y-2">
      <li>To respond to your inquiry and provide the services you request</li>
      <li>To send you property information, market reports, or follow-up communications you have requested</li>
      <li>To operate, maintain, secure, and improve the Site</li>
      <li>To comply with legal obligations and protect our legal rights</li>
    </ul>
    <p>We do not sell your personal information, and we do not use it for cross-context behavioral advertising.</p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">4. Cookies and Similar Technologies</h2>
    <p>We use two categories of cookies and similar technologies on the Site:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong>Strictly necessary:</strong> Required for the Site to function. This includes a small local-storage entry that remembers your cookie preferences.</li>
      <li><strong>Analytics &amp; marketing (optional, opt-in):</strong> Google Tag Manager (which loads Google Analytics) and a small first-party logger that records anonymous page-view and interaction events to help us improve content and performance.</li>
    </ul>
    <p>
      You can change your preferences at any time using the "Cookie Preferences" link in the site footer. Errors and security-related events are always logged for operational reliability, regardless of your analytics choice.
    </p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">5. Third Parties That May Process Your Information</h2>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong>Vercel</strong> — hosting and serverless platform for the Site (data processor for technical logs and form submissions in transit)</li>
      <li><strong>Resend</strong> — email delivery for contact form submissions sent to our team</li>
      <li><strong>Google Tag Manager / Google Analytics</strong> — usage analytics (only with your consent)</li>
      <li><strong>Google Fonts</strong> — webfont hosting (may receive your IP address)</li>
      <li><strong>Google Maps</strong> — embedded office-location map (may set cookies under Google's policies)</li>
      <li><strong>Buildout</strong> — commercial property listing integration</li>
      <li><strong>Esri / OpenFreeMap / AWS</strong> — map tile providers for our interactive property maps</li>
    </ul>
    <p>Each of these providers acts under its own privacy policy. We have selected providers we believe handle data responsibly, but we encourage you to review their policies directly.</p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">6. Data Retention</h2>
    <p>
      We retain contact form submissions for up to <strong>24 months</strong> from the date of inquiry unless you become a client, in which case we retain records as required by Florida real estate law and our broker recordkeeping obligations. Analytics data is retained per Google Analytics' default settings. You can request earlier deletion of your information at any time (see Section 8).
    </p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">7. Security</h2>
    <p>
      We use industry-standard measures to protect personal information in transit (TLS/HTTPS) and at rest. Contact form submissions are delivered by email to our brokerage team and stored in our email system. No method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
    </p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">8. Your Rights</h2>
    <h3 className="text-svn-dark font-bold text-lg mt-6 mb-3">a. California residents (CCPA / CPRA)</h3>
    <p>If you are a California resident, you have the right to:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Know what personal information we collect about you and how we use it</li>
      <li>Request that we delete personal information we have collected about you</li>
      <li>Request that we correct inaccurate personal information</li>
      <li>Opt out of the "sale" or "sharing" of your personal information (we do not sell or share for cross-context behavioral advertising; see our <Link to="/do-not-sell" className="text-svn-orange underline hover:text-orange-600">Do Not Sell or Share</Link> page)</li>
      <li>Be free from retaliation or discrimination for exercising these rights</li>
    </ul>

    <h3 className="text-svn-dark font-bold text-lg mt-6 mb-3">b. Residents of the European Economic Area, United Kingdom, or other jurisdictions with similar laws</h3>
    <p>You may have rights to access, correct, delete, restrict, or object to processing of your personal information, and to data portability. To exercise any of these rights, contact us using the information in Section 11.</p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">9. Children's Privacy</h2>
    <p>The Site is not directed to children under the age of 16. We do not knowingly collect personal information from children. If you believe a child has provided us with information, please contact us so we can remove it.</p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">10. Changes to This Policy</h2>
    <p>We may update this policy from time to time. Changes will be posted on this page with an updated "Last updated" date. Material changes may prompt us to re-request your cookie preferences.</p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">11. Contact Us</h2>
    <p>For privacy questions or to exercise any of the rights described above, contact:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong>Email:</strong> <a href="mailto:bartow.mcdonald@svn.com" className="text-svn-orange hover:underline">bartow.mcdonald@svn.com</a></li>
      <li><strong>Phone:</strong> <a href="tel:3522743800" className="text-svn-orange hover:underline">352.274.3800</a></li>
      <li><strong>Mailing address:</strong> SVN McDonald &amp; Company, 217 SE First AVE Unit 200, Ocala, FL 34471</li>
    </ul>
  </>
);

const TermsOfUse = () => (
  <>
    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">1. Acceptance of Terms</h2>
    <p>
      By accessing or using svnmcdonald.com (the "Site"), you agree to be bound by these Terms of Use. If you do not agree, do not use the Site. We may update these terms from time to time; continued use of the Site after changes means you accept the updated terms.
    </p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">2. Use License</h2>
    <p>
      You are granted a limited, revocable, non-exclusive license to access the Site and view its content for your personal, non-commercial use. You may not republish, sell, rent, sub-license, reverse-engineer, or otherwise commercially exploit the Site or its content without our prior written permission.
    </p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">3. Intellectual Property</h2>
    <p>
      All trademarks, logos, text, photography, graphics, and other content on the Site are the property of SVN McDonald &amp; Company or its licensors and are protected by U.S. and international copyright and trademark law. The SVN&reg; mark is used under license; each SVN office is independently owned and operated.
    </p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">4. Property Listings and MLS Data</h2>
    <p>
      Property listings on the Site, including data displayed via third-party providers such as Buildout and Stellar MLS, are provided for general informational purposes. Listing information is sourced from third parties and is believed to be accurate but is not warranted. Pricing, availability, dimensions, lot lines, and other listing details are subject to change without notice and should be independently verified before any purchase, lease, or investment decision.
    </p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">5. No Brokerage Relationship Implied</h2>
    <p>
      Browsing the Site or submitting an inquiry does not by itself create an agency, brokerage, or fiduciary relationship between you and SVN McDonald &amp; Company. A formal brokerage relationship is established only by a written agreement signed by an authorized broker.
    </p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">6. No Warranty</h2>
    <p>
      The Site and its content are provided "AS IS" and "AS AVAILABLE" without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, non-infringement, or that the Site will be uninterrupted or error-free.
    </p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">7. Limitation of Liability</h2>
    <p>
      To the maximum extent permitted by law, SVN McDonald &amp; Company and its affiliates, officers, employees, agents, and licensors will not be liable for any indirect, incidental, consequential, or special damages arising out of or related to your use of (or inability to use) the Site, even if we have been advised of the possibility of such damages.
    </p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">8. Indemnification</h2>
    <p>
      You agree to indemnify and hold harmless SVN McDonald &amp; Company and its affiliates from any claims, damages, liabilities, costs, or expenses (including reasonable attorneys' fees) arising out of your misuse of the Site or violation of these terms.
    </p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">9. External Links</h2>
    <p>
      The Site may link to or embed content from third-party websites that we do not control. We are not responsible for the content, privacy practices, or accuracy of those third-party services.
    </p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">10. Governing Law and Disputes</h2>
    <p>
      These terms are governed by the laws of the State of Florida, without regard to its conflict-of-laws principles. Any dispute arising from or relating to the Site will be brought exclusively in the state or federal courts located in Marion County, Florida, and you consent to personal jurisdiction in those courts.
    </p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">11. Changes to These Terms</h2>
    <p>
      We may revise these terms at any time. The "Last updated" date at the top of this page indicates when the terms were last revised. Continued use of the Site after changes constitutes acceptance.
    </p>

    <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">12. Contact</h2>
    <p>
      Questions about these terms? Contact us at <a href="mailto:bartow.mcdonald@svn.com" className="text-svn-orange hover:underline">bartow.mcdonald@svn.com</a> or 352.274.3800.
    </p>
  </>
);

export default LegalPage;
