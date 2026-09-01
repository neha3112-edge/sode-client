import React from "react";
import { request } from "@/services/request";
import BlogPageClientView from "@/components/website/BlogPageClientView";

export const revalidate = 900;

export const metadata = {
  title: "Higher Education Blogs, Guides & Admission Roadmaps | SODE",
  description:
    "Explore latest educational articles, online MBA guides, university comparisons, syllabus benchmarks, and career roadmaps on SODE.",
  alternates: {
    canonical: "https://mysode.com/blog",
  },
  openGraph: {
    title: "Higher Education Blogs & Guides | SODE",
    description:
      "Explore latest educational articles, online MBA guides, university comparisons, and career roadmaps.",
    url: "https://mysode.com/blog",
    siteName: "SODE",
    type: "website",
  },
};

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
