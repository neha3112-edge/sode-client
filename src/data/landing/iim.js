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
  @import url("https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800&display=swap");

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
    padding: 0 15px !important;
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
    padding: 11px 24px !important;
    color: #ffffff !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    border-radius: 20px !important;
    cursor: pointer !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
    transition: background 0.2s, transform 0.1s !important;
    text-decoration: none !important;
    box-shadow: 0 4px 12px rgba(12, 177, 239, 0.3) !important;
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
    font-size: 15px !important;
    font-weight: 600 !important;
    color: #111111 !important;
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
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: center top !important;
    padding: 30px 0 35px 0 !important;
    margin: 0 !important;
    position: relative !important;
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
    margin-bottom: 10px !important;
  }
  .landing-page--iim #hero .hero-logo-container img {
    width: 220px !important;
    height: auto !important;
    object-fit: contain !important;
    object-position: left center !important;
  }

  .landing-page--iim #hero h1 {
    font-family: 'Anton', 'Montserrat', sans-serif !important;
    font-size: 48px !important;
    color: #17479E !important;
    font-weight: 500 !important;
    line-height: 1.05 !important;
    margin: 6px 0 10px 0 !important;
    letter-spacing: 0.5px !important;
    text-transform: uppercase !important;
  }

  .landing-page--iim #hero .hero-tagline {
    font-size: 17px !important;
    font-weight: 700 !important;
    color: #111111 !important;
    margin: 0 0 10px 0 !important;
    line-height: 1.3 !important;
  }

  .landing-page--iim #hero .hero-description {
    font-size: 14px !important;
    color: #333333 !important;
    line-height: 1.5 !important;
    max-width: 520px !important;
    margin: 0 0 14px 0 !important;
  }

  .landing-page--iim #hero .hero-clock-badge {
    display: inline-flex !important;
    align-items: center !important;
    gap: 7px !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    color: #111111 !important;
    margin: 0 0 18px 0 !important;
  }

  .landing-page--iim #hero .hero-brochure-btn {
    background: #17479E !important;
    color: #ffffff !important;
    border: none !important;
    border-radius: 8px !important;
    font-weight: 700 !important;
    font-size: 15px !important;
    padding: 10px 24px !important;
    box-shadow: 0 4px 12px rgba(23, 71, 158, 0.3) !important;
    cursor: pointer !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
    width: fit-content !important;
    transition: background 0.2s, transform 0.1s !important;
  }
  .landing-page--iim #hero .hero-brochure-btn:hover {
    background: #123980 !important;
  }
  .landing-page--iim #hero .hero-brochure-btn:active {
    transform: scale(0.97) !important;
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
    font-weight: 700 !important;
    font-size: 15px !important;
    height: 42px !important;
    border: none !important;
    transition: background 0.2s !important;
  }
  .landing-page--iim #hero .landing-lead-form .submit-btn:hover,
  .landing-page--iim #hero .landing-lead-form button[type="submit"]:hover {
    background: #123980 !important;
  }

  /* Responsive Hero */
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
      padding: 20px 12px 25px 12px !important;
    }
    .landing-page--iim #hero .hero-info-col {
      text-align: center !important;
      align-items: center !important;
      padding: 0 !important;
    }
    .landing-page--iim #hero h1 {
      order: 1 !important;
      font-size: 32px !important;
      text-align: center !important;
      margin: 0 0 8px 0 !important;
    }
    .landing-page--iim #hero .hero-tagline {
      order: 2 !important;
      text-align: center !important;
      font-size: 15.5px !important;
      margin: 0 0 8px 0 !important;
    }
    .landing-page--iim #hero .hero-description {
      order: 3 !important;
      text-align: center !important;
      font-size: 13px !important;
      margin: 0 0 10px 0 !important;
    }
    .landing-page--iim #hero .hero-clock-badge {
      order: 4 !important;
      justify-content: center !important;
      margin: 0 0 16px 0 !important;
    }
    .landing-page--iim #hero .hero-logo-container {
      display: none !important;
    }
    .landing-page--iim #hero .hero-mobile-image-wrapper {
      display: block !important;
      position: relative !important;
      width: 100% !important;
      max-width: 360px !important;
      height: 220px !important;
      margin: 10px auto 16px auto !important;
    }
    .landing-page--iim #hero .hero-brochure-btn,
    .landing-page--iim #hero .hero-info-col .hero-brochure-btn {
      display: none !important;
    }
    .landing-page--iim #hero .hero-form-col {
      width: 100% !important;
      margin-top: 5px !important;
    }
  }

  @media only screen and (max-width: 480px) {
    .landing-page--iim #hero h1 {
      font-size: 28px !important;
    }
    .landing-page--iim #hero .hero-tagline {
      font-size: 14.5px !important;
    }
  }

  /* =========================================================
     4. ACHIEVEMENT / STATS BAR (.achievement)
     ========================================================= */
  .landing-page--iim .achievement {
    background-color: #FFE5B2 !important;
    padding: 24px 15px !important;
    width: 100% !important;
    margin: 0 !important;
  }

  .landing-page--iim .ach {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 20px !important;
    max-width: 1120px !important;
    margin: 0 auto !important;
  }

  .landing-page--iim .ac1 {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 12px !important;
  }

  .landing-page--iim .ac1 img {
    width: 46px !important;
    height: auto !important;
    object-fit: contain !important;
    flex-shrink: 0 !important;
  }

  .landing-page--iim .ach h3 {
    font-size: 28px !important;
    color: #17479E !important;
    margin: 0 !important;
    font-weight: 800 !important;
    line-height: 1.1 !important;
  }

  .landing-page--iim .ac1 p {
    font-weight: 600 !important;
    font-size: 13px !important;
    color: #111111 !important;
    margin: 0 !important;
    line-height: 1.25 !important;
  }

  @media only screen and (max-width: 991px) {
    .landing-page--iim .ach h3 {
      font-size: 24px !important;
    }
    .landing-page--iim .ac1 p {
      font-size: 12px !important;
    }
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim .ach {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 18px 12px !important;
    }
    .landing-page--iim .ac1 {
      justify-content: flex-start !important;
      padding-left: 10px !important;
    }
    .landing-page--iim .ach h3 {
      font-size: 24px !important;
    }
    .landing-page--iim .ac1 img {
      width: 42px !important;
    }
  }

  /* =========================================================
     5. OVERVIEW SECTION (#overview)
     ========================================================= */
  .landing-page--iim #overview {
    margin: 40px 0 !important;
    padding: 10px 20px !important;
  }

  .landing-page--iim .overview1 {
    text-align: center !important;
    max-width: 980px !important;
    margin: 0 auto !important;
  }

  .landing-page--iim .overview1 h2 {
    font-size: 28px !important;
    font-weight: 800 !important;
    color: #111111 !important;
    margin: 0 0 16px 0 !important;
    line-height: 1.3 !important;
  }

  .landing-page--iim .overview1 p {
    font-size: 14.5px !important;
    color: #444444 !important;
    line-height: 1.65 !important;
    margin: 0 !important;
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim .overview1 h2 {
      font-size: 22px !important;
    }
    .landing-page--iim .overview1 p {
      font-size: 13.5px !important;
    }
  }

  /* =========================================================
     6. KEY SKILLS SECTION (#key-skills)
     ========================================================= */
  .landing-page--iim section.certification#key-skills {
    margin: 40px 0 !important;
    padding: 10px 20px !important;
  }

  .landing-page--iim #key-skills h2 {
    font-size: 26px !important;
    font-weight: 800 !important;
    text-align: center !important;
    color: #111111 !important;
    margin: 0 0 12px 0 !important;
    line-height: 1.3 !important;
  }

  .landing-page--iim #key-skills p {
    font-size: 13.5px !important;
    text-align: center !important;
    color: #444444 !important;
    margin: 0 !important;
  }

  .landing-page--iim .b2-info {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 22px !important;
    margin-top: 25px !important;
    max-width: 1120px !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .landing-page--iim .b1 {
    background: #ffffff !important;
    padding: 16px 20px !important;
    border-radius: 10px !important;
    border: 2px solid #17479E !important;
    display: flex !important;
    align-items: flex-start !important;
    gap: 16px !important;
    box-sizing: border-box !important;
    transition: transform 0.2s, box-shadow 0.2s !important;
  }
  .landing-page--iim .b1:hover {
    box-shadow: 0 6px 18px rgba(23, 71, 158, 0.12) !important;
  }

  .landing-page--iim .b1 img {
    width: 60px !important;
    height: auto !important;
    flex-shrink: 0 !important;
    object-fit: contain !important;
    margin-top: 2px !important;
  }

  .landing-page--iim .b1 h3 {
    color: #17479E !important;
    font-size: 17px !important;
    margin: 0 0 6px 0 !important;
    font-weight: 700 !important;
    line-height: 1.3 !important;
  }

  .landing-page--iim .b1 p {
    font-size: 13px !important;
    color: #444444 !important;
    line-height: 1.4 !important;
    text-align: left !important;
    margin: 0 !important;
  }

  @media only screen and (max-width: 991px) {
    .landing-page--iim .b2-info {
      grid-template-columns: 1fr !important;
      gap: 16px !important;
    }
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim #key-skills h2 {
      font-size: 21px !important;
    }
    .landing-page--iim .b1 {
      padding: 12px 14px !important;
    }
    .landing-page--iim .b1 img {
      width: 50px !important;
    }
    .landing-page--iim .b1 h3 {
      font-size: 15.5px !important;
    }
  }

  /* =========================================================
     7. TOOLS & TECHNOLOGIES SECTION (#courses)
     ========================================================= */
  .landing-page--iim section#courses {
    margin: 40px 0 !important;
    padding: 10px 20px !important;
  }

  .landing-page--iim #courses h2 {
    font-size: 26px !important;
    font-weight: 800 !important;
    text-align: center !important;
    color: #111111 !important;
    margin: 0 0 12px 0 !important;
    line-height: 1.3 !important;
  }

  .landing-page--iim #courses p {
    font-size: 13.5px !important;
    text-align: center !important;
    color: #444444 !important;
    margin: 0 !important;
    line-height: 1.5 !important;
  }

  .landing-page--iim .course-info {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 25px !important;
    margin-top: 25px !important;
    max-width: 1120px !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .landing-page--iim .c1 {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08) !important;
    border-radius: 12px !important;
    overflow: hidden !important;
    background: #ffffff !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    height: 100% !important;
  }

  .landing-page--iim .c1 .c1-img-wrap {
    min-height: 140px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 20px !important;
    background: #ffffff !important;
  }

  .landing-page--iim .c1 img {
    max-width: 180px !important;
    max-height: 85px !important;
    object-fit: contain !important;
    margin: auto !important;
    display: block !important;
  }

  .landing-page--iim #courses .c1 p,
  .landing-page--iim .c1 p,
  .landing-page--iim .c1 .c1-desc {
    background-color: #17479E !important;
    color: #ffffff !important;
    padding: 16px 18px 20px 18px !important;
    font-size: 13.5px !important;
    border-bottom-left-radius: 12px !important;
    border-bottom-right-radius: 12px !important;
    margin: 0 !important;
    text-align: left !important;
    line-height: 1.55 !important;
    display: block !important;
    min-height: 105px !important;
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

  @media only screen and (max-width: 991px) {
    .landing-page--iim .course-info {
      grid-template-columns: 1fr !important;
      gap: 20px !important;
    }
    .landing-page--iim #courses h2 {
      font-size: 21px !important;
    }
  }

  /* =========================================================
     8. ABOUT IIM - KOZHIKODE SECTION (#about)
     ========================================================= */
  .landing-page--iim #about {
    background-color: #F0F3FA !important;
    color: #111111 !important;
    padding: 45px 20px !important;
    margin: 35px 0 !important;
  }

  .landing-page--iim #about h2 {
    color: #17479E !important;
    font-weight: 800 !important;
    font-size: 28px !important;
    margin: 0 0 15px 0 !important;
  }

  .landing-page--iim #about p {
    font-size: 14px !important;
    color: #333333 !important;
    line-height: 1.65 !important;
  }

  .landing-page--iim #about .bg-white {
    background: transparent !important;
    border: 1px solid #111111 !important;
    border-radius: 10px !important;
    padding: 14px 12px !important;
    box-shadow: none !important;
  }

  .landing-page--iim #about .bg-white p {
    color: #111111 !important;
    font-weight: 700 !important;
    font-size: 13px !important;
    margin-bottom: 10px !important;
  }

  .landing-page--iim #about img {
    border-radius: 8px !important;
  }

  /* =========================================================
     9. ELIGIBILITY / BENEFITS SECTION (#benefits)
     ========================================================= */
  .landing-page--iim #benefits {
    background-image: url("/assets/all_universities_images/iim/benefit-bg.webp") !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: center right !important;
    color: #ffffff !important;
    padding: 50px 30px !important;
    margin: 35px 0 !important;
  }

  .landing-page--iim .benefits-cnt {
    width: 600px !important;
    max-width: 100% !important;
  }

  .landing-page--iim .benefits-cnt h2 {
    font-size: 28px !important;
    font-weight: 800 !important;
    color: #ffffff !important;
    margin: 0 0 20px 0 !important;
    line-height: 1.3 !important;
  }

  .landing-page--iim .benefits-cnt h3 {
    font-size: 17px !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    margin: 0 0 4px 0 !important;
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
  }

  .landing-page--iim .benefits-cnt p {
    padding-left: 22px !important;
    font-size: 13.5px !important;
    color: #f1f5f9 !important;
    line-height: 1.5 !important;
    margin: 0 !important;
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim #benefits {
      background-image: url("/assets/all_universities_images/iim/mobile-bg-for-benefits.webp") !important;
      background-size: cover !important;
      background-position: center top !important;
      padding: 30px 20px !important;
      padding-bottom: 270px !important;
    }
    .landing-page--iim .benefits-cnt {
      width: 100% !important;
      max-width: 380px !important;
    }
    .landing-page--iim .benefits-cnt h2 {
      font-size: 22px !important;
    }
    .landing-page--iim .benefits-cnt h3 {
      font-size: 15.5px !important;
    }
    .landing-page--iim .benefits-cnt p {
      font-size: 12.5px !important;
    }
  }

  /* =========================================================
     10. SAMPLE DEGREE SECTION (#sample-degree)
     ========================================================= */
  .landing-page--iim section#sample-degree {
    margin: 40px 0 !important;
    padding: 10px 20px !important;
  }

  .landing-page--iim .degree {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 30px !important;
    align-items: center !important;
    max-width: 1120px !important;
    margin: 0 auto !important;
  }

  .landing-page--iim .degree img {
    width: 440px !important;
    max-width: 100% !important;
    height: auto !important;
    border-radius: 8px !important;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1) !important;
  }

  .landing-page--iim .degree-info h2 {
    color: #17479E !important;
    font-size: 38px !important;
    font-weight: 700 !important;
    line-height: 1.15 !important;
    margin: 0 0 10px 0 !important;
  }

  .landing-page--iim .degree-info h3 {
    font-size: 20px !important;
    font-weight: 600 !important;
    color: #111111 !important;
    margin: 0 0 15px 0 !important;
  }

  .landing-page--iim .degree-info p {
    font-size: 14px !important;
    color: #444444 !important;
    line-height: 1.6 !important;
    margin: 0 0 20px 0 !important;
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim .degree {
      grid-template-columns: 1fr !important;
      text-align: center !important;
      gap: 20px !important;
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
    padding: 35px 25px !important;
    background-color: #F2F2F2 !important;
    border-radius: 16px !important;
    text-align: center !important;
    max-width: 1120px !important;
    margin: 0 auto !important;
  }

  .landing-page--iim .placement-section h2 {
    text-align: center !important;
    color: #2B2146 !important;
    font-size: 26px !important;
    font-weight: 700 !important;
    margin: 0 0 24px 0 !important;
    letter-spacing: 0.5px !important;
  }

  .landing-page--iim .placement-img {
    width: 125px !important;
    height: auto !important;
    margin: 10px 14px !important;
    display: inline-block !important;
    vertical-align: middle !important;
    object-fit: contain !important;
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim .placement-img {
      width: 95px !important;
      margin: 8px 6px !important;
    }
  }

  /* =========================================================
     12. HOW TO APPLY (#how-to-apply)
     ========================================================= */
  .landing-page--iim .apply-section {
    padding: 50px 20px !important;
    background: #ffffff !important;
    text-align: center !important;
    margin: 0 !important;
  }

  .landing-page--iim .apply-section h2 {
    font-size: 28px !important;
    font-weight: 700 !important;
    text-align: center !important;
    color: #193579 !important;
    margin: 0 0 10px 0 !important;
  }

  .landing-page--iim .section-desc {
    max-width: 900px !important;
    margin: 0 auto 30px auto !important;
    color: #555555 !important;
    font-size: 14px !important;
    line-height: 1.55 !important;
  }

  .landing-page--iim .steps-wrapper {
    display: grid !important;
    grid-template-columns: repeat(6, 1fr) !important;
    gap: 15px !important;
    max-width: 1120px !important;
    margin: 0 auto !important;
  }

  .landing-page--iim .step-card {
    background: #ffffff !important;
    padding: 20px 14px !important;
    border-radius: 14px !important;
    position: relative !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05) !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
  }

  .landing-page--iim .step-card h4 {
    font-size: 15px !important;
    margin: 15px 0 8px 0 !important;
    color: #000000 !important;
    font-weight: 600 !important;
  }

  .landing-page--iim .step-card p {
    font-size: 12px !important;
    color: #444444 !important;
    line-height: 1.35 !important;
    margin: 0 !important;
  }

  .landing-page--iim .step-number {
    width: 44px !important;
    height: 44px !important;
    border-radius: 50% !important;
    margin: 0 auto !important;
    font-size: 19px !important;
    font-weight: bold !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: #ffffff !important;
  }

  .landing-page--iim .step-card::after {
    content: "" !important;
    position: absolute !important;
    bottom: 0 !important;
    left: 0 !important;
    height: 5px !important;
    width: 100% !important;
    border-radius: 0 0 14px 14px !important;
  }

  .landing-page--iim .orange .step-number { border: 3px solid #ff8c32 !important; color: #ff8c32 !important; }
  .landing-page--iim .orange::after { background: #ff8c32 !important; }
  .landing-page--iim .orange { background: #fff4e9 !important; }

  .landing-page--iim .blue .step-number { border: 3px solid #0b5ed7 !important; color: #0b5ed7 !important; }
  .landing-page--iim .blue::after { background: #0b5ed7 !important; }
  .landing-page--iim .blue { background: #f2f8ff !important; }

  .landing-page--iim .pink .step-number { border: 3px solid #ff2d6f !important; color: #ff2d6f !important; }
  .landing-page--iim .pink::after { background: #ff2d6f !important; }
  .landing-page--iim .pink { background: #fff1f6 !important; }

  .landing-page--iim .green .step-number { border: 3px solid #1faa59 !important; color: #1faa59 !important; }
  .landing-page--iim .green::after { background: #1faa59 !important; }
  .landing-page--iim .green { background: #effff5 !important; }

  .landing-page--iim .purple .step-number { border: 3px solid #8e2de2 !important; color: #8e2de2 !important; }
  .landing-page--iim .purple::after { background: #8e2de2 !important; }
  .landing-page--iim .purple { background: #f9f0ff !important; }

  @media (max-width: 1200px) {
    .landing-page--iim .steps-wrapper {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }
  @media (max-width: 768px) {
    .landing-page--iim .steps-wrapper {
      grid-template-columns: repeat(1, 1fr) !important;
    }
    .landing-page--iim .apply-section h2 {
      font-size: 21px !important;
    }
  }

  /* =========================================================
     13. FAQS SECTION (#faqs)
     ========================================================= */
  .landing-page--iim #faqs {
    margin: 40px 0 !important;
    padding: 10px 20px !important;
  }

  .landing-page--iim #faqs h2 {
    font-size: 26px !important;
    font-weight: 700 !important;
    color: #111111 !important;
    margin: 0 0 25px 0 !important;
    text-align: left !important;
  }

  .landing-page--iim #faqs .divide-y {
    border-top: none !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
    max-width: 900px !important;
    margin: 0 auto !important;
  }

  .landing-page--iim #faqs .divide-y > div {
    border: 1px solid #dee2e6 !important;
    border-left: 5px solid #17479E !important;
    border-radius: 5px !important;
    background: #ffffff !important;
    padding: 0 18px !important;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04) !important;
  }

  .landing-page--iim #faqs button {
    padding: 15px 0 !important;
    width: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    cursor: pointer !important;
  }

  .landing-page--iim #faqs button span:first-child {
    font-size: 15px !important;
    font-weight: 600 !important;
    color: #111111 !important;
    line-height: 1.4 !important;
  }

  .landing-page--iim #faqs button span:last-child {
    color: #17479E !important;
    font-size: 20px !important;
    font-weight: bold !important;
    margin-left: 12px !important;
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
`;

export const iimData = {
  slug: "iim",
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
    admissionLayout: "iim",
    faqLayout: "iim",
    stickyCtaLayout: "iim",
    faqAccentColor: "#17479E",
    faqTitle: "FAQ | Frequently Asked Questions",

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
      backgroundPosition: "center top",
      noOverlay: true,
      minHeight: "440px",

      logo: "/assets/all_universities_images/iim/upgrade_iim_logo.png",
      logoContainerClassName: "hero-logo-container",
      headingText: "HRM Analytics\nOnline Certification",
      headingColor: "#17479E",
      headingClassName: "hero-headline",
      taglineText: "By IIM Kozhikode via Upgrade",
      taglineClassName: "hero-tagline",
      description:
        "Earn a 6-month professional certificate from IIM Kozhikode. This HR Analytics course covers recruitment, job posting, and workforce management via case studies & real-world projects.",
      descriptionColor: "#333333",
      descriptionClassName: "hero-description",
      courseLines: ["🕒 6 Months"],
      hideCourseBox: true,
      courseStripClassName: "hero-clock-badge",
      brochureButtonText: "Get Brochure",
      buttonBackground: "#17479E",
      buttonTextColor: "#ffffff",
      buttonClassName: "hero-brochure-btn",
      hideBrochureOnMobile: true,
      mobileStudentImage: "/assets/all_universities_images/iim/iim_mobile_new_img.png",
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
      name: "Power BI",
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
      "IIM Kozhikode is recognized as one of India’s leading business schools, known for its innovative teaching, global outlook, and strong industry partnerships. The institute offers a broad portfolio of programs, including executive and online learning opportunities tailored for professionals. With prestigious accreditations such as the Ministry of Education, EQUIS, and AACSB, IIM Kozhikode stands among globally benchmarked institutions.",
      "Through its specialized programs, such as IIM Kozhikode's HRM, and advanced certification options, the institute ensures that learners gain both academic depth and practical business insights. These certification courses in IIM Kozhikode are designed to prepare graduates, working executives, and managers to succeed in leadership and analytics-driven roles worldwide.",
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

  howToApply: {
    title: "How to Apply for IIM Kozhikode University Online Courses",
    desc: "Students can easily enrol in IIM Kozhikode University Online courses. Candidates can conveniently apply by selecting their desired program. Follow these steps to secure admission in the university.",
    steps: [
      {
        num: 1,
        title: "Submit Form",
        desc: "Fill in and submit your application form online",
        colorClass: "orange",
      },
      {
        num: 2,
        title: "Expert's Counseling",
        desc: "You will receive a call from our expert counselor",
        colorClass: "blue",
      },
      {
        num: 3,
        title: "Choose University",
        desc: "Select the course & university according to your interest",
        colorClass: "pink",
      },
      {
        num: 4,
        title: "Online Payment",
        desc: "You need to make a smooth online fee submission",
        colorClass: "green",
      },
      {
        num: 5,
        title: "Document Submit",
        desc: "You need to upload all the required verified documents.",
        colorClass: "purple",
      },
      {
        num: 6,
        title: "Admission Confirm",
        desc: "Get Confirmation on your Email & Whatsapp",
        colorClass: "orange",
      },
    ],
  },

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
