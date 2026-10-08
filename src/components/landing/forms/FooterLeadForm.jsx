import React from "react";
import { Form } from "antd";
import { Phone } from "lucide-react";
import LandingContainer from "../LandingContainer";
import {
  FieldName,
  FieldEmail,
  FieldPhone,
  FieldCourse,
  FieldState,
  FieldConsent,
  FieldSubmitButton,
} from "./FooterFormFields";

/**
 * Reusable Footer Lead Form Renderer
 *
 * Supports 3 layouts:
 * - "smu-split": Blue horizontal band with floating white card
 * - "split": Horizontal split grid with left text & 3-column right form
 * - "default": Standard 2-row grid with labels and top header
 */
export default function FooterLeadForm({
  layout = "default",
  form,
  loading = false,
  courses = [],
  stateOptions = [],
  onFinish,
  onOpenDisclaimer,
  config = {},
}) {
  // =========================================================
  // LAYOUT 1: SMU-Split (Horizontal Band + Floating Card)
  // =========================================================
  if (layout === "smu-split") {
    const phoneHref = (config.phone || "+91 7065 7777 55").replace(/\s+/g, "");

    return (
      <section
        id="ftr-frm"
        className="w-full bg-white pt-14 sm:pt-20 pb-14 sm:pb-20 relative overflow-visible select-none"
      >
        {/* Navy Blue Horizontal Band */}
        <div className="w-full bg-[#074a76] relative overflow-visible">
          <div className="max-w-[1240px] xl:max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[190px] sm:min-h-[220px]">
              {/* Left Column: Heading & Subtitle */}
              <div className="lg:col-span-7 text-left text-white py-8 sm:py-10 space-y-2.5">
                <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-white tracking-tight leading-[1.2] m-0">
                  {config.title || "Get Expert Guidance"}
                </h2>
                <div className="space-y-0.5 text-[13.5px] sm:text-[14.5px] text-white/95 leading-[1.6] font-normal max-w-lg">
                  <p className="m-0">Confused about courses or universities?</p>
                  <p className="m-0">
                    {config.subtitle ||
                      "Share your details, and our education experts will guide you with the right information."}
                  </p>
                </div>
              </div>

              {/* Right Column: Floating White Card Overlapping Top and Bottom */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end -my-14 sm:-my-20 lg:-my-24 relative z-20">
                <div className="w-full max-w-[420px] bg-white rounded-[16px] sm:rounded-[20px] p-5 sm:p-6 shadow-[0_12px_45px_rgba(0,0,0,0.16)] border border-slate-200/90 text-slate-900">
                  {/* Card Title */}
                  <h3 className="text-[20px] sm:text-[22px] font-bold text-[#074a76] text-center tracking-tight m-0">
                    {config.cardTitle || "Get 100% Free Counselling"}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] text-slate-600 text-center mt-1 mb-2 font-normal">
                    {config.cardSubtitle || "Academic Experts will assist you!"}
                  </p>

                  {/* Orange Call Pill Button */}
                  <div className="flex justify-center mb-3">
                    <a
                      href={`tel:${phoneHref}`}
                      className="inline-flex items-center gap-1.5 bg-[#f78d2d] hover:bg-[#ea7d1d] text-white font-bold text-[12.5px] sm:text-[13px] px-4 py-1.5 rounded-full shadow-xs transition-colors cursor-pointer no-underline"
                    >
                      <Phone className="w-3.5 h-3.5 fill-current" />
                      <span>{config.phoneDisplay || "+91 7065 7777 55"}</span>
                    </a>
                  </div>

                  {/* Form Fields */}
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="space-y-2.5"
                  >
                    <FieldName
                      placeholder={config.namePlaceholder || "Enter Your Name"}
                      inputClassName="h-[38px] text-[13px] rounded-[6px] border-slate-300 hover:border-slate-400 focus:border-[#074a76]"
                    />

                    <FieldEmail
                      placeholder={config.emailPlaceholder || "Enter Your Email"}
                      inputClassName="h-[38px] text-[13px] rounded-[6px] border-slate-300 hover:border-slate-400 focus:border-[#074a76]"
                    />

                    <FieldPhone
                      placeholder={config.phonePlaceholder || "Enter Your Number"}
                      hasDropdownArrow={true}
                      inputClassName="h-[38px] text-[13px] rounded-[6px] border-slate-300 hover:border-slate-400 focus:border-[#074a76]"
                    />

                    <FieldCourse
                      courses={courses}
                      placeholder={config.coursePlaceholder || "Select Your Course"}
                      selectClassName="w-full h-[38px] text-[13px]"
                    />

                    <FieldState
                      stateOptions={stateOptions}
                      placeholder={config.statePlaceholder || "Select Your State"}
                      selectClassName="w-full h-[38px] text-[13px]"
                    />

                    <FieldConsent
                      onOpenDisclaimer={onOpenDisclaimer}
                      className="text-[10px] sm:text-[10.5px] text-slate-600 leading-tight select-none"
                      disclaimerBtnClassName="font-semibold underline cursor-pointer bg-transparent border-none p-0 inline text-blue-600 hover:text-blue-800"
                      text={config.consentText}
                    />

                    <div className="pt-1">
                      <FieldSubmitButton
                        loading={loading}
                        text={config.submitText || "Submit"}
                        className="bg-[#2cc36c] hover:bg-[#25ab5e] text-white font-bold text-[15px] border-none shadow-none w-full h-[40px] sm:h-[42px] cursor-pointer rounded-lg transition-colors"
                      />
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================
  // LAYOUT 2: Split Layout (Left Header, Right 3-Col Grid)
  // =========================================================
  if (layout === "split") {
    return (
      <section
        id={config.id || "enroll-frm"}
        className="py-10 sm:py-12 lg:py-14 text-white transition-colors select-none"
        style={{ background: config.background || "#08417b" }}
      >
        <LandingContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center max-w-6xl mx-auto">
            {/* Left Header */}
            <div className="lg:col-span-4 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-white m-0">
                {config.title || "Get Expert Guidance"}
              </h2>
              <p className="text-xs sm:text-[13.5px] text-white/90 mt-2 m-0 font-normal leading-relaxed whitespace-pre-line">
                {config.subtitle ||
                  "Confused about courses or universities?\nShare your details, and our education experts will guide you with the right information."}
              </p>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-8">
              <div id="form-ftr">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  initialValues={{ terms: true }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
                    <FieldName
                      placeholder={config.namePlaceholder || "Enter Your Name"}
                      inputClassName="h-[40px] text-[13px] rounded-[5px]"
                    />

                    <FieldEmail
                      placeholder={config.emailPlaceholder || "Enter Your Email"}
                      inputClassName="h-[40px] text-[13px] rounded-[5px]"
                    />

                    <FieldPhone
                      placeholder={config.phonePlaceholder || "Enter 10-digit Mobile Number"}
                      inputClassName="h-[40px] text-[13px] rounded-[5px]"
                    />

                    <FieldCourse
                      courses={courses}
                      placeholder={config.coursePlaceholder || "Select Your Course"}
                      selectClassName="w-full h-[40px] text-[13px]"
                    />

                    <FieldState
                      stateOptions={stateOptions}
                      placeholder={config.statePlaceholder || "Select Your State"}
                      selectClassName="w-full h-[40px] text-[13px]"
                    />

                    <FieldSubmitButton
                      loading={loading}
                      text={config.submitText || "Submit"}
                      className="font-bold text-[15px] border-none shadow-none w-full h-[40px] cursor-pointer rounded-[5px] hover:opacity-95"
                      style={{
                        background: config.submitBtnBg || "#f7b314",
                        color: config.submitBtnText || "#000000",
                      }}
                    />
                  </div>

                  <FieldConsent
                    onOpenDisclaimer={onOpenDisclaimer}
                    className="text-[11px] sm:text-[11.5px] [&_.ant-checkbox+span]:!text-white/90 leading-tight select-none"
                    disclaimerBtnClassName="font-bold underline cursor-pointer bg-transparent border-none p-0 inline text-white hover:text-amber-300"
                    text={config.consentText}
                  />
                </Form>
              </div>
            </div>
          </div>
        </LandingContainer>
      </section>
    );
  }

  // =========================================================
  // LAYOUT 3: Default Layout (Top Header, 2-Row Form with Labels)
  // =========================================================
  return (
    <section
      id={config.id || "enroll-frm"}
      className="py-10 sm:py-12 lg:py-14 text-white transition-colors select-none"
      style={{ background: config.background || "#08417b" }}
    >
      <LandingContainer>
        {/* Header */}
        <div className="mb-5 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#fbcb12] m-0">
            {config.title || "Have Questions?"}
          </h3>
          <p className="text-xs sm:text-sm text-white/90 mt-1 m-0 font-normal">
            {config.subtitle ||
              "Don't hesitate to contact us. Our academic experts are here to assist you!"}
          </p>
        </div>

        {/* Responsive Form */}
        <div id="form-ftr">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ terms: true }}
            className="space-y-3.5 [&_.ant-form-item-label_label]:text-white [&_.ant-form-item-label_label]:text-xs sm:[&_.ant-form-item-label_label]:text-sm [&_.ant-form-item-label_label]:font-medium [&_.ant-form-item-label]:pb-1"
          >
            {/* Row 1: Name, Email, Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <FieldName
                label="Full Name"
                placeholder={config.namePlaceholder || "Enter Your Name"}
                inputClassName="h-[40px] text-[13.5px] rounded-[6px]"
              />

              <FieldEmail
                label="Email Address"
                placeholder={config.emailPlaceholder || "Enter Your Email"}
                inputClassName="h-[40px] text-[13.5px] rounded-[6px]"
              />

              <FieldPhone
                label="Mobile Number"
                placeholder={config.phonePlaceholder || "Enter 10-digit Mobile Number"}
                className="mb-0 sm:col-span-2 md:col-span-1"
                inputClassName="h-[40px] text-[13.5px] rounded-[6px]"
              />
            </div>

            {/* Row 2: Course, State, Submit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 items-end">
              <FieldCourse
                label="Course"
                courses={courses}
                placeholder={config.coursePlaceholder || "Select Your Course"}
                selectClassName="w-full h-[40px] text-[13.5px]"
              />

              <FieldState
                label="State"
                stateOptions={stateOptions}
                placeholder={config.statePlaceholder || "Select Your State"}
                selectClassName="w-full h-[40px] text-[13.5px]"
              />

              <FieldSubmitButton
                loading={loading}
                text={config.submitText || "Submit"}
                id="frm-submit"
                formItemClassName="mb-0 sm:col-span-2 md:col-span-1"
                className="font-bold text-[15px] border-none shadow-none w-full h-[40px] cursor-pointer rounded-[6px] hover:opacity-95"
                style={{
                  background: config.submitBtnBg || "#28a745",
                  color: config.submitBtnText || "#ffffff",
                }}
              />
            </div>

            {/* Row 3: Checkbox Disclaimer */}
            <FieldConsent
              onOpenDisclaimer={onOpenDisclaimer}
              className="text-[11px] sm:text-[11.5px] [&_.ant-checkbox+span]:!text-white/90 leading-tight select-none"
              disclaimerBtnClassName="font-bold underline cursor-pointer bg-transparent border-none p-0 inline text-white hover:text-amber-300"
              text={config.consentText}
            />
          </Form>
        </div>
      </LandingContainer>
    </section>
  );
}
