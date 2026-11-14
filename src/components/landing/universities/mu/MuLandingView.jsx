"use client";

import React, { useState } from "react";
import MuHeader from "./MuHeader";
import MuHero from "./MuHero";
import MuApprovals from "./MuApprovals";
import MuProgrammes from "./MuProgrammes";
import MuAbout from "./MuAbout";
import MuAdvantages from "./MuAdvantages";
import MuPlacement from "./MuPlacement";
import MuProcess from "./MuProcess";
import MuFaq from "./MuFaq";
import MuFooter from "./MuFooter";
import ScholarshipModal from "../../modals/ScholarshipModal";
import BrochureModal from "../../modals/BrochureModal";
import LegalModal from "../../modals/LegalModal";
import { MU_COURSES } from "./constants";

export default function MuLandingView() {
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

  const muBrand = {
    name: "Mangalayatan University Online",
    slug: "mu",
    primaryColor: "#193579",
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Header */}
      <MuHeader onOpenScholarship={() => setIsScholarshipOpen(true)} />

      {/* 2. Hero Section */}
      <MuHero
        onOpenBrochure={handleOpenBrochure}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />

      {/* 3. Approvals & Recognition */}
      <MuApprovals />

      {/* 4. Programs Offered */}
      <MuProgrammes
        onOpenBrochure={handleOpenBrochure}
        onOpenApply={() => setIsBrochureOpen(true)}
      />

      {/* 5. About Section */}
      <MuAbout onOpenApply={() => setIsBrochureOpen(true)} />

      {/* 6. Why Choose Advantages */}
      <MuAdvantages />

      {/* 7. Hiring Partners Placement */}
      <MuPlacement />

      {/* 8. Admission Process 6 Cards */}
      <MuProcess />

      {/* 9. FAQ Accordion */}
      <MuFaq />

      {/* 10. Footer Section */}
      <MuFooter
        onOpenScholarship={() => setIsScholarshipOpen(true)}
        onOpenBrochure={handleOpenBrochure}
        onOpenLegal={handleOpenLegal}
      />

      {/* Modals */}
      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        universityName="Mangalayatan University Online"
        courses={MU_COURSES}
        brand={muBrand}
      />

      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        universityName="Mangalayatan University Online"
        courses={MU_COURSES}
        brand={muBrand}
        defaultCourse={selectedCourse}
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={() =>
          setLegalModalState({ isOpen: false, type: "disclaimer" })
        }
        type={legalModalState.type}
        brand={muBrand}
      />
    </div>
  );
}

