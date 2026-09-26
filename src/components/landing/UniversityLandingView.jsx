"use client";

import React, { useState, useEffect } from "react";
import LandingNavbar from "./LandingNavbar";
import LandingHero from "./LandingHero";
import LandingApprovals from "./LandingApprovals";
import LandingWhyChoose from "./LandingWhyChoose";
import LandingProgrammes from "./LandingProgrammes";
import LandingOffersAndPlacement from "./LandingOffersAndPlacement";
import LandingAbout from "./LandingAbout";
import LandingStats from "./LandingStats";
import LandingTestimonials from "./LandingTestimonials";
import LandingAdmissionProcess from "./LandingAdmissionProcess";
import LandingSodeAbout from "./LandingSodeAbout";
import LandingFaq from "./LandingFaq";
import LandingFooterForm from "./LandingFooterForm";
import LandingCompareBanner from "./LandingCompareBanner";
import LandingFooter from "./LandingFooter";
import LandingStickyCtas from "./LandingStickyCtas";
import LandingRecruiters from "./LandingRecruiters";
import BrochureModal from "./modals/BrochureModal";
import ScholarshipModal from "./modals/ScholarshipModal";
import CompareModal from "./modals/CompareModal";
import LegalModal from "./modals/LegalModal";

export default function UniversityLandingView({ data = {} }) {
  const {
    slug = "university",
    brand = {},
    courses = [],
    approvals = [],
    stats = [],
    programmes = [],
    offersAndPlacements,
    about = {},
    whyChoose = [],
    testimonials = [],
    admissionSteps = [],
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

  useEffect(() => {
    let triggered = false;
    const handleScroll = () => {
      if (!triggered && window.scrollY > 1200) {
        triggered = true;
        const key = `${slug}_scholarship_seen`;
        if (!sessionStorage.getItem(key)) {
          setIsScholarshipOpen(true);
          sessionStorage.setItem(key, "true");
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  const handleOpenBrochure = (course) => {
    if (course) setSelectedCourse(course);
    setIsBrochureOpen(true);
  };

  const handleOpenApply = (course) => {
    if (course) setSelectedCourse(course);
    const heroEl = document.getElementById("hero");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setIsBrochureOpen(true);
    }
  };

  const handleOpenLegal = (type) => {
    setLegalModalState({ isOpen: true, type });
  };

  return (
    <div className="landing-page-root min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-900 selection:text-white">
      {/* 1. Header / Navbar */}
      <LandingNavbar
        brand={brand}
        onOpenApply={() => handleOpenApply()}
        onOpenBrochure={() => handleOpenBrochure()}
        onOpenScholarship={() => setIsScholarshipOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section (#banner) */}
        <LandingHero
          brand={brand}
          courses={courses}
          onOpenBrochure={() => handleOpenBrochure()}
          onOpenApply={() => handleOpenApply()}
          onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
        />

        {/* Section Dispatcher based on brand.sectionOrder or default flow */}
        {(() => {
          const defaultOrder = [
            "approvals",
            "whyChoose",
            "programmes",
            "offersAndPlacement",
            "about",
            "stats",
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
              case "recruiters":
              case "placement":
              case "placements":
                return (
                  <LandingRecruiters
                    key="recruiters"
                    brand={brand}
                    recruiters={brand.recruiters}
                  />
                );
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
                  <LandingStats key="stats" stats={stats} brand={brand} />
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
                    enrollmentProcess={enrollmentProcess}
                    universityName={brand.name}
                    brand={brand}
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
                    brand={brand}
                  />
                );
              case "footerForm":
                return brand.showFooterForm !== false ? (
                  <LandingFooterForm
                    key="footerForm"
                    brand={brand}
                    courses={courses}
                    onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
                  />
                ) : null;
              case "compareBanner":
                return (
                  <LandingCompareBanner
                    key="compareBanner"
                    brand={brand}
                    onOpenCompare={() => setIsCompareOpen(true)}
                  />
                );
              default:
                return null;
            }
          });
        })()}
      </main>

      {/* 15. Footer */}
      <LandingFooter
        brand={brand}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
        onOpenTerms={() => handleOpenLegal("terms")}
        onOpenPrivacy={() => handleOpenLegal("privacy")}
      />

      {/* 16. Floating Sticky CTAs */}
      <LandingStickyCtas
        brand={brand}
        onOpenApply={() => handleOpenApply()}
        onOpenBrochure={() => handleOpenBrochure()}
        onOpenScholarship={() => setIsScholarshipOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* 17. Modals */}
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

