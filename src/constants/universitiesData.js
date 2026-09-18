import { API_BASE_URL, getFetchCacheOptions } from "@/config";

/* =========================================================
   UNIVERSITIES DATA (DYNAMICALLY FETCHED FROM MONGO DB API)
========================================================= */

export const universities = [];

/* =========================================================
   NEXT.JS DYNAMIC DATA FETCHING WITH CACHE (ISR: 300s)
========================================================= */

export async function getUniversitiesData(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.type) query.append("type", params.type);
    if (params.limit) query.append("limit", params.limit);
    if (params.page) query.append("page", params.page);

    const queryString = query.toString();
    const url = `${API_BASE_URL}universities/website-list${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, getFetchCacheOptions(300, "universities"));

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    if (data && data.success && data.result) {
      return Array.isArray(data.result) ? data.result : [];
    }

    return [];
  } catch (error) {
    console.warn("Error fetching universities from API:", error?.message);
    return [];
  }
}
