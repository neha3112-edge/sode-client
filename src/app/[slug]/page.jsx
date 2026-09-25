import { cache } from "react";
import { notFound } from "next/navigation";
import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import {
  CustomPageClientView,
  DynamicListingClientView,
  ApprovalUniversityDirectory,
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

  // 1. Try Dynamic Listing Page
  try {
    const dynamicRes = await request.dynamicRead({
      entity: "dynamic-listing-pages",
      endPoint: "v1/detail",
      slug: encodeURIComponent(slug),
      revalidate: 600,
    });
    const dynamicPage = dynamicRes?.result || dynamicRes;
    if (dynamicPage && dynamicPage.title) {
      return { type: "dynamic-listing", data: dynamicPage };
    }
  } catch (err) { }

  // 2. Try Custom Page
  try {
    const customRes = await request.dynamicRead({
      entity: "custom-pages",
      endPoint: "v1/detail",
      slug: encodeURIComponent(slug),
      revalidate: 600,
    });
    const customPage = customRes?.result || customRes;
    if (customPage && customPage.title) {
      return { type: "custom-page", data: customPage };
    }
  } catch (err) {
    console.error(`[Server Component] Error pre-fetching page ${slug}:`, err.message);
  }

  // 3. Try Approval Directory
  try {
    const approvalRes = await request.dynamicList({
      entity: "universities",
      endPoint: `v1/approval-directory/${slug}`,
      options: {},
      revalidate: 900,
    });
    if (approvalRes && approvalRes.approval) {
      return { type: "approval-directory", data: approvalRes };
    }
  } catch (err) { }

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

  // Resolve page type + fetch layout data — both in parallel
  const [resolved, { headerData, footerData, legalPolicies }] = await Promise.all([
    getPageData(slug),
    getLayoutData(),
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

  // ── Approval Directory ─────────────────────────────────────────────────────
  if (resolved.type === "approval-directory") {
    return withLayout(
      <ApprovalUniversityDirectory initialData={resolved.data} />,
      "grow pb-16 lg:pb-0 pt-2 sm:pt-3"
    );
  }

  // ── CMS pages need title ───────────────────────────────────────────────────
  if (!resolved.data?.title) notFound();

  // ── Dynamic Listing ────────────────────────────────────────────────────────
  if (resolved.type === "dynamic-listing") {
    return withLayout(<DynamicListingClientView page={resolved.data} slug={slug} />);
  }

  // ── Custom Page ────────────────────────────────────────────────────────────
  const heroRes = await request
    .dynamicRead({
      entity: "hero",
      endPoint: "public/by-slug",
      slug: encodeURIComponent(slug),
      revalidate: 300,
    })
    .catch(() => null);

  const heroData = heroRes?.result || heroRes || null;

  return withLayout(
    <CustomPageClientView page={resolved.data} slug={slug} heroData={heroData} />
  );
}
