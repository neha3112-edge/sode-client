/**
 * Environment check:
 * - isProduction: true in production build/live (NODE_ENV === 'production')
 * - isISRActive: active if in production, OR if explicitly enabled via NEXT_PUBLIC_ENABLE_ISR='true'
 */
export const isProduction = process.env.NODE_ENV === "production";

export const isISRActive =
  process.env.NEXT_PUBLIC_ENABLE_ISR !== undefined
    ? process.env.NEXT_PUBLIC_ENABLE_ISR === "true"
    : isProduction;

/**
 * Generates fetch options for Next.js based on environment:
 * - Development/Local: { cache: 'no-store' } -> No caching, instant updates on every reload
 * - Live/Production: { next: { revalidate: seconds, tags } } -> Automatic ISR enabled
 *
 * @param {number} seconds - Revalidation interval in seconds (default 300s)
 * @param {string[]|string} tags - Cache tags for on-demand revalidation
 * @returns {object} fetch options
 */
export function getFetchCacheOptions(seconds = 300, tags = []) {
  if (!isISRActive) {
    return {
      cache: "no-store",
    };
  }

  const tagsArr = Array.isArray(tags)
    ? tags.filter(Boolean)
    : tags
      ? [tags]
      : [];

  return {
    next: {
      revalidate: seconds,
      ...(tagsArr.length > 0 ? { tags: tagsArr } : {}),
    },
  };
}

/**
 * Returns revalidation seconds based on environment:
 * - In Development/Local: 0 (fresh every request)
 * - In Live/Production: seconds (e.g. 300)
 */
export function getRevalidateTime(seconds = 300) {
  return isISRActive ? seconds : 0;
}
