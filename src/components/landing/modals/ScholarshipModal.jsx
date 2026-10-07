"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal, Form, Input, Select, Checkbox, Button, message } from "antd";
import confetti from "canvas-confetti";
import { STATE_OPTIONS } from "@/constants/stateOptions";

// ======================================================
// INDIA FLAG SVG COMPONENT
// ======================================================
const IndiaFlag = () => (
  <svg
    className="w-[20px] h-[14px] rounded-[1px] shadow-2xs shrink-0 select-none"
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

const DEFAULT_COURSES = [
  { value: "MBA", label: "MBA" },
  { value: "MCA", label: "MCA" },
  { value: "MCOM", label: "MCOM" },
  { value: "MA", label: "MA" },
  { value: "MSC", label: "MSC" },
  { value: "BBA", label: "BBA" },
  { value: "BCA", label: "BCA" },
  { value: "BCOM", label: "BCOM" },
  { value: "BA", label: "BA" },
];

/**
 * Reusable Scholarship Coupon Code Modal built with Ant Design Modal & Form
 */
export default function ScholarshipModal({
  isOpen,
  onClose,
  universityName = "University Online",
  courses = [],
  brand = {},
  scholarshipModal = {},
  onOpenDisclaimer,
}) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Modal Configuration from JSON
  const modalConfig = scholarshipModal || brand?.scholarshipModal || {};

  // Theme Detection: light vs dark background
  const modalBg =
    modalConfig.modalBg ||
    (brand?.slug === "manipal" ? "#ffffff" : brand?.hero?.formBackground || brand?.primaryColor || "#08417b");

  const isLight =
    modalBg.toLowerCase() === "#fff" ||
    modalBg.toLowerCase() === "#ffffff" ||
    modalBg.toLowerCase() === "white" ||
    modalBg.toLowerCase().startsWith("#f");

  // Colors & Text configuration from JSON with intelligent theme fallbacks
  const titleText = modalConfig.titleText || "Get Scholarship Coupon Code";
  const subtitleText = modalConfig.subtitleText || "Academic Experts will assist you!";

  const titleColor =
    modalConfig.titleColor ||
    (isLight ? "#ee3024" : "#facc15");

  const subtitleColor =
    modalConfig.subtitleColor ||
    (isLight ? "#111827" : "#ffffff");

  const inputBg =
    modalConfig.inputBg ||
    (isLight ? "#f4f6f8" : "#ffffff");

  const inputTextColor = modalConfig.inputTextColor || "#111827";

  const disclaimerColor =
    modalConfig.disclaimerColor ||
    (isLight ? "#374151" : "#ffffff");

  const disclaimerLinkColor =
    modalConfig.disclaimerLinkColor ||
    (isLight ? "#0066cc" : "#ffffff");

  const submitBtnBg = modalConfig.submitBtnBg || "#22c55e";
  const submitBtnText = modalConfig.submitBtnText || "Submit";
  const phonePlaceholder = modalConfig.phonePlaceholder || "Enter Mobile Number";
  const formName = modalConfig.formName || "Scholarship Coupon Modal";

  // Normalize Courses
  const rawCourses = courses && courses.length > 0 ? courses : DEFAULT_COURSES;
  const courseOptions = rawCourses.map((c) =>
    typeof c === "string" ? { value: c, label: c } : c
  );

  const stateOptions = STATE_OPTIONS.map((state) =>
    typeof state === "string" ? { value: state, label: state } : state
  );

  // Lock body scroll and fire confetti sparks on open
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.6 },
          zIndex: 999999,
          colors: ["#ff5722", "#ffb300", "#4caf50", "#2196f3", "#e91e63", "#ffd700"],
        });

        const timer = setTimeout(() => {
          confetti({
            particleCount: 35,
            angle: 60,
            spread: 55,
            origin: { x: 0.15, y: 0.65 },
            zIndex: 999999,
            colors: ["#ffd700", "#ff9800", "#ff3d00", "#4caf50"],
          });
          confetti({
            particleCount: 35,
            angle: 120,
            spread: 55,
            origin: { x: 0.85, y: 0.65 },
            zIndex: 999999,
            colors: ["#ffd700", "#ff9800", "#ff3d00", "#4caf50"],
          });
        }, 180);

        return () => clearTimeout(timer);
      } catch (err) {
        console.error("Confetti error:", err);
      }
    }
  }, [isOpen]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const searchParams =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();

      const leadPayload = {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: String(values.phone || "").replace(/\D/g, "").slice(-10),
        course: values.course,
        state: values.state,
        university: universityName,
        source: universityName,
        form_name: formName,
        utm_source: searchParams.get("utm_source") || `${universityName}_LP`,
        utm_medium: searchParams.get("utm_medium") || "Direct",
        utm_campaign: searchParams.get("utm_campaign") || "Online_Admission_2026",
        page_url: typeof window !== "undefined" ? window.location.href : "",
      };

      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      form.resetFields();
      onClose?.();
      router.push("/thank-you");
    } catch {
      message.error("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={480}
      destroyOnHidden
      styles={{
        content: {
          backgroundColor: modalBg,
          borderRadius: "20px",
          padding: "24px",
          boxShadow: isLight
            ? "0 20px 50px rgba(0, 0, 0, 0.25)"
            : "0 20px 50px rgba(0, 0, 0, 0.6)",
        },
      }}
      className="select-none"
    >
      {/* Modal Heading */}
      <div className="text-center mb-4 sm:mb-5 pt-1">
        <h2
          className="m-0 text-[21px] sm:text-[24px] font-bold tracking-tight leading-snug"
          style={{ color: titleColor }}
        >
          {titleText}
        </h2>
        <p
          className="m-0 mt-1 sm:mt-1.5 text-[13px] sm:text-[14px] font-medium leading-normal"
          style={{ color: subtitleColor }}
        >
          {subtitleText}
        </p>
      </div>

      {/* Ant Design Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ consent: true }}
        className="space-y-1 [&_.ant-form-item]:!mb-3 [&_.ant-form-item-explain-error]:!text-red-500 [&_.ant-form-item-explain-error]:!text-[11px] [&_.ant-form-item-explain-error]:!pt-1"
      >
        {/* Name */}
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input
            placeholder="Enter Your Name"
            className="w-full h-[42px] sm:h-[44px] px-3.5 rounded-[8px] text-[13.5px] sm:text-[14px]"
            style={{
              backgroundColor: inputBg,
              color: inputTextColor,
            }}
          />
        </Form.Item>

        {/* Email */}
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input
            type="email"
            placeholder="Enter Your Email"
            className="w-full h-[42px] sm:h-[44px] px-3.5 rounded-[8px] text-[13.5px] sm:text-[14px]"
            style={{
              backgroundColor: inputBg,
              color: inputTextColor,
            }}
          />
        </Form.Item>

        {/* Phone with India Flag Dropdown */}
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please enter your mobile number" },
            { pattern: /^[6-9]\d{9}$/, message: "Please enter a valid 10-digit number" },
          ]}
        >
          <Input
            type="tel"
            placeholder={phonePlaceholder}
            maxLength={10}
            prefix={
              <span
                className="flex items-center gap-1.5 h-full px-2.5 sm:px-3 border-r select-none shrink-0"
                style={{
                  backgroundColor: isLight ? "#f0f2f5" : "#f8f9fa",
                  borderColor: isLight ? "#e5e7eb" : "#e5e7eb",
                  margin: "-5px 10px -5px -11px",
                }}
              >
                <IndiaFlag />
                <span className="text-slate-900 font-bold text-[13px] tracking-tight">
                  +91
                </span>
                <span className="text-slate-600 text-[10px] leading-none">▾</span>
              </span>
            }
            className="w-full h-[42px] sm:h-[44px] rounded-[8px] text-[13.5px] sm:text-[14px]"
            style={{
              backgroundColor: inputBg,
              color: inputTextColor,
            }}
          />
        </Form.Item>

        {/* Select Course */}
        <Form.Item
          name="course"
          rules={[{ required: true, message: "Please select a course" }]}
        >
          <Select
            placeholder="Select Your Course"
            options={courseOptions}
            className="w-full h-[42px] sm:h-[44px] text-[13.5px] sm:text-[14px]"
          />
        </Form.Item>

        {/* Select State */}
        <Form.Item
          name="state"
          rules={[{ required: true, message: "Please select your state" }]}
        >
          <Select
            showSearch
            placeholder="Select Your State"
            options={stateOptions}
            className="w-full h-[42px] sm:h-[44px] text-[13.5px] sm:text-[14px]"
          />
        </Form.Item>

        {/* Consent Checkbox */}
        <Form.Item
          name="consent"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error("Please agree to the disclaimer")),
            },
          ]}
          className="!mb-2"
        >
          <Checkbox className="text-[11px] sm:text-[11.5px] leading-tight select-none">
            <span style={{ color: disclaimerColor }}>
              I consent to receive university updates via email and mobile number.{" "}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDisclaimer?.();
                }}
                className="underline cursor-pointer font-medium p-0 border-none bg-transparent"
                style={{ color: disclaimerLinkColor }}
              >
                Disclaimer
              </button>
            </span>
          </Checkbox>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item className="!mb-0 !mt-3">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full h-[44px] sm:h-[46px] rounded-[10px] text-white font-bold text-[16px] sm:text-[17px] shadow-md hover:!brightness-105 active:scale-[0.98] transition-all cursor-pointer border-none flex items-center justify-center tracking-tight"
            style={{ backgroundColor: submitBtnBg }}
          >
            {submitBtnText}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}