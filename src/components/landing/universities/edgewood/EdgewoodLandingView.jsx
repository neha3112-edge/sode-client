"use client";

import React, { useState } from "react";
import EdgewoodHeader from "./EdgewoodHeader";
import EdgewoodHero from "./EdgewoodHero";
import EdgewoodStats from "./EdgewoodStats";
import EdgewoodCourses from "./EdgewoodCourses";
import EdgewoodAbout from "./EdgewoodAbout";
import EdgewoodAccreditations from "./EdgewoodAccreditations";
import EdgewoodSpecializations from "./EdgewoodSpecializations";
import EdgewoodOutcomes from "./EdgewoodOutcomes";
import EdgewoodCertification from "./EdgewoodCertification";
import EdgewoodProcess from "./EdgewoodProcess";
import EdgewoodFaq from "./EdgewoodFaq";
import EdgewoodFooter from "./EdgewoodFooter";
import ScholarshipModal from "../../modals/ScholarshipModal";
import BrochureModal from "../../modals/BrochureModal";
import LegalModal from "../../modals/LegalModal";
import useAutoScrollForm from "../../useAutoScrollForm";
import { EDGEWOOD_COURSES } from "./constants";

export default function EdgewoodLandingView() {
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

  const edgewoodBrand = {
    name: "Edgewood University Online",
    slug: "edgewood",
    source: "Edgewood",
    primaryColor: "#b2171e",
    themeBg: "bg-[#b2171e]",
    themeBorder: "border-[#b2171e]",
    courses: EDGEWOOD_COURSES,
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans text-neutral-900 overflow-x-hidden">
      {/* 1. Header with SODE logo and Navigation */}
      <EdgewoodHeader />

      {/* 2. Hero Section */}
      <EdgewoodHero
        onOpenBrochure={handleOpenBrochure}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />

      {/* 3. Solid Red Stats Strip */}
      <EdgewoodStats />

      {/* 4. Courses Offered (DBA & MBA+DBA) */}
      <EdgewoodCourses
        onOpenBrochure={handleOpenBrochure}
        onOpenApply={handleOpenApply}
      />

      {/* 5. About Edgewood University Online */}
      <EdgewoodAbout onOpenApply={() => handleOpenApply("About Section")} />

      {/* 6. Accreditations (HLC, WES, ACBSP) */}
      <EdgewoodAccreditations />

      {/* 7. Specializations Tabs (DBA / MBA+DBA) */}
      <EdgewoodSpecializations onOpenApply={handleOpenApply} />

      {/* 8. Learning Outcomes (Solid Red Strip) */}
      <EdgewoodOutcomes />

      {/* 9. Sample Certification (PwC + Edgewood) */}
      <EdgewoodCertification onOpenApply={handleOpenApply} />

      {/* 10. Admission Process (6 Steps Full-Width) */}
      <EdgewoodProcess />

      {/* 11. FAQ Section */}
      <EdgewoodFaq />

      {/* 12. Footer Section */}
      <EdgewoodFooter
        onOpenScholarship={() => setIsScholarshipOpen(true)}
        onOpenBrochure={handleOpenBrochure}
        onOpenLegal={handleOpenLegal}
        onOpenCompare={() => handleOpenApply("Compare Edgewood University")}
      />

      {/* Global Modals */}
      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        universityName="Edgewood University Online"
        courses={EDGEWOOD_COURSES}
        selectedCourse={selectedCourse}
        brand={edgewoodBrand}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />

      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        universityName="Edgewood University Online"
        courses={EDGEWOOD_COURSES}
        selectedCourse={selectedCourse}
        title={modalTitle}
        buttonText={modalTitle.includes("Apply") ? "Apply Now" : "Download Brochure"}
        brand={edgewoodBrand}
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

