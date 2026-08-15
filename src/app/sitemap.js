import { getCourses, getUniversities, getBlogs } from "@/services/api";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mysode.com";

  // Static Pages
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/courses",
    "/universities",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch dynamic entries safely
  let courses = [];
  let universities = [];
  let blogs = [];

  try {
    const coursesRes = await getCourses({ limit: 1000 });
    courses = Array.isArray(coursesRes)
      ? coursesRes
      : Array.isArray(coursesRes?.programs)
      ? coursesRes.programs
      : [];
  } catch (err) {
    console.error("Error fetching courses for sitemap:", err);
  }

  try {
    const uniRes = await getUniversities({ limit: 1000 });
    universities = Array.isArray(uniRes)
      ? uniRes
      : Array.isArray(uniRes?.result)
      ? uniRes.result
      : Array.isArray(uniRes?.universities)
      ? uniRes.universities
      : [];
  } catch (err) {
    console.error("Error fetching universities for sitemap:", err);
  }

  try {
    const blogRes = await getBlogs();
    blogs = Array.isArray(blogRes)
      ? blogRes
      : Array.isArray(blogRes?.blogs)
      ? blogRes.blogs
      : [];
  } catch (err) {
    console.error("Error fetching blogs for sitemap:", err);
  }

  const courseUrls = (courses || [])
    .filter((c) => c && c.slug)
    .map((course) => ({
      url: `${baseUrl}/courses/${course.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  const universityUrls = (universities || [])
    .filter((u) => u && u.slug)
    .map((uni) => ({
      url: `${baseUrl}/universities/${uni.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  const blogUrls = (blogs || [])
    .filter((b) => b && b.slug)
    .map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [...staticPages, ...courseUrls, ...universityUrls, ...blogUrls];
}
