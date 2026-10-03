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
  brand = {},
  onOpenDisclaimer,
}) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={460}
      destroyOnHidden
      className="p-0 overflow-hidden max-w-[calc(100vw-24px)] mx-auto [&_.ant-modal-content]:!rounded-[16px] [&_.ant-modal-content]:!p-6 sm:[&_.ant-modal-content]:!p-7 [&_.ant-modal-close]:!top-4 [&_.ant-modal-close]:!right-4 [&_.ant-modal-close]:!text-slate-800 hover:[&_.ant-modal-close]:!text-black"
    >
      <div className="pt-0">
        <LandingLeadForm
          brand={brand}
          universityName={universityName}
          courseList={courses}
          defaultCourse={selectedCourse}
          formName="Counseling Enquiry Modal"
          title="Book 100% Free Counseling"
          subtitle="Get upto 20% Scholarship Coupon Code."
          buttonText="Submit"
          variant="modal"
          phoneText={brand.phoneDisplay || brand.phone || "+91 7065 7777 55"}
          onSuccess={onClose}
          onOpenDisclaimer={onOpenDisclaimer}
        />
      </div>
    </Modal>
  );
}
