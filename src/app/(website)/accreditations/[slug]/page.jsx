import { notFound } from "next/navigation";
import { request } from "@/services/request";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import { ApprovalUniversityDirectory } from "@/components/website";

export const revalidate = 900;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";
  const pageMeta = await getPageMetaData(`/accreditations/${slug}`);
  const titleFallback = slug
    ? `${slug.replace(/-/g, " ").toUpperCase()} - Approved Universities List`
    : "Approved Universities Directory";

  return constructMetadata(pageMeta, {
    title: pageMeta?.metaTitle || titleFallback,
    description:
      pageMeta?.metaDescription ||
      "Comprehensive directory of UGC-DEB and statutory approved universities, rankings, fees and admission details.",
    canonicalUrl: `https://distanceeducationschool.com/accreditations/${slug}`,
  });
}

export default async function AccreditationDirectoryDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";
  let initialData = null;

  try {
    const res = await request.dynamicList({
      entity: "accreditations",
      endPoint: `v1/approval-directory/${slug}`,
      options: {},
      revalidate: 900,
    });

    if (res && res.success !== false && res.approval) {
      initialData = res;
    }
  } catch (err) {
    console.error(`[AccreditationDirectoryDetailPage] Server fetch error for ${slug}:`, err?.message);
  }

  if (!initialData || !initialData.approval) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-2 sm:pt-3 pb-8 sm:pb-10">
      <ApprovalUniversityDirectory initialData={initialData} />
    </div>
  );
}
