import { cache } from "react";
import { notFound } from "next/navigation";
import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import { CoursePageClientView } from "@/components/website";

export const revalidate = 600;

// ─── Unified Course Page fetcher ──────────────────────────────────────────────
const getCoursePageData = cache(async (slug) => {
  if (!slug) return null;

  try {
    const coursePageRes = await request
      .dynamicRead({
        entity: "course-pages",
        endPoint: "v1/detail",
        slug: encodeURIComponent(slug),
        revalidate: 600,
      })
      .catch(() => null);

    const coursePage = coursePageRes?.result || coursePageRes;
    if (coursePage && (coursePage.pageTitle || coursePage.title || coursePage.slug)) {
      return coursePage;
    }
  } catch (err) {
    console.error(`[CourseDetailPage] Error fetching course page ${slug}:`, err.message);
  }

  return null;
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  if (!slug) return {};

  try {
    const [page, pageMetaCourses, pageMetaDirect] = await Promise.all([
      getCoursePageData(slug),
      getPageMetaData(`/courses/${slug}`),
      getPageMetaData(`/${slug}`),
    ]);

    const pageMeta = pageMetaCourses || pageMetaDirect;
    const rawImage = page?.ogImage || page?.bannerImage || page?.featuredImage;
    const ogImage = rawImage ? getAssetPath(rawImage) : null;

    return constructMetadata(pageMeta, {
      title: page?.metaTitle || (page?.pageTitle || page?.title ? `${page.pageTitle || page.title} | SODE` : ""),
      description: page?.metaDescription || page?.excerpt || page?.subtitle || "",
      keywords: page?.metaKeywords || page?.keywords || "",
      canonicalUrl: `https://sode.co.in/courses/${page?.slug || slug}`,
      ogImage,
    });
  } catch (error) {
    return {};
  }
}

// ─── Course Detail Page Component ─────────────────────────────────────────────
export default async function CourseDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";

  const [coursePage, heroRes] = await Promise.all([
    getCoursePageData(slug),
    request
      .dynamicRead({
        entity: "hero",
        endPoint: "public/by-slug",
        slug: encodeURIComponent(slug),
        revalidate: 300,
      })
      .catch(() => null),
  ]);

  if (!coursePage || (!coursePage.pageTitle && !coursePage.title)) {
    notFound();
  }

  const heroData = heroRes?.result || heroRes || null;

  return (
    <CoursePageClientView page={coursePage} slug={slug} heroData={heroData} />
  );
}
