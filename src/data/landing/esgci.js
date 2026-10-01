import React from "react";
import Image from "next/image";

/**
 * Systematic Custom CSS for ESGCI Landing Page
 * Matched precisely to https://distanceeducationschool.com/esgci/
 */
export const esgciCustomCss = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Anton&family=Montserrat:wght@400;600;700;800;900&display=swap');

  .landing-page--esgci {
    font-family: 'Outfit', sans-serif !important;
    scroll-behavior: smooth;
    color: #111111;
    background-color: #ffffff;
  }

  .landing-page--esgci header.navbar {
    background: #ffffff !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05) !important;
  }

  .landing-page--esgci .header_menu_list li a {
    font-family: 'Outfit', sans-serif !important;
    font-weight: 600 !important;
    font-size: 15px !important;
    color: #111111 !important;
    text-decoration: none !important;
    transition: color 0.2s ease !important;
  }
  .landing-page--esgci .header_menu_list li a:hover {
    color: #04903c !important;
  }

  /* Hero Section */
  .landing-page--esgci #hero {
    background-image: url(/assets/all_universities_images/esgci/esgci_new_desktop_bg.png) !important;
    background-position: center top !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    padding: 30px 15px !important;
    min-height: auto !important;
    position: relative !important;
  }

  @media (max-width: 768px) {
    .landing-page--esgci #hero {
      background-position: center top !important;
      padding: 20px 10px !important;
    }
  }

  .landing-page--esgci #hero > div.absolute {
    display: none !important;
  }

  .landing-page--esgci #hero h1 {
    font-family: 'Anton', sans-serif !important;
    font-size: 60px !important;
    line-height: 1 !important;
    font-weight: 900 !important;
    letter-spacing: 0.5px !important;
    color: #04903c !important;
    margin: 8px 0 !important;
  }

  @media (max-width: 640px) {
    .landing-page--esgci #hero h1 {
      font-size: 44px !important;
    }
  }

  /* Achievement Bar */
  .landing-page--esgci .achievement {
    background-color: #000000 !important;
  }
  .landing-page--esgci .ac1 h3 {
    color: #04903c !important;
  }

  /* Buttons */
  .landing-page--esgci .downloadBrochureBtn {
    background-color: #fff000 !important;
    color: #000000 !important;
    font-weight: 700 !important;
    border-radius: 5px !important;
    transition: all 0.2s ease !important;
  }
  .landing-page--esgci .downloadBrochureBtn:hover {
    background-color: #f0e200 !important;
  }

  .landing-page--esgci .enquireNowBtn {
    background-color: #fff000 !important;
    color: #000000 !important;
    font-weight: 700 !important;
    border-radius: 5px !important;
  }

  /* Overview */
  .landing-page--esgci #overview h2 span {
    color: #04903c !important;
  }

  /* Benefits / Why Choose */
  .landing-page--esgci #benefits {
    background-color: #04903c !important;
  }

  /* About */
  .landing-page--esgci #about {
    background-color: #04903c !important;
  }

  /* Compare section */
  .landing-page--esgci .compare_box {
    background-color: #04903c !important;
  }

  /* Footer bottom */
  .landing-page--esgci .mini-footer-bottom {
    background-color: #04903c !important;
  }
