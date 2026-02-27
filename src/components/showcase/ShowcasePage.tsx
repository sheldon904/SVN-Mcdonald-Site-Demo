import { useMemo } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SEOHead from '../SEOHead';
import ShowcaseHero from './ShowcaseHero';
import PointCloudSection from './PointCloudSection';
import PointCloudFallback from './PointCloudFallback';
import ShowcaseStats from './ShowcaseStats';
import ShowcaseStory from './ShowcaseStory';
import ShowcaseLocation from './ShowcaseLocation';
import ShowcaseCTA from './ShowcaseCTA';
import { isMobileDevice, supportsWebGL2 } from './webglSupport';
import type { ShowcaseProperty } from '../../data/showcaseProperties';

interface ShowcasePageProps {
  property: ShowcaseProperty;
}

const ShowcasePage = ({ property }: ShowcasePageProps) => {
  const canRender3D = useMemo(() => {
    return !isMobileDevice() && supportsWebGL2();
  }, []);

  const fallbackReason = useMemo(() => {
    if (isMobileDevice()) return 'mobile' as const;
    if (!supportsWebGL2()) return 'no-webgl' as const;
    return null;
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      <SEOHead
        title={property.seoTitle}
        description={property.seoDescription}
        ogImage={property.heroImage}
        canonical={`https://svnmcdonald.com/closed-deals/${property.slug}`}
      />
      <Navbar />

      <ShowcaseHero property={property} />

      {canRender3D ? (
        <PointCloudSection property={property} />
      ) : (
        <PointCloudFallback
          aerialImage={property.aerialFallbackImage}
          title={property.title}
          reason={fallbackReason ?? 'error'}
        />
      )}

      <ShowcaseStats stats={property.stats} />
      <ShowcaseStory property={property} />
      <ShowcaseLocation property={property} />
      <ShowcaseCTA />
      <Footer />
    </div>
  );
};

export default ShowcasePage;
