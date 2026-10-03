"use client";

import React, { useState, useEffect, useRef } from "react";
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

  const handleOpenBrochure = (course) => {
    if (course) setSelectedCourse(course);
    setIsBrochureOpen(true);
  };

  const handleOpenApply = (course) => {
    if (course) setSelectedCourse(course);
    const heroEl = document.getElementById("hero") || document.getElementById("banner");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setIsBrochureOpen(true);
    }
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
        onOpenApply={() => handleOpenApply()}
        onOpenBrochure={() => handleOpenBrochure()}
        onOpenScholarship={() => setIsScholarshipOpen(true)}
        onScrollTop={handleSodeClickToTop}
      />

      <main className="flex-1">
        {/* 2. Hero Section (#banner / #hero) */}
        <LandingHero
          brand={brand}
          courses={courses}
          onOpenBrochure={() => handleOpenBrochure()}
          onOpenApply={() => handleOpenApply()}
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
                return (
                  <section id="overview" key="overview" className="overview-section py-12 sm:py-16 bg-white text-center select-none scroll-mt-20">
                    <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
                      <h2 className="text-[26px] sm:text-[32px] lg:text-[34px] font-bold text-[#111111] leading-tight m-0">
                        Overview of <span className="text-[#04903c]">{brand.overviewHighlight || "ESCGI Online DBA Program"}</span>
                      </h2>
                      <p className="text-[14px] sm:text-[15.5px] text-[#444444] leading-relaxed mt-4 mb-6 max-w-4xl mx-auto">
                        {brand.overviewDescription || "The ESGCI Online DBA helps professionals gain advanced skills in business and management. The 36-month program includes foundation, leadership, and dissertation phases, giving a clear path for learning. Students receive personal guidance from experienced ESGCI faculty to support research and studies. The program offers interactive learning and global exposure, helping students develop strong leadership and practical skills. It also allows students to use their knowledge on real-world business challenges. Graduates earn a globally recognized doctoral degree, improving career opportunities. After completing the DBA, alumni can work in consulting, research, teaching, or executive roles worldwide."}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleOpenBrochure()}
                        className="downloadBrochureBtn inline-flex items-center gap-2 px-6 py-2.5 rounded-[5px] bg-[#fff000] text-black font-bold text-[15px] hover:brightness-95 transition-all cursor-pointer border-none shadow-xs active:scale-95"
                      >
                        <span>{brand.overviewButtonText || "Get Curriculum"}</span>
                        <Download className="w-4 h-4 stroke-[2.5]" />
                      </button>
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
                    onOpenApply={() => handleOpenApply()}
                  />
                );
              case "whyChoose":
                return (
                  <LandingWhyChoose
                    key="whyChoose"
                    whyChoose={whyChoose}
                    brand={brand}
                    onOpenApply={() => handleOpenApply()}
                  />
                );
              case "degree":
                return degreeInfo && Object.keys(degreeInfo).length > 0 ? (
                  <LandingDegree
                    key="degree"
                    degreeInfo={degreeInfo}
                    brand={brand}
                    onOpenApply={() => handleOpenApply()}
                  />
                ) : null;
              case "recruiters":
              case "placement":
              case "partners":
              case "placements":
                return (recruiters && Object.keys(recruiters).length > 0) || brand.recruiters || brand.recruitersTitle || brand.recruitersDesktopImage ? (
                  <LandingRecruiters
                    key="recruiters"
                    brand={brand}
                    recruiters={recruiters || brand.recruiters}
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
                return (
                  <LandingAdmissionProcess
                    key="admissionProcess"
                    admissionSteps={admissionSteps}
                    admissionProcess={admissionProcess}
                    enrollmentProcess={enrollmentProcess}
                    universityName={brand.name}
                    brand={{ ...brand, slug: brand.slug || slug }}
                    onOpenApply={() => handleOpenApply()}
                  />
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
        onOpenApply={() => handleOpenApply()}
        onOpenBrochure={() => handleOpenBrochure()}
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
