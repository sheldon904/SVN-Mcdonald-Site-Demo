/**
 * Structured Logger for Vercel Serverless Functions
 *
 * Outputs JSON-structured logs that are easy to search/filter
 * in the Vercel Logs dashboard. Every log line includes:
 *   - timestamp (ISO 8601)
 *   - level (debug | info | warn | error)
 *   - requestId (unique per request for tracing)
 *   - function name (which API route)
 *   - message
 *   - arbitrary metadata
 */

import { randomUUID } from 'crypto';
import type { VercelRequest } from '@vercel/node';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  requestId: string;
  function: string;
  message: string;
  durationMs?: number;
  [key: string]: unknown;
}

export class Logger {
  private requestId: string;
  private functionName: string;
  private startTime: number;

  constructor(functionName: string, req?: VercelRequest) {
    this.functionName = functionName;
    this.startTime = Date.now();
    this.requestId =
      (req?.headers?.['x-vercel-id'] as string) ||
      (req?.headers?.['x-request-id'] as string) ||
      randomUUID();
  }

  private emit(level: LogLevel, message: string, meta?: Record<string, unknown>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      requestId: this.requestId,
      function: this.functionName,
      message,
      durationMs: Date.now() - this.startTime,
      ...meta,
    };

    const line = JSON.stringify(entry);

    switch (level) {
      case 'error':
        console.error(line);
        break;
      case 'warn':
        console.warn(line);
        break;
      case 'debug':
        console.debug(line);
        break;
      default:
        console.log(line);
    }
  }

  debug(message: string, meta?: Record<string, unknown>) {
    this.emit('debug', message, meta);
  }

  info(message: string, meta?: Record<string, unknown>) {
    this.emit('info', message, meta);
  }

  warn(message: string, meta?: Record<string, unknown>) {
    this.emit('warn', message, meta);
  }

  error(message: string, meta?: Record<string, unknown>) {
    this.emit('error', message, meta);
  }

  /**
   * Log full request details — call at the start of every handler.
   */
  logRequest(req: VercelRequest) {
    this.emit('info', 'Incoming request', {
      method: req.method,
      url: req.url,
      path: req.url?.split('?')[0],
      query: req.query,
      headers: {
        'content-type': req.headers['content-type'],
        'user-agent': req.headers['user-agent'],
        'x-forwarded-for': req.headers['x-forwarded-for'],
        'x-vercel-ip-country': req.headers['x-vercel-ip-country'],
        'x-vercel-ip-city': req.headers['x-vercel-ip-city'],
        referer: req.headers['referer'],
        origin: req.headers['origin'],
      },
      ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
    });
  }

  /**
   * Log the response being sent — call right before res.json() / res.send().
   */
  logResponse(statusCode: number, meta?: Record<string, unknown>) {
    const level: LogLevel = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
    this.emit(level, `Response ${statusCode}`, {
      statusCode,
      totalDurationMs: Date.now() - this.startTime,
      ...meta,
    });
  }

  /**
   * Capture an Error object with full stack trace.
   */
  logError(err: unknown, context?: string) {
    const error = err instanceof Error ? err : new Error(String(err));
    this.emit('error', context || 'Unhandled error', {
      errorName: error.name,
      errorMessage: error.message,
      stack: error.stack,
    });
  }

  getRequestId() {
    return this.requestId;
  }
}

/**
 * Quick helper — creates a Logger and logs the inbound request in one call.
 */
export function createRequestLogger(functionName: string, req: VercelRequest): Logger {
  const logger = new Logger(functionName, req);
  logger.logRequest(req);
  return logger;
}
