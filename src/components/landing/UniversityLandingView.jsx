"use client";

import React, { useState, useEffect } from "react";
import LandingNavbar from "./LandingNavbar";
import LandingHero from "./LandingHero";
import LandingApprovals from "./LandingApprovals";
import LandingProgrammes from "./LandingProgrammes";
import LandingAbout from "./LandingAbout";
import LandingStats from "./LandingStats";
import LandingWhyChoose from "./LandingWhyChoose";
import LandingAdmissionProcess from "./LandingAdmissionProcess";
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
    about = {},
    leader,
    whyChoose = [],
    admissionProcess,
    admissionSteps = [],
    faqs = [],
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

  const isSmu = slug === "smu" || brand.slug === "smu";

  return (
    <div className="landing-page-root min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-900 selection:text-white">
      <LandingNavbar
        brand={brand}
        onOpenApply={() => handleOpenApply()}
        onOpenBrochure={() => handleOpenBrochure()}
        onOpenScholarship={() => setIsScholarshipOpen(true)}
      />
      <main className="flex-1">
        <LandingHero brand={brand} courses={courses} onOpenBrochure={() => handleOpenBrochure()} onOpenApply={() => handleOpenApply()} onOpenDisclaimer={() => handleOpenLegal("disclaimer")} />
        <LandingApprovals approvals={approvals} universityName={brand.name} brand={brand} />
        <LandingProgrammes programmes={programmes} universityName={brand.name} brand={brand} onSelectCourseForBrochure={handleOpenBrochure} onOpenApply={handleOpenApply} />
        {isSmu && (
          <LandingWhyChoose whyChoose={whyChoose} brand={brand} onOpenApply={() => handleOpenApply()} />
        )}
        <LandingAbout about={about} brand={brand} leader={leader} onOpenApply={() => handleOpenApply()} />
        <LandingStats stats={stats} brand={{ ...brand, slug: brand.slug || slug }} />
        {!isSmu && (
          <LandingWhyChoose whyChoose={whyChoose} brand={brand} onOpenApply={() => handleOpenApply()} />
        )}
        <LandingAdmissionProcess
          admissionSteps={admissionSteps}
          admissionProcess={admissionProcess}
          universityName={brand.name}
          brand={{ ...brand, slug: brand.slug || slug }}
          onOpenApply={() => handleOpenApply()}
        />
        <LandingFaq faqs={faqs} universityName={brand.name} brand={{ ...brand, slug: brand.slug || slug }} />
        <LandingFooterForm brand={{ ...brand, slug: brand.slug || slug }} courses={courses} onOpenDisclaimer={() => handleOpenLegal("disclaimer")} />
        <LandingCompareBanner brand={{ ...brand, slug: brand.slug || slug }} onOpenCompare={() => setIsCompareOpen(true)} />
      </main>
      <LandingFooter brand={brand} onOpenDisclaimer={() => handleOpenLegal("disclaimer")} onOpenTerms={() => handleOpenLegal("terms")} onOpenPrivacy={() => handleOpenLegal("privacy")} />
      <LandingStickyCtas brand={brand} onOpenApply={() => handleOpenApply()} onOpenBrochure={() => handleOpenBrochure()} onOpenScholarship={() => setIsScholarshipOpen(true)} onOpenCompare={() => setIsCompareOpen(true)} />
      <BrochureModal isOpen={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} universityName={brand.name} courses={courses} selectedCourse={selectedCourse} onOpenDisclaimer={() => handleOpenLegal("disclaimer")} />
      <ScholarshipModal isOpen={isScholarshipOpen} onClose={() => setIsScholarshipOpen(false)} universityName={brand.name} courses={courses} brand={brand} onOpenDisclaimer={() => handleOpenLegal("disclaimer")} />
      <CompareModal isOpen={isCompareOpen} onClose={() => setIsCompareOpen(false)} universityName={brand.name} courses={courses} onOpenDisclaimer={() => handleOpenLegal("disclaimer")} />
      <LegalModal isOpen={legalModalState.isOpen} onClose={() => setLegalModalState({ isOpen: false, type: "disclaimer" })} type={legalModalState.type} brand={brand} />
    </div>
  );
}
