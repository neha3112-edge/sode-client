import { API_BASE_URL } from "@/config";

/* =========================================================
   FOOTER DATA
========================================================= */

export const UNIVERSITIES = [
  "Golden Gate University",
  "Rushford University",
  "ESGCI Paris",
  "SSBM GENEVA",
  "IIIT Bangalore",
  "Liverpool Business School",
  "IIM Kozhikode",
  "MICA",
];

export const PROGRAMS = [
  "Doctorate · DBA",
  "Master · MBA",
  "DBA + MBA Dual",
  "HR Analytics",
  "Data Science & AI",
  "Certifications",
  "Executive Programs",
];

/* =========================================================
   NEXT.JS DYNAMIC DATA FETCHING WITH CACHE (ISR: 300s)
========================================================= */

export async function getFooterData() {
  try {
    const res = await fetch(`${API_BASE_URL}footer/website-data`, {
      next: {
        revalidate: 300, // 5 minutes cache
      },
    });

    if (!res.ok) {
      return { universities: UNIVERSITIES, programs: PROGRAMS };
    }

    const data = await res.json();
    if (data && data.success && data.result) {
      return {
        universities: data.result.universities || UNIVERSITIES,
        programs: data.result.programs || PROGRAMS,
      };
    }

    return { universities: UNIVERSITIES, programs: PROGRAMS };
  } catch (error) {
    console.warn("Using static fallback for footer data:", error?.message);
    return { universities: UNIVERSITIES, programs: PROGRAMS };
  }
}
