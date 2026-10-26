"use client";

import React, { useState, useEffect, useRef } from "react";
import { EditOutlined, RedoOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Button, Select, message as staticMessage, App } from "antd";
import { Phone, ShieldCheck, User, Mail, GraduationCap, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
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
  const [step, setStep] = useState("phone"); // 'phone' | 'otp' | 'details'
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [contextPayload, setContextPayload] = useState(null);
  const [otpMessage, setOtpMessage] = useState("");
  const [stateOptions, setStateOptions] = useState(() => cachedStateOptions || []);
  const [courseOptions, setCourseOptions] = useState(() => cachedCourseOptions || []);

  useEffect(() => {
    let isMounted = true;
    fetchStateOptions().then((opts) => {
      if (isMounted && opts && opts.length > 0) {
        setStateOptions(opts);
      }
    });
    fetchCourseOptions().then((opts) => {
      if (isMounted && opts && opts.length > 0) {
        setCourseOptions(opts);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (contextPayload?.course) {
      form.setFieldsValue({ course: contextPayload.course });
    }
  }, [contextPayload, form]);

  // Track if auto-opened by scroll or dismissed on current page
  const hasAutoTriggeredRef = useRef(false);
  const isDismissedRef = useRef(false);

  // Reset scroll-trigger state when navigating to another page
  useEffect(() => {
    hasAutoTriggeredRef.current = false;
    isDismissedRef.current = false;
  }, [pathname]);



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
        isDismissedRef.current = false;
        setIsOpen(true);
      }
    };

    const handleCustomEvent = (e) => {
      if (e?.detail) {
        setContextPayload(e.detail);
      }
      if (!e.detail || e.detail.targetId === triggerId || !e.detail.targetId) {
        isDismissedRef.current = false;
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
    isDismissedRef.current = true;
    setIsOpen(false);
    setStep("phone");
    setPhone("");
    form.resetFields();
    setContextPayload(null);
    if (onCancel) onCancel();
  };

  const resolvedUni = (
    contextPayload?.university ||
    contextPayload?.university_name ||
    (typeof window !== "undefined" && window.__CURRENT_PAGE_UNIVERSITY__) ||
    "UPES"
  ).trim();

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

      const successMsg = data.message || `We've sent a 6-digit OTP for +91 ${cleanPhone}.`;
      message.success(successMsg);
      setOtpMessage(successMsg);
      setStep("otp");
      setResendTimer(30);
      setCanResend(false);
    } catch (err) {
      const errorMsg = err.message || "Something went wrong sending OTP";
      message.error(errorMsg);
      form.setFields([
        {
          name: "phone",
          errors: [errorMsg],
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
        const errorMsg = verifyData?.message || "Invalid OTP. Please enter the correct code.";
        message.error(errorMsg);
        form.setFields([
          {
            name: "otp",
            errors: [errorMsg],
          },
        ]);
        return;
      }

      message.success(verifyData?.message || "OTP verified successfully!");
      setStep("name");
    } catch (err) {
      const errorMsg = err.message || "Invalid OTP. Please enter the correct code.";
      message.error(errorMsg);
      form.setFields([
        {
          name: "otp",
          errors: [errorMsg],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     STEP 3: PROCEED TO EMAIL
  ========================================================= */
  const handleNextToEmail = async () => {
    try {
      await form.validateFields(["name"]);
      setStep("email");
    } catch {
      // validation error shown by Form
    }
  };

  /* =========================================================
     STEP 4: PROCEED TO COURSE & STATE
  ========================================================= */
  const handleNextToPreferences = async () => {
    try {
      await form.validateFields(["email"]);
      setStep("preferences");
    } catch {
      // validation error shown by Form
    }
  };

  /* =========================================================
     STEP 5: FINAL SUBMIT (ANT DESIGN VALUES)
  ========================================================= */
  const handleSaveDetails = async (values) => {
    setLoading(true);
    try {
      const formValues = await form.validateFields();
      const allValues = {
        ...form.getFieldsValue(true),
        ...formValues,
        ...(values || {}),
      };

      const payload = {
        ...allValues,
        phone: allValues.phone || phone,
        university_name: resolvedUni || "UPES",
        form_name: contextPayload?.action || contextPayload?.title || "Get 100% FREE Counseling",
        source: contextPayload?.source || "SODE",
        page_url: typeof window !== "undefined" ? window.location.href : "",
        ...getUTMParams(),
      };

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Failed to submit lead");
      }

      if (onFinish) onFinish(payload);
      handleClose();
      router.push("/thank-you");
    } catch (err) {
      console.error("Save details error:", err);
      if (err?.errorFields?.length) {
        setLoading(false);
        return;
      }
      handleClose();
      router.push("/thank-you");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || !phone) return;
    await handleSendOtp({ phone });
  };

  const modalTitle =
    step === "phone"
      ? (contextPayload?.title || `Apply to ${resolvedUni || "University"}`)
      : step === "otp"
        ? "Verify OTP"
        : step === "name"
          ? "What is your Full Name?"
          : step === "email"
            ? "Enter Your Email ID"
            : "Select State & Course";

  const modalSubtitle =
    step === "phone"
      ? "Enter your 10-digit mobile number to receive a verification OTP."
      : step === "otp"
        ? otpMessage || `We've sent a 6-digit OTP for +91 ${phone}.`
        : step === "name"
          ? "Please enter your full name as per official records."
          : step === "email"
            ? "We'll send admission details and fee structures to your email."
            : "Select your current state and preferred course.";

  return (
    <Modal
      id={triggerId}
      open={isOpen}
      onCancel={handleClose}
      destroyOnHidden
      centered
      width={420}
      className="counselling-otp-modal [&_.ant-modal-close]:top-3.5! [&_.ant-modal-close]:right-3.5! [&_.ant-modal-close]:text-gray-500! hover:[&_.ant-modal-close]:text-gray-800!"
      footer={null}
      mask={{ closable: true }}
      closable={true}
      focusable={{ focusTriggerAfterClose: false, autoFocusButton: null }}
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
          preserve={true}
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

          {step === "name" && (
            <>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800">
                  ✓ Verified: +91 {phone}
                </span>
                <span className="text-[11px] text-emerald-600 font-medium">Verified</span>
              </div>

              <div className="flex items-center justify-between mb-3 px-0.5">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Step 1 of 3: Full Name
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 rounded-full w-6 bg-[#0C2B4E] transition-all" />
                  <div className="h-1.5 rounded-full w-2 bg-slate-200 transition-all" />
                  <div className="h-1.5 rounded-full w-2 bg-slate-200 transition-all" />
                </div>
              </div>

              <Form.Item
                name="name"
                className="mb-4"
                rules={[
                  { required: true, message: "Please enter your full name" },
                  { min: 2, message: "Name must be at least 2 characters" },
                ]}
              >
                <Input
                  autoFocus
                  placeholder="Full Name"
                  prefix={<User size={15} className="text-gray-400 mr-1" />}
                  disabled={loading}
                  onPressEnter={handleNextToEmail}
                />
              </Form.Item>

              <Button
                type="primary"
                onClick={handleNextToEmail}
                block
                className="font-bold bg-[#0C2B4E] hover:bg-[#08203b] border-none shadow-sm cursor-pointer flex items-center justify-center gap-1"
              >
                Next <ArrowRight size={15} />
              </Button>
            </>
          )}

          {step === "email" && (
            <>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800">
                  ✓ Verified: +91 {phone}
                </span>
                <span className="text-[11px] text-emerald-600 font-medium">Verified</span>
              </div>

              <div className="flex items-center justify-between mb-3 px-0.5">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Step 2 of 3: Email ID
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 rounded-full w-2 bg-emerald-500 transition-all" />
                  <div className="h-1.5 rounded-full w-6 bg-[#0C2B4E] transition-all" />
                  <div className="h-1.5 rounded-full w-2 bg-slate-200 transition-all" />
                </div>
              </div>

              <Form.Item
                name="email"
                className="mb-4"
                rules={[
                  { required: true, message: "Please enter your email ID" },
                  { type: "email", message: "Please enter a valid email address" },
                ]}
              >
                <Input
                  autoFocus
                  type="email"
                  placeholder="Email ID"
                  prefix={<Mail size={15} className="text-gray-400 mr-1" />}
                  disabled={loading}
                  onPressEnter={handleNextToPreferences}
                />
              </Form.Item>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="default"
                  onClick={() => setStep("name")}
                  className="font-medium text-gray-600 hover:text-gray-900 border-slate-300 flex items-center justify-center gap-1"
                >
                  <ArrowLeft size={14} /> Back
                </Button>
                <Button
                  type="primary"
                  onClick={handleNextToPreferences}
                  className="col-span-2 font-bold bg-[#0C2B4E] hover:bg-[#08203b] border-none shadow-sm cursor-pointer flex items-center justify-center gap-1"
                >
                  Next <ArrowRight size={15} />
                </Button>
              </div>
            </>
          )}

          {step === "preferences" && (
            <>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800">
                  ✓ Verified: +91 {phone}
                </span>
                <span className="text-[11px] text-emerald-600 font-medium">Verified</span>
              </div>

              <div className="flex items-center justify-between mb-3 px-0.5">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Step 3 of 3: State & Course
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 rounded-full w-2 bg-emerald-500 transition-all" />
                  <div className="h-1.5 rounded-full w-2 bg-emerald-500 transition-all" />
                  <div className="h-1.5 rounded-full w-6 bg-[#0C2B4E] transition-all" />
                </div>
              </div>

              <Form.Item
                name="state"
                className="mb-3"
                rules={[{ required: true, message: "Please select your state" }]}
              >
                <Select
                  showSearch
                  placeholder="Select State"
                  allowClear
                  loading={stateOptions.length === 0}
                  className="w-full text-left"
                  prefix={<MapPin size={15} className="text-gray-400 mr-1" />}
                  filterOption={(input, option) =>
                    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                  }
                  options={stateOptions}
                />
              </Form.Item>

              <Form.Item
                name="course"
                className="mb-4"
                rules={[{ required: true, message: "Please select your course" }]}
              >
                <Select
                  showSearch
                  placeholder="Select Course"
                  allowClear
                  loading={courseOptions.length === 0}
                  className="w-full text-left"
                  prefix={<GraduationCap size={15} className="text-gray-400 mr-1" />}
                  filterOption={(input, option) =>
                    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                  }
                  options={courseOptions}
                />
              </Form.Item>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="default"
                  onClick={() => setStep("email")}
                  className="font-medium text-gray-600 hover:text-gray-900 border-slate-300 flex items-center justify-center gap-1"
                >
                  <ArrowLeft size={14} /> Back
                </Button>
                <Button
                  type="primary"
                  onClick={() => handleSaveDetails()}
                  loading={loading}
                  className="col-span-2 font-bold bg-[#0C2B4E] hover:bg-[#08203b] border-none shadow-sm cursor-pointer"
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </Modal>
  );
}
