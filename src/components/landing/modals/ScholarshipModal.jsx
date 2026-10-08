"use client";

import React, { useEffect } from "react";
import { Modal } from "antd";
import { triggerFormConfetti } from "@/lib/confetti";
import LandingLeadForm from "../LandingLeadForm";

/**
 * Global Reused Scholarship & Coupon Modal
 * Uses the exact same reusable LandingLeadForm component as on the landing page,
 * inheriting the university's theme, colors, placeholders, and branding,
 * with the title set to "Get Scholarship Coupon Code" (or customized from JSON/CompareModal),
 * and full cover with the same open modal width (480px).
 */
export default function ScholarshipModal({
  isOpen,
  onClose,
  universityName = "University Online",
  courses = [],
  selectedCourse = "",
  brand = {},
  scholarshipModal = {},
  title,
  subtitle,
  buttonText,
  onOpenDisclaimer,
}) {
  useEffect(() => {
    if (isOpen) {
      triggerFormConfetti();
    }
  }, [isOpen]);

  const modalConfig = scholarshipModal || brand?.scholarshipModal || {};

  const activeTitle =
    title ||
    modalConfig.titleText ||
    brand.hero?.scholarshipModalTitle ||
    "Get Scholarship Coupon Code";

  const activeSubtitle =
    subtitle ||
    modalConfig.subtitleText ||
    brand.hero?.scholarshipSubtitle ||
    "Academic Experts will assist you!";

  const activeBtnText =
    buttonText ||
    modalConfig.submitBtnText ||
    "Submit";

  const handleSuccess = () => {
    onClose?.();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={480}
      destroyOnHidden
      className="scholarship-lead-modal landing-lead-modal p-0 max-w-[calc(100vw-24px)] mx-auto"
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
            buttonText={activeBtnText}
            formName={modalConfig.formName || "Scholarship Coupon Modal"}
            maxWidth="100%"
            onOpenDisclaimer={onOpenDisclaimer}
            onSuccess={handleSuccess}
          />
        </div>
      )}
    />
  );
}