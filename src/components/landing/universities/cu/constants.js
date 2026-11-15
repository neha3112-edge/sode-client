export const cuImg = (file) => `/assets/cu/${file}`;

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
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
  "Jammu and Kashmir",
  "Puducherry",
  "Lakshadweep",
  "Ladakh",
  "Chandigarh",
  "Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli and Daman and Diu",
];

export const CU_NAV_LINKS = [
  { label: "Programs", href: "#programs" },
  { label: "Why CU", href: "#whychoose" },
  { label: "About", href: "#about" },
  { label: "Approvals", href: "#approvals" },
  { label: "Degree", href: "#degree" },
  { label: "Admission", href: "#process" },
  { label: "FAQs", href: "#faqs" },
];

export const CU_STATS = [
  {
    value: "2400+",
    label: "Patents Filed by Students & Faculty",
  },
  {
    value: "300+",
    label: "International Hiring Partners with MNCs & Top Companies",
  },
  {
    value: "16+",
    label: "Specializations in MBA & Other Degree Programs",
  },
  {
    value: "24x7",
    label: "Support & Assistance with Top Level Faculty",
  },
];

export const CU_PG_PROGRAMMES = [
  {
    code: "mba",
    title: "MBA",
    subtitle: "Master of Business Administration",
    duration: "2 Years",
    description:
      "Learner can earn an online MBA from Chandigarh online University MBA with specialisations in HR, Finance, or Marketing.",
    image: cuImg("mba-cu.png"),
  },
  {
    code: "mca",
    title: "MCA",
    subtitle: "Master of Computer Application",
    duration: "2 Years",
    description:
      "Students can enhance tech expertise with Chandigarh University's MCA, covering programming, AI, and data systems.",
    image: cuImg("mca-cu.png"),
  },
  {
    code: "ma-jmc",
    title: "MA-JMC",
    subtitle: "Journalism & Mass Communication",
    duration: "2 Years",
    description:
      "This course opens doors to go into journalism and digital storytelling through Chandigarh Online University's online MA-JMC.",
    image: cuImg("mjmc-cu.png"),
  },
  {
    code: "msc",
    title: "MSC",
    subtitle: "Master of Science",
    duration: "2 Years",
    description:
      "Learners can expand scientific expertise with Chandigarh Online University's comprehensive Master of Science program.",
    image: cuImg("msc-cu.png"),
  },
  {
    code: "ma",
    title: "MA",
    subtitle: "Master of Arts",
    duration: "2 Years",
    description:
      "Dive into the humanities with CU Online MA, gaining critical thinking and analytical capabilities.",
    image: cuImg("ma-cu.png"),
  },
];

export const CU_UG_PROGRAMMES = [
  {
    code: "bba",
    title: "BBA",
    subtitle: "Bachelor of Business Administration",
    duration: "3 Years",
    description:
      "Build foundational business, leadership, and management skills with Chandigarh Online University's BBA program.",
    image: cuImg("bba-cu.png"),
  },
  {
    code: "bca",
    title: "BCA",
    subtitle: "Bachelor of Computer Application",
    duration: "3 Years",
    description:
      "Master software applications, database architectures, and core programming languages with CU Online BCA.",
    image: cuImg("bca-cu.png"),
  },
  {
    code: "ba-jmc",
    title: "BA-JMC",
    subtitle: "Journalism & Mass Communication",
    duration: "3 Years",
    description:
      "Learn news reporting, media ethics, electronic broadcasting, and digital communications through BA-JMC.",
    image: cuImg("bjmc-cu.png"),
  },
];

export const CU_COURSES = [
  { label: "Online MBA", value: "Online MBA" },
  { label: "Online MCA", value: "Online MCA" },
  { label: "Online MA-JMC", value: "Online MA-JMC" },
  { label: "Online M.Sc", value: "Online M.Sc" },
  { label: "Online M.A", value: "Online M.A" },
  { label: "Online BBA", value: "Online BBA" },
  { label: "Online BCA", value: "Online BCA" },
  { label: "Online BA-JMC", value: "Online BA-JMC" },
];

