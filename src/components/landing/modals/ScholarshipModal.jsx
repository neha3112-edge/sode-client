"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { STATE_OPTIONS } from "@/constants/stateOptions";

// ======================================================
// INDIA FLAG SVG COMPONENT
// ======================================================
const IndiaFlag = () => (
  <svg
    className="w-[20px] h-[14px] rounded-[1px] shadow-2xs shrink-0 select-none"
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
 * Reusable Scholarship Coupon Code Modal
 * 
 * - All structural layout, sizing, padding, and animations are built-in (CSS in component).
 * - Colors and content come dynamically from JSON (scholarshipModal or brand).
 * - Supports Light theme (e.g. Manipal: White modal, red title, grey inputs)
 * - Supports Dark theme (e.g. Amity: Navy modal, yellow title, white inputs)
 */
export default function ScholarshipModal({
  isOpen,
  onClose,
  universityName = "University Online",
  courses = [],
  brand = {},
  scholarshipModal = {},
  onOpenDisclaimer,
}) {
  const router = useRouter();

  // Modal Configuration from JSON
  const modalConfig = scholarshipModal || brand?.scholarshipModal || {};

  // Theme Detection: light vs dark background
  const modalBg =
    modalConfig.modalBg ||
    (brand?.slug === "manipal" ? "#ffffff" : brand?.hero?.formBackground || brand?.primaryColor || "#08417b");

  const isLight =
    modalBg.toLowerCase() === "#fff" ||
    modalBg.toLowerCase() === "#ffffff" ||
    modalBg.toLowerCase() === "white" ||
    modalBg.toLowerCase().startsWith("#f");

  // Colors & Text configuration from JSON with intelligent theme fallbacks
  const titleText = modalConfig.titleText || "Get Scholarship Coupon Code";
  const subtitleText = modalConfig.subtitleText || "Academic Experts will assist you!";

  const titleColor =
    modalConfig.titleColor ||
    (isLight ? "#ee3024" : "#facc15"); // Red for light, Yellow/Gold for dark

  const subtitleColor =
    modalConfig.subtitleColor ||
    (isLight ? "#111827" : "#ffffff");

  const inputBg =
    modalConfig.inputBg ||
    (isLight ? "#f4f6f8" : "#ffffff");

  const inputTextColor = modalConfig.inputTextColor || "#111827";
  const inputPlaceholderColor = modalConfig.inputPlaceholderColor || "#6b7280";

  const disclaimerColor =
    modalConfig.disclaimerColor ||
    (isLight ? "#374151" : "#ffffff");

  const disclaimerLinkColor =
    modalConfig.disclaimerLinkColor ||
    (isLight ? "#0066cc" : "#ffffff");

  const submitBtnBg = modalConfig.submitBtnBg || "#22c55e"; // Vibrant Green by default
  const submitBtnText = modalConfig.submitBtnText || "Submit";
  const closeBtnColor = modalConfig.closeBtnColor || (isLight ? "#666666" : "#22c55e");
  const phonePlaceholder = modalConfig.phonePlaceholder || "Enter Mobile Number";
  const formName = modalConfig.formName || "Scholarship Coupon Modal";

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    state: "",
    consent: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Normalize Courses
  const rawCourses = courses && courses.length > 0 ? courses : DEFAULT_COURSES;
  const courseOptions = rawCourses.map((c) =>
    typeof c === "string" ? { value: c, label: c } : c
  );

  // Lock body scroll and fire confetti sparks on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose?.();
      };
      window.addEventListener("keydown", handleKeyDown);

      // Trigger celebratory sparks with canvas-confetti
      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.6 },
          zIndex: 999999,
          colors: ["#ff5722", "#ffb300", "#4caf50", "#2196f3", "#e91e63", "#ffd700"],
        });

        const timer = setTimeout(() => {
          confetti({
            particleCount: 35,
            angle: 60,
            spread: 55,
            origin: { x: 0.15, y: 0.65 },
            zIndex: 999999,
            colors: ["#ffd700", "#ff9800", "#ff3d00", "#4caf50"],
          });
          confetti({
            particleCount: 35,
            angle: 120,
            spread: 55,
            origin: { x: 0.85, y: 0.65 },
            zIndex: 999999,
            colors: ["#ffd700", "#ff9800", "#ff3d00", "#4caf50"],
          });
        }, 180);

        return () => {
          clearTimeout(timer);
          document.body.style.overflow = "";
          window.removeEventListener("keydown", handleKeyDown);
        };
      } catch (err) {
        console.error("Confetti error:", err);
      }

      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Please enter your mobile number";
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit number";
    }
    if (!formData.course) newErrors.course = "Please select a course";
    if (!formData.state) newErrors.state = "Please select your state";
    if (!formData.consent) newErrors.consent = "Please agree to the disclaimer";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const searchParams =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();

      const leadPayload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/\D/g, "").slice(-10),
        course: formData.course,
        state: formData.state,
        university: universityName,
        source: universityName,
        form_name: formName,
        utm_source: searchParams.get("utm_source") || `${universityName}_LP`,
        utm_medium: searchParams.get("utm_medium") || "Direct",
        utm_campaign: searchParams.get("utm_campaign") || "Online_Admission_2026",
        page_url: typeof window !== "undefined" ? window.location.href : "",
      };

      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      onClose?.();
      router.push("/thank-you");
    } catch {
      alert("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Box */}
      <div
        className="relative w-full max-w-[460px] sm:max-w-[480px] rounded-2xl sm:rounded-[22px] p-5 sm:p-7 shadow-2xl transition-all z-10 overflow-hidden"
        style={{
          backgroundColor: modalBg,
          boxShadow: isLight
            ? "0 20px 50px rgba(0, 0, 0, 0.25)"
            : "0 20px 50px rgba(0, 0, 0, 0.6)",
        }}
      >
        {/* Close Button (✕ Icon) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 active:scale-90 bg-transparent border-none cursor-pointer p-0 transition-all"
          style={{ color: closeBtnColor }}
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Heading */}
        <div className="text-center mb-4 sm:mb-5">
          <h2
            className="m-0 text-[21px] sm:text-[24px] font-bold tracking-tight leading-snug"
            style={{ color: titleColor }}
          >
            {titleText}
          </h2>
          <p
            className="m-0 mt-1 sm:mt-1.5 text-[13px] sm:text-[14px] font-medium leading-normal"
            style={{ color: subtitleColor }}
          >
            {subtitleText}
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
          {/* Name */}
          <div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: null });
              }}
              placeholder="Enter Your Name"
              className="w-full h-[42px] sm:h-[44px] px-3.5 rounded-[8px] text-[13.5px] sm:text-[14px] outline-none shadow-2xs border transition-colors"
              style={{
                backgroundColor: inputBg,
                color: inputTextColor,
                borderColor: errors.name ? "#ef4444" : isLight ? "#e5e7eb" : "transparent",
              }}
            />
            {errors.name && (
              <span className="text-[11px] text-red-500 font-medium pl-1 mt-0.5 block">
                {errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              placeholder="Enter Your Email"
              className="w-full h-[42px] sm:h-[44px] px-3.5 rounded-[8px] text-[13.5px] sm:text-[14px] outline-none shadow-2xs border transition-colors"
              style={{
                backgroundColor: inputBg,
                color: inputTextColor,
                borderColor: errors.email ? "#ef4444" : isLight ? "#e5e7eb" : "transparent",
              }}
            />
            {errors.email && (
              <span className="text-[11px] text-red-500 font-medium pl-1 mt-0.5 block">
                {errors.email}
              </span>
            )}
          </div>

          {/* Phone with India Flag Dropdown */}
          <div>
            <div
              className="flex items-center w-full h-[42px] sm:h-[44px] rounded-[8px] overflow-hidden shadow-2xs border transition-colors"
              style={{
                backgroundColor: inputBg,
                borderColor: errors.phone ? "#ef4444" : isLight ? "#e5e7eb" : "transparent",
              }}
            >
              <div
                className="flex items-center gap-1.5 h-full px-2.5 sm:px-3 border-r select-none shrink-0"
                style={{
                  backgroundColor: isLight ? "#f0f2f5" : "#f8f9fa",
                  borderColor: isLight ? "#e5e7eb" : "#e5e7eb",
                }}
              >
                <IndiaFlag />
                <span className="text-slate-900 font-bold text-[13px] tracking-tight">
                  +91
                </span>
                <span className="text-slate-600 text-[10px] leading-none">▾</span>
              </div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setFormData({ ...formData, phone: val });
                  if (errors.phone) setErrors({ ...errors, phone: null });
                }}
                placeholder={phonePlaceholder}
                maxLength={10}
                className="flex-1 h-full px-3 text-[13.5px] sm:text-[14px] border-none outline-none bg-transparent"
                style={{ color: inputTextColor }}
              />
            </div>
            {errors.phone && (
              <span className="text-[11px] text-red-500 font-medium pl-1 mt-0.5 block">
                {errors.phone}
              </span>
            )}
          </div>

          {/* Select Course */}
          <div className="relative">
            <select
              value={formData.course}
              onChange={(e) => {
                setFormData({ ...formData, course: e.target.value });
                if (errors.course) setErrors({ ...errors, course: null });
              }}
              className="w-full h-[42px] sm:h-[44px] px-3.5 pr-8 rounded-[8px] appearance-none cursor-pointer text-[13.5px] sm:text-[14px] outline-none shadow-2xs border transition-colors"
              style={{
                backgroundColor: inputBg,
                color: formData.course ? inputTextColor : inputPlaceholderColor,
                borderColor: errors.course ? "#ef4444" : isLight ? "#e5e7eb" : "transparent",
              }}
            >
              <option value="" disabled>
                Select Your Course
              </option>
              {courseOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="text-slate-900">
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {errors.course && (
              <span className="text-[11px] text-red-500 font-medium pl-1 mt-0.5 block">
                {errors.course}
              </span>
            )}
          </div>

          {/* Select State */}
          <div className="relative">
            <select
              value={formData.state}
              onChange={(e) => {
                setFormData({ ...formData, state: e.target.value });
                if (errors.state) setErrors({ ...errors, state: null });
              }}
              className="w-full h-[42px] sm:h-[44px] px-3.5 pr-8 rounded-[8px] appearance-none cursor-pointer text-[13.5px] sm:text-[14px] outline-none shadow-2xs border transition-colors"
              style={{
                backgroundColor: inputBg,
                color: formData.state ? inputTextColor : inputPlaceholderColor,
                borderColor: errors.state ? "#ef4444" : isLight ? "#e5e7eb" : "transparent",
              }}
            >
              <option value="" disabled>
                Select Your State
              </option>
              {STATE_OPTIONS.map((state) => (
                <option key={state} value={state} className="text-slate-900">
                  {state}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {errors.state && (
              <span className="text-[11px] text-red-500 font-medium pl-1 mt-0.5 block">
                {errors.state}
              </span>
            )}
          </div>

          {/* Consent Checkbox */}
          <div className="pt-0.5">
            <label className="flex items-start gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => {
                  setFormData({ ...formData, consent: e.target.checked });
                  if (errors.consent) setErrors({ ...errors, consent: null });
                }}
                className="mt-0.5 rounded-[3px] accent-[#22c55e] w-4 h-4 cursor-pointer"
              />
              <span
                className="text-[11px] sm:text-[11.5px] leading-tight"
                style={{ color: disclaimerColor }}
              >
                I consent to receive university updates via email and mobile number.{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onOpenDisclaimer?.();
                  }}
                  className="underline cursor-pointer font-medium p-0 border-none bg-transparent"
                  style={{ color: disclaimerLinkColor }}
                >
                  Disclaimer
                </button>
              </span>
            </label>
            {errors.consent && (
              <span className="text-[11px] text-red-500 font-medium pl-1 mt-0.5 block">
                {errors.consent}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[44px] sm:h-[46px] rounded-[10px] text-white font-bold text-[16px] sm:text-[17px] shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer border-none flex items-center justify-center tracking-tight mt-2"
            style={{ backgroundColor: submitBtnBg }}
          >
            {loading ? "Submitting..." : submitBtnText}
          </button>
        </form>
      </div>
    </div>
  );
}