// VGU Landing Data
export const vguCustomCss = `
  /* =======================================================
     PAGE-SPECIFIC CSS FOR VGU ONLINE
  ======================================================= */
  html,
  body {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    overflow-x: clip !important;
  }

  .landing-page--vgu,
  .landing-page-root {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: clip !important;
  }

  .landing-page--vgu header,
  .landing-page--vgu main,
  .landing-page--vgu section,
  .landing-page--vgu #hero,
  .landing-page--vgu footer {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .landing-page--vgu header,
  .landing-page--vgu .landing-navbar-header {
    position: sticky !important;
    top: 0 !important;
    z-index: 50 !important;
    background-color: #ffffff !important;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05) !important;
  }

  /* Compact sleek Navbar Height */
  .landing-page--vgu header .landing-navbar-container {
    height: 66px !important;
    min-height: 66px !important;
  }
  @media (min-width: 640px) {
    .landing-page--vgu header .landing-navbar-container {
      height: 70px !important;
      min-height: 70px !important;
    }
  }
  @media (min-width: 1024px) {
    .landing-page--vgu header .landing-navbar-container {
      height: 72px !important;
      min-height: 72px !important;
    }
  }

  /* Completely remove any SODE logo or branding from header */
  .landing-page--vgu header a[aria-label="Distance Education School"],
  .landing-page--vgu header a[aria-label="SODE"],
  .landing-page--vgu .des_logo {
    display: none !important;
  }

  /* Coupon Button on Navbar */
  .landing-page--vgu .coupon-btn-main {
    background: #28a745 !important;
    background-color: #28a745 !important;
    border-radius: 8px !important;
    box-shadow: 0 4px 14px rgba(40, 167, 69, 0.35) !important;
  }

  /* Hero Section */
  .landing-page--vgu #hero {
    background-color: #811811;
  }

  /* Hero Title: Strictly 2 lines on Desktop, 3 lines on Mobile */
  @media (min-width: 641px) {
    .landing-page--vgu #hero h1 {
      display: flex !important;
      flex-direction: column !important;
      line-height: 1.18 !important;
      margin-top: 0 !important;
      margin-bottom: 0.35rem !important;
    }
    .landing-page--vgu #hero h1 .vgu-hero-title-line1,
    .landing-page--vgu #hero h1 .vgu-hero-title-line2 {
      display: block !important;
      white-space: nowrap !important;
      width: fit-content !important;
    }
    .landing-page--vgu #hero h1 .vgu-title-part1,
    .landing-page--vgu #hero h1 .vgu-title-part2 {
      display: inline !important;
      white-space: nowrap !important;
    }
    .landing-page--vgu #hero h1 .vgu-hero-title-line1,
    .landing-page--vgu #hero h1 .vgu-hero-title-line2 {
      font-size: clamp(26px, 2.5vw, 34px) !important;
    }
  }

  @media (max-width: 640px) {
    .landing-page--vgu #hero h1 {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      text-align: left !important;
      gap: 1px !important;
      margin-top: 0 !important;
      margin-bottom: 12px !important;
    }
    .landing-page--vgu #hero h1 .vgu-hero-title-line1 {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      white-space: normal !important;
      width: 100% !important;
      gap: 1px !important;
    }
    .landing-page--vgu #hero h1 .vgu-title-part1,
    .landing-page--vgu #hero h1 .vgu-title-part2,
    .landing-page--vgu #hero h1 .vgu-hero-title-line2 {
      display: block !important;
      white-space: nowrap !important;
      font-size: clamp(23px, 6.8vw, 28px) !important;
      line-height: 1.2 !important;
      font-weight: 800 !important;
      color: #ffffff !important;
      letter-spacing: -0.01em !important;
    }

    .landing-page--vgu #hero div[class*="tagline"],
    .landing-page--vgu #hero p[class*="tagline"] {
      font-size: 13.5px !important;
      line-height: 1.48 !important;
      color: #ffffff !important;
      opacity: 0.95 !important;
      margin-top: 10px !important;
      margin-bottom: 16px !important;
      max-width: 100% !important;
      text-align: left !important;
    }

    .landing-page--vgu #hero [class*="courseStrip"] {
      font-size: clamp(18px, 5.2vw, 21px) !important;
      font-weight: 800 !important;
      line-height: 1.32 !important;
      color: #ffffff !important;
      margin-top: 14px !important;
      margin-bottom: 18px !important;
      letter-spacing: 0.02em !important;
      text-align: left !important;
    }
    .landing-page--vgu #hero [class*="courseStrip"] div {
      font-weight: 800 !important;
      color: #ffffff !important;
    }
  }

  /* Completely remove coupon buttons from hero in mobile view */
  @media (max-width: 1024px) {
    .landing-page--vgu #hero .coupon-btn-main,
    .landing-page--vgu #hero button.coupon-btn-main,
    .landing-page--vgu #hero .hero-form-col .coupon-btn-main {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
    }
  }

  @media (min-width: 1000px) {
    .landing-page--vgu #hero {
      background-position: center top !important;
      background-size: cover !important;
    }
  }

  /* Download brochure button: Desktop */
  @media (min-width: 769px) {
    .landing-page--vgu .hero-brochure-btn {
      background-color: #0da651 !important;
      border-radius: 9999px !important;
      border: none !important;
      color: #ffffff !important;
      box-shadow: 0 4px 14px rgba(13, 166, 81, 0.4) !important;
      transition: all 0.2s ease-in-out;
    }
    .landing-page--vgu .hero-brochure-btn:hover {
      background-color: #0b8f45 !important;
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(13, 166, 81, 0.45) !important;
    }
  }

  /* Download brochure button: Mobile */
  @media (max-width: 768px) {
    .landing-page--vgu .hero-brochure-btn,
    .landing-page--vgu #hero .hero-brochure-btn {
      background: transparent !important;
      background-color: transparent !important;
      border: 2px solid #ffffff !important;
      color: #ffffff !important;
      border-radius: 9999px !important;
      padding: 8px 24px !important;
      font-size: 14.5px !important;
      font-weight: 700 !important;
      box-shadow: none !important;
      display: inline-flex !important;
      align-items: center !important;
      gap: 8px !important;
      align-self: flex-start !important;
      margin-top: 6px !important;
      margin-bottom: 18px !important;
    }
    .landing-page--vgu .hero-brochure-btn svg,
    .landing-page--vgu #hero .hero-brochure-btn svg {
      fill: #ffffff !important;
      color: #ffffff !important;
      width: 15px !important;
      height: 15px !important;
    }

    .landing-page--vgu #hero .hero-mobile-image-wrapper {
      border-radius: 18px !important;
      overflow: hidden !important;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
      border: 1px solid rgba(255, 255, 255, 0.22) !important;
      margin-top: 14px !important;
      margin-bottom: 20px !important;
      width: 100% !important;
      max-width: 440px !important;
    }
    .landing-page--vgu #hero .hero-mobile-image-wrapper img {
      border-radius: 18px !important;
      width: 100% !important;
      height: auto !important;
      display: block !important;
    }
  }

  /* Right Form Card */
  .landing-page--vgu .landing-lead-card {
    background: #ffffff !important;
    border-radius: 16px !important;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.16) !important;
    border: none !important;
  }

  /* Form Inputs and Selects inside card */
  .landing-page--vgu .landing-lead-card input,
  .landing-page--vgu .landing-lead-card .ant-input,
  .landing-page--vgu .landing-lead-card .ant-select-selector {
    background-color: #f0f3f5 !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 6px !important;
    font-size: 13px !important;
    color: #1e293b !important;
  }

  .landing-page--vgu .landing-lead-card input::placeholder,
  .landing-page--vgu .landing-lead-card .ant-input::placeholder,
  .landing-page--vgu .landing-lead-card .ant-select-selection-placeholder {
    color: #94a3b8 !important;
    font-size: 13px !important;
  }

  .landing-page--vgu .landing-lead-card .ant-select-selector {
    display: flex !important;
    align-items: center !important;
    height: 38px !important;
  }

  .landing-page--vgu .landing-lead-card .ant-select-selection-item {
    line-height: 38px !important;
  }

  /* Form Phone Badge */
  .landing-page--vgu .landing-lead-card a[href^="tel"] {
    background-color: #7a161d !important;
    color: #ffffff !important;
    border-radius: 9999px !important;
    font-weight: 700 !important;
    padding: 6px 16px !important;
    box-shadow: 0 2px 8px rgba(122, 22, 29, 0.3) !important;
  }

  /* Submit Button */
  .landing-page--vgu .landing-lead-card button[type="submit"] {
    background: #7a161d !important;
    background-color: #7a161d !important;
    color: #ffffff !important;
    border-radius: 8px !important;
    border: none !important;
    height: 40px !important;
    font-weight: 700 !important;
    font-size: 15px !important;
    box-shadow: 0 4px 12px rgba(122, 22, 29, 0.3) !important;
    transition: all 0.2s ease-in-out;
  }
  .landing-page--vgu .landing-lead-card button[type="submit"]:hover {
    background-color: #8c1a22 !important;
    box-shadow: 0 6px 16px rgba(122, 22, 29, 0.4) !important;
  }

  /* Section-by-Section Match with distanceeducationschool.com/vgu */

  /* Approvals Section */
  .landing-page--vgu #approval,
  .landing-page--vgu #approvals {
    background-color: #ffffff !important;
  }
  .landing-page--vgu #approval .grid > div,
  .landing-page--vgu #approvals .grid > div {
    border-radius: 9999px !important;
  }
  @media (max-width: 639px) {
    .landing-page--vgu #approval .grid > div,
    .landing-page--vgu #approvals .grid > div {
      margin-left: 12px !important;
      margin-right: 12px !important;
    }
  }
  .landing-page--vgu #approval h3,
  .landing-page--vgu #approvals h3,
  .landing-page--vgu #approval h2,
  .landing-page--vgu #approvals h2 {
    color: #811811 !important;
  }

  /* Program Courses Section */
  .landing-page--vgu #program {
    background-color: #f7f7f7 !important;
  }
  .landing-page--vgu #program h2 {
    color: #35529a !important;
  }

  /* About Section */
  .landing-page--vgu #about {
    background-image: url("/assets/all_universities_images/vgu/about-bg-vgu.webp") !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: center !important;
  }

  /* Advantage / Resources Section */
  .landing-page--vgu #advantage h2,
  .landing-page--vgu #Resources h2 {
    background-color: #811811 !important;
    color: #ffffff !important;
  }

  /* Degree Section */
  .landing-page--vgu #degree {
    background-color: #F3F3F8 !important;
  }
  .landing-page--vgu #degree h2 {
    color: #811811 !important;
  }

  /* Recruiters / Partners Section */
  .landing-page--vgu #partners {
    background-color: #ffffff !important;
  }
  .landing-page--vgu #partners h2 {
    background-color: #811811 !important;
    color: #ffffff !important;
  }

  /* Apply Section */
  .landing-page--vgu .apply-section {
    background-color: #ffffff !important;
  }
  .landing-page--vgu .apply-section h2 {
    color: #193579 !important;
  }

  /* FAQ Section */
  .landing-page--vgu #faq,
  .landing-page--vgu #faqs {
    background-color: #F3F3F8 !important;
  }
  .landing-page--vgu #faq h2,
  .landing-page--vgu #faqs h2 {
    color: #811811 !important;
  }

  /* Compare Universities Section */
  .landing-page--vgu .compare_box {
    background-color: #851b1f !important;
    border-radius: 20px !important;
  }

  /* Mobile Floating Actions & Sticky Bar Precision Matching */
  @media (max-width: 768px) {
    .landing-page--vgu .floating-call-btn {
      width: 58px !important;
      height: 58px !important;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35), 0 0 25px rgba(46, 204, 113, 0.6) !important;
      border-radius: 50px !important;
    }

    .landing-page--vgu .floating-gift-btn {
      width: 54px !important;
      height: 54px !important;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25) !important;
      border-radius: 50px !important;
    }

    .landing-page--vgu .footer_sticky_buttons {
      background: #d11c1f !important;
      padding: 8px 12px !important;
    }

    .landing-page--vgu .footer_sticky_buttons .wp_btn {
      background: #25d366 !important;
      color: #ffffff !important;
      border-radius: 100px !important;
      font-size: 14.5px !important;
      font-weight: 700 !important;
    }

    .landing-page--vgu .footer_sticky_buttons .apply_btn {
      background: #ffffff !important;
      color: #ee3024 !important;
      border-radius: 100px !important;
      font-size: 14.5px !important;
      font-weight: 700 !important;
    }
  }
`;

