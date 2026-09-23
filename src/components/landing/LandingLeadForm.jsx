"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Button, Checkbox, message } from "antd";
import { Phone } from "lucide-react";
import { STATE_OPTIONS } from "@/constants/stateOptions";

export default function LandingLeadForm({
  universityName = "University Online",
  courseList = [],
  formName = "Landing Lead Form",
  defaultCourse = "",
  title = "Enquire Now",
  subtitle = "Academic Experts will assist you!",
  phone = "+91 7065 7777 55",
  buttonText = "Submit",
  onSuccess,
  onOpenDisclaimer,
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const stateOptions = STATE_OPTIONS.map((st) =>
    typeof st === "string" ? { value: st, label: st } : st
  );

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
        university: universityName,
        source: universityName,
        form_name: formName,
        utm_source: searchParams.get("utm_source") || `${universityName}_LP`,
        utm_medium: searchParams.get("utm_medium") || "Direct",
        utm_campaign: searchParams.get("utm_campaign") || "Online_Admission_2026",
        page_url: window.location.href,
      };

      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      message.success("Thank you! Our expert counselor will contact you shortly.");
      form.resetFields();
      onSuccess?.();
      router.push("/thank-you");
    } catch {
      message.error("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#08417b] rounded-2xl p-3.5 sm:p-4 text-white shadow-2xl border border-white/15 w-full max-w-[350px] mx-auto">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg sm:text-xl font-black text-[#ffd200] tracking-tight m-0">
          {title}
        </h3>
        {subtitle && (
          <p className="text-[11px] sm:text-xs text-white/90 font-normal mt-0.5 m-0">
            {subtitle}
          </p>
        )}
      </div>

      {/* Phone CTA Pill */}
      {phone && (
        <div className="flex justify-center mt-1.5 mb-2.5">
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="bg-[#ffd200] hover:bg-[#ffc107] text-slate-900 font-extrabold text-xs px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 no-underline"
          >
            <Phone className="w-3 h-3 fill-slate-900 text-slate-900" />
            <span>{phone}</span>
          </a>
        </div>
      )}

      {/* Form Fields */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ course: defaultCourse || undefined, terms: true }}
        requiredMark={false}
        className="space-y-2"
      >
        <Form.Item
          name="full_name"
          rules={[{ required: true, message: "Please enter your name" }]}
          className="mb-1.5"
        >
          <Input
            size="middle"
            placeholder="Enter Your Name"
            className="h-8.5 rounded-md text-xs sm:text-sm bg-white text-slate-800 placeholder:text-slate-400 border-none"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, type: "email", message: "Please enter valid email" }]}
          className="mb-1.5"
        >
          <Input
            size="middle"
            placeholder="Enter Your Email"
            className="h-8.5 rounded-md text-xs sm:text-sm bg-white text-slate-800 placeholder:text-slate-400 border-none"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: "Valid 10-digit number" }]}
          className="mb-1.5"
        >
          <Input
            size="middle"
            prefix={
              <span className="flex items-center gap-1 text-slate-700 font-semibold text-xs pr-1 border-r border-slate-200 mr-1.5 shrink-0">
                <span className="text-sm leading-none">🇮🇳</span> +91
                <span className="text-[10px] text-slate-400">▾</span>
              </span>
            }
            placeholder="Enter 10-digit Mobile Number"
            maxLength={10}
            className="h-8.5 rounded-md text-xs sm:text-sm bg-white text-slate-800 placeholder:text-slate-400 border-none"
          />
        </Form.Item>

        <Form.Item
          name="course"
          rules={[{ required: true, message: "Select your course" }]}
          className="mb-1.5"
        >
          <Select
            placeholder="Select Your Course"
            options={courseList}
            size="middle"
            className="w-full h-8.5 [&_.ant-select-selector]:!bg-white [&_.ant-select-selector]:!rounded-md [&_.ant-select-selector]:!border-none [&_.ant-select-selection-placeholder]:!text-slate-400 [&_.ant-select-selection-item]:!text-slate-800 text-xs sm:text-sm"
          />
        </Form.Item>

        <Form.Item
          name="state"
          rules={[{ required: true, message: "Select your state" }]}
          className="mb-1.5"
        >
          <Select
            placeholder="Select Your State"
            options={stateOptions}
            showSearch
            size="middle"
            className="w-full h-8.5 [&_.ant-select-selector]:!bg-white [&_.ant-select-selector]:!rounded-md [&_.ant-select-selector]:!border-none [&_.ant-select-selection-placeholder]:!text-slate-400 [&_.ant-select-selection-item]:!text-slate-800 text-xs sm:text-sm"
          />
        </Form.Item>


        <Form.Item
          name="terms"
          valuePropName="checked"
          rules={[{ validator: (_, v) => v ? Promise.resolve() : Promise.reject(new Error("Accept terms")) }]}
          className="mb-2"
        >
          <Checkbox className="text-[10px] sm:text-[10.5px] leading-tight text-white/90">
            I consent to receive university updates via email and mobile number.{" "}
            <button
              type="button"
              onClick={() => onOpenDisclaimer?.()}
              className="text-white underline font-semibold cursor-pointer p-0 bg-transparent border-none inline"
            >
              Disclaimer
            </button>
          </Checkbox>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
          className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold h-9 rounded-lg border-none shadow-md text-sm cursor-pointer transition-all active:scale-[0.98]"
        >
          {buttonText}
        </Button>
      </Form>
    </div>

  );
}
