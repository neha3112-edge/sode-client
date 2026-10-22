import React from "react";
import { request } from "@/services/request";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import { BlogPageClientView } from "@/components/website";

export const revalidate = 3600; // 1 hour

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
  let initialPagination = { page: 1, total: 0, limit: 12 };

  try {
    const blogsRes = await request.dynamicList({
      entity: "blogs",
      endPoint: "v1/list",
      options: { page: 1, items: 12 },
      revalidate: 3600,
    });

    const list = blogsRes?.result || blogsRes?.blogs || (Array.isArray(blogsRes) ? blogsRes : []);
    initialBlogs = Array.isArray(list) ? list : [];
    initialCategories = blogsRes?.categories || [];
    const pagination = blogsRes?.pagination || {};
    initialPagination = {
      page: pagination.page || 1,
      total: pagination.total || pagination.count || initialBlogs.length,
      limit: pagination.limit || 12,
    };

    return (
      <BlogPageClientView
        initialBlogs={initialBlogs}
        initialCategories={initialCategories}
        initialPagination={initialPagination}
      />
    );
  } catch (err) {
    console.error("[Blogs Page] Server fetch error:", err.message);
  }

  return (
    <BlogPageClientView
      initialBlogs={initialBlogs}
      initialCategories={[]}
      initialPagination={initialPagination}
    />
  );
}
