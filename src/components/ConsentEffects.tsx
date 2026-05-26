import { useEffect } from 'react';
import { useConsent } from '../lib/consent';
import { loadGTM } from '../lib/analytics';
import { logger } from '../lib/logger';

const ConsentEffects = () => {
  const { consent } = useConsent();

  useEffect(() => {
    logger.setEnabled(consent.analytics);
    if (consent.analytics) {
      loadGTM();
    }
  }, [consent.analytics]);

  return null;
};

export default ConsentEffects;
