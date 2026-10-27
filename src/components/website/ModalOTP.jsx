"use client";

import React, { useState, useEffect, useRef } from "react";
import { Modal, message as staticMessage, App } from "antd";
import {
  ArrowLeft,
  X,
  Mail,
  User,
  MapPin,
  ArrowRight,
  ChevronDown,
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

  const [isOpen, setIsOpen] = useState(Boolean(controlledOpen));
  // Steps: 'phone' (1) -> 'otp' (2) -> 'email' (3) -> 'name' (4) -> 'state' (5)
  const [step, setStep] = useState("phone");

  // Form Fields
  const [phone, setPhone] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [consent, setConsent] = useState(true);

  // Validation Errors
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [stateError, setStateError] = useState("");

  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [contextPayload, setContextPayload] = useState(null);
  const [stateOptions, setStateOptions] = useState(DEFAULT_INDIAN_STATES);

  const otpInputRefs = useRef([]);

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
      .catch(() => {});
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

  // Auto-focus first OTP digit when entering otp step
  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    }
  }, [step]);

  // Global event listener for modal triggers
  useEffect(() => {
    const handleTriggerClick = (e) => {
      const target = e.target.closest(
        `#${triggerId}, #${triggerId}-btn, [data-modal="${triggerId}"], [data-target="#${triggerId}"], [data-target="${triggerId}"], a[href="#${triggerId}"]`
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

  const handleClose = () => {
    setIsOpen(false);
    setStep("phone");
    setPhone("");
    setOtpDigits(["", "", "", "", "", ""]);
    setEmail("");
    setName("");
    setSelectedState("");
    setPhoneError("");
    setOtpError("");
    setEmailError("");
    setNameError("");
    setStateError("");
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
     STEP 1: SEND OTP
  ========================================================= */
  const handleSendOtp = async (e) => {
    e?.preventDefault();
    setPhoneError("");

    const clean = phone.replace(/\D/g, "").slice(-10);
    if (!clean || clean.length !== 10 || !/^[6-9]\d{9}$/.test(clean)) {
      setPhoneError("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!consent) {
      setPhoneError("Please accept the consent terms to proceed");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: clean, purpose: "counselling" }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send OTP");
      }

      message.success(data.message || `OTP sent to +91 ${clean}`);
      setStep("otp");
      setResendTimer(30);
      setCanResend(false);
      setOtpDigits(["", "", "", "", "", ""]);
    } catch (err) {
      const errorMsg = err.message || "Something went wrong sending OTP";
      setPhoneError(errorMsg);
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     STEP 2: VERIFY OTP
  ========================================================= */
  const handleOtpDigitChange = (index, value) => {
    setOtpError("");
    const char = value.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);

    if (char && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newDigits = [...otpDigits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasted[i] || "";
    }
    setOtpDigits(newDigits);
    const lastIdx = Math.min(pasted.length, 5);
    otpInputRefs.current[lastIdx]?.focus();
  };

  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    setOtpError("");

    const fullOtp = otpDigits.join("");
    if (!fullOtp || fullOtp.length < 4) {
      setOtpError("Please enter the complete OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp: fullOtp }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Invalid OTP. Please check and try again.");
      }

      message.success("OTP verified successfully!");
      setStep("email");
    } catch (err) {
      const errorMsg = err.message || "Invalid OTP. Please check and try again.";
      setOtpError(errorMsg);
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || !phone) return;
    setLoading(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, purpose: "counselling" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data?.message || "Failed to resend OTP");
      message.success("OTP resent successfully!");
      setResendTimer(30);
      setCanResend(false);
      setOtpDigits(["", "", "", "", "", ""]);
      otpInputRefs.current[0]?.focus();
    } catch (err) {
      message.error(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     STEP 3: EMAIL ADDRESS
  ========================================================= */
  const handleNextToName = (e) => {
    e?.preventDefault();
    setEmailError("");
    const cleanEmail = email.trim();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setStep("name");
  };

  /* =========================================================
     STEP 4: FULL NAME
  ========================================================= */
  const handleNextToState = (e) => {
    e?.preventDefault();
    setNameError("");
    const cleanName = name.trim();
    if (!cleanName || cleanName.length < 2) {
      setNameError("Please enter your full name");
      return;
    }
    setStep("state");
  };

  /* =========================================================
     STEP 5: FINAL SUBMIT WITH STATE
  ========================================================= */
  const handleFinalSubmit = async (e) => {
    e?.preventDefault();
    setStateError("");

    if (!selectedState) {
      setStateError("Please select your state");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        phone,
        name: name.trim(),
        email: email.trim(),
        state: selectedState,
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
      console.error("Submit error:", err);
      handleClose();
      router.push("/thank-you");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      id={triggerId}
      open={isOpen}
      onCancel={handleClose}
      destroyOnHidden
      footer={null}
      closable={false}
      centered
      width={720}
      styles={{
        content: {
          padding: 0,
          borderRadius: "1.25rem",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        },
        body: {
          padding: 0,
        },
      }}
    >
      <div className="w-full bg-white flex flex-col md:flex-row overflow-hidden font-sans">
        {/* ==========================================
            💻 DESKTOP LEFT BANNER (hidden on mobile)
        ========================================== */}
        <div className="hidden md:block md:w-[42%] bg-[#1E6FD9] relative overflow-hidden shrink-0">
          <img
            src="/counseling-modal-desktop.png"
            alt="Learn Online. Grow Your Career."
            className="w-full h-full object-cover object-center block"
          />
        </div>

        {/* ==========================================
            📱 MOBILE TOP BANNER (hidden on desktop)
        ========================================== */}
        <div className="block md:hidden w-full bg-[#1E6FD9] relative overflow-hidden shrink-0 max-h-[145px]">
          <img
            src="/counseling-modal-mobile.png"
            alt="Learn Online. Grow Your Career."
            className="w-full h-full object-cover object-center block"
          />
        </div>

        {/* ==========================================
            FORM CONTENT (Right Side Desktop / Bottom Mobile)
        ========================================== */}
        <div className="w-full md:w-[58%] p-5 sm:p-7 md:p-8 flex flex-col justify-between relative bg-white">
          {/* Top Bar: Back & Close Navigation */}
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            {step !== "phone" ? (
              <button
                type="button"
                onClick={handleBack}
                aria-label="Back"
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer border-none bg-transparent"
              >
                <ArrowLeft size={18} className="stroke-[2.5]" />
              </button>
            ) : (
              <div className="w-8 h-8" />
            )}

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer border-none bg-transparent ml-auto"
            >
              <X size={18} className="stroke-[2.5]" />
            </button>
          </div>

          {/* ==========================================
              STEP 1: PHONE NUMBER
          ========================================== */}
          {step === "phone" && (
            <form onSubmit={handleSendOtp} className="flex flex-col flex-1">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight m-0">
                  Book 1:1 Free Counseling
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1 mb-5 leading-normal">
                  Enter your mobile number to receive an OTP
                </p>

                {/* Phone Input Box */}
                <div
                  className={`flex items-center rounded-xl border bg-white px-3 py-2.5 transition-all shadow-xs ${
                    phoneError
                      ? "border-rose-400 ring-2 ring-rose-100"
                      : "border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100"
                  }`}
                >
                  <div className="flex items-center gap-1.5 pr-2.5 border-r border-slate-300 shrink-0 select-none">
                    <IndiaFlagIcon />
                    <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide">
                      +91
                    </span>
                  </div>

                  <input
                    type="tel"
                    inputMode="numeric"
                    autoFocus
                    maxLength={10}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                      setPhoneError("");
                    }}
                    placeholder="Enter your mobile number"
                    className="w-full pl-3 text-xs sm:text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400 placeholder:font-normal bg-transparent"
                  />
                </div>
                {phoneError && (
                  <p className="text-[11px] text-rose-500 font-medium mt-1.5 ml-1">
                    {phoneError}
                  </p>
                )}

                {/* Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 py-2.5 sm:py-3 px-4 rounded-xl font-bold text-sm sm:text-base text-white bg-[#1A73E8] hover:bg-[#1565C0] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed border-none"
                >
                  {loading ? "Sending OTP..." : "Get OTP"}
                  {!loading && <ArrowRight size={16} className="stroke-[2.5]" />}
                </button>

                {/* Consent & Disclaimer */}
                <div className="mt-3.5 flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="modal-consent-checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer h-3.5 w-3.5"
                  />
                  <label
                    htmlFor="modal-consent-checkbox"
                    className="text-[9.5px] sm:text-[10.5px] text-slate-500 leading-snug cursor-pointer select-none"
                  >
                    I consent to share my details with UGC-DEB approved universities &amp; receive
                    updates via mail/mobile.{" "}
                    <a
                      href="/disclaimer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1A73E8] font-bold hover:underline"
                    >
                      Disclaimer
                    </a>
                  </label>
                </div>
              </div>
            </form>
          )}

          {/* ==========================================
              STEP 2: VERIFY OTP
          ========================================== */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="flex flex-col flex-1">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight m-0">
                  Verify Your Number
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1 mb-5 leading-normal">
                  We've sent a 6-digit OTP to your WhatsApp number +91 {phone}{" "}
                  <button
                    type="button"
                    onClick={() => setStep("phone")}
                    className="text-[#1A73E8] font-bold hover:underline cursor-pointer border-none bg-transparent p-0 inline"
                  >
                    Edit
                  </button>
                </p>

                {/* OTP Boxes (6 digits) */}
                <div className="flex items-center justify-between gap-1.5 sm:gap-2 my-2">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      onPaste={handleOtpPaste}
                      className={`w-10 h-11 xs:w-11 xs:h-12 sm:w-12 sm:h-13 text-center text-base sm:text-lg font-black rounded-xl border bg-white outline-none transition-all shadow-xs ${
                        otpError
                          ? "border-rose-400 ring-2 ring-rose-100"
                          : digit
                          ? "border-blue-600 bg-blue-50/20 text-blue-900"
                          : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900"
                      }`}
                    />
                  ))}
                </div>
                {otpError && (
                  <p className="text-[11px] text-rose-500 font-medium mt-1.5 ml-1">
                    {otpError}
                  </p>
                )}

                {/* Resend OTP Timer */}
                <div className="mt-3 mb-2 flex items-center justify-start text-xs font-semibold">
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

                {/* Verify Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 py-2.5 sm:py-3 px-4 rounded-xl font-bold text-sm sm:text-base text-white bg-[#1A73E8] hover:bg-[#1565C0] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed border-none"
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                  {!loading && <ArrowRight size={16} className="stroke-[2.5]" />}
                </button>
              </div>
            </form>
          )}

          {/* ==========================================
              STEP 3: EMAIL ADDRESS
          ========================================== */}
          {step === "email" && (
            <form onSubmit={handleNextToName} className="flex flex-col flex-1">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight m-0">
                  Your Email Address
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1 mb-5 leading-normal">
                  Enter your email address to get updates and important information.
                </p>

                {/* Email Input Box */}
                <div
                  className={`flex items-center rounded-xl border bg-white px-3.5 py-2.5 transition-all shadow-xs ${
                    emailError
                      ? "border-rose-400 ring-2 ring-rose-100"
                      : "border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100"
                  }`}
                >
                  <Mail size={16} className="text-slate-400 shrink-0 mr-2.5" />
                  <input
                    type="email"
                    autoFocus
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    placeholder="Enter your Email Address"
                    className="w-full text-xs sm:text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400 placeholder:font-normal bg-transparent"
                  />
                </div>
                {emailError && (
                  <p className="text-[11px] text-rose-500 font-medium mt-1.5 ml-1">
                    {emailError}
                  </p>
                )}

                {/* Action Button */}
                <button
                  type="submit"
                  className="w-full mt-5 py-2.5 sm:py-3 px-4 rounded-xl font-bold text-sm sm:text-base text-white bg-[#1A73E8] hover:bg-[#1565C0] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer border-none"
                >
                  Continue
                  <ArrowRight size={16} className="stroke-[2.5]" />
                </button>
              </div>
            </form>
          )}

          {/* ==========================================
              STEP 4: FULL NAME
          ========================================== */}
          {step === "name" && (
            <form onSubmit={handleNextToState} className="flex flex-col flex-1">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight m-0">
                  Your Full Name
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1 mb-5 leading-normal">
                  Please enter your full name as per your official ID or documents.
                </p>

                {/* Name Input Box */}
                <div
                  className={`flex items-center rounded-xl border bg-white px-3.5 py-2.5 transition-all shadow-xs ${
                    nameError
                      ? "border-rose-400 ring-2 ring-rose-100"
                      : "border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100"
                  }`}
                >
                  <User size={16} className="text-slate-400 shrink-0 mr-2.5" />
                  <input
                    type="text"
                    autoFocus
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setNameError("");
                    }}
                    placeholder="Enter your Name"
                    className="w-full text-xs sm:text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400 placeholder:font-normal bg-transparent"
                  />
                </div>
                {nameError && (
                  <p className="text-[11px] text-rose-500 font-medium mt-1.5 ml-1">
                    {nameError}
                  </p>
                )}

                {/* Action Button */}
                <button
                  type="submit"
                  className="w-full mt-5 py-2.5 sm:py-3 px-4 rounded-xl font-bold text-sm sm:text-base text-white bg-[#1A73E8] hover:bg-[#1565C0] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer border-none"
                >
                  Continue
                  <ArrowRight size={16} className="stroke-[2.5]" />
                </button>
              </div>
            </form>
          )}

          {/* ==========================================
              STEP 5: YOUR STATE (FINAL STEP)
          ========================================== */}
          {step === "state" && (
            <form onSubmit={handleFinalSubmit} className="flex flex-col flex-1">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight m-0">
                  Your State
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1 mb-5 leading-normal">
                  Please select your state as per your official ID or documents.
                </p>

                {/* State Select Dropdown */}
                <div
                  className={`flex items-center rounded-xl border bg-white px-3.5 py-2.5 transition-all shadow-xs relative ${
                    stateError
                      ? "border-rose-400 ring-2 ring-rose-100"
                      : "border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100"
                  }`}
                >
                  <MapPin size={16} className="text-slate-400 shrink-0 mr-2.5" />
                  <select
                    autoFocus
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setStateError("");
                    }}
                    className="w-full text-xs sm:text-sm font-semibold text-slate-800 outline-none bg-transparent cursor-pointer appearance-none pr-6"
                  >
                    <option value="" disabled>
                      Select State
                    </option>
                    {stateOptions.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="text-slate-400 pointer-events-none absolute right-3"
                  />
                </div>
                {stateError && (
                  <p className="text-[11px] text-rose-500 font-medium mt-1.5 ml-1">
                    {stateError}
                  </p>
                )}

                {/* Final Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-5 py-2.5 sm:py-3 px-4 rounded-xl font-bold text-sm sm:text-base text-white bg-[#1A73E8] hover:bg-[#1565C0] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed border-none"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
}
