import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import WecEffectHero from '../components/wec-effect/WecEffectHero';
import WecEffectMapSection from '../components/wec-effect/WecEffectMapSection';
import WecEffectStats from '../components/wec-effect/WecEffectStats';
import WecEffectEditorial from '../components/wec-effect/WecEffectEditorial';
import WecEffectCharts from '../components/wec-effect/WecEffectCharts';
import WecEffectFindings from '../components/wec-effect/WecEffectFindings';
import WecEffectCTA from '../components/wec-effect/WecEffectCTA';

const WecEffectPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F6F6] overflow-x-hidden">
      <SEOHead
        title="The 2025 WEC Effect - The Equestrian Land Report"
        description="Prices declined in 2025 for vacant, agriculturally zoned land near the World Equestrian Center. 400+ transactions analyzed across 2022-2025 by SVN McDonald & Co."
        canonical="https://svnmcdonald.com/wec-effect"
      />
      <Navbar />
      <WecEffectHero />
      <WecEffectMapSection />
      <WecEffectStats />
      <WecEffectEditorial />
      <WecEffectCharts />
      <WecEffectFindings />
      <WecEffectCTA />
      <Footer />
    </div>
  );
};

export default WecEffectPage;
