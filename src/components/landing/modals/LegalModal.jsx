"use client";

import React from "react";
import { Modal } from "antd";

export default function LegalModal({
  isOpen,
  onClose,
  type = "disclaimer",
  brand = {},
}) {
  const universityName = brand.name || "University Online";

  const titles = {
    disclaimer: "Advisory & Regulatory Disclaimer",
    terms: "Terms and Conditions",
    privacy: "Privacy Policy",
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      destroyOnHidden
      className="max-w-[calc(100vw-24px)] mx-auto"
      title={<span className="text-base font-bold text-slate-800">{titles[type] || "Legal Information"}</span>}
    >
      <div className="text-xs text-slate-600 space-y-3 py-2 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
        {type === "disclaimer" && (
          <>
            <p className="m-0">
              SODE operates as an authorized education platform connecting prospective students with UGC-entitled institutions, including {universityName}.
            </p>
            <p className="m-0">
              All academic degrees, curriculums, examinations, and final diploma certificates are issued directly by {universityName} as per regulatory approvals from the UGC Distance Education Bureau.
            </p>
            <p className="m-0">
              Fee concessions, EMI facilities, and admission timelines are subject to university policy updates.
            </p>
          </>
        )}
        {type === "terms" && (
          <>
            <p className="m-0">
              By submitting an application or enquiry on this dedicated {universityName} landing page, you agree to allow our certified counselors to communicate via phone, SMS, email, or WhatsApp.
            </p>
            <p className="m-0">
              Counseling services are free for prospective students seeking online and distance degree programs.
            </p>
          </>
        )}
        {type === "privacy" && (
          <>
            <p className="m-0">
              Your personal contact and academic information is strictly secured and used solely for university admission guidance, application processing, and fee advisory.
            </p>
            <p className="m-0">
              We never sell or rent your data to unauthorized third-party commercial marketers.
            </p>
          </>
        )}
      </div>
    </Modal>
  );
}
