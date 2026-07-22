import { API_BASE_URL } from "@/config";

// ==========================================
// 100% PURE BACKEND MONGOOSE API SERVICES
// (All Static Fallbacks Removed as Requested)
// ==========================================

async function fetchFromApi(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      cache: "no-store",
      ...options,
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (data && data.success) {
      return data.result ?? null;
    }
    return null;
  } catch (error) {
    console.error(`❌ API Error fetching ${endpoint}:`, error);
    return null;
  }
}

// 🎯 Fetch Dynamic Website Header Tree & Site Logo from Backend Mongoose DB
export async function getWebsiteHeaders() {
  try {
    const res = await fetch(`${API_BASE_URL}header/website-list`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return { tree: [], siteLogo: null };
    const data = await res.json();
    if (data && data.success && Array.isArray(data.result)) {
      return {
        tree: data.result,
        siteLogo: data.siteLogo || null,
      };
    }
    return { tree: [], siteLogo: null };
  } catch (error) {
    console.error("❌ Error fetching website headers:", error);
    return { tree: [], siteLogo: null };
  }
}

// 🎯 Fetch Courses with dynamic Mongoose backend query parameters
export async function getWebsiteCoursesFilter(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.search) query.append("search", params.search);
    if (params.category && params.category !== "all") query.append("category", params.category);
    if (Array.isArray(params.university) && params.university.length > 0) {
      query.append("university", params.university.join(","));
    }
    if (Array.isArray(params.course) && params.course.length > 0) {
      query.append("course", params.course.join(","));
    }
    if (params.duration && params.duration !== "all") query.append("duration", params.duration);
    if (params.sort) query.append("sort", params.sort);
    if (params.limit) query.append("limit", params.limit);
    if (params.page) query.append("page", params.page);

    const queryString = query.toString();
    const url = `courses/website-list${queryString ? `?${queryString}` : ""}`;

    const data = await fetchFromApi(url);
    if (data && data.programs) {
      return data;
    }
    if (Array.isArray(data)) {
      return { tabs: [], programs: data, total: data.length };
    }
    return { tabs: [], programs: [], total: 0 };
  } catch (error) {
    console.error("❌ Error fetching website courses filter:", error);
    return { tabs: [], programs: [], total: 0 };
  }
}

// 🎯 Fetch All Public Courses from Backend
export async function getCourses() {
  const data = await fetchFromApi("courses/website-list");
  if (data && Array.isArray(data.programs)) {
    return data.programs;
  }
  if (Array.isArray(data)) {
    return data;
  }
  return [];
}

// 🎯 Fetch Course by Slug from Backend
export async function getCourseBySlug(slug) {
  if (!slug) return null;
  return await fetchFromApi(`courses/website-read?slug=${slug}`);
}

// 🎯 Fetch Partner Universities from Backend
export async function getUniversities() {
  const data = await fetchFromApi("partneruniversities/website-list");
  if (!Array.isArray(data)) return [];

  // Fix relative/corrupted Media URLs before passing to client
  return data.map((uni) => ({
    ...uni,
    logoSrc: fixMediaUrl(uni?.logoSrc),
    imageSrc: fixMediaUrl(uni?.imageSrc),
  }));
}

/**
 * Normalise a Media object URL:
 *  - Strips "Image preview" text accidentally appended in DB
 *  - Converts relative paths to absolute using API_BASE_URL origin
 */
function fixMediaUrl(media) {
  if (!media || typeof media !== "object") return media;
  const raw = media.url || "";
  if (!raw) return media;

  // Strip noise
  let cleaned = raw.replace(/\s*image\s*preview\s*$/i, "").trim();
  if (!cleaned) return { ...media, url: null };

  // Make absolute if relative
  if (!cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
    // API_BASE_URL is like "http://localhost:5001/api/" — extract origin
    const origin = API_BASE_URL.replace(/\/api\/?$/, "");
    cleaned = `${origin}${cleaned.startsWith("/") ? "" : "/"}${cleaned}`;
  }

  return { ...media, url: cleaned };
}


// 🎯 Fetch Universities for Comparison from Backend
export async function getWebsiteUniversitiesCompare(slugs = []) {
  try {
    if (!slugs || (Array.isArray(slugs) && slugs.length === 0)) return [];
    const slugStr = Array.isArray(slugs) ? slugs.join(",") : slugs;
    const data = await fetchFromApi(`partneruniversities/compare?slugs=${slugStr}`);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("❌ Compare fetch error:", error);
    return [];
  }
}

// 🎯 Fetch University by Slug from Backend
export async function getUniversityBySlug(slug) {
  if (!slug) return null;
  return await fetchFromApi(`partneruniversities/website-read?slug=${slug}`);
}

// 🎯 Fetch Dynamic Hero Section from Backend
export async function getWebsiteHero(page = "home") {
  try {
    const data = await fetchFromApi(`hero/website-read?page=${page}`);
    if (!data) return null;

    return {
      ...data,
      image: fixMediaUrl(data.image),
      bgImage: fixMediaUrl(data.bgImage),
      mobileImage: fixMediaUrl(data.mobileImage),
      slides: Array.isArray(data.slides)
        ? data.slides.map((s) => ({
          ...s,
          image: fixMediaUrl(s.image),
          bgImage: fixMediaUrl(s.bgImage),
          mobileImage: fixMediaUrl(s.mobileImage),
        }))
        : [],
    };
  } catch (error) {
    console.error("❌ Hero fetch error:", error);
    return null;
  }
}


// 🎯 Fetch Blog by Slug from Backend
export async function getBlogBySlug(slug) {
  if (!slug) return null;
  return await fetchFromApi(`blog/read?slug=${slug}`);
}

// 🎯 Fetch Blogs from Backend
export async function getBlogs() {
  const data = await fetchFromApi("blog/list");
  return Array.isArray(data) ? data : [];
}
