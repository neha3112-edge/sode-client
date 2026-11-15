"use client";

import React, { useState } from "react";
import CuHeader from "./CuHeader";
import CuHero from "./CuHero";
import CuStats from "./CuStats";
import CuProgrammes from "./CuProgrammes";
import CuWhyChoose from "./CuWhyChoose";
import CuAbout from "./CuAbout";
import CuApprovals from "./CuApprovals";
import CuDegree from "./CuDegree";
import CuProcess from "./CuProcess";
import CuFaq from "./CuFaq";
import CuFooter from "./CuFooter";
import ScholarshipModal from "../../modals/ScholarshipModal";
import BrochureModal from "../../modals/BrochureModal";
import LegalModal from "../../modals/LegalModal";
import useAutoScrollForm from "../../useAutoScrollForm";
import { CU_COURSES } from "./constants";

export default function CuLandingView() {
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [legalModalState, setLegalModalState] = useState({
    isOpen: false,
    type: "disclaimer",
  });

  // Auto-open enquiry form at 45% scroll depth
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

  const cuBrand = {
    name: "Chandigarh University Online",
    slug: "cu",
    primaryColor: "#d11c1f",
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Header */}
      <CuHeader onOpenScholarship={() => setIsScholarshipOpen(true)} />

      {/* 2. Hero Section */}
      <CuHero
        onOpenBrochure={handleOpenBrochure}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
        onOpenScholarship={() => setIsScholarshipOpen(true)}
      />

      {/* 3. Stats Bar */}
      <CuStats />

      {/* 4. Programs Offered */}
      <CuProgrammes onOpenBrochure={handleOpenBrochure} />

      {/* 5. Why Choose CU */}
      <CuWhyChoose />

      {/* 6. About Section */}
      <CuAbout onOpenApply={() => setIsBrochureOpen(true)} />

      {/* 7. Approvals & Recognition */}
      <CuApprovals />

      {/* 8. Degree Section */}
      <CuDegree onOpenApply={() => setIsBrochureOpen(true)} />

      {/* 9. Admission Process */}
      <CuProcess />

      {/* 10. FAQ Accordion */}
      <CuFaq />

      {/* 11. Footer Section */}
      <CuFooter
        onOpenScholarship={() => setIsScholarshipOpen(true)}
        onOpenBrochure={handleOpenBrochure}
        onOpenLegal={handleOpenLegal}
      />

      {/* Modals */}
      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        universityName="Chandigarh University Online"
        courses={CU_COURSES}
        brand={cuBrand}
      />

      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        universityName="Chandigarh University Online"
        courses={CU_COURSES}
        brand={cuBrand}
        defaultCourse={selectedCourse}
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={() => setLegalModalState({ isOpen: false, type: "disclaimer" })}
        type={legalModalState.type}
        brand={cuBrand}
      />
    </div>
  );
}

