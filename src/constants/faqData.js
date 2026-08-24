import { API_BASE_URL } from "@/config";

export const faqs = [
  {
    q: "How does the admission process work?",
    a: "Our expert counsellors guide you step-by-step from choosing the right UGC-recognized university to course selection, document verification, and direct admission.",
    category: "Admission",
  },
  {
    q: "Are the online & distance degree programs recognized?",
    a: "Yes, all our partner universities are accredited by UGC-DEB, AICTE, AIU, and NAAC, ensuring full validity for government jobs, higher education, and corporate careers.",
    category: "General",
  },
  {
    q: "Can I pay the program fees in installments (EMI)?",
    a: "Yes, 0% interest EMI and flexible semester-wise fee payment options are available across almost all degree programs.",
    category: "Fees",
  },
  {
    q: "How will the classes and exams be conducted?",
    a: "Lectures, study materials, and assessments are delivered online via university learning management portals (LMS) with flexible weekend sessions for working professionals.",
    category: "Academics",
  },
];

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
      return faqs;
    }

    const data = await res.json();
    if (data && data.success && Array.isArray(data.result) && data.result.length > 0) {
      return data.result.map((item) => ({
        q: item.question || item.q,
        a: item.answer || item.a,
        category: item.category,
      }));
    }

    return faqs;
  } catch (error) {
    return faqs;
  }
}
