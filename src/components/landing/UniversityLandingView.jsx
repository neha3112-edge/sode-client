"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import LandingNavbar, { LandingSubNav } from "./LandingNavbar";
import LandingHero from "./LandingHero";
import LandingApprovals from "./LandingApprovals";
import LandingWhyChoose from "./LandingWhyChoose";
import LandingProgrammes from "./LandingProgrammes";
import LandingOffersAndPlacement from "./LandingOffersAndPlacement";
import LandingAbout from "./LandingAbout";
import LandingStats from "./LandingStats";
import LandingTestimonials from "./LandingTestimonials";
import LandingDegree from "./LandingDegree";
import LandingRecruiters from "./LandingRecruiters";
import LandingAdmissionProcess from "./LandingAdmissionProcess";
import LandingSodeAbout from "./LandingSodeAbout";
import LandingFaq from "./LandingFaq";
import LandingFooterForm from "./LandingFooterForm";
import LandingCompareBanner from "./LandingCompareBanner";
import LandingFooter from "./LandingFooter";
import LandingStickyCtas from "./LandingStickyCtas";
import LandingEmiSection from "./LandingEmiSection";
import LandingExamSection from "./LandingExamSection";
import BrochureModal from "./modals/BrochureModal";
import ScholarshipModal from "./modals/ScholarshipModal";
import CompareModal from "./modals/CompareModal";
import LegalModal from "./modals/LegalModal";

