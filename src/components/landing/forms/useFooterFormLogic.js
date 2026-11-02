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
    if (loading) return;
    setLoading(true);

    try {
      const searchParams =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();

      const utm_source = searchParams.get("utm_source") || undefined;
      const utm_medium = searchParams.get("utm_medium") || undefined;
      const utm_campaign = searchParams.get("utm_campaign") || undefined;
      const utm_term = searchParams.get("utm_term") || undefined;
      const utm_content = searchParams.get("utm_content") || undefined;

      const leadPayload = {
        name: values.full_name?.trim(),
        email: values.email?.trim(),
        phone: String(values.phone || "").replace(/\D/g, "").slice(-10),
        course: values.course,
        state: values.state,
        form_name: brand.footerFormName || "Footer Guidance Form",
        source: brand.source || "SODE",
        sub_source: brand.slug || brand.name || universityName,
        page_url: typeof window !== "undefined" ? window.location.href : "",
        ...(utm_source ? { utm_source } : {}),
        ...(utm_medium ? { utm_medium } : {}),
        ...(utm_campaign ? { utm_campaign } : {}),
        ...(utm_term ? { utm_term } : {}),
        ...(utm_content ? { utm_content } : {}),
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      const resData = await res.json().catch(() => ({}));

      if (!res.ok || !resData.success) {
        throw new Error(resData.message || "Failed to submit enquiry. Please try again.");
      }

      message.success("Thank you! Our expert counselor will contact you shortly.");
      form.resetFields();
      router.push("/thank-you");
    } catch (err) {
      console.error("Footer form submission error:", err);
      message.error(err.message || "Failed to submit enquiry. Please try again.");
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
