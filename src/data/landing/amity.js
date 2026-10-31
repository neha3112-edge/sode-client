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

        /* =====================================================
       AMITY HERO SECTION - LEFT SIDE CONTENT (LAPTOP & DESKTOP)
       Exact match to Target Image 1 (Form is untouched)
    ===================================================== */
    @media (min-width: 1000px) {
      /* Background image positioning */
      .landing-page--amity #hero {
        background-position: center top !important;
        background-size: cover !important;
        min-height: 420px !important;
      }
      .landing-page--amity #hero > div[aria-hidden="true"] {
        background-position: center top !important;
        background-size: cover !important;
      }

      /* Hero container: unified alignment matching Navbar Logo & Coupon */
      .landing-page--amity .amity-hero-container,
      .landing-page--amity #hero > div > div {
        padding-left: 15px !important;
        padding-right: 15px !important;
        padding-top: 28px !important;
      }

      /* Left Info Column: top aligned, width 360px */
      .landing-page--amity .amity-hero-info-col,
      .landing-page--amity .hero-info-col {
        max-width: 360px !important;
        width: 360px !important;
        flex: none !important;
        align-self: flex-start !important;
        align-items: flex-start !important;
        text-align: left !important;
        padding-top: 30px !important;
        margin: 5px 0 0 -10px !important;
      }

      /* 1. Hashtag: #YourFutureBeginsHere (Starts at Y = 50px) */
      .landing-page--amity .amity-hero-hashtag,
      .landing-page--amity .hero-info-col > p {
        color: #444444 !important;
        font-size: 17px !important;
        font-weight: 400 !important;
        margin: 18px 0 9px 0 !important;
        line-height: 1 !important;
        letter-spacing: 0.01em !important;
      }

      /* 2. Heading: Amity University Online (Starts at Y = 77px, Height = 25px) */
      .landing-page--amity .amity-hero-heading,
      .landing-page--amity .hero-info-col h1 {
        color: #004172 !important;
        font-size: 36px !important;
        font-weight: 900 !important;
        line-height: 1.15 !important;
        margin-top: 0 !important;
        margin-bottom: 6px !important;
        white-space: nowrap !important;
        letter-spacing: -0.07em !important;
      }

      /* 3. Subtitle: Learn from Anywhere, Grow Everywhere (Starts at Y = 105px) */
      .landing-page--amity .amity-hero-tagline,
      .landing-page--amity .hero-tagline,
      .landing-page--amity .hero-info-col .amity-hero-tagline,
      .landing-page--amity .hero-info-col > div:nth-of-type(1) {
        color: #333333 !important;
        font-size: 19.5px !important;
        font-weight: 400 !important;
        line-height: 1.3 !important;
        margin-top: 0 !important;
        margin-bottom: 22px !important;
      }

      /* 4. Course Box Wrapper (Width: 320px, Starts at Y = 169px) */
      .landing-page--amity .amity-hero-course-wrapper,
      .landing-page--amity .hero-info-col > div.relative.z-20 {
        width: 320px !important;
        max-width: 320px !important;
        margin-top: 0 !important;
        margin-bottom: 27px !important;
        margin-left: 0 !important;
        position: relative !important;
      }

      /* 5. Course Pill: Online Degree Courses : (Starts at Y = 154px) */
      .landing-page--amity .amity-hero-course-label,
      .landing-page--amity .hero-info-col > div.relative.z-20 > span {
        left: -1px !important;
        top: -11px !important;
        background-color: #fdb913 !important;
        color: #5a5959ff !important;
        font-size: 16px !important;
        font-weight: 800 !important;
        padding: 4px 12px !important;
        border-radius: 16px !important;
        line-height: 1.4 !important;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08) !important;
      }

      /* 6. Course Box Interior */
      .landing-page--amity .amity-hero-course-box,
      .landing-page--amity .hero-info-col > div.relative.z-20 > div {
        width: 340px !important;
        border: 2px solid #004172 !important;
        border-radius: 6px !important;
        background-color: rgba(255, 255, 255, 0.95) !important;
        padding: 12px 12px 8px 12px !important;
        color: #004172 !important;
        font-size: 20.5px !important;
        font-weight: 700 !important;
        line-height: 1.3 !important;
        text-align: left !important;
      }

      /* 7. Download Brochure Button */
      .landing-page--amity .amity-hero-btn,
      .landing-page--amity .hero-brochure-btn {
        width: 220px !important;
        height: 34px !important;
        min-height: 34px !important;
        background: #ffffff !important;
        background-color: #ffffff !important;
        color: #004172 !important;
        border: 1.5px solid #004172 !important;
        border-radius: 4px !important;
        font-size: 13px !important;
        font-weight: 500 !important;
        padding: 0 18px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 6px !important;
        margin-top: 15px !important;
        align-self: flex-start !important;
      }

      .landing-page--amity .amity-hero-btn svg,
      .landing-page--amity .hero-brochure-btn svg {
        width: 13px !important;
        height: 13px !important;
      }

      /* 8. Approvals Section Desktop/Laptop View */
      .landing-page--amity #approvals {
        background-color: #fff5c4 !important;
      }

      .landing-page--amity #approvals .grid {
        display: grid !important;
        grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
        column-gap: 24px !important;
        row-gap: 24px !important;
        align-items: center !important;
      }

      .landing-page--amity #approvals .grid > div {
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
      }

      .landing-page--amity #approvals .grid > div > div.relative {
        width: 72px !important;
        height: 72px !important;
        min-width: 72px !important;
        min-height: 72px !important;
        flex-shrink: 0 !important;
      }

      .landing-page--amity #approvals .grid > div p {
        font-size: 14px !important;
        font-weight: 400 !important;
        color: #111111 !important;
        line-height: 1.3 !important;
        margin: 0 !important;
      }
    }

    /* =====================================================
       AMITY HERO SECTION - TABLET VIEW (769px to 999px)
    ===================================================== */
    @media (min-width: 769px) and (max-width: 999px) {
      .landing-page--amity .amity-hero-heading,
      .landing-page--amity .hero-info-col h1 {
        color: #004172 !important;
        font-size: 32px !important;
        font-weight: 800 !important;
        line-height: 1.15 !important;
      }

      .landing-page--amity .amity-hero-tagline,
      .landing-page--amity .hero-tagline,
      .landing-page--amity .hero-info-col .amity-hero-tagline,
      .landing-page--amity .hero-info-col > div:nth-of-type(1) {
        color: #333333 !important;
        font-size: 16px !important;
        font-weight: 400 !important;
        line-height: 1.3 !important;
      }
    }

    /* =====================================================
       AMITY HERO SECTION - MOBILE VIEW (max-width: 768px)
       Pixel-Perfect Match to Target Image 1
    ===================================================== */
    @media (max-width: 768px) {
      /* Hero container */
      .landing-page--amity .amity-hero-container,
      .landing-page--amity #hero > div > div {
        padding-left: 16px !important;
        padding-right: 16px !important;
        padding-top: 5px !important;
        padding-bottom: 20px !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-start !important;
      }

      /* Left Info Column */
      .landing-page--amity .amity-hero-info-col,
      .landing-page--amity .hero-info-col {
        align-items: flex-start !important;
        text-align: left !important;
        width: 100% !important;
        max-width: 100% !important;
        padding: 0 0 0 16px !important;
        margin: 0 !important;
      }

      /* 1. Hashtag (#YourFutureBeginsHere) - Compact, regular weight */
      .landing-page--amity .amity-hero-hashtag,
      .landing-page--amity .hero-info-col > p {
        color: #444444 !important;
        font-size: 18px !important;
        font-weight: 400 !important;
        margin: 18px 0 8px 0 !important;
        line-height: 1.2 !important;
        text-align: left !important;
        letter-spacing: 0 !important;
      }

      /* 2. Heading: Amity University Online (Large, prominent, bold, 2-line layout) */
      .landing-page--amity .amity-hero-heading,
      .landing-page--amity .hero-info-col h1 {
        color: #004172 !important;
        font-size: 36px !important;
        font-weight: 900 !important;
        line-height: 1 !important;
        max-width: 260px !important;
        margin: 2px 0 8px 0 !important;
        white-space: normal !important;
        letter-spacing: -0.06em !important;
        text-align: left !important;
      }

      /* 3. Subtitle (Learn from Anywhere, Grow Everywhere) - 2 lines, normal weight */
      .landing-page--amity .amity-hero-tagline,
      .landing-page--amity .hero-tagline,
      .landing-page--amity .hero-info-col .amity-hero-tagline,
      .landing-page--amity .hero-info-col > div:nth-of-type(1) {
        color: #333333 !important;
        font-size: 19px !important;
        font-weight: 400 !important;
        line-height: 1.25 !important;
        max-width: 250px !important;
        margin: 4px 0 16px 0 !important;
        text-align: left !important;
      }

      /* 4. Course Box Wrapper */
      .landing-page--amity .amity-hero-course-wrapper,
      .landing-page--amity .hero-info-col > div.relative.z-20 {
        width: 100% !important;
        max-width: 280px !important;
        margin-top: 14px !important;
        margin-bottom: 14px !important;
        margin-left: 0 !important;
        position: relative !important;
        align-self: flex-start !important;
      }

      /* 5. Course Pill: Online Degree Courses : */
      .landing-page--amity .amity-hero-course-label,
      .landing-page--amity .hero-info-col > div.relative.z-20 > span {
        left: 0px !important;
        top: -5px !important;
        background-color: #fdb913 !important;
        color: #302f2fff !important;
        font-size: 16px !important;
        font-weight: 600 !important;
        padding: 2px 10px !important;
        border-radius: 9999px !important;
        line-height: 1.3 !important;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08) !important;
      }

      /* 6. Course Box Interior: 2 clear lines, bold dark blue */
      .landing-page--amity .amity-hero-course-box,
      .landing-page--amity .hero-info-col > div.relative.z-20 > div {
        width: 100% !important;
        max-width: 300px !important;
        border: 2px solid #004172 !important;
        border-radius: 6px !important;
        background-color: rgba(255, 255, 255, 0.95) !important;
        padding: 10px 10px 10px 10px !important;
        color: #004172 !important;
        font-size: 18.5px !important;
        font-weight: 700 !important;
        line-height: 1.35 !important;
        text-align: left !important;
      }

      /* 7. Download Brochure Button */
      .landing-page--amity .amity-hero-btn,
      .landing-page--amity .hero-brochure-btn {
        width: 215px !important;
        height: 40px !important;
        min-height: 36px !important;
        background: #ffffff !important;
        background-color: #ffffff !important;
        color: #004172 !important;
        border: 1.5px solid #004172 !important;
        border-radius: 6px !important;
        font-size: 15px !important;
        font-weight: 600 !important;
        padding: 0 14px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 6px !important;
        margin-top: 12px !important;
        margin-bottom: 0px !important;
        align-self: flex-start !important;
      }

      /* 8. Campus Image (Building Photograph) */
      .landing-page--amity .hero-mobile-image-wrapper {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 16px !important;
        overflow: hidden !important;
        margin-top: 4px !important;
        margin-bottom: 16px !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
      }

      /* 9. Form Container & Card on Mobile */
      .landing-page--amity .hero-form-col {
        width: 100% !important;
        max-width: 100% !important;
        align-items: center !important;
        margin: 0 0 12px 0 !important;
      }

      .landing-page--amity .hero-form-col .landing-lead-card {
        width: 100% !important;
        max-width: 360px !important;
        border-radius: 14px !important;
        margin-top:16px !important;
      }

     /* 10. APPROVALS SECTION - AMITY MOBILE VIEW */

