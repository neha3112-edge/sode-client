"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Checkbox, message } from "antd";
import { Phone } from "lucide-react";
import { STATE_OPTIONS } from "@/constants/stateOptions";
import LandingButton from "./LandingButton";

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

// Clean Indian Flag SVG (resolves Windows OS emoji rendering as plain text 'IN')
const IndiaFlag = () => (
  <svg
    className="w-[18px] h-[13px] rounded-[1px] shadow-xs shrink-0 select-none"
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

// Mobile Phone Input with Grey Flag Pill matching Image 1
const PhoneInputField = ({ value, onChange, placeholder = "Enter 10-digit Mobile Number", maxLength = 10, isWhiteCard = false }) => (
  <div className={`flex items-center w-full h-[34px] sm:h-[35px] rounded-[5px] overflow-hidden ${isWhiteCard
    ? "bg-[#f8fafc] border border-slate-200 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500"
    : "bg-white shadow-xs focus-within:ring-2 focus-within:ring-amber-400"
    }`}>
    <div className={`flex items-center gap-1.5 h-full px-2.5 select-none shrink-0 ${isWhiteCard ? "bg-[#f1f5f9] border-r border-slate-200" : "bg-[#f0f2f5] border-r border-[#d1d5db]"
      }`}>
      <IndiaFlag />
      <span className="text-slate-900 font-bold text-[12.5px] tracking-tight">+91</span>
      <span className="text-slate-500 text-[9px] leading-none">▾</span>
    </div>
    <input
      type="tel"
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`w-full h-full px-3 text-slate-800 placeholder:text-slate-400 border-none outline-none text-[12.5px] sm:text-[13px] font-normal ${isWhiteCard ? "bg-transparent" : "bg-white"
        }`}
    />
  </div>
);

