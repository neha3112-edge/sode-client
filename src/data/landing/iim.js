import React from "react";

/**
 * IIM Kozhikode (upGrad) HRM Analytics Landing Page Configuration & Embedded CSS
 * Pixel-perfect match to https://distanceeducationschool.com/iim/
 *
 * All image assets sourced strictly from:
 * /public/assets/all_universities_images/iim
 */

export const iimCustomCss = `
  /* =========================================================
     1. GOOGLE FONTS & SCOPED CSS VARIABLES
     ========================================================= */
  @import url("https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

  /* Scoped strictly to IIM landing page: navbar, footer, hero, cards, buttons, modals, and all text elements */
  .landing-page-root.landing-page--iim,
  .landing-page-root.landing-page--iim *,
  .landing-page-root.landing-page--iim *::before,
  .landing-page-root.landing-page--iim *::after,
  .landing-page--iim,
  .landing-page--iim *,
  .landing-page--iim *::before,
  .landing-page--iim *::after,
  .landing-page--iim header,
  .landing-page--iim footer,
  .landing-page--iim nav,
  .landing-page--iim button,
  .landing-page--iim input,
  .landing-page--iim select,
  .landing-page--iim textarea,
  .landing-page--iim a,
  .landing-page--iim p,
  .landing-page--iim span,
  .landing-page--iim h1,
  .landing-page--iim h2,
  .landing-page--iim h3,
  .landing-page--iim h4,
  .landing-page--iim h5,
  .landing-page--iim h6,
  .landing-page--iim li,
  .landing-page--iim .font-poppins,
  .landing-page--iim .font-roboto,
  .landing-page--iim .font-sans,
  .landing-page-root.landing-page--iim .font-poppins,
  .landing-page-root.landing-page--iim .font-roboto,
  .landing-page-root.landing-page--iim .font-sans {
    font-family: 'Montserrat', sans-serif !important;
  }

  .landing-page-root.landing-page--iim,
  .landing-page--iim {
    --primary-color: #17479E;
    --yellow-color: #FFCC00;
    --red-color: #FF0000;
    --doubt-bg-color: #FFF0B5;
    --light-orange: #FF9933;
    --faq-bg-color: #E8F2FF;
    --placement-bg: #F2F2F2;
    --sky-button: #0CB1EF;
    --text-white-color: #ffffff;
    --text-dark-color: #333333;
    --footer-color: #2B2146;
    --heading-color: #111111;
    --button-color: #17479E;
    --button-hover-color: #123980;

    font-family: 'Montserrat', sans-serif !important;
    scroll-behavior: smooth;
    color: #111111;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
  }

  .landing-page--iim .container {
    max-width: 1120px !important;
    margin: 0 auto !important;
    padding: 0  15px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .landing-page--iim .blue {
    color: #17479E !important;
  }

  .landing-page--iim .img-responsive {
    width: 100% !important;
    height: auto !important;
    display: block;
  }

  .landing-page--iim .downloadBrochureBtn,
  .landing-page--iim .enquireNowBtn {
    background: #0CB1EF !important;
    border: none !important;
    padding: 9px 20px !important;
    color: #ffffff !important;
    font-size: 15px !important;
    font-weight: 500 !important;
    border-radius: 25px !important;
    cursor: pointer !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
    transition: background 0.2s, transform 0.1s !important;
    text-decoration: none !important;
   box-shadow: none !important;
  }
  .landing-page--iim .downloadBrochureBtn:hover,
  .landing-page--iim .enquireNowBtn:hover {
    background: #099cd3 !important;
  }
  .landing-page--iim .downloadBrochureBtn:active,
  .landing-page--iim .enquireNowBtn:active {
    transform: scale(0.97) !important;
  }

  /* =========================================================
     2. NAVBAR (Global Landing Navbar Integration)
     ========================================================= */
  .landing-page--iim header {
    background: #ffffff !important;
    border-bottom: 1px solid #e5e7eb !important;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05) !important;
  }

.landing-page--iim .header_menu_list li a {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 17px !important;
  font-weight: 500 !important;
  color: #0b2340 !important;
  line-height: 1.5 !important;
  white-space: nowrap !important;
  transition: color 0.2s !important;
}
  
  .landing-page--iim .header_menu_list li a:hover {
    color: #17479E !important;
  }

  /* =========================================================
     3. HERO SECTION (#hero)
     ========================================================= */
 .landing-page--iim #hero {
  background-image: url("/assets/all_universities_images/iim/iim_desktop_new_img.png") !important;
  background-size: cover !important;
  background-position: center bottom !important;
  background-repeat: no-repeat !important;
  padding: 6px 0 36px 0 !important;
  margin: 0 !important;
  position: relative !important;
}

/* Hero bottom light-blue image */
.landing-page--iim #hero::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 16px;
  background-image: url("/assets/iim/new_iim_mobile_bg.png");
  background-size: 100% auto;
  background-position: center bottom;
  background-repeat: no-repeat;
  pointer-events: none;
  z-index: 0;
}

.landing-page--iim #hero > .container {
  position: relative;
  z-index: 1;
}

  .landing-page--iim #hero div[aria-hidden="true"],
  .landing-page--iim #hero div[style*="background-image"] {
    background-position: center -145px !important;
    background-position-y: -145px !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
  }

  @media only screen and (min-width: 1600px) {
    .landing-page--iim #hero div[aria-hidden="true"],
    .landing-page--iim #hero div[style*="background-image"] {
      background-position: center -180px !important;
      background-position-y: -180px !important;
    }
  }

  @media only screen and (max-width: 1250px) and (min-width: 1000px) {
    .landing-page--iim #hero div[aria-hidden="true"],
    .landing-page--iim #hero div[style*="background-image"] {
      background-position: center -95px !important;
      background-position-y: -95px !important;
    }
  }

  .landing-page--iim #hero .hero-grid {
    align-items: center !important;
  }

  .landing-page--iim #hero .hero-info-col {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    text-align: left !important;
    padding-right: 15px !important;
  }

  .landing-page--iim #hero .hero-logo-container {
    margin-bottom: 8px !important;
  }
  .landing-page--iim #hero .hero-logo-container img {
    width: 220px !important;
    height: auto !important;
    object-fit: contain !important;
    object-position: left center !important;
  }

  .landing-page--iim #hero h1 {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 44px !important;
    color: #17479E !important;
    font-weight: 800 !important;
    line-height: 1 !important;
    margin: 4px 0 8px 0 !important;
    letter-spacing: 0 !important;
    text-transform: none !important;
  }

  .landing-page--iim #hero .hero-tagline {
    font-size: 16px !important;
    font-weight: 600 !important;
    color: #000000 !important;
    margin: 0 0 12px 0 !important;
    line-height: 1.3 !important;
  }

  .landing-page--iim #hero .hero-tagline u,
  .landing-page--iim #hero .hero-tagline .underline {
    text-decoration: underline !important;
  }

  .landing-page--iim #hero .hero-description {
    font-size: 13.5px !important;
    color: #222222 !important;
    line-height: 1.10 !important;
    max-width: 290px !important;
    margin: 0 0 18px 0 !important;
  }

  .landing-page--iim #hero .hero-clock-badge {
    display: inline-flex !important;
    align-items: center !important;
    gap: 7px !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    color: #111111 !important;
    margin: 0 0 18px 0 !important;
  }

.landing-page--iim #hero button.ant-btn.hero-brochure-btn {
  background: #17479E !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 8px !important;

  font-size: 15px !important;
  font-weight: 600 !important;
  line-height: 1.2 !important;

  padding: 8px 16px !important;
  height: 38px !important;
  min-height: 0 !important;

  width: fit-content !important;
  min-width: 0 !important;
  max-width: none !important;

  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 6px !important;

  box-sizing: border-box !important;
  cursor: pointer !important;
}
  

  /* Hero Lead Form Styling */
  .landing-page--iim #hero .hero-form-col {
    display: flex !important;
    justify-content: flex-end !important;
  }

  .landing-page--iim #hero .landing-lead-form {
    border-radius: 16px !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12) !important;
    border: 1px solid rgba(0, 0, 0, 0.06) !important;
  }

  .landing-page--iim #hero .landing-lead-form h3 {
    color: #17479E !important;
    font-size: 24px !important;
    font-weight: 800 !important;
    margin: 0 0 4px 0 !important;
  }

  .landing-page--iim #hero .landing-lead-form .submit-btn,
  .landing-page--iim #hero .landing-lead-form button[type="submit"] {
    background: #17479E !important;
    color: #ffffff !important;
    border-radius: 6px !important;
    font-weight: 600 !important;
    font-size: 15px !important;
    height: 42px !important;
    border: none !important;
    transition: background 0.2s !important;
  }
  .landing-page--iim #hero .landing-lead-form .submit-btn:hover,
  .landing-page--iim #hero .landing-lead-form button[type="submit"]:hover {
    background: #123980 !important;
  }

  /* Hide disclaimer/terms checkbox in hero form for IIM */
  .landing-page--iim #hero .ant-form-item:has(input[type="checkbox"]),
  .landing-page--iim #hero .ant-form-item:has(.ant-checkbox-wrapper) {
    display: none !important;
  }

  /* Responsive Hero */
  @media only screen and (max-width: 999px) {
    .landing-page--iim #hero {
      padding: 20px 10px !important;
    }
    .landing-page--iim #hero div[aria-hidden="true"],
    .landing-page--iim #hero div[style*="background-image"] {
      background-position: center top !important;
      background-position-y: 0 !important;
    }
    .landing-page--iim #hero .hero-description {
      max-width: 480px !important;
      text-align: center !important;
      margin: 0 auto 14px auto !important;
    }
  }

  @media only screen and (max-width: 991px) {
    .landing-page--iim #hero h1 {
      font-size: 38px !important;
    }
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim #hero {
      background-image: url("/assets/all_universities_images/iim/new_iim_mobile_bg.png") !important;
      background-size: cover !important;
      background-position: center top !important;
      background-repeat: no-repeat !important;
      padding: 16px 0 40px 0 !important;
      margin: 0 !important;
      position: relative !important;
    }

    .landing-page--iim #hero::after {
  height: 45px;
  background-position: center bottom;
  background-size: cover;
}

    .landing-page--iim #hero div[aria-hidden="true"],
    .landing-page--iim #hero div[style*="background-image"] {
      background-position: center top !important;
      background-position-y: 0 !important;
      background-size: cover !important;
    }
    .landing-page--iim #hero .container,
    .landing-page--iim #hero [class*="LandingContainer"] {
      padding: 0 16px !important;
      max-width: 100% !important;
      min-height: auto !important;
    }
    .landing-page--iim #hero .hero-grid {
      padding: 0 !important;
      gap: 0 !important;
      flex-direction: column !important;
    }
    .landing-page--iim #hero .hero-info-col {
      text-align: center !important;
      align-items: center !important;
      padding: 0 10px !important;
      width: 100% !important;
    }
    .landing-page--iim #hero h1 {
      order: 1 !important;
      font-family: 'Anton', 'Montserrat', sans-serif !important;
      font-size: 38px !important;
      font-weight: 400 !important;
      color: #17479E !important;
      text-align: center !important;
      line-height: 1.15 !important;
      letter-spacing: 0.5px !important;
      margin: 2px 0 6px 0 !important;
      text-transform: none !important;
    }
    .landing-page--iim #hero .hero-tagline {
      order: 2 !important;
      text-align: center !important;
      font-size: 15px !important;
      font-weight: 600 !important;
      color: #000000 !important;
      margin: 0 0 8px 0 !important;
    }
    .landing-page--iim #hero .hero-tagline u,
    .landing-page--iim #hero .hero-tagline .underline {
      text-decoration: underline !important;
    }
    .landing-page--iim #hero .hero-description {
      order: 3 !important;
      text-align: center !important;
      font-size: 13px !important;
      line-height: 1.4 !important;
      color: #333333 !important;
      margin: 0 auto 8px auto !important;
      max-width: 340px !important;
    }
    .landing-page--iim #hero .hero-clock-badge {
      order: 4 !important;
      display: inline-flex !important;
      justify-content: center !important;
      align-items: center !important;
      font-size: 17px !important;
      font-weight: 700 !important;
      color: #111111 !important;
      margin: 0 auto 4px auto !important;
    }
    .landing-page--iim #hero .hero-logo-container {
      display: none !important;
    }
    .landing-page--iim #hero .hero-brochure-btn,
    .landing-page--iim #hero .hero-info-col .hero-brochure-btn {
      display: none !important;
    }

    /* Building & logos mobile image (edge-to-edge aspect ratio 800/526) */
    .landing-page--iim #hero .hero-form-col {
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      align-items: center !important;
    }
    .landing-page--iim #hero .hero-mobile-image-wrapper {
      display: block !important;
      position: relative !important;
      width: 100% !important;
      max-width: 380px !important;
      aspect-ratio: 800 / 526 !important;
      height: auto !important;
      margin: 4px auto 0 auto !important;
      padding: 0 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      background: transparent !important;
      overflow: visible !important;
    }
    .landing-page--iim #hero .hero-mobile-image-wrapper img {
      object-fit: contain !important;
      object-position: center bottom !important;
      width: 100% !important;
      height: 100% !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }

    /* Lead Form Card Mobile Overlap & Clean Look */
    .landing-page--iim #hero .landing-lead-card {
      position: relative !important;
      z-index: 10 !important;
      width: 100% !important;
      max-width: 350px !important;
      margin: -24px auto 0 auto !important;
      background: #ffffff !important;
      border-radius: 12px !important;
      box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.16) !important;
      border: none !important;
      padding: 18px 16px 14px 16px !important;
    }
    .landing-page--iim #hero .landing-lead-card .landing-lead-form {
      box-shadow: none !important;
      border: none !important;
      border-radius: 0 !important;
      padding: 0 !important;
      background: transparent !important;
    }
    .landing-page--iim #hero .landing-lead-card h3 {
      font-size: 21px !important;
      font-weight: 800 !important;
      color: #17479E !important;
      margin: 0 0 2px 0 !important;
      text-align: center !important;
    }
    .landing-page--iim #hero .landing-lead-card p {
      font-size: 12.5px !important;
      color: #444444 !important;
      margin: 0 0 8px 0 !important;
      text-align: center !important;
    }

    /* Form Fields Compact Spacing */
    .landing-page--iim #hero .landing-lead-card .ant-form-item {
      margin-bottom: 7px !important;
    }
    .landing-page--iim #hero .landing-lead-card input,
    .landing-page--iim #hero .landing-lead-card .ant-input,
    .landing-page--iim #hero .landing-lead-card .ant-select-selector {
      border: 1px solid #dcdcdc !important;
      border-radius: 5px !important;
      font-size: 12.5px !important;
      height: 38px !important;
    }
    .landing-page--iim #hero .landing-lead-card button[type="submit"] {
      height: 40px !important;
      background: #17479E !important;
      border-radius: 6px !important;
      font-size: 15px !important;
      font-weight: 700 !important;
      margin-top: 4px !important;
      margin-bottom: 0 !important;
    }
  }

  @media only screen and (max-width: 480px) {
    .landing-page--iim #hero h1 {
      font-size: 35px !important;
    }
    .landing-page--iim #hero .hero-tagline {
      font-size: 14.5px !important;
    }
    .landing-page--iim #hero .landing-lead-card {
      max-width: 335px !important;
      margin-top: -24px !important;
      padding: 16px 14px 14px 14px !important;
    }
  }


  /* =========================================================
     4. ACHIEVEMENT / STATS BAR (.achievement)
     ========================================================= */
  .landing-page--iim .achievement {
    background-color: #fce2adff !important;
    padding: 28px 70px 28px 0px !important;
    width: 100% !important;
    margin: 0 !important;
    box-sizing: border-box !important;
  }

  .landing-page--iim .ach {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 16px !important;
    max-width: 1140px !important;
    margin: 0 auto !important;
    align-items: center !important;
  }

  .landing-page--iim .ac1 {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 14px !important;
    text-align: left !important;
  }

  .landing-page--iim .ac1 img {
    width: 58px !important;
    height: 58px !important;
    border-radius: 50% !important;
    background-color: #ffffff !important;
    padding: 10px !important;
    object-fit: contain !important;
    flex-shrink: 0 !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06) !important;
  }

  .landing-page--iim .ac1 > div {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: flex-start !important;
  }

  .landing-page--iim .ach h3 {
    font-size: 32px !important;
    color: #17479E !important;
    margin: 0 0 2px 0 !important;
    font-weight: 800 !important;
    line-height: 1 !important;
    letter-spacing: -0.3px !important;
  }

  .landing-page--iim .ac1 p {
    font-weight: 600 !important;
    font-size: 14.5px !important;
    color: #111111 !important;
    margin: 0 !important;
    line-height: 1.2 !important;
    white-space: nowrap !important;
  }

  @media only screen and (max-width: 1199px) and (min-width: 992px) {
    .landing-page--iim .ach {
      max-width: 960px !important;
      gap: 12px !important;
    }
    .landing-page--iim .achievement {
      padding: 10px 15px !important;
    }
    .landing-page--iim .ac1 {
      gap: 10px !important;
    }
    .landing-page--iim .ac1 img {
      width: 52px !important;
      height: 52px !important;
      padding: 9px !important;
    }
    .landing-page--iim .ach h3 {
      font-size: 28px !important;
    }
    .landing-page--iim .ac1 p {
      font-size: 13px !important;
    }
  }

  @media only screen and (max-width: 991px) and (min-width: 769px) {
    .landing-page--iim .achievement {
      padding: 14px 15px !important;
    }
    .landing-page--iim .ach {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 16px 24px !important;
      max-width: 620px !important;
    }
    .landing-page--iim .ac1 {
      justify-content: flex-start !important;
      padding-left: 15px !important;
    }
    .landing-page--iim .ach h3 {
      font-size: 28px !important;
    }
    .landing-page--iim .ac1 p {
      font-size: 13.5px !important;
    }
    .landing-page--iim .ac1 img {
      width: 52px !important;
      height: 52px !important;
      padding: 9px !important;
    }
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim .achievement {
      background-color: #FFE5B2 !important;
      padding: 22px 14px 20px 14px !important;
      width: 100% !important;
      margin: 0 !important;
      box-sizing: border-box !important;
    }
    .landing-page--iim .achievement .container {
      padding: 0 !important;
      max-width: 100% !important;
      width: 100% !important;
    }
    .landing-page--iim .ach {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 24px 16px !important;
      max-width: 100% !important;
      margin: 0 auto !important;
      align-items: center !important;
    }
    .landing-page--iim .ac1 {
      display: flex !important;
      align-items: center !important;
      justify-content: flex-start !important;
      gap: 10px !important;
      padding: 0 0 0 4px !important;
      text-align: left !important;
    }
    .landing-page--iim .ac1 img {
      width: 48px !important;
      height: 48px !important;
      border-radius: 50% !important;
      background-color: #ffffff !important;
      padding: 8px !important;
      object-fit: contain !important;
      flex-shrink: 0 !important;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06) !important;
    }
    .landing-page--iim .ac1 > div {
      display: flex !important;
      flex-direction: column !important;
      justify-content: center !important;
      align-items: flex-start !important;
    }
    .landing-page--iim .ach h3 {
      font-size: 26px !important;
      color: #17479E !important;
      margin: 0 0 1px 0 !important;
      font-weight: 800 !important;
      line-height: 1 !important;
      letter-spacing: -0.3px !important;
    }
    .landing-page--iim .ac1 p {
      font-size: 12.5px !important;
      font-weight: 600 !important;
      color: #111111 !important;
      margin: 0 !important;
      line-height: 1.2 !important;
    }
    .landing-page--iim .ac1:nth-child(1) p,
    .landing-page--iim .ac1:nth-child(2) p,
    .landing-page--iim .ac1:nth-child(4) p {
      max-width: 82px !important;
      white-space: normal !important;
    }
    .landing-page--iim .ac1:nth-child(3) p {
      white-space: nowrap !important;
      max-width: none !important;
    }
  }

  @media only screen and (max-width: 480px) {
    .landing-page--iim .achievement {
      background-color: #FFE5B2 !important;
      padding: 26px 16px 26px 16px !important;
    }
    .landing-page--iim .ach {
  gap: 24px 12px !important;
}
    .landing-page--iim .ac1 {
      padding: 0 !important;
      gap: 9px !important;
    }
    .landing-page--iim .ach h3 {
      font-size: 25px !important;
    }
    .landing-page--iim .ac1 p {
      font-size: 12px !important;
      line-height: 1.18 !important;
    }
    .landing-page--iim .ac1:nth-child(1) p,
    .landing-page--iim .ac1:nth-child(2) p,
    .landing-page--iim .ac1:nth-child(4) p {
      max-width: 80px !important;
      white-space: normal !important;
    }
    .landing-page--iim .ac1:nth-child(3) p {
      white-space: nowrap !important;
      max-width: none !important;
    }
    .landing-page--iim .ac1 img {
      width: 46px !important;
      height: 46px !important;
      padding: 8px !important;
    }
  }

  /* =========================================================
     5. OVERVIEW SECTION (#overview)
     ========================================================= */
  .landing-page--iim #overview {
    width: 100% !important;
    margin: 35px 0 25px 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
  }

  .landing-page--iim #overview .container {
    max-width: 1120px !important;
    width: 100% !important;
    margin: 0 auto !important;
    padding: 0 !important;
    box-sizing: border-box !important;
  }

  .landing-page--iim .overview1 {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    text-align: left !important;
  }

  .landing-page--iim .overview1 h2 {
    font-size: 26px !important;
    font-weight: 800 !important;
    color: #111111 !important;
    text-align: left !important;
    margin: 0 0 12px 0 !important;
    padding: 0 !important;
    line-height: 1.3 !important;
  }

  .landing-page--iim .overview1 p {
    font-size: 13.5px !important;
    color: #333333 !important;
    text-align: left !important;
    line-height: 1.55 !important;
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  @media only screen and (min-width: 992px) and (max-width: 1399px) {
    .landing-page--iim #overview {
      padding: 0 !important;
    }
    .landing-page--iim #overview .container {
      padding: 0 90px 0 75px !important;
    }
  }

  @media only screen and (max-width: 991px) {
    .landing-page--iim #overview {
      padding: 0 !important;
      margin: 25px 0 !important;
    }
    .landing-page--iim #overview .container {
      padding: 0 20px !important;
    }
    .landing-page--iim .overview1 h2 {
      font-size: 22px !important;
      white-space: normal !important;
    }
    .landing-page--iim .overview1 p {
      font-size: 13px !important;
      line-height: 1.5 !important;
    }
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim #overview {
      padding: 0 24px !important;
      margin: 35px 0 25px 0 !important;
      box-sizing: border-box !important;
    }
    .landing-page--iim #overview .container {
      padding: 0 !important;
      max-width: 100% !important;
    }
    .landing-page--iim .overview1 {
      max-width: 348px !important;
      margin: 0 !important;
    }
    .landing-page--iim .overview1 h2 {
      font-size: 26px !important;
      font-weight: 800 !important;
      color: #000000 !important;
      text-align: left !important;
      line-height: 1.25 !important;
      letter-spacing: -0.2px !important;
      white-space: normal !important;
      margin: 0 0 16px 0 !important;
      font-family: 'Montserrat', sans-serif !important;
    }
    .landing-page--iim .overview1 p {
      font-size: 13.8px !important;
      line-height: 1.62 !important;
      color: #333333 !important;
      text-align: left !important;
      margin: 0 !important;
      font-family: 'Montserrat', sans-serif !important;
    }
  }

  /* =========================================================
     6. KEY SKILLS SECTION (#key-skills)
     ========================================================= */
 .landing-page--iim section.certification#key-skills {
    width: 100% !important;
    margin: 55px 0 30px 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
  }

  .landing-page--iim section.certification#key-skills .container {
    max-width: 1120px !important;
    width: 100% !important;
    margin: 0 auto !important;
    padding: 0 !important;
    box-sizing: border-box !important;
  }

  .landing-page--iim #key-skills h2 {
    font-size: 26px !important;
    font-weight: 800 !important;
    text-align: left !important;
    color: #111111 !important;
    margin: 0 0 16px 0 !important;
    padding: 0 !important;
    line-height: 1.3 !important;
  }

  .landing-page--iim #key-skills h2 .blue {
    color: #17479E !important;
    background-color: #eef5fc !important;
    padding: 2px 8px !important;
    border-radius: 4px !important;
    display: inline !important;
  }

  .landing-page--iim #key-skills p {
    font-size: 13.5px !important;
    text-align: left !important;
    color: #333333 !important;
    margin: 4px 0 18px 0 !important;
    padding: 0 !important;
    max-width: 100% !important;
    line-height: 1.05 !important;
  }

  .landing-page--iim section.certification#key-skills br {
    display: none !important;
  }

  .landing-page--iim .b2-info {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 16px 18px !important;
    margin-top: 18px !important;
    width: 100% !important;
    max-width: none !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    box-sizing: border-box !important;
  }

  .landing-page--iim .b1 {
    background: #ffffff !important;
    padding: 10px 14px !important;
    border-radius: 10px !important;
    border: 2px solid #17479E !important;
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    box-sizing: border-box !important;
    transition: transform 0.2s, box-shadow 0.2s !important;
  }

  .landing-page--iim .b1:hover {
    box-shadow: 0 4px 14px rgba(23, 71, 158, 0.12) !important;
  }

  .landing-page--iim .b1 img {
    width: 70px !important;
    height: 70px !important;
    min-width: 70px !important;
    max-width: 70px !important;
    flex-shrink: 0 !important;
    object-fit: contain !important;
    margin: 0 !important;
  }

  .landing-page--iim .b1 > div {
    flex: 1 !important;
    min-width: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: flex-start !important;
    text-align: left !important;
  }

  .landing-page--iim .b1 h3 {
    color: #17479E !important;
    font-size: 16px !important;
    margin: 0 0 2px 0 !important;
    font-weight: 700 !important;
    line-height: 1.25 !important;
    text-align: left !important;
    white-space: nowrap !important;
   
  }

  .landing-page--iim .b1 p {
    font-size: 10.4px !important;
    font-weight: 400 !important;
    color: #333333 !important;
    line-height: 1.4 !important;
    text-align: left !important;
    margin: 0 !important;
    padding: 2px 0 0 0 !important;
    letter-spacing: -0.015em !important;
  }

  @media only screen and (min-width: 1400px) {
    .landing-page--iim .b1 p {
      font-size: 10.8px !important;
      line-height: 1.42 !important;
    }
   .landing-page--iim .b1 img {
  width: 70px !important;
  height: 70px !important;
  min-width: 70px !important;
  max-width: 70px !important;
}
  }

  @media only screen and (min-width: 992px) and (max-width: 1399px) {
    .landing-page--iim section.certification#key-skills {
      padding: 0 !important;
    }
    .landing-page--iim section.certification#key-skills .container {
      padding: 0 90px 0 75px !important;
    }
    .landing-page--iim .b1 {
      padding: 10px 12px !important;
      gap: 10px !important;
    }
   .landing-page--iim .b1 img {
  width: 70px !important;
  height: 70px !important;
  min-width: 70px !important;
  max-width: 70px !important;
  flex-shrink: 0 !important;
  object-fit: contain !important;
  margin: 0 !important;
}
    .landing-page--iim .b1 h3 {
      font-size: 15px !important;
      white-space: nowrap !important;
    }
    .landing-page--iim .b1 p {
      font-size: 10.2px !important;
      line-height: 1.4 !important;
      letter-spacing: -0.015em !important;
    }
  }

  @media only screen and (max-width: 991px) {
    .landing-page--iim section.certification#key-skills {
      padding: 0 !important;
      margin: 25px 0 !important;
    }
    .landing-page--iim section.certification#key-skills .container {
      padding: 0 20px !important;
    }
    .landing-page--iim .b2-info {
      grid-template-columns: 1fr !important;
      gap: 14px !important;
    }
    .landing-page--iim #key-skills h2 {
      font-size: 22px !important;
      white-space: normal !important;
    }
    .landing-page--iim .b1 h3 {
      white-space: normal !important;
      font-size: 16px !important;
    }
  }

 @media only screen and (max-width: 768px) {
    .landing-page--iim section.certification#key-skills {
      padding: 0 20px !important;
      margin: 30px 0 20px 0 !important;
      box-sizing: border-box !important;
    }
    .landing-page--iim section.certification#key-skills .container {
      padding: 0 !important;
      max-width: 100% !important;
    }
    .landing-page--iim #key-skills h2 {
      font-size: 25px !important;
      font-weight: 800 !important;
      line-height: 1.15 !important;
      color: #000000 !important;
      white-space: normal !important;
      margin: 0 0 22px 0 !important;
      font-family: 'Montserrat', sans-serif !important;
    }
    .landing-page--iim #key-skills h2 .blue {
      color: #00408D !important;
    }
    .landing-page--iim #key-skills p {
      font-size: 13.5px !important;
      line-height: 1.05 !important;
      color: #333333 !important;
      font-weight: 500 !important;
      margin: 0 0 45px 0 !important;
      font-family: 'Montserrat', sans-serif !important;
    }
    .landing-page--iim .b2-info {
      display: flex !important;
      flex-direction: column !important;
      gap: 14px !important;
      margin-top: 18px !important;
      width: 100% !important;
    }
    .landing-page--iim .b1 {
      display: flex !important;
      align-items: flex-start !important;
      gap: 10px !important;
  padding: 8px 12px 0px 8px !important; 
      border-radius: 10px !important;
      border: 2px solid #17479E !important;
      background: #ffffff !important;
      width: 100% !important;
      box-sizing: border-box !important;
    }
    .landing-page--iim .b1 img {
      width: 88px !important;
      height: 88px !important;
      min-width: 88px !important;
      max-width: 88px !important;
      flex-shrink: 0 !important;
      object-fit: contain !important;
    margin: 0 !important; 
    }
    .landing-page--iim .b1 > div {
      flex: 1 !important;
      min-width: 0 !important;
    }
    .landing-page--iim .b1 h3 {
      font-size: 15px !important;
      font-weight: 700 !important;
      color: #00408D !important;
      margin: 0 0 4px 0 !important;
      line-height: 1.2 !important;
      white-space: normal !important;
      font-family: 'Montserrat', sans-serif !important;
    }
    .landing-page--iim .b1 p {
      font-size: 12px !important;
      line-height: 1.2 !important;
      color: #555555 !important;
      margin: 0 !important;
      font-family: 'Montserrat', sans-serif !important;
    }
  }

  /* =========================================================
     7. TOOLS & TECHNOLOGIES SECTION (#courses)
     ========================================================= */
  .landing-page--iim section#courses {
    width: 100% !important;
    margin: 70px 0 40px 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
  }

  .landing-page--iim #courses .container {
    max-width: 1120px !important;
    width: 100% !important;
    margin: 0 auto !important;
    padding: 0 !important;
    box-sizing: border-box !important;
  }

  .landing-page--iim #courses h2 {
    font-size: 25px !important;
    font-weight: 800 !important;
    text-align: left !important;
    color: #111111 !important;
    margin: 0 0 16px 0 !important;
    padding: 0 !important;
    line-height: 1.3 !important;
  }

  .landing-page--iim #courses h2 .blue {
    color: #17479E !important;
    background-color: #eef5fc !important;
    padding: 1px 8px !important;
    border-radius: 4px !important;
    display: table !important;
  }

  .landing-page--iim #courses p {
    font-size: 13.5px !important;
    text-align: left !important;
    color: #333333 !important;
    margin: 0 0 16px 0 !important;
    padding: 0 !important;
    line-height: 1.55 !important;
    max-width: 100% !important;
  }

  .landing-page--iim section#courses br {
    display: none !important;
  }

  .landing-page--iim .course-info {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 24px !important;
    margin-top: 16px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .landing-page--iim .c1 {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
    border: 1px solid #dcdcdc !important;
    border-radius: 14px !important;
    overflow: hidden !important;
    background: #ffffff !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    width: 100% !important;
    box-sizing: border-box !important;
    transition: transform 0.2s, box-shadow 0.2s !important;
  }
  .landing-page--iim .c1:hover {
    box-shadow: 0 8px 24px rgba(23, 71, 158, 0.15) !important;
    transform: translateY(-2px) !important;
  }

  .landing-page--iim .c1 .c1-img-wrap {
    height: 135px !important;
    min-height: 135px !important;
    max-height: 135px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 16px 22px !important;
    background: #ffffff !important;
    box-sizing: border-box !important;
  }

 .landing-page--iim .c1 img,
.landing-page--iim .c1 .c1-img-wrap img {
  max-width: 300px !important;
  max-height: 110px !important;
  width: 100% !important;
  height: auto !important;
  object-fit: contain !important;
  margin: auto !important;
  display: block !important;
}

  .landing-page--iim #courses .c1 p,
  .landing-page--iim .c1 p,
  .landing-page--iim .c1 .c1-desc {
    background-color: #17479E !important;
    color: #ffffff !important;
    padding: 14px 18px 16px 18px !important;
    font-size: 12.8px !important;
    border-bottom-left-radius: 13px !important;
    border-bottom-right-radius: 13px !important;
    margin: 0 !important;
    text-align: left !important;
    line-height: 1.45 !important;
    display: block !important;
    min-height: 84px !important;
    box-sizing: border-box !important;
  }

  .landing-page--iim #courses .c1 p b,
  .landing-page--iim .c1 p b,
  .landing-page--iim .c1 .c1-desc b {
    color: #ffffff !important;
    font-weight: 700 !important;
    display: inline !important;
  }

  .landing-page--iim #courses .c1 p span,
  .landing-page--iim .c1 p span,
  .landing-page--iim .c1 .c1-desc span {
    color: #ffffff !important;
    font-weight: 400 !important;
    display: inline !important;
  }

  @media only screen and (min-width: 992px) and (max-width: 1399px) {
    .landing-page--iim section#courses {
      padding: 0 !important;
    }
    .landing-page--iim #courses .container {
      padding: 0 90px 0 75px !important;
    }
    .landing-page--iim .course-info {
      gap: 16px !important;
    }
    .landing-page--iim .c1 .c1-img-wrap {
      height: 125px !important;
      min-height: 125px !important;
      max-height: 125px !important;
    }
    .landing-page--iim .c1 img,
    .landing-page--iim .c1 .c1-img-wrap img {
     max-width: 300px !important;
  max-height: 110px !important;
    }
    .landing-page--iim #courses .c1 p,
    .landing-page--iim .c1 p,
    .landing-page--iim .c1 .c1-desc {
      font-size: 12px !important;
      padding: 12px 14px !important;
      min-height: 84px !important;
    }
  }

  @media only screen and (max-width: 991px) {
    .landing-page--iim section#courses {
      padding: 0 !important;
      margin: 25px 0 !important;
    }
    .landing-page--iim #courses .container {
      padding: 0 20px !important;
    }
    .landing-page--iim .course-info {
      grid-template-columns: 1fr !important;
      gap: 18px !important;
      max-width: 100% !important;
      margin: 18px 0 0 0 !important;
    }
    .landing-page--iim #courses h2 {
      font-size: 24px !important;
      white-space: normal !important;
      text-align: left !important;
    }
    .landing-page--iim .c1 .c1-img-wrap {
      height: 130px !important;
      min-height: 130px !important;
    }
    .landing-page--iim .c1 .c1-desc {
      min-height: auto !important;
    }
  }

@media only screen and (max-width: 768px) {
  .landing-page--iim section#courses {
    padding: 0 24px !important;
    margin: 35px 0 20px 0 !important;
    box-sizing: border-box !important;
  }

  .landing-page--iim #courses .container {
    padding: 0 !important;
    max-width: 100% !important;
  }

  .landing-page--iim #courses h2 {
    font-size: 27px !important;
    font-weight: 800 !important;
    line-height: 1.25 !important;
    color: #000000 !important;
    white-space: normal !important;
    margin: 0 0 14px 0 !important;
    font-family: 'Montserrat', sans-serif !important;
  }

  .landing-page--iim #courses h2 br {
    display: block !important;
    content: "" !important;
    margin-top: 2px !important;
  }

  .landing-page--iim #courses h2 .blue {
    color: #17479E !important;
    background-color: #eef5fc !important;
    padding: 2px 6px !important;
    border-radius: 4px !important;
    display: inline !important;
    box-decoration-break: clone !important;
    -webkit-box-decoration-break: clone !important;
  }

  .landing-page--iim #courses p {
    font-size: 13.5px !important;
    line-height: 1.6 !important;
    color: #333333 !important;
    margin: 0 0 14px 0 !important;
    padding: 0 0 10px 0 !important;
    font-weight: 500 !important;
  }

 .landing-page--iim .course-info {
  display: flex !important;
  flex-direction: column !important;
  gap: 14px !important;
  width: 100% !important;
  max-width: 100% !important;
  margin-top: 14px !important;

}

 .landing-page--iim .c1 {
  border: 1px solid #dedede !important;
  border-radius: 10px !important;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.18) !important;
  width: 100% !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
}

 .landing-page--iim .c1 .c1-img-wrap {
  height: 125px !important;
  min-height: 125px !important;
  max-height: 125px !important;
  padding: 10px 14px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: #ffffff !important;
  box-sizing: border-box !important;
}

 .landing-page--iim .c1 img,
.landing-page--iim .c1 .c1-img-wrap img {
  max-width: 320px !important;
  max-height: 125px !important;
  width: 100% !important;
  height: auto !important;
  object-fit: contain !important;
  margin: auto !important;
  display: block !important;
}

.landing-page--iim #courses .c1 p,
.landing-page--iim .c1 p,
.landing-page--iim .c1 .c1-desc {
  background-color: #17479E !important;
  color: #ffffff !important;
  padding: 14px 14px !important;
  font-size: 12px !important;
  line-height: 1.4 !important;
  border-bottom-left-radius: 9px !important;
  border-bottom-right-radius: 9px !important;
  min-height: 64px !important;
  margin: 0 !important;
  display: block !important;
  flex: 0 0 auto !important;
  box-sizing: border-box !important;
}
}

  /* =========================================================
     8. ABOUT IIM - KOZHIKODE SECTION (#about)
     ========================================================= */
  .landing-page--iim #about {
    background-color: #F0F3FA !important;
    color: #111111 !important;
    padding: 40px 15px !important;
    margin: 35px 0 0 0 !important;
    scroll-margin-top: 80px;
  }

  .landing-page--iim .about-cnt {
    display: grid !important;
    grid-template-columns: 1.45fr 1fr !important;
    gap: 30px !important;
    align-items: center !important;
    max-width: 1140px !important;
    margin: 0 auto !important;
  }

  .landing-page--iim .ab1 {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
  }

  .landing-page--iim .ab1 h2 {
    color: #17479E !important;
    font-weight: 800 !important;
    font-size: 26px !important;
    margin: 0 0 14px 0 !important;
    text-transform: uppercase !important;
    text-align: center !important;
    letter-spacing: 0px !important;
  }

  .landing-page--iim .ab1 p {
    font-size: 13px !important;
    font-weight: 400 !important;
    color: #333333 !important;
    line-height: 1.25 !important;
    text-align: center !important;
    margin: 0 0 12px 0 !important;
  }

  .landing-page--iim .ab1 > br {
    display: none !important;
  }

  .landing-page--iim .accreited {
    border: 1px solid #0c1b31ff !important;
    border-radius: 12px !important;
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 14px !important;
    align-items: center !important;
    justify-content: space-around !important;
    padding: 40px 18px 22px 18px !important;
    position: relative !important;
    margin-top: 36px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .landing-page--iim .accreited h2 {
    position: absolute !important;
    top: -22px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    background: #F0F3FA !important;
    padding: 0 18px !important;
    font-size: 18px !important;
    font-weight: 800 !important;
    color: #17479E !important;
    text-align: center !important;
    text-transform: none !important;
    margin: 0 !important;
    line-height: 1.25 !important;
    letter-spacing: normal !important;
    white-space: normal !important;
    width: max-content !important;
    max-width: 90% !important;
  }

  .landing-page--iim .accreited h2 br {
    display: block !important;
  }

  .landing-page--iim .accreited .acc-card {
    background: #ffffff !important;
    border-radius: 9px !important;
    height: 60px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 12px 12px 18px 12px !important;
 box-shadow: none !important;
  box-sizing: border-box !important;
  }

  .landing-page--iim .accreited .acc-card img {
  max-height: 75px !important;
  height: auto !important;
  max-width: 100% !important;
  width: auto !important;
  object-fit: contain !important;
}

  .landing-page--iim .ab2 {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 100% !important;
  }

  .landing-page--iim .ab2 img {
    border-radius: 20px !important;
    width: 100% !important;
    height: auto !important;
    max-width: 440px !important;
    max-height: 350px !important;
    object-fit: cover !important;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
  }

  @media only screen and (max-width: 991px) {
    .landing-page--iim #about {
      background-color: #F0F3FA !important;
      padding: 30px 6px !important;
      margin: 0 0 !important;
    }
    .landing-page--iim .about-cnt {
      display: flex !important;
      flex-direction: column !important;
      gap: 18px !important;
      width: 100% !important;
      max-width: 100% !important;
      padding: 0 !important;
      margin: 0 auto !important;
    }
    .landing-page--iim .ab1 {
      width: 100% !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      text-align: center !important;
      padding: 0 !important;
    }
    .landing-page--iim .ab1 h2 {
      font-size: 24px !important;
      font-weight: 800 !important;
      color: #17479E !important;
      margin: 0 0 14px 0 !important;
      letter-spacing: 0.3px !important;
      text-align: center !important;
      text-transform: uppercase !important;
    }
    .landing-page--iim .ab1 p {
      font-size: 13px !important;
      line-height: 0.5 !important;
      color: #333333 !important;
      text-align: center !important;
      margin: 0 0 12px 0 !important;
      padding: 0 0 15px 0  !important;
      font-weight:500 !important;
    }
    .landing-page--iim .accreited {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 18px !important;
      border: 1px solid #17479E !important;
      border-radius: 14px !important;
      background: #f8fafd !important;
      padding: 12px 1px 18px 1px !important;
      margin-top: 20px !important;
      width: 100% !important;
      box-sizing: border-box !important;
      position: relative !important;
    }
    .landing-page--iim .accreited h2 {
      position: absolute !important;
      top: -20px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      background: #ffffff !important;
      padding: 0 12px !important;
      font-size: 28px !important;
      font-weight: 800 !important;
      color: #17479E !important;
      text-align: center !important;
      text-transform: none !important;
      margin: 0 !important;
      line-height: 1.05 !important;
      letter-spacing: normal !important;
      white-space: normal !important;
      width: max-content !important;
      max-width: 90% !important;
    }
    .landing-page--iim .accreited .acc-card {
      background: #ffffff !important;
      border: 1px solid #eef2f8 !important;
      border-radius: 8px !important;
      height: 60px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 6px 6px !important;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05) !important;
      box-sizing: border-box !important;
    }
    .landing-page--iim .accreited .acc-card img {
      max-height: 55px !important;
      height: auto !important;
      max-width: 100% !important;
      width: auto !important;
      object-fit: contain !important;
      display: block !important;
      margin: 0 auto !important;
    }
    .landing-page--iim .ab2 {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: #ffffff !important;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06) !important;
  border: none !important;
  border-radius: 22px !important;
  padding: 0 !important;
  height: auto !important;
  overflow: hidden !important;
}
  .landing-page--iim .ab2 img {
  width: 100% !important;
  max-width: 100% !important;
  height: 350px !important;
  max-height: none !important;
  border-radius: 22px !important;
  object-fit: cover !important;
  object-position: center center !important;
  box-shadow: none !important;
  display: block !important;
}
  }

  @media only screen and (max-width: 480px) {
    .landing-page--iim #about {
      background-color: #F0F3FA !important;
      padding: 26px 4px 50px 4px !important;
      margin: 0 0 !important;
    }
    .landing-page--iim .ab1 h2 {
      font-size: 23px !important;
      margin-bottom: 12px !important;
    }
    .landing-page--iim .ab1 p {
      font-size: 13px !important;
      line-height: 1.5 !important;
      margin-bottom: 12px !important;
    }
    .landing-page--iim .accreited {
      padding: 32px 10px 16px 10px !important;
      gap: 10px !important;
      margin-top: 16px !important;
      border-radius: 14px !important;
    }
    .landing-page--iim .accreited h2 {
      font-size: 14px !important;
      top: -18px !important;
      padding: 0 10px !important;
      max-width: 86% !important;
    }
    .landing-page--iim .accreited .acc-card {
      height: 56px !important;
      padding: 4px 8px !important;
    }
    .landing-page--iim .accreited .acc-card img {
      max-height: 38px !important;
    }
    .landing-page--iim .ab2 {
  margin-top: 0 !important;
}

.landing-page--iim .ab2 img {
  height: 250px !important;
  border-radius: 22px !important;
}
  }

  /* =========================================================
     9. ELIGIBILITY / BENEFITS SECTION (#benefits)
     ========================================================= */
  .landing-page--iim #benefits {
    background-image: url("/assets/all_universities_images/iim/benefit-bg.webp") !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: right center !important;
    color: #ffffff !important;
    padding: 30px 30px 15px 30px!important;
    margin: 0 !important;
    width: 100% !important;
    box-sizing: border-box !important;
    display: block !important;
    min-height: auto !important;
  }

  .landing-page--iim #benefits .container {
    max-width: 1120px !important;
    margin: 0 auto !important;
    padding: 0 15px 0 45px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .landing-page--iim .benefits-cnt {
    width: 630px !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  .landing-page--iim .benefits-cnt h2 {
    font-size: 25px !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    margin: 20px 0 16px 0 !important;
    line-height: 1 !important;
    letter-spacing: -0.2px !important;
  }

  .landing-page--iim .benefits-cnt h3 {
    font-size: 16.5px !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    margin: 0 0 0 0 !important;
    display: flex !important;
    align-items: center !important;
    gap: 2px !important;
  }

  .landing-page--iim .benefits-cnt .arrow-sym {
    font-size: 20px !important;
  }

  .landing-page--iim .benefits-cnt p {
    padding-left: 26px !important;
    font-size: 13.5px !important;
    color: #f1f5f9 !important;
    line-height: 1 !important;
    margin: 0 !important;
  }

  .landing-page--iim .benefits-cnt .enquireNowBtn {
    background: #0CB1EF !important;
    border: none !important;
    padding: 9px 18px !important;
    color: #ffffff !important;
    font-size: 15px !important;
    font-weight: 500 !important;
    border-radius: 25px !important;
    cursor: pointer !important;
    margin-top: -2px !important;
    margin-bottom: 0 !important;
  
  }

  
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    .landing-page--iim #benefits {
      padding: 30px 20px !important;
      background-position: 72% center !important;
    }
    .landing-page--iim .benefits-cnt {
      width: 480px !important;
    }
    .landing-page--iim .benefits-cnt h2 {
      font-size: 24px !important;
    }
  }

@media only screen and (max-width: 768px) {
  .landing-page--iim #benefits {
    background-image: url("/assets/all_universities_images/iim/mobile-bg-for-benefits.webp") !important;
    background-size: cover !important;
    background-position: center top !important;
    background-repeat: no-repeat !important;
    padding: 20px 20px 520px 20px !important;
    min-height: auto !important;
    display: block !important;
  }

  .landing-page--iim #benefits .container {
    padding: 0 !important;
  }

  .landing-page--iim .benefits-cnt {
    width: 360px !important;
    max-width: 330px !important;
    margin: 0 auto !important;
    padding-bottom: 40px !important;
    font-size: 12px !important;
  }

  .landing-page--iim .benefits-cnt h2 {
    font-size: 24px !important;
    font-weight: 800 !important;
    line-height: 1.25 !important;
    text-align: left !important;
    margin: 0 0 14px 0 !important;
    color: #ffffff !important;
  }

  .landing-page--iim .benefits-cnt h3 {
    font-size: 14px !important;
    font-weight: 700 !important;
    margin: 0 !important;
    line-height: 1.3 !important;
    color: #ffffff !important;
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
  }

  .landing-page--iim .benefits-cnt .arrow-sym {
    font-size: 13px !important;
    color: #ffffff !important;
  }

  .landing-page--iim .benefits-cnt p {
    font-size: 12.5px !important;
    line-height: 1.35 !important;
    padding-left: 20px !important;
    margin: 0 0 4px 0 !important;
    color: #ffffff !important;
  }

  .landing-page--iim .benefits-cnt .enquireNowBtn {
    font-size: 14px !important;
    font-weight: 600 !important;
    padding: 10px 22px !important;
    margin-top: 6px !important;
    margin-bottom: 0 !important;
    border-radius: 25px !important;
    background: #0CB1EF !important;
    color: #ffffff !important;
    border: none !important;
    box-shadow: 0 4px 14px rgba(12, 177, 239, 0.35) !important;
    display: inline-block !important;
    cursor: pointer !important;
  }
}

@media only screen and (max-width: 480px) {
  .landing-page--iim #benefits {
    padding: 20px 16px 520px 16px !important;
    min-height: auto !important;
  }

  .landing-page--iim .benefits-cnt {
    max-width: 330px !important;
  }

  .landing-page--iim .benefits-cnt h2 {
    font-size: 22px !important;
    line-height: 1.25 !important;
  }
}


  /* =========================================================
     10. SAMPLE DEGREE SECTION (#sample-degree)
     ========================================================= */
  .landing-page--iim section#sample-degree {
    margin: 28px 0 !important;
    padding: 10px 20px !important;
  }

  .landing-page--iim .degree {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 22px !important;
    align-items: center !important;
    max-width: 1120px !important;
    margin: 0 auto !important;
  }

  .landing-page--iim .degree img {
    width: 100% !important;
    max-width: 550px !important;
    height: auto !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    display: block !important;
  }

  .landing-page--iim .degree-info h2 {
    color: #17479E !important;
    font-size: 33px !important;
    font-weight: 600 !important;
    line-height: 1 !important;
    margin: 0 !important;
    padding: 16px 0 0 0 !important;
  }

  .landing-page--iim .degree-info h3 {
    font-size: 18px !important;
    font-weight: 700 !important;
    color: #111111 !important;
    margin: 0 !important;
  }

  .landing-page--iim .degree-info p {
    font-size: 13px !important;
    color: #333333 !important;
    line-height: 1.10 !important;
    margin: 0 !important;
    font-weight: 400 !important;
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim .degree {
      grid-template-columns: 1fr !important;
      text-align: center !important;
      gap: 10px !important;
    }
    .landing-page--iim .degree-info h2 {
      font-size: 28px !important;
    }
    .landing-page--iim .degree-info h3 {
      font-size: 17px !important;
    }
  }

  /* =========================================================
     11. PLACEMENT PARTNERS (#placement)
     ========================================================= */
  .landing-page--iim section#placement {
    margin: 40px 0 !important;
    padding: 10px 20px !important;
  }

  .landing-page--iim .placement-section {
    padding: 35px 20px !important;
    background-color: #F2F2F2 !important;
    border-radius: 18px !important;
    text-align: center !important;
    max-width: 1140px !important;
    margin: 0 auto !important;
    box-sizing: border-box !important;
  }

  .landing-page--iim .placement-section h2 {
    text-align: center !important;
    color: #2B2146 !important;
    font-size: 24px !important;
    font-weight: 800 !important;
    margin: 0 0 20px 0 !important;
    letter-spacing: 1.10px !important;
  }

  .landing-page--iim .placement-img {
    width: 128px !important;
    height: auto !important;
    margin: 6px 16px 0px 5px !important;
    display: inline-block !important;
    vertical-align: middle !important;
    object-fit: contain !important;
    transition: transform 0.2s ease !important;
  }

  

  @media only screen and (min-width: 992px) and (max-width: 1140px) {
    .landing-page--iim .placement-img {
      width: 116px !important;
      margin: 6px 5px !important;
    }
  }

  @media only screen and (min-width: 769px) and (max-width: 991px) {
    .landing-page--iim .placement-img {
      width: 104px !important;
      margin: 6px 4px !important;
    }
  }

@media only screen and (max-width: 768px) {

  .landing-page--iim section#placement {
    margin: 24px 0 !important;
    padding: 0 16px !important;
  }

  .landing-page--iim section#placement .container {
    padding: 0 !important;
  }

  .landing-page--iim .placement-section {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 12px 14px !important;
    background-color: #F2F2F2 !important;
    padding: 24px 16px 26px 16px !important;
    border-radius: 16px !important;
    max-width: 100% !important;
    margin: 0 auto !important;
    box-sizing: border-box !important;
  }

  .landing-page--iim .placement-section h2 {
    grid-column: 1 / -1 !important;
    font-size: 21px !important;
    font-weight: 800 !important;
    color: #2B2146 !important;
    line-height: 1.25 !important;
    letter-spacing: 0.5px !important;
    margin: 0 0 12px 0 !important;
    white-space: nowrap !important;
    text-align: center !important;
  }

  .landing-page--iim .placement-section .placement-img {
    width: 100% !important;
    max-width: 100% !important;
    height: 48px !important;
    margin: 0 !important;
    padding: 8px 12px !important;
    background: #ffffff !important;
    border-radius: 8px !important;
    object-fit: contain !important;
    box-sizing: border-box !important;
    display: block !important;
  }
}



  /* =========================================================
     13. FAQS SECTION (#faqs)
     ========================================================= */
  .landing-page--iim #faqs {
    margin: 45px 0 !important;
    padding: 0 60px !important;
  }

  .landing-page--iim #faqs .container {
    max-width: 1200px !important;
    margin: 0 auto !important;
    padding: 0 16px !important;
  }

  .landing-page--iim #faqs .faq-title {
    margin-bottom: 22px !important;
  }

  .landing-page--iim #faqs .faq-title h2 {
    font-size: 26px !important;
    font-weight: 800 !important;
    color: #111111 !important;
    margin: 0 !important;
    text-align: left !important;
    letter-spacing: 0.025em !important;
  }

  .landing-page--iim #faqs .accordion {
    display: flex !important;
    flex-direction: column !important;
    gap: 14px !important;
    width: 100% !important;
  }

  .landing-page--iim #faqs .accordion-item {
    background-color: #ffffff !important;
    border: 1px solid #dcdfe3 !important;
    border-left: 5px solid #17479E !important;
    border-radius: 4px !important;
    overflow: hidden !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
    transition: all 0.2s ease !important;
  }

  .landing-page--iim #faqs .accordion-header {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 13px 24px 13px 32px !important;
    font-size: 16px !important;
    font-weight: 500 !important;
    color: #111111 !important;
    cursor: pointer !important;
    user-select: none !important;
    line-height: 1.65 !important;
    letter-spacing: 0.025em !important;
    gap: 16px !important;
    background: transparent !important;
  }

  .landing-page--iim #faqs .accordion-header:hover {
    background-color: #f8f9fa !important;
  }

  .landing-page--iim #faqs .accordion-header .span {
    font-size: 17px !important;
    font-weight: 700 !important;
    color: #111111 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
    margin-left: auto !important;
  }

  .landing-page--iim #faqs .accordion-content {
    padding: 14px 24px 14px 32px !important;
    font-size: 16px !important;
    color: #444444 !important;
    line-height: 1.2 !important;
    letter-spacing: 0.025em !important;
    border-top: 1px solid #e2e5e8 !important;
    background-color: #ffffff !important;
    font-weight: 400 !important;
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim #faqs {
      margin: 30px 0 !important;
      padding: 0 16px !important;
    }
    .landing-page--iim #faqs .container {
      padding: 0 4px !important;
    }
    .landing-page--iim #faqs .faq-title h2 {
      font-size: 20px !important;
      margin-bottom: 14px !important;
    }
    .landing-page--iim #faqs .accordion {
      gap: 10px !important;
    }
    .landing-page--iim #faqs .accordion-header {
      padding: 14px 16px 14px 20px !important;
      font-size: 13.5px !important;
      line-height: 1.55 !important;
    }
    .landing-page--iim #faqs .accordion-content {
      padding: 12px 16px 16px 20px !important;
      font-size: 13px !important;
      line-height: 1.7 !important;
    }
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim .mini-footer-bottom {
      padding-bottom: 70px !important;
    }
  }

  /* =========================================================
     16. FLOATING ACTIONS & STICKY CTAS
     ========================================================= */
  .landing-page--iim .coupon-btn {
    position: fixed !important;
    right: 15px !important;
    bottom: 25px !important;
    border: none !important;
    background: transparent !important;
    border-radius: 100% !important;
    z-index: 9999 !important;
    padding: 0 !important;
    cursor: pointer !important;
  }

  .landing-page--iim .coupon-btn img {
    width: 60px !important;
    height: 60px !important;
    border-radius: 50% !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), 0 0 20px rgba(46, 204, 113, 0.6) !important;
    transition: 0.3s ease !important;
  }
  .landing-page--iim .coupon-btn img:hover {
    transform: scale(1.1) !important;
  }

  .landing-page--iim .call_fix_image img {
    width: 60px !important;
    height: 60px !important;
    position: fixed !important;
    bottom: 95px !important;
    right: 15px !important;
    border-radius: 50px !important;
    z-index: 9998 !important;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 0 35px rgba(46, 204, 113, 0.9) !important;
    transition: transform 0.2s !important;
  }
  .landing-page--iim .call_fix_image:hover img {
    transform: scale(1.1) !important;
  }

  .landing-page--iim .sticky_btn_Section {
    display: none !important;
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim .coupon-btn {
      bottom: 75px !important;
    }
    .landing-page--iim .call_fix_image img {
      bottom: 145px !important;
    }
    .landing-page--iim .sticky_btn_Section {
      display: block !important;
    }
    .landing-page--iim .footer_sticky_buttons {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      position: fixed !important;
      bottom: 0 !important;
      left: 0 !important;
      width: 100% !important;
      z-index: 99999 !important;
      background: #17479E !important;
    }
    .landing-page--iim .footer_sticky_buttons a.wp_btn,
    .landing-page--iim .footer_sticky_buttons button.wp_btn {
      background: #25d366 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 6px !important;
      color: #ffffff !important;
      padding: 12px 6px !important;
      font-size: 15px !important;
      font-weight: 700 !important;
      text-decoration: none !important;
      border: none !important;
      cursor: pointer !important;
    }
    .landing-page--iim .footer_sticky_buttons .apply_btn {
      background: #17479E !important;
      color: #ffffff !important;
      border-radius: 0px !important;
      font-size: 15px !important;
      font-weight: 700 !important;
      border: none !important;
      cursor: pointer !important;
      padding: 12px 6px !important;
    }
  }

  /* =========================================================
     17. DESKTOP VIEW ALIGNMENT & ELIGIBILITY BACKGROUND FIX (>= 1400px)
     ========================================================= */
  @layer utilities {
    @media only screen and (min-width: 1400px) {
      /* 1. Universal alignment across all containers */
      .landing-page--iim .container,
      .landing-page--iim #overview .container,
      .landing-page--iim section.certification#key-skills .container,
      .landing-page--iim #courses .container,
      .landing-page--iim section#courses .container,
      .landing-page--iim #about .container,
      .landing-page--iim #benefits .container,
      .landing-page--iim #sample-degree .container,
      .landing-page--iim section#sample-degree .container,
      .landing-page--iim #placement .container,
      .landing-page--iim section#placement .container,
      .landing-page--iim .achievement .container {
        max-width: 1120px !important;
        margin: 0 auto !important;
        padding: 0 !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }

      /* 2. Overview Section */
      .landing-page--iim #overview {
        padding: 0 !important;
        margin: 35px 0 25px 0 !important;
      }
      .landing-page--iim .overview1 {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        text-align: left !important;
      }

      /* 3. Key Skills Section */
      .landing-page--iim section.certification#key-skills {
        padding: 0 !important;
        margin: 35px 0 !important;
      }
      .landing-page--iim .b2-info {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 16px 18px !important;
        width: 100% !important;
        margin: 18px 0 0 0 !important;
      }

      /* 4. Tools & Technologies (#courses) */
      .landing-page--iim section#courses {
        padding: 0 !important;
        margin: 35px 0 !important;
      }
      .landing-page--iim .course-info {
        grid-template-columns: repeat(3, 1fr) !important;
        gap: 20px !important;
        width: 100% !important;
        margin: 18px 0 0 0 !important;
      }

      /* 5. About Section (#about) */
      .landing-page--iim #about {
        padding: 30px 0 !important;
        margin: 35px 0 0 0 !important;
      }
      .landing-page--iim .about-cnt {
        max-width: 1120px !important;
        width: 100% !important;
        margin: 0 auto !important;
        padding: 0 !important;
        display: grid !important;
        grid-template-columns: 3fr 2fr !important;
        gap: 24px !important;
        align-items: center !important;
      }
      .landing-page--iim .ab1 {
        text-align: left !important;
        align-items: flex-start !important;
      }
      .landing-page--iim .ab1 h2 {
        text-align: left !important;
        margin: 0 0 14px 0 !important;
      }
      .landing-page--iim .ab1 p {
        text-align: left !important;
        margin: 0 0 14px 0 !important;
      }
      .landing-page--iim .ab-box {
        margin: 10px 0 0 0 !important;
        width: 100% !important;
      }

      /* 6. Eligibility Section (#benefits) */
      .landing-page--iim #benefits {
        background-image: url("/assets/all_universities_images/iim/benefit-bg.webp") !important;
        background-size: cover !important;
        background-position: left top !important;
        background-repeat: no-repeat !important;
        padding: 30px 0 !important;
        margin: 0 !important;
        color: #ffffff !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .landing-page--iim .benefits-cnt {
        width: 600px !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box !important;
      }
      .landing-page--iim .benefits-cnt p {
        padding-left: 22px !important;
      }

      /* 7. Achievement / Stats Bar (.achievement) */
      .landing-page--iim .achievement {
        padding: 28px 0 !important;
        width: 100% !important;
      }
      .landing-page--iim .ach {
        max-width: 1120px !important;
        width: 100% !important;
        margin: 0 auto !important;
        padding: 0 !important;
        gap: 20px !important;
      }

      /* 8. Placement Partners (#placement) */
      .landing-page--iim section#placement {
        padding: 0 !important;
        margin: 30px 0 !important;
      }
      .landing-page--iim .placement-section {
        max-width: 1120px !important;
        width: 100% !important;
        margin: 0 auto !important;
        padding: 20px !important;
        background-color: #F2F2F2 !important;
        border-radius: 15px !important;
        display: block !important;
        text-align: center !important;
        box-sizing: border-box !important;
      }
      .landing-page--iim .placement-section h2 {
        text-align: center !important;
        color: #2B2146 !important;
        font-size: 24px !important;
        font-weight: 800 !important;
        margin: 0 0 16px 0 !important;
      }
      .landing-page--iim .placement-img {
        width: 128px !important;
        height: auto !important;
        margin: 6px 10px 6px 7px !important;
        display: inline-block !important;
        vertical-align: middle !important;
        object-fit: contain !important;
      }

      /* 9. Sample Degree (#sample-degree) */
      .landing-page--iim section#sample-degree {
        padding: 0 !important;
        margin: 30px 0 !important;
      }
      .landing-page--iim .degree {
        max-width: 1120px !important;
        width: 100% !important;
        margin: 0 auto !important;
        padding: 0 !important;
      }

   
    }
  }
`;

