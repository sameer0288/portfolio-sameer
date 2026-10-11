/**
 * Rate Limiter for portfolio API endpoints (/api/chat, /api/contact)
 * 
 * Provides sliding-window rate limiting per client IP.
 * Documented for easy extension to distributed stores (e.g. Upstash / Redis)
 * in multi-container / serverless multi-instance deployments.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < 15 * 60 * 1000);
      if (record.timestamps.length === 0) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}

export interface RateLimitOptions {
  intervalMs: number; // e.g. 60_000 for 1 minute
  maxRequests: number; // e.g. 10 requests
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { intervalMs: 60_000, maxRequests: 10 }
): RateLimitResult {
  const now = Date.now();
  const windowStart = now - options.intervalMs;

  let record = rateLimitStore.get(identifier);
  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(identifier, record);
  }

  // Filter timestamps within the current sliding window
  record.timestamps = record.timestamps.filter((t) => t > windowStart);

  if (record.timestamps.length >= options.maxRequests) {
    const oldest = record.timestamps[0];
    const resetSeconds = Math.max(1, Math.ceil((oldest + options.intervalMs - now) / 1000));
    return {
      success: false,
      limit: options.maxRequests,
      remaining: 0,
      resetSeconds,
    };
  }

  record.timestamps.push(now);
  const remaining = Math.max(0, options.maxRequests - record.timestamps.length);

  return {
    success: true,
    limit: options.maxRequests,
    remaining,
    resetSeconds: Math.ceil(options.intervalMs / 1000),
  };
}

/**
 * Extracts client IP from standard proxy headers
 */
export function getClientIp(req: Request): string {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();
  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();
  return "127.0.0.1";
}
