import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/categories/[slug]
 *  → backend: category/website-read?slug=<slug>
 *  Returns { success, result: { category, children } }
 */
export async function GET(_req, { params }) {
  const { slug } = await params;
  const qs = new URLSearchParams({ slug: decodeURIComponent(slug) });
  return proxyBackendGet("category/website-read", qs, { next: { revalidate: 60 } });
}
