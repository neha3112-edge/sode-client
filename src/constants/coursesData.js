import { API_BASE_URL } from "@/config";

/* =========================================================
   TABS
========================================================= */

export const tabs = [
  {
    id: "all",
    label: "All Programs",
  },
  {
    id: "doctorate",
    label: "Doctorate",
  },
  {
    id: "certification",
    label: "Certifications",
  },
  {
    id: "executive",
    label: "Executive Programs",
  },
  {
    id: "master",
    label: "Master",
  },
];

/* =========================================================
   PROGRAMS
========================================================= */

export const programs = [
  /* =========================
     DOCTORATE PROGRAMS
  ========================== */
  {
    category: "doctorate",
    image: "/assets/images/docrorate-1.png",
    logo: "/assets/images/ggu-logo.jpg",
    title: "Doctor of Business Administration",
    university: "Golden Gate University",
    description:
      "Professionals can elevate their executive leadership capabilities with an elite online DBA. The business doctorate online through Golden Gate DBA drives strategic impact and growth.",
    duration: "27 Months",
    eligibility:
      "Masters Degree or Bachelors Degree with 5+ years of work experience.",
    brochureUrl: "/assets/pdf/ggu_dba.pdf",
  },
  {
    category: "doctorate",
    image: "/assets/images/docrorate-2.png",
    logo: "/assets/images/rushford-logo.jpg",
    title: "Doctor of Business Administration",
    university: "Rushford University",
    description:
      "The program empowers executive leadership through Rushford DBA. This elite online DBA delivers strategic advantage through business doctorate online learning, which is globally recognised.",
    duration: "36 Months",
    eligibility:
      "Masters Degree or Bachelors Degree with 3+ years of work experience.",
    brochureUrl: "/assets/pdf/rushford_dba.pdf",
  },
  {
    category: "doctorate",
    image: "/assets/images/docrorate-3.png",
    logo: "/assets/images/esgci-logo.jpg",
    title: "Doctor of Business Administration",
    university: "ESGCI",
    description:
      "Professionals get an edge to elevate leadership through ESGCI's Online DBA. This business doctorate for working professionals helps them in pursuing executive, elite, strategic growth.",
    duration: "24 Months",
    eligibility:
      "Masters Degree or Bachelor's Degree with 3+ years of work experience.",
    brochureUrl: "/assets/pdf/esgci_dba.pdf",
  },
  {
    category: "doctorate",
    image: "/assets/images/docrorate-4.png",
    logo: "/assets/images/ssbm-logo.jpg",
    title: "Doctor of Business Administration",
    university: "SSBM",
    description:
      "Executives scale their executive leadership through SSBM Geneva Online DBA. This strategic doctorate for working professionals helps in seeking elite doctorate online advancement.",
    duration: "36 Months",
    eligibility:
      "Bachelor's Degree with a minimum of 5 years of experience or Master's degree.",
    brochureUrl: "/assets/pdf/ssbm_dba.pdf",
  },
  {
    category: "doctorate",
    image: "/assets/images/docrorate-5.png",
    logo: "/assets/images/edgewood-logo.jpg",
    title: "Doctor of Business Administration",
    university: "Edgewood University",
    description:
      "Leaders redefine leadership excellence through Edgewood University Online DBA. This strategic doctorate online for working professionals worldwide enhances their abilities, impacting organisational growth.",
    duration: "24 Months",
    eligibility: "Master's Degree",
    brochureUrl: "/assets/pdf/edgewood_dba.pdf",
  },
  {
    category: "doctorate",
    image: "/assets/images/docrorate-6.png",
    logo: "/assets/images/edgewood-logo.jpg",
    title: "MBA + DBA",
    university: "Edgewood University",
    description:
      "Learners accelerate executive leadership through Edgewood University Online MBA + DBA. This combined degree of online DBA and online MBA curates knowledge of business, finance and management.",
    duration: "30 Months",
    eligibility: "Bachelors degree",
    brochureUrl: "/assets/pdf/edgewood_dba_mba.pdf",
  },

  /* =========================
     CERTIFICATION PROGRAMS
  ========================== */
  {
    category: "certification",
    image: "/assets/images/certification-1.webp",
    logo: "/assets/images/iim-logo.jpg",
    title: "Professional Certificate Programme in HR Management and Analytics",
    university: "IIM Kozhikode",
    description:
      "The Online HR Analytics helps professionals to gain Hr Analytics certification and gain expertise in workforce decision making and people analytics certification from IIM Kozhikode.",
    duration: "6 Month",
    eligibility: "Bachelors degree (Min. 3 yr Work Exp)",
    brochureUrl: "/assets/pdf/iim_main_brochure.pdf",
  },
  {
    category: "certification",
    image: "/assets/images/certification-2.webp",
    logo: "/assets/images/iiitb-logo.jpg",
    title:
      "Professional Certificate Programme in Data Science with Generative AI",
    university: "IIIT Bangalore",
    description:
      "This Generative AI certification is for early-career professionals who wish to transition through an AI and data science course.",
    duration: "6 Month",
    eligibility: "Bachelors or Master’s Degree",
    brochureUrl: "/assets/pdf/IIITB_PCP_in_DS_with_GI.pdf",
  },
  {
    category: "certification",
    image: "/assets/images/certification-3.webp",
    logo: "/assets/images/iiitb-logo.jpg",
    title: "Executive Post Graduate Certificate Programme in Data Science & AI",
    university: "IIIT Bangalore",
    description:
      "This helps to gain credentials in both artificial intelligence certification and data analytics certification, offering in-depth knowledge in Data Science and ML.",
    duration: "6 Month",
    eligibility: "Bachelors or Master’s Degree",
    brochureUrl: "/assets/pdf/IIITB_EPGC_DS_AI.pdf",
  },
  {
    category: "certification",
    image: "/assets/images/certification-4.webp",
    logo: "/assets/images/iitkgp-logo.jpg",
    title: "Executive Post Graduate Certificate in Generative AI & Agentic AI",
    university: "IIT Kharagpur",
    description:
      "This Generative AI certification is for early-career professionals who wish to transition through an AI and data science course.",
    duration: "6 Month",
    eligibility: "Bachelors or Master’s Degree",
    brochureUrl: "/assets/pdf/iitkgp_main_brochure.pdf",
  },
  {
    category: "certification",
    image: "/assets/images/certification-5.webp",
    logo: "/assets/images/mica-logo.jpg",
    title: "Advanced Certificate in Digital Marketing & Communication",
    university: "MICA",
    description:
      "MICA offers an Advanced Certificate, which empowers careers through an online digital marketing course for ambitious learners, gaining a Digital Marketing Certificate.",
    duration: "4 Month",
    eligibility: "Bachelors Degree",
    brochureUrl: "/assets/pdf/mica_digital_marketing_and_communication.pdf",
  },
  {
    category: "certification",
    image: "/assets/images/certification-6.webp",
    logo: "/assets/images/mica-logo.jpg",
    title: "Advanced Certificate in Digital Brand Communication Strategy",
    university: "MICA",
    description:
      "The program strengthens strategic brand management capabilities through MICA's Advanced Certificate, enterprising brand-building course and communication strategy course expertise.",
    duration: "7 Month",
    eligibility: "Bachelors Degree",
    brochureUrl: "/assets/pdf/mica_digital_brand_communication_strategy.pdf",
  },

  /* =========================
     EXECUTIVE PROGRAMS
  ========================== */
  {
    category: "executive",
    image: "/assets/images/executive-1.webp",
    logo: "/assets/images/iiitb-logo.jpg",
    title: "Executive Programme in Generative AI for Leaders",
    university: "IIIT Bangalore",
    description:
      "The Generative AI certification is offered in this AI leadership program, enriching professionals with AI for decision-making and empowering AI for business leaders.",
    duration: "5 Month",
    eligibility: "Bachelor's or Master’s Degree (Min. 4 years Work Experience)",
    brochureUrl:
      "/assets/pdf/iiitb_Executive_Program_in_Generative_AI_for_Leaders.pdf",
  },
  {
    category: "executive",
    image: "/assets/images/executive-2.webp",
    logo: "/assets/images/iiitb-logo.jpg",
    title: "Executive Post Graduate Programme in Applied AI and Agentic AI",
    university: "IIIT Bangalore",
    description:
      "This certification program helps future-ready professionals advance their careers with an agentic AI course and an applied AI course, gaining AI agents certification.",
    duration: "30 Weeks",
    eligibility: "Bachelor's or Master’s Degree",
    brochureUrl: "/assets/pdf/IIITB_Applied_AI_and_Agentic_AI.pdf",
  },
  {
    category: "executive",
    image: "/assets/images/executive-3.webp",
    logo: "/assets/images/iiitb-logo.jpg",
    title: "Chief Technology Officer & AI Leadership Programme",
    university: "IIIT Bangalore",
    description:
      "The Chief Technology Officer program empowers leaders through a technology management course focused on digital transformation leadership.",
    duration: "6 Month",
    eligibility: "Bachelor's or Master’s Degree (Min. 8 years Work Experience)",
    brochureUrl: "/assets/pdf/IIITB_CTOAI_leadership_program.pdf",
  },

  /* =========================
     MASTER PROGRAMS
  ========================== */
  {
    category: "master",
    image: "/assets/images/master-1.webp",
    logo: "/assets/images/ggu-logo.jpg",
    title: "Master of Business Administration",
    university: "Golden Gate University",
    description:
      "This elite educational program of Golden Gate University's online MBA advances careers for working professionals. This features fast track global MBA program with online flexibility and leadership focus development.",
    duration: "13 Months",
    eligibility: "Bachelor's Degree",
    brochureUrl: "/assets/pdf/ggu_mba.pdf",
  },
  {
    category: "master",
    image: "/assets/images/master-2.webp",
    logo: "/assets/images/liverpool-logo.png",
    title: "Master of Business Administration",
    university: "Liverpool Business School",
    description:
      "Professionals can accelerate growth through Liverpool Business Schools online MBA, designed for working professionals. It helps in seeking one year executive MBA online with additional months for specialisations, equipping advancement globally.",
    duration: "18 Months",
    eligibility: "Bachelor's Degree",
    brochureUrl: "/assets/pdf/ssbm_main_brochure.pdf",
  },
  {
    category: "master",
    image: "/assets/images/master-3.webp",
    logo: "/assets/images/liverpool-iiitb-logo.png",
    title: "M.Sc. Data Science",
    university: "LJMU + IIIT Bangalore",
    description:
      "This program transforms the expertise of learners with LJMU and IITB's Masters in data science. Overall, this MSc Data Science online learning offers industry-ready analytics skills.",
    duration: "18 Months",
    eligibility: "Bachelor’s degree",
    brochureUrl: "/assets/pdf/liverpool_mba.pdf",
  },
  {
    category: "master",
    image: "/assets/images/master-4.webp",
    logo: "/assets/images/liverpool-iiitb-logo.png",
    title: "M.Sc. Machine Learning & AI",
    university: "LJMU + IIIT Bangalore",
    description:
      "Professionals lead innovation through LJMU and IITB artificial intelligence masters program. This is a blended masters in AI and ML with an advanced skill set and global excellence.",
    duration: "18 Months",
    eligibility: "Bachelor’s degree",
    brochureUrl: "/assets/pdf/iiitb_msc_ds.pdf",
  },
  {
    category: "master",
    image: "/assets/images/master-5.webp",
    logo: "/assets/images/iiitb-logo.jpg",
    title: "Executive Diploma in Machine Learning & AI",
    university: "IIIT Bangalore",
    description:
      "This Master program is in emerging technologies and offers expertise in Machine learning through IIIT Bangalore. This artificial intelligence diploma integrates machine learning certification and deep learning course concepts for leadership roles.",
    duration: "18 Months",
    eligibility: "Bachelors or Masters Degree",
    brochureUrl: "/assets/pdf/iiitb_msc_ml_ai.pdf",
  },
];

/* =========================================================
   NEXT.JS DYNAMIC DATA FETCHING WITH CACHE (ISR: 300s)
========================================================= */

export async function getCoursesData() {
  try {
    const res = await fetch(`${API_BASE_URL}courses/website-list`, {
      next: {
        revalidate: 300, // Revalidate cache every 5 minutes (300 seconds)
      },
    });

    if (!res.ok) {
      return { tabs, programs };
    }

    const data = await res.json();
    if (data && data.success && data.result) {
      return {
        tabs: data.result.tabs || tabs,
        programs: data.result.programs || programs,
      };
    }

    return { tabs, programs };
  } catch (error) {
    console.warn("Using static fallback for courses data:", error?.message);
    return { tabs, programs };
  }
}
