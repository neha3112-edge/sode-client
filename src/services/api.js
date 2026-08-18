import { API_BASE_URL } from "@/config";

// ==========================================
// 100% DIRECT BACKEND MONGOOSE API SERVICES
// (Configured with 5-Min & 15-Min ISR Caching)
// ==========================================

function formatApiUrl(endpoint) {
  const base = String(API_BASE_URL || "").replace(/\/+$/, "");
  const path = String(endpoint || "").replace(/^\/+/, "");
  return `${base}/${path}`;
}

async function fetchFromApi(endpoint, options = {}) {
  try {
    const url = formatApiUrl(endpoint);
    const isClient = typeof window !== "undefined";
    const serverOpts = { next: { revalidate: 900 }, ...options };
    const res = await fetch(url, isClient ? {} : serverOpts);

    if (!res.ok) return null;

    const data = await res.json();
    if (data && data.success) {
      return data.result ?? data;
    }
    return null;
  } catch (error) {
    return null;
  }
}

// Universal fetch helper directly pointing to Backend API (Default: 15-Minute Cache)
async function universalFetch(endpoint, serverOptions = { next: { revalidate: 900 } }) {
  const url = formatApiUrl(endpoint);
  const isClient = typeof window !== "undefined";
  const options = isClient ? {} : serverOptions;

  try {
    const res = await fetch(url, options);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

// 🎯 Fetch Dynamic Website Header Tree & Site Logo from Backend (Cached: 15 Mins)
export async function getWebsiteHeaders() {
  try {
    const data = await universalFetch("header/website-list", { next: { revalidate: 900 } });
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

// 🎯 Fetch Dynamic Website Categories & Tree (Cached: 15 Mins)
export async function getWebsiteCategories() {
  try {
    const data = await universalFetch("category/v1/list", { next: { revalidate: 900 } });
    if (data && data.success && Array.isArray(data.result)) {
      return {
        categories: data.result,
        tree: data.result,
        result: data.result,
      };
    }
    return { categories: [], tree: [], result: [] };
  } catch (error) {
    return { categories: [], tree: [], result: [] };
  }
}

// 🎯 Fetch Single Category & its Subcategories (Cached: 15 Mins)
export async function getWebsiteCategoryBySlug(slug) {
  try {
    if (!slug) return { category: null, children: [] };
    const data = await universalFetch(`category/website-read?slug=${encodeURIComponent(slug)}`, { next: { revalidate: 900 } });
    if (data && data.success && data.result) {
      return {
        category: data.result.category || null,
        children: data.result.children || [],
      };
    }
    return { category: null, children: [] };
  } catch (error) {
    console.error("❌ Error fetching website category by slug:", error);
    return { category: null, children: [] };
  }
}

// 🎯 Fetch University Offerings / Courses (Cached: 5 Mins)
export async function getWebsiteCoursesFilter(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.search) query.append("q", params.search);
    if (params.q) query.append("q", params.q);

    if (Array.isArray(params.category) && params.category.length > 0) {
      const validCats = params.category.filter((c) => c && c !== "all");
      if (validCats.length > 0) query.append("category", validCats.join(","));
    } else if (params.category && params.category !== "all") {
      query.append("category", params.category);
    }

    if (Array.isArray(params.subcategory) && params.subcategory.length > 0) {
      const validSubs = params.subcategory.filter((s) => s && s !== "all");
      if (validSubs.length > 0) query.append("subCategory", validSubs.join(","));
    } else if (params.subcategory && params.subcategory !== "all") {
      query.append("subCategory", params.subcategory);
    }

    if (Array.isArray(params.subCategory) && params.subCategory.length > 0) {
      const validSubs = params.subCategory.filter((s) => s && s !== "all");
      if (validSubs.length > 0) query.append("subCategory", validSubs.join(","));
    } else if (params.subCategory && params.subCategory !== "all") {
      query.append("subCategory", params.subCategory);
    }

    if (params.subcourse && params.subcourse !== "all") query.append("subCourse", params.subcourse);

    if (Array.isArray(params.university) && params.university.length > 0) {
      const validUnis = params.university.filter((u) => u && u !== "all");
      if (validUnis.length > 0) query.append("university", validUnis.join(","));
    } else if (params.university && params.university !== "all") {
      query.append("university", params.university);
    }

    if (Array.isArray(params.course) && params.course.length > 0) {
      const validCourses = params.course.filter((c) => c && c !== "all");
      if (validCourses.length > 0) query.append("course", validCourses.join(","));
    } else if (params.course && params.course !== "all") {
      query.append("course", params.course);
    }

    if (Array.isArray(params.duration) && params.duration.length > 0) {
      const validDurs = params.duration.filter((d) => d && d !== "all");
      if (validDurs.length > 0) query.append("duration", validDurs.join(","));
    } else if (params.duration && params.duration !== "all") {
      query.append("duration", params.duration);
    }

    if (Array.isArray(params.fee) && params.fee.length > 0) {
      const validFees = params.fee.filter((f) => f && f !== "all");
      if (validFees.length > 0) query.append("fees", validFees.join(","));
    } else if (params.fee && params.fee !== "all") {
      query.append("fees", params.fee);
    }

    if (Array.isArray(params.fees) && params.fees.length > 0) {
      const validFees = params.fees.filter((f) => f && f !== "all");
      if (validFees.length > 0) query.append("fees", validFees.join(","));
    } else if (params.fees && params.fees !== "all") {
      query.append("fees", params.fees);
    }
    if (params.sort) query.append("sortBy", params.sort);
    if (params.limit) query.append("items", params.limit);
    if (params.items) query.append("items", params.items);
    if (params.page) query.append("page", params.page);

    const queryString = query.toString();
    const endpoint = `university-offerings/v1/list${queryString ? `?${queryString}` : ""}`;

    const data = await universalFetch(endpoint, { next: { revalidate: 300 } });

    if (data && data.success && Array.isArray(data.result)) {
      return {
        programs: data.result,
        total: data.pagination?.total ?? data.result.length,
        totalPages: data.pagination?.pages ?? 1,
        page: data.pagination?.page ?? 1,
        limit: data.pagination?.items ?? (params.limit || 10),
      };
    }
    return { programs: [], total: 0, totalPages: 1, page: 1, limit: 10 };
  } catch (error) {
    console.error("❌ Error fetching website university offerings filter:", error);
    return { programs: [], total: 0, totalPages: 1, page: 1, limit: 10 };
  }
}

// 🎯 Fetch Courses with Tabs from Backend (Cached: 15 Mins)
export async function getCoursesWithTabs() {
  try {
    const data = await fetchFromApi("course/website-list", { next: { revalidate: 900 } });
    if (data && Array.isArray(data.tabs)) {
      const fixedTabs = data.tabs.map((tab) => ({
        ...tab,
        logo: fixMediaUrl(tab.logo),
        logoSrc: fixMediaUrl(tab.logoSrc),
        image: fixMediaUrl(tab.image),
        imageSrc: fixMediaUrl(tab.imageSrc),
      }));
      return {
        ...data,
        tabs: fixedTabs,
      };
    }
    return { tabs: [], programs: [] };
  } catch (error) {
    console.error("Error fetching courses with tabs:", error);
    return { tabs: [], programs: [] };
  }
}

// 🎯 Fetch All Public Courses from Backend
export async function getCourses(params = {}) {
  const result = await getWebsiteCoursesFilter(params);
  if (result && Array.isArray(result.programs)) {
    return result.programs;
  }
  if (Array.isArray(result)) {
    return result;
  }
  return [];
}

// 🎯 Fetch Course by Slug (Cached: 15 Mins)
export async function getCourseBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = encodeURIComponent(slug.trim());

  try {
    const pageRes = await universalFetch(`university-offering-pages/v1/list/${cleanSlug}`, { next: { revalidate: 900 } });
    if (pageRes && (pageRes.success || pageRes.result || pageRes.offeringId)) {
      const page = pageRes.result || pageRes;
      const off = page.offeringId || {};
      const uni = off.universityId || {};
      const course = off.courseId || {};
      const sub = off.subCourseId || {};

      return {
        _id: page._id,
        slug: page.slug,
        isOfferingPage: true,
        offeringPage: page,
        title: course.title || course.name || page.slug,
        description: page.overviewSection?.description || course.description || "",
        categories: course.categories || [],
        universityOfferings: [
          {
            _id: off._id,
            university: uni,
            subcourses: sub._id ? [sub] : [],
            duration: off.duration,
            fees: off.fees,
            fee: off.fees,
          },
        ],
        heroMedia: page.heroMedia,
        brochurePdf: page.brochurePdf,
        admissionDeadline: page.admissionDeadline,
        overviewSection: page.overviewSection,
        whyChooseSection: page.whyChooseSection,
        admissionSection: page.admissionSection,
        skillsSection: page.skillsSection,
        learningExperience: page.learningExperience,
        instituteSection: page.instituteSection,
        careerSection: page.careerSection,
        feeSection: page.feeSection,
        faqSection: page.faqSection,
      };
    }
  } catch (e) {
    console.warn("Offering page check skipped, falling back to offering list:", e);
  }

  const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);
  if (isObjectId) {
    const detail = await fetchFromApi(`university-offerings/v1/details/${slug}`, { next: { revalidate: 900 } });
    if (detail) return detail;
  }

  const cleanQ = slug.replace(/[-_]+/g, " ");
  const offeringData = await fetchFromApi(`university-offerings/v1/list?q=${encodeURIComponent(cleanQ)}&items=50`, { next: { revalidate: 900 } });
  if (offeringData && Array.isArray(offeringData.result) && offeringData.result.length > 0) {
    const offerings = offeringData.result;
    const firstOffering = offerings[0];
    const course = firstOffering.courseId || {};
    const uni = firstOffering.universityId || {};

    const universityOfferings = offerings.map((off) => ({
      ...off,
      university: off.universityId,
      subcourses: off.subCourseId ? [off.subCourseId] : [],
      duration: off.duration,
      fees: off.fees,
      fee: off.fees,
    }));

    return {
      _id: course._id || firstOffering._id,
      slug: course.slug || slug,
      title: course.name || firstOffering.title || slug.toUpperCase(),
      name: course.name || firstOffering.title || slug.toUpperCase(),
      description: course.description || "",
      categories: course.category || [],
      universityOfferings,
      activeOffering: firstOffering,
      university: uni,
    };
  }

  return await fetchFromApi(`course/website-read?slug=${encodeURIComponent(slug)}`, { next: { revalidate: 900 } });
}

