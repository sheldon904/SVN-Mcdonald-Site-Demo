/**
 * Client-side logger that:
 * 1. Logs to the browser console (in dev)
 * 2. Batches and forwards entries to POST /api/log (in prod)
 *
 * This gives you full visibility in Vercel Logs for client-side errors,
 * navigation events, and performance metrics.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  url: string;
  userAgent: string;
  [key: string]: unknown;
}

const FLUSH_INTERVAL = 5000; // 5 seconds
const MAX_BATCH_SIZE = 20;
const API_ENDPOINT = '/api/log';

class ClientLogger {
  private queue: LogEntry[] = [];
  private flushTimer: ReturnType<typeof setInterval> | null = null;
  private isFlushing = false;

  constructor() {
    // Auto-flush on interval
    if (typeof window !== 'undefined') {
      this.flushTimer = setInterval(() => this.flush(), FLUSH_INTERVAL);

      // Flush before page unload
      window.addEventListener('beforeunload', () => this.flush());

      // Capture unhandled errors
      window.addEventListener('error', (event) => {
        this.error('Unhandled error', {
          errorMessage: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error?.stack,
        });
      });

      // Capture unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        this.error('Unhandled promise rejection', {
          reason: event.reason instanceof Error
            ? { message: event.reason.message, stack: event.reason.stack }
            : String(event.reason),
        });
      });
    }
  }

  private createEntry(level: LogLevel, message: string, meta?: Record<string, unknown>): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      ...meta,
    };
  }

  private enqueue(entry: LogEntry) {
    this.queue.push(entry);

    // Console output in development
    if (import.meta.env.DEV) {
      const consoleFn = entry.level === 'error' ? console.error
        : entry.level === 'warn' ? console.warn
        : entry.level === 'debug' ? console.debug
        : console.log;
      consoleFn(`[${entry.level.toUpperCase()}] ${entry.message}`, entry);
    }

    // Flush immediately if batch is full
    if (this.queue.length >= MAX_BATCH_SIZE) {
      this.flush();
    }
  }

  async flush() {
    if (this.isFlushing || this.queue.length === 0) return;

    this.isFlushing = true;
    const batch = this.queue.splice(0, MAX_BATCH_SIZE);

    try {
      // Use sendBeacon for reliability during page unload, fetch otherwise
      const payload = JSON.stringify({ entries: batch });

      if (typeof navigator?.sendBeacon === 'function' && document.visibilityState === 'hidden') {
        navigator.sendBeacon(API_ENDPOINT, new Blob([payload], { type: 'application/json' }));
      } else {
        await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        });
      }
    } catch {
      // If sending fails, re-queue (but don't grow unbounded)
      if (this.queue.length < 100) {
        this.queue.unshift(...batch);
      }
    } finally {
      this.isFlushing = false;
    }
  }

  debug(message: string, meta?: Record<string, unknown>) {
    this.enqueue(this.createEntry('debug', message, meta));
  }

  info(message: string, meta?: Record<string, unknown>) {
    this.enqueue(this.createEntry('info', message, meta));
  }

  warn(message: string, meta?: Record<string, unknown>) {
    this.enqueue(this.createEntry('warn', message, meta));
  }

  error(message: string, meta?: Record<string, unknown>) {
    this.enqueue(this.createEntry('error', message, meta));
  }

  /**
   * Log a page navigation event.
   */
  pageView(path: string, meta?: Record<string, unknown>) {
    this.info('Page view', { path, ...meta });
  }

  /**
   * Log a user interaction event (button click, form submit, etc.)
   */
  event(action: string, meta?: Record<string, unknown>) {
    this.info(`User event: ${action}`, meta);
  }

  /**
   * Log a performance measurement.
   */
  perf(metric: string, durationMs: number, meta?: Record<string, unknown>) {
    this.debug(`Performance: ${metric}`, { durationMs, ...meta });
  }

  destroy() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flush();
  }
}

// Singleton instance
export const logger = new ClientLogger();
