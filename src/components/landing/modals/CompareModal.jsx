"use client";

import React from "react";
import ScholarshipModal from "./ScholarshipModal";

/**
 * CompareModal reuses the exact same ScholarshipModal component.
 * No new form is created; all behavior, layout, inputs, and validation
 * are shared, and styling/content are driven purely by JSON configuration.
 */
export default function CompareModal({
  isOpen,
  onClose,
  universityName = "University Online",
  courses = [],
  brand = {},
  compareModal = {},
  onOpenDisclaimer,
}) {
  const config = compareModal || brand?.compareModal || {
    modalBg: "#ffffff",
    titleText: "Compare Universities",
    titleColor: "#082b4e",
    subtitleText: `Compare ${universityName} approvals, fees, and placements side-by-side`,
    subtitleColor: "#555555",
    inputBg: "#f8f9fa",
    inputTextColor: "#111827",
    closeBtnColor: "#888888",
    submitBtnBg: "#16a34a",
    submitBtnText: "Request Detailed Comparison Report",
    phonePlaceholder: "Enter Mobile Number",
    formName: "Compare Universities Modal",
  };

  return (
    <ScholarshipModal
      isOpen={isOpen}
      onClose={onClose}
      universityName={universityName}
      courses={courses}
      brand={brand}
      scholarshipModal={config}
      onOpenDisclaimer={onOpenDisclaimer}
    />
  );
}
