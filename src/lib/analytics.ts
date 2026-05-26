const GTM_ID = 'GTM-M8F3FVMN';

let loaded = false;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function loadGTM() {
  if (loaded || typeof window === 'undefined' || typeof document === 'undefined') return;
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

  const firstScript = document.getElementsByTagName('script')[0];
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  firstScript?.parentNode?.insertBefore(script, firstScript);
}

export function isGTMLoaded(): boolean {
  return loaded;
}
