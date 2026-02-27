import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import WecEffectHero from '../components/wec-effect/WecEffectHero';
import WecEffectMapSection from '../components/wec-effect/WecEffectMapSection';
import WecEffectStats from '../components/wec-effect/WecEffectStats';
import WecEffectCharts from '../components/wec-effect/WecEffectCharts';
import WecEffectFindings from '../components/wec-effect/WecEffectFindings';
import WecEffectCTA from '../components/wec-effect/WecEffectCTA';

const WecEffectPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title="The WEC Effect - World Equestrian Center Impact Report"
        description="Discover how the World Equestrian Center has transformed Ocala's real estate market. 400+ transactions analyzed across 2022-2025."
        canonical="https://svnmcdonald.com/wec-effect"
      />
      <Navbar />
      <WecEffectHero />
      <WecEffectMapSection />
      <WecEffectStats />
      <WecEffectCharts />
      <WecEffectFindings />
      <WecEffectCTA />
      <Footer />
    </div>
  );
};

export default WecEffectPage;
