export const smuImg = (file) => `/assets/all_universities_images/smu/${file}`;

export const SMU_COURSES = [
  { value: "BA", label: "Bachelor of Arts (BA)" },
  { value: "BCOM", label: "Bachelor of Commerce (B.Com)" },
  { value: "MA", label: "Master of Arts (MA)" },
  { value: "MBA", label: "Master of Business Administration (MBA)" },
  { value: "MCOM", label: "Master of Commerce (M.Com)" },
  { value: "MCA", label: "Master of Computer Application (MCA)" },
];

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh",
  "Jammu and Kashmir", "Ladakh"
];

export const SMU_APPROVALS = [
  {
    image: smuImg("NAAC.png"),
    title: "NAAC Accredited with A+ Grade",
  },
  {
    image: smuImg("iirf-main.png"),
    title: "Recognized among India's leading universities in 2025",
  },
  {
    image: smuImg("UGC.png"),
    title: "UGC-Entitled Online Degrees",
  },
  {
    image: smuImg("WURI_logo.webp"),
    title: "Recognised among the top global universities",
  },
  {
    image: smuImg("IIRF.png"),
    title: "IIRF Rank 1 – Top Private University in North East (2023)",
  },
];

export const SMU_PROGRAMMES = [
  {
    code: "MCA",
    title: "Master of Computer Application",
    image: smuImg("mca.jpg"),
    desc: "Learners get prepared for in-demand tech careers with Sikkim Manipal University courses. This program enhances industry relevance knowledge in computer applications.",
  },
  {
    code: "BA",
    title: "Bachelor of Arts",
    image: smuImg("ba.jpg"),
    desc: "Learners explore fields like humanities and social sciences through these Sikkim Manipal University online courses. These are designed for their wide range of career paths.",
  },
  {
    code: "BCOM",
    title: "Bachelor of Commerce",
    image: smuImg("bcom.jpg"),
    desc: "Sikkim Manipal University course admissions in the BCom program build expertise in business laws, finance, and cost accounting.",
  },
  {
    code: "MBA",
    title: "Master of Business Administration",
    image: smuImg("mba.jpg"),
    desc: "Sikkim Manipal University Online MBA is designed for working professionals and entrepreneurs to build leadership and strategic management skills.",
  },
  {
    code: "MCOM",
    title: "Master of Commerce",
    image: smuImg("mcom.jpg"),
    desc: "Learners can advance their careers in finance and business with an online MCom course from Sikkim Manipal University Online.",
  },
  {
    code: "MA",
    title: "Master of Arts",
    image: smuImg("ma.jpg"),
    desc: "Students get an opportunity to explore a wide range of humanities subjects with student-friendly and affordable online MA degree.",
  },
];

export const SMU_ADVANTAGES = [
  {
    title: "Detailed Curriculum",
    image: smuImg("Quality-education.jpg"),
    desc: "The Sikkim Manipal University courses curriculum has been designed to cover all critical aspects of each and every field.",
  },
  {
    title: "Financial Support",
    image: smuImg("27-years-of-academic-legacy.jpg"),
    desc: "SMU Online offers scholarships to learners from defence personnel, belonging to Northeastern India, and disabled students.",
  },
  {
    title: "Powerful Alumni Connections",
    image: smuImg("industry-relevant.jpg"),
    desc: "SMU Online has one of the strongest alumni networks. Graduates of this university work in leading organisations globally.",
  },
  {
    title: "Experienced Faculty",
    image: smuImg("Experienced-faculty.jpg"),
    desc: "Sikkim Manipal University online courses are directed by industry-experienced faculty who all support practical and engaging learning.",
  },
  {
    title: "Decades of Trust",
    image: smuImg("Attractive-Scholarships.jpg"),
    desc: "The university has built many years of trust. Sikkim Manipal University is known for excellence in high-quality and credible education across India.",
  },
  {
    title: "Top-Tier Learning",
    image: smuImg("Comprehensive-curriculum.jpg"),
    desc: "Sikkim Manipal University Online University has been approved by UGC and accredited by NAAC. It guarantees academic excellence among learners.",
  },
  {
    title: "Easy Payment Plans",
    image: smuImg("EMI.webp"),
    desc: "Sikkim Manipal University course admissions offer flexible EMI options. It reduces financial stress for students.",
  },
];

export const SMU_STATS = [
  { number: "27+ years", label: "Quality education" },
  { number: "530+", label: "Faculty & staff" },
  { number: "90+", label: "Research grants" },
  { number: "168+", label: "Research publications" },
];

export const SMU_PROCESS_STEPS = [
  {
    num: 1,
    title: "Submit Form",
    desc: "Fill in and submit your application form online",
    themeColor: "#ff7a00",
    borderColor: "border-[#ff7a00]",
    textColor: "text-[#ff7a00]",
    cardBg: "bg-[#fff8f0]",
  },
  {
    num: 2,
    title: "Expert's Counseling",
    desc: "You will receive a call from our expert counselor",
    themeColor: "#0066cc",
    borderColor: "border-[#0066cc]",
    textColor: "text-[#0066cc]",
    cardBg: "bg-[#f0f7ff]",
  },
  {
    num: 3,
    title: "Choose University",
    desc: "Select the course & university according to your interest",
    themeColor: "#ff2a6d",
    borderColor: "border-[#ff2a6d]",
    textColor: "text-[#ff2a6d]",
    cardBg: "bg-[#fff0f5]",
  },
  {
    num: 4,
    title: "Online Payment",
    desc: "You need to make a smooth online fee submission",
    themeColor: "#16a34a",
    borderColor: "border-[#16a34a]",
    textColor: "text-[#16a34a]",
    cardBg: "bg-[#f0faf3]",
  },
  {
    num: 5,
    title: "Document Submit",
    desc: "You need to upload all the required verified documents.",
    themeColor: "#8b5cf6",
    borderColor: "border-[#8b5cf6]",
    textColor: "text-[#8b5cf6]",
    cardBg: "bg-[#f7f2ff]",
  },
  {
    num: 6,
    title: "Admission Confirm",
    desc: "Get Confirmation on your Email & Whatsapp",
    themeColor: "#ff7a00",
    borderColor: "border-[#ff7a00]",
    textColor: "text-[#ff7a00]",
    cardBg: "bg-[#fff8f0]",
  },
];

export const SMU_FAQS = [
  {
    q: "How can applicants apply to the Sikkim Manipal University Online?",
    a: "In order to gain admission in Online SMU, applicants need to complete the online application form. They have to pay the fees after attaching the required documents. No entrance exam requirement is involved.",
  },
  {
    q: "What are all the courses offered by Sikkim Manipal University Online?",
    a: "SMU online provides courses in different areas, which include MBA, MCom, MCA, MA, BA, and BCom.",
  },
  {
    q: "Is UGC accrediting Sikkim Manipal University Online?",
    a: "Yes, SMU Online educational programs are approved by the University Grants Commission and are recognised by the UGC-DEB, which assures credible degrees to higher education.",
  },
  {
    q: "Does Sikkim Manipal University have an EMI choice of course admissions?",
    a: "Yes, Several EMI options are offered by SMU online for flexible payment plans.",
  },
  {
    q: "Is Sikkim Manipal University Online degree make one eligible for government jobs?",
    a: "Yes, the online degrees of Sikkim Manipal University Online are UGC recognised, which makes the applicant eligible for jobs in the government sector.",
  },
  {
    q: "How can one enquire more about Sikkim Manipal University Online?",
    a: "Students can visit the official website of the university or visit DistanceEducationSchool.com.",
  },
];

