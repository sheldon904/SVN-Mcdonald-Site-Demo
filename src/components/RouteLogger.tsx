import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logger } from '../lib/logger';

/**
 * Logs every client-side route change to the backend.
 * Place this inside <Router> to capture all navigation.
 */
export default function RouteLogger() {
  const location = useLocation();

  useEffect(() => {
    logger.pageView(location.pathname, {
      search: location.search,
      hash: location.hash,
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
}
