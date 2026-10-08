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

/**
 * Clean Indian Flag SVG
 */
const IndiaFlag = () => (
  <svg
    className="w-[18px] h-[13px] rounded-[1px] shadow-xs shrink-0 select-none"
    viewBox="0 0 640 480"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
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

/**
 * Reusable Mobile Phone Input with Country Code Pill
 */
const PhoneInputField = ({
  value,
  onChange,
  placeholder = "Enter Mobile Number",
  maxLength = 10,
  fieldHeight = "38px",
  fieldRadius = "6px",
  inputBg = "#ffffff",
  inputText = "#1e293b",
  inputPlaceholder = "#888888",
  inputBorder = "transparent",
  countryCodeBg = "#f0f2f5",
  countryCodeText = "#0f172a",
  countryCodeBorder = "#d1d5db",
}) => {
  const hasBorder = inputBorder && inputBorder !== "none" && inputBorder !== "transparent";

  return (
    <Input
      type="tel"
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      prefix={
        <span
          className="flex items-center gap-1.5 h-full px-2.5 select-none shrink-0"
          style={{
            margin: "-5px 10px -5px -11px",
            backgroundColor: countryCodeBg,
            borderRight: `1px solid ${countryCodeBorder}`,
            borderTopLeftRadius: "5px",
            borderBottomLeftRadius: "5px",
          }}
        >
          <IndiaFlag />
          <span
            className="font-bold text-[12.5px] tracking-tight"
            style={{ color: countryCodeText }}
          >
            +91
          </span>
          <span className="text-slate-400 text-[9px] leading-none">▾</span>
        </span>
      }
      style={{
        height: fieldHeight,
        borderRadius: fieldRadius,
        backgroundColor: inputBg,
        color: inputText,
        border: hasBorder ? (inputBorder.includes("px") ? inputBorder : `1px solid ${inputBorder}`) : "none",
        boxShadow: hasBorder ? "none" : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      }}
      className="w-full text-[13px] placeholder:text-[var(--input-placeholder-color)]"
    />
  );
};

/**
 * GLOBAL REUSABLE ANT DESIGN LEAD FORM COMPONENT
 *
 * Architecture:
 * - Common Ant Design form structure, validation, submission, and event handlers.
 * - Dynamic JSON-driven configuration for content, colors, placeholders, layout, and buttons.
 * - Full backward compatibility with existing LP JSON fields and brand objects.
 */
export default function LandingLeadForm({
  config,
  data,
  brand,
  courses,
  courseList,
  universityName,
  defaultCourse = "",
  formName,
  title,
  subtitle,
  buttonText,
  phoneText,
  phoneHref,
  showPhoneBadge,
  primaryColor,
  accentColor,
  variant,
  maxWidth,
  className = "",
  style = {},
  onSuccess,
  onOpenDisclaimer,
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (defaultCourse) {
      form.setFieldsValue({ course: defaultCourse });
    }
  }, [defaultCourse, form]);

  /* -------------------------------------------------------------
     1. CONFIG RESOLUTION (PRIORITY FLOW)
     hero.form (config) -> hero -> brand -> global defaults
  ------------------------------------------------------------- */
  const activeBrand = brand || data?.brand || {};
  const heroConfig = activeBrand.hero || data?.brand?.hero || {};
  const formConfig = config || heroConfig.form || activeBrand.form || {};

  const colors = formConfig.colors || formConfig.theme || {};
  const layout = formConfig.layout || {};
  const phoneBtnConfig = formConfig.phoneButton || {};
  const submitBtnConfig = formConfig.submitButton || {};

  /* -------------------------------------------------------------
     2. THEME & CARD VARIANT
  ------------------------------------------------------------- */
  const isWhiteCard =
    formConfig.variant === "white" ||
    formConfig.variant === "white-card" ||
    variant === "white-card" ||
    variant === "whiteCard" ||
    heroConfig.formCardType === "white" ||
    heroConfig.cardStyle === "white";

  const isCard =
    formConfig.variant === "card" ||
    formConfig.variant === "hero" ||
    variant === "card" ||
    variant === "hero" ||
    isWhiteCard ||
    variant === undefined;

  /* -------------------------------------------------------------
     3. CONTENT RESOLUTION
  ------------------------------------------------------------- */
  const activeUniversity =
    formConfig.universityName ||
    universityName ||
    activeBrand.name ||
    "University Online";

  const activeTitle =
    title ??
    formConfig.title ??
    heroConfig.enquireTitle ??
    activeBrand.enquireTitle ??
    "Get 100% Free Counselling";

  const activeSubtitle =
    subtitle ??
    formConfig.subtitle ??
    heroConfig.enquireSubtitle ??
    activeBrand.enquireSubtitle ??
    "Academic Experts will assist you!";

  const namePlaceholder =
    formConfig.namePlaceholder ||
    heroConfig.namePlaceholder ||
    "Enter Your Name";

  const emailPlaceholder =
    formConfig.emailPlaceholder ||
    "Enter Your Email";

  const phonePlaceholder =
    formConfig.phonePlaceholder ||
    "Enter Mobile Number";

  const coursePlaceholder =
    formConfig.coursePlaceholder ||
    "Select Your Course";

  const statePlaceholder =
    formConfig.statePlaceholder ||
    "Select Your State";

  const consentText =
    formConfig.consentText ||
    "I consent to receive university updates via email and mobile number.";

  const disclaimerText =
    formConfig.disclaimerText ||
    "Disclaimer";

  const activeSubmitText =
    buttonText ||
    formConfig.submitText ||
    submitBtnConfig.text ||
    formConfig.buttonText ||
    heroConfig.formButtonText ||
    heroConfig.buttonText ||
    "Submit";

  const hasPhoneBadge =
    formConfig.showPhoneBadge ??
    (showPhoneBadge !== undefined
      ? showPhoneBadge
      : heroConfig.showPhoneBadge !== false);

  const activePhoneText =
    formConfig.phoneText ||
    phoneBtnConfig.text ||
    phoneText ||
    heroConfig.phoneDisplay ||
    activeBrand.phoneDisplay ||
    activeBrand.phone ||
    "+91 7065 7777 55";

  const activePhoneHref =
    formConfig.phoneHref ||
    phoneBtnConfig.href ||
    phoneHref ||
    heroConfig.phoneHref ||
    activeBrand.phoneHref ||
    activeBrand.phone ||
    activePhoneText.replace(/\D/g, "");

  const activeFormName =
    formConfig.formName ||
    formName ||
    "Hero Enquire Form";

  const successMessage =
    formConfig.successMessage ||
    "Thank you! Our expert counselor will contact you shortly.";

  const errorMessage =
    formConfig.errorMessage ||
    "Failed to submit enquiry. Please try again.";

  // Validation messages
  const nameRequiredMsg =
    formConfig.nameRequiredMessage || "Please enter your name";
  const emailRequiredMsg =
    formConfig.emailRequiredMessage || "Please enter your email";
  const emailValidMsg =
    formConfig.emailValidMessage || "Please enter a valid email";
  const phoneRequiredMsg =
    formConfig.phoneRequiredMessage || "Please enter mobile number";
  const phonePatternMsg =
    formConfig.phonePatternMessage || "Enter 10-digit mobile number";
  const courseRequiredMsg =
    formConfig.courseRequiredMessage || "Please select course";
  const stateRequiredMsg =
    formConfig.stateRequiredMessage || "Please select state";

  const hideTerms =
    formConfig.hideTermsCheckbox ??
    heroConfig.hideTermsCheckbox ??
    false;

  const phoneBeforeEmail =
    formConfig.phoneBeforeEmail ??
    heroConfig.phoneBeforeEmail ??
    false;

  /* -------------------------------------------------------------
     4. COLORS & STYLING RESOLUTION
  ------------------------------------------------------------- */
  const cardBg =
    colors.background ||
    (isWhiteCard
      ? "#ffffff"
      : primaryColor ||
        heroConfig.formBackground ||
        activeBrand.primaryColor ||
        "#08417b");

  const titleColor =
    colors.title ||
    (isWhiteCard
      ? heroConfig.formTitleColor || heroConfig.enquireColor || "#ee3024"
      : accentColor ||
        heroConfig.formAccentColor ||
        activeBrand.accentColor ||
        activeBrand.goldColor ||
        "#fdb913");

  const subtitleColor =
    colors.subtitle ||
    heroConfig.formSubtitleColor ||
    (isWhiteCard ? "#475569" : "#ffffff");

  const phoneBadgeBg =
    colors.phoneBackground ||
    phoneBtnConfig.background ||
    heroConfig.phoneBadgeBackground ||
    heroConfig.formPhoneBg ||
    (isWhiteCard
      ? heroConfig.phoneBadgeBg || "#f78d2d"
      : accentColor ||
        heroConfig.formAccentColor ||
        activeBrand.accentColor ||
        activeBrand.goldColor ||
        "#fdb913");

  const phoneBadgeColor =
    colors.phoneText ||
    phoneBtnConfig.textColor ||
    (isWhiteCard ? "#ffffff" : "#000000");

  const phoneBadgeIconColor =
    colors.phoneIcon ||
    phoneBtnConfig.iconColor ||
    phoneBadgeColor;

  const phoneBadgeRadius =
    phoneBtnConfig.radius ||
    heroConfig.phoneBadgeRadius ||
    "999px";

  const inputBg = colors.inputBackground || "#ffffff";
  const inputText = colors.inputText || "#1e293b";
  const inputPlaceholder =
    colors.inputPlaceholder || (isWhiteCard ? "#94a3b8" : "#888888");
  const inputBorder =
    colors.inputBorder || (isWhiteCard ? "#cccccc" : "transparent");

  const selectBg = colors.selectBackground || inputBg;
  const selectText = colors.selectText || inputText;
  const selectPlaceholder =
    colors.selectPlaceholder || colors.inputPlaceholder || inputPlaceholder;
  const selectBorder =
    colors.selectBorder || colors.inputBorder || inputBorder;

  const countryCodeBg =
    colors.countryCodeBackground || (isWhiteCard ? "#f8fafc" : "#f0f2f5");
  const countryCodeText = colors.countryCodeText || "#0f172a";
  const countryCodeBorder =
    colors.countryCodeBorder || (isWhiteCard ? "#cccccc" : "#d1d5db");

  const consentColor =
    colors.consentText ||
    (isWhiteCard ? "#475569" : isCard ? "#ffffff" : "#475569");

  const disclaimerColor =
    colors.disclaimer ||
    (isWhiteCard ? "#2563eb" : isCard ? "#ffffff" : "#2563eb");

  const disclaimerHoverColor =
    colors.disclaimerHover ||
    (isWhiteCard ? "#1d4ed8" : isCard ? "#fde047" : "#1d4ed8");

  const submitBg =
    colors.submitBackground ||
    submitBtnConfig.background ||
    heroConfig.submitButtonBackground ||
    heroConfig.submitBtnBg ||
    activeBrand.submitBtnBg ||
    "#22c55e";

  const submitTextColor =
    colors.submitText ||
    submitBtnConfig.textColor ||
    heroConfig.submitButtonTextColor ||
    "#ffffff";

  const submitBorder =
    colors.submitBorder ||
    submitBtnConfig.border ||
    "none";

  const submitRadius =
    layout.submitButtonRadius ||
    submitBtnConfig.radius ||
    heroConfig.submitButtonRadius ||
    "8px";

  /* -------------------------------------------------------------
     5. LAYOUT & DIMENSIONS
  ------------------------------------------------------------- */
  const cardMaxWidth = maxWidth || layout.maxWidth || "360px";
  const cardPadding =
    layout.padding ||
    (isWhiteCard ? "18px 18px" : isCard ? "14px 16px 16px" : "14px");
  const cardRadius =
    layout.borderRadius ||
    (isWhiteCard ? "14px" : isCard ? "12px" : "0px");
  const cardShadow =
    layout.boxShadow ||
    (isWhiteCard
      ? "0 14px 32px rgba(0, 0, 0, 0.22)"
      : isCard
      ? "0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)"
      : "none");
  const cardBorder =
    layout.border ||
    (isWhiteCard ? "1px solid rgba(226, 232, 240, 0.9)" : "none");

  const fieldHeight = layout.fieldHeight || "38px";
  const fieldRadius = layout.fieldRadius || "6px";
  const fieldGap = layout.fieldGap || "8px";

  /* -------------------------------------------------------------
     6. COURSES & STATE OPTIONS
  ------------------------------------------------------------- */
  const rawCourses =
    formConfig.courseList ||
    courseList ||
    courses ||
    heroConfig.formCourseList ||
    activeBrand.courses ||
    data?.courses ||
    DEFAULT_COURSES;

  const activeCourses = (rawCourses.length > 0 ? rawCourses : DEFAULT_COURSES).map(
    (item) => (typeof item === "string" ? { value: item, label: item } : item)
  );

  const stateOptions = STATE_OPTIONS.map((st) =>
    typeof st === "string" ? { value: st, label: st } : st
  );

  /* -------------------------------------------------------------
     7. FORM SUBMISSION HANDLER (API UNCHANGED)
  ------------------------------------------------------------- */
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
        form_name: activeFormName,
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

      message.success(successMessage);
      form.resetFields();
      onSuccess?.();
      router.push("/thank-you");
    } catch {
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------
     8. REUSABLE FIELD RENDERERS
  ------------------------------------------------------------- */
  const inputCommonStyle = {
    height: fieldHeight,
    borderRadius: fieldRadius,
    backgroundColor: inputBg,
    color: inputText,
    border:
      inputBorder && inputBorder !== "none" && inputBorder !== "transparent"
        ? inputBorder.includes("px")
          ? inputBorder
          : `1px solid ${inputBorder}`
        : "none",
    boxShadow:
      inputBorder && inputBorder !== "none" && inputBorder !== "transparent"
        ? "none"
        : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  };

  const renderNameField = () => (
    <Form.Item
      key="field-name"
      name="full_name"
      rules={[{ required: true, message: nameRequiredMsg }]}
      className="!mb-0"
    >
      <Input
        placeholder={namePlaceholder}
        style={inputCommonStyle}
        className="w-full px-3.5 text-[13px] font-normal placeholder:text-[var(--input-placeholder-color)]"
      />
    </Form.Item>
  );

  const renderEmailField = () => (
    <Form.Item
      key="field-email"
      name="email"
      rules={[
        { required: true, message: emailRequiredMsg },
        { type: "email", message: emailValidMsg },
      ]}
      className="!mb-0"
    >
      <Input
        type="email"
        placeholder={emailPlaceholder}
        style={inputCommonStyle}
        className="w-full px-3.5 text-[13px] font-normal placeholder:text-[var(--input-placeholder-color)]"
      />
    </Form.Item>
  );

  const renderPhoneField = () => (
    <Form.Item
      key="field-phone"
      name="phone"
      rules={[
        { required: true, message: phoneRequiredMsg },
        { pattern: /^[6-9]\d{9}$/, message: phonePatternMsg },
      ]}
      className="!mb-0"
    >
      <PhoneInputField
        placeholder={phonePlaceholder}
        maxLength={10}
        fieldHeight={fieldHeight}
        fieldRadius={fieldRadius}
        inputBg={inputBg}
        inputText={inputText}
        inputPlaceholder={inputPlaceholder}
        inputBorder={inputBorder}
        countryCodeBg={countryCodeBg}
        countryCodeText={countryCodeText}
        countryCodeBorder={countryCodeBorder}
      />
    </Form.Item>
  );

  const renderCourseField = () => (
    <Form.Item
      key="field-course"
      name="course"
      rules={[{ required: true, message: courseRequiredMsg }]}
      className="!mb-0"
    >
      <Select
        placeholder={coursePlaceholder}
        options={activeCourses}
        className="w-full text-[13px] ant-select-custom"
      />
    </Form.Item>
  );

  const renderStateField = () => (
    <Form.Item
      key="field-state"
      name="state"
      rules={[{ required: true, message: stateRequiredMsg }]}
      className="!mb-0"
    >
      <Select
        placeholder={statePlaceholder}
        options={stateOptions}
        className="w-full text-[13px] ant-select-custom"
      />
    </Form.Item>
  );

  const renderConsentField = () => {
    if (hideTerms) return null;
    return (
      <Form.Item
        key="field-consent"
        name="terms"
        valuePropName="checked"
        className="!mb-0 !mt-0.5"
      >
        <Checkbox className="text-[10px] sm:text-[10.5px] leading-tight select-none">
          <span className="font-normal" style={{ color: consentColor }}>
            {consentText}{" "}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDisclaimer?.();
              }}
              style={{ color: disclaimerColor }}
              className="font-semibold underline cursor-pointer bg-transparent border-none p-0 inline hover:opacity-85"
            >
              {disclaimerText}
            </button>
          </span>
        </Checkbox>
      </Form.Item>
    );
  };

  const renderPhoneButton = () => {
    if (!hasPhoneBadge || !activePhoneText) return null;
    return (
      <div className="flex justify-center mt-1.5 mb-2.5">
        <LandingButton
          href={`tel:${activePhoneHref}`}
          variant="phone"
          skewEffect={true}
          radius={phoneBadgeRadius}
          icon={
            <Phone
              className="w-3.5 h-3.5 stroke-[2.5]"
              style={{ color: phoneBadgeIconColor, fill: phoneBadgeIconColor }}
            />
          }
          iconPosition="left"
          className="px-4 py-1.5 text-[13px] shadow-xs"
          style={{
            background: phoneBadgeBg,
            color: phoneBadgeColor,
            ...heroConfig.phoneBadgeStyle,
          }}
        >
          <span className="tracking-tight font-bold">{activePhoneText}</span>
        </LandingButton>
      </div>
    );
  };

  const renderSubmitButton = () => (
    <LandingButton
      type="submit"
      variant="submit"
      loading={loading}
      radius={submitRadius}
      className="w-full text-[14px] sm:text-[15px] font-bold mt-1 shadow-sm"
      style={{
        height: "40px",
        background: submitBg,
        color: submitTextColor,
        border: submitBorder !== "none" ? submitBorder : undefined,
      }}
    >
      {activeSubmitText}
    </LandingButton>
  );

  // Determine Field Sequence
  const fields = phoneBeforeEmail
    ? [renderNameField, renderPhoneField, renderEmailField, renderCourseField, renderStateField]
    : [renderNameField, renderEmailField, renderPhoneField, renderCourseField, renderStateField];

  /* -------------------------------------------------------------
     9. RENDER
  ------------------------------------------------------------- */
  return (
    <div
      className={`landing-lead-card relative w-full ${
        maxWidth === "100%"
          ? "max-w-full"
          : `max-w-full sm:max-w-[${cardMaxWidth}] lg:max-w-[${cardMaxWidth}] lg:ml-auto lg:mr-0`
      } mx-auto overflow-hidden ${
        isWhiteCard ? "text-slate-800" : "text-white"
      } ${isCard ? "landing-lead-card--hero" : "landing-lead-card--default"} ${className}`}
      style={{
        maxWidth: cardMaxWidth,
        backgroundColor: cardBg,
        borderRadius: cardRadius,
        padding: cardPadding,
        boxShadow: cardShadow,
        border: cardBorder,
        // CSS Custom Properties for unified Input & Select placeholder styling
        "--input-placeholder-color": inputPlaceholder,
        "--select-placeholder-color": selectPlaceholder,
        "--select-text-color": selectText,
        "--select-bg": selectBg,
        "--select-border":
          selectBorder && selectBorder !== "none" && selectBorder !== "transparent"
            ? selectBorder.includes("px")
              ? selectBorder
              : `1px solid ${selectBorder}`
            : "none",
        "--select-height": fieldHeight,
        "--select-radius": fieldRadius,
        ...style,
      }}
    >
      {/* Card Header */}
      {isCard ? (
        <div className="text-center mb-2.5">
          <h2
            className="m-0 text-[20px] sm:text-[22px] font-bold tracking-tight leading-tight"
            style={{ color: titleColor }}
          >
            {activeTitle}
          </h2>
          <p
            className="m-0 mt-0.5 text-[12.5px] sm:text-[13px] font-medium leading-normal"
            style={{ color: subtitleColor }}
          >
            {activeSubtitle}
          </p>

          {heroConfig.showDividerBelowSubtitle && (
            <hr className="border-t border-slate-200/40 mt-2.5 mb-1 w-full" />
          )}

          {renderPhoneButton()}
        </div>
      ) : (
        <div className="mb-3 text-center">
          <h2 className="m-0 text-lg font-bold" style={{ color: cardBg }}>
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
        style={{ gap: fieldGap }}
        className="flex flex-col [&_.ant-form-item]:!mb-0 [&_.ant-form-item-label]:hidden [&_.ant-form-item-explain-error]:!text-red-500 [&_.ant-form-item-explain-error]:!text-[11px] [&_.ant-form-item-explain-error]:!pt-0.5 [&_.ant-select-custom_.ant-select-selector]:!bg-[var(--select-bg)] [&_.ant-select-custom_.ant-select-selector]:!border-[var(--select-border)] [&_.ant-select-custom_.ant-select-selector]:!h-[var(--select-height)] [&_.ant-select-custom_.ant-select-selector]:!rounded-[var(--select-radius)] [&_.ant-select-custom_.ant-select-selection-placeholder]:!text-[var(--select-placeholder-color)] [&_.ant-select-custom_.ant-select-selection-placeholder]:!leading-[var(--select-height)] [&_.ant-select-custom_.ant-select-selection-item]:!text-[var(--select-text-color)] [&_.ant-select-custom_.ant-select-selection-item]:!leading-[var(--select-height)]"
      >
        {fields.map((fieldFn) => fieldFn())}
        {renderConsentField()}
        {renderSubmitButton()}
      </Form>
    </div>
  );
}
