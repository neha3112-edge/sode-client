import { proxyBackendGet } from "@/lib/backendProxy";

/**
 * GET /api/website/courses
 * → backend: course/website-list
 *
 * Supported query params (forwarded as-is):
 *   search, category, subcategory, subcourse, university,
 *   course, duration, fee, sort, page, limit
 *
 * Used by client components for interactive filtering.
 * cache: no-store so every user filter triggers a fresh backend call.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  return proxyBackendGet("course/website-list", searchParams, { cache: "no-store" });
}
