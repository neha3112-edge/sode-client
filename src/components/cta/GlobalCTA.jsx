"use client";

import React from "react";
import { usePathname } from "next/navigation";
import BottomCTA from "./BottomCTA";
import FloatingButton from "./FloatingButton";
import { useFormModal } from "@/context/FormModalContext";
import { getAssetPath } from "@/lib/utils";

export default function GlobalCTA({
  whatsappPhone = "917065777755",
  whatsappMessage = "I want to know more about the online degree and certification courses offered by SODE.",
  brochureButtonText = "Get Brochure",
  applyButtonText = "Apply Now",

  applyFormTitle = "Apply Now",
  applyFormSubtitle = "Select your preferred course and start your application journey",
  applyFormName = "SODE Mobile Bottom Apply Form",

  brochureFormTitle = "Download Brochure",
  brochureFormSubtitle = "Select your preferred course to receive the brochure",
  brochureFormName = "SODE Mobile Bottom Brochure Form",

  brochureUrl = getAssetPath("/assets/pdf/mba_overall.pdf"),
  showBrochureFormOnClick = true,
  dynamicCourseBrochures = true,
  ...formProps
}) {
  const pathname = usePathname();
  const { openFormModal } = useFormModal();

  const handleApplyClick = () => {
    openFormModal({
      title: applyFormTitle,
      subtitle: applyFormSubtitle,
      formNameOverride: applyFormName,
      submitButtonText: applyButtonText,
      ...formProps,
    });
  };

  const handleBrochureClick = () => {
    openFormModal({
      title: brochureFormTitle,
      subtitle: brochureFormSubtitle,
      formNameOverride: brochureFormName,
      isBrochureForm: true,
      brochureUrl: brochureUrl,
      dynamicCourseBrochures: dynamicCourseBrochures,
      ...formProps,
    });
  };

  if (pathname?.startsWith("/admin-dashboard") || pathname?.startsWith("/login")) {
    return null;
  }

  return (
    <>
      {/* Floating Scholarship Button */}
      <div className="fixed bottom-20 right-4 z-[80] flex flex-col items-center gap-2 lg:bottom-6 lg:right-6">
        <FloatingButton {...formProps} />
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden">
        <BottomCTA
          onApply={handleApplyClick}
          onBrochure={showBrochureFormOnClick ? handleBrochureClick : undefined}
          whatsappPhone={whatsappPhone}
          whatsappMessage={whatsappMessage}
          brochureButtonText={brochureButtonText}
          applyButtonText={applyButtonText}
        />
      </div>
    </>
  );
}
