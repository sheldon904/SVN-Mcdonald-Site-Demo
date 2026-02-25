import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { useLocation } from 'react-router-dom';

const LegalPage = () => {
  const location = useLocation();
  const isPrivacy = location.pathname.includes('privacy');
  
  const title = isPrivacy ? "Privacy Policy" : "Terms of Use";

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={isPrivacy ? "Privacy Policy" : "Terms of Use"}
        description={isPrivacy ? "SVN McDonald & Company privacy policy. Learn how we collect, use, and protect your personal information." : "Terms of use for the SVN McDonald & Company website."}
        canonical={isPrivacy ? "https://svnmcdonald.com/privacy-policy" : "https://svnmcdonald.com/terms-of-use"}
        noindex={true}
      />
      <Navbar />
      <div className="h-20 bg-svn-dark" />

      <div className="max-w-4xl mx-auto py-24 px-6">
        <h1 className="text-4xl font-black text-svn-dark uppercase tracking-tight mb-8">{title}</h1>
        
        <div className="prose prose-lg max-w-none text-gray-500">
          <p>Last updated: February 10, 2026</p>
          
          {isPrivacy ? (
            <>
              <h3>1. Introduction</h3>
              <p>SVN McDonald & Company ("we", "our", or "us") respects your privacy and is committed to protecting it through our compliance with this policy.</p>
              <h3>2. Information We Collect</h3>
              <p>We may collect several types of information from and about users of our Website, including information by which you may be personally identified, such as name, postal address, e-mail address, telephone number, or any other identifier by which you may be contacted online or offline.</p>
              <h3>3. How We Use Your Information</h3>
              <p>We use information that we collect about you or that you provide to us, including any personal information: to present our Website and its contents to you; to provide you with information, products, or services that you request from us; to fulfill any other purpose for which you provide it.</p>
            </>
          ) : (
             <>
              <h3>1. Acceptance of Terms</h3>
              <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
              <h3>2. Use License</h3>
              <p>Permission is granted to temporarily download one copy of the materials (information or software) on SVN McDonald & Company's website for personal, non-commercial transitory viewing only.</p>
              <h3>3. Disclaimer</h3>
              <p>The materials on SVN McDonald & Company's website are provided on an 'as is' basis. SVN McDonald & Company makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LegalPage;
