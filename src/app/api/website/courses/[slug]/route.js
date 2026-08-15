import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/courses/[slug]
 *  → backend: course/website-read?slug=<slug>
 *  Revalidated every 300s (ISR for course detail pages)
 */
export async function GET(_req, { params }) {
  const { slug } = await params;
  const qs = new URLSearchParams({ slug: decodeURIComponent(slug) });
  return proxyBackendGet("course/website-read", qs, { next: { revalidate: 300 } });
}
