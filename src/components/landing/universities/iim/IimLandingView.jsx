"use client";

import React, { useState } from "react";
import IimHeader from "./IimHeader";
import IimHero from "./IimHero";
import IimStats from "./IimStats";
import IimOverview from "./IimOverview";
import IimKeySkills from "./IimKeySkills";
import IimTools from "./IimTools";
import IimAbout from "./IimAbout";
import IimEligibility from "./IimEligibility";
import IimDegree from "./IimDegree";
import IimPlacements from "./IimPlacements";
import IimProcess from "./IimProcess";
import IimFaq from "./IimFaq";
import IimFooter from "./IimFooter";
import ScholarshipModal from "../../modals/ScholarshipModal";
import BrochureModal from "../../modals/BrochureModal";
import CompareModal from "../../modals/CompareModal";
import LegalModal from "../../modals/LegalModal";
import useAutoScrollForm from "../../useAutoScrollForm";

export default function IimLandingView() {
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Download Brochure");
  const [selectedCourse, setSelectedCourse] = useState("HR & Analytics");
  const [legalModalState, setLegalModalState] = useState({
    isOpen: false,
    type: "disclaimer",
  });

  const coursesList = [{ value: "HR & Analytics", label: "HR & Analytics" }];

  // Auto-open lead form at 45% scroll depth
  useAutoScrollForm(() => {
    setModalTitle("Download Brochure");
    setIsBrochureOpen(true);
  }, 45);

  const handleOpenBrochure = (_source, actionTitle = "Download Brochure") => {
    setModalTitle(actionTitle || "Download Brochure");
    setSelectedCourse("HR & Analytics");
    setIsBrochureOpen(true);
  };

  const handleOpenApply = (_source, actionTitle = "Apply Now") => {
    setModalTitle(actionTitle || "Apply Now");
    setSelectedCourse("HR & Analytics");
    setIsBrochureOpen(true);
  };

  const handleOpenCompare = () => {
    setIsCompareOpen(true);
  };

  const handleOpenScholarship = () => {
    setIsScholarshipOpen(true);
  };

  const handleOpenLegal = (type) => {
    const normalized =
      type === "Terms & Conditions" || type === "terms"
        ? "terms"
        : type === "Privacy Policy" || type === "privacy"
        ? "privacy"
        : "disclaimer";
    setLegalModalState({
      isOpen: true,
      type: normalized,
    });
  };

  return (
    <div className="landing-page-root landing-page--iim w-full min-h-screen bg-white text-[#111111] font-sans antialiased">
      {/* 1. Header */}
      <IimHeader />

      {/* 2. Hero */}
      <IimHero
        onOpenBrochure={handleOpenBrochure}
        onLeadSuccess={() => {}}
      />

      {/* 3. Stats Bar */}
      <IimStats />

      {/* 4. Overview */}
      <IimOverview />

      {/* 5. Key Skills */}
      <IimKeySkills />

      {/* 6. Tools & Technologies */}
      <IimTools />

      {/* 7. About IIM Kozhikode & Accreditations */}
      <IimAbout />

      {/* 8. Eligibility */}
      <IimEligibility onOpenApply={handleOpenApply} />

      {/* 9. Sample Degree */}
      <IimDegree onOpenBrochure={handleOpenBrochure} />

      {/* 10. Placement Partners */}
      <IimPlacements />

      {/* 11. Admission Process */}
      <IimProcess />

      {/* 12. FAQs */}
      <IimFaq />

      {/* 13. Footer */}
      <IimFooter
        onOpenScholarship={handleOpenScholarship}
        onOpenBrochure={handleOpenBrochure}
        onOpenLegal={handleOpenLegal}
        onOpenCompare={handleOpenCompare}
      />

      {/* Modals */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        universityName="IIM Kozhikode"
        courses={coursesList}
        selectedCourse={selectedCourse || "HR & Analytics"}
        title={modalTitle}
        brand={{
          primaryColor: "#17479E",
          hero: { primaryColor: "#17479E" },
          slug: "iim",
          brochurePdf: "/assets/iim/main_brochure.pdf",
        }}
      />

      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        university="IIM Kozhikode"
        courses={coursesList}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        currentUniversity="IIM Kozhikode"
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={() => setLegalModalState((prev) => ({ ...prev, isOpen: false }))}
        type={legalModalState.type}
      />
    </div>
  );
}
