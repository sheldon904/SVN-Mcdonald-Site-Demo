import React, { useEffect, useRef, useState } from 'react';

interface BuildoutListingProps {
  pluginType?: 'featured' | 'inventory';
  containerId?: string;
  propertyUses?: string;
}

const BUILDOUT_TOKEN = "780b230639b42edeea9d75652be95e361a796839";
const BUILDOUT_SCRIPT_ID = 'buildout-api-script';

const BuildoutListing: React.FC<BuildoutListingProps> = ({
  pluginType = 'featured',
  containerId = 'buildout-container',
  propertyUses,
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
      token: BUILDOUT_TOKEN,
      plugin: pluginType,
      target: containerId,
    };

    if (propertyUses) {
      config.propertyUses = propertyUses;
    }

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
  }, [isVisible, pluginType, containerId, propertyUses]);

  return (
    <div className="w-full min-h-[400px]" ref={containerRef}>
      <div id={containerId}>
        {!isVisible && (
          <div className="flex items-center justify-center h-[400px] text-gray-400">
            <div className="w-8 h-8 border-4 border-svn-orange border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildoutListing;