`;

export const esgciData = {
  slug: "esgci",
  meta: {
    title: "ESGCI Online DBA | ESGCI DBA Program | Doctor of Business Administration Online",
    description: "ESGCI Online DBA program. Doctor of Business Administration online from ESGCI Paris with 36-month duration. ESGCI DBA program eligibility, fees, admission process, and globally recognized online DBA degree.",
    canonicalUrl: "https://distanceeducationschool.com/esgci/",
  },
  customCss: esgciCustomCss,

  // Brand Configuration
  brand: {
    name: "ESGCI Online",
    slug: "esgci",
    primaryColor: "#04903c",
    themeColor: "#04903c",
    accentColor: "#fff000",
    fontFamily: "Outfit",
    showSodeLogo: true,
    sodeIcon: "/assets/all_universities_images/esgci/new_sode_tm_logo.png",
    hideMangLogo: true, // Only SODE logo in navbar on ESGCI live site
    showCouponBtn: false, // No scholarship pill in navbar on ESGCI live site
    hideNavbarBadge: true,
    sodeLogoContainerStyle: {
      width: "160px",
      height: "56px",
      minWidth: "120px",
    },
    callGif: "/assets/all_universities_images/esgci/call_icon.gif",
    giftGif: "/assets/all_universities_images/esgci/gift.gif",

    // Navbar Links
    navLinks: [
      { label: "Courses", href: "#overview" },
      { label: "Approvals", href: "#certification" },
      { label: "About", href: "#about" },
      { label: "FAQ", href: "#faqs" },
    ],

    // Section Order matching https://distanceeducationschool.com/esgci/
    sectionOrder: [
      "stats",
      "overview",
      "programmes",
      "whyChoose",
      "degree",
      "approvals",
      "about",
      "whyChooseCarousel",
      "admissionProcess",
      "faqs",
      "compareBanner",
    ],

    // Hero Section Configuration
    hero: {
      backgroundImage: "/assets/all_universities_images/esgci/esgci_new_desktop_bg.png",
      mobileBackgroundImage: "/assets/all_universities_images/esgci/esgci_new_desktop_bg.png",
      mobileStudentImage: "/assets/all_universities_images/esgci/esgci_new_mobile.png",
      noOverlay: true,
      minHeight: "480px",

      welcomeText: (
        <Image
          src="/assets/all_universities_images/esgci/esgci_new_logo.png"
          alt="ESGCI"
          width={180}
          height={55}
          className="h-[36px] sm:h-[46px] w-auto object-contain"
        />
      ),
      welcomeContainerClassName: "!mb-2 !mt-0 !text-left",
      welcomeBadgeClassName: "!bg-transparent !p-0 !min-w-0 !shadow-none !border-none !rounded-none !block",

      hashtagText: "Doctoral Program for Global Leaders",
      hashtagStyle: {
        fontFamily: "'Outfit', sans-serif",
        color: "#000000",
        fontSize: "15px",
        fontWeight: "600",
        letterSpacing: "0.1px",
        marginTop: "6px",
        marginBottom: "2px",
      },

      headlineText: "Online DBA",
      headingFont: "'Anton', sans-serif",
      headingClassName: "!whitespace-pre-line !leading-[1] font-black text-[50px] sm:text-[62px] text-[#04903c]",
      headingStyle: {
        fontFamily: "'Anton', sans-serif",
        color: "#04903c",
        fontSize: "62px",
        lineHeight: "1",
        fontWeight: "900",
        marginTop: "4px",
        marginBottom: "6px",
      },

      taglineText: (
        <span>
          By <u className="font-semibold">ESGCI Online</u> via <u className="font-semibold">upGrad</u>
        </span>
      ),
      taglineStyle: {
        fontFamily: "'Outfit', sans-serif",
        color: "#000000",
        fontSize: "16px",
        fontWeight: "500",
        lineHeight: "1.3",
        marginTop: "2px",
        marginBottom: "8px",
      },

      highlightBox: {
        text: "Doctor of Business Administration",
        className: "!w-full !p-0 !bg-transparent !text-black !text-[20px] sm:text-[22px] !font-bold !text-left !shadow-none !m-0",
        style: {
          fontFamily: "'Outfit', sans-serif",
          backgroundColor: "transparent",
          color: "#000000",
          border: "none",
          padding: 0,
          fontSize: "21px",
          fontWeight: "700",
          textAlign: "left",
          lineHeight: "1.2",
          display: "block",
          marginTop: "6px",
          marginBottom: "6px",
        },
      },

      coursesStrip: [
        "Earn a prestigious Online DBA from Paris-based ESGCI while advancing your career from anywhere in the world.",
      ],
      courseStripClassName: "!text-[13.5px] sm:text-[14px] !text-[#222222] !leading-relaxed !max-w-[460px] !font-normal !mb-4",
      courseStripStyle: {
        fontFamily: "'Outfit', sans-serif",
        color: "#222222",
        fontSize: "13.5px",
        lineHeight: "1.55",
        fontWeight: "400",
        maxWidth: "460px",
        marginTop: "4px",
        marginBottom: "14px",
      },

      brochureButtonText: "Download Brochure",
      buttonStyle: {
        fontFamily: "'Outfit', sans-serif",
        background: "#fff000",
        backgroundColor: "#fff000",
        color: "#000000",
        borderRadius: "5px",
        fontSize: "15px",
        fontWeight: "700",
        padding: "10px 24px",
      },

      cardStyle: "white",
      formBackground: "#ffffff",
      formCardType: "white",
      enquireTitle: "Admission Open",
      enquireSubtitle: "Academic Experts will assist you!",
      enquireColor: "#04903c",
      enquireSubtitleColor: "#333333",
      phoneBadgeBg: "#04903c",
      phoneBadgeBackground: "#04903c",
      phoneBadgeStyle: {
        background: "#04903c",
        backgroundColor: "#04903c",
        color: "#ffffff",
        borderRadius: "9999px",
        padding: "3px 14px",
        fontSize: "12px",
      },
      submitBtnBg: "#04903c",
      submitButtonBackground: "#04903c",
      submitButtonRadius: "6px",
      submitButtonTextColor: "#ffffff",
    },

    // Stats Section (Achievement Bar)
    statsLayout: "esgci",

    // Overview Section
    overviewHighlight: "ESCGI Online DBA Program",
    overviewButtonText: "Get Curriculum",
    overviewDescription:
      "The ESGCI Online DBA helps professionals gain advanced skills in business and management. The 36-month program includes foundation, leadership, and dissertation phases, giving a clear path for learning. Students receive personal guidance from experienced ESGCI faculty to support their research and studies. The program offers interactive learning and global exposure, helping students develop strong leadership and practical skills. It also allows students to use their knowledge on real-world business challenges. Graduates earn a globally recognized doctoral degree, improving career opportunities. After completing the DBA, alumni can work in consulting, research, teaching, or executive roles worldwide.",

    // Who Can Apply (Programmes Section)
    programmesLayout: "esgci",
    programmesTitle: "Who Can Apply for the ESGCI Online DBA",

    // Professional Advantages (Benefits Section)
    whyChooseLayout: "esgci",
    whyChooseTitle: "Professional Advantages of",
    whyChooseSubtitle: "Completing the ESGCI Online DBA",
    whyChooseBg: "#04903c",

    // Degree Layout
    degreeLayout: "imageLeft",
    degreeTitleColor: "#111111",
    degreeBtnBg: "#fff000",
    degreeBtnTextColor: "#000000",

    // Approvals Section
    approvalsLayout: "esgci",
    approvalsTitle: "APPROVALS AND ACCREDITATION",

    // About Section
    aboutLayout: "esgci",
    aboutTitle: "ABOUT US",
    aboutBg: "#04903c",

    // Why Choose Carousel
    whyChooseCarouselTitle: "Why Choose ESGCI Online DBA Program",
    whyChooseCarouselItems: [
      {
        title: "Widely Accepted Credit System",
        desc: "Earn 180 ECTS credits recognized across Europe and globally, giving your online DBA degree strong academic and professional credibility.",
        image: "/assets/all_universities_images/esgci/widely-accepted-credit-system.webp",
      },
      {
        title: "Global Exposure in Paris",
        desc: "Take part in an optional five-day Paris immersion, learning international business practices and connecting with renowned faculty and peers.",
        image: "/assets/all_universities_images/esgci/global-exposure-in-paris.webp",
      },
      {
        title: "Fully Flexible Online Format",
        desc: "Pursue your doctorate entirely online, allowing self-paced, focused research based learning while continuing full-time work without career disruption.",
        image: "/assets/all_universities_images/esgci/fully-flexible-online-format.webp",
      },
      {
        title: "Cost-Effective and Flexible Payment",
        desc: "The program costs INR 8,50,000 with competitive pricing and offers flexible installment options to suit various financial situations.",
        image: "/assets/all_universities_images/esgci/cost-effective-and-flexible-payment.webp",
      },
      {
        title: "Research-Oriented Learning",
        desc: "Gain access to advanced tools like CliftonStrengths™ and conduct practical research addressing real-world business challenges to enhance leadership skills.",
        image: "/assets/all_universities_images/esgci/research-oriented-learning-resources.webp",
      },
      {
        title: "Experienced and Diverse Cohort",
        desc: "Collaborate with seasoned professionals from multiple industries, sharing real-world insights and expanding your global professional network effectively.",
        image: "/assets/all_universities_images/esgci/Diverse-cohort.webp",
      },
    ],

    // Admission Process
    admissionProcessId: "apply-steps",
    admissionTitle: "How to Apply for ESCGI Online University Online Courses",
    admissionSubtitle:
      "Students can easily enrol in ESCGI Online University Online courses. Candidates can conveniently apply by selecting their desired program. Follow these steps to secure admission in the university.",

    // FAQ Configuration
    faqLayout: "ggu",
    faqTitle: "FAQ-Frequently Asked Questions",
    faqAccentColor: "#04903c",
    faqDefaultOpenIndex: 0,

    // Compare Banner
    compareBannerBg: "#04903c",
    compareUniversityName: "ESCGI Online University",
    compareSubtitle: "Compare ESCGI Online University with Top World Renowned Universities",
    compareSectionBg: "bg-white",
    arrowGif: "/assets/all_universities_images/esgci/arrow.gif",

    // Footer Configuration
    footerLogo: "/assets/all_universities_images/esgci/new-des-logo.webp",
    footerSectionBg: "bg-white",
    footerBottomBg: "#04903c",

    // Floating Sticky and CTA
    phone: "tel:07065777755",
    phoneDisplay: "+91 7065 7777 55",
    whatsappNumber: "917065777755",
    whatsappText: "I want to download the ESGCI Online Program brochure",
  },

  // Key Statistics / Highlights (Bar under hero)
  stats: [
    {
      icon: "user",
      label: "Eligibility",
      value: "Master or Bachelor degree with 3 years of experience",
    },
    {
      icon: "clock",
      label: "Duration",
      value: "36 months | 15 hours per week",
    },
    {
      icon: "graduation",
      label: "Level",
      value: "Internationally Recognized Online DBA",
    },
    {
      icon: "rupee",
      label: "Fees",
      value: "₹6,50,000 (all-inclusive, no extra taxes)",
    },
  ],

  // Who Can Apply (Programmes)
  programmes: [
    {
      id: "exp-prof",
      title: "Experienced Professionals",
      description:
        "Professionals holding a Master’s degree with relevant work experience can pursue the ESGCI Online DBA to gain advanced business knowledge and develop leadership skills.",
      image: "/assets/all_universities_images/esgci/experienced-professionals.webp",
    },
    {
      id: "bach-degree",
      title: "Bachelor’s Degree Holders",
      description:
        "Candidates with a Bachelor’s degree and at least three years of professional experience are eligible, providing an opportunity to enhance expertise and advance their careers.",
      image: "/assets/all_universities_images/esgci/bachelors-degree-holders.webp",
    },
    {
      id: "asp-research",
      title: "Aspiring Researchers and Educators",
      description:
        "Individuals aiming to teach, publish research, or take on high-level consulting and executive roles can benefit from the globally recognized ESGCI Online DBA program.",
      image: "/assets/all_universities_images/esgci/aspiring-researchers-and-educators.webp",
    },
  ],

  // Professional Advantages (Why Choose)
  whyChoose: [
    {
      title: "PwC Board Advisory",
      desc: "Earn a PwC Board Advisory Certification",
      image: "/assets/all_universities_images/esgci/obtain-a-pwc-board-advisory.webp",
    },
    {
      title: "Publish Your Dissertation",
      desc: "Publish your doctoral research globally",
      image: "/assets/all_universities_images/esgci/publish-your-dissertation.webp",
    },
    {
      title: "Teach at UGC Colleges",
      desc: "Qualify to teach at prestigious universities",
      image: "/assets/all_universities_images/esgci/teach-at-ugc-colleges.webp",
    },
    {
      title: "No-Code Prototyping",
      desc: "Build business prototypes without coding",
      image: "/assets/all_universities_images/esgci/no-code-prototyping.webp",
    },
    {
      title: "Secure IP Globally",
      desc: "Protect your intellectual property worldwide",
      image: "/assets/all_universities_images/esgci/global-ip-protection.webp",
    },
    {
      title: "Pitch to Real Investors",
      desc: "Present your innovations directly to venture capitalists",
      image: "/assets/all_universities_images/esgci/pitch-to-vcs.webp",
    },
  ],

  // Sample Degree
  degreeInfo: {
    title: "ESGCI Online DBA Degree",
    description:
      "The ESGCI Online DBA offers the same prestigious doctorate as on-campus programs, providing global recognition and world-class education without relocation. It is a nationally accredited European degree with QUALIOPI certification and RNCP qualifications recognized by the French State.",
    image: "/assets/all_universities_images/esgci/degree-ESGCI.webp",
    buttonText: "Get Degree",
  },

  // Approvals Data
  approvals: [
    {
      id: "republique",
      title: "French Ministry of Higher Education",
      description: "Recognizes ESGCI for meeting high-quality standards in French higher education.",
      image: "/assets/all_universities_images/esgci/REPUBLIQUE.webp",
    },
    {
      id: "qualiopi",
      title: "QUALIOPI",
      description: "Certification ensuring training programs in France adhere to recognized quality standards.",
      image: "/assets/all_universities_images/esgci/QUALIOPI.webp",
    },
    {
      id: "acbsp",
      title: "ACBSP",
      description: "Global accreditation validating the quality and standards of business education.",
      image: "/assets/all_universities_images/esgci/ACBSP.webp",
    },
    {
      id: "iacbe",
      title: "IACBE",
      description: "Ensures institutions maintain accountability and continuously improve business education quality.",
      image: "/assets/all_universities_images/esgci/IACBE.webp",
    },
  ],

  // About Section Data
  about: {
    title: "ABOUT US",
    paragraphs: [
      "ESGCI (Ecoles Supérieur de Gestion – Commerce International) was founded in 1986 in Paris. It is a famous management school known for its global approach. About 20% of its students come from 65 countries. Recognized by the French government, ESGCI offers high-quality training through its Qualiopi certification. The school is part of Galileo Global Education, a large group with over 200,000 students across 91 campuses in 13 countries. Other top schools in the group include Paris School of Business, Cours Florent, and Istituto Marangoni.",
    ],
    buttonText: "Request Call Back",
  },

  // Courses list for dropdowns
  courses: [
    "DBA - Doctor of Business Administration",
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
  ],

  // Frequently Asked Questions
  faqs: [
    {
      q: "Is the ESGCI Online DBA recognized internationally?",
      question: "Is the ESGCI Online DBA recognized internationally?",
      a: "Yes, ESGCI is recognized by the French government and is part of Galileo Global Education, making its DBA globally respected.",
      answer: "Yes, ESGCI is recognized by the French government and is part of Galileo Global Education, making its DBA globally respected.",
    },
    {
      q: "Who is eligible for the ESGCI Online DBA?",
      question: "Who is eligible for the ESGCI Online DBA?",
      a: "Candidates must have a master’s degree or an MBA and relevant professional experience in management or business.",
      answer: "Candidates must have a master’s degree or an MBA and relevant professional experience in management or business.",
    },
    {
      q: "Can working professionals enroll in the ESGCI Online DBA?",
      question: "Can working professionals enroll in the ESGCI Online DBA?",
      a: "Yes, the program is designed for professionals who want to advance their career while continuing to work.",
      answer: "Yes, the program is designed for professionals who want to advance their career while continuing to work.",
    },
    {
      q: "Can I study ESGCI Online DBA from anywhere in the world?",
      question: "Can I study ESGCI Online DBA from anywhere in the world?",
      a: "Yes, the program is fully online, allowing students to learn and submit research from anywhere globally.",
      answer: "Yes, the program is fully online, allowing students to learn and submit research from anywhere globally.",
    },
    {
      q: "What career benefits does a DBA from ESGCI provide?",
      question: "What career benefits does a DBA from ESGCI provide?",
      a: "Graduates can pursue consulting, university teaching, research publication, board advisory roles, and executive leadership positions. The DBA is a rare qualification, giving an edge over the 250,000 annual MBA graduates globally.",
      answer: "Graduates can pursue consulting, university teaching, research publication, board advisory roles, and executive leadership positions. The DBA is a rare qualification, giving an edge over the 250,000 annual MBA graduates globally.",
    },
  ],

  // Modals
  scholarshipModal: {
    modalBg: "#ffffff",
    titleText: "Get Scholarship Coupon Code",
    titleColor: "#04903c",
    submitButtonBg: "#04903c",
  },
  compareModal: {
    modalBg: "#ffffff",
    titleText: "Compare Universities",
    titleColor: "#04903c",
    submitButtonBg: "#04903c",
  },
};
