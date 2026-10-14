"use client";

import React from "react";
import FooterLeadForm from "./forms/FooterLeadForm";
import { useFooterFormLogic } from "./forms/useFooterFormLogic";

/**
 * Legacy Layout Map for Backward Compatibility
 */
const LEGACY_FORM_LAYOUT_MAP = {
  smu: "smu-split",
  manipal: "split",
};

/**
 * Resolves form layout identifier
 */
function resolveFormLayout(brand = {}) {
  if (brand.footerFormLayout) return brand.footerFormLayout;
  if (brand.footerForm?.layout) return brand.footerForm.layout;
  if (brand.name?.toLowerCase().includes("sikkim")) return "smu-split";
  if (brand.slug && LEGACY_FORM_LAYOUT_MAP[brand.slug]) {
    return LEGACY_FORM_LAYOUT_MAP[brand.slug];
  }
  return "default";
}

/**
 * Resolves form content and visual configurations
 */
function resolveFormConfig(brand = {}) {
  const ff = brand.footerForm || {};
  return {
    id: ff.id || brand.footerFormId || "enroll-frm",
    background: ff.background || brand.footerFormBg || brand.primaryColor || "#08417b",
    title: ff.title || brand.footerFormTitle,
    subtitle: ff.subtitle || brand.footerFormSubtitle,
    cardTitle: ff.cardTitle || brand.enquireTitle || "Get 100% Free Counselling",
    cardSubtitle: ff.cardSubtitle || brand.enquireSubtitle || "Academic Experts will assist you!",
    phone: ff.phone || brand.phone,
    phoneDisplay: ff.phoneDisplay || brand.phoneDisplay || brand.phone,
    submitText: ff.submitText || "Submit",
    submitBtnBg: ff.submitBtnBg || brand.footerSubmitBtnBg,
    submitBtnText: ff.submitBtnText || brand.footerSubmitBtnText,
    namePlaceholder: ff.namePlaceholder,
    emailPlaceholder: ff.emailPlaceholder,
    phonePlaceholder: ff.phonePlaceholder,
    coursePlaceholder: ff.coursePlaceholder,
    statePlaceholder: ff.statePlaceholder,
    consentText: ff.consentText,
  };
}

/**
 * Data-Driven Landing Footer Form Component
 *
 * Supports:
 * - "smu-split": Horizontal blue band with floating white card (SMU Online)
 * - "split": 2-column split with left guidance text & 3-column right form (Manipal)
 * - "default": Universal 2-row form with top headers & input labels (All universities)
 */
export default function LandingFooterForm({
  brand = {},
  courses = [],
  onOpenDisclaimer,
}) {
  const layout = resolveFormLayout(brand);
  const config = resolveFormConfig(brand);

  const { form, loading, stateOptions, onFinish } = useFooterFormLogic({ brand });

  return (
    <FooterLeadForm
      layout={layout}
      form={form}
      loading={loading}
      courses={courses}
      stateOptions={stateOptions}
      onFinish={onFinish}
      onOpenDisclaimer={onOpenDisclaimer}
      config={config}
    />
  );
}
