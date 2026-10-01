import React from "react";

/**
 * Systematic Custom CSS for Golden Gate University (GGU) Landing Page
 * Matched precisely to https://distanceeducationschool.com/ggu/
 */
export const gguCustomCss = `
  /* =========================================================
     1. TYPOGRAPHY & BASE RESET
     ========================================================= */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800&family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800&display=swap');

  .landing-page--ggu {
    font-family: 'Montserrat', sans-serif !important;
    scroll-behavior: smooth;
    color: #111111;
    background-color: #ffffff;
  }

  /* =========================================================
     2. TOP NAVBAR (#navbar)
     ========================================================= */
  .landing-page--ggu header.navbar,
  .landing-page--ggu .navbar {
    background: #ffffff !important;
    border-top: none !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04) !important;
    position: sticky !important;
    top: 0 !important;
    z-index: 1049 !important;
  }
  .landing-page--ggu .top-navbar {
    min-height: 58px !important;
    height: 58px !important;
  }
  .landing-page--ggu .des_logo {
    display: flex !important;
    align-items: center !important;
    padding: 0 !important;
  }
  .landing-page--ggu .des_logo > div {
    width: 48px !important;
    height: 44px !important;
    max-width: 48px !important;
    max-height: 44px !important;
    position: relative !important;
    overflow: hidden !important;
  }
  .landing-page--ggu .des_logo img {
    width: 100% !important;
    height: 100% !important;
    max-width: 48px !important;
    max-height: 44px !important;
    object-fit: contain !important;
    position: relative !important;
  }
  .landing-page--ggu .header_menu_list li a {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 600 !important;
    font-size: 14.5px !important;
    color: #002147 !important;
    letter-spacing: 0.2px !important;
    padding: 6px 4px !important;
    transition: color 0.2s ease !important;
    text-decoration: none !important;
  }
  .landing-page--ggu .header_menu_list li a:hover {
    color: #DC520A !important;
  }

  /* =========================================================
     3. HERO SECTION (#hero)
     ========================================================= */
  .landing-page--ggu #hero {
    background-image: url(/assets/ggu/ggu_desktop_new_bg.png) !important;
    background-position: center top !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    padding: 24px 15px !important;
    min-height: auto !important;
    position: relative !important;
    display: flex !important;
    align-items: center !important;
  }
  @media (max-width: 768px) {
    .landing-page--ggu #hero {
      background-image: url(/assets/ggu/mobile_new_bg_main.png) !important;
      background-position: center top !important;
      padding: 20px 12px !important;
    }
  }
  .landing-page--ggu #hero > div.absolute {
    display: none !important;
  }
  .landing-page--ggu #hero h1 {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 800 !important;
    letter-spacing: -0.2px !important;
    color: #003468 !important;
    font-size: 40px !important;
    line-height: 1.12 !important;
    margin: 4px 0 6px 0 !important;
    white-space: pre-line !important;
  }
  @media (max-width: 640px) {
    .landing-page--ggu #hero h1 {
      font-size: 28px !important;
      line-height: 1.15 !important;
    }
  }
  .landing-page--ggu #hero .hero-highlight-pill {
    display: inline-block !important;
    width: fit-content !important;
    border: 2px solid #DC520A !important;
    border-radius: 9999px !important;
    background-color: #ffffff !important;
    color: #003468 !important;
    font-family: 'Montserrat', sans-serif !important;
    font-style: italic !important;
    font-weight: 800 !important;
    font-size: 19px !important;
    padding: 4px 24px !important;
    margin: 6px 0 10px 0 !important;
  }
  .landing-page--ggu #hero .hero-course-strip {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 600 !important;
    font-size: 13.5px !important;
    line-height: 1.55 !important;
    color: #222222 !important;
    max-width: 450px !important;
    margin: 6px 0 12px 0 !important;
  }

  /* =========================================================
     4. LEAD FORM CARD
     ========================================================= */
  .landing-page--ggu #hero .landing-lead-card {
    border-radius: 12px !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12) !important;
    border: 1px solid rgba(226, 232, 240, 0.9) !important;
    background: #ffffff !important;
    padding: 12px 16px !important;
    width: 100% !important;
    max-width: 350px !important;
  }
  .landing-page--ggu #hero .landing-lead-card .ant-form-item {
    margin-bottom: 6px !important;
  }
  .landing-page--ggu #hero .landing-lead-card h2 {
    color: #003468 !important;
    font-size: 18px !important;
    font-weight: 800 !important;
    margin-bottom: 1px !important;
  }
  .landing-page--ggu #hero .landing-lead-card p {
    font-size: 11px !important;
    color: #4b5563 !important;
  }
  .landing-page--ggu #hero .landing-lead-card input,
  .landing-page--ggu #hero .landing-lead-card select {
    height: 32px !important;
    font-size: 12px !important;
  }
  .landing-page--ggu #hero .landing-lead-card a[href^="tel:"],
  .landing-page--ggu #hero .landing-lead-card a[variant="phone"] {
    background-color: #003468 !important;
    background: #003468 !important;
    color: #ffffff !important;
    padding: 2.5px 12px !important;
    font-size: 11.5px !important;
    border-radius: 9999px !important;
    text-decoration: none !important;
    display: inline-flex !important;
    align-items: center !important;
  }
  .landing-page--ggu #hero .landing-lead-card button[type="submit"] {
    background-color: #003468 !important;
    background: #003468 !important;
    color: #ffffff !important;
    border-radius: 6px !important;
    height: 35px !important;
    font-size: 13.5px !important;
    font-weight: 700 !important;
    transition: background 0.2s ease !important;
  }
  .landing-page--ggu #hero .landing-lead-card button[type="submit"]:hover {
    background-color: #002347 !important;
  }

  /* =========================================================
     5. COURSES OFFERED SECTION (#main-courses)
     ========================================================= */
  .landing-page--ggu #main-courses {
    background-color: #e6e6e6 !important;
    padding: 50px 0 !important;
  }
  .landing-page--ggu #main-courses .header h2 {
    color: #DC520A !important;
    font-size: 28px !important;
    font-weight: 700 !important;
    margin: 0 !important;
  }
  .landing-page--ggu #main-courses .course-card {
    border-radius: 20px !important;
    background: #ffffff !important;
    overflow: hidden !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
  }
  .landing-page--ggu #main-courses .btn.outline {
    border: 1.5px solid #DC520A !important;
    color: #000000 !important;
    background: transparent !important;
  }
  .landing-page--ggu #main-courses .btn.solid {
    background-color: #DC520A !important;
    color: #ffffff !important;
  }

  /* =========================================================
     6. SPECIALIZATIONS TABS & SLIDER (#courses)
     ========================================================= */
  .landing-page--ggu #courses .tab-btn.active {
    background-color: #DC520A !important;
    color: #ffffff !important;
  }

  /* =========================================================
     7. ABOUT US SECTION (#about)
     ========================================================= */
  .landing-page--ggu #about {
    background-color: #003468 !important;
    color: #ffffff !important;
  }
  .landing-page--ggu #about h2 {
    color: #ffffff !important;
  }
  .landing-page--ggu #about button {
    background-color: #DC520A !important;
    color: #ffffff !important;
  }

  /* =========================================================
     8. ACCREDITATIONS & ASSOCIATIONS (#accreditations)
     ========================================================= */
  .landing-page--ggu #accreditations {
    background-color: #F6F6F6 !important;
    padding-top: 48px !important;
    padding-bottom: 24px !important;
  }
  .landing-page--ggu #accreditations h2 {
    color: #111111 !important;
    font-weight: 800 !important;
    font-size: 28px !important;
  }
  .landing-page--ggu #accreditations .sub-pp {
    color: #444444 !important;
    font-size: 15.5px !important;
    font-weight: 500 !important;
    margin-top: 4px !important;
  }
  .landing-page--ggu #accreditations .b1 {
    background: #ffffff !important;
    border-radius: 8px !important;
    border: 1px solid rgba(0, 0, 0, 0.05) !important;
    border-bottom: 3px solid #DC520A !important;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.04) !important;
    padding: 20px 16px !important;
    height: 175px !important;
    transition: transform 0.2s ease, box-shadow 0.2s ease !important;
  }
  .landing-page--ggu #accreditations .b1:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
  }
  .landing-page--ggu #accreditations .b1 h3 {
    color: #003468 !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    margin-top: 8px !important;
  }

  /* =========================================================
     9. SAMPLE DEGREE SECTION (#degree)
     ========================================================= */
  .landing-page--ggu #degree {
    background-color: #F6F6F6 !important;
    padding-top: 10px !important;
    padding-bottom: 60px !important;
  }
  .landing-page--ggu #degree h2 {
    color: #003468 !important;
    font-weight: 800 !important;
  }
  .landing-page--ggu #degree button {
    background-color: #DC520A !important;
    color: #ffffff !important;
  }

  /* =========================================================
     10. LEARNING OUTCOMES (#benefits)
     ========================================================= */
  .landing-page--ggu #benefits {
    background-color: #003468 !important;
    color: #ffffff !important;
  }

  /* =========================================================
     11. ACHIEVEMENTS / STATS (#stats)
     ========================================================= */
  .landing-page--ggu #stats .ach {
    background-color: #003468 !important;
    color: #ffffff !important;
  }

  /* =========================================================
     12. HOW TO APPLY (#how-to-apply)
     ========================================================= */
  .landing-page--ggu #how-to-apply h2 {
    color: #193579 !important;
  }

  /* =========================================================
     13. FAQS (#faqs)
     ========================================================= */
  .landing-page--ggu #faqs h2 {
    color: #003468 !important;
  }

  /* =========================================================
     14. COMPARE BANNER (#compareBanner)
     ========================================================= */
  .landing-page--ggu .compare_box {
    background: #003468 !important;
    color: #ffffff !important;
  }
`;