.landing-page--amity #approvals {
  background-color: #fff5c4 !important;
}

.landing-page--amity #approvals .grid {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  column-gap: 22px !important;
  row-gap: 28px !important;
  align-items: center !important;
  padding-left: 10px !important;
  padding-right: 10px !important;
}

.landing-page--amity #approvals .grid > div {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  min-width: 0 !important;
}

.landing-page--amity #approvals .grid > div > div.relative {
  width: 60px !important;
  height: 60px !important;
  min-width: 60px !important;
  min-height: 60px !important;
  flex-shrink: 0 !important;
}

.landing-page--amity #approvals .grid > div p {
  font-size: 11px !important;
  font-weight: 400 !important;
  color: #111111 !important;
  line-height: 1.25 !important;
  margin: 0 !important;
  min-width: 0 !important;
  overflow-wrap: break-word !important;
}

            /* 11. Why Choose Section Mobile View (Exact Match to Target Images) */
      .landing-page--amity #whychoose,
      .landing-page--amity #whyChoose,
      #whychoose {
        padding-top: 28px !important;
        padding-bottom: 24px !important;
        padding-left: 20px !important;
        padding-right: 20px !important;
        background-color: #ffffff !important;
      }

      .landing-page--amity #whychoose .ant-layout-content,
      #whychoose .ant-layout-content {
        padding-left: 20px !important;
        padding-right: 20px !important;
        box-sizing: border-box !important;
      }

      /* Heading: Exact 3-line layout, bold, dark blue */
      .landing-page--amity #whychoose .whychoose-title,
      .landing-page--amity #whychoose h2,
      #whychoose .whychoose-title,
      #whychoose h2 {
        color: #08417b !important;
        font-size: 35px !important;
        font-weight: 800 !important;
        line-height: 1.22 !important;
        text-align: left !important;
        margin-top: 0 !important;
        margin-bottom: 24px !important;
        letter-spacing: -0.02em !important;
        max-width: 320px !important;
      }

      /* Points Stack / Grid */
      .landing-page--amity #whychoose .whychoose-points-grid,
      #whychoose .whychoose-points-grid {
        display: flex !important;
        flex-direction: column !important;
        gap: 20px !important;
      }

      /* Point Item */
      .landing-page--amity #whychoose .whychoose-item,
      #whychoose .whychoose-item {
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        text-align: left !important;
        gap: 4px !important;
      }

      /* Point Title */
      .landing-page--amity #whychoose .whychoose-item-title,
      .landing-page--amity #whychoose h3,
      #whychoose .whychoose-item-title,
      #whychoose h3 {
        color: #08417b !important;
        font-size: 18.5px !important;
        font-weight: 700 !important;
        line-height: 1.25 !important;
        text-align: left !important;
        margin: 0 0 4px 0 !important;
      }

      /* Point Description */
      .landing-page--amity #whychoose .whychoose-item-desc,
      .landing-page--amity #whychoose p,
      #whychoose .whychoose-item-desc,
      #whychoose p {
        color: #333333 !important;
        font-size: 13px !important;
        font-weight: 400 !important;
        line-height: 1.45 !important;
        text-align: left !important;
        max-width: 100% !important;
        margin: 10px 0 0 0 !important;
      }

      /* Student Image Wrapper & Centering */
      .landing-page--amity #whychoose .whychoose-image-wrapper,
      #whychoose .whychoose-image-wrapper {
        width: 280px !important;
        max-width: 280px !important;
        height: 270px !important;
        margin: 20px auto 0 auto !important;
        position: relative !important;
      }

      .landing-page--amity #whychoose .whychoose-student-img,
      .landing-page--amity #whychoose .whychoose-image-wrapper img,
      #whychoose .whychoose-student-img,
      #whychoose .whychoose-image-wrapper img {
        transform: scale(1) !important;
        object-fit: contain !important;
        object-position: bottom center !important;
      }

      /* Apply Now Button Container */
      .landing-page--amity #whychoose .whychoose-mobile-btn-wrap,
      #whychoose .whychoose-mobile-btn-wrap {
        width: 100% !important;
        display: flex !important;
        justify-content: center !important;
        margin-top: 8px !important;
        margin-bottom: 0px !important;
      }

      /* Apply Now Button */
      .landing-page--amity #whychoose .whychoose-btn,
      .landing-page--amity #whychoose .whychoose-mobile-btn-wrap button,
      #whychoose .whychoose-btn,
      #whychoose .whychoose-mobile-btn-wrap button {
        width: 150px !important;
        height: 38px !important;
        min-height: 38px !important;
        background: #ffc738ff !important;
        background-color: #ffc83dff !important;
        color: #08417b !important;
        font-size: 16px !important;
        font-weight: 700 !important;
        border-radius: 6px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 4px !important;
        padding: 0 6px !important;
        border: none !important;

        cursor: pointer !important;
      }

      .landing-page--amity #whychoose .whychoose-btn svg,
      .landing-page--amity #whychoose .whychoose-mobile-btn-wrap button svg,
      #whychoose .whychoose-btn svg,
      #whychoose .whychoose-mobile-btn-wrap button svg {
        width: 16px !important;
        height: 16px !important;
        color: #08417b !important;
        stroke: #08417b !important;
      }
    }

    /* Amity Navbar Logo - compact size matching target header */
    .amity-navbar-logo {
      width: 102px !important;
      height: 36px !important;
    }
    @media (min-width: 640px) {
      .amity-navbar-logo {
        width: 98px !important;
        height: 34px !important;
      }
    }
        @media (min-width: 1024px) {
      .amity-navbar-logo {
        width: 136px !important;
        height: 47px !important;
      }
    }
    @media (min-width: 1280px) {
      .amity-navbar-logo {
        width: 146px !important;
        height: 51px !important;
      }
    }

    /* Amity Header Navbar Desktop Alignment Baseline */
    @media (min-width: 1024px) {
      .landing-page--amity header {
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .landing-page--amity header .ant-layout-content {
        width: 100% !important;
        max-width: 1150px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        padding-left: 15px !important;
        padding-right: 15px !important;
        box-sizing: border-box !important;
      }
      .landing-page--amity header .ant-layout-content > div:first-child {
        margin-left: 0px !important;
        padding-left: 0px !important;
      }
      .landing-page--amity header .ant-layout-content > div:last-child {
        margin-right: 0px !important;
        padding-right: 0px !important;
      }
    }

    /* Amity Header Navbar - Hide desktop nav text links so only Scholarship button shows on laptop & desktop */
    .landing-page--amity .header_menu_list {
      display: none !important;
    }

    /* Amity Mobile Header Menu Button (3 blue lines matching Image 3) */
    .landing-page--amity header button[aria-label="Toggle menu"] {
      color: #08417b !important;
      background: transparent !important;
      padding: 4px !important;
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
    .landing-page--amity header button[aria-label="Toggle menu"] svg {
      stroke: #08417b !important;
      width: 26px !important;
      height: 26px !important;
      stroke-width: 2.2 !important;
    }
    .landing-page--amity header button[aria-label="Toggle menu"]:hover,
    .landing-page--amity header button[aria-label="Toggle menu"]:focus,
    .landing-page--amity header button[aria-label="Toggle menu"]:active {
      background: transparent !important;
    }

    /* Amity Mobile Header & Menu Styles */
    @media (max-width: 767px) {
      .landing-page--amity header {
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .landing-page--amity header .ant-layout-content {
        height: 68px !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }

      /* Center Mobile Menu Dropdown */
      .landing-page--amity header > div.md\:hidden {
        background: #ffffff !important;
        border-top: 1px solid #f0f2f5 !important;
        box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.12) !important;
        padding: 0 0 16px 0 !important;
      }
      .landing-page--amity header > div.md\:hidden ul {
        display: flex !important;
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        text-align: center !important;
      }
      .landing-page--amity header > div.md\:hidden ul li {
        border-bottom: 1px solid #f0f2f5 !important;
        text-align: center !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }
      .landing-page--amity header > div.md\:hidden ul li a {
        display: block !important;
        width: 100% !important;
        padding: 14px 16px !important;
        color: #0e2246 !important;
        font-size: 16.5px !important;
        font-weight: 700 !important;
        text-align: center !important;
        letter-spacing: -0.01em !important;
        transition: color 0.15s ease !important;
      }
      .landing-page--amity header > div.md\:hidden ul li a:hover,
      .landing-page--amity header > div.md\:hidden ul li a:active {
        color: #0055b8 !important;
      }

      /* Mobile Menu Coupon Button */
      .landing-page--amity .mobile-menu-coupon-wrap {
        padding-top: 16px !important;
        padding-bottom: 6px !important;
        padding-left: 20px !important;
        padding-right: 20px !important;
        display: flex !important;
        justify-content: center !important;
      }
      .landing-page--amity .mobile-menu-coupon-wrap .coupon-btn-main {
        width: 100% !important;
        max-width: 320px !important;
        border-radius: 10px !important;
        padding: 10px 18px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
      }

      /* Hide Scholarship Coupon Button in Mobile Hero Section */
      .landing-page--amity #hero .coupon-btn-main {
        display: none !important;
      }
      } /* Mobile @media (max-width: 767px) ends here */

    /* =====================================================
       AMITY ABOUT SECTION - MOBILE VIEW (< 1024px)
       Apply Now button centered, exact divider spacing
    ===================================================== */
    @media (max-width: 1023px) {
      .landing-page--amity #about .about-apply-btn-wrapper {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        width: 100% !important;
        text-align: center !important;
      }

      .landing-page--amity #about .about-apply-btn {
        margin-left: auto !important;
        margin-right: auto !important;
        height: 38px !important;
        min-height: 38px !important;
        font-size: 14.5px !important;
        padding: 0 18px !important;
      }

      .landing-page--amity #about .about-divider {
        margin-top: 39px !important;
        margin-bottom: 28px !important;
        height: 1px !important;
        min-height: 1px !important;
        background-color: #d1d5db !important;
        border-top: 1px solid #d1d5db !important;
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      /* Amity Stats Mobile (< 1024px) */
      .landing-page--amity #stats {
        padding-top: 18px !important;
        padding-bottom: 18px !important;
      }
      .landing-page--amity #stats .grid {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 16px 12px !important;
        width: 100% !important;
      }
      .landing-page--amity #stats .grid > div {
        display: flex !important;
        align-items: center !important;
        gap: 10px !important;
        width: 100% !important;
      }
      .landing-page--amity #stats .stat-icon-wrapper {
        width: 44px !important;
        height: 44px !important;
        min-width: 44px !important;
        min-height: 44px !important;
      }
      .landing-page--amity #stats h3 {
        font-size: 22px !important;
        font-weight: 700 !important;
        line-height: 1.1 !important;
        margin: 0 !important;
      }
      .landing-page--amity #stats p {
        font-size: 11.5px !important;
        font-weight: 500 !important;
        line-height: 1.2 !important;
        margin: 2px 0 0 0 !important;
      }
    }


    /* =====================================================
       AMITY PROGRAMMES (ONLINE DEGREE COURSES) - DESKTOP VIEW
       Matches Target Reference Image 1 exactly (Full Width, Sleek Cards, AntD Carousel)
    ===================================================== */
    @media only screen and (min-width: 1024px) {
      /* 1. Section Spacing & Height */
      .landing-page--amity #programmes {
        padding-top: 36px !important;
        padding-bottom: 48px !important;
        overflow: hidden !important;
        width: 100% !important;
      }

      /* 2. Heading Typography (2 centered white lines) */
      .landing-page--amity #programmes .text-center.mb-5,
      .landing-page--amity #programmes .text-center.mb-6 {
        margin-bottom: 26px !important;
      }

      .landing-page--amity #programmes .programmes-subtitle {
        font-size: 24px !important;
        font-weight: 700 !important;
        line-height: 1.2 !important;
        color: #ffffff !important;
        text-align: center !important;
        letter-spacing: 0 !important;
        margin: 0 !important;
      }

      .landing-page--amity #programmes .programmes-title {
        font-size: 24px !important;
        font-weight: 700 !important;
        line-height: 1.2 !important;
        color: #ffffff !important;
        text-align: center !important;
        margin-top: 4px !important;
        letter-spacing: 0 !important;
      }

      /* 3. Programmes Carousel Container (Centered with 30px padding matching First Image) */
      .landing-page--amity #programmes > div.hidden.md\:block {
        width: 100% !important;
        max-width: 1024px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        padding-left: 30px !important;
        padding-right: 30px !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
      }

      /* 4. Hide Navigation Arrows in Desktop View */
      .landing-page--amity #programmes button[aria-label="Previous programme"],
      .landing-page--amity #programmes button[aria-label="Next programme"] {
        display: none !important;
      }

      /* 5. Course Cards Slider Layout */
      .landing-page--amity #programmes .slick-slider {
        width: 100% !important;
      }

      .landing-page--amity #programmes .slick-list {
        overflow: hidden !important;
        width: 100% !important;
      }

      .landing-page--amity #programmes .slick-track {
        display: flex !important;
        align-items: stretch !important;
      }

      .landing-page--amity #programmes .slick-slide {
        height: inherit !important;
        display: flex !important;
        padding: 0 8px !important;
        box-sizing: border-box !important;
      }

      .landing-page--amity #programmes .slick-slide > div {
        width: 100% !important;
        display: flex !important;
      }

      .landing-page--amity #programmes .slick-slide > div > div {
        width: 100% !important;
        display: flex !important;
      }

      /* 6. Card Container Dimensions & Flexbox (Pure Vertical Column, Clean Borderless) */
      .landing-page--amity #programmes .classic-course-card,
      .landing-page--amity #programmes .ant-card {
        border-radius: 6px !important;
        overflow: hidden !important;
        background-color: #ffffff !important;
        border: none !important;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        width: 100% !important;
        min-height: 380px !important;
        height: 100% !important;
      }

      .landing-page--amity #programmes .classic-course-card:hover,
      .landing-page--amity #programmes .ant-card:hover {
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
      }

      .landing-page--amity #programmes .ant-card .ant-card-body {
        height: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        padding: 0 !important;
        width: 100% !important;
      }

      /* 7. Card Image Proportions (Reduced height 140px for Desktop View matching First Image) */
      .landing-page--amity #programmes .classic-card-image-wrap,
      .landing-page--amity #programmes .ant-card .classic-card-image-wrap,
      .landing-page--amity #programmes .ant-card .relative.w-full.bg-slate-100 {
        height: 140px !important;
        min-height: 140px !important;
        max-height: 140px !important;
        width: 100% !important;
        position: relative !important;
        overflow: hidden !important;
        border-top-left-radius: 6px !important;
        border-top-right-radius: 6px !important;
      }

      .landing-page--amity #programmes .classic-card-image-wrap img,
      .landing-page--amity #programmes .ant-card .relative.w-full.bg-slate-100 img {
        object-fit: cover !important;
        object-position: center !important;
        width: 100% !important;
        height: 100% !important;
      }

      /* 8. Graduation / Post Graduation Badge (Green rectangle, top-left, matching Image 1) */
      .landing-page--amity #programmes .classic-card-badge,
      .landing-page--amity #programmes .ant-card .classic-card-badge,
      .landing-page--amity #programmes .ant-card .absolute.top-0.left-0 {
        background-color: #008000 !important;
        color: #ffffff !important;
        font-size: 13px !important;
        font-weight: 600 !important;
        padding: 6px 16px !important;
        border-top-left-radius: 6px !important;
        border-top-right-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        letter-spacing: 0.01em !important;
        line-height: 1.2 !important;
        z-index: 10 !important;
        box-shadow: none !important;
      }

      /* 9. Course Card Content Padding & Typography (Matching Image 1) */
      .landing-page--amity #programmes .classic-card-content,
      .landing-page--amity #programmes .ant-card .classic-card-content,
      .landing-page--amity #programmes .ant-card .p-4,
      .landing-page--amity #programmes .ant-card .sm\:p-5 {
        padding: 12px 16px 6px 16px !important;
        display: flex !important;
        flex-direction: column !important;
      }

      /* Course Code (MBA, MA, BCA, BBA, BCOM, MCA) */
      .landing-page--amity #programmes .classic-card-title,
      .landing-page--amity #programmes .ant-card h3 {
        font-size: 21px !important;
        font-weight: 800 !important;
        line-height: 1.15 !important;
        color: #07427d !important;
        margin: 0 !important;
        margin-bottom: 0px !important;
        letter-spacing: -0.01em !important;
      }

      /* Full Degree Name (Master of Business Administration, etc.) */
      .landing-page--amity #programmes .classic-card-subtitle,
      .landing-page--amity #programmes .ant-card h3 + p {
        font-size: 13px !important;
        font-weight: 600 !important;
        line-height: 1.3 !important;
        color: #07427d !important;
        margin-top: 0 !important;
        margin-bottom: 2px !important;
        letter-spacing: 0 !important;
      }

      /* Description Paragraph */
      .landing-page--amity #programmes .classic-card-desc,
      .landing-page--amity #programmes .ant-card h3 + p + p {
        font-size: 11.5px !important;
        font-weight: 400 !important;
        line-height: 1.5 !important;
        color: #2b2b2b !important;
        margin: 0 !important;
        min-height: 58px !important;
        -webkit-line-clamp: 4 !important;
        display: -webkit-box !important;
        -webkit-box-orient: vertical !important;
        overflow: hidden !important;
        letter-spacing: 0 !important;
      }

      /* 10. Card Footer Container & Inset Divider (matching Image 1) */
      .landing-page--amity #programmes .classic-card-footer {
        padding: 0 16px 14px 16px !important;
        margin-top: auto !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }

      .landing-page--amity #programmes .classic-card-footer-inner {
        border-top: 1px solid #e8e8e8 !important;
        padding-top: 10px !important;
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: space-between !important;
        width: 100% !important;
      }

      /* Button (Yellow #fdb913, rounded 4px, compact) */
      .landing-page--amity #programmes .classic-card-btn,
      .landing-page--amity #programmes .ant-card .classic-card-footer-inner button {
        background-color: #fdb913 !important;
        background: #fdb913 !important;
        color: #000000 !important;
        font-size: 11.5px !important;
        font-weight: 600 !important;
        padding: 6px 12px !important;
        border-radius: 4px !important;
        border: none !important;
        height: auto !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 5px !important;
        box-shadow: none !important;
        cursor: pointer !important;
      }

      .landing-page--amity #programmes .classic-card-btn svg,
      .landing-page--amity #programmes .ant-card .classic-card-footer-inner button svg {
        width: 11px !important;
        height: 11px !important;
        color: #000000 !important;
      }

      /* Duration (Hourglass + 24 / 36 Months) */
      .landing-page--amity #programmes .classic-card-duration,
      .landing-page--amity #programmes .ant-card .classic-card-footer-inner > div {
        font-size: 12px !important;
        font-weight: 600 !important;
        color: #333333 !important;
        display: flex !important;
        align-items: center !important;
        gap: 5px !important;
      }

      .landing-page--amity #programmes .classic-card-duration svg,
      .landing-page--amity #programmes .ant-card .classic-card-footer-inner > div svg {
        width: 12.5px !important;
        height: 12.5px !important;
        color: #4b5563 !important;
      }
    }

    /* Large Desktop Screen Scale (min-width: 1536px) */
    @media only screen and (min-width: 1536px) {
      .landing-page--amity #programmes .classic-card-image-wrap,
      .landing-page--amity #programmes .ant-card .classic-card-image-wrap,
      .landing-page--amity #programmes .ant-card .relative.w-full.bg-slate-100 {
        height: 195px !important;
        min-height: 195px !important;
        max-height: 195px !important;
      }

      .landing-page--amity #programmes .classic-course-card,
      .landing-page--amity #programmes .ant-card {
        min-height: 420px !important;
      }

      .landing-page--amity #programmes .classic-card-title,
      .landing-page--amity #programmes .ant-card h3 {
        font-size: 25px !important;
      }
    }

    .landing-page--amity #hero div:has(> .coupon-btn-main) {
        display: none !important;
      
    }

    /* ============================================
   AMITY STATS + WHY CHOOSE CONTAINER ALIGNMENT
   DESKTOP ONLY (1400px+)
============================================ */

