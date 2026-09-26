"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Checkbox, Button, message } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { getAssetPath } from "@/lib/utils";

// Social Media SVGs
function FacebookIcon({ className = "w-5 h-5 fill-white" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XTwitterIcon({ className = "w-4 h-4 fill-white" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-5 h-5 fill-white" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5 fill-white" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const COUNTRY_OPTIONS = [
  { value: "+91", label: "🇮🇳 +91 (India)" },
  { value: "+1", label: "🇺🇸 +1 (USA)" },
  { value: "+44", label: "🇬🇧 +44 (UK)" },
  { value: "+971", label: "🇦🇪 +971 (UAE)" },
  { value: "+65", label: "🇸🇬 +65 (Singapore)" },
  { value: "+61", label: "🇦🇺 +61 (Australia)" },
  { value: "+966", label: "🇸🇦 +966 (Saudi)" },
  { value: "+974", label: "🇶🇦 +974 (Qatar)" },
];

export function ContactView({
  initialTenantData = null,
  initialCourses = [],
  initialStates = [],
}) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  const tenant = initialTenantData?.result || initialTenantData || {};

  // Dynamic Course list from backend only
  const courseList = useMemo(() => {
    if (Array.isArray(initialCourses) && initialCourses.length > 0) {
      return initialCourses
        .map((c) => ({
          value: c?.name || c?.label || c?.title || (typeof c === "string" ? c : ""),
          label: c?.name || c?.label || c?.title || (typeof c === "string" ? c : ""),
        }))
        .filter((c) => Boolean(c.value) && !c.value.startsWith("__"));
    }
    return [];
  }, [initialCourses]);

  // Dynamic State list from backend only
  const stateList = useMemo(() => {
    if (Array.isArray(initialStates) && initialStates.length > 0) {
      return initialStates
        .map((s) => ({
          value: s?.name || s?.label || (typeof s === "string" ? s : ""),
          label: s?.name || s?.label || (typeof s === "string" ? s : ""),
        }))
        .filter((s) => Boolean(s.value));
    }
    return [];
  }, [initialStates]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const fullPhone = `${countryCode} ${values.phone?.trim()}`;
      const payload = {
        name: values.name?.trim(),
        email: values.email?.trim(),
        phone: fullPhone,
        course: values.course,
        state: values.state,
        form_name: "Contact Us Page Counseling",
        source: "Contact Us",
        utm_source: "Contact Us Page",
        page_url: typeof window !== "undefined" ? window.location.href : "",
      };

      const response = await fetch(getAssetPath("/api/lead"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit request");
      }

      message.success("Thank you! Our counseling expert will reach out to you shortly.");
      form.resetFields();
      router.push("/thank-you");
    } catch (err) {
      message.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Pure data from Tenant backend (no hardcoded fallback text)
  const socialLinks = tenant?.socialLinks || {};
  const counselingPhone = tenant?.counselingPhone || "";
  const contactPhone = tenant?.phone || "";
  const supportEmail = tenant?.email || "";
  const registeredOffice = tenant?.registeredOffice || tenant?.address || "";
  const tenantName = tenant?.name || "";
  const tenantSubtitle = tenant?.subtitle || "";
  const bannerImgUrl = tenant?.bannerImage?.url || null;

  const contactHeroTitle = tenant?.contactHeroTitle || "";
  const contactHeroDescription = tenant?.contactHeroDescription || "";
  const counselingFormTitle = tenant?.counselingFormTitle || "";
  const counselingFormSubtitle = tenant?.counselingFormSubtitle || "";
  const contactDisclaimerText = tenant?.contactDisclaimerText || "";
  const contactSubmitButtonText = tenant?.contactSubmitButtonText || "Submit";

  const hasAnySocial =
    Boolean(socialLinks?.facebook) ||
    Boolean(socialLinks?.twitter_x) ||
    Boolean(socialLinks?.youtube) ||
    Boolean(socialLinks?.instagram);

  return (
    <div className="w-full min-h-screen bg-white font-sans text-slate-800">
      <section
        className="relative w-full text-white pt-10 sm:pt-14 pb-32 sm:pb-36 md:pb-40 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: bannerImgUrl ? `url("${bannerImgUrl}")` : undefined,
          backgroundColor: "#111827",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Semi-transparent dark overlay so background image is clearly visible while ensuring text readability */}
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 z-10">
          {/* Left Title & Paragraph (Dynamically rendered from Tenant model) */}
          {(contactHeroTitle || contactHeroDescription) && (
            <div className="max-w-2xl">
              {contactHeroTitle && (
                <>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight m-0">
                    {contactHeroTitle}
                  </h1>
                  <div className="w-14 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-3 mb-4" />
                </>
              )}

              {contactHeroDescription && (
                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal m-0 max-w-xl">
                  {contactHeroDescription}
                </p>
              )}
            </div>
          )}

          {/* Right Social Media Circles (Render only if present in backend) */}
          {hasAnySocial && (
            <div className="flex items-center gap-3 self-start md:self-center mt-2 md:mt-0">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0077b6] hover:bg-[#0096c7] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md cursor-pointer"
                >
                  <FacebookIcon className="w-5 h-5 fill-white" />
                </a>
              )}

              {socialLinks.twitter_x && (
                <a
                  href={socialLinks.twitter_x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0077b6] hover:bg-[#0096c7] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md cursor-pointer"
                >
                  <XTwitterIcon className="w-4 h-4 fill-white" />
                </a>
              )}

              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0077b6] hover:bg-[#0096c7] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md cursor-pointer"
                >
                  <YouTubeIcon className="w-5 h-5 fill-white" />
                </a>
              )}

              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0077b6] hover:bg-[#0096c7] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md cursor-pointer"
                >
                  <InstagramIcon className="w-5 h-5 stroke-white" />
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          2. MAIN CONTENT (Overlapping Card on Left + Tenant Details on Right)
      ======================================================== */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ────────────────────────────────────────────────────────
              LEFT COLUMN: COUNSELING FORM CARD (Overlaps Hero)
          ──────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 w-full -mt-20 sm:-mt-24 md:-mt-28 z-20">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-6 sm:p-8">
              {/* Card Header (Dynamically rendered from Tenant model) */}
              {(counselingFormTitle || counselingFormSubtitle || counselingPhone) && (
                <div className="text-center mb-5">
                  {counselingFormTitle && (
                    <h2 className="text-xl sm:text-2xl font-black text-[#E03E19] tracking-tight m-0">
                      {counselingFormTitle}
                    </h2>
                  )}
                  {counselingFormSubtitle && (
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium m-0">
                      {counselingFormSubtitle}
                    </p>
                  )}
                  {counselingPhone && (
                    <div className="mt-2.5">
                      <a
                        href={`tel:${counselingPhone.replace(/\s+/g, "")}`}
                        className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#0055A5] hover:text-blue-700 transition-colors"
                      >
                        <PhoneOutlined className="text-sm" />
                        <span>{counselingPhone}</span>
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Form */}
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={false}
                className="mt-6"
              >
                {/* 1. Name */}
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                    { min: 2, message: "Name must be at least 2 characters" },
                  ]}
                  className="mb-3.5"
                >
                  <Input
                    size="large"
                    placeholder="Enter Your Name"
                    className="h-11 rounded-lg border-slate-300 text-sm focus:border-blue-500"
                    disabled={loading}
                  />
                </Form.Item>

                {/* 2. Email */}
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email address" },
                  ]}
                  className="mb-3.5"
                >
                  <Input
                    size="large"
                    type="email"
                    placeholder="Enter Your Email"
                    className="h-11 rounded-lg border-slate-300 text-sm focus:border-blue-500"
                    disabled={loading}
                  />
                </Form.Item>

                {/* 3. Phone with Country Code Selector */}
                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: "Please enter your phone number" },
                    {
                      pattern: /^[0-9]{7,15}$/,
                      message: "Please enter a valid phone number (7-15 digits)",
                    },
                  ]}
                  className="mb-3.5"
                >
                  <div className="flex gap-2">
                    <Select
                      size="large"
                      value={countryCode}
                      onChange={setCountryCode}
                      options={COUNTRY_OPTIONS}
                      className="w-36 sm:w-40 flex-shrink-0 h-11"
                      styles={{ popup: { root: { zIndex: 100000 } } }}
                      disabled={loading}
                    />
                    <Input
                      size="large"
                      placeholder="Enter Your Number"
                      className="h-11 rounded-lg border-slate-300 text-sm flex-1 focus:border-blue-500"
                      disabled={loading}
                    />
                  </div>
                </Form.Item>

                {/* 4. Course Select (Dynamic from backend) */}
                <Form.Item
                  name="course"
                  rules={[{ required: true, message: "Please select a course" }]}
                  className="mb-3.5"
                >
                  <Select
                    size="large"
                    placeholder="Select Course"
                    options={courseList}
                    className="h-11 rounded-lg text-sm w-full"
                    styles={{ popup: { root: { zIndex: 100000 } } }}
                    disabled={loading}
                  />
                </Form.Item>

                {/* 5. State Select (Dynamic from backend) */}
                <Form.Item
                  name="state"
                  rules={[{ required: true, message: "Please select your state" }]}
                  className="mb-4"
                >
                  <Select
                    size="large"
                    placeholder="Select State"
                    options={stateList}
                    className="h-11 rounded-lg text-sm w-full"
                    styles={{ popup: { root: { zIndex: 100000 } } }}
                    disabled={loading}
                  />
                </Form.Item>

                {/* 6. Consent Disclaimer Checkbox */}
                <Form.Item
                  name="consent"
                  valuePropName="checked"
                  initialValue={true}
                  className="mb-4"
                >
                  <Checkbox className="text-[11px] sm:text-xs text-slate-600 leading-tight">
                    {contactDisclaimerText || "I consent to share my details with UGC-DEB approved universities and receive updates via mail/mobile."}{" "}
                    <Link
                      href="/disclaimer"
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Disclaimer
                    </Link>
                  </Checkbox>
                </Form.Item>

                {/* 7. Submit Button */}
                <div className="pt-1">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full h-11 sm:h-12 bg-[#E03E19] hover:bg-[#c43210]! text-white font-bold rounded-lg border-none shadow-md text-sm sm:text-base cursor-pointer transition-all"
                  >
                    {contactSubmitButtonText || "Submit"}
                  </Button>
                </div>
              </Form>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────
              RIGHT COLUMN: TENANT CONTACT INFORMATION
          ──────────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 w-full pt-6 sm:pt-8 lg:pt-10 lg:pl-8">
            {/* Company Name & Subtitle from Tenant (Render only if present) */}
            {(tenantName || tenantSubtitle) && (
              <h2 className="text-xl sm:text-2xl md:text-[26px] font-black text-[#072C50] leading-snug tracking-tight m-0 mb-6">
                {[tenantName, tenantSubtitle].filter(Boolean).join(" ")}
              </h2>
            )}

            {/* Details List (Render items only if they exist in backend) */}
            <div className="space-y-6">
              {/* Registered Office */}
              {registeredOffice && (
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 text-xl text-[#072C50] flex-shrink-0">
                    <EnvironmentOutlined />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#072C50] underline underline-offset-4 decoration-1 m-0">
                      Registered Office :
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed mt-1 m-0 max-w-md">
                      {registeredOffice}
                    </p>
                  </div>
                </div>
              )}

              {/* Email */}
              {supportEmail && (
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 text-xl text-[#072C50] flex-shrink-0">
                    <MailOutlined />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#072C50] underline underline-offset-4 decoration-1 m-0">
                      Email :
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 font-normal mt-1 m-0">
                      <a
                        href={`mailto:${supportEmail}`}
                        className="text-slate-800 hover:text-blue-600 transition-colors"
                      >
                        {supportEmail}
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {/* Contact Phone */}
              {contactPhone && (
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 text-xl text-[#072C50] flex-shrink-0">
                    <PhoneOutlined />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#072C50] underline underline-offset-4 decoration-1 m-0">
                      Contact :
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 font-normal mt-1 m-0">
                      <a
                        href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                        className="text-slate-800 hover:text-blue-600 font-medium transition-colors"
                      >
                        {contactPhone}
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
