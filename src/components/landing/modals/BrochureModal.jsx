"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal, Form, Input, Select, Checkbox, Button, message } from "antd";
import { triggerFormConfetti } from "@/lib/confetti";
import { STATE_OPTIONS } from "@/constants/stateOptions";

// Clean India Flag SVG
const IndiaFlag = () => (
  <svg
    className="w-[16px] h-[11px] rounded-[1px] shadow-xs shrink-0 select-none"
    viewBox="0 0 640 480"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#FF9933" d="M0 0h640v160H0z" />
    <path fill="#FFFFFF" d="M0 160h640v160H0z" />
    <path fill="#128807" d="M0 320h640v160H0z" />
    <g transform="matrix(3.2 0 0 3.2 320 240)">
      <circle r="20" fill="none" stroke="#000080" strokeWidth="2.5" />
      <circle r="4" fill="#000080" />
      <path
        fill="none"
        stroke="#000080"
        strokeWidth="1"
        d="M0-20V20M-20 0H20M-14.1-14.1l28.2 28.2M-14.1 14.1L14.1-14.1M-18.5-7.7l37 15.4M-18.5 7.7l37-15.4M-7.7-18.5l15.4 37M7.7-18.5l-15.4 37"
      />
    </g>
  </svg>
);

// Form Label component matching the screenshot
const FormLabel = ({ title, required = true }) => (
  <span className="text-[12px] sm:text-[12.5px] font-semibold text-slate-800 flex items-center leading-tight">
    {title}
    {required && <span className="text-red-500 font-bold ml-0.5">*</span>}
  </span>
);

// Phone Input field with country flag addon matching the screenshot
const PhoneInputField = ({ value, onChange, placeholder = "Enter Your Number" }) => {
  return (
    <div className="flex items-center w-full h-[36px] rounded-[6px] border border-[#d9d9d9] hover:border-[#003a6c] focus-within:border-[#003a6c] focus-within:shadow-[0_0_0_2px_rgba(0,58,108,0.08)] bg-white overflow-hidden transition-all">
      <div className="flex items-center gap-1.5 h-full px-2.5 bg-[#f5f5f5] border-r border-[#d9d9d9] select-none shrink-0">
        <IndiaFlag />
        <span className="text-slate-900 font-bold text-[12px] tracking-tight">+91</span>
        <span className="text-slate-500 text-[8.5px] leading-none">▾</span>
      </div>
      <input
        type="tel"
        value={value || ""}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, "").slice(0, 10);
          onChange?.(val);
        }}
        placeholder={placeholder}
        maxLength={10}
        className="w-full h-full px-2.5 bg-white text-slate-800 placeholder:text-slate-400 border-none outline-none text-[12.5px] sm:text-[13px] font-normal"
      />
    </div>
  );
};

const DEFAULT_COURSES = [
  "MBA",
  "MCA",
  "M.COM",
  "MA",
  "MSC",
  "BBA",
  "BCA",
  "B.COM",
  "BA",
];

