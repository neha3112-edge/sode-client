"use client";

import React, { useState, useEffect } from "react";
import { EditOutlined, RedoOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Button, Select, message as staticMessage, App } from "antd";
import { Phone, ShieldCheck, User, Mail, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

/* =========================================================
   CLEAN COURSE NAME (STRIP MODES LIKE ONLINE / DISTANCE)
========================================================= */
function cleanCourseName(courseStr, uniName = "") {
  if (!courseStr) return "";
  let clean = String(courseStr).trim();
  if (clean.includes("::")) {
    const parts = clean.split("::");
    clean = parts[0] || parts[1];
  }

  // Strip university name if attached (e.g. "- Sikkim Manipal University")
  if (uniName) {
    const escapedUni = String(uniName).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    clean = clean.replace(new RegExp(`[-–—|/]?\\s*${escapedUni}.*`, "gi"), "").trim();
  }

  // Strip generic university terms
  clean = clean.replace(/[-–—|/]?\s*(online university|university|deemed university).*/gi, "").trim();

  // Strip Mode keywords (Online, Distance, Hybrid, Regular, Open, Executive, ODL)
  clean = clean.replace(/\b(online|distance|hybrid|regular|open|executive|odl)\b/gi, "").trim();
  clean = clean.replace(/\s+/g, " ").replace(/^[-–—\s/:]+|[-–—\s/:]+$/g, "").trim();

  // Convert short acronym slugs to uppercase (e.g. "ba" -> "BA", "mba" -> "MBA")
  if (clean.length <= 5 && !clean.includes(" ")) {
    clean = clean.toUpperCase();
  }

  return clean;
}

function isSameAsUniversity(courseName, uniName = "") {
  if (!courseName) return false;
  const c = String(courseName).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!c) return true;
  if (
    c.includes("university") ||
    c.includes("college") ||
    c.includes("institute") ||
    c.includes("vidyapeeth")
  ) {
    return true;
  }
  if (uniName) {
    const u = String(uniName).toLowerCase().replace(/[^a-z0-9]/g, "");
    if (u) {
      if (c === u) return true;
      if (c.length >= 6 && (u.includes(c) || c.includes(u))) return true;
    }
  }
  return false;
}

/* =========================================================
   AUTO-DETECT UNIVERSITY AND COURSE FROM CURRENT URL PATH
========================================================= */
function detectPageContext() {
  if (typeof window === "undefined") return { university: "", course: "", isCoursePage: false };
  try {
    const path = window.location.pathname;
    if (path.includes("/universities/")) {
      const segments = path.split("/").filter(Boolean);
      const uIndex = segments.indexOf("universities");
      if (uIndex !== -1) {
        const uniSlug = segments[uIndex + 1];
        const courseSlug = segments[uIndex + 2];
        const uniName = uniSlug
          ? uniSlug.toLowerCase() === "upes"
            ? "UPES"
            : uniSlug
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ")
          : "";

        if (courseSlug) {
          return {
            university: uniName,
            course: cleanCourseName(courseSlug),
            isCoursePage: true,
          };
        } else {
          return {
            university: uniName,
            course: "",
            isCoursePage: false,
          };
        }
      }
    }
  } catch (err) {
    // fallback
  }
  return { university: "", course: "", isCoursePage: false };
}

