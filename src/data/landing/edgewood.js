import React from "react";
import Image from "next/image";

/**
 * Systematic Custom CSS for Edgewood University Online Landing Page
 * Matched precisely to https://distanceeducationschool.com/edgewood/
 */
export const edgewoodCustomCss = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800;900&family=Anton&display=swap');

  .landing-page--edgewood {
    font-family: 'Montserrat', sans-serif !important;
    scroll-behavior: smooth;
    color: #111111;
    background-color: #ffffff;
  }

  .landing-page--edgewood header.navbar {
    background: #ffffff !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05) !important;
  }

  .landing-page--edgewood .header_menu_list li a {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    color: #111111 !important;
    text-decoration: none !important;
    transition: color 0.2s ease !important;
  }

  .landing-page--edgewood .header_menu_list li a:hover {
    color: #F1BA00 !important;
  }

  /* Hero Section */
  .landing-page--edgewood #hero {
    background-image: url(/assets/all_universities_images/edgewood/edgewood_desktop_new_bg.png) !important;
    background-position: center top !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    padding: 30px 15px !important;
    min-height: auto !important;
    position: relative !important;
  }

  @media (max-width: 768px) {
    .landing-page--edgewood #hero {
      background-image: url(/assets/all_universities_images/edgewood/mobile_new_bg_main.png) !important;
      background-position: center top !important;
      padding: 20px 10px !important;
    }
  }

  .landing-page--edgewood #hero > div.absolute {
    display: none !important;
  }

  .landing-page--edgewood #hero h1 {
    font-family: 'Anton', sans-serif !important;
    font-size: 60px !important;
    line-height: 1 !important;
    font-weight: 900 !important;
    letter-spacing: 0.5px !important;
    color: #ba0000 !important;
    margin: 10px 0 !important;
  }

  @media (max-width: 640px) {
    .landing-page--edgewood #hero h1 {
      font-size: 40px !important;
    }
  }

  /* Buttons */
  .landing-page--edgewood .downloadBrochureBtn {
    background-color: #ba0000 !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    border-radius: 6px !important;
    transition: all 0.2s ease !important;
  }
  .landing-page--edgewood .downloadBrochureBtn:hover {
    background-color: #990000 !important;
  }

  .landing-page--edgewood .enquireNowBtn {
    background-color: #ba0000 !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    border-radius: 4px !important;
  }

  /* Accreditation Section */
  .landing-page--edgewood .accreditation-section {
    padding: 40px 20px 60px 20px !important;
    background-color: #ffffff !important;
    text-align: center !important;
    margin: 0px !important;
  }
  .landing-page--edgewood .accreditation-header {
    margin-bottom: 30px !important;
  }
  .landing-page--edgewood .accreditation-header h2 {
    color: #ba0000 !important;
    font-size: 28px !important;
    font-weight: 800 !important;
    letter-spacing: 1px !important;
    text-transform: uppercase !important;
    margin: 0 !important;
  }
  .landing-page--edgewood .accreditation-header p {
    font-size: 22px !important;
    color: #444444 !important;
    margin-top: 5px !important;
    margin-bottom: 0 !important;
    font-weight: 800 !important;
    padding-top: 0px !important;
  }
  .landing-page--edgewood .accreditation-container {
    display: grid !important;
    justify-content: center !important;
    gap: 25px !important;
    max-width: 1200px !important;
    margin: 0 auto !important;
    grid-template-columns: repeat(3, 1fr) !important;
  }
  .landing-page--edgewood .accreditation-card {
    flex: 1 !important;
    padding: 40px 25px !important;
    border: 2px solid #e0e0e0 !important;
    border-radius: 25px !important;
    background: #ffffff !important;
    transition: transform 0.3s ease, box-shadow 0.3s ease !important;
  }
  .landing-page--edgewood .accreditation-card:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05) !important;
  }
  .landing-page--edgewood .logo-box {
    height: 120px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-bottom: 25px !important;
  }
  .landing-page--edgewood .accreditation-card h3 {
    font-size: 18px !important;
    font-weight: 800 !important;
    color: #002147 !important;
    margin-bottom: 15px !important;
    line-height: 1.3 !important;
    margin-top: 0 !important;
  }
  .landing-page--edgewood .accreditation-card p {
    font-size: 14px !important;
    color: #666666 !important;
    line-height: 1.6 !important;
    margin: 0 !important;
  }
  @media (max-width: 992px) {
    .landing-page--edgewood .accreditation-container {
      grid-template-columns: repeat(1, 1fr) !important;
    }
  }

  /* Compare section */
  .landing-page--edgewood .compare_box {
    background-color: #ba0000 !important;
  }

  /* Footer bottom */
  .landing-page--edgewood .mini-footer-bottom {
    background-color: #1a1a1a !important;
  }
