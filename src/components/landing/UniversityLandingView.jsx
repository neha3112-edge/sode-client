"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { Carousel } from "antd";
import LandingNavbar, { LandingSubNav } from "./LandingNavbar";
import LandingHero from "./LandingHero";
import LandingApprovals from "./LandingApprovals";
import LandingWhyChoose from "./LandingWhyChoose";
import LandingProgrammes from "./LandingProgrammes";
import LandingOffersAndPlacement from "./LandingOffersAndPlacement";
import LandingAbout from "./LandingAbout";
import LandingStats from "./LandingStats";
import LandingTestimonials from "./LandingTestimonials";
import LandingDegree from "./LandingDegree";
import LandingRecruiters from "./LandingRecruiters";
import LandingAdmissionProcess from "./LandingAdmissionProcess";
import LandingSodeAbout from "./LandingSodeAbout";
import LandingFaq from "./LandingFaq";
import LandingFooterForm from "./LandingFooterForm";
import LandingCompareBanner from "./LandingCompareBanner";
import LandingFooter from "./LandingFooter";
import LandingStickyCtas from "./LandingStickyCtas";
import LandingEmiSection from "./LandingEmiSection";
import LandingExamSection from "./LandingExamSection";
import BrochureModal from "./modals/BrochureModal";
import ScholarshipModal from "./modals/ScholarshipModal";
import CompareModal from "./modals/CompareModal";
import LegalModal from "./modals/LegalModal";