/* =========================================================
   EXTRACT AVAILABLE COURSES FOR DROPDOWN (DYNAMIC FALLBACK)
========================================================= */
function getAvailableCourses(contextPayload, currentUni = "") {
  const set = new Set();

  // 1. From contextPayload.courses (passed from university view)
  if (Array.isArray(contextPayload?.courses) && contextPayload.courses.length > 0) {
    contextPayload.courses.forEach((c) => {
      const clean = cleanCourseName(c, currentUni);
      if (clean && !isSameAsUniversity(clean, currentUni)) set.add(clean);
    });
  }

  // 2. From window.__CURRENT_PAGE_COURSES__ (cached by UniversityClientView)
  if (typeof window !== "undefined" && Array.isArray(window.__CURRENT_PAGE_COURSES__)) {
    window.__CURRENT_PAGE_COURSES__.forEach((c) => {
      const clean = cleanCourseName(c, currentUni);
      if (clean && !isSameAsUniversity(clean, currentUni)) set.add(clean);
    });
  }

  // 3. Extract directly from DOM of the current university page
  if (typeof document !== "undefined") {
    document
      .querySelectorAll(
        "#university-courses-section a, #university-courses-section h3, #university-courses-section h4, [data-nav-label='Courses'] a, .university-courses-grid a"
      )
      .forEach((el) => {
        const text = el.innerText?.trim();
        const clean = cleanCourseName(text, currentUni);
        if (
          clean &&
          clean.length <= 30 &&
          !isSameAsUniversity(clean, currentUni) &&
          !clean.toLowerCase().includes("filter") &&
          !clean.toLowerCase().includes("apply") &&
          !clean.toLowerCase().includes("brochure")
        ) {
          set.add(clean);
        }
      });

    if (set.size === 0) {
      document
        .querySelectorAll("a[href*='/online-'], a[href*='/distance-']")
        .forEach((el) => {
          const text = el.innerText?.trim();
          const clean = cleanCourseName(text, currentUni);
          if (
            clean &&
            clean.length <= 30 &&
            !isSameAsUniversity(clean, currentUni) &&
            !clean.toLowerCase().includes("apply") &&
            !clean.toLowerCase().includes("brochure")
          ) {
            set.add(clean);
          }
        });
    }
  }

  if (set.size > 0) {
    return Array.from(set);
  }

  return ["MBA", "BBA", "BCA", "MCA", "B.Com", "M.Com", "BA", "MA", "B.Sc", "M.Sc"];
}

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
      params.get("utm_source") || parsedData.utm_source || "Organic",
    utm_medium:
      params.get("utm_medium") || parsedData.utm_medium || "SODE CO IN Organic",
    utm_campaign:
      params.get("utm_campaign") || parsedData.utm_campaign || "",
    utm_term: params.get("utm_term") || parsedData.utm_term || "",
    utm_content: params.get("utm_content") || parsedData.utm_content || "",
    utm_adgroup: params.get("utm_adgroup") || parsedData.utm_adgroup || "",
    gclid: params.get("gclid") || parsedData.gclid || "",
  };
}

