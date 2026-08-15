import { proxyBackendGet } from "@/lib/backendProxy";

/**
 * GET /api/website/universities
 * → backend: universities/v1/list
 *
 * Supported query params: type, category, limit, items, page, search, q, isTop, isFeatured, sortBy
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  return proxyBackendGet("universities/v1/list", searchParams, { cache: "no-store" });
}
