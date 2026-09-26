import React from "react";
import { request } from "@/services/request";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import { BlogPageClientView } from "@/components/website";

export const revalidate = 900;

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/blogs");
  return constructMetadata(pageMeta, {
    title: pageMeta?.metaTitle || "Latest Educational Blogs, News & Career Guides",
    description:
      pageMeta?.metaDescription ||
      "Read expert articles on distance education, online degree reviews, approvals, and career paths.",
    canonicalUrl: "https://distanceeducationschool.com/blogs",
  });
}

export default async function BlogsPage() {
  let initialBlogs = [];
  let initialCategories = [];
  let initialTotal = 0;

  try {
    const [blogsRes, catRes] = await Promise.all([
      request.dynamicList({
        entity: "blogs",
        endPoint: "v1/list",
        options: { page: 1, items: 12 },
        revalidate: 900,
      }),
      request.dynamicList({
        entity: "category",
        endPoint: "v1/list",
        options: { items: 50 },
        revalidate: 900,
      }),
    ]);

    const list = blogsRes?.result || blogsRes?.blogs || (Array.isArray(blogsRes) ? blogsRes : []);
    initialBlogs = Array.isArray(list) ? list : [];
    initialTotal = blogsRes?.pagination?.total || blogsRes?.total || initialBlogs.length;

    const catList = catRes?.result || catRes?.categories || (Array.isArray(catRes) ? catRes : []);
    initialCategories = Array.isArray(catList) ? catList : [];
  } catch (err) {
    console.error("[Blogs Page] Server fetch error:", err.message);
  }

  return (
    <BlogPageClientView
      initialBlogs={initialBlogs}
      initialCategories={initialCategories}
      initialTotal={initialTotal}
    />
  );
}
