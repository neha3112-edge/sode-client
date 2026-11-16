// GGU constants and helpers
export const gguImg = (name) => {
  if (!name) return "";
  if (name.startsWith("http://") || name.startsWith("https://") || name.startsWith("/")) {
    return name;
  }
  return `/assets/ggu/${name}`;
};

export const GGU_NAV_LINKS = [
  { label: "Courses", href: "#courses" },
  { label: "Approvals", href: "#approvals" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faqs" },
];

export const GGU_COURSES_DROPDOWN = [
  "DBA in Finance",
  "DBA in Marketing",
  "DBA in Leadership",
  "DBA in General",
  "DBA in Business Analytics",
  "DBA in Generative AI",
  "MBA in Business Analytics Concentration",
  "MBA in Industrial Organizational Psychology Concentration",
  "MBA in Information Technology Management",
  "MBA in Finance",
  "MBA in Marketing",
  "MBA in Adaptive Leadership",
  "MBA in General",
];

// Main Programmes (Courses Offered section)
export const GGU_MAIN_PROGRAMMES = [
  {
    id: "mba",
    code: "MBA",
    title: "Master of Business Administration (MBA)",
    badge: "MASTER",
    category: "Master",
    duration: "20 months (online + optional on-campus pathway)",
    eligibility: "Master's or Bachelor's Degree with 5+ years of experience.",
    description:
      "A US-approved or practice-driven program that offers both from Golden Gate University MBA online. The course builds strong leadership skills, strategic thinking, and data-informed decision-making skills. The University faculty is from a San Francisco-based scholar-practitioner with years of experience.",
    image: "master-mba-ggu.webp",
  },
  {
    id: "dba",
    code: "DBA",
    title: "Doctor of Business Administration (DBA)",
    badge: "DOCTORATE",
    category: "Doctorate",
    duration: "36 months | 56 credits",
    eligibility: "Recognised degree in Bachelor’s University",
    description:
      "A degree that is flexible and recognised, the online DBA at Golden Gate University is an advanced doctoral program that is for senior-level leaders, consultants, and academics. The course focuses on research, problem-solving, and an original dissertation that talks about real-life business challenges.",
    image: "doctorate-dba-ggu.webp",
  },
];

// Specializations by Tab
export const GGU_SPECIALIZATIONS = {
  dba: [
    {
      id: "dba-general",
      title: "Online DBA in General",
      description:
        "Pursue a broad, interdisciplinary approach to advanced business challenges. Customize your research to address complex issues across multiple business functions.",
      image: "general-ggu.webp",
    },
    {
      id: "dba-ai",
      title: "Online DBA in Generative AI",
      description:
        "Investigate the strategic implementation and ethical governance of AI in the business sector. Develop skills to lead innovation and leverage generative AI for competitive advantage.",
      image: "generative-ai-ggu.webp",
    },
    {
      id: "dba-finance",
      title: "Online DBA in Finance",
      description:
        "Master advanced financial theory and quantitative analysis. Prepare for leadership roles in corporate finance, investment banking, and economic consulting.",
      image: "finance-ggu.webp",
    },
    {
      id: "dba-leadership",
      title: "Online DBA in Leadership",
      description:
        "Develop sophisticated strategies for leading organizational change. Enhance your ability to solve complex human capital and strategic management challenges.",
      image: "leadership-ggu.webp",
    },
    {
      id: "dba-analytics",
      title: "Online DBA in Business Analytics",
      description:
        "Learn to transform big data into actionable business intelligence. Build expertise in predictive modeling, data mining, and executive data-driven decision-making.",
      image: "business-analytics-ggu.webp",
    },
    {
      id: "dba-marketing",
      title: "Online DBA in Marketing",
      description:
        "Explore advanced research on consumer behavior and brand management strategies. Gain mastery in digital marketing analytics and global marketing campaign development.",
      image: "marketing-ggu.webp",
    },
  ],
  mba: [
    {
      id: "mba-itm",
      title: "IT Management",
      description:
        "Emphasizes digital transformation, IT management, data structures, and software engineering leadership, to align technology with business objectives.",
      image: "information-technology-management-ggu-mba.webp",
    },
    {
      id: "mba-finance",
      title: "Finance",
      description:
        "Provides deep training in financial reporting, business valuation, financial modeling, and analytical frameworks essential for corporate finance and investment-driven leadership roles.",
      image: "finance-ggu-mba.webp",
    },
    {
      id: "mba-marketing",
      title: "Marketing",
      description:
        "Centers on market research, digital marketing, integrated marketing communication, and e-commerce strategy to build data-driven, customer-focused marketing leadership skills.",
      image: "marketing-ggu-mba.webp",
    },
    {
      id: "mba-leadership",
      title: "Adaptive Leadership",
      description:
        "Develops capabilities in adaptive leadership, leading complex change, and personal leadership growth to manage uncertainty and transformation in modern organizations.",
      image: "adaptive-leadership-ggu-mba.webp",
    },
    {
      id: "mba-general",
      title: "General",
      description:
        "Allows students to select courses across multiple concentrations, creating a flexible MBA pathway aligned with individual career goals and professional specialization needs.",
      image: "general-ggu-mba.webp",
    },
    {
      id: "mba-analytics",
      title: "Business Analytics Concentration",
      description:
        "Focuses on enterprise performance management, business intelligence, web and social analytics, and data visualization for informed decision-making.",
      image: "business-analytics-concentration-ggu-mba.webp",
    },
    {
      id: "mba-psychology",
      title: "Industrial-Organizational Psychology",
      description:
        "Covers organizational behavior, applied psychological research, and consulting skills to enhance leadership effectiveness in multinational teams.",
      image: "industrial-organizational-psychology-concentration-ggu-mba.webp",
    },
  ],
};

// Approvals & Accreditation
export const GGU_APPROVALS = [
  {
    id: "wasc",
    title: "WASC",
    subtitle: "Senior College and University Commission",
    image: "wasc.webp",
  },
  {
    id: "aals",
    title: "AALS",
    subtitle: "Association of American Law Schools",
    image: "association-of-american.webp",
  },
  {
    id: "state-bar",
    title: "The State Bar of California",
    subtitle: "Accredited by The State Bar of California",
    image: "state-bar-of-california.webp",
  },
  {
    id: "aacsb",
    title: "AACSB",
    subtitle: "Business Education Alliance Member",
    image: "aacsb.webp",
  },
];

// Degree Info
export const GGU_DEGREE_INFO = {
  title: "Advance Your Career with GGU Online Courses",
  description:
    "GGU makes it easy for students to get a management and doctoral degree. Students can study whenever they are comfortable and go at their own pace. GGU gives students everything they need to succeed.",
  image: "doctor_certificate.webp",
  buttonText: "Get Degree",
  features: [
    "The student gets the same top-quality education as those on campus, without having to move.",
    "GGU has been trusted since 1959 with full accreditation from WASH",
    "You join over 68,000 alumni worldwide, many in leadership positions",
  ],
};

// Learning Outcomes
export const GGU_LEARNING_OUTCOMES = [
  {
    title: "PwC Board Certification",
    desc: "Earn a PwC Board Advisory Certification",
  },
  {
    title: "Publish Your Dissertation",
    desc: "Release your Doctoral dissertation as a book",
  },
  {
    title: "Teach at UGC Colleges",
    desc: "Teach in UGC recognised colleges in your free time",
  },
  {
    title: "No-Code Prototyping",
    desc: "Prototype and pilot your ideas with no-code platforms",
  },
  {
    title: "Global IP Protection",
    desc: "Protect your ideas with Solid IPs in 155 countries",
  },
  {
    title: "Pitch to VCs",
    desc: "Pitch your ideas to real VCs with chequebooks",
  },
];

// Stats Bar
export const GGU_STATS = [
  { value: "10k +", label: "Professionals Enrolled Successfully" },
  { value: "05+", label: "In-demand Specialisation" },
  { value: "100+", label: "Carrier Counseling Experts" },
  { value: "30k", label: "Admission Done" },
];

// Admission Steps
export const GGU_ADMISSION_STEPS = [
  {
    num: "1",
    title: "Submit Form",
    desc: "Fill in and submit your application form online",
    themeColor: "#DC520A",
    borderColor: "#DC520A",
    cardBg: "#FFF8F3",
  },
  {
    num: "2",
    title: "Expert's Counseling",
    desc: "You will receive a call from our expert counselor",
    themeColor: "#0284c7",
    borderColor: "#0284c7",
    cardBg: "#F0F9FF",
  },
  {
    num: "3",
    title: "Choose University",
    desc: "Select the course & university according to your interest",
    themeColor: "#e11d48",
    borderColor: "#e11d48",
    cardBg: "#FFF1F2",
  },
  {
    num: "4",
    title: "Online Payment",
    desc: "You need to make a smooth online fee submission",
    themeColor: "#059669",
    borderColor: "#059669",
    cardBg: "#F0FDF4",
  },
  {
    num: "5",
    title: "Document Submit",
    desc: "You need to upload all the required verified documents.",
    themeColor: "#7c3aed",
    borderColor: "#7c3aed",
    cardBg: "#FAF5FF",
  },
  {
    num: "6",
    title: "Admission Confirm",
    desc: "Get Confirmation on your Email & Whatsapp",
    themeColor: "#ea580c",
    borderColor: "#ea580c",
    cardBg: "#FFF7ED",
  },
];

// FAQs - Exact 5 matching live site (https://distanceeducationschool.com/ggu/)
export const GGU_FAQS = [
  {
    q: "What is the Online DBA course at Golden Gate University?",
    a: "The Doctor of Business Administration (DBA) at GGU is a 36-month, fully online program designed for senior professionals seeking to enhance their leadership and research capabilities.",
  },
  {
    q: "Why choose an Online DBA course from Golden Gate University?",
    a: "Golden Gate University's Online DBA offers flexible learning, practical application, and access to experienced faculty, providing a robust education for career advancement.",
  },
  {
    q: "How does the Golden Gate University MBA online support working professionals?",
    a: "The program offers flexible online learning, practice-based coursework, and instruction from U.S.-based faculty with real industry experience.",
  },
  {
    q: "How do the MBA and DBA programs at Golden Gate University differ?",
    a: "The MBA builds management and leadership skills, while the DBA focuses on advanced research, strategic analysis, and executive-level problem-solving.",
  },
  {
    q: "Who should apply for the Golden Gate University MBA online?",
    a: "The program is ideal for working professionals seeking leadership roles, career growth, or advanced business knowledge without pausing their professional commitments.",
  },
];

