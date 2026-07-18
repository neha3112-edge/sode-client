import { API_BASE_URL } from "@/config";

// ==========================================
// FALLBACK / MOCK DATABASES (Ensure build robustness)
// ==========================================

export const FALLBACK_COURSES = [
  {
    title: "Master of Business Administration (MBA)",
    slug: "distance-mba",
    level: "Post Graduate",
    duration: "2 Years (4 Semesters)",
    category: "pg",
    description: "Highly sought after dynamic management degree with dual specializations in Finance, Marketing, HR, etc.",
    eligibility: "Bachelor's degree in any discipline from a recognized university with a minimum of 50% aggregate marks.",
    syllabus: [
      "Semester 1: Principles of Management, Managerial Economics, Financial Accounting, Organizational Behavior.",
      "Semester 2: Marketing Management, Human Resource Management, Financial Management, Operations Research.",
      "Semester 3: Specialization Core (Finance/HR/Marketing), Strategic Management, Management Information Systems.",
      "Semester 4: Electives, Project Work, Business Ethics & Corporate Governance."
    ],
    careers: "Business Consultant, HR Manager, Brand Manager, Sales Director, Investment Banker.",
    jobs: ["Product Manager", "Consultant", "HR Executive"],
  },
  {
    title: "Doctor of Business Administration (DBA)",
    slug: "online-dba",
    level: "Doctorate",
    duration: "3 Years (6 Semesters)",
    category: "doctorate",
    description: "International doctoral degree for senior executives focusing on applied corporate research.",
    eligibility: "Master's degree or MBA from a recognized institution with at least 5 years of corporate managerial experience.",
    syllabus: [
      "Year 1: Quantitative Research Methods, Qualitative Methodologies, Applied Business Theory, Literature Review.",
      "Year 2: Research Proposal Development, Academic Writing, Pilot Study, Research Colloquium.",
      "Year 3: Dissertation Research, Data Collection & Analysis, Final Dissertation Defense."
    ],
    careers: "Research Director, Chief Strategy Officer, Academic Professor, Senior Executive Consultant.",
    jobs: ["Research Director", "Chief Strategy Officer", "Academician"],
  },
  {
    title: "Bachelor of Business Administration (BBA)",
    slug: "distance-bba",
    level: "Under Graduate",
    duration: "3 Years (6 Semesters)",
    category: "ug",
    description: "Foundational business administration degree offering knowledge of core corporate operations.",
    eligibility: "10+2 / Higher Secondary pass in any stream from a recognized educational board.",
    syllabus: [
      "Year 1: Business Communication, Microeconomics, Business Mathematics, Computer Applications.",
      "Year 2: Corporate Accounting, Business Statistics, Marketing Principles, Organizational Behavior.",
      "Year 3: Business Law, Entrepreneurship, Project Management, Elective Specializations."
    ],
    careers: "Management Trainee, Customer Relationship Officer, Sales Executive, Junior Analyst.",
    jobs: ["Management Trainee", "Business Analyst", "Sales Manager"],
  },
  {
    title: "Master of Computer Applications (MCA)",
    slug: "online-mca",
    level: "Post Graduate",
    duration: "2 Years (4 Semesters)",
    category: "pg",
    description: "Specialized computer applications and software engineering degree designed for IT professionals.",
    eligibility: "BCA/B.Sc. Computer Science or Graduate with Mathematics in 12th/Graduation from a recognized university.",
    syllabus: [
      "Semester 1: Advanced Software Engineering, Database Systems, Java Programming, Data Structures.",
      "Semester 2: Cloud Computing, Web Technologies, Artificial Intelligence, Mobile App Development.",
      "Semester 3: Machine Learning, Big Data Analytics, Cyber Security, Computer Networks.",
      "Semester 4: Advanced Electives, Major Industry Project, Seminar."
    ],
    careers: "Software Developer, Technical Architect, Database Administrator, System Analyst.",
    jobs: ["Software Developer", "Technical Architect", "Database Administrator", "System Analyst"],
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    slug: "online-bca",
    level: "Under Graduate",
    duration: "3 Years (6 Semesters)",
    category: "ug",
    description: "Comprehensive software development and applications base degree with practical coding curriculum.",
    eligibility: "10+2 / Higher Secondary pass in any stream (Mathematics preferred) from a recognized educational board.",
    syllabus: [
      "Year 1: Programming in C, Computer Fundamentals, Web Technology, Mathematics.",
      "Year 2: Object Oriented Programming in C++, Operating Systems, DBMS, Software Engineering.",
      "Year 3: Java Programming, Computer Graphics, Network Security, Project Work."
    ],
    careers: "Junior Programmer, Web Developer, Software Tester, Network Support Associate.",
    jobs: ["Web Developer", "Programmer Analyst", "Support Engineer"],
  },
];

