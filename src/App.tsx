import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import BlogPage from './pages/BlogPage';
import ServicesPage from './pages/ServicesPage';
import ClosedDealsPage from './pages/ClosedDealsPage';
import MarketReportsPage from './pages/MarketReportsPage';
import LegalPage from './pages/LegalPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/land-properties" element={<ListingsPage />} />
        <Route path="/commercial-properties" element={<ListingsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/*" element={<ServicesPage />} />
        <Route path="/closed-deals" element={<ClosedDealsPage />} />
        <Route path="/market-reports" element={<MarketReportsPage />} />
        <Route path="/privacy-policy" element={<LegalPage />} />
        <Route path="/terms-of-use" element={<LegalPage />} />
      </Routes>
    </Router>
  )
}

export default App
