import { cache } from "react";
import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import { BlogClientView } from "@/components/website";

export const revalidate = 900;

const getBlogPageData = cache(async (slug) => {
  if (!slug) return { initialData: null, initialPopularBlogs: [] };
  try {
    const [blogRes, popularRes] = await Promise.all([
      request.dynamicRead({
        entity: "blogs",
        endPoint: "v1/list",
        id: encodeURIComponent(slug),
        revalidate: 900,
      }),
      request.dynamicList({
        entity: "blogs",
        endPoint: "v1/list",
        options: { items: 6 },
        revalidate: 900,
      }),
    ]);

    const initialData = blogRes?.result ?? blogRes ?? null;
    const list = popularRes?.result || popularRes?.blogs || (Array.isArray(popularRes) ? popularRes : []);
    return {
      initialData,
      initialPopularBlogs: Array.isArray(list) ? list : [],
    };
  } catch (err) {
    console.error(`[Server Component] Error pre-fetching blog ${slug}:`, err.message);
    return { initialData: null, initialPopularBlogs: [] };
  }
});

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {};
  }

  try {
    const [{ initialData: data }, pageMeta] = await Promise.all([
      getBlogPageData(slug),
      getPageMetaData(`/blog/${slug}`),
    ]);
    const blog = data?.blogId || data || {};

    const title = data?.headline || blog?.title || "";
    const description = data?.metaDescription || blog?.excerpt || "";
    const keywords = data?.metaKeywords || "";
    const rawImage = data?.bannerImage || blog?.coverImage;
    const ogImage = rawImage ? getAssetPath(rawImage) : null;

    return constructMetadata(pageMeta, {
      title,
      description,
      keywords,
      canonicalUrl: `https://sode.co.in/blog/${blog?.slug || slug}`,
      ogImage,
      ogType: "article",
    });
  } catch (error) {
    return {};
  }
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";

  const { initialData, initialPopularBlogs } = await getBlogPageData(slug);

  return (
    <BlogClientView
      initialData={initialData}
      initialPopularBlogs={initialPopularBlogs}
      slug={slug}
    />
  );
}
