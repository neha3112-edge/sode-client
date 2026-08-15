import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/blogs/[slug]
 *  → backend: blog/read?slug=<slug>
 */
export async function GET(_req, { params }) {
  const { slug } = await params;
  const qs = new URLSearchParams({ slug: decodeURIComponent(slug) });
  return proxyBackendGet("blog/read", qs, { next: { revalidate: 300 } });
}
