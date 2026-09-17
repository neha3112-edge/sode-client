import { cache } from "react";
import { notFound } from "next/navigation";
import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";
import CustomPageClientView from "@/components/website/CustomPageClientView";

export const revalidate = 600;

const getCustomPageData = cache(async (slug) => {
  if (!slug) return null;
  try {
    const res = await request.dynamicRead({
      entity: "custom-pages",
      endPoint: "v1/detail",
      slug: encodeURIComponent(slug),
      revalidate: 600,
    });
    return res?.result || res || null;
  } catch (err) {
    console.error(`[Server Component] Error pre-fetching custom page ${slug}:`, err.message);
    return null;
  }
});

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {
      title: "Page Not Found | SODE",
    };
  }

  try {
    const page = await getCustomPageData(slug);

    if (!page || !page.title) {
      return {
        title: "Page Not Found | SODE",
        description: "The requested page could not be found.",
      };
    }

    const title = page.metaTitle || `${page.title} | SODE`;
    const description =
      page.metaDescription ||
      page.excerpt ||
      page.subtitle ||
      page.content?.replace(/<[^>]+>/g, "").slice(0, 160) ||
      "Explore course details, fee structure, top universities, and admissions guidance at SODE.";

    const keywords = page.keywords || `${page.title}, online education, distance degree programs, sode`;
    const rawImage = page.ogImage || page.bannerImage || page.featuredImage;
    const ogImage = rawImage ? getAssetPath(rawImage) : "https://mysode.com/og-image.jpg";
    const canonical = page.canonicalUrl || `https://mysode.com/${page.slug || slug}`;

    const metadata = {
      title,
      description,
      keywords,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: "SODE",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: page.title,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };

    if (page.noIndex) {
      metadata.robots = {
        index: false,
        follow: false,
      };
    }

    return metadata;
  } catch (error) {
    return {
      title: "SODE - School of Online & Distance Education",
      description: "Explore top accredited online & distance programs.",
    };
  }
}

export default async function CustomDynamicPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";

  const [page, heroRes] = await Promise.all([
    getCustomPageData(slug),
    request
      .dynamicRead({
        entity: "hero",
        endPoint: "public/by-slug",
        slug: encodeURIComponent(slug),
        revalidate: 0,
      })
      .catch(() => null),
  ]);

  if (!page || !page.title) {
    notFound();
  }

  const heroData = heroRes?.result || heroRes || null;

  return <CustomPageClientView page={page} slug={slug} heroData={heroData} />;
}
