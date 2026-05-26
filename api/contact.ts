/**
 * POST /api/contact
 *
 * Receives contact form submissions, validates them, applies a per-IP rate
 * limit, and forwards them to the broker via Resend. PII is never written to
 * server logs in clear form — only redacted summaries.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { createRequestLogger } from './_lib/logger.js';
import { handlePreflight, setCorsHeaders } from './_lib/cors.js';

interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  consent: boolean;
}

const REQUIRED_FIELDS: (keyof ContactPayload)[] = ['firstName', 'lastName', 'email', 'message'];

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'bartow.mcdonald@svn.com';
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'noreply@svnmcdonald.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

// Simple in-memory rate limiter: per IP, max 5 submissions per hour.
// Resets when the function instance recycles. Good enough at current volume;
// upgrade to @upstash/ratelimit if abuse becomes an issue.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0]!.trim();
  if (Array.isArray(forwarded) && forwarded[0]) return forwarded[0]!.split(',')[0]!.trim();
  return req.headers['x-real-ip']?.toString() || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function redactEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) return '***';
  const head = local.slice(0, 1);
  return `${head}***@${domain}`;
}

function redactPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) return '***';
  return `***-***-${digits.slice(-4)}`;
}

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

  if (data.consent !== true) {
    log.warn('Validation failed: consent not given');
    return null;
  }

  const email = (data.email as string).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    log.warn('Validation failed: invalid email format');
    return null;
  }

  return {
    firstName: (data.firstName as string).trim(),
    lastName: (data.lastName as string).trim(),
    email,
    phone: typeof data.phone === 'string' ? data.phone.trim() : undefined,
    subject: typeof data.subject === 'string' ? data.subject.trim() : undefined,
    message: (data.message as string).trim(),
    consent: true,
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmail(payload: ContactPayload): { subject: string; text: string; html: string } {
  const subjectLine = payload.subject
    ? `New website inquiry — ${payload.subject}`
    : 'New website inquiry';

  const text = [
    `From: ${payload.firstName} ${payload.lastName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || 'not provided'}`,
    `Subject: ${payload.subject || 'none selected'}`,
    '',
    'Message:',
    payload.message,
    '',
    '—',
    'Sent via the SVN McDonald & Company contact form.',
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #181818;">
      <h2 style="color: #EC6C26; margin-bottom: 16px;">New website inquiry</h2>
      <table cellpadding="6" cellspacing="0" style="font-size: 14px; border-collapse: collapse;">
        <tr><td><strong>From:</strong></td><td>${escapeHtml(payload.firstName)} ${escapeHtml(payload.lastName)}</td></tr>
        <tr><td><strong>Email:</strong></td><td><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td></tr>
        <tr><td><strong>Phone:</strong></td><td>${escapeHtml(payload.phone || 'not provided')}</td></tr>
        <tr><td><strong>Subject:</strong></td><td>${escapeHtml(payload.subject || 'none selected')}</td></tr>
      </table>
      <h3 style="margin-top: 24px; margin-bottom: 8px;">Message</h3>
      <p style="font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
      <hr style="margin-top: 32px; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 12px; color: #888;">Sent via the SVN McDonald &amp; Company contact form. Reply directly to this email to respond to the sender.</p>
    </div>
  `;

  return { subject: subjectLine, text, html };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handlePreflight(req, res)) return;
  setCorsHeaders(req, res);

  const log = createRequestLogger('api/contact', req);

  if (req.method !== 'POST') {
    log.warn('Method not allowed', { method: req.method });
    log.logResponse(405);
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    log.warn('Rate limit exceeded for contact form', { ipHash: ip.slice(0, 3) + '***' });
    log.logResponse(429);
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const payload = validatePayload(req.body, log);
  if (!payload) {
    log.logResponse(400, { reason: 'validation_failed' });
    return res.status(400).json({
      error: 'Invalid request. Required fields: firstName, lastName, email, message, and consent.',
    });
  }

  // PII-redacted intake log — useful for monitoring volume without exposing customer data.
  log.info('Contact form submission accepted', {
    requestId: log.getRequestId(),
    subject: payload.subject || 'none',
    messageLength: payload.message.length,
    hasPhone: !!payload.phone,
    emailDomain: payload.email.split('@')[1] || 'unknown',
    consentGiven: true,
  });

  if (!RESEND_API_KEY) {
    log.warn('RESEND_API_KEY is not configured; submission accepted but email not sent', {
      requestId: log.getRequestId(),
    });
    log.logResponse(200, { delivered: false });
    return res.status(200).json({
      success: true,
      message: 'Your message has been received. We will get back to you shortly.',
      requestId: log.getRequestId(),
    });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const email = buildEmail(payload);

    const result = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: payload.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    if (result.error) {
      log.error('Resend returned an error', {
        requestId: log.getRequestId(),
        errorMessage: result.error.message,
        errorName: result.error.name,
        // Redacted recipient context for debugging without PII exposure:
        toRedacted: redactEmail(payload.email),
        phoneRedacted: payload.phone ? redactPhone(payload.phone) : 'none',
      });
      // Still return 200 to the user so we don't leak our internal email config.
      log.logResponse(200, { delivered: false });
      return res.status(200).json({
        success: true,
        message: 'Your message has been received. We will get back to you shortly.',
        requestId: log.getRequestId(),
      });
    }

    log.info('Contact email delivered', {
      requestId: log.getRequestId(),
      emailId: result.data?.id,
    });
    log.logResponse(200, { delivered: true });
    return res.status(200).json({
      success: true,
      message: 'Your message has been received. We will get back to you shortly.',
      requestId: log.getRequestId(),
    });
  } catch (err) {
    log.logError(err, 'Failed to send contact email');
    log.logResponse(500);
    return res.status(500).json({
      error: 'Internal server error. Please try again later.',
      requestId: log.getRequestId(),
    });
  }
}
