import React, { useEffect, useRef, useState } from 'react';

interface BuildoutListingProps {
  pluginType?: 'featured' | 'inventory';
  containerId?: string;
  token?: string;
}

const BUILDOUT_LAND_TOKEN = "780b230639b42edeea9d75652be95e361a796839";
const BUILDOUT_COMMERCIAL_TOKEN = "80cac2f8491bd40156869256e3d371488bcfc4fe";
const BUILDOUT_SCRIPT_ID = 'buildout-api-script';
const BUILDOUT_STATE_QUERY_PARAMS = ['propertyId', 'plugin', 'unit', 'tab'];
const BUILDOUT_CONTEXT_KEY = 'buildout-context';

export { BUILDOUT_LAND_TOKEN, BUILDOUT_COMMERCIAL_TOKEN };

const stripBuildoutUrlState = () => {
  const url = new URL(window.location.href);
  let dirty = false;
  BUILDOUT_STATE_QUERY_PARAMS.forEach((key) => {
    if (url.searchParams.has(key)) {
      url.searchParams.delete(key);
      dirty = true;
    }
  });
  if (url.hash) {
    url.hash = '';
    dirty = true;
  }
  return { url, dirty };
};

const clearBuildoutSessionStorage = () => {
  try {
    Object.keys(sessionStorage)
      .filter((k) => k.toLowerCase().includes('buildout') && k !== BUILDOUT_CONTEXT_KEY)
      .forEach((k) => sessionStorage.removeItem(k));
  } catch {
    // ignore
  }
};

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

    const currentContext = `${token}:${pluginType}`;
    let lastContext: string | null = null;
    try {
      lastContext = sessionStorage.getItem(BUILDOUT_CONTEXT_KEY);
    } catch {
      // sessionStorage unavailable; fall through to a normal embed.
    }

    // If we're switching widget contexts (e.g. commercial → land) and the previous
    // Buildout script is still alive in this tab, force a full page reload. Re-injecting
    // the script in place leaves ghost handlers and cached state that cause the widget
    // to render the wrong property — or nothing at all (gray screen). A real reload
    // discards every artifact of the previous context, after which the fresh page mount
    // can embed cleanly. The flash is restricted to the specific cross-context SPA nav.
    if (
      lastContext &&
      lastContext !== currentContext &&
      typeof window !== 'undefined' &&
      (window as any).BuildOut
    ) {
      try {
        sessionStorage.setItem(BUILDOUT_CONTEXT_KEY, currentContext);
      } catch {
        // ignore
      }
      clearBuildoutSessionStorage();
      const { url, dirty } = stripBuildoutUrlState();
      const qs = url.searchParams.toString();
      const target = url.pathname + (qs ? `?${qs}` : '');
      if (dirty) {
        window.location.replace(target);
      } else {
        window.location.reload();
      }
      return;
    }

    // Same context (or first mount in this tab) — strip stale URL state if it doesn't
    // match the current context, write the new context marker, and embed normally.
    if (lastContext !== currentContext) {
      const { url, dirty } = stripBuildoutUrlState();
      if (dirty) {
        const qs = url.searchParams.toString();
        window.history.replaceState(null, '', url.pathname + (qs ? `?${qs}` : ''));
      }
      clearBuildoutSessionStorage();
      try {
        sessionStorage.setItem(BUILDOUT_CONTEXT_KEY, currentContext);
      } catch {
        // ignore
      }
    }

    const existingScript = document.getElementById(BUILDOUT_SCRIPT_ID) as HTMLScriptElement;

    if (existingScript) {
      if ((window as any).BuildOut?.embed) {
        (window as any).BuildOut.embed(config);
      } else {
        (window as any).buildoutConfig = config;
      }
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
