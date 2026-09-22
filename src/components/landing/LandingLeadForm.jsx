"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Button, Checkbox, message } from "antd";
import { PhoneCall } from "lucide-react";
import { STATE_OPTIONS } from "@/constants/stateOptions";

export default function LandingLeadForm({
  universityName = "University Online",
  courseList = [],
  formName = "Landing Lead Form",
  defaultCourse = "",
  title = "Enquire Now",
  subtitle = "Academic Experts will assist you!",
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
    <div className="bg-white rounded-xl shadow-lg border border-slate-200/90 overflow-hidden">
      <div className="bg-[#08417b] text-white p-3.5 text-center">
        <h3 className="text-base sm:text-lg font-bold tracking-tight m-0">{title}</h3>
        {subtitle && <p className="text-xs text-white/90 mt-0.5 m-0">{subtitle}</p>}
      </div>
      <div className="p-4 sm:p-5">
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ course: defaultCourse, terms: true }} requiredMark={false} className="space-y-3">
          <Form.Item name="full_name" rules={[{ required: true, message: "Please enter your name" }]} className="mb-2.5">
            <Input size="middle" placeholder="Full Name *" className="rounded-md" />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, type: "email", message: "Please enter valid email" }]} className="mb-2.5">
            <Input size="middle" placeholder="Email Address *" className="rounded-md" />
          </Form.Item>
          <Form.Item name="phone" rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: "Valid 10-digit number" }]} className="mb-2.5">
            <Input size="middle" prefix="+91" placeholder="Mobile Number *" maxLength={10} className="rounded-md" />
          </Form.Item>
          <div className="grid grid-cols-2 gap-2 mb-2.5">
            <Form.Item name="course" rules={[{ required: true, message: "Select course" }]} className="mb-0">
              <Select placeholder="Course *" options={courseList} size="middle" className="w-full" />
            </Form.Item>
            <Form.Item name="state" rules={[{ required: true, message: "Select state" }]} className="mb-0">
              <Select placeholder="State *" options={stateOptions} showSearch size="middle" className="w-full" />
            </Form.Item>
          </div>
          <Form.Item name="terms" valuePropName="checked" rules={[{ validator: (_, v) => v ? Promise.resolve() : Promise.reject(new Error("Accept terms")) }]} className="mb-3">
            <Checkbox className="text-[11px] leading-tight text-slate-600">
              I agree to receive admission updates.{" "}
              <button type="button" onClick={() => onOpenDisclaimer?.()} className="text-blue-600 underline cursor-pointer">Disclaimer</button>
            </Checkbox>
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block icon={<PhoneCall className="w-3.5 h-3.5" />} className="bg-[#ffd200] hover:bg-[#ffc107] text-[#08417b] font-bold h-10 rounded-md border-none shadow-xs text-xs sm:text-sm">
            {buttonText}
          </Button>
        </Form>
      </div>
    </div>
  );
}
