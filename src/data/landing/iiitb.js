import React from "react";
import Image from "next/image";

/**
 * Systematic Custom CSS for IIIT Bangalore Online Courses Landing Page
 * Scoped precisely to .landing-page--iiitb
 * Reference: https://distanceeducationschool.com/iiitb/
 */
export const iiitbCustomCss = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Anton&display=swap');

  .landing-page--iiitb {
    font-family: 'Montserrat', sans-serif !important;
    scroll-behavior: smooth;
    color: #111111;
    background-color: #ffffff;
  }

  .landing-page--iiitb header.navbar {
    background: #ffffff !important;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.08) !important;
  }

  .landing-page--iiitb .header_menu_list li a {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 600 !important;
    font-size: 14.5px !important;
    color: #111111 !important;
    text-decoration: none !important;
    transition: color 0.2s ease !important;
  }

  .landing-page--iiitb .header_menu_list li a:hover {
    color: #01519a !important;
  }

  /* Navbar Button Removal */
  .landing-page--iiitb header.navbar .header_heading button,
  .landing-page--iiitb header.navbar .header_heading > div {
    display: none !important;
  }

  /* Hero Section */
  .landing-page--iiitb #hero {
    background-image: url(/assets/all_universities_images/iiitb/iiitb_desktop_new_bg.png) !important;
    background-size: cover !important;
    background-position: center top !important;
    background-repeat: no-repeat !important;
    padding: 30px 15px !important;
    min-height: auto !important;
    position: relative !important;
  }

  @media (max-width: 768px) {
    .landing-page--iiitb #hero {
      background-image: url(/assets/all_universities_images/iiitb/mobile_new_bg_main.png) !important;
      background-position: center top !important;
      background-size: 100% auto !important;
      padding: 16px 12px 30px !important;
    }

    .landing-page--iiitb .hero-info-col {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      text-align: center !important;
      width: 100% !important;
      max-width: 100% !important;
    }

    .landing-page--iiitb .hero-desktop-logo {
      display: none !important;
    }

    .landing-page--iiitb .hero-eyebrow-text {
      text-align: center !important;
      font-size: 18px !important;
      line-height: 1.35 !important;
      margin-bottom: 4px !important;
      color: #000000 !important;
    }

    .landing-page--iiitb #hero h1,
    .landing-page--iiitb #hero h1 span {
      font-size: 46px !important;
      text-align: center !important;
      line-height: 1.05 !important;
      color: #004792 !important;
      margin: 4px 0 6px !important;
    }

    .landing-page--iiitb .hero-byline-text {
      text-align: center !important;
      font-size: 15px !important;
      margin-bottom: 8px !important;
    }

    .landing-page--iiitb .banner_lists {
      margin: 4px auto 10px !important;
      width: fit-content !important;
    }

    .landing-page--iiitb .banner_lists ul {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 4px !important;
    }

    .landing-page--iiitb .hero-brochure-btn {
      display: none !important;
    }

    .landing-page--iiitb .hero-mobile-image-wrapper {
      width: calc(100% + 24px) !important;
      margin-left: -12px !important;
      margin-right: -12px !important;
      height: 380px !important;
      margin-bottom: -50px !important;
      position: relative !important;
      z-index: 10 !important;
    }

    .landing-page--iiitb .hero-form-col {
      width: 100% !important;
      align-items: center !important;
      z-index: 20 !important;
      position: relative !important;
    }

    .landing-page--iiitb .hero-form-col .landing-card,
    .landing-page--iiitb .hero-form-col .landing-lead-card {
      width: 100% !important;
      max-width: 360px !important;
      border-radius: 14px !important;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
      background: #ffffff !important;
    }
  }

  /* Approvals Section */
  .landing-page--iiitb .accreditation-section {
    background: #2b2b2b !important;
    color: #ffffff !important;
  }

  /* Courses Offered Section */
  .landing-page--iiitb .courses-section {
    background: #f9fafb !important;
  }
  .landing-page--iiitb .section-title {
    color: #003b6f !important;
    font-size: 32px !important;
    font-weight: 800 !important;
  }
  .landing-page--iiitb .course-card {
    background: #ffffff !important;
    border-radius: 14px !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08) !important;
    transition: transform 0.3s ease, box-shadow 0.3s ease !important;
  }
  .landing-page--iiitb .course-card:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12) !important;
  }
  .landing-page--iiitb .course-card .course-actions {
    display: flex !important;
    gap: 10px !important;
    padding: 0 16px 18px 16px !important;
  }
  .landing-page--iiitb .course-card .btn.brochure {
    background-color: #01519a !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    font-size: 13px !important;
    border-radius: 8px !important;
    height: 42px !important;
    white-space: nowrap !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
  }
  .landing-page--iiitb .course-card .btn.brochure:hover {
    background-color: #003f7a !important;
  }
  .landing-page--iiitb .course-card .btn.brochure svg {
    color: #ffffff !important;
    fill: #ffffff !important;
  }
  .landing-page--iiitb .course-card .btn.apply {
    background-color: #00284d !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    font-size: 13px !important;
    border-radius: 8px !important;
    height: 42px !important;
    white-space: nowrap !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  .landing-page--iiitb .course-card .btn.apply:hover {
    background-color: #001c38 !important;
  }

  /* About Section */
  .landing-page--iiitb .about-section {
    background: #005a8d !important;
    color: #ffffff !important;
  }

  /* Why Choose Section */
  .landing-page--iiitb .why-card.dark {
    background: #1b355e !important;
  }
  .landing-page--iiitb .why-card.light {
    background: #1f9acb !important;
  }

  /* Stats / Highlights */
  .landing-page--iiitb .HighLights {
    background-color: #2b2b2b !important;
    color: #ffffff !important;
  }

  /* Certificate Slider Section */
  .landing-page--iiitb .certificate-slider-section {
    background-color: #f5f5f5 !important;
  }
  .landing-page--iiitb .certificate-content h2 {
    color: #005382 !important;
  }
  .landing-page--iiitb .get-degree-btn {
    background-color: #005382 !important;
    color: #ffffff !important;
  }

  /* Apply Steps */
  .landing-page--iiitb .apply-section {
    background: #ffffff !important;
  }
  .landing-page--iiitb .apply-section h2 {
    color: #193579 !important;
  }

  /* FAQ */
  .landing-page--iiitb .faq-header h2 {
    color: #005382 !important;
  }

  /* CTA Strip */
  .landing-page--iiitb .cta-strip {
    background: #005a8d !important;
  }

  /* Compare Section */
  .landing-page--iiitb .compare_box {
    background: #005a8d !important;
  }

  /* Footer Bottom */
  .landing-page--iiitb .mini-footer-bottom {
    background: #0b3c66 !important;
  }

  /* ── IIITB MOBILE RESPONSIVE ── */
  @media (max-width: 768px) {
    .landing-page--iiitb #hero {
      background-image: url(/assets/all_universities_images/iiitb/mobile_new_bg_main.png) !important;
      background-size: 100% auto !important;
      background-position: center top !important;
      padding: 16px 12px 35px !important;
    }

    /* Left info column centered on mobile */
    .landing-page--iiitb .hero-info-col {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      text-align: center !important;
      width: 100% !important;
      max-width: 100% !important;
    }

    .landing-page--iiitb .hero-desktop-logo {
      display: none !important;
    }

    .landing-page--iiitb .hero-eyebrow-text {
      font-size: 17px !important;
      font-weight: 700 !important;
      color: #000000 !important;
      text-align: center !important;
      line-height: 1.25 !important;
      margin: 2px 0 6px !important;
    }

    .landing-page--iiitb #hero h1,
    .landing-page--iiitb #hero h1 span {
      font-family: 'Anton', sans-serif !important;
      font-size: 44px !important;
      color: #01519a !important;
      text-align: center !important;
      line-height: 1.12 !important;
      margin: 4px 0 6px !important;
    }

    .landing-page--iiitb .hero-byline-text {
      text-align: center !important;
      font-size: 15px !important;
      font-weight: 600 !important;
      color: #000000 !important;
      margin: 4px 0 10px !important;
    }

    .landing-page--iiitb .banner_lists {
      margin: 0 auto 10px !important;
      text-align: center !important;
      width: fit-content !important;
    }

    .landing-page--iiitb .banner_lists ul li {
      justify-content: flex-start !important;
      font-size: 14.5px !important;
      font-weight: 700 !important;
      font-style: italic !important;
      color: #000000 !important;
    }

    .landing-page--iiitb .hero-mobile-logo {
      display: flex !important;
      justify-content: center !important;
      margin: 12px auto 16px !important;
      width: 250px !important;
    }

    /* Hide hero brochure button on mobile */
    .landing-page--iiitb .hero-brochure-btn {
      display: none !important;
    }

    /* Building image full-width on mobile */
    .landing-page--iiitb .hero-mobile-image-wrapper {
      width: calc(100% + 24px) !important;
      margin-left: -12px !important;
      margin-right: -12px !important;
      height: 250px !important;
      margin-bottom: -32px !important;
      position: relative !important;
      z-index: 10 !important;
    }

    /* Form card slightly overlapping building image */
    .landing-page--iiitb .hero-form-col {
      width: 100% !important;
      align-items: center !important;
      z-index: 20 !important;
      position: relative !important;
    }

    .landing-page--iiitb .hero-form-col .landing-card {
      width: 100% !important;
      max-width: 360px !important;
      border-radius: 12px !important;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
      background: #ffffff !important;
    }

    /* Accreditation: stack left-right on mobile matching Image 3 */
    .landing-page--iiitb .accreditation-section {
      background-color: #2b2b2b !important;
      padding: 32px 16px !important;
    }
    .landing-page--iiitb .accreditation-container {
      display: flex !important;
      flex-direction: column !important;
      gap: 20px !important;
    }
    .landing-page--iiitb .accreditation-left {
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
      gap: 16px !important;
      text-align: left !important;
      margin-bottom: 6px !important;
    }
    .landing-page--iiitb .accreditation-left .trophy {
      width: 90px !important;
      height: 90px !important;
    }
    .landing-page--iiitb .accreditation-left h2 {
      font-size: 24px !important;
      font-weight: 800 !important;
      color: #ffffff !important;
      line-height: 1.15 !important;
    }
    .landing-page--iiitb .accreditation-grid {
      display: flex !important;
      flex-direction: column !important;
      gap: 18px !important;
    }
    .landing-page--iiitb .accreditation-item {
      display: flex !important;
      align-items: center !important;
      gap: 16px !important;
    }
    .landing-page--iiitb .accreditation-item > div:first-child {
      width: 64px !important;
      height: 64px !important;
      min-width: 64px !important;
      background: #ffffff !important;
      border-radius: 50% !important;
      padding: 6px !important;
    }
    .landing-page--iiitb .accreditation-item-content h4 {
      color: #ffffff !important;
      font-size: 17px !important;
      font-weight: 700 !important;
      margin: 0 0 3px 0 !important;
    }
    .landing-page--iiitb .accreditation-item-content p {
      color: #cccccc !important;
      font-size: 12.5px !important;
      line-height: 1.45 !important;
      margin: 0 !important;
    }

    /* Courses section: 1-col cards on phone matching Image 4 */
    .landing-page--iiitb .courses-section {
      padding: 35px 16px !important;
      background: #ffffff !important;
    }
    .landing-page--iiitb .section-title {
      font-size: 28px !important;
      font-weight: 800 !important;
      color: #003b6f !important;
      text-align: center !important;
    }
    .landing-page--iiitb .section-subtitle {
      font-size: 14px !important;
      color: #666666 !important;
      text-align: center !important;
      margin-top: 4px !important;
    }
    .landing-page--iiitb .courses-grid {
      display: flex !important;
      flex-direction: column !important;
      gap: 22px !important;
    }
    .landing-page--iiitb .course-card {
      border-radius: 14px !important;
      border: 1px solid #eef0f3 !important;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.07) !important;
      overflow: hidden !important;
    }
    .landing-page--iiitb .course-card .course-img {
      height: 170px !important;
    }
    .landing-page--iiitb .course-card h3 {
      font-size: 17px !important;
      font-weight: 800 !important;
      color: #111111 !important;
      line-height: 1.3 !important;
    }
    .landing-page--iiitb .course-card .duration_list {
      color: #222222 !important;
      font-size: 13.5px !important;
      font-weight: 600 !important;
    }
    .landing-page--iiitb .course-card .course-desc {
      color: #555555 !important;
      font-size: 13px !important;
      line-height: 1.5 !important;
    }
    .landing-page--iiitb .course-card .course-actions {
      padding: 0 16px 18px 16px !important;
    }
    .landing-page--iiitb .course-card .btn.brochure {
      display: none !important;
    }
    .landing-page--iiitb .course-card .btn.apply {
      width: 100% !important;
      background: #01519a !important;
      color: #ffffff !important;
      font-size: 14px !important;
      font-weight: 700 !important;
      height: 44px !important;
      border-radius: 6px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    /* About Section matching Image 5 */
    .landing-page--iiitb .about-section {
      background: #005a8d !important;
      padding: 30px 16px 40px !important;
    }
    .landing-page--iiitb .about-container {
      display: flex !important;
      flex-direction: column !important;
      gap: 18px !important;
    }
    .landing-page--iiitb .about-image {
      width: 100% !important;
    }
    .landing-page--iiitb .about-image > div {
      width: 100% !important;
      max-width: 100% !important;
      height: 250px !important;
      border-radius: 6px !important;
    }
    .landing-page--iiitb .about-content h2 {
      font-size: 26px !important;
      font-weight: 800 !important;
      color: #ffffff !important;
      line-height: 1.2 !important;
    }
    .landing-page--iiitb .about-content .underline {
      display: block !important;
      width: 100% !important;
      height: 2px !important;
      background: #ffffff !important;
      margin: 12px 0 16px !important;
    }
    .landing-page--iiitb .about-content p {
      color: #ffffff !important;
      font-size: 13.5px !important;
      line-height: 1.6 !important;
    }
    .landing-page--iiitb .about-actions {
      display: none !important;
    }

    /* Why Choose: cards 1-col on phone */
    .landing-page--iiitb .why-section {
      padding: 36px 12px !important;
    }
    .landing-page--iiitb .why-section h2 {
      font-size: 22px !important;
    }
    .landing-page--iiitb .why-grid {
      grid-template-columns: 1fr !important;
    }
    .landing-page--iiitb .why-card {
      padding: 24px 16px !important;
    }

    /* Stats / Highlights: 2-col grid on phone */
    .landing-page--iiitb .HighLights {
      padding: 28px 12px !important;
    }
    .landing-page--iiitb .HighLights .flex {
      flex-wrap: wrap !important;
      justify-content: center !important;
      gap: 16px !important;
    }
    .landing-page--iiitb .HighLights .flex > div {
      flex: 0 0 calc(50% - 10px) !important;
      text-align: center !important;
    }

    /* Certificate / Degree Slider */
    .landing-page--iiitb .certificate-slider-section {
      padding: 36px 16px !important;
    }
    .landing-page--iiitb .certificate-content h2 {
      font-size: 20px !important;
    }
    .landing-page--iiitb .get-degree-btn {
      width: 100% !important;
    }

    /* Apply Steps */
    .landing-page--iiitb .apply-section {
      padding: 36px 12px !important;
    }
    .landing-page--iiitb .apply-section h2 {
      font-size: 20px !important;
    }

    /* FAQ */
    .landing-page--iiitb .faq-header {
      padding: 0 12px !important;
    }
    .landing-page--iiitb .faq-header h2 {
      font-size: 20px !important;
    }
  }
