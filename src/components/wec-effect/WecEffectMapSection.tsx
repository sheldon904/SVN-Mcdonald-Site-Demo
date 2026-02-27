import { useRef, useState, useCallback, useMemo } from 'react';
import WecEffectMapViewer from './WecEffectMapViewer';
import WecEffectMapCaptions from './WecEffectMapCaptions';
import WecEffectMapFallback from './WecEffectMapFallback';
import { useScrollProgress } from '../showcase/useScrollProgress';
import { isMobileDevice, supportsWebGL2 } from '../showcase/webglSupport';

const WecEffectMapSection = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [viewerStatus, setViewerStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const isMobile = useMemo(() => isMobileDevice(), []);
  const hasWebGL = useMemo(() => supportsWebGL2(), []);

  const { progressRef, displayProgress } = useScrollProgress({
    triggerRef: outerRef,
    enabled: !isMobile && hasWebGL,
  });

  const handleStatusChange = useCallback((status: 'loading' | 'loaded' | 'error') => {
    setViewerStatus(prev => {
      // Once loaded, never downgrade back to error (tile errors are non-fatal)
      if (prev === 'loaded' && status === 'error') return prev;
      return status;
    });
  }, []);

  // Mobile fallback
  if (isMobile) {
    return <WecEffectMapFallback reason="mobile" />;
  }

  // No WebGL fallback
  if (!hasWebGL) {
    return <WecEffectMapFallback reason="no-webgl" />;
  }

  // Error fallback
  if (viewerStatus === 'error') {
    return <WecEffectMapFallback reason="error" />;
  }

  return (
    <div ref={outerRef} className="relative" style={{ height: '500vh' }}>
      {/* Sticky container: pinned while scrolling through 500vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-svn-dark">
        {/* Loading indicator */}
        {viewerStatus === 'loading' && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-svn-dark">
            <div className="text-center">
              <div className="w-10 h-10 border-3 border-svn-orange/30 border-t-svn-orange rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest">
                Loading satellite flyover
              </p>
            </div>
          </div>
        )}

        {/* MapLibre 3D Viewer */}
        <WecEffectMapViewer
          progressRef={progressRef}
          onStatusChange={handleStatusChange}
        />

        {/* Scroll-linked captions overlay */}
        <WecEffectMapCaptions progress={displayProgress} />

        {/* Progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
          <div
            className="h-full bg-svn-orange"
            style={{ width: `${displayProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default WecEffectMapSection;
