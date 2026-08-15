import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/pages/[slug]
 *  → backend: page/website-read?slug=<slug>
 */
export async function GET(_req, { params }) {
  const { slug } = await params;
  const qs = new URLSearchParams({ slug: decodeURIComponent(slug) });
  return proxyBackendGet("page/website-read", qs, { next: { revalidate: 300 } });
}
