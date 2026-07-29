import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/universities/[slug]
 *  → backend: partneruniversities/website-read?slug=<slug>
 */
export async function GET(_req, { params }) {
  const { slug } = await params;
  const qs = new URLSearchParams({ slug: decodeURIComponent(slug) });
  return proxyBackendGet("partneruniversities/website-read", qs, { next: { revalidate: 300 } });
}
