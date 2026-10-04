import { cache } from "react";
import { notFound } from "next/navigation";
import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import {
  CoursePageClientView,
  DynamicListingClientView,
  Header,
  Footer,
  MobileBottomNav,
} from "@/components/website";
import GlobalBreadcrumb from "@/components/common/GlobalBreadcrumb";
import { getLandingData } from "@/data/landing";
import UniversityLandingView from "@/components/landing/UniversityLandingView";

export const revalidate = 600;

// ─── Unified page resolver ────────────────────────────────────────────────────
const getPageData = cache(async (slug) => {
  if (!slug) return null;

  try {
    const [dynamicRes, coursePageRes] = await Promise.all([
      request
        .dynamicRead({
          entity: "dynamic-listing-pages",
          endPoint: "v1/detail",
          slug: encodeURIComponent(slug),
          revalidate: 600,
        })
        .catch(() => null),
      request
        .dynamicRead({
          entity: "course-pages",
          endPoint: "v1/detail",
          slug: encodeURIComponent(slug),
          revalidate: 600,
        })
        .catch(() => null),
    ]);

    const dynamicPage = dynamicRes?.result || dynamicRes;
    if (dynamicPage && dynamicPage.title) {
      return { type: "dynamic-listing", data: dynamicPage };
    }

    const coursePage = coursePageRes?.result || coursePageRes;
    if (coursePage && (coursePage.pageTitle || coursePage.title)) {
      return { type: "course-page", data: coursePage };
    }
  } catch (err) {
    console.error(`[Server Component] Error pre-fetching page ${slug}:`, err.message);
  }

  return null;
});

// ─── Header / Footer fetch — called once, shared across all page types ────────
const getLayoutData = cache(async () => {
  const [headerRes, footerRes, legalPoliciesRes] = await Promise.all([
    request.dynamicRead({
      entity: "header",
      endPoint: "public/by-slug",
      slug: "global",
      revalidate: 300,
    }).catch(() => null),
    request.dynamicList({
      entity: "footer",
      endPoint: "v1/list",
      revalidate: 300,
    }).catch(() => null),
    request.dynamicList({
      entity: "legal-policy",
      endPoint: "v1/list",
      revalidate: 300,
    }).catch(() => null),
  ]);

  return {
    headerData: headerRes?.result || headerRes,
    footerData: footerRes?.result || footerRes,
    legalPolicies: legalPoliciesRes?.result || [],
  };
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  if (!slug) return {};

  const landingData = getLandingData(slug);
  if (landingData?.meta) return landingData.meta;

  try {
    const [resolved, pageMeta] = await Promise.all([
      getPageData(slug),
      getPageMetaData(`/${slug}`),
    ]);
    const page = resolved?.data;
    const rawImage = page?.ogImage || page?.bannerImage || page?.featuredImage;
    const ogImage = rawImage ? getAssetPath(rawImage) : null;

    return constructMetadata(pageMeta, {
      title: page?.metaTitle || (page?.title ? `${page.title} | SODE` : ""),
      description: page?.metaDescription || page?.excerpt || page?.subtitle || "",
      keywords: page?.metaKeywords || page?.keywords || "",
      canonicalUrl: `https://sode.co.in/${page?.slug || slug}`,
      ogImage,
    });
  } catch (error) {
    return {};
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function DynamicSlugPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";

  // Isolated Landing Pages — no shared layout
  const landingData = getLandingData(slug);
  if (landingData) {
    return <UniversityLandingView data={landingData} />;
  }

  // Resolve page type + layout data + hero data — ALL concurrently in parallel
  const [resolved, { headerData, footerData, legalPolicies }, heroRes] = await Promise.all([
    getPageData(slug),
    getLayoutData(),
    request
      .dynamicRead({
        entity: "hero",
        endPoint: "public/by-slug",
        slug: encodeURIComponent(slug),
        revalidate: 300,
      })
      .catch(() => null),
  ]);

  if (!resolved) notFound();

  // ── Shared layout wrapper ──────────────────────────────────────────────────
  const withLayout = (content, mainClass = "grow pb-16 lg:pb-0") => (
    <div className="flex flex-col min-h-screen">
      <Header initialHeaderData={headerData} />
      <GlobalBreadcrumb />
      <main className={mainClass}>{content}</main>
      <Footer
        initialHeaderData={headerData}
        initialFooterData={footerData}
        initialLegalPolicies={legalPolicies}
      />
      <MobileBottomNav />
    </div>
  );

  // ── CMS pages need title ───────────────────────────────────────────────────
  if (!resolved.data?.title && !resolved.data?.pageTitle) notFound();

  // ── Dynamic Listing ────────────────────────────────────────────────────────
  if (resolved.type === "dynamic-listing") {
    return withLayout(<DynamicListingClientView page={resolved.data} slug={slug} />);
  }

  // ── Course Page ────────────────────────────────────────────────────────────
  const heroData = heroRes?.result || heroRes || null;

  return withLayout(
    <CoursePageClientView page={resolved.data} slug={slug} heroData={heroData} />
  );
}
