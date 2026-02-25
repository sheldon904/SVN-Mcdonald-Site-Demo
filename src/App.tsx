import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  HomePage,
  ListingsPage,
  ContactPage,
  TeamPage,
  BlogPage,
  BlogPostPage,
  ServicesPage,
  ClosedDealsPage,
  MarketReportsPage,
  WecEffectPage,
  LegalPage,
  AccessibilityPage,
} from './pages';
import ScrollToTop from './components/ScrollToTop';
import SEOHead from './components/SEOHead';

function NotFoundPage() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
      <SEOHead
        title="Page Not Found"
        description="The page you are looking for does not exist."
        noindex={true}
      />
      <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: '#666' }}>
        Sorry, the page you are looking for could not be found.
      </p>
      <Link
        to="/"
        style={{ color: '#f97316', fontWeight: 600, textDecoration: 'underline' }}
      >
        Return to Home
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-svn-orange border-t-transparent rounded-full animate-spin" /></div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/land-properties" element={<ListingsPage />} />
        <Route path="/commercial-properties" element={<ListingsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/*" element={<ServicesPage />} />
        <Route path="/closed-deals" element={<ClosedDealsPage />} />
        <Route path="/market-reports" element={<MarketReportsPage />} />
        <Route path="/wec-effect" element={<WecEffectPage />} />
        <Route path="/privacy-policy" element={<LegalPage />} />
        <Route path="/terms-of-use" element={<LegalPage />} />
        <Route path="/accessibility-statement" element={<AccessibilityPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Suspense>
    </Router>
  )
}

export default App
