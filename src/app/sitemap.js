import { request } from "@/services/request";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sode.co.in";

  // Static Pages
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/courses",
    "/universities",
    "/blogs",
  ].map((route) => ({
    url: route ? `${baseUrl}${route}/` : `${baseUrl}/`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch dynamic entries safely
  let courses = [];
  let universities = [];
  let blogs = [];
  let coursePages = [];

  try {
    const cpRes = await request.dynamicList({
      entity: "course-pages",
      endPoint: "v1/list",
      options: { items: 1000 },
      revalidate: 3600,
    });
    coursePages = Array.isArray(cpRes?.result)
      ? cpRes.result
      : Array.isArray(cpRes)
      ? cpRes
      : [];
  } catch (err) {
    console.error("Error fetching course pages for sitemap:", err);
  }

  try {
    const coursesRes = await request.dynamicList({
      entity: "courses",
      endPoint: "v1/list",
      options: { items: 1000 },
      revalidate: 3600,
    });
    courses = Array.isArray(coursesRes?.result)
      ? coursesRes.result
      : Array.isArray(coursesRes)
      ? coursesRes
      : [];
  } catch (err) {
    console.error("Error fetching courses for sitemap:", err);
  }

  try {
    const uniRes = await request.dynamicList({
      entity: "universities",
      endPoint: "v1/list",
      options: { items: 1000 },
      revalidate: 3600,
    });
    universities = Array.isArray(uniRes?.result)
      ? uniRes.result
      : Array.isArray(uniRes)
      ? uniRes
      : [];
  } catch (err) {
    console.error("Error fetching universities for sitemap:", err);
  }

  try {
    const blogRes = await request.dynamicList({
      entity: "blogs",
      endPoint: "v1/list",
      options: { items: 1000 },
      revalidate: 3600,
    });
    blogs = Array.isArray(blogRes?.result)
      ? blogRes.result
      : Array.isArray(blogRes?.blogs)
      ? blogRes.blogs
      : [];
  } catch (err) {
    console.error("Error fetching blogs for sitemap:", err);
  }

  const coursePageUrls = (coursePages || [])
    .filter((cp) => cp && cp.slug)
    .map((cp) => ({
      url: `${baseUrl}/${cp.slug}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    }));

  const courseUrls = (courses || [])
    .filter((c) => c && c.slug)
    .map((course) => ({
      url: `${baseUrl}/courses/${course.slug}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  const universityUrls = (universities || [])
    .filter((u) => u && u.slug)
    .map((uni) => ({
      url: `${baseUrl}/universities/${uni.slug}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  const blogUrls = (blogs || [])
    .filter((b) => b && b.slug)
    .map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [...staticPages, ...coursePageUrls, ...courseUrls, ...universityUrls, ...blogUrls];
}
