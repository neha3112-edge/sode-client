export const uuData = {
  slug: "uu",
  meta: {
    title: "Uttaranchal University Online Courses | Online MBA, MCA, UG, & PG Degree",
    description:
      "Online UU UGC-approved degree. Uttaranchal University online MBA, MCA, and distance courses. View Sample Degree & Online Admission Process. Online UU NAAC A+, AICTE-approved, & AIU. Live lectures, anytime learning, & placements support for students.",
    keywords: [
      "Uttaranchal University Online",
      "Online UU",
      "Uttaranchal University Online MBA",
      "Uttaranchal Online MCA",
      "Uttaranchal University Online Courses",
      "Uttaranchal Distance Education",
      "UU Online Degree",
      "Uttaranchal University Admission 2026",
    ],
  },
  brand: {
    name: "Uttaranchal University Online",
    shortName: "Uttaranchal University",
    slug: "uu",
    headline: "UTTARANCHAL UNIVERSITY ONLINE",
    phone: "+91 7065 7777 55",
    phoneDisplay: "+91 7065 7777 55",
    officialUrl: "https://uuo.ac.in",
    logo: "/assets/all_universities_images/uu/uttranchal-logo.png",
    sodeIcon: "/assets/all_universities_images/uu/sode-icon.png",
    sodeLogo: "/assets/all_universities_images/uu/new-des-logo.webp",
    arrowGif: "/assets/all_universities_images/uu/arrow.gif",
    giftGif: "/assets/all_universities_images/uu/gift.gif",
    callGif: "/assets/all_universities_images/uu/call_icon.gif",
    primaryColor: "#0A3C7D",
    accentColor: "#62B239",
    themeBg: "bg-[#0A3C7D]",
    themeGradient: "linear-gradient(to right, #0A3C7D, #17479E)",
    themeBorder: "border-[#62B239]",
    goldColor: "#62B239",
    fontFamily: "Poppins",
    font: "poppins",
    badgeText: "Admissions Open 2026",

    // Global Green Scholarship Coupon Button
    showCouponBtn: true,
    showCouponButton: true,
    couponButtonText: "Scholarship Coupon Code",
    couponBtnBg: "#22c55e",
    couponButtonColor: "#22c55e",
    showSodeLogo: true,
    footerBg: "#010d2a",

    hideDesktopNavLinks: true,
    hideMobileSodeLogo: true,
    navLinks: [
      { label: "Courses", href: "#program" },
      { label: "Approvals", href: "#approvals" },
      { label: "Why Choose", href: "#whychoose" },
      { label: "About", href: "#about" },
      { label: "Degree", href: "#degree" },
      { label: "FAQs", href: "#faqs" },
    ],

    // Sticky CTA configuration
    stickyCtaLayout: "default",
    stickyBarBg: "#d32f2f",
    stickyBrochureAction: "whatsapp",
    stickyApplyStyle: "white-red",
    showFloatingCallOnMobile: true,
    headerContainerClassName: "uu-container",

    // Custom CSS Overrides specifically for Uttaranchal University (loaded from JSON)
    customCss: `
      /* Uttaranchal University Custom Styles & Overrides (JSON Configured) */
      @import url('https://fonts.googleapis.com/css2?family=Anton&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Oswald:wght@500;600;700&display=swap');

      .landing-page--uu,
      .landing-page--uu * {
        font-family: 'Poppins', var(--font-poppins), sans-serif !important;
      }

      
      /* ========================================================================= */
      /* UNIFIED RESPONSIVE CONTAINER SYSTEM FOR ALL 10 UU SECTIONS */
      /* ========================================================================= */
      .landing-page--uu .uu-container,
      .landing-page--uu header .uu-container,
      .landing-page--uu header > .ant-layout-content,
      .landing-page--uu #hero .uu-hero-container,
      .landing-page--uu #hero > div.uu-hero-container,
      .landing-page--uu #program > div.uu-container,
      .landing-page--uu #approvals > div.uu-container,
      .landing-page--uu #why-choose-us > div.uu-container,
      .landing-page--uu #about > div.uu-container,
      .landing-page--uu #degree > div.uu-container,
      .landing-page--uu #faqs > div.uu-container {
        box-sizing: border-box !important;
        width: 100% !important;
        margin-left: auto !important;
        margin-right: auto !important;
        margin-inline: auto !important;
      }

      /* Tier 1: Mobile below 640px (100% max-width, 16px padding each side) */
      @media (max-width: 639px) {
        .landing-page--uu .uu-container,
        .landing-page--uu header .uu-container,
        .landing-page--uu header > .ant-layout-content,
        .landing-page--uu #hero .uu-hero-container,
        .landing-page--uu #program > div.uu-container,
        .landing-page--uu #approvals > div.uu-container,
        .landing-page--uu #why-choose-us > div.uu-container,
        .landing-page--uu #about > div.uu-container,
        .landing-page--uu #degree > div.uu-container,
        .landing-page--uu #faqs > div.uu-container {
          max-width: 100% !important;
          padding-left: 16px !important;
          padding-right: 16px !important;
        }
      }

      /* Tier 2: Tablet 640–1023px (100% max-width, 24px padding each side) */
      @media (min-width: 640px) and (max-width: 1023px) {
        .landing-page--uu .uu-container,
        .landing-page--uu header .uu-container,
        .landing-page--uu header > .ant-layout-content,
        .landing-page--uu #hero .uu-hero-container,
        .landing-page--uu #program > div.uu-container,
        .landing-page--uu #approvals > div.uu-container,
        .landing-page--uu #why-choose-us > div.uu-container,
        .landing-page--uu #about > div.uu-container,
        .landing-page--uu #degree > div.uu-container,
        .landing-page--uu #faqs > div.uu-container {
          max-width: 100% !important;
          padding-left: 24px !important;
          padding-right: 24px !important;
        }
      }

      /* Tier 3: Laptop 1024–1399px (1150px max-width, 24px padding each side) */
      @media (min-width: 1024px) and (max-width: 1399px) {
        .landing-page--uu .uu-container,
        .landing-page--uu header .uu-container,
        .landing-page--uu header > .ant-layout-content,
        .landing-page--uu #hero .uu-hero-container,
        .landing-page--uu #program > div.uu-container,
        .landing-page--uu #approvals > div.uu-container,
        .landing-page--uu #why-choose-us > div.uu-container,
        .landing-page--uu #about > div.uu-container,
        .landing-page--uu #degree > div.uu-container,
        .landing-page--uu #faqs > div.uu-container {
          max-width: 1150px !important;
          padding-left: 24px !important;
          padding-right: 24px !important;
        }
      }

      /* Tier 4: Desktop 1400–1599px (1280px max-width, 32px padding each side) */
      @media (min-width: 1400px) and (max-width: 1599px) {
        .landing-page--uu .uu-container,
        .landing-page--uu header .uu-container,
        .landing-page--uu header > .ant-layout-content,
        .landing-page--uu #hero .uu-hero-container,
        .landing-page--uu #program > div.uu-container,
        .landing-page--uu #approvals > div.uu-container,
        .landing-page--uu #why-choose-us > div.uu-container,
        .landing-page--uu #about > div.uu-container,
        .landing-page--uu #degree > div.uu-container,
        .landing-page--uu #faqs > div.uu-container {
          max-width: 1280px !important;
          padding-left: 32px !important;
          padding-right: 32px !important;
        }
      }

      /* Tier 5: Large desktop 1600–1919px (1440px max-width, 40px padding each side) */
      @media (min-width: 1600px) and (max-width: 1919px) {
        .landing-page--uu .uu-container,
        .landing-page--uu header .uu-container,
        .landing-page--uu header > .ant-layout-content,
        .landing-page--uu #hero .uu-hero-container,
        .landing-page--uu #program > div.uu-container,
        .landing-page--uu #approvals > div.uu-container,
        .landing-page--uu #why-choose-us > div.uu-container,
        .landing-page--uu #about > div.uu-container,
        .landing-page--uu #degree > div.uu-container,
        .landing-page--uu #faqs > div.uu-container {
          max-width: 1440px !important;
          padding-left: 40px !important;
          padding-right: 40px !important;
        }
      }

      /* Tier 6: Full HD 1920px+: 1520px max-width, 40px padding each side */
      @media (min-width: 1920px) {
        .landing-page--uu .uu-container,
        .landing-page--uu header .uu-container,
        .landing-page--uu header > .ant-layout-content,
        .landing-page--uu #hero .uu-hero-container,
        .landing-page--uu #program > div.uu-container,
        .landing-page--uu #approvals > div.uu-container,
        .landing-page--uu #why-choose-us > div.uu-container,
        .landing-page--uu #about > div.uu-container,
        .landing-page--uu #degree > div.uu-container,
        .landing-page--uu #faqs > div.uu-container {
          max-width: 1520px !important;
          padding-left: 40px !important;
          padding-right: 40px !important;
        }
      }

      /* Navbar alignment with container boundaries */
      .landing-page--uu header .flex.items-center.min-w-0.shrink-0 {
        margin-left: 0 !important;
      }
      .landing-page--uu header .shrink-0.pl-2 {
        margin-right: 0 !important;
      }

      /* ========================================================================= */
      /* UU HERO SECTION: EXACT 1:1 MATCH WITH IMAGE 1 & DISTANCEEDUCATIONSCHOOL.COM/UU */
      /* ========================================================================= */

      .landing-page--uu #hero,
      .landing-page--uu section#hero {
        padding-top: 20px !important;
        padding-bottom: 10px !important;
        min-height: auto !important;
      }

      /* Desktop Background Image Alignment matching reference */
      @media (min-width: 1000px) {
        .landing-page--uu #hero [style*="background-image"],
        .landing-page--uu #hero .absolute.-z-20,
        .landing-page--uu #hero .uu-desktop-bg,
        #hero .uu-desktop-bg {
          background-position: center top !important;
          background-size: cover !important;
          background-repeat: no-repeat !important;
        }
      }

      .landing-page--uu #hero .uu-hero-container,
      .landing-page--uu #hero > div.uu-hero-container {
        padding-top: 0px !important;
        padding-bottom: 0px !important;
        min-height: auto !important;
      }

      .landing-page--uu #hero .hero-info-col {
        max-width: 490px !important;
        width: 100% !important;
      }

      /* Heading: UTTARANCHAL UNIVERSITY ONLINE */
      .landing-page--uu #hero h1 {
        font-family: 'Anton', 'Oswald', sans-serif !important;
        font-weight: 500 !important;
        letter-spacing: 0.5px !important;
        word-spacing: normal !important;
        text-transform: uppercase !important;
        line-height: 1.15 !important;
        white-space: nowrap !important;
        margin-top: 0px !important;
        margin-bottom: 10px !important;
        padding-top: 4px !important;
        padding-bottom: 6px !important;
        color: #ffffff !important;
      }

      .landing-page--uu #hero h1 span,
      .landing-page--uu #hero h1 span.sp {
        color: #62B239 !important;
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
      }

      /* Courses Line: BBA | BCA | BA | MBA | MCA */
      .landing-page--uu #hero .uu-hero-courses,
      .landing-page--uu #hero .uu-hero-courses div,
      .landing-page--uu #hero .course-strip,
      .landing-page--uu #hero [class*="courseStrip"] {
        color: #ffffff !important;
        font-weight: 400 !important;
        letter-spacing: 0.4px !important;
        line-height: 1.2 !important;
        margin-top: 0px !important;
        margin-bottom: 10px !important;
      }

      /* Paragraph / Tagline */
      .landing-page--uu #hero .uu-hero-tagline,
      .landing-page--uu #hero .hero-info-col p,
      .landing-page--uu #hero .hero-info-col div[class*="tagline"] {
        font-size: 14px !important;
        line-height: 1.2 !important;
        color: #ffffff !important;
        max-width: 365px !important;
        margin-top: 0px !important;
        margin-bottom: 18px !important;
      }

      /* Button: Get Brochure */
      .landing-page--uu #hero .hero-brochure-btn {
        background: #d11c1f !important;
        background-color: #d11c1f !important;
        border-radius: 8px !important;
        padding: 6px px !important;
        font-size: 13px !important;
        font-weight: 600 !important;
        color: #ffffff !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 8px !important;
        border: none !important;
        box-shadow: none !important;
        line-height: 1.4 !important;
        height: auto !important;
        cursor: pointer !important;
      }

      .landing-page--uu #hero .hero-brochure-btn:hover {
        background: #b51518 !important;
        background-color: #b51518 !important;
      }

      @media (min-width: 1024px) {
        .landing-page--uu #hero h1 {
          font-size: 38px !important;
        }
        .landing-page--uu #hero .uu-hero-courses,
        .landing-page--uu #hero .uu-hero-courses div,
        .landing-page--uu #hero .course-strip,
        .landing-page--uu #hero [class*="courseStrip"] {
          font-size: 24px !important;
        }
      }

      @media (min-width: 1280px) {
        .landing-page--uu #hero h1 {
          font-size: 40px !important;
        }
        .landing-page--uu #hero .uu-hero-courses,
        .landing-page--uu #hero .uu-hero-courses div,
        .landing-page--uu #hero .course-strip,
        .landing-page--uu #hero [class*="courseStrip"] {
          font-size: 25px !important;
        }
      }

      .landing-page--uu .sp {
        color: #62B239 !important;
      }

      .landing-page--uu #about .about-subtitle {
        color: #62B239 !important;
        font-family: 'Poppins', sans-serif !important;
        font-size: 28px !important;
        font-weight: 500 !important;
        line-height: 1.2 !important;
        margin-bottom: 4px !important;
        display: block !important;
      }

      .landing-page--uu #about h2,
      .landing-page--uu #about .about-title {
        color: #222222 !important;
        font-family: 'Poppins', sans-serif !important;
        font-size: 28px !important;
        font-weight: 500 !important;
        line-height: 1.2 !important;
        margin-bottom: 16px !important;
      }

      @media (min-width: 1024px) {
        .landing-page--uu #about .about-subtitle {
          font-size: 30px !important;
          margin-bottom: 4px !important;
        }
        .landing-page--uu #about h2,
        .landing-page--uu #about .about-title {
          font-size: 30px !important;
          margin-bottom: 18px !important;
        }
      }

      .landing-page--uu #about .btn-apply {
        border: 2px solid #0A3C7D !important;
        color: #000000 !important;
        background-color: #ffffff !important;
        border-radius: 0px !important;
        font-size: 15px !important;
        font-weight: 400 !important;
        padding: 8px 44px !important;
        line-height: 1.4 !important;
        cursor: pointer !important;
        transition: all 0.2s ease-in-out !important;
        display: inline-block !important;
      }

      .landing-page--uu #about .btn-apply:hover {
        background-color: #0A3C7D !important;
        color: #ffffff !important;
      }

      .landing-page--uu #program h2,
      .landing-page--uu #program .programmes-heading {
        color: #003399 !important;
        font-family: 'Poppins', var(--font-poppins), sans-serif !important;
        font-weight: 500 !important;
        font-size: 24px !important;
        line-height: 1.25 !important;
        letter-spacing: normal !important;
        text-align: left !important;
        margin-top: 0px !important;
        margin-bottom: 0px !important;
      }

      .landing-page--uu #program h2 span,
      .landing-page--uu #program .programmes-heading span {
        font-weight: 500 !important;
        font-family: inherit !important;
      }

      .landing-page--uu #program h2 span:first-child,
      .landing-page--uu #program .programmes-heading span:first-child {
        color: #003399 !important;
      }

      .landing-page--uu #program h2 span:last-child,
      .landing-page--uu #program .programmes-heading span:last-child {
        color: #62B239 !important;
      }

      @media (min-width: 1400px) {
        .landing-page--uu #program h2,
        .landing-page--uu #program .programmes-heading {
          font-size: 23px !important;
        }
      }

      @media (max-width: 639px) {
        .landing-page--uu #program h2,
        .landing-page--uu #program .programmes-heading {
          font-size: 19px !important;
        }
      }

      .landing-page--uu #program .card-box-cnt h2,
      .landing-page--uu #program h3 {
        color: #003399 !important;
      }

      .landing-page--uu #whychoose {
        background-color: #0A3C7D !important;
        color: #ffffff !important;
      }

      .landing-page--uu #whychoose h2,
      .landing-page--uu #whychoose h3 {
        color: #ffffff !important;
      }

      .landing-page--uu #whychoose p {
        color: rgba(255, 255, 255, 0.9) !important;
      }

      .landing-page--uu #whychoose button {
        background: #62B239 !important;
        color: #ffffff !important;
      }

      /* Certificate / Degree Section - Exact Match with Reference */
      .landing-page--uu #degree,
      .landing-page--uu .certificate {
        background-color: #ffffff !important;
      }

      .landing-page--uu #degree h2,
      .landing-page--uu #degree h3,
      .landing-page--uu .certificate .cer-h {
        font-family: 'Poppins', var(--font-poppins), sans-serif !important;
        font-weight: 600 !important;
        font-size: 36px !important;
        line-height: 1.05 !important;
        color: #222222 !important;
        margin-bottom: 16px !important;
      }

      .landing-page--uu #degree h2 .sp,
      .landing-page--uu #degree h3 .sp,
      .landing-page--uu .certificate .cer-h .sp {
        color: #62B239 !important;
        display: block !important;
        font-weight: 600 !important;
      }

      .landing-page--uu #degree p,
      .landing-page--uu .certificate p {
        font-family: 'Poppins', var(--font-poppins), sans-serif !important;
        font-size: 15px !important;
        color: #333333 !important;
        line-height: 1.6 !important;
        margin-bottom: 24px !important;
      }

      .landing-page--uu #degree button,
      .landing-page--uu .certificate .btn1 {
        padding: 8px 40px !important;
        border: 2px solid #0A3C7D !important;
        background-color: #ffffff !important;
        color: #000000 !important;
        font-family: 'Poppins', var(--font-poppins), sans-serif !important;
        font-size: 15px !important;
        font-weight: 400 !important;
        border-radius: 0px !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
        display: inline-block !important;
        width: auto !important;
      }

      .landing-page--uu #degree button:hover,
      .landing-page--uu .certificate .btn1:hover {
        background-color: #0A3C7D !important;
        color: #ffffff !important;
      }

      .landing-page--uu .landing-lead-card {
        border-radius: 12px !important;
        box-shadow: 0 14px 36px rgba(0, 0, 0, 0.22) !important;
      }

      /* ── UU MOBILE RESPONSIVE ── */

      /* Mobile Header: hide redundant SODE logo, style blue hamburger menu */
      @media (max-width: 767px) {
        .landing-page--uu header .des_logo {
          display: none !important;
        }
        .landing-page--uu header button[aria-label="Toggle menu"] {
          color: #0A3C7D !important;
          padding: 4px !important;
          background: transparent !important;
        }
        .landing-page--uu header button[aria-label="Toggle menu"] svg {
          stroke: #0A3C7D !important;
          width: 28px !important;
          height: 28px !important;
        }
      }

      /* Hero: 1:1 match with mobile reference screenshots */
      @media (max-width: 999px) {
        .landing-page--uu #hero,
        .landing-page--uu section#hero {
          background-image: none !important;
          background-color: #0A3C7D !important;
          padding-top: 20px !important;
          padding-bottom: 24px !important;
        }
        .landing-page--uu #hero div.-z-20 {
          display: none !important;
        }
        .landing-page--uu #hero .hero-info-col {
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          text-align: left !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        /* Heading: UTTARANCHAL UNIVERSITY on line 1, ONLINE on line 2 in green #62B239 */
        .landing-page--uu #hero h1 {
          font-family: 'Anton', 'Oswald', sans-serif !important;
          font-weight: 500 !important;
          letter-spacing: 0.5px !important;
          line-height: 1.15 !important;
          white-space: normal !important;
          text-align: left !important;
          margin-top: 0px !important;
          margin-bottom: 8px !important;
          font-size: 27px !important;
          color: #ffffff !important;
          text-transform: uppercase !important;
        }
        .landing-page--uu #hero h1 span {
          display: block !important;
          color: #62B239 !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
        }
        /* Courses Strip: BBA | BCA | BA | MBA | MCA */
        .landing-page--uu #hero .uu-hero-courses,
        .landing-page--uu #hero .uu-hero-courses div,
        .landing-page--uu #hero .course-strip {
          color: #ffffff !important;
          font-size: 19px !important;
          font-weight: 600 !important;
          line-height: 1.2 !important;
          margin-top: 0px !important;
          margin-bottom: 8px !important;
          text-align: left !important;
          letter-spacing: 0.3px !important;
        }
        /* Tagline: 3 neat lines, 13px, white */
        .landing-page--uu #hero .uu-hero-tagline,
        .landing-page--uu #hero .hero-info-col div[class*="tagline"],
        .landing-page--uu #hero .hero-info-col p {
          font-size: 13px !important;
          line-height: 1.35 !important;
          color: #ffffff !important;
          max-width: 340px !important;
          margin-top: 0px !important;
          margin-bottom: 16px !important;
          text-align: left !important;
        }
        /* Button: Get Brochure in Solid Red #d11c1f */
        .landing-page--uu #hero .hero-brochure-btn {
          display: inline-flex !important;
          background: #d11c1f !important;
          background-color: #d11c1f !important;
          border-radius: 6px !important;
          padding: 7px 18px !important;
          margin-top: 0px !important;
          margin-bottom: 16px !important;
          font-size: 13.5px !important;
          font-weight: 700 !important;
          color: #ffffff !important;
          align-self: flex-start !important;
          border: none !important;
          box-shadow: none !important;
          line-height: 1.4 !important;
        }
        /* Campus Aerial Image Card */
        .landing-page--uu #hero .hero-mobile-image-wrapper {
          width: 100% !important;
          height: auto !important;
          aspect-ratio: 925 / 433 !important;
          border-radius: 16px !important;
          overflow: hidden !important;
          margin-bottom: 16px !important;
          position: relative !important;
          z-index: 10 !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15) !important;
        }
        .landing-page--uu #hero .hero-mobile-image-wrapper img {
          object-fit: cover !important;
          border-radius: 16px !important;
        }
        /* Form Column & Card */
        .landing-page--uu #hero .hero-form-col {
          width: 100% !important;
          align-items: center !important;
          z-index: 20 !important;
          position: relative !important;
        }
        .landing-page--uu #hero .hero-form-col .landing-lead-card,
        .landing-page--uu #hero .hero-form-col .landing-card {
          width: 100% !important;
          max-width: 100% !important;
          border-radius: 16px !important;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
          background: #ffffff !important;
          padding: 18px 16px !important;
          box-sizing: border-box !important;
        }
        /* Form Header */
        .landing-page--uu #hero .landing-lead-card h2 {
          color: #0A3C7D !important;
          font-size: 18px !important;
          font-weight: 700 !important;
          margin-top: 0px !important;
          margin-bottom: 2px !important;
          text-align: center !important;
          line-height: 1.2 !important;
        }
        .landing-page--uu #hero .landing-lead-card p {
          color: #0A3C7D !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          margin-top: 0px !important;
          margin-bottom: 8px !important;
          text-align: center !important;
          line-height: 1.3 !important;
        }
        /* Phone Badge Pill */
        .landing-page--uu #hero .landing-lead-card a[href^="tel"],
        .landing-page--uu #hero .landing-lead-card [class*="variant-phone"] {
          background: #0A3C7D !important;
          background-color: #0A3C7D !important;
          color: #ffffff !important;
          border-radius: 9999px !important;
          padding: 6px 16px !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          margin-top: 4px !important;
          margin-bottom: 12px !important;
          display: inline-flex !important;
        }
        /* Form Inputs & Selects */
        .landing-page--uu #hero .landing-lead-card input,
        .landing-page--uu #hero .landing-lead-card .ant-input {
          height: 38px !important;
          border: 1px solid #d1d5db !important;
          border-radius: 6px !important;
          font-size: 13px !important;
          background-color: #ffffff !important;
          color: #1e293b !important;
        }
        .landing-page--uu #hero .landing-lead-card .ant-select-selector {
          height: 38px !important;
          border: 1px solid #d1d5db !important;
          border-radius: 6px !important;
          font-size: 13px !important;
          background-color: #ffffff !important;
        }
        .landing-page--uu #hero .landing-lead-card .ant-select-selection-placeholder,
        .landing-page--uu #hero .landing-lead-card .ant-select-selection-item {
          line-height: 36px !important;
          font-size: 13px !important;
        }
        /* Submit Button */
        .landing-page--uu #hero .landing-lead-card button[type="submit"] {
          background: #62B239 !important;
          background-color: #62B239 !important;
          color: #ffffff !important;
          height: 40px !important;
          border-radius: 6px !important;
          font-size: 15px !important;
          font-weight: 600 !important;
          width: 100% !important;
          border: none !important;
          margin-top: 6px !important;
          cursor: pointer !important;
        }
      }

      /* Programmes Section: 1-col on phone */
      @media (max-width: 639px) {
        .landing-page--uu #program {
          padding: 40px 12px !important;
        }
        .landing-page--uu #program h2 {
          font-size: 22px !important;
        }
      }

      /* Approvals: auto columns on phone */
      @media (max-width: 639px) {
        .landing-page--uu #certification,
        .landing-page--uu #accreditations {
          padding: 36px 12px !important;
        }
        .landing-page--uu #certification h2,
        .landing-page--uu #accreditations h2 {
          font-size: 20px !important;
        }
      }

      /* Why Choose section: full-width cards on phone */
      @media (max-width: 767px) {
        .landing-page--uu #whychoose {
          padding: 40px 16px !important;
        }
        .landing-page--uu #whychoose h2 {
          font-size: 21px !important;
          line-height: 1.25 !important;
          text-align: left !important;
        }
        .landing-page--uu #whychoose p {
          text-align: left !important;
        }
        .landing-page--uu #whychoose .grid {
          gap: 14px !important;
        }
      }

      /* About Section: single col on mobile */
      @media (max-width: 767px) {
        .landing-page--uu #about {
          padding: 40px 16px !important;
        }
        .landing-page--uu #about .about-subtitle {
          color: #62B239 !important;
          font-family: 'Poppins', sans-serif !important;
          font-size: 22px !important;
          font-weight: 600 !important;
          line-height: 1.25 !important;
          margin-bottom: 4px !important;
          display: block !important;
          text-align: left !important;
        }
        .landing-page--uu #about h2,
        .landing-page--uu #about .about-title {
          color: #222222 !important;
          font-family: 'Poppins', sans-serif !important;
          font-size: 22px !important;
          font-weight: 600 !important;
          line-height: 1.25 !important;
          margin-bottom: 14px !important;
          text-align: left !important;
        }
      }

      /* Degree Section */
      @media (max-width: 767px) {
        .landing-page--uu #degree {
          padding: 36px 16px !important;
        }
        .landing-page--uu #degree h2 {
          font-size: 26px !important;
          line-height: 1.25 !important;
          white-space: normal !important;
          text-align: center !important;
        }
        .landing-page--uu #degree p {
          text-align: center !important;
        }
      }

      /* Admission Process */
      @media (max-width: 639px) {
        .landing-page--uu .apply-section,
        .landing-page--uu [id="admission"] {
          padding: 36px 12px !important;
        }
        .landing-page--uu .apply-section h2 {
          font-size: 20px !important;
        }
      }

      /* FAQ - Exact Match with Reference */
      .landing-page--uu #faqs,
      .landing-page--uu #faq {
        background-color: #ffffff !important;
        padding-top: 35px !important;
        padding-bottom: 35px !important;
      }

      .landing-page--uu #faqs *,
      .landing-page--uu #faq * {
        font-family: 'Poppins', var(--font-poppins), sans-serif !important;
      }

      .landing-page--uu #faqs h2,
      .landing-page--uu #faq h2 {
        color: #011C39 !important;
        font-size: 25px !important;
        font-weight: 600 !important;
        font-family: 'Poppins', var(--font-poppins), sans-serif !important;
        margin-top: 0px !important;
        margin-bottom: 20px !important;
        padding: 0px !important;
        text-align: left !important;
        line-height: 1.2 !important;
      }

      .landing-page--uu #faqs .faq-item,
      .landing-page--uu #faq .faq-item {
        background: #ffffff !important;
        margin: 10px 0 !important;
        border-radius: 5px !important;
        border-bottom: 1px solid #cccccc !important;
        overflow: hidden !important;
        box-shadow: none !important;
      }

      .landing-page--uu #faqs .faq-question,
      .landing-page--uu #faq .faq-question {
        padding: 15px !important;
        cursor: pointer !important;
        color: #000000 !important;
        font-family: 'Poppins', var(--font-poppins), sans-serif !important;
        font-size: 15px !important;
        font-weight: 400 !important;
        line-height: 1.4 !important;
        border-radius: 5px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        width: 100% !important;
        text-align: left !important;
        border: none !important;
        background-color: #ffffff !important;
      }

      .landing-page--uu #faqs .faq-question span,
      .landing-page--uu #faq .faq-question span {
        font-family: 'Poppins', var(--font-poppins), sans-serif !important;
        font-size: 15px !important;
        font-weight: 400 !important;
        line-height: 1.4 !important;
        color: inherit !important;
      }

      .landing-page--uu #faqs .faq-question.active,
      .landing-page--uu #faq .faq-question.active {
        background-color: #62B239 !important;
        color: #ffffff !important;
        border-radius: 5px 5px 0 0 !important;
      }

      .landing-page--uu #faqs .faq-question.active span,
      .landing-page--uu #faq .faq-question.active span {
        color: #ffffff !important;
      }

      .landing-page--uu #faqs .faq-question .icon,
      .landing-page--uu #faq .faq-question .icon {
        background: #f7f7f7 !important;
        color: #62B239 !important;
        font-weight: 700 !important;
        font-size: 16px !important;
        border-radius: 2px !important;
        width: 25px !important;
        height: 22px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        flex-shrink: 0 !important;
        margin-right: 0px !important;
      }

      .landing-page--uu #faqs .faq-answer,
      .landing-page--uu #faq .faq-answer {
        padding: 15px !important;
        background-color: #f9f9f9 !important;
        color: #444444 !important;
        font-family: 'Poppins', var(--font-poppins), sans-serif !important;
        font-size: 14px !important;
        font-weight: 400 !important;
        line-height: 1.6 !important;
      }

      .landing-page--uu #faqs .faq-answer p,
      .landing-page--uu #faq .faq-answer p {
        color: #444444 !important;
        font-size: 14px !important;
        font-weight: 400 !important;
        line-height: 1.6 !important;
        margin: 0px !important;
        font-family: 'Poppins', var(--font-poppins), sans-serif !important;
      }

      @media (max-width: 639px) {
        .landing-page--uu .faq-section,
        .landing-page--uu #faqs,
        .landing-page--uu #faq {
          padding: 25px 12px !important;
        }
        .landing-page--uu .faq-section h2,
        .landing-page--uu #faqs h2,
        .landing-page--uu #faq h2 {
          font-size: 20px !important;
          margin-bottom: 15px !important;
        }
        .landing-page--uu #faqs .faq-question,
        .landing-page--uu #faq .faq-question {
          padding: 12px 10px !important;
          font-size: 14px !important;
        }
        .landing-page--uu #faqs .faq-question span:first-child,
        .landing-page--uu #faq .faq-question span:first-child {
          font-size: 14px !important;
        }
      }

      /* Footer sticky bottom bar: bigger text */
      @media (max-width: 767px) {
        .landing-page--uu .footer_sticky_buttons {
          gap: 8px !important;
          padding: 10px 12px !important;
        }
        .landing-page--uu .footer_sticky_buttons a,
        .landing-page--uu .footer_sticky_buttons button {
          font-size: 12px !important;
          padding: 9px 10px !important;
        }
      }

      /* Overview section */
      @media (max-width: 639px) {
        .landing-page--uu .overview-section {
          padding: 36px 12px !important;
        }
        .landing-page--uu .overview_lists {
          grid-template-columns: 1fr 1fr !important;
          gap: 10px !important;
        }
        .landing-page--uu .overview_list_inner {
          padding: 10px !important;
        }
        .landing-page--uu .overview_list_inner h3 {
          font-size: 13px !important;
        }
        .landing-page--uu .overview_list_inner p {
          font-size: 11px !important;
        }
      }
    `,

    // Section sequence exactly matching https://distanceeducationschool.com/uu/
    sectionOrder: [
      "programmes",
      "approvals",
      "whyChoose",
      "about",
      "degree",
      "admissionProcess",
      "faqs",
      "compareBanner",
    ],

    // =========================================================================
    // 🎯 HERO SECTION CONFIGURATION & CSS (Yahan se Hero Section customize karein)
    // =========================================================================
    hero: {
      // 1. Background & Theme Settings
      sectionBg: "#0A3C7D",
      backgroundColor: "#0A3C7D",
      backgroundImage: "/assets/all_universities_images/uu/UTTRANCHAL-BG.webp",
      mobileBackgroundImage: "none",
      hideMobileHeroCoupon: true,
      mobileImage: "/assets/all_universities_images/uu/university.webp",
      mobileImageWrapperClassName: "w-full aspect-[925/433] rounded-[16px] overflow-hidden mb-4 shadow-md",
      mobileImageClassName: "object-cover",
      mobileTaglineText:
        "Enhance your skills and pursue your passion with our diverse online education programs designed for success.",
      backgroundPosition: "center top",
      desktopBackgroundPosition: "center top",
      backgroundSize: "cover",
      desktopBackgroundStyle: {
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      },
      isDarkTheme: true,
      darkOverlay: false,
      noOverlay: true,
      mobileAlign: "left",

      // 2. HERO SECTION HEIGHT & PADDING (Height & Width strictly matching FAQ section 1130px)
      minHeight: "auto",
      sectionClassName: "!py-4 sm:!py-4 lg:!pt-4 lg:!pb-1.5",
      sectionStyle: {
        paddingTop: "10px",
        paddingBottom: "20px",
      },
      containerClassName: "uu-hero-container uu-container w-full mx-auto !py-0",
      containerStyle: {
        paddingTop: "0px",
        paddingBottom: "0px",
      },
      contentClassName: "w-full lg:w-auto lg:max-w-[490px] shrink-0",
      contentStyle: {
        maxWidth: "490px",
      },

      // 3. HEADING TEXT SIZE & FONT (Title / Heading Style)
      titleHtml: 'UTTARANCHAL UNIVERSITY <span style="color: #62B239;" class="text-[#62B239]">ONLINE</span>',
      headlineHtml: 'UTTARANCHAL UNIVERSITY <span style="color: #62B239;" class="text-[#62B239]">ONLINE</span>',
      headlineText: "UTTARANCHAL UNIVERSITY ONLINE",
      headingFont: "'Anton', sans-serif",
      headingClassName: "uu-hero-title text-[24px] sm:text-[28px] md:text-[32px] lg:text-[38px] xl:text-[40px] font-medium leading-tight tracking-normal text-white uppercase mt-0 mb-2.5 whitespace-nowrap",
      headingStyle: {
        fontFamily: "'Anton', sans-serif",
        color: "#ffffff",
        fontSize: "40px",
        lineHeight: "1.15",
        fontWeight: "500",
        letterSpacing: "0.5px",
        marginTop: "0px",
        marginBottom: "10px",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      },

      // 4. COURSES STRIP (BBA | BCA | BA | MBA | MCA)
      coursesBeforeTagline: true,
      coursesFirst: true,
      coursesStrip: [
        "BBA | BCA | BA | MBA | MCA",
      ],
      hideCourseBox: true,
      coursesColor: "#ffffff",
      courseTextColor: "#ffffff",
      courseStripClassName: "uu-hero-courses text-[18px] sm:text-[20px] lg:text-[24px] xl:text-[25px] font-normal text-white tracking-normal leading-normal mt-0 mb-0.5",
      courseStripStyle: {
        color: "#ffffff",
        fontSize: "25px",
        fontWeight: "400",
        letterSpacing: "0.4px",
        marginTop: "0px",
        marginBottom: "10px",
      },

      // 5. TAGLINE TEXT & SIZE (Matching reference images)
      taglineText:
        "Enhance your skills and pursue your passion with Uttaranchal University Online's diverse online education programs designed for success.",
      taglineClassName: "uu-hero-tagline text-[14px] text-white/95 font-normal leading-[1.3] max-w-[365px] mt-0 mb-4 sm:mb-4.5",
      taglineStyle: {
        color: "#ffffff",
        fontSize: "13px",
        fontWeight: "400",
        lineHeight: "1.3",
        marginTop: "0px",
        marginBottom: "18px",
        maxWidth: "365px",
      },

      // 6. GET BROCHURE BUTTON STYLING (Solid Red #d11c1f, White Text, Rounded 8px)
      brochureButtonText: "Get Brochure",
      buttonBackground: "#d11c1f",
      buttonBg: "#d11c1f",
      buttonGradient: "none",
      buttonTextColor: "#ffffff",
      buttonBorder: "none",
      buttonRadius: "rounded-[8px]",
      buttonClassName: "!bg-[#d11c1f] hover:!bg-[#b51518] !text-white !font-semibold !text-[13px] !px-5 !py-[7px] !rounded-[8px] !shadow-none !border-none cursor-pointer inline-flex items-center gap-2",
      buttonStyle: {
        background: "#d11c1f",
        backgroundColor: "#d11c1f",
        color: "#ffffff",
        borderRadius: "8px",
        border: "none",
        fontWeight: "700",
        fontSize: "14px",
        padding: "7px 20px",
        lineHeight: "1.4",
        height: "auto",
      },

      // 7. ENQUIRE LEAD FORM STYLING
      formContainerClassName: "w-full sm:w-[320px] lg:w-[330px] xl:w-[340px] shrink-0",
      cardStyle: "white",
      formBackground: "#ffffff",
      formCardType: "white",
      hideTermsCheckbox: true,
      enquireTitle: "Enquire Now",
      enquireSubtitle: "Academic Experts will assist you!",
      enquireColor: "#0A3C7D",
      enquireSubtitleColor: "#0A3C7D",
      phoneBadgeBg: "#0A3C7D",
      phoneBadgeStyle: {
        background: "#0A3C7D",
        backgroundColor: "#0A3C7D",
        color: "#ffffff",
        borderRadius: "9999px",
      },
      submitBtnBg: "#62B239",
      submitButtonBackground: "#62B239",
      submitButtonRadius: "6px",
      coursePlaceholder: "Select Your Course",
      phonePlaceholder: "Enter your phone number",
      formCourseList: [
        { value: "BA - Bachelor of Arts", label: "BA - Bachelor of Arts" },
        { value: "BBA - Bachelor of Business Administration", label: "BBA - Bachelor of Business Administration" },
        { value: "BCA - Bachelor of Computer Application", label: "BCA - Bachelor of Computer Application" },
        { value: "MBA - Master of Business Administration", label: "MBA - Master of Business Administration" },
        { value: "MCA - Master of Computer Application", label: "MCA - Master of Computer Application" },
      ],
    },

    // Approvals Configuration
    approvalsLayout: "uu",
    approvalsTitle: "Online UU",
    approvalsHighlight: "Approvals & Recognition",
    approvalsSubtitle:
      "Uttaranchal University Online UGC-approved online degree programs provide the convenience and flexibility of online learning while maintaining the equivalency of traditional on-campus degrees. Uttaranchal University Online courses are delivered by distinguished international faculty, offering a truly world-class education experience.",
    approvalsHeaderColor: "#003399",
    approvalsBorderColor: "#62B239",
    approvalsBg: "#ffffff",

    // Programmes Configuration
    programmesLayout: "uu",
    programmesTitle: "Uttaranchal University Online Degree Courses",
    programmesBg: "#ffffff",
    programmeBtnBg: "#62B239",
    programmeBtnTextColor: "#ffffff",

    // Why Choose / Benefits Configuration
    whyChooseLayout: "uu",
    whyChooseTitle: "Uttaranchal University Benefits in the",
    whyChooseHighlight: "Online Degree Programs",
    whyChooseStudentImage: "/assets/all_universities_images/uu/image-2nd.webp",
    whyChooseBg: "#0A3C7D",
    whyChooseBtnText: "Apply Now",
    whyChooseDescription:
      "Uttaranchal University Online courses are UGC-Entitled offers the convenience & flexibility of online education with the equivalency of a conventional, on-campus degree. Through Uttaranchal University Online, leading international faculty, it offer world-class education in a true sense.",

    // About Configuration
    aboutLayout: "uu",
    aboutTitleGradient: false,
    aboutButtonBg: "#62B239",

    // Sample Degree Configuration
    degreeLayout: "uu",
    degreeTitleColor: "#111111",
    degreeBtnBg: "#0A3C7D",
    degreeBtnTextColor: "#ffffff",

    // Admission Process Configuration
    admissionTitle: "How To Apply For Uttaranchal University Online Courses",
    admissionSubtitle:
      "Students can easily enrol in Uttaranchal University Online courses. Candidates can conveniently apply by selecting their desired program. Follow these steps to secure admission in the university.",
    admissionHeadingColor: "#003399",

    // FAQ Configuration
    faqLayout: "uu",
    faqTitle: "FAQ | Frequently Asked Question",
    faqHeaderColor: "#011C39",
    faqDefaultOpenIndex: null,

    // Compare Banner Configuration
    compareBannerBg: "linear-gradient(270deg, #0A3C7D 0%, #17479E 100%)",
    footerDisclaimer:
      "SODE Counselling Services LLP act as a marketing agency. All university names, logos, and trademarks mentioned are used for informational purposes only. We are not a university or an admission authority. Users are encouraged to verify information on the official website of the University before making decisions.",
  },

  courses: [
    { value: "BA - Bachelor of Arts", label: "BA - Bachelor of Arts" },
    { value: "BBA - Bachelor of Business Administration", label: "BBA - Bachelor of Business Administration" },
    { value: "BCA - Bachelor of Computer Application", label: "BCA - Bachelor of Computer Application" },
    { value: "MBA - Master of Business Administration", label: "MBA - Master of Business Administration" },
    { value: "MCA - Master of Computer Application", label: "MCA - Master of Computer Application" },
  ],

  programmes: [
    {
      id: "ba",
      code: "BA",
      title: "Bachelor of Arts",
      duration: "3 Years",
      level: "Undergraduate",
      image: "/assets/all_universities_images/uu/ba-uttaranchal.webp",
      description:
        "Uttaranchal University Online offers an online BA program that covers diverse areas such as literature, history, sociology, and many more.",
    },
    {
      id: "bba",
      code: "BBA",
      title: "Bachelor of Business Administration",
      duration: "3 Years",
      level: "Undergraduate",
      image: "/assets/all_universities_images/uu/bba-uttaranchal.webp",
      description:
        "Uttaranchal University Online offers an online BBA program that covers key areas like management, marketing, and many more.",
    },
    {
      id: "bca",
      code: "BCA",
      title: "Bachelor of Computer Application",
      duration: "3 Years",
      level: "Undergraduate",
      image: "/assets/all_universities_images/uu/bca-uttaranchal.webp",
      description:
        "Uttaranchal University Online offers an online BCA program that focuses on programming, IT skills, and many more.",
    },
    {
      id: "mba",
      code: "MBA",
      title: "Master of Business Administration",
      duration: "2 Years",
      level: "Postgraduate",
      image: "/assets/all_universities_images/uu/mba-uttaranchal.webp",
      description:
        "Uttaranchal University's Online MBA program delves into finance, business strategy, and many more.",
    },
    {
      id: "mca",
      code: "MCA",
      title: "Master of Computer Application",
      duration: "2 Years",
      level: "Postgraduate",
      image: "/assets/all_universities_images/uu/mca-uttaranchal.webp",
      description:
        "Uttaranchal University's Online MCA program offers courses in coding, IT infrastructure, and many more.",
    },
  ],

  approvals: [
    {
      name: "NAAC A+",
      image: "/assets/all_universities_images/uu/naac-a+.webp",
      desc: "NAAC A+ Accredited",
    },
    {
      name: "AICTE",
      image: "/assets/all_universities_images/uu/aicte.webp",
      desc: "AICTE Approved",
    },
    {
      name: "AIU",
      image: "/assets/all_universities_images/uu/aiu.webp",
      desc: "Association of Indian Universities",
    },
    {
      name: "ISO",
      image: "/assets/all_universities_images/uu/iso.webp",
      desc: "ISO Certified 9001:2015",
    },
    {
      name: "QS World",
      image: "/assets/all_universities_images/uu/qs.png",
      desc: "QS World University Ranked",
    },
    {
      name: "WURI",
      image: "/assets/all_universities_images/uu/wuri.webp",
      desc: "WURI Ranked",
    },
  ],

  whyChoose: [
    {
      title: "Online Live Lectures",
      desc: "Attend interactive live lectures delivered by leading faculty members.",
      image: "/assets/all_universities_images/uu/Live-Lectures-uttranchal.webp",
    },
    {
      title: "Personalised Mentorship",
      desc: "Get one-on-one personalized guidance and mentorship throughout your course.",
      image: "/assets/all_universities_images/uu/mentorship.png",
    },
    {
      title: "Recorded Video Content",
      desc: "Access 24/7 self-paced high-quality recorded lectures anytime.",
      image: "/assets/all_universities_images/uu/recorded-Video-Content.webp",
    },
    {
      title: "Placement Support",
      desc: "Comprehensive career counseling, resume building, and job placement assistance.",
      image: "/assets/all_universities_images/uu/placements-support.webp",
    },
    {
      title: "Learning Flexibility",
      desc: "Study at your own schedule without disrupting your professional career.",
      image: "/assets/all_universities_images/uu/learning-Flexibility.webp",
    },
    {
      title: "International Collaborations",
      desc: "Global exposure through distinguished international curriculum and faculty.",
      image: "/assets/all_universities_images/uu/international-collaboration.webp",
    },
  ],

  about: {
    badge: "About",
    title: "Uttaranchal University Online",
    image: "/assets/all_universities_images/uu/about-Uttaranchal.webp",
    paragraphs: [
      "In line with the Uttaranchal University Act, 2012, Uttaranchal University Online opened its doors in 2013. Uttaranchal University Online was the first university in the Dehradun state of Uttarakhand to be awarded an A+ by the UGC and NAAC. Online UU offers its courses in online and distance modes. Online UU offers its online courses in undergraduate and postgraduate programs like BA, BCA, BBA, MCA, and MBA with high-quality education meeting the market demands.",
    ],
    buttonText: "Apply Now",
    whyChooseTitle: "Why Choose",
    whyChooseHighlight: "Uttaranchal University Online?",
    features: [
      {
        title: "Engagement",
        desc: "Uttaranchal University online offers top tier support to its students and mentorship for personalised learning",
        icon: "/assets/all_universities_images/uu/icon-uttaranchal-1.webp",
      },
      {
        title: "Student-Friendly Study",
        desc: "Uttaranchal University's online, user friendly, learner centric LMS, live and interactive sessions, and well-designed self learning materials.",
        icon: "/assets/all_universities_images/uu/icon-uttaranchal-2.webp",
      },
      {
        title: "Curriculum by Experts",
        desc: "Uttaranchal University's online research-intensive curriculum is drafted by its expert members of faculty and industry leaders.",
        icon: "/assets/all_universities_images/uu/icon-uttaranchal-3.webp",
      },
      {
        title: "Globally Accepted",
        desc: "Uttaranchal University's online programs under its curriculum are globally accepted. Uttaranchal University's fee is also affordable for all its programs.",
        icon: "/assets/all_universities_images/uu/icon-uttaranchal-4.webp",
      },
    ],
  },


  degreeInfo: {
    highlight: "UGC Approved",
    line1: "Uttaranchal University",
    line2: "Online Degree",
    title: "UGC Approved\nUttaranchal University\nOnline Degree",
    description:
      "Online degrees from Online UU are recognized by UGC & AICTE and are accepted by the government, education institutions, and corporates.",
    buttonText: "Get Degree",
    image: "/assets/all_universities_images/uu/sample-degree-uttarancha1.webp",
  },

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
      themeColor: "#22c55e",
      borderColor: "#22c55e",
      cardBg: "#f0fdf4",
    },
    {
      num: 5,
      title: "Document Submit",
      desc: "You need to upload all the required verified documents.",
      themeColor: "#9333ea",
      borderColor: "#9333ea",
      cardBg: "#faf5ff",
    },
    {
      num: 6,
      title: "Admission Confirm",
      desc: "Get Confirmation on your Email & Whatsapp",
      themeColor: "#f97316",
      borderColor: "#f97316",
      cardBg: "#fff8f0",
    },
  ],

  faqs: [
    {
      q: "When did Online UU, under which Act, come into existence?",
      a: "Uttaranchal University online was established under Act No. 11 of 2013 and established in 2013.",
    },
    {
      q: "Is Uttaranchal University's online fee affordable for students?",
      a: "Yes, the fee for Uttaranchal University online is affordable for the students and learners. Up to 30% in scholarships are available for online UU early admissions.",
    },
    {
      q: "Where is the Online UU situated?",
      a: "Uttaranchal University is located in the capital of Uttarakhand, Dehradun, India.",
    },
    {
      q: "Is the Online UU degree valid?",
      a: "Yes, Uttaranchal University's online degree is valid. Uttaranchal University online holds recognition from UGC AND NAAC grade A+.",
    },
    {
      q: "How can a student get more information about Online UU?",
      a: "Learners can check the official website portal or visit DistanceEducationSchool.com",
    },
  ],
};
