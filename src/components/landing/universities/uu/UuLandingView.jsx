"use client";

import React, { useState } from "react";
import UuHeader from "./UuHeader";
import UuHero from "./UuHero";
import UuProgrammes from "./UuProgrammes";
import UuApprovals from "./UuApprovals";
import UuBenefits from "./UuBenefits";
import UuAbout from "./UuAbout";
import UuWhyChoose from "./UuWhyChoose";
import UuDegree from "./UuDegree";
import UuProcess from "./UuProcess";
import UuFaq from "./UuFaq";
import UuFooter from "./UuFooter";
import ScholarshipModal from "../../modals/ScholarshipModal";
import BrochureModal from "../../modals/BrochureModal";
import LegalModal from "../../modals/LegalModal";
import useAutoScrollForm from "../../useAutoScrollForm";
import { UU_COURSES } from "./constants";

export default function UuLandingView() {
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

  const uuBrand = {
    name: "Uttaranchal University Online",
    slug: "uu",
    primaryColor: "#003399",
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Header */}
      <UuHeader onOpenScholarship={() => setIsScholarshipOpen(true)} />

      {/* 2. Hero Section */}
      <UuHero
        onOpenBrochure={handleOpenBrochure}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />

      {/* 3. Programmes (UG & PG) */}
      <UuProgrammes
        onOpenBrochure={handleOpenBrochure}
        onOpenApply={() => handleOpenBrochure("UU Course Apply")}
      />

      {/* 4. Approvals & Recognition */}
      <UuApprovals />

      {/* 5. Benefits / Advantage (Deep Blue Section) */}
      <UuBenefits onOpenApply={() => handleOpenBrochure("UU Benefits Apply")} />

      {/* 6. About Section */}
      <UuAbout onOpenApply={() => handleOpenBrochure("About UU Apply")} />

      {/* 7. Why Choose UU */}
      <UuWhyChoose />

      {/* 8. UGC Approved Degree Section */}
      <UuDegree onOpenApply={() => handleOpenBrochure("UU Degree Enquire")} />

      {/* 9. Admission Process */}
      <UuProcess />

      {/* 10. Frequently Asked Questions */}
      <UuFaq />

      {/* 11. Footer Section */}
      <UuFooter
        onOpenScholarship={() => setIsScholarshipOpen(true)}
        onOpenBrochure={handleOpenBrochure}
        onOpenLegal={handleOpenLegal}
        onOpenCompare={() => handleOpenBrochure("Compare UU")}
      />

      {/* Modals */}
      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        universityName="Uttaranchal University Online"
        courses={UU_COURSES}
        brand={uuBrand}
      />

      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        universityName="Uttaranchal University Online"
        courses={UU_COURSES}
        brand={uuBrand}
        defaultCourse={selectedCourse}
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={() => setLegalModalState({ isOpen: false, type: "disclaimer" })}
        type={legalModalState.type}
        brand={uuBrand}
      />
    </div>
  );
}

