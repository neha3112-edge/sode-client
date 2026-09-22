"use client";

import React from "react";
import { Modal } from "antd";
import LandingLeadForm from "../LandingLeadForm";

export default function BrochureModal({
  isOpen,
  onClose,
  universityName = "University Online",
  courses = [],
  selectedCourse = "MBA",
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
          defaultCourse={selectedCourse}
          formName="Brochure Download Modal"
          title={`Download ${selectedCourse} Brochure`}
          subtitle={`Get official curriculum, fee breakdown, & eligibility for ${universityName}`}
          buttonText="Get Brochure on Email & WhatsApp"
          onSuccess={onClose}
          onOpenDisclaimer={onOpenDisclaimer}
        />
      </div>
    </Modal>
  );
}
