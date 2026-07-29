import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/options/subcourses     → subcourses/website-options */
export async function GET() {
  return proxyBackendGet("subcourses/website-options", null, { next: { revalidate: 300 } });
}
