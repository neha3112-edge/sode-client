import { proxyBackendGet } from "@/lib/backendProxy";

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";
  const { searchParams } = new URL(request.url);
  return proxyBackendGet(`university-offering-pages/v1/list/${encodeURIComponent(slug)}`, searchParams, { cache: "no-store" });
}
