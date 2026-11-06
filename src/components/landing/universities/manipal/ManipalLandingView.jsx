"use client";

import React, { useState } from "react";
import ManipalHeader from "./ManipalHeader";
import ManipalHero from "./ManipalHero";
import ManipalApprovals from "./ManipalApprovals";
import ManipalFeatures from "./ManipalFeatures";
import ManipalProgrammes from "./ManipalProgrammes";
import ManipalOffers from "./ManipalOffers";
import ManipalAbout from "./ManipalAbout";
import ManipalTestimonials from "./ManipalTestimonials";
import ManipalProcess from "./ManipalProcess";
import ManipalFaq from "./ManipalFaq";
import ManipalFooter from "./ManipalFooter";
import ScholarshipModal from "../../modals/ScholarshipModal";
import BrochureModal from "../../modals/BrochureModal";
import LegalModal from "../../modals/LegalModal";
import { MANIPAL_COURSES } from "./constants";

export default function ManipalLandingView() {
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState({
    isOpen: false,
    type: "disclaimer",
  });

  const manipalBrand = {
    name: "Manipal University Online",
    slug: "manipal",
    primaryColor: "#f35a06",
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Header */}
      <ManipalHeader onOpenScholarship={() => setIsScholarshipOpen(true)} />

      {/* 2. Hero Section */}
      <ManipalHero
        onOpenBrochure={() => setIsBrochureOpen(true)}
        onOpenDisclaimer={() =>
          setLegalModalState({ isOpen: true, type: "disclaimer" })
        }
      />

      {/* 3. Accreditations & Recognitions */}
      <ManipalApprovals />

      {/* 4. Key Features */}
      <ManipalFeatures />

      {/* 5. Programs Offered */}
      <ManipalProgrammes onOpenBrochure={() => setIsBrochureOpen(true)} />

      {/* 6. Offers & Placements */}
      <ManipalOffers />

      {/* 7. About & Stats */}
      <ManipalAbout />

      {/* 8. Testimonials */}
      <ManipalTestimonials />

      {/* 9. Enrollment Process */}
      <ManipalProcess />

      {/* 10. Frequently Asked Questions */}
      <ManipalFaq />

      {/* 11. Footer Section */}
      <ManipalFooter
        onOpenBrochure={() => setIsBrochureOpen(true)}
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
        universityName="Manipal University Online"
        courses={MANIPAL_COURSES}
        brand={manipalBrand}
      />

      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        universityName="Manipal University Online"
        courses={MANIPAL_COURSES}
        brand={manipalBrand}
      />

      <LegalModal
        isOpen={legalModalState.isOpen}
        onClose={() =>
          setLegalModalState((prev) => ({ ...prev, isOpen: false }))
        }
        type={legalModalState.type}
      />
    </div>
  );
}

