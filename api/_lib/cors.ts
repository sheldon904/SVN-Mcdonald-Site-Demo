/**
 * CORS helper for Vercel serverless functions.
 * Allows the SPA frontend to call /api/* endpoints.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

const ALLOWED_ORIGINS = [
  'http://localhost:5173', // Vite dev
  'http://localhost:4173', // Vite preview
];

export function setCorsHeaders(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin || '';

  // In production on Vercel, same-origin requests don't need CORS.
  // Allow any *.vercel.app or the known dev origins.
  if (
    origin.endsWith('.vercel.app') ||
    ALLOWED_ORIGINS.includes(origin) ||
    origin.includes('svnmcdonald') // custom domain
  ) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Request-Id');
  res.setHeader('Access-Control-Max-Age', '86400');
}

/**
 * Handle preflight OPTIONS requests. Returns true if it was a preflight
 * (caller should return early).
 */
export function handlePreflight(req: VercelRequest, res: VercelResponse): boolean {
  setCorsHeaders(req, res);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}
