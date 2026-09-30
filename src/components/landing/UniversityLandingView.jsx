"use client";

import React, { useState, useEffect, useRef } from "react";
import LandingNavbar from "./LandingNavbar";
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
    stats = [],
    programmes = [],
    offersAndPlacements,
    about = {},
    leader,
    whyChoose = [],
    degreeInfo = {},
    recruiters = {},
    testimonials = [],
    admissionSteps = [],
    admissionProcess,
    enrollmentProcess,
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

  return (
    <div
      className={`landing-page-root landing-page--${pageSlug} min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-900 selection:text-white ${brand.pageClassName || ""}`}
      style={{
        fontFamily: brand.fontFamily || "'Roboto', var(--font-roboto), sans-serif",
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
              case "approvals":
                return (
                  <LandingApprovals
                    key="approvals"
                    approvals={approvals}
                    universityName={brand.name}
                    brand={brand}
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
              case "compareBanner":
                return (
                  <LandingCompareBanner
                    key="compareBanner"
                    brand={{ ...brand, slug: brand.slug || slug }}
                    onOpenCompare={() => setIsCompareOpen(true)}
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
