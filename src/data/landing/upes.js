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
  @media (max-width: 768px) {
    div.landing-page--upes header a.des_logo,
    .landing-page--upes header .des_logo,
    .landing-page--upes .des_logo {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      width: 0 !important;
      height: 0 !important;
      max-width: 0 !important;
      max-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      pointer-events: none !important;
    }
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
    background-position: center top !important;
    background-repeat: no-repeat !important;
    padding: 24px 0 24px 0 !important;
  }
  .landing-page--upes #hero div[aria-hidden="true"],
  .landing-page--upes #hero div.-z-20 {
    background-image: url("/assets/all_universities_images/upes/upes-home-desktop.webp") !important;
    background-position: center top !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
  }

 @media (min-width: 1000px) {
  .landing-page--upes #hero {
    padding: 20px 0 24px 0 !important;
    background-position: center top !important;
  }

  .landing-page--upes #hero div[aria-hidden="true"],
  .landing-page--upes #hero div.-z-20 {
    background-position: center top !important;
  }

  .landing-page--upes #hero .ant-layout-content,
  .landing-page--upes #hero main,
  .landing-page--upes #hero > div {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding-left: 16px !important;
    padding-right: 28px !important;
    align-items: flex-start !important;
    padding-top: 14px !important;
    justify-content: space-between !important;
  }

  .landing-page--upes #hero .hero-info-col {
    width: 440px !important;
    max-width: 440px !important;
    min-width: 440px !important;
    flex: 0 0 440px !important;

    padding-top: 16px !important;
    align-self: flex-start !important;

    text-align: left !important;
    align-items: flex-start !important;

    margin-left: -50px !important;
    padding-left: 0 !important;
  }
}

  @media (min-width: 1000px) and (max-width: 1240px) {
    .landing-page--upes #hero {
      background-position: calc(50% + 110px) top !important;
      padding: 14px 0 16px 0 !important;
    }
    .landing-page--upes #hero div[aria-hidden="true"],
    .landing-page--upes #hero div.-z-20 {
      background-position: calc(50% + 110px) top !important;
    }
    .landing-page--upes #hero .ant-layout-content,
    .landing-page--upes #hero main,
    .landing-page--upes #hero > div {
      max-width: 100% !important;
      width: 100% !important;
      margin: 0 !important;
      padding-left: 16px !important;
      padding-right: 24px !important;
    }
    .landing-page--upes #hero h1 {
      font-size: 36px !important;
      margin-bottom: 6px !important;
    }
    .landing-page--upes #hero .hero-info-col {
      width: 440px !important;
      max-width: 440px !important;
      min-width: 440px !important;
      flex: 0 0 440px !important;
      padding-top: 10px !important;
      margin-left: -50px !important;
    }
    .landing-page--upes .hero-tagline,
    .landing-page--upes #hero .hero-info-col > div.font-medium,
    .landing-page--upes #hero .banner_subheading {
      font-size: 17px !important;
      line-height: 22px !important;
      margin-bottom: 8px !important;
      max-width: 400px !important;
    }
    .landing-page--upes .hero-description,
    .landing-page--upes #hero .hero-info-col > p,
    .landing-page--upes #hero .hero-info-col p,
    .landing-page--upes #hero .banner_about {
      font-size: 14.5px !important;
      line-height: 1 !important;
      margin: 0 !important;
      padding: 0 !important;
      max-width: 440px !important;
      width: 440px !important;
      white-space: pre-line !important;
    }
    .landing-page--upes #hero .courses-badge {
  font-size: 14.5px !important;
  margin-top: 0 !important;
  margin-bottom: 30px !important;
  padding: 6px 14px !important;
  width: fit-content !important;
  max-width: 100% !important;
}
    .landing-page--upes .topbtn,
