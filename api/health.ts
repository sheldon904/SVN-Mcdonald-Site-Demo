/**
 * GET /api/health
 *
 * Health check endpoint. Useful for uptime monitoring and verifying
 * that serverless functions are deploying correctly.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createRequestLogger } from './_lib/logger.js';
import { handlePreflight, setCorsHeaders } from './_lib/cors.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (handlePreflight(req, res)) return;
  setCorsHeaders(req, res);

  const log = createRequestLogger('api/health', req);

  const payload = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || 'development',
    region: process.env.VERCEL_REGION || 'unknown',
    gitSha: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'local',
    nodeVersion: process.version,
    uptime: process.uptime(),
  };

  log.info('Health check passed', payload);
  log.logResponse(200);

  return res.status(200).json(payload);
}
