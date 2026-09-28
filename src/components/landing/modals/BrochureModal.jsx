"use client";

import React, { useEffect } from "react";
import { Modal } from "antd";
import LandingLeadForm from "../LandingLeadForm";
import { triggerFormConfetti } from "@/lib/confetti";

export default function BrochureModal({
  isOpen,
  onClose,
  universityName = "University Online",
  courses = [],
  selectedCourse = "MBA",
  onOpenDisclaimer,
}) {
  useEffect(() => {
    if (isOpen) {
      triggerFormConfetti();
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={480}
      destroyOnHidden
      className="p-0 overflow-hidden max-w-[calc(100vw-24px)] mx-auto"
    >
      <div className="pt-2">
        <LandingLeadForm
          universityName={universityName}
          courseList={courses}
          defaultCourse={selectedCourse}
          formName="Brochure Download Modal"
          title={`Download ${selectedCourse} Brochure`}
          subtitle={`Get official curriculum, fee breakdown, & eligibility for ${universityName}`}
          buttonText="Get Brochure on Email & WhatsApp"
          variant="modal"
          onSuccess={onClose}
          onOpenDisclaimer={onOpenDisclaimer}
        />
      </div>
    </Modal>
  );
}
