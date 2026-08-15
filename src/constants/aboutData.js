import { API_BASE_URL } from "@/config";
import { getAssetPath } from "@/lib/utils";

/* =========================================================
   ABOUT SECTION CARDS DATA
========================================================= */

export const leftCards = [
  {
    title: "Personalised One-to-One Mentorship",
    desc: "Enriched learning and guidance through industry experts.",
    icon: getAssetPath("/assets/images/icon-1.png"),
    css: "w-full",
  },
  {
    title: "Empowering Careers Through Global Exposure",
    desc: "Join the global community of business executives.",
    icon: getAssetPath("/assets/images/icon-2.png"),
    css: "md:w-[90%]",
  },
  {
    title: "AI-Driven Course Comparison Features",
    desc: "Find your Perfect Programme Match with AI recommendation.",
    icon: getAssetPath("/assets/images/icon-3.png"),
    css: "w-full",
  },
];

export const rightCards = [
  {
    title: "Offers Affordable Pathways to Global Education",
    desc: "Access to flexible financing options like No Cost EMI.",
    icon: getAssetPath("/assets/images/icon-4.png"),
    css: "w-full",
  },
  {
    title: "Seamless Support Throughout Your Learning",
    desc: "Provide post-enrollment support to every learner.",
    icon: getAssetPath("/assets/images/icon-5.png"),
    css: "md:w-[90%]",
  },
  {
    title: "Elevating Futures towards Professional Excellence",
    desc: "Join a prestigious alumni network that empowers lifelong growth.",
    icon: getAssetPath("/assets/images/icon-6.png"),
    css: "w-full",
  },
];

/* =========================================================
   NEXT.JS DYNAMIC DATA FETCHING WITH CACHE (ISR: 300s)
========================================================= */

export async function getAboutData() {
  try {
    const res = await fetch(`${API_BASE_URL}about/website-data`, {
      next: {
        revalidate: 300, // 5 minutes cache
      },
    });

    if (!res.ok) {
      return { leftCards, rightCards };
    }

    const data = await res.json();
    if (data && data.success && data.result) {
      return {
        leftCards: data.result.leftCards || leftCards,
        rightCards: data.result.rightCards || rightCards,
      };
    }

    return { leftCards, rightCards };
  } catch (error) {
    console.warn("Using static fallback for about data:", error?.message);
    return { leftCards, rightCards };
  }
}
