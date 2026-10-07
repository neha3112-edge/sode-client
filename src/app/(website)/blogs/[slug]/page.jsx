import { cache } from "react";
import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import { BlogClientView } from "@/components/website";

export const revalidate = 900;

const getBlogPageData = cache(async (slug) => {
  if (!slug) return { initialData: null, initialPopularBlogs: [] };
  try {
    const [blogRes, popularRes, categoryRes] = await Promise.all([
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
      request.dynamicList({
        entity: "category",
        endPoint: "v1/list",
        revalidate: 300,
      }),
    ]);

    const initialData = blogRes?.result ?? blogRes ?? null;
    const list = popularRes?.result || popularRes?.blogs || (Array.isArray(popularRes) ? popularRes : []);

    const categories = Array.isArray(categoryRes?.result)
      ? categoryRes.result
      : Array.isArray(categoryRes?.categories)
      ? categoryRes.categories
      : Array.isArray(categoryRes?.sections)
      ? categoryRes.sections
      : Array.isArray(categoryRes)
      ? categoryRes
      : [];

    const toolsParent = categories.find(
      (c) =>
        c.featuredType === "TOOLS" ||
        c.featuredType === "FEATURED_TOOLS" ||
        c.sectionType === "TOOLS" ||
        (c.name && c.name.toLowerCase().includes("tool")) ||
        (c.title && c.title.toLowerCase().includes("tool"))
    );

    const rawTools = toolsParent && (toolsParent.children || toolsParent.items);
    const initialTools =
      Array.isArray(rawTools) && rawTools.length > 0 ? rawTools : [];

    return {
      initialData,
      initialPopularBlogs: Array.isArray(list) ? list : [],
      initialTools,
      initialCategories: categoryRes,
    };
  } catch (err) {
    console.error(`[Server Component] Error pre-fetching blog ${slug}:`, err.message);
    return { initialData: null, initialPopularBlogs: [], initialTools: [], initialCategories: null };
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
      getPageMetaData(`/blogs/${slug}`),
    ]);
    const blog = data?.blogId || data || {};

    const title = data?.headline || blog?.title || "";
    const description = data?.metaDescription || blog?.subtitle || blog?.excerpt || "";
    const keywords = data?.metaKeywords || "";
    const rawImage = data?.bannerImage || blog?.coverImage;
    const ogImage = rawImage ? getAssetPath(rawImage) : null;

    return constructMetadata(pageMeta, {
      title,
      description,
      keywords,
      canonicalUrl: `https://distanceeducationschool.com/blogs/${blog?.slug || slug}`,
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

  const { initialData, initialPopularBlogs, initialTools, initialCategories } = await getBlogPageData(slug);

  return (
    <BlogClientView
      initialData={initialData}
      initialPopularBlogs={initialPopularBlogs}
      initialTools={initialTools}
      initialCategories={initialCategories}
      slug={slug}
    />
  );
}