export const FALLBACK_UNIVERSITIES = [
  {
    name: "Golden Gate University",
    slug: "golden-gate-university",
    location: "California, USA",
    type: "Global",
    approvals: ["WASC Accredited", "170+ Years Old", "US News Ranked"],
    rating: 4.8,
    reviews: 1240,
    logoBg: "#1C3569",
    featuredCourse: "Doctor of Business Administration (DBA)",
    description: "Golden Gate University (GGU) has been catering to working professionals since 1901. Located in San Francisco, California, GGU is widely recognized for its high-quality professional degrees in business, law, taxation, and technology.",
    fees: "$3,000 - $12,000 per year",
    eligibility: "Bachelor's / Master's degree with 50% minimum marks (experience preferred for DBA)",
    courses: [
      { name: "Doctor of Business Administration (DBA)", duration: "3 Years" },
      { name: "Global Master of Business Administration (MBA)", duration: "18 Months" },
      { name: "M.Sc. in Business Analytics", duration: "18 Months" },
    ]
  },
  {
    name: "Subharti University",
    slug: "subharti-university",
    location: "Meerut, India",
    type: "State Private",
    approvals: ["UGC-DEB Approved", "NAAC A Grade", "Government recognized"],
    rating: 4.5,
    reviews: 845,
    logoBg: "#E11D48",
    featuredCourse: "Distance MBA & BBA",
    description: "Subharti University is a top State Private University in Northern India offering high-quality distance education courses approved by the UGC-DEB. The university focuses on making education accessible and affordable to all segments of society.",
    fees: "₹15,000 - ₹45,000 per year",
    eligibility: "12th Pass for UG / Graduate for PG programs",
    courses: [
      { name: "Master of Business Administration (Distance MBA)", duration: "2 Years" },
      { name: "Bachelor of Business Administration (Distance BBA)", duration: "3 Years" },
      { name: "Bachelor of Arts (Distance BA)", duration: "3 Years" },
      { name: "Master of Arts (Distance MA)", duration: "2 Years" },
    ]
  },
  {
    name: "Mangalayatan University",
    slug: "mangalayatan-university",
    location: "Aligarh, India",
    type: "State Private",
    approvals: ["UGC-DEB Approved", "NAAC A+ Grade", "AICTE Approved"],
    rating: 4.6,
    reviews: 620,
    logoBg: "#059669",
    featuredCourse: "Distance MCA & BCA",
    description: "Mangalayatan University Aligarh is a premier state private university accredited with an 'A+' grade by NAAC. The online and distance learning programs are designed to provide learners with academic flexibility and career-relevant qualifications.",
    fees: "₹18,000 - ₹55,000 per year",
    eligibility: "12th Pass for UG / Graduate with minimum 45% marks for PG",
    courses: [
      { name: "Online MCA", duration: "2 Years" },
      { name: "Online MBA", duration: "2 Years" },
      { name: "Online BCA", duration: "3 Years" },
      { name: "Online BBA", duration: "3 Years" },
    ]
  },
  {
    name: "Rushford Business School",
    slug: "rushford-business-school",
    location: "Geneva, Switzerland",
    type: "Global",
    approvals: ["EduQua Certified", "ACBSP Member", "Swiss Accredited"],
    rating: 4.7,
    reviews: 310,
    logoBg: "#4F46E5",
    featuredCourse: "Global MBA Programs",
    description: "Rushford Business School is a leading business school in Europe offering professional online degrees certified by EduQua. With a focus on research, practical study cases, and networking, Rushford degrees carry premium corporate validation.",
    fees: "€2,500 - €8,000 per year",
    eligibility: "Graduation with at least 50% marks (work experience is valued)",
    courses: [
      { name: "Global MBA (Swiss Degree)", duration: "18 Months" },
      { name: "M.Sc. in Clinical Research & Pharmacovigilance", duration: "18 Months" },
      { name: "Doctor of Business Administration (DBA)", duration: "3 Years" },
    ]
  },
];

