"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Download, ChevronLeft, ChevronRight, Phone, Check } from "lucide-react";
import BrochureModal from "./modals/BrochureModal";
import ScholarshipModal from "./modals/ScholarshipModal";
import CompareModal from "./modals/CompareModal";
import LegalModal from "./modals/LegalModal";
import IndiaFlag from "./forms/IndiaFlag";
import LandingCompareBanner from "./LandingCompareBanner";
import LandingFooter from "./LandingFooter";

const ASSET_BASE = "/assets/all_universities_images/liverpool";

const COURSE_LIST = [
  "MBA in Business Analytics",
  "MBA in Finance",
  "MBA in Marketing",
  "MBA in Leadership",
  "MBA in Human Resources Management",
  "MBA in Operation and Supply Chain Management",
];

const SPECIALISATIONS = [
  {
    id: "business-analytics",
    title: "MBA in Business Analytics",
    image: `${ASSET_BASE}/Business-Analytics.webp`,
    desc: "Learners develop skills in data analytics, Python, SQL, data mining, and dashboarding to make data-driven business decisions through the MBA Liverpool online specialisation.",
  },
  {
    id: "finance",
    title: "MBA in Finance",
    image: `${ASSET_BASE}/Finance.webp`,
    desc: "Professionals gain expertise in financial modelling, forecasting, corporate finance, capital budgeting techniques, and financial risk analysis through the Liverpool MBA specialisation.",
  },
  {
    id: "marketing",
    title: "MBA in Marketing",
    image: `${ASSET_BASE}/Marketing.webp`,
    desc: "Learners build expertise in digital marketing channels, branding, communication, SEO, social media marketing, and marketing analytics through the MBA in Liverpool specialisation.",
  },
  {
    id: "leadership",
    title: "MBA in Leadership",
    image: `${ASSET_BASE}/Leadership.webp`,
    desc: "Professionals develop leadership capabilities by learning to manage volatility, uncertainty, complexity, global teams, and future leadership challenges.",
  },
  {
    id: "hrm",
    title: "MBA in Human Resource Management",
    image: `${ASSET_BASE}/HRM.webp`,
    desc: "Learners gain knowledge of strategic HRM, HR operations, analytics, data visualisation, and storytelling to manage modern workforce challenges.",
  },
  {
    id: "operations",
    title: "MBA in Operations and Supply Chain Management",
    image: `${ASSET_BASE}/ops-m.webp`,
    desc: "Professionals develop skills in distribution channels, supply chain analytics, inventory management, fleet analytics, and capacity planning for operational excellence.",
  },
];

const FAQS = [
  {
    q: "Q1. What are the University of Liverpool MBA fees for the Online MBA programme?",
    a: "The programme fee details can be obtained by downloading the brochure. The online MBA Liverpool programme offers a globally recognised MBA learning experience with flexible payment options.",
  },
  {
    q: "Q2. Does the University of Liverpool MBA course include mandatory campus immersion?",
    a: "The programme offers an international immersion experience at Liverpool Business School, where learners can interact and network with peers and experts. The IIM Udaipur campus immersion is an optional component available as part of the learning journey.",
  },
  {
    q: "Q3. Why is the MBA Liverpool John Moores University programme research phase relevant?",
    a: "The 18-month MBA journey includes the IIM Udaipur phase, MBA specialisations, Applied Business Research, and a Strategic Business Consultancy Project designed to develop practical management and leadership skills.",
  },
  {
    q: "Q4. What is the University of Liverpool MBA ranking and recognition of the MBA with IIM Udaipur certification?",
    a: "Liverpool Business School, a part of Liverpool John Moores University (LJMU), is recognised for academic excellence. The MBA programme offers a WES-recognised degree from Liverpool Business School along with an Executive Programme in Business Management & AI Leadership certification from IIM Udaipur, supported by AACSB membership.",
  },
  {
    q: "Q5. What are the University of Liverpool MBA fees for indian students?",
    a: "Fee details for Indian learners can be discussed with the admissions team. The programme provides a value-driven MBA experience with global credentials, practical learning, and access to a global alumni network.",
  },
  {
    q: "Q6. What are the learning outcomes that make professionals choose an online MBA Liverpool programme?",
    a: "The programme offers personalised learning, live sessions, HBR case studies, simulations, hands-on projects, specialisations, and access to a network of 3,000+ alumni.",
  },
];

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Jammu and Kashmir",
  "Puducherry", "Lakshadweep", "Ladakh", "Chandigarh", "Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli and Daman and Diu"
];

