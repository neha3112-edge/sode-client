import React from "react";
import Image from "next/image";
import { Clock, Calendar, BookOpen, GraduationCap } from "lucide-react";

/**
 * Systematic Custom CSS for SSBM Geneva Landing Page
 * Matched precisely to https://distanceeducationschool.com/ssbm/
 */
export const ssbmCustomCss = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Anton&family=Montserrat:wght@400;600;700;800;900&display=swap');

  .landing-page--ssbm {
    font-family: 'Outfit', sans-serif !important;
    scroll-behavior: smooth;
    color: #111111;
    background-color: #ffffff;
  }

  .landing-page--ssbm header.navbar {
    background: #ffffff !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05) !important;
  }

  .landing-page--ssbm .header_menu_list li a {
    font-family: 'Outfit', sans-serif !important;
    font-weight: 600 !important;
    font-size: 18px !important;
    color: #111111 !important;
    text-decoration: none !important;
    transition: color 0.2s ease !important;
  }
  .landing-page--ssbm .header_menu_list li a:hover {
    color: #c11f28 !important;
  }

  /* Hero Section */
  .landing-page--ssbm #hero {
    background-image: url(/assets/all_universities_images/ssbm/ssbm_new_Desktop_bg.png) !important;
    background-position: center center !important;
   background-size: 115% auto !important;
    background-repeat: no-repeat !important;
    padding: 20px 16px 20px !important;
    min-height: 570px !important;
    position: relative !important;
    display: flex !important;
    align-items: center !important;
  }

 .landing-page--ssbm #hero > div.absolute {
  background-position: center center !important;
  background-size: 130% auto !important;
}
  .landing-page--ssbm #hero h1 {
    font-size: 68px !important;
    font-family: 'Anton', sans-serif !important;
    font-weight: 500 !important;
    line-height: 1 !important;
    color: #c11f28 !important;
    margin: 4px 0 8px 0 !important;
    text-align: left !important;
  }

 @media (max-width: 768px) {
  .landing-page--ssbm #hero {
    background-image: url(/assets/all_universities_images/ssbm/mobile_new_bg_main.png) !important;
    background-position: center center !important;
    background-size: 150% auto !important;
    background-repeat: no-repeat !important;
    padding: 16px 0px 35px !important;
    min-height: auto !important;
    display: block !important;
  }
}
    .landing-page--ssbm #hero > div.ant-layout-content,
    .landing-page--ssbm #hero .ant-layout-content {
      padding-left: 0 !important;
      padding-right: 0 !important;
      max-width: 100% !important;
      width: 100% !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      gap: 0 !important;
    }

    .landing-page--ssbm .hero-info-col {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      text-align: center !important;
      width: 100% !important;
      max-width: 100% !important;
      padding-left: 16px !important;
      padding-right: 16px !important;
      box-sizing: border-box !important;
    }

    .landing-page--ssbm #hero .hero-welcome-badge {
      display: none !important;
    }

    .landing-page--ssbm #hero h1 {
      font-size: 48px !important;
      text-align: center !important;
      line-height: 1.0 !important;
      color: #c11f28 !important;
      margin-bottom: 6px !important;
    }

    .landing-page--ssbm #hero p {
      text-align: center !important;
    }

    .landing-page--ssbm .hero-checklist {
      margin: 10px auto 4px !important;
      width: fit-content !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
    }

    .landing-page--ssbm .hero-checklist li,
    .landing-page--ssbm .hero-checklist div.flex {
      justify-content: flex-start !important;
    }

    .landing-page--ssbm .hero-mobile-logo {
      display: block !important;
      width: 100% !important;
      text-align: center !important;
      margin: 14px auto 8px !important;
    }

    @layer utilities {
      .hero-actions-wrapper,
      .landing-page--ssbm .hero-actions-wrapper,
      .landing-page--ssbm .hero-info-col .hero-actions-wrapper,
      .landing-page--ssbm .hero-info-col div.hero-actions-wrapper,
      .landing-page--ssbm .hero-info-col > div.flex.pt-3,
      .landing-page--ssbm .hero-info-col button,
      .landing-page--ssbm .hero-info-col .ant-btn,
      .landing-page--ssbm .hero-info-col .hero-brochure-btn,
      .landing-page--ssbm .hero-info-col .downloadBrochureBtn,
      .hero-brochure-btn,
      button.hero-brochure-btn,
      .ant-btn.hero-brochure-btn,
      #hero .hero-brochure-btn,
      .landing-page--ssbm .hero-brochure-btn,
      .landing-page--ssbm button.hero-brochure-btn,
      .landing-page--ssbm .ant-btn.hero-brochure-btn,
      .landing-page--ssbm #hero .hero-brochure-btn,
      .landing-page--ssbm #hero button.hero-brochure-btn,
      .landing-page--ssbm #hero .ant-btn.hero-brochure-btn {
        display: none !important;
      }
    }

    .landing-page--ssbm .hero-mobile-image-wrapper {
      width: 100% !important;
      max-width: 100% !important;
      position: relative !important;
      left: 0 !important;
      right: 0 !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      aspect-ratio: 801 / 687 !important;
      height: auto !important;
      margin-top: 6px !important;
      margin-bottom: -50px !important;
      z-index: 10 !important;
      display: block !important;
    }

    .landing-page--ssbm .hero-mobile-image-wrapper img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      display: block !important;
    }

    .landing-page--ssbm .hero-form-col {
      width: 100% !important;
      max-width: 100% !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      z-index: 20 !important;
      position: relative !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
    }

    .landing-page--ssbm .hero-form-col .landing-card,
    .landing-page--ssbm #hero .landing-lead-card {
      width: calc(100% - 32px) !important;
      max-width: 360px !important;
      border-radius: 12px !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12) !important;
      background: #ffffff !important;
      position: relative !important;
      z-index: 20 !important;
      margin: 0 auto !important;
    }
  }

  /* Hero custom checklist */
  .landing-page--ssbm .hero-checklist {
    list-style: none !important;
    padding: 0 !important;
    margin: 10px 0 !important;
  }
  .landing-page--ssbm .hero-checklist li,
  .landing-page--ssbm .hero-checklist div.flex {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    color: #000000 !important;
    font-size: 13.5px !important;
    font-weight: 500 !important;
    margin-bottom: 6px !important;
    text-align: left !important;
  }
  .landing-page--ssbm .hero-checklist svg {
    width: 17px !important;
    height: 17px !important;
    fill: #000000 !important;
    flex-shrink: 0 !important;
  }

  /* Form on Hero */
  .landing-page--ssbm #hero .landing-lead-card {
    border-radius: 8px !important;
    padding: 16px 18px 18px !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
    max-width: 340px !important;
  }

  .landing-page--ssbm #hero .landing-lead-card h2 {
    color: #c11f28 !important;
    font-size: 21px !important;
    font-weight: 800 !important;
    line-height: 1.1 !important;
    margin: 0 !important;
  }

  .landing-page--ssbm #hero .landing-lead-card p {
    color: #111111 !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    margin: 2px 0 8px 0 !important;
  }

  /* Buttons */
  .landing-page--ssbm .downloadBrochureBtn {
    background-color: #c11f28 !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    font-size: 15px !important;
    padding: 10px 22px !important;
    border-radius: 6px !important;
    transition: all 0.2s ease !important;
    border: none !important;
  }
  .landing-page--ssbm .downloadBrochureBtn:hover {
    background-color: #a81a22 !important;
  }

  .landing-page--ssbm .enquireNowBtn {
    background-color: #c11f28 !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    border-radius: 5px !important;
  }

  /* Overview */
  .landing-page--ssbm #overview {
    padding-top: 24px !important;
    padding-bottom: 24px !important;
    margin: 0 auto !important;
    background-color: #ffffff !important;
  }

  .landing-page--ssbm #overview .max-w-\[1050px\],
  .landing-page--ssbm #overview > div {
    max-width: 1260px !important;
    width: 100% !important;
    margin: 0 auto !important;
    padding-left: 16px !important;
    padding-right: 16px !important;
  }

  .landing-page--ssbm #overview h2 {
    font-size: 35px !important;
    font-weight: 700 !important;
    margin: 0 0 10px 0 !important;
    line-height: 1.2 !important;
    text-align: center !important;
  }

  .landing-page--ssbm #overview h2 > span > span:first-child {
    color: #000000 !important;
  }

  .landing-page--ssbm #overview h2 > span > span:last-child {
    color: #c11f28 !important;
  }

  .landing-page--ssbm #overview p {
    text-align: center !important;
    font-size: 14px !important;
    line-height: 1.55 !important;
    color: #111111 !important;
    max-width: 1205px !important;
    margin: 0 auto 18px auto !important;
    font-weight: 400 !important;
  }

  .landing-page--ssbm .overview_lists {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 16px !important;
    margin: 0 auto 20px auto !important;
    max-width: 1205px !important;
  }

  .landing-page--ssbm .overview_list_inner {
    background-color: #f1f1f1 !important;
    border: none !important;
    border-radius: 6px !important;
    padding: 10px 14px !important;
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    text-align: left !important;
    box-shadow: none !important;
    transition: none !important;
  }

  .landing-page--ssbm .overview_list_inner:hover {
    transform: none !important;
  }

  .landing-page--ssbm .overview_list_inner svg {
    width: 32px !important;
    height: 32px !important;
    fill: #c11f28 !important;
    color: #c11f28 !important;
    flex-shrink: 0 !important;
  }

  .landing-page--ssbm .overview_list_inner h3 {
    font-size: 16px !important;
    font-weight: 700 !important;
    color: #111111 !important;
    margin: 0 0 2px 0 !important;
    line-height: 1.2 !important;
  }

  .landing-page--ssbm .overview_list_inner p {
    font-size: 13px !important;
    font-weight: 500 !important;
    color: #555555 !important;
    margin: 0 !important;
    line-height: 1.2 !important;
    text-align: left !important;
  }

  .landing-page--ssbm #overview .downloadBrochureBtn {
    background-color: #c11f28 !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    font-size: 15px !important;
    padding: 9px 22px !important;
    border-radius: 5px !important;
    transition: all 0.2s ease !important;
    border: none !important;
    box-shadow: none !important;
  }

  .landing-page--ssbm #overview .downloadBrochureBtn:hover {
    background-color: #a81a22 !important;
  }

  .landing-page--ssbm #overview button:nth-of-type(2),
  .landing-page--ssbm #overview button.bg-black {
    background-color: #000000 !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    font-size: 15px !important;
    padding: 9px 22px !important;
    border-radius: 5px !important;
    border: none !important;
    box-shadow: none !important;
  }



  /* Accreditations Fieldset */
  .landing-page--ssbm .accreditation-container {
    background-color: transparent !important;
    padding: 50px 16px !important;
  }
  .landing-page--ssbm .main-title {
    font-size: 38px !important;
    font-weight: 800 !important;
    color: #000000 !important;
    margin-bottom: 30px !important;
  }
  .landing-page--ssbm .main-title span {
    color: #b32a25 !important;
  }
  .landing-page--ssbm .border-box {
    border: 1.5px solid #b32a25 !important;
    border-radius: 18px !important;
    background: transparent !important;
  }
  .landing-page--ssbm .border-box legend {
    padding: 0 14px !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    color: #111111 !important;
    background: transparent !important;
  }

  /* Achievement Bar */
  .landing-page--ssbm .achievement {
    background-color: #000000 !important;
    padding: 32px 16px !important;
  }
  .landing-page--ssbm .ac1 h1 {
    color: #c11f28 !important;
    font-family: 'Outfit', sans-serif !important;
    font-size: 38px !important;
    font-weight: 700 !important;
    line-height: 1.1 !important;
    margin: 6px 0 2px 0 !important;
  }
  .landing-page--ssbm .ac1 h3 {
    color: #ffffff !important;
    font-family: 'Outfit', sans-serif !important;
    font-weight: 700 !important;
    font-size: 16px !important;
    letter-spacing: normal !important;
    margin: 0 !important;
  }
  .landing-page--ssbm .ac1 svg {
    width: 38px !important;
    height: 38px !important;
    fill: #ffffff !important;
    color: #ffffff !important;
  }

  /* Programmes Section Carousel Dots */
  .landing-page--ssbm .course-slider-wrapper .slick-dots {
    bottom: -24px !important;
    position: relative !important;
    margin-top: 22px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 4px !important;
  }
  .landing-page--ssbm .course-slider-wrapper .slick-dots li {
    margin: 0 3px !important;
    width: auto !important;
    height: auto !important;
  }
  .landing-page--ssbm .course-slider-wrapper .slick-dots li button {
    width: 8px !important;
    height: 8px !important;
    border-radius: 50% !important;
    background: #cccccc !important;
    opacity: 1 !important;
    transition: all 0.2s ease !important;
    padding: 0 !important;
  }
  .landing-page--ssbm .course-slider-wrapper .slick-dots li.slick-active button {
    background: #c11f28 !important;
    width: 8px !important;
    height: 8px !important;
    border-radius: 50% !important;
  }

  /* Benefits / Why Choose */
  .landing-page--ssbm #benefits {
    background-image: url(/assets/all_universities_images/ssbm/Global.webp) !important;
    background-size: cover !important;
    background-position: center !important;
  }
  @media (max-width: 768px) {
    .landing-page--ssbm #benefits {
      background-image: url(/assets/all_universities_images/ssbm/Global-mobile.webp) !important;
      background-position: 0% 0% !important;
      background-size: cover !important;
      background-repeat: no-repeat !important;
      padding-top: 30px !important;
      padding-bottom: 350px !important;
      padding-left: 15px !important;
      padding-right: 15px !important;
    }
  }

  /* About */
  .landing-page--ssbm #about {
    background-image: url(/assets/all_universities_images/ssbm/About-pic.webp) !important;
    background-size: cover !important;
    background-position: center !important;
  }

  /* Degree */
  .landing-page--ssbm #sample-degree h2 {
    color: #c11f28 !important;
  }
  .landing-page--ssbm #sample-degree img {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12) !important;
  }

  /* Compare section */
  .landing-page--ssbm .compare_box {
    background-color: #c11f28 !important;
  }

  /* Footer bottom */
  .landing-page--ssbm .mini-footer-bottom {
    background-color: #c11f28 !important;
  }

  /* ── SSBM MOBILE RESPONSIVE ── */

  /* Hero: tighten padding, shrink heading */
  @media (max-width: 767px) {
    .landing-page--ssbm #hero {
      padding: 16px 0px 35px !important;
    }
    .landing-page--ssbm .hero-welcome,
    .landing-page--ssbm .hero-brochure-btn,
    .landing-page--ssbm .hero-info-col button,
    .landing-page--ssbm .hero-info-col .ant-btn {
      display: none !important;
    }
  }

  /* Overview Section: matching first image (mobile view) */
  @media (max-width: 767px) {
    .landing-page--ssbm #overview {
      padding: 22px 14px 30px !important;
      margin: 0 auto !important;
    }
    .landing-page--ssbm #overview > div {
      padding-left: 0 !important;
      padding-right: 0 !important;
      max-width: 100% !important;
    }
    .landing-page--ssbm #overview h2 {
      font-size: 30px !important;
      font-weight: 800 !important;
      line-height: 1.2 !important;
      text-align: center !important;
      margin: 0 auto 12px auto !important;
      display: block !important;
      letter-spacing: -0.3px !important;
    }
    .landing-page--ssbm #overview h2 > span {
      display: inline !important;
    }
    .landing-page--ssbm #overview h2 > span > span:first-child {
      color: #000000 !important;
      font-weight: 800 !important;
    }
    .landing-page--ssbm #overview h2 > span > span:last-child {
      color: #c11f28 !important;
      font-weight: 800 !important;
    }
    .landing-page--ssbm #overview p {
      font-size: 13.5px !important;
      font-weight: 400 !important;
      line-height: 1.55 !important;
      color: #222222 !important;
      text-align: center !important;
      margin: 0 auto 20px auto !important;
      max-width: 100% !important;
      padding: 0 4px !important;
    }
    .landing-page--ssbm .overview_lists {
      grid-template-columns: 1fr !important;
      gap: 12px !important;
      margin: 0 auto 16px auto !important;
    }
    .landing-page--ssbm .overview_list_inner {
      padding: 12px 16px !important;
      border-radius: 8px !important;
    }
    .landing-page--ssbm .overview_list_inner h3 {
      font-size: 16px !important;
      font-weight: 700 !important;
    }
    .landing-page--ssbm #overview .overview-cta-row,
    .landing-page--ssbm #overview .flex.flex-wrap {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: nowrap !important;
      justify-content: center !important;
      align-items: center !important;
      gap: 8px !important;
      margin-top: 16px !important;
      width: 100% !important;
      max-width: 100% !important;
    }
    .landing-page--ssbm #overview .downloadBrochureBtn,
    .landing-page--ssbm #overview .overviewKnowMoreBtn,
    .landing-page--ssbm #overview .overview-cta-row button,
    .landing-page--ssbm #overview button.downloadBrochureBtn,
    .landing-page--ssbm #overview button.bg-black {
      padding: 7px 11px !important;
      font-size: 12.5px !important;
      font-weight: 700 !important;
      white-space: nowrap !important;
      flex-shrink: 0 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 5px !important;
      border-radius: 5px !important;
      height: 38px !important;
      min-height: 38px !important;
      max-height: 38px !important;
      box-sizing: border-box !important;
    }
    .landing-page--ssbm #overview .downloadBrochureBtn svg,
    .landing-page--ssbm #overview button svg {
      width: 14px !important;
      height: 14px !important;
      flex-shrink: 0 !important;
    }
    .landing-page--ssbm #overview .overviewKnowMoreBtn span:last-child {
      font-size: 11px !important;
      margin-left: 2px !important;
    }
  }

  /* Accreditation Fieldset: stack boxes and stack logos vertically on mobile */
  @media (max-width: 767px) {

    .landing-page--ssbm .accreditation-container,
    .landing-page--ssbm #accreditations {
      padding: 36px 16px 44px !important;
      background-color: transparent !important;
    }
    .landing-page--ssbm .main-title,
    .landing-page--ssbm #accreditations .main-title {
      font-size: 32px !important;
      font-weight: 800 !important;
      line-height: 1.15 !important;
      margin: 0 auto 28px auto !important;
      max-width: 280px !important;
      text-align: center !important;
    }
    .landing-page--ssbm .border-box,
    .landing-page--ssbm #accreditations .border-box {
      border: 1.5px solid #b32a25 !important;
      border-radius: 18px !important;
      background:transparent !important;
      padding: 26px 18px 30px !important;
      margin: 0 auto 28px auto !important;
      max-width: 330px !important;
      width: 100% !important;
      height: auto !important;
      min-height: auto !important;
      box-sizing: border-box !important;
    }
    .landing-page--ssbm .border-box legend,
    .landing-page--ssbm #accreditations .border-box legend {
      font-size: 18px !important;
      font-weight: 700 !important;
      color: #111111 !important;
      padding: 0 12px !important;
      background: transparent !important;
      margin: 0 auto !important;
      float: none !important;
    }
    .landing-page--ssbm .logo-group,
    .landing-page--ssbm #accreditations .logo-group {
      display: flex !important;
      flex-direction: column !important;
      height: auto !important;
      min-height: auto !important;
      max-height: none !important;
      gap: 32px !important;
      padding: 16px 0 8px 0 !important;
      align-items: center !important;
      justify-content: center !important;
      width: 100% !important;
    }
    .landing-page--ssbm .logo-group > div,
    .landing-page--ssbm #accreditations .logo-group > div {
      width: 100% !important;
      height: auto !important;
      min-height: 40px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex: 0 0 auto !important;
    }
    .landing-page--ssbm .logo-group img,
    .landing-page--ssbm #accreditations .logo-group img {
      width: auto !important;
      max-width: 80% !important;
      object-fit: contain !important;
      display: block !important;
      margin: 0 auto !important;
    }
    .landing-page--ssbm .logo-group img[alt*="ACBSP"] {
      max-height: 72px !important;
    }
    .landing-page--ssbm .logo-group img[alt*="CHEA"] {
      max-height: 50px !important;
    }
    .landing-page--ssbm .logo-group img[alt*="BAC"] {
      max-height: 60px !important;
    }
    .landing-page--ssbm .logo-group img[alt*="CEOWorld"] {
      max-height: 48px !important;
    }
    .landing-page--ssbm .logo-group img[alt*="Postgrad"] {
      max-height: 38px !important;
    }
    .landing-page--ssbm .logo-group img[alt*="Swiss"] {
      max-height: 52px !important;
    }
  }

  /* Achievement Bar: wrap items on phone */
  @media (max-width: 639px) {
    .landing-page--ssbm .achievement {
      padding: 20px 12px !important;
    }
    .landing-page--ssbm .achievement .flex {
      flex-wrap: wrap !important;
      justify-content: center !important;
      gap: 16px !important;
    }
    .landing-page--ssbm .ac1 {
      flex: 0 0 calc(50% - 10px) !important;
      text-align: center !important;
    }
    .landing-page--ssbm .ac1 h1 {
      font-size: 28px !important;
    }
    .landing-page--ssbm .ac1 h3 {
      font-size: 11px !important;
    }
  }

  /* Benefits / Why Choose */
  @media (max-width: 767px) {
    .landing-page--ssbm #benefits {
      padding: 40px 16px !important;
    }
    .landing-page--ssbm #benefits h2 {
      font-size: 22px !important;
    }
    .landing-page--ssbm #benefits .grid {
      grid-template-columns: 1fr !important;
      gap: 14px !important;
    }
  }

  /* Programmes Section */
  @media (max-width: 639px) {
    .landing-page--ssbm #program {
      padding: 36px 12px !important;
    }
    .landing-page--ssbm #program h2 {
      font-size: 22px !important;
    }
    .landing-page--ssbm #program .grid {
      grid-template-columns: 1fr !important;
    }
  }

  /* About Section */
  @media (max-width: 767px) {
    .landing-page--ssbm #about {
      padding: 36px 16px !important;
      background-image: none !important;
      background-color: #000000 !important;
      background-size: cover !important;
      background-position: center !important;
      background-repeat: no-repeat!important;
    }
    .landing-page--ssbm #about h2 {
      font-size: 22px !important;
    }
  }

  /* Sample Degree */
  @media (max-width: 767px) {
    .landing-page--ssbm #sample-degree {
      padding: 36px 16px !important;
    }
    .landing-page--ssbm #sample-degree h2 {
      font-size: 21px !important;
      line-height: 1.25 !important;
      color: #c11f28 !important;
    }
    .landing-page--ssbm #sample-degree .grid {
      grid-template-columns: 1fr !important;
    }
    .landing-page--ssbm #sample-degree img {
      max-width: 100% !important;
    }
  }

  /* Admission Process */
  @media (max-width: 639px) {
    .landing-page--ssbm .apply-section {
      padding: 36px 12px !important;
    }
    .landing-page--ssbm .apply-section h2 {
      font-size: 20px !important;
    }
  }

  /* FAQ */
  @media (max-width: 639px) {
    .landing-page--ssbm .faq-section {
      padding: 36px 12px !important;
    }
    .landing-page--ssbm .faq-section h2,
    .landing-page--ssbm .faq-header h2 {
      font-size: 20px !important;
    }
  }

  /* Footer Sticky Bar */
  @media (max-width: 1023px) {
    .landing-page--ssbm .footer_sticky_buttons {
      gap: 0px !important;
      padding: 0px !important;
      padding-left: 0px !important;
      padding-right: 0px !important;
      padding-top: 0px !important;
      padding-bottom: 0px !important;
      background: transparent !important;
      
    }
    .landing-page--ssbm .footer_sticky_buttons a,
    .landing-page--ssbm .footer_sticky_buttons button {
      border-radius: 0px !important;
      padding: 12px 6px !important;
      font-size: 15px !important;
      font-weight: 700 !important;
    }
    .landing-page--ssbm .footer_sticky_buttons .wp_btn {
      background: #25d366 !important;
      color: #ffffff !important;
      border-radius: 0px !important;
    }
    .landing-page--ssbm .footer_sticky_buttons .apply_btn {
      background: #c11f28 !important;
      color: #ffffff !important;
      border-radius: 0px !important;
    }
  }

  /* Programmes Card buttons on mobile */
  @media (max-width: 639px) {
    .landing-page--ssbm .card-box-cnt .downloadBrochureBtn,
    .landing-page--ssbm .card-box-cnt .enquireNowBtn {
      font-size: 12px !important;
      padding: 9px 12px !important;
    }
  }

  