// Dropdown Select with Bold Dark Arrow matching Image 1
const CustomSelectField = ({ value, onChange, placeholder, options, isWhiteCard = false }) => (
  <div className="relative w-full">
    <select
      value={value || ""}
      onChange={onChange}
      className={`w-full h-[34px] sm:h-[35px] px-3 pr-8 rounded-[5px] outline-none text-[12.5px] sm:text-[13px] font-normal appearance-none cursor-pointer ${isWhiteCard
        ? "bg-[#f8fafc] border border-slate-200 text-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        : "bg-white border-none shadow-xs focus:ring-2 focus:ring-amber-400"
        } ${value ? "text-slate-800" : "text-slate-400"}`}
    >
      <option value="" disabled className="text-slate-400">
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="text-slate-900">
          {opt.label}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-600">
      <svg className="w-3.5 h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

/**
 * Reusable Landing Lead Form
 * Exact 1:1 match to reference UI (navy card, yellow header, grey phone badge, green submit)
 */
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

  // Fallback chain for full flexibility and reusability
  const activeBrand = brand || data?.brand || {};
  const activeUniversity = universityName || activeBrand.name || "University Online";
  const rawCourses = courseList || courses || data?.courses || DEFAULT_COURSES;
  const activeCourses = (rawCourses.length > 0 ? rawCourses : DEFAULT_COURSES).map((item) =>
    typeof item === "string" ? { value: item, label: item } : item
  );

  const activeTitle = title ?? activeBrand.enquireTitle ?? "Enquire Now";
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

  const isCard = variant === "card" || variant === "hero";

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

  const isWhiteCard = activeBrand.hero?.cardStyle === "white" || variant === "whiteCard";

  return (
    <div
      className={`landing-lead-card relative w-full max-w-[340px] sm:max-w-[350px] lg:max-w-[340px] lg:ml-auto lg:mr-0 mx-auto overflow-hidden ${isWhiteCard ? "text-slate-800" : "text-white"
        } ${isCard ? "landing-lead-card--hero" : "landing-lead-card--default"} ${className}`}
      style={{
        ...(isWhiteCard
          ? {
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "16px 18px 18px",
            boxShadow: "0 15px 35px -8px rgba(0, 0, 0, 0.22), 0 1px 3px rgba(0,0,0,0.05)",
          }
          : isCard
            ? {
              backgroundColor: activePrimaryColor,
              borderRadius: "12px",
              padding: "12px 16px 14px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
            }
            : {
              backgroundColor: "#ffffff",
              padding: "14px",
            }),
        ...style,
      }}
    >
      {/* Card Header matching reference Image 1 */}
      {isCard ? (
        <div className="text-center mb-2.5">
          <h2
            className="m-0 text-[21px] sm:text-[22px] font-bold tracking-tight leading-tight"
            style={{
              color: isWhiteCard ? (activeBrand.hero?.enquireColor || "#ee3024") : activeAccentColor,
            }}
          >
            {activeTitle}
          </h2>
          <p
            className={`m-0 mt-1 mb-2.5 text-[14px] sm:text-[13.5px] font-sharp tracking-tight leading-tight ${isWhiteCard ? "text-slate-800" : "text-white font-medium"
              }`}
          >
            {activeSubtitle}
          </p>

          {showPhoneBadge && activePhoneText && (
            <div className="flex justify-center mt-1 mb-3">
              <LandingButton
                href={`tel:${activePhoneHref}`}
                variant="phone"
                skewEffect={true}
                icon={<Phone className={`w-3.5 h-3.5 stroke-[2.5] ${isWhiteCard ? "fill-white text-white" : "fill-black text-black"}`} />}
                iconPosition="left"
                className="px-4 py-1.5 text-[13px] rounded-full shadow-xs"
                style={{
                  backgroundColor: isWhiteCard ? (activeBrand.hero?.phoneBadgeBg || "#ff5500") : activeAccentColor,
                  color: isWhiteCard ? "#ffffff" : "#000000",
                }}
              >
                <span className="tracking-tight font-bold">{activePhoneText}</span>
              </LandingButton>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-3 text-center">
          <h2 className="m-0 text-lg font-bold" style={{ color: activePrimaryColor }}>
            {activeTitle}
          </h2>
          <p className="m-0 mt-0.5 text-xs text-slate-500">{activeSubtitle}</p>
        </div>
      )}

      {/* Main Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ course: defaultCourse || undefined, terms: false }}
        className="space-y-1.5 [&_.ant-form-item]:!mb-1.5 [&_.ant-form-item-label]:hidden [&_.ant-form-item-explain-error]:!text-red-500 [&_.ant-form-item-explain-error]:!text-[10.5px] [&_.ant-form-item-explain-error]:!pt-0.5"
      >
        {/* Full Name */}
        <Form.Item
          name="full_name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <input
            type="text"
            placeholder="Enter Your Name"
            className={`w-full h-[34px] sm:h-[35px] px-3 rounded-[5px] outline-none text-[12.5px] sm:text-[13px] font-normal ${isWhiteCard
              ? "bg-[#f8fafc] border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              : "bg-white text-slate-800 placeholder:text-[#555555] border-none shadow-xs focus:ring-2 focus:ring-amber-400"
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
            className={`w-full h-[34px] sm:h-[35px] px-3 rounded-[5px] outline-none text-[12.5px] sm:text-[13px] font-normal ${isWhiteCard
              ? "bg-[#f8fafc] border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              : "bg-white text-slate-800 placeholder:text-[#555555] border-none shadow-xs focus:ring-2 focus:ring-amber-400"
              }`}
          />
        </Form.Item>

        {/* Mobile Number with India Flag and Country Code Pill */}
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please enter mobile number" },
            { pattern: /^[6-9]\d{9}$/, message: "Enter 10-digit mobile number" },
          ]}
        >
          <PhoneInputField placeholder="Enter Mobile Number" maxLength={10} isWhiteCard={isWhiteCard} />
        </Form.Item>

        {/* Course Select */}
        <Form.Item
          name="course"
          rules={[{ required: true, message: "Please select course" }]}
        >
          <CustomSelectField
            placeholder="Select Your Course"
            options={activeCourses}
            isWhiteCard={isWhiteCard}
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
            isWhiteCard={isWhiteCard}
          />
        </Form.Item>

        {/* Terms & Conditions Checkbox with Disclaimer Link */}
        <Form.Item name="terms" valuePropName="checked" className="!mb-2 !mt-1">
          <label className="flex items-start gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              className="mt-0.5 w-[13px] h-[13px] rounded-[2px] bg-white border border-slate-300 accent-[#28a745] cursor-pointer shrink-0"
            />
            <span className={`text-[10px] sm:text-[10.5px] leading-tight font-normal ${isWhiteCard ? "text-slate-500" : isCard ? "text-white" : "text-slate-600"}`}>
              I consent to receive university updates via email and mobile number.{" "}
              <button
                type="button"
                onClick={() => onOpenDisclaimer?.()}
                className={`font-semibold underline cursor-pointer bg-transparent border-none p-0 inline ${isWhiteCard
                  ? "text-blue-600 hover:text-blue-700"
                  : isCard
                    ? "text-white hover:text-amber-300"
                    : "text-blue-600 hover:text-blue-700"
                  }`}
              >
                Disclaimer
              </button>
            </span>
          </label>
        </Form.Item>

        {/* Reusable Submit Button */}
        <LandingButton
          type="submit"
          variant="submit"
          loading={loading}
          className="w-full h-[38px] sm:h-[40px] text-[14px] sm:text-[15px] mt-1"
          style={{
            background:
              activeBrand.hero?.submitBtnBg ||
              activeBrand.submitBtnBg ||
              "#28a745",
          }}
        >
          {buttonText}
        </LandingButton>
      </Form>
    </div>
  );
}
