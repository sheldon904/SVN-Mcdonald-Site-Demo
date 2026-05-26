import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

const AccessibilityPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Accessibility Statement"
        description="SVN McDonald & Company accessibility statement. Our commitment to digital accessibility and WCAG 2.1 AA compliance."
        canonical="https://svnmcdonald.com/accessibility-statement"
        noindex={true}
      />
      <Navbar />
      <main id="main-content">
      <div className="h-20 bg-svn-dark" />

      <div className="max-w-4xl mx-auto py-24 px-6">
        <h1 className="text-4xl font-black text-svn-dark uppercase tracking-tight mb-8">Accessibility Statement</h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-gray-600"><strong>Last updated:</strong> May 26, 2026</p>

          <p>
            SVN McDonald &amp; Company is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to ensure we provide equal access to all users.
          </p>

          <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">Conformance Status</h2>
          <p>
            The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. They define three levels of conformance: Level A, Level AA, and Level AAA. SVN McDonald &amp; Company's website is designed to be substantially conformant with <strong>WCAG 2.1 Level AA</strong>. "Substantially conformant" means that the website meets the accessibility standard with limited exceptions noted below.
          </p>

          <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">Measures We Take</h2>
          <p>To support accessibility, SVN McDonald &amp; Company:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Includes accessibility as part of our website design and development process</li>
            <li>Provides semantic HTML structure including landmark regions and proper heading hierarchy</li>
            <li>Provides text alternatives for non-text content (images, icons)</li>
            <li>Labels all form fields and provides clear error messaging</li>
            <li>Supports keyboard navigation throughout the site, including a "skip to main content" link</li>
            <li>Maintains color contrast that meets or exceeds WCAG 2.1 AA standards</li>
            <li>Provides accessible labels for embedded content such as maps and external links</li>
          </ul>

          <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">Known Limitations</h2>
          <p>
            Despite our efforts to ensure accessibility, some content on the website may have limitations. Known issues we are actively working to address include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Third-party property listing embeds:</strong> Some MLS and property listing widgets (e.g., Buildout integration) are provided by third parties and may not meet the same accessibility standards as the rest of the site. We are working with our partners to address these gaps.</li>
            <li><strong>Embedded maps:</strong> Google Maps embeds have limited accessibility for screen reader users; address and directions are provided in plain text alongside the map.</li>
            <li><strong>PDF documents:</strong> Older marketing PDFs may not be fully tagged for screen readers. Please contact us to request an accessible alternative.</li>
          </ul>

          <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">Assessment Approach</h2>
          <p>SVN McDonald &amp; Company has assessed the accessibility of this website using the following methods:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Internal self-evaluation against WCAG 2.1 Level AA success criteria</li>
            <li>Automated accessibility scanning during development</li>
            <li>Keyboard-only navigation testing</li>
            <li>Ongoing monitoring as new content and features are added</li>
          </ul>

          <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">Feedback and Contact Information</h2>
          <p>
            We welcome your feedback on the accessibility of the SVN McDonald &amp; Company website. If you encounter accessibility barriers, need assistance accessing any content, or would like to request an accommodation, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Phone:</strong> <a href="tel:3522743800" className="text-svn-orange hover:underline">352.274.3800</a></li>
            <li><strong>Email:</strong> <a href="mailto:bartow.mcdonald@svn.com" className="text-svn-orange hover:underline">bartow.mcdonald@svn.com</a></li>
            <li><strong>Mailing Address:</strong> 217 SE First AVE Unit 200, Ocala, FL 34471</li>
          </ul>
          <p>We aim to respond to accessibility feedback within 5 business days.</p>

          <h2 className="text-svn-dark font-bold text-2xl mt-10 mb-4">Formal Complaints</h2>
          <p>
            If you are not satisfied with our response to your accessibility concern, you have the right to file a formal complaint. We encourage you to first contact us directly so we can attempt to resolve the issue.
          </p>
        </div>
      </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccessibilityPage;