export default function UniversityLandingView({ data = {} }) {
  const {
    slug = "university",
    brand = {},
    courses = [],
    approvals = [],
    keyHighlights = [],
    stats = [],
    programmes = [],
    offersAndPlacements,
    about = {},
    leader,
    whyChoose = [],
    degreeInfo = {},
    recruiters = {},
    faculties = [],
    testimonials = [],
    admissionSteps = [],
    admissionProcess,
    enrollmentProcess,
    feesAndEmi,
    examEvaluation,
    collegeComparison,
    sodeAbout,
    faqs = [],
    scholarshipModal,
    compareModal,
    customCss = "",
    theme = {},
  } = data;

  const brandWithSlug = useMemo(() => ({ ...brand, slug: brand.slug || slug }), [brand, slug]);

  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.value || "MBA");
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, type: "disclaimer" });

  useEffect(() => {
    let triggered = false;
    const handleScroll = () => {
      if (!triggered && window.scrollY > 1200) {
        triggered = true;
        const key = `${slug}_scholarship_seen`;
        if (!sessionStorage.getItem(key)) {
          setIsScholarshipOpen(true);
          sessionStorage.setItem(key, "true");
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  const handleOpenBrochure = useCallback((course) => {
    if (course) setSelectedCourse(course);
    setIsBrochureOpen(true);
  }, []);

  const handleOpenApply = useCallback((course) => {
    if (course) setSelectedCourse(course);
    if (slug === "galgotias" || brandWithSlug.slug === "galgotias" || brandWithSlug.heroStyle === "galgotias") {
      setIsBrochureOpen(true);
    } else {
      const heroEl = document.getElementById("hero") || document.getElementById("banner");
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        setIsBrochureOpen(true);
      }
    }
  }, [slug, brandWithSlug]);

  const handleOpenLegal = useCallback((type) => {
    setLegalModalState({ isOpen: true, type });
  }, []);

  const handleCloseLegal = useCallback(() => {
    setLegalModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handleOpenScholarship = useCallback(() => setIsScholarshipOpen(true), []);
  const handleOpenCompare = useCallback(() => setIsCompareOpen(true), []);

  const activeCustomCss = customCss || brand.customCss || "";
  const activeTheme = theme || brand.theme || {};

  const themeStyles = {
    "--primary-color": activeTheme.primaryColor || brand.primaryColor || "#002b49",
    "--accent-color": activeTheme.accentColor || brand.accentColor || "#ffb800",
    "--hero-bg": activeTheme.heroBg || brand.hero?.backgroundColor || "#ffffff",
    "--table-header-bg": activeTheme.tableHeaderBg || "#e1f0fa",
    "--table-border-color": activeTheme.tableBorderColor || "#cfe2f3",
    "--footer-bg": activeTheme.footerBg || "#111111",
    ...(activeTheme.cssVars || {}),
  };

  const defaultOrder = useMemo(() => {
    if (slug === "smu" || brand.slug === "smu") {
      return ["approvals", "programmes", "whyChoose", "about", "stats", "admissionProcess", "faqs", "footerForm", "compareBanner"];
    }
    if (slug === "vgu" || brand.slug === "vgu") {
      return ["approvals", "programmes", "about", "stats", "whyChoose", "degree", "recruiters", "admissionProcess", "faqs", "footerForm", "compareBanner"];
    }
    return [
      "approvals", "whyChoose", "programmes", "offersAndPlacement", "about", "stats",
      "degree", "recruiters", "testimonials", "admissionProcess", "sodeAbout", "faqs",
      "footerForm", "compareBanner"
    ];
  }, [slug, brand.slug]);

  const activeOrder = brand.sectionOrder || defaultOrder;

  const renderSection = (sectionKey) => {
    switch (sectionKey) {
      case "approvals":
        return (
          <LandingApprovals
            key="approvals"
            approvals={approvals}
            keyHighlights={keyHighlights || brand.keyHighlights}
            universityName={brand.name}
            brand={brandWithSlug}
          />
        );
      case "programmes":
        return (
          <LandingProgrammes
            key="programmes"
            programmes={programmes}
            universityName={brand.name}
            brand={brandWithSlug}
            onSelectCourseForBrochure={handleOpenBrochure}
            onOpenApply={handleOpenApply}
          />
        );
      case "about":
        return (
          <LandingAbout
            key="about"
            about={about}
            brand={brandWithSlug}
            stats={stats}
            leader={leader}
            onOpenApply={handleOpenApply}
          />
        );
      case "whyChoose":
        return (
          <LandingWhyChoose
            key="whyChoose"
            whyChoose={whyChoose}
            brand={brandWithSlug}
            onOpenApply={handleOpenApply}
          />
        );
      case "degree":
        return degreeInfo && Object.keys(degreeInfo).length > 0 ? (
          <LandingDegree
            key="degree"
            degreeInfo={degreeInfo}
            brand={brandWithSlug}
            onOpenApply={handleOpenApply}
          />
        ) : null;
      case "recruiters":
      case "placement":
      case "partners":
      case "placements":
        return (recruiters && Object.keys(recruiters).length > 0) || brand.recruiters || brand.recruitersTitle || brand.recruitersDesktopImage ? (
          <LandingRecruiters
            key="recruiters"
            brand={brandWithSlug}
            recruiters={recruiters || brand.recruiters}
          />
        ) : null;
      case "offersAndPlacement":
        return offersAndPlacements ? (
          <LandingOffersAndPlacement
            key="offersAndPlacement"
            offersAndPlacements={offersAndPlacements}
            brand={brandWithSlug}
          />
        ) : null;
      case "emi":
        return (
          <LandingEmiSection
            key="emi"
            brand={brandWithSlug}
            feesAndEmi={feesAndEmi || brand.feesAndEmi}
            onOpenApply={handleOpenApply}
          />
        );
      case "exam":
        return (
          <LandingExamSection
            key="exam"
            brand={brandWithSlug}
            examEvaluation={examEvaluation || brand.examEvaluation}
            onOpenApply={handleOpenApply}
          />
        );
      case "stats":
        return brand.showSeparateStats !== false && stats?.length > 0 ? (
          <LandingStats key="stats" stats={stats} brand={brandWithSlug} />
        ) : null;
      case "testimonials":
        return testimonials?.length > 0 ? (
          <LandingTestimonials
            key="testimonials"
            testimonials={testimonials}
            faculties={faculties || brand.faculties}
            universityName={brand.name}
            brand={brandWithSlug}
          />
        ) : null;
      case "admissionProcess":
        return (
          <LandingAdmissionProcess
            key="admissionProcess"
            admissionSteps={admissionSteps}
            admissionProcess={admissionProcess}
            enrollmentProcess={enrollmentProcess}
            universityName={brand.name}
            brand={brandWithSlug}
            onOpenApply={handleOpenApply}
          />
        );
      case "sodeAbout":
        return sodeAbout ? (
          <LandingSodeAbout
            key="sodeAbout"
            sodeAbout={sodeAbout}
            brand={brandWithSlug}
            onOpenApply={handleOpenApply}
            onOpenCompare={handleOpenCompare}
          />
        ) : null;
      case "faqs":
        return (
          <LandingFaq
            key="faqs"
            faqs={faqs}
            universityName={brand.name}
            brand={brandWithSlug}
          />
        );
      case "footerForm":
        return brand.showFooterForm !== false ? (
          <LandingFooterForm
            key="footerForm"
            brand={brandWithSlug}
            courses={courses}
            onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
          />
        ) : null;
      case "compareBanner":
      case "comparison":
      case "compare":
        return (
          <LandingCompareBanner
            key="compareBanner"
            brand={brandWithSlug}
            collegeComparison={collegeComparison || brand.collegeComparison}
            onOpenCompare={handleOpenCompare}
            onOpenBrochure={handleOpenBrochure}
            onOpenApply={handleOpenApply}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="landing-page-root min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-900 selection:text-white"
      style={themeStyles}
    >
      {/* Dynamic Page Specific CSS Injection */}
      {activeCustomCss && (
        <style
          id={`custom-css-${slug}`}
          dangerouslySetInnerHTML={{ __html: activeCustomCss }}
        />
      )}

      {/* 1. Header / Navbar */}
      <LandingNavbar
        brand={brandWithSlug}
        onOpenApply={handleOpenApply}
        onOpenBrochure={handleOpenBrochure}
        onOpenScholarship={handleOpenScholarship}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <LandingHero
          brand={brandWithSlug}
          courses={courses}
          onOpenBrochure={handleOpenBrochure}
          onOpenApply={handleOpenApply}
          onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
        />

        {/* 2.5 Sub-Navigation Sticky Bar */}
        {(brand.showSubNav === true || brand.slug === "galgotias") && (
          <LandingSubNav
            brand={brandWithSlug}
            onOpenApply={handleOpenApply}
          />
        )}

        {/* Section Dispatcher based on activeOrder */}
        {activeOrder.map((sectionKey) => renderSection(sectionKey))}
      </main>

      {/* Footer */}
      <LandingFooter
        brand={brandWithSlug}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
        onOpenTerms={() => handleOpenLegal("terms")}
        onOpenPrivacy={() => handleOpenLegal("privacy")}
      />

      {/* Floating Sticky CTAs */}
      <LandingStickyCtas
        brand={brandWithSlug}
        onOpenApply={handleOpenApply}
        onOpenBrochure={handleOpenBrochure}
        onOpenScholarship={handleOpenScholarship}
        onOpenCompare={handleOpenCompare}
      />

      {/* Modals */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        universityName={brand.name}
        courses={courses}
        selectedCourse={selectedCourse}
        brand={brandWithSlug}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />
      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        universityName={brand.name}
        courses={courses}
        brand={brandWithSlug}
        scholarshipModal={scholarshipModal || brand.scholarshipModal}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        universityName={brand.name}
        courses={courses}
        brand={brandWithSlug}
        compareModal={compareModal || brand.compareModal}
        onOpenDisclaimer={() => handleOpenLegal("disclaimer")}
      />
      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={handleCloseLegal}
        type={legalModalState.type}
        brand={brandWithSlug}
      />
    </div>
  );
}