export const getWebsiteCourseRead = getCourseBySlug;

// 🎯 Fetch University Options (Cached: 15 Mins)
export async function getUniversityOptions(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.search || params.q) query.append("search", params.search || params.q);
    if (params.refresh) query.append("refresh", "true");

    const queryString = query.toString();
    const endpoint = `universities/v1/options${queryString ? `?${queryString}` : ""}`;

    const json = await universalFetch(endpoint, { next: { revalidate: 60 } });
    const list = Array.isArray(json?.result) ? json.result : (Array.isArray(json) ? json : []);
    return list.map((uni) => {
      const resolvedLogo = fixMediaUrl(uni?.image || uni?.logo || uni?.logoSrc);
      const resolvedBanner = fixMediaUrl(uni?.bannerImg || uni?.imageSrc || uni?.image);
      return {
        ...uni,
        logo: resolvedLogo,
        logoSrc: resolvedLogo,
        imageSrc: resolvedBanner || resolvedLogo,
      };
    });
  } catch (error) {
    console.error("❌ Error fetching university options:", error);
    return [];
  }
}

// 🎯 Fetch Course Options (Cached: 15 Mins)
export async function getCourseOptions(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.search || params.q) query.append("search", params.search || params.q);
    if (params.refresh) query.append("refresh", "true");

    const queryString = query.toString();
    const endpoint = `courses/v1/options${queryString ? `?${queryString}` : ""}`;

    const json = await universalFetch(endpoint, { next: { revalidate: 900 } });
    const list = Array.isArray(json?.result) ? json.result : (Array.isArray(json) ? json : []);
    return list;
  } catch (error) {
    console.error("❌ Error fetching course options:", error);
    return [];
  }
}

