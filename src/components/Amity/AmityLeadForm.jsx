"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Button, Checkbox, message } from "antd";
import { PhoneCall } from "lucide-react";
import { STATE_OPTIONS } from "@/constants/stateOptions";

export const AMITY_COURSE_OPTIONS = [
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

export const AMITY_STATE_OPTIONS = STATE_OPTIONS.map((st) =>
  typeof st === "string" ? { value: st, label: st } : st
);

export default function AmityLeadForm({
  title = "Enquire Now",
  subtitle = "Academic Experts will assist you!",
  formName = "Hero Enquiry Form",
  defaultCourse = "",
  buttonText = "Submit",
  onSuccess,
  onOpenDisclaimer,
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const leadPayload = {
        name: values.full_name,
        email: values.email,
        phone: values.phone.replace(/\D/g, "").slice(-10),
        course: values.course,
        state: values.state,
        university: "Amity University Online",
        source: "Amity",
        form_name: formName,
        utm_source: searchParams.get("utm_source") || "Amity_Landing_Page",
        utm_medium: searchParams.get("utm_medium") || "Direct",
        utm_campaign: searchParams.get("utm_campaign") || "Amity_Online_2026",
        page_url: window.location.href,
      };

      try {
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadPayload),
        });
      } catch (err) {
        console.warn("Lead API submit fallback:", err);
      }

      message.success("Thank you! Academic Experts will assist you.");

      if (onSuccess) {
        onSuccess(leadPayload);
      } else {
        router.push("/thank-you");
      }
    } catch (err) {
      console.error("Submission error:", err);
      message.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#08417b] rounded-xl p-3.5 sm:p-4 shadow-xl border border-blue-900/60 text-white w-full max-w-[280px] sm:max-w-[305px] mx-auto">
      {/* Form Header */}
      <div className="text-center mb-2">
        <h3 className="text-base sm:text-lg font-black text-[#ffc107] tracking-tight leading-tight">
          {title}
        </h3>
        <p className="text-[10px] font-medium text-white/90 leading-tight mt-0.5">{subtitle}</p>

        {/* Yellow Helpline Pill */}
        <a
          href="tel:07065777755"
          className="mt-1.5 inline-flex items-center justify-center gap-1.5 w-full h-7 sm:h-8 px-2.5 rounded-full bg-[#ffc107] hover:bg-[#ffb300] text-slate-950 font-black text-[11px] shadow-xs transition"
        >
          <PhoneCall className="w-3 h-3 text-slate-950 fill-slate-950" />
          <span>+91 7065 7777 55</span>
        </a>
      </div>

      {/* Inputs Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          course: defaultCourse || undefined,
          disclaimer: true,
        }}
        requiredMark={false}
        className="amity-lead-form space-y-1"
      >
        <Form.Item
          name="full_name"
          rules={[{ required: true, message: "Enter name" }]}
          className="mb-1"
        >
          <Input
            placeholder="Enter Your Name"
            className="h-8! rounded-sm! bg-white! text-slate-800! text-[11px]! placeholder-slate-400! border-0! px-2.5!"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Enter email" },
            { type: "email", message: "Valid email" },
          ]}
          className="mb-1"
        >
          <Input
            placeholder="Enter Your Email"
            className="h-8! rounded-sm! bg-white! text-slate-800! text-[11px]! placeholder-slate-400! border-0! px-2.5!"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Enter phone" },
            { pattern: /^[0-9]{10}$/, message: "10 digits" },
          ]}
          className="mb-1"
        >
          <Input
            prefix={
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-slate-700 pr-1 border-r border-slate-200">
                <span className="text-xs">🇮🇳</span> +91 <span className="text-slate-400 text-[8px]">▼</span>
              </span>
            }
            placeholder="Enter 10-digit Mobile Number"
            maxLength={10}
            className="h-8! rounded-sm! bg-white! text-slate-800! text-[11px]! placeholder-slate-400! border-0! px-2!"
          />
        </Form.Item>

        <Form.Item
          name="course"
          rules={[{ required: true, message: "Select course" }]}
          className="mb-1"
        >
          <Select
            placeholder="Select Your Course"
            options={AMITY_COURSE_OPTIONS}
            className="w-full text-[11px]! h-8!"
          />
        </Form.Item>

        <Form.Item
          name="state"
          rules={[{ required: true, message: "Select state" }]}
          className="mb-1"
        >
          <Select
            placeholder="Select Your State"
            options={AMITY_STATE_OPTIONS}
            className="w-full text-[11px]! h-8!"
          />
        </Form.Item>

        {/* Disclaimer Checkbox */}
        <Form.Item
          name="disclaimer"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error("Accept terms")),
            },
          ]}
          className="mb-1.5"
        >
          <Checkbox className="text-[9.5px] text-white! leading-tight! amity-white-checkbox">
            <span className="text-white font-normal">
              I consent to receive updates via email & mobile.{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDisclaimer?.();
                }}
                className="text-white underline font-semibold cursor-pointer hover:text-amber-300"
              >
                Disclaimer
              </span>
            </span>
          </Checkbox>
        </Form.Item>

        {/* Green Submit Button */}
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          className="h-8.5! rounded-md! bg-[#28a745]! hover:bg-[#218838]! text-white! font-bold! text-xs sm:text-sm! capitalize! tracking-normal! border-0! shadow-xs! cursor-pointer!"
        >
          {buttonText}
        </Button>
      </Form>
    </div>
  );
}
