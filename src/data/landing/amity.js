export const amityData = {
  slug: "amity",

  /* =======================================================
     SEO / META
  ======================================================= */

  meta: {
    title:
      "Amity University Online Degree Course Fees & Admission 2026",

    description:
      "Amity University Online Degree Course Fees & Admission Open Jan 2026. MBA, MCA, MA, BCA, BBA, BA, B.Com, M.Com. Find UGC Approved Program Syllabus, Eligibility and EMI details.",

    keywords: [
      "Amity University Online",
      "Amity Online MBA",
      "Amity Online MCA",
      "Amity Distance Education",
      "Amity Online Fees",
      "Amity Admission 2026",
    ],
  },

  /* =======================================================
     GLOBAL THEME
  ======================================================= */

  theme: {
    primaryColor: "#08417b",
    accentColor: "#fdb913",
    heroBg: "#ffffff",
    tableHeaderBg: "#08417b",
    tableBorderColor: "#cbd5e1",
    footerBg: "#111111",
  },

  /* =======================================================
     PAGE-SPECIFIC CSS
  ======================================================= */

  customCss: `
    /* =====================================================
       PAGE-SPECIFIC CSS FOR AMITY UNIVERSITY ONLINE
    ===================================================== */

    .amity-theme-btn {
      background-color: #fdb913;
      color: #000000;
      font-weight: 700;
    }

    .amity-theme-btn:hover {
      background-color: #e5a60b;
    }

    .amity-header-accent {
      color: #08417b;
    }
  `,

  /* =======================================================
     BRAND / LANDING PAGE CONFIGURATION

     NOTE:
     Logo/content comes from this object.
     Navbar positioning stays inside LandingNavbar.jsx.
  ======================================================= */

  brand: {
    slug: "amity",

    name: "Amity University Online",
    shortName: "Amity",

    hashtag: "#YourFutureBeginsHere",

    headline: "Amity University Online",

    tagline1:
      "Learn from Anywhere, Grow Everywhere",

    tagline2: "",

    phone: "+91 7065 7777 55",
    phoneDisplay: "+91 7065 7777 55",

    enquireTitle: "Enquire Now",
    enquireSubtitle:
      "Academic Experts will assist you!",

    officialUrl:
      "https://amityonline.com",

    /* =====================================================
       NAVBAR ASSETS
       These values decide WHAT is shown.
       Position/size remains reusable in LandingNavbar.jsx.
    ===================================================== */

    logo:
      "/assets/all_universities_images/amity/Amity-online-logo.png",

    sodeIcon:
      "/assets/all_universities_images/amity/sode-icon.png",

    sodeLogo:
      "/assets/all_universities_images/amity/new-des-logo.webp",

    showSodeLogo: true,

    whyChooseStudentImage:
      "/assets/all_universities_images/amity/Why-choose-amity.png",

    /* =====================================================
       BRAND COLORS
    ===================================================== */

    primaryColor: "#08417b",

    themeBg: "bg-[#08417b]",

    themeBorder:
      "border-[#08417b]",

    accentColor: "#fdb913",

    goldColor: "#fdb913",

    /* =====================================================
       NAVBAR CTA
    ===================================================== */

    showCouponBtn: false,
    showCouponButton: false,

    badgeText:
      "Admission Open 2026",

    /* =====================================================
       APPROVALS CONFIGURATION
    ===================================================== */

    approvalsLayout: "amity",
    approvalsHeaderBg: "#ffd508",
    approvalsHeaderColor: "#08417b",
    approvalsBg: "#fff5c4",
    approvalsUniTitle: "Amity University Online",
    approvalsTitle: "Recognition and Approvals",

    /* =====================================================
       PROGRAMMES CONFIGURATION
    ===================================================== */
    programmesMobileStack: true,
    stickyCtaLayout: "default",
    stickyBrochureIcon: "whatsapp",
    stickyApplyStyle: "yellow",
    showFloatingCallOnMobile: true,

    /* =====================================================
       ABOUT & WHY CHOOSE CONFIGURATION
    ===================================================== */
    aboutLayout: "classic",
    whyChooseLayout: "classic",
    whyChooseTitle: "Why Choose Amity University Online for Degree Courses",

    /* =====================================================
       SECTION ORDER (Matching distanceeducationschool.com/amity/)
    ===================================================== */

    sectionOrder: [
      "approvals",
      "programmes",
      "about",
      "stats",
      "whyChoose",
      "admissionProcess",
      "faqs",
      "footerForm",
      "compareBanner",
    ],

    /* =====================================================
       HERO
    ===================================================== */

    hero: {
      backgroundImage:
        "/assets/all_universities_images/amity/amity-bg-final.webp",

      backgroundPosition:
        "center center",

      backgroundSize:
        "cover",

      backgroundRepeat:
        "no-repeat",

      mobileBackgroundImage:
        "/assets/all_universities_images/amity/Mobile-bg-amity.webp",

      mobileBackgroundPosition:
        "center top",

      mobileBackgroundSize:
        "cover",

      mobileImage:
        "/assets/all_universities_images/amity/university.webp",

      studentImage: null,

      noOverlay: true,
      mobileAlign: "left",

      backgroundColor: "#ffffff",

      headingColor: "#004172",

      taglineColor: "#333333",

      hashtagColor: "#444444",

      courseBorder: "#004172",

      formBackground: "#08417b",

      formTitleColor: "#fdb913",

      form: {
        title: "Enquire Now",
        subtitle: "Academic Experts will assist you!",
        namePlaceholder: "Enter Your Name",
        emailPlaceholder: "Enter Your Email",
        phonePlaceholder: "Enter Mobile Number",
        coursePlaceholder: "Select Your Course",
        statePlaceholder: "Select Your State",
        consentText:
          "I consent to receive university updates via email and mobile number.",
        disclaimerText: "Disclaimer",
        submitText: "Submit",
        phoneText: "+91 7065 7777 55",
        phoneHref: "+917065777755",
        colors: {
          background: "#08417b",
          title: "#fdb913",
          subtitle: "#ffffff",
          phoneBackground: "#fdb913",
          phoneText: "#000000",
          phoneIcon: "#000000",
          inputBackground: "#ffffff",
          inputText: "#1e293b",
          inputPlaceholder: "#888888",
          inputBorder: "transparent",
          selectBackground: "#ffffff",
          selectText: "#1e293b",
          selectPlaceholder: "#888888",
          selectBorder: "transparent",
          countryCodeBackground: "#f0f2f5",
          countryCodeText: "#1e293b",
          countryCodeBorder: "#d1d5db",
          consentText: "#ffffff",
          disclaimer: "#ffffff",
          submitBackground: "#22c55e",
          submitText: "#ffffff",
        },
        layout: {
          maxWidth: "360px",
          padding: "14px 16px 16px",
          borderRadius: "12px",
          fieldGap: "8px",
          submitButtonRadius: "8px",
        },
      },

      brochureButtonText:
        "Download Brochure",

      buttonBackground: "#ffffff",

      buttonTextColor: "#004172",

      buttonBorder:
        "2px solid #004172",

      buttonStyle: {
        backgroundColor: "#ffffff",
        color: "#004172",
        border:
          "2px solid #004172",
        borderRadius: "6px",
        fontWeight: "700",
        padding: "8px 24px",
        fontSize: "14px",
      },
    },

    /* =====================================================
       COURSE STRIP
    ===================================================== */

    coursesStrip: [
      "MBA | MCA | MCOM | MA | MSC |",
      "BBA | BCA | BCOM | BA",
    ],

    /* =====================================================
       FOOTER
    ===================================================== */

    footerDisclaimer:
      "SODE Counselling Services LLP act as a marketing agency. All university names, logos, and trademarks mentioned are used for informational purposes only. We are not a university or an admission authority. Users are encouraged to verify information on the official website of the University before making decisions.",
  },

  /* =======================================================
     COURSES
  ======================================================= */

  courses: [
    {
      value: "MBA",
      label: "MBA",
    },
    {
      value: "MCA",
      label: "MCA",
    },
    {
      value: "MCOM",
      label: "MCOM",
    },
    {
      value: "MA",
      label: "MA",
    },
    {
      value: "MSC",
      label: "MSC",
    },
    {
      value: "BBA",
      label: "BBA",
    },
    {
      value: "BCA",
      label: "BCA",
    },
    {
      value: "BCOM",
      label: "BCOM",
    },
    {
      value: "BA",
      label: "BA",
    },
  ],

  /* =======================================================
     APPROVALS
  ======================================================= */

  approvals: [
    {
      image:
        "/assets/all_universities_images/amity/Ugc-approval.png",

      text:
        "Approved by the University Grants Commission of India",

      tag: "UGC-DEB",
    },

    {
      image:
        "/assets/all_universities_images/amity/NaacA+-approval.png",

      text:
        "NAAC Accredited with A+ Grade",

      tag: "NAAC A+",
    },

    {
      image:
        "/assets/all_universities_images/amity/NIRF-Approval.png",

      text:
        "Ranked 32nd in NIRF (National Institutional Ranking Framework)",

      tag: "NIRF #32",
    },

    {
      image:
        "/assets/all_universities_images/amity/AICTE-Approval.png",

      text:
        "Approved by All India Council for Technical Education",

      tag: "AICTE",
    },

    {
      image:
        "/assets/all_universities_images/amity/THE-approval.png",

      text:
        "Recognised by The World University Rankings (THE)",

      tag: "THE Ranked",
    },

    {
      image:
        "/assets/all_universities_images/amity/QS-approval.png",

      text:
        "Ranked by QS (Quacquarelli Symonds)",

      tag: "QS Asia Top 10",
    },

    {
      image:
        "/assets/all_universities_images/amity/WES-Approval.png",

      text:
        "Recognised by World Education Services (WES)",

      tag: "WES (USA/Canada)",
    },

    {
      image:
        "/assets/all_universities_images/amity/WASc-approval.png",

      text:
        "Accredited by Western Association of Schools and Colleges (WASC)",

      tag: "WASC (USA)",
    },
  ],

  /* =======================================================
     STATS
  ======================================================= */

  stats: [
    {
      number: "30+",
      label: "Year Excellence",
      iconType: "building",
      circleBg: "bg-[#ffc107]",
    },

    {
      number: "500+",
      label: "Hiring Partners",
      iconType: "graduation",
      circleBg: "bg-[#2196f3]",
    },

    {
      number: "82K+",
      label: "Online Learners",
      iconType: "users",
      circleBg: "bg-[#4caf50]",
    },

    {
      number: "60+",
      label: "In-Demand Specialization",
      iconType: "book",
      circleBg: "bg-[#e91e63]",
    },
  ],

  /* =======================================================
     PROGRAMMES
  ======================================================= */

  programmes: [
    {
      id: "mba",
      code: "MBA",
      title:
        "Master of Business Administration",
      level: "Post Graduation",
      duration: "24 Months",
      image:
        "/assets/all_universities_images/amity/MBA-amity.png",
      description:
        "Amity University Online provides an online 2-year MBA program. Amity University MBA online program is crafted to help learners develop leadership, and business skills for successful careers or entrepreneurship.",
    },

    {
      id: "mca",
      code: "MCA",
      title:
        "Master of Computer Application",
      level: "Post Graduation",
      duration: "24 Months",
      image:
        "/assets/all_universities_images/amity/MCA-amity.png",
      description:
        "The Amity University online MCA program provides learning in advanced technologies and tools. The MCA Online Course Amity provides specializations in Blockchain and many other in collaboration with eCornell and TCS iON.",
    },

    {
      id: "mcom",
      code: "MCOM",
      title:
        "Master of Commerce",
      level: "Post Graduation",
      duration: "24 Months",
      image:
        "/assets/all_universities_images/amity/MCOM-amity.png",
      description:
        "Amity University Online M.com offers a rock foundation in 3 aspects - Commerce, Finance, and Technology. Amity University Online M.com offers a specialization in Financial Management, with many more providing strong career opportunities.",
    },

    {
      id: "ma",
      code: "MA",
      title: "Master of Arts",
      level: "Post Graduation",
      duration: "24 Months",
      image:
        "/assets/all_universities_images/amity/MA-amity.png",
      description:
        "Amity Online MA in Journalism & Mass Communication or English fosters high-level research capabilities, media production ethics, digital journalism, and creative writing.",
    },

    {
      id: "msc",
      code: "MSC",
      title:
        "Master of Science (Data Science)",
      level: "Post Graduation",
      duration: "24 Months",
      image:
        "/assets/all_universities_images/amity/msc-main-img.webp",
      description:
        "Amity Online MSC in Data Science offers industry-aligned syllabus covering Machine Learning, Big Data pipelines, Neural Networks, Python, and predictive business analytics.",
    },

    {
      id: "bba",
      code: "BBA",
      title:
        "Bachelor of Business Administration",
      level: "Graduation",
      duration: "36 Months",
      image:
        "/assets/all_universities_images/amity/BBA-amity.png",
      description:
        "In Amity University online BBA program, students learn topics like managerial economics and many more in-depth. The Amity online BBA Program provides an in-depth study of theoretical and functional areas of BBA.",
    },

    {
      id: "bca",
      code: "BCA",
      title:
        "Bachelor of Computer Application",
      level: "Graduation",
      duration: "36 Months",
      image:
        "/assets/all_universities_images/amity/BCA-amity.png",
      description:
        "Amity University Online BCA is a 3-year program that provides knowledge of computer skills in programming, software development, and managing digital data through its online BCA program with top in-demand market areas.",
    },

    {
      id: "bcom",
      code: "BCOM",
      title:
        "Bachelor of Commerce",
      level: "Graduation",
      duration: "36 Months",
      image:
        "/assets/all_universities_images/amity/BCOM-amity.png",
      description:
        "Amity University Online offers a 3-year B.COM program providing a solid base in accounting, taxation, business operations, marketing, fund management, and advertising. Amity online B.COM builds students' overall financial knowledge.",
    },

    {
      id: "ba",
      code: "BA",
      title: "Bachelor of Arts",
      level: "Graduation",
      duration: "36 Months",
      image:
        "/assets/all_universities_images/amity/BA-amity.png",
      description:
        "Amity University Online BA is a 3-year program that offers the necessary skills required in different work cultures-critical and innovative thinking, communication, humanities, and understanding of different languages.",
    },
  ],

  /* =======================================================
     ABOUT
  ======================================================= */

  about: {
    title: "About Amity University Online",
    paragraphs: [
      "Amity University Online is India's first UGC-approved online university. This university offers a total of 24 bachelor's and master's degree programs with a wide range of specializations. Amity University Uttar Pradesh, 'A+' NAAC grade, and is recognized by WES, AIU, making it eligible to conduct online courses in different fields. Amity University Online Degree Programs offers an in-demand, up-to-date curriculum. It follows the anytime, anywhere mantra for course content, providing all content, live & recorded lectures.",
      "The university also gives career support, expert mentorship, and placement assistance. With flexible learning options, EMI-based fee payment, and a strong academic reputation, it offers to its students.",
    ],
    text1:
      "Amity University Online is India's first UGC-approved online university. This university offers a total of 24 bachelor's and master's degree programs with a wide range of specializations. Amity University Uttar Pradesh, 'A+' NAAC grade, and is recognized by WES, AIU, making it eligible to conduct online courses in different fields. Amity University Online Degree Programs offers an in-demand, up-to-date curriculum. It follows the anytime, anywhere mantra for course content, providing all content, live & recorded lectures.",
    text2:
      "The university also gives career support, expert mentorship, and placement assistance. With flexible learning options, EMI-based fee payment, and a strong academic reputation, it offers to its students.",
    image: "/assets/all_universities_images/amity/Amity-About.png",
    imagePosition: "left",
    buttonText: "Apply Now",
    backgroundColor: "#ffffff",
    titleColor: "#08417b",
    textColor: "#333333",
    buttonColor: "#08417b",
    buttonTextColor: "#08417b",
    buttonBorderColor: "#08417b",
  },

  /* =======================================================
     WHY CHOOSE
  ======================================================= */

  whyChoose: [
    {
      title: "International Recognition",
      desc:
        "Amity Online is India's only university accredited by WASC (USA). Its degrees are WES-recognized in the USA and Canada, enabling global education.",
    },

    {
      title: "QS Ranked Online MBA",
      desc:
        "Amity offers India's only Online MBA ranked in the Asia Pacific Top 10 by QS, ensuring strong global recognition.",
    },

    {
      title:
        "Industry-Ready Certifications",
      desc:
        "Amity University Online includes top in-demand industry certificates and programs. Amity online programs from Amity University enhance students' skills and knowledge.",
    },

    {
      title:
        "AI-Powered Career Discovery Platform",
      desc:
        "Amity University online curriculum helps in building a strong resume for market-standard with AI-Powered Career Discovery Platform access to mock interviews, tools related to resumes, and jobs.",
    },
  ],

  /* =======================================================
     ADMISSION PROCESS
  ======================================================= */

  admissionTitle: "How to Apply for Amity University Online Courses",

  admissionSubtitle:
    "The admission process for Amity University course admissions is very simple and user-friendly. Here's a step-by-step guide to enrolling in a degree course at the university :",

  admissionHeadingColor: "#08417b",

  admissionProcess: {
    title: "How to Apply for Amity University Online Courses",
    subtitle:
      "The admission process for Amity University course admissions is very simple and user-friendly. Here's a step-by-step guide to enrolling in a degree course at the university :",
    headingColor: "#08417b",
  },

  enrollmentProcess: {
    title: "How to Apply for Amity University Online Courses",
    description:
      "The admission process for Amity University course admissions is very simple and user-friendly. Here's a step-by-step guide to enrolling in a degree course at the university :",
    sectionBg: "bg-white",
    containerClass: "w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto",
    gridClass:
      "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5 lg:gap-4",
  },

  /* =======================================================
     ADMISSION STEPS
  ======================================================= */

  admissionSteps: [
    {
      num: 1,
      title: "Submit Form",
      desc:
        "Fill in and submit your application form online",
      themeColor: "#ff7a00",
      borderColor: "#ff7a00",
      cardBg: "#fff6ee",
    },

    {
      num: 2,
      title: "Expert's Counseling",
      desc:
        "You will receive a call from our expert counselor",
      themeColor: "#0066cc",
      borderColor: "#0066cc",
      cardBg: "#f0f7ff",
    },

    {
      num: 3,
      title: "Choose University",
      desc:
        "Select the course & university according to your interest",
      themeColor: "#ff2a6d",
      borderColor: "#ff2a6d",
      cardBg: "#fff0f5",
    },

    {
      num: 4,
      title: "Online Payment",
      desc:
        "You need to make a smooth online fee submission",
      themeColor: "#16a34a",
      borderColor: "#16a34a",
      cardBg: "#f0faf3",
    },

    {
      num: 5,
      title: "Document Submit",
      desc:
        "You need to upload all the required verified documents.",
      themeColor: "#8b5cf6",
      borderColor: "#8b5cf6",
      cardBg: "#f7f2ff",
    },

    {
      num: 6,
      title: "Admission Confirm",
      desc:
        "Get Confirmation on your Email & Whatsapp",
      themeColor: "#ff7a00",
      borderColor: "#ff7a00",
      cardBg: "#fff6ee",
    },
  ],

  /* =======================================================
     FAQS
  ======================================================= */

  faqs: [
    {
      q:
        "Q1. Are the Amity University online programs recognized by UGC?",

      a:
        "Yes, Amity University Online programs are fully recognized and entitled by the University Grants Commission (UGC) of India. They also hold NAAC A+ accreditation, AICTE approvals, and global recognitions such as WASC (USA) and WES.",
    },

    {
      q:
        "Q2. What kind of online courses does Amity University online offer?",

      a:
        "Amity University Online offers various degrees and certifications. The main programs are the UG, PG in a wide range of fields, including MBA, MCA, M.COM, MA, BA, BBA, and many more, and certificates/diplomas under Amity online programs.",
    },

    {
      q:
        "Q3. Is the entrance exam required to take admission in Amity University online?",

      a:
        "No entrance examination is required for admission to most online degree programs at Amity University. Admissions are granted on the basis of eligibility criteria and academic merit in qualifying exams.",
    },

    {
      q:
        "Q4. What is the approximate duration of Amity University's online degree programs?",

      a:
        "Undergraduate programs (UG) such as BA, BBA, BCA, and B.Com generally have a duration of 3 years (6 semesters), while Postgraduate programs (PG) such as MBA, MCA, M.Com, MA, and M.Sc are of 2 years (4 semesters).",
    },

    {
      q:
        "Q5. What placement support do students receive after completing an online degree at Amity University online?",

      a:
        "Amity University Online provides dedicated virtual placement assistance, AI-powered career discovery tools, resume building, mock interviews, and access to 500+ top hiring partners across multinational corporations.",
    },
  ],

  /* =======================================================
     SCHOLARSHIP MODAL
  ======================================================= */

  scholarshipModal: {
    modalBg: "#08417b",

    titleColor: "#ffd200",

    subtitleColor: "#ffffff",

    inputBg: "#ffffff",

    inputTextColor: "#111827",

    disclaimerColor: "#ffffff",

    disclaimerLinkColor: "#ffffff",

    submitBtnBg: "#22c55e",

    submitBtnText: "Submit",

    closeBtnColor: "#22c55e",

    titleText:
      "Get Scholarship Coupon Code",

    subtitleText:
      "Academic Experts will assist you!",
  },

  /* =======================================================
     COMPARE MODAL
  ======================================================= */

  compareModal: {
    modalBg: "#ffffff",

    titleText:
      "Compare Universities",

    titleColor: "#ee3024",

    subtitleText:
      "Get expert help to compare universities",

    subtitleColor: "#111827",

    inputBg: "#f4f6f8",

    inputTextColor: "#111827",

    disclaimerColor: "#374151",

    disclaimerLinkColor: "#0066cc",

    submitBtnBg: "#22c55e",

    submitBtnText: "Submit",

    closeBtnColor: "#16a34a",

    phonePlaceholder:
      "Enter your Number",

    formName:
      "Compare Universities",
  },
};
