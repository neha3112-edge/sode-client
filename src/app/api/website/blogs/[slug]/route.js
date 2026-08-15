import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/blogs/[slug]
 *  → backend: blogpages/v1/list/<slug>
 */
export async function GET(_req, { params }) {
  const { slug } = await params;
  return proxyBackendGet(`blogpages/v1/list/${encodeURIComponent(slug)}`, null, { next: { revalidate: 300 } });
}

