interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  timeoutMs?: number;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  opts: RetryOptions = {},
): Promise<T> {
  const { maxRetries = 3, baseDelayMs = 1000, maxDelayMs = 8000, timeoutMs = 15000 } = opts;

  let lastError: Error = new Error("Unknown error");

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await Promise.race([
        fn(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Timeout after ${timeoutMs}ms`)), timeoutMs),
        ),
      ]);
      return result;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      const isRetryable =
        lastError.message.includes("Timeout") ||
        lastError.message.includes("fetch") ||
        lastError.message.includes("network") ||
        lastError.message.includes("ECONNRESET") ||
        lastError.message.match(/5\d\d/);

      if (!isRetryable || attempt === maxRetries) break;

      const delay = Math.min(baseDelayMs * 2 ** attempt, maxDelayMs);
      await new Promise((r) => setTimeout(r, delay));
    }
  }

  throw lastError;
}

export async function fetchWithRetry(url: string, init?: RequestInit): Promise<Response> {
  return withRetry(async () => {
    const res = await fetch(url, init);
    if (res.status >= 500) throw new Error(`HTTP ${res.status} from ${url}`);
    return res;
  });
}
