"use client";

import React, { useState } from "react";
import IiitbHeader from "./IiitbHeader";
import IiitbHero from "./IiitbHero";
import IiitbApprovals from "./IiitbApprovals";
import IiitbCourses from "./IiitbCourses";
import IiitbAbout from "./IiitbAbout";
import IiitbWhyChoose from "./IiitbWhyChoose";
import IiitbStats from "./IiitbStats";
import IiitbDegree from "./IiitbDegree";
import IiitbProcess from "./IiitbProcess";
import IiitbFaq from "./IiitbFaq";
import IiitbNeedClarification from "./IiitbNeedClarification";
import IiitbFooter from "./IiitbFooter";
import ScholarshipModal from "../../modals/ScholarshipModal";
import BrochureModal from "../../modals/BrochureModal";
import CompareModal from "../../modals/CompareModal";
import LegalModal from "../../modals/LegalModal";
import useAutoScrollForm from "../../useAutoScrollForm";
import { IIITB_COURSES } from "./constants";

export default function IiitbLandingView() {
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
      !courseOrTitle.includes("Section") &&
      !courseOrTitle.includes("Need")
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
    slug: "iiitb",
    name: "IIIT Bangalore Online",
    shortName: "IIIT Bangalore",
    source: "IIITB",
    primaryColor: "#01519a",
    themeBg: "bg-[#01519a]",
    themeBorder: "border-[#01519a]",
    courses: IIITB_COURSES,
  };

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900 flex flex-col font-sans select-none">
      {/* 1. Header (Sticky) */}
      <IiitbHeader />

      {/* 2. Hero Section */}
      <IiitbHero
        onOpenBrochure={handleOpenBrochure}
        onOpenDisclaimer={() => handleOpenLegal("Disclaimer")}
      />

      {/* 3. Approvals & Accreditation */}
      <IiitbApprovals />

      {/* 4. Courses Offered */}
      <IiitbCourses
        onOpenBrochure={handleOpenBrochure}
        onOpenApply={handleOpenApply}
      />

      {/* 5. About Section */}
      <IiitbAbout
        onOpenBrochure={handleOpenBrochure}
        onOpenApply={handleOpenApply}
      />

      {/* 6. Why Choose */}
      <IiitbWhyChoose />

      {/* 7. Stats Strip */}
      <IiitbStats />

      {/* 8. Sample Degree Certificate */}
      <IiitbDegree onOpenBrochure={handleOpenBrochure} />

      {/* 9. Admission Process */}
      <IiitbProcess />

      {/* 10. FAQ Section */}
      <IiitbFaq />

      {/* 11. Need Clarification CTA Strip */}
      <IiitbNeedClarification onOpenApply={handleOpenApply} />

      {/* 12. Footer & Sticky Action Bars */}
      <IiitbFooter
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
        courses={IIITB_COURSES}
        primaryColor={brand.primaryColor}
        brandName={brand.name}
      />

      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        courses={IIITB_COURSES}
        primaryColor={brand.primaryColor}
        brandName={brand.name}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        currentUniversity="IIIT Bangalore"
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

