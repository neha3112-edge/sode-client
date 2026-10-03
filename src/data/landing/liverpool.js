import React from "react";
import Image from "next/image";

/**
 * Systematic Custom CSS for Liverpool Business School (LJMU) Landing Page
 * Matched precisely to https://distanceeducationschool.com/liverpool/
 */
export const liverpoolCustomCss = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800;900&family=Anton&display=swap');

  .landing-page--liverpool {
    font-family: 'Montserrat', sans-serif !important;
    scroll-behavior: smooth;
    color: #111111;
    background-color: #ffffff;
  }

  .landing-page--liverpool header.navbar {
    background: #ffffff !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05) !important;
  }

  .landing-page--liverpool .header_menu_list li a {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    color: #111111 !important;
    text-decoration: none !important;
    transition: color 0.2s ease !important;
  }

  .landing-page--liverpool .header_menu_list li a:hover {
    color: #00408d !important;
  }

  /* Hero Section */
  .landing-page--liverpool #hero {
    background-image: url(/assets/all_universities_images/liverpool/liverpool_desktop_new_bg.webp) !important;
    background-position: center top !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    padding: 30px 15px !important;
    min-height: auto !important;
    position: relative !important;
  }

  @media (max-width: 768px) {
    .landing-page--liverpool #hero {
      background-image: url(/assets/all_universities_images/liverpool/ljmu-mobile-front-image-697204236914a.webp) !important;
      background-position: center top !important;
      padding: 20px 10px !important;
    }
  }

  .landing-page--liverpool #hero > div.absolute {
    display: none !important;
  }

  .landing-page--liverpool #hero h1 {
    font-family: 'Anton', sans-serif !important;
    font-size: 62px !important;
    line-height: 1 !important;
    font-weight: 900 !important;
    letter-spacing: 0.5px !important;
    color: #00408d !important;
    margin: 10px 0 !important;
  }

  @media (max-width: 640px) {
    .landing-page--liverpool #hero h1 {
      font-size: 40px !important;
    }
  }

  /* Buttons */
  .landing-page--liverpool .downloadBrochureBtn {
    background-color: #F1BA00 !important;
    color: #00408d !important;
    font-weight: 700 !important;
    border-radius: 6px !important;
    transition: all 0.2s ease !important;
  }
  .landing-page--liverpool .downloadBrochureBtn:hover {
    background-color: #d9a700 !important;
  }

  .landing-page--liverpool .enquireNowBtn {
    background-color: #00408d !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    border-radius: 6px !important;
  }

  /* Compare section */
  .landing-page--liverpool .compare_box {
    background-color: #00408d !important;
  }

  /* Footer bottom */
  .landing-page--liverpool .mini-footer-bottom {
    background-color: #00408d !important;
  }
