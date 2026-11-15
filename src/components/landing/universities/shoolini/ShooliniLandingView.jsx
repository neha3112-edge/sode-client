"use client";

import React, { useState } from "react";
import ShooliniHeader from "./ShooliniHeader";
import ShooliniHero from "./ShooliniHero";
import ShooliniApprovals from "./ShooliniApprovals";
import ShooliniProgrammes from "./ShooliniProgrammes";
import ShooliniAbout from "./ShooliniAbout";
import ShooliniWhyTrust from "./ShooliniWhyTrust";
import ShooliniRecruiters from "./ShooliniRecruiters";
import ShooliniProcess from "./ShooliniProcess";
import ShooliniFaq from "./ShooliniFaq";
import ShooliniFooter from "./ShooliniFooter";
import ScholarshipModal from "../../modals/ScholarshipModal";
import BrochureModal from "../../modals/BrochureModal";
import LegalModal from "../../modals/LegalModal";
import useAutoScrollForm from "../../useAutoScrollForm";
import { SHOOLINI_COURSES } from "./constants";

export default function ShooliniLandingView() {
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [legalModalState, setLegalModalState] = useState({
    isOpen: false,
    type: "disclaimer",
  });

  // Auto-open lead form at 45% scroll depth
  useAutoScrollForm(() => setIsBrochureOpen(true), 45);

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

  const shooliniBrand = {
    name: "Shoolini University Online",
    slug: "shoolini",
    primaryColor: "#fd202a",
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Header */}
      <ShooliniHeader onOpenScholarship={() => setIsScholarshipOpen(true)} />

      {/* 2. Hero Section */}
      <ShooliniHero
        onOpenBrochure={handleOpenBrochure}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />

      {/* 3. Recognitions & Accreditations Strip */}
      <ShooliniApprovals />

      {/* 4. Programmes (7 Courses) */}
      <ShooliniProgrammes
        onOpenBrochure={handleOpenBrochure}
        onOpenApply={() => handleOpenBrochure("Shoolini Apply Now")}
      />

      {/* 5. About & Pay After Placement */}
      <ShooliniAbout onOpenApply={() => handleOpenBrochure("About Shoolini Apply")} />

      {/* 6. Why Students Trust */}
      <ShooliniWhyTrust />

      {/* 7. Top Recruiters */}
      <ShooliniRecruiters />

      {/* 8. Admission Process (6 Steps) */}
      <ShooliniProcess />

      {/* 9. Frequently Asked Questions */}
      <ShooliniFaq />

      {/* 10. Footer Section */}
      <ShooliniFooter
        onOpenScholarship={() => setIsScholarshipOpen(true)}
        onOpenBrochure={handleOpenBrochure}
        onOpenLegal={handleOpenLegal}
        onOpenCompare={() => handleOpenBrochure("Compare Shoolini University")}
      />

      {/* Modals */}
      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        courses={SHOOLINI_COURSES}
        university="Shoolini University Online"
      />

      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        courses={SHOOLINI_COURSES}
        defaultCourse={selectedCourse}
        university="Shoolini University Online"
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={() => setLegalModalState((prev) => ({ ...prev, isOpen: false }))}
        type={legalModalState.type}
        brand={shooliniBrand}
      />
    </div>
  );
}

