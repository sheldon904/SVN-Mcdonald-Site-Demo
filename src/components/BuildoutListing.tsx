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
// Tracks whether Buildout was last showing a property detail ('detail') or the listings
// index ('index') in this tab. Lets us tell a click→detail reload (keep state) apart from a
// return to the index that must reset — otherwise the live widget resurrects the old
// property even when the URL has no ?propertyId=.
const BUILDOUT_VIEW_KEY = 'buildout-view';

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
      .filter((k) => k.toLowerCase().includes('buildout') && k !== BUILDOUT_CONTEXT_KEY && k !== BUILDOUT_VIEW_KEY)
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
  // Eager-load when the URL carries a Buildout deep link (?propertyId=…). Otherwise a
  // shared property link would only resolve once the visitor happened to scroll the
  // widget into view — and until then the lazy IntersectionObserver gate makes the
  // detail look broken.
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).has('propertyId');
  });

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
    // The URL's ?propertyId= is the single source of truth for what to show: present means
    // a specific property detail (a shared deep link, or Buildout's own click→detail
    // reload); absent means the listings index.
    const hasPropertyId = new URLSearchParams(window.location.search).has('propertyId');
    const currentView = hasPropertyId ? 'detail' : 'index';

    let lastContext: string | null = null;
    let lastView: string | null = null;
    try {
      lastContext = sessionStorage.getItem(BUILDOUT_CONTEXT_KEY);
      lastView = sessionStorage.getItem(BUILDOUT_VIEW_KEY);
    } catch {
      // sessionStorage unavailable; fall through to a normal embed.
    }

    const buildOutLive = typeof window !== 'undefined' && !!(window as any).BuildOut;
    const contextChanged = !!lastContext && lastContext !== currentContext;
    // No ?propertyId= means we want the index. But Buildout remembers the last-viewed
    // property in sessionStorage AND in the live window.BuildOut instance, so a same-tab
    // return to the index via SPA nav (land → open a property → Home → back to land) would
    // resurrect that detail even though the URL is clean.
    const droppedToIndex = !hasPropertyId && lastView === 'detail';

    const persistState = () => {
      try {
        sessionStorage.setItem(BUILDOUT_CONTEXT_KEY, currentContext);
        sessionStorage.setItem(BUILDOUT_VIEW_KEY, currentView);
      } catch {
        // ignore
      }
    };

    // A live Buildout instance can't be trusted to re-render the view the URL now asks for
    // when either the widget context changed (commercial → land) or we're dropping from a
    // property detail back to the index. Re-embedding in place leaves ghost handlers and a
    // cached route, so the widget shows the wrong property, the stale detail, or a gray
    // screen. A full reload is the only reliable reset — it's what a manual refresh does. We
    // persist the intended next state first so the reloaded mount sees a matching context +
    // view and the condition is false the second time (no reload loop).
    if (buildOutLive && (contextChanged || droppedToIndex)) {
      persistState();
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

    // No live instance to fight (first mount in this tab, or the page right after the reload
    // above / Buildout's own detail→index reload). When showing the index after a detail or
    // a context switch, drop stale Buildout sessionStorage + URL state so a fresh script load
    // can't rehydrate the previous detail. We NEVER strip a present ?propertyId= — that's the
    // shared deep link or the click→detail reload, and Buildout needs the param to open it.
    if (!hasPropertyId && (contextChanged || lastView === 'detail')) {
      clearBuildoutSessionStorage();
      const { url, dirty } = stripBuildoutUrlState();
      if (dirty) {
        const qs = url.searchParams.toString();
        window.history.replaceState(null, '', url.pathname + (qs ? `?${qs}` : ''));
      }
    }

    persistState();

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
