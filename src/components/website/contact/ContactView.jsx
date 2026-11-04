"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Checkbox, Button, message as staticMessage, App } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { CheckCircle2 } from "lucide-react";

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

/* =========================================================
   CRISP INDIAN TRICOLOR SVG ICON
========================================================= */
const IndiaFlagIcon = () => (
  <svg
    className="w-5 h-3.5 rounded-[2px] shadow-xs inline-block overflow-hidden shrink-0"
    viewBox="0 0 640 480"
  >
    <path fill="#f93" d="M0 0h640v160H0z" />
    <path fill="#fff" d="M0 160h640v160H0z" />
    <path fill="#128807" d="M0 320h640v160H0z" />
    <circle cx="320" cy="240" r="56" fill="none" stroke="#000080" strokeWidth="8" />
    <circle cx="320" cy="240" r="14" fill="#000080" />
  </svg>
);

/* =========================================================
   EXTRACT UTM & GOOGLE TRACKING PARAMS
========================================================= */
function getUTMParams() {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const storedData = localStorage.getItem("utm_data");
  let parsedData = {};

  try {
    parsedData = storedData ? JSON.parse(storedData) : {};
  } catch {
    parsedData = {};
  }

  return {
    utm_source:
      params.get("utm_source") || parsedData.utm_source || "Contact Us Page",
    utm_medium:
      params.get("utm_medium") || parsedData.utm_medium || "Organic",
    utm_campaign:
      params.get("utm_campaign") || parsedData.utm_campaign || "",
    utm_term: params.get("utm_term") || parsedData.utm_term || "",
    utm_content: params.get("utm_content") || parsedData.utm_content || "",
    utm_adgroup: params.get("utm_adgroup") || parsedData.utm_adgroup || "",
    gclid: params.get("gclid") || parsedData.gclid || "",
  };
}

/* =========================================================
   DYNAMIC STATE & COURSE OPTIONS FETCH (/api/.../v1/options)
========================================================= */
let cachedStateOptions = null;
let stateFetchPromise = null;

async function fetchStateOptions() {
  if (cachedStateOptions) return cachedStateOptions;
  if (stateFetchPromise) return stateFetchPromise;

  stateFetchPromise = (async () => {
    try {
      const res = await fetch("/api/state/v1/options");
      if (!res.ok) throw new Error("Failed to fetch states");
      const data = await res.json();
      const list = Array.isArray(data?.result) ? data.result : [];
      if (list.length > 0) {
        cachedStateOptions = list
          .filter((s) => s?.name && !s.removed)
          .map((s) => ({
            label: s.name,
            value: s.name,
          }));
        return cachedStateOptions;
      }
    } catch (err) {
      console.warn("Could not load dynamic states from /api/state/v1/options:", err);
    } finally {
      stateFetchPromise = null;
    }
    return null;
  })();

  return stateFetchPromise;
}

let cachedCourseOptions = null;
let courseFetchPromise = null;

async function fetchCourseOptions() {
  if (cachedCourseOptions) return cachedCourseOptions;
  if (courseFetchPromise) return courseFetchPromise;

  courseFetchPromise = (async () => {
    try {
      const res = await fetch("/api/courses/v1/options");
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      const list = Array.isArray(data?.result) ? data.result : [];
      if (list.length > 0) {
        cachedCourseOptions = list
          .filter((c) => c?.name && !c.removed)
          .map((c) => ({
            label: c.name,
            value: c.name,
          }));
        return cachedCourseOptions;
      }
    } catch (err) {
      console.warn("Could not load dynamic courses from /api/courses/v1/options:", err);
    } finally {
      courseFetchPromise = null;
    }
    return null;
  })();

  return courseFetchPromise;
}

