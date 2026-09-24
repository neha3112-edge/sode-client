"use client";

import React, { useEffect } from "react";
import { Modal } from "antd";
import LandingLeadForm from "../LandingLeadForm";
import { triggerFormConfetti } from "@/lib/confetti";

export default function CompareModal({
  isOpen,
  onClose,
  universityName = "University Online",
  courses = [],
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
          formName="Compare Universities Modal"
          title="Compare Universities"
          subtitle={`Compare ${universityName} approvals, fees, and placements side-by-side`}
          buttonText="Request Detailed Comparison Report"
          variant="modal"
          onSuccess={onClose}
          onOpenDisclaimer={onOpenDisclaimer}
        />
      </div>
    </Modal>
  );
}
