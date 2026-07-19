import { API_BASE_URL } from "@/config";

/* =========================================================
   UNIVERSITIES DATA (DYNAMICALLY FETCHED FROM MONGO DB API)
========================================================= */

export const universities = [];

/* =========================================================
   NEXT.JS DYNAMIC DATA FETCHING WITH CACHE (ISR: 300s)
========================================================= */

export async function getUniversitiesData() {
  try {
    const res = await fetch(`${API_BASE_URL}universities/website-list`, {
      next: {
        revalidate: 300, // Revalidate cache every 5 minutes (300 seconds)
      },
    });

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
