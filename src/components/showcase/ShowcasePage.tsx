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
import { isMobileDevice } from './webglSupport';
import type { ShowcaseProperty } from '../../data/showcaseProperties';

interface ShowcasePageProps {
  property: ShowcaseProperty;
}

const ShowcasePage = ({ property }: ShowcasePageProps) => {
  const isMobile = useMemo(() => isMobileDevice(), []);

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

      {!isMobile ? (
        <PointCloudSection property={property} />
      ) : (
        <PointCloudFallback
          aerialImage={property.aerialFallbackImage}
          title={property.title}
          reason="mobile"
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
