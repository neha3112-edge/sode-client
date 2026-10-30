"use client";

import React, { useEffect } from "react";
import { Modal } from "antd";
import { X } from "lucide-react";
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
            className="absolute top-2.5 right-2.5 md:top-3.5 md:right-3.5 z-50 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer border-none shadow-xs text-white bg-black/50 hover:bg-black/70 md:text-slate-500 md:bg-slate-100 md:hover:bg-slate-200 md:hover:text-slate-800"
            aria-label="Close modal"
          >
            <X size={18} className="stroke-[2.5]" />
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