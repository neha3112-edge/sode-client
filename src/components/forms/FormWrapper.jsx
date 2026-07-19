"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Button, Modal, message } from "antd";
import { X } from "lucide-react";
import { getAssetPath } from "@/lib/utils";
import { STATE_OPTIONS } from "@/constants/stateOptions";
import { DEFAULT_COURSE_OPTIONS } from "@/constants/courseOptions";

/* =========================================================
   NORMALIZE COURSE OPTIONS
========================================================= */

function normalizeCourseOptions(options) {
  const baseOptions =
    options && options.length > 0 ? options : DEFAULT_COURSE_OPTIONS;

  return baseOptions.map((option) => {
    if (typeof option === "string") {
      return {
        value: `${option}::${option}`,
        label: option,
      };
    }

    return {
      ...option,
      value: `${option.value}::${option.label}`,
    };
  });
}

/* =========================================================
   ANT DESIGN FORM WRAPPER COMPONENT
========================================================= */

export default function FormWrapper({
  // Modal Props
  isModal = false,
  isOpen = false,

  // Header Props
  title = "Book 1:1 Counselling",
  subtitle = "Select your course and our academic experts will assist you",
  hideHeader = false,
  showPhoneCallLink = false,

  // Callbacks
  onClose,
  onSuccess,

  // Course Props
  courseOptions,
  defaultCourse = "",
  hideCourseField = false,

  // Lead Tracking Props
  formNameOverride,
  sourceOverride = "SODE",
  utmSourceFallback = "Organic",
  utmMediumFallback = "SODE CO IN Organic",

  // Button & Redirect Props
  submitButtonText = "Book Counselling",
  submitButtonClassName = "",
  redirectUrl = "/thank-you",

  // Brochure Props
  isBrochureForm = false,
  brochureUrl = "",
  dynamicCourseBrochures = false,
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const containerRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [closing, setClosing] = useState(false);

  /* =======================================================
     NORMALIZE COURSE OPTIONS
  ======================================================== */

  const finalCourseOptions = useMemo(() => {
    return normalizeCourseOptions(courseOptions);
  }, [courseOptions]);

  /* =======================================================
     GET INITIAL COURSE VALUE
  ======================================================== */

  const initialCourseValue = useMemo(() => {
    if (!defaultCourse) return undefined;
    const found = finalCourseOptions.find(
      (o) =>
        o.value === defaultCourse ||
        o.value.split("::")[0] === defaultCourse ||
        o.label === defaultCourse
    );
    return found ? found.value : defaultCourse;
  }, [defaultCourse, finalCourseOptions]);

  /* =======================================================
     SAVE & RETRIEVE UTM PARAMETERS
  ======================================================== */

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const existingStoredData = localStorage.getItem("utm_data");
    let existingUtmData = {};

    try {
      existingUtmData = existingStoredData ? JSON.parse(existingStoredData) : {};
    } catch {
      existingUtmData = {};
    }

    const utmData = {
      utm_source: params.get("utm_source") || existingUtmData.utm_source || null,
      utm_medium: params.get("utm_medium") || existingUtmData.utm_medium || null,
      utm_term: params.get("utm_term") || existingUtmData.utm_term || null,
      utm_campaign:
        params.get("utm_campaign") || existingUtmData.utm_campaign || null,
      utm_content:
        params.get("utm_content") || existingUtmData.utm_content || null,
    };

    localStorage.setItem("utm_data", JSON.stringify(utmData));
  }, []);

  const getUTMParams = () => {
    if (typeof window === "undefined") {
      return {
        utm_source: utmSourceFallback || "Organic",
        utm_medium: utmMediumFallback || "SODE CO IN Organic",
        utm_term: "",
        utm_campaign: "",
        utm_content: "",
        page_url: "",
      };
    }

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
        params.get("utm_source") ||
        parsedData.utm_source ||
        utmSourceFallback ||
        "Organic",
      utm_medium:
        params.get("utm_medium") ||
        parsedData.utm_medium ||
        utmMediumFallback ||
        "SODE CO IN Organic",
      utm_term: params.get("utm_term") || parsedData.utm_term || "",
      utm_campaign: params.get("utm_campaign") || parsedData.utm_campaign || "",
      utm_content: params.get("utm_content") || parsedData.utm_content || "",
      page_url: window.location.href,
    };
  };

  /* =======================================================
     BROCHURE FLOW CHECK
  ======================================================== */

  const shouldStartBrochureFlow = () => {
    if (isBrochureForm) return true;
    return title?.trim().toLowerCase() === "download brochure";
  };

  /* =======================================================
     FORM SUBMIT HANDLER (ANT DESIGN)
  ======================================================== */

  const handleSubmit = async (values) => {
    const finalCourse = hideCourseField ? defaultCourse : values.course;

    if (finalCourse && finalCourse.startsWith("__")) {
      message.error("Please select a valid course");
      return;
    }

    setLoading(true);

    try {
      const apiCourse =
        finalCourse && finalCourse.includes("::")
          ? finalCourse.split("::")[0]
          : finalCourse;

      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone,
        state: values.state,
        course: apiCourse,
        form_name: formNameOverride || title?.trim() || "Website Form",
        source: sourceOverride || "SODE",
        ...getUTMParams(),
      };

      console.log("Lead payload:", payload);

      const response = await fetch(getAssetPath("/api/lead"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to submit form");
      }

      const brochureFlow = shouldStartBrochureFlow();

      if (brochureFlow) {
        sessionStorage.setItem("isBrochureFlow", "true");

        let finalBrochureUrl = brochureUrl.trim();
        if (dynamicCourseBrochures) {
          const matchedOption = finalCourseOptions.find(
            (o) => o.value === values.course
          );
          if (matchedOption && matchedOption.brochureUrl) {
            finalBrochureUrl = matchedOption.brochureUrl;
          }
        }

        if (finalBrochureUrl) {
          sessionStorage.setItem("brochureUrl", finalBrochureUrl);

          // Initiate instant file download
          const link = document.createElement("a");
          link.href = getAssetPath(finalBrochureUrl);
          link.download = "";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          sessionStorage.removeItem("brochureUrl");
        }
      } else {
        sessionStorage.removeItem("isBrochureFlow");
        sessionStorage.removeItem("brochureUrl");
      }

      setClosing(true);

      window.setTimeout(() => {
        onSuccess?.();
        onClose?.();
        router.push(redirectUrl);
      }, 300);
    } catch (error) {
      console.error("Form submit error:", error);
      message.error(
        error instanceof Error
          ? error.message
          : "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     INNER FORM CONTENT
  ======================================================== */

  const formContent = (
    <div
      ref={containerRef}
      className={`transition-all duration-300 ${closing
          ? "translate-y-2 scale-95 opacity-0"
          : "translate-y-0 scale-100 opacity-100"
        }`}
    >
      {/* ===================================================
          FORM HEADER
      ==================================================== */}

      {!hideHeader && (title || subtitle || onClose || showPhoneCallLink) && (
        <div className="relative mb-5">
          <div className="text-center">
            {title && (
              <h2 className="text-xl font-bold text-[#005382]">{title}</h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
            )}

            {showPhoneCallLink && (
              <div className="mt-2">
                <a
                  href="tel:+917065777755"
                  className="inline-flex rounded-full bg-[#c9232c] px-5 py-1 text-sm font-semibold text-white transition hover:bg-[#aa1c25]"
                >
                  +91 7065 7777 55
                </a>
              </div>
            )}
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close form"
              className="absolute right-0 top-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-red-500 transition hover:bg-red-50"
            >
              <X size={20} aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      {/* ===================================================
          ANT DESIGN FORM (5 FULL FIELDS + UTMS + VALIDATION)
      ==================================================== */}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        validateTrigger={["onBlur", "onChange"]}
        initialValues={{
          course: initialCourseValue,
        }}
        requiredMark={false}
        className="space-y-2"
      >
        {/* 1. Full Name */}
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Please enter your full name" },
            { min: 2, message: "Name must be at least 2 characters" },
          ]}
          className="mb-3"
        >
          <Input
            size="large"
            placeholder="Enter Your Name"
            disabled={loading}
            className="rounded-lg h-11 text-sm"
          />
        </Form.Item>

        {/* 2. Email Address */}
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your email address" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
          className="mb-3"
        >
          <Input
            type="email"
            size="large"
            placeholder="Enter Your Email"
            disabled={loading}
            className="rounded-lg h-11 text-sm"
          />
        </Form.Item>

        {/* 3. Phone Number */}
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
            {
              pattern: /^[0-9+\s-]{8,15}$/,
              message: "Please enter a valid phone number (8-15 digits)",
            },
          ]}
          className="mb-3"
        >
          <Input
            size="large"
            placeholder="Enter Phone Number (e.g. +91 9876543210)"
            disabled={loading}
            className="rounded-lg h-11 text-sm"
          />
        </Form.Item>

        {/* 4. Course Select (Conditional) */}
        {!hideCourseField && (
          <Form.Item
            name="course"
            rules={[{ required: true, message: "Please select a course" }]}
            className="mb-3"
          >
            <Select
              size="large"
              placeholder="Select Course"
              disabled={loading}
              getPopupContainer={() => document.body}
              styles={{ popup: { root: { zIndex: 100000 } } }}
              className="rounded-lg h-11 text-sm w-full"
              options={finalCourseOptions.map((opt) => ({
                value: opt.value,
                label: opt.label,
                disabled: opt.disabled,
              }))}
            />
          </Form.Item>
        )}

        {/* Fixed Course Information display */}
        {hideCourseField && defaultCourse && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-700 mb-3">
            Selected Course:{" "}
            <span className="font-semibold">{defaultCourse}</span>
          </div>
        )}

        {/* 5. State Select (36 States) */}
        <Form.Item
          name="state"
          rules={[{ required: true, message: "Please select your state" }]}
          className="mb-4"
        >
          <Select
            size="large"
            placeholder="Select Your State"
            disabled={loading}
            getPopupContainer={() => document.body}
            styles={{ popup: { root: { zIndex: 100000 } } }}
            className="rounded-lg h-11 text-sm w-full"
            options={STATE_OPTIONS.map((st) => ({
              value: st,
              label: st,
            }))}
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            className={`h-11 w-full font-semibold text-white bg-[#005382] hover:bg-[#003f63] rounded-lg border-none shadow-md cursor-pointer ${submitButtonClassName}`}
          >
            {loading
              ? "Submitting..."
              : isBrochureForm || title?.trim().toLowerCase() === "download brochure"
                ? "Download Brochure"
                : submitButtonText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  /* =======================================================
     RENDER MODAL OR INLINE FORM
  ======================================================== */

  if (isModal) {
    return (
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        destroyOnHidden
        centered
        width={440}
        closeIcon={null}
        mask={{ closable: false }}
        keyboard={false}
      >
        {formContent}
      </Modal>
    );
  }

  return formContent;
}
