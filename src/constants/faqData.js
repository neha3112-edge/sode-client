import { API_BASE_URL } from "@/config";

/* =========================================================
   FAQ DATA
========================================================= */

export const faqs = [
  {
    q: "Are the degrees and certificates from these programs globally recognised?",
    a: "Yes. All programs of Top International Global Universities that are offered through SODE are from accredited institutions such as WES-recognised, AACSB-accredited, or approved by British/Swiss/US agencies, ensuring global validity.",
  },
  {
    q: "What documents are typically required during the application process?",
    a: "Professionals are required to have a structured document set of 10th and 12th marksheets, Bachelors degree certificate/marksheets, and Master's degree certificate/marksheets. Also, they need to have valid identity proofs, such as an Aadhaar Card and a PAN Card, for verification purposes. Candidates applying for programmes with work experience criteria must also provide an experience letter. A recent passport-size photograph is required to complete the application and enrollment process.",
  },
  {
    q: "Is there an entrance exam required to enrol in any executive educational programs?",
    a: "No, there is no entrance exam required for executive educational programs . Applicants can enrol easily having bachelors and masters degree, and some programs require prior work experience.",
  },
  {
    q: "Are there any scholarships available for programs listed on SODE?",
    a: "Yes, SODE offers flexible financing options where aspirants can enrol with NO cost EMI. As per the course duration, they can easily balance and divide it per month.",
  },
  {
    q: "Are these degrees valid in India and internationally?",
    a: "Yes. All university partners listed on SODE include international universities like Golden Gate University, which is WES & AACSB accredited, Rushford Business School is QS 5-star rated, and Edgewood, which holds ACBSP accreditation, making them globally excellent. Indian institutions like IIMs and IITs are government-recognised under UGC norms.",
  },
  {
    q: "What is the minimum work experience required to enrol in Executive Management Programs & Certification Courses?",
    a: "SODE offers a diverse portfolio of executive management programmes and certifications designed to equip professionals with technological skills powered by Data science, AI, and ML needed for upskilling. Most Executive Management Programs and Certification Courses require candidates to have a minimum of 3 years of professional work experience, although eligibility criteria may vary depending on the programme and partnering university.",
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
    if (data && data.success && data.result) {
      return data.result || faqs;
    }

    return faqs;
  } catch (error) {
    console.warn("Using static fallback for FAQ data:", error?.message);
    return faqs;
  }
}
