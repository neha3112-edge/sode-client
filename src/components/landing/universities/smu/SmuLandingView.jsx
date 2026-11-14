"use client";

import React, { useState } from "react";
import SmuHeader from "./SmuHeader";
import SmuHero from "./SmuHero";
import SmuApprovals from "./SmuApprovals";
import SmuProgrammes from "./SmuProgrammes";
import SmuAdvantages from "./SmuAdvantages";
import SmuAbout from "./SmuAbout";
import SmuLeader from "./SmuLeader";
import SmuStats from "./SmuStats";
import SmuProcess from "./SmuProcess";
import SmuFaq from "./SmuFaq";
import SmuGuidance from "./SmuGuidance";
import SmuFooter from "./SmuFooter";
import ScholarshipModal from "../../modals/ScholarshipModal";
import BrochureModal from "../../modals/BrochureModal";
import LegalModal from "../../modals/LegalModal";
import { SMU_COURSES } from "./constants";

export default function SmuLandingView() {
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

  const smuBrand = {
    name: "Sikkim Manipal University Online",
    slug: "smu",
    primaryColor: "#074a76",
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Header */}
      <SmuHeader onOpenScholarship={() => setIsScholarshipOpen(true)} />

      {/* 2. Hero Section */}
      <SmuHero
        onOpenBrochure={() => handleOpenBrochure()}
        onOpenApply={() => setIsBrochureOpen(true)}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />

      {/* 3. Rankings & Accreditations Carousel */}
      <SmuApprovals />

      {/* 4. Programs Offered Carousel */}
      <SmuProgrammes
        onOpenBrochure={handleOpenBrochure}
        onOpenApply={() => setIsBrochureOpen(true)}
      />

      {/* 5. Advantages Carousel */}
      <SmuAdvantages />

      {/* 6. Teal Banner About Section */}
      <SmuAbout />

      {/* 7. Visionary Leader Section */}
      <SmuLeader />

      {/* 8. Stats Strip */}
      <SmuStats />

      {/* 9. Admission Process 6 Cards */}
      <SmuProcess onOpenBrochure={handleOpenBrochure} />

      {/* 10. FAQ Accordion */}
      <SmuFaq />

      {/* 11. Get Expert Guidance & Free Counselling */}
      <SmuGuidance onOpenDisclaimer={() => handleOpenLegal("disclaimer")} />

      {/* 12. Footer Section */}
      <SmuFooter
        onOpenScholarship={() => setIsScholarshipOpen(true)}
        onOpenBrochure={handleOpenBrochure}
        onOpenLegal={handleOpenLegal}
      />

      {/* Modals */}
      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        universityName="Sikkim Manipal University Online"
        courses={SMU_COURSES}
        brand={smuBrand}
      />

      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        universityName="Sikkim Manipal University Online"
        courses={SMU_COURSES}
        brand={smuBrand}
        defaultCourse={selectedCourse}
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={() =>
          setLegalModalState({ isOpen: false, type: "disclaimer" })
        }
        type={legalModalState.type}
        brand={smuBrand}
      />
    </div>
  );
}

