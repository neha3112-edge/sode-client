"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Form, Input, Button, Checkbox, Select, message as staticMessage, App } from "antd";
import {
  ArrowLeft,
  X,
  Mail,
  User,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

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
    utm_source: params.get("utm_source") || parsedData.utm_source || "Organic",
    utm_medium: params.get("utm_medium") || parsedData.utm_medium || "SODE CO IN Organic",
    utm_campaign: params.get("utm_campaign") || parsedData.utm_campaign || "",
    utm_term: params.get("utm_term") || parsedData.utm_term || "",
    utm_content: params.get("utm_content") || parsedData.utm_content || "",
    utm_adgroup: params.get("utm_adgroup") || parsedData.utm_adgroup || "",
    gclid: params.get("gclid") || parsedData.gclid || "",
  };
}

/* =========================================================
   FALLBACK INDIAN STATES LIST
========================================================= */
const DEFAULT_INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Chandigarh", "Puducherry"
];

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

export default function ModalOTP({
  open: controlledOpen,
  onCancel,
  onFinish,
  triggerId = "counselling-form-modal",
}) {
  const router = useRouter();
  const pathname = usePathname();
  const antdApp = App.useApp();
  const message = antdApp?.message || staticMessage;
  const [form] = Form.useForm();

  const [isOpen, setIsOpen] = useState(Boolean(controlledOpen));
  // Steps: 'phone' (1) -> 'otp' (2) -> 'email' (3) -> 'name' (4) -> 'state' (5)
  const [step, setStep] = useState("phone");

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [contextPayload, setContextPayload] = useState(null);
  const [stateOptions, setStateOptions] = useState(DEFAULT_INDIAN_STATES);

  // Fetch States from backend
  useEffect(() => {
    let isMounted = true;
    fetch("/api/state/v1/options")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted) return;
        const list = Array.isArray(data?.result) ? data.result : [];
        if (list.length > 0) {
          const names = list.filter((s) => s?.name && !s.removed).map((s) => s.name);
          if (names.length > 0) setStateOptions(names);
        }
      })
      .catch(() => { });
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync controlled open
  useEffect(() => {
    if (controlledOpen !== undefined) {
      setIsOpen(Boolean(controlledOpen));
    }
  }, [controlledOpen]);

  // Resend countdown timer
  useEffect(() => {
    let interval = null;
    if (step === "otp" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, resendTimer]);

  // Global event listener for modal triggers
  useEffect(() => {
    const handleTriggerClick = (e) => {
      // Ignore clicks happening inside the modal dialog
      if (e.target.closest("[data-modal-container='true']")) return;

      const target = e.target.closest(
        `#${triggerId}-btn, [data-modal="${triggerId}"], [data-target="#${triggerId}"], [data-target="${triggerId}"], a[href="#${triggerId}"]`
      );
      if (target) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
      }
    };

    const handleCustomEvent = (e) => {
      if (e?.detail) {
        setContextPayload(e.detail);
      }
      if (!e.detail || e.detail.targetId === triggerId || !e.detail.targetId) {
        setIsOpen(true);
      }
    };

    document.addEventListener("click", handleTriggerClick);
    window.addEventListener("sode:open-form-modal", handleCustomEvent);
    window.addEventListener("sode:open-counselling-modal", handleCustomEvent);
    window.addEventListener("open-counselling-modal", handleCustomEvent);

    return () => {
      document.removeEventListener("click", handleTriggerClick);
      window.removeEventListener("sode:open-form-modal", handleCustomEvent);
      window.removeEventListener("sode:open-counselling-modal", handleCustomEvent);
      window.removeEventListener("open-counselling-modal", handleCustomEvent);
    };
  }, [triggerId]);

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setStep("phone");
    setPhone("");
    form.resetFields();
    setContextPayload(null);
    if (onCancel) onCancel();
  };

  const handleBack = () => {
    if (step === "otp") setStep("phone");
    else if (step === "email") setStep("otp");
    else if (step === "name") setStep("email");
    else if (step === "state") setStep("name");
  };

  const resolvedUni = (
    contextPayload?.university ||
    contextPayload?.university_name ||
    (typeof window !== "undefined" && window.__CURRENT_PAGE_UNIVERSITY__) ||
    "SODE"
  ).trim();

  /* =========================================================
     STEP 1: SEND OTP (Antd Form)
  ========================================================= */
  const handleSendOtp = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (loading) return;

    try {
      await form.validateFields(["phone", "consent"]);
      const phoneVal = form.getFieldValue("phone");
      const clean = String(phoneVal || "").replace(/\D/g, "").slice(-10);

      setLoading(true);
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: clean, purpose: "counselling" }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to send OTP");
      }

      setPhone(clean);
      message.success(data?.message || `OTP sent to +91 ${clean}`);
      setStep("otp");
      setResendTimer(30);
      setCanResend(false);
      form.setFieldValue("otp", "");
    } catch (err) {
      if (err?.errorFields) return;
      console.error("[ModalOTP handleSendOtp error]:", err);
      message.error(err.message || "Something went wrong sending OTP");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     STEP 2: VERIFY OTP (Antd Form)
  ========================================================= */
  const handleVerifyOtp = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (loading) return;

    try {
      const values = await form.validateFields(["otp"]);
      const otpVal = values?.otp || form.getFieldValue("otp");
      const cleanPhone = phone || String(form.getFieldValue("phone") || "").replace(/\D/g, "").slice(-10);

      setLoading(true);
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone, otp: String(otpVal).trim() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Invalid OTP. Please check and try again.");
      }

      message.success("OTP verified successfully!");
      setStep("email");
    } catch (err) {
      if (err?.errorFields) return;
      message.error(err.message || "Invalid OTP. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    const cleanPhone = phone || String(form.getFieldValue("phone") || "").replace(/\D/g, "").slice(-10);
    if (!cleanPhone) return;

    setLoading(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone, purpose: "counselling" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data?.message || "Failed to resend OTP");
      message.success("OTP resent successfully!");
      setResendTimer(30);
      setCanResend(false);
      form.setFieldValue("otp", "");
    } catch (err) {
      message.error(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     STEP 3: EMAIL ADDRESS
  ========================================================= */
  const handleNextToName = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      await form.validateFields(["email"]);
      setStep("name");
    } catch (err) {
      // Handled by Antd Form
    }
  };

  /* =========================================================
     STEP 4: FULL NAME
  ========================================================= */
  const handleNextToState = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      await form.validateFields(["name"]);
      setStep("state");
    } catch (err) {
      // Handled by Antd Form
    }
  };

  /* =========================================================
     STEP 5: FINAL SUBMIT WITH STATE
  ========================================================= */
  const handleFinalSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (loading) return;

    try {
      await form.validateFields(["state"]);
      const values = form.getFieldsValue(true);
      const cleanPhone = phone || String(values.phone || "").replace(/\D/g, "").slice(-10);

      setLoading(true);
      const payload = {
        phone: cleanPhone,
        name: String(values.name || "").trim(),
        email: String(values.email || "").trim(),
        state: values.state,
        university_name: resolvedUni,
        form_name: contextPayload?.action || contextPayload?.title || "Book 1:1 Free Counseling",
        source: contextPayload?.source || "SODE",
        page_url: typeof window !== "undefined" ? window.location.href : "",
        ...getUTMParams(),
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to submit lead");
      }

      if (onFinish) onFinish(payload);
      handleClose();
      router.push("/thank-you");
    } catch (err) {
      if (err?.errorFields) return;
      console.error("Submit error:", err);
      handleClose();
      router.push("/thank-you");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      data-modal-container="true"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="relative w-full max-w-[390px] md:max-w-[740px] bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row font-sans m-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ==========================================
            ❌ CLOSE BUTTON (Over Image on Mobile, Top-Right on Desktop)
        ========================================== */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer border-none shadow-xs text-white bg-black/35 hover:bg-black/55 md:text-slate-500 md:bg-slate-100 md:hover:bg-slate-200 md:hover:text-slate-800"
        >
          <X size={18} className="stroke-[2.5]" />
        </button>

        {/* ==========================================
            ⬅️ BACK BUTTON (When step !== 'phone')
        ========================================== */}
        {step !== "phone" && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Back"
            className="absolute top-3 left-3 md:left-[43.5%] z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer border-none shadow-xs text-white bg-black/35 hover:bg-black/55 md:text-slate-600 md:bg-slate-100 md:hover:bg-slate-200 md:hover:text-slate-900"
          >
            <ArrowLeft size={18} className="stroke-[2.5]" />
          </button>
        )}

        {/* ==========================================
            💻 DESKTOP LEFT BANNER (hidden on mobile, uses next/image)
        ========================================== */}
        <div className="hidden md:block md:w-[42%] bg-[#1E6FD9] relative shrink-0 self-start overflow-hidden">
          <Image
            src="/counseling-modal-desktop.png"
            alt="Learn Online. Grow Your Career."
            width={362}
            height={632}
            priority
            sizes="(max-width: 768px) 100vw, 310px"
            className="w-full h-auto block"
          />
        </div>

        {/* ==========================================
            📱 MOBILE TOP BANNER (hidden on desktop, uses next/image)
        ========================================== */}
        <div className="block md:hidden w-full bg-[#1E6FD9] relative shrink-0 overflow-hidden">
          <Image
            src="/counseling-modal-mobile.png"
            alt="Learn Online. Grow Your Career."
            width={308}
            height={103}
            priority
            sizes="(max-width: 480px) 100vw, 390px"
            className="w-full h-auto block"
          />
        </div>

        {/* ==========================================
            FORM CONTENT (Right Side Desktop / Bottom Mobile)
        ========================================== */}
        <div className="w-full md:w-[58%] p-6 sm:p-8 md:p-9 flex flex-col justify-center items-center relative bg-white self-stretch min-h-full">
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            validateTrigger="onSubmit"
            className="w-full my-auto flex flex-col justify-center"
          >
            {/* ==========================================
                STEP 1: PHONE NUMBER
            ========================================== */}
            {step === "phone" && (
              <>
                <div className="text-center mb-5">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight m-0 text-center">
                    Book 1:1 Free Counseling
                  </h2>
                  <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1.5 mb-0 leading-normal text-center">
                    Enter your mobile number to receive an OTP
                  </p>
                </div>

                <Form.Item
                  name="phone"
                  validateTrigger="onSubmit"
                  rules={[
                    { required: true, message: "Please enter your mobile number" },
                    {
                      validator: (_, value) => {
                        const clean = String(value || "").replace(/\D/g, "").slice(-10);
                        if (!clean || clean.length !== 10 || !/^[6-9]\d{9}$/.test(clean)) {
                          return Promise.reject(new Error("Please enter a valid 10-digit mobile number"));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  className="mb-0"
                >
                  <Input
                    type="tel"
                    inputMode="numeric"
                    autoFocus
                    maxLength={10}
                    placeholder="Enter your mobile number"
                    onChange={() => {
                      form.setFields([{ name: "phone", errors: [] }]);
                    }}
                    prefix={
                      <div className="flex items-center gap-1.5 pr-2.5 border-r border-slate-300 shrink-0 select-none mr-2">
                        <IndiaFlagIcon />
                        <span className="text-xs sm:text-sm font-bold text-slate-800">+91</span>
                      </div>
                    }
                    className="rounded-xl h-11 text-xs sm:text-sm font-semibold border-slate-300 hover:border-blue-500 focus:border-blue-600"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  loading={loading}
                  onClick={handleSendOtp}
                  className="w-full mt-4 h-11 rounded-xl font-bold text-sm sm:text-base text-white bg-[#1A73E8] hover:bg-[#1565C0]! border-none flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  {loading ? "Sending OTP..." : "Get OTP"}
                  {!loading && <ArrowRight size={16} className="stroke-[2.5]" />}
                </Button>

                <Form.Item
                  name="consent"
                  valuePropName="checked"
                  initialValue={true}
                  validateTrigger="onSubmit"
                  rules={[
                    {
                      validator: (_, val) =>
                        val ? Promise.resolve() : Promise.reject(new Error("Please accept the terms to proceed")),
                    },
                  ]}
                  className="mt-3.5 mb-0"
                >
                  <Checkbox className="text-[9.5px] sm:text-[10.5px] text-slate-500 leading-snug">
                    I consent to share my details with UGC-DEB approved universities &amp; receive
                    updates via mail/mobile.{" "}
                    <a
                      href="/disclaimer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1A73E8] font-bold hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Disclaimer
                    </a>
                  </Checkbox>
                </Form.Item>
              </>
            )}

            {/* ==========================================
                STEP 2: VERIFY OTP
            ========================================== */}
            {step === "otp" && (
              <>
                <div className="text-center mb-5">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight m-0 text-center">
                    Verify Your Number
                  </h2>
                  <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1.5 mb-0 leading-normal text-center">
                    We've sent a 6-digit OTP to your WhatsApp number +91 {phone}{" "}
                    <button
                      type="button"
                      onClick={() => setStep("phone")}
                      className="text-[#1A73E8] font-bold hover:underline cursor-pointer border-none bg-transparent p-0 inline ml-1"
                    >
                      Edit
                    </button>
                  </p>
                </div>

                <Form.Item
                  name="otp"
                  validateTrigger="onSubmit"
                  rules={[
                    { required: true, message: "Please enter the complete OTP" },
                    {
                      validator: (_, val) => {
                        const str = String(val || "").trim();
                        if (!str || str.length < 6) {
                          return Promise.reject(new Error("Please enter a valid 6-digit OTP"));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                  className="mb-0 text-center [&_.ant-form-item-control-input-content]:flex [&_.ant-form-item-control-input-content]:justify-center"
                >
                  <Input.OTP
                    length={6}
                    size="large"
                    autoFocus
                    onChange={() => {
                      form.setFields([{ name: "otp", errors: [] }]);
                    }}
                    className="my-2 [&_input]:w-10! [&_input]:h-11! sm:[&_input]:w-12! sm:[&_input]:h-13! [&_input]:text-base! sm:[&_input]:text-lg! [&_input]:font-black! [&_input]:rounded-xl!"
                  />
                </Form.Item>

                <div className="mt-3 mb-2 flex items-center justify-center text-xs font-semibold">
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-[#1A73E8] hover:underline font-bold cursor-pointer border-none bg-transparent p-0"
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <span className="text-[#1A73E8] font-medium">
                      Resend OTP (00:{String(resendTimer).padStart(2, "0")})
                    </span>
                  )}
                </div>

                <Button
                  type="primary"
                  loading={loading}
                  onClick={handleVerifyOtp}
                  className="w-full mt-4 h-11 rounded-xl font-bold text-sm sm:text-base text-white bg-[#1A73E8] hover:bg-[#1565C0]! border-none flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                  {!loading && <ArrowRight size={16} className="stroke-[2.5]" />}
                </Button>
              </>
            )}

            {/* ==========================================
                STEP 3: EMAIL ADDRESS
            ========================================== */}
            {step === "email" && (
              <>
                <div className="text-center mb-5">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight m-0 text-center">
                    Your Email Address
                  </h2>
                  <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1.5 mb-0 leading-normal text-center">
                    Enter your email address to get updates and important information.
                  </p>
                </div>

                <Form.Item
                  name="email"
                  validateTrigger="onSubmit"
                  rules={[
                    { required: true, message: "Please enter your email address" },
                    { type: "email", message: "Please enter a valid email address" },
                  ]}
                  className="mb-0"
                >
                  <Input
                    type="email"
                    autoFocus
                    placeholder="Enter your Email Address"
                    onChange={() => form.setFields([{ name: "email", errors: [] }])}
                    prefix={<Mail size={16} className="text-slate-400 mr-2 shrink-0" />}
                    className="rounded-xl h-11 text-xs sm:text-sm font-semibold border-slate-300 hover:border-blue-500 focus:border-blue-600"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  onClick={handleNextToName}
                  className="w-full mt-5 h-11 rounded-xl font-bold text-sm sm:text-base text-white bg-[#1A73E8] hover:bg-[#1565C0]! border-none flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Continue
                  <ArrowRight size={16} className="stroke-[2.5]" />
                </Button>
              </>
            )}

            {/* ==========================================
                STEP 4: FULL NAME
            ========================================== */}
            {step === "name" && (
              <>
                <div className="text-center mb-5">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight m-0 text-center">
                    Your Full Name
                  </h2>
                  <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1.5 mb-0 leading-normal text-center">
                    Please enter your full name as per your official ID or documents.
                  </p>
                </div>

                <Form.Item
                  name="name"
                  validateTrigger="onSubmit"
                  rules={[
                    { required: true, message: "Please enter your full name" },
                    { min: 2, message: "Name must be at least 2 characters" },
                  ]}
                  className="mb-0"
                >
                  <Input
                    type="text"
                    autoFocus
                    placeholder="Enter your Name"
                    onChange={() => form.setFields([{ name: "name", errors: [] }])}
                    prefix={<User size={16} className="text-slate-400 mr-2 shrink-0" />}
                    className="rounded-xl h-11 text-xs sm:text-sm font-semibold border-slate-300 hover:border-blue-500 focus:border-blue-600"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  onClick={handleNextToState}
                  className="w-full mt-5 h-11 rounded-xl font-bold text-sm sm:text-base text-white bg-[#1A73E8] hover:bg-[#1565C0]! border-none flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Continue
                  <ArrowRight size={16} className="stroke-[2.5]" />
                </Button>
              </>
            )}

            {/* ==========================================
                STEP 5: YOUR STATE (FINAL STEP)
            ========================================== */}
            {step === "state" && (
              <>
                <div className="text-center mb-5">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight m-0 text-center">
                    Your State
                  </h2>
                  <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1.5 mb-0 leading-normal text-center">
                    Please select your state as per your official ID or documents.
                  </p>
                </div>

                <Form.Item
                  name="state"
                  validateTrigger="onSubmit"
                  rules={[{ required: true, message: "Please select your state" }]}
                  className="mb-0"
                >
                  <Select
                    showSearch
                    autoFocus
                    placeholder="Select State"
                    onChange={() => form.setFields([{ name: "state", errors: [] }])}
                    prefix={<MapPin size={16} className="text-slate-400 mr-1 shrink-0" />}
                    className="w-full h-11 rounded-xl text-xs sm:text-sm font-semibold [&_.ant-select-selector]:rounded-xl! [&_.ant-select-selector]:h-11! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!"
                    options={stateOptions.map((st) => ({ label: st, value: st }))}
                    filterOption={(input, option) =>
                      (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>

                <Button
                  type="primary"
                  loading={loading}
                  onClick={handleFinalSubmit}
                  className="w-full mt-5 h-11 rounded-xl font-bold text-sm sm:text-base text-white bg-[#1A73E8] hover:bg-[#1565C0]! border-none flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

