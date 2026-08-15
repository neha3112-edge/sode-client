"use client";

import useSWR from "swr";
import { defaultFetcher } from "@/components/providers/SWRProvider";

/**
 * Hook to filter/search courses with SWR caching, instant fallback, and pagination
 */
export function useCoursesFilter(params = {}, fallbackData = null) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.category && params.category !== "all") query.set("category", params.category);
  if (params.subcategory && params.subcategory !== "all") query.set("subcategory", params.subcategory);
  if (params.subcourse && params.subcourse !== "all") query.set("subcourse", params.subcourse);
  if (Array.isArray(params.university) && params.university.length > 0) query.set("university", params.university.join(","));
  if (Array.isArray(params.course) && params.course.length > 0) query.set("course", params.course.join(","));
  if (params.duration && params.duration !== "all") query.set("duration", params.duration);
  if (params.fee && params.fee !== "all") query.set("fee", params.fee);
  if (params.sort) query.set("sort", params.sort);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));

  const queryString = query.toString();
  const url = `/api/website/courses${queryString ? `?${queryString}` : ""}`;

  const { data, error, isLoading, mutate } = useSWR(url, defaultFetcher, {
    fallbackData,
    keepPreviousData: true,
  });

  const progs = Array.isArray(data?.programs) ? data.programs : (Array.isArray(data) ? data : []);

  return {
    programs: progs,
    total: typeof data?.total === "number" ? data.total : progs.length,
    totalPages: typeof data?.totalPages === "number" ? data.totalPages : 1,
    page: data?.page || 1,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

/** Hook to fetch single course details by slug */
export function useCourseBySlug(slug, fallbackData = null) {
  const url = slug ? `/api/website/courses/${encodeURIComponent(slug)}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, defaultFetcher, { fallbackData });
  return { course: data?.program || data || null, isLoading, isError: !!error, error, mutate };
}

/** Hook to fetch all categories and tree */
export function useCategories(fallbackData = null) {
  const { data, error, isLoading, mutate } = useSWR("/api/website/categories", defaultFetcher, { fallbackData });
  const rawList = Array.isArray(data?.result)
    ? data.result
    : Array.isArray(data?.categories)
    ? data.categories
    : Array.isArray(data)
    ? data
    : [];
  return {
    categories: rawList,
    tree: rawList,
    result: rawList,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

/** Hook to fetch single category details by slug */
export function useCategoryBySlug(slug, fallbackData = null) {
  const url = slug ? `/api/website/categories/${encodeURIComponent(slug)}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, defaultFetcher, { fallbackData });
  return {
    category: data?.category || null,
    children: data?.subcategories || data?.children || [],
    subcategories: data?.subcategories || [],
    items: data?.result || [],
    targetType: data?.targetType || null,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

/** Hook to fetch universities */
export function useUniversities(params = {}, fallbackData = null) {
  const query = new URLSearchParams();
  if (params.type && params.type.toLowerCase() !== "all") query.set("type", params.type);
  if (params.category && params.category !== "all") query.set("category", params.category);
  if (params.search) query.set("search", params.search);
  if (params.limit) query.set("limit", String(params.limit));
  if (params.page) query.set("page", String(params.page));

  const queryString = query.toString();
  const url = `/api/website/universities${queryString ? `?${queryString}` : ""}`;

  const { data, error, isLoading, mutate } = useSWR(url, defaultFetcher, { fallbackData });

  const rawList = Array.isArray(data?.result) ? data.result : (Array.isArray(data) ? data : []);

  return {
    universities: rawList,
    total: typeof data?.total === "number" ? data.total : rawList.length,
    page: data?.page || params.page || 1,
    limit: data?.limit || params.limit || 10,
    totalPages: data?.totalPages || 1,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

/** Hook to fetch single university by slug */
export function useUniversityBySlug(slug, fallbackData = null) {
  const url = slug ? `/api/website/universities/${encodeURIComponent(slug)}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, defaultFetcher, { fallbackData });
  return { university: data || null, isLoading, isError: !!error, error, mutate };
}

/** Hook to fetch comparison data for multiple universities */
export function useUniversitiesCompare(slugs = []) {
  const slugStr = Array.isArray(slugs) ? slugs.join(",") : slugs;
  const url = slugStr ? `/api/website/universities/compare?slugs=${encodeURIComponent(slugStr)}` : null;

  const { data, error, isLoading, mutate } = useSWR(url, defaultFetcher);
  return {
    compareData: Array.isArray(data) ? data : [],
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

/** Hook to fetch hero banner section */
export function useHero(page = "home", fallbackData = null) {
  const url = `/api/website/hero?page=${encodeURIComponent(page)}`;
  const { data, error, isLoading, mutate } = useSWR(url, defaultFetcher, { fallbackData });
  return { hero: data || null, isLoading, isError: !!error, error, mutate };
}

/** Hook to fetch blogs list */
export function useBlogs(fallbackData = null) {
  const { data, error, isLoading, mutate } = useSWR("/api/website/blogs", defaultFetcher, { fallbackData });
  return { blogs: Array.isArray(data) ? data : [], isLoading, isError: !!error, error, mutate };
}

/** Hook to fetch single blog by slug */
export function useBlogBySlug(slug, fallbackData = null) {
  const url = slug ? `/api/website/blogs/${encodeURIComponent(slug)}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, defaultFetcher, { fallbackData });
  return { blog: data || null, isLoading, isError: !!error, error, mutate };
}

/** Hook to fetch filter dropdown options (durations, fees, universities, categories, courses, subcourses) */
export function useFilterOption(optionType) {
  const url = optionType ? `/api/website/options/${optionType}` : null;
  const { data, error, isLoading } = useSWR(url, defaultFetcher);
  return { options: Array.isArray(data) ? data : [], isLoading, isError: !!error };
}
