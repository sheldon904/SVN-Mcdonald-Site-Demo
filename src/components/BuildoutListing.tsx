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

// Buildout drives its property-detail view by writing ?propertyId=… to the URL and
// triggering a full page reload. We must NOT strip that param on a same-context reload
// (otherwise clicks into properties fail to open the detail). We DO want to strip it
// when the user crosses widget contexts — e.g. commercial → land — so a stale property
// detail from the prior context can't bleed through.
//
// Returns true if the context changed since the last mount (i.e. caller should also
// tear down any cached Buildout script + globals before re-embedding).
const resetBuildoutStateForContext = (token: string, pluginType: string): boolean => {
  const currentContext = `${token}:${pluginType}`;
  let lastContext: string | null = null;
  try {
    lastContext = sessionStorage.getItem(BUILDOUT_CONTEXT_KEY);
  } catch {
    // sessionStorage may be unavailable (privacy mode, SSR); skip the reset entirely.
    return false;
  }

  const contextChanged = lastContext !== null && lastContext !== currentContext;

  if (lastContext !== currentContext) {
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
    if (dirty) {
      const qs = url.searchParams.toString();
      window.history.replaceState(null, '', url.pathname + (qs ? `?${qs}` : ''));
    }

    try {
      Object.keys(sessionStorage)
        .filter((k) => k.toLowerCase().includes('buildout') && k !== BUILDOUT_CONTEXT_KEY)
        .forEach((k) => sessionStorage.removeItem(k));
    } catch {
      // ignore
    }
  }

  try {
    sessionStorage.setItem(BUILDOUT_CONTEXT_KEY, currentContext);
  } catch {
    // ignore
  }

  return contextChanged;
};

const tearDownBuildoutScript = () => {
  try {
    const script = document.getElementById(BUILDOUT_SCRIPT_ID);
    if (script) script.remove();
    delete (window as any).BuildOut;
    delete (window as any).buildoutConfig;
  } catch {
    // ignore — best-effort teardown
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

    // If the Buildout context (token + plugin) has changed since the last mount, tear
    // down the cached script + globals BEFORE setting up the new widget. Doing this at
    // mount-time rather than in the previous unmount cleanup avoids racing with the
    // outgoing widget's pending iframe / postMessage / observer callbacks — which can
    // throw "BuildOut is undefined" synchronously during React's render cycle and
    // surface as an ErrorBoundary "something went wrong" screen.
    const contextChanged = resetBuildoutStateForContext(token, pluginType);
    if (contextChanged) {
      tearDownBuildoutScript();
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
      // Minimal unmount cleanup: only clear the container we own. Leave window.BuildOut
      // and the script tag intact so Buildout's still-pending async callbacks (iframe
      // load handlers, postMessage listeners) don't blow up mid-flight. The next mount
      // will tear them down at a safer time if the context has actually changed.
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
