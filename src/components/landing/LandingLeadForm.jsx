"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Checkbox, message } from "antd";
import { Phone } from "lucide-react";
import { STATE_OPTIONS } from "@/constants/stateOptions";

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

// Clean Indian Flag SVG
const IndiaFlag = () => (
  <svg
    className="w-[20px] h-[14px] rounded-[1px] shadow-xs shrink-0 select-none"
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

// Mobile Phone Input with Grey Flag Pill
const PhoneInputField = ({
  value,
  onChange,
  placeholder = "Enter 10-digit Mobile Number",
  maxLength = 10,
  bordered = false,
}) => (
  <div
    className={`flex items-center w-full h-[40px] bg-white rounded-[6px] overflow-hidden ${
      bordered
        ? "border border-slate-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
        : "shadow-xs focus-within:ring-2 focus-within:ring-amber-400"
    }`}
  >
    <div className="flex items-center gap-1.5 h-full px-2.5 bg-[#f0f2f5] border-r border-[#d1d5db] select-none shrink-0">
      <IndiaFlag />
      <span className="text-slate-900 font-bold text-[13px] tracking-tight">+91</span>
      <span className="text-slate-600 text-[9px] leading-none">▾</span>
    </div>
    <input
      type="tel"
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full h-full px-3 bg-white text-slate-800 placeholder:text-[#888888] border-none outline-none text-[13.5px] font-normal"
    />
  </div>
);

// Dropdown Select with Arrow
const CustomSelectField = ({
  value,
  onChange,
  placeholder,
  options,
  bordered = false,
}) => (
  <div className="relative w-full">
    <select
      value={value || ""}
      onChange={onChange}
      className={`w-full h-[40px] px-3.5 pr-8 bg-white rounded-[6px] outline-none text-[13.5px] font-normal appearance-none cursor-pointer ${
        bordered
          ? "border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          : "border-none shadow-xs focus:ring-2 focus:ring-amber-400"
      } ${value ? "text-slate-800" : "text-[#888888]"}`}
    >
      <option value="" disabled className="text-[#888888]">
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="text-slate-900">
          {opt.label}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-800">
      <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

export default function LandingLeadForm({
  data,
  brand,
  courses,
  courseList,
  universityName,
  defaultCourse = "",
  formName = "Hero Enquire Form",
  title,
  subtitle,
  buttonText = "Submit",
  phoneText,
  phoneHref,
  showPhoneBadge = true,
  primaryColor,
  accentColor,
  variant = "card",
  className = "",
  style = {},
  onSuccess,
  onOpenDisclaimer,
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const activeBrand = brand || data?.brand || {};
  const activeUniversity = universityName || activeBrand.name || "University Online";
  const rawCourses = courseList || courses || data?.courses || DEFAULT_COURSES;
  const activeCourses = (rawCourses.length > 0 ? rawCourses : DEFAULT_COURSES).map((item) =>
    typeof item === "string" ? { value: item, label: item } : item
  );

  const isWhiteCard =
    variant === "white-card" || activeBrand.hero?.formCardType === "white";
  const isCard = variant === "card" || variant === "hero" || isWhiteCard;

  const activeTitle = title ?? activeBrand.enquireTitle ?? "Get 100% Free Counselling";
  const activeSubtitle = subtitle ?? activeBrand.enquireSubtitle ?? "Academic Experts will assist you!";
  const activePhoneText =
    phoneText ||
    activeBrand.phoneDisplay ||
    activeBrand.phone ||
    "+91 7065 7777 55";
  const activePhoneHref = phoneHref || activePhoneText.replace(/\D/g, "");

  const activePrimaryColor =
    primaryColor ||
    activeBrand.hero?.formBackground ||
    activeBrand.primaryColor ||
    "#08417b";
  const activeAccentColor =
    accentColor ||
    activeBrand.accentColor ||
    activeBrand.goldColor ||
    "#fdb913";

  const stateOptions = STATE_OPTIONS.map((st) =>
    typeof st === "string" ? { value: st, label: st } : st
  );

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const searchParams =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();

      const leadPayload = {
        name: values.full_name,
        email: values.email,
        phone: String(values.phone || "").replace(/\D/g, "").slice(-10),
        course: values.course,
        state: values.state,
        university: activeUniversity,
        source: activeUniversity,
        form_name: formName,
        utm_source: searchParams.get("utm_source") || `${activeUniversity}_LP`,
        utm_medium: searchParams.get("utm_medium") || "Direct",
        utm_campaign: searchParams.get("utm_campaign") || "Online_Admission_2026",
        page_url: typeof window !== "undefined" ? window.location.href : "",
      };

      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      message.success("Thank you! Our expert counselor will contact you shortly.");
      form.resetFields();
      onSuccess?.();
      router.push("/thank-you");
    } catch {
      message.error("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`landing-lead-card relative w-full max-w-full sm:max-w-[420px] lg:ml-auto lg:mr-0 mx-auto overflow-hidden ${
        isWhiteCard ? "text-slate-900" : "text-white"
      } ${isCard ? "landing-lead-card--hero" : "landing-lead-card--default"} ${className}`}
      style={{
        ...(isWhiteCard
          ? {
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              padding: "20px 18px",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.22)",
              border: "1px solid rgba(226, 232, 240, 0.9)",
            }
          : isCard
          ? {
              backgroundColor: activePrimaryColor,
              borderRadius: "14px",
              padding: "16px 14px 18px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
            }
          : {
              backgroundColor: "#ffffff",
              padding: "14px",
            }),
        ...style,
      }}
    >
      {/* Card Header */}
      {isCard ? (
        <div className="text-center mb-3">
          <h2
            className="m-0 text-[20px] sm:text-[22px] font-extrabold tracking-tight leading-tight"
            style={{
              color: isWhiteCard
                ? activeBrand.hero?.formTitleColor || "#004b7a"
                : activeAccentColor,
            }}
          >
            {activeTitle}
          </h2>
          <p
            className={`m-0 mt-0.5 text-[12px] sm:text-[13px] font-medium leading-normal ${
              isWhiteCard ? "text-slate-600" : "text-white"
            }`}
          >
            {activeSubtitle}
          </p>

          {showPhoneBadge && activePhoneText && (
            <div className="flex justify-center mt-2 mb-3">
              <a
                href={`tel:${activePhoneHref}`}
                className={`inline-flex items-center justify-center gap-1.5 px-4 py-1 rounded-full font-bold text-[13.5px] sm:text-[14px] shadow-xs transition-all duration-150 hover:opacity-95 active:scale-95 no-underline cursor-pointer select-none ${
                  isWhiteCard ? "text-white" : "text-black"
                }`}
                style={{
                  backgroundColor: isWhiteCard
                    ? activeBrand.hero?.formPhoneBg || "#f78d2d"
                    : activeAccentColor,
                }}
              >
                <Phone
                  className={`w-3.5 h-3.5 stroke-[2.5] ${
                    isWhiteCard ? "fill-white text-white" : "fill-black text-black"
                  }`}
                />
                <span className="tracking-tight">{activePhoneText}</span>
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-4 text-center">
          <h2 className="m-0 text-xl font-bold" style={{ color: activePrimaryColor }}>
            {activeTitle}
          </h2>
          <p className="m-0 mt-1 text-sm text-slate-500">{activeSubtitle}</p>
        </div>
      )}

      {/* Main Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ course: defaultCourse || undefined, terms: false }}
        className="space-y-2 [&_.ant-form-item]:!mb-2 [&_.ant-form-item-label]:hidden [&_.ant-form-item-explain-error]:!text-red-500 [&_.ant-form-item-explain-error]:!text-[11px] [&_.ant-form-item-explain-error]:!pt-1"
      >
        {/* Full Name */}
        <Form.Item
          name="full_name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <input
            type="text"
            placeholder="Enter Your Name"
            className={`w-full h-[40px] px-3.5 bg-white text-slate-800 placeholder:text-[#888888] rounded-[6px] outline-none text-[13.5px] font-normal ${
              isWhiteCard
                ? "border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                : "border-none shadow-xs focus:ring-2 focus:ring-amber-400"
            }`}
          />
        </Form.Item>

        {/* Email */}
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <input
            type="email"
            placeholder="Enter Your Email"
            className={`w-full h-[40px] px-3.5 bg-white text-slate-800 placeholder:text-[#888888] rounded-[6px] outline-none text-[13.5px] font-normal ${
              isWhiteCard
                ? "border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                : "border-none shadow-xs focus:ring-2 focus:ring-amber-400"
            }`}
          />
        </Form.Item>

        {/* Mobile Number */}
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please enter mobile number" },
            { pattern: /^[6-9]\d{9}$/, message: "Enter 10-digit mobile number" },
          ]}
        >
          <PhoneInputField
            placeholder="Enter Your Number"
            maxLength={10}
            bordered={isWhiteCard}
          />
        </Form.Item>

        {/* Course Select */}
        <Form.Item
          name="course"
          rules={[{ required: true, message: "Please select course" }]}
        >
          <CustomSelectField
            placeholder="Select Your Course"
            options={activeCourses}
            bordered={isWhiteCard}
          />
        </Form.Item>

        {/* State Select */}
        <Form.Item
          name="state"
          rules={[{ required: true, message: "Please select state" }]}
        >
          <CustomSelectField
            placeholder="Select Your State"
            options={stateOptions}
            bordered={isWhiteCard}
          />
        </Form.Item>

        {/* Terms Checkbox */}
        {!activeBrand.hero?.hideTermsCheckbox && (
          <Form.Item name="terms" valuePropName="checked" className="!mb-2.5 !mt-1">
            <label className="flex items-start gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="mt-0.5 w-[14px] h-[14px] rounded-[2px] bg-white border border-slate-300 accent-[#22c55e] cursor-pointer shrink-0"
              />
              <span
                className={`text-[10.5px] leading-tight font-normal ${
                  isWhiteCard ? "text-slate-700" : "text-white"
                }`}
              >
                I consent to receive university updates via email and mobile number.{" "}
                <button
                  type="button"
                  onClick={() => onOpenDisclaimer?.()}
                  className={`font-semibold underline cursor-pointer bg-transparent border-none p-0 inline ${
                    isWhiteCard
                      ? "text-blue-600 hover:text-blue-700"
                      : "text-white hover:text-amber-300"
                  }`}
                >
                  Disclaimer
                </button>
              </span>
            </label>
          </Form.Item>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[42px] text-white font-bold text-[16px] border-none shadow-xs cursor-pointer transition-all flex items-center justify-center mt-2 active:scale-[0.99] hover:opacity-95"
          style={{
            backgroundColor: activeBrand.hero?.submitButtonBackground || "#22c55e",
            color: activeBrand.hero?.submitButtonTextColor || "#ffffff",
            borderRadius: activeBrand.hero?.submitButtonRadius || "8px",
          }}
        >
          {loading ? (
            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            buttonText
          )}
        </button>
      </Form>
    </div>
  );
}
