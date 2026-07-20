import { API_BASE_URL } from "@/config";

export const faqs = [];

/* =========================================================
   NEXT.JS DYNAMIC DATA FETCHING WITH CACHE (ISR: 300s)
========================================================= */

export async function getFaqData() {
  try {
    const res = await fetch(`${API_BASE_URL}faq/website-list`, {
      next: {
        revalidate: 300, // 5 minutes cache
      },
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    if (data && data.success && Array.isArray(data.result)) {
      return data.result.map((item) => ({
        q: item.question || item.q,
        a: item.answer || item.a,
        category: item.category,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching dynamic FAQ data:", error?.message);
    return [];
  }
}
