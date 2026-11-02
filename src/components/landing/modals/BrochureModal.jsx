"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { X } from "lucide-react";
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
    onClose?.();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      centered
      width={400}
      destroyOnClose={true}
      closeIcon={null}
      styles={{
        container: {
          padding: 0,
          background: "transparent",
          backgroundColor: "transparent",
          boxShadow: "none",
          border: "none",
        },
        content: {
          padding: 0,
          background: "transparent",
          backgroundColor: "transparent",
          boxShadow: "none",
          border: "none",
        },
        body: {
          padding: 0,
          background: "transparent",
          backgroundColor: "transparent",
        },
      }}
      className="enquire-lead-modal landing-lead-modal p-0 max-w-[calc(100vw-24px)] mx-auto !pointer-events-auto"
    >
      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl pointer-events-auto">
        <button
          type="button"
          onClick={handleClose}
          disabled={submitting}
          className="absolute top-2.5 right-2.5 md:top-3.5 md:right-3.5 z-50 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer border-none shadow-xs text-white bg-black/50 hover:bg-black/70 md:text-slate-500 md:bg-slate-100 md:hover:bg-slate-200 md:hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Close modal"
        >
          <X size={18} className="stroke-[2.5]" />
          boxShadow: "none",
          border: "none",
        },
        body: {
          buttonText={buttonText || "Download Brochure"}
          formName={activeTitle ? `${activeTitle} Modal` : "Modal Enquire Form"}
          maxWidth="100%"
          isBrochure={true}
          onOpenDisclaimer={onOpenDisclaimer}
          onSuccess={handleSuccess}
          onSubmittingChange={setSubmitting}
        />
      </div>
    </Modal>
  );
}
