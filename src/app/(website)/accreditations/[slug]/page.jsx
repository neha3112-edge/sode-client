import { notFound } from "next/navigation";
import { request } from "@/services/request";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import { ApprovalUniversityDirectory } from "@/components/website";
import { getAccreditationHeroContent } from "@/constants/accreditationStaticContent";
import {
  isFakeUniversitiesSlug,
  getFakeUniversitiesStaticData,
} from "@/constants/fakeUniversitiesData";

export const revalidate = 900;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";
  const pageMeta = await getPageMetaData(`/accreditations/${slug}`);

  const staticContent = getAccreditationHeroContent(slug);

  const titleFallback = staticContent?.title
    ? `${staticContent.title} - Distance Education School`
    : slug
      ? `${slug.replace(/-/g, " ").toUpperCase()} - Approved Universities List`
      : "Approved Universities Directory";

  const descFallback =
    staticContent?.description ||
    pageMeta?.metaDescription ||
    "Comprehensive directory of UGC-DEB and statutory approved universities, rankings, fees and admission details.";

  return constructMetadata(pageMeta, {
    title: pageMeta?.metaTitle || titleFallback,
    description: pageMeta?.metaDescription || descFallback,
    canonicalUrl: `https://distanceeducationschool.com/accreditations/${slug}`,
  });
}

export default async function AccreditationDirectoryDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";

  // 🛡️ Fake universities directory is 100% static in website-client without backend dependency
  if (isFakeUniversitiesSlug(slug)) {
    const staticFakeData = getFakeUniversitiesStaticData(slug);
    return (
      <div className="w-full min-h-screen">
        <ApprovalUniversityDirectory initialData={staticFakeData} />
      </div>
    );
  }

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
    <div className="w-full min-h-screen">
      <ApprovalUniversityDirectory initialData={initialData} />
    </div>
  );
}

