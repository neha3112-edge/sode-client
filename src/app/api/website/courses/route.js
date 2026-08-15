import { proxyBackendGet } from "@/lib/backendProxy";

/**
 * GET /api/website/courses
 * → backend: university-offerings/v1/list
 *
 * Supported query params (forwarded as-is):
 *   q, search, category, subCategory, subcourse, university,
 *   course, duration, fees, sortBy, page, items, limit
 *
 * Used by client components for interactive filtering.
 * cache: no-store so every user filter triggers a fresh backend call.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  return proxyBackendGet("university-offerings/v1/list", searchParams, { cache: "no-store" });
}