export function ContactView({
  initialTenantData = null,
  initialCourses = [],
  initialStates = [],
}) {
  const antdApp = App.useApp();
  const message = antdApp?.message || staticMessage;
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const tenant = initialTenantData?.result || initialTenantData || {};

  // ── OTP State for Counseling Form (Antd Input.OTP) ──
  const [otpStep, setOtpStep] = useState("idle"); // 'idle' | 'otp_sent' | 'verified'
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Resend OTP Countdown Timer
  useEffect(() => {
    let interval = null;
    if (otpStep === "otp_sent" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [otpStep, resendTimer]);

  // Dynamic Course list from props with fallback fetch
  const [dynamicCourseOptions, setDynamicCourseOptions] = useState(() => {
    if (Array.isArray(initialCourses) && initialCourses.length > 0) {
      return initialCourses
        .map((c) => ({
          value: c?.name || c?.label || c?.title || (typeof c === "string" ? c : ""),
          label: c?.name || c?.label || c?.title || (typeof c === "string" ? c : ""),
        }))
        .filter((c) => Boolean(c.value) && !c.value.startsWith("__"));
    }
    return cachedCourseOptions || [];
  });

  // Dynamic State list from props with fallback fetch
  const [dynamicStateOptions, setDynamicStateOptions] = useState(() => {
    if (Array.isArray(initialStates) && initialStates.length > 0) {
      return initialStates
        .map((s) => ({
          value: s?.name || s?.label || (typeof s === "string" ? s : ""),
          label: s?.name || s?.label || (typeof s === "string" ? s : ""),
        }))
        .filter((s) => Boolean(s.value));
    }
    return cachedStateOptions || [];
  });

  useEffect(() => {
    let isMounted = true;
    if (dynamicCourseOptions.length === 0) {
      fetchCourseOptions().then((opts) => {
        if (isMounted && opts && opts.length > 0) {
          setDynamicCourseOptions(opts);
        }
      });
    }
    if (dynamicStateOptions.length === 0) {
      fetchStateOptions().then((opts) => {
        if (isMounted && opts && opts.length > 0) {
          setDynamicStateOptions(opts);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [dynamicCourseOptions.length, dynamicStateOptions.length]);

  // Send OTP handler
  const handleSendOtp = async () => {
    try {
      const rawNumber = form.getFieldValue("phone");
      const clean = String(rawNumber || "").replace(/\D/g, "").slice(-10);
      if (!clean || clean.length !== 10) {
        message.error("Please enter a valid 10-digit mobile number");
        form.setFields([{ name: "phone", errors: ["Enter valid 10-digit number"] }]);
        return;
      }

      setSendingOtp(true);
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: clean, purpose: "counselling" }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to send OTP");
      }

      setVerifiedPhone(clean);
      setOtpStep("otp_sent");
      setResendTimer(30);
      setCanResend(false);
      setOtpValue("");
      message.success(data?.message || `6-digit OTP sent to your WhatsApp (+91 ${clean})`);
    } catch (err) {
      console.error("[ContactView handleSendOtp error]:", err);
      message.error(err.message || "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  // Verify OTP handler
  const handleVerifyOtp = async (inputOtp) => {
    const code = String(inputOtp || otpValue || "").trim();
    if (!code || code.length < 6) {
      message.error("Please enter a valid 6-digit OTP");
      return;
    }
    const rawNumber = form.getFieldValue("phone");
    const cleanPhone = verifiedPhone || String(rawNumber || "").replace(/\D/g, "").slice(-10);

    try {
      setVerifyingOtp(true);
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone, otp: code }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Invalid OTP. Please check and try again.");
      }

      setIsPhoneVerified(true);
      setOtpStep("verified");
      message.success("Mobile number verified successfully!");
    } catch (err) {
      message.error(err.message || "Invalid OTP. Please check and try again.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (!canResend) return;
    const rawNumber = form.getFieldValue("phone");
    const cleanPhone = verifiedPhone || String(rawNumber || "").replace(/\D/g, "").slice(-10);
    if (!cleanPhone) return;

    try {
      setSendingOtp(true);
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone, purpose: "counselling" }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) throw new Error(data?.message || "Failed to resend OTP");

      message.success("6-digit OTP resent to your WhatsApp!");
      setResendTimer(30);
      setCanResend(false);
      setOtpValue("");
    } catch (err) {
      message.error(err.message || "Failed to resend OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleSubmit = async (values) => {
    if (!isPhoneVerified) {
      const rawNumber = values.phone || form.getFieldValue("phone");
      const clean = String(rawNumber || "").replace(/\D/g, "").slice(-10);
      if (!clean || clean.length !== 10) {
        message.error("Please enter a valid 10-digit mobile number");
        form.setFields([{ name: "phone", errors: ["Enter valid 10-digit number"] }]);
        return;
      }
      if (otpStep === "otp_sent") {
        message.warning("Please enter the 6-digit OTP sent to your WhatsApp to verify your number.");
        return;
      }
      message.info("Please verify your mobile number with OTP first.");
      handleSendOtp();
      return;
    }

    setLoading(true);
    try {
      const fullPhone = values.phone
        ? `+91${String(values.phone).replace(/\D/g, "").slice(-10)}`
        : "";

      const payload = {
        name: values.name?.trim(),
        email: values.email?.trim(),
        phone: fullPhone,
        course: values.course,
        state: values.state,
        form_name: "Contact Us Page Counseling",
        source: "Contact Us",
        is_verified: true,
        page_url: typeof window !== "undefined" ? window.location.href : "",
        ...getUTMParams(),
      };

      const response = await fetch("/api/lead", {
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
      setIsPhoneVerified(false);
      setOtpStep("idle");
      setOtpValue("");
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
  const bannerImgUrl = tenant?.bannerImage ? (typeof tenant.bannerImage === "string" ? tenant.bannerImage : tenant.bannerImage?.url || tenant.bannerImage?.path || null) : null;

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
    <div className="w-full bg-white font-sans text-slate-800">
      <section
        className="relative w-full text-white pt-10 sm:pt-14 pb-32 sm:pb-36 md:pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          backgroundColor: "#111827",
        }}
      >
        {bannerImgUrl && (
          <Image
            src={bannerImgUrl}
            alt={contactHeroTitle || "Contact Banner"}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center pointer-events-none -z-0"
          />
        )}
        {/* Semi-transparent dark overlay so background image is clearly visible while ensuring text readability */}
        <div className="absolute inset-0 bg-black/45 pointer-events-none z-0" />

        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 z-10">
          {/* Left Title & Paragraph (Dynamically rendered from Tenant model) */}
          {(contactHeroTitle || contactHeroDescription) && (
            <div className="max-w-2xl">
              {contactHeroTitle && (
                <>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight m-0 leading-tight">
                    {contactHeroTitle}
                  </h1>
                  <div className="w-14 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-3 mb-4" />
                </>
              )}

              {contactHeroDescription && (
                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-snug font-normal m-0 max-w-xl">
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
                    <p className="text-xl sm:text-2xl font-black text-[#072C50] tracking-tight m-0 leading-tight">
                      {counselingFormTitle}
                    </p>
                  )}
                  {counselingFormSubtitle && (
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium m-0 leading-snug">
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
                    className="h-11 rounded-xl border-slate-300 text-sm focus:border-[#0C2B4E]"
                    disabled={loading}
                  />
                </Form.Item>

                {/* 2. Mobile Number with +91 [India] prefix and Get OTP button */}
                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: "Please enter your mobile number" },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: "Enter valid 10-digit number",
                    },
                  ]}
                  className="mb-2"
                >
                  <Input
                    prefix={
                      <div className="flex items-center gap-1.5 pr-2.5 mr-2 border-r border-slate-200 select-none">
                        <IndiaFlagIcon />
                        <span className="font-semibold text-slate-700 text-xs">+91</span>
                      </div>
                    }
                    suffix={
                      isPhoneVerified ? (
                        <span className="inline-flex items-center gap-1 text-green-600 font-bold text-xs select-none pr-1">
                          <CheckCircle2 className="w-4 h-4 fill-green-600 text-white" />
                          Verified
                        </span>
                      ) : (
                        <Button
                          type="primary"
                          size="small"
                          onClick={handleSendOtp}
                          loading={sendingOtp}
                          disabled={otpStep === "otp_sent"}
                          className="bg-[#0C2B4E] hover:bg-[#08203b] text-white font-semibold text-xs rounded-lg h-7 px-3 border-none shadow-none cursor-pointer flex items-center justify-center"
                        >
                          Get OTP
                        </Button>
                      )
                    }
                    placeholder="Enter Mobile Number"
                    maxLength={10}
                    disabled={isPhoneVerified || loading}
                    onChange={() => {
                      if (otpStep !== "idle" && !isPhoneVerified) {
                        setOtpStep("idle");
                        setOtpValue("");
                      }
                    }}
                    size="large"
                    className="h-11 rounded-xl border-slate-300 text-sm focus:border-[#0C2B4E]"
                  />
                </Form.Item>

                {/* 2.1 OTP Verification Box (shown when OTP sent and awaiting verification) */}
                {otpStep === "otp_sent" && !isPhoneVerified && (
                  <div className="mb-3.5 pt-1 pb-1 flex flex-col items-end">
                    <span className="text-[11px] sm:text-xs text-slate-500 font-medium mb-1.5 text-right block">
                      Enter 6-digit OTP Received in your Whatsapp
                    </span>
                    <div className="flex justify-end w-full">
                      <Input.OTP
                        length={6}
                        size="large"
                        value={otpValue}
                        onChange={(val) => {
                          setOtpValue(val);
                          if (val && String(val).length === 6) {
                            handleVerifyOtp(val);
                          }
                        }}
                        autoFocus
                        className="[&_input]:w-7! [&_input]:h-9! sm:[&_input]:w-8! sm:[&_input]:h-10! [&_input]:rounded-lg! [&_input]:text-sm! sm:[&_input]:text-base! [&_input]:font-bold! [&_input]:border-slate-300!"
                      />
                    </div>
                    <div className="mt-2 text-right w-full">
                      {canResend ? (
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={sendingOtp}
                          className="text-[#0C2B4E] hover:underline font-bold text-xs cursor-pointer border-none bg-transparent p-0"
                        >
                          Resend OTP
                        </button>
                      ) : (
                        <span className="text-[#0C2B4E] font-medium text-xs">
                          Resend OTP (00:{String(resendTimer).padStart(2, "0")})
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. Email */}
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
                    className="h-11 rounded-xl border-slate-300 text-sm focus:border-[#0C2B4E]"
                    disabled={loading}
                  />
                </Form.Item>

                {/* 4. Course Select (Dynamic from backend with search) */}
                <Form.Item
                  name="course"
                  rules={[{ required: true, message: "Please select a course" }]}
                  className="mb-3.5"
                >
                  <Select
                    size="large"
                    placeholder="Select Course"
                    options={dynamicCourseOptions}
                    showSearch
                    optionFilterProp="label"
                    loading={dynamicCourseOptions.length === 0}
                    className="h-11 rounded-xl text-sm w-full [&_.ant-select-selector]:rounded-xl! [&_.ant-select-selector]:border-slate-300!"
                    styles={{ popup: { root: { zIndex: 100000 } } }}
                    disabled={loading}
                  />
                </Form.Item>

                {/* 5. State Select (Dynamic from backend with search) */}
                <Form.Item
                  name="state"
                  rules={[{ required: true, message: "Please select your state" }]}
                  className="mb-4"
                >
                  <Select
                    size="large"
                    placeholder="Select State"
                    options={dynamicStateOptions}
                    showSearch
                    optionFilterProp="label"
                    loading={dynamicStateOptions.length === 0}
                    className="h-11 rounded-xl text-sm w-full [&_.ant-select-selector]:rounded-xl! [&_.ant-select-selector]:border-slate-300!"
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
                  <Checkbox className="text-[11px] sm:text-xs text-slate-600 leading-snug">
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
                    className="w-full h-11 sm:h-12 bg-[#072C50] hover:bg-[#0c3966]! text-white font-bold rounded-lg border-none shadow-md text-sm sm:text-base cursor-pointer transition-all"
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
              <h2 className="text-xl sm:text-2xl md:text-[26px] font-black text-[#072C50] leading-tight tracking-tight m-0 mb-6">
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
                    <p className="text-sm sm:text-base font-bold text-[#072C50] underline underline-offset-4 decoration-1 m-0 leading-snug">
                      Registered Office :
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 font-normal leading-snug mt-1 m-0 max-w-md">
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
                    <p className="text-sm sm:text-base font-bold text-[#072C50] underline underline-offset-4 decoration-1 m-0 leading-snug">
                      Email :
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 font-normal mt-1 m-0 leading-snug">
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
                    <p className="text-sm sm:text-base font-bold text-[#072C50] underline underline-offset-4 decoration-1 m-0 leading-snug">
                      Contact :
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 font-normal mt-1 m-0 leading-snug">
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
