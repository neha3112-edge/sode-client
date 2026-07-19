"use client";

import React, { useState } from "react";
import BottomCTA from "./BottomCTA";
import FloatingButton from "./FloatingButton";
import FormWrapper from "@/components/forms/FormWrapper";

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

  brochureUrl = "/assets/pdf/mba_overall.pdf",
  showBrochureFormOnClick = true,
  dynamicCourseBrochures = true,
  ...formProps
}) {
  const [applyOpen, setApplyOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);

  const closeApplyForm = () => setApplyOpen(false);
  const closeBrochureForm = () => setBrochureOpen(false);

  return (
    <>
      {/* Floating Scholarship Button */}
      <div className="fixed bottom-20 right-4 z-[80] flex flex-col items-center gap-2 lg:bottom-6 lg:right-6">
        <FloatingButton {...formProps} />
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden">
        <BottomCTA
          onApply={() => setApplyOpen(true)}
          onBrochure={
            showBrochureFormOnClick ? () => setBrochureOpen(true) : undefined
          }
          whatsappPhone={whatsappPhone}
          whatsappMessage={whatsappMessage}
          brochureButtonText={brochureButtonText}
          applyButtonText={applyButtonText}
        />
      </div>

      {/* Mobile Bottom Apply Modal */}
      <FormWrapper
        isModal
        isOpen={applyOpen}
        onClose={closeApplyForm}
        title={applyFormTitle}
        subtitle={applyFormSubtitle}
        formNameOverride={applyFormName}
        submitButtonText={applyButtonText}
        {...formProps}
      />

      {/* Mobile Bottom Brochure Modal */}
      <FormWrapper
        isModal
        isOpen={brochureOpen}
        onClose={closeBrochureForm}
        title={brochureFormTitle}
        subtitle={brochureFormSubtitle}
        formNameOverride={brochureFormName}
        isBrochureForm
        brochureUrl={brochureUrl}
        dynamicCourseBrochures={dynamicCourseBrochures}
        {...formProps}
      />
    </>
  );
}
