/**
 * IIM Kozhikode (upGrad) HRM Analytics Landing Page Configuration & Embedded CSS
 * Pixel-perfect match to https://distanceeducationschool.com/iim/
 */

export const iimCustomCss = `
  /* =========================================================
     1. GOOGLE FONTS & GLOBAL TYPOGRAPHY
     ========================================================= */
  @import url("https://fonts.googleapis.com/css2?family=Anton&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800&display=swap");

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
    --text-dark-color: #333;
    --footer-color: #2B2146;
    --heading-color: #111111;
    --button-color: #e74c3c;
    --button-hover-color: #c0392b;

    font-family: 'Montserrat', sans-serif !important;
    scroll-behavior: smooth;
    color: #111111;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
  }

  .landing-page--iim .container {
    max-width: 1120px !important;
    margin: auto !important;
    padding: 0px 15px !important;
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

  .landing-page--iim .downloadBrochureBtn {
    background: #0CB1EF !important;
    border: none !important;
    padding: 10px 22px !important;
    color: #fff !important;
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
  }
  .landing-page--iim .downloadBrochureBtn:hover {
    background: #099cd3 !important;
  }
  .landing-page--iim .downloadBrochureBtn:active {
    transform: scale(0.97) !important;
  }

  .landing-page--iim .enquireNowBtn {
    background: #0CB1EF !important;
    border: none !important;
    padding: 11px 24px !important;
    color: #fff !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    border-radius: 20px !important;
    cursor: pointer !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: background 0.2s, transform 0.1s !important;
  }
  .landing-page--iim .enquireNowBtn:hover {
    background: #099cd3 !important;
  }
  .landing-page--iim .enquireNowBtn:active {
    transform: scale(0.97) !important;
  }

  /* =========================================================
     2. NAVBAR (Standard Landing Header)
     ========================================================= */
  .landing-page--iim .header_menu_list li a {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 600 !important;
    font-size: 15px !important;
    color: #111111 !important;
    text-decoration: none !important;
    transition: color 0.2s ease !important;
  }

  .landing-page--iim .header_menu_list li a:hover {
    color: #17479E !important;
  }

  /* =========================================================
     3. HERO BANNER SECTION (#hero-section)
     ========================================================= */
  .landing-page--iim main {
    margin: 0 !important;
    margin-top: 0 !important;
    padding: 0 !important;
    padding-top: 0 !important;
  }

  .landing-page--iim #hero-section,
  .landing-page--iim #hero {
    background-image: url("/assets/iim/iim_desktop_new_img.png") !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: center top !important;
    padding: 24px 15px 35px 15px !important;
    margin: 0 !important;
    margin-top: 0 !important;
    position: relative !important;
  }

  .landing-page--iim .banner {
    display: grid;
    grid-template-columns: 4fr 2fr;
    gap: 20px;
    margin: 0 auto;
    align-items: center;
    max-width: 1120px;
  }

  .landing-page--iim .banner-info {
    text-align: left;
  }

  .landing-page--iim .un_image_container {
    margin-bottom: 8px;
  }
  .landing-page--iim .un_image_container img {
    width: 220px;
    height: auto;
  }

  .landing-page--iim .banner-info h1 {
    font-size: 50px !important;
    font-family: 'Anton', sans-serif !important;
    color: #17479e !important;
    font-weight: 500 !important;
    line-height: 1 !important;
    margin: 10px 0px !important;
    letter-spacing: 0.5px !important;
  }

  .landing-page--iim .new_banner_heading {
    font-size: 16px;
    padding: 5px 0px 10px 0px;
    color: #000;
    font-weight: 600;
  }

  .landing-page--iim .underline_text {
    text-decoration: underline;
  }

  .landing-page--iim .banner_content {
    width: 80%;
    font-size: 13.5px !important;
    color: #000000;
    line-height: 1.45;
    margin: 0;
  }

  .landing-page--iim .t1 {
    font-size: 15px !important;
    font-weight: 700;
    color: #17479e;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .landing-page--iim .banner-info .downloadBrochureBtn {
    background: #17479e !important;
    border-radius: 8px !important;
    font-weight: 700 !important;
    padding: 10px 22px !important;
    box-shadow: 0 4px 10px rgba(23, 71, 158, 0.3) !important;
  }

  .landing-page--iim .custom_img_section {
    display: none;
  }

  .landing-page--iim .banner-form {
    display: flex;
    justify-content: flex-end;
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim #hero-section,
    .landing-page--iim #hero {
      background-image: url("/assets/iim/new_iim_mobile_bg.png") !important;
      background-size: cover !important;
      background-position: center top !important;
      padding: 18px 10px !important;
      margin: 0 !important;
      margin-top: 0 !important;
    }
    .landing-page--iim .banner {
      grid-template-columns: 1fr;
      gap: 15px;
    }
    .landing-page--iim .banner-info {
      padding: 0 10px;
      text-align: center;
    }
    .landing-page--iim .un_image_container img {
      display: none;
    }
    .landing-page--iim .banner-info h1 {
      font-size: 38px !important;
      line-height: 1.15 !important;
      text-align: center;
    }
    .landing-page--iim .new_banner_heading {
      text-align: center;
    }
    .landing-page--iim .banner_content {
      width: 100%;
      text-align: center;
    }
    .landing-page--iim .t1 {
      justify-content: center;
    }
    .landing-page--iim .banner-info .downloadBrochureBtn {
      display: none;
    }
    .landing-page--iim .custom_img_section {
      display: flex;
      justify-content: center;
      padding: 0;
    }
    .landing-page--iim .custom_img_section img {
      width: 85%;
      height: auto;
    }
    .landing-page--iim #hero-section .banner-form {
      margin-top: 10px;
      padding: 0px 8px;
    }
  }

  /* =========================================================
     4. ACHIEVEMENT / STATS BAR (.achievement)
     ========================================================= */
  .landing-page--iim .achievement {
    background-color: #FFE5B2;
    padding: 30px 10px;
    width: 100%;
  }

  .landing-page--iim .ach {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    max-width: 1120px;
    margin: 0 auto;
  }

  .landing-page--iim .ac1 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .landing-page--iim .ac1 img {
    width: 48px;
    height: auto;
    object-fit: contain;
    flex-shrink: 0;
  }

  .landing-page--iim .ach h3 {
    font-size: 28px;
    color: #17479E;
    margin: 0;
    font-weight: 800;
    line-height: 1.1;
  }

  .landing-page--iim .ac1 p {
    font-weight: 600;
    font-size: 13px !important;
    color: #111111;
    margin: 0;
    line-height: 1.25;
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim .ach {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    .landing-page--iim .ach h3 {
      font-size: 24px;
    }
    .landing-page--iim .ac1 img {
      width: 44px;
    }
    .landing-page--iim .ac1 p {
      font-size: 12px !important;
    }
  }

  /* =========================================================
     5. OVERVIEW SECTION (#overview)
     ========================================================= */
  .landing-page--iim #overview {
    margin: 40px 0;
    padding: 10px 20px;
  }

  .landing-page--iim .overview1 {
    text-align: center;
    max-width: 980px;
    margin: 0 auto;
  }

  .landing-page--iim .overview1 h2 {
    font-size: 28px;
    font-weight: 800;
    color: #111111;
    margin: 0 0 16px 0;
    line-height: 1.3;
  }

  .landing-page--iim .overview1 p {
    font-size: 14.5px !important;
    color: #444444;
    line-height: 1.65;
    margin: 0;
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim .overview1 h2 {
      font-size: 22px;
    }
    .landing-page--iim .overview1 p {
      font-size: 13.5px !important;
    }
  }

  /* =========================================================
     6. KEY SKILLS SECTION (section.certification#key-skills)
     ========================================================= */
  .landing-page--iim section.certification#key-skills {
    margin: 40px 0;
    padding: 10px 20px;
  }

  .landing-page--iim #key-skills h2 {
    font-size: 26px;
    font-weight: 800;
    text-align: center;
    color: #111111;
    margin: 0 0 12px 0;
    line-height: 1.3;
  }

  .landing-page--iim #key-skills p {
    font-size: 13.5px !important;
    text-align: center;
    color: #444444;
    margin: 0;
  }

  .landing-page--iim .b2-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
    gap: 25px;
    margin-top: 25px;
    max-width: 1120px;
    margin-left: auto;
    margin-right: auto;
  }

  .landing-page--iim .b1 {
    background: #ffffff;
    padding: 14px 18px;
    border-radius: 10px;
    border: 2px solid #17479E;
    display: flex;
    align-items: flex-start;
    gap: 15px;
    box-sizing: border-box;
  }

  .landing-page--iim .b1 img {
    width: 65px;
    height: auto;
    flex-shrink: 0;
    object-fit: contain;
  }

  .landing-page--iim .b1 h3 {
    color: #17479E;
    font-size: 17px;
    margin: 0 0 6px 0;
    font-weight: 700;
    line-height: 1.3;
  }

  .landing-page--iim .b1 p {
    font-size: 13px !important;
    color: #444444;
    line-height: 1.35;
    text-align: left !important;
    margin: 0;
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim .b2-info {
      grid-template-columns: 1fr;
      gap: 15px;
    }
    .landing-page--iim .b1 {
      padding: 12px 14px;
    }
    .landing-page--iim .b1 img {
      width: 55px;
    }
    .landing-page--iim .b1 h3 {
      font-size: 15.5px;
    }
    .landing-page--iim #key-skills h2 {
      font-size: 21px;
    }
  }

  /* =========================================================
     7. TOOLS & TECHNOLOGIES SECTION (section#courses)
     ========================================================= */
  .landing-page--iim section#courses {
    margin: 40px 0;
    padding: 10px 20px;
  }

  .landing-page--iim #courses h2 {
    font-size: 26px;
    font-weight: 800;
    text-align: center;
    color: #111111;
    margin: 0 0 12px 0;
    line-height: 1.3;
  }

  .landing-page--iim #courses p {
    font-size: 13.5px !important;
    text-align: center;
    color: #444444;
    margin: 0;
    line-height: 1.5;
  }

  .landing-page--iim .course-info {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    margin-top: 25px;
    max-width: 1120px;
    margin-left: auto;
    margin-right: auto;
  }

  .landing-page--iim .c1 {
    box-shadow: 0 0 5px 2px #cccccc;
    border-radius: 10px !important;
    overflow: hidden;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .landing-page--iim .c1 .c1-img-wrap {
    min-height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: #ffffff;
  }

  .landing-page--iim .c1 img {
    max-width: 180px !important;
    max-height: 90px !important;
    object-fit: contain;
    margin: auto;
    display: block;
  }

  .landing-page--iim #courses .c1 p,
  .landing-page--iim .c1 p,
  .landing-page--iim .c1 .c1-desc {
    background-color: #17479E !important;
    color: #ffffff !important;
    padding: 16px 18px 20px 18px !important;
    font-size: 13.5px !important;
    border-bottom-left-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
    margin: 0 !important;
    text-align: left !important;
    line-height: 1.55 !important;
    display: block !important;
    min-height: 105px;
    box-sizing: border-box !important;
  }

  .landing-page--iim #courses .c1 p b,
  .landing-page--iim .c1 p b,
  .landing-page--iim .c1 .c1-desc b {
    color: #ffffff !important;
    font-weight: 700 !important;
    display: inline !important;
    padding: 0 !important;
    margin: 0 !important;
    background: transparent !important;
  }

  .landing-page--iim #courses .c1 p span,
  .landing-page--iim .c1 p span,
  .landing-page--iim .c1 .c1-desc span {
    color: #ffffff !important;
    font-weight: 400 !important;
    display: inline !important;
    padding: 0 !important;
    margin: 0 !important;
    background: transparent !important;
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim .course-info {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    .landing-page--iim #courses h2 {
      font-size: 21px;
    }
  }

  /* =========================================================
     8. ABOUT IIM - KOZHIKODE SECTION (#about)
     ========================================================= */
  .landing-page--iim #about {
    background-color: #F0F3FA;
    padding: 40px 20px;
    margin: 30px 0;
  }

  .landing-page--iim #about h2 {
    color: #17479E;
    text-align: center;
    font-weight: 800;
    font-size: 26px;
    margin: 0 0 15px 0;
  }

  .landing-page--iim #about p {
    text-align: center;
    font-size: 13.5px !important;
    color: #333333;
    line-height: 1.6;
    margin: 0;
  }

  .landing-page--iim .about-cnt {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 30px;
    padding: 20px 0px;
    align-items: center;
    max-width: 1120px;
    margin: 0 auto;
  }

  .landing-page--iim .ab1 {
    text-align: center;
  }

  .landing-page--iim .accreited {
    border: 1px solid #000000 !important;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-around;
    align-items: center;
    padding: 35px 20px 15px 20px;
    border-radius: 10px;
    position: relative;
    margin-top: 35px;
    background: transparent;
  }

  .landing-page--iim .accreited h2 {
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    background: #F0F3FA;
    padding: 0 12px;
    font-size: 16px;
    white-space: nowrap;
    font-weight: 700;
    color: #111111;
    margin: 0;
  }

  .landing-page--iim .accreited img {
    width: 110px !important;
    height: auto;
    padding: 5px;
    margin: 0 auto;
    object-fit: contain;
  }

  .landing-page--iim .ab2 img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim .about-cnt {
      grid-template-columns: 1fr;
    }
    .landing-page--iim .accreited {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      padding: 30px 10px 15px 10px;
    }
    .landing-page--iim .accreited h2 {
      font-size: 13px;
      top: -14px;
      white-space: normal;
      text-align: center;
      width: 90%;
    }
    .landing-page--iim .ab2 img {
      margin-top: 20px;
    }
  }

  /* =========================================================
     9. ELIGIBILITY / BENEFITS SECTION (#benefits)
     ========================================================= */
  .landing-page--iim #benefits {
    background-image: url("/assets/iim/benefit-bg.webp");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center right;
    color: #ffffff;
    padding: 40px 30px;
    margin: 30px 0;
  }

  .landing-page--iim .benefits-cnt {
    width: 600px;
    max-width: 100%;
  }

  .landing-page--iim .benefits-cnt h2 {
    font-size: 26px;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 20px 0;
    line-height: 1.3;
  }

  .landing-page--iim .benefits-cnt h3 {
    font-size: 17px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 5px 0 !important;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .landing-page--iim .benefits-cnt p {
    padding-left: 22px;
    font-size: 13px !important;
    color: #f1f5f9;
    line-height: 1.5;
    margin: 0;
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim #benefits {
      background-image: url("/assets/iim/mobile-bg-for-benefits.webp");
      background-size: cover;
      background-position: center top;
      padding: 30px 20px;
      padding-bottom: 270px !important;
    }
    .landing-page--iim .benefits-cnt {
      width: 100% !important;
      max-width: 360px !important;
    }
    .landing-page--iim .benefits-cnt h2 {
      font-size: 20px;
    }
    .landing-page--iim .benefits-cnt h3 {
      font-size: 15px !important;
    }
    .landing-page--iim .benefits-cnt p {
      font-size: 12px !important;
    }
  }

  /* =========================================================
     10. SAMPLE DEGREE SECTION (section#sample-degree)
     ========================================================= */
  .landing-page--iim section#sample-degree {
    margin: 40px 0;
    padding: 10px 20px;
  }

  .landing-page--iim .degree {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    align-items: center;
    max-width: 1120px;
    margin: 0 auto;
  }

  .landing-page--iim .degree img {
    width: 420px !important;
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .landing-page--iim .degree-info h2 {
    color: #17479E;
    font-size: 38px;
    font-weight: 700;
    line-height: 1.15;
    margin: 0 0 10px 0;
  }

  .landing-page--iim .degree-info h3 {
    font-size: 20px;
    font-weight: 600;
    color: #111111;
    margin: 0 0 15px 0;
  }

  .landing-page--iim .degree-info p {
    font-size: 13.5px !important;
    color: #444444;
    line-height: 1.6;
    margin: 0 0 20px 0;
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim .degree {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 20px;
    }
    .landing-page--iim .degree-info h2 {
      font-size: 28px;
    }
    .landing-page--iim .degree-info h3 {
      font-size: 17px;
    }
  }

  /* =========================================================
     11. PLACEMENT PARTNERS (section#placement)
     ========================================================= */
  .landing-page--iim section#placement {
    margin: 40px 0;
    padding: 10px 20px;
  }

  .landing-page--iim .placement-section {
    padding: 30px 20px;
    background-color: #F2F2F2;
    border-radius: 15px;
    text-align: center;
    max-width: 1120px;
    margin: 0 auto;
  }

  .landing-page--iim .placement-section h2 {
    text-align: center;
    color: #2B2146;
    font-size: 26px;
    font-weight: 700;
    margin: 0 0 20px 0;
  }

  .landing-page--iim .placement-img {
    width: 125px;
    height: auto;
    margin: 10px 12px;
    display: inline-block;
    vertical-align: middle;
    object-fit: contain;
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim .placement-img {
      width: 95px;
      margin: 8px 6px;
    }
  }

  /* =========================================================
     12. HOW TO APPLY (section.apply-section#how-to-apply)
     ========================================================= */
  .landing-page--iim .apply-section {
    padding: 50px 20px;
    background: #ffffff;
    text-align: center;
    margin: 0px;
  }

  .landing-page--iim .apply-section h2 {
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    text-transform: capitalize;
    color: #193579;
    margin: 0 0 10px 0;
  }

  .landing-page--iim .section-desc {
    max-width: 900px;
    margin: 0 auto 30px !important;
    color: #555555;
    font-size: 14px !important;
    line-height: 1.5;
  }

  .landing-page--iim .steps-wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 15px;
    max-width: 1120px;
    margin: 0 auto;
  }

  .landing-page--iim .step-card {
    background: #ffffff;
    padding: 20px 14px;
    border-radius: 14px;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .landing-page--iim .step-card h4 {
    font-size: 15px;
    margin: 15px 0 8px;
    color: #000000;
    font-weight: 600;
  }

  .landing-page--iim .step-card p {
    font-size: 12px !important;
    color: #444444;
    line-height: 1.35;
    margin: 0;
  }

  .landing-page--iim .step-number {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin: 0 auto;
    font-size: 19px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
  }

  .landing-page--iim .step-card::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 5px;
    width: 100%;
    border-radius: 0 0 14px 14px;
  }

  .landing-page--iim .orange .step-number { border: 3px solid #ff8c32; color: #ff8c32; }
  .landing-page--iim .orange::after { background: #ff8c32; }
  .landing-page--iim .orange { background: #fff4e9; }

  .landing-page--iim .blue .step-number { border: 3px solid #0b5ed7; color: #0b5ed7; }
  .landing-page--iim .blue::after { background: #0b5ed7; }
  .landing-page--iim .blue { background: #f2f8ff; }

  .landing-page--iim .pink .step-number { border: 3px solid #ff2d6f; color: #ff2d6f; }
  .landing-page--iim .pink::after { background: #ff2d6f; }
  .landing-page--iim .pink { background: #fff1f6; }

  .landing-page--iim .green .step-number { border: 3px solid #1faa59; color: #1faa59; }
  .landing-page--iim .green::after { background: #1faa59; }
  .landing-page--iim .green { background: #effff5; }

  .landing-page--iim .purple .step-number { border: 3px solid #8e2de2; color: #8e2de2; }
  .landing-page--iim .purple::after { background: #8e2de2; }
  .landing-page--iim .purple { background: #f9f0ff; }

  @media (max-width: 1200px) {
    .landing-page--iim .steps-wrapper {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 768px) {
    .landing-page--iim .steps-wrapper {
      grid-template-columns: repeat(1, 1fr);
    }
    .landing-page--iim .apply-section h2 {
      font-size: 20px;
    }
  }

  /* =========================================================
     13. FAQS SECTION (section#faqs)
     ========================================================= */
  .landing-page--iim section#faqs {
    margin: 40px 0;
    padding: 10px 20px;
  }

  .landing-page--iim .faq-title h2 {
    font-size: 26px;
    font-weight: 700;
    text-align: center;
    color: #111111;
    margin: 0 0 25px 0;
  }

  .landing-page--iim .faqs-section {
    max-width: 900px;
    margin: 0 auto;
  }

  .landing-page--iim .accordion-item {
    margin-bottom: 12px;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid #cccccc;
    border-left: 5px solid #17479E;
    background: #ffffff;
  }

  .landing-page--iim .accordion-header {
    background-color: #ffffff;
    padding: 14px 18px;
    cursor: pointer;
    font-weight: 600;
    font-size: 15px;
    color: #111111;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.2s;
  }
  .landing-page--iim .accordion-header:hover {
    background-color: #f7f9fc;
  }

  .landing-page--iim .accordion-header .span {
    font-size: 20px;
    font-weight: bold;
    color: #17479E;
    margin-left: 12px;
    line-height: 1;
  }

  .landing-page--iim .accordion-content {
    padding: 15px 18px;
    background-color: #ffffff;
    border-top: 1px solid #eeeeee;
    font-size: 13.5px !important;
    color: #444444;
    line-height: 1.55;
  }

  /* =========================================================
     14. COMPARE SECTION (.compare_Section#compare-universities)
     ========================================================= */
  .landing-page--iim .compare_Section {
    padding: 60px 20px;
    background-color: #f6f8fa;
  }

  .landing-page--iim .compare_box {
    padding: 50px 30px;
    background: #17479e;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
  }

  .landing-page--iim .compare_box h2 {
    color: #ffffff !important;
    font-weight: 700;
    font-size: 32px;
    margin: 0 0 10px 0;
    text-align: center;
  }

  .landing-page--iim .compare_box h4 {
    color: #ffffff;
    font-size: 16px;
    text-align: center;
    font-weight: 500;
    margin: 0 0 20px 0;
  }

  .landing-page--iim .compare_btn img {
    width: 70px;
    height: 70px;
    border-radius: 100%;
    margin-bottom: -90px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
    transition: transform 0.2s;
    cursor: pointer;
  }
  .landing-page--iim .compare_btn:hover img {
    transform: scale(1.08);
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim .compare_Section {
      padding: 40px 15px;
    }
    .landing-page--iim .compare_box {
      padding: 35px 20px 45px 20px;
    }
    .landing-page--iim .compare_box h2 {
      font-size: 24px;
    }
    .landing-page--iim .compare_box h4 {
      font-size: 14px;
    }
    .landing-page--iim .compare_btn img {
      margin-bottom: -70px;
      width: 60px;
      height: 60px;
    }
  }

  /* =========================================================
     15. FOOTER (.mini-footer)
     ========================================================= */
  .landing-page--iim .mini-footer {
    background: #f6f8fa;
    padding: 30px 20px 0 20px;
  }

  .landing-page--iim .footer_sode_logo_container {
    display: flex;
    align-content: center;
    justify-content: center;
  }

  .landing-page--iim .footer_sode_logo {
    width: 320px;
    max-width: 90%;
    height: auto;
  }

  .landing-page--iim #footer-bottom-bar {
    padding: 10px 30px;
    font-size: 13px;
    text-align: center;
    max-width: 1000px;
    margin: 0 auto;
  }

  .landing-page--iim #footer-bottom-bar p {
    color: #444444;
    line-height: 1.6;
    font-size: 12.5px !important;
  }

  .landing-page--iim #footer-bottom-bar span {
    font-size: 13px !important;
    cursor: pointer;
    font-weight: 600;
    color: #111111;
  }
  .landing-page--iim #footer-bottom-bar span:hover {
    text-decoration: underline;
  }

  .landing-page--iim .mini-footer-bottom {
    background: #0b3c66;
    color: #ffffff;
    text-align: center;
    padding: 10px;
    font-size: 13px;
    margin-top: 20px;
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
    position: fixed;
    right: 15px;
    bottom: 25px;
    border: none;
    background: transparent;
    border-radius: 100%;
    z-index: 9999;
    padding: 0px !important;
    cursor: pointer;
  }

  .landing-page--iim .coupon-btn img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3), 0 0 20px rgba(46, 204, 113, 0.6);
    transition: 0.3s ease;
  }

  .landing-page--iim .coupon-btn img:hover {
    transform: scale(1.1);
    box-shadow: 0 15px 35px rgba(0,0,0,0.4), 0 0 35px rgba(46, 204, 113, 0.9);
  }

  .landing-page--iim .call_fix_image img {
    width: 60px;
    height: 60px;
    position: fixed;
    bottom: 95px;
    right: 15px;
    border-radius: 50px;
    z-index: 9998;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4), 0 0 35px rgba(46, 204, 113, 0.9);
    transition: transform 0.2s;
  }
  .landing-page--iim .call_fix_image:hover img {
    transform: scale(1.1);
  }

  .landing-page--iim .sticky_btn_Section {
    display: none;
  }

  @media only screen and (max-width: 768px) {
    .landing-page--iim .coupon-btn {
      bottom: 75px;
    }
    .landing-page--iim .call_fix_image img {
      bottom: 145px;
    }
    .landing-page--iim .sticky_btn_Section {
      display: block;
    }
    .landing-page--iim .footer_sticky_buttons {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 99999;
      background: #17479e;
    }
    .landing-page--iim .footer_sticky_buttons a.wp_btn {
      background: #25d366;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      color: #ffffff;
      padding: 12px 6px;
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
    }
    .landing-page--iim .footer_sticky_buttons .apply_btn {
      background: #17479e;
      color: #ffffff;
      border-radius: 0px;
      font-size: 15px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      padding: 12px 6px;
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
    brochurePdf: "/assets/iim/main_brochure.pdf",
    logo: "/assets/iim/upgrade_iim_logo.png",
    sodeLogo: "/assets/iim/new_sode_tm_logo.png",
    sodeIcon: "/assets/iim/new_sode_tm_logo.png",
    desLogo: "/assets/iim/new-des-logo.webp",
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
    arrowGif: "/assets/iim/arrow.gif",
    giftGif: "/assets/iim/gift.gif",
    callGif: "/assets/iim/call_icon.gif",
    footerVariant: "v2",
    footerBottomBg: "#0b3c66",

    // Layout mappings
    statsLayout: "iim",
    aboutLayout: "iim",
    whyChooseLayout: "iim",
    degreeLayout: "iim",
    recruitersLayout: "iim",
    admissionLayout: "iim",
    faqLayout: "iim",
    compareLayout: "iim",
    stickyCtaLayout: "iim",
    faqAccentColor: "#17479E",
    faqTitle: "FAQ | Frequently Asked Questions",
    compareSubtitle: "Compare IIM Kozhikode University with Top World Renowned Universities",

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
      backgroundImage: "/assets/iim/iim_desktop_new_img.png",
      mobileBackgroundImage: "/assets/iim/new_iim_mobile_bg.png",
      backgroundPosition: "center top",
      noOverlay: true,
      minHeight: "440px",

      logo: "/assets/iim/upgrade_iim_logo.png",
      taglineText: "By IIM Kozhikode via upGrad",
      headlineText: "HRM Analytics\nOnline Certification",
      highlightBox: {
        text: "Earn a 6-month professional certificate from IIM Kozhikode. This HR Analytics course covers recruitment, job posting, and workforce management via case studies & real-world projects.",
      },
      hideCourseBox: true,
      brochureButtonText: "Get Brochure",
      formCardType: "white",
      formTitleColor: "#17479E",
      phoneBadgeBg: "#17479E",
      phoneBadgeBackground: "#17479E",
      submitBtnBg: "#22c55e",
    },

    enquireTitle: "Admission Open",
    enquireSubtitle: "Academic Experts will assist you!",
  },

  courses: [
    { value: "HR & Analytics", label: "HR & Analytics" },
  ],

  stats: [
    { number: "50%", label: "Avg Salary Hike", icon: "/assets/iim/ic-01.webp" },
    { number: "10K+", label: "Student Enrolled", icon: "/assets/iim/ic-02.webp" },
    { number: "100+", label: "Hiring Partners", icon: "/assets/iim/ic-03.webp" },
    { number: "500+", label: "Industry Experts", icon: "/assets/iim/ic-04.webp" },
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
      icon: "/assets/iim/icon-iim-01.webp",
    },
    {
      title: "HR Data Interpretation and Reporting",
      desc: "Develop the ability to analyze complex HR data sets and create meaningful reports for leadership decision-making.",
      icon: "/assets/iim/icon-iim-02.webp",
    },
    {
      title: "Workforce Planning and Forecasting",
      desc: "Acquire tools to predict staffing needs, manage workforce gaps, and ensure future-ready talent pipelines.",
      icon: "/assets/iim/icon-iim-03.webp",
    },
    {
      title: "Talent Analytics",
      desc: "Apply evidence-based methods to measure productivity, identify high-potential employees, and improve overall performance.",
      icon: "/assets/iim/icon-iim-04.webp",
    },
    {
      title: "Employee Engagement and Retention",
      desc: "Master strategies to enhance job satisfaction, reduce attrition, and strengthen employee loyalty.",
      icon: "/assets/iim/icon-iim-05.webp",
    },
    {
      title: "People Analytics",
      desc: "Explore behavioral insights to understand workforce dynamics and improve workplace culture and efficiency.",
      icon: "/assets/iim/icon-iim-06.webp",
    },
  ],

  tools: [
    {
      name: "Power BI",
      desc: "Transform HR data into dynamic dashboards and interactive reports that support strategic decisions.",
      image: "/assets/iim/power-bi.webp",
    },
    {
      name: "Tableau",
      desc: "Build advanced data visualizations to track employee performance, workforce trends, and organizational growth.",
      image: "/assets/iim/tableau.webp",
    },
    {
      name: "Microsoft Excel",
      desc: "Strengthen skills in workforce planning, data management, and predictive modeling with the HR tool.",
      image: "/assets/iim/microsoft-excel.webp",
    },
  ],

  about: {
    title: "ABOUT IIM - KOZHIKODE",
    paragraphs: [
      "IIM Kozhikode is recognized as one of India’s leading business schools, known for its innovative teaching, global outlook, and strong industry partnerships. The institute offers a broad portfolio of programs, including executive and online learning opportunities tailored for professionals. With prestigious accreditations such as the Ministry of Education, EQUIS, and AACSB, IIM Kozhikode stands among globally benchmarked institutions.",
      "Through its specialized programs, such as IIM Kozhikode's HRM, and advanced certification options, the institute ensures that learners gain both academic depth and practical business insights. These certification courses in IIM Kozhikode are designed to prepare graduates, working executives, and managers to succeed in leadership and analytics-driven roles worldwide.",
    ],
    campusImage: "/assets/iim/iim-university-image.webp",
    accreditations: [
      { name: "AMBA", image: "/assets/iim/amba-iim.webp" },
      { name: "EQUIS", image: "/assets/iim/equis-iim.webp" },
      { name: "AACSB", image: "/assets/iim/aacsb-iim.webp" },
      { name: "Ministry of Education", image: "/assets/iim/ministry-of-education.webp" },
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
    desktopBg: "/assets/iim/benefit-bg.webp",
    mobileBg: "/assets/iim/mobile-bg-for-benefits.webp",
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
    image: "/assets/iim/sample-certificate.webp",
    buttonText: "Get Degree",
  },

  placementPartners: [
    { name: "Capco", image: "/assets/iim/capco.webp" },
    { name: "Cognizant", image: "/assets/iim/Cognizant.webp" },
    { name: "Delhivery", image: "/assets/iim/Delhivery.webp" },
    { name: "Capita", image: "/assets/iim/capita.webp" },
    { name: "Disney", image: "/assets/iim/disnep.webp" },
    { name: "Codeyoung", image: "/assets/iim/codeyoung.webp" },
    { name: "CBSPL", image: "/assets/iim/cbspl.webp" },
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
    arrowImg: "/assets/iim/arrow.gif",
  },
};
