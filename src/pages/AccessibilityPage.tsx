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
      <div className="h-20 bg-svn-dark" />
      
      <div className="max-w-4xl mx-auto py-24 px-6">
        <h1 className="text-4xl font-black text-svn-dark uppercase tracking-tight mb-8">Accessibility Statement</h1>
        
        <div className="prose prose-lg max-w-none text-gray-500">
          <p>Last updated: February 10, 2026</p>
          
          <p>
            SVN McDonald & Company is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
          </p>

          <h3 className="text-svn-dark font-bold mt-8 mb-4">Conformance Status</h3>
          <p>
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. SVN McDonald & Company is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
          </p>

          <h3 className="text-svn-dark font-bold mt-8 mb-4">Feedback</h3>
          <p>
            We welcome your feedback on the accessibility of SVN McDonald & Company. Please let us know if you encounter accessibility barriers on SVN McDonald & Company:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Phone: 352.274.3800</li>
            <li>E-mail: info@svnmcdonald.com</li>
            <li>Visitor Address: 217 SE First AVE Unit 200, Ocala, FL 34471</li>
          </ul>

          <h3 className="text-svn-dark font-bold mt-8 mb-4">Assessment Approach</h3>
          <p>
            SVN McDonald & Company assessed the accessibility of SVN McDonald & Company by the following approaches:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Self-evaluation</li>
          </ul>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AccessibilityPage;
