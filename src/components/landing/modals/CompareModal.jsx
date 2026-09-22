"use client";

import React from "react";
import { Modal } from "antd";
import LandingLeadForm from "../LandingLeadForm";

export default function CompareModal({
  isOpen,
  onClose,
  universityName = "University Online",
  courses = [],
  onOpenDisclaimer,
}) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={480}
      destroyOnHidden
      className="p-0 overflow-hidden"
    >
      <div className="pt-2">
        <LandingLeadForm
          universityName={universityName}
          courseList={courses}
          formName="Compare Universities Modal"
          title="Compare Universities"
          subtitle={`Compare ${universityName} approvals, fees, and placements side-by-side`}
          buttonText="Request Detailed Comparison Report"
          onSuccess={onClose}
          onOpenDisclaimer={onOpenDisclaimer}
        />
      </div>
    </Modal>
  );
}
