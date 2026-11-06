"use client";

import React, { useState } from "react";
import LpuHeader from "./LpuHeader";
import LpuHero from "./LpuHero";
import LpuProgrammes from "./LpuProgrammes";
import LpuApprovals from "./LpuApprovals";
import LpuAbout from "./LpuAbout";
import LpuDegree from "./LpuDegree";
import LpuPedagogy from "./LpuPedagogy";
import LpuPlacement from "./LpuPlacement";
import LpuProcess from "./LpuProcess";
import LpuFaq from "./LpuFaq";
import LpuFooter from "./LpuFooter";
import ScholarshipModal from "../../modals/ScholarshipModal";
import BrochureModal from "../../modals/BrochureModal";
import LegalModal from "../../modals/LegalModal";
import { LPU_COURSES } from "./constants";

export default function LpuLandingView() {
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

  const lpuBrand = {
    name: "LPU Online",
    slug: "lpu",
    primaryColor: "#f58220",
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Header */}
      <LpuHeader onOpenScholarship={() => setIsScholarshipOpen(true)} />

      {/* 2. Hero Section */}
      <LpuHero
        onOpenBrochure={() => handleOpenBrochure()}
        onOpenApply={() => setIsBrochureOpen(true)}
        onOpenDisclaimer={() =>
          setLegalModalState({ isOpen: true, type: "disclaimer" })
        }
      />

      {/* 3. Explore Programs */}
      <LpuProgrammes onOpenBrochure={handleOpenBrochure} />

      {/* 4. Accreditations & Approvals */}
      <LpuApprovals />

      {/* 5. About LPU Online University */}
      <LpuAbout />

      {/* 6. UGC Entitled Degree Section */}
      <LpuDegree onOpenApply={() => setIsBrochureOpen(true)} />

      {/* 7. Learning Pedagogy */}
      <LpuPedagogy />

      {/* 8. Placement Support Services & Hiring Partners */}
      <LpuPlacement onOpenApply={() => setIsBrochureOpen(true)} />

      {/* 9. Enrollment Process */}
      <LpuProcess />

      {/* 10. FAQs */}
      <LpuFaq />

      {/* 11. Footer Section */}
      <LpuFooter
        onOpenApply={() => setIsBrochureOpen(true)}
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
        universityName="LPU Online"
        courses={LPU_COURSES}
        brand={lpuBrand}
      />

      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        universityName="LPU Online"
        courses={LPU_COURSES}
        brand={lpuBrand}
        defaultCourse={selectedCourse}
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={() =>
          setLegalModalState({ isOpen: false, type: "disclaimer" })
        }
        type={legalModalState.type}
        brand={lpuBrand}
      />
    </div>
  );
}

