export const esgciImg = (path) => {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean.startsWith("/assets/esgci/")) return clean;
  if (clean.startsWith("/assets/all_universities_images/esgci/")) {
    return clean.replace("/assets/all_universities_images/esgci/", "/assets/esgci/");
  }
  return `/assets/esgci/${clean.replace(/^\//, "")}`;
};

export const ESGCI_COURSES = [
  "DBA - Doctor of Business Administration",
];

export const ESGCI_NAV_LINKS = [
  { label: "Courses", href: "#overview" },
  { label: "Approvals", href: "#approvals" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export const ESGCI_STATS = [
  {
    type: "user",
    label: "Eligibility",
    value: "Master or Bachelor degree with 3 years of experience",
  },
  {
    type: "clock",
    label: "Duration",
    value: "36 months | 15 hours per week",
  },
  {
    type: "cap",
    label: "Level",
    value: "Internationally Recognized Online DBA",
  },
  {
    type: "rupee",
    label: "Fees",
    value: "₹6,50,000 (all-inclusive, no extra taxes)",
  },
];

export const ESGCI_WHO_CAN_APPLY = [
  {
    id: "exp-prof",
    title: "Experienced Professionals",
    desc: "Professionals holding a Master's degree with relevant work experience can pursue the ESGCI Online DBA to gain advanced business knowledge and develop leadership skills.",
    image: "experienced-professionals.webp",
  },
  {
    id: "bach-degree",
    title: "Bachelor's Degree Holders",
    desc: "Candidates with a Bachelor's degree and at least three years of professional experience are eligible, providing an opportunity to enhance expertise and advance their careers.",
    image: "bachelors-degree-holders.webp",
  },
  {
    id: "asp-research",
    title: "Aspiring Researchers and Educators",
    desc: "Individuals aiming to teach, publish research, or take on high-level consulting and executive roles can benefit from the globally recognized ESGCI Online DBA program.",
    image: "aspiring-researchers-and-educators.webp",
  },
];

export const ESGCI_ADVANTAGES = [
  {
    title: "PwC Board Advisory",
    desc: "Earn a PwC Board Advisory Certification",
    image: "obtain-a-pwc-board-advisory.webp",
  },
  {
    title: "Publish Your Dissertation",
    desc: "Publish your doctoral research globally",
    image: "publish-your-dissertation.webp",
  },
  {
    title: "Teach at UGC Colleges",
    desc: "Qualify to teach at prestigious universities",
    image: "teach-at-ugc-colleges.webp",
  },
  {
    title: "No-Code Prototyping",
    desc: "Build business prototypes without coding",
    image: "no-code-prototyping.webp",
  },
  {
    title: "Secure Intellectual Property Globally",
    desc: "Protect your intellectual property worldwide",
    image: "global-ip-protection.webp",
  },
  {
    title: "Pitch to Real Investors",
    desc: "Present your innovations directly to venture capitalists",
    image: "pitch-to-vcs.webp",
  },
];

export const ESGCI_APPROVALS = [
  {
    id: "republique",
    title: "French Ministry of Higher Education",
    desc: "Recognizes ESGCI for meeting high-quality standards in French higher education.",
    image: "REPUBLIQUE.webp",
  },
  {
    id: "qualiopi",
    title: "QUALIOPI",
    desc: "Certification ensuring training programs in France adhere to recognized quality standards.",
    image: "QUALIOPI.webp",
  },
  {
    id: "acbsp",
    title: "ACBSP",
    desc: "Global accreditation validating the quality and standards of business education.",
    image: "ACBSP.webp",
  },
  {
    id: "iacbe",
    title: "IACBE",
    desc: "Ensures institutions maintain accountability and continuously improve business education quality.",
    image: "IACBE.webp",
  },
];

export const ESGCI_WHY_CHOOSE = [
  {
    title: "Widely Accepted Credit System",
    desc: "Earn 180 ECTS credits recognized across Europe and globally, giving your online DBA degree strong academic and professional credibility.",
    image: "widely-accepted-credit-system.webp",
  },
  {
    title: "Global Exposure in Paris",
    desc: "Take part in an optional five-day Paris immersion, learning international business practices and connecting with renowned faculty and peers.",
    image: "global-exposure-in-paris.webp",
  },
  {
    title: "Fully Flexible Online Format",
    desc: "Pursue your doctorate entirely online, allowing self-paced, focused research based learning while continuing full-time work without career disruption.",
    image: "fully-flexible-online-format.webp",
  },
  {
    title: "Cost-Effective and Flexible Payment",
    desc: "The program costs INR 8,50,000 with competitive pricing and offers flexible installment options to suit various financial situations.",
    image: "cost-effective-and-flexible-payment.webp",
  },
  {
    title: "Research-Oriented Learning",
    desc: "Gain access to advanced tools like CliftonStrengths™ and conduct practical research addressing real-world business challenges to enhance leadership skills.",
    image: "research-oriented-learning-resources.webp",
  },
  {
    title: "Experienced and Diverse Cohort",
    desc: "Collaborate with seasoned professionals from multiple industries, sharing real-world insights and expanding your global professional network effectively.",
    image: "Diverse-cohort.webp",
  },
];

export const ESGCI_ADMISSION_STEPS = [
  {
    num: 1,
    title: "Submit Form",
    desc: "Fill in and submit your application form online",
    themeColor: "#ff7a00",
    borderColor: "#ff7a00",
    cardBg: "#fff8f0",
  },
  {
    num: 2,
    title: "Expert's Counseling",
    desc: "You will receive a call from our expert counselor",
    themeColor: "#0066cc",
    borderColor: "#0066cc",
    cardBg: "#f0f7ff",
  },
  {
    num: 3,
    title: "Choose University",
    desc: "Select the course & university according to your interest",
    themeColor: "#ff2a6d",
    borderColor: "#ff2a6d",
    cardBg: "#fff0f5",
  },
  {
    num: 4,
    title: "Online Payment",
    desc: "You need to make a smooth online fee submission",
    themeColor: "#16a34a",
    borderColor: "#16a34a",
    cardBg: "#f0faf3",
  },
  {
    num: 5,
    title: "Document Submit",
    desc: "You need to upload all the required verified documents.",
    themeColor: "#8b5cf6",
    borderColor: "#8b5cf6",
    cardBg: "#f7f2ff",
  },
  {
    num: 6,
    title: "Admission Confirm",
    desc: "Get Confirmation on your Email & Whatsapp",
    themeColor: "#ff7a00",
    borderColor: "#ff7a00",
    cardBg: "#fff8f0",
  },
];

export const ESGCI_FAQS = [
  {
    q: "Is the ESGCI Online DBA recognized internationally?",
    a: "Yes, ESGCI is recognized by the French government and is part of Galileo Global Education, making its DBA globally respected.",
  },
  {
    q: "Who is eligible for the ESGCI Online DBA?",
    a: "Candidates must have a master's degree or an MBA and relevant professional experience in management or business.",
  },
  {
    q: "Can working professionals enroll in the ESGCI Online DBA?",
    a: "Yes, the program is designed for professionals who want to advance their career while continuing to work.",
  },
  {
    q: "Can I study ESGCI Online DBA from anywhere in the world?",
    a: "Yes, the program is fully online, allowing students to learn and submit research from anywhere globally.",
  },
  {
    q: "What career benefits does a DBA from ESGCI provide?",
    a: "Graduates can pursue consulting, university teaching, research publication, board advisory roles, and executive leadership positions. The DBA is a rare qualification, giving an edge over the 250,000 annual MBA graduates globally.",
  },
];