export default function LiverpoolLandingView({ data = {} }) {
  const brand = data.brand || {};

  // Interactive Modal States
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, type: "disclaimer" });
  const [modalTitle, setModalTitle] = useState("Download Brochure");
  const [selectedCourse, setSelectedCourse] = useState(COURSE_LIST[0]);

  // Navbar Mobile Dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Certificate Slider State
  const [certIndex, setCertIndex] = useState(0);
  const certImages = [
    `${ASSET_BASE}/IIMU Certificatee2.webp`,
    `${ASSET_BASE}/IIMU Certificatee.webp`,
  ];

  // FAQ Accordion State (first open by default)
  const [activeFaq, setActiveFaq] = useState(0);

  // Lead Form State
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    state: "",
    disclaimer: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Auto scroll trigger for coupon code
  useEffect(() => {
    let triggered = false;
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0 && (window.scrollY / scrollHeight) >= 0.45 && !triggered) {
        triggered = true;
        triggerConfetti();
        setIsScholarshipOpen(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 180,
        spread: 100,
        startVelocity: 45,
        origin: { y: 0.6 },
        colors: ["#FFD700", "#FFC107", "#FFB300", "#2ecc71"],
        zIndex: 99999,
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleOpenBrochure = (course = null, title = "Download Brochure") => {
    if (course) setSelectedCourse(course);
    setModalTitle(title);
    setIsBrochureOpen(true);
  };

  const handleOpenApply = (course = null) => {
    if (course) setSelectedCourse(course);
    setModalTitle("Apply Now");
    setIsBrochureOpen(true);
  };

  const handleOpenLegal = (type) => {
    setLegalModalState({ isOpen: true, type });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.fullName || !formValues.email || !formValues.phone || !formValues.course || !formValues.state) {
      alert("Please fill in all required fields.");
      return;
    }
    if (!formValues.disclaimer) {
      alert("Please check the consent disclaimer to proceed.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formValues.fullName,
        email: formValues.email,
        phone: formValues.phone,
        course: formValues.course,
        state: formValues.state,
        university: "Liverpool Business School",
        source: "Liverpool LP",
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormSuccess(true);
        triggerConfetti();
        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.href = "/thank-you";
          }
        }, 1200);
      } else {
        // Fallback thank you
        setFormSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setFormSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="landing-page-liverpool min-h-screen bg-white text-[#111111] font-['Montserrat',sans-serif] selection:bg-[#00408d] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          FONTS & EXTERNAL STYLES
      ───────────────────────────────────────────────────────────── */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap"
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

        .landing-page-liverpool {
          font-family: 'Montserrat', sans-serif !important;
        }
        .landing-page-liverpool h1.anton-title {
          font-family: 'Anton', sans-serif !important;
          letter-spacing: 0.5px;
        }
        @media only screen and (max-width: 768px) {
          .call_fix_image {
            bottom: 135px !important;
          }
          .coupon-btn {
            bottom: 70px !important;
          }
        }

        /* Hero Section 1:1 Match with distanceeducationschool.com/liverpool/ */
        #hero-section {
          background-image: url("/assets/all_universities_images/liverpool/liverpool_desktop_new_bg.webp");
          background-size: cover;
          background-repeat: no-repeat;
          padding: 30px 0px;
          margin: 55px auto auto auto;
          background-position: center -90px;
        }

        #hero-section .container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 15px;
        }

        #hero-section .banner {
          display: grid;
          grid-template-columns: 4fr 2fr;
          gap: 20px;
          margin: 0 auto;
          align-items: center;
          padding: 10px 0px;
        }

        #hero-section .banner-info {
          color: #000;
          max-width: 500px;
        }

        #hero-section .un_image_container {
          margin-bottom: 10px;
        }

        #hero-section .un_image_container img {
          width: 300px;
          height: auto;
          object-fit: contain;
          margin-bottom: 10px;
        }

        #hero-section .t1 {
          font-size: 14px !important;
          color: #000;
          font-weight: 600;
          padding: 0;
          margin: 0 0 10px 0;
          line-height: 1.3;
        }

        #hero-section .banner-info h1 {
          font-size: 66px !important;
          font-family: 'Anton', sans-serif !important;
          font-weight: 500;
          line-height: 1 !important;
          margin: 10px 0px;
          color: #00408d;
          letter-spacing: 0.5px;
        }

        #hero-section .banner-info h2 {
          margin: 10px 0px 20px;
          line-height: 1.2;
          color: #000;
          font-size: 14px;
          width: 65%;
          font-weight: 400;
        }

        #hero-section .underline_text {
          text-decoration: underline;
        }

        #hero-section .banner_lists {
          padding-bottom: 20px;
        }

        #hero-section .banner_lists .banner_item {
          display: flex !important;
          align-items: center !important;
          list-style: none !important;
          margin-bottom: 6px;
        }

        #hero-section .banner_lists .banner_item svg {
          color: #2ad4c3;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        #hero-section .banner_lists p {
          margin: 0 0 0 8px;
          font-size: 13px !important;
          font-weight: 600;
          font-style: italic;
          color: #111;
        }

        #hero-section .downloadBrochureBtn {
          background: #00408d;
          font-size: 14px;
          padding: 10px 20px;
          border-radius: 5px;
          color: #fff;
          border: none;
          cursor: pointer;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s;
        }

        #hero-section .downloadBrochureBtn:hover {
          background: #00306c;
        }

        #hero-section .custom_img_section {
          display: none;
        }

        #hero-section .banner-form {
          display: flex;
          justify-content: flex-end;
        }

        #hero-section #form {
          width: 100%;
          max-width: 375px;
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          border-radius: 8px;
          border: 1px solid #f1f5f9;
        }

        #hero-section .frm-heading h2 {
          color: #00408d;
          font-size: 22px;
          font-weight: bold;
          margin: 0;
          text-align: center;
          line-height: 1.2;
        }

        #hero-section .frm-heading p {
          color: #000;
          font-size: 13px;
          text-align: center;
          margin: 4px 0 0 0;
        }

        #hero-section .call_fix_text_section {
          padding-bottom: 12px;
          display: flex;
          justify-content: center;
        }

        #hero-section .call_fix_text {
          background: #00408d;
          padding: 4px 20px;
          border-radius: 20px;
          color: #fff !important;
          font-weight: 500;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          text-decoration: none !important;
          margin-top: 7px;
          margin-bottom: -7px;
          width: fit-content;
        }

        #hero-section .form-control {
          display: block;
          width: 100%;
          padding: 0.45rem 0.75rem;
          font-size: 12px !important;
          font-weight: 400;
          line-height: 1.5;
          color: #495057;
          margin: 8px 0px !important;
          border: 1px solid #ccc !important;
          background: #fff !important;
          border-radius: 3px;
          outline: none;
          box-sizing: border-box;
        }

        #hero-section .form-control:focus {
          border-color: #00408d !important;
        }

        #hero-section .phone-control {
          display: flex;
          align-items: center;
          width: 100%;
          margin: 8px 0px;
          border: 1px solid #ccc;
          border-radius: 3px;
          background: #fff;
          box-sizing: border-box;
          padding: 0.15rem 0.5rem;
        }

        #hero-section .phone-control:focus-within {
          border-color: #00408d;
        }

        #hero-section .sub-btn {
          background-color: #00408d;
          color: #fff;
          width: 100%;
          border: none;
          padding: 10px;
          font-weight: bold;
          font-size: 14px;
          border-radius: 4px;
          margin-top: 10px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        #hero-section .sub-btn:hover {
          background-color: #00306c;
        }

        /* Mobile specific styles (<= 768px) */
        @media only screen and (max-width: 768px) {
          #hero-section {
            background-image: unset !important;
            background-color: #F0F4FD !important;
            background-repeat: no-repeat !important;
            background-size: cover !important;
            padding: 20px 0px !important;
            margin-top: 55px !important;
            height: auto !important;
          }

          #hero-section .banner {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
            padding: 0px !important;
          }

          #hero-section .banner-info {
            max-width: 100% !important;
            text-align: center !important;
            padding: 0 15px !important;
          }

          #hero-section .un_image_container img {
            display: none !important;
          }

          #hero-section .t1 {
            text-align: center !important;
            padding: 0 20px !important;
            margin-bottom: 8px !important;
          }

          #hero-section .banner-info h1 {
            font-size: 60px !important;
            margin: 10px 0px !important;
            text-align: center !important;
          }

          #hero-section .banner-info h2 {
            width: 100% !important;
            padding: 0px 20px !important;
            text-align: center !important;
            margin: 10px 0px !important;
          }

          #hero-section .banner_lists {
            text-align: left !important;
            display: inline-block !important;
            padding-top: 10px !important;
            padding-bottom: 10px !important;
          }

          #hero-section .banner_lists .banner_item {
            display: flex !important;
            align-items: center !important;
            justify-content: flex-start !important;
            list-style: none !important;
            margin-bottom: 6px !important;
          }

          #hero-section .downloadBrochureBtn {
            display: none !important;
          }

          #hero-section .custom_img_section {
            display: block !important;
            width: 100% !important;
            margin-top: -15px !important;
            text-align: center !important;
            padding: 0 10px !important;
          }

          #hero-section .custom_img_section img {
            width: 100% !important;
            max-width: 320px !important;
            margin: 0 auto !important;
          }

          #hero-section .banner-form {
            margin-top: -20px !important;
            padding: 0px 15px !important;
            justify-content: center !important;
          }

          #hero-section #form {
            max-width: 100% !important;
          }
        }

        /* Why Choose Section Responsive Background */
        @media only screen and (max-width: 1023px) {
          .landing-page-liverpool #why-choose {
            background-image: none !important;
            background-color: #203a7a !important;
            background: linear-gradient(135deg, #2d4786 0%, #152d68 100%) !important;
          }
        }
        @media only screen and (min-width: 1024px) {
          .landing-page-liverpool #why-choose {
            background-image: url(/assets/all_universities_images/liverpool/MID.webp) !important;
            background-position: center 30% !important;
            background-size: cover !important;
            background-repeat: no-repeat !important;
          }
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────────
          1. NAVBAR (1:1 with reference)
      ───────────────────────────────────────────────────────────── */}
      <header className="navbar fixed top-0 left-0 w-full z-[1049] bg-white shadow-[0px_5px_20px_rgba(0,0,0,0.14)]">
        <div className="top-navbar max-w-[1150px] mx-auto h-[55px] px-4 flex items-center justify-between">
          <div className="logo flex items-center">
            <a
              href="#hero-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("hero-section");
              }}
              className="des_logo flex items-end cursor-pointer"
            >
              <img
                src={`${ASSET_BASE}/new_sode_tm_logo.png`}
                alt="SODE Logo"
                className="h-[40px] sm:h-[45px] w-auto object-contain"
                loading="eager"
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <nav className="header_menu hidden md:flex items-center">
            <ul className="header_menu_list flex list-none gap-8 m-0 p-0 items-center">
              <li>
                <a
                  href="#courses_offered"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("courses_offered");
                  }}
                  className="font-semibold text-[15px] text-[#1e293b] hover:text-[#00408d] transition-colors"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="#certification"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("certification");
                  }}
                  className="font-semibold text-[15px] text-[#1e293b] hover:text-[#00408d] transition-colors"
                >
                  Approvals
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("about");
                  }}
                  className="font-semibold text-[15px] text-[#1e293b] hover:text-[#00408d] transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#faqs"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("faqs");
                  }}
                  className="font-semibold text-[15px] text-[#1e293b] hover:text-[#00408d] transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-toggle md:hidden p-2 text-[#111111] focus:outline-none cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="hamburger-icon flex flex-col justify-between w-6 h-4">
              <span className={`h-0.5 w-full bg-[#111111] transition-transform ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 w-full bg-[#111111] transition-opacity ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-full bg-[#111111] transition-transform ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {isMobileMenuOpen && (
          <div className="mobile-dropdown md:hidden bg-white border-t border-slate-200 px-5 py-4 shadow-lg">
            <ul className="mobile-menu-list flex flex-col gap-3.5 list-none m-0 p-0 text-left">
              <li>
                <a
                  href="#courses_offered"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("courses_offered");
                  }}
                  className="block font-semibold text-[15px] text-[#1e293b] hover:text-[#00408d]"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="#certification"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("certification");
                  }}
                  className="block font-semibold text-[15px] text-[#1e293b] hover:text-[#00408d]"
                >
                  Approvals
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("about");
                  }}
                  className="block font-semibold text-[15px] text-[#1e293b] hover:text-[#00408d]"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#faqs"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("faqs");
                  }}
                  className="block font-semibold text-[15px] text-[#1e293b] hover:text-[#00408d]"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION (#hero-section)
      ───────────────────────────────────────────────────────────── */}
      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION (#hero-section)
      ───────────────────────────────────────────────────────────── */}
      <section id="hero-section" className="select-none">
        <div className="container">
          <div className="banner">
            {/* Left Content Column */}
            <div className="banner-info">
              {/* Partner Logo (Desktop only) */}
              <div className="un_image_container">
                <a href="#hero-section">
                  <img
                    src={`${ASSET_BASE}/logo_for_liverpool_upgrade.png`}
                    alt="Liverpool Business School - IIM Udaipur - upGrad"
                  />
                </a>
              </div>

              <p className="t1">
                Where Global Business Education Meets Leadership Excellence
              </p>

              <h1>Online MBA</h1>

              <h2>
                By<span className="underline_text"> <strong>Liverpool Business School</strong></span> with{" "}
                <span className="underline_text"><strong>IIM Udaipur</strong></span> via{" "}
                <span className="underline_text"><strong>upGrad.</strong></span>
              </h2>

              {/* 4 Bullet Points */}
              <div className="banner_lists">
                <div className="banner_item">
                  <svg className="w-[18px] h-[18px] text-[#2ad4c3] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
                  </svg>
                  <p>Three Decades of Excellence</p>
                </div>
                <div className="banner_item">
                  <svg className="w-[18px] h-[18px] text-[#2ad4c3] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <p>LBS–IIM U Credential Pathway</p>
                </div>
                <div className="banner_item">
                  <svg className="w-[18px] h-[18px] text-[#2ad4c3] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  </svg>
                  <p>Globally Recognised</p>
                </div>
                <div className="banner_item">
                  <svg className="w-[18px] h-[18px] text-[#2ad4c3] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9.5" />
                    <polyline points="12 6.5 12 12 16 12" />
                  </svg>
                  <p>18 Months</p>
                </div>
              </div>

              {/* Download Brochure Button (Desktop only) */}
              <div>
                <button
                  type="button"
                  onClick={() => handleOpenBrochure(null, "Download Brochure")}
                  className="downloadBrochureBtn"
                >
                  <span>Download Brochure</span>
                  <svg className="w-[15px] h-[15px] fill-white shrink-0 ml-0.5" viewBox="0 0 24 24">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Student Image */}
            <div className="custom_img_section">
              <img
                src={`${ASSET_BASE}/liverpool_mobile_new_img.png`}
                alt="Liverpool Online MBA Student"
              />
            </div>

            {/* Right Form Card Column */}
            <div className="banner-form">
              <div id="form">
                <div className="frm-heading">
                  <h2>Admission Open</h2>
                  <p>Academic Experts will assist you!</p>
                </div>

                <div className="call_fix_text_section">
                  <a href="tel:07065777755" className="call_fix_text">
                    <Phone className="w-3.5 h-3.5 fill-white" />
                    <span>+91 7065 7777 55</span>
                  </a>
                </div>

                {formSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-lg text-center font-semibold text-[14px]">
                    ✓ Thank you! Our academic experts will contact you shortly.
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <input
                      type="text"
                      name="fullName"
                      value={formValues.fullName}
                      onChange={handleFormChange}
                      placeholder="Enter Your Name"
                      required
                      className="form-control"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleFormChange}
                      placeholder="Enter Your Email"
                      required
                      className="form-control"
                    />

                    <div className="phone-control">
                      <div className="flex items-center gap-1 pr-2 border-r border-[#ccc] shrink-0 select-none">
                        <IndiaFlag className="w-[18px] h-[12px] shadow-xs" />
                        <span className="text-[12px] font-semibold text-slate-700">+91</span>
                        <span className="text-[8px] text-slate-400">▼</span>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleFormChange}
                        placeholder="Enter Mobile Number"
                        maxLength={10}
                        required
                        className="w-full pl-2 py-1 text-[12px] border-none outline-none bg-transparent text-[#495057]"
                      />
                    </div>

                    <select
                      name="course"
                      value={formValues.course}
                      onChange={handleFormChange}
                      required
                      className="form-control cursor-pointer"
                    >
                      <option value="" disabled>Select Your Course</option>
                      {COURSE_LIST.map((c, i) => (
                        <option key={i} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>

                    <select
                      name="state"
                      value={formValues.state}
                      onChange={handleFormChange}
                      required
                      className="form-control cursor-pointer"
                    >
                      <option value="" disabled>Select Your State</option>
                      {STATES.map((s, i) => (
                        <option key={i} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    <div id="checkboxWrapper" className="flex items-start gap-2 pt-1 text-[10px] text-[#333] leading-tight">
                      <input
                        type="checkbox"
                        id="hero-disclaimer"
                        name="disclaimer"
                        checked={formValues.disclaimer}
                        onChange={handleFormChange}
                        className="mt-0.5 shrink-0"
                      />
                      <label htmlFor="hero-disclaimer" className="cursor-pointer">
                        I consent to receive university updates via email and mobile number.{" "}
                        <span
                          onClick={() => handleOpenLegal("disclaimer")}
                          className="text-[#011bfe] underline cursor-pointer"
                        >
                          Disclaimer
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="sub-btn"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. KEY HIGHLIGHTS / STATS STRIP (#online-mba-details)
      ───────────────────────────────────────────────────────────── */}
      <div id="online-mba-details" className="achievement bg-[#F5F5F5] py-6 select-none border-y border-slate-200">
        <div className="container max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="ach grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {/* Card 1: Eligibility */}
            <div className="ac1 p-2 sm:p-3">
              <svg
                className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] mx-auto text-[#2ad4c3] mb-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <h3 className="text-[17px] sm:text-[18.5px] font-bold text-[#50555e] mb-1 m-0 leading-tight">
                Eligibility
              </h3>
              <p className="text-[12.5px] sm:text-[13.5px] text-[#71747c] leading-snug m-0 max-w-[170px] mx-auto">
                Bachelor’s degree +2 years of experience
              </p>
            </div>

            {/* Card 2: Duration */}
            <div className="ac1 p-2 sm:p-3">
              <svg
                className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] mx-auto text-[#2ad4c3] mb-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9.5" />
                <polyline points="12 6.5 12 12 16 12" />
              </svg>
              <h3 className="text-[17px] sm:text-[18.5px] font-bold text-[#50555e] mb-1 m-0 leading-tight">
                Duration:
              </h3>
              <p className="text-[12.5px] sm:text-[13.5px] text-[#71747c] leading-snug m-0">
                18 months
              </p>
            </div>

            {/* Card 3: Faculty */}
            <div className="ac1 p-2 sm:p-3">
              <svg
                className="w-[30px] h-[28px] sm:w-[34px] sm:h-[32px] mx-auto text-[#2ad4c3] mb-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
              </svg>
              <h3 className="text-[17px] sm:text-[18.5px] font-bold text-[#50555e] mb-1 m-0 leading-tight">
                Faculty:
              </h3>
              <p className="text-[12.5px] sm:text-[13.5px] text-[#71747c] leading-snug m-0">
                Leading industry experts
              </p>
            </div>

            {/* Card 4: Level */}
            <div className="ac1 p-2 sm:p-3">
              <svg
                className="w-[26px] h-[28px] sm:w-[30px] sm:h-[32px] mx-auto text-[#2ad4c3] mb-2"
                viewBox="0 0 448 512"
                fill="currentColor"
              >
                <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16z" />
              </svg>
              <h3 className="text-[17px] sm:text-[18.5px] font-bold text-[#50555e] mb-1 m-0 leading-tight">
                Level
              </h3>
              <p className="text-[12.5px] sm:text-[13.5px] text-[#71747c] leading-snug m-0">
                Postgraduate Degree
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. OVERVIEW SECTION (#overview)
      ───────────────────────────────────────────────────────────── */}
      <section id="overview" className="py-12 sm:py-16 bg-white text-center select-none scroll-mt-20">
        <div className="container max-w-[1050px] mx-auto px-4 sm:px-6">
          <div className="info">
            <h2 className="text-[24px] sm:text-[30px] lg:text-[32px] font-bold text-[#111111] leading-tight m-0">
              About <span className="text-[#2ad4c3]">Online MBA From Liverpool Business School</span>
            </h2>

            <div className="mt-5 space-y-4 text-[13.5px] sm:text-[14.5px] text-[#444444] leading-relaxed max-w-4xl mx-auto">
              <p className="m-0">
                The Liverpool Online MBA programme is an 18-month MBA journey designed to develop strategic thinking, leadership capabilities, and practical business skills. The programme combines the academic expertise of Liverpool Business School with the Executive Programme in Business Management & AI Leadership certification from IIM Udaipur.
              </p>
              <p className="m-0">
                MBA in Liverpool is a distinctive and intellectually challenging course designed for professionals seeking career growth. This Liverpool online MBA offers a personalised, research-focused learning experience with live sessions, industry-led insights, HBR case studies, simulations, and hands-on projects.
              </p>
              <p className="m-0">
                Learners can customise their curriculum through specialisations in this MBA Liverpool University programme, which helps professionals enhance their business expertise and leadership potential with a global alumni network.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
              <button
                type="button"
                onClick={() => handleOpenBrochure(null, "Get Curriculum")}
                className="downloadBrochureBtn inline-flex items-center gap-2 px-6 py-2.5 rounded-[5px] bg-[#2ad4c3] hover:bg-[#25beaf] text-white font-bold text-[14.5px] border-none cursor-pointer transition-all shadow-md active:scale-95"
              >
                <span>Get Curriculum</span>
                <Download className="w-4 h-4 text-white stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("enrollment-steps")}
                className="enquireNowBtn inline-flex items-center gap-2 px-6 py-2.5 rounded-[5px] bg-black hover:bg-neutral-800 text-white font-bold text-[14.5px] border-none cursor-pointer transition-all shadow-md active:scale-95"
              >
                <span>Know More</span>
                <span className="text-[12px]">▼</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. MBA PROGRAM JOURNEY (#enrollment-steps)
      ───────────────────────────────────────────────────────────── */}
      <section id="enrollment-steps" className="pathway-section py-10 sm:py-16 max-w-[1300px] mx-auto px-4 sm:px-6 text-center select-none scroll-mt-20">
        <div className="pathway-header mb-8 sm:mb-12">
          <h1 className="text-[28px] sm:text-[38px] font-extrabold text-[#17357a] m-0 leading-tight">
            MBA Program Journey
          </h1>
          <p className="text-[16px] sm:text-[20px] font-medium text-[#444444] mt-2 m-0">
            LBS MBA Pathway + IIM-U
          </p>
        </div>

        <div className="pathway-container flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-0">
          {/* Step 01 */}
          <div className="pathway-card relative flex-1 w-full max-w-[340px] lg:max-w-none bg-white border border-black rounded-[12px] p-6 pt-9 text-left shadow-sm min-h-[360px] flex flex-col justify-between">
            <span className="pathway-step-label absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white px-3 font-extrabold text-[20px] sm:text-[22px] text-[#291873] whitespace-nowrap">
              Step 01
            </span>
            <div className="pathway-inner">
              <div className="h-[45px] flex items-center mb-4">
                <img
                  src={`${ASSET_BASE}/IIMU icon.webp`}
                  alt="IIM Udaipur Icon"
                  className="max-h-[42px] max-w-[120px] object-contain"
                />
              </div>
              <h3 className="pathway-title text-[15px] sm:text-[16px] font-extrabold text-[#111111] leading-snug mb-1 m-0">
                Executive Programme in Business Management & AI Leadership
              </h3>
              <p className="pathway_duration text-[13px] text-slate-500 font-semibold mb-2">
                (11 Months)
              </p>
              <p className="pathway-text text-[12px] text-[#444444] leading-relaxed m-0">
                In the IIM-Udaipur phase of 11 months, learners build expertise in leadership, business strategy, finance, marketing, operations, and AI-driven decision-making through an industry-focused curriculum, real-world applications, and expert-led learning.
              </p>
            </div>
          </div>

          {/* Dots separator 1 */}
          <div className="pathway-arrow-box hidden lg:flex items-center justify-center px-1 text-slate-400 font-bold tracking-widest select-none">
            ······
          </div>

          {/* Step 02 */}
          <div className="pathway-card relative flex-1 w-full max-w-[340px] lg:max-w-none bg-white border border-black rounded-[12px] p-6 pt-9 text-left shadow-sm min-h-[360px] flex flex-col justify-between">
            <span className="pathway-step-label absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white px-3 font-extrabold text-[20px] sm:text-[22px] text-[#ff5200] whitespace-nowrap">
              Step 02
            </span>
            <div className="pathway-inner">
              <div className="h-[45px] flex items-center mb-4">
                <img
                  src={`${ASSET_BASE}/lbs-logo-696b29d4429b8.webp`}
                  alt="Liverpool Business School"
                  className="max-h-[38px] max-w-[120px] object-contain"
                />
              </div>
              <h3 className="pathway-title text-[15px] sm:text-[16px] font-extrabold text-[#111111] leading-snug mb-1 m-0">
                MBA Specialisations
              </h3>
              <p className="pathway_duration text-[13px] text-slate-500 font-semibold mb-2">
                (2 Months)
              </p>
              <p className="pathway-text text-[12px] text-[#444444] leading-relaxed m-0">
                During the 2-month LBS Online MBA phase, learners choose one specialisation and gain advanced, hands-on expertise through focused courses and practical tools. The MBA Liverpool Online specialisation phase helps learners develop domain skills, analytics capabilities, and real-world industry applications.
              </p>
            </div>
          </div>

          {/* Dots separator 2 */}
          <div className="pathway-arrow-box hidden lg:flex items-center justify-center px-1 text-slate-400 font-bold tracking-widest select-none">
            ······
          </div>

          {/* Step 03 */}
          <div className="pathway-card relative flex-1 w-full max-w-[340px] lg:max-w-none bg-white border border-black rounded-[12px] p-6 pt-9 text-left shadow-sm min-h-[360px] flex flex-col justify-between">
            <span className="pathway-step-label absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white px-3 font-extrabold text-[20px] sm:text-[22px] text-[#126090] whitespace-nowrap">
              Step 03
            </span>
            <div className="pathway-inner">
              <div className="h-[45px] flex items-center mb-4">
                <img
                  src={`${ASSET_BASE}/lbs-logo-696b29d4429b8.webp`}
                  alt="Liverpool Business School"
                  className="max-h-[38px] max-w-[120px] object-contain"
                />
              </div>
              <h3 className="pathway-title text-[15px] sm:text-[16px] font-extrabold text-[#111111] leading-snug mb-1 m-0">
                Applied Business Research
              </h3>
              <p className="pathway_duration text-[13px] text-slate-500 font-semibold mb-2">
                (1 Month)
              </p>
              <p className="pathway-text text-[12px] text-[#444444] leading-relaxed m-0">
                In the 1-month LBS MBA learning phase in Applied Research, students master research methodologies, explore diverse approaches, manage projects, and enhance thesis report writing through the Liverpool online MBA learning experience.
              </p>
            </div>
          </div>

          {/* Dots separator 3 */}
          <div className="pathway-arrow-box hidden lg:flex items-center justify-center px-1 text-slate-400 font-bold tracking-widest select-none">
            ······
          </div>

          {/* Step 04 */}
          <div className="pathway-card relative flex-1 w-full max-w-[340px] lg:max-w-none bg-white border border-black rounded-[12px] p-6 pt-9 text-left shadow-sm min-h-[360px] flex flex-col justify-between">
            <span className="pathway-step-label absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white px-3 font-extrabold text-[20px] sm:text-[22px] text-[#ffc706] whitespace-nowrap">
              Step 04
            </span>
            <div className="pathway-inner">
              <div className="h-[45px] flex items-center mb-4">
                <img
                  src={`${ASSET_BASE}/lbs-logo-696b29d4429b8.webp`}
                  alt="Liverpool Business School"
                  className="max-h-[38px] max-w-[120px] object-contain"
                />
              </div>
              <h3 className="pathway-title text-[15px] sm:text-[16px] font-extrabold text-[#111111] leading-snug mb-1 m-0">
                Strategic Business Consultancy Project
              </h3>
              <p className="pathway_duration text-[13px] text-slate-500 font-semibold mb-2">
                (3 Months)
              </p>
              <p className="pathway-text text-[12px] text-[#444444] leading-relaxed m-0">
                In the 3-month MBA in Liverpool University phase, the Strategic Business Consultancy Project, Professionals apply research insights to consultancy projects, solving industry-specific challenges in BFSI, FMCG, IT, automotive, and e-commerce.
              </p>
            </div>
          </div>
        </div>

        <div className="pathway-footer mt-10">
          <button
            type="button"
            onClick={() => handleOpenApply(null)}
            className="pathway-btn enquireNowBtn inline-flex items-center gap-2 px-8 py-3.5 rounded-[6px] bg-[#00e5d1] hover:bg-[#00c8b6] text-[#16317a] font-extrabold text-[15px] sm:text-[16px] border-none cursor-pointer transition-all shadow-md active:scale-95"
          >
            <span>Get 1:1 Counseling</span>
            <span>&rarr;</span>
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. DOUBLE CERTIFICATION EDGE (#view-sample-degree)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="view-sample-degree"
        className="mba-journey-cert-wrapper py-8 sm:py-10 md:py-12 bg-[#071d41] text-white select-none scroll-mt-20 overflow-hidden"
      >
        <div className="mba-journey-cert-container max-w-[1140px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Certificate Slider Left */}
          <div className="mba-journey-cert-left lg:col-span-6 flex items-center justify-center">
            <div className="relative flex items-center justify-center w-full max-w-[480px]">
              {/* Prev Button (Clean Cyan Chevron) */}
              <button
                type="button"
                onClick={() => setCertIndex((prev) => (prev === 0 ? certImages.length - 1 : prev - 1))}
                className="p-1 sm:p-2 bg-transparent border-none text-[#00dfca] hover:text-[#2ad4c3] hover:scale-110 active:scale-95 cursor-pointer transition-all shrink-0 z-10"
                aria-label="Previous Certificate"
              >
                <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
              </button>

              {/* Certificate Image */}
              <div className="flex items-center justify-center min-h-[290px] sm:min-h-[330px] px-2 sm:px-4">
                <img
                  src={certImages[certIndex]}
                  alt={`Certificate ${certIndex + 1}`}
                  className="max-h-[290px] sm:max-h-[330px] w-auto max-w-[75vw] sm:max-w-[380px] object-contain shadow-2xl rounded-[3px] bg-white transition-opacity duration-300"
                />
              </div>

              {/* Next Button (Clean Cyan Chevron) */}
              <button
                type="button"
                onClick={() => setCertIndex((prev) => (prev === certImages.length - 1 ? 0 : prev + 1))}
                className="p-1 sm:p-2 bg-transparent border-none text-[#00dfca] hover:text-[#2ad4c3] hover:scale-110 active:scale-95 cursor-pointer transition-all shrink-0 z-10"
                aria-label="Next Certificate"
              >
                <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Certificate Content Right */}
          <div className="mba-journey-cert-right lg:col-span-6 text-center lg:text-left">
            <h2 className="mba-journey-cert-heading text-[24px] sm:text-[28px] lg:text-[30px] font-bold text-[#00dfca] m-0 leading-tight">
              LBS MBA Pathway + IIM Udaipur
            </h2>
            <h3 className="text-[18px] sm:text-[20px] font-bold text-white mt-1.5 mb-3">
              Double Certification Edge
            </h3>

            <div className="mba-journey-cert-body text-[13px] sm:text-[14px] text-slate-200 leading-relaxed mb-5">
              <p className="m-0">
                Professionals and learners can earn an Executive Programme in Business Management & AI Leadership certification from IIM Udaipur while developing advanced business strategies, AI leadership skills, and management capabilities required for future leadership roles. This is complemented by the Liverpool Business School MBA, a WES-recognised qualification from Liverpool John Moores University with AACSB membership. Together, these credentials offer a powerful learning experience with double certification, alumni status, and practical career-focused learning opportunities through the Liverpool online MBA journey.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenApply(null)}
              className="mba-journey-cert-action-btn enquireNowBtn inline-flex items-center gap-2 px-6 py-2.5 rounded-[4px] bg-[#00dfca] hover:bg-[#00c9b6] active:scale-95 text-[#071d41] font-bold text-[14.5px] border-none cursor-pointer transition-all shadow-md"
            >
              <span>Get Degree</span>
              <span className="text-[16px]">&rarr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. COURSES OFFERED (#courses_offered)
      ───────────────────────────────────────────────────────────── */}
      <section id="courses_offered" className="py-12 sm:py-16 bg-white select-none scroll-mt-20">
        <div className="container max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-[26px] sm:text-[34px] font-bold text-[#111111] leading-tight m-0">
              Courses Offered in <br />
              <span className="text-[#2ad4c3]">Liverpool Online MBA</span>
            </h2>
          </div>

          <div className="course-info grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SPECIALISATIONS.map((c) => (
              <div
                key={c.id}
                className="slide bg-white rounded-[10px] shadow-[0_0_8px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="cr-info p-5 bg-[#F2F2F2]">
                    <h2 className="text-[18px] font-bold text-[#111111] mb-2 leading-snug">
                      {c.title}
                    </h2>
                    <p className="text-[13px] text-[#444444] leading-relaxed line-clamp-3 mb-4">
                      {c.desc}
                    </p>
                    <hr className="border-t border-slate-300 mb-4" />
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleOpenApply(c.title)}
                        className="enquireNowBtn w-full py-2.5 px-3 bg-[#00408d] hover:bg-[#00306c] active:scale-95 text-white font-bold text-[13px] rounded-[5px] border-none cursor-pointer flex items-center justify-center gap-1.5 transition-all shadow-xs"
                      >
                        <span>Apply Now</span>
                        <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenBrochure(c.title, "Get Brochure")}
                        className="downloadBrochureBtn w-full py-2.5 px-3 bg-black hover:bg-neutral-800 active:scale-95 text-white font-bold text-[13px] rounded-[5px] border-none cursor-pointer flex items-center justify-center gap-1.5 transition-all shadow-xs"
                      >
                        <span>Get Brochure</span>
                        <Download className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. APPROVALS & RECOGNITION (#certification)
      ───────────────────────────────────────────────────────────── */}
      <section id="certification" className="py-12 sm:py-16 bg-[#ffffff] select-none scroll-mt-20">
        <div className="container max-w-[1140px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-[24px] sm:text-[30px] font-bold text-[#111111] leading-tight m-0">
            APPROVALS & RECOGNITION <br />
            <span className="text-[#2ad4c3]">OF ONLINE LIVERPOOL BUSINESS SCHOOL</span>
          </h2>

          <div className="b2-info grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-center justify-center max-w-[850px] mx-auto mt-8">
            <div className="b1 p-4 bg-white flex items-center justify-center">
              <img
                src={`${ASSET_BASE}/Layer-36.png`}
                alt="LJMU Recognition"
                className="max-h-[85px] w-auto object-contain"
              />
            </div>
            <div className="b1 p-4 bg-white flex items-center justify-center">
              <img
                src={`${ASSET_BASE}/Layer-37.png`}
                alt="WES Recognition"
                className="max-h-[85px] w-auto object-contain"
              />
            </div>
            <div className="b1 p-4 bg-white flex items-center justify-center">
              <img
                src={`${ASSET_BASE}/Layer-39-1.png`}
                alt="AACSB Member"
                className="max-h-[85px] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. WHAT MAKES LBS STAND OUT (#why-choose)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="why-choose"
        className="mba-offer-section py-10 sm:py-14 text-white select-none scroll-mt-20 relative bg-no-repeat bg-[#203a7a]"
      >
        <div className="container max-w-[1140px] mx-auto px-4 sm:px-6">
          <h2 className="section-title text-center text-[26px] sm:text-[34px] font-bold mb-8 sm:mb-12 leading-tight m-0">
            What Makes<br />
            <span className="text-[#2de1c2]">Liverpool Business School MBA Stand Out?</span>
          </h2>

          <div className="content-wrapper grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
            {/* Left 3 Cards */}
            <div className="info-column lg:col-span-4 flex flex-col gap-3.5 sm:gap-4">
              <div className="info-card bg-white text-black rounded-[12px] p-5 sm:p-6 flex items-center gap-4 shadow-lg">
                <span className="icon text-[28px] text-[#1bc9a4] shrink-0">👤</span>
                <p className="text-[14px] sm:text-[15px] font-semibold text-slate-900 leading-snug m-0">
                  Integrated Credentials <br />Advantage(LBS- IIM U)
                </p>
              </div>

              <div className="info-card bg-white text-black rounded-[12px] p-5 sm:p-6 flex items-center gap-4 shadow-lg">
                <span className="icon text-[28px] text-[#1bc9a4] shrink-0">🎓</span>
                <p className="text-[14px] sm:text-[15px] font-semibold text-slate-900 leading-snug m-0">
                  Global Alumni <br />Connect
                </p>
              </div>

              <div className="info-card bg-white text-black rounded-[12px] p-5 sm:p-6 flex items-center gap-4 shadow-lg">
                <span className="icon text-[28px] text-[#1bc9a4] shrink-0">📝</span>
                <p className="text-[14px] sm:text-[15px] font-semibold text-slate-900 leading-snug m-0">
                  Career-Focused <br />Customised Curriculum
                </p>
              </div>
            </div>

            {/* Center Spacer Column (Desktop only to showcase background girl image cleanly) */}
            <div className="center-spacer hidden lg:block lg:col-span-4 min-h-[360px]" aria-hidden="true" />

            {/* Right 3 Cards */}
            <div className="info-column lg:col-span-4 flex flex-col gap-4">
              <div className="info-card bg-white text-black rounded-[12px] p-5 sm:p-6 flex items-center gap-4 shadow-lg">
                <span className="icon text-[28px] text-[#1bc9a4] shrink-0">💼</span>
                <p className="text-[14px] sm:text-[15px] font-semibold text-slate-900 leading-snug m-0">
                  Industry-Relevant Learning <br />through Case Studies
                </p>
              </div>

              <div className="info-card bg-white text-black rounded-[12px] p-5 sm:p-6 flex items-center gap-4 shadow-lg">
                <span className="icon text-[28px] text-[#1bc9a4] shrink-0">💰</span>
                <p className="text-[14px] sm:text-[15px] font-semibold text-slate-900 leading-snug m-0">
                  Pursue Global Business Education With Cost-Effective Learning Benefits
                </p>
              </div>

              <div className="info-card bg-white text-black rounded-[12px] p-5 sm:p-6 flex items-center gap-4 shadow-lg">
                <span className="icon text-[28px] text-[#1bc9a4] shrink-0">🌍</span>
                <p className="text-[14px] sm:text-[15px] font-semibold text-slate-900 leading-snug m-0">
                  Worldwide Learning <br />Network
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. ABOUT LIVERPOOL BUSINESS SCHOOL (#about)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-14 sm:py-20 text-white select-none scroll-mt-20 bg-cover bg-center"
        style={{
          backgroundImage: `url(${ASSET_BASE}/ljmu-rev.png)`,
        }}
      >
        <div className="container max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="about-cnt max-w-2xl text-left">
            <div className="ab1">
              <h2 className="text-[26px] sm:text-[32px] font-bold text-white mb-4 leading-tight m-0">
                About Liverpool Business School
              </h2>

              <div className="space-y-4 text-[13.5px] sm:text-[14.5px] leading-relaxed text-white/95 my-4">
                <p className="m-0">
                  Liverpool Business School (LBS), a renowned school within Liverpool John Moores University (LJMU), brings over three decades of excellence in business education. The institution is recognised for its innovative approach, impactful research, and industry-focused learning. LBS provides a globally relevant learning experience for aspiring business leaders.
                </p>
                <p className="m-0">
                  The Liverpool online MBA programme is designed to help professionals enhance their business knowledge through a research-focused curriculum, practical learning, and global exposure. This MBA University of Liverpool pathway offers an MBA degree from Liverpool Business School along with IIM Udaipur certification, providing learners with double credentials and alumni status from both institutions.
                </p>
                <p className="m-0">
                  Through the MBA in Liverpool learning journey, professionals can customise their curriculum, gain hands-on learning through HBR case studies, simulations, real-world projects, and access to a thriving network of 3,000+ alumni.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenApply(null)}
                className="enquireNowBtn inline-flex items-center gap-2 px-6 py-2.5 rounded-[5px] bg-[#2ad4c3] hover:bg-[#25beaf] text-white font-bold text-[14px] border-none cursor-pointer transition-all shadow-md active:scale-95 mt-4"
              >
                <Phone className="w-4 h-4 fill-white" />
                <span>Request Call Back</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. HOW TO APPLY (#how-to-apply)
      ───────────────────────────────────────────────────────────── */}
      <section id="how-to-apply" className="apply-section py-10 sm:py-14 lg:py-16 bg-white text-center select-none scroll-mt-20">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-8 xl:px-12 2xl:px-16 max-w-[1440px] 2xl:max-w-[1540px] mx-auto">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-[#193579] m-0 leading-tight">
            How to Apply for Liverpool Business School Online MBA
          </h2>
          <p className="section-desc max-w-[900px] mx-auto text-[13.5px] sm:text-[14px] text-[#555555] leading-relaxed my-3 mb-8">
            Applying for the Liverpool online MBA programme is a simple and streamlined process. Learners can begin their admission journey by completing the application form, submitting the required documents, and following the enrolment steps to secure their place in this globally recognised MBA in Liverpool programme.
          </p>

          <div className="steps-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 lg:gap-4">
            {/* Step 1 */}
            <div className="step-card orange bg-[#fff4e9] p-5 rounded-[14px] shadow-sm relative text-center">
              <div className="step-number w-12 h-12 rounded-full mx-auto font-bold text-[20px] flex items-center justify-center bg-white border-[3px] border-[#ff8c32] text-[#ff8c32]">
                1
              </div>
              <h4 className="text-[16px] font-bold text-black mt-4 mb-2 m-0">Submit Form</h4>
              <p className="text-[12px] text-[#444444] leading-snug m-0">
                Fill in and submit your application form online
              </p>
              <div className="absolute bottom-0 left-0 h-[5px] w-full rounded-b-[14px] bg-[#ff8c32]" />
            </div>

            {/* Step 2 */}
            <div className="step-card blue bg-[#f2f8ff] p-5 rounded-[14px] shadow-sm relative text-center">
              <div className="step-number w-12 h-12 rounded-full mx-auto font-bold text-[20px] flex items-center justify-center bg-white border-[3px] border-[#0b5ed7] text-[#0b5ed7]">
                2
              </div>
              <h4 className="text-[16px] font-bold text-black mt-4 mb-2 m-0">Expert&apos;s Counseling</h4>
              <p className="text-[12px] text-[#444444] leading-snug m-0">
                You will receive a call from our expert counselor
              </p>
              <div className="absolute bottom-0 left-0 h-[5px] w-full rounded-b-[14px] bg-[#0b5ed7]" />
            </div>

            {/* Step 3 */}
            <div className="step-card pink bg-[#fff1f6] p-5 rounded-[14px] shadow-sm relative text-center">
              <div className="step-number w-12 h-12 rounded-full mx-auto font-bold text-[20px] flex items-center justify-center bg-white border-[3px] border-[#ff2d6f] text-[#ff2d6f]">
                3
              </div>
              <h4 className="text-[16px] font-bold text-black mt-4 mb-2 m-0">Choose University</h4>
              <p className="text-[12px] text-[#444444] leading-snug m-0">
                Select the course &amp; university according to your interest
              </p>
              <div className="absolute bottom-0 left-0 h-[5px] w-full rounded-b-[14px] bg-[#ff2d6f]" />
            </div>

            {/* Step 4 */}
            <div className="step-card green bg-[#effff5] p-5 rounded-[14px] shadow-sm relative text-center">
              <div className="step-number w-12 h-12 rounded-full mx-auto font-bold text-[20px] flex items-center justify-center bg-white border-[3px] border-[#1faa59] text-[#1faa59]">
                4
              </div>
              <h4 className="text-[16px] font-bold text-black mt-4 mb-2 m-0">Online Payment</h4>
              <p className="text-[12px] text-[#444444] leading-snug m-0">
                You need to make a smooth online fee submission
              </p>
              <div className="absolute bottom-0 left-0 h-[5px] w-full rounded-b-[14px] bg-[#1faa59]" />
            </div>

            {/* Step 5 */}
            <div className="step-card purple bg-[#f9f0ff] p-5 rounded-[14px] shadow-sm relative text-center">
              <div className="step-number w-12 h-12 rounded-full mx-auto font-bold text-[20px] flex items-center justify-center bg-white border-[3px] border-[#8e2de2] text-[#8e2de2]">
                5
              </div>
              <h4 className="text-[16px] font-bold text-black mt-4 mb-2 m-0">Document Submit</h4>
              <p className="text-[12px] text-[#444444] leading-snug m-0">
                You need to upload all the required verified documents.
              </p>
              <div className="absolute bottom-0 left-0 h-[5px] w-full rounded-b-[14px] bg-[#8e2de2]" />
            </div>

            {/* Step 6 */}
            <div className="step-card orange bg-[#fff4e9] p-5 rounded-[14px] shadow-sm relative text-center">
              <div className="step-number w-12 h-12 rounded-full mx-auto font-bold text-[20px] flex items-center justify-center bg-white border-[3px] border-[#ff8c32] text-[#ff8c32]">
                6
              </div>
              <h4 className="text-[16px] font-bold text-black mt-4 mb-2 m-0">Admission Confirm</h4>
              <p className="text-[12px] text-[#444444] leading-snug m-0">
                Get Confirmation on your Email &amp; Whatsapp
              </p>
              <div className="absolute bottom-0 left-0 h-[5px] w-full rounded-b-[14px] bg-[#ff8c32]" />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          12. FAQS (#faqs)
      ───────────────────────────────────────────────────────────── */}
      <section id="faqs" aria-label="Frequently Asked Questions" className="py-10 sm:py-14 bg-white w-full select-none scroll-mt-20">
        <div className="container max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="faq-title text-left mb-6 sm:mb-8">
            <h2 className="text-[22px] sm:text-[26px] lg:text-[28px] font-bold text-[#111111] leading-tight m-0 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5 w-full">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-[3px] overflow-hidden bg-white transition-all shadow-2xs"
                  style={{
                    border: "1px solid #d1d5db",
                    borderLeft: "5px solid #08417b",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-3.5 sm:py-4 text-left flex items-center justify-between gap-4 cursor-pointer bg-white hover:bg-slate-50/60 transition-colors border-none m-0"
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-[13.5px] sm:text-[14.5px] font-bold text-[#111111] leading-snug m-0">
                      {faq.q}
                    </h3>
                    <span className="text-[18px] sm:text-[20px] font-normal text-slate-800 leading-none shrink-0 ml-3 select-none">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 py-3.5 sm:py-4 bg-white border-t border-[#e5e7eb] text-[13px] sm:text-[13.5px] text-[#333333] leading-relaxed font-normal">
                      <p className="m-0 leading-relaxed font-normal">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          13. COMPARE BANNER (#compare-universities) - Reusable Global Component
      ───────────────────────────────────────────────────────────── */}
      <div id="compare-universities">
        <LandingCompareBanner
          brand={{
            ...brand,
            primaryColor: "#08417b",
            compareBannerBg: "#08417b",
            compareSubtitle: "Compare IIM Udaipur with Top World Renowned Institutions",
            arrowGif: "/assets/images/arrow.gif",
          }}
          onOpenCompare={() => setIsCompareOpen(true)}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          14. GLOBAL FOOTER - Reusable Global Component
      ───────────────────────────────────────────────────────────── */}
      <LandingFooter
        brand={{
          ...brand,
          footerSectionBg: "bg-white",
          footerSectionBgColor: "#ffffff",
          footerLogo: `${ASSET_BASE}/new-des-logo.webp`,
          footerBottomBg: "#0b3c66",
        }}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
        onOpenTerms={() => handleOpenLegal("terms")}
        onOpenPrivacy={() => handleOpenLegal("privacy")}
      />

      {/* ─────────────────────────────────────────────────────────────
          15. MOBILE STICKY BUTTONS BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="sticky_btn_Section block md:hidden fixed bottom-0 left-0 w-full z-[99999]">
        <div className="footer_sticky_buttons grid grid-cols-2 w-full shadow-2xl">
          <a
            href="https://api.whatsapp.com/send/?phone=917065777755&text=I%20want%20to%20download%20the%20Liverpool%20Business%20School%20Online%20Program%20brochure"
            target="_blank"
            rel="noopener noreferrer"
            className="wp_btn flex items-center justify-center gap-2 bg-[#25d366] text-white py-3 px-2 font-bold text-[14px] no-underline"
          >
            <svg
              className="w-4 h-4 fill-white shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
            <span>Get Brochure</span>
          </a>

          <button
            type="button"
            onClick={() => handleOpenApply(null)}
            className="apply_btn flex items-center justify-center gap-1 bg-[#0b2154] text-white py-3 px-2 font-bold text-[14px] border-none cursor-pointer"
          >
            <span>Apply Now</span>
            <span className="text-[16px]">&raquo;</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          16. FLOATING CALL & COUPON / GIFT BUTTONS
      ───────────────────────────────────────────────────────────── */}
      {/* Floating Call Button */}
      <div className="call_fix_image fixed right-3 bottom-[85px] z-[99999]">
        <a href="tel:07065777755" aria-label="Call Now">
          <img
            src={`${ASSET_BASE}/call_icon.gif`}
            alt="Call Us"
            className="w-[60px] sm:w-[65px] h-auto rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.4),0_0_35px_rgba(46,204,113,0.9)] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          />
        </a>
      </div>

      {/* Floating Coupon Button */}
      <button
        type="button"
        onClick={() => {
          triggerConfetti();
          setIsScholarshipOpen(true);
        }}
        className="coupon-btn fixed right-3 bottom-4 z-[99999] border-none bg-transparent cursor-pointer transition-transform hover:scale-110 active:scale-95 drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
        aria-label="Get Scholarship Coupon Code"
      >
        <img
          src={`${ASSET_BASE}/gift.gif`}
          alt="Scholarship Gift"
          className="w-[55px] sm:w-[60px] h-[55px] sm:h-[60px] rounded-full object-contain"
        />
      </button>

      {/* ─────────────────────────────────────────────────────────────
          17. MODALS
      ───────────────────────────────────────────────────────────── */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        universityName="Liverpool Business School"
        courses={COURSE_LIST}
        selectedCourse={selectedCourse}
        title={modalTitle}
        brand={brand}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />

      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        universityName="Liverpool Business School"
        courses={COURSE_LIST}
        brand={brand}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        universityName="Liverpool Business School"
        courses={COURSE_LIST}
        brand={brand}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={() => setLegalModalState({ isOpen: false, type: "disclaimer" })}
        type={legalModalState.type}
        brand={brand}
      />
    </div>
  );
}