`;

export const ssbmData = {
  slug: "ssbm",
  meta: {
    title: "SSBM Online DBA | SSBM DBA | SSBM Geneva Online DBA Program",
    description: "SSBM Online DBA program from SSBM Geneva. SSBM DBA online with 20+ specializations including Finance, Marketing, Data Science, HR, International Business, etc. SSBM Geneva online DBA eligibility, duration, and admission details.",
    keywords: "ssbm dba, SSBM DBA Admission, SSBM doctorate, SSBM university, SSBM Geneva online DBA",
    canonicalUrl: "https://distanceeducationschool.com/ssbm/",
    openGraph: {
      title: "SSBM Online DBA | SSBM Geneva Online DBA Program",
      description: "SSBM Online DBA program from SSBM Geneva. 20+ specializations, Swiss quality education, 100% online learning, PwC Board Advisory certification.",
      url: "https://distanceeducationschool.com/ssbm/",
      siteName: "Distance Education School",
      images: [
        {
          url: "https://distanceeducationschool.com/ssbm/assets/img/ssbm_new_logo.png",
          width: 800,
          height: 600,
          alt: "SSBM Geneva Online DBA",
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: "https://distanceeducationschool.com/ssbm/",
    },
  },
  css: ssbmCustomCss,
  customCss: ssbmCustomCss,

  // Brand Configuration
  brand: {
    name: "SSBM Geneva",
    slug: "ssbm",
    customCss: ssbmCustomCss,
    primaryColor: "#c11f28",
    themeColor: "#c11f28",
    accentColor: "#c11f28",
    fontFamily: "Outfit",
    showSodeLogo: true,
    sodeIcon: "/assets/all_universities_images/ssbm/new_sode_tm_logo.png",
    hideMangLogo: true, // Only SODE logo in navbar on SSBM live site
    showCouponBtn: false, // No coupon button in navbar
    hideNavbarBadge: true,
    sodeLogoContainerStyle: {
      width: "170px",
      height: "56px",
      minWidth: "120px",
    },
    callGif: "/assets/all_universities_images/ssbm/call_icon.gif",
    giftGif: "/assets/all_universities_images/ssbm/gift.gif",
    arrowGif: "/assets/all_universities_images/ssbm/arrow.gif",
    stickyCtaLayout: "default",
    showFloatingCallOnMobile: true,
    desLogo: "/assets/all_universities_images/ssbm/new-des-logo.webp",
    footerLogo: "/assets/all_universities_images/ssbm/new-des-logo.webp",
    footerBottomBg: "#c11f28",
    phone: "+91 7065 7777 55",
    phoneDisplay: "+91 7065 7777 55",
    enquireTitle: "Admission Open",
    enquireSubtitle: "Academic Experts will assist you!",

    // Navbar Links matching https://distanceeducationschool.com/ssbm/
    navLinks: [
      { label: "Courses", href: "#whychoose" },
      { label: "Approvals", href: "#accreditations" },
      { label: "About", href: "#about" },
      { label: "FAQ", href: "#faqs" },
    ],

    // Section Order matching live SSBM site
    sectionOrder: [
      "overview",
      "approvals",
      "programmes",
      "stats",
      "whyChoose",
      "about",
      "degree",
      "admissionProcess",
      "faqs",
      "compareBanner",
    ],

    // Hero Section Configuration
    hero: {
      backgroundImage: "/assets/all_universities_images/ssbm/ssbm_new_Desktop_bg.png",
      backgroundPosition: "center center",
      backgroundSize: "155% auto",
      desktopBackgroundPosition: "center center",
      desktopBackgroundSize: "155% auto",
      mobileBackgroundImage: "/assets/all_universities_images/ssbm/mobile_new_bg_main.png",
      mobileStudentImage: "/assets/all_universities_images/ssbm/ssbm_new_mobile_img.png",
      mobileStudentImageWrapperClassName: "!w-full !aspect-[801/687] !relative !overflow-visible",
      mobileStudentImageClassName: "!object-cover !object-top",
      noOverlay: true,
      minHeight: "570px",
      containerClassName: "!py-3 lg:!py-5 !min-h-[500px]",
      contentClassName: "items-center text-center md:!items-start md:!text-left lg:max-w-[500px]",

      welcomeText: (
        <Image
          src="/assets/all_universities_images/ssbm/ssbm_new_logo.png"
          alt="SSBM Geneva upGrad"
          width={185}
          height={48}
          className="hidden md:block h-[38px] sm:h-[44px] w-auto object-contain select-none"
        />
      ),
      welcomeClassName: "hero-welcome hidden md:block !mb-3 !mt-0 !text-left",
      welcomeContainerClassName: "hero-welcome hidden md:block !mb-3 !mt-0 !text-left",
      welcomeBadgeClassName: "!bg-transparent !p-0 !min-w-0 !shadow-none !border-none !rounded-none !block",

      hashtagText: "GLOBAL DOCTOR OF BUSINESS ADMINISTRATION",
      hashtagClassName: "text-center md:!text-left m-0 text-[13px] sm:text-[14px] font-bold tracking-wide",
      hashtagStyle: {
        fontFamily: "'Outfit', sans-serif",
        color: "#000000",
        fontSize: "14px",
        fontWeight: "700",
        letterSpacing: "0.2px",
        marginTop: "0px",
        marginBottom: "3px",
        whiteSpace: "nowrap",
      },

      headlineText: "Online DBA",
      headingFont: "'Anton', sans-serif",
      headingClassName: "!whitespace-pre-line !leading-[1] text-[48px] sm:text-[60px] lg:text-[68px] text-[#c11f28] text-center md:!text-left",
      headingStyle: {
        fontFamily: "'Anton', sans-serif",
        color: "#c11f28",
        fontSize: "68px",
        lineHeight: "1",
        fontWeight: "500",
        marginTop: "2px",
        marginBottom: "6px",
      },

      taglineText: (
        <span>
          By <u className="font-bold underline">SSBM Geneva</u> via <u className="font-bold underline">upGrad</u>
        </span>
      ),
      taglineClassName: "text-center md:!text-left mt-1 mb-2",
      taglineStyle: {
        fontFamily: "'Outfit', sans-serif",
        color: "#000000",
        fontSize: "15.5px",
        fontWeight: "600",
        lineHeight: "1.3",
        marginTop: "2px",
        marginBottom: "8px",
      },

      description:
        "Take your leadership journey into your hands with top-notch Swiss quality education that is designed for working professionals. This Online SSBM Doctorate is for students seeking greater opportunities and wanting to improve the real business world.",
      descriptionClassName: "text-center md:!text-left !text-[13.5px] sm:!text-[14px] !leading-[1.5] !text-[#000000] !max-w-[360px] sm:!max-w-[440px] mx-auto md:mx-0 !my-0 !mb-3 !font-normal",

      coursesStrip: [
        <div key="cl" className="hero-checklist space-y-1.5 mb-3 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 text-[14px] font-medium text-[#000000]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-[17px] h-[17px] fill-black shrink-0">
              <path d="M128 96C92.7 96 64 124.7 64 160L64 400L128 400L128 160L512 160L512 400L576 400L576 160C576 124.7 547.3 96 512 96L128 96zM19.2 448C8.6 448 0 456.6 0 467.2C0 509.6 34.4 544 76.8 544L563.2 544C605.6 544 640 509.6 640 467.2C640 456.6 631.4 448 620.8 448L19.2 448z" />
            </svg>
            <span>100% Online Learning</span>
          </div>
          <div className="flex items-center gap-2 text-[14px] font-medium text-[#000000]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-[17px] h-[17px] fill-black shrink-0">
              <path d="M415.9 344L225 344C227.9 408.5 242.2 467.9 262.5 511.4C273.9 535.9 286.2 553.2 297.6 563.8C308.8 574.3 316.5 576 320.5 576C324.5 576 332.2 574.3 343.4 563.8C354.8 553.2 367.1 535.8 378.5 511.4C398.8 467.9 413.1 408.5 416 344zM224.9 296L415.8 296C413 231.5 398.7 172.1 378.4 128.6C367 104.2 354.7 86.8 343.3 76.2C332.1 65.7 324.4 64 320.4 64C316.4 64 308.7 65.7 297.5 76.2C286.1 86.8 273.8 104.2 262.4 128.6C242.1 172.1 227.8 231.5 224.9 296zM176.9 296C180.4 210.4 202.5 130.9 234.8 78.7C142.7 111.3 74.9 195.2 65.5 296L176.9 296zM65.5 344C74.9 444.8 142.7 528.7 234.8 561.3C202.5 509.1 180.4 429.6 176.9 344L65.5 344zM463.9 344C460.4 429.6 438.3 509.1 406 561.3C498.1 528.6 565.9 444.8 575.3 344L463.9 344zM575.3 296C565.9 195.2 498.1 111.3 406 78.7C438.3 130.9 460.4 210.4 463.9 296L575.3 296z" />
            </svg>
            <span>Worldwide circle with a DBA Degree</span>
          </div>
          <div className="flex items-center gap-2 text-[14px] font-medium text-[#000000]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-[17px] h-[17px] fill-black shrink-0">
              <path d="M224 64C206.3 64 192 78.3 192 96L192 128L160 128C124.7 128 96 156.7 96 192L96 240L544 240L544 192C544 156.7 515.3 128 480 128L448 128L448 96C448 78.3 433.7 64 416 64C398.3 64 384 78.3 384 96L384 128L256 128L256 96C256 78.3 241.7 64 224 64zM96 288L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 288L96 288z" />
            </svg>
            <span>36 Months</span>
          </div>
        </div>,
      ],
      hideCourseBox: true,

      actionButtonsWrapperClassName: "hero-actions-wrapper",
      actionButtons: [
        {
          label: "Download Brochure",
          variant: "brochure",
          className: "downloadBrochureBtn hero-brochure-btn",
          bg: "#c11f28",
          color: "#ffffff",
          style: {
            fontFamily: "'Outfit', sans-serif",
            background: "#c11f28",
            backgroundColor: "#c11f28",
            color: "#ffffff",
            borderRadius: "6px",
            fontSize: "15px",
            fontWeight: "700",
            padding: "10px 22px",
            border: "none",
            boxShadow: "0 4px 12px rgba(193, 31, 40, 0.25)",
          },
        },
      ],

      cardStyle: "white",
      formBackground: "#ffffff",
      formCardType: "white",
      enquireTitle: "Admission Open",
      enquireSubtitle: "Academic Experts will assist you!",
      enquireColor: "#c11f28",
      enquireSubtitleColor: "#111111",
      phoneBadgeBg: "#c11f28",
      phoneBadgeBackground: "#c11f28",
      phoneBadgeStyle: {
        background: "#c11f28",
        backgroundColor: "#c11f28",
        color: "#ffffff",
        borderRadius: "9999px",
        padding: "3px 16px",
        fontSize: "13px",
        fontWeight: "700",
      },
      submitBtnBg: "#c11f28",
      submitButtonBackground: "#c11f28",
      submitButtonRadius: "4px",
      submitButtonTextColor: "#ffffff",
    },

    // Sticky CTA Strip (Mobile)
    stickyBrochureIcon: "whatsapp",
    stickyBarBg: "#c11f28",
    stickyApplyStyle: "red",

    // Overview Section
    overviewTitle: (
      <span>
        <span style={{ color: "#000000" }}>Course</span>{" "}
        <span style={{ color: "#c11f28" }}>Overview</span>
      </span>
    ),
    overviewDescription:
      "The Online SSBM DBA program offers a strong path with many silent features. The SSBM University not only offers a well-recognised degree program but also includes PwC India’s Board Advisory Certification, with patent-to-idea guidance, where Swiss expert faculty guide learners in conducting practical research and turning their ideas into theory. SSBM Doctorate online course also offers support in research, publishing, and leadership development for working professionals. The learner also takes advantage of practical boardroom skills enhancement, expert mentorship, global publishing opportunities, and allows them to interact with elite networks. The SSBM DBA online program offers the mixture of academic depth with real-world application, helping professionals increase their strategic decision-making and help themselves establish an influential leader. Students after taking the SSBM DBA admission can also expect a major salary increase.",
    overviewButtonText: "Get Curriculum",
    overviewBtnTextColor: "#ffffff",
    overviewSecondaryBtnText: "Know More",
    overviewItems: [
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-[32px] h-[32px] fill-[#c11f28] shrink-0">
            <path d="M320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z" />
          </svg>
        ),
        title: "Duration",

        value: "2-3 Years",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-[32px] h-[32px] fill-[#c11f28] shrink-0">
            <path d="M416 64C433.7 64 448 78.3 448 96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 64 224 64C241.7 64 256 78.3 256 96L256 128L384 128L384 96C384 78.3 398.3 64 416 64zM438 225.7C427.3 217.9 412.3 220.3 404.5 231L285.1 395.2L233 343.1C223.6 333.7 208.4 333.7 199.1 343.1C189.8 352.5 189.7 367.7 199.1 377L271.1 449C276.1 454 283 456.5 289.9 456C296.8 455.5 303.3 451.9 307.4 446.2L443.3 259.2C451.1 248.5 448.7 233.5 438 225.7z" />
          </svg>
        ),
        title: "Approvals",
        value: "ACBSP, BAC, CHEA",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-[32px] h-[32px] fill-[#c11f28] shrink-0">
            <path d="M320 216C368.6 216 408 176.6 408 128C408 79.4 368.6 40 320 40C271.4 40 232 79.4 232 128C232 176.6 271.4 216 320 216zM320 514.7L320 365.4C336.3 358.6 352.9 351.7 369.7 344.7C408.7 328.5 450.5 320.1 492.8 320.1L512 320.1L512 480.1L492.8 480.1C433.7 480.1 375.1 491.8 320.5 514.6L320 514.8zM320 296L294.9 285.5C248.1 266 197.9 256 147.2 256L112 256C85.5 256 64 277.5 64 304L64 496C64 522.5 85.5 544 112 544L147.2 544C197.9 544 248.1 554 294.9 573.5L307.7 578.8C315.6 582.1 324.4 582.1 332.3 578.8L345.1 573.5C391.9 554 442.1 544 492.8 544L528 544C554.5 544 576 522.5 576 496L576 304C576 277.5 554.5 256 528 256L492.8 256C442.1 256 391.9 266 345.1 285.5L320 296z" />
          </svg>
        ),
        title: "Specialisations",
        value: "20+ Specialisations",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-[32px] h-[32px] fill-[#c11f28] shrink-0">
            <path d="M80 259.8L289.2 345.9C299 349.9 309.4 352 320 352C330.6 352 341 349.9 350.8 345.9L593.2 246.1C602.2 242.4 608 233.7 608 224C608 214.3 602.2 205.6 593.2 201.9L350.8 102.1C341 98.1 330.6 96 320 96C309.4 96 299 98.1 289.2 102.1L46.8 201.9C37.8 205.6 32 214.3 32 224L32 520C32 533.3 42.7 544 56 544C69.3 544 80 533.3 80 520L80 259.8zM128 331.5L128 448C128 501 214 544 320 544C426 544 512 501 512 448L512 331.4L369.1 390.3C353.5 396.7 336.9 400 320 400C303.1 400 286.5 396.7 270.9 390.3L128 331.4z" />
          </svg>
        ),
        title: "Degree",
        value: "Doctorate",
      },
    ],

    // Approvals Section
    approvalsLayout: "ssbm",
    ssbmAccreditations: [
      { image: "/assets/all_universities_images/ssbm/acbsp-p.png", alt: "ACBSP", maxHeight: "54px" },
      { image: "/assets/all_universities_images/ssbm/chea-logo.png", alt: "CHEA", maxHeight: "40px" },
      { image: "/assets/all_universities_images/ssbm/bac.png", alt: "BAC", maxHeight: "48px" },
    ],
    ssbmRankings: [
      { image: "/assets/all_universities_images/ssbm/ceoworld.png", alt: "CEOWorld Magazine", maxHeight: "36px" },
      { image: "/assets/all_universities_images/ssbm/postg.png", alt: "Postgrad", maxHeight: "26px" },
      { image: "/assets/all_universities_images/ssbm/swiss.png", alt: "Study in Switzerland", maxHeight: "38px" },
    ],

    // Programmes Section
    programmesLayout: "ssbm",
    programmesTitle: "TOP ONLINE DBA",
    programmesHighlight: "SSBM DOCTORATE SPECIALIZATIONS",

    // Stats Section (Achievement Bar)
    statsLayout: "ssbm",

    // Benefits Section (Why Choose)
    whyChooseLayout: "ssbm",
    whyChooseTitle: "Global Doctor of",
    whyChooseSubtitle: "Business Administration with SSBM",
    whyChooseBgImage: "/assets/all_universities_images/ssbm/Global.webp",

    // About Section
    aboutLayout: "ssbm",
    aboutBackgroundImage: "/assets/all_universities_images/ssbm/About-pic.webp",

    // Degree Layout
    degreeLayout: "ssbm",
    degreeImage: "/assets/all_universities_images/ssbm/deree-ssbm.png",

    // Admission Section
    admissionProcessId: "how-to-apply",
    admissionTitle: "How to Apply for SSBM University Online Courses",
    admissionHeadingColor: "#193579",

    // Compare Section
    compareBannerBg: "#c11f28",
    compareSubtitle: "Compare SSBM University with Top World Renowned Universities",
  },

  // Courses list for the dropdown select in Admission Open forms
  courses: [
    { label: "Global and International Management", value: "Global and International Management" },
    { label: "Cybersecurity Management", value: "Cybersecurity Management" },
    { label: "Human Resources Management", value: "Human Resources Management" },
    { label: "Finance and Banking", value: "Finance and Banking" },
    { label: "Marketing", value: "Marketing" },
    { label: "Operations Management", value: "Operations Management" },
    { label: "Strategic Management", value: "Strategic Management" },
    { label: "Entrepreneurship", value: "Entrepreneurship" },
    { label: "IT Management", value: "IT Management" },
    { label: "Energy Management", value: "Energy Management" },
    { label: "Health Care Management", value: "Health Care Management" },
    { label: "Data Science", value: "Data Science" },
    { label: "Finance", value: "Finance" },
    { label: "International Business Leadership", value: "International Business Leadership" },
    { label: "Global Supply Chain Management", value: "Global Supply Chain Management" },
    { label: "Accounting", value: "Accounting" },
    { label: "AML Compliance", value: "AML Compliance" },
  ],

  // Approvals items
  approvals: [
    { title: "ACBSP", image: "/assets/all_universities_images/ssbm/acbsp-p.png" },
    { title: "CHEA", image: "/assets/all_universities_images/ssbm/chea-logo.png" },
    { title: "BAC", image: "/assets/all_universities_images/ssbm/bac.png" },
    { title: "CEOWorld Magazine", image: "/assets/all_universities_images/ssbm/ceoworld.png" },
    { title: "Postgrad", image: "/assets/all_universities_images/ssbm/postg.png" },
    { title: "Study in Switzerland", image: "/assets/all_universities_images/ssbm/swiss.png" },
  ],

  // 19 Top Online DBA Specializations
  programmes: [
    {
      title: "Global and International Management",
      description: "SSBM Online DBA program helps develop leadership skills to manage multinational teams.",
      image: "/assets/all_universities_images/ssbm/Global-and-international.jpg",
    },
    {
      title: "Cybersecurity Management",
      description: "Learn to oversee cybersecurity frameworks, digital risk, and governance models.",
      image: "/assets/all_universities_images/ssbm/Cybersecurity.jpg",
    },
    {
      title: "Human Resources Management",
      description: "Strengthen expertise in HR planning and talent management.",
      image: "/assets/all_universities_images/ssbm/HR.jpg",
    },
    {
      title: "Tax Management",
      description: "Gain practical understanding of corporate taxation and compliance systems.",
      image: "/assets/all_universities_images/ssbm/Tax-Management.png",
    },
    {
      title: "Finance and Banking",
      description: "Master financial analysis, banking operations, and risk-based decision making.",
      image: "/assets/all_universities_images/ssbm/Finance-and-Banking.png",
    },
    {
      title: "Marketing",
      description: "Explore digital branding, consumer behavior, and strategic marketing frameworks.",
      image: "/assets/all_universities_images/ssbm/Marketing.png",
    },
    {
      title: "Operations Management",
      description: "Learn workflow optimization and process improvement strategies.",
      image: "/assets/all_universities_images/ssbm/Operations-Management.png",
    },
    {
      title: "Strategic Management",
      description: "Develop long-term strategies and guide organizational transformation.",
      image: "/assets/all_universities_images/ssbm/Strategic-Management.png",
    },
    {
      title: "Entrepreneurship",
      description: "Build entrepreneurial vision and innovative thinking.",
      image: "/assets/all_universities_images/ssbm/Entrepreneurship.png",
    },
    {
      title: "IT Management",
      description: "Understand IT governance and digital transformation.",
      image: "/assets/all_universities_images/ssbm/IT-Management.png",
    },
    {
      title: "Energy Management",
      description: "Study global energy systems and sustainability frameworks.",
      image: "/assets/all_universities_images/ssbm/Energy-Management.png",
    },
    {
      title: "Health Care Management",
      description: "Gain knowledge of healthcare operations and leadership practices.",
      image: "/assets/all_universities_images/ssbm/Health-Care-Management.png",
    },
    {
      title: "Data Science",
      description: "Master predictive analytics, data modeling, and interpretation skills.",
      image: "/assets/all_universities_images/ssbm/Data-Science.png",
    },
    {
      title: "Machine Learning",
      description: "Develop deeper knowledge in automation techniques.",
      image: "/assets/all_universities_images/ssbm/Machine-Learning.png",
    },
    {
      title: "Finance",
      description: "Develop deep expertise in investment decision-making techniques.",
      image: "/assets/all_universities_images/ssbm/Finance.png",
    },
    {
      title: "International Business Leadership",
      description: "Learn cross-cultural leadership and global communication.",
      image: "/assets/all_universities_images/ssbm/International-Business-Leadership.png",
    },
    {
      title: "Global Supply Chain Management",
      description: "Understand end-to-end global supply chain strategy.",
      image: "/assets/all_universities_images/ssbm/Global-Supply-Chain-Management.png",
    },
    {
      title: "Accounting",
      description: "Learn financial reporting, auditing, and compliance frameworks.",
      image: "/assets/all_universities_images/ssbm/Accounting.png",
    },
    {
      title: "AML Compliance",
      description: "Study anti-money laundering regulations and risk management processes.",
      image: "/assets/all_universities_images/ssbm/AML-Compliance.png",
    },
  ],

  // Stats / Achievement Bar
  stats: [
    {
      icon: "users",
      value: "7700",
      label: "Alumni",
    },
    {
      icon: "globe",
      value: "160+",
      label: "Countries",
    },
    {
      icon: "trophy",
      value: "170+",
      label: "Renowned",
    },
    {
      icon: "star",
      value: "5 Star",
      label: "Online learning",
    },
  ],

  // Benefits / Why Choose 6 Badges
  whyChoose: [
    {
      title: "Swiss Quality Education",
      image: "/assets/all_universities_images/ssbm/quality.png",
    },
    {
      title: "Session with on-campus students/alumni",
      image: "/assets/all_universities_images/ssbm/graduated.png",
    },
    {
      title: "Peer-to-peer networking",
      image: "/assets/all_universities_images/ssbm/video-call.png",
    },
    {
      title: "PwC Directorship & Board Advisory Certificate",
      image: "/assets/all_universities_images/ssbm/certificate.png",
    },
    {
      title: "Fortune 500 Perspectives",
      image: "/assets/all_universities_images/ssbm/hrm.png",
    },
    {
      title: "Pitch to Real Investors",
      image: "/assets/all_universities_images/ssbm/stress.png",
    },
  ],

  // About Section
  about: {
    title: "ABOUT ONLINE SSBM",
    backgroundImage: "/assets/all_universities_images/ssbm/About-pic.webp",
    paragraphs: [
      "SSBM University, located in Switzerland, offer modern industry-accredited management courses. The institution helps students get a flexible higher education in online mode, which is specifically made for working professionals across the globe. Their digital learning curriculum offers interactive classes, real business case studies, international faculty access, and a properly structured research environment.",
      "Students looking to take admission in SSBM DBA can develop practical knowledge, apply research and leadership skills that match the global business standards. As a globally known university who are offering executive and doctoral education support learners through personalised academic guidance, dedicated mentorship, and international networking opportunities.",
    ],
    buttonText: "Request Call Back",
  },

  // Degree Section
  degreeInfo: {
    title1: "PWC DIRECTORSHIP & BOARD",
    title2: "ADVISORY CERTIFICATE",
    description:
      "The PwC Board Advisory certificate is a specialised global program that is made for a professional who aims to transform their role to board level. The student at SSBM DBA university will get both certificates after the completion of its online DBA course. With PwC India, this program cultivates strategic confidence through live sessions, real-world simulations, and expert-led masterclasses.",
    image: "/assets/all_universities_images/ssbm/deree-ssbm.png",
    buttonText: "Get Degree",
  },

  // Admission Steps
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
      cardBg: "#f8f0ff",
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
      question: "What is the Online SSBM DBA program?",
      answer:
        "It is a flexible, research-focused doctoral program designed for working professionals seeking advanced leadership and strategic business expertise.",
    },
    {
      question: "Is the SSBM doctorate globally recognized?",
      answer:
        "Yes, the SSBM doctorate is internationally recognized and follows high academic standards with strong industry relevance.",
    },
    {
      question: "Who can apply for SSBM DBA Admission?",
      answer:
        "Applicants typically need a postgraduate degree and relevant professional experience to qualify for SSBM DBA Admission.",
    },
    {
      question: "How is the SSBM University online learning experience structured?",
      answer:
        "SSBM University offers recorded lectures, live sessions, case studies, research supervision, and continuous academic support for online learners.",
    },
    {
      question: "Does the program include practical industry exposure?",
      answer:
        "Yes. The SSBM DBA includes real-world projects, board simulations, research work, and industry interactions to strengthen practical learning.",
    },
  ],


};
