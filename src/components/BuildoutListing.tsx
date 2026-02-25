import React, { useEffect, useRef } from 'react';

interface BuildoutListingProps {
  pluginType?: 'featured' | 'inventory';
  containerId?: string;
}

const BUILDOUT_TOKEN = "780b230639b42edeea9d75652be95e361a796839";
const BUILDOUT_SCRIPT_ID = 'buildout-api-script';

const BuildoutListing: React.FC<BuildoutListingProps> = ({
  pluginType = 'featured',
  containerId = 'buildout-container'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const config = {
      token: BUILDOUT_TOKEN,
      plugin: pluginType,
      target: containerId
    };

    const initBuildout = () => {
      // If Buildout is already loaded, call embed directly
      if ((window as any).BuildOut?.embed) {
        (window as any).BuildOut.embed(config);
        return;
      }

      // Set config for auto-init on first script load
      (window as any).buildoutConfig = config;
    };

    const existingScript = document.getElementById(BUILDOUT_SCRIPT_ID) as HTMLScriptElement;

    if (existingScript) {
      // Script tag exists — Buildout may or may not be ready
      initBuildout();
    } else {
      // First load: set config BEFORE script loads (Buildout auto-inits)
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
  }, [pluginType, containerId]);

  return (
    <div className="w-full min-h-[400px]">
      <div id={containerId} ref={containerRef}>
        {/* Buildout injects iframe here */}
      </div>
    </div>
  );
};

export default BuildoutListing;