.landing-page--upes .hero-brochure-btn,
.landing-page--upes #hero .hero-brochure-btn {
  padding: 10px 36px !important;
  font-size: 15.5px !important;
  font-weight: 500 !important;
  border-radius: 30px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  margin: 0 !important;
}
  }

  @media (max-width: 999px) {
    .landing-page--upes #hero {
      background-color: #ffffff !important;
      background-image: none !important;
      padding: 12px 0 20px 0 !important;
    }
    .landing-page--upes #hero div[aria-hidden="true"],
    .landing-page--upes #hero div.-z-20 {
      display: none !important;
      background-image: none !important;
    }
    .landing-page--upes #hero .ant-layout-content,
    .landing-page--upes #hero main {
      padding-left: 16px !important;
      padding-right: 16px !important;
      width: 100% !important;
      max-width: 100% !important;
    }
    .landing-page--upes #hero .hero-info-col {
      width: 100% !important;
      max-width: 100% !important;
      min-width: 100% !important;
      padding-top: 0 !important;
      margin: 0 !important;
      text-align: left !important;
      align-items: flex-start !important;
    }
  }

  .landing-page--upes #hero h1 {
    font-family: 'Anton', sans-serif !important;
    font-size: 46px !important;
    font-weight: 400 !important;
    color: #f2167d !important;
    line-height: 1 !important;
    letter-spacing: 0.5px !important;
    white-space: nowrap !important;
    margin: 8px 0 0 0 !important;
    text-transform: none !important;
  }
  @media (max-width: 999px) {
    .landing-page--upes #hero h1 {
      font-size: clamp(24px, 7.2vw, 30px) !important;
      text-align: left !important;
      white-space: nowrap !important;
      margin-top: 2px !important;
      margin-bottom: 8px !important;
      line-height: 1.15 !important;
    }
  }

  .landing-page--upes .hero-tagline,
  .landing-page--upes #hero .hero-info-col > div.font-medium,
  .landing-page--upes #hero .banner_subheading {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 20px !important;
    font-weight: 500 !important;
    color: #000000 !important;
    line-height: 20px !important;
    padding-top: 8px !important;
    margin: 0 0 10px 0 !important;
    max-width: 440px !important;
    letter-spacing: -0.2px !important;
    white-space: pre-line !important;
  }
  @media (max-width: 999px) {
    .landing-page--upes .hero-tagline,
    .landing-page--upes #hero .hero-info-col > div.font-medium,
    .landing-page--upes #hero .banner_subheading {
      font-size: 15.5px !important;
      line-height: 21px !important;
      text-align: left !important;
      margin: 0 0 10px 0 !important;
      padding-top: 0 !important;
      max-width: 100% !important;
      white-space: pre-line !important;
    }
  }

  .landing-page--upes .hero-description,
  .landing-page--upes #hero .hero-info-col > p,
  .landing-page--upes #hero .hero-info-col p,
  .landing-page--upes #hero .banner_about {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 14.5px !important;
    font-weight: 500 !important;
    color: #000000 !important;
    line-height: 1 !important;
    padding: 0 !important;
    margin: 0 !important;
    max-width: 440px !important;
    white-space: pre-line !important;
  }
  @media (max-width: 999px) {
    .landing-page--upes .hero-description,
    .landing-page--upes #hero .hero-info-col > p,
    .landing-page--upes #hero .hero-info-col p,
    .landing-page--upes #hero .banner_about {
      font-size: 13.5px !important;
      line-height: 1.45 !important;
      text-align: left !important;
      margin: 0 0 14px 0 !important;
      padding: 0 !important;
      max-width: 100% !important;
      white-space: normal !important;
    }
  }

  .landing-page--upes #hero .courses-badge,
  .landing-page--upes #hero .hero-info-col > div.space-y-0.5,
  .landing-page--upes #hero .hero-info-col [style*="courseBoxStyle"] {
    display: inline-block !important;
    background-color: #f2167d !important;
    color: #ffffff !important;
    padding: 6px 14px !important;
    border-radius: 3px !important;
    font-family: 'Montserrat', sans-serif !important;
    font-size: 14.5px !important;
    font-weight: 500 !important;
    letter-spacing: 0.3px !important;
    margin-top: 0 !important;
    margin-bottom: 22px !important;
    border: none !important;
    width: fit-content !important;
    text-align: left !important;
  }
  .landing-page--upes #hero .courses-badge div {
    color: #ffffff !important;
  }
  @media (max-width: 999px) {
    .landing-page--upes #hero .courses-badge,
    .landing-page--upes #hero .hero-info-col > div.space-y-0.5 {
      display: inline-block !important;
      text-align: left !important;
      margin: 0 0 18px 0 !important;
      font-size: 13px !important;
      padding: 5px 10px !important;
      width: fit-content !important;
    }
  }

  .landing-page--upes .topbtn,
  .landing-page--upes .hero-brochure-btn,
  .landing-page--upes #hero .hero-brochure-btn {
    background-color: #003399 !important;
    color: #ffffff !important;
    border: none !important;
    padding: 10px 28px !important;
    font-family: 'Montserrat', sans-serif !important;
    font-size: 15.5px !important;
    font-weight: 500 !important;
    border-radius: 30px !important;
    cursor: pointer !important;
    box-shadow: 0 4px 14px rgba(0, 51, 153, 0.28) !important;
    transition: all 0.2s ease !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
    margin-top: 0 !important;
  }
  .landing-page--upes .topbtn:hover,
  .landing-page--upes .hero-brochure-btn:hover,
  .landing-page--upes #hero .hero-brochure-btn:hover {
    background-color: #002266 !important;
    transform: translateY(-2px) !important;
  }
  @media (max-width: 999px) {
    .landing-page--upes .topbtn,
    .landing-page--upes .hero-brochure-btn,
    .landing-page--upes #hero .hero-brochure-btn {
      display: inline-flex !important;
      margin: 0 0 16px 0 !important;
      padding: 10px 28px !important;
      font-size: 15px !important;
      border-radius: 30px !important;
    }
  }

  /* Mobile University Image Card */
  .landing-page--upes #hero .hero-mobile-image-wrapper {
    width: 100% !important;
    max-width: 440px !important;
    aspect-ratio: 925 / 434 !important;
    border-radius: 14px !important;
    overflow: hidden !important;
    margin: 4px auto 14px auto !important;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08) !important;
    position: relative !important;
  }
  .landing-page--upes #hero .hero-mobile-image-wrapper img {
    border-radius: 14px !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block !important;
  }

  /* Counselling Lead Form */
  .landing-page--upes #hero .landing-lead-card {
    background-color: #e7e5e5ff !important;
    padding: 18px 20px !important;
    border-radius: 12px !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08) !important;
    border: 1px solid rgba(0, 0, 0, 0.05) !important;
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
    .landing-page--upes .duration-badge {
      top: 0 !important;
      left: 0 !important;
      right: auto !important;
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
    top: 0;
    left: 0;
    right: auto;
    background-color: #5a359d;
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    padding: 6px 14px 6px 12px;
    border-top-left-radius: 12px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
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
    margin-bottom: 16px;
    flex-grow: 1;
    min-height: 110px;
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

  /* 4. Programmes Section Slider */
  .landing-page--upes #programs {
    padding-bottom: 20px !important;
  }

  /* Slick Slider for Ant Design Carousel */
  .landing-page--upes .programs-container .slick-dots {
    position: relative !important;
    bottom: auto !important;
    margin-top: 10px !important;
    margin-bottom: 18px !important;
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
  /* 5. Approvals Section */
  .landing-page--upes #approvals {
    background-color: #e0e2e6 !important;
    padding: 38px 20px 44px 20px !important;
    text-align: center;
  }
  .landing-page--upes #approvals h3 {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 26px !important;
    font-weight: 800 !important;
    line-height: 1.25 !important;
    letter-spacing: -0.2px;
    margin: 0 0 24px 0 !important;
    text-align: center;
  }
  .landing-page--upes #approvals h3 .blue {
    color: #003399 !important;
  }
  .landing-page--upes #approvals h3 .pink {
    color: #f2167d !important;
  }
  .landing-page--upes .approval-card {
    background: #ffffff !important;
    border-radius: 16px !important;
    padding: 26px 16px 22px 16px !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
    border: none !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
    min-height: 205px !important;
    height: 100% !important;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .landing-page--upes .approval-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08) !important;
  }
  .landing-page--upes .approval-card-logo,
  .landing-page--upes .approval-card > div:first-child,
  .landing-page--upes .approval-card .relative {
    height: 80px !important;
    max-height: 80px !important;
    width: 100% !important;
    max-width: 190px !important;
    margin: 0 auto !important;
    position: relative !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  .landing-page--upes .approval-card-logo img,
  .landing-page--upes .approval-card .relative img {
    object-fit: contain !important;
    width: 100% !important;
    height: 100% !important;
  }
  .landing-page--upes .approval-card p {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 14.5px !important;
    font-weight: 500 !important;
    color: #111111 !important;
    margin: 14px auto 0 auto !important;
    text-align: center !important;
    line-height: 1.38 !important;
    max-width: 210px !important;
  }

  @media (max-width: 1024px) {
    .landing-page--upes #approvals {
      padding: 34px 16px 40px 16px !important;
    }
    .landing-page--upes #approvals h3 {
      font-size: 23px !important;
      margin-bottom: 20px !important;
    }
    .landing-page--upes .approval-card {
      min-height: 195px !important;
      padding: 22px 14px 18px 14px !important;
      border-radius: 16px !important;
      justify-content: flex-start !important;
    }
    .landing-page--upes .approval-card-logo,
    .landing-page--upes .approval-card > div:first-child,
    .landing-page--upes .approval-card .relative {
      height: 75px !important;
      max-height: 75px !important;
      width: 100% !important;
      max-width: 175px !important;
      margin: 0 auto !important;
    }
    .landing-page--upes .approval-card p {
      font-size: 13.5px !important;
      font-weight: 500 !important;
      margin: 12px auto 0 auto !important;
      max-width: 195px !important;
    }
  }

  @media (max-width: 768px) {
    .landing-page--upes #approvals {
      background-color: #e0e2e6 !important;
      padding: 28px 14px 34px 14px !important;
    }
    .landing-page--upes #approvals h3 {
      font-size: 18.5px !important;
      line-height: 1.3 !important;
      margin-bottom: 16px !important;
    }
    .landing-page--upes #approvals .grid {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 14px 12px !important;
    }
    .landing-page--upes .approval-card {
      min-height: 184px !important;
      height: 100% !important;
      padding: 20px 10px 16px 10px !important;
      border-radius: 16px !important;
      justify-content: flex-start !important;
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05) !important;
    }
    .landing-page--upes .approval-card-logo,
    .landing-page--upes .approval-card > div:first-child,
    .landing-page--upes .approval-card .relative {
      height: 72px !important;
      max-height: 72px !important;
      width: 100% !important;
      max-width: 155px !important;
      margin: 0 auto !important;
    }
    .landing-page--upes .approval-card p {
      font-family: 'Montserrat', sans-serif !important;
      font-size: 13.5px !important;
      font-weight: 500 !important;
      color: #111111 !important;
      line-height: 1.35 !important;
      margin: 12px auto 0 auto !important;
      max-width: 150px !important;
      text-align: center !important;
    }
  }

  @media (max-width: 480px) {
    .landing-page--upes #approvals {
      padding: 24px 12px 28px 12px !important;
    }
    .landing-page--upes #approvals h3 {
      font-size: 17.5px !important;
      margin-bottom: 14px !important;
    }
    .landing-page--upes #approvals .grid {
      gap: 12px 10px !important;
    }
    .landing-page--upes .approval-card {
      min-height: 178px !important;
      height: 100% !important;
      padding: 18px 8px 14px 8px !important;
      border-radius: 15px !important;
      justify-content: flex-start !important;
    }
    .landing-page--upes .approval-card-logo,
    .landing-page--upes .approval-card > div:first-child,
    .landing-page--upes .approval-card .relative {
      height: 68px !important;
      max-height: 68px !important;
      width: 100% !important;
      max-width: 145px !important;
      margin: 0 auto !important;
    }
    .landing-page--upes .approval-card p {
      font-family: 'Montserrat', sans-serif !important;
      font-size: 13px !important;
      font-weight: 500 !important;
      color: #111111 !important;
      line-height: 1.32 !important;
      margin-top: 10px !important;
      max-width: 140px !important;
    }
  }

  /* 6. About Section */
  .landing-page--upes #about {
    padding-top: 20px !important;
    padding-bottom: 400px !important;
    background-color: #ffffff !important;
    background-image: url("/assets/all_universities_images/upes/upes-university-image-3.webp") !important;
    background-size: cover !important;
    background-position: center top !important;
    background-repeat: no-repeat !important;
    position: relative !important;
    overflow: hidden !important;
    text-align: center !important;
  }
  .landing-page--upes #about > div:first-child,
  .landing-page--upes #about .relative.z-10 {
    max-width: 1080px !important;
    margin: 0 auto !important;
  }
  .landing-page--upes #about h2 {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 30px !important;
    font-weight: 700 !important;
    color: #003399 !important;
    text-align: center !important;
    margin: 0 0 12px 0 !important;
    line-height: 1.25 !important;
  }
  .landing-page--upes .about-sub-h {
    font-family: 'Montserrat', sans-serif !important;
    background-color: #ffa408 !important;
    color: #000000 !important;
    padding: 8px 20px !important;
    border-radius: 4px !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    text-align: center !important;
    max-width: 825px !important;
    margin: 0 auto 14px auto !important;
    line-height: 1.4 !important;
    white-space: pre-line !important;
    box-sizing: border-box !important;
  }
  .landing-page--upes .about-text {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 1.62 !important;
    color: #222222 !important;
    max-width: 1010px !important;
    margin: 0 auto 16px auto !important;
    text-align: center !important;
    white-space: pre-line !important;
    box-sizing: border-box !important;
  }
  .landing-page--upes .green-btn-university {
    font-family: 'Montserrat', sans-serif !important;
    background-color: #009933 !important;
    color: #ffffff !important;
    border: none !important;
    padding: 8px 26px !important;
    border-radius: 5px !important;
    font-size: 14.5px !important;
    font-weight: 700 !important;
    cursor: pointer !important;
    transition: background-color 0.2s ease !important;
    display: inline-block !important;
    margin: 0 auto !important;
    width: fit-content !important;
  }
  .landing-page--upes .green-btn-university:hover {
    background-color: #007728 !important;
  }

  /* Desktop hides the extra mobile image wrapper */
  .landing-page--upes .about-image-wrapper {
    display: none !important;
  }

  @media (min-width: 1600px) {
    .landing-page--upes #about {
      padding-bottom: 460px !important;
    }
  }

  @media (min-width: 1440px) and (max-width: 1599px) {
    .landing-page--upes #about {
      padding-bottom: 420px !important;
    }
  }

  @media (min-width: 1000px) and (max-width: 1279px) {
    .landing-page--upes #about {
      padding-top: 16px !important;
      padding-bottom: 360px !important;
    }
    .landing-page--upes #about > div:first-child,
    .landing-page--upes #about .relative.z-10 {
      max-width: 1000px !important;
    }
    .landing-page--upes #about h2 {
      font-size: 28px !important;
    }
    .landing-page--upes .about-sub-h {
      font-size: 14.5px !important;
      max-width: 800px !important;
    }
    .landing-page--upes .about-text {
      font-size: 13.8px !important;
      max-width: 960px !important;
    }
  }

  @media (min-width: 769px) and (max-width: 999px) {
    .landing-page--upes #about {
      padding-top: 16px !important;
      padding-bottom: 300px !important;
    }
    .landing-page--upes #about > div:first-child,
    .landing-page--upes #about .relative.z-10 {
      max-width: 100% !important;
    }
    .landing-page--upes #about h2 {
      font-size: 26px !important;
    }
    .landing-page--upes .about-sub-h {
      font-size: 14px !important;
      max-width: 720px !important;
    }
    .landing-page--upes .about-text {
      font-size: 13.5px !important;
      max-width: 760px !important;
    }
  }

  @media (max-width: 768px) {
    .landing-page--upes #about {
      background-image: none !important;
      padding: 26px 0 0 0 !important;
    }
    .landing-page--upes #about > div:first-child,
    .landing-page--upes #about .relative.z-10 {
      max-width: 100% !important;
      padding-left: 14px !important;
      padding-right: 14px !important;
    }
    .landing-page--upes #about h2 {
      font-size: 24px !important;
      font-weight: 700 !important;
      color: #003399 !important;
      margin-bottom: 14px !important;
      text-align: center !important;
    }
    .landing-page--upes .about-sub-h {
      display: none !important;
    }
    .landing-page--upes .about-text {
      font-size: 13.5px !important;
      font-weight: 400 !important;
      line-height: 1.62 !important;
      padding: 0 4px !important;
      margin: 0 auto 18px auto !important;
      text-align: center !important;
      color: #222222 !important;
      max-width: 580px !important;
      width: 100% !important;
      white-space: normal !important;
    }
    .landing-page--upes .green-btn-university {
      font-size: 14px !important;
      padding: 8px 26px !important;
      display: inline-block !important;
      margin: 0 auto 18px auto !important;
    }
    .landing-page--upes .about-image-wrapper {
      display: block !important;
      margin-top: 4px !important;
      width: 100% !important;
    }
    .landing-page--upes .about-image-inner-mobile {
      position: relative !important;
      width: 100% !important;
      height: 235px !important;
    }
    .landing-page--upes .about-image-inner-mobile img {
      object-fit: cover !important;
      object-position: center center !important;
    }
  }

  @media (max-width: 480px) {
    .landing-page--upes #about {
      padding-top: 22px !important;
    }
    .landing-page--upes #about h2 {
      font-size: 23px !important;
      margin-bottom: 12px !important;
    }
    .landing-page--upes .about-sub-h {
      display: none !important;
    }
    .landing-page--upes .about-text {
      font-size: 13.5px !important;
      line-height: 1.6 !important;
      padding: 0 14px !important;
      margin: 0 auto 16px auto !important;
      text-align: center !important;
    }
    .landing-page--upes .green-btn-university {
      font-size: 13.5px !important;
      padding: 8px 24px !important;
      margin-bottom: 16px !important;
    }
    .landing-page--upes .about-image-inner-mobile {
      height: 220px !important;
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
    font-family: 'Montserrat', sans-serif !important;
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
    margin-bottom: 25px;
  }
  .landing-page--upes .working-p-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 20px;
  }
  .landing-page--upes .working-p-box-left-border,
  .landing-page--upes .working-p-box-right-border {
    background-color: #ffffff;
    border: none !important;
    border-radius: 0px !important;
    padding: 16px 18px 18px 18px;
    color: #111111;
    display: block !important;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05) !important;
    min-height: 110px;
    overflow: hidden;
  }
  .landing-page--upes .working-p-box-left-border::after,
  .landing-page--upes .working-p-box-right-border::after {
    content: "";
    display: table;
    clear: both;
  }
  .landing-page--upes .working-p-box-left-border {
    border-left: 5px solid #ffbe00 !important;
  }
  .landing-page--upes .working-p-box-right-border {
    border-right: 5px solid #ffbe00 !important;
  }
  .landing-page--upes .working-p-icon {
    float: left !important;
    width: 52px;
    min-width: 52px;
    height: 52px;
    margin-right: 14px !important;
    margin-bottom: 4px !important;
    position: relative;
    display: block;
  }
  .landing-page--upes .working-p-icon img {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
    display: block;
  }
  .landing-page--upes .working-p-content {
    display: contents !important;
  }
  .landing-page--upes #working-p h4 {
    font-family: 'Montserrat', sans-serif !important;
    color: #000000;
    font-size: 16.5px;
    font-weight: 700;
    margin: 2px 0 6px 0;
    line-height: 1.3;
  }
  .landing-page--upes #working-p p {
    font-family: 'Montserrat', sans-serif !important;
    color: #444444;
    font-size: 13.5px;
    font-weight: 400;
    line-height: 1.5;
    margin: 0;
    white-space: normal !important;
  }

  @media (max-width: 768px) {
    .landing-page--upes #working-p {
      padding: 32px 16px 42px 16px !important;
    }
    .landing-page--upes #working-cc {
      width: 100% !important;
      max-width: 100% !important;
      padding: 0 4px !important;
    }
    .landing-page--upes #working-p h2 {
      font-size: 21px !important;
      font-weight: 700 !important;
      line-height: 1.35 !important;
      color: #ffffff !important;
      margin-bottom: 22px !important;
      padding: 0 8px !important;
    }
    .landing-page--upes .working-p-grid {
      grid-template-columns: 1fr !important;
      gap: 16px !important;
    }
    .landing-page--upes .working-p-box-left-border,
    .landing-page--upes .working-p-box-right-border {
      background-color: #ffffff !important;
      border: none !important;
      border-radius: 0px !important;
      padding: 16px 16px 16px 16px !important;
      color: #111111 !important;
      display: block !important;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06) !important;
      min-height: unset !important;
      overflow: hidden !important;
    }
    .landing-page--upes .working-p-box-left-border {
      border-left: 5px solid #ffbe00 !important;
    }
    .landing-page--upes .working-p-box-right-border {
      border-right: 5px solid #ffbe00 !important;
    }
    .landing-page--upes .working-p-icon {
      float: left !important;
      width: 58px !important;
      min-width: 58px !important;
      height: 58px !important;
      margin-right: 14px !important;
      margin-bottom: 4px !important;
      position: relative !important;
      display: block !important;
    }
    .landing-page--upes .working-p-icon img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      display: block !important;
    }
    .landing-page--upes .working-p-content {
      display: contents !important;
    }
    .landing-page--upes #working-p h4 {
      font-family: 'Montserrat', sans-serif !important;
      color: #000000 !important;
      font-size: 16px !important;
      font-weight: 700 !important;
      margin: 0 0 6px 0 !important;
      line-height: 1.3 !important;
      letter-spacing: -0.2px !important;
    }
    .landing-page--upes #working-p p {
      font-family: 'Montserrat', sans-serif !important;
      color: #333333 !important;
      font-size: 13.5px !important;
      font-weight: 400 !important;
      line-height: 1.55 !important;
      margin: 0 !important;
      white-space: pre-line !important;
    }
  }

  @media (max-width: 480px) {
    .landing-page--upes #working-p {
      padding: 28px 14px 36px 14px !important;
    }
    .landing-page--upes #working-p h2 {
      font-size: 19.5px !important;
      margin-bottom: 20px !important;
    }
    .landing-page--upes .working-p-grid {
      gap: 15px !important;
    }
    .landing-page--upes .working-p-box-left-border,
    .landing-page--upes .working-p-box-right-border {
      padding: 14px 14px 14px 14px !important;
      display: block !important;
    }
    .landing-page--upes .working-p-icon {
      float: left !important;
      width: 56px !important;
      min-width: 56px !important;
      height: 56px !important;
      margin-right: 12px !important;
      margin-bottom: 4px !important;
    }
    .landing-page--upes #working-p h4 {
      font-size: 15.5px !important;
      margin-bottom: 5px !important;
    }
    .landing-page--upes #working-p p {
      font-size: 13px !important;
      line-height: 1.52 !important;
      white-space: pre-line !important;
    }
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
  /* =========================================
     UPES FAQ SECTION - FIRST IMAGE STYLE
     Desktop + Laptop + Tablet + Mobile
     ========================================= */

  .landing-page--upes #faqs {
    padding: 40px 0 50px 0 !important;
    background-color: #ffffff !important;
  }

  .landing-page--upes #faqs > div {
    width: 100% !important;
    max-width: 1130px !important;
    margin: 0 auto !important;
    padding-left: 15px !important;
    padding-right: 15px !important;
    text-align: left !important;
    box-sizing: border-box !important;
  }

  /* Small FAQ'S text */
  .landing-page--upes #faq-subh {
    color: #000000 !important;
    font-family: 'Montserrat', sans-serif !important;
    font-size: 14.5px !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
    text-align: left !important;
    margin: 0 0 6px 0 !important;
    padding-left: 15px !important;
    line-height: 1.3 !important;
  }

  /* Frequently Asked Questions Heading */
  .landing-page--upes #faqs h3 {
    font-family: 'Montserrat', sans-serif !important;
    font-size: clamp(24px, 2vw, 30px) !important;
    font-weight: 700 !important;
    line-height: 1.25 !important;
    text-align: left !important;
    padding-left: 15px !important;

    background: -webkit-linear-gradient(#f2167d, #ffa408) !important;
    background: linear-gradient(90deg, #f2167d 0%, #ffa408 100%) !important;
    -webkit-background-clip: text !important;
    background-clip: text !important;
    -webkit-text-fill-color: transparent !important;

    margin: 0 0 22px 0 !important;
  }

  /* FAQ item */
  .landing-page--upes .faq-item {
    border: none !important;
    border-radius: 0 !important;
    margin: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    overflow: hidden !important;
  }

  /* FAQ question - CLOSED (Font Weight: MEDIUM 500) */
  .landing-page--upes .faq-question {
    width: 100% !important;
    min-height: 52px !important;
    padding: 14px 15px !important;

    font-family: 'Montserrat', sans-serif !important;
    font-size: 16px !important;
    font-weight: 500 !important;
    line-height: 1.45 !important;
    letter-spacing: -0.1px !important;

    color: #000000 !important;
    background: transparent !important;
    border: none !important;

    cursor: pointer !important;
    outline: none !important;
    -webkit-tap-highlight-color: transparent !important;

    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 20px !important;
    text-align: left !important;
    transition: background-color 0.15s ease, color 0.15s ease !important;
  }

  .landing-page--upes .faq-question span,
  .landing-page--upes .faq-item .faq-question span {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 500 !important;
    color: inherit !important;
  }

  /* FAQ question hover & focus */
  .landing-page--upes .faq-question:hover,
  .landing-page--upes .faq-question:focus,
  .landing-page--upes .faq-question:active {
    background-color: transparent !important;
    color: #000000 !important;
    outline: none !important;
  }

  /* FAQ + / - icon */
  .landing-page--upes .faq-question .faq-icon {
    flex-shrink: 0 !important;
    font-size: 20px !important;
    font-weight: 300 !important;
    color: #7288a2 !important;
    margin-left: auto !important;
    line-height: 1 !important;
    transition: color 0.15s ease !important;
  }

  /* ACTIVE FAQ QUESTION (Font Weight: MEDIUM 500) */
  .landing-page--upes .faq-item.active .faq-question {
    min-height: 52px !important;
    padding: 14px 15px !important;

    background-color: #ebebeb !important;
    border-left: 10px solid #f2167d !important;

    color: #000000 !important;
    font-family: 'Montserrat', sans-serif !important;
    font-size: 16px !important;
    font-weight: 500 !important;
  }

  .landing-page--upes .faq-item.active .faq-question span {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 500 !important;
  }

  .landing-page--upes .faq-item.active .faq-question:hover,
  .landing-page--upes .faq-item.active .faq-question:focus,
  .landing-page--upes .faq-item.active .faq-question:active {
    background-color: #ebebeb !important;
    color: #000000 !important;
    outline: none !important;
  }

  /* Active minus icon */
  .landing-page--upes .faq-item.active .faq-question .faq-icon {
    color: #000000 !important;
    font-size: 22px !important;
    font-weight: 400 !important;
    line-height: 1 !important;
  }

  /* FAQ Answer (Font Weight: NORMAL 400) */
  .landing-page--upes .faq-answer,
  .landing-page--upes .faq-item.active .faq-answer {
    background-color: #f7f7f7 !important;
    padding: 14px 20px 16px 25px !important;
    text-align: left !important;
  }

  .landing-page--upes .faq-answer,
  .landing-page--upes .faq-answer p,
  .landing-page--upes .faq-item.active .faq-answer,
  .landing-page--upes .faq-item.active .faq-answer p {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 15px !important;
    font-weight: 400 !important;
    line-height: 1.65 !important;
    color: #222222 !important;
    margin: 0 !important;
  }

  /* =========================================
     LAPTOP (1000px - 1279px)
     ========================================= */

  @media (min-width: 1000px) and (max-width: 1279px) {
    .landing-page--upes #faqs {
      padding: 36px 0 !important;
    }

    .landing-page--upes #faqs > div {
      max-width: 1040px !important;
      padding-left: 15px !important;
      padding-right: 15px !important;
    }

    .landing-page--upes #faq-subh {
      font-size: 14px !important;
      padding-left: 15px !important;
    }

    .landing-page--upes #faqs h3 {
      font-size: 26px !important;
      padding-left: 15px !important;
      margin-bottom: 20px !important;
    }

    .landing-page--upes .faq-question {
      min-height: 50px !important;
      padding: 13px 15px !important;
      font-size: 15.5px !important;
      font-weight: 500 !important;
      border: none !important;
    }

    .landing-page--upes .faq-item.active .faq-question {
      min-height: 50px !important;
      padding: 13px 15px !important;
      font-size: 15.5px !important;
      font-weight: 500 !important;
      border-left: 9px solid #f2167d !important;
    }

    .landing-page--upes .faq-item.active .faq-answer {
      padding: 14px 18px 15px 24px !important;
    }

    .landing-page--upes .faq-item.active .faq-answer p {
      font-size: 14.5px !important;
      font-weight: 400 !important;
    }
  }

  /* =========================================
     TABLET (769px - 999px)
     ========================================= */

  @media (min-width: 769px) and (max-width: 999px) {
    .landing-page--upes #faqs {
      padding: 32px 0 !important;
    }

    .landing-page--upes #faqs > div {
      max-width: 100% !important;
      padding-left: 15px !important;
      padding-right: 15px !important;
    }

    .landing-page--upes #faq-subh {
      font-size: 13.5px !important;
      padding-left: 15px !important;
    }

    .landing-page--upes #faqs h3 {
      font-size: 24px !important;
      padding-left: 15px !important;
      margin-bottom: 18px !important;
    }

    .landing-page--upes .faq-question {
      min-height: 48px !important;
      padding: 12px 15px !important;
      font-size: 15px !important;
      font-weight: 500 !important;
      border: none !important;
    }

    .landing-page--upes .faq-item.active .faq-question {
      min-height: 48px !important;
      padding: 12px 15px !important;
      font-size: 15px !important;
      font-weight: 500 !important;
      border-left: 8px solid #f2167d !important;
    }

    .landing-page--upes .faq-item.active .faq-answer {
      padding: 13px 16px 14px 23px !important;
    }

    .landing-page--upes .faq-item.active .faq-answer p {
      font-size: 14px !important;
      font-weight: 400 !important;
    }
  }

  /* =========================================
     MOBILE (<= 768px)
     ========================================= */

  @media (max-width: 768px) {
    .landing-page--upes #faqs {
      padding: 28px 0 24px 0 !important;
    }

    .landing-page--upes #faqs > div {
      width: 100% !important;
      max-width: 100% !important;
      padding-left: 12px !important;
      padding-right: 12px !important;
    }

    .landing-page--upes #faq-subh {
      font-size: 13px !important;
      padding-left: 10px !important;
      margin-bottom: 4px !important;
    }

    .landing-page--upes #faqs h3 {
      font-size: 20px !important;
      padding-left: 10px !important;
      margin: 0 0 16px 0 !important;
    }

    .landing-page--upes .faq-question {
      min-height: 48px !important;
      padding: 12px 10px !important;
      font-size: 14.5px !important;
      font-weight: 500 !important;
      border: none !important;
      gap: 12px !important;
    }

    .landing-page--upes .faq-item.active .faq-question {
      min-height: 48px !important;
      padding: 12px 10px !important;
      font-size: 14.5px !important;
      font-weight: 500 !important;
      border-left: 7px solid #f2167d !important;
    }

    .landing-page--upes .faq-question .faq-icon {
      font-size: 18px !important;
    }

    .landing-page--upes .faq-item.active .faq-question .faq-icon {
      font-size: 20px !important;
    }

    .landing-page--upes .faq-item.active .faq-answer {
      padding: 12px 12px 13px 17px !important;
    }

    .landing-page--upes .faq-item.active .faq-answer p {
      font-size: 13.5px !important;
      font-weight: 400 !important;
    }
  }

  /* =========================================
     VERY SMALL MOBILE (<= 480px)
     ========================================= */

  @media (max-width: 480px) {
    .landing-page--upes #faqs {
      padding-top: 24px !important;
      padding-bottom: 20px !important;
    }

    .landing-page--upes #faqs > div {
      padding-left: 10px !important;
      padding-right: 10px !important;
    }

    .landing-page--upes #faq-subh {
      font-size: 12px !important;
      padding-left: 8px !important;
    }

    .landing-page--upes #faqs h3 {
      font-size: 18.5px !important;
      padding-left: 8px !important;
      margin-bottom: 14px !important;
    }

    .landing-page--upes .faq-question {
      min-height: 46px !important;
      padding: 11px 8px !important;
      font-size: 13.5px !important;
      font-weight: 500 !important;
      border: none !important;
    }

    .landing-page--upes .faq-item.active .faq-question {
      min-height: 46px !important;
      padding: 11px 8px !important;
      font-size: 13.5px !important;
      font-weight: 500 !important;
      border-left: 6px solid #f2167d !important;
    }

    .landing-page--upes .faq-item.active .faq-answer {
      padding: 11px 10px 12px 14px !important;
    }

    .landing-page--upes .faq-item.active .faq-answer p {
      font-size: 13px !important;
      font-weight: 400 !important;
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
    tagline1: "Turn Your Dreams Into Reality With UPES\nUniversity Online",
    tagline: "Turn Your Dreams Into Reality With UPES\nUniversity Online",
    description:
      "UPES University Online believes in turning each\nstudent's dreams into reality. The university offers in-\ndemand courses upto market standards benefit to its\nstudents and working professionals.",
    officialUrl: "https://upesonline.ac.in",
    logo: "/assets/all_universities_images/upes/upes-logo-for-lp.png",
    sodeLogo: "/assets/all_universities_images/upes/new-des-logo.webp",
    sodeIcon: "/assets/all_universities_images/upes/sode-icon.png",
    showSodeLogo: false,
    sodeOnLeftMobile: false,
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
      mobileImage: "/assets/all_universities_images/upes/university.webp",
      mobileImageWrapperClassName: "!w-full !aspect-[925/434] !relative !overflow-hidden !mb-3 !rounded-[14px] !shadow-md",
      mobileImageClassName: "!w-full !h-full !object-cover !rounded-[14px]",
      mobileAlign: "left",
      alignLeftMobile: true,
      backgroundPosition: "center top",
      backgroundSize: "cover",
      desktopBackgroundPosition: "center top",
      desktopBackgroundSize: "cover",
      noOverlay: true,
      containerClassName: "!max-w-full !w-full !mx-0 min-[1000px]:!pl-4 min-[1000px]:!pr-6",
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
      taglineText: "Turn Your Dreams Into Reality With UPES\nUniversity Online",
      description:
        "UPES University Online believes in turning each\nstudent's dreams into reality. The university offers in-\ndemand courses upto market standards benefit to its\nstudents and working professionals.",
      descriptionClassName: "hero-description  !mt-1.5 !mb-0 !my-0 !p-0 font-normal leading-tight",
      descriptionStyle: {
        margin: 0,
        marginTop: 0,
        marginBottom: 0,
        padding: 0,
        lineHeight: 2,
      },
      coursesStrip: ["BBA | BCA | BCOM | MBA | MCA | PGP"],
      hideCourseBox: true,
      courseStripClassName: "courses-badge upes-course-strip",
      coursesColor: "#ffffff",

      courseBoxStyle: {
        backgroundColor: "#f2167d",
        color: "#ffffff",

        padding: "4px 14px",
        margin: "25px 0 20px 0",

        fontSize: "14.5px",
        lineHeight: "22px",
        fontWeight: 500,

        border: "none",
        borderRadius: "3px",

        width: "fit-content",
        maxWidth: "440px",

        whiteSpace: "nowrap",
        display: "inline-block",
      },
      brochureButtonText: "Download Brochure",
      buttonBackground: "#003399",
      buttonTextColor: "#ffffff",
      buttonClassName: "!rounded-full !font-medium",
      buttonStyle: {
        borderRadius: "50px",
      },
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
    approvalsTitlePrefix: "UPES University Online",
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
    subheading:
      "UPES University Online helps students and working professionals to achieve and enhance their\nintelligence.",
    text: "UPES was founded in 2003 with the goal of offering high-quality education. Offering a variety of undergraduate,\npostgraduate, and certificate programs in business, engineering, technology, law, and other fields, UPES University Online is\none of India's leading universities of online education. UPES University is positioned 36th in the NIRF Ranking and 5th in the\nWorld University Ranking 2026. UPES University Online is an ideal option for professionals and students who want to continue\ntheir education while maintaining both their private and professional lives.",
    buttonText: "Apply Now →",
    image: "/assets/all_universities_images/upes/upes-university-image-3.webp",
  },

  // Why Choose Items
  whyChoose: [
    {
      title: "Program with flexibility",
      desc: "UPES University Online courses\ngive learners the freedom to study\nat their own pace and schedule\nwith an industry-relevant curriculum.",
      image: "/assets/all_universities_images/upes/program-with-flexibility.webp",
    },
    {
      title: "Networking And Collaboration",
      desc: "Through UPES University Online,\nwith a legacy of 20+ Years, connect\nwith like-minded professionals and\nexperts from various industries.",
      image: "/assets/all_universities_images/upes/networking-collaboration.webp",
    },
    {
      title: "Personalized Support",
      desc: "UPES University Online provides\nstudents access to dedicated\nstudent support services, other\nresources, and Placement Assistance.",
      image: "/assets/all_universities_images/upes/personalized-suppport.webp",
    },
    {
      title: "Cost-effective Learning",
      desc: "With UPES University Online, save\non travel and accommodation\nexpenses associated with\ntraditional education, and Attractive\nScholarships.",
      image: "/assets/all_universities_images/upes/cost-effective-learning.webp",
    },
    {
      title: "Career Advancement Opportunities",
      desc: "Enhance professional profile and\npursue new opportunities with\nUPES University Online in-demand courses.",
      image: "/assets/all_universities_images/upes/career-advancement.webp",
    },
    {
      title: "Accreditation And Recognition",
      desc: "Connect with like-minded\nprofessionals and experts from\nvarious industries through UPES\nUniversity Online, Esteemed Faculty from IITs,\nIISc, IIMs, and Ivy League.",
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
