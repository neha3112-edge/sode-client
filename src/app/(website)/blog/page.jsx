import React from "react";
import { request } from "@/services/request";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import BlogPageClientView from "@/components/website/BlogPageClientView";

export const revalidate = 900;

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/blog");
  return constructMetadata(pageMeta, {
    canonicalUrl: "https://sode.co.in/blog",
  });
}

export default async function BlogPage() {
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
    console.error("[Blog Page] Server fetch error:", err.message);
  }

  return (
    <BlogPageClientView
      initialBlogs={initialBlogs}
      initialCategories={initialCategories}
      initialTotal={initialTotal}
    />
  );
}
