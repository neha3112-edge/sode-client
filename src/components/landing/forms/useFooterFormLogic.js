"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, message } from "antd";
import { STATE_OPTIONS } from "@/constants/stateOptions";

/**
 * Shared Business Logic for all Footer Form Layouts
 *
 * Handles:
 * - Ant Design Form instance
 * - Loading state
 * - State dropdown options mapping
 * - Phone sanitization (10 digits)
 * - Dynamic UTM parameter extraction
 * - API lead submission
 * - Success/Error notifications & router redirect
 */
export function useFooterFormLogic({ brand = {} }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const universityName = brand.name || "University Online";
  const stateOptions = STATE_OPTIONS.map((st) =>
    typeof st === "string" ? { value: st, label: st } : st
  );

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const searchParams =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();

      const leadPayload = {
        name: values.full_name,
        email: values.email,
        phone: String(values.phone || "").replace(/\D/g, "").slice(-10),
        course: values.course,
        state: values.state,
        university: universityName,
        source: universityName,
        form_name: brand.footerFormName || "Footer Guidance Form",
        utm_source: searchParams.get("utm_source") || `${universityName}_LP`,
        utm_medium: searchParams.get("utm_medium") || "Direct",
        utm_campaign:
          searchParams.get("utm_campaign") ||
          brand.utmCampaign ||
          "Online_Admission_2026",
        page_url: typeof window !== "undefined" ? window.location.href : "",
      };

      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      message.success("Thank you! Our expert counselor will contact you shortly.");
      form.resetFields();
      router.push("/thank-you");
    } catch {
      message.error("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    stateOptions,
    onFinish,
    universityName,
  };
}