export const vguData = {
  slug: "vgu",
  customCss: vguCustomCss,
  meta: {
    title: "Vivekananda Global University Online | VGU Online Courses",
    description:
      "Vivekananda Global University Online programmes. UGC-recognised VGU Online courses. VGU Online NAAC A+ accredited UG & PG degrees.",
    keywords: [
      "Vivekananda Global University Online",
      "VGU Online",
      "VGU Online MBA",
      "VGU Online MCA",
      "VGU Distance Education",
      "VGU Online Courses",
      "Vivekananda Global University Admission 2026",
    ],
  },
  brand: {
    slug: "vgu",
    pageStyle: { margin: 0, padding: 0 },
    pageClassName: "!m-0 !p-0 w-full",
    name: "Vivekananda Global University Online",
    shortName: "VGU Online",
    hashtag: "",
    headline: "Vivekananda Global University\nOnline Degree Programs",
    tagline1:
      "Empowering professionals with career-focused education, modern curriculum, and industry-aligned learning at Vivekananda Global University.",
    tagline2: "",
    phone: "+91 7065 7777 55",
    phoneDisplay: "+91 7065 7777 55",
    enquireTitle: "Enquire Now",
    enquireSubtitle: "Academic Experts will assist you!",
    officialUrl: "https://distanceeducationschool.com/vgu/",
    navbarHeightClass: "h-[66px] sm:h-[70px] lg:h-[72px]",
    headerClassName: "!sticky !top-0 !z-50 bg-white shadow-[0px_2px_10px_rgba(0,0,0,0.06)]",
    headerStyle: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      backgroundColor: "#ffffff",
    },
    logo: "/assets/all_universities_images/vgu/vgu-logo.webp",
    logoWrapperClassName: "w-[260px] sm:w-[285px] md:w-[305px] lg:w-[320px] h-[52px] sm:h-[56px] lg:h-[58px]",
    logoClassName: "object-contain object-left",
    navLinks: [
      { label: "Courses", href: "#program" },
      { label: "Approvals", href: "#approval" },
      { label: "About", href: "#about" },
      { label: "Advantage", href: "#advantage" },
      { label: "FAQs", href: "#faqs" },
    ],
    hideDesktopNavLinks: true,
    mobileMenuIconColor: "#08417b",
    sodeIcon: null,
    sodeLogo: null,
    callGif: "/assets/all_universities_images/vgu/call_icon.gif",
    giftGif: "/assets/all_universities_images/vgu/gift.gif",
    arrowGif: "/assets/all_universities_images/vgu/arrow.gif",
    showFloatingCallOnMobile: true,
    stickyBarBg: "#811811",
    stickyApplyStyle: "white-red",
    stickyApplyBg: "#ffffff",
    stickyApplyTextColor: "#e53935",
    stickyBrochureAction: "whatsapp",
    stickyBrochureIcon: "whatsapp",
    stickyBrochureBg: "#25d366",
    stickyBrochureTextColor: "#ffffff",
    showSodeLogo: false,
    hideSodeLogo: true,
    showCouponButton: true,
    showMobileCouponButton: false,
    hideMobileCouponButton: true,
    showFooterForm: false,
    couponButtonText: "Scholarship Coupon Code",
    couponButtonColor: "#28a745",
    couponBtnBg: "#28a745",
    footerLogoContainerClassName:
      "w-[340px] sm:w-[520px] md:w-[680px] lg:w-[780px] xl:w-[880px] h-[90px] sm:h-[138px] md:h-[180px] lg:h-[206px] xl:h-[233px] max-w-[92vw] sm:max-w-full",
    footerDisclaimerContainerClassName: "max-w-[1090px] lg:max-w-none",
    footerBottomBg: "#0b3c66",
    campusImage: "/assets/all_universities_images/vgu/university.webp",
    buildingAboutImage: "/assets/all_universities_images/vgu/about-image-vgu.webp",
    whyChooseStudentImage: "/assets/all_universities_images/vgu/university.webp",
    primaryColor: "#811811",
    themeBg: "bg-[#811811]",
    themeBorder: "border-[#811811]",
    accentColor: "#f78d2d",
    compareBannerColor: "#811811",
    compareUniversityName: "Vivekananda Global University",
    goldColor: "#ffc107",
    badgeText: "Admissions Open 2026",
    hero: {
      backgroundImage: "/assets/all_universities_images/vgu/vgu-desktop.webp",
      backgroundPosition: "center top",
      backgroundSize: "cover",
      mobileBackgroundImage: "",
      mobileStudentImage: "/assets/all_universities_images/vgu/university.webp",
      mobileStudentImageWrapperClassName: "block lg:hidden w-full max-w-[440px] mx-auto rounded-[18px] overflow-hidden my-3.5 shadow-md border border-white/20",
      mobileStudentImageClassName: "w-full h-auto object-cover block rounded-[18px]",
      showMobileCouponButton: false,
      hideMobileCouponButton: true,
      noOverlay: true,
      backgroundColor: "#811811",
      titleColor: "#ffffff",
      taglineColor: "#ffffff",
      coursesColor: "#ffffff",
      hashtagColor: "#ffffff",
      hideCourseBox: true,
      alignLeftMobile: true,
      mobileAlign: "left",
      minHeight: "480px",
      containerClassName: "max-w-[1360px] min-[1600px]:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8",
      contentClassName: "w-full min-[1000px]:max-w-[500px] xl:max-w-[540px] text-left items-start z-10",
      titleHtml: '<span class="vgu-hero-title-line1"><span class="vgu-title-part1">Vivekananda Global</span> <span class="vgu-title-part2">University</span></span><span class="vgu-hero-title-line2">Online Degree Programs</span>',
      headingClassName: "font-extrabold text-white leading-[1.18] tracking-tight text-left m-0",
      taglineClassName: "mt-3.5 mb-3 text-[13.5px] sm:text-[14px] lg:text-[14.5px] font-normal leading-[1.5] text-white/95 max-w-[440px] text-left",
      coursesStrip: [
        "MBA | MSC | MA | MCA | MA-",
        "JMC | BBA | BCA | BA",
      ],
      courseStripClassName: "my-3.5 space-y-1 text-[17px] sm:text-[19px] lg:text-[21px] font-extrabold text-white tracking-wide leading-tight text-left",
      courseStripItemClassName: "tracking-wide font-extrabold",
      showBrochureButton: true,
      brochureButtonText: "Download Brochure",
      buttonTextColor: "#ffffff",
      buttonRadius: "9999px",
      buttonClassName: "!rounded-full max-md:!bg-transparent max-md:!border-2 max-md:!border-white md:!bg-[#0da651] md:hover:!bg-[#0c9548] md:!border-none text-white font-semibold text-[14px] sm:text-[15px] py-2 px-6 sm:px-7 inline-flex items-center gap-2 shadow-md transition-all self-start mt-2 mb-2 !h-auto",
      formContainerClassName: "w-full sm:w-[350px] min-[1000px]:w-[340px] xl:w-[350px] shrink-0 flex flex-col items-center min-[1000px]:items-end justify-center z-20",
      formCardType: "white",
      formBackground: "#ffffff",
      formTitleColor: "#7a161d",
      formPhoneBg: "#7a161d",
      phoneBadgeBackground: "#7a161d",
      phoneBadgeBg: "#7a161d",
      formPhoneColor: "#ffffff",
      phonePlaceholder: "Enter 10-digit Mobile Number",
      submitButtonBackground: "#7a161d",
      submitButtonTextColor: "#ffffff",
      hideTermsCheckbox: true,
      headingFont: "'Plus Jakarta Sans', sans-serif",
      formCourseList: [
        { value: "MBA", label: "MBA" },
        { value: "MSC", label: "MSC" },
        { value: "MA", label: "MA" },
        { value: "MCA", label: "MCA" },
        { value: "MA-JMC", label: "MA-JMC" },
        { value: "BBA", label: "BBA" },
        { value: "BCA", label: "BCA" },
        { value: "BA", label: "BA" },
      ],
      form: {
        variant: "white",
        title: "Enquire Now",
        subtitle: "Academic Experts will assist you!",
        phoneText: "+91 7065 7777 55",
        showPhoneBadge: true,
        namePlaceholder: "Enter Your Name",
        emailPlaceholder: "Enter Your Email",
        phonePlaceholder: "Enter 10-digit Mobile Number",
        coursePlaceholder: "Select Your Course",
        statePlaceholder: "Select Your State",
        submitText: "Submit",
        hideTermsCheckbox: true,
        phoneBeforeEmail: false,
        courseList: [
          { value: "MBA", label: "MBA" },
          { value: "MSC", label: "MSC" },
          { value: "MA", label: "MA" },
          { value: "MCA", label: "MCA" },
          { value: "MA-JMC", label: "MA-JMC" },
          { value: "BBA", label: "BBA" },
          { value: "BCA", label: "BCA" },
          { value: "BA", label: "BA" },
        ],
        colors: {
          background: "#ffffff",
          title: "#7a161d",
          subtitle: "#334155",
          phoneBackground: "#7a161d",
          phoneText: "#ffffff",
          phoneIcon: "#ffffff",
          inputBackground: "#f0f3f5",
          inputBorder: "1px solid #e2e8f0",
          inputText: "#1e293b",
          inputPlaceholder: "#94a3b8",
          selectBackground: "#f0f3f5",
          selectBorder: "1px solid #e2e8f0",
          selectText: "#1e293b",
          selectPlaceholder: "#94a3b8",
          countryCodeBackground: "#f0f3f5",
          countryCodeBorder: "#cbd5e1",
          countryCodeText: "#1e293b",
          submitBackground: "#7a161d",
          submitText: "#ffffff",
        },
        layout: {
          padding: "18px 20px 20px",
          borderRadius: "16px",
          maxWidth: "350px",
          fieldHeight: "38px",
          fieldRadius: "6px",
          fieldGap: "9px",
          submitButtonRadius: "8px",
          boxShadow: "0 10px 35px rgba(0, 0, 0, 0.15)",
        },
      },
    },
    coursesStrip: [
      "MBA | MSC | MA | MCA | MA-",
      "JMC | BBA | BCA | BA",
    ],
    approvalsTitle:
      "Vivekananda Global\nUniversity Online\nAccreditation & Approval",
    approvalsDescription:
      "Vivekananda Global University Online\nCourses are UGC-recognised and have\ntop accreditations and approvals from\nthe country's recognised statutory\nbodies.",
    approvalsLayout: "vgu-badges",
    approvalsConfig: {
      containerClassName: "max-w-[1340px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32",
      cardRadius: "rounded-full",
      cardClassName: "mx-3 sm:mx-0",
      titleClassName: "text-[21px] sm:text-[28px] lg:text-[35px] font-bold text-[#811811] leading-[1.2] tracking-tight m-0",
      buttonBg: "#ffd508",
      buttonTextColor: "#000000",
      buttonText: "Enquire Now",
    },
    programmesTitle:
      "VGU Online |\nVivekananda Global\nUniversity\nOnline Courses",
    programmesLayout: "vgu-cards",
    cardSize: "medium",
    programmesConfig: {
      containerClassName: "max-w-[1280px] mx-auto px-8 sm:px-10 lg:px-8",
      headingClassName:
        "text-center text-[24px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-bold text-[#35529a] tracking-tight mb-6 sm:mb-8 leading-[1.25] whitespace-normal sm:whitespace-nowrap",
      gridClassName: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7",
      cardClassName: "bg-white rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between group max-w-[340px] sm:max-w-none mx-auto w-full border border-slate-100/80",
      imageHeight: "h-[185px] sm:h-[190px]",
      titleClassName: "text-[26px] sm:text-[28px] font-extrabold text-black m-0 tracking-tight leading-none mb-2",
      subtitleClassName: "text-[13px] sm:text-[13.5px] font-bold text-[#1f2937] mt-0 mb-3 leading-snug line-clamp-1",
      descClassName: "max-w-[270px] mx-auto text-[11.5px] sm:text-[12px] text-[#475569] leading-[1.65] font-normal m-0 line-clamp-5",
    },
    whyChooseTitle:
      "Why Vivekananda Global University\nOnline is a Smart Choice\nfor learners?",
    whyChooseDescription:
      "Vivekananda Global University Online is the most trusted university by students because of its recognised approvals and job-ready curriculum. VGU University courses are offered online with expert faculty, helpful resources like LMS that help students get strong knowledge and necessary skills, and a smooth Vivekananda Global University course admissions process.",
    whyChooseLayout: "vgu-grid",
    whyChooseConfig: {
      badgeClassName:
        "text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-[8px] sm:rounded-[10px] text-center shadow-xs max-w-[490px] sm:max-w-none sm:inline-block mx-2 sm:mx-auto",
      headerTitleClassName:
        "text-[15.5px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-semibold text-white tracking-wide leading-[1.3] m-0",
      titleClassName:
        "text-[17px] sm:text-[18px] font-medium text-slate-900 m-0 tracking-tight leading-snug mb-1.5",
      descClassName:
        "text-[12.5px] sm:text-[13px] text-slate-600 leading-relaxed font-normal m-0 max-w-[310px]",
    },
    aboutLayout: "vgu-banner",
    aboutConfig: {
      backgroundColor: "#2e6396",
      backgroundImage: "/assets/all_universities_images/vgu/about-bg-vgu.webp",
      buttonBg: "#fec810",
      buttonTextColor: "#000000",
      containerClassName: "max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-12",
    },
    faqLayout: "vgu",
    faqTitle: "Frequently Asked\nQuestions",
    faqConfig: {
      titleColor: "#811811",
      itemBg: "#f8f9fa",
      iconBg: "#103863",
      iconColor: "#ffffff",
      activeQuestionColor: "#811811",
      questionPrefix: "» ",
      containerClassName: "max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-8",
      titleClassName:
        "text-[24px] sm:text-[28px] md:text-[32px] font-bold text-center m-0 mb-6 sm:mb-8 md:mb-10 tracking-tight leading-[1.25] whitespace-normal sm:whitespace-nowrap",
      cardClassName:
        "rounded-[8px] sm:rounded-[10px] overflow-hidden bg-white shadow-xs border border-slate-200/70 transition-all",
    },
    admissionHeadingColor: "#203061",
    admissionGridClass:
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-4 lg:gap-3 xl:gap-4 w-full max-w-[420px] sm:max-w-none mx-auto",
  },
  courses: [
    { value: "MBA", label: "MBA - Master of Business Administration" },
    { value: "MCA", label: "MCA - Master of Computer Application" },
    { value: "MSC", label: "MSC - Master of Science" },
    { value: "MA", label: "MA - Master of Arts" },
    { value: "MA-JMC", label: "MA-JMC - Master of Arts in Journalism and Mass Communication" },
    { value: "BBA", label: "BBA - Bachelor of Business Administration" },
    { value: "BCA", label: "BCA - Bachelor of Computer Applications" },
    { value: "BA", label: "BA - Bachelor of Arts" },
  ],
  approvals: [
    {
      image: "/assets/all_universities_images/vgu/ugc-1.webp",
      text: "Recognised by the\nUniversity Grants Commission\nof India (UGC)",
      lines: [
        "Recognised by the",
        "University Grants Commission",
        "of India (UGC)",
      ],
      tag: "UGC",
    },
    {
      image: "/assets/all_universities_images/vgu/naac-a-1.webp",
      text: "Accredited by the\nNational Assessment and\nAccreditation Council (NAAC)",
      lines: [
        "Accredited by the",
        "National Assessment and",
        "Accreditation Council (NAAC)",
      ],
      tag: "NAAC A+",
    },
    {
      image: "/assets/all_universities_images/vgu/aicte-1.webp",
      text: "Approved by the\nAll India Council for\nTechnical Education (AICTE)",
      lines: [
        "Approved by the",
        "All India Council for",
        "Technical Education (AICTE)",
      ],
      tag: "AICTE",
    },
    {
      image: "/assets/all_universities_images/vgu/qs.webp",
      text: "Globally ranked\nby QS World\nUniversity Rankings",
      lines: [
        "Globally ranked",
        "by QS World",
        "University Rankings",
      ],
      tag: "QS Ranked",
    },
  ],
  stats: [],
  programmes: [
    {
      id: "vgu-mba",
      code: "MBA",
      title: "Master of Business Administration",
      level: "Post Graduation",
      duration: "24 Months",
      image: "/assets/all_universities_images/vgu/mba-vgu.webp",
      description:
        "A flexible Vivekananda Global University Online MBA course helps students build strong business skills. It helps learners for leadership roles with real-world knowledge.",
    },
    {
      id: "vgu-mca",
      code: "MCA",
      title: "Master of Computer Applications",
      level: "Post Graduation",
      duration: "24 Months",
      image: "/assets/all_universities_images/vgu/mca-vgu.webp",
      description:
        "Online VGU offers its MCA program, which enhances the student learning experience with practical IT skills and boosts career growth through industry-focused courses.",
    },
    {
      id: "vgu-msc",
      code: "MSC",
      title: "Master of Science",
      level: "Post Graduation",
      duration: "24 Months",
      image: "/assets/all_universities_images/vgu/msc-vgu.webp",
      description:
        "A research-focused online MSc program offered by Online VGU that helps students enhance analytical skills through their well-written online VGU university courses.",
    },
    {
      id: "vgu-ma",
      code: "MA",
      title: "Master of Arts",
      level: "Post Graduation",
      duration: "24 Months",
      image: "/assets/all_universities_images/vgu/ma-vgu.webp",
      description:
        "The university offers online MA courses with multiple specialisations, such as English and Economics. Overall, help students deepen their knowledge in academic research.",
    },
    {
      id: "vgu-mjmc",
      code: "MA-JMC",
      title: "Master of Journalism and Mass Communication",
      level: "Post Graduation",
      duration: "24 Months",
      image: "/assets/all_universities_images/vgu/mjmc.webp",
      description:
        "Online VGU offers the MA-JMC program that is designed for learners who are interested in News Reporting, Public Relations, Advertising, News Editing, and Broadcast Media.",
    },
    {
      id: "vgu-bba",
      code: "BBA",
      title: "Bachelor of Business Administration",
      level: "Graduation",
      duration: "36 Months",
      image: "/assets/all_universities_images/vgu/bba-vgu.webp",
      description:
        "An industry-aligned Online BBA offer by online VGU is a program that helps students improve communication, analytical, and management skills for business.",
    },
    {
      id: "vgu-bca",
      code: "BCA",
      title: "Bachelor of Computer Applications",
      level: "Graduation",
      duration: "36 Months",
      image: "/assets/all_universities_images/vgu/bca-vgu.webp",
      description:
        "The VGU Online BCA program builds strong computer application skills and prepares students for tech careers. They get an opportunity to learn programming, database management, web development, etc.",
    },
    {
      id: "vgu-ba",
      code: "BA",
      title: "Bachelor of Arts",
      level: "Graduation",
      duration: "36 Months",
      image: "/assets/all_universities_images/vgu/ba-vgu.webp",
      description:
        "Online VGU offers a flexible Online BA program that helps students broaden their knowledge and career through well-designed VGU university Course admissions.",
    },
  ],
  about: {
    title: "About Vivekananda Global University Online",
    titleColor: "#ffd508",
    text1:
      "Vivekananda Global University Online is one of the most preferred universities for online courses. With the NAAC A+ accreditation and UGC entitlement, the VGU online degree is valued and recognised worldwide. It provides a wide range of flexible and affordable online UG and PG courses for students interested in higher education. The Vivekananda Global University course admissions are fully online and accessible to all.",
    text2:
      "The university combines expert faculty, academic excellence, modern learning, and industry-aligned online courses. Start your journey today with online VGU for a pathway that leads to your career goals.",
    image: "/assets/all_universities_images/vgu/about-image-vgu.webp",
    buttonText: "Apply Now",
  },
  whyChoose: [
    {
      title: "UGC-entitles & NAAC A+",
      desc: "Top-accredited degrees at online VGU that are recognised all over India and worldwide.",
      image: "/assets/all_universities_images/vgu/ugc-vgu.webp",
    },
    {
      title: "Industry-oriented programs",
      desc: "Career-relevant undergraduate and postgraduate courses at VGU online are designed to match the industry standards.",
      image: "/assets/all_universities_images/vgu/hiring-vgu.webp",
    },
    {
      title: "Flexible Learning",
      desc: "Start your career journey with flexible learning options at Vivekananda Global University's online courses.",
      image: "/assets/all_universities_images/vgu/classroom-vgu.webp",
    },
    {
      title: "Dual Degree Opportunities",
      desc: "The university invites students who want to pursue more than one degree at a time with its dual degree programs.",
      image: "/assets/all_universities_images/vgu/placement-vgu.webp",
    },
    {
      title: "Affordable Fee Structure",
      desc: "The online courses at Vivekananda Global University are budget-friendly and come with financial support, including EMI and scholarship options.",
      image: "/assets/all_universities_images/vgu/emi-vgu.webp",
    },
    {
      title: "Examination On-Demand",
      desc: "VGU online provides an opportunity for students to take assessments and exams at their own pace and schedule.",
      image: "/assets/all_universities_images/vgu/courses-vgu.webp",
    },
  ],
  degreeInfo: {
    title: "Globally Accepted\nOnline Vivekananda Global University\nDegree",
    cardBackground: "transparent",
    sectionBg: "#F3F3F8",
    buttonBg: "#ffd508",
    buttonTextColor: "#000000",
    sectionPadding: "py-6 sm:py-8",
    cardPadding: "p-0",
    imageWrapperClassName:
      "w-full max-w-[390px] sm:max-w-[460px] lg:max-w-[500px] aspect-square mx-auto flex items-center justify-center",
    imageClassName:
      "object-contain scale-125 sm:scale-130 lg:scale-135 transition-transform duration-300", 
    features: [
      {
        title: "UGC Entitled",
        desc: "Online VGU degrees approved by UGC are valued across India.",
        icon: "/assets/all_universities_images/vgu/green-tick-icon.webp",
      },
      {
        title: "NAAC Accreditation",
        desc: "This shows that VGU University courses follow the latest higher-education quality standards.",
        icon: "/assets/all_universities_images/vgu/green-tick-icon.webp",
      },
      {
        title: "AICTE Approved",
        desc: "All India Council for Technical Education guidelines are adhered to by Vivekananda Global University course admissions.",
        icon: "/assets/all_universities_images/vgu/green-tick-icon.webp",
      },
      {
        title: "Globally Acknowledged",
        desc: "Online VGU degrees are recognised and accepted worldwide.",
        icon: "/assets/all_universities_images/vgu/green-tick-icon.webp",
      },
    ],
    buttonText: "Get Your Degree",
    image: "/assets/all_universities_images/vgu/sample-degree-vgu.webp",
  },
  recruiters: {
    title: "Top Recruiters at VGU Online",
    badgeClassName: "bg-[#811811] text-white px-5 sm:px-10 py-2.5 sm:py-3 rounded-[14px] rounded-tl-none text-center shadow-xs inline-flex items-center justify-center",
    titleClassName: "text-[17.5px] sm:text-[21px] font-semibold text-white tracking-normal leading-none whitespace-nowrap m-0",
    image: "/assets/all_universities_images/vgu/placement-partner-vgu.webp",
    desktopImage: "/assets/all_universities_images/vgu/placement-partner-vgu.webp",
    mobileImage: "/assets/all_universities_images/vgu/hairing-partner-vgu-mobile.webp",
    containerClassName: "max-w-[1280px] mx-auto px-4 sm:px-6",
    aspectRatio: "aspect-[2.4/1] sm:aspect-[2.6/1]",
    imageClassName: "scale-110 sm:scale-115 md:scale-120",
    sectionPadding: "pt-7 pb-4 sm:pt-9 sm:pb-6",
  },
  admissionProcess: {
    title:
      "How to Apply for\nVivekananda Global University\nOnline Courses",
    titleColor: "#172b4d",
    gridClass:
      "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-4 lg:gap-3 xl:gap-4 w-full max-w-[420px] sm:max-w-none mx-auto",
    sectionPadding: "pt-10 sm:pt-14 lg:pt-16 pb-10 sm:pb-12 lg:pb-14",
    subtitle:
      "Students can easily enrol in Vivekananda Global University Online courses. Candidates can conveniently apply by selecting their desired program. Follow these steps to secure admission in the university.",
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
  faqs: [
    {
      q: "Q1. Why choose Vivekananda Global University for online courses?",
      a: "VGU Online offers an extensive range of UGC-recognised online UG and PG courses. The online VGU degree is accepted worldwide in all sectors of jobs.",
    },
    {
      q: "Q2. Are VGU online degrees for all programs valid?",
      a: "Yes, Vivekananda Global University is recognized and accepted by statutory bodies like UGC, NAAC (A+ Grade), AICTE, and NIRF. Its online degree is fully valid for higher studies, government jobs, civil services, and corporate employment.",
    },
    {
      q: "Q3. How can I apply for the Vivekananda Global University online MBA?",
      a: "Vivekananda Global University online MBA offers a fully online admission process, making it easy to apply and fill out the application form for desired courses with complete counselor support.",
    },
    {
      q: "Q4. Is the learning schedule flexible for VGU Online BCA?",
      a: "Yes, VGU online offers a user-friendly LMS system. Students are able to access live classes, recorded lectures, e-study materials, assignments, and tasks at their own schedule.",
    },
    {
      q: "Q5. Can a working professional pursue higher education while working?",
      a: "Yes! Vivekananda Global University course admissions provide learners a chance to study at their own pace. They can study anytime, from any location.",
    },
    {
      q: "Q6. How can one get more information about Vivekananda Global University online?",
      a: "Learners and professionals can submit the enquiry form on this page or call +91 7065 7777 55 for 100% free guidance from academic experts.",
    },
  ],
};
