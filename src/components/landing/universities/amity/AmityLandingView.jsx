"use client";

import React, { useState } from "react";
import AmityHeader from "./AmityHeader";
import AmityHero, { AMITY_COURSES } from "./AmityHero";
import AmityApprovals from "./AmityApprovals";
import AmityProgrammes from "./AmityProgrammes";
import AmityAbout from "./AmityAbout";
import AmityStats from "./AmityStats";
import AmityWhyChoose from "./AmityWhyChoose";
import AmityProcess from "./AmityProcess";
import AmityFaq from "./AmityFaq";
import AmityFooter from "./AmityFooter";
import ScholarshipModal from "../../modals/ScholarshipModal";
import BrochureModal from "../../modals/BrochureModal";
import LegalModal from "../../modals/LegalModal";

export default function AmityLandingView() {
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState({
    isOpen: false,
    type: "disclaimer",
  });

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Header (Full Width Bar with Inner Container) */}
      <AmityHeader onOpenScholarship={() => setIsScholarshipOpen(true)} />

      {/* 2. Hero Section (Full Width Background with Inner Container) */}
      <AmityHero
        onOpenBrochure={() => setIsBrochureOpen(true)}
        onOpenDisclaimer={() =>
          setLegalModalState({ isOpen: true, type: "disclaimer" })
        }
      />

      {/* 3. Recognition and Approvals Section */}
      <AmityApprovals />

      {/* 4. Degree Programmes (Ant Design Carousel) */}
      <AmityProgrammes onOpenBrochure={() => setIsBrochureOpen(true)} />

      {/* 5. About Amity University Online */}
      <AmityAbout onOpenApply={() => setIsBrochureOpen(true)} />

      {/* 6. Achievement & Stats Bar */}
      <AmityStats />

      {/* 7. Why Choose Amity University Online */}
      <AmityWhyChoose onOpenApply={() => setIsBrochureOpen(true)} />

      {/* 8. Admission Process (6 Steps) */}
      <AmityProcess />

      {/* 9. Frequently Asked Questions */}
      <AmityFaq />

      {/* 10. Footer Section (Form, Still Confused Compare, SODE Logo, Disclaimer & Floating CTA) */}
      <AmityFooter
        onOpenScholarship={() => setIsScholarshipOpen(true)}
        onOpenCompare={() => setIsBrochureOpen(true)}
        onOpenDisclaimer={() =>
          setLegalModalState({ isOpen: true, type: "disclaimer" })
        }
        onOpenTerms={() => setLegalModalState({ isOpen: true, type: "terms" })}
        onOpenPrivacy={() =>
          setLegalModalState({ isOpen: true, type: "privacy" })
        }
      />

      {/* Modals */}
      <ScholarshipModal
        isOpen={isScholarshipOpen}
        onClose={() => setIsScholarshipOpen(false)}
        universityName="Amity University Online"
        courses={AMITY_COURSES}
        brand={{
          name: "Amity University Online",
          slug: "amity",
          primaryColor: "#08417b",
        }}
      />

      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        universityName="Amity University Online"
        courses={AMITY_COURSES}
        brand={{
          name: "Amity University Online",
          slug: "amity",
          primaryColor: "#08417b",
        }}
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={() =>
          setLegalModalState({ isOpen: false, type: "disclaimer" })
        }
        type={legalModalState.type}
        brand={{
          name: "Amity University Online",
          slug: "amity",
          primaryColor: "#08417b",
        }}
      />
    </div>
  );
}
