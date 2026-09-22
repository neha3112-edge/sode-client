import { cache } from "react";
import { notFound } from "next/navigation";
import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import CustomPageClientView from "@/components/website/CustomPageClientView";
import DynamicListingClientView from "@/components/website/DynamicListingClientView";

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

export default async function CustomDynamicPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";

  const resolved = await getPageData(slug);

  if (!resolved || !resolved.data || !resolved.data.title) {
    notFound();
  }

  // 1. Dynamic Listing & Ranking Page
  if (resolved.type === "dynamic-listing") {
    return <DynamicListingClientView page={resolved.data} slug={slug} />;
  }

  // 2. Custom Rich Editorial / Builder Page
  const heroRes = await request
    .dynamicRead({
      entity: "hero",
      endPoint: "public/by-slug",
      slug: encodeURIComponent(slug),
      revalidate: 300, // 5 min ISR — data from backend, NOT static
    })
    .catch(() => null);

  const heroData = heroRes?.result || heroRes || null;

  return <CustomPageClientView page={resolved.data} slug={slug} heroData={heroData} />;
}
