import React, { useEffect, useRef, useState } from 'react';

interface BuildoutListingProps {
  pluginType?: 'featured' | 'inventory';
  containerId?: string;
  token?: string;
}

const BUILDOUT_LAND_TOKEN = "780b230639b42edeea9d75652be95e361a796839";
const BUILDOUT_COMMERCIAL_TOKEN = "80cac2f8491bd40156869256e3d371488bcfc4fe";
const BUILDOUT_SCRIPT_ID = 'buildout-api-script';

export { BUILDOUT_LAND_TOKEN, BUILDOUT_COMMERCIAL_TOKEN };

const BuildoutListing: React.FC<BuildoutListingProps> = ({
  pluginType = 'featured',
  containerId = 'buildout-container',
  token = BUILDOUT_LAND_TOKEN,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Defer loading until component is near viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading 200px before scroll into view
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Load Buildout only after visible
  useEffect(() => {
    if (!isVisible) return;

    const config: Record<string, string> = {
      token,
      plugin: pluginType,
      target: containerId,
    };

    const initBuildout = () => {
      if ((window as any).BuildOut?.embed) {
        (window as any).BuildOut.embed(config);
        return;
      }
      (window as any).buildoutConfig = config;
    };

    const existingScript = document.getElementById(BUILDOUT_SCRIPT_ID) as HTMLScriptElement;

    if (existingScript) {
      initBuildout();
    } else {
      (window as any).buildoutConfig = config;

      const script = document.createElement('script');
      script.id = BUILDOUT_SCRIPT_ID;
      script.src = "https://buildout.com/api.js?v8";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [isVisible, pluginType, containerId, token]);

  const minHeight = pluginType === 'inventory' ? 'min-h-[800px]' : 'min-h-[400px]';
  const placeholderHeight = pluginType === 'inventory' ? 'h-[800px]' : 'h-[400px]';

  return (
    <div className={`w-full ${minHeight}`} ref={containerRef}>
      <div id={containerId}>
        {!isVisible && (
          <div className={`flex items-center justify-center ${placeholderHeight} text-gray-400`}>
            <div className="w-8 h-8 border-4 border-svn-orange border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildoutListing;