export const iimData = {
  slug: "iim",
  fontFamily: "Montserrat",
  customCss: iimCustomCss,
  meta: {
    title: "IIM Kozhikode HRM Course | IIM Kozhikode HR Analytics & Online HR Courses",
    description:
      "IIM Kozhikode HRM program and IIM Kozhikode HRM course in HR Analytics. Explore IIM Kozhikode online HR courses, IIM Kozhikode HR analytics fees, eligibility, certification details, and IIM Kozhikode HRM program admission process.",
    keywords: [
      "IIM Kozhikode",
      "hr analytics course",
      "hr analytics certification",
      "IIM Kozhikode HRM",
      "IIM HR course online",
      "IIM Kozhikode distance education",
    ],
    canonicalUrl: "https://distanceeducationschool.com/iim/",
    openGraph: {
      title: "IIM Kozhikode HRM Course | HR Analytics & Online HR Courses",
      description:
        "Earn a 6-month professional certificate from IIM Kozhikode in HR Analytics via upGrad. Real-world case studies and industry projects.",
      url: "https://distanceeducationschool.com/iim/",
      siteName: "Distance Education School",
      images: [
        {
          url: "https://distanceeducationschool.com/iim/assets/img/upgrade_iim_logo.png",
          width: 800,
          height: 600,
          alt: "IIM Kozhikode HRM Analytics",
        },
      ],
      type: "website",
    },
  },

  brand: {
    name: "IIM Kozhikode",
    shortName: "IIM",
    slug: "iim",
    headline: "HRM Analytics Online Certification",
    partnerNote: "By IIM Kozhikode via upGrad",
    phone: "+91 7065 7777 55",
    phoneDisplay: "+91 7065 7777 55",
    phoneTel: "07065777755",
    officialUrl: "https://distanceeducationschool.com/iim/",
    brochurePdf: "/assets/all_universities_images/iim/main_brochure.pdf",
    logo: "/assets/all_universities_images/iim/upgrade_iim_logo.png",
    sodeLogo: "/assets/all_universities_images/iim/new_sode_tm_logo.png",
    sodeIcon: "/assets/all_universities_images/iim/new_sode_tm_logo.png",
    desLogo: "/assets/all_universities_images/iim/new-des-logo.webp",
    primaryColor: "#17479E",
    accentColor: "#0CB1EF",
    fontFamily: "Montserrat",
    showSodeLogo: true,
    hideUniversityLogo: true,
    showCouponBtn: false,
    showCouponButton: false,
    showFloatingGift: true,
    hideNavbarBadge: true,
    customCss: iimCustomCss,
    navLinks: [
      { label: "About", href: "#about" },
      { label: "Eligibility", href: "#benefits" },
      { label: "Sample Degree", href: "#sample-degree" },
      { label: "FAQ", href: "#faqs" },
    ],
    arrowGif: "/assets/all_universities_images/iim/arrow.gif",
    giftGif: "/assets/all_universities_images/iim/gift.gif",
    callGif: "/assets/all_universities_images/iim/call_icon.gif",
    footerVariant: "v1",
    footerLogo: "/assets/all_universities_images/iim/new-des-logo.webp",
    footerBottomBg: "#0b3c66",

    // Layout mappings
    statsLayout: "iim",
    aboutLayout: "iim",
    whyChooseLayout: "iim",
    degreeLayout: "iim",
    recruitersLayout: "iim",
    faqLayout: "iim",
    stickyCtaLayout: "iim",
    faqAccentColor: "#17479E",
    faqTitle: "FAQ | Frequently Asked Questions",
    admissionTitle: "How to Apply for IIM Kozhikode University Online Courses",
    admissionSubtitle: "Students can easily enrol in IIM Kozhikode University Online courses. Candidates can conveniently apply by selecting their desired program. Follow these steps to secure admission in the university.",

    // Global Compare Banner Configuration
    compareBannerBg: "#17479E",
    compareUniversityName: "IIM Kozhikode University",
    compareSubtitle: "Compare IIM Kozhikode University with Top World Renowned Universities",
    compareSectionBg: "bg-[#f6f8fa]",
    compareSectionBgColor: "#f6f8fa",
    arrowGif: "/assets/all_universities_images/iim/arrow.gif",

    sectionOrder: [
      "stats",
      "overview",
      "keySkills",
      "tools",
      "about",
      "benefits",
      "degree",
      "recruiters",
      "admissionProcess",
      "faqs",
      "compareBanner",
    ],

    hero: {
      style: "iim",
      backgroundImage: "/assets/all_universities_images/iim/iim_desktop_new_img.png",
      mobileBackgroundImage: "/assets/all_universities_images/iim/new_iim_mobile_bg.png",
      backgroundPosition: "center -140px",
      desktopBackgroundPosition: "center -140px",
      noOverlay: true,
      minHeight: "auto",

      logo: "/assets/all_universities_images/iim/upgrade_iim_logo.png",
      logoContainerClassName: "hero-logo-container",
      headlineHtml: "HRM Analytics<br/>Online Certification",
      headingText: "HRM Analytics\nOnline Certification",
      headingColor: "#17479E",
      headingClassName: "hero-headline",
      taglineText: (
        <span>
          By <u className="underline">IIM Kozhikode</u> via <u className="underline">Upgrade</u>
        </span>
      ),
      taglineClassName: "hero-tagline",
      description:
        "Earn a 6-month professional certificate from IIM Kozhikode. This HR Analytics course covers recruitment, job posting, and workforce management via case studies & real-world projects.",
      descriptionColor: "#333333",
      descriptionClassName: "hero-description tracking-wide",
      courseLines: ["🕒 6 Months"],
      hideCourseBox: true,
      courseStripClassName: "hero-clock-badge",
      brochureButtonText: "Get Brochure",
      buttonBackground: "#17479E",
      buttonTextColor: "#ffffff",
      buttonClassName: "hero-brochure-btn",
      hideBrochureOnMobile: true,
      mobileStudentImage: "/assets/all_universities_images/iim/iim_mobile_new_img.png",
      hideTermsCheckbox: true,
      form: {
        hideTermsCheckbox: true,
      },
      formCardType: "white",
      formTitleColor: "#17479E",
      phoneBadgeBg: "#17479E",
      phoneBadgeBackground: "#17479E",
      submitBtnBg: "#17479E",
      submitBtnText: "Submit",

      enquireTitle: "Admission Open",
      enquireSubtitle: "Academic Experts will assist you!",
    },

    enquireTitle: "Admission Open",
    enquireSubtitle: "Academic Experts will assist you!",
  },

  courses: [
    { value: "HR & Analytics", label: "HR & Analytics" },
  ],

  stats: [
    { number: "50%", label: "Avg Salary Hike", icon: "/assets/all_universities_images/iim/ic-01.webp" },
    { number: "10K+", label: "Student Enrolled", icon: "/assets/all_universities_images/iim/ic-02.webp" },
    { number: "100+", label: "Hiring Partners", icon: "/assets/all_universities_images/iim/ic-03.webp" },
    { number: "500+", label: "Industry Experts", icon: "/assets/all_universities_images/iim/ic-04.webp" },
  ],

  overview: {
    title: "The IIM Kozhikode HRM Analytics Certification Courses",
    paragraph:
      "The certificate course of IIM Kozhikode in HR Analytics is a 6-month online program that helps professionals learn HR concepts with modern analytics. The course is 280 hours of expert learning, live faculty sessions, and industry projects. Learners receive hands-on training in tools such as Tableau, Excel, and Power BI. The course is recognized as one of the leading HR courses. It is ideal for HR professionals, managers, and MBA graduates seeking to advance their careers.",
    buttonText: "Download Brochure",
  },

  keySkills: [
    {
      title: "Strategic Human Resource Management",
      desc: "Learn to align HR frameworks with long-term organizational goals and business growth.",
      icon: "/assets/all_universities_images/iim/icon-iim-01.webp",
    },
    {
      title: "HR Data Interpretation and Reporting",
      desc: "Develop the ability to analyze complex HR data sets and create meaningful reports for leadership decision-making.",
      icon: "/assets/all_universities_images/iim/icon-iim-02.webp",
    },
    {
      title: "Workforce Planning and Forecasting",
      desc: "Acquire tools to predict staffing needs, manage workforce gaps, and ensure future-ready talent pipelines.",
      icon: "/assets/all_universities_images/iim/icon-iim-03.webp",
    },
    {
      title: "Talent Analytics",
      desc: "Apply evidence-based methods to measure productivity, identify high-potential employees, and improve overall performance.",
      icon: "/assets/all_universities_images/iim/icon-iim-04.webp",
    },
    {
      title: "Employee Engagement and Retention",
      desc: "Master strategies to enhance job satisfaction, reduce attrition, and strengthen employee loyalty.",
      icon: "/assets/all_universities_images/iim/icon-iim-05.webp",
    },
    {
      title: "People Analytics",
      desc: "Explore behavioral insights to understand workforce dynamics and improve workplace culture and efficiency.",
      icon: "/assets/all_universities_images/iim/icon-iim-06.webp",
    },
  ],

  tools: [
    {
      name: "Power BI ",
      desc: "Transform HR data into dynamic dashboards and interactive reports that support strategic decisions.",
      image: "/assets/all_universities_images/iim/power-bi.webp",
    },
    {
      name: "Tableau",
      desc: "Build advanced data visualizations to track employee performance, workforce trends, and organizational growth.",
      image: "/assets/all_universities_images/iim/tableau.webp",
    },
    {
      name: "Microsoft Excel",
      desc: "Strengthen skills in workforce planning, data management, and predictive modeling with the HR tool.",
      image: "/assets/all_universities_images/iim/microsoft-excel.webp",
    },
  ],

  about: {
    title: "ABOUT IIM - KOZHIKODE",
    paragraphs: [
      "IIM Kozhikode is recognized as one of India’s leading business schools, known for its innovative teaching, global outlook, and strong industry partnerships. The institute offers a broad portfolio of programs, including executive and online learning opportunities tailored for professionals. With prestigious accreditations such as the Ministry of Education, EQUIS, and AACSB, IIM Kozhikode stands among globally benchmarked institutions. Through its specialized programs, such as IIM Kozhikode's HRM, and advanced certification options, the institute ensures that learners gain both academic depth and practical business insights. These certification courses in IIM Kozhikode are designed to prepare graduates, working executives, and managers to succeed in leadership and analytics-driven roles worldwide.",
    ],
    campusImage: "/assets/all_universities_images/iim/iim-university-image.webp",
    accreditations: [
      { name: "AMBA", image: "/assets/all_universities_images/iim/amba-iim.webp" },
      { name: "EQUIS", image: "/assets/all_universities_images/iim/equis-iim.webp" },
      { name: "AACSB", image: "/assets/all_universities_images/iim/aacsb-iim.webp" },
      { name: "Ministry of Education", image: "/assets/all_universities_images/iim/ministry-of-education.webp" },
    ],
    buttonText: "Get Counseling",
  },

  whyChoose: [
    {
      title: "HR Professionals",
      desc: "Working HR professionals can enroll in the IIM Kozhikode HR Analytics Course to enhance decision-making skills and apply analytics in workforce management.",
    },
    {
      title: "Business and Analytics Managers",
      desc: "Managers from different fields can join IIM Kozhikode HRM online courses to integrate data-driven strategies into business and people management.",
    },
    {
      title: "Non-HR Professionals",
      desc: "Graduates or executives from other domains can pursue the HR Analytics programs at IIM Kozhikode to transition into HR-focused or leadership roles.",
    },
    {
      title: "MBA Graduates",
      desc: "Fresh MBA graduates can strengthen their profiles with specialized certification courses in IIM Kozhikode, gaining practical HR analytics expertise for better career opportunities.",
    },
  ],

  eligibility: {
    title: "Eligibility for IIM Kozhikode HRM Online Courses",
    desktopBg: "/assets/all_universities_images/iim/benefit-bg.webp",
    mobileBg: "/assets/all_universities_images/iim/mobile-bg-for-benefits.webp",
    items: [
      {
        title: "HR Professionals",
        desc: "Working HR professionals can enroll in the IIM Kozhikode HR Analytics Course to enhance decision-making skills and apply analytics in workforce management.",
      },
      {
        title: "Business and Analytics Managers",
        desc: "Managers from different fields can join IIM Kozhikode HRM online courses to integrate data-driven strategies into business and people management.",
      },
      {
        title: "Non-HR Professionals",
        desc: "Graduates or executives from other domains can pursue the HR Analytics programs at IIM Kozhikode to transition into HR-focused or leadership roles.",
      },
      {
        title: "MBA Graduates",
        desc: "Fresh MBA graduates can strengthen their profiles with specialized certification courses in IIM Kozhikode, gaining practical HR analytics expertise for better career opportunities.",
      },
    ],
    buttonText: "Get 100% Free Counseling",
  },

  degree: {
    title: "IIM Kozhikode\nSample Degree",
    subtitle: "HR Analytics Certification Course",
    description:
      "Complete all course modules and earn a professional HR Management and Analytics certification from IIM Kozhikode. This course will help you develop important skills for the HR field. It will also boost your career and make you more competitive in the job market.",
    image: "/assets/all_universities_images/iim/sample-certificate.webp",
    buttonText: "Get Degree",
  },

  placementPartners: [
    { name: "Capco", image: "/assets/all_universities_images/iim/capco.webp" },
    { name: "Cognizant", image: "/assets/all_universities_images/iim/Cognizant.webp" },
    { name: "Delhivery", image: "/assets/all_universities_images/iim/Delhivery.webp" },
    { name: "Capita", image: "/assets/all_universities_images/iim/capita.webp" },
    { name: "Disney", image: "/assets/all_universities_images/iim/disnep.webp" },
    { name: "Codeyoung", image: "/assets/all_universities_images/iim/codeyoung.webp" },
    { name: "CBSPL", image: "/assets/all_universities_images/iim/cbspl.webp" },
  ],

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

  faqs: [
    {
      q: "Q1. What is the duration of the IIM Kozhikode HR Analytics Course?",
      a: "The IIM Kozhikode HR Analytics Course spans 6 months and comprises live classes, industry projects, and hands-on learning with tools such as Power BI, Tableau, and Excel.",
    },
    {
      q: "Q2. Is the IIM Kozhikode HRM Online Course suitable for working professionals?",
      a: "Yes, the IIM Kozhikode HRM Online Courses are designed for flexibility, making them ideal for professionals who want to balance work while upgrading their skills.",
    },
    {
      q: "Q3. What certifications will I receive upon completing the program?",
      a: "Learners receive a recognized certification from IIM Kozhikode, along with a Power BI certification, making it one of the most valuable certification courses offered by IIM Kozhikode.",
    },
    {
      q: "Q4. What key skills are taught in HR Analytics IIM Kozhikode programs?",
      a: "The program covers strategic HR management, workforce planning, employee retention strategies, talent analytics, and people analytics, helping learners build practical expertise for career growth.",
    },
  ],

  compare: {
    title: "Still Confused?",
    subtitle: "Compare IIM Kozhikode University with Top World Renowned Universities",
    arrowImg: "/assets/all_universities_images/iim/arrow.gif",
  },
};
