/**
 * Client-side rate limiter for the Groq AI Chatbot.
 * Protects against accidental message spamming and excessive Groq API usage.
 */

const RATE_LIMIT_STORAGE_KEY = 'metermate_chat_rate_limit'

export interface RateLimitConfig {
  maxPerMinute: number
  maxPerHour: number
  minCooldownMs: number
}

export const DEFAULT_RATE_LIMIT_CONFIG: RateLimitConfig = {
  maxPerMinute: 10,     // Max 10 messages per minute
  maxPerHour: 60,       // Max 60 messages per hour
  minCooldownMs: 5000,  // Minimum 2 seconds between messages
}

interface StoredRateLimitData {
  timestamps: number[]
}

function getStoredTimestamps(): number[] {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredRateLimitData
    if (Array.isArray(parsed?.timestamps)) {
      const now = Date.now()
      // Filter out timestamps older than 1 hour to keep storage small
      return parsed.timestamps.filter((ts) => typeof ts === 'number' && now - ts < 3600_000)
    }
    return []
  } catch {
    return []
  }
}

function saveTimestamps(timestamps: number[]): void {
  try {
    localStorage.setItem(
      RATE_LIMIT_STORAGE_KEY,
      JSON.stringify({ timestamps: timestamps.slice(-100) }),
    )
  } catch {
    /* storage quota exceeded or disabled */
  }
}

export interface RateLimitCheckResult {
  allowed: boolean
  retryAfterSeconds: number
  reason?: 'cooldown' | 'minute' | 'hour'
}

/**
 * Check whether the user is allowed to send a message right now.
 */
export function checkRateLimit(
  config: RateLimitConfig = DEFAULT_RATE_LIMIT_CONFIG,
): RateLimitCheckResult {
  const now = Date.now()
  const timestamps = getStoredTimestamps()

  if (timestamps.length === 0) {
    return { allowed: true, retryAfterSeconds: 0 }
  }

  const lastTimestamp = timestamps[timestamps.length - 1]
  const elapsedSinceLast = now - lastTimestamp

  // 1. Check minimum cooldown between consecutive messages
  if (elapsedSinceLast < config.minCooldownMs) {
    const retryAfter = Math.ceil((config.minCooldownMs - elapsedSinceLast) / 1000)
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, retryAfter),
      reason: 'cooldown',
    }
  }

  // 2. Check requests in the last 60 seconds
  const oneMinuteAgo = now - 60_000
  const recentInMinute = timestamps.filter((ts) => ts > oneMinuteAgo)
  if (recentInMinute.length >= config.maxPerMinute) {
    const oldestInWindow = recentInMinute[0]
    const retryAfter = Math.ceil((oldestInWindow + 60_000 - now) / 1000)
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, retryAfter),
      reason: 'minute',
    }
  }

  // 3. Check requests in the last hour
  const oneHourAgo = now - 3600_000
  const recentInHour = timestamps.filter((ts) => ts > oneHourAgo)
  if (recentInHour.length >= config.maxPerHour) {
    const oldestInWindow = recentInHour[0]
    const retryAfter = Math.ceil((oldestInWindow + 3600_000 - now) / 1000)
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, retryAfter),
      reason: 'hour',
    }
  }

  return { allowed: true, retryAfterSeconds: 0 }
}

/**
 * Record a message send attempt.
 */
export function recordRequest(): void {
  const now = Date.now()
  const timestamps = getStoredTimestamps()
  timestamps.push(now)
  saveTimestamps(timestamps)
}

/**
 * Reset rate limit history (e.g. for testing or clearing state).
 */
export function resetRateLimit(): void {
  try {
    localStorage.removeItem(RATE_LIMIT_STORAGE_KEY)
  } catch {
    /* ignore */
  }
}
