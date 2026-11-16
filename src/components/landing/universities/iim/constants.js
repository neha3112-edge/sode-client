export const iimImg = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return path;
  return `/assets/iim/${path}`;
};

export const IIM_NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Eligibility", href: "#eligibility" },
  { label: "Sample Degree", href: "#sample-degree" },
  { label: "FAQ", href: "#faq" },
];

export const IIM_STATS = [
  { number: "50%", label: "Avg Salary Hike", icon: "ic-01.webp" },
  { number: "10K+", label: "Student Enrolled", icon: "ic-02.webp" },
  { number: "100+", label: "Hiring Partners", icon: "ic-03.webp" },
  { number: "500+", label: "Industry Experts", icon: "ic-04.webp" },
];

export const IIM_OVERVIEW = {
  title: "The IIM Kozhikode HRM Analytics Certification Courses",
  desc: "The certificate course of IIM Kozhikode in HR Analytics is a 6-month online program that helps professionals learn HR concepts with modern analytics. The course is 280 hours of expert learning, live faculty sessions, and industry projects. Learners receive hands-on training in tools such as Tableau, Excel, and Power BI. The course is recognized as one of the leading HR courses. It is ideal for HR professionals, managers, and MBA graduates seeking to advance their careers.",
};

export const IIM_KEY_SKILLS = [
  {
    title: "Strategic Human Resource Management",
    desc: "Learn to align HR frameworks with long-term organizational goals and business growth.",
    icon: "icon-iim-01.webp",
  },
  {
    title: "HR Data Interpretation and Reporting",
    desc: "Develop the ability to analyze complex HR data sets and create meaningful reports for leadership decision-making.",
    icon: "icon-iim-02.webp",
  },
  {
    title: "Workforce Planning and Forecasting",
    desc: "Acquire tools to predict staffing needs, manage workforce gaps, and ensure future-ready talent pipelines.",
    icon: "icon-iim-03.webp",
  },
  {
    title: "Talent Analytics",
    desc: "Apply evidence-based methods to measure productivity, identify high-potential employees, and improve overall performance.",
    icon: "icon-iim-04.webp",
  },
  {
    title: "Employee Engagement and Retention",
    desc: "Master strategies to enhance job satisfaction, reduce attrition, and strengthen employee loyalty.",
    icon: "icon-iim-05.webp",
  },
  {
    title: "People Analytics",
    desc: "Explore behavioral insights to understand workforce dynamics and improve workplace culture and efficiency.",
    icon: "icon-iim-06.webp",
  },
];

export const IIM_TOOLS = [
  {
    name: "Power BI",
    image: "power-bi.webp",
    desc: "Power BI : Transform HR data into dynamic dashboards and interactive reports that support strategic decisions.",
  },
  {
    name: "Tableau",
    image: "tableau.webp",
    desc: "Tableau: Build advanced data visualizations to track employee performance, workforce trends, and organizational growth.",
  },
  {
    name: "Microsoft Excel",
    image: "microsoft-excel.webp",
    desc: "Microsoft Excel: Strengthen skills in workforce planning, data management, and predictive modeling with the HR tool.",
  },
];

export const IIM_ABOUT = {
  title: "ABOUT IIM - KOZHIKODE",
  desc: "IIM Kozhikode is recognized as one of India's leading business schools, known for its innovative teaching, global outlook, and strong industry partnerships. The institute offers a broad portfolio of programs, including executive and online learning opportunities tailored for professionals. With prestigious accreditations such as the Ministry of Education, EQUIS, and AACSB, IIM Kozhikode stands among globally benchmarked institutions. Through its specialized programs, such as IIM Kozhikode's HRM, and advanced certification options, the institute ensures that learners gain both academic depth and practical business insights. These certification courses in IIM Kozhikode are designed to prepare graduates, working executives, and managers to succeed in leadership and analytics-driven roles worldwide.",
  campusImage: "iim-university-image.webp",
  accreditations: [
    { name: "AMBA", image: "amba-iim.webp" },
    { name: "EQUIS", image: "equis-iim.webp" },
    { name: "AACSB", image: "aacsb-iim.webp" },
    { name: "Ministry of Education", image: "ministry-of-education.webp" },
  ],
};

