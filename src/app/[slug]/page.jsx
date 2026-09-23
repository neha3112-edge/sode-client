import { cache } from "react";
import { notFound } from "next/navigation";
import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import {
  CustomPageClientView,
  DynamicListingClientView,
  Header,
  Footer,
  MobileBottomNav,
} from "@/components/website";
import GlobalBreadcrumb from "@/components/common/GlobalBreadcrumb";
import { getLandingData } from "@/data/landing";
import UniversityLandingView from "@/components/landing/UniversityLandingView";

export const revalidate = 600;

// Unified page resolver: checks Dynamic Listing Page first, then Custom Page
const getPageData = cache(async (slug) => {
  if (!slug) return null;

  // 1. Try Dynamic Listing Page (e.g. /top-online-ma-universities-in-india)
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
  } catch (err) {
    // fallback to custom-pages silently
  }

  // 2. Try Custom Page (e.g. /online-mba, /privacy-policy)
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

  return null;
});

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {};
  }

  const landingData = getLandingData(slug);
  if (landingData?.meta) {
    return landingData.meta;
  }

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

export default async function DynamicSlugPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";

  // 1. Check if it's a University Landing Page (amity, manipal, lpu, cu, galgotias, mu, etc.)
  const landingData = getLandingData(slug);
  if (landingData) {
    // Isolated Landing Page: renders ONLY its own Navbar, Content, and Footer
    return <UniversityLandingView data={landingData} />;
  }

  // 2. Otherwise fetch from backend CMS (Website Pages)
  const resolved = await getPageData(slug);

  if (!resolved || !resolved.data || !resolved.data.title) {
    notFound();
  }

  // Fetch website header & footer data for CMS pages
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

  const headerData = headerRes?.result || headerRes;
  const footerData = footerRes?.result || footerRes;
  const legalPolicies = legalPoliciesRes?.result || [];

  let content = null;
  if (resolved.type === "dynamic-listing") {
    content = <DynamicListingClientView page={resolved.data} slug={slug} />;
  } else {
    const heroRes = await request
      .dynamicRead({
        entity: "hero",
        endPoint: "public/by-slug",
        slug: encodeURIComponent(slug),
        revalidate: 300,
      })
      .catch(() => null);

    const heroData = heroRes?.result || heroRes || null;
    content = <CustomPageClientView page={resolved.data} slug={slug} heroData={heroData} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header initialHeaderData={headerData} />
      <GlobalBreadcrumb />
      <main className="grow pb-16 lg:pb-0">{content}</main>
      <Footer
        initialHeaderData={headerData}
        initialFooterData={footerData}
        initialLegalPolicies={legalPolicies}
      />
      <MobileBottomNav />
    </div>
  );
}
