export const vguImg = (filename) => `/assets/vgu/${filename}`;

export const VGU_COURSES = [
  { label: "Online MBA", value: "Online MBA" },
  { label: "Online MCA", value: "Online MCA" },
  { label: "Online MSC", value: "Online MSC" },
  { label: "Online MA", value: "Online MA" },
  { label: "Online MA-JMC", value: "Online MA-JMC" },
  { label: "Online BBA", value: "Online BBA" },
  { label: "Online BCA", value: "Online BCA" },
  { label: "Online BA", value: "Online BA" },
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

export const VGU_APPROVALS = [
  {
    image: vguImg("ugc-1.webp"),
    title: "Recognised by the University Grants Commission of India (UGC)",
  },
  {
    image: vguImg("naac-a-1.webp"),
    title: "Accredited by the National Assessment and Accreditation Council (NAAC)",
  },
  {
    image: vguImg("aicte-1.webp"),
    title: "Approved by the All India Council for Technical Education (AICTE)",
  },
  {
    image: vguImg("qs.webp"),
    title: "Globally ranked by QS World University Rankings",
  },
];

export const VGU_PROGRAMMES = [
  {
    code: "mba",
    duration: "24 Months",
    title: "MBA",
    subtitle: "Master of Business Administration",
    description:
      "A flexible Vivekananda Global University Online MBA course helps students build strong business skills. It helps learners for leadership roles with real-world knowledge.",
    image: vguImg("mba-vgu.webp"),
  },
  {
    code: "mca",
    duration: "24 Months",
    title: "MCA",
    subtitle: "Master of Computer Applications",
    description:
      "Online VGU offers its MCA program, which enhances the student learning experience with practical IT skills and boosts career growth through industry-focused courses.",
    image: vguImg("mca-vgu.webp"),
  },
  {
    code: "msc",
    duration: "24 Months",
    title: "MSC",
    subtitle: "Master of Science",
    description:
      "A research-focused online MSc program offered by Online VGU that helps students enhance analytical skills through their well-written online VGU university courses.",
    image: vguImg("msc-vgu.webp"),
  },
  {
    code: "ma",
    duration: "24 Months",
    title: "MA",
    subtitle: "Master of Arts",
    description:
      "The university offers online MA courses with multiple specialisations, such as English and Economics. Overall, help students deepen their knowledge in academic research.",
    image: vguImg("ma-vgu.webp"),
  },
  {
    code: "ma-jmc",
    duration: "24 Months",
    title: "MA-JMC",
    subtitle: "Master of Journalism and Mass Communication",
    description:
      "Online VGU offers the MA-JMC program that is designed for learners who are interested in News Reporting, Public Relations, Advertising, News Editing, and Broadcast Media.",
    image: vguImg("mjmc.webp"),
  },
  {
    code: "bba",
    duration: "36 Months",
    title: "BBA",
    subtitle: "Bachelor of Business Administration",
    description:
      "An industry-aligned Online BBA offer by online VGU is a program that helps students improve communication, analytical, and management skills for business.",
    image: vguImg("bba-vgu.webp"),
  },
  {
    code: "bca",
    duration: "36 Months",
    title: "BCA",
    subtitle: "Bachelor of Computer Applications",
    description:
      "The VGU Online BCA program builds strong computer application skills and prepares students for tech careers. They get an opportunity to learn programming, database management, web development, etc.",
    image: vguImg("bca-vgu.webp"),
  },
  {
    code: "ba",
    duration: "36 Months",
    title: "BA",
    subtitle: "Bachelor of Arts",
    description:
      "Online VGU offers a flexible Online BA program that helps students broaden their knowledge and career through well-designed VGU university Course admissions.",
    image: vguImg("ba-vgu.webp"),
  },
];

export const VGU_WHY_CHOOSE = [
  {
    icon: vguImg("ugc-vgu.webp"),
    title: "UGC-entitles & NAAC A+",
    description:
      "Top-accredited degrees at online VGU that are recognised all over India and worldwide.",
  },
  {
    icon: vguImg("hiring-vgu.webp"),
    title: "Industry-oriented programs",
    description:
      "Career-relevant undergraduate and postgraduate courses at VGU online are designed to match the industry standards.",
  },
  {
    icon: vguImg("classroom-vgu.webp"),
    title: "Flexible Learning",
    description:
      "Start your career journey with flexible learning options at Vivekananda Global University's online courses.",
  },
  {
    icon: vguImg("placement-vgu.webp"),
    title: "Dual Degree Opportunities",
    description:
      "The university invites students who want to pursue more than one degree at a time with its dual degree programs.",
  },
  {
    icon: vguImg("emi-vgu.webp"),
    title: "Affordable Fee Structure",
    description:
      "The online courses at Vivekananda Global University are budget-friendly and come with financial support, including EMI and scholarship options.",
  },
  {
    icon: vguImg("courses-vgu.webp"),
    title: "Examination On-Demand",
    description:
      "VGU online provides an opportunity for students to take assessments and exams at their own pace and schedule.",
  },
];

export const VGU_PROCESS_STEPS = [
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

export const VGU_FAQS = [
  {
    question: "Q1. Why choose Vivekananda Global University for online courses?",
    answer:
      "VGU Online offers an extensive range of UGC-recognised online UG and PG courses. The online VGU degree is accepted worldwide in all sectors of jobs.",
  },
  {
    question: "Q2. Are VGU online degrees for all programs valid?",
    answer:
      "Yes, the Vivekananda Global University is very recognised and accepted by recognised and reputable colleges like UGC, NAAC and NIRF. Its online degree is accepted in higher studies, civil exams, government and private sector employment.",
  },
  {
    question: "Q3. How can I apply for the Vivekananda Global University online mba?",
    answer:
      "Vivekananda Global University online MBA offers a fully online admission process, making it easy to apply and fill out the application form for the desired courses.",
  },
  {
    question: "Q4. Is the learning schedule flexible for VGU Online bca?",
    answer:
      "Yes, VGU online offers a user-friendly LMS system. Students are able to use live classes, recorded lectures, e-study material, assignments, and tasks at their own choice.",
  },
  {
    question: "Q5. Can a working professional pursue higher education while working?",
    answer:
      "Vivekananda Global University course admissions provide learners a chance to study at their own pace. They can study at any time, at any location.",
  },
  {
    question: "Q6. How can one get more information about Vivekananda Global University online?",
    answer:
      "Learners and professionals can check the official website portal or visit DistanceEducationSchool.com or call our counseling helpline at +91 7065 7777 55.",
  },
];

