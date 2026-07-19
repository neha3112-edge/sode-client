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

  // Fetch dynamic entries
  const courses = await getCourses();
  const universities = await getUniversities();
  const blogs = await getBlogs();

  const courseUrls = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const universityUrls = universities.map((uni) => ({
    url: `${baseUrl}/universities/${uni.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...courseUrls, ...universityUrls, ...blogUrls];
}
