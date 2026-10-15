// UPES Online Landing Page Data & Custom CSS

export const upesCustomCss = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;500;600;700;800;900&display=swap');

  .landing-page--upes {
    font-family: 'Montserrat', sans-serif !important;
    color: #111111;
    background-color: #ffffff;
  }

  /* 1. Announcement Topbar */
  .landing-page--upes .topbar {
    display: none !important;
  }

  /* 2. Navbar Customizations */
  .landing-page--upes header.sticky {
    background: #ffffff !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.06) !important;
  }

  .landing-page--upes .coupon-btn-main {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    font-size: 13.5px;
    font-weight: 700;
    color: #ffffff;
    background: linear-gradient(135deg, #2ecc71, #27ae60) !important;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(46, 204, 113, 0.35);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    animation: upesPulse 2s infinite;
  }
  .landing-page--upes .coupon-btn-main:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 25px rgba(46, 204, 113, 0.45);
  }
  @keyframes upesPulse {
    0% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.6); }
    70% { box-shadow: 0 0 0 14px rgba(46, 204, 113, 0); }
    100% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0); }
  }

  /* 3. Hero Section */
  .landing-page--upes #hero {
    background-color: #ffffff !important;
    background-image: url("/assets/all_universities_images/upes/upes-home-desktop.webp") !important;
    background-size: cover !important;
    background-position: calc(50% + 70px) top !important;
    padding: 14px 0 16px 0 !important;
  }
  .landing-page--upes #hero div[aria-hidden="true"],
  .landing-page--upes #hero div.-z-20 {
    background-position: calc(50% + 70px) top !important;
    background-size: cover !important;
  }
  @media (max-width: 999px) {
    .landing-page--upes #hero {
      background-image: none !important;
      background-position: center top !important;
      padding: 10px 0 14px 0 !important;
    }
    .landing-page--upes #hero div[aria-hidden="true"],
    .landing-page--upes #hero div.-z-20 {
      display: none !important;
    }
  }

  .landing-page--upes #hero .hero-info-col {
    max-width: 360px !important;
    padding-top: 6px !important;
  }
  @media (max-width: 999px) {
    .landing-page--upes #hero .hero-info-col {
      max-width: 100% !important;
      padding-top: 0 !important;
      margin: 0 auto !important;
      text-align: center !important;
      align-items: center !important;
    }
  }

  .landing-page--upes #hero h1 {
    font-family: 'Anton', sans-serif !important;
    font-size: 44px !important;
    font-weight: 400 !important;
    color: #f2167d !important;
    line-height: 1.05 !important;
    letter-spacing: 0.5px !important;
    white-space: nowrap !important;
    margin: 0 0 6px 0 !important;
    text-transform: none !important;
  }
  @media (max-width: 999px) {
    .landing-page--upes #hero h1 {
      font-size: 30px !important;
      text-align: center !important;
      white-space: normal !important;
      margin-bottom: 6px !important;
    }
  }

  .landing-page--upes .hero-tagline,
  .landing-page--upes #hero .hero-info-col > div.font-medium,
  .landing-page--upes #hero .banner_subheading {
    font-size: 16.5px !important;
    font-weight: 700 !important;
    color: #222222 !important;
    line-height: 1.28 !important;
    margin-bottom: 8px !important;
    max-width: 340px !important;
  }
  @media (max-width: 999px) {
    .landing-page--upes .hero-tagline,
    .landing-page--upes #hero .hero-info-col > div.font-medium,
    .landing-page--upes #hero .banner_subheading {
      font-size: 15px !important;
      text-align: center !important;
      margin-left: auto !important;
      margin-right: auto !important;
      margin-bottom: 8px !important;
    }
  }

  .landing-page--upes .hero-description,
  .landing-page--upes #hero .hero-info-col > p,
  .landing-page--upes #hero .banner_about {
    font-size: 12.5px !important;
    font-weight: 500 !important;
    color: #222222 !important;
    line-height: 1.42 !important;
    margin-bottom: 12px !important;
    max-width: 330px !important;
  }
  @media (max-width: 999px) {
    .landing-page--upes .hero-description,
    .landing-page--upes #hero .hero-info-col > p,
    .landing-page--upes #hero .banner_about {
      font-size: 12px !important;
      text-align: center !important;
      margin-left: auto !important;
      margin-right: auto !important;
      margin-bottom: 12px !important;
    }
  }

  .landing-page--upes #hero .courses-badge,
  .landing-page--upes #hero .hero-info-col > div.space-y-0.5,
  .landing-page--upes #hero .hero-info-col [style*="courseBoxStyle"] {
    display: inline-block !important;
    background-color: #f2167d !important;
    color: #ffffff !important;
    padding: 5px 12px !important;
    border-radius: 4px !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    letter-spacing: 0.5px !important;
    margin-top: 0 !important;
    margin-bottom: 12px !important;
    border: none !important;
    width: fit-content !important;
  }
  .landing-page--upes #hero .courses-badge div {
    color: #ffffff !important;
  }
  @media (max-width: 999px) {
    .landing-page--upes #hero .courses-badge,
    .landing-page--upes #hero .hero-info-col > div.space-y-0.5 {
      display: block !important;
      text-align: center !important;
      margin: 0 auto 12px auto !important;
      width: fit-content !important;
    }
  }

  .landing-page--upes .topbtn,
  .landing-page--upes .hero-brochure-btn {
    background-color: #003399 !important;
    color: #ffffff !important;
    border: none !important;
    padding: 9px 24px !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    border-radius: 30px !important;
    cursor: pointer !important;
    box-shadow: 0 6px 16px rgba(0, 51, 153, 0.25) !important;
    transition: all 0.2s ease !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
  }
  .landing-page--upes .topbtn:hover,
  .landing-page--upes .hero-brochure-btn:hover {
    background-color: #002266 !important;
    transform: translateY(-2px) !important;
  }
  @media (max-width: 999px) {
    .landing-page--upes .topbtn,
    .landing-page--upes .hero-brochure-btn {
      display: flex !important;
      margin: 0 auto 16px auto !important;
    }
  }

  /* Counselling Lead Form */
  .landing-page--upes #hero .landing-lead-card {
    background-color: #faf9f5 !important;
    padding: 18px 20px !important;
    border-radius: 12px !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08) !important;
    border: 1px solid rgba(0, 0, 0, 0.05) !important;
  }

  @media (min-width: 1000px) and (max-width: 1240px) {
    .landing-page--upes #hero,
    .landing-page--upes #hero div[aria-hidden="true"],
    .landing-page--upes #hero div.-z-20 {
      background-position: calc(50% + 55px) top !important;
      padding: 12px 0 14px 0 !important;
    }
    .landing-page--upes #hero h1 {
      font-size: 34px !important;
    }
    .landing-page--upes #hero .hero-info-col {
      max-width: 350px !important;
    }
    .landing-page--upes .hero-tagline,
    .landing-page--upes #hero .hero-info-col > div.font-medium,
    .landing-page--upes #hero .banner_subheading {
      font-size: 16px !important;
    }
    .landing-page--upes .hero-description,
    .landing-page--upes #hero .hero-info-col > p,
    .landing-page--upes #hero .banner_about {
      font-size: 12.5px !important;
      margin-bottom: 10px !important;
    }
  }
  .landing-page--upes #hero .landing-lead-card h3 {
    text-align: center !important;
    font-size: 20px !important;
    font-weight: 700 !important;
    color: #f2167d !important;
    margin: 0 0 4px 0 !important;
  }
  .landing-page--upes #hero .landing-lead-card p.text-slate-500 {
    text-align: center !important;
    font-size: 13.5px !important;
    font-weight: 500 !important;
    color: #555555 !important;
    margin: 0 0 12px 0 !important;
  }
  .landing-page--upes #hero .phone-badge {
    background: #f2167d !important;
    color: #ffffff !important;
    padding: 5px 22px !important;
    border-radius: 20px !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
    text-decoration: none !important;
    box-shadow: 0 4px 12px rgba(242, 22, 125, 0.3) !important;
  }
  .landing-page--upes #hero .landing-lead-card button[type="submit"] {
    background: #28a745 !important;
    background-image: none !important;
    background-color: #28a745 !important;
    color: #ffffff !important;
    width: 100% !important;
    border: none !important;
    padding: 10px !important;
    border-radius: 5px !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    cursor: pointer !important;
    margin-top: 14px !important;
    box-shadow: 0 6px 18px rgba(40, 167, 69, 0.35) !important;
    transition: all 0.2s ease !important;
  }

  /* 4. Programmes Section */
  .landing-page--upes .programs-heading {
    background-image: linear-gradient(to right, #f2167d, #ffa408);
    padding: 50px 20px 110px 20px;
    text-align: center;
    color: #ffffff;
  }
  .landing-page--upes .programs-heading h2 {
    font-size: 32px;
    font-weight: 800;
    margin: 0;
  }
  @media (max-width: 768px) {
    .landing-page--upes .programs-heading {
      padding: 35px 15px 90px 15px;
    }
    .landing-page--upes .programs-heading h2 {
      font-size: 21px;
    }
  }

  .landing-page--upes .programs-container {
    margin-top: -75px;
    position: relative;
  }
  @media (max-width: 768px) {
    .landing-page--upes .programs-container {
      margin-top: -65px;
    }
  }

  .landing-page--upes .card-box {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    border: 1px solid #e9ecef;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .landing-page--upes .card-box:hover {
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  }
  .landing-page--upes .duration-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: #5a359d;
    color: #ffffff;
    font-size: 12px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 4px;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 5px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
  .landing-page--upes .card-box-cnt {
    padding: 18px 18px 20px 18px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  .landing-page--upes .card-box-cnt h3 {
    font-size: 22px;
    font-weight: 800;
    color: #111111;
    text-align: center;
    margin: 0 0 2px 0;
    letter-spacing: -0.3px;
  }
  .landing-page--upes .full-course-name {
    font-size: 13px;
    font-weight: 700;
    color: #222222;
    text-align: center;
    margin: 2px 0 12px 0;
  }
  .landing-page--upes .course-description {
    font-size: 12.5px;
    line-height: 1.55;
    color: #444444;
    text-align: center;
    margin-bottom: 18px;
    flex-grow: 1;
    min-height: 75px;
  }
  .landing-page--upes .course_buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .landing-page--upes .course_buttons .btn-brochure {
    background-color: #003399;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    padding: 9px 12px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: background-color 0.2s ease;
  }
  .landing-page--upes .course_buttons .btn-brochure:hover {
    background-color: #002266;
  }
  .landing-page--upes .course_buttons .btn-apply {
    background-color: #009933;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    padding: 9px 12px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.2s ease;
  }
  .landing-page--upes .course_buttons .btn-apply:hover {
    background-color: #007728;
  }

  /* Slick Slider for Ant Design Carousel */
  .landing-page--upes .programs-container .slick-dots {
    position: relative !important;
    bottom: auto !important;
    margin-top: 22px !important;
    margin-bottom: 0 !important;
  }
  .landing-page--upes .programs-container .slick-dots li {
    width: 8px !important;
    height: 8px !important;
    margin: 0 4px !important;
  }
  .landing-page--upes .programs-container .slick-dots li button {
    width: 8px !important;
    height: 8px !important;
    border-radius: 50% !important;
    background: #cbd5e1 !important;
    opacity: 1 !important;
    transition: all 0.25s ease !important;
  }
  .landing-page--upes .programs-container .slick-dots li.slick-active button {
    background: #f2167d !important;
    width: 24px !important;
    border-radius: 4px !important;
  }
  .landing-page--upes .programs-container .slick-track {
    display: flex !important;
  }
  .landing-page--upes .programs-container .slick-slide {
    height: inherit !important;
    display: flex !important;
  }
  .landing-page--upes .programs-container .slick-slide > div {
    width: 100%;
    height: 100%;
    display: flex;
  }

  /* 5. Approvals Section */
  .landing-page--upes #approvals {
    background-color: #eaedf2;
    padding: 55px 20px;
    text-align: center;
  }
  .landing-page--upes #approvals h3 {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 28px;
    letter-spacing: -0.2px;
  }
  .landing-page--upes #approvals h3 .blue {
    color: #003399;
  }
  .landing-page--upes #approvals h3 .pink {
    color: #f2167d;
  }
  @media (max-width: 768px) {
    .landing-page--upes #approvals {
      padding: 40px 15px;
    }
    .landing-page--upes #approvals h3 {
      font-size: 21px;
      margin-bottom: 20px;
    }
  }
  .landing-page--upes .approval-card {
    background: #ffffff;
    border-radius: 14px;
    padding: 30px 20px 24px 20px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 225px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .landing-page--upes .approval-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }
  .landing-page--upes .approval-card p {
    font-size: 14.5px;
    font-weight: 600;
    color: #222222;
    margin-top: 18px;
    text-align: center;
    line-height: 1.45;
  }
  @media (max-width: 768px) {
    .landing-page--upes .approval-card {
      padding: 22px 14px 18px 14px;
      min-height: 185px;
      border-radius: 12px;
    }
    .landing-page--upes .approval-card p {
      font-size: 13px;
      margin-top: 14px;
    }
  }

  /* 6. About Section */
  .landing-page--upes #about {
    padding: 26px 0 0 0 !important;
    background-color: #ffffff;
    position: relative;
    overflow: hidden;
  }
  .landing-page--upes #about h2 {
    font-size: 32px;
    font-weight: 800;
    color: #003399;
    text-align: center;
    margin: 0 0 10px 0 !important;
  }
  .landing-page--upes .about-sub-h {
    background-color: #ff9800;
    color: #ffffff;
    padding: 8px 18px !important;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 860px;
    margin: 0 auto 12px auto !important;
  }
  .landing-page--upes .about-text {
    font-size: 14px;
    line-height: 1.62;
    color: #333333;
    max-width: 890px;
    margin: 0 auto 16px auto !important;
    text-align: center;
  }
  .landing-page--upes .green-btn-university {
    background-color: #009933;
    color: #ffffff;
    border: none;
    padding: 8px 28px !important;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-block;
  }
  .landing-page--upes .green-btn-university:hover {
    background-color: #007728;
  }

  /* About Campus Image Wrapper & Responsive Heights */
  .landing-page--upes .about-image-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    margin-top: -60px;
  }
  .landing-page--upes .about-image-inner {
    position: relative;
    width: 100%;
    height: 380px;
  }
  .landing-page--upes .about-image-inner img {
    object-fit: cover !important;
    object-position: center top !important;
  }

  @media (min-width: 1000px) {
    .landing-page--upes .about-image-wrapper {
      margin-top: -95px !important;
    }
    .landing-page--upes .about-image-inner {
      height: 430px !important;
    }
  }

  @media (min-width: 1280px) {
    .landing-page--upes .about-image-wrapper {
      margin-top: -125px !important;
    }
    .landing-page--upes .about-image-inner {
      height: 470px !important;
    }
  }

  @media (min-width: 1440px) {
    .landing-page--upes .about-image-wrapper {
      margin-top: -150px !important;
    }
    .landing-page--upes .about-image-inner {
      height: 510px !important;
    }
  }

  @media (min-width: 1600px) {
    .landing-page--upes .about-image-wrapper {
      margin-top: -175px !important;
    }
    .landing-page--upes .about-image-inner {
      height: 550px !important;
    }
  }

  @media (min-width: 1920px) {
    .landing-page--upes .about-image-wrapper {
      margin-top: -210px !important;
    }
    .landing-page--upes .about-image-inner {
      height: 600px !important;
    }
  }

  @media (max-width: 768px) {
    .landing-page--upes #about {
      padding: 30px 0 0 0 !important;
    }
    .landing-page--upes #about h2 {
      font-size: 24px !important;
      margin-bottom: 10px !important;
    }
    .landing-page--upes .about-sub-h {
      font-size: 13px !important;
      padding: 7px 12px !important;
      margin: 0 16px 12px 16px !important;
    }
    .landing-page--upes .about-text {
      font-size: 13px !important;
      line-height: 1.55 !important;
      padding: 0 16px !important;
      margin-bottom: 16px !important;
    }
    .landing-page--upes .about-image-wrapper {
      margin-top: 14px !important;
    }
    .landing-page--upes .about-image-inner-mobile {
      height: 220px !important;
    }
    .landing-page--upes .about-image-inner-mobile img {
      object-fit: cover !important;
      object-position: center center !important;
    }
  }

  /* 7. Why Choose Section */
  .landing-page--upes #working-p {
    background-image: linear-gradient(to right, #21b6ea, #5b359d);
      padding: 35px 25px 60px 25px !important;
    color: #ffffff;
  }
  .landing-page--upes #working-cc {
    width: 82%;
    max-width: 1140px;
    margin: 0 auto;
  }
  .landing-page--upes #working-p h2 {
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
    margin-bottom: 25px;
  }
  @media (max-width: 768px) {
    .landing-page--upes #working-cc {
      width: 100%;
      padding: 0 10px;
    }
    .landing-page--upes #working-p h2 {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
  .landing-page--upes .working-p-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 20px;
  }
  @media (max-width: 768px) {
    .landing-page--upes .working-p-grid {
      grid-template-columns: 1fr;
      gap: 14px;
    }
  }
  .landing-page--upes .working-p-box-left-border,
  .landing-page--upes .working-p-box-right-border {
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 0px !important;
    padding: 18px 16px;
    color: #111111;
    display: flex;
    align-items: flex-start;
    gap: 14px;
    box-shadow: none !important;
  }
  .landing-page--upes .working-p-box-left-border {
    border-left: 4px solid #ffb300 !important;
  }
  .landing-page--upes .working-p-box-right-border {
    border-right: 4px solid #ffb300 !important;
  }
  .landing-page--upes .working-p-icon {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
  }
  .landing-page--upes .working-p-content {
    flex: 1;
    min-width: 0;
  }
  .landing-page--upes #working-p h4 {
    color: #000000;
    font-size: 17px;
    font-weight: 600;
    margin: 0 0 5px 0;
    line-height: 1.3;
  }
  .landing-page--upes #working-p p {
    color: #444444;
    font-size: 13px;
    line-height: 1.45;
    margin: 0;
  }

  /* 8. Placement / Recruiters Section */
  .landing-page--upes #placement {
    padding: 35px 20px 45px 20px !important;
    background-color: #ffffff;
    text-align: center;
  }
  .landing-page--upes #placement h2 {
    font-size: 28px !important;
    font-weight: 700 !important;
    color: #003399 !important;
    margin: 0 0 28px 0 !important;
    line-height: 1.3 !important;
  }
  @media (max-width: 768px) {
    .landing-page--upes #placement {
      padding: 30px 15px 35px 15px !important;
    }
    .landing-page--upes #placement h2 {
      font-size: 20px !important;
      margin: 0 0 20px 0 !important;
    }
  }
  .landing-page--upes #placement img {
    max-width: 1100px !important;
    width: 86% !important;
    margin: 0 auto !important;
    height: auto !important;
    display: block !important;
  }
  @media (max-width: 768px) {
    .landing-page--upes #placement img {
      max-width: 330px !important;
      width: 85% !important;
    }
  }

  /* 9. Admission Process Section */
  .landing-page--upes .apply-section {
    padding: 60px 20px;
    background: #ffffff;
    text-align: center;
  }
  .landing-page--upes .apply-section h2 {
    font-size: 30px;
    font-weight: 800;
    color: #193579;
    margin: 0 0 10px 0;
  }
  .landing-page--upes .section-desc {
    max-width: 850px;
    margin: 0 auto 36px auto;
    color: #555555;
    font-size: 14px;
    line-height: 1.6;
  }
  .landing-page--upes .steps-wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
    max-width: 1200px;
    margin: 0 auto;
  }
  @media (max-width: 1100px) {
    .landing-page--upes .steps-wrapper {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 640px) {
    .landing-page--upes .steps-wrapper {
      grid-template-columns: 1fr;
    }
  }
  .landing-page--upes .step-card {
    background: #ffffff;
    padding: 22px 14px;
    border-radius: 14px;
    position: relative;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  .landing-page--upes .step-number {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    font-size: 19px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    margin-bottom: 12px;
  }
  .landing-page--upes .step-card h4 {
    font-size: 15px;
    font-weight: 700;
    color: #111111;
    margin: 0 0 8px 0;
  }
  .landing-page--upes .step-card p {
    font-size: 12px;
    color: #555555;
    line-height: 1.45;
    margin: 0;
  }

  .landing-page--upes .step-card.orange { background: #fff4e9; }
  .landing-page--upes .step-card.orange .step-number { border: 3px solid #ff8c32; color: #ff8c32; }
  .landing-page--upes .step-card.orange::after { background: #ff8c32; }

  .landing-page--upes .step-card.blue { background: #eff6ff; }
  .landing-page--upes .step-card.blue .step-number { border: 3px solid #0b5ed7; color: #0b5ed7; }
  .landing-page--upes .step-card.blue::after { background: #0b5ed7; }

  .landing-page--upes .step-card.pink { background: #fff0f5; }
  .landing-page--upes .step-card.pink .step-number { border: 3px solid #ff2d6f; color: #ff2d6f; }
  .landing-page--upes .step-card.pink::after { background: #ff2d6f; }

  .landing-page--upes .step-card.green { background: #effff5; }
  .landing-page--upes .step-card.green .step-number { border: 3px solid #1faa59; color: #1faa59; }
  .landing-page--upes .step-card.green::after { background: #1faa59; }

  .landing-page--upes .step-card.purple { background: #f9f0ff; }
  .landing-page--upes .step-card.purple .step-number { border: 3px solid #8e2de2; color: #8e2de2; }
  .landing-page--upes .step-card.purple::after { background: #8e2de2; }

  .landing-page--upes .step-card::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 5px;
    width: 100%;
    border-radius: 0 0 14px 14px;
  }

  /* 10. FAQs Section */
  .landing-page--upes #faqs {
    padding: 36px 0 28px 0 !important;
    background-color: #ffffff;
  }
  .landing-page--upes #faqs > div {
    max-width: 1400px !important;
    width: 100% !important;
    margin: 0 auto !important;
    padding-left: 40px !important;
    padding-right: 40px !important;
    text-align: left !important;
  }
  .landing-page--upes #faq-subh {
    color: #333333 !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
    text-align: left !important;
    margin: 0 0 6px 0 !important;
  }
  .landing-page--upes #faqs h3 {
    font-size: 30px !important;
    font-weight: 800 !important;
    text-align: left !important;
    background: linear-gradient(90deg, #f2167d 0%, #ff6633 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    margin: 0 0 20px 0 !important;
  }
  .landing-page--upes .faq-item {
    border: none !important;
    border-radius: 0 !important;
    margin-bottom: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    overflow: hidden;
  }
  .landing-page--upes .faq-question {
    width: 100% !important;
    text-align: left !important;
    padding: 13px 14px !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    color: #222222 !important;
    background: transparent !important;
    border: none !important;
    cursor: pointer !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 16px !important;
  }
  .landing-page--upes .faq-question .faq-icon {
    font-size: 18px !important;
    font-weight: 500 !important;
    color: #708090 !important;
    margin-left: auto !important;
  }
  .landing-page--upes .faq-item.active .faq-question {
    background-color: #ebebeb !important;
    border-left: 6px solid #f2167d !important;
    color: #111111 !important;
    padding: 12px 14px 12px 18px !important;
  }
  .landing-page--upes .faq-item.active .faq-question .faq-icon {
    color: #000000 !important;
    font-size: 20px !important;
    font-weight: 700 !important;
  }
  .landing-page--upes .faq-item.active .faq-answer {
    background-color: #f7f7f7 !important;
    padding: 16px 20px !important;
    font-size: 14px !important;
    color: #333333 !important;
    line-height: 1.6 !important;
    text-align: left !important;
  }
  @media (max-width: 768px) {
    .landing-page--upes #faqs {
      padding: 28px 0 20px 0 !important;
    }
    .landing-page--upes #faqs > div {
      padding-left: 16px !important;
      padding-right: 16px !important;
    }
    .landing-page--upes #faqs h3 {
      font-size: 22px !important;
      margin-bottom: 16px !important;
    }
    .landing-page--upes .faq-question {
      padding: 11px 10px !important;
      font-size: 13.5px !important;
    }
    .landing-page--upes .faq-item.active .faq-question {
      padding: 10px 10px 10px 14px !important;
    }
    .landing-page--upes .faq-item.active .faq-answer {
      padding: 12px 14px !important;
      font-size: 13px !important;
    }
  }

`;

export const upesData = {
  slug: "upes",
  customCss: upesCustomCss,
  meta: {
    title: "UPES Online Degree Courses Fees & Admission 2026",
    description:
      "UPES Online Degree Courses & Admission 2026. Online MBA, MCA, BBA, BCA, B.Com, PGP Programs. NAAC A Accredited, UGC-DEB Entitled & Industry Recognized.",
    keywords: [
      "UPES Online",
      "UPES Online MBA",
      "UPES Online MCA",
      "UPES Online BBA",
      "UPES Distance Education",
      "UPES Admission 2026",
    ],
  },
  brand: {
    slug: "upes",
    name: "UPES Online",
    shortName: "UPES",
    hashtag: "#ShapeYourFutureWithUPES",
    headline: "UPES University Online",
    tagline1: "Turn Your Dreams Into Reality With UPES University Online",
    tagline: "Turn Your Dreams Into Reality With UPES University Online",
    description:
      "UPES University Online believes in turning each student's dreams into reality. The university offers in-demand courses upto market standards benefit to its students and working professionals.",
    officialUrl: "https://upesonline.ac.in",
    logo: "/assets/all_universities_images/upes/upes-logo-for-lp.png",
    sodeLogo: "/assets/all_universities_images/upes/new-des-logo.webp",
    sodeIcon: "/assets/all_universities_images/upes/sode-icon.png",
    showSodeLogo: true,
    sodeOnLeftMobile: true,
    hideMangLogo: false,
    showCouponBtn: true,
    showCouponButton: true,
    couponButtonText: "Scholarship Coupon Code",
    giftGif: "/assets/all_universities_images/upes/gift.gif",
    phone: "+91 7065 7777 55",
    phoneDisplay: "+91 7065 7777 55",
    callGif: "/assets/all_universities_images/upes/call_icon.gif",
    arrowGif: "/assets/all_universities_images/upes/arrow.gif",
    showFloatingCallOnMobile: true,

    // Section Layout Mappings
    programmesLayout: "upes",
    approvalsLayout: "upes",
    aboutLayout: "upes",
    whyChooseLayout: "upes",
    faqLayout: "upes",
    recruitersLayout: "upes",
    recruitersTitleColor: "#003399",
    admissionTitle: "How to Apply for UPES University Online Courses",
    admissionSubtitle:
      "The admission process for UPES University Online course admissions is very simple and user friendly. Here's a step-by-step guide to enrolling in a degree course at the university :",

    // Section Order matching live https://distanceeducationschool.com/upes/
    sectionOrder: [
      "programmes",
      "approvals",
      "about",
      "whyChoose",
      "recruiters",
      "admissionProcess",
      "faqs",
      "compareBanner",
    ],

    // Sticky Bottom Bar (matching live pink bar with rounded pills)
    stickySplit: false,
    stickyBarSplit: false,
    stickyBarBg: "#f2167d",
    stickyBrochureAction: "whatsapp",
    stickyBrochureIcon: "whatsapp",
    stickyBrochureBg: "#25d366",
    stickyBrochureTextColor: "#ffffff",
    stickyApplyStyle: "white-pink",
    stickyApplyBg: "#ffffff",
    stickyApplyTextColor: "#f2167d",
    stickyHideApplyArrow: false,
    stickyBar: {
      enabled: true,
      isSplit: false,
      background: "#f2167d",
      applyBg: "#ffffff",
      applyTextColor: "#f2167d",
      hideApplyArrow: false,
      brochureAction: "whatsapp",
      brochureIcon: "whatsapp",
      brochureBg: "#25d366",
      brochureTextColor: "#ffffff",
    },

    // Compare Section
    compareBannerBg: "#f2167d",
    compareUniversityName: "UPES University Online",
    compareSectionBg: "bg-[#f6f8fa]",
    compareSectionBgColor: "#f6f8fa",
    arrowGif: "/assets/all_universities_images/upes/arrow.gif",

    // Footer
    footerSectionBg: "bg-[#f6f8fa]",
    footerSectionBgColor: "#f6f8fa",
    footerLogo: "/assets/all_universities_images/upes/new-des-logo.webp",
    footerBottomBg: "#0b3c66",

    // Hero Section Configuration
    hero: {
      backgroundImage: "/assets/all_universities_images/upes/upes-home-desktop.webp",
      mobileBackgroundImage: "none",
      mobileStudentImage: "/assets/all_universities_images/upes/upes-university-mobile-img.webp",
      mobileStudentImageWrapperClassName: "!w-full !aspect-[926/433] !relative !overflow-hidden !mb-3 !rounded-2xl !shadow-md",
      mobileStudentImageClassName: "!w-full !h-full !object-cover",
      backgroundPosition: "calc(50% + 70px) top",
      backgroundSize: "cover",
      desktopBackgroundPosition: "calc(50% + 70px) top",
      desktopBackgroundSize: "cover",
      noOverlay: true,
      hideHashtag: true,
      headlineText: "UPES University Online",
      headingFont: "'Anton', sans-serif",
      headingColor: "#f2167d",
      headingClassName: "!whitespace-nowrap !font-normal",
      headingStyle: {
        fontFamily: "'Anton', sans-serif",
        fontWeight: 400,
        whiteSpace: "nowrap",
        color: "#f2167d",
      },
      taglineText: "Turn Your Dreams Into Reality With UPES University Online",
      description:
        "UPES University Online believes in turning each student's dreams into reality. The university offers in-demand courses upto market standards benefit to its students and working professionals.",
      coursesStrip: ["BBA | BCA | BCOM | MBA | MCA | PGP"],
      hideCourseBox: true,
      courseStripClassName: "courses-badge",
      coursesColor: "#ffffff",
      courseBoxStyle: {
        backgroundColor: "#f2167d",
        color: "#ffffff",
      },
      brochureButtonText: "Download Brochure",
      buttonBackground: "#003399",
      buttonTextColor: "#ffffff",
      enquireTitle: "Get 100% Free Counselling",
      enquireSubtitle: "Academic Experts will assist you!",
      phoneDisplay: "+91 7065 7777 55",
      phoneBadgeBg: "#f2167d",
      formCardType: "white",
      form: {
        variant: "white",
        title: "Get 100% Free Counselling",
        subtitle: "Academic Experts will assist you!",
        phoneText: "+91 7065 7777 55",
        showPhoneBadge: true,
        colors: {
          title: "#f2167d",
          subtitle: "#555555",
          phoneBackground: "#f2167d",
          phoneText: "#ffffff",
          submitBackground: "#28a745",
          submitText: "#ffffff",
        },
        namePlaceholder: "Enter Your Name",
        emailPlaceholder: "Enter Your Email",
        phonePlaceholder: "Enter Your Number",
      },
    },

    // Program & Section Titles
    programmesTitle: "UPES University Online Degree Courses",
    approvalsHighlight: "APPROVALS AND RECOGNITIONS",
    whyChooseTitle: "Why Choose UPES University Online (UPES CCE)",
    admissionTitle: "How to Apply for UPES University Online Courses",
    admissionSubtitle:
      "The admission process for UPES University course admissions is very simple and user-friendly. Here's a step-by-step guide to enrolling in a degree course at the university :",
  },

  // Courses list for LeadForm select
  courses: [
    { value: "BBA", label: "BBA - Bachelor of Business Administration" },
    { value: "BCA", label: "BCA - Bachelor of Computer Applications" },
    { value: "BCOM", label: "BCOM - Bachelor of Commerce" },
    { value: "MBA", label: "MBA - Master of Business Administration" },
    { value: "MCA", label: "MCA - Master of Computer Applications" },
    { value: "PGP", label: "PGP - Post Graduate Programs" },
  ],

  // 6 Detailed Programmes for Carousel
  programmes: [
    {
      value: "BBA",
      label: "BBA - Bachelor of Business Administration",
      duration: "36 Months",
      image: "/assets/all_universities_images/upes/bba-upes.webp",
      desc: "The BBA course from UPES University Online offers an MBA with 7+ in-demand industry specializations. Freshers can elevate their skills in Digital and logistics, and supply chain in line with industry standards through real-world business projects at the end of the UPES University Online BBA course. BBA builds strong business and leadership skills.",
    },
    {
      value: "BCA",
      label: "BCA - Bachelor of Computer Applications",
      duration: "36 Months",
      image: "/assets/all_universities_images/upes/bca-upes.webp",
      desc: "UPES University Online offers a BCA program with a specialization in Cloud & Security, Data Analytics, and New Age Technology. learners gain knowledge and skills to utilise data for business insights, cloud computing, (AI) & (ML). Enhancing their job-market prospects through the UPES University Online BCA program.",
    },
    {
      value: "BCOM",
      label: "BCOM - Bachelor of Commerce",
      duration: "36 Months",
      image: "/assets/all_universities_images/upes/bcom-card.webp",
      desc: "BCom (Bachelor of Commerce) is a 3-year undergraduate degree covering accounting, finance, economics, business law, taxation, and management principles. UPES Online offers flexible tracks for commerce careers like finance and marketing. This course provides knowledge of finance and business-related aspects.",
    },
    {
      value: "MBA",
      label: "MBA - Master of Business Administration",
      duration: "24 Months",
      image: "/assets/all_universities_images/upes/mba-upes.webp",
      desc: "UPES University Online offers an online MBA program with 10+ in-demand industry specializations. learners can gain knowledge and skills in Oil and Gas, Digital Business, and many more. The UPES University Online MBA program is specifically designed for students who are looking to succeed in the digital world.",
    },
    {
      value: "MCA",
      label: "MCA - Master of Computer Applications",
      duration: "24 Months",
      image: "/assets/all_universities_images/upes/mca-card.webp",
      desc: "MCA (Master of Computer Applications) 2-year postgraduate degree focusing on advanced software development, AI, data science, cloud computing, cybersecurity, and IT management. UPES Online provides specialized MCA tracks for high-demand tech careers. This program includes live sessions and industry mentorship.",
    },
    {
      value: "PGP",
      label: "PGP - Post Graduate Programs",
      duration: "10 Months",
      image: "/assets/all_universities_images/upes/pgp-upes.webp",
      desc: "UPES University Online offers a wide range of PG courses across different fields in a hybrid, self-paced mode. Courses from UPES University Online , delivered over 10 Monthss, prepare students, boosting their confidence in all industry-demand aspects of analytical thinking and managerial decision-making with fast career growth.",
    },
  ],

  // Approvals & Recognitions
  approvals: [
    {
      image: "/assets/all_universities_images/upes/ugc-upes.webp",
      text: "University Grant Commission (UGC)",
      tag: "UGC",
    },
    {
      image: "/assets/all_universities_images/upes/aicte-upes.webp",
      text: "All India Council for Technical Education (AICTE)",
      tag: "AICTE",
    },
    {
      image: "/assets/all_universities_images/upes/naac-upes.webp",
      text: "National Assessment and Accreditation Council (NAAC)",
      tag: "NAAC",
    },
    {
      image: "/assets/all_universities_images/upes/nirf-upes.webp",
      text: "National Institutional Ranking Framework (NIRF)",
      tag: "NIRF",
    },
  ],

  // About Section
  about: {
    title: "About UPES University",
    subheading: "UPES University Online helps students and working professionals to achieve and enhance their intelligence.",
    text: "UPES was founded in 2003 with the goal of offering high-quality education. Offering a variety of undergraduate, postgraduate, and certificate programs in business, engineering, technology, law, and other fields, UPES University Online is one of India's leading universities of online education. UPES University is positioned 36th in the NIRF Ranking and 5th in the World University Ranking 2026. UPES University Online is an ideal option for professionals and students who want to continue their education while maintaining both their private and professional lives.",
    buttonText: "Apply Now →",
    image: "/assets/all_universities_images/upes/upes-university-image-3.webp",
  },

  // Why Choose Items
  whyChoose: [
    {
      title: "Program with flexibility",
      desc: "UPES University Online courses give learners the freedom to study at their own pace and schedule with an industry-relevant curriculum.",
      image: "/assets/all_universities_images/upes/program-with-flexibility.webp",
    },
    {
      title: "Networking And Collaboration",
      desc: "Through UPES University Online, with a legacy of 20+ Years, connect with like-minded professionals and experts from various industries.",
      image: "/assets/all_universities_images/upes/networking-collaboration.webp",
    },
    {
      title: "Personalized Support",
      desc: "UPES University Online provides students access to dedicated student support services, other resources, and Placement Assistance.",
      image: "/assets/all_universities_images/upes/personalized-suppport.webp",
    },
    {
      title: "Cost-effective Learning",
      desc: "With UPES University Online, save on travel and accommodation expenses associated with traditional education, and Attractive Scholarships.",
      image: "/assets/all_universities_images/upes/cost-effective-learning.webp",
    },
    {
      title: "Career Advancement Opportunities",
      desc: "Enhance professional profile and pursue new opportunities with UPES University Online in-demand courses.",
      image: "/assets/all_universities_images/upes/career-advancement.webp",
    },
    {
      title: "Accreditation And Recognition",
      desc: "Connect with like-minded professionals and experts from various industries through UPES University Online, Esteemed Faculty from IITs, IISc, IIMs, and Ivy League.",
      image: "/assets/all_universities_images/upes/accredition-recoginition.webp",
    },
  ],

  // Placement Opportunities
  recruiters: {
    fullTitle: "UPES University Online Placement Opportunities After Degree",
    title: "UPES University Online Placement Opportunities After Degree",
    desktopImage: "/assets/all_universities_images/upes/desktop-logos.webp",
    mobileImage: "/assets/all_universities_images/upes/mobile-logos.png",
  },

  // Admission Process Steps
  admissionSteps: [
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

  // FAQs
  faqs: [
    {
      q: "Is the UPES University Online degree valid?",
      a: "Yes, UPES University Online degrees are valid and recognized by the UGC in India. They are also recognized internationally by WES.",
    },
    {
      q: "Why should students enrol at UPES University Online?",
      a: "UPES University Online offers students internationally recognized degrees with industry-relevant programs at affordable prices. Through online courses, students get to learn from a university holding 20 years legacy, providing a variety of support services.",
    },
    {
      q: "How is UPES University Online a good option for working professionals?",
      a: "UPES University Online offers a flexible learning format, making it an ideal option for working professionals. UPES offers its Esteemed Faculty from IITs, IISc, IIMs, and the Ivy League. The university has had 100% placements over the last five years. Forty-two (42) Faculty members of UPES are among the world's top 2% researchers as per the Stanford University list.",
    },
    {
      q: "How can students access support at UPES University Online?",
      a: "UPES University Online provides a range of support services to its students, including: Academic advisors, Career counselors, Technical support, and an online learning community.",
    },
    {
      q: "How many graduates of UPES University Online find job opportunities?",
      a: "UPES University Online has also been accredited by NAAC with a grade 'A' and received 5 stars for Employability (placements) in the globally acclaimed QS Rating. The university has had 100% placements over the last five years. Forty-two (42) Faculty members of UPES are among the world's top 2% researchers as per the Stanford University list.",
    },
    {
      q: "How can a student get more information about UPES University Online?",
      a: "Learners can check the official website portal or visit DistanceEducationSchool.com.",
    },
  ],
};