export default function UniversityLandingView({ data = {} }) {
  const {
    slug = "university",
    brand = {},
    customCss = "",
    courses = [],
    approvals = [],
    keyHighlights = [],
    stats = [],
    programmes = [],
    offersAndPlacements,
    about = {},
    leader,
    whyChoose = [],
    degreeInfo = {},
    recruiters = {},
    faculties = [],
    testimonials = [],
    admissionSteps = [],
    admissionProcess,
    enrollmentProcess,
    feesAndEmi,
    examEvaluation,
    collegeComparison,
    sodeAbout,
    faqs = [],
    scholarshipModal,
    compareModal,
  } = data;

  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.value || "MBA");
  const [modalTitle, setModalTitle] = useState("Download Brochure");
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, type: "disclaimer" });

  // 1. Initial page load trigger flag: modal opens once on first scroll down to Why Choose
  const initialTriggeredRef = useRef(false);
  // 2. Armed specifically when user reaches top after clicking SODE logo
  const armedBySodeClickRef = useRef(false);
  // 3. Prevent any accidental trigger while scrolling upwards to top
  const isScrollingToTopFromSodeRef = useRef(false);

  const handleSodeClickToTop = () => {
    isScrollingToTopFromSodeRef.current = true;
    armedBySodeClickRef.current = false;
    if (typeof window !== "undefined" && window.scrollY < 120) {
      isScrollingToTopFromSodeRef.current = false;
      armedBySodeClickRef.current = true;
    }
    // Safety fallback: arm after 900ms once smooth scroll completes
    setTimeout(() => {
      if (isScrollingToTopFromSodeRef.current) {
        isScrollingToTopFromSodeRef.current = false;
        armedBySodeClickRef.current = true;
      }
    }, 900);
  };

  useEffect(() => {
    const checkWhyChooseReached = () => {
      if (typeof window === "undefined") return;

      // When scroll to top reaches near top
      if (window.scrollY < 120) {
        if (isScrollingToTopFromSodeRef.current) {
          isScrollingToTopFromSodeRef.current = false;
          armedBySodeClickRef.current = true;
        }
        return;
      }

      // If user is currently in the middle of smooth-scrolling upwards to top from SODE click, ignore
      if (isScrollingToTopFromSodeRef.current) return;

      // Only trigger if:
      // A) First time on page load (!initialTriggeredRef.current)
      // B) User clicked SODE logo, reached top, and came downwards (armedBySodeClickRef.current)
      const shouldTrigger = !initialTriggeredRef.current || armedBySodeClickRef.current;
      if (!shouldTrigger) return;

      const whyChooseEl =
        (brand.scholarshipTriggerId && (document.getElementById(brand.scholarshipTriggerId) || document.querySelector(brand.scholarshipTriggerId))) ||
        document.getElementById("whychoose") ||
        document.getElementById("Advantage") ||
        document.querySelector('[data-section="whychoose"]') ||
        document.querySelector(".why-choose-section");

      if (whyChooseEl) {
        const rect = whyChooseEl.getBoundingClientRect();
        // Trigger as soon as the top of Why Choose section comes into view (top <= 80% of viewport height)
        if (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0) {
          if (!initialTriggeredRef.current) {
            initialTriggeredRef.current = true;
          }
          if (armedBySodeClickRef.current) {
            armedBySodeClickRef.current = false;
          }
          setIsScholarshipOpen(true);
        }
      } else {
        // Fallback for pages without Why Choose: trigger at 50% scroll
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
        if (scrollPercent >= 50) {
          if (!initialTriggeredRef.current) {
            initialTriggeredRef.current = true;
          }
          if (armedBySodeClickRef.current) {
            armedBySodeClickRef.current = false;
          }
          setIsScholarshipOpen(true);
        }
      }
    };

    window.addEventListener("scroll", checkWhyChooseReached, { passive: true });
    checkWhyChooseReached();

    return () => window.removeEventListener("scroll", checkWhyChooseReached);
  }, []);

  const handleOpenBrochure = (course, title) => {
    if (course) setSelectedCourse(course);
    setModalTitle(
      title ||
      brand.hero?.brochureButtonText ||
      brand.brochureButtonText ||
      "Download Brochure"
    );
    setIsBrochureOpen(true);
  };

  const handleOpenApply = (course, title) => {
    if (course) setSelectedCourse(course);
    setModalTitle(title || "Apply Now");
    setIsBrochureOpen(true);
  };

  const handleOpenLegal = (type) => {
    setLegalModalState({ isOpen: true, type });
  };

  const isSmu = slug === "smu" || brand.slug === "smu";
  const isVgu = slug === "vgu" || brand.slug === "vgu";

  const activeCustomCss = customCss || brand.customCss || data.css || "";
  const pageSlug = brand.slug || slug || "university";

  const requestedFont = (brand.fontFamily || brand.font || data?.fontFamily || "Roboto").toLowerCase();
  const isMontserrat = requestedFont.includes("montserrat");
  const isPoppins = requestedFont.includes("poppins");
  const isRoboto = !isMontserrat && !isPoppins;

  const fontClass = isMontserrat
    ? "font-montserrat landing-page--font-montserrat"
    : isPoppins
      ? "font-poppins landing-page--font-poppins"
      : "font-roboto landing-page--font-roboto";
  const activeFontFamily = isMontserrat
    ? "'Montserrat', var(--font-montserrat), sans-serif"
    : isPoppins
      ? "'Poppins', var(--font-poppins), sans-serif"
      : "'Roboto', var(--font-roboto), sans-serif";

  return (
    <div
      className={`landing-page-root landing-page--${pageSlug} ${fontClass} min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-900 selection:text-white ${brand.pageClassName || ""}`}
      data-font={isMontserrat ? "montserrat" : isPoppins ? "poppins" : "roboto"}
      style={{
        "--app-font-family": activeFontFamily,
        fontFamily: activeFontFamily,
        ...brand.pageStyle,
      }}
    >
      {/* Dynamic Page-Specific CSS injected directly from JSON data */}
      {activeCustomCss && (
        <style
          id={`landing-custom-css-${pageSlug}`}
          dangerouslySetInnerHTML={{ __html: activeCustomCss }}
        />
      )}
      {/* 1. Header / Navbar */}
      <LandingNavbar
        brand={brand}
        onOpenApply={(course, title) => handleOpenApply(course, title || "Apply Now")}
        onOpenBrochure={(course, title) => handleOpenBrochure(course, title || "Download Brochure")}
        onOpenScholarship={() => setIsScholarshipOpen(true)}
        onScrollTop={handleSodeClickToTop}
      />

      <main className="flex-1">
        {/* 2. Hero Section (#banner / #hero) */}
        <LandingHero
          brand={brand}
          courses={courses}
          onOpenBrochure={(course, title) => handleOpenBrochure(course, title)}
          onOpenApply={(course, title) => handleOpenApply(course, title || "Apply Now")}
          onOpenScholarship={() => setIsScholarshipOpen(true)}
          onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
        />

        {/* 2.5 Sub-Navigation Sticky Bar */}
        {(brand.showSubNav === true || brand.slug === "galgotias" || slug === "galgotias") && (
          <LandingSubNav
            brand={{ ...brand, slug: brand.slug || slug }}
            onOpenApply={() => handleOpenApply()}
          />
        )}

        {/* Section Dispatcher based on brand.sectionOrder or default flow */}
        {(() => {
          const defaultOrder = isSmu
            ? [
              "approvals",
              "programmes",
              "whyChoose",
              "about",
              "stats",
              "admissionProcess",
              "faqs",
              "footerForm",
              "compareBanner",
            ]
            : isVgu
              ? [
                "approvals",
                "programmes",
                "about",
                "stats",
                "whyChoose",
                "degree",
                "recruiters",
                "admissionProcess",
                "faqs",
                "footerForm",
                "compareBanner",
              ]
              : [
                "approvals",
                "whyChoose",
                "programmes",
                "offersAndPlacement",
                "about",
                "stats",
                "degree",
                "recruiters",
                "testimonials",
                "admissionProcess",
                "sodeAbout",
                "faqs",
                "footerForm",
                "compareBanner",
              ];

          const activeOrder = brand.sectionOrder || defaultOrder;

          return activeOrder.map((sectionKey) => {
            switch (sectionKey) {
              case "overview":
                const overviewData = data.overview || brand.overview;
                if (brand.slug === "iim" || brand.overviewLayout === "iim") {
                  return (
                    <section id="overview" key="overview">
                      <div className="container">
                        <div className="overview1">
                          <h2>{overviewData?.title || "The IIM Kozhikode HRM Analytics Certification Courses"}</h2>
                          <p>{overviewData?.paragraph || overviewData?.desc || "The certificate course of IIM Kozhikode in HR Analytics is a 6-month online program that helps professionals learn HR concepts with modern analytics. The course is 280 hours of expert learning, live faculty sessions, and industry projects. Learners receive hands-on training in tools such as Tableau, Excel, and Power BI. The course is recognized as one of the leading HR courses. It is ideal for HR professionals, managers, and MBA graduates seeking to advance their careers."}</p>
                        </div>
                      </div>
                    </section>
                  );
                }
                if (overviewData && overviewData.title) {
                  return (
                    <section id="overview" key="overview" className="overview-section py-12 sm:py-16 bg-white text-center select-none scroll-mt-20">
                      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
                        <h2 className="text-[26px] sm:text-[32px] lg:text-[34px] font-bold text-[#111111] leading-tight m-0">
                          {overviewData.title}
                        </h2>
                        <p className="text-[14px] sm:text-[15.5px] text-[#444444] leading-relaxed mt-4 mb-6 max-w-4xl mx-auto">
                          {overviewData.paragraph || overviewData.desc}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleOpenBrochure()}
                          className="downloadBrochureBtn inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#0CB1EF] text-white font-bold text-[14.5px] hover:bg-[#099cd3] transition-all cursor-pointer border-none shadow-md active:scale-95"
                        >
                          <span>{overviewData.buttonText || "Download Brochure"}</span>
                          <Download className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>
                    </section>
                  );
                }
                return (
                  <section id="overview" key="overview" className="overview-section py-12 sm:py-16 bg-white text-center select-none scroll-mt-20">
                    <div className="max-w-[1050px] mx-auto px-4 sm:px-6">
                      <h2 className="text-[26px] sm:text-[32px] lg:text-[34px] font-bold text-[#111111] leading-tight m-0">
                        {brand.overviewTitle ? (
                          brand.overviewTitle
                        ) : (
                          <>
                            Overview of <span style={{ color: brand.primaryColor || "#04903c" }}>{brand.overviewHighlight || "Online DBA Program"}</span>
                          </>
                        )}
                      </h2>
                      <p className="text-[14px] sm:text-[15.5px] text-[#444444] leading-relaxed mt-4 mb-6 max-w-4xl mx-auto font-normal">
                        {brand.overviewDescription || "The Online DBA helps professionals gain advanced skills in business and management."}
                      </p>

                      {brand.overviewItems && brand.overviewItems.length > 0 && (
                        <div className="overview_lists grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
                          {brand.overviewItems.map((item, idx) => (
                            <div key={idx} className="overview_list_inner bg-[#f1f1f1] p-3.5 rounded-[6px] flex items-center gap-3 text-left">
                              <span className="text-[#c11f28] shrink-0 text-[26px]">{item.icon}</span>
                              <div className="head_inner">
                                <h3 className="text-[16px] font-bold text-[#111111] m-0 mb-1">{item.title}</h3>
                                <p className="text-[13px] text-[#555555] m-0 font-medium">{item.value}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                        <button
                          type="button"
                          onClick={() => handleOpenBrochure()}
                          className="downloadBrochureBtn inline-flex items-center gap-2 px-6 py-2.5 rounded-[5px] font-bold text-[15px] hover:brightness-95 transition-all cursor-pointer border-none shadow-xs active:scale-95"
                          style={{
                            backgroundColor: brand.accentColor || brand.primaryColor || "#fff000",
                            color: brand.overviewBtnTextColor || "#000000",
                          }}
                        >
                          <span>{brand.overviewButtonText || "Get Curriculum"}</span>
                          <Download className="w-4 h-4 stroke-[2.5]" />
                        </button>
                        {brand.overviewSecondaryBtnText && (
                          <button
                            type="button"
                            onClick={() => {
                              const target = document.getElementById("whychoose") || document.getElementById("benefits");
                              if (target) {
                                target.scrollIntoView({ behavior: "smooth" });
                              } else {
                                handleOpenApply();
                              }
                            }}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[5px] bg-black text-white font-bold text-[15px] hover:brightness-125 transition-all cursor-pointer border-none shadow-xs active:scale-95"
                          >
                            <span>{brand.overviewSecondaryBtnText}</span>
                            <span className="text-[14px]">▼</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </section>
                );
              case "keySkills":
                const keySkillsList = data.keySkills || brand.keySkills || [];
                if (!keySkillsList.length) return null;
                if (brand.slug === "iim") {
                  return (
                    <section className="certification" id="key-skills" key="keySkills">
                      <div className="container">
                        <h2>
                          Key Skills You Will Gain from the <span className="blue">IIM Kozhikode HR Analytics Course</span>
                        </h2>
                        <p>
                          The IIM Kozhikode HR Analytics Online Course equips learners with industry-relevant skills to manage people and processes through data-driven methods. The curriculum focuses on:
                        </p>
                        <br />
                        <div className="b2-info">
                          {keySkillsList.map((skill, idx) => (
                            <div key={idx} className="b1">
                              <img src={skill.icon} alt={skill.title} />
                              <div>
                                <h3>{skill.title}</h3>
                                <p>{skill.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  );
                }
                return (
                  <section id="key-skills" key="keySkills" className="py-12 sm:py-16 bg-white select-none scroll-mt-20">
                    <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
                      <h2 className="text-[24px] sm:text-[30px] lg:text-[32px] font-bold text-center text-[#111111] mb-8 sm:mb-12">
                        Key Skills You Learn in IIM Kozhikode HR Analytics Course
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {keySkillsList.map((skill, idx) => (
                          <div key={idx} className="bg-white border border-slate-200 rounded-[12px] p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-start">
                            {skill.icon && (
                              <div className="relative w-12 h-12 mb-4">
                                <Image src={skill.icon} alt={skill.title} fill className="object-contain" />
                              </div>
                            )}
                            <h3 className="text-[17px] font-bold text-[#111111] mb-2 leading-snug">
                              {skill.title}
                            </h3>
                            <p className="text-[13px] text-slate-600 leading-relaxed m-0">
                              {skill.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                );
              case "tools":
                const toolsList = data.tools || brand.tools || [];
                if (!toolsList.length) return null;
                if (brand.slug === "iim") {
                  return (
                    <section id="courses" key="tools">
                      <div className="container">
                        <h2>
                          Tools &amp; Technologies You’ll Learn in <br /><span className="blue">the IIM Kozhikode HR Analytics Course</span>
                        </h2>
                        <p>
                          The IIM Kozhikode HR Analytics Course, one of the most career-focused courses at IIM Kozhikode, offers hands-on training with tools that define modern HRM practices. Designed as a practical certification course in IIM Kozhikode, it equips learners with the ability to analyze data and apply insights across HR functions.
                        </p>
                        <br />
                        <div className="course-info">
                          {toolsList.map((t, idx) => (
                            <div key={idx} className="c1">
                              <div className="c1-img-wrap" style={{ minHeight: "140px", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
                                <img src={t.image} alt={t.name} className="img-responsive" style={{ maxHeight: "90px", maxWidth: "180px", objectFit: "contain", margin: "auto" }} />
                              </div>
                              <p
                                className="c1-desc"
                                style={{
                                  backgroundColor: "#17479E",
                                  color: "#ffffff",
                                  padding: "16px 18px 20px 18px",
                                  fontSize: "13.5px",
                                  lineHeight: "1.55",
                                  textAlign: "left",
                                  margin: 0,
                                  borderBottomLeftRadius: "10px",
                                  borderBottomRightRadius: "10px",
                                  display: "block",
                                  minHeight: "105px",
                                }}
                              >
                                <b style={{ color: "#ffffff", fontWeight: 700, display: "inline", padding: 0, margin: 0, background: "transparent" }}>
                                  {t.name}:{" "}
                                </b>
                                <span style={{ color: "#ffffff", fontWeight: 400, display: "inline", padding: 0, margin: 0, background: "transparent" }}>
                                  {t.desc}
                                </span>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  );
                }
                return (
                  <section id="courses" key="tools" className="py-12 sm:py-16 bg-slate-50 select-none scroll-mt-20">
                    <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
                      <h2 className="text-[24px] sm:text-[30px] lg:text-[32px] font-bold text-center text-[#111111] mb-8 sm:mb-12">
                        Tools Covered in IIM Kozhikode HR Analytics Course
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {toolsList.map((t, idx) => (
                          <div key={idx} className="bg-white border border-slate-200 rounded-[12px] p-6 shadow-xs hover:shadow-md transition-shadow text-center flex flex-col items-center">
                            {t.image && (
                              <div className="relative w-16 h-16 mb-4">
                                <Image src={t.image} alt={t.name} fill className="object-contain" />
                              </div>
                            )}
                            <h3 className="text-[18px] font-bold text-[#111111] mb-2">
                              {t.name}
                            </h3>
                            <p className="text-[13px] text-slate-600 leading-relaxed m-0">
                              {t.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                );
              case "whyChooseCarousel":
                const carouselItems = brand.whyChooseCarouselItems || [];
                return (
                  <section id="whychoose" key="whyChooseCarousel" className="py-12 sm:py-16 bg-white select-none scroll-mt-20">
                    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 text-center">
                      <h2 className="text-[24px] sm:text-[30px] lg:text-[34px] font-bold text-[#111111] mb-8 sm:mb-12">
                        {brand.whyChooseCarouselTitle || "Why Choose ESGCI Online DBA Program"}
                      </h2>
                      <div className="course-info">
                        <Carousel
                          autoplay
                          autoplaySpeed={3000}
                          dots={true}
                          slidesToShow={3}
                          responsive={[
                            { breakpoint: 1024, settings: { slidesToShow: 2 } },
                            { breakpoint: 640, settings: { slidesToShow: 1 } },
                          ]}
                        >
                          {carouselItems.map((item, idx) => (
                            <div key={idx} className="px-3 box-border outline-none py-2">
                              <div className="bg-white rounded-[8px] overflow-hidden border border-slate-200/90 shadow-sm flex flex-col justify-between text-left h-full min-h-[390px] hover:shadow-md transition-shadow">
                                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                                </div>
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                  <div>
                                    <h3 className="text-[17px] sm:text-[18px] font-bold text-[#111111] mb-2 leading-snug">
                                      {item.title}
                                    </h3>
                                    <p className="text-[12.5px] sm:text-[13px] text-[#555555] leading-relaxed mb-4">
                                      {item.desc || item.description}
                                    </p>
                                  </div>
                                  <div>
                                    <hr className="border-t border-slate-200 mb-4" />
                                    <button
                                      type="button"
                                      onClick={() => handleOpenApply?.(item.title)}
                                      className="w-full py-2 px-4 bg-[#fff000] text-black font-bold text-[13.5px] rounded-[5px] hover:brightness-95 transition-all border-none cursor-pointer"
                                    >
                                      Apply Now
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Carousel>
                      </div>
                    </div>
                  </section>
                );
              case "approvals":
                return (
                  <LandingApprovals
                    key="approvals"
                    approvals={approvals}
                    keyHighlights={keyHighlights || brand.keyHighlights}
                    universityName={brand.name}
                    brand={{ ...brand, slug: brand.slug || slug }}
                  />
                );
              case "programmes":
                return (
                  <LandingProgrammes
                    key="programmes"
                    programmes={programmes}
                    universityName={brand.name}
                    brand={brand}
                    onSelectCourseForBrochure={handleOpenBrochure}
                    onOpenApply={handleOpenApply}
                  />
                );
              case "about":
                return (
                  <LandingAbout
                    key="about"
                    about={about}
                    brand={brand}
                    stats={stats}
                    leader={leader}
                    onOpenApply={() => handleOpenApply(null, "Apply Now")}
                  />
                );
              case "whyChoose":
              case "benefits":
              case "eligibility":
                const whyChooseItems = whyChoose && whyChoose.length > 0 ? whyChoose : data.eligibility?.items || [];
                return (
                  <LandingWhyChoose
                    key="whyChoose"
                    whyChoose={whyChooseItems}
                    brand={{
                      ...brand,
                      whyChooseTitle: data.eligibility?.title || brand.whyChooseTitle,
                      whyChooseBgImage: data.eligibility?.desktopBg || brand.whyChooseBgImage,
                      whyChooseBtnText: data.eligibility?.buttonText || brand.whyChooseBtnText,
                    }}
                    onOpenApply={() => handleOpenApply()}
                  />
                );
              case "degree":
              case "sampleDegree":
                const activeDegree = (degreeInfo && Object.keys(degreeInfo).length > 0) ? degreeInfo : data.degree;
                return activeDegree && Object.keys(activeDegree).length > 0 ? (
                  <LandingDegree
                    key="degree"
                    degreeInfo={activeDegree}
                    brand={{
                      ...brand,
                      degreeLayout: brand.degreeLayout || (brand.slug === "iim" ? "iim" : undefined),
                    }}
                    onOpenApply={() => handleOpenApply()}
                  />
                ) : null;
              case "recruiters":
              case "placement":
              case "partners":
              case "placements":
                const activeRecruiters =
                  (recruiters && Object.keys(recruiters).length > 0)
                    ? recruiters
                    : data.placementPartners && data.placementPartners.length > 0
                    ? { partners: data.placementPartners, title: brand.recruitersTitle || "IIM Kozhikode HR Analytics Course: Placement Partners" }
                    : brand.recruiters;
                return activeRecruiters || brand.recruitersTitle || brand.recruitersDesktopImage ? (
                  <LandingRecruiters
                    key="recruiters"
                    brand={brand}
                    recruiters={activeRecruiters || brand.recruiters}
                  />
                ) : null;
              case "offersAndPlacement":
                return offersAndPlacements ? (
                  <LandingOffersAndPlacement
                    key="offersAndPlacement"
                    offersAndPlacements={offersAndPlacements}
                    brand={brand}
                  />
                ) : null;
              case "stats":
                return brand.showSeparateStats !== false && stats?.length > 0 ? (
                  <LandingStats key="stats" stats={stats} brand={{ ...brand, slug: brand.slug || slug }} />
                ) : null;
              case "testimonials":
                return testimonials && testimonials.length > 0 ? (
                  <LandingTestimonials
                    key="testimonials"
                    testimonials={testimonials}
                    universityName={brand.name}
                    brand={brand}
                  />
                ) : null;
              case "admissionProcess":
              case "howToApply":
                const activeAdmissionSteps = admissionSteps?.length > 0 ? admissionSteps : data.howToApply?.steps;
                return (
                  <LandingAdmissionProcess
                    key="admissionProcess"
                    admissionSteps={activeAdmissionSteps}
                    admissionProcess={admissionProcess}
                    enrollmentProcess={enrollmentProcess}
                    universityName={brand.name}
                    brand={{
                      ...brand,
                      slug: brand.slug || slug,
                      admissionTitle: data.howToApply?.title || brand.admissionTitle,
                      admissionSubtitle: data.howToApply?.desc || brand.admissionSubtitle,
                    }}
                    onOpenApply={() => handleOpenApply()}
                  />
                );
              case "ctaStrip":
                return (
                  <section
                    key="ctaStrip"
                    className="cta-strip bg-[#005a8d] py-7 sm:py-8 px-4 sm:px-6 select-none scroll-mt-20"
                  >
                    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-5">
                      <div className="cta-text">
                        <h3 className="text-white text-[24px] sm:text-[30px] lg:text-[34px] font-bold m-0 leading-tight">
                          {brand.ctaStripTitle || "Need clarification?"}
                        </h3>
                        <p className="text-[#dbe9f3] text-[16px] sm:text-[19px] lg:text-[21px] font-semibold mt-1 m-0">
                          {brand.ctaStripSubtitle ||
                            "Interact with experts, Get free consultation."}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleOpenApply()}
                        className="cta-btn inline-flex items-center gap-2.5 bg-white hover:bg-slate-100 text-black font-semibold text-[15px] sm:text-[16px] px-7 py-3 rounded-full border-none cursor-pointer transition-all active:scale-95 shadow-md shrink-0"
                      >
                        <i className="fa fa-phone text-[#005a8d]" />
                        <span>{brand.ctaStripBtnText || "Talk to Experts"}</span>
                      </button>
                    </div>
                  </section>
                );
              case "sodeAbout":
                return sodeAbout ? (
                  <LandingSodeAbout
                    key="sodeAbout"
                    sodeAbout={sodeAbout}
                    brand={brand}
                    onOpenApply={() => handleOpenApply()}
                    onOpenCompare={() => setIsCompareOpen(true)}
                  />
                ) : null;
              case "faqs":
                return (
                  <LandingFaq
                    key="faqs"
                    faqs={faqs}
                    universityName={brand.name}
                    brand={{ ...brand, slug: brand.slug || slug }}
                  />
                );
              case "footerForm":
                return brand.showFooterForm !== false ? (
                  <LandingFooterForm
                    key="footerForm"
                    brand={{ ...brand, slug: brand.slug || slug }}
                    courses={courses}
                    onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
                  />
                ) : null;
              case "emi":
                return (
                  <LandingEmiSection
                    key="emi"
                    brand={{ ...brand, slug: brand.slug || slug }}
                    feesAndEmi={feesAndEmi || brand.feesAndEmi}
                    onOpenApply={() => handleOpenApply()}
                  />
                );
              case "exam":
                return (
                  <LandingExamSection
                    key="exam"
                    brand={{ ...brand, slug: brand.slug || slug }}
                    examEvaluation={examEvaluation || brand.examEvaluation}
                    onOpenApply={() => handleOpenApply()}
                  />
                );
              case "compareBanner":
              case "comparison":
              case "compare":
                return (
                  <LandingCompareBanner
                    key="compareBanner"
                    brand={{ ...brand, slug: brand.slug || slug }}
                    collegeComparison={collegeComparison || brand.collegeComparison}
                    onOpenCompare={() => setIsCompareOpen(true)}
                    onOpenBrochure={handleOpenBrochure}
                    onOpenApply={handleOpenApply}
                  />
                );
              default:
                return null;
            }
          });
        })()}
      </main>

      {/* Footer (Variant 1 or Variant 2 conditionally handled inside LandingFooter) */}
      <LandingFooter
        brand={brand}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
        onOpenTerms={() => handleOpenLegal("terms")}
        onOpenPrivacy={() => handleOpenLegal("privacy")}
      />

      {/* Floating Sticky CTAs */}
      <LandingStickyCtas
        brand={brand}
        onOpenApply={() => handleOpenApply(null, "Apply Now")}
        onOpenBrochure={() => handleOpenBrochure(null, "Download Brochure")}
        onOpenScholarship={() => setIsScholarshipOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Modals */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        universityName={brand.name}
        courses={courses}
        selectedCourse={selectedCourse}
        title={modalTitle}
        brand={brand}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />
      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        universityName={brand.name}
        courses={courses}
        brand={brand}
        scholarshipModal={scholarshipModal || brand.scholarshipModal}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        universityName={brand.name}
        courses={courses}
        brand={brand}
        compareModal={compareModal || brand.compareModal}
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
