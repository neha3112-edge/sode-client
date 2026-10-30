"use client";

import React, { useEffect, useState } from "react";
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
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      triggerFormConfetti();
    }
  }, [isOpen]);

  const activeTitle = title || brand.hero?.brochureModalTitle || "Download Brochure";
  const activeSubtitle =
    subtitle || brand.hero?.enquireSubtitle || "Academic Experts will assist you!";

  const handleClose = () => {
    if (submitting) return;
    onClose?.();
  };

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
      onCancel={handleClose}
      footer={null}
      centered
      width={400}
      mask={{ closable: false }}
      destroyOnHidden
      closable={false}
      className="enquire-lead-modal landing-lead-modal p-0 max-w-[calc(100vw-24px)] mx-auto"
      styles={{
        container: {
          background: "transparent",
          backgroundColor: "transparent",
          padding: 0,
          boxShadow: "none",
          border: "none",
        },
        body: {
          background: "transparent",
          backgroundColor: "transparent",
          padding: 0,
        },
      }}
      classNames={{
        container: "!bg-transparent !p-0 !shadow-none !border-none",
        body: "!bg-transparent !p-0",
      }}
    >
      <div
        className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          disabled={submitting}
          className="absolute top-2.5 right-2.5 z-50 flex items-center justify-center w-7 h-7 rounded-full bg-black/60 hover:bg-black/85 text-white font-bold text-xs transition-all shadow-md cursor-pointer border-none select-none disabled:opacity-50 disabled:cursor-not-allowed"
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
          onSubmittingChange={setSubmitting}
        />
      </div>
    </Modal>
  );
}
