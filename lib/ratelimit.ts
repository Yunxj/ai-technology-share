import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const inMemoryStore = new Map<string, number>();

function getInMemoryKey(identifier: string): string {
  return `like:${identifier}`;
}

/** Check if rate limited. Returns true if allowed, false if limited. */
export async function checkLikeRateLimit(identifier: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    const redis = new Redis({ url, token });
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(1, "1 h"),
    });
    const { success } = await ratelimit.limit(identifier);
    return success;
  }

  // Fallback: in-memory (single instance only)
  const key = getInMemoryKey(identifier);
  const lastLike = inMemoryStore.get(key);
  const now = Date.now();
  if (lastLike != null && now - lastLike < WINDOW_MS) {
    return false;
  }
  inMemoryStore.set(key, now);
  return true;
}
