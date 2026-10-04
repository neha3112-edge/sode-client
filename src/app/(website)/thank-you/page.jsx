import { ThankYouClient } from "@/components/website";
import { request } from "@/services/request";

export const revalidate = 300;

/* =========================================================
   DYNAMIC NEXT.JS SEO METADATA (PURE API - ZERO STATIC DATA)
========================================================= */

export async function generateMetadata() {
  let thankYouData = null;
  try {
    const res = await request.dynamicRead({
      entity: "thank-you",
      endPoint: "public",
      revalidate: 300,
    });
    thankYouData = res?.result ?? res ?? null;
  } catch (e) {
    console.error("Error fetching Thank You page metadata:", e?.message);
  }

  const title = thankYouData?.metaTitle || thankYouData?.title || "";
  const description = thankYouData?.metaDescription || thankYouData?.subtitle || "";
  const canonicalUrl = thankYouData?.canonicalUrl || "";
  const keywords = thankYouData?.metaKeywords || "";
  const robotsDirective = thankYouData?.robots || "noindex, nofollow";

  const isNoIndex = robotsDirective.includes("noindex");
  const isNoFollow = robotsDirective.includes("nofollow");

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(keywords ? { keywords } : {}),
    robots: {
      index: !isNoIndex,
      follow: !isNoFollow,
    },
    ...(canonicalUrl
      ? {
          alternates: {
            canonical: canonicalUrl,
          },
        }
      : {}),
    openGraph: {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      type: "website",
    },
  };
}

/* =========================================================
   DYNAMIC THANK YOU PAGE (PURE API - ZERO STATIC DATA)
========================================================= */

export default async function ThankYouPage() {
  let thankYouData = null;

  try {
    const res = await request.dynamicRead({
      entity: "thank-you",
      endPoint: "public",
      revalidate: 300,
    });
    thankYouData = res?.result ?? res ?? null;
  } catch (e) {
    console.error("Error fetching Thank You page data:", e?.message);
  }

  return (
    <ThankYouClient
      initialData={thankYouData}
      conversionSource="lp"
    />
  );
}