`;

export const iiitbData = {
  slug: "iiitb",
  meta: {
    title: "IIIT Bangalore Online Courses | IIIT Bangalore Online AI Course & PG Programs",
    description:
      "IIIT Bangalore online courses and IIIT Bangalore online PG courses in Data Science, AI, and Machine Learning. Explore IIIT Bangalore online masters, certificate courses, IIIT Bangalore online admission, and IIIT Bangalore online AI course details.",
    keywords:
      "IIIT Bangalore Online Courses, IIIT Bangalore AI Course, IIIT Bangalore Data Science, IIITB Online PG, IIIT Bangalore upGrad, IIIT Bangalore Masters Online",
    canonicalUrl: "https://distanceeducationschool.com/iiitb/",
    openGraph: {
      title: "IIIT Bangalore Online Courses | IIIT Bangalore Online AI Course & PG Programs",
      description:
        "Build Leadership quality with AI Generative courses from IIIT Bangalore Online Courses via upGrad.",
      url: "https://distanceeducationschool.com/iiitb/",
      siteName: "Distance Education School",
      images: [
        {
          url: "https://distanceeducationschool.com/assets/all_universities_images/iiitb/iiitb_new_logo_main.png",
          width: 800,
          height: 600,
          alt: "IIIT Bangalore Online Courses",
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: "https://distanceeducationschool.com/iiitb/",
    },
  },
  customCss: iiitbCustomCss,

  // Brand Configuration
  brand: {
    name: "IIIT Bangalore",
    slug: "iiitb",
    primaryColor: "#002147",
    themeColor: "#005382",
    accentColor: "#F1BA00",
    fontFamily: "Montserrat",
    showSodeLogo: true,
    sodeIcon: "/assets/all_universities_images/iiitb/new_sode_tm_logo.png",
    hideMangLogo: true,
    showCouponBtn: false,
    showCouponButton: false,
    hideNavbarBadge: true,
    sodeLogoContainerStyle: {
      width: "180px",
      height: "56px",
      minWidth: "140px",
    },
    callGif: "/assets/all_universities_images/iiitb/call_icon.gif",
    giftGif: "/assets/all_universities_images/iiitb/gift.gif",

    navLinks: [
      { label: "Courses", href: "#main-courses" },
      { label: "Approvals", href: "#approvals" },
      { label: "About", href: "#about-section" },
      { label: "FAQ", href: "#faqs" },
    ],

    sectionOrder: [
      "approvals",
      "programmes",
      "about",
      "whyChoose",
      "stats",
      "degree",
      "admissionProcess",
      "faqs",
      "ctaStrip",
      "compareBanner",
    ],

    // Hero Section Configuration
    hero: {
      backgroundImage: "/assets/all_universities_images/iiitb/iiitb_desktop_new_bg.png",
      mobileBackgroundImage: "/assets/all_universities_images/iiitb/mobile_new_bg_main.png",
      mobileStudentImage: "/assets/all_universities_images/iiitb/iiitb_mobile_new_img.png",
      noOverlay: true,
      minHeight: "500px",

      welcomeText: (
        <div className="hero-welcome-wrapper mb-2">
          <div className="hero-desktop-logo hidden sm:block mb-3">
            <Image
              src="/assets/all_universities_images/iiitb/iiitb_new_logo_main.png"
              alt="IIIT Bangalore"
              width={200}
              height={55}
              className="w-[180px] sm:w-[200px] h-auto object-contain"
              priority
            />
          </div>
          <h2 className="hero-eyebrow-text text-[17px] sm:text-[20px] font-bold text-black m-0 leading-snug">
            Build Leadership quality<br /> with AI Generative courses from
          </h2>
        </div>
      ),
      welcomeContainerClassName: "!mb-1 !mt-0 w-full",
      welcomeBadgeClassName: "!bg-transparent !p-0 !min-w-0 !shadow-none !border-none !rounded-none !block",

      headlineText: "IIIT Bangalore\nOnline Courses",
      headingFont: "'Anton', sans-serif",
      headingColor: "#01519a",
      headlineColor: "#01519a",
      headingClassName: "!whitespace-pre-line !leading-[1.15] font-normal !text-[#01519a] !text-[40px] sm:!text-[52px]",
      headingStyle: {
        fontFamily: "'Anton', sans-serif",
        color: "#01519a",
        fontSize: "52px",
        lineHeight: "1.15",
        fontWeight: "500",
        marginTop: "6px",
        marginBottom: "6px",
        letterSpacing: "0.5px",
      },

      taglineText: (
        <span key="iiitb-tagline" className="hero-byline-text text-[15px] sm:text-[15.5px] font-semibold text-black block">
          By <span key="iiitb-inst" className="underline">IIIT Bangalore</span> via{" "}
          <span key="iiitb-partner" className="underline">upGrad</span>
        </span>
      ),
      taglineStyle: {
        fontFamily: "'Montserrat', sans-serif",
        color: "#000000",
        fontSize: "15.5px",
        fontWeight: "600",
        lineHeight: "1.3",
        marginTop: "4px",
        marginBottom: "10px",
      },

      coursesStripOnly: true,
      coursesStrip: [
        <div key="iiitb-checklist-wrap" className="w-full flex flex-col items-center sm:items-start">
          <div className="banner_lists text-left my-1.5 sm:my-2">
            <ul className="space-y-1.5 p-0 m-0 list-none font-semibold italic text-black text-[13.5px] sm:text-[14.5px]">
              <li key="naac" className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#00cc00] shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span key="naac-text">NAAC A+ accredited</span>
              </li>
              <li key="cert" className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#00cc00] shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span key="cert-text">6+ Certification courses</span>
              </li>
              <li key="collab" className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#00cc00] shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span key="collab-text">Partnership of IIIT &amp; IIM Udaipur</span>
              </li>
              <li key="duration" className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#00cc00] shrink-0 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span key="dur-text">5-14 Months</span>
              </li>
            </ul>
          </div>
        </div>,
      ],

      brochureButtonText: "Download Brochure",
      buttonStyle: {
        fontFamily: "'Montserrat', sans-serif",
        background: "#01519a",
        backgroundColor: "#01519a",
        color: "#ffffff",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "700",
        padding: "10px 24px",
      },

      cardStyle: "white",
      formBackground: "#ffffff",
      formCardType: "white",
      enquireTitle: "Enquire Now",
      enquireSubtitle: "Academic Experts will assist you!",
      enquireColor: "#004792",
      enquireSubtitleColor: "#333333",
      showDividerBelowSubtitle: true,
      showPhoneBadge: false,
      namePlaceholder: "Enter Name",
      phoneBeforeEmail: true,
      hideTermsCheckbox: true,
      phoneBadgeBg: "#004792",
      phoneBadgeBackground: "#004792",
      phoneBadgeStyle: {
        background: "#004792",
        backgroundColor: "#004792",
        color: "#ffffff",
        borderRadius: "9999px",
        padding: "3px 14px",
        fontSize: "12px",
      },
      submitBtnBg: "#004792",
      submitButtonBackground: "#004792",
      submitButtonRadius: "4px",
      submitButtonTextColor: "#ffffff",
    },

    // Approvals Layout
    approvalsLayout: "iiitb",
    approvalsTrophyImage: "/assets/all_universities_images/iiitb/award-icon.webp",

    // Programmes Layout
    programmesLayout: "iiitb",
    programmesTitle: "Courses Offered",
    programmesSubtitle: "By IIIT Bangalore",

    // About Layout
    aboutLayout: "iiitb",
    campusImage: "/assets/all_universities_images/iiitb/iiit-b-about-image.webp",

    // Why Choose Layout
    whyChooseLayout: "iiitb",
    whyChooseTitle: "WHY CHOOSE?",
    whyChooseSubtitle: "IIIT Bangalore Online Courses",

    // Stats Layout
    statsLayout: "iiitb",

    // Degree Layout
    degreeLayout: "iiitb",

    // Admission Process
    admissionProcessId: "apply-steps",
    admissionTitle: "How to Apply for IIIT Bangalore University Online Courses",
    admissionSubtitle:
      "Students can easily enrol in IIIT Bangalore University Online courses. Candidates can conveniently apply by selecting their desired program. Follow these steps to secure admission in the university.",

    // FAQ Layout
    faqLayout: "ggu",
    faqTitle: "FAQ-Frequently Asked Question",
    faqAccentColor: "#005382",
    faqDefaultOpenIndex: 0,

    // CTA Strip
    ctaStripTitle: "Need clarification?",
    ctaStripSubtitle: "Interact with experts, Get free consultation.",
    ctaStripBtnText: "Talk to Experts",

    // Compare Banner
    compareBannerBg: "#005a8d",
    compareUniversityName: "IIIT Bangalore University",
    compareSubtitle: "Compare IIIT Bangalore University with Top UGC-DEB Approved Universities",
    compareSectionBg: "bg-white",
    arrowGif: "/assets/all_universities_images/iiitb/arrow.gif",

    // Footer
    footerLogo: "/assets/all_universities_images/iiitb/new-des-logo.webp",
    footerSectionBg: "bg-white",
    footerBottomBg: "#0b3c66",

    // CTAs
    phone: "tel:07065777755",
    phoneDisplay: "+91 7065 7777 55",
    whatsappNumber: "917065777755",
    whatsappText: "I want to download the IIIT Bangalore Online Program brochure",
  },

  // Courses list for Lead Form Dropdown
  courses: [
    {
      label: "Executive Programme in Generative AI for Leaders",
      value: "Executive Programme in Generative AI for Leaders",
    },
    {
      label: "Executive Post Graduate Certificate Programme in Data Science & AI",
      value: "Executive Post Graduate Certificate Programme in Data Science & AI",
    },
    {
      label: "Professional Certificate Programme in Data Science with Generative AI",
      value: "Professional Certificate Programme in Data Science with Generative AI",
    },
    {
      label: "Executive Post Graduate Programme in Applied AI and Agentic AI",
      value: "Executive Post Graduate Programme in Applied AI and Agentic AI",
    },
    {
      label: "Executive Diploma in Machine Learning & Artificial Intelligence",
      value: "Executive Diploma in Machine Learning & Artificial Intelligence",
    },
    {
      label: "Chief Technology Officer & AI Leadership Programme",
      value: "Chief Technology Officer & AI Leadership Programme",
    },
    {
      label: "Master of Science in Machine Learning & Artificial Intelligence",
      value: "Master of Science in Machine Learning & Artificial Intelligence",
    },
    {
      label: "Master of Science in Data Science Now integrated with Generative AI",
      value: "Master of Science in Data Science Now integrated with Generative AI",
    },
  ],

  // Approvals & Accreditation
  approvals: [
    {
      title: "NAAC A+",
      image: "/assets/all_universities_images/iiitb/naac-a-iiit.webp",
      description:
        "The IIIT Bangalore certificate courses have an A+ grade, which proves that the institute offers quality learning outcomes for professionals.",
    },
    {
      title: "UGC",
      image: "/assets/all_universities_images/iiitb/ugc-iiit.webp",
      description:
        "This recognition confirms the institute's credibility and supports trust in online credentials.",
    },
    {
      title: "AICTE",
      image: "/assets/all_universities_images/iiitb/aicte-iiit.webp",
      description:
        "It makes sure that the course is industry-aligned with curriculum standards, technical rigour, and value.",
    },
    {
      title: "AACSB",
      image: "/assets/all_universities_images/iiitb/AACSB.webp",
      description:
        "The approval association signals a global business-quality benchmark, strengthening leadership and learning value.",
    },
  ],

  // 8 Courses Offered
  programmes: [
    {
      id: "course-1",
      title: "Executive Programme in Generative AI for Leaders",
      duration: "20 weeks",
      image: "/assets/all_universities_images/iiitb/course-1.webp",
      description:
        "IIIT Bangalore online courses help leaders learn GenAI strategy and adoption using the A.D.A.P.T. Framework, with real business use cases, a capstone, and executive-level outcomes.",
    },
    {
      id: "course-2",
      title: "Executive Post Graduate Certificate Programme in Data Science & AI",
      duration: "25 weeks",
      image: "/assets/all_universities_images/iiitb/course-2.webp",
      description:
        "IIIT Bangalore online courses build skills in IIIT Bangalore data science and IIIT Bangalore artificial intelligence through statistics, ML, deep learning, projects, and mentorship.",
    },
    {
      id: "course-3",
      title: "Professional Certificate Programme in Data Science with Generative AI",
      duration: "24 weeks",
      image: "/assets/all_universities_images/iiitb/course-3.webp",
      description:
        "IIIT Bangalore online courses deliver an IIIT Bangalore data science course in analytics, ML pipelines, and GenAI, with labs, real datasets, hands-on projects, and portfolio support.",
    },
    {
      id: "course-4",
      title: "Executive Post Graduate Programme in Applied AI and Agentic AI",
      duration: "30 weeks",
      image: "/assets/all_universities_images/iiitb/course-4.webp",
      description:
        "IIIT Bangalore certification courses cover applied AI, agents, RAG, and automation, strengthening IIIT Bangalore's artificial intelligence skills through assignments.",
    },
    {
      id: "course-5",
      title: "Executive Diploma in Machine Learning & Artificial Intelligence",
      duration: "28 weeks",
      image: "/assets/all_universities_images/iiitb/course-5.webp",
      description:
        "IIIT Bangalore's online courses offer advanced ML, MLOps, deep learning, and GenAI modules, making them ideal certification courses for working professionals who are seeking strong career growth in their professional journey.",
    },
    {
      id: "course-6",
      title: "Chief Technology Officer & AI Leadership Programme",
      duration: "24 weeks",
      image: "/assets/all_universities_images/iiitb/iiim-udaipur.webp",
      description:
        "Powered by IIM Udaipur, the online course offer detail skills on CTO AI leadership in DBA, covering tech strategy, governance. The IIM Udaipur artificial intelligence offers a skill to prepare student future leadership.",
    },
    {
      id: "course-7",
      title: "Master of Science in Machine Learning & Artificial Intelligence",
      duration: "28 weeks",
      image: "/assets/all_universities_images/iiitb/new-image1.webp",
      description:
        "IIIT Bangalore's MS in Machine Learning & AI offers double accreditation (IIIT Bangalore + LJMU, UK) covering advanced ML, deep learning, and Generative AI with 80+ tools. Ideal for working professionals seeking career growth, achieving up to 433% salary hikes.",
    },
    {
      id: "course-8",
      title: "Master of Science in Data Science Now integrated with Generative AI",
      duration: "28 weeks",
      image: "/assets/all_universities_images/iiitb/new-image2.webp",
      description:
        "LJMU MSc Data Science (upGrad & IIITB): 18-21 months online, GenAI with MLOps, 100+ tools, Data Analysis/Engineering tracks, bootcamp-to-dissertation, Hands-on Learning with 30+ Domain-Focused Assignments and Case Studies.",
    },
  ],

  // About Section
  about: {
    title: "About IIIT Bangalore \nOnline Courses",
    image: "/assets/all_universities_images/iiitb/iiit-b-about-image.webp",
    paragraphs: [
      "IIIT Bangalore is a premier technology institute established in 1998, known for industry-focused education and strong academic depth. Its IIIT Bangalore online courses are designed for working professionals, combining academic rigor with real-world application. The institute offers carefully structured IIIT Bangalore certification courses in emerging technology domains, supported by expert faculty and industry mentors. Learners gain practical exposure through projects, case studies, and capstones that align skills with current business and technology needs.",
    ],
  },

  // Why Choose Section (6 cards)
  whyChoose: [
    {
      title: "Premier institute credibility",
      image: "/assets/all_universities_images/iiitb/premier-institute-credibility-iiitb.webp",
      description:
        "With strong academic standards and industry trust, IIIT Bangalore online courses deliver learning that carries real value in hiring and career growth.",
    },
    {
      title: "Future-ready AI learning",
      image: "/assets/all_universities_images/iiitb/future-ready-ai-learning.webp",
      description:
        "The curriculum is built around practical outcomes in iiit bangalore artificial intelligence, helping professionals work confidently with real AI tools and use cases.",
    },
    {
      title: "Strong Data Science foundation",
      image: "/assets/all_universities_images/iiitb/strong-data-science.webp",
      description:
        "Programs at IIIT Bangalorefocus on statistics, ML models, business insights, and projects that build job-ready skills.",
    },
    {
      title: "Certification advantage",
      image: "/assets/all_universities_images/iiitb/certificate-iiitb.webp",
      description:
        "These are structured IIIT Bangalore certification courses designed for professionals who want credible credentials with applied training, not just theory.",
    },
    {
      title: "Leadership edge with partner institute",
      image: "/assets/all_universities_images/iiitb/leadership-edge-with-partner.webp",
      description:
        "The CTO leadership track includes IIM Udaipur artificial intelligence coverage, combining tech strategy and AI decision-making for senior roles.",
    },
    {
      title: "Hands-on learning approach",
      image: "/assets/all_universities_images/iiitb/hands-on-learning-approach.webp",
      description:
        "Across multiple tracks, IIIT Bangalore online courses include projects, labs, and capstones, and all online IIIT Bangalore courses are integrated and career-focused.",
    },
  ],

  // Stats / Highlights (4 items)
  stats: [
    {
      value: "10+",
      label: "Years of Experience",
    },
    {
      value: "30k+",
      label: "Learner",
    },
    {
      value: "15+",
      label: "Assignment & Case Studies",
    },
    {
      value: "30+",
      label: "Tools",
    },
  ],

  // Sample Degree / Certificate
  degreeInfo: {
    title: "Sample Post \n Graduate Certificate",
    image: "/assets/all_universities_images/iiitb/sample-certificate.webp",
    description:
      "The students who have completed their IIIT Bangalore Online courses will receive two certificates from Microsoft. The student gets to learn multiple tools, which will allow them to get the upgrade they need in their professional journey. IIIT Bangalore also offers special IIM Udaipur artificial intelligence courses that allow students to earn a dual degree.",
    buttonText: "Get Degree",
  },

  // 6 Steps Admission Process
  admissionSteps: [
    {
      num: 1,
      title: "Submit Form",
      desc: "Fill in and submit your application form online",
      themeColor: "#ff8c32",
      borderColor: "#ff8c32",
      cardBg: "#fff4e9",
    },
    {
      num: 2,
      title: "Expert's Counseling",
      desc: "You will receive a call from our expert counselor",
      themeColor: "#0b5ed7",
      borderColor: "#0b5ed7",
      cardBg: "#f2f8ff",
    },
    {
      num: 3,
      title: "Choose University",
      desc: "Select the course & university according to your interest",
      themeColor: "#ff2d6f",
      borderColor: "#ff2d6f",
      cardBg: "#fff1f6",
    },
    {
      num: 4,
      title: "Online Payment",
      desc: "You need to make a smooth online fee submission",
      themeColor: "#1faa59",
      borderColor: "#1faa59",
      cardBg: "#effff5",
    },
    {
      num: 5,
      title: "Document Submit",
      desc: "You need to upload all the required verified documents.",
      themeColor: "#8e2de2",
      borderColor: "#8e2de2",
      cardBg: "#f9f0ff",
    },
    {
      num: 6,
      title: "Admission Confirm",
      desc: "Get Confirmation on your Email & Whatsapp",
      themeColor: "#ff8c32",
      borderColor: "#ff8c32",
      cardBg: "#fff4e9",
    },
  ],

  // FAQs
  faqs: [
    {
      q: "What are the IIIT Bangalore online courses?",
      a: "They are industry-focused online programmes from IIIT Bangalore, designed for working professionals with flexible learning, projects, and recognised certification.",
    },
    {
      q: "Do IIIT Bangalore certification courses help in career growth?",
      a: "Yes. These certifications add credibility, strengthen skills, and help professionals qualify for better roles in tech and management.",
    },
    {
      q: "Is IIIT bangalore artificial intelligence taught with practical training?",
      a: "Yes. The AI-focused programmes include real-world use cases, hands-on assignments, and capstone projects to build job-ready expertise.",
    },
    {
      q: "Do IIIT bangalore data science programmes include projects?",
      a: "Yes. Data Science programmes include applied projects, tool-based learning, and an industry-aligned curriculum for real-world analytics and ML problem-solving.",
    },
    {
      q: "Is IIM Udaipur artificial intelligence included in the CTO programme?",
      a: "Yes. The CTO & AI Leadership programme, offered in partnership with IIM Udaipur, covers AI leadership and decision-making modules.",
    },
  ],
};
