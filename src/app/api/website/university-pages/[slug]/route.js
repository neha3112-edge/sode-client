import { proxyBackendGet } from "@/lib/backendProxy";

/**
 * GET /api/website/university-pages/[slug]
 * Proxies to backend: /api/university-pages/v1/list/[slug]
 */
export async function GET(request, { params }) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  return proxyBackendGet(`university-pages/v1/list/${slug}`, searchParams, { cache: "no-store" });
}
