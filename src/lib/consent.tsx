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

function readFromStorage(): ConsentState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
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

function writeToStorage(state: ConsentState) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Notify other tabs and our own subscribers.
    window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }));
  } catch {
    // ignore quota / privacy-mode errors
  }
}

const storeListeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  storeListeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) listener();
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage);
  }
  return () => {
    storeListeners.delete(listener);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', onStorage);
    }
  };
}

function notifyAll() {
  storeListeners.forEach((l) => l());
}

function getSnapshot(): ConsentState {
  return readFromStorage();
}

function getServerSnapshot(): ConsentState {
  return defaultState;
}

export const ConsentProvider = ({ children }: { children: ReactNode }) => {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const persist = useCallback((next: ConsentState) => {
    writeToStorage(next);
    notifyAll();
  }, []);

  const acceptAll = useCallback(() => {
    persist({ necessary: true, analytics: true, decided: true });
    setPreferencesOpen(false);
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist({ necessary: true, analytics: false, decided: true });
    setPreferencesOpen(false);
  }, [persist]);

  const setAnalytics = useCallback(
    (enabled: boolean) => {
      persist({ necessary: true, analytics: enabled, decided: true });
    },
    [persist],
  );

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