export const gguData = {
  slug: "ggu",
  customCss: gguCustomCss,
  meta: {
    title: "Golden Gate University Online DBA | Golden Gate University Online MBA & Programs",
    description:
      "Golden Gate University Online DBA and Golden Gate University Online MBA programs. Golden Gate University online degrees with DBA specializations in Finance, Marketing, Leadership, Business Analytics, and Generative AI. Golden Gate University online DBA fees, MBA fees, eligibility, and admission details.",
    keywords: [
      "Golden Gate University Online",
      "GGU Online DBA",
      "GGU Online MBA",
      "Golden Gate University San Francisco",
      "GGU Online Admissions 2026",
      "GGU Doctorate of Business Administration",
      "GGU Pay After Placement",
      "U.S. Accredited University Online",
    ],
  },
  fontFamily: "Montserrat",
  brand: {
    fontFamily: "Montserrat",
    font: "Montserrat",
    slug: "ggu",
    name: "Golden Gate University Online",
    shortName: "GGU",
    hashtag: "By Golden Gate University via upGrad",
    headline: "Golden Gate University Online Courses",
    tagline1: "Leadership Advancement or a Doctoral Degree",
    tagline2: "100% Online | U.S.-Accredited University | Working-Professional Focus | No Cost EMI | 2500+ Global CXOs",
    phone: "+91 7065 7777 55",
    phoneDisplay: "+91 7065 7777 55",
    enquireTitle: "Admission Open",
    enquireSubtitle: "Academic Experts will assist you!",
    officialUrl: "https://www.ggu.edu",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E",
    sodeLogo: "/assets/all_universities_images/ggu/new_sode_tm_logo.png",
    sodeIcon: "/assets/all_universities_images/ggu/new_sode_tm_logo.png",
    campusImage: "/assets/all_universities_images/ggu/about-ggu.webp",
    buildingAboutImage: "/assets/all_universities_images/ggu/about-ggu.webp",
    whyChooseStudentImage: "/assets/all_universities_images/ggu/learning-outcome-01.webp",
    arrowGif: "/assets/all_universities_images/ggu/arrow.gif",
    giftGif: "/assets/all_universities_images/ggu/gift.gif",
    callGif: "/assets/all_universities_images/ggu/call_icon.gif",
    primaryColor: "#003468",
    accentColor: "#DC520A",
    goldColor: "#DC520A",
    themeBg: "bg-[#003468]",
    themeGradient: "linear-gradient(90deg, #003468 0%, #004c99 100%)",
    themeBorder: "border-[#003468]",
    showSodeLogo: true,
    sodeIcon: "/assets/all_universities_images/ggu/new_sode_tm_logo.png",
    showNavDivider: false,
    hideMangLogo: true,
    showCouponBtn: false,
    showCouponButton: false,
    hideNavbarBadge: true,
    showNavbarBadge: false,
    badgeText: "",
    navLinks: [
      { label: "Courses", href: "#main-courses" },
      { label: "Approvals", href: "#accreditations" },
      { label: "About", href: "#about" },
      { label: "FAQ", href: "#faqs" },
    ],
    faqHeaderColor: "#003468",
    footerBg: "#1a2530",

    // Scholarship Popup Trigger Requirement:
    // Triggers when user reaches "Advance Your Career with GGU Online Courses" (LandingDegree #degree)
    scholarshipTriggerId: "degree",

    // Custom CSS Overrides specifically for Golden Gate University (loaded from JSON)
    customCss: gguCustomCss,

    // Section sequence exactly matching https://distanceeducationschool.com/ggu/
    sectionOrder: [
      "programmes",
      "about",
      "approvals",
      "degree",
      "whyChoose",
      "stats",
      "admissionProcess",
      "faqs",
      "compareBanner",
    ],

    // Hero Section Configuration
    hero: {
      backgroundImage: "/assets/all_universities_images/ggu/ggu_desktop_new_bg.png",
      mobileBackgroundImage: "/assets/all_universities_images/ggu/mobile_new_bg_main.png",
      backgroundPosition: "center -50px",
      backgroundSize: "cover",
      isDarkTheme: false,
      noOverlay: true,
      hideCourseBox: true,
      sectionBg: "#ffffff",
      backgroundColor: "#ffffff",
      minHeight: "auto",
      containerClassName: "!max-w-[1135px] !w-full !p-0 !min-h-0",
      containerStyle: {
        minHeight: "auto",
      },
      contentClassName: "!max-w-[450px] !w-full",

      // Top logo in Hero matching Image 2
      welcomeText: (
        <img
          src="/assets/all_universities_images/ggu/new_ggu_logo_main.png"
          alt="Golden Gate University | upGrad"
          className="h-[28px] sm:h-[32px] w-auto object-contain"
        />
      ),
      welcomeContainerClassName: "!mb-2 !mt-0 !text-left",
      welcomeBadgeClassName: "!bg-transparent !p-0 !min-w-0 !shadow-none !border-none !rounded-none !block",
      welcomeTextStyle: {
        background: "transparent",
        padding: 0,
        boxShadow: "none",
        border: "none",
      },

      hashtagText: "Leadership Advancement or a Doctoral Degree",
      hashtagStyle: {
        fontFamily: "'Montserrat', sans-serif",
        color: "#222222",
        fontSize: "14px",
        fontWeight: "700",
        letterSpacing: "0.1px",
        marginBottom: "3px",
      },

      headlineText: "Golden Gate University\nOnline Courses",
      headingFont: "'Montserrat', sans-serif",
      headingClassName: "!whitespace-pre-line !leading-[1.12] tracking-tight font-extrabold text-[36px] sm:text-[40px] text-[#003468]",
      headingStyle: {
        fontFamily: "'Montserrat', sans-serif",
        color: "#003468",
        fontSize: "40px",
        lineHeight: "1.12",
        fontWeight: "800",
        letterSpacing: "-0.2px",
        marginTop: "3px",
        marginBottom: "6px",
      },

      taglineText: (
        <span>
          By <u>Golden Gate University</u> via <u>upGrad</u>
        </span>
      ),
      taglineStyle: {
        fontFamily: "'Montserrat', sans-serif",
        color: "#111111",
        fontSize: "13.5px",
        fontWeight: "600",
        lineHeight: "1.3",
        marginTop: "2px",
        marginBottom: "8px",
      },

      highlightBox: {
        lines: [
          "DBA / MBA",
        ],
        className: "!w-fit !px-6 !py-1 !rounded-full !border-2 !border-[#DC520A] !bg-white !text-[#003468] !italic !text-[19px] !font-extrabold !my-2 !shadow-none hero-highlight-pill",
        style: {
          fontFamily: "'Montserrat', sans-serif",
          backgroundColor: "#ffffff",
          color: "#003468",
          border: "2px solid #DC520A",
          borderRadius: "9999px",
          padding: "4px 24px",
          fontSize: "19px",
          fontWeight: "800",
          fontStyle: "italic",
          textAlign: "center",
          lineHeight: "1.2",
          display: "inline-block",
          width: "fit-content",
          marginTop: "4px",
          marginBottom: "8px",
        },
      },

      coursesStrip: [
        "100% Online | U.S.-Accredited University |",
        "Working-Professional Focus | No Cost EMI |",
        "2500+ Global CXOs",
      ],
      courseStripClassName: "!font-medium !text-[13.5px] !leading-[1.55] !text-[#222222] !my-2 !space-y-0.5 whitespace-nowrap hero-course-strip",
      courseStripStyle: {
        fontFamily: "'Montserrat', sans-serif",
        color: "#222222",
        fontSize: "13.5px",
        fontWeight: "500",
        lineHeight: "1.55",
        width: "100%",
        maxWidth: "450px",
        marginTop: "4px",
        marginBottom: "10px",
      },

      brochureButtonText: "Download Brochure",
      buttonStyle: {
        fontFamily: "'Montserrat', sans-serif",
        background: "#DC520A",
        backgroundColor: "#DC520A",
        color: "#ffffff",
        borderRadius: "5px",
        fontSize: "14px",
        fontWeight: "700",
        padding: "8px 20px",
      },

      cardStyle: "white",
      formBackground: "#ffffff",
      formCardType: "white",
      enquireTitle: "Admission Open",
      enquireSubtitle: "Academic Experts will assist you!",
      enquireColor: "#003468",
      enquireSubtitleColor: "#333333",
      phoneBadgeBg: "#003468",
      phoneBadgeBackground: "#003468",
      phoneBadgeStyle: {
        background: "#003468",
        backgroundColor: "#003468",
        color: "#ffffff",
        borderRadius: "9999px",
        padding: "3px 14px",
        fontSize: "12px",
      },
      submitBtnBg: "#003468",
      submitButtonBackground: "#003468",
      submitButtonRadius: "6px",
      submitButtonTextColor: "#ffffff",
    },

    // Approvals Configuration
    approvalsLayout: "ggu",
    approvalsTitle: "Accreditations & Associations",
    approvalsSubtitle: "of Golden Gate University, San Francisco",
    approvalsBorderColor: "#DC520A",
    approvalsHeaderColor: "#111111",
    approvalsBg: "#F6F6F6",

    // Programmes Layout Configuration
    programmesLayout: "ggu",
    programmesTitle: "COURSES OFFERED",
    programmesSubtitle: "By Golden Gate University",
    programmesBg: "#e6e6e6",
    programmeBtnBg: "#DC520A",
    programmeBtnTextColor: "#ffffff",

    // About Layout Configuration (50/50 Full Bleed Layout matching Image 2)
    aboutLayout: "ggu",
    aboutTitle: "ABOUT US",
    aboutSubtitle: "Golden Gate University San Francisco",
    aboutButtonText: "Request Call Back",
    aboutBg: "#003468",
    aboutButtonBg: "#DC520A",

    // Degree Layout Configuration
    degreeLayout: "ggu",
    degreeTitleColor: "#003468",
    degreeBtnBg: "#DC520A",
    degreeBtnTextColor: "#ffffff",

    // Why Choose (Learning Outcomes after a DBA at GGU)
    whyChooseLayout: "ggu",
    whyChooseTitle: "LEARNING OUTCOMES",
    whyChooseSubtitle: "After a DBA at GGU",
    whyChooseBg: "#003468",

    // Stats Layout Configuration
    statsLayout: "ggu",

    // Admission Process Configuration
    admissionProcessId: "how-to-apply",
    admissionTitle: "How to Apply for Golden Gate University Online Courses",
    admissionSubtitle:
      "Students can easily enrol in Golden Gate University Online courses. Candidates can conveniently apply by selecting their desired program. Follow these steps to secure admission in the university.",
    admissionHeadingColor: "#193579",

    // Compare Banner Configuration
    compareBannerBg: "#003468",
    compareUniversityName: "Golden Gate University",
    compareSubtitle: "Compare Golden Gate University with Top World Renowned Universities",
    compareSectionBg: "bg-white",
    arrowGif: "/assets/all_universities_images/ggu/arrow.gif",

    // FAQ Configuration
    faqLayout: "ggu",
    faqTitle: "FAQ-Frequently Asked Questions",
    faqAccentColor: "#003468",
    faqDefaultOpenIndex: 0,

    // Footer Configuration
    footerLogo: "/assets/all_universities_images/ggu/new-des-logo.webp",
    footerSectionBg: "bg-white",
    footerBottomBg: "#003468",
  },

  // Approvals Data
  approvals: [
    {
      id: "wasc",
      title: "WASC",
      description: "WASC Senior College and University Commission",
      image: "/assets/all_universities_images/ggu/wasc.webp",
    },
    {
      id: "aals",
      title: "AALS",
      description: "Association of American Law Schools",
      image: "/assets/all_universities_images/ggu/association-of-american.webp",
    },
    {
      id: "state-bar",
      title: "The State Bar of California",
      description: "Accredited by The State Bar of California",
      image: "/assets/all_universities_images/ggu/state-bar-of-california.webp",
    },
    {
      id: "aacsb",
      title: "AACSB",
      description: "Association to Advance Collegiate Schools of Business",
      image: "/assets/all_universities_images/ggu/aacsb.webp",
    },
  ],

  // Degree Info (Advance Your Career with GGU Online Courses)
  degreeInfo: {
    title: "Advance Your Career with GGU\nOnline Courses",
    description:
      "GGU makes it easy for students to get a management and doctoral degree. Students can study whenever they are comfortable and go at their own pace. GGU gives students everything they need to succeed.",
    image: "/assets/all_universities_images/ggu/doctor_certificate.webp",
    buttonText: "Get Degree",
    features: [
      {
        desc: "The student gets the same top-quality education as those on campus, without having to move.",
      },
      {
        desc: "GGU has been trusted since 1959 with full accreditation from WASC",
      },
      {
        desc: "You join over 68,000 alumni worldwide, many in leadership positions",
      },
    ],
  },

  // About Section Data (Matching Image 2)
  about: {
    title: "ABOUT US",
    subtitle: "Golden Gate University San Francisco",
    paragraphs: [
      "Founded in 1901, Golden Gate University (GGU) in San Francisco is a pioneer in practice-based education for adults. We focus exclusively on professional programs in business, law, and technology, designed for working students seeking to advance their careers. Flexible, accessible courses are taught by expert faculty who are industry leaders. GGU's mission is to empower a diverse student body through an education that is immediately applicable in the workplace, fostering success from day one.",
      "With a strong emphasis on real-world experience, GGU also offers networking opportunities, career support, and specialized programs to help students achieve leadership roles and professional growth in their chosen fields.",
    ],
    description:
      "Founded in 1901, Golden Gate University (GGU) in San Francisco is a pioneer in practice-based education for adults. We focus exclusively on professional programs in business, law, and technology, designed for working students seeking to advance their careers. Flexible, accessible courses are taught by expert faculty who are industry leaders. GGU's mission is to empower a diverse student body through an education that is immediately applicable in the workplace, fostering success from day one.\n\nWith a strong emphasis on real-world experience, GGU also offers networking opportunities, career support, and specialized programs to help students achieve leadership roles and professional growth in their chosen fields.",
    image: "/assets/all_universities_images/ggu/about-ggu.webp",
    desktopImage: "/assets/all_universities_images/ggu/about-ggu.webp",
    mobileImage: "/assets/all_universities_images/ggu/about-mobile.webp",
    buttonText: "Request Call Back",
    imagePosition: "right",
  },

  // Why Choose / Learning Outcomes Data
  whyChoose: [
    {
      title: "PwC Board Certification",
      desc: "Earn a PwC Board Advisory Certification",
      image: "/assets/all_universities_images/ggu/learning-outcone-icon.webp",
    },
    {
      title: "Publish Your Dissertation",
      desc: "Release your Doctoral dissertation as a book",
      image: "/assets/all_universities_images/ggu/learning-outcone-icon.webp",
    },
    {
      title: "Teach at UGC Colleges",
      desc: "Teach in UGC recognised colleges in your free time",
      image: "/assets/all_universities_images/ggu/learning-outcone-icon.webp",
    },
    {
      title: "No-Code Prototyping",
      desc: "Prototype and pilot your ideas with no-code platforms",
      image: "/assets/all_universities_images/ggu/learning-outcone-icon.webp",
    },
    {
      title: "Global IP Protection",
      desc: "Protect your ideas with Solid IPs in 155 countries",
      image: "/assets/all_universities_images/ggu/learning-outcone-icon.webp",
    },
    {
      title: "Pitch to VCs",
      desc: "Pitch your ideas to real VCs with chequebooks",
      image: "/assets/all_universities_images/ggu/learning-outcone-icon.webp",
    },
  ],

  // Achievements / Stats Data
  stats: [
    {
      value: "10k+",
      label: "Professionals Enrolled Successfully",
    },
    {
      value: "05+",
      label: "In-demand Specialisation",
    },
    {
      value: "100+",
      label: "Career Counseling Experts",
    },
    {
      value: "30k",
      label: "Admissions Done",
    },
  ],

  // Programmes Data (Ordered matching Image 1: Marketing, General, Generative AI first)
  programmes: [
    {
      id: "mba",
      code: "MBA",
      title: "Master of Business Administration (MBA)",
      badge: "MASTER",
      category: "Master",
      level: "Postgraduate",
      duration: "20 months (online + optional on-campus pathway)",
      eligibility: "Master's or Bachelor's Degree with 5+ years of experience.",
      description:
        "A US-approved or practice-driven program that offers both from Golden Gate University MBA online. The course builds strong leadership skills, strategic thinking, and data-informed decision-making skills. The University faculty is from a San Francisco-based scholar-practitioner with years of experience.",
      details: [
        { label: "Duration", value: "20 months (online + optional on-campus pathway)" },
        { label: "Eligibility", value: "Master's or Bachelor's Degree with 5+ years of experience." },
      ],
      image: "/assets/all_universities_images/ggu/master-mba-ggu.webp",
    },
    {
      id: "dba",
      code: "DBA",
      title: "Doctor of Business Administration (DBA)",
      badge: "DOCTORATE",
      category: "Doctorate",
      level: "Doctoral",
      duration: "36 months | 56 credits",
      eligibility: "Recognised degree in Bachelor’s University",
      description:
        "A degree that is flexible and recognised, the online DBA at Golden Gate University is an advanced doctoral program that is for senior-level leaders, consultants, and academics. The course focuses on research, problem-solving, and an original dissertation that talks about real-life business challenges.",
      details: [
        { label: "Duration & Credits", value: "36 months | 56 credits" },
        { label: "Eligibility", value: "Recognised degree in Bachelor’s University" },
      ],
      image: "/assets/all_universities_images/ggu/doctorate-dba-ggu.webp",
    },
    {
      id: "dba-marketing",
      code: "DBA Marketing",
      title: "Online DBA in Marketing",
      category: "Doctorate",
      level: "Doctoral",
      duration: "36 Months",
      eligibility: "Master's or Bachelor's Degree",
      description:
        "Explore advanced research on consumer behavior and brand management strategies. Gain mastery in digital marketing analytics and global marketing campaign development.",
      image: "/assets/all_universities_images/ggu/marketing-ggu.webp",
    },
    {
      id: "dba-general",
      code: "DBA General",
      title: "Online DBA in General",
      category: "Doctorate",
      level: "Doctoral",
      duration: "36 Months",
      eligibility: "Master's or Bachelor's Degree",
      description:
        "Pursue a broad, interdisciplinary approach to advanced business challenges. Customize your research to address complex issues across multiple business functions.",
      image: "/assets/all_universities_images/ggu/general-ggu.webp",
    },
    {
      id: "dba-ai",
      code: "DBA AI",
      title: "Online DBA in Generative AI",
      category: "Doctorate",
      level: "Doctoral",
      duration: "36 Months",
      eligibility: "Master's or Bachelor's Degree",
      description:
        "Investigate the strategic implementation and ethical governance of AI in the business sector. Develop skills to lead innovation and leverage generative AI for competitive advantage.",
      image: "/assets/all_universities_images/ggu/generative-ai-ggu.webp",
    },
    {
      id: "dba-finance",
      code: "DBA Finance",
      title: "Online DBA in Finance",
      category: "Doctorate",
      level: "Doctoral",
      duration: "36 Months",
      eligibility: "Master's or Bachelor's Degree",
      description:
        "Master advanced financial theory and quantitative analysis. Prepare for executive leadership roles in corporate finance, investment banking, and economic consulting.",
      image: "/assets/all_universities_images/ggu/finance-ggu.webp",
    },
    {
      id: "dba-leadership",
      code: "DBA Leadership",
      title: "Online DBA in Leadership",
      category: "Doctorate",
      level: "Doctoral",
      duration: "36 Months",
      eligibility: "Master's or Bachelor's Degree",
      description:
        "Develop sophisticated strategies for leading organizational change. Enhance your ability to solve complex human capital and strategic management challenges.",
      image: "/assets/all_universities_images/ggu/leadership-ggu.webp",
    },
    {
      id: "dba-analytics",
      code: "DBA Analytics",
      title: "Online DBA in Business Analytics",
      category: "Doctorate",
      level: "Doctoral",
      duration: "36 Months",
      eligibility: "Master's or Bachelor's Degree",
      description:
        "Learn to transform big data into actionable business intelligence. Build expertise in predictive modeling, data mining, and executive data-driven decision-making.",
      image: "/assets/all_universities_images/ggu/business-analytics-ggu.webp",
    },
    {
      id: "mba-analytics",
      code: "MBA Analytics",
      title: "MBA in Business Analytics",
      category: "Master",
      level: "Postgraduate",
      duration: "20 Months",
      eligibility: "Bachelor's Degree",
      description:
        "Focuses on enterprise performance management, business intelligence, web and social analytics, and data visualization for informed decision-making.",
      image: "/assets/all_universities_images/ggu/business-analytics-concentration-ggu-mba.webp",
    },
    {
      id: "mba-psychology",
      code: "MBA Psychology",
      title: "MBA in Org Psychology",
      category: "Master",
      level: "Postgraduate",
      duration: "20 Months",
      eligibility: "Bachelor's Degree",
      description:
        "Covers organizational behavior, applied psychological research, and consulting skills to enhance leadership effectiveness in multinational teams.",
      image: "/assets/all_universities_images/ggu/industrial-organizational-psychology-concentration-ggu-mba.webp",
    },
    {
      id: "mba-itm",
      code: "MBA ITM",
      title: "MBA in IT Management",
      category: "Master",
      level: "Postgraduate",
      duration: "20 Months",
      eligibility: "Bachelor's Degree",
      description:
        "Emphasizes digital transformation, enterprise IT management, data structures, and software engineering leadership to align technology with business objectives.",
      image: "/assets/all_universities_images/ggu/information-technology-management-ggu-mba.webp",
    },
    {
      id: "mba-finance",
      code: "MBA Finance",
      title: "MBA in Finance",
      category: "Master",
      level: "Postgraduate",
      duration: "20 Months",
      eligibility: "Bachelor's Degree",
      description:
        "Provides deep training in financial reporting, business valuation, financial modeling, and analytical frameworks essential for corporate finance leadership.",
      image: "/assets/all_universities_images/ggu/finance-ggu-mba.webp",
    },
    {
      id: "mba-marketing",
      code: "MBA Marketing",
      title: "MBA in Marketing",
      category: "Master",
      level: "Postgraduate",
      duration: "20 Months",
      eligibility: "Bachelor's Degree",
      description:
        "Centers on market research, digital marketing, integrated marketing communications, and e-commerce strategy to build customer-focused marketing leadership.",
      image: "/assets/all_universities_images/ggu/marketing-ggu-mba.webp",
    },
    {
      id: "mba-leadership",
      code: "MBA Leadership",
      title: "MBA in Adaptive Leadership",
      category: "Master",
      level: "Postgraduate",
      duration: "20 Months",
      eligibility: "Bachelor's Degree",
      description:
        "Develops capabilities in adaptive leadership, leading complex change, and personal leadership growth to manage uncertainty in modern organizations.",
      image: "/assets/all_universities_images/ggu/adaptive-leadership-ggu-mba.webp",
    },
    {
      id: "mba-general",
      code: "MBA General",
      title: "MBA in General",
      category: "Master",
      level: "Postgraduate",
      duration: "20 Months",
      eligibility: "Bachelor's Degree",
      description:
        "Allows students to select courses across multiple concentrations, creating a flexible MBA pathway aligned with individual career goals.",
      image: "/assets/all_universities_images/ggu/general-ggu-mba.webp",
    },
  ],

  // Course Options for Lead Form Dropdown
  courses: [
    "DBA in Finance",
    "DBA in Marketing",
    "DBA in Leadership",
    "DBA in General",
    "DBA in Business Analytics",
    "DBA in Generative AI",
    "MBA in Business Analytics Concentration",
    "MBA in Industrial Organizational Psychology Concentration",
    "MBA in Information Technology Management",
    "MBA in Finance",
    "MBA in Marketing",
    "MBA in Adaptive Leadership",
    "MBA in General",
  ],

  // Admission Process Steps
  admissionSteps: [
    {
      step: 1,
      title: "Submit Form",
      description: "Fill in and submit your application form online",
    },
    {
      step: 2,
      title: "Expert's Counseling",
      description: "You will receive a call from our expert counselor",
    },
    {
      step: 3,
      title: "Choose University",
      description: "Select the course & specialization according to your interest",
    },
    {
      step: 4,
      title: "Online Payment",
      description: "You need to make a smooth online fee submission",
    },
    {
      step: 5,
      title: "Document Submit",
      description: "You need to upload all the required verified documents.",
    },
    {
      step: 6,
      title: "Admission Confirm",
      description: "Get Confirmation on your Email & Whatsapp",
    },
  ],

  // Frequently Asked Questions
  faqs: [
    {
      q: "What is the Online DBA course at Golden Gate University?",
      question: "What is the Online DBA course at Golden Gate University?",
      a: "The Doctor of Business Administration (DBA) at GGU is a 36-month, fully online program designed for senior professionals seeking to enhance their leadership and research capabilities.",
      answer:
        "The Doctor of Business Administration (DBA) at GGU is a 36-month, fully online program designed for senior professionals seeking to enhance their leadership and research capabilities.",
    },
    {
      q: "Why choose an Online DBA course from Golden Gate University?",
      question: "Why choose an Online DBA course from Golden Gate University?",
      a: "Golden Gate University's Online DBA offers flexible learning, practical application, and access to experienced San Francisco faculty, providing a robust education for executive career advancement.",
      answer:
        "Golden Gate University's Online DBA offers flexible learning, practical application, and access to experienced San Francisco faculty, providing a robust education for executive career advancement.",
    },
    {
      q: "How does the Golden Gate University MBA online support working professionals?",
      question: "How does the Golden Gate University MBA online support working professionals?",
      a: "The program offers flexible online learning, practice-based coursework, and instruction from U.S.-based faculty with real industry experience without needing to pause your job.",
      answer:
        "The program offers flexible online learning, practice-based coursework, and instruction from U.S.-based faculty with real industry experience without needing to pause your job.",
    },
    {
      q: "How do the MBA and DBA programs at Golden Gate University differ?",
      question: "How do the MBA and DBA programs at Golden Gate University differ?",
      a: "The MBA builds general management and leadership skills, while the DBA focuses on advanced applied research, strategic analysis, and executive-level problem-solving.",
      answer:
        "The MBA builds general management and leadership skills, while the DBA focuses on advanced applied research, strategic analysis, and executive-level problem-solving.",
    },
    {
      q: "Who should apply for the Golden Gate University MBA online?",
      question: "Who should apply for the Golden Gate University MBA online?",
      a: "The program is ideal for working professionals seeking leadership roles, career growth, or advanced business knowledge with global recognition.",
      answer:
        "The program is ideal for working professionals seeking leadership roles, career growth, or advanced business knowledge with global recognition.",
    },
  ],

  // Scholarship Modal Configuration
  scholarshipModal: {
    modalBg: "#ffffff",
    titleText: "Get Scholarship Coupon Code",
    titleColor: "#003468",
    subtitleText: "Academic Experts will assist you!",
    subtitleColor: "#475569",
    inputBg: "#ffffff",
    inputTextColor: "#111827",
    inputPlaceholderColor: "#9ca3af",
    closeBtnColor: "#DC520A",
    submitBtnBg: "#DC520A",
    submitBtnText: "Apply Coupon",
    disclaimerColor: "#475569",
    disclaimerLinkColor: "#003468",
  },

  // Compare Modal Configuration
  compareModal: {
    modalBg: "#ffffff",
    titleText: "Compare Universities",
    titleColor: "#003468",
    subtitleText: "Get expert assistance to compare Golden Gate University with other institutions",
    subtitleColor: "#111827",
    inputBg: "#f4f6f8",
    inputTextColor: "#111827",
    disclaimerColor: "#374151",
    disclaimerLinkColor: "#DC520A",
    submitBtnBg: "#DC520A",
    submitBtnText: "Submit Comparison Request",
    closeBtnColor: "#003468",
    phonePlaceholder: "Enter your Phone Number",
    formName: "Compare Universities Modal - GGU",
  },
};

