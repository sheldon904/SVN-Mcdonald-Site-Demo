/**
 * POST /api/log
 *
 * Client-side error/event sink. The frontend sends errors, navigation
 * events, and performance data here so they appear in Vercel Logs.
 *
 * Accepts batched entries for efficiency.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createRequestLogger } from './_lib/logger';
import { handlePreflight, setCorsHeaders } from './_lib/cors';

interface ClientLogEntry {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp?: string;
  // Arbitrary context the frontend attaches
  [key: string]: unknown;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (handlePreflight(req, res)) return;
  setCorsHeaders(req, res);

  const log = createRequestLogger('api/log', req);

  if (req.method !== 'POST') {
    log.warn('Method not allowed', { method: req.method });
    log.logResponse(405);
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const body = req.body;

  // Accept a single entry or an array
  const entries: ClientLogEntry[] = Array.isArray(body?.entries)
    ? body.entries
    : Array.isArray(body)
      ? body
      : [body];

  log.info('Received client log batch', {
    entryCount: entries.length,
    userAgent: req.headers['user-agent'],
    ip: req.headers['x-forwarded-for'],
  });

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (!entry || typeof entry !== 'object') {
      log.warn(`Skipping malformed entry at index ${i}`, { entry });
      continue;
    }

    const { level = 'info', message = 'no message', timestamp, ...meta } = entry;

    // Re-emit each entry through the server logger so it's fully structured
    log[level in log ? (level as 'info') : 'info'](
      `[CLIENT] ${message}`,
      {
        clientTimestamp: timestamp || 'not provided',
        entryIndex: i,
        ...meta,
      },
    );
  }

  log.logResponse(200, { processedEntries: entries.length });
  return res.status(200).json({ received: entries.length });
}