export default function ModalOTP({
  open: controlledOpen,
  onCancel,
  onFinish,
  triggerId = "counselling-form-modal",
}) {
  const router = useRouter();
  const antdApp = App.useApp();
  const message = antdApp?.message || staticMessage;

  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(Boolean(controlledOpen));
  const [step, setStep] = useState("phone"); // 'phone' | 'otp' | 'details'
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [contextPayload, setContextPayload] = useState(null);

  useEffect(() => {
    if (controlledOpen !== undefined) {
      setIsOpen(Boolean(controlledOpen));
    }
  }, [controlledOpen]);

  // Resend Countdown Timer
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
    form.resetFields();
    setContextPayload(null);
    if (onCancel) onCancel();
  };

  /* =========================================================
     DETECT IF COURSE IS ALREADY KNOWN OR NEEDS SELECT DROPDOWN
  ========================================================= */
  const pageContext = detectPageContext();

  const resolvedUni = (
    contextPayload?.university ||
    contextPayload?.university_name ||
    (typeof window !== "undefined" && window.__CURRENT_PAGE_UNIVERSITY__) ||
    pageContext.university ||
    "UPES"
  ).trim();

  // 1. Explicitly passed course from button/card
  const passedCourseRaw =
    contextPayload?.course ||
    contextPayload?.courseName ||
    "";

  // 2. Global course from current course page (if on a course page)
  const globalPageCourse =
    (typeof window !== "undefined" && window.__CURRENT_PAGE_COURSE__) ||
    pageContext.course ||
    "";

  const rawCourse = passedCourseRaw || globalPageCourse || pageContext.course || "";
  const cleanedCourse = cleanCourseName(rawCourse, resolvedUni) || pageContext.course || "";

  // If we are on a course page OR have a valid pre-selected course
  const isLikelyUni = isSameAsUniversity(cleanedCourse, resolvedUni);
  const isCoursePreSelected = Boolean(
    pageContext.isCoursePage || (cleanedCourse && !isLikelyUni)
  );

  const availableCourses = getAvailableCourses(contextPayload, resolvedUni);

  /* =========================================================
     STEP 1: SEND OTP
  ========================================================= */
  const handleSendOtp = async (values) => {
    setLoading(true);
    try {
      const cleanPhone = String(values.phone).replace(/\D/g, "").slice(-10);
      setPhone(cleanPhone);

      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone, purpose: "counselling" }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setStep("otp");
      setResendTimer(30);
      setCanResend(false);
    } catch (err) {
      console.error("OTP send error:", err);
      form.setFields([
        {
          name: "phone",
          errors: [err.message || "Something went wrong sending OTP"],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     STEP 2: VERIFY OTP & CREATE INITIAL LEAD
  ========================================================= */
  const handleVerifyOtp = async (values) => {
    setLoading(true);
    try {
      const cleanPhone = phone;
      const otpCode = String(values.otp).trim();

      // 1. Verify OTP with Backend Service
      const verifyRes = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cleanPhone, otp: otpCode }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.success) {
        form.setFields([
          {
            name: "otp",
            errors: [verifyData?.message || "Invalid OTP. Please enter the correct code."],
          },
        ]);
        return;
      }

      // 2. Submit Lead immediately upon verification (so lead is captured)
      const formName =
        contextPayload?.action ||
        contextPayload?.title ||
        "Get 100% FREE Counseling";

      const leadPayload = {
        phone: cleanPhone,
        name: "",
        course: isCoursePreSelected ? cleanedCourse : "",
        university_name: resolvedUni || "UPES",
        form_name: formName,
        source: contextPayload?.source || "SODE",
        page_url: typeof window !== "undefined" ? window.location.href : "",
        ...getUTMParams(),
      };

      console.log("🚀 [OTP VERIFIED] Creating Lead:", leadPayload);

      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      // Proceed to Step 3: Full Name, Email & Course (if needed)
      setStep("details");
    } catch (err) {
      console.error("Verification error:", err);
      form.setFields([
        {
          name: "otp",
          errors: [err.message || "Invalid OTP. Please enter the correct code."],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     STEP 3: SAVE FULL NAME, EMAIL & COURSE (OR REDIRECT TO THANK YOU)
  ========================================================= */
  const handleSaveDetails = async (values) => {
    setLoading(true);
    try {
      const cleanPhone = phone;
      const finalCourse = cleanCourseName(
        values?.course || (isCoursePreSelected ? cleanedCourse : "")
      );

      const formName =
        contextPayload?.action ||
        contextPayload?.title ||
        "Get 100% FREE Counseling";

      const updatePayload = {
        phone: cleanPhone,
        name: values?.name ? String(values.name).trim() : "",
        email: values?.email ? String(values.email).trim() : "",
        course: finalCourse,
        university_name: resolvedUni || "UPES",
        form_name: formName,
        source: contextPayload?.source || "SODE",
        page_url: typeof window !== "undefined" ? window.location.href : "",
        ...getUTMParams(),
      };

      console.log("🚀 [SAVING DETAILS] Updating Lead:", updatePayload);

      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });

      if (onFinish) onFinish(updatePayload);
      handleClose();
      router.push("/thank-you");
    } catch (err) {
      console.error("Save details error:", err);
      handleClose();
      router.push("/thank-you");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    handleClose();
    router.push("/thank-you");
  };

  const handleResendOtp = async () => {
    if (!canResend || !phone) return;
    await handleSendOtp({ phone });
  };

  const modalTitle =
    step === "details"
      ? "Almost Done!"
      : contextPayload?.title || "Get 100% FREE Counseling";

  const modalSubtitle =
    step === "phone"
      ? "Enter your 10-digit mobile number to receive a verification OTP."
      : step === "otp"
        ? `We've sent a 6-digit OTP for +91 ${phone}. Check your server console to test.`
        : !isCoursePreSelected
          ? "Select your desired course and details, or skip directly."
          : "Enter your full name and email ID, or skip directly.";

  return (
    <Modal
      id={triggerId}
      open={isOpen}
      onCancel={handleClose}
      destroyOnHidden
      centered
      width={420}
      className="counselling-otp-modal"
      footer={null}
    >
      <div className="pt-2 pb-1">
        <h3 className="text-xl font-bold text-[#0C2B4E] mb-1">
          {modalTitle}
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          {modalSubtitle}
        </p>

        <Form
          form={form}
          onFinish={
            step === "phone"
              ? handleSendOtp
              : step === "otp"
                ? handleVerifyOtp
                : handleSaveDetails
          }
          layout="vertical"
          requiredMark={false}
        >
          {step === "phone" && (
            <>
              <Form.Item
                name="phone"
                className="mb-4"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                  {
                    pattern: /^[6-9]\d{9}$/,
                    message: "Please enter a valid 10-digit phone number",
                  },
                ]}
              >
                <Input
                  placeholder="Enter 10-digit Mobile Number"
                  prefix={<Phone size={15} className="text-gray-400 mr-1" />}
                  maxLength={10}
                  disabled={loading}
                  autoFocus
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="font-bold bg-[#0C2B4E] hover:bg-[#08203b] border-none shadow-sm cursor-pointer"
              >
                {loading ? "Sending OTP..." : "Get OTP & Counseling"}
              </Button>
            </>
          )}

          {step === "otp" && (
            <>
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-2.5 mb-4">
                <div className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <Phone size={15} /> +91 {phone}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    form.setFieldsValue({ otp: "" });
                  }}
                  className="text-xs text-[#0C2B4E] hover:underline flex items-center gap-1 font-semibold cursor-pointer border-none bg-transparent"
                >
                  <EditOutlined /> Change
                </button>
              </div>

              <Form.Item
                name="otp"
                className="mb-4"
                rules={[
                  { required: true, message: "Please enter the 6-digit OTP" },
                  {
                    pattern: /^\d{6}$/,
                    message: "OTP must be exactly 6 digits",
                  },
                ]}
              >
                <Input
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  disabled={loading}
                  autoFocus
                  prefix={<ShieldCheck size={15} className="text-gray-400 mr-1" />}
                />
              </Form.Item>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4 px-1">
                <span>Didn't receive code?</span>
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-blue-500 hover:text-blue-600 text-xs font-medium cursor-pointer border-none bg-transparent flex items-center gap-1"
                  >
                    <RedoOutlined /> Resend OTP
                  </button>
                ) : (
                  <span className="text-gray-400">Resend in {resendTimer}s</span>
                )}
              </div>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="font-bold bg-[#0C2B4E] hover:bg-[#08203b] border-none shadow-sm cursor-pointer"
              >
                {loading ? "Verifying..." : "Verify OTP & Submit"}
              </Button>
            </>
          )}

          {step === "details" && (
            <>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800">
                  ✓ Verified: +91 {phone}
                </span>
                <span className="text-[11px] text-emerald-600 font-medium">Verified</span>
              </div>

              {/* Show Course Select ONLY if course is NOT already pre-selected */}
              {!isCoursePreSelected && (
                <Form.Item
                  name="course"
                  className="mb-3"
                  rules={[{ required: true, message: "Please select a course" }]}
                >
                  <Select
                    showSearch
                    placeholder="Select Course"
                    allowClear
                    prefix={<GraduationCap size={15} className="text-gray-400 mr-1" />}
                    className="w-full text-left"
                    filterOption={(input, option) =>
                      (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                    }
                    options={availableCourses.map((c) => ({
                      label: c,
                      value: c,
                    }))}
                  />
                </Form.Item>
              )}

              <Form.Item
                name="name"
                className="mb-3"
                rules={[
                  { required: true, message: "Please enter your full name" },
                  { min: 2, message: "Name must be at least 2 characters" },
                ]}
              >
                <Input
                  placeholder="Full Name"
                  prefix={<User size={15} className="text-gray-400 mr-1" />}
                  disabled={loading}
                  autoFocus={isCoursePreSelected}
                />
              </Form.Item>

              <Form.Item
                name="email"
                className="mb-4"
                rules={[
                  { required: true, message: "Please enter your email ID" },
                  { type: "email", message: "Please enter a valid email address" },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Email ID"
                  prefix={<Mail size={15} className="text-gray-400 mr-1" />}
                  disabled={loading}
                />
              </Form.Item>

              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full rounded-2xl font-semibold bg-[#0C2B4E] hover:bg-[#08203b] border-none shadow-sm cursor-pointer px-1 sm:px-3 text-xs sm:text-sm"
                >
                  {loading ? "Submitting..." : "Submit & Continue"}
                </Button>

                <Button
                  type="default"
                  onClick={handleSkip}
                  disabled={loading}
                  className="w-full rounded-2xl text-gray-600 hover:text-gray-900 border-slate-300 font-medium cursor-pointer shadow-none text-xs sm:text-sm"
                >
                  Skip →
                </Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </Modal>
  );
}