`;

export const liverpoolData = {
  slug: "liverpool",
  meta: {
    title: "Liverpool Business School Online MBA | LJMU Online MBA Program | Distance Education School",
    description: "Liverpool Business School Online MBA via LJMU. Explore LJMU Online MBA with specializations in Finance, Marketing, HR, Business Analytics, and Leadership. Check eligibility, fees & admission details for LBS MBA Pathway.",
    keywords: "Liverpool Business School Online MBA, LJMU Online MBA, LBS MBA Pathway, Liverpool John Moores University Online, Liverpool MBA fees, LJMU MBA eligibility",
    canonicalUrl: "https://distanceeducationschool.com/liverpool/",
    openGraph: {
      title: "Liverpool Business School Online MBA | LJMU Online Programs",
      description: "Liverpool Business School Online MBA program via LJMU. IIM Udaipur double certification, 100% online, globally recognized.",
      url: "https://distanceeducationschool.com/liverpool/",
      siteName: "Distance Education School",
      images: [
        {
          url: "https://distanceeducationschool.com/assets/all_universities_images/liverpool/lbs-logo-696b29d4429b8.webp",
          width: 800,
          height: 600,
          alt: "Liverpool Business School Online MBA",
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: "https://distanceeducationschool.com/liverpool/",
    },
  },
  customCss: liverpoolCustomCss,

  // Brand Configuration
  brand: {
    name: "Liverpool Business School",
    slug: "liverpool",
    primaryColor: "#00408d",
    themeColor: "#00408d",
    accentColor: "#2de1c2",
    fontFamily: "Montserrat",
    showSodeLogo: true,
    sodeIcon: "/assets/all_universities_images/liverpool/new_sode_tm_logo.png",
    hideMangLogo: true,
    showCouponBtn: false,
    hideNavbarBadge: true,
    sodeLogoContainerStyle: {
      width: "160px",
      height: "56px",
      minWidth: "120px",
    },
    callGif: "/assets/all_universities_images/liverpool/call_icon.gif",
    giftGif: "/assets/all_universities_images/liverpool/gift.gif",

    navLinks: [
      { label: "Courses", href: "#courses" },
      { label: "Approvals", href: "#accreditations" },
      { label: "About", href: "#about" },
      { label: "FAQ", href: "#faqs" },
    ],

    sectionOrder: [
      "stats",
      "programmes",
      "about",
      "approvals",
      "degree",
      "whyChoose",
      "admissionProcess",
      "faqs",
      "compareBanner",
    ],

    // Hero Section Configuration
    hero: {
      backgroundImage: "/assets/all_universities_images/liverpool/liverpool_desktop_new_bg.webp",
      mobileBackgroundImage: "/assets/all_universities_images/liverpool/ljmu-mobile-front-image-697204236914a.webp",
      mobileStudentImage: "/assets/all_universities_images/liverpool/liverpool_mobile_new_img.png",
      noOverlay: true,
      minHeight: "480px",

      welcomeText: (
        <Image
          src="/assets/all_universities_images/liverpool/lbs-logo-696b29d4429b8.webp"
          alt="Liverpool Business School"
          width={160}
          height={50}
          className="h-[36px] sm:h-[44px] w-auto object-contain"
        />
      ),
      welcomeContainerClassName: "!mb-2 !mt-0 !text-left",
      welcomeBadgeClassName: "!bg-transparent !p-0 !min-w-0 !shadow-none !border-none !rounded-none !block",

      hashtagText: (
        <span className="inline-block px-3 py-1 bg-[#00408d] text-white text-[12px] font-semibold rounded-[5px]">
          Master of Business Administration
        </span>
      ),
      hashtagStyle: {
        fontFamily: "'Montserrat', sans-serif",
        marginTop: "6px",
        marginBottom: "2px",
      },

      headlineText: "ONLINE MBA",
      headingFont: "'Anton', sans-serif",
      headingClassName: "!whitespace-pre-line !leading-[1] font-black text-[50px] sm:text-[62px] text-[#00408d]",
      headingStyle: {
        fontFamily: "'Anton', sans-serif",
        color: "#00408d",
        fontSize: "62px",
        lineHeight: "1",
        fontWeight: "900",
        marginTop: "6px",
        marginBottom: "6px",
      },

      taglineText: (
        <span>
          By <u className="font-semibold">Liverpool Business School</u> via <u className="font-semibold">upGrad</u>
        </span>
      ),
      taglineStyle: {
        fontFamily: "'Montserrat', sans-serif",
        color: "#000000",
        fontSize: "15px",
        fontWeight: "500",
        lineHeight: "1.3",
        marginTop: "2px",
        marginBottom: "8px",
      },

      highlightBox: {
        text: "Earn a Global MBA Degree\nwith IIM Udaipur Dual Certification",
        className: "!w-full !p-0 !bg-transparent !text-black !text-[17px] sm:text-[19px] !font-bold !text-left !shadow-none !m-0",
        style: {
          fontFamily: "'Montserrat', sans-serif",
          backgroundColor: "transparent",
          color: "#000000",
          border: "none",
          padding: 0,
          fontSize: "18px",
          fontWeight: "700",
          textAlign: "left",
          lineHeight: "1.25",
          display: "block",
          marginTop: "6px",
          marginBottom: "8px",
          whiteSpace: "pre-line",
        },
      },

      coursesStrip: [
        <div key="liverpool-pills" className="grid grid-cols-2 gap-2 max-w-[420px] my-3">
          <span key="liverpool-online" className="border-2 border-[#00408d] py-2 px-3 rounded-[5px] text-[#000] font-semibold text-[12.5px] sm:text-[13px] text-center bg-white/70">
            100% Online
          </span>
          <span key="liverpool-specializations" className="border-2 border-[#00408d] py-2 px-3 rounded-[5px] text-[#000] font-semibold text-[12.5px] sm:text-[13px] text-center bg-white/70">
            6+ Specializations
          </span>
          <span key="liverpool-iim" className="border-2 border-[#00408d] py-2 px-3 rounded-[5px] text-[#000] font-semibold text-[12.5px] sm:text-[13px] text-center bg-white/70">
            IIM Udaipur Cert.
          </span>
          <span key="liverpool-emi" className="border-2 border-[#00408d] py-2 px-3 rounded-[5px] text-[#000] font-semibold text-[12.5px] sm:text-[13px] text-center bg-white/70">
            No Cost EMI
          </span>
        </div>,
      ],

      brochureButtonText: "Download Brochure",
      buttonStyle: {
        fontFamily: "'Montserrat', sans-serif",
        background: "#F1BA00",
        backgroundColor: "#F1BA00",
        color: "#00408d",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "700",
        padding: "10px 22px",
      },

      cardStyle: "white",
      formBackground: "#ffffff",
      formCardType: "white",
      enquireTitle: "Admission Open",
      enquireSubtitle: "Academic Experts will assist you!",
      enquireColor: "#00408d",
      enquireSubtitleColor: "#333333",
      phoneBadgeBg: "#00408d",
      phoneBadgeBackground: "#00408d",
      phoneBadgeStyle: {
        background: "#00408d",
        backgroundColor: "#00408d",
        color: "#ffffff",
        borderRadius: "9999px",
        padding: "3px 14px",
        fontSize: "12px",
      },
      submitBtnBg: "#00408d",
      submitButtonBackground: "#00408d",
      submitButtonRadius: "6px",
      submitButtonTextColor: "#ffffff",
    },

    // Stats Section
    statsLayout: "liverpool",

    // Programmes Section
    programmesLayout: "liverpool",
    programmesTitle: "MBA Specialisations At",
    programmesSubtitle: "Liverpool Business School",

    // About Section
    aboutLayout: "liverpool",
    aboutTitle: "About Liverpool Business School",
    aboutBgImage: "/assets/all_universities_images/liverpool/ljmu-rev.png",

    // Approvals Section
    approvalsLayout: "liverpool",
    approvalsTitle: "Approvals & Recognition",
    approvalsSubtitle: "Liverpool Business School (LJMU)",

    // Degree Layout
    degreeLayout: "liverpool",

    // Why Choose
    whyChooseLayout: "liverpool",
    whyChooseTitle: "What Makes Us Stand Out",
    whyChooseSubtitle: "at Liverpool Business School",
    whyChooseImage: "/assets/all_universities_images/liverpool/MID.webp",

    // Admission Process
    admissionProcessId: "apply-steps",
    admissionTitle: "How to Apply for Liverpool Business School Online Courses",
    admissionSubtitle:
      "Students can easily enrol in Liverpool Business School Online courses. Candidates can conveniently apply by selecting their desired program. Follow these steps to secure admission in the university.",

    // FAQ
    faqLayout: "ggu",
    faqTitle: "FAQs about the Liverpool Online MBA Course",
    faqAccentColor: "#00408d",
    faqDefaultOpenIndex: 0,

    // Compare Banner
    compareBannerBg: "#00408d",
    compareUniversityName: "Liverpool Business School",
    compareSubtitle: "Compare Liverpool Business School with Top World Renowned Universities",
    compareSectionBg: "bg-white",
    arrowGif: "/assets/all_universities_images/liverpool/arrow.gif",

    // Footer
    footerLogo: "/assets/all_universities_images/liverpool/new-des-logo.webp",
    footerSectionBg: "bg-white",
    footerBottomBg: "#00408d",

    // CTAs
    phone: "tel:07065777755",
    phoneDisplay: "+91 7065 7777 55",
    whatsappNumber: "917065777755",
    whatsappText: "I want to download the Liverpool Business School Online Program brochure",
  },

  // Stats (grey-box 4-column layout)
  stats: [
    {
      icon: "user",
      label: "Eligibility",
      value: "Bachelor's Degree with minimum 50% marks",
    },
    {
      icon: "clock",
      label: "Duration",
      value: "18-24 Months",
    },
    {
      icon: "graduation",
      label: "Level",
      value: "Masters (MBA) Degree",
    },
    {
      icon: "book",
      label: "Dual Cert.",
      value: "LBS + IIM Udaipur Certificate",
    },
  ],

  // Programmes / Specialisations
  programmes: [
    {
      id: "finance",
      title: "MBA in Finance",
      description:
        "Deep-dive into corporate finance, investment strategy, financial modelling, and global financial markets to lead in top finance roles.",
      image: "/assets/all_universities_images/liverpool/Finance.webp",
      duration: "18-24 Months",
      eligibility: "Bachelor's Degree",
    },
    {
      id: "marketing",
      title: "MBA in Marketing",
      description:
        "Master brand strategy, digital marketing, consumer insights, and data-driven marketing campaigns for leadership in the marketing domain.",
      image: "/assets/all_universities_images/liverpool/Marketing.webp",
      duration: "18-24 Months",
      eligibility: "Bachelor's Degree",
    },
    {
      id: "hrm",
      title: "MBA in Human Resource Management",
      description:
        "Build expertise in talent acquisition, employee relations, HR analytics, and organizational development to lead modern HR teams.",
      image: "/assets/all_universities_images/liverpool/HRM.webp",
      duration: "18-24 Months",
      eligibility: "Bachelor's Degree",
    },
    {
      id: "leadership",
      title: "MBA in Leadership",
      description:
        "Develop critical leadership competencies, strategic thinking, and organizational change management to excel as a business leader.",
      image: "/assets/all_universities_images/liverpool/Leadership.webp",
      duration: "18-24 Months",
      eligibility: "Bachelor's Degree",
    },
    {
      id: "business-analytics",
      title: "MBA in Business Analytics",
      description:
        "Learn to leverage data analytics, machine learning, and business intelligence to make data-driven strategic business decisions.",
      image: "/assets/all_universities_images/liverpool/Business-Analytics.webp",
      duration: "18-24 Months",
      eligibility: "Bachelor's Degree",
    },
    {
      id: "operations",
      title: "MBA in Operations Management",
      description:
        "Gain expertise in supply chain, logistics, process optimization, and lean management for operational excellence in global organizations.",
      image: "/assets/all_universities_images/liverpool/ops-m.webp",
      duration: "18-24 Months",
      eligibility: "Bachelor's Degree",
    },
  ],

  // About Section
  about: {
    title: "About Liverpool Business School",
    paragraphs: [
      "Liverpool Business School (LBS) is the business faculty of Liverpool John Moores University (LJMU), one of the UK's leading modern universities with over 25,000 students and a heritage spanning 200 years. The school is globally recognized for delivering industry-aligned, research-driven business education.",
      "The Online MBA from Liverpool Business School, in partnership with upGrad, offers working professionals the flexibility to earn a world-class UK MBA degree while continuing their careers. The program includes a unique dual certification with IIM Udaipur, combining UK academic rigour with Indian management excellence.",
      "With AACSB and ACBSP accreditation, a strong global alumni network, and access to world-class faculty, Liverpool Business School remains committed to developing the next generation of global business leaders.",
    ],
    buttonText: "Request Call Back",
  },

  // Approvals & Accreditation
  approvals: [
    {
      id: "aacsb",
      title: "AACSB",
      description:
        "Liverpool Business School is AACSB-accredited, placing it among the top 5% of business schools worldwide for academic quality.",
      image: "/assets/all_universities_images/liverpool/Layer-39-1.png",
    },
    {
      id: "iimu",
      title: "IIM Udaipur",
      description:
        "Dual certification from IIM Udaipur ensures students gain both UK business education and India's premier management institute recognition.",
      image: "/assets/all_universities_images/liverpool/IIMU icon.webp",
    },
    {
      id: "ljmu",
      title: "LJMU",
      description:
        "Liverpool John Moores University (LJMU) is a UK government-recognized university with 200+ years of academic heritage.",
      image: "/assets/all_universities_images/liverpool/Layer-36.png",
    },
    {
      id: "upgrad",
      title: "upGrad",
      description:
        "In partnership with upGrad, one of India's leading online higher education platforms, offering seamless online learning experience.",
      image: "/assets/all_universities_images/liverpool/logo_for_liverpool_upgrade.png",
    },
  ],

  // Degree Info (Certificate Section)
  degreeInfo: {
    title: "LBS MBA Pathway + IIM Udaipur",
    headingTeal: "LBS MBA Pathway + IIM Udaipur",
    subHeading: "Double Certification Edge",
    description:
      "Liverpool Business School offers two certifications after completion: a globally recognized UK MBA from LJMU and an IIM Udaipur Certificate. These dual certifications prepare graduates for top management and board-level roles. The program combines UK academic rigour with IIM's management excellence, delivered through live faculty sessions and real-world case studies.",
    images: [
      "/assets/all_universities_images/liverpool/IIMU Certificatee.webp",
      "/assets/all_universities_images/liverpool/IIMU Certificatee2.webp",
    ],
    image: "/assets/all_universities_images/liverpool/IIMU Certificatee.webp",
    buttonText: "Get Degree",
  },

  // Why Choose
  whyChoose: [
    {
      title: "World-Class UK MBA",
      desc: "Earn a globally recognized MBA from Liverpool John Moores University (LJMU), a prestigious UK university.",
    },
    {
      title: "IIM Udaipur Dual Certificate",
      desc: "Get dual certification from IIM Udaipur alongside your LBS MBA — a unique combination of global and Indian prestige.",
    },
    {
      title: "100% Online Flexibility",
      desc: "Study at your own pace from anywhere with a flexible online format designed for working professionals.",
    },
    {
      title: "Industry-Led Curriculum",
      desc: "Access a curriculum designed with industry leaders, covering latest trends in business, analytics, and leadership.",
    },
    {
      title: "Live Faculty Sessions",
      desc: "Engage with expert faculty from LBS and IIM Udaipur through live interactive sessions and mentorship.",
    },
    {
      title: "Global Alumni Network",
      desc: "Join a strong global alumni network of LJMU and upGrad graduates across industries and geographies.",
    },
  ],

  // Courses list for dropdowns
  courses: [
    "Finance",
    "Marketing",
    "Human Resource Management",
    "Leadership",
    "Business Analytics",
    "Operations Management",
  ],

  // Admission Process Steps
  admissionSteps: [
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
      themeColor: "#00408d",
      borderColor: "#00408d",
      cardBg: "#f0f5ff",
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
  ],

  // FAQs
  faqs: [
    {
      q: "Is the Liverpool Business School Online MBA globally recognized?",
      question: "Is the Liverpool Business School Online MBA globally recognized?",
      a: "Yes, the Liverpool Business School Online MBA is AACSB-accredited and awarded by Liverpool John Moores University (LJMU), a UK government-recognized university, making it globally valued.",
      answer: "Yes, the Liverpool Business School Online MBA is AACSB-accredited and awarded by Liverpool John Moores University (LJMU), a UK government-recognized university, making it globally valued.",
    },
    {
      q: "What is the IIM Udaipur dual certification in the LBS MBA program?",
      question: "What is the IIM Udaipur dual certification in the LBS MBA program?",
      a: "Students who complete the Liverpool Business School MBA program receive an additional certificate from IIM Udaipur, one of India's premier management institutes, providing both UK and Indian academic recognition.",
      answer: "Students who complete the Liverpool Business School MBA program receive an additional certificate from IIM Udaipur, one of India's premier management institutes, providing both UK and Indian academic recognition.",
    },
    {
      q: "What are the eligibility criteria for the LJMU Online MBA?",
      question: "What are the eligibility criteria for the LJMU Online MBA?",
      a: "Applicants need a Bachelor's degree with a minimum of 50% marks. The program welcomes working professionals from diverse backgrounds.",
      answer: "Applicants need a Bachelor's degree with a minimum of 50% marks. The program welcomes working professionals from diverse backgrounds.",
    },
    {
      q: "What is the duration of the Liverpool Business School Online MBA?",
      question: "What is the duration of the Liverpool Business School Online MBA?",
      a: "The Liverpool Business School Online MBA can be completed in 18-24 months, depending on the pace of study and specialization chosen.",
      answer: "The Liverpool Business School Online MBA can be completed in 18-24 months, depending on the pace of study and specialization chosen.",
    },
    {
      q: "Which specializations are available in the LBS Online MBA?",
      question: "Which specializations are available in the LBS Online MBA?",
      a: "The Liverpool Business School Online MBA offers 6+ specializations including Finance, Marketing, Human Resource Management, Leadership, Business Analytics, and Operations Management.",
      answer: "The Liverpool Business School Online MBA offers 6+ specializations including Finance, Marketing, Human Resource Management, Leadership, Business Analytics, and Operations Management.",
    },
  ],

  // Modals
  scholarshipModal: {
    modalBg: "#ffffff",
    titleText: "Get Scholarship Coupon Code",
    titleColor: "#00408d",
    submitButtonBg: "#00408d",
  },
  compareModal: {
    modalBg: "#ffffff",
    titleText: "Compare Universities",
    titleColor: "#00408d",
    submitButtonBg: "#00408d",
  },
};
