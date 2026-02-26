/**
 * POST /api/contact
 *
 * Receives contact form submissions from the frontend.
 * Logs every detail so you can trace form issues in Vercel Logs.
 *
 * In the future you can wire this up to an email service (Resend, SendGrid, etc.)
 * For now it validates, logs, and returns success.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createRequestLogger } from './_lib/logger.js';
import { handlePreflight, setCorsHeaders } from './_lib/cors.js';

interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

const REQUIRED_FIELDS: (keyof ContactPayload)[] = ['firstName', 'lastName', 'email', 'message'];

function validatePayload(body: unknown, log: ReturnType<typeof createRequestLogger>): ContactPayload | null {
  if (!body || typeof body !== 'object') {
    log.warn('Validation failed: body is not an object', { receivedType: typeof body });
    return null;
  }

  const data = body as Record<string, unknown>;
  const missing = REQUIRED_FIELDS.filter((f) => !data[f] || typeof data[f] !== 'string' || (data[f] as string).trim() === '');

  if (missing.length > 0) {
    log.warn('Validation failed: missing required fields', { missingFields: missing, receivedFields: Object.keys(data) });
    return null;
  }

  // Basic email format check
  const email = (data.email as string).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    log.warn('Validation failed: invalid email format', { email });
    return null;
  }

  return {
    firstName: (data.firstName as string).trim(),
    lastName: (data.lastName as string).trim(),
    email,
    phone: typeof data.phone === 'string' ? data.phone.trim() : undefined,
    subject: typeof data.subject === 'string' ? data.subject.trim() : undefined,
    message: (data.message as string).trim(),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handlePreflight(req, res)) return;
  setCorsHeaders(req, res);

  const log = createRequestLogger('api/contact', req);

  // --- Method guard ---
  if (req.method !== 'POST') {
    log.warn('Method not allowed', { method: req.method });
    log.logResponse(405);
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // --- Parse & validate ---
  log.debug('Raw request body', {
    contentType: req.headers['content-type'],
    bodyKeys: req.body ? Object.keys(req.body) : 'no body',
  });

  const payload = validatePayload(req.body, log);
  if (!payload) {
    log.logResponse(400, { reason: 'validation_failed' });
    return res.status(400).json({
      error: 'Invalid request. Required fields: firstName, lastName, email, message.',
    });
  }

  log.info('Contact form submission received', {
    from: `${payload.firstName} ${payload.lastName}`,
    email: payload.email,
    phone: payload.phone || 'not provided',
    subject: payload.subject || 'none',
    messageLength: payload.message.length,
    messagePreview: payload.message.slice(0, 100),
  });

  // --- Process ---
  // TODO: Wire up email delivery (Resend, SendGrid, etc.)
  // For now we log thoroughly so you can verify submissions in Vercel Logs.
  try {
    log.info('Contact submission processed successfully', {
      action: 'logged_for_review',
      fullPayload: payload,
    });

    log.logResponse(200);
    return res.status(200).json({
      success: true,
      message: 'Your message has been received. We will get back to you shortly.',
      requestId: log.getRequestId(),
    });
  } catch (err) {
    log.logError(err, 'Failed to process contact submission');
    log.logResponse(500);
    return res.status(500).json({
      error: 'Internal server error. Please try again later.',
      requestId: log.getRequestId(),
    });
  }
}
