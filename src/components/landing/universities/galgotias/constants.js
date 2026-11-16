export const galgotiasImg = (filename) => `/assets/galgotias/${filename}`;

export const GALGOTIAS_COURSES = [
  { label: "Online MBA", value: "Online MBA" },
  { label: "Online MCA", value: "Online MCA" },
  { label: "Online MCOM", value: "Online MCOM" },
  { label: "Online MA", value: "Online MA" },
  { label: "Online BCA", value: "Online BCA" },
  { label: "Online BBA", value: "Online BBA" },
];

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
];

export const GALGOTIAS_PROGRAMS = [
  {
    code: "MBA",
    title: "Master of Business Administration",
    duration: "| Duration : 2 Years",
    eligibility: "| Eligibility : Graduation",
    desc: "The Galgotias online MBA program equip professionals and learners with leadership, advanced business and strategic management skills that are required for modern organisations.",
    image: galgotiasImg("mba-galgotia.webp"),
  },
  {
    code: "MCA",
    title: "Master of Computer Application",
    duration: "| Duration : 2 Years",
    eligibility: "| Eligibility : Graduation",
    desc: "This technology-focused program from Galgotias online is designed for students to build expertise in data management, software development, and modern computing systems.",
    image: galgotiasImg("mca-galgotia.webp"),
  },
  {
    code: "MCOM",
    title: "Master of Commerce",
    duration: "| Duration : 2 Years",
    eligibility: "| Eligibility : Graduation",
    desc: "This two-year postgraduate program of Gagotias University online is designed to strengthen financial management, accounting expertise, and decision-making strategy in business.",
    image: galgotiasImg("mcom-galgotia.webp"),
  },
  {
    code: "MA",
    title: "Master of Arts",
    duration: "| Duration : 2 Years",
    eligibility: "| Eligibility : Graduation",
    desc: "This Master's in Arts program develops advanced analytical thinking and skills through research in particular subject knowledge, such as Economics, English etc.",
    image: galgotiasImg("ma-galgotia.webp"),
  },
  {
    code: "BCA",
    title: "Bachelor of Computer Applications",
    duration: "| Duration : 3 Years",
    eligibility: "| Eligibility : 10+2 from a recognised board",
    desc: "This three-year foundation program focused on programming, software development, and emerging IT technologies, helping students to build their careers in digital technologies.",
    image: galgotiasImg("BCA.webp"),
  },
  {
    code: "BBA",
    title: "Bachelor of Business Administration",
    duration: "| Duration : 3 Years",
    eligibility: "| Eligibility : 10+2 from a recognised board",
    desc: "A business-oriented undergraduate Galgotias online BBA course builds managerial skills and prepares students for leadership roles, offering them the opportunity to study across fields of programming languages.",
    image: galgotiasImg("BBA.webp"),
  },
];

export const APPROVALS_LIST = [
  {
    img: galgotiasImg("ugc.webp"),
    title: "UGC Entitled",
    desc: "Recognized by the University Grants Commission",
  },
  {
    img: galgotiasImg("naacA+.webp"),
    title: "NAAC A+",
    desc: "Accredited by the National Assessment and Accreditation Council",
  },
  {
    img: galgotiasImg("NBA.webp"),
    title: "NBA Accredited",
    desc: "National Board of Accreditation (NBA)",
  },
  {
    img: galgotiasImg("NIRF.webp"),
    title: "NIRF Ranking",
    desc: "Ranked by National Institutional Ranking Framework (NIRF)",
  },
  {
    img: galgotiasImg("QS.webp"),
    title: "QS Ranking",
    desc: "Globally ranked by QS World University Rankings",
  },
  {
    img: galgotiasImg("THE.webp"),
    title: "THE Ranking",
    desc: "Ranked by the Times Higher Education Asia University Rankings",
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    icon: galgotiasImg("industry.webp"),
    title: "Industry-Expert Designed Programs",
    desc: "Galgotias University online courses curriculum is enhanced in collaboration with industry-led academicians. It ensures that students gain not only relevant theoretical but also practical knowledge.",
  },
  {
    icon: galgotiasImg("icon.webp"),
    title: "Advanced Learning Facilities",
    desc: "Students enrolled in Galgotias University online courses benefit from modern digital infrastructure. It supports a learning environment that promotes accessible learning and engaging.",
  },
  {
    icon: galgotiasImg("carrier.webp"),
    title: "Career-Oriented Education",
    desc: "Modern organisations prefer and value individuals that develops advanced skills in respective sectors, such as the online MBA from Galgotias University. Similarly, all the courses are industry-focused and develop skills and knowledge.",
  },
  {
    icon: galgotiasImg("lms.webp"),
    title: "Integrated Learning Management System (LMS)",
    desc: "The LMS used in Galgotias University online classes is highly advanced. It permits students to attend lectures both live and recorded. They get access to study material and can track their progress easily.",
  },
];

export const ADMISSION_STEPS = [
  {
    num: 1,
    title: "Submit Form",
    desc: "Fill in and submit your application form online",
    themeColor: "#ff8c32",
    borderColor: "#ff8c32",
    cardBg: "#fff4e9",
  },
  {
    num: 2,
    title: "Expert's Counseling",
    desc: "You will receive a call from our expert counselor",
    themeColor: "#0b5ed7",
    borderColor: "#0b5ed7",
    cardBg: "#f2f8ff",
  },
  {
    num: 3,
    title: "Choose University",
    desc: "Select the course & university according to your interest",
    themeColor: "#ff2d6f",
    borderColor: "#ff2d6f",
    cardBg: "#fff1f6",
  },
  {
    num: 4,
    title: "Online Payment",
    desc: "You need to make a smooth online fee submission",
    themeColor: "#1faa59",
    borderColor: "#1faa59",
    cardBg: "#effff5",
  },
  {
    num: 5,
    title: "Document Submit",
    desc: "You need to upload all the required verified documents.",
    themeColor: "#8e2de2",
    borderColor: "#8e2de2",
    cardBg: "#f9f0ff",
  },
  {
    num: 6,
    title: "Admission Confirm",
    desc: "Get Confirmation on your Email & Whatsapp",
    themeColor: "#ff8c32",
    borderColor: "#ff8c32",
    cardBg: "#fff4e9",
  },
];

export const GALGOTIAS_FAQS = [
  {
    q: "Q1. Does Galgotias University Online have any scholarships or EMI?",
    a: "Galgotias Online has both scholarships and EMI criteria. Students can easily access by clicking on the scholarship coupon code, and EMI opinions are also awarded by the university.",
  },
  {
    q: "Q2. What is the structure of Galgotias Online MBA Fees for different specialisations?",
    a: "Galgotias Online MBA Fees depend on the specialisation preferred by the student. In case students want to know the fees, they would download the brochure from the button that appears below the courses.",
  },
  {
    q: "Q3. What is the procedure to access the resources to enrol in the Online MBA from Galgotias University?",
    a: "The university has an advanced digital Learning Management System (LMS) that comprises live lectures, both live and recorded, and online resources such as study notes.",
  },
  {
    q: "Q4. How can an individual take the online admission at Galgotias University?",
    a: "Galgotias University online admission process is quite convenient. It includes completing the application form, payment of fees, uploading documents, verification and confirmation of admission.",
  },
  {
    q: "Q5. Is the Online MBA from Galgotias University recommended for learners and working professionals?",
    a: "Yes, if a student wants to pursue a course such as an online MBA from Galgotias University, then it is highly recommended. It is because it provides a flexible learning process and develops high-level management skills.",
  },
];

