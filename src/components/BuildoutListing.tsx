import React, { useEffect } from 'react';

interface BuildoutListingProps {
  pluginType?: 'featured' | 'inventory';
  containerId?: string;
}

const BuildoutListing: React.FC<BuildoutListingProps> = ({ 
  pluginType = 'featured',
  containerId = 'buildout-container'
}) => {
  useEffect(() => {
    // Buildout integration
    const scriptId = 'buildout-api-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = "//buildout.com/api.js?v8";
      script.async = true;
      document.body.appendChild(script);
    }

    // Set up the global config Buildout expects
    (window as any).buildoutConfig = {
      token: "780b230639b42edeea9d75652be95e361a796839",
      plugin: pluginType,
      target: containerId
    };

    // If script is already loaded, we might need to trigger a re-init
    if ((window as any).Buildout && (window as any).Buildout.init) {
      (window as any).Buildout.init();
    }

    return () => {
      // We don't necessarily want to remove the script as it might be used elsewhere,
      // but we should clear the target container content if needed
      const container = document.getElementById(containerId);
      if (container) {
        // container.innerHTML = ''; 
      }
    };
  }, [pluginType, containerId]);

  return (
    <div className="w-full min-h-[400px]">
      <div id={containerId}>
        {/* Buildout will inject the content here */}
      </div>
    </div>
  );
};

export default BuildoutListing;
