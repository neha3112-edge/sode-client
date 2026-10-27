"use client";

import React, { useState, useEffect, useRef } from "react";
import { message as staticMessage, App } from "antd";
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
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (loading) return;

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
        throw new Error(data?.message || "Failed to send OTP");
      }

      message.success(data?.message || `OTP sent to +91 ${clean}`);
      setStep("otp");
      setResendTimer(30);
      setCanResend(false);
      setOtpDigits(["", "", "", "", "", ""]);
    } catch (err) {
      console.error("[ModalOTP handleSendOtp error]:", err);
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
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleVerifyOtp(e);
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
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (loading) return;

    setOtpError("");

    const fullOtp = otpDigits.join("");
    if (!fullOtp || fullOtp.length < 4) {
      setOtpError("Please enter the complete OTP");
      return;
    }

    setLoading(true);
    try {
      const cleanPhone = phone.replace(/\D/g, "").slice(-10);
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone, otp: fullOtp }),
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
      const cleanPhone = phone.replace(/\D/g, "").slice(-10);
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
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
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
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
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
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (loading) return;

    setStateError("");

    if (!selectedState) {
      setStateError("Please select your state");
      return;
    }

    setLoading(true);
    try {
      const cleanPhone = phone.replace(/\D/g, "").slice(-10);
      const payload = {
        phone: cleanPhone,
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
            💻 DESKTOP LEFT BANNER (hidden on mobile)
        ========================================== */}
        <div className="hidden md:block md:w-[42%] bg-[#1E6FD9] relative overflow-hidden shrink-0 self-stretch">
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
        <div className="w-full md:w-[58%] p-5 sm:p-7 md:p-8 flex flex-col justify-center relative bg-white">
          {/* ==========================================
              STEP 1: PHONE NUMBER
          ========================================== */}
          {step === "phone" && (
            <form onSubmit={handleSendOtp} className="flex flex-col flex-1">
              <div className="text-center mb-5">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight m-0 text-center">
                  Book 1:1 Free Counseling
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1.5 mb-0 leading-normal text-center">
                  Enter your mobile number to receive an OTP
                </p>
              </div>

              <div>
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
                  <p className="text-[11px] text-rose-500 font-medium mt-1.5 ml-1 text-center">
                    {phoneError}
                  </p>
                )}

                {/* Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleSendOtp}
                  className="w-full mt-4 py-2.5 sm:py-3 px-4 rounded-xl font-bold text-sm sm:text-base text-white bg-[#1A73E8] hover:bg-[#1565C0] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed border-none"
                >
                  {loading ? "Sending OTP..." : "Get OTP"}
                  {!loading && <ArrowRight size={16} className="stroke-[2.5]" />}
                </button>

                {/* Consent & Disclaimer */}
                <div className="mt-3.5 flex items-start gap-2 text-left">
                  <input
                    type="checkbox"
                    id="modal-consent-checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer h-3.5 w-3.5 shrink-0"
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

              <div>
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
                  <p className="text-[11px] text-rose-500 font-medium mt-1.5 ml-1 text-center">
                    {otpError}
                  </p>
                )}

                {/* Resend OTP Timer */}
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

                {/* Verify Button */}
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleVerifyOtp}
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
              <div className="text-center mb-5">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight m-0 text-center">
                  Your Email Address
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1.5 mb-0 leading-normal text-center">
                  Enter your email address to get updates and important information.
                </p>
              </div>

              <div>
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
                  <p className="text-[11px] text-rose-500 font-medium mt-1.5 ml-1 text-center">
                    {emailError}
                  </p>
                )}

                {/* Action Button */}
                <button
                  type="submit"
                  onClick={handleNextToName}
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
              <div className="text-center mb-5">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight m-0 text-center">
                  Your Full Name
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1.5 mb-0 leading-normal text-center">
                  Please enter your full name as per your official ID or documents.
                </p>
              </div>

              <div>
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
                  <p className="text-[11px] text-rose-500 font-medium mt-1.5 ml-1 text-center">
                    {nameError}
                  </p>
                )}

                {/* Action Button */}
                <button
                  type="submit"
                  onClick={handleNextToState}
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
              <div className="text-center mb-5">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight m-0 text-center">
                  Your State
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1.5 mb-0 leading-normal text-center">
                  Please select your state as per your official ID or documents.
                </p>
              </div>

              <div>
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
                  <p className="text-[11px] text-rose-500 font-medium mt-1.5 ml-1 text-center">
                    {stateError}
                  </p>
                )}

                {/* Final Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleFinalSubmit}
                  className="w-full mt-5 py-2.5 sm:py-3 px-4 rounded-xl font-bold text-sm sm:text-base text-white bg-[#1A73E8] hover:bg-[#1565C0] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed border-none"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