export const IIM_ELIGIBILITY = {
  title: "Eligibility for IIM Kozhikode HRM Online Courses",
  items: [
    {
      title: "HR Professionals",
      desc: "Working HR professionals can enroll in the IIM Kozhikode HR Analytics Course to enhance decision-making skills and apply analytics in workforce management.",
    },
    {
      title: "Business and Analytics Managers",
      desc: "Managers from different fields can join IIM Kozhikode HRM online courses to integrate data-driven strategies into business and people management.",
    },
    {
      title: "Non-HR Professionals",
      desc: "Graduates or executives from other domains can pursue the HR Analytics programs at IIM Kozhikode to transition into HR-focused or leadership roles.",
    },
    {
      title: "MBA Graduates",
      desc: "Fresh MBA graduates can strengthen their profiles with specialized certification courses in IIM Kozhikode, gaining practical HR analytics expertise for better career opportunities.",
    },
  ],
  modelImage: "mobile-model.webp",
};

export const IIM_DEGREE = {
  title: "IIM Kozhikode",
  titleSecondLine: "Sample Degree",
  subtitle: "HR Analytics Certification Course",
  desc: "Complete all course modules and earn a professional HR Management and Analytics certification from IIM Kozhikode. This course will help you develop important skills for the HR field. It will also boost your career and make you more competitive in the job market.",
  certificateImage: "sample-certificate.webp",
};

export const IIM_PARTNERS = [
  { name: "Capco", image: "capco.webp" },
  { name: "Cognizant", image: "Cognizant.webp" },
  { name: "Delhivery", image: "Delhivery.webp" },
  { name: "Capita", image: "capita.webp" },
  { name: "Disney", image: "disnep.webp" },
  { name: "Codeyoung", image: "codeyoung.webp" },
  { name: "CBSPL", image: "cbspl.webp" },
];

export const IIM_ADMISSION_STEPS = [
  {
    num: "1",
    title: "Submit Form",
    desc: "Fill in and submit your application form online",
    themeColor: "#ff7a00",
    borderColor: "#ff7a00",
    cardBg: "#fff8f0",
  },
  {
    num: "2",
    title: "Expert's Counseling",
    desc: "You will receive a call from our expert counselor",
    themeColor: "#0066cc",
    borderColor: "#0066cc",
    cardBg: "#f0f7ff",
  },
  {
    num: "3",
    title: "Choose University",
    desc: "Select the course & university according to your interest",
    themeColor: "#ff2a6d",
    borderColor: "#ff2a6d",
    cardBg: "#fff0f5",
  },
  {
    num: "4",
    title: "Online Payment",
    desc: "You need to make a smooth online fee submission",
    themeColor: "#16a34a",
    borderColor: "#16a34a",
    cardBg: "#f0faf3",
  },
  {
    num: "5",
    title: "Document Submit",
    desc: "You need to upload all the required verified documents.",
    themeColor: "#8b5cf6",
    borderColor: "#8b5cf6",
    cardBg: "#f7f2ff",
  },
  {
    num: "6",
    title: "Admission Confirm",
    desc: "Get Confirmation on your Email & Whatsapp",
    themeColor: "#ff7a00",
    borderColor: "#ff7a00",
    cardBg: "#fff8f0",
  },
];

export const IIM_FAQS = [
  {
    q: "Q1. What is the duration of the IIM Kozhikode HR Analytics Course?",
    a: "The IIM Kozhikode HR Analytics Course spans 6 months and comprises live classes, industry projects, and hands-on learning with tools such as Power BI, Tableau, and Excel.",
  },
  {
    q: "Q2. Is the IIM Kozhikode HRM Online Course suitable for working professionals?",
    a: "Yes, the IIM Kozhikode HRM Online Courses are designed for flexibility, making them ideal for professionals who want to balance work while upgrading their skills.",
  },
  {
    q: "Q3. What certifications will I receive upon completing the program?",
    a: "Learners receive a recognized certification from IIM Kozhikode, along with a Power BI certification, making it one of the most valuable certification courses offered by IIM Kozhikode.",
  },
  {
    q: "Q4. What key skills are taught in HR Analytics IIM Kozhikode programs?",
    a: "The program covers strategic HR management, workforce planning, employee retention strategies, talent analytics, and people analytics, helping learners build practical expertise for career growth.",
  },
];

