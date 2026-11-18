export const ASSET_BASE = "/assets/liverpool";

export const liverpoolImg = (name) => {
  if (!name) return "";
  if (name.startsWith("http") || name.startsWith("/")) return name;
  return `${ASSET_BASE}/${name}`;
};

export const LIVERPOOL_NAV_LINKS = [
  { label: "Courses", href: "#courses" },
  { label: "Approvals", href: "#approvals" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export const LIVERPOOL_STATS = [
  {
    icon: "user",
    title: "Eligibility",
    desc: "Bachelor's degree +2 years of experience",
  },
  {
    icon: "clock",
    title: "Duration:",
    desc: "18 months",
  },
  {
    icon: "award",
    title: "Faculty:",
    desc: "Leading industry experts",
  },
  {
    icon: "book",
    title: "Level",
    desc: "Postgraduate Degree",
  },
];

export const LIVERPOOL_JOURNEY_STEPS = [
  {
    step: "Step 01",
    logo: "IIMU icon.webp",
    heading: "Executive Programme in Business Management & AI Leadership",
    duration: "(11 Months)",
    desc: "In the IIM-Udaipur phase of 11 months, learners build expertise in leadership, business strategy, finance, marketing, operations, and AI-driven decision-making through an industry-focused curriculum, real-world applications, and expert-led learning.",
  },
  {
    step: "Step 02",
    logo: "lbs-logo-696b29d4429b8.webp",
    heading: "MBA Specialisations",
    duration: "(2 Months)",
    desc: "During the 2-month LBS Online MBA phase, learners choose one specialisation and gain advanced, hands-on expertise through focused courses and practical tools. The MBA Liverpool Online specialisation phase helps learners develop domain skills, analytics capabilities, and real-world industry applications through the MBA in Liverpool learning experience.",
  },
  {
    step: "Step 03",
    logo: "lbs-logo-696b29d4429b8.webp",
    heading: "Applied Business Research",
    duration: "(1 Month)",
    desc: "In the 1-month LBS MBA learning phase in Applied Research, students master research methodologies, explore diverse approaches, manage projects, and enhance thesis report writing through the Liverpool online MBA learning experience.",
  },
  {
    step: "Step 04",
    logo: "lbs-logo-696b29d4429b8.webp",
    heading: "Strategic Business Consultancy Project",
    duration: "(3 Months)",
    desc: "In the 3-month MBA in Liverpool University phase, the Strategic Business Consultancy Project, Professionals apply research insights to consultancy projects, solving industry-specific challenges in BFSI, FMCG, IT, automotive, and e-commerce.",
  },
];

export const LIVERPOOL_CERTIFICATES = [
  {
    title: "IIM Udaipur Certificate of Completion",
    image: "IIMU Certificatee.webp",
  },
  {
    title: "Liverpool Business School Certificate",
    image: "IIMU Certificatee2.webp",
  },
];

export const LIVERPOOL_COURSES = [
  {
    id: "business-analytics",
    title: "MBA in Business Analytics",
    image: "Business-Analytics.webp",
    desc: "Learners develop skills in data analytics, Python, SQL, data mining, and dashboarding to make data-driven business decisions through the MBA Liverpool online specialisation.",
  },
  {
    id: "finance",
    title: "MBA in Finance",
    image: "Finance.webp",
    desc: "Professionals gain expertise in financial modelling, forecasting, corporate finance, capital budgeting techniques, and financial risk analysis through the Liverpool MBA specialisation.",
  },
  {
    id: "marketing",
    title: "MBA in Marketing",
    image: "Marketing.webp",
    desc: "Learners build expertise in digital marketing channels, branding, communication, SEO, social media marketing, and marketing analytics through the MBA in Liverpool specialisation.",
  },
  {
    id: "leadership",
    title: "MBA in Leadership",
    image: "Leadership.webp",
    desc: "Professionals develop leadership capabilities by learning to manage volatility, uncertainty, complexity, global teams, and future leadership challenges.",
  },
  {
    id: "hrm",
    title: "MBA in Human Resource Management",
    image: "HRM.webp",
    desc: "Learners gain knowledge of strategic HRM, HR operations, analytics, data visualisation, and storytelling to manage modern workforce challenges.",
  },
  {
    id: "operations",
    title: "MBA in Operations and Supply Chain Management",
    image: "ops-m.webp",
    desc: "Professionals develop skills in distribution channels, supply chain analytics, inventory management, fleet analytics, and capacity planning for operational excellence.",
  },
];

export const LIVERPOOL_APPROVALS = [
  {
    name: "World Education Services",
    image: "Layer-36.png",
    sub: "WES Recognised",
  },
  {
    name: "AACSB Business Education Alliance",
    image: "Layer-37.png",
    sub: "Member",
  },
  {
    name: "Excellence in Practice Awards",
    image: "Layer-39-1.png",
    sub: "2023 Gold Award",
  },
];

export const LIVERPOOL_STANDOUT = [
  {
    icon: "user",
    title: "Integrated Credentials Advantage(LBS- IIM U)",
  },
  {
    icon: "award",
    title: "Global Alumni Connect",
  },
  {
    icon: "book",
    title: "Career-Focused Customised Curriculum",
  },
  {
    icon: "briefcase",
    title: "Industry-Relevant Learning through Case Studies",
  },
  {
    icon: "coin",
    title: "Pursue Global Business Education With Cost-Effective Learning Benefits",
  },
  {
    icon: "globe",
    title: "Worldwide Learning Network",
  },
];

export const LIVERPOOL_PROCESS_STEPS = [
  {
    step: 1,
    title: "Submit Form",
    desc: "Fill in and submit your application form online",
  },
  {
    step: 2,
    title: "Expert's Counseling",
    desc: "You will receive a call from our expert counselor",
  },
  {
    step: 3,
    title: "Choose University",
    desc: "Select the course & university according to your interest",
  },
  {
    step: 4,
    title: "Online Payment",
    desc: "You need to make a smooth online fee submission",
  },
  {
    step: 5,
    title: "Document Submit",
    desc: "You need to upload all the required verified documents.",
  },
  {
    step: 6,
    title: "Admission Confirm",
    desc: "Get Confirmation on your Email & Whatsapp",
  },
];

export const LIVERPOOL_FAQS = [
  {
    q: "Q1. What are the University of Liverpool MBA fees for the Online MBA programme?",
    a: "The programme fee details can be obtained by downloading the brochure. The online MBA Liverpool programme offers a globally recognised MBA learning experience with flexible payment options.",
  },
  {
    q: "Q2. Does the University of Liverpool MBA course include mandatory campus immersion?",
    a: "The programme offers an international immersion experience at Liverpool Business School, where learners can interact and network with peers and experts. The IIM Udaipur campus immersion is an optional component available as part of the learning journey.",
  },
  {
    q: "Q3. Why is the MBA Liverpool John Moores University programme research phase relevant?",
    a: "The 18-month MBA journey includes the IIM Udaipur phase, MBA specialisations, Applied Business Research, and a Strategic Business Consultancy Project designed to develop practical management and leadership skills.",
  },
  {
    q: "Q4. What is the University of Liverpool MBA ranking and recognition of the MBA with IIM Udaipur certification?",
    a: "Liverpool Business School, a part of Liverpool John Moores University (LJMU), is recognised for academic excellence. The MBA programme offers a WES-recognised degree from Liverpool Business School along with an Executive Programme in Business Management & AI Leadership certification from IIM Udaipur, supported by AACSB membership.",
  },
  {
    q: "Q5. What are the University of Liverpool MBA fees for indian students?",
    a: "Fee details for Indian learners can be discussed with the admissions team. The programme provides a value-driven MBA experience with global credentials, practical learning, and access to a global alumni network.",
  },
  {
    q: "Q6. What are the learning outcomes that make professionals choose an online MBA Liverpool programme?",
    a: "The programme offers personalised learning, live sessions, HBR case studies, simulations, hands-on projects, specialisations, and access to a network of 3,000+ alumni.",
  },
];