export const FALLBACK_BLOGS = [
  {
    title: "Understanding UGC-DEB Approvals for Distance Degrees",
    slug: "understanding-ugc-deb-approvals",
    category: "Accreditation",
    date: "June 15, 2026",
    excerpt: "Learn why UGC-DEB approvals are critical when choosing a distance MBA or MCA degree in India, and how to verify university statuses.",
    content: `When exploring online and distance education options in India, the term **UGC-DEB approved** is the single most critical factor to verify. \n\nUGC (University Grants Commission) is the apex body overseeing higher education, and the DEB (Distance Education Bureau) is its dedicated wing regulating distance and online learning.\n\n### Why is UGC-DEB Approval Important?\n\n1. **Government Recognition:** Degree certificates from unapproved universities are not valid for government job applications or public sector exams.\n2. **Equivalence:** A distance degree is only considered equivalent to a regular day degree if it has UGC-DEB authorization.\n3. **Foreign Evaluation:** If you plan to work or study abroad, agencies like WES evaluate degrees based on the UGC approval status of the granting university.\n\n### How to Verify a University's Status\n\n- Visit the official UGC-DEB website portal.\n- Check the list of recognized institutions for the specific academic year.\n- Note that approvals are granted on a year-to-year or program-to-program basis, so ensure your specific course (e.g. MBA or MCA) is listed for the current session.`
  },
  {
    title: "Is an Online DBA Worth It for Senior Professionals?",
    slug: "is-online-dba-worth-it",
    category: "Career Guidance",
    date: "May 28, 2026",
    excerpt: "Explore the value of a Doctor of Business Administration (DBA) degree, salary increases, and how it differs from a traditional academic PhD.",
    content: `The Doctor of Business Administration (DBA) is a professional doctorate designed for corporate leaders, consultants, and entrepreneurs. Unlike a traditional PhD, which is highly academic and focuses on creating new theories, a DBA focuses on applying existing research and methods directly to complex business problems.\n\n### Key Benefits of a DBA:\n\n- **Executive Branding:** Using the "Doctor" title is highly prestigious in corporate boardrooms and consulting firms.\n- **Applied Insights:** Apply advanced methodologies directly to your company's operational problems.\n- **Career Growth:** Many senior executive roles prefer professionals with research-driven doctoral qualifications.\n\nFor senior managers who cannot afford to leave their full-time corporate roles, a 100% online DBA program offers the perfect balance.`
  },
  {
    title: "Tips for Balancing Distance Studies and a Full-Time Job",
    slug: "balancing-distance-studies-and-work",
    category: "Student Tips",
    date: "April 10, 2026",
    excerpt: "A practical guide to time management, setting study hours, and leveraging online resources to successfully complete your degree while working.",
    content: `Pursuing a degree while maintaining a full-time job is a highly rewarding yet challenging endeavor. \n\nHere are top time-management tips to stay on track:\n\n### 1. Set a Study Routine\nDon't wait for free time; actively schedule 1-2 hours of study time daily, or allocate 5-6 hours over the weekend. Consistency is more important than long study blocks.\n\n### 2. Create a Dedicated Workspace\nHave a quiet, organized space in your home free from distractions. This trains your brain to focus as soon as you sit down.\n\n### 3. Leverage Digital Tools\nUse mobile apps to read study material or watch lectures during your daily commute. Use digital calendars to track exam dates and project submissions.`
  },
];

// ==========================================
// SERVER-SIDE FETCH HELPER FUNCTIONS (SSG/ISR)
// ==========================================

async function fetchFromApi(endpoint, fallbackData) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 3600 }, // ISR: Cache for 1 hour
    });
    
    if (!res.ok) return fallbackData;
    
    const data = await res.json();
    if (data && data.success) {
      return data.result || fallbackData;
    }
    return fallbackData;
  } catch (error) {
    console.warn(`Fetch to ${endpoint} failed. Using local premium fallback database.`);
    return fallbackData;
  }
}

// 🎯 Fetch Courses
export async function getCourses() {
  return fetchFromApi("course/list", FALLBACK_COURSES);
}

export async function getCourseBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}course/read?slug=${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK_COURSES.find(c => c.slug === slug) || FALLBACK_COURSES[0];
    
    const data = await res.json();
    if (data && data.success && data.result) {
      return data.result;
    }
    return FALLBACK_COURSES.find(c => c.slug === slug) || FALLBACK_COURSES[0];
  } catch (error) {
    return FALLBACK_COURSES.find(c => c.slug === slug) || FALLBACK_COURSES[0];
  }
}

// 🎯 Fetch Universities
export async function getUniversities() {
  return fetchFromApi("university/list", FALLBACK_UNIVERSITIES);
}

export async function getUniversityBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}university/read?slug=${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK_UNIVERSITIES.find(u => u.slug === slug) || FALLBACK_UNIVERSITIES[0];
    
    const data = await res.json();
    if (data && data.success && data.result) {
      return data.result;
    }
    return FALLBACK_UNIVERSITIES.find(u => u.slug === slug) || FALLBACK_UNIVERSITIES[0];
  } catch (error) {
    return FALLBACK_UNIVERSITIES.find(u => u.slug === slug) || FALLBACK_UNIVERSITIES[0];
  }
}

// 🎯 Fetch Blogs
export async function getBlogs() {
  return fetchFromApi("blog/list", FALLBACK_BLOGS);
}

export async function getBlogBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}blog/read?slug=${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK_BLOGS.find(b => b.slug === slug) || FALLBACK_BLOGS[0];
    
    const data = await res.json();
    if (data && data.success && data.result) {
      return data.result;
    }
    return FALLBACK_BLOGS.find(b => b.slug === slug) || FALLBACK_BLOGS[0];
  } catch (error) {
    return FALLBACK_BLOGS.find(b => b.slug === slug) || FALLBACK_BLOGS[0];
  }
}
