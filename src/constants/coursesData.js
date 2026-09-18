import { API_BASE_URL, getFetchCacheOptions } from "@/config";

/* =========================================================
   TABS & PROGRAMS (DYNAMICALLY FETCHED FROM MONGO DB API)
========================================================= */

export const tabs = [];
export const programs = [];

/* =========================================================
   NEXT.JS DYNAMIC DATA FETCHING WITH CACHE (ISR: 300s)
========================================================= */

export async function getCoursesData() {
  try {
    const res = await fetch(`${API_BASE_URL}courses/website-list`, getFetchCacheOptions(300, "courses"));

    if (!res.ok) {
      return { tabs: [], programs: [] };
    }

    const data = await res.json();
    if (data && data.success && data.result) {
      return {
        tabs: data.result.tabs || [],
        programs: data.result.programs || [],
      };
    }

    return { tabs: [], programs: [] };
  } catch (error) {
    console.warn("Error fetching courses from API:", error?.message);
    return { tabs: [], programs: [] };
  }
}
