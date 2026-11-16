"use client";

import React, { useState } from "react";
import GalgotiasHeader from "./GalgotiasHeader";
import GalgotiasHero from "./GalgotiasHero";
import GalgotiasApprovals from "./GalgotiasApprovals";
import GalgotiasProgrammes from "./GalgotiasProgrammes";
import GalgotiasAbout from "./GalgotiasAbout";
import GalgotiasWhyChoose from "./GalgotiasWhyChoose";
import GalgotiasDegree from "./GalgotiasDegree";
import GalgotiasRecruiters from "./GalgotiasRecruiters";
import GalgotiasProcess from "./GalgotiasProcess";
import GalgotiasFaq from "./GalgotiasFaq";
import GalgotiasFooter from "./GalgotiasFooter";
import ScholarshipModal from "../../modals/ScholarshipModal";
import BrochureModal from "../../modals/BrochureModal";
import LegalModal from "../../modals/LegalModal";
import useAutoScrollForm from "../../useAutoScrollForm";
import { GALGOTIAS_COURSES } from "./constants";

export default function GalgotiasLandingView() {
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
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
    if (typeof courseOrTitle === "string" && !courseOrTitle.includes("Download") && !courseOrTitle.includes("Apply") && !courseOrTitle.includes("Click") && !courseOrTitle.includes("Hero") && !courseOrTitle.includes("Sticky")) {
      setSelectedCourse(courseOrTitle);
    }
    setModalTitle(actionTitle || "Download Brochure");
    setIsBrochureOpen(true);
  };

  const handleOpenApply = (courseOrTitle, actionTitle = "Apply Now") => {
    if (typeof courseOrTitle === "string" && !courseOrTitle.includes("Apply") && !courseOrTitle.includes("Section")) {
      setSelectedCourse(courseOrTitle);
    }
    setModalTitle(actionTitle || "Apply Now");
    setIsBrochureOpen(true);
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

  const galgotiasBrand = {
    name: "Galgotias University Online",
    slug: "galgotias",
    source: "Galgotias",
    primaryColor: "#bc1820",
    themeBg: "bg-[#bc1820]",
    themeBorder: "border-[#bc1820]",
    courses: GALGOTIAS_COURSES,
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans text-neutral-900">
      {/* 1. Header */}
      <GalgotiasHeader onOpenScholarship={() => setIsScholarshipOpen(true)} />

      {/* 2. Hero Section */}
      <GalgotiasHero
        onOpenBrochure={handleOpenBrochure}
        onOpenScholarship={() => setIsScholarshipOpen(true)}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />

      {/* 3. Accreditations & Approvals Strip */}
      <GalgotiasApprovals />

      {/* 4. Programmes (6 Courses) & Campus Banner */}
      <GalgotiasProgrammes
        onOpenBrochure={handleOpenBrochure}
        onOpenApply={handleOpenApply}
      />

      {/* 5. About Galgotias University Online */}
      <GalgotiasAbout onOpenApply={() => handleOpenApply("About Section")} />

      {/* 6. Why Choose Galgotias University Online */}
      <GalgotiasWhyChoose />

      {/* 7. Sample Degree */}
      <GalgotiasDegree onOpenApply={() => handleOpenApply("Sample Degree Section")} />

      {/* 8. Top Hiring Partners */}
      <GalgotiasRecruiters />

      {/* 9. Admission Process (6 Steps) */}
      <GalgotiasProcess />

      {/* 10. Frequently Asked Questions */}
      <GalgotiasFaq />

      {/* 11. Footer Section */}
      <GalgotiasFooter
        onOpenScholarship={() => setIsScholarshipOpen(true)}
        onOpenBrochure={handleOpenBrochure}
        onOpenLegal={handleOpenLegal}
        onOpenCompare={() => handleOpenApply("Compare Galgotias University")}
      />

      {/* Global Modals */}
      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        universityName="Galgotias University Online"
        courses={GALGOTIAS_COURSES}
        selectedCourse={selectedCourse}
        brand={galgotiasBrand}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />

      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        universityName="Galgotias University Online"
        courses={GALGOTIAS_COURSES}
        selectedCourse={selectedCourse}
        title={modalTitle}
        buttonText={modalTitle.includes("Apply") ? "Apply Now" : "Download Brochure"}
        brand={galgotiasBrand}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={() => setLegalModalState({ isOpen: false, type: "disclaimer" })}
        initialType={legalModalState.type}
      />
    </div>
  );
}