// 🎯 Fetch Mode Options (Cached: 15 Mins)
export async function getModeOptions(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.search || params.q) query.append("search", params.search || params.q);
    if (params.refresh) query.append("refresh", "true");

    const queryString = query.toString();
    const endpoint = `modeinfo/v1/options${queryString ? `?${queryString}` : ""}`;

    const json = await universalFetch(endpoint, { next: { revalidate: 900 } });
    const list = Array.isArray(json?.result) ? json.result : (Array.isArray(json) ? json : []);
    return list;
  } catch (error) {
    console.error("❌ Error fetching mode options:", error);
    return [];
  }
}

// 🎯 Fetch Universities Directory (Cached: 5 Mins)
export async function getUniversities(params = {}) {
  const query = new URLSearchParams();
  if (params.type) query.append("type", params.type);
  if (params.category) query.append("category", params.category);
  if (params.search) query.append("search", params.search);
  if (params.q) query.append("q", params.q);
  if (params.isTop) query.append("isTop", String(params.isTop));
  if (params.isFeatured) query.append("isFeatured", String(params.isFeatured));
  if (params.sortBy) query.append("sortBy", params.sortBy);
  query.append("items", String(params.limit || params.items || 12));
  query.append("page", String(params.page || 1));

  const queryString = query.toString();
  const endpoint = `universities/v1/list?${queryString}`;

  try {
    const json = await universalFetch(endpoint, { next: { revalidate: 300 } });
    if (json && json.success) {
      const list = Array.isArray(json.result) ? json.result : [];
      const formatted = list.map((uni) => ({
        ...uni,
        logoSrc: fixMediaUrl(uni?.logoSrc || uni?.logo),
        imageSrc: fixMediaUrl(uni?.imageSrc || uni?.bannerImg || uni?.image),
      }));
      return {
        result: formatted,
        total: typeof json.pagination?.total === "number" ? json.pagination.total : formatted.length,
        page: json.pagination?.page || params.page || 1,
        limit: json.pagination?.items || params.limit || 12,
        totalPages: json.pagination?.pages || Math.ceil(formatted.length / 12) || 1,
      };
    }
    return { result: [], total: 0 };
  } catch (error) {
    console.error("❌ Error fetching universities:", error);
    return { result: [], total: 0 };
  }
}

