import { createContext, useContext, useSyncExternalStore, useState, useCallback, type ReactNode } from 'react';

const STORAGE_KEY = 'svn-consent-v1';

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  decided: boolean;
}

interface ConsentContextValue {
  consent: ConsentState;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  setAnalytics: (enabled: boolean) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  preferencesOpen: boolean;
}

const defaultState: ConsentState = {
  necessary: true,
  analytics: false,
  decided: false,
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

// Cached snapshot — useSyncExternalStore requires getSnapshot() to return a
// stable reference between calls when nothing has changed, otherwise React
// detects an infinite render loop and bails out.
let cachedRaw: string | null | undefined = undefined;
let cachedSnapshot: ConsentState = defaultState;

function parseRaw(raw: string | null): ConsentState {
  if (!raw) return defaultState;
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return {
      necessary: true,
      analytics: parsed.analytics === true,
      decided: parsed.decided === true,
    };
  } catch {
    return defaultState;
  }
}

function getSnapshot(): ConsentState {
  if (typeof window === 'undefined') return defaultState;
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return defaultState;
  }
  if (raw === cachedRaw) return cachedSnapshot;
  cachedRaw = raw;
  cachedSnapshot = parseRaw(raw);
  return cachedSnapshot;
}

function getServerSnapshot(): ConsentState {
  return defaultState;
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) listener();
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage);
  }
  return () => {
    listeners.delete(listener);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', onStorage);
    }
  };
}

function writeAndNotify(next: ConsentState) {
  if (typeof window === 'undefined') return;
  try {
    const nextRaw = JSON.stringify(next);
    window.localStorage.setItem(STORAGE_KEY, nextRaw);
    // Invalidate the cache so the next getSnapshot returns a fresh, stable
    // reference for this new value.
    cachedRaw = nextRaw;
    cachedSnapshot = next;
  } catch {
    // ignore quota / privacy-mode errors
  }
  listeners.forEach((l) => l());
}

export const ConsentProvider = ({ children }: { children: ReactNode }) => {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const acceptAll = useCallback(() => {
    writeAndNotify({ necessary: true, analytics: true, decided: true });
    setPreferencesOpen(false);
  }, []);

  const rejectNonEssential = useCallback(() => {
    writeAndNotify({ necessary: true, analytics: false, decided: true });
    setPreferencesOpen(false);
  }, []);

  const setAnalytics = useCallback((enabled: boolean) => {
    writeAndNotify({ necessary: true, analytics: enabled, decided: true });
  }, []);

  const openPreferences = useCallback(() => setPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setPreferencesOpen(false), []);

  return (
    <ConsentContext.Provider
      value={{
        consent,
        acceptAll,
        rejectNonEssential,
        setAnalytics,
        openPreferences,
        closePreferences,
        preferencesOpen,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error('useConsent must be used inside <ConsentProvider>');
  }
  return ctx;
}