`;

export const edgewoodData = {
  slug: "edgewood",
  meta: {
    title: "Edgewood College DBA upGrad | Edgewood University Online DBA & MBA Programs",
    description: "Edgewood College DBA upGrad program. Edgewood University online DBA and Edgewood College online MBA with specializations in Finance and Leadership. Explore Edgewood University upGrad, Edgewood and upGrad programs, eligibility, duration, and admission details.",
    keywords: "Edgewood University Online DBA, Edgewood College DBA upGrad, Online DBA Programs, Edgewood University MBA, DBA in Finance, DBA in Leadership, Edgewood upGrad",
    canonicalUrl: "https://distanceeducationschool.com/edgewood/",
    openGraph: {
      title: "Edgewood University Online DBA | Edgewood College DBA upGrad",
      description: "Edgewood University Online DBA and MBA+DBA programs. HLC-accredited, ACBSP-approved, PwC certified. 24-month program.",
      url: "https://distanceeducationschool.com/edgewood/",
      siteName: "Distance Education School",
      images: [
        {
          url: "https://distanceeducationschool.com/assets/all_universities_images/edgewood/edgewood-university-black.png",
          width: 800,
          height: 600,
          alt: "Edgewood University Online DBA",
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: "https://distanceeducationschool.com/edgewood/",
    },
  },
  customCss: edgewoodCustomCss,

  // Brand Configuration
  brand: {
    name: "Edgewood University Online",
    slug: "edgewood",
    primaryColor: "#ba0000",
    themeColor: "#ba0000",
    accentColor: "#ba0000",
    submitBtnBg: "#ba0000",
    hideTermsCheckbox: true,
    formTitleColor: "#ba0000",
    fontFamily: "Montserrat",
    showSodeLogo: true,
    sodeIcon: "/assets/all_universities_images/edgewood/new_sode_tm_logo.png",
    hideMangLogo: true,
    showCouponBtn: false,
    hideNavbarBadge: true,
    sodeLogoContainerStyle: {
      width: "160px",
      height: "56px",
      minWidth: "120px",
    },
    callGif: "/assets/all_universities_images/edgewood/call_icon.gif",
    giftGif: "/assets/all_universities_images/edgewood/gift.gif",

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
      "specializations",
      "whyChoose",
      "degree",
      "admissionProcess",
      "faqs",
      "compareBanner",
    ],

    // Hero Section Configuration
    hero: {
      backgroundImage: "/assets/all_universities_images/edgewood/edgewood_desktop_new_bg.png",
      mobileBackgroundImage: "/assets/all_universities_images/edgewood/mobile_new_bg_main.png",
      mobileStudentImage: "/assets/all_universities_images/edgewood/edgewood_mobile_new_img.png",
      noOverlay: true,
      minHeight: "480px",

      welcomeText: (
        <div className="flex items-center gap-3 mb-2">
          <Image
            src="/assets/all_universities_images/edgewood/edgewood-university-black.png"
            alt="Edgewood University"
            width={160}
            height={50}
            className="h-[36px] sm:h-[44px] w-auto object-contain"
          />
          <div className="h-6 w-[1.5px] bg-slate-300 mx-1" />
          <span className="text-[#ea1e24] font-black text-[22px] tracking-tight">upGrad</span>
        </div>
      ),
      welcomeContainerClassName: "!mb-2 !mt-0 !text-left",
      welcomeBadgeClassName: "!bg-transparent !p-0 !min-w-0 !shadow-none !border-none !rounded-none !block",

      hashtagText: "Learn Business\nLeadership Skills With",
      hashtagStyle: {
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "18px",
        fontWeight: "700",
        color: "#111111",
        lineHeight: "1.3",
        whiteSpace: "pre-line",
        marginTop: "8px",
        marginBottom: "4px",
      },

      headlineText: "EdgeWood\nOnline University",
      headingFont: "'Anton', sans-serif",
      headingClassName: "!whitespace-pre-line !leading-[1] font-black text-[50px] sm:text-[58px] text-[#ba0000]",
      headingStyle: {
        fontFamily: "'Anton', sans-serif",
        color: "#ba0000",
        fontSize: "58px",
        lineHeight: "1",
        fontWeight: "900",
        letterSpacing: "0.5px",
        marginTop: "4px",
        marginBottom: "8px",
      },

      taglineText: (
        <span key="edgewood-tagline">
          By <u className="font-bold">Edgewood University</u> via <strong className="font-black">upGrad</strong>
        </span>
      ),
      taglineStyle: {
        fontFamily: "'Montserrat', sans-serif",
        color: "#111111",
        fontSize: "15px",
        fontWeight: "600",
        lineHeight: "1.4",
        marginTop: "2px",
        marginBottom: "10px",
      },

      coursesBeforeHighlight: true,
      courseLabel: "Online",
      courseLabelStyle: {
        backgroundColor: "#f1ba00",
        color: "#000000",
        fontWeight: "800",
        fontSize: "11px",
        borderRadius: "9999px",
        padding: "2px 14px",
        top: "-11px",
      },
      courseBoxStyle: {
        borderColor: "#94a3b8",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "8px 18px",
        borderWidth: "1.5px",
      },
      courseStripStyle: {
        color: "#ba0000",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: "900",
        fontSize: "22px",
        letterSpacing: "0.5px",
      },
      courseLines: ["DBA | MBA + DBA"],

      highlightBox: {
        lines: [
          "☑ Globally recognised U.S. accreditation (HLC)",
          "☑ No GMAT/GRE + flexible pay-per-month model",
        ],
        className: "!w-full !p-0 !bg-transparent !text-black !text-[14px] sm:text-[14.5px] !font-bold !text-left !shadow-none !my-3",
        style: {
          fontFamily: "'Montserrat', sans-serif",
          backgroundColor: "transparent",
          color: "#111111",
          border: "none",
          padding: 0,
          fontSize: "14px",
          fontWeight: "600",
          textAlign: "left",
          lineHeight: "1.7",
          display: "block",
        },
      },

      brochureButtonText: "Download Broucher",
      buttonVariant: "primary",
      buttonBackground: "#ba0000",
      buttonTextColor: "#ffffff",
      buttonBorder: "none",
      buttonStyle: {
        fontFamily: "'Montserrat', sans-serif",
        backgroundColor: "#ba0000",
        background: "#ba0000",
        color: "#ffffff",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "700",
        padding: "10px 24px",
        border: "none",
        cursor: "pointer",
      },

      cardStyle: "white",
      formBackground: "#ffffff",
      formCardType: "white",
      enquireTitle: "Enquire Now",
      enquireSubtitle: "Academic Experts will assist you!",
      enquireColor: "#ba0000",
      enquireSubtitleColor: "#333333",
      hideTermsCheckbox: true,
      showPhoneBadge: true,
      phoneDisplay: "+91 7065 7777 55",
      phoneBadgeBg: "#ba0000",
      phoneBadgeBackground: "#ba0000",
      phoneBadgeColor: "#ffffff",
      phoneBadgeStyle: {
        background: "#ba0000",
        backgroundColor: "#ba0000",
        color: "#ffffff",
        borderRadius: "9999px",
        padding: "5px 16px",
        fontSize: "13px",
        fontWeight: "700",
      },
      phoneBeforeEmail: true,
      submitBtnBg: "#ba0000",
      submitButtonBackground: "#ba0000",
      submitButtonRadius: "4px",
      submitButtonTextColor: "#ffffff",
      submitButtonText: "Submit",
    },

    // Stats Section (Crimson red bar with white icons)
    statsLayout: "edgewood",

    scholarshipModal: {
      titleText: "Get Scholarship Coupon Code",
      title: "Get Scholarship Coupon Code",
      titleColor: "#ba0000",
      subtitleText: "Academic Experts will assist you!",
      subtitle: "Academic Experts will assist you!",
      subtitleColor: "#333333",
      submitBtnBg: "#ba0000",
      submitButtonBg: "#ba0000",
      submitButtonBackground: "#ba0000",
      submitButtonRadius: "4px",
      submitButtonTextColor: "#ffffff",
      submitBtnText: "Submit",
      buttonText: "Submit",
      hideTermsCheckbox: true,
      formName: "Scholarship Coupon Modal",
    },
    brochureModal: {
      titleText: "Download Brochure",
      title: "Download Brochure",
      titleColor: "#ba0000",
      subtitleText: "Academic Experts will assist you!",
      subtitle: "Academic Experts will assist you!",
      subtitleColor: "#333333",
      submitBtnBg: "#ba0000",
      submitButtonBg: "#ba0000",
      submitButtonBackground: "#ba0000",
      submitButtonRadius: "4px",
      submitButtonTextColor: "#ffffff",
      submitBtnText: "Submit",
      buttonText: "Submit",
      hideTermsCheckbox: true,
      formName: "Download Brochure Modal",
    },
    compareModal: {
      titleText: "Get Scholarship Coupon Code",
      title: "Get Scholarship Coupon Code",
      titleColor: "#ba0000",
      subtitleText: "Academic Experts will assist you!",
      subtitle: "Academic Experts will assist you!",
      subtitleColor: "#333333",
      submitBtnBg: "#ba0000",
      submitButtonBg: "#ba0000",
      submitButtonBackground: "#ba0000",
      submitButtonRadius: "4px",
      submitButtonTextColor: "#ffffff",
      submitBtnText: "Submit",
      buttonText: "Submit",
      hideTermsCheckbox: true,
      formName: "Compare Universities Modal",
    },

    // Programmes Section (same as Liverpool card grid layout)
    programmesLayout: "edgewood",
    programmesTitle: "Courses Offered",
    programmesSubtitle: "By Edgewood University Online",

    // About Section (use rushford layout — two-column text + image)
    aboutLayout: "edgewood",
    aboutTitle: "About Edgewood University Online",

    // Approvals Section (use rushford/card layout)
    approvalsLayout: "edgewood",
    approvalsTitle: "ACCREDITATION OF",
    approvalsSubtitle: "Edgewood University Online",

    // Degree Layout
    degreeLayout: "edgewood",
    degreeTitleColor: "#111111",
    degreeBtnBg: "#F1BA00",
    degreeBtnTextColor: "#000000",

    // Why Choose
    whyChooseLayout: "edgewood",
    whyChooseTitle: "Learning Outcomes Of",
    whyChooseSubtitle: "Edgewood University Online",
    whyChooseImage: "/assets/all_universities_images/edgewood/about-bg-image-edgewood.webp",

    // Admission Process
    admissionProcessId: "apply-steps",
    admissionTitle: "How to Apply for Edgewood University Online Courses",
    admissionSubtitle:
      "Students can easily enrol in Edgewood University Online courses. Candidates can conveniently apply by selecting their desired program. Follow these steps to secure admission in the university.",

    // FAQ
    faqLayout: "edgewood",
    faqTitle: "FAQ-Frequently Asked Question",
    faqHeaderColor: "#0056b3",
    faqAccentColor: "#0056b3",
    faqDefaultOpenIndex: 0,

    // Compare Banner
    compareBannerBg: "#ba0000",
    compareUniversityName: "Edgewood University",
    compareSubtitle: "Compare Edgewood University with Top World Renowned Universities",
    compareSectionBg: "bg-white",
    arrowGif: "/assets/all_universities_images/edgewood/arrow.gif",

    // Footer
    footerLogo: "/assets/all_universities_images/edgewood/new-des-logo.webp",
    footerSectionBg: "bg-white",
    footerBottomBg: "#1a1a1a",

    // CTAs
    phone: "tel:07065777755",
    phoneDisplay: "+91 7065 7777 55",
    whatsappNumber: "917065777755",
    whatsappText: "I want to download the Edgewood University Online Program brochure",
  },

  // Stats (4 column crimson-red achievement bar)
  stats: [
    {
      icon: "graduation",
      label: "95+",
      desc: "Years of legacy",
    },
    {
      icon: "users",
      label: "5 lakh+",
      desc: "Enrollments",
    },
    {
      icon: "user",
      label: "PwC",
      desc: "Certificate",
    },
    {
      icon: "book",
      label: "Dual",
      desc: "Degree",
    },
  ],

  // Programmes / Courses
  programmes: [
    {
      id: "online-dba",
      title: "Edgewood University Online DBA:",
      description:
        "The Online DBA accredited by HLC introduces learners to board dynamics, strategic finance, decision-making, and digital transformation. This 24-month program prepares professionals for the Dr. title, with real-time project exposure and top faculty, following a 5-day campus immersion and the Online Networking Gala for Network and Career Growth.",
      image: "/assets/all_universities_images/edgewood/online-dba-edgewood.webp",
      duration: "24 Months",
      eligibility: "Bachelor's + Master's Degree with relevant experience",
    },
    {
      id: "mba-dba",
      title: "Edgewood University Online MBA + DBA:",
      description:
        "The Dual degree is in demand nowadays. Many students plan to study an online MBA + DBA as their career pathway. The student can complete the degree in 2.5 years, which combines executive skills an MBA student needs with applied research and the respected 'Dr' title.",
      image: "/assets/all_universities_images/edgewood/dbamba-edgewood.webp",
      duration: "24 Months",
      eligibility: "Bachelor's Degree",
    },
  ],

  // About Section
  about: {
    title: "About Edgewood University Online",
    paragraphs: [
      "Edgewood University Online is a US-based university that was established in 1927, and the university is located in Madison. With 95+ years of excellence, the university is one that offers career-focused learning.",
      "The university has the approval of ACBSP and HLC, which make sure the education provided by Edgewood University Online is globally competitive. The university offers a dual program in Edgewood University Online MBA + DBA, and the university also provides a management degree, the Edgewood University Online MBA.",
      "Through their flexible programs, students get an industry-relevant curriculum, faculty support, and a learning model built for working professionals.",
    ],
    buttonText: "Get FREE Career Counseling",
    image: "/assets/all_universities_images/edgewood/edegewood-about-image.webp",
  },

  // Approvals & Accreditation
  approvals: [
    {
      id: "hlc",
      title: "HLC",
      description:
        "Edgewood University Online program is approved by the HLC, which is a trusted U.S. regional approval authority. This approval supports MBA+DBA program's credibility.",
      image: "/assets/all_universities_images/edgewood/hlc-approval-edgewood.webp",
    },
    {
      id: "wes",
      title: "WES",
      description:
        "The Edgewood University Online MBA + DBA is approved by the WES, which helps learners validate their US qualification for education and career development across countries.",
      image: "/assets/all_universities_images/edgewood/WES.webp",
    },
    {
      id: "acbsp",
      title: "ACBSP",
      description:
        "ACBSP approval ensures that the quality of the education has a strong academic value. The Edgewood University Online MBA has this approval, which shows their credibility.",
      image: "/assets/all_universities_images/edgewood/acbsp-approval-edgewood.webp",
    },
  ],

  // Degree Info (Certificate Section)
  degreeInfo: {
    title: "Sample Certification\nEdgewood University Online",
    description:
      "Edgewood University Online offers two certifications after completion of their degree: PwC and the certificate of Edgewood University. These two certificates help students prepare for top-board level roles. In the partnership of PwC India, it teaches strategic thinking, handling stakeholders, governance, and compliance through live lecture which teaches students real-world expertise guidance.",
    features: [
      { desc: "Globally recognized HLC-accredited U.S. degree" },
      { desc: "PwC Board Advisory Certificate included" },
      { desc: "5-day optional campus immersion in the USA" },
      { desc: "Online Networking Gala for career and network growth" },
    ],
    image: "/assets/all_universities_images/edgewood/sample-certficate-edgewood.webp",
    images: ["/assets/all_universities_images/edgewood/sample-certficate-edgewood.webp"],
    buttonText: "Get Degree",
  },

  // Why Choose / Learning Outcomes
  whyChoose: [
    {
      title: "Optional On-Campus Immersion",
      desc: "Experience U.S. campus learning through optional immersion, workshops, faculty meets, and academic resources onsite support.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
    {
      title: "Online Networking Gala",
      desc: "Join online networking galas to meet peers, alumni, mentors, and industry leaders worldwide and expand your professional network.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
    {
      title: "Stakeholder Influence",
      desc: "Build stakeholder influence by negotiating confidently, managing expectations, presenting data, and leading change initiatives effectively.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
    {
      title: "Conduct Applied Doctoral Research",
      desc: "Conduct applied doctoral research using evidence-based methods, solving business problems with measurable outcomes for organisations.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
    {
      title: "Expert Faculty",
      desc: "Learn from expert faculty who guide projects, share industry insights, and support academic progress personally to help learner gain the skills they need.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
    {
      title: "Nationally Recognized",
      desc: "Earn a nationally recognized U.S. qualification that enhances credibility, promotion prospects, and global mobility faster.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
  ],

  // Courses list for dropdowns
  courses: [
    "DBA in Finance",
    "DBA in Leadership",
    "MBA + DBA in Finance",
    "MBA + DBA in Leadership",
  ],

  // Specializations Section (DBA / MBA + DBA tabs)
  specializations: {
    title: "Specializations of Edgewood University Online DBA / MBA + DBA",
    tabs: [
      { id: "dba", label: "DBA" },
      { id: "dba-mba", label: "MBA + DBA" },
    ],
    items: {
      dba: [
        {
          id: "dba-leadership",
          title: "DBA Leadership",
          image: "/assets/all_universities_images/edgewood/leadership-edgewood.webp",
          description:
            "Edgewood University Online DBA leadership builds leadership skills that enable students to learn management and strategic decision-making skills, using applied research to solve real organisational challenges in senior roles, and to gain skilled knowledge.",
        },
        {
          id: "dba-finance",
          title: "DBA Finance",
          image: "/assets/all_universities_images/edgewood/finanance-edgewood.webp",
          description:
            "Finance Specializations in Edgewood University's Online DBA develop advanced expertise in financial strategy, risk management, and corporate decision-making. This curriculum help student use research-led frameworks to manage complex financial problems.",
        },
      ],
      "dba-mba": [
        {
          id: "mba-dba-leadership",
          title: "MBA + DBA Leadership",
          image: "/assets/all_universities_images/edgewood/leadership-edgewood-2.webp",
          description:
            "Edgewood University Online DBA Learning in MBA + DBA Leadership combines MBA leadership skills with doctoral-level applied research, preparing professionals for senior management, consulting, and enterprise growth roles.",
        },
        {
          id: "mba-dba-finance",
          title: "MBA + DBA Finance",
          image: "/assets/all_universities_images/edgewood/Finance.webp",
          description:
            "Edgewood University Online DBA Learning in MBA + DBA Finance blends MBA finance fundamentals with advanced doctoral research, supporting strategic investment, risk control, and high-level corporate finance decisions.",
        },
      ],
    },
  },


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

  // FAQs
  faqs: [
    {
      q: "What is the duration of the Edgewood University Online DBA?",
      question: "What is the duration of the Edgewood University Online DBA?",
      a: "The Edgewood University Online DBA can be completed in as little as 24 months, depending on your pace.",
      answer: "The Edgewood University Online DBA can be completed in as little as 24 months, depending on your pace.",
    },
    {
      q: "Is the Edgewood University Online DBA accredited?",
      question: "Is the Edgewood University Online DBA accredited?",
      a: "The Edgewood University Online DBA is HLC-accredited, which supports its academic credibility in the U.S.",
      answer: "The Edgewood University Online DBA is HLC-accredited, which supports its academic credibility in the U.S.",
    },
    {
      q: "How long does the Edgewood University Online MBA+DBA take to complete?",
      question: "How long does the Edgewood University Online MBA+DBA take to complete?",
      a: "The Edgewood University Online MBA+DBA can be completed in around 2.5 years, combining both degrees in one structured path.",
      answer: "The Edgewood University Online MBA+DBA can be completed in around 2.5 years, combining both degrees in one structured path.",
    },
    {
      q: "Does the MBA part of Edgewood University's Online MBA+DBA have business accreditation?",
      question: "Does the MBA part of Edgewood University's Online MBA+DBA have business accreditation?",
      a: "Yes. The MBA included in the Edgewood University Online MBA+DBA is ACBSP-accredited, which reflects quality standards in business education.",
      answer: "Yes. The MBA included in the Edgewood University Online MBA+DBA is ACBSP-accredited, which reflects quality standards in business education.",
    },
    {
      q: "Which is better: Edgewood University Online MBA or MBA+DBA?",
      question: "Which is better: Edgewood University Online MBA or MBA+DBA?",
      a: "Choose Edgewood University Online MBA for leadership and career growth. Choose MBA+DBA if you want advanced expertise, applied research skills, and the 'Dr.' title.",
      answer: "Choose Edgewood University Online MBA for leadership and career growth. Choose MBA+DBA if you want advanced expertise, applied research skills, and the 'Dr.' title.",
    },
  ],

  // Modals
  scholarshipModal: {
    modalBg: "#ffffff",
    titleText: "Get Scholarship Coupon Code",
    title: "Get Scholarship Coupon Code",
    titleColor: "#ba0000",
    subtitleText: "Academic Experts will assist you!",
    subtitle: "Academic Experts will assist you!",
    subtitleColor: "#333333",
    submitBtnBg: "#ba0000",
    submitButtonBg: "#ba0000",
    submitButtonBackground: "#ba0000",
    submitButtonTextColor: "#ffffff",
    submitButtonRadius: "4px",
    submitBtnText: "Submit",
    buttonText: "Submit",
    hideTermsCheckbox: true,
    formName: "Scholarship Coupon Modal",
  },
  compareModal: {
    modalBg: "#ffffff",
    titleText: "Get Scholarship Coupon Code",
    title: "Get Scholarship Coupon Code",
    titleColor: "#ba0000",
    subtitleText: "Academic Experts will assist you!",
    subtitle: "Academic Experts will assist you!",
    subtitleColor: "#333333",
    submitBtnBg: "#ba0000",
    submitButtonBg: "#ba0000",
    submitButtonBackground: "#ba0000",
    submitButtonTextColor: "#ffffff",
    submitButtonRadius: "4px",
    submitBtnText: "Submit",
    buttonText: "Submit",
    hideTermsCheckbox: true,
    formName: "Compare Universities Modal",
  },
};