/**
 * Normalise a Media object URL
 */
function fixMediaUrl(media) {
  if (!media) return null;
  let raw = typeof media === "object" ? (media.url || media.path || "") : String(media);
  if (!raw) return null;

  let cleaned = raw.replace(/\s*image\s*preview\s*$/i, "").trim();
  if (!cleaned) return null;

  // If it's a raw MongoDB ObjectId string, reject it
  if (/^[0-9a-fA-F]{24}$/.test(cleaned)) {
    return null;
  }

  if (!cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
    if (!cleaned.startsWith("/") && !cleaned.includes(".") && !cleaned.includes("/")) {
      return null;
    }
    const origin = API_BASE_URL.replace(/\/api\/?$/, "");
    cleaned = `${origin}${cleaned.startsWith("/") ? "" : "/"}${cleaned}`;
  }

  return typeof media === "object" ? { ...media, url: cleaned } : cleaned;
}

// 🎯 Fetch Universities for Comparison & Instant AI Recommendations (Cached: 5 Mins)
export async function getWebsiteUniversitiesCompare(identifiers = []) {
  try {
    if (!identifiers || (Array.isArray(identifiers) && identifiers.length === 0)) {
      return { result: [], recommendations: [], totalAvailable: 0 };
    }
    const idStr = Array.isArray(identifiers) ? identifiers.join(",") : identifiers;
    const url = formatApiUrl(`universities/v1/compare?universityid=${encodeURIComponent(idStr)}`);
    const isClient = typeof window !== "undefined";
    const res = await fetch(url, isClient ? {} : { next: { revalidate: 300 } });
    if (!res.ok) return { result: [], recommendations: [], totalAvailable: 0 };
    const data = await res.json();
    const resultList = data?.result || (Array.isArray(data) ? data : []);
    const recsList = data?.recommendations || [];
    return {
      result: Array.isArray(resultList) ? resultList : [],
      recommendations: Array.isArray(recsList) ? recsList : [],
      totalAvailable: data?.totalAvailable || recsList.length,
    };
  } catch (error) {
    console.error("❌ Compare fetch error:", error);
    return { result: [], recommendations: [], totalAvailable: 0 };
  }
}

