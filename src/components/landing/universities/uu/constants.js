export const uuImg = (filename) => `/assets/uu/${filename}`;

export const UU_COURSES = [
  { label: "Online BBA", value: "Online BBA" },
  { label: "Online BCA", value: "Online BCA" },
  { label: "Online BA", value: "Online BA" },
  { label: "Online MBA", value: "Online MBA" },
  { label: "Online MCA", value: "Online MCA" },
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

export const UU_UG_COURSES = [
  {
    title: "Bachelor of Arts",
    image: uuImg("ba-uttaranchal.webp"),
    description:
      "Uttaranchal University Online offers an online BA program that covers diverse areas such as literature, history, sociology, and many more.",
    duration: "3 Years",
    type: "Online Course",
  },
  {
    title: "Bachelor of Business Administration",
    image: uuImg("bba-uttaranchal.webp"),
    description:
      "Uttaranchal University Online offers an online BBA program that covers key areas like management, marketing, and many more.",
    duration: "3 Years",
    type: "Online Course",
  },
  {
    title: "Bachelor of Computer Application",
    image: uuImg("bca-uttaranchal.webp"),
    description:
      "Uttaranchal University Online offers an online BCA program that focuses on programming, IT skills, and many more.",
    duration: "3 Years",
    type: "Online Course",
  },
];

export const UU_PG_COURSES = [
  {
    title: "Master of Business Administration",
    image: uuImg("mba-uttaranchal.webp"),
    description:
      "Uttaranchal University's Online MBA program delves into finance, business strategy, and many more.",
    duration: "2 Years",
    type: "Online Course",
  },
  {
    title: "Master of Computer Application",
    image: uuImg("mca-uttaranchal.webp"),
    description:
      "Uttaranchal University's Online MCA program offers courses in coding, IT infrastructure, and many more.",
    duration: "2 Years",
    type: "Online Course",
  },
];

export const UU_APPROVALS = [
  {
    image: uuImg("naac-a+.webp"),
    alt: "NAAC A+ Accreditation",
  },
  {
    image: uuImg("aicte.webp"),
    alt: "AICTE Approved",
  },
  {
    image: uuImg("aiu.webp"),
    alt: "AIU Member",
  },
  {
    image: uuImg("iso.webp"),
    alt: "ISO 9001:2015 Certified",
  },
  {
    image: uuImg("qs.png"),
    alt: "QS World University Rankings",
  },
  {
    image: uuImg("wuri.webp"),
    alt: "WURI Ranked",
  },
];

export const UU_BENEFITS = [
  {
    title: "Online Live Lectures",
    icon: uuImg("Live-Lectures-uttranchal.webp"),
  },
  {
    title: "Personalised Mentorship",
    icon: uuImg("mentorship.png"),
  },
  {
    title: "Recorded Video Content",
    icon: uuImg("recorded-Video-Content.webp"),
  },
  {
    title: "Placement Support",
    icon: uuImg("placements-support.webp"),
  },
  {
    title: "Learning Flexibility",
    icon: uuImg("learning-Flexibility.webp"),
  },
  {
    title: "International Collaborations",
    icon: uuImg("international-collaboration.webp"),
  },
];

export const UU_WHY_CHOOSE = [
  {
    title: "Engagement",
    icon: uuImg("icon-uttaranchal-1.webp"),
    description:
      "Uttaranchal University online offers top-tier support to its students and mentorship for personalised learning.",
  },
  {
    title: "Student-Friendly Study",
    icon: uuImg("icon-uttaranchal-2.webp"),
    description:
      "Uttaranchal University's online, user-friendly, learner-centric LMS, live and interactive sessions, and well-designed, self learning materials.",
  },
  {
    title: "Curriculum by Experts",
    icon: uuImg("icon-uttaranchal-3.webp"),
    description:
      "Uttaranchal University's online research-intensive curriculum is drafted by its expert members of faculty and industry leaders.",
  },
  {
    title: "Globally Accepted",
    icon: uuImg("icon-uttaranchal-4.webp"),
    description:
      "Uttaranchal University's online programs under its curriculum are globally accepted. Uttaranchal University's fee is also affordable for all its programs.",
  },
];

export const UU_PROCESS_STEPS = [
  {
    step: 1,
    title: "Submit Form",
    description: "Fill in and submit your application form online",
    bgColor: "bg-[#fff4e9]",
    borderColor: "border-[#ff8c32]",
    numColor: "text-[#ff8c32]",
    bottomBar: "bg-[#ff8c32]",
  },
  {
    step: 2,
    title: "Expert's Counseling",
    description: "You will receive a call from our expert counselor",
    bgColor: "bg-[#eef6ff]",
    borderColor: "border-[#0b5ed7]",
    numColor: "text-[#0b5ed7]",
    bottomBar: "bg-[#0b5ed7]",
  },
  {
    step: 3,
    title: "Choose University",
    description: "Select the course & university according to your interest",
    bgColor: "bg-[#fff1f6]",
    borderColor: "border-[#ff2d6f]",
    numColor: "text-[#ff2d6f]",
    bottomBar: "bg-[#ff2d6f]",
  },
  {
    step: 4,
    title: "Online Payment",
    description: "You need to make a smooth online fee submission",
    bgColor: "bg-[#effff5]",
    borderColor: "border-[#1faa59]",
    numColor: "text-[#1faa59]",
    bottomBar: "bg-[#1faa59]",
  },
  {
    step: 5,
    title: "Document Submit",
    description: "You need to upload all the required verified documents.",
    bgColor: "bg-[#f9f0ff]",
    borderColor: "border-[#8e2de2]",
    numColor: "text-[#8e2de2]",
    bottomBar: "bg-[#8e2de2]",
  },
  {
    step: 6,
    title: "Admission Confirm",
    description: "Get Confirmation on your Email & Whatsapp",
    bgColor: "bg-[#fff4e9]",
    borderColor: "border-[#ff8c32]",
    numColor: "text-[#ff8c32]",
    bottomBar: "bg-[#ff8c32]",
  },
];

export const UU_FAQS = [
  {
    question: "When did Online UU, under which Act, come into existence?",
    answer:
      "Uttaranchal University online was established under Act No. 11 of 2013 and established in 2013.",
  },
  {
    question: "Is Uttaranchal University's online fee affordable for students?",
    answer:
      "Yes, the fee for Uttaranchal University online is affordable for the students and learners. Up to 30% in scholarships are available for online UU early admissions.",
  },
  {
    question: "Where is the Online UU situated?",
    answer:
      "Uttaranchal University is located in the capital of Uttarakhand, Dehradun, India.",
  },
  {
    question: "Is the Online UU degree valid?",
    answer:
      "Yes, Uttaranchal University's online degree is valid. Uttaranchal University online holds recognition from UGC AND NAAC grade A+.",
  },
  {
    question: "How can a student get more information about Online UU?",
    answer:
      "Learners can check the official website portal or visit DistanceEducationSchool.com",
  },
];

