import { API_BASE_URL } from "@/config";

/* =========================================================
   TESTIMONIALS DATA
========================================================= */

export const testimonials = [
  {
    name: "Arunachala Raam S",
    role: "Chief Business Officer at Adhvx Industries",
    program: "Online DBA from ESGCI Paris",
    content:
      "I have enrolled in DBA from ESGCI Paris. It has provided me with a strategic perspective on leadership and business transformation. The research-driven approach of the program has strengthened my ability to make data-backed decisions while I continue to balance my executive responsibilities and organisational growth.",
  },
  {
    name: "Sanketh Kommera",
    role: "Training Coordinator – SAP at GSY Technologies",
    program:
      "Professional Certificate Programme in HR Management & Analytics | IIM Kozhikode",
    content:
      "The IIM Kozhikode HR Analytics programme helped me bridge the gap between technology and people management. This course offered me practical insights into workforce analytics and modern HR practices.Also it has enhanced my effectiveness in training and talent development initiatives.",
  },
  {
    name: "Shreshta Kuryalkar",
    role: "Associate, Buying Operations at Saks Global",
    program:
      "Professional Certificate Programme in HR Management & Analytics | IIM Kozhikode",
    content:
      "This HR Analytics programme broadened my understanding of people strategy and analytics. It gave me valuable perspectives going beyond operational responsibilities.I got an opportunity to learn from experienced faculty and peers, which all made the journey enriching and immediately applicable in my professional role.",
  },
  {
    name: "Ashwini Madhusudhan",
    role: "Digital Operations Executive at Business Standard Newspaper",
    program:
      "Professional Certificate Programme in HR Management & Analytics | IIM Kozhikode",
    content:
      "IIM Kozhikode's HR Analytics programme was a game-changer for me.It offered a perfect blend of business understanding and analytical thinking. I worked for so many years, and had Professional experience, yet the curriculum helped me develop a stronger theoretical knowledge for data-driven decision-making in modern organisations needed for upskilling.",
  },
];

/* =========================================================
   NEXT.JS DYNAMIC DATA FETCHING WITH CACHE (ISR: 300s)
========================================================= */

export async function getTestimonialsData() {
  try {
    const res = await fetch(`${API_BASE_URL}testimonials/website-list`, {
      next: {
        revalidate: 300, // 5 minutes cache
      },
    });

    if (!res.ok) {
      return testimonials;
    }

    const data = await res.json();
    if (data && data.success && data.result) {
      return data.result || testimonials;
    }

    return testimonials;
  } catch (error) {
    console.warn("Using static fallback for testimonials data:", error?.message);
    return testimonials;
  }
}
