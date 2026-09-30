// Mangalayatan University Online Landing Page Data
export const muData = {
  slug: "mu",
  meta: {
    title: "Mangalayatan University Online MBA MCA BBA Courses Admission Fee",
    description:
      "Mangalayatan University Online MBA, MCA, MCOM, BBA, BCA, BCOM Courses Find Admission Fees, Syllabus, Eligibility and Get UGC Approved Degree Courses.",
    keywords: [
      "Mangalayatan University Online",
      "MU Online",
      "Mangalayatan Online MBA",
      "Mangalayatan Online MCA",
      "Mangalayatan University Admission 2026",
      "MU Distance Education",
      "Mangalayatan University Online Courses",
    ],
  },
  brand: {
    slug: "mu",
    name: "Mangalayatan University Online",
    shortName: "Mangalayatan University",
    hashtag: "",
    headline: "Online Degree Courses",
    phone: "+91 7065 7777 55",
    phoneDisplay: "+91 7065 7777 55",
    enquireTitle: "Enquire Now",
    enquireSubtitle: "Academic Experts will assist you!",
    officialUrl: "https://distanceeducationschool.com/mu/",
    logo: "/assets/mu/mang-logo.webp",
    sodeIcon: "/assets/images/sode_icon.png",
    sodeLogo: "/assets/images/new-des-logo.webp",
    showSodeLogo: true,
    showNavDivider: true,
    hideNavDivider: false,
    showCouponBtn: true,
    showCouponButton: true,
    couponButtonText: "Scholarship Coupon Code",
    couponBtnBg: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
    couponButtonColor: "#22c55e",
    giftGif: "/assets/images/gift.gif",
    callGif: "/assets/manipal_v1_images/call_icon.gif",
    showFloatingGift: false,
    primaryColor: "#193579",
    secondaryColor: "#F97316",
    accentColor: "#F97316",
    themeBg: "bg-[#193579]",
    themeBorder: "border-[#193579]",
    goldColor: "#F97316",
    badgeText: "Admission Open 2026",
    footerBg: "#010d2a",
    footerLayout: "footer2",
    faqLayout: "mu",
    // Why Choose Cards Typography (Title & Subtitle Size & Boldness)
    whyChooseCardTitleClassName: "text-[16px] sm:text-[17px] font-bold text-slate-900",
    whyChooseCardSubtitleClassName: "text-[14.5px] sm:text-[15.5px] font-normal text-slate-700",

    footerDisclaimer:
      "This information is provided by SODE Counselling Services LLP. All university names, logos, and trademarks mentioned are used for informational purposes only. We are not a university or an admission authority. Users are encouraged to verify information on the official website of Mangalayatan University before making decisions.",
    showFooterForm: false,

    // Custom CSS Overrides specifically for Mangalayatan University (loaded from JSON)
    customCss: `
      /* Mangalayatan University Custom Styles & Overrides */
      #about,
      .landing-about-mu {
        background-image: url('/assets/mu/about-bg.webp') !important;
        background-position: bottom center !important;
        background-size: contain !important;
        background-repeat: no-repeat !important;
      }
      @media (max-width: 639px) {
        #about,
        .landing-about-mu {
          background-image: url('/assets/mu/about-bg-mobile.webp') !important;
          background-position: bottom center !important;
          background-size: 100% auto !important;
          background-repeat: no-repeat !important;
        }
      }
    `,

    // Section Sequence exactly matching https://distanceeducationschool.com/mu/
    sectionOrder: [
      "approvals",
      "programmes",
      "about",
      "whyChoose",
      "recruiters",
      "sodeAbout",
      "admissionProcess",
      "faqs",
    ],

    // Hero Section Configuration
    hero: {
      backgroundImage: "/assets/mu/front-desktop-image-mangalayatan-final.webp",
      mobileBackgroundImage: "/assets/mu/bg-mobile.webp",
      mobileStudentImage: "/assets/mu/mu-mobile.webp",
      backgroundPosition: "center top",
      backgroundSize: "cover",
      isDarkTheme: false,
      noOverlay: true,
      sectionBg: "#1b1e23",
      containerClassName: "max-w-[1240px]",
      contentClassName: "w-full lg:max-w-[560px] xl:max-w-[580px] shrink-0",
      mobileStudentImage: "/assets/mu/mu-mobile.webp",
      welcomeText: "Welcome to SODE",
      welcomeSubtext: "(School of Online & Distance Education)",
      welcomeContainerClassName: "mb-0",
      welcomeBadgeClassName: "inline-block bg-white text-[#f97316] font-semibold text-[13px] sm:text-[15px] px-3 py-1 min-w-[190px] sm:min-w-[200px] text-center rounded-[7px] shadow-sm mb-2 mt-2 sm:mt-6 lg:mt-12 tracking-[0.3px] select-none",
      welcomeSubtextClassName: "text-[13px] sm:text-[15px] lg:text-[16px] text-white font-medium block tracking-[0.2px] whitespace-normal sm:whitespace-nowrap",
      highlightTitle: "Mangalayatan University",
      highlightTitleColor: "#f97316",
      highlightTitleClassName: "text-[24px] sm:text-[30px] lg:text-[36px] font-bold leading-tight whitespace-normal sm:whitespace-nowrap",
      highlightTitleStyle: {
        fontWeight: "bold",
        lineHeight: "1.1",
        letterSpacing: "0.3px",
      },
      headlineText: "Online Degree Courses",
      headlineColor: "#ffffff",
      headlineTextClassName: "text-[24px] sm:text-[30px] lg:text-[36px] font-bold leading-tight whitespace-normal sm:whitespace-nowrap",
      headlineTextStyle: {
        fontWeight: "bold",
        lineHeight: "1.1",
        letterSpacing: "0.3px",
      },
      headingFont: "var(--font-roboto), Roboto, sans-serif",
      headingClassName: "mt-0 mb-3 leading-[1.1] tracking-normal",
      headingStyle: {
        color: "#ffffff",
        lineHeight: "1.1",
        fontWeight: "bold",
        fontFamily: "var(--font-roboto), Roboto, sans-serif",
        letterSpacing: "0.3px",
        marginTop: "0px",
        marginBottom: "12px",
      },
      taglineText:
        "Students can advance their higher education goals with Mangalayatan University Online from the comfort of their home. They can enhance their career with industry-relevant courses and expert guidance from experienced faculty.",
      taglineColor: "#ffffff",
      taglineClassName: "hero-montserrat-paragraph mt-0 mb-4 text-white/95",
      taglineStyle: {
        color: "#ffffff",
        fontSize: "15px",
        lineHeight: "1.35",
        fontWeight: "400",
        maxWidth: "465px",
        letterSpacing: "0.2px",
        wordSpacing: "0.5px",
        marginTop: "0px",
        marginBottom: "20px",
      },
      hideCourses: true,
      coursesStrip: false,
      hideCourseBox: true,
      brochureButtonText: "Download Brochure",
      buttonBackground: "#f97316",
      buttonTextColor: "#ffffff",
      buttonRadius: "rounded-[6px]",
      buttonClassName: "mt-3 sm:mt-4",
      buttonStyle: {
        backgroundColor: "#f97316",
        color: "#ffffff",
        borderRadius: "6px",
        fontWeight: "600",
        padding: "8px 28px",
        fontSize: "16px",
        letterSpacing: "0.4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.12)",
      },
      formCardType: "white",
      formBackground: "#ffffff",
      formTitleColor: "#193579",
      phoneBadgeBackground: "#f97316",
      formPhoneBg: "#f97316",
      formPhoneColor: "#ffffff",
      submitButtonBackground: "#28a745",
      submitBtnBg: "#28a745",
      submitButtonRadius: "5px",
    },

    // Approvals Configuration (Matching distanceeducationschool.com/mu/ and Image 1)
    approvalsLayout: "mu",
    approvalsTitle: "Mangalayatan University Online",
    approvalsSubtitle: "Approvals & Recognition",
    approvalsBg: "#193579",
    approvalsContainerClassName: "max-w-[1240px]",
    approvalsSectionClassName: "py-4 sm:py-7",
    approvalsTitleClassName: "text-[24px] sm:text-[28px] lg:text-[30px] font-semibold text-white uppercase tracking-[0.5px] m-0",
    approvalsSubtitleClassName: "text-[22px] sm:text-[26px] lg:text-[28px] font-medium text-white uppercase tracking-[0.6px] mt-0 mb-5 sm:mb-7",
    approvalsBadgeSize: "128px",
    approvalsBadgeStyle: {
      backgroundColor: "#ffffff",
      borderRadius: "50%",
      padding: "2px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    },
    approvalsItemTitleClassName: "text-[17px] font-bold text-white tracking-tight mt-1 mb-1.5",
    approvalsItemTextClassName: "text-[12px] sm:text-[12.5px] text-white leading-[1.35] font-normal m-0 max-w-[250px]",

    // Programmes Configuration
    programmesLayout: "tabs",
    programmesTitle: "PROGRAMS OFFERED",
    programmesSubtitle: "BY MANGALAYATAN UNIVERSITY ONLINE",
    programmesBg: "#FFF6F0",
    programmesSectionClassName: "py-5 sm:py-8",
    programmesContainerClassName: "max-w-[1160px]",        // 👈 Card Width / Container width yahan se adjust karein
    programmesTabsClassName: "mb-3.5 sm:mb-4",             // 👈 Master/Bachelor button ke niche ka GAP yahan se kam karein
    programmesCardRadius: "rounded-[6px]",                 // 👈 Card ka CORNER RADIUS yahan se decrease karein (e.g. rounded-[4px] ya rounded-[6px])
    programmesCardImageClassName: "aspect-[16/6.8]",       // 👈 Card IMAGE HEIGHT yahan se decrease karein
    programmesCardBodyClassName: "p-3 sm:p-3.5 pt-2.5 pb-0.5", // 👈 Card BODY HEIGHT yahan se decrease karein
    programmesCardFooterClassName: "px-3 sm:px-3.5 pb-3",  // 👈 Card BOTTOM HEIGHT yahan se decrease karein
    programmesTitleClassName: "text-[26px] sm:text-[30px] lg:text-[32px] font-bold text-[#193579] uppercase tracking-wide m-0",
    programmesSubtitleClassName: "text-[18px] sm:text-[22px] lg:text-[25px] font-medium text-[#193579] uppercase tracking-[0.3px] mt-0 mb-4 sm:mb-5",
    programmesTabActiveClass: "bg-[#F97316] text-white shadow-xs rounded-[5px] mb-2",
    programmesTabInactiveClass: "bg-[#dcdcdc] text-black hover:bg-[#d0d0d0] rounded-[5px] mb-2",
    programmesCardBtn1Class: "border-[1.5px] border-[#0a3e8c] text-[12px] sm:text-[12.5px] text-[#0a3e8c] bg-white hover:bg-slate-50 rounded-full",
    programmesCardBtn2Class: "border-none text-[13px] sm:text-[13.5px] text-white bg-[#f97316] hover:bg-[#ea580c] rounded-full",

    // Why Choose Configuration (Matching distanceeducationschool.com/mu/ and Image 1)
    whyChooseLayout: "mu",
    whyChooseTitle: "WHY CHOOSE",
    whyChooseSubtitle: "MANGALAYATAN UNIVERSITY ONLINE DEGREE COURSES?",
    whyChooseShowDesc: false, // 👈 Image 1 me description nahi h, sirf 2-line bold title h
    whyChooseSectionClassName: "py-10 sm:py-13", // 👈 Section ki HEIGHT yahan se decrease hogi
    whyChooseContainerClassName: "max-w-[1240px]",
    whyChooseGridClassName: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 max-w-[1200px] mx-auto",
    whyChooseCardClassName: "bg-white text-slate-900 rounded-[6px] px-4 py-2.5 sm:px-5 sm:py-3 flex items-center gap-3.5 sm:gap-4 shadow-xs",
    whyChooseTitleClassName: "text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-white tracking-wide uppercase leading-tight m-0",
    whyChooseSubtitleClassName: "text-white uppercase font-bold",

    // About Configuration (Matching distanceeducationschool.com/mu/ and Image 1)
    aboutLayout: "mu",
    aboutBackgroundImage: "/assets/mu/about-bg.webp",
    aboutSectionClassName: "landing-about-mu pt-6 sm:pt-8 md:pt-10 pb-[190px] sm:pb-[260px] md:pb-[380px] lg:pb-[480px]",
    aboutContainerClassName: "max-w-[1140px] mx-auto px-4 sm:px-6 text-center",
    aboutTitleClassName: "text-[22px] sm:text-[26px] lg:text-[28px] font-extrabold text-[#F97316] uppercase tracking-wide mb-2 sm:mb-3",
    aboutTextClassName: "space-y-2 sm:space-y-2.5 text-[14px] sm:text-[15px] lg:text-[15.5px] text-[#2c3e50] leading-[1.5] sm:leading-[1.55] font-light mb-3 sm:mb-4 max-w-[1100px] mx-auto",
    aboutParagraphClassName: "m-0 text-center",
    aboutButtonClassName: "inline-flex items-center justify-center gap-1.5 bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-[12px] sm:text-[13px] px-6 sm:px-7 py-1.5 sm:py-2 rounded-full shadow-sm active:scale-95 transition-all cursor-pointer border-none mt-6 sm:mt-7",

    // Top-Tier Hiring Partners / Recruiters Configuration (Matching Image 1 & 2)
    recruitersSectionClassName: "py-10 sm:py-14 bg-[#f8f9fa] text-center select-none",
    recruitersContainerClassName: "max-w-[1240px] mx-auto px-4 sm:px-6",
    recruitersTitleClassName: "text-[22px] sm:text-[26px] lg:text-[29px] font-bold text-[#193579] uppercase tracking-wide text-center m-0 mb-3",
    recruitersSubtitleClassName: "text-[12px] sm:text-[13px] text-[#333333] leading-[1.55] max-w-4xl mx-auto font-normal m-0",
    recruitersCardClassName: "bg-white rounded-[8px] h-[72px] sm:h-[82px] p-2.5 sm:p-3.5 flex items-center justify-center shadow-xs border border-slate-100/90 hover:shadow-md transition-all",
    recruitersDotActiveClass: "w-2.5 h-2.5 rounded-full bg-black scale-110",
    recruitersDotInactiveClass: "w-2.5 h-2.5 rounded-full bg-[#b8b8b8] hover:bg-slate-500",
    recruitersInterval: 2500, // 👈 Time interval in ms for infinite auto-rotation right to left
    recruitersVisibleCount: 5, // 👈 5 partner cards visible on desktop

    // About SODE Configuration (Matching distanceeducationschool.com/mu/ and Image 1)
    sodeAboutBg: "#19347b", // 👈 Deep Navy Blue Background (#19347b)
    sodeAboutSectionClassName: "py-6 sm:py-8 md:py-9 bg-[#19347b] text-white select-none", // 👈 Is line se About SODE section ki HEIGHT (py-5 / py-6 / py-7 / py-8) adjust hoti h
    sodeAboutContainerClassName: "max-w-[1140px] mx-auto px-4 sm:px-6 text-center",
    sodeAboutTitleClassName: "text-[22px] sm:text-[25px] md:text-[27px] font-bold text-white uppercase tracking-wide leading-tight m-0 mb-1",
    sodeAboutSubtitleClassName: "text-[13px] sm:text-[14.5px] md:text-[15px] font-medium text-white/95 uppercase tracking-wide block mt-1",
    sodeAboutTextClassName: "space-y-3 sm:space-y-3.5 my-3.5 sm:my-4 text-[13px] sm:text-[13.5px] md:text-[14px] text-white/95 leading-[1.55] sm:leading-[1.6] max-w-[1060px] mx-auto text-center font-normal",
    sodeAboutParagraphClassName: "m-0",
    sodeAboutButtonsClassName: "flex flex-row items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-5",
    sodeAboutBtn1Class: "px-7 sm:px-8 py-2 sm:py-2.5 rounded-full text-white font-bold text-[13.5px] sm:text-[14px] shadow-sm hover:brightness-105 transition-all cursor-pointer border-none active:scale-95",
    sodeAboutBtn1Bg: "#f97316", // 👈 Orange Pill Button (Get Help)
    sodeAboutBtn2Class: "px-7 sm:px-8 py-2 sm:py-2.5 rounded-full text-white font-bold text-[13.5px] sm:text-[14px] shadow-sm hover:brightness-105 transition-all cursor-pointer border-none active:scale-95",
    sodeAboutBtn2Bg: "#28a745", // 👈 Green Pill Button (Compare University)

    // FAQ Section Configuration (Matching User Reference Image)
    faqLayout: "mu",
    faqTitle: "Frequently Asked Questions",
    faqSectionClassName: "py-10 sm:py-14 lg:py-16 bg-white w-full select-none",
    faqContainerClassName: "max-w-[1140px] mx-auto px-4 sm:px-6",
    faqTitleClassName: "text-[22px] sm:text-[26px] lg:text-[29px] font-bold text-[#193579] tracking-normal text-center m-0 mb-6 sm:mb-8",
    faqItemClassName: "w-full mb-3 sm:mb-3.5 transition-all",

    // 👇 Jab FAQ BAND (Closed) ho: Grey card background (#e0e6ec), dark text (15-16px), rounded-lg (8px)
    faqHeaderClosedClassName: "w-full pl-5 pr-4 sm:pl-6 sm:pr-5 pt-4.5 pb-3.5 sm:pt-5 sm:pb-4 text-left flex items-center justify-between gap-4 cursor-pointer bg-[#e0e6ec] text-[#111827] border-none rounded-lg m-0 hover:bg-[#d5dde5] transition-colors shadow-xs relative overflow-hidden",
    faqQuestionClosedClassName: "text-[15px] sm:text-[16px] font-medium text-[#111827] leading-snug",

    // 👇 Jab FAQ KHULA (Open) ho: Deep Navy Blue background (#193579), white text (15-16px), rounded-t-lg (8px)
    faqHeaderOpenClassName: "w-full pl-5 pr-4 sm:pl-6 sm:pr-5 pt-4.5 pb-3.5 sm:pt-5 sm:pb-4 text-left flex items-center justify-between gap-4 cursor-pointer bg-[#193579] text-white border-none rounded-t-lg rounded-b-lg m-0 transition-colors shadow-xs relative overflow-hidden",
    faqQuestionOpenClassName: "text-[15px] sm:text-[16px] font-medium text-white leading-snug",

    // 👇 Right Toggle Icon: Orange Circle with White +/-
    faqIconBadgeClassName: "w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-[#f97316] text-white flex items-center justify-center font-bold text-[14px] sm:text-[15px] leading-none shrink-0 shadow-xs select-none",

    // 👇 ANSWER KA CSS: Greyish-white box (#f7f7f7), border-none, rounded-b-lg (8px), m-0 (NO GAP)
    faqAnswerClassName: "px-6 sm:px-8 py-5 sm:py-6 bg-[#f7f7f7] border-none rounded-b-lg rounded-t-lg text-[14.5px] sm:text-[15.5px] text-[#222222] leading-[1.65] font-normal m-0",
    faqAnswerBoxShadow: "0 3px 6px 2px #ccc",

    faqPrefix: "» Q{idx}- ",
    faqDefaultOpenIndex: 0, // 👈 0 = Q1 khula rahega (jaise image me h)
  },

  // Courses List for Enquiry Form Dropdown
  courses: [
    { value: "MA", label: "MA - Master of Arts" },
    { value: "MBA", label: "MBA - Master of Business Administration" },
    { value: "MCA", label: "MCA - Master of Computer Application" },
    { value: "MCOM", label: "MCOM - Master of Commerce" },
    { value: "MSC", label: "MSC - Master of Science" },
    { value: "BA", label: "BA - Bachelor of Arts" },
    { value: "BBA", label: "BBA - Bachelor of Business Administration" },
    { value: "BCA", label: "BCA - Bachelor of Computer Application" },
    { value: "BCOM", label: "BCOM - Bachelor of Commerce" },
    { value: "BSC", label: "BSC - Bachelor of Science" },
    { value: "BLIS", label: "BLIS - Bachelor of Library and Information Science" },
    { value: "BJMC", label: "BJMC - Bachelor of Journalism and Mass Communication" },
    { value: "MLIS", label: "MLIS - Master of Library and Information Science" },
    { value: "MBA Plus", label: "MBA Plus - Master of Business Administration Plus" },
  ],

  // Approvals & Recognitions
  approvals: [
    {
      image: "/assets/mu/ugc-mang-66d581c42878a.webp",
      title: "UGC Entitled",
      tag: "UGC Entitled",
      text: "Courses of Mangalayatan University online are UGC-recognised and nationally accepted.",
    },
    {
      image: "/assets/mu/naac-mangalayatan.webp",
      title: "NAAC A+ Graded",
      tag: "NAAC A+ Graded",
      text: "The university is NAAC A+ accredited as well as ensuring the highest academic standards.",
    },
    {
      image: "/assets/mu/AICTE-logo.png",
      title: "AICTE Accredited",
      tag: "AICTE Accredited",
      text: "Mangalayatan University is AICTE-approved for industry relevance.",
    },
    {
      image: "/assets/mu/aiu-logo.webp",
      title: "Member of AIU",
      tag: "Member of AIU",
      text: "The university is a recognised member of the Association of Indian Universities (AIU).",
    },
  ],

  // Programmes / Degrees Offered with Master / Bachelor category tabs
  programmes: [
    // --- Master Degree Courses ---
    {
      id: "mu-mba",
      code: "MBA",
      category: "Master",
      level: "Post Graduation",
      title: "Master of Business Administration",
      duration: "2 Years",
      eligibility: "Bachelor Degree",
      image: "/assets/mu/mba-mu.webp",
      description:
        "Professionals accelerate their leadership growth with Mangalayatan University Online MBA in different specialisations. It offers skills of strategic management and career advancement.",
    },
    {
      id: "mu-mca",
      code: "MCA",
      category: "Master",
      level: "Post Graduation",
      title: "Master of Computer Application",
      duration: "2 Years",
      eligibility: "Bachelor Degree",
      image: "/assets/mu/mca-mu.webp",
      description:
        "Learners advance their careers in the tech sector through Mangalayatan University mca online. It focuses on programming, networks & systems and industry-relevant computing skills.",
    },
    {
      id: "mu-mcom",
      code: "MCOM",
      category: "Master",
      level: "Post Graduation",
      title: "Master of Commerce",
      duration: "2 Years",
      eligibility: "Bachelor Degree",
      image: "/assets/mu/mcom-mu.webp",
      description:
        "Students strengthen their expertise in finance and commerce with Mangalayatan University online course MCOM. It curates advanced business and accounting knowledge.",
    },
    {
      id: "mu-msc",
      code: "MSC",
      category: "Master",
      level: "Post Graduation",
      title: "Master of Science",
      duration: "2 Years",
      eligibility: "Bachelor Degree",
      image: "/assets/mu/msc-mu.webp",
      description:
        "Learners build advanced scientific knowledge with Mangalayatan University MSc. It is ideal for research, analytics, and specialised professional opportunities.",
    },
    {
      id: "mu-ma",
      code: "MA",
      category: "Master",
      level: "Post Graduation",
      title: "Master of Arts",
      duration: "2 Years",
      eligibility: "Bachelor Degree",
      image: "/assets/mu/ma-mu.webp",
      description:
        "Candidates enhance critical thinking and career prospects with Mangalayatan University online MA. It covers diverse disciplines in arts and humanities.",
    },
    {
      id: "mu-mba-plus",
      code: "MBA Plus",
      category: "Master",
      level: "Post Graduation",
      title: "Master of Business Administration Plus",
      duration: "2 Years",
      eligibility: "Bachelor Degree",
      image: "/assets/mu/mba_plus.webp",
      description:
        "MU online MBA Plus program is designed for professionals who all want to build a global perspective, sharpen leadership abilities, and strengthen practical management skills.",
    },

    // --- Bachelor Degree Courses ---
    {
      id: "mu-bba",
      code: "BBA",
      category: "Bachelor",
      level: "Graduation",
      title: "Bachelor of Business Administration",
      duration: "3 Years",
      eligibility: "12th Passed",
      image: "/assets/mu/bba-mu.webp",
      description:
        "Students can build strong business foundations with Mangalayatan University BBA online. This program enhances skills that foundation of several career pathways.",
    },
    {
      id: "mu-bca",
      code: "BCA",
      category: "Bachelor",
      level: "Graduation",
      title: "Bachelor of Computer Application",
      duration: "3 Years",
      eligibility: "12th Passed",
      image: "/assets/mu/bca-mu.webp",
      description:
        "Through Mangalayatan University online course BCA, Professionals gain in-demand IT and programming skills. It is designed for advanced tech careers such as software development.",
    },
    {
      id: "mu-ba",
      code: "BA",
      category: "Bachelor",
      level: "Graduation",
      title: "Bachelor of Arts",
      duration: "3 Years",
      eligibility: "12th Passed",
      image: "/assets/mu/ba-mu.webp",
      description:
        "Learners choose from several electives, such as social sciences and humanities. This flexible Mangalayatan University online BA program. It is ideal for holistic academic growth.",
    },
  ],

  // About Mangalayatan University
  about: {
    title: "About Mangalayatan University Online",
    text1:
      "Mangalayatan University Online is a University with NAAC A+ accreditation. It was started in 2006 in Aligarh, Uttar Pradesh. The university is a UGC approved University, and shows its commitment to high academic standards and quality education. This university has managed to graduate 7, 000+ students over the years, and it has been able to support 3,500+ students presently, including both Indian and foreign learners. Mangalayatan University online courses are based on online and distance learning. They have a purpose of providing affordable and flexible education to the needs of modern learners. Online Mangalayatan University will allow individuals to complete a recognised degree without having to sacrifice their jobs and commitments.",
    text2:
      "The admission process is convenient and student-friendly at Mangalayatan University. Therefore, the experience of enrolling in this university becomes simple. Mangalayatan University open the doorways to career-oriented education supported by academic excellence and online ease. Individuals can get on their way to achieving career aspirations with Mangalayatan University, where quality meets flexibility.",
    buttonText: "Apply Now",
    backgroundImage: "/assets/mu/about-bg.webp",
  },

  // Why Choose / Advantages
  whyChoose: [
    {
      line1: "Recognised and",
      line2: "Accredited Degree",
      title: "Recognised and Accredited Degree",
      desc: "Courses of Mangalayatan University online are UGC-recognised and nationally accepted.",
      image: "/assets/mu/recorded-live-lectures-mu.webp",
    },
    {
      line1: "Flexible Learning",
      line2: "Schedule",
      title: "Flexible Learning Schedule",
      desc: "Start your career journey with flexible learning options at Mangalayatan University's online courses.",
      image: "/assets/mu/various-specialisation-mu.webp",
    },
    {
      line1: "Affordable Online",
      line2: "Programs",
      title: "Affordable Online Programs",
      desc: "The online courses at Mangalayatan University are budget-friendly and come with easy installment options.",
      image: "/assets/mu/placement-assistance-mu.webp",
    },
    {
      line1: "Future Leadership",
      line2: "Pathways",
      title: "Future Leadership Pathways",
      desc: "Empowering learners to build leadership qualities and industry skills for future career acceleration.",
      image: "/assets/mu/24x7-instant-mu.webp",
    },
    {
      line1: "Profession-Oriented",
      line2: "Programs",
      title: "Profession-Oriented Programs",
      desc: "In-demand specialisations aligned with corporate standards to provide practical industry exposure.",
      image: "/assets/mu/digital-library-mu.webp",
    },
    {
      line1: "Global Career",
      line2: "Reach",
      title: "Global Career Reach",
      desc: "Recognised curriculum opening international job opportunities and corporate connections worldwide.",
      image: "/assets/mu/24x7-instant-mu.webp",
    },
  ],

  // Placement / Top-Tier Hiring Partners
  recruiters: {
    title: "MANGALAYATAN UNIVERSITY TOP-TIER HIRING PARTNERS",
    subtitle:
      "The Mangalayatan University online collaborates with several renowned and reputable companies across various fields. These partnerships open pathways to outstanding career opportunities. Altogether, empowering students and offering them a golden chance to secure a position in such highest ranked organisations and companies like Amazon, Infosys, Capgemini and numerous others.",
    logos: [
      "/assets/mu/p6-mu.webp", // Videocon
      "/assets/mu/p9-mu.webp", // Abbott
      "/assets/mu/p1-mu.webp", // Dainik Jagran
      "/assets/mu/p2-mu.webp", // BYJU'S
      "/assets/mu/p3-mu.webp", // Idea
      "/assets/mu/p4-mu.webp", // ICICI Bank
    ],
  },

  // About SODE Section
  sodeAbout: {
    title: "ABOUT SODE",
    subtitle: "(SCHOOL OF ONLINE AND DISTANCE EDUCATION)",
    paragraphs: [
      "SODE is India's top educational platform, transforming the way learners engage with higher education. We make higher education easier without compromising on the quality. We help students and working professionals find the right online and distance degree programs. We simplify every step with expert guidance and personalised support.",
      "Over the years, we've become an Edtech platform trusted by thousands of learners. We focus on supporting working professionals who want to continue their education without stepping away from their personal or professional responsibilities. We understand their challenges, so we offer powerful tools to make their journey smoother, which include University Comparison, Eligibility Checks, Smart University Recommendations, and Free Video Counselling Sessions.",
    ],
    primaryButtonText: "Get Help",
    secondaryButtonText: "Compare University",
  },

  // How to Apply / Admission Process
  admissionProcess: {
    title: "How to Apply for Mangalayatan University Online Courses",
    subtitle:
      "The admission process for Mangalayatan University course admissions is very simple and user-friendly. Here’s a step-by-step guide to enrolling in a degree course at the university :",
  },

  admissionSteps: [
    {
      num: 1,
      title: "Submit Form",
      desc: "Fill in and submit your application form online",
      themeColor: "#ff7a00",
      cardBg: "bg-[#fff8f0]",
    },
    {
      num: 2,
      title: "Expert's Counseling",
      desc: "You will receive a call from our expert counselor",
      themeColor: "#0066cc",
      cardBg: "bg-[#f0f7ff]",
    },
    {
      num: 3,
      title: "Choose University",
      desc: "Select the course & university according to your interest",
      themeColor: "#ff2a6d",
      cardBg: "bg-[#fff0f5]",
    },
    {
      num: 4,
      title: "Online Payment",
      desc: "You need to make a smooth online fee submission",
      themeColor: "#16a34a",
      cardBg: "bg-[#f0faf3]",
    },
    {
      num: 5,
      title: "Document Submit",
      desc: "You need to upload all the required verified documents.",
      themeColor: "#8b5cf6",
      cardBg: "bg-[#f7f2ff]",
    },
    {
      num: 6,
      title: "Admission Confirm",
      desc: "Get Confirmation on your Email & Whatsapp",
      themeColor: "#ff7a00",
      cardBg: "bg-[#fff8f0]",
    },
  ],

  // Frequently Asked Questions
  faqs: [
    {
      q: "Q1. Is the Online learning of Mangalayatan University UGC-approved?",
      a: "Yes, Online learning of Mangalayatan University has University Grants Commission (UGC) approval, and is recognised under the guidelines of UGC-DEB (Distance Education Bureau).",
    },
    {
      q: "Q2. Is there any entrance exam for Mangalayatan University mca online program?",
      a: "No, Mangalayatan University online course admissions has no entrance exam required. Students can apply directly.",
    },
    {
      q: "Q3. How can one enrol in the Mangalayatan University online course?",
      a: "Learners are able to apply conveniently by filling out the application form, choosing the course, submitting the course fees, and attaching the important verification documents.",
    },
    {
      q: "Q4. Can foreign students apply in Mangalayatan University Online MBA or any other course?",
      a: "Yes, Foreign scholars can enrol in Mangalayatan University online MBA or any other program.",
    },
    {
      q: "Q5. Can one pay Mangalayatan University BBA Fees in instalments for online Courses?",
      a: "Yes. Students of the University can opt for flexible instalment payment options for its online education programs.",
    },
    {
      q: "Q6. How can students get more information about Mangalayatan University Online?",
      a: "Students can check the official website portal of MU or contact DistanceEducationSchool.com / SODE counselling experts at +91 7065 7777 55.",
    },
  ],

  // Scholarship Coupon Code Modal (Matching uploaded user design)
  scholarshipModal: {
    modalBg: "#ffffff",
    titleText: "Get Scholarship Coupon Code",
    titleColor: "#193579",
    subtitleText: "Academic Experts will assist you!",
    subtitleColor: "#475569",
    inputBg: "#ffffff",
    inputTextColor: "#111827",
    inputPlaceholderColor: "#9ca3af",
    closeBtnColor: "#16a34a",
    submitBtnBg: "#22c55e",
    submitBtnText: "Submit",
    disclaimerColor: "#475569",
    disclaimerLinkColor: "#2563eb",
  },
};
