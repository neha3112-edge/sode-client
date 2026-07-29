import { proxyBackendGet } from "@/lib/backendProxy";

/**
 * GET /api/website/universities
 * → backend: partneruniversities/website-list
 *
 * Supported query params: type, category, limit, page
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  return proxyBackendGet("partneruniversities/website-list", searchParams, { next: { revalidate: 300 } });
}
