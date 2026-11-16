"use client";

import React, { useState } from "react";
import EsgciHeader from "./EsgciHeader";
import EsgciHero from "./EsgciHero";
import EsgciStats from "./EsgciStats";
import EsgciOverview from "./EsgciOverview";
import EsgciWhoCanApply from "./EsgciWhoCanApply";
import EsgciAdvantages from "./EsgciAdvantages";
import EsgciDegree from "./EsgciDegree";
import EsgciApprovals from "./EsgciApprovals";
import EsgciAbout from "./EsgciAbout";
import EsgciWhyChoose from "./EsgciWhyChoose";
import EsgciProcess from "./EsgciProcess";
import EsgciFaq from "./EsgciFaq";
import EsgciFooter from "./EsgciFooter";
import ScholarshipModal from "../../modals/ScholarshipModal";
import BrochureModal from "../../modals/BrochureModal";
import CompareModal from "../../modals/CompareModal";
import LegalModal from "../../modals/LegalModal";
import useAutoScrollForm from "../../useAutoScrollForm";
import { ESGCI_COURSES } from "./constants";

export default function EsgciLandingView() {
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Download Brochure");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [legalModalState, setLegalModalState] = useState({
    isOpen: false,
    type: "disclaimer",
  });

  // Auto-open lead form at 45% scroll depth
  useAutoScrollForm(() => {
    setModalTitle("Download Brochure");
    setIsBrochureOpen(true);
  }, 45);

  const handleOpenBrochure = (courseOrTitle, actionTitle = "Download Brochure") => {
    if (
      typeof courseOrTitle === "string" &&
      !courseOrTitle.includes("Download") &&
      !courseOrTitle.includes("Apply") &&
      !courseOrTitle.includes("Click") &&
      !courseOrTitle.includes("Hero") &&
      !courseOrTitle.includes("Sticky")
    ) {
      setSelectedCourse(courseOrTitle);
    }
    setModalTitle(actionTitle || "Download Brochure");
    setIsBrochureOpen(true);
  };

  const handleOpenApply = (courseOrTitle, actionTitle = "Apply Now") => {
    if (
      typeof courseOrTitle === "string" &&
      !courseOrTitle.includes("Apply") &&
      !courseOrTitle.includes("Section")
    ) {
      setSelectedCourse(courseOrTitle);
    }
    setModalTitle(actionTitle || "Apply Now");
    setIsBrochureOpen(true);
  };

  const handleOpenLegal = (type) => {
    setLegalModalState({
      isOpen: true,
      type: type.toLowerCase().includes("privacy")
        ? "privacy"
        : type.toLowerCase().includes("terms")
        ? "terms"
        : "disclaimer",
    });
  };

  const brand = {
    slug: "esgci",
    name: "ESGCI Online",
    shortName: "ESGCI",
    source: "ESGCI",
    primaryColor: "#04903c",
    themeBg: "bg-[#04903c]",
    themeBorder: "border-[#04903c]",
    courses: ESGCI_COURSES,
  };

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900 flex flex-col font-sans select-none">
      {/* 1. Header (Sticky) */}
      <EsgciHeader />

      {/* 2. Hero Section */}
      <EsgciHero
        onOpenBrochure={handleOpenBrochure}
        onOpenDisclaimer={() => handleOpenLegal("Disclaimer")}
      />

      {/* 3. Black Achievement Bar */}
      <EsgciStats />

      {/* 4. Overview Section */}
      <EsgciOverview onOpenBrochure={handleOpenBrochure} />

      {/* 5. Who Can Apply */}
      <EsgciWhoCanApply onOpenApply={handleOpenApply} />

      {/* 6. Professional Advantages */}
      <EsgciAdvantages onOpenBrochure={handleOpenBrochure} />

      {/* 7. Degree Sample */}
      <EsgciDegree onOpenBrochure={handleOpenBrochure} />

      {/* 8. Approvals & Accreditation */}
      <EsgciApprovals />

      {/* 9. About Us */}
      <EsgciAbout onOpenScholarship={() => setIsScholarshipOpen(true)} />

      {/* 10. Why Choose ESGCI */}
      <EsgciWhyChoose onOpenApply={handleOpenApply} />

      {/* 11. Admission Process (Full-Width) */}
      <EsgciProcess />

      {/* 12. FAQ */}
      <EsgciFaq />

      {/* 13. Footer & Sticky Action Bars */}
      <EsgciFooter
        onOpenScholarship={() => setIsScholarshipOpen(true)}
        onOpenBrochure={handleOpenBrochure}
        onOpenLegal={handleOpenLegal}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Modals */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        universityName="ESGCI Online"
        courses={ESGCI_COURSES}
        selectedCourse={selectedCourse}
        title={modalTitle}
        brand={brand}
        onOpenDisclaimer={() => handleOpenLegal("Disclaimer")}
      />

      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        universityName="ESGCI Online"
        courses={ESGCI_COURSES}
        brand={brand}
        onOpenDisclaimer={() => handleOpenLegal("Disclaimer")}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        universityName="ESCGI Online University"
        courses={ESGCI_COURSES}
        selectedCourse={selectedCourse}
        brand={brand}
        onOpenDisclaimer={() => handleOpenLegal("Disclaimer")}
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={() => setLegalModalState((prev) => ({ ...prev, isOpen: false }))}
        type={legalModalState.type}
        primaryColor="#04903c"
      />
    </div>
  );
}

