"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Button, message } from "antd";
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

// Clean Indian Flag SVG
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

// Mobile Phone Input with Grey Flag Pill
const PhoneInputField = ({
  value,
  onChange,
  placeholder = "Enter 10-digit Mobile Number",
  maxLength = 10,
  isWhiteCard = false,
  bordered = false,
}) => {
  const isBordered = isWhiteCard || bordered;
  return (
    <div
      className={`flex items-center w-full h-[36px] sm:h-[38px] rounded-[6px] overflow-hidden ${
        isBordered
          ? "bg-[#f8fafc] border border-slate-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
          : "bg-white shadow-xs focus-within:ring-2 focus-within:ring-amber-400"
      }`}
    >
      <div
        className={`flex items-center gap-1.5 h-full px-2.5 select-none shrink-0 ${
          isBordered
            ? "bg-[#f1f5f9] border-r border-slate-300"
            : "bg-[#f0f2f5] border-r border-[#d1d5db]"
        }`}
      >
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
        className="w-full h-full px-3 bg-white text-slate-800 placeholder:text-slate-400 border-none outline-none text-[13px] font-normal"
      />
    </div>
  );
};

// Dropdown Select with Arrow
const CustomSelectField = ({
  value,
  onChange,
  placeholder,
  options,
  isWhiteCard = false,
  bordered = false,
}) => {
  const isBordered = isWhiteCard || bordered;
  return (
    <div className="relative w-full">
      <select
        value={value || ""}
        onChange={onChange}
        className={`w-full h-[36px] sm:h-[38px] px-3.5 pr-8 rounded-[6px] outline-none text-[13px] font-normal appearance-none cursor-pointer ${
          isBordered
            ? "bg-[#f8fafc] border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
};

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

  const isModal = variant === "modal";
  const isWhiteCard =
    variant === "white-card" ||
    variant === "whiteCard" ||
    isModal ||
    activeBrand.hero?.formCardType === "white" ||
    activeBrand.hero?.cardStyle === "white";

  const isSmu =
    activeBrand.slug === "smu" ||
    activeUniversity.toLowerCase().includes("sikkim") ||
    activeBrand.name?.toLowerCase().includes("sikkim");

  const isCard = (variant === "card" || variant === "hero" || isWhiteCard) && !isModal;

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
      className={`landing-lead-card relative w-full max-w-full sm:max-w-[360px] lg:max-w-[360px] lg:ml-auto lg:mr-0 mx-auto overflow-hidden ${
        isWhiteCard ? "text-slate-800" : "text-white"
      } ${isCard ? "landing-lead-card--hero" : "landing-lead-card--default"} ${className}`}
      style={{
        ...(isWhiteCard
          ? {
              backgroundColor: isSmu ? "#faf8f5" : "#ffffff",
              borderRadius: isSmu ? "22px" : "14px",
              padding: isSmu ? "24px 22px 22px" : "18px 18px",
              boxShadow: isSmu ? "0 14px 40px rgba(0, 0, 0, 0.18)" : "0 14px 32px rgba(0, 0, 0, 0.22)",
              border: isSmu ? "1px solid rgba(226, 232, 240, 0.85)" : "1px solid rgba(226, 232, 240, 0.9)",
            }
          : isCard
          ? {
              backgroundColor: activePrimaryColor,
              borderRadius: "12px",
              padding: "14px 16px 16px",
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
      {isModal ? (
        <div className="text-center mb-3 sm:mb-4">
          <h2 className="m-0 text-[21px] sm:text-[25px] font-black text-[#eb3d24] tracking-tight leading-tight">
            {activeTitle || "Book 100% Free Counseling"}
          </h2>
          <p className="m-0 mt-1 text-[13px] sm:text-[13.5px] text-slate-600 font-normal leading-relaxed max-w-sm mx-auto">
            {activeSubtitle || "Get upto 20% Scholarship Coupon Code."}
          </p>

          {activePhoneText && (
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <Phone className="w-4 h-4 fill-[#004b7a] text-[#004b7a] shrink-0" />
              <a
                href={`tel:${activePhoneHref}`}
                className="text-[#004b7a] font-bold text-[15px] sm:text-[16px] underline underline-offset-2 hover:opacity-85 transition-opacity"
              >
                {activePhoneText}
              </a>
            </div>
          )}
        </div>
      ) : isCard ? (
        <div className="text-center mb-2.5">
          <h2
            className="m-0 text-[20px] sm:text-[22px] font-bold tracking-tight leading-tight"
            style={{
              color: isWhiteCard
                ? isSmu
                  ? "#004b7a"
                  : activeBrand.hero?.formTitleColor || activeBrand.hero?.enquireColor || "#ee3024"
                : activeAccentColor,
            }}
          >
            {activeTitle}
          </h2>
          <p
            className={`m-0 mt-0.5 text-[12.5px] sm:text-[13px] font-medium leading-normal ${
              isWhiteCard ? (isSmu ? "text-[#222222]" : "text-slate-600") : "text-white"
            }`}
          >
            {activeSubtitle}
          </p>

          {showPhoneBadge && activePhoneText && (
            <div className="flex justify-center mt-1.5 mb-2.5">
              <LandingButton
                href={`tel:${activePhoneHref}`}
                variant="phone"
                skewEffect={true}
                icon={
                  <Phone
                    className={`w-3.5 h-3.5 stroke-[2.5] ${
                      isWhiteCard ? "fill-white text-white" : "fill-slate-900 text-slate-900"
                    }`}
                  />
                }
                iconPosition="left"
                className="px-4 py-1.5 text-[13px] rounded-full shadow-xs font-bold"
                style={{
                  background:
                    activeBrand.hero?.phoneBadgeBackground ||
                    activeBrand.hero?.formPhoneBg ||
                    activeBrand.hero?.phoneBadgeBg ||
                    (isWhiteCard ? "#f78d2d" : activeAccentColor || "#ffd200"),
                  color:
                    activeBrand.hero?.phoneBadgeTextColor ||
                    (isWhiteCard ? "#ffffff" : "#111111"),
                  ...activeBrand.hero?.phoneBadgeStyle,
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
        className="space-y-2 [&_.ant-form-item]:!mb-2.5 [&_.ant-form-item-label]:hidden [&_.ant-form-item-explain-error]:!text-red-500 [&_.ant-form-item-explain-error]:!text-[11px] [&_.ant-form-item-explain-error]:!pt-1"
      >
        {/* Full Name */}
        <Form.Item
          name="full_name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          {isWhiteCard ? (
            <Input
              placeholder="Enter Your Name"
              className="w-full !h-[40px] sm:!h-[42px] !text-[13.5px] !rounded-[8px] !bg-white !border !border-[#d1d5db] hover:!border-slate-400 focus:!border-blue-500 focus:!shadow-none !px-3.5"
            />
          ) : (
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full h-[36px] sm:h-[38px] px-3.5 rounded-[6px] outline-none text-[13px] font-normal bg-white text-slate-800 placeholder:text-[#888888] border-none shadow-xs focus:ring-2 focus:ring-amber-400"
            />
          )}
        </Form.Item>

        {/* Email */}
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          {isWhiteCard ? (
            <Input
              type="email"
              placeholder="Enter Your Email"
              className="w-full !h-[40px] sm:!h-[42px] !text-[13.5px] !rounded-[8px] !bg-white !border !border-[#d1d5db] hover:!border-slate-400 focus:!border-blue-500 focus:!shadow-none !px-3.5"
            />
          ) : (
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full h-[36px] sm:h-[38px] px-3.5 rounded-[6px] outline-none text-[13px] font-normal bg-white text-slate-800 placeholder:text-[#888888] border-none shadow-xs focus:ring-2 focus:ring-amber-400"
            />
          )}
        </Form.Item>

        {/* Mobile Number */}
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please enter mobile number" },
            { pattern: /^[6-9]\d{9}$/, message: "Enter 10-digit mobile number" },
          ]}
        >
          {isWhiteCard ? (
            <Input
              prefix={
                <div className="flex items-center gap-1.5 pr-2 mr-1.5 border-r border-[#d1d5db] select-none shrink-0 text-slate-700 text-[12px] font-semibold">
                  <span>IN +91 (India)</span>
                  <span className="text-slate-500 text-[9px] leading-none">▾</span>
                </div>
              }
              placeholder="Enter Your Number"
              maxLength={10}
              className="w-full !h-[40px] sm:!h-[42px] !text-[13.5px] !rounded-[8px] !bg-white !border-[#d1d5db] hover:!border-slate-400 focus-within:!border-blue-500"
            />
          ) : (
            <PhoneInputField
              placeholder="Enter Mobile Number"
              maxLength={10}
              isWhiteCard={isWhiteCard}
            />
          )}
        </Form.Item>

        {/* Course Select */}
        <Form.Item
          name="course"
          rules={[{ required: true, message: "Please select course" }]}
        >
          {isWhiteCard ? (
            <Select
              placeholder="Select Course"
              options={activeCourses}
              className="w-full !h-[40px] sm:!h-[42px] text-[13.5px] [&_.ant-select-selector]:!h-[40px] sm:[&_.ant-select-selector]:!h-[42px] [&_.ant-select-selector]:!rounded-[8px] [&_.ant-select-selector]:!border-[#d1d5db] hover:[&_.ant-select-selector]:!border-slate-400 focus-within:[&_.ant-select-selector]:!border-blue-500 [&_.ant-select-selection-item]:!leading-[38px] sm:[&_.ant-select-selection-item]:!leading-[40px] [&_.ant-select-selection-placeholder]:!leading-[38px] sm:[&_.ant-select-selection-placeholder]:!leading-[40px] [&_.ant-select-selector]:!bg-white [&_.ant-select-arrow]:!text-slate-600"
            />
          ) : (
            <CustomSelectField
              placeholder="Select Course"
              options={activeCourses}
              isWhiteCard={isWhiteCard}
            />
          )}
        </Form.Item>

        {/* State Select */}
        <Form.Item
          name="state"
          rules={[{ required: true, message: "Please select state" }]}
        >
          {isWhiteCard ? (
            <Select
              placeholder="Select State"
              options={stateOptions}
              showSearch
              optionFilterProp="label"
              className="w-full !h-[40px] sm:!h-[42px] text-[13.5px] [&_.ant-select-selector]:!h-[40px] sm:[&_.ant-select-selector]:!h-[42px] [&_.ant-select-selector]:!rounded-[8px] [&_.ant-select-selector]:!border-[#d1d5db] hover:[&_.ant-select-selector]:!border-slate-400 focus-within:[&_.ant-select-selector]:!border-blue-500 [&_.ant-select-selection-item]:!leading-[38px] sm:[&_.ant-select-selection-item]:!leading-[40px] [&_.ant-select-selection-placeholder]:!leading-[38px] sm:[&_.ant-select-selection-placeholder]:!leading-[40px] [&_.ant-select-selector]:!bg-white [&_.ant-select-arrow]:!text-slate-600"
            />
          ) : (
            <CustomSelectField
              placeholder="Select State"
              options={stateOptions}
              isWhiteCard={isWhiteCard}
            />
          )}
        </Form.Item>

        {/* Terms Checkbox with Disclaimer Link */}
        {!activeBrand.hero?.hideTermsCheckbox && (
          <Form.Item name="terms" valuePropName="checked" className="!mb-2.5 !mt-1">
            <label className="flex items-start gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                defaultChecked={false}
                className="mt-0.5 w-[14px] h-[14px] rounded-[3px] bg-white border border-slate-300 accent-[#eb3d24] cursor-pointer shrink-0"
              />
              <span
                className={`text-[10.5px] sm:text-[11px] leading-tight font-normal ${
                  isWhiteCard ? "text-slate-700" : isCard ? "text-white" : "text-slate-600"
                }`}
              >
                I consent to share my details with UGC-DEB approved universities and receive updates via mail/mobile.{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onOpenDisclaimer?.();
                  }}
                  className={`font-semibold underline cursor-pointer bg-transparent border-none p-0 inline ${
                    isWhiteCard
                      ? "text-blue-600 hover:text-blue-800"
                      : isCard
                      ? "text-white hover:text-amber-300"
                      : "text-blue-600 hover:text-blue-800"
                  }`}
                >
                  Disclaimer
                </button>
              </span>
            </label>
          </Form.Item>
        )}

        {/* Submit Button */}
        {isWhiteCard ? (
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full !h-[44px] sm:!h-[46px] !bg-[#eb3d24] hover:!bg-[#d63119] !text-white !font-bold !text-[16px] !rounded-[8px] !border-none !shadow-xs transition-all cursor-pointer flex items-center justify-center tracking-wide mt-2 active:scale-98"
          >
            {buttonText}
          </Button>
        ) : (
          <LandingButton
            type="submit"
            variant="submit"
            loading={loading}
            className="w-full h-[38px] sm:h-[40px] text-[14px] sm:text-[15px] font-bold mt-1"
            style={{
              background:
                activeBrand.hero?.submitButtonBackground ||
                activeBrand.hero?.submitBtnBg ||
                activeBrand.submitBtnBg ||
                "#eb3d24",
              color: activeBrand.hero?.submitButtonTextColor || "#ffffff",
              borderRadius: activeBrand.hero?.submitButtonRadius || "8px",
            }}
          >
            {buttonText}
          </LandingButton>
        )}
      </Form>
    </div>
  );
}