// Inner Form Component - mounted only when modal is open to avoid unattached useForm warning
function BrochureForm({
  onClose,
  universityName,
  courses,
  selectedCourse,
  brand,
  onOpenDisclaimer,
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    triggerFormConfetti();
  }, []);

  // Format courses dropdown options
  const rawCourses = courses?.length > 0 ? courses : DEFAULT_COURSES;
  const courseOptions = rawCourses.map((c) => {
    const val = typeof c === "string" ? c : c.code || c.title || c.label || c.name || "";
    const lbl = typeof c === "string" ? c : c.title || c.name || c.label || c.code || "";
    return { value: val, label: lbl };
  });

  // Format state dropdown options
  const stateOptions = STATE_OPTIONS.map((st) => ({
    value: typeof st === "string" ? st : st.value || st.label,
    label: typeof st === "string" ? st : st.label || st.value,
  }));

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const searchParams =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();

      const activeUniversity = universityName || brand?.name || "University Online";

      const leadPayload = {
        name: values.full_name,
        email: values.email,
        phone: String(values.phone || "").replace(/\D/g, "").slice(-10),
        course: values.course,
        state: values.state,
        university: activeUniversity,
        source: activeUniversity,
        form_name: "Download Brochure Modal",
        utm_source: searchParams.get("utm_source") || `${activeUniversity}_Brochure`,
        utm_medium: searchParams.get("utm_medium") || "Direct",
        utm_campaign: searchParams.get("utm_campaign") || "Online_Brochure_2026",
        page_url: typeof window !== "undefined" ? window.location.href : "",
      };

      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      // Automatically trigger brochure PDF download if configured
      const brochureUrl = brand?.brochurePdf || brand?.brochureUrl || (brand?.slug === "iim" ? "/assets/iim/main_brochure.pdf" : null);
      if (brochureUrl && typeof window !== "undefined") {
        try {
          const link = document.createElement("a");
          link.href = brochureUrl;
          link.download = brochureUrl.split("/").pop() || `${activeUniversity}_Brochure.pdf`;
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch {}
      }

      message.success("Thank you! Brochure details sent to your Email & WhatsApp.");
      onClose?.();
      router.push("/thank-you");
    } catch {
      message.error("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-center mb-3.5 pt-0.5">
        <h2 className="text-[18px] sm:text-[19px] font-bold text-[#003a6c] tracking-tight m-0 text-center select-none">
          Download Brochure
        </h2>
      </div>

      {/* Main Ant Design Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          course: selectedCourse || undefined,
          consent: false,
        }}
        requiredMark={false}
        className="space-y-0"
      >
        {/* Name */}
        <Form.Item
          name="full_name"
          label={<FormLabel title="Name" />}
          rules={[{ required: true, message: "Please enter your name" }]}
          className="!mb-2.5"
        >
          <Input
            placeholder="Enter Your Name"
            className="h-[36px] rounded-[6px] border-[#d9d9d9] hover:border-[#003a6c] focus:border-[#003a6c] text-[12.5px] sm:text-[13px] text-slate-800 placeholder:text-slate-400"
          />
        </Form.Item>

        {/* Email ID */}
        <Form.Item
          name="email"
          label={<FormLabel title="Email ID " />}
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
          className="!mb-2.5"
        >
          <Input
            type="email"
            placeholder="Enter Your Email"
            className="h-[36px] rounded-[6px] border-[#d9d9d9] hover:border-[#003a6c] focus:border-[#003a6c] text-[12.5px] sm:text-[13px] text-slate-800 placeholder:text-slate-400"
          />
        </Form.Item>

        {/* Phone */}
        <Form.Item
          name="phone"
          label={<FormLabel title="Phone " />}
          rules={[
            { required: true, message: "Please enter your number" },
            { pattern: /^[6-9]\d{9}$/, message: "Please enter valid 10-digit number" },
          ]}
          className="!mb-2.5"
        >
          <PhoneInputField placeholder="Enter Your Number" />
        </Form.Item>

        {/* Course */}
        <Form.Item
          name="course"
          label={<FormLabel title="Course " />}
          rules={[{ required: true, message: "Please select course" }]}
          className="!mb-2.5"
        >
          <Select
            placeholder="Select Your Course"
            options={courseOptions}
            className="w-full h-[36px] [&_.ant-select-selector]:!h-[36px] [&_.ant-select-selector]:!rounded-[6px] [&_.ant-select-selector]:!border-[#d9d9d9] [&_.ant-select-selector]:hover:!border-[#003a6c] [&_.ant-select-focused_.ant-select-selector]:!border-[#003a6c] [&_.ant-select-selection-placeholder]:!leading-[34px] [&_.ant-select-selection-item]:!leading-[34px] [&_.ant-select-selection-placeholder]:!text-slate-400 [&_.ant-select-selection-item]:!text-slate-800 text-[12.5px] sm:text-[13px]"
          />
        </Form.Item>

        {/* State */}
        <Form.Item
          name="state"
          label={<FormLabel title="State " />}
          rules={[{ required: true, message: "Please select state" }]}
          className="!mb-2.5"
        >
          <Select
            placeholder="Select Your State"
            options={stateOptions}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            className="w-full h-[36px] [&_.ant-select-selector]:!h-[36px] [&_.ant-select-selector]:!rounded-[6px] [&_.ant-select-selector]:!border-[#d9d9d9] [&_.ant-select-selector]:hover:!border-[#003a6c] [&_.ant-select-focused_.ant-select-selector]:!border-[#003a6c] [&_.ant-select-selection-placeholder]:!leading-[34px] [&_.ant-select-selection-item]:!leading-[34px] [&_.ant-select-selection-placeholder]:!text-slate-400 [&_.ant-select-selection-item]:!text-slate-800 text-[12.5px] sm:text-[13px]"
          />
        </Form.Item>

        {/* Checkbox */}
        <Form.Item name="consent" valuePropName="checked" className="!mb-3 !mt-0.5">
          <Checkbox className="text-[10.5px] sm:text-[11px] text-slate-700 leading-snug [&_.ant-checkbox-inner]:!w-[14px] [&_.ant-checkbox-inner]:!h-[14px] [&_.ant-checkbox-inner]:!rounded-[2.5px]">
            <span>
              I consent to receive university updates via email and mobile number.{" "}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onOpenDisclaimer?.();
                }}
                className="text-[#0055b8] underline cursor-pointer bg-transparent border-none p-0 inline font-medium hover:text-[#003a80]"
              >
                Disclaimer
              </button>
            </span>
          </Checkbox>
        </Form.Item>

        {/* Submit Button */}
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full h-[38px] sm:h-[40px] rounded-[8px] bg-[#22c55e] hover:!bg-[#1ea850] active:!bg-[#168a3f] text-white font-bold text-[14.5px] border-none shadow-sm cursor-pointer transition-all flex items-center justify-center"
          style={{ backgroundColor: "#22c55e" }}
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

export default function BrochureModal({
  isOpen,
  onClose,
  universityName = "University Online",
  courses = [],
  selectedCourse = "",
  brand = {},
  onOpenDisclaimer,
}) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={380}
      destroyOnHidden
      className="brochure-modal-custom p-0 max-w-[calc(100vw-24px)] mx-auto"
      styles={{
        content: {
          borderRadius: "14px",
          padding: "18px 20px 16px 20px",
          boxShadow: "0 18px 40px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {isOpen && (
        <BrochureForm
          onClose={onClose}
          universityName={universityName}
          courses={courses}
          selectedCourse={selectedCourse}
          brand={brand}
          onOpenDisclaimer={onOpenDisclaimer}
        />
      )}
    </Modal>
  );
}
