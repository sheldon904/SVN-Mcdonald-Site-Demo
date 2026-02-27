import { useRef, useState, useCallback } from 'react';
import PointCloudViewer from './PointCloudViewer';
import ScrollCaptions from './ScrollCaptions';
import PointCloudFallback from './PointCloudFallback';
import { useScrollProgress } from './useScrollProgress';
import type { ShowcaseProperty } from '../../data/showcaseProperties';

interface PointCloudSectionProps {
  property: ShowcaseProperty;
}

const PointCloudSection = ({ property }: PointCloudSectionProps) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [viewerStatus, setViewerStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const progressRef = useScrollProgress({
    triggerRef: outerRef,
    enabled: true,
  });

  const handleStatusChange = useCallback((status: 'loading' | 'loaded' | 'error') => {
    setViewerStatus(status);
  }, []);

  if (viewerStatus === 'error') {
    return (
      <PointCloudFallback
        aerialImage={property.aerialFallbackImage}
        title={property.title}
        reason="error"
      />
    );
  }

  return (
    <div ref={outerRef} className="relative" style={{ height: '400vh' }}>
      {/* Sticky container: pinned while scrolling through 400vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-svn-dark">
        {/* Loading indicator */}
        {viewerStatus === 'loading' && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-svn-dark">
            <div className="text-center">
              <div className="w-10 h-10 border-3 border-svn-orange/30 border-t-svn-orange rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest">
                Loading 3D terrain
              </p>
            </div>
          </div>
        )}

        {/* Three.js Canvas */}
        <PointCloudViewer
          property={property}
          progressRef={progressRef}
          onStatusChange={handleStatusChange}
        />

        {/* Scroll-linked captions overlay */}
        <ScrollCaptions
          captions={property.scrollCaptions}
          progress={progressRef.current ?? 0}
        />

        {/* Progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
          <div
            className="h-full bg-svn-orange transition-none"
            style={{ width: `${(progressRef.current ?? 0) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PointCloudSection;
