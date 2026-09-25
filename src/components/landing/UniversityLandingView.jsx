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

        {/* 3. Accreditation & Approvals Carousel (#approvals) */}
        <LandingApprovals approvals={approvals} universityName={brand.name} brand={brand} />

        {/* 4. Key Features / Why Choose (#advantage) */}
        <LandingWhyChoose whyChoose={whyChoose} brand={brand} onOpenApply={() => handleOpenApply()} />

        {/* 5. Programs Offered (#programs) */}
        <LandingProgrammes
          programmes={programmes}
          universityName={brand.name}
          brand={brand}
          onSelectCourseForBrochure={handleOpenBrochure}
          onOpenApply={handleOpenApply}
        />

        {/* 6. Early Access Offers & Placements (#E1) */}
        {offersAndPlacements && (
          <LandingOffersAndPlacement offersAndPlacements={offersAndPlacements} brand={brand} />
        )}

        {/* 7. About Manipal University Online (#about) */}
        <LandingAbout about={about} brand={brand} stats={stats} onOpenApply={() => handleOpenApply()} />

        {/* 8. Stats / Achievements (#achievement) */}
        {brand.showSeparateStats !== false && <LandingStats stats={stats} brand={brand} />}

        {/* 9. Testimonials Carousel (#testimonials) */}
        {testimonials && testimonials.length > 0 && (
          <LandingTestimonials testimonials={testimonials} universityName={brand.name} brand={brand} />
        )}

        {/* 10. Enrollment Process (.apply-section) */}
        <LandingAdmissionProcess
          admissionSteps={admissionSteps}
          enrollmentProcess={enrollmentProcess}
          universityName={brand.name}
          brand={brand}
          onOpenApply={() => handleOpenApply()}
        />

        {/* 11. About SODE (#sode_about) */}
        {sodeAbout && (
          <LandingSodeAbout
            sodeAbout={sodeAbout}
            brand={brand}
            onOpenApply={() => handleOpenApply()}
            onOpenCompare={() => setIsCompareOpen(true)}
          />
        )}

        {/* 12. FAQs Section (#faqs) */}
        <LandingFaq faqs={faqs} universityName={brand.name} brand={brand} />

        {/* 13. Footer Lead Form (#enroll-frm) */}
        <LandingFooterForm brand={brand} courses={courses} onOpenDisclaimer={() => handleOpenLegal("disclaimer")} />

        {/* 14. Compare Banner */}
        <LandingCompareBanner brand={brand} onOpenCompare={() => setIsCompareOpen(true)} />
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

