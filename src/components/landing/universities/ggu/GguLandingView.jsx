"use client";

import React, { useState } from "react";
import GguHeader from "./GguHeader";
import GguHero from "./GguHero";
import GguCourses from "./GguCourses";
import GguSpecializations from "./GguSpecializations";
import GguAbout from "./GguAbout";
import GguApprovals from "./GguApprovals";
import GguDegree from "./GguDegree";
import GguOutcomes from "./GguOutcomes";
import GguStats from "./GguStats";
import GguProcess from "./GguProcess";
import GguFaq from "./GguFaq";
import GguFooter from "./GguFooter";
import ScholarshipModal from "../../modals/ScholarshipModal";
import BrochureModal from "../../modals/BrochureModal";
import CompareModal from "../../modals/CompareModal";
import LegalModal from "../../modals/LegalModal";
import useAutoScrollForm from "../../useAutoScrollForm";
import { GGU_COURSES_DROPDOWN } from "./constants";

export default function GguLandingView() {
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
    slug: "ggu",
    name: "Golden Gate University Online",
    shortName: "GGU",
    source: "GGU",
    primaryColor: "#003468",
    accentColor: "#DC520A",
    themeBg: "bg-[#003468]",
    themeBorder: "border-[#003468]",
    courses: GGU_COURSES_DROPDOWN,
  };

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900 flex flex-col font-sans select-none">
      {/* 1. Header (Sticky) */}
      <GguHeader />

      {/* 2. Hero Section */}
      <GguHero
        onOpenBrochure={handleOpenBrochure}
        onOpenDisclaimer={() => handleOpenLegal("Disclaimer")}
      />

      {/* 3. Courses Offered (MBA & DBA Cards) */}
      <GguCourses
        onOpenBrochure={handleOpenBrochure}
        onOpenApply={handleOpenApply}
      />

      {/* 4. Specializations (DBA & MBA Tabs) */}
      <GguSpecializations onOpenApply={handleOpenApply} />

      {/* 5. About Us */}
      <GguAbout onOpenScholarship={() => setIsScholarshipOpen(true)} />

      {/* 6. Accreditations & Associations */}
      <GguApprovals />

      {/* 7. Degree Sample (Advance Your Career) */}
      <GguDegree onOpenBrochure={handleOpenBrochure} />

      {/* 8. Learning Outcomes */}
      <GguOutcomes />

      {/* 9. Stats Bar (Navy Blue) */}
      <GguStats />

      {/* 10. Admission Process */}
      <GguProcess />

      {/* 11. FAQ Section */}
      <GguFaq />

      {/* 12. Footer & Sticky Action Bars */}
      <GguFooter
        onOpenScholarship={() => setIsScholarshipOpen(true)}
        onOpenBrochure={handleOpenBrochure}
        onOpenLegal={handleOpenLegal}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Modals */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        title={modalTitle}
        initialCourse={selectedCourse}
        courses={GGU_COURSES_DROPDOWN}
        primaryColor={brand.primaryColor}
        brandName={brand.name}
      />

      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        courses={GGU_COURSES_DROPDOWN}
        primaryColor={brand.primaryColor}
        brandName={brand.name}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        currentUniversity="Golden Gate University"
        primaryColor={brand.primaryColor}
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={() => setLegalModalState((prev) => ({ ...prev, isOpen: false }))}
        type={legalModalState.type}
      />
    </div>
  );
}