/* =======================================================
   AMITY LANDING PAGE - FULL PAGE UNIFIED CONTENT ALIGNMENT
   Aligns ALL sections with Logo (left) & Scholarship Coupon (right)
======================================================= */

@media (min-width: 1024px) {
  /* 1. Reset outer section wrappers so backgrounds stay 100% full width */
  .landing-page--amity header,
  .landing-page--amity #hero,
  .landing-page--amity #approvals,
  .landing-page--amity #approvals > div:last-child,
  .landing-page--amity #programmes,
  .landing-page--amity #about,
  .landing-page--amity #stats,
  .landing-page--amity #whychoose,
  .landing-page--amity #process,
  .landing-page--amity .apply-section,
  .landing-page--amity .admission-process-section,
  .landing-page--amity .compare_Section,
  .landing-page--amity #compare,
  .landing-page--amity footer {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }

  /* 2. Unified Content Container: Fixed max-width 1150px across all desktop screens */
  .landing-page--amity header .ant-layout-content,
  .landing-page--amity #hero .ant-layout-content,
  .landing-page--amity #hero > div > div,
  .landing-page--amity #approvals .ant-layout-content,
  .landing-page--amity #approvals > div:last-child > main,
  .landing-page--amity #approvals .approvals-content-container,
  .landing-page--amity #approvals > div:last-child > div,
  
  .landing-page--amity #about .ant-layout-content,
  .landing-page--amity #about > main,
  .landing-page--amity #about > div,
  .landing-page--amity #about .amity-about-container,
  .landing-page--amity #stats .ant-layout-content,
  .landing-page--amity #stats > main,
  .landing-page--amity #stats > div,
  .landing-page--amity #stats .amity-stats-container,
  .landing-page--amity #whychoose .ant-layout-content,
  .landing-page--amity #whychoose > main,
  .landing-page--amity #whychoose > div,
  .landing-page--amity #process > div,
  .landing-page--amity .apply-section > div,
  .landing-page--amity .admission-process-section > div,
  .landing-page--amity section:has(.admission-step-card) > div,
  .landing-page--amity .compare_Section > div,
  .landing-page--amity #compare > div,
  .landing-page--amity footer .media-footer-container {
    width: 100% !important;
    max-width: 1150px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    padding-left: 15px !important;
    padding-right: 15px !important;
    box-sizing: border-box !important;
  }

  /* =====================================================
     AMITY FAQ ACCORDION STYLING (MATCHING IMAGES 1, 2 & 3)
  ===================================================== */
  .landing-page--amity #faqs {
    padding-top: 28px !important;
    padding-bottom: 40px !important;
  }
  .landing-page--amity #faqs h2 {
    color: #08417b !important;
    font-weight: 700 !important;
    font-size: 26px !important;
    margin-top: 0px !important;
    margin-bottom: 20px !important;
    text-align: left !important;
  }
  .landing-page--amity #faqs .border-t,
  .landing-page--amity #faqs .divide-y {
    border-top: none !important;
  }
  .landing-page--amity #faqs .faq-item-row {
    border-bottom: 1px solid #e5e7eb !important;
    border-top: none !important;
  }
  .landing-page--amity #faqs button {
    padding-top: 13px !important;
    padding-bottom: 13px !important;
  }
  .landing-page--amity #faqs button span:first-child {
    font-size: 14.5px !important;
    color: #808080 !important;
    font-weight: 400 !important;
    transition: color 0.15s ease !important;
  }
  .landing-page--amity #faqs button:hover span:first-child {
    color: #000000 !important;
  }
  .landing-page--amity #faqs button[aria-expanded="true"] span:first-child {
    color: #000000 !important;
    font-weight: 600 !important;
  }
  .landing-page--amity #faqs button span:last-child {
    font-size: 17px !important;
    color: #808080 !important;
    font-weight: 400 !important;
    transition: color 0.15s ease !important;
  }
  .landing-page--amity #faqs button:hover span:last-child {
    color: #808080 !important;
  }
  .landing-page--amity #faqs button[aria-expanded="true"] span:last-child {
    color: #808080 !important;
    font-weight: 700 !important;
  }
  .landing-page--amity #faqs .faq-answer-content,
  .landing-page--amity #faqs .faq-item-row > div:last-child,
  .landing-page--amity #faqs .divide-y > div > div:last-child {
    font-size: 13.5px !important;
    color: #000000 !important;
    line-height: 1.6 !important;
    padding-top: 4px !important;
    padding-bottom: 14px !important;
  }

  /* Footer Disclaimer Full Cover on Desktop (Matching Image 1) */
  .landing-page--amity footer #footer-bottom-bar {
    width: 100% !important;
    max-width: 100% !important;
    padding-left: 16px !important;
    padding-right: 16px !important;
    box-sizing: border-box !important;
  }
  .landing-page--amity footer #footer-bottom-bar p {
    width: 100% !important;
    max-width: 100% !important;
    text-align: center !important;
    font-size: 14px !important;
    line-height: 1.6 !important;
  }

  /* 3. Header Navbar: Logo starts at left boundary, Coupon ends at right boundary */
  .landing-page--amity header .ant-layout-content > div:first-child {
    margin-left: 0px !important;
    padding-left: 0px !important;
  }
  .landing-page--amity header .ant-layout-content > div:last-child {
    margin-right: 0px !important;
    padding-right: 0px !important;
  }

  /* 4. Hero info column alignment */
  .landing-page--amity .amity-hero-info-col,
  .landing-page--amity .hero-info-col {
    margin-left: 0px !important;
  }

  /* 5. Stats Section: Content width and centered tight spacing matching Image 1 */
  .landing-page--amity #stats {
    padding-top: 24px !important;
    padding-bottom: 24px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .landing-page--amity #stats .ant-layout-content,
  .landing-page--amity #stats > main,
  .landing-page--amity #stats > div,
  .landing-page--amity #stats .amity-stats-container {
    width: 100% !important;
    max-width: 1150px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    padding-left: 15px !important;
    padding-right: 15px !important;
    box-sizing: border-box !important;
  }
  .landing-page--amity #stats .grid {
    display: flex !important;
    flex-direction: row !important;
    justify-content: center !important;
    align-items: center !important;
    width: 100% !important;
    gap: 46px !important;
  }
  .landing-page--amity #stats .grid > div {
    flex: 0 0 auto !important;
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
  }
  .landing-page--amity #stats h3 {
    font-size: 30px !important;
    font-weight: 700 !important;
    line-height: 1.1 !important;
    letter-spacing: -0.01em !important;
    color: #ffffff !important;
    margin: 0 !important;
  }
  .landing-page--amity #stats p {
    font-size: 13.5px !important;
    font-weight: 500 !important;
    line-height: 1.25 !important;
    color: #ffffff !important;
    white-space: nowrap !important;
    margin: 2px 0 0 0 !important;
  }
  .landing-page--amity #stats .stat-icon-wrapper {
    width: 48px !important;
    height: 48px !important;
    min-width: 48px !important;
    min-height: 48px !important;
  }

  /* 6. About Section: Matching Image 1 */
  .landing-page--amity #about {
    border-bottom: none !important;
    padding-top: 36px !important;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }

  .landing-page--amity #about h2 {
    color: #1f2937 !important;
    font-weight: 600 !important;
    font-size: 28px !important;
    line-height: 1.25 !important;
    font-family: var(--font-poppins), 'Poppins', sans-serif !important;
    margin-bottom: 12px !important;
    text-align: left !important;
  }

  .landing-page--amity #about p {
    color: #333333 !important;
    font-size: 13.5px !important;
    line-height: 1.65 !important;
    font-weight: 400 !important;
    font-family: var(--font-poppins), 'Poppins', sans-serif !important;
    margin-bottom: 12px !important;
  }

  .landing-page--amity #about .about-apply-btn,
  .landing-page--amity #about button {
    height: 42px !important;
    min-height: 42px !important;
    width: auto !important;
    min-width: 135px !important;
    padding: 0 20px !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    border: 2px solid #08417b !important;
    border-radius: 4px !important;
    color: #111827 !important;
    background-color: #ffffff !important;
    background: #ffffff !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 7px !important;
    box-shadow: none !important;
    cursor: pointer !important;
  }

  .landing-page--amity #about .about-apply-btn svg,
  .landing-page--amity #about button svg {
    width: 16px !important;
    height: 16px !important;
    stroke-width: 2.4 !important;
    color: #111827 !important;
    margin-left: 2px !important;
  }

  .landing-page--amity #about .about-apply-btn:hover,
  .landing-page--amity #about button:hover {
    background-color: #f8fafc !important;
    background: #f8fafc !important;
    border-color: #08417b !important;
  }

  .landing-page--amity #about .about-divider {
    height: 1px !important;
    min-height: 1px !important;
    background-color: #d1d5db !important;
    background: #d1d5db !important;
    border-top: 1px solid #d1d5db !important;
    border-bottom: none !important;
    border-left: none !important;
    border-right: none !important;
    margin-top: 34px !important;
    margin-bottom: 78px !important;
    width: 100% !important;
    display: block !important;
    opacity: 1 !important;
    visibility: visible !important;
  }
  .landing-page--amity #about .ant-layout-content,
  .landing-page--amity #about > main,
  .landing-page--amity #about > div,
  .landing-page--amity #about .amity-about-container {
    width: 100% !important;
    max-width: 1150px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    padding-left: 15px !important;
    padding-right: 15px !important;
    box-sizing: border-box !important;
  }
  .landing-page--amity #about .grid {
    gap: 28px !important;
    align-items: start !important;
  }

  /* 7. Approvals Section: Vertically aligned with Logo (left) and Scholarship Button (right) */
  .landing-page--amity #approvals,
  .landing-page--amity #approvals > div {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .landing-page--amity #approvals .ant-layout-content,
  .landing-page--amity #approvals > div:last-child > main,
  .landing-page--amity #approvals .approvals-content-container,
  .landing-page--amity #approvals > div:last-child > div,
  .landing-page--amity #approvals .max-w-\[1360px\] {
    width: 100% !important;
    max-width: 1150px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    padding-left: 15px !important;
    padding-right: 15px !important;
    box-sizing: border-box !important;
  }
  .landing-page--amity #approvals .grid {
    display: grid !important;
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    column-gap: 24px !important;
    row-gap: 24px !important;
    align-items: center !important;
    width: 100% !important;
  }
  .landing-page--amity #approvals .grid > div:nth-child(4n + 1) {
    justify-self: start !important;
  }
  .landing-page--amity #approvals .grid > div:nth-child(4n) {
    justify-self: end !important;
  }
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
    compareUniversityName: "Amity University",

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

    showSodeLogo: false,
    logoWrapperClassName:
      "w-[105px] sm:w-[115px] lg:w-[136px] xl:w-[146px] h-9 sm:h-[38px] lg:h-[47px] xl:h-[51px] amity-navbar-logo",
    hideDesktopNavLinks: true,

    arrowGif:
      "/assets/all_universities_images/amity/arrow.gif",

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

    showCouponBtn: true,
    showCouponButton: true,
    couponButtonText: "Scholarship Coupon Code",

    hideMobileHeroCoupon: true,
    mobileMenuCenter: true,
    showMobileMenuCoupon: true,

    navLinks: [
      { label: "Courses", href: "#programmes" },
      { label: "Approvals", href: "#approvals" },
      { label: "About", href: "#about" },
      { label: "Advantage", href: "#whychoose" },
      { label: "FAQs", href: "#faqs" },
    ],

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
    programmesFullWidth: true,
    programmesHideArrows: true,
    programmesCarousel: {
      desktopSlides: 4,
      laptopSlides: 4,
      tabletSlides: 2,
      centerMode: false,
      centerPadding: "0px",
      autoplay: true,
      interval: 3000,
      dots: false,
      hideArrows: true,
      slidesToScroll: 1,
    },
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

      backgroundPosition: "center top",

      desktopBackgroundPosition: "center top",

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

      containerClassName: "amity-hero-container",
      contentClassName: "amity-hero-info-col",
      hashtagClassName: "amity-hero-hashtag",
      headingClassName: "amity-hero-heading",
      taglineClassName: "amity-hero-tagline",
      taglineStyle: {
        color: "#333333",
      },
      courseWrapperClassName: "amity-hero-course-wrapper",
      courseLabelClassName: "amity-hero-course-label",
      courseBoxClassName: "amity-hero-course-box",
      buttonClassName: "amity-hero-btn",

      backgroundColor: "#ffffff",

      headingColor: "#004172",

      taglineColor: "#333333",

      hashtagColor: "#444444",

      courseLabel: "Online Degree Courses :",

      coursePillBg: "#fdb913",

      coursePillTextColor: "#000000",

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
      title:
        "Approved by the University Grants Commission of India",
      text:
        "Approved by the University Grants Commission of India",
      tag: "UGC-DEB",
    },

    {
      image:
        "/assets/all_universities_images/amity/NaacA+-approval.png",
      title:
        "NAAC Accredited with A+ Grade",
      text:
        "NAAC Accredited with A+ Grade",
      tag: "NAAC A+",
    },

    {
      image:
        "/assets/all_universities_images/amity/NIRF-Approval.png",
      title:
        "Ranked 32nd in NIRF (National Institutional Ranking Framework)",
      text:
        "Ranked 32nd in NIRF (National Institutional Ranking Framework)",
      tag: "NIRF #32",
    },

    {
      image:
        "/assets/all_universities_images/amity/AICTE-Approval.png",
      title:
        "Approved by All India Council for Technical Education",
      text:
        "Approved by All India Council for Technical Education",
      tag: "AICTE",
    },

    {
      image:
        "/assets/all_universities_images/amity/THE-approval.png",
      title:
        "Recognised by The World University Rankings (THE)",
      text:
        "Recognised by The World University Rankings (THE)",
      tag: "THE Ranked",
    },

    {
      image:
        "/assets/all_universities_images/amity/QS-approval.png",
      title:
        "Ranked by QS (Quacquarelli Symonds)",
      text:
        "Ranked by QS (Quacquarelli Symonds)",
      tag: "QS Asia Top 10",
    },

    {
      image:
        "/assets/all_universities_images/amity/WES-Approval.png",
      title:
        "Recognised by World Education Services (WES)",
      text:
        "Recognised by World Education Services (WES)",
      tag: "WES (USA/Canada)",
    },

    {
      image:
        "/assets/all_universities_images/amity/WASc-approval.png",
      title:
        "Accredited by Western Association of Schools and Colleges (WASC)",
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
      iconImage: "/assets/amity/Number-1-amity.png",
      circleBg: "bg-[#ffc107]",
    },

    {
      number: "500+",
      label: "Hiring Partners",
      iconType: "graduation",
      iconImage: "/assets/amity/Number-2-amity.png",
      circleBg: "bg-[#2196f3]",
    },

    {
      number: "82K+",
      label: "Online Learners",
      iconType: "users",
      iconImage: "/assets/amity/Number-3-amity.png",
      circleBg: "bg-[#4caf50]",
    },

    {
      number: "60+",
      label: "In-Demand Specialization",
      iconType: "book",
      iconImage: "/assets/amity/Number-4-amity.png",
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
    titleColor: "#1f2937",
    textColor: "#333333",
    buttonColor: "#08417b",
    buttonTextColor: "#111827",
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

  faqDefaultOpenIndex: null,

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
