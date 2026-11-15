"use client";

import React, { useState } from "react";
import VguHeader from "./VguHeader";
import VguHero from "./VguHero";
import VguApprovals from "./VguApprovals";
import VguProgrammes from "./VguProgrammes";
import VguAbout from "./VguAbout";
import VguWhyChoose from "./VguWhyChoose";
import VguDegree from "./VguDegree";
import VguRecruiters from "./VguRecruiters";
import VguProcess from "./VguProcess";
import VguFaq from "./VguFaq";
import VguFooter from "./VguFooter";
import ScholarshipModal from "../../modals/ScholarshipModal";
import BrochureModal from "../../modals/BrochureModal";
import LegalModal from "../../modals/LegalModal";
import { VGU_COURSES } from "./constants";

export default function VguLandingView() {
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [legalModalState, setLegalModalState] = useState({
    isOpen: false,
    type: "disclaimer",
  });

  const handleOpenBrochure = (courseCode) => {
    if (typeof courseCode === "string") {
      setSelectedCourse(courseCode);
    }
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

  const vguBrand = {
    name: "Vivekananda Global University Online",
    slug: "vgu",
    primaryColor: "#811811",
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Header */}
      <VguHeader onOpenScholarship={() => setIsScholarshipOpen(true)} />

      {/* 2. Hero Section */}
      <VguHero
        onOpenBrochure={handleOpenBrochure}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />

      {/* 3. Approvals Strip */}
      <VguApprovals onOpenApply={() => handleOpenBrochure("VGU Admissions")} />

      {/* 4. Programs Offered */}
      <VguProgrammes
        onOpenBrochure={handleOpenBrochure}
        onOpenApply={() => handleOpenBrochure("VGU Course Apply")}
      />

      {/* 5. About Section */}
      <VguAbout onOpenApply={() => handleOpenBrochure("About VGU Apply")} />

      {/* 6. Why Choose VGU */}
      <VguWhyChoose />

      {/* 7. Degree Section */}
      <VguDegree onOpenApply={() => handleOpenBrochure("VGU Degree Enquire")} />

      {/* 8. Top Recruiters Placement Partners */}
      <VguRecruiters />

      {/* 9. Admission Process */}
      <VguProcess />

      {/* 10. Frequently Asked Questions */}
      <VguFaq />

      {/* 11. Footer Section */}
      <VguFooter
        onOpenScholarship={() => setIsScholarshipOpen(true)}
        onOpenBrochure={handleOpenBrochure}
        onOpenLegal={handleOpenLegal}
        onOpenCompare={() => handleOpenBrochure("Compare VGU")}
      />

      {/* Modals */}
      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        universityName="Vivekananda Global University Online"
        courses={VGU_COURSES}
        brand={vguBrand}
      />

      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        universityName="Vivekananda Global University Online"
        courses={VGU_COURSES}
        brand={vguBrand}
        defaultCourse={selectedCourse}
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={() => setLegalModalState({ isOpen: false, type: "disclaimer" })}
        type={legalModalState.type}
        brand={vguBrand}
      />
    </div>
  );
}