export const CU_WHY_CHOOSE = [
  {
    icon: cuImg("afforadable.png"),
    title: "Affordable Fee Structure",
    description:
      "The Chandigarh University fee structure provides each of its online programs remains affordable.",
  },
  {
    icon: cuImg("global.png"),
    title: "Globally Recognized Courses:",
    description:
      "The curriculum of Chandigarh Online University is up to the market standard, setting global benchmarks.",
  },
  {
    icon: cuImg("support.png"),
    title: "24/7 Support:",
    description:
      "Chandigarh University has situated a 24/7support team, and their only work is to take care of the students' queries.",
  },
  {
    icon: cuImg("placement.png"),
    title: "Career Placement Assistance:",
    description:
      "The Chandigarh Online University has its duties related to placement through its career placement assistance.",
  },
  {
    icon: cuImg("self.png"),
    title: "Flexible Study Options:",
    description:
      "Chandigarh Online University understands every student's learning pace and offers its live and recorded classes.",
  },
  {
    icon: cuImg("lms.png"),
    title: "Innovative Learning Platform:",
    description:
      "Chandigarh University offers its learners cutting-edge knowledge with LMS, delivering a better digital learning experience.",
  },
];

export const CU_APPROVALS = [
  {
    title: "National Assessment and Accreditation Council (NAAC A+)",
    image: cuImg("naac-approvals.png"),
  },
  {
    title: "University Grants Commission (UGC)",
    image: cuImg("ugc-approvals.png"),
  },
  {
    title: "National Institutional Ranking Framework (NIRF)",
    image: cuImg("nirf-approvals.png"),
  },
  {
    title: "World Education Services (WES)",
    image: cuImg("WES-approvals.png"),
  },
];

export const CU_PROCESS_STEPS = [
  {
    step: 1,
    title: "Submit Form",
    description: "Fill in and submit your application form online",
    numColor: "text-[#f97316]",
    borderColor: "border-[#f97316]",
    bgColor: "bg-[#fff4e9]",
    bottomBar: "bg-[#f97316]",
  },
  {
    step: 2,
    title: "Expert's Counseling",
    description: "You will receive a call from our expert counselor",
    numColor: "text-[#2563eb]",
    borderColor: "border-[#2563eb]",
    bgColor: "bg-[#eff6ff]",
    bottomBar: "bg-[#2563eb]",
  },
  {
    step: 3,
    title: "Choose University",
    description: "Select the course & university according to your interest",
    numColor: "text-[#f43f5e]",
    borderColor: "border-[#f43f5e]",
    bgColor: "bg-[#fff1f6]",
    bottomBar: "bg-[#f43f5e]",
  },
  {
    step: 4,
    title: "Online Payment",
    description: "You need to make a smooth online fee submission",
    numColor: "text-[#16a34a]",
    borderColor: "border-[#16a34a]",
    bgColor: "bg-[#effff5]",
    bottomBar: "bg-[#16a34a]",
  },
  {
    step: 5,
    title: "Document Submit",
    description: "You need to upload all the required verified documents.",
    numColor: "text-[#9333ea]",
    borderColor: "border-[#9333ea]",
    bgColor: "bg-[#f9f0ff]",
    bottomBar: "bg-[#9333ea]",
  },
  {
    step: 6,
    title: "Admission Confirm",
    description: "Get Confirmation on your Email & Whatsapp",
    numColor: "text-[#f97316]",
    borderColor: "border-[#f97316]",
    bgColor: "bg-[#fff4e9]",
    bottomBar: "bg-[#f97316]",
  },
];

export const CU_FAQS = [
  {
    question: "Q1. How does CU provide top-quality education online course while offering flexibility?",
    answer:
      "Chandigarh University aim to provide top-notch education quality content offering learn from anywhere, anytime mantra through both live and recorded classes.",
  },
  {
    question: "Q2. What qualification needs to enroll at Chandigarh online University?",
    answer:
      "For undergraduate programs, candidates must have passed 10+2 from a recognized board. For postgraduate programs, a recognized bachelor's degree in the relevant discipline is required.",
  },
  {
    question: "Q3. How can Students apply for the CU online program?",
    answer:
      "Students can apply online by submitting their application details through our portal, uploading mandatory identity & educational documents, and completing fee verification.",
  },
  {
    question: "Q4. Do Chandigarh University offers other same certificate to the online students as regular students?",
    answer:
      "Yes, Chandigarh University online degrees hold complete academic equivalence and recognition on par with regular on-campus degrees under UGC-DEB notifications.",
  },
  {
    question: "Q5. Can students get EMI or any kind of scholarship from Chandigarh University?",
    answer:
      "Yes, Chandigarh University provides zero-interest easy EMI instalment facilities along with merit-based and need-based scholarship options for eligible applicants.",
  },
  {
    question: "Q6. How can a student get more information about Chandigarh Online University?",
    answer:
      "Students can reach out directly to the counseling helpline at +91 7065 7777 55 or request a callback through the online enquiry form for detailed program information.",
  },
];

