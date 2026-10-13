"use client";

import React, { useEffect } from "react";
import { Modal } from "antd";
import { triggerFormConfetti } from "@/lib/confetti";
import LandingLeadForm from "../LandingLeadForm";

/**
 * Global Dynamic Brochure / Enquire / Apply Modal
 * Uses the exact same reusable LandingLeadForm component as on the landing page,
 * dynamically inheriting the university's theme, colors, placeholders, and branding,
 * with the title dynamically reflecting whichever button was clicked.
 */
export default function BrochureModal({
  isOpen,
  onClose,
  universityName = "University Online",
  courses = [],
  selectedCourse = "",
  title = "Download Brochure",
  subtitle,
  buttonText,
  brand = {},
  onOpenDisclaimer,
}) {
  useEffect(() => {
    if (isOpen) {
      triggerFormConfetti();
    }
  }, [isOpen]);

  const activeTitle = title || brand.hero?.brochureModalTitle || "Download Brochure";
  const activeSubtitle =
    subtitle || brand.hero?.enquireSubtitle || "Academic Experts will assist you!";

  const handleSuccess = () => {
    // Automatically trigger brochure PDF download if configured
    const brochureUrl =
      brand?.brochurePdf ||
      brand?.brochureUrl ||
      (brand?.slug === "iim" ? "/assets/iim/main_brochure.pdf" : null);

    if (brochureUrl && typeof window !== "undefined") {
      try {
        const link = document.createElement("a");
        link.href = brochureUrl;
        link.download =
          brochureUrl.split("/").pop() || `${universityName}_Brochure.pdf`;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch {}
    }

    onClose?.();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
      destroyOnHidden
      className="enquire-lead-modal landing-lead-modal p-0 max-w-[calc(100vw-24px)] mx-auto"
      modalRender={() => (
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2.5 right-2.5 z-50 flex items-center justify-center w-7 h-7 rounded-full bg-black/60 hover:bg-black/85 text-white font-bold text-xs transition-all shadow-md cursor-pointer border-none select-none"
            aria-label="Close modal"
          >
            ✕
          </button>
          <LandingLeadForm
            brand={brand}
            courses={courses}
            defaultCourse={selectedCourse}
            universityName={universityName}
            title={activeTitle}
            subtitle={activeSubtitle}
            buttonText={buttonText}
            formName={activeTitle ? `${activeTitle} Modal` : "Modal Enquire Form"}
            maxWidth="100%"
            onOpenDisclaimer={onOpenDisclaimer}
            onSuccess={handleSuccess}
          />
        </div>
      )}
    />
  );
}