// 🧠 Fetch Smart University Recommendations Directly from Backend API (Cached: 5 Mins)
export async function getUniversityRecommendations(university = "") {
  const cleanUni = String(university || "").trim().toLowerCase();
  if (!cleanUni) return { recommendations: [], totalAvailable: 0, baseUniversity: null };
  const res = await getWebsiteUniversitiesCompare([cleanUni]);
  return {
    recommendations: res?.recommendations || [],
    totalAvailable: res?.totalAvailable || 0,
    baseUniversity: res?.result?.[0] || null,
  };
}

// 🎯 Fetch University by Slug (Cached: 15 Mins)
export async function getUniversityBySlug(slug) {
  if (!slug) return null;
  const data = await universalFetch(`universities/v1/details/${encodeURIComponent(slug)}`, { next: { revalidate: 900 } });
  return data?.result || data || null;
}

// 🎯 Fetch Dynamic Hero Section (Cached: 15 Mins)
export async function getWebsiteHero(page = "home") {
  try {
    const data = await fetchFromApi(`hero/website-read?page=${page}`, { next: { revalidate: 900 } });
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

// 🎯 Fetch Blog Page Details by Slug (Cached: 15 Mins)
export async function getBlogBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = encodeURIComponent(slug.trim());
  return await fetchFromApi(`blogpages/v1/list/${cleanSlug}`, { next: { revalidate: 900 } });
}

// 🎯 Fetch Dynamic Page Builder by Slug (Cached: 15 Mins)
export async function getWebsitePageBySlug(slug) {
  if (!slug) return null;
  const response = await fetchFromApi(`page/website-read?slug=${slug}`, { next: { revalidate: 900 } });
  if (response && response.success && response.result) {
    return response.result;
  }
  return response?.result || response || null;
}

// 🎯 Fetch University Offering Landing Page Details by Slug (Cached: 15 Mins)
export async function getUniversityOfferingPageBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = encodeURIComponent(slug.trim());
  return await fetchFromApi(`university-offering-pages/v1/list/${cleanSlug}`, { next: { revalidate: 900 } });
}

// 🎯 Fetch Blogs (Cached: 15 Mins)
export async function getWebsiteBlogs(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.page) query.set("page", params.page);
    if (params.items || params.limit) query.set("items", params.items || params.limit);
    if (params.category) query.set("category", params.category);
    if (params.search || params.q) query.set("search", params.search || params.q);
    if (params.isTrending) query.set("isTrending", "true");
    if (params.isTop) query.set("isTop", "true");
    if (params.isFeatured) query.set("isFeatured", "true");
    if (params.sortBy) query.set("sortBy", params.sortBy);

    const queryString = query.toString() ? `?${query.toString()}` : "";
    const data = await universalFetch(`blogs/v1/list${queryString}`, { next: { revalidate: 900 } });
    if (data && data.success && Array.isArray(data.result)) {
      return {
        blogs: data.result,
        pagination: data.pagination || { page: 1, pages: 1, count: data.result.length },
      };
    }
    return { blogs: [], pagination: { page: 1, pages: 1, count: 0 } };
  } catch (error) {
    console.error("❌ Error fetching website blogs:", error);
    return { blogs: [], pagination: { page: 1, pages: 1, count: 0 } };
  }
}

export const getBlogs = async (params = {}) => {
  const data = await getWebsiteBlogs(params);
  return data?.blogs || [];
};

// 🏛️ Public University Landing Page API (Cached: 15 Mins)
export async function getUniversityPageBySlug(slug) {
  try {
    const raw = await universalFetch(`universities/v1/list/${slug}`, { next: { revalidate: 900 } });
    if (raw && raw.success && raw.result) {
      return raw.result;
    }
    return null;
  } catch (error) {
    console.error(`❌ Error fetching university page for ${slug}:`, error);
    return null;
  }
}
