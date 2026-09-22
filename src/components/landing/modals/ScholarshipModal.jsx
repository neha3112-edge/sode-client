"use client";

import React from "react";
import { Modal } from "antd";
import LandingLeadForm from "../LandingLeadForm";

export default function ScholarshipModal({
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
      destroyOnClose
      className="p-0 overflow-hidden"
    >
      <div className="pt-2">
        <LandingLeadForm
          universityName={universityName}
          courseList={courses}
          formName="Scholarship Check Modal"
          title="Check Scholarship Eligibility"
          subtitle={`Avail up to 30% fee concession on ${universityName} programs`}
          buttonText="Check My Concession Now"
          onSuccess={onClose}
          onOpenDisclaimer={onOpenDisclaimer}
        />
      </div>
    </Modal>
  );
}
