"use client";

import React, { useState, useEffect } from "react";
import AmityNavbar from "./AmityNavbar";
import AmityHero from "./AmityHero";
import AmityApprovals from "./AmityApprovals";
import AmityProgrammes from "./AmityProgrammes";
import AmityAbout from "./AmityAbout";
import AmityStats from "./AmityStats";
import AmityWhyChoose from "./AmityWhyChoose";
import AmityAdmissionProcess from "./AmityAdmissionProcess";
import AmityFaq from "./AmityFaq";
import AmityFooterForm from "./AmityFooterForm";
import AmityFooter from "./AmityFooter";
import {
  AmityBrochureModal,
  AmityScholarshipModal,
  AmityCompareModal,
  AmityLegalModal,
} from "./AmityModals";
import AmityStickyCtas from "./AmityStickyCtas";

export default function AmityLandingView() {
  // Modal States
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("MBA");
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState({
    isOpen: false,
    type: "disclaimer",
  });

  // Mid-scroll auto-trigger for scholarship modal (once per session)
  useEffect(() => {
    let triggered = false;
    const handleScroll = () => {
      if (!triggered && window.scrollY > 1200) {
        triggered = true;
        const hasSeen = sessionStorage.getItem("amity_scholarship_seen");
        if (!hasSeen) {
          setIsScholarshipOpen(true);
          sessionStorage.setItem("amity_scholarship_seen", "true");
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenBrochure = (course = "MBA") => {
    setSelectedCourse(course);
    setIsBrochureOpen(true);
  };

  const handleOpenApply = (course = "MBA") => {
    // Scroll smoothly to hero form or open brochure modal
    setSelectedCourse(course);
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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-900 selection:text-white">
      {/* 1. Header / Navigation */}
      <AmityNavbar
        onOpenApply={() => handleOpenApply()}
        onOpenBrochure={() => handleOpenBrochure()}
      />

      {/* 2. Hero Section with Quick Lead Capture */}
      <main className="flex-1">
        <AmityHero
          onOpenBrochure={() => handleOpenBrochure()}
          onOpenApply={() => handleOpenApply()}
          onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
        />

        {/* 3. Approvals & Accreditations (UGC, NAAC A+, WES, QS, etc.) */}
        <AmityApprovals />

        {/* 4. Degree Programmes (PG & UG with tabs) */}
        <AmityProgrammes
          onSelectCourseForBrochure={(course) => handleOpenBrochure(course)}
          onOpenApply={(course) => handleOpenApply(course)}
        />

        {/* 5. Institutional Overview & Learning Model */}
        <AmityAbout onOpenApply={() => handleOpenApply()} />

        {/* 6. Key Statistics (30+ Years, 500+ Partners, 82K+ Learners) */}
        <AmityStats />

        {/* 7. Why Choose Amity Online */}
        <AmityWhyChoose onOpenApply={() => handleOpenApply()} />

        {/* 8. 6-Step Admission Workflow */}
        <AmityAdmissionProcess onOpenApply={() => handleOpenApply()} />

        {/* 9. Frequently Asked Questions */}
        <AmityFaq />

        {/* 10. Bottom Conversion Enquiry Form */}
        <AmityFooterForm
          onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
        />
      </main>

      {/* 11. Footer & Advisory Disclaimer */}
      <AmityFooter
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
        onOpenTerms={() => handleOpenLegal("terms")}
        onOpenPrivacy={() => handleOpenLegal("privacy")}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Sticky Bottom Actions & Floating Buttons */}
      <AmityStickyCtas
        onOpenApply={() => handleOpenApply()}
        onOpenBrochure={() => handleOpenBrochure()}
        onOpenScholarship={() => setIsScholarshipOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Modals & Popups */}
      <AmityBrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        selectedCourse={selectedCourse}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />

      <AmityScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />

      <AmityCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />

      <AmityLegalModal
        isOpen={legalModalState.isOpen}
        onClose={() => setLegalModalState({ isOpen: false, type: "disclaimer" })}
        type={legalModalState.type}
      />
    </div>
  );
}
