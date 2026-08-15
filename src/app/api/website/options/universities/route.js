import { proxyBackendGet } from "@/lib/backendProxy";

/** GET /api/website/options/universities     → partneruniversities/website-options */
export async function GET() {
  return proxyBackendGet("universities/website-options", null, { next: { revalidate: 300 } });
}
