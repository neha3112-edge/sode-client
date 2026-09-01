import { cache } from "react";
import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";
import BlogClientView from "@/components/website/BlogClientView";

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
    return {
      title: "Blog | mysode",
      description: "Read the latest higher education articles and guides.",
    };
  }

  try {
    const { initialData: data } = await getBlogPageData(slug);
    const blog = data?.blogId || data || {};

    if (!blog?.title && !data?.headline) {
      return {
        title: "Blog Not Found | mysode",
        description: "The requested blog post could not be found.",
      };
    }

    const title = data.headline || blog.title || "Blog Article | mysode";
    const description =
      data.metaDescription ||
      blog.excerpt ||
      blog.content?.replace(/<[^>]+>/g, "").slice(0, 160) ||
      "Read insightful educational guides, degree comparisons, and career roadmap tips.";
    const keywords = data.metaKeywords || `${blog.title}, higher education blog, online degree guidance`;
    const rawImage = data.bannerImage || blog.coverImage;
    const ogImage = rawImage ? getAssetPath(rawImage) : "https://mysode.com/og-image.jpg";
    const canonical = `https://mysode.com/blog/${blog.slug || slug}`;

    return {
      title: `${title} | mysode`,
      description,
      keywords,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: "mysode",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  } catch (error) {
    return {
      title: "Blog | mysode",
      description: "Read the latest higher education articles and guides.",
    };
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
