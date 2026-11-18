"use client";

import React, { useState } from "react";
import LiverpoolHeader from "./LiverpoolHeader";
import LiverpoolHero from "./LiverpoolHero";
import LiverpoolStats from "./LiverpoolStats";
import LiverpoolAbout from "./LiverpoolAbout";
import LiverpoolJourney from "./LiverpoolJourney";
import LiverpoolCertificates from "./LiverpoolCertificates";
import LiverpoolCourses from "./LiverpoolCourses";
import LiverpoolApprovals from "./LiverpoolApprovals";
import LiverpoolStandOut from "./LiverpoolStandOut";
import LiverpoolAboutSchool from "./LiverpoolAboutSchool";
import LiverpoolProcess from "./LiverpoolProcess";
import LiverpoolFaq from "./LiverpoolFaq";
import LiverpoolFooter from "./LiverpoolFooter";
import ScholarshipModal from "../../modals/ScholarshipModal";
import BrochureModal from "../../modals/BrochureModal";
import CompareModal from "../../modals/CompareModal";
import LegalModal from "../../modals/LegalModal";
import useAutoScrollForm from "../../useAutoScrollForm";

export default function LiverpoolLandingView() {
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Download Brochure");
  const [selectedCourse, setSelectedCourse] = useState("MBA in Business Analytics");
  const [legalModalState, setLegalModalState] = useState({
    isOpen: false,
    type: "disclaimer",
  });

  const coursesList = [
    { value: "MBA in Business Analytics", label: "MBA in Business Analytics" },
    { value: "MBA in Finance", label: "MBA in Finance" },
    { value: "MBA in Marketing", label: "MBA in Marketing" },
    { value: "MBA in Leadership", label: "MBA in Leadership" },
    { value: "MBA in Human Resource Management", label: "MBA in Human Resource Management" },
    { value: "MBA in Operations and Supply Chain Management", label: "MBA in Operations and Supply Chain Management" },
  ];

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
      !courseOrTitle.includes("Section") &&
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

  const handleOpenCompare = () => {
    setIsCompareOpen(true);
  };

  const handleOpenScholarship = () => {
    setIsScholarshipOpen(true);
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

  return (
    <div className="landing-page-root landing-page--liverpool w-full min-h-screen bg-white text-[#111111] font-sans antialiased">
      {/* 1. Header */}
      <LiverpoolHeader />

      {/* 2. Hero */}
      <LiverpoolHero
        onOpenBrochure={handleOpenBrochure}
        onLeadSuccess={() => {}}
      />

      {/* 3. Stats Strip */}
      <LiverpoolStats />

      {/* 4. About */}
      <LiverpoolAbout onOpenBrochure={handleOpenBrochure} />

      {/* 5. Program Journey */}
      <LiverpoolJourney onOpenCounseling={handleOpenApply} />

      {/* 6. Double Certification Edge */}
      <LiverpoolCertificates onOpenDegree={handleOpenApply} />

      {/* 7. Courses Offered */}
      <LiverpoolCourses
        onOpenApply={handleOpenApply}
        onOpenBrochure={handleOpenBrochure}
      />

      {/* 8. Approvals & Recognition */}
      <LiverpoolApprovals />

      {/* 9. What Makes Stand Out */}
      <LiverpoolStandOut />

      {/* 10. About Liverpool Business School */}
      <LiverpoolAboutSchool onOpenCallback={handleOpenApply} />

      {/* 11. Admission Process */}
      <LiverpoolProcess />

      {/* 12. FAQ */}
      <LiverpoolFaq />

      {/* 13. Footer */}
      <LiverpoolFooter
        onOpenScholarship={handleOpenScholarship}
        onOpenBrochure={handleOpenBrochure}
        onOpenLegal={handleOpenLegal}
        onOpenCompare={handleOpenCompare}
      />

      {/* Modals */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        universityName="Liverpool Business School"
        courses={coursesList}
        selectedCourse={selectedCourse}
        title={modalTitle}
        brand={{
          primaryColor: "#00408d",
          hero: { primaryColor: "#00408d" },
          slug: "liverpool",
          brochurePdf: "/assets/liverpool/main_brochure.pdf",
        }}
      />

      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        university="Liverpool Business School"
        courses={coursesList}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        currentUniversity="Liverpool Business School"
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={() => setLegalModalState((prev) => ({ ...prev, isOpen: false }))}
        type={legalModalState.type}
      />
    </div>
  );
}

