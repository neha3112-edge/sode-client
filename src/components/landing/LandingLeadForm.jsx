"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Checkbox, message } from "antd";
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

// Mobile Phone Input with Grey Flag Pill using Ant Design Input
const PhoneInputField = ({
  value,
  onChange,
  placeholder = "Enter your Number",
  maxLength = 10,
  isWhiteCard = false,
  bordered = false,
}) => {
  const isBordered = isWhiteCard || bordered;
  return (
    <Input
      type="tel"
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      prefix={
        <span
          className={`flex items-center gap-1.5 h-full px-2.5 select-none shrink-0 rounded-l-[5px] ${isBordered
              ? "bg-[#f8fafc] border-r border-[#cccccc]"
              : "bg-[#f0f2f5] border-r border-[#d1d5db]"
            }`}
          style={{ margin: "-5px 10px -5px -11px" }}
        >
          <IndiaFlag />
          <span className="text-slate-900 font-bold text-[12.5px] tracking-tight">+91</span>
          <span className="text-slate-500 text-[9px] leading-none">▾</span>
        </span>
      }
      className={`w-full h-[36px] sm:h-[38px] text-[13px] rounded-[6px] ${isBordered
          ? "bg-white border-[#cccccc] text-slate-800"
          : "bg-white border-none shadow-xs text-slate-800"
        }`}
    />
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

  const isWhiteCard =
    variant === "white-card" ||
    variant === "whiteCard" ||
    activeBrand.hero?.formCardType === "white" ||
    activeBrand.hero?.cardStyle === "white";

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
      className={`landing-lead-card relative w-full max-w-full sm:max-w-[360px] lg:max-w-[360px] lg:ml-auto lg:mr-0 mx-auto overflow-hidden ${isWhiteCard ? "text-slate-800" : "text-white"
        } ${isCard ? "landing-lead-card--hero" : "landing-lead-card--default"} ${className}`}
      style={{
        ...(isWhiteCard
          ? {
            backgroundColor: "#ffffff",
            borderRadius: "14px",
            padding: "18px 18px",
            boxShadow: "0 14px 32px rgba(0, 0, 0, 0.22)",
            border: "1px solid rgba(226, 232, 240, 0.9)",
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
      {isCard ? (
        <div className="text-center mb-2.5">
          <h2
            className="m-0 text-[20px] sm:text-[22px] font-bold tracking-tight leading-tight"
            style={{
              color: isWhiteCard
                ? activeBrand.hero?.formTitleColor || activeBrand.hero?.enquireColor || "#ee3024"
                : activeAccentColor,
            }}
          >
            {activeTitle}
          </h2>
          <p
            className={`m-0 mt-0.5 text-[12.5px] sm:text-[13px] font-medium leading-normal ${isWhiteCard ? "text-slate-600" : "text-white"
              }`}
          >
            {activeSubtitle}
          </p>

          {activeBrand.hero?.showDividerBelowSubtitle && (
            <hr className="border-t border-slate-200 mt-2.5 mb-1 w-full" />
          )}

          {showPhoneBadge && activeBrand.hero?.showPhoneBadge !== false && activePhoneText && (
            <div className="flex justify-center mt-1.5 mb-2.5">
              <LandingButton
                href={`tel:${activePhoneHref}`}
                variant="phone"
                skewEffect={true}
                icon={
                  <Phone
                    className={`w-3.5 h-3.5 stroke-[2.5] ${isWhiteCard ? "fill-white text-white" : "fill-black text-black"
                      }`}
                  />
                }
                iconPosition="left"
                className="px-4 py-1.5 text-[13px] rounded-full shadow-xs"
                style={{
                  background:
                    activeBrand.hero?.phoneBadgeBackground ||
                    activeBrand.hero?.formPhoneBg ||
                    (isWhiteCard
                      ? activeBrand.hero?.phoneBadgeBg || "#f78d2d"
                      : activeAccentColor),
                  color: isWhiteCard ? "#ffffff" : "#000000",
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
        className="space-y-2 [&_.ant-form-item]:!mb-2 [&_.ant-form-item-label]:hidden [&_.ant-form-item-explain-error]:!text-red-500 [&_.ant-form-item-explain-error]:!text-[11px] [&_.ant-form-item-explain-error]:!pt-1"
      >
        {/* Full Name */}
        <Form.Item
          name="full_name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input
            placeholder={activeBrand.hero?.namePlaceholder || "Enter Your Name"}
            className={`w-full h-[36px] sm:h-[38px] px-3.5 rounded-[6px] text-[13px] font-normal ${isWhiteCard
                ? "bg-white border-[#cccccc] text-slate-800 placeholder:text-slate-400"
                : "bg-white text-slate-800 placeholder:text-[#888888] border-none shadow-xs"
              }`}
          />
        </Form.Item>

        {activeBrand.hero?.phoneBeforeEmail ? (
          <>
            {/* Mobile Number */}
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Please enter mobile number" },
                { pattern: /^[6-9]\d{9}$/, message: "Enter 10-digit mobile number" },
              ]}
            >
              <PhoneInputField
                placeholder="Enter Mobile Number"
                maxLength={10}
                isWhiteCard={isWhiteCard}
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
              <Input
                type="email"
                placeholder="Enter Your Email"
                className={`w-full h-[36px] sm:h-[38px] px-3.5 rounded-[6px] text-[13px] font-normal ${isWhiteCard
                    ? "bg-white border-[#cccccc] text-slate-800 placeholder:text-slate-400"
                    : "bg-white text-slate-800 placeholder:text-[#888888] border-none shadow-xs"
                  }`}
              />
            </Form.Item>
          </>
        ) : (
          <>
            {/* Email */}
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                type="email"
                placeholder="Enter Your Email"
                className={`w-full h-[36px] sm:h-[38px] px-3.5 rounded-[6px] text-[13px] font-normal ${isWhiteCard
                    ? "bg-white border-[#cccccc] text-slate-800 placeholder:text-slate-400"
                    : "bg-white text-slate-800 placeholder:text-[#888888] border-none shadow-xs"
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
                placeholder="Enter Mobile Number"
                maxLength={10}
                isWhiteCard={isWhiteCard}
              />
            </Form.Item>
          </>
        )}

        {/* Course Select */}
        <Form.Item
          name="course"
          rules={[{ required: true, message: "Please select course" }]}
        >
          <Select
            placeholder="Select Your Course"
            options={activeCourses}
            className="w-full h-[36px] sm:h-[38px] text-[13px]"
          />
        </Form.Item>

        {/* State Select */}
        <Form.Item
          name="state"
          rules={[{ required: true, message: "Please select state" }]}
        >
          <Select
            placeholder="Select Your State"
            options={stateOptions}
            showSearch
            className="w-full h-[36px] sm:h-[38px] text-[13px]"
          />
        </Form.Item>

        {/* Terms Checkbox with Disclaimer Link */}
        {!activeBrand.hero?.hideTermsCheckbox && (
          <Form.Item name="terms" valuePropName="checked" className="!mb-2 !mt-1">
            <Checkbox className="text-[10px] sm:text-[10.5px] leading-tight select-none">
              <span
                className={`font-normal ${isWhiteCard ? "text-slate-600" : isCard ? "text-white" : "text-slate-600"
                  }`}
              >
                I consent to receive university updates via email and mobile number.{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDisclaimer?.();
                  }}
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
            </Checkbox>
          </Form.Item>
        )}

        {/* Submit Button */}
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
              "#22c55e",
            color: activeBrand.hero?.submitButtonTextColor || "#ffffff",
            borderRadius: activeBrand.hero?.submitButtonRadius || "8px",
          }}
        >
          {buttonText}
        </LandingButton>
      </Form>
    </div>
  );
}
