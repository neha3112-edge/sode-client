"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Button, Checkbox, message } from "antd";
import { STATE_OPTIONS } from "@/constants/stateOptions";

export default function LandingFooterForm({ brand = {}, courses = [], onOpenDisclaimer }) {
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
      const searchParams = new URLSearchParams(window.location.search);
      const leadPayload = {
        name: values.full_name,
        email: values.email,
        phone: values.phone.replace(/\D/g, "").slice(-10),
        course: values.course,
        state: values.state,
        university: universityName,
        source: universityName,
        form_name: "Footer Horizontal Guidance Form",
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
      router.push("/thank-you");
    } catch {
      message.error("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="footer-guidance"
      className={`py-8 sm:py-10 text-white transition-colors ${brand.themeBg || "bg-[#08417b]"}`}
      style={{ backgroundColor: brand.primaryColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Title & Text */}
          <div className="lg:col-span-4 space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight m-0">
              Get Expert Guidance
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-snug m-0">
              Confused about course or universities?<br className="hidden sm:inline" />
              Share your details, and our education experts will guide you with the right information.
            </p>
          </div>

          {/* Right Horizontal Form */}
          <div className="lg:col-span-8">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ terms: true }}
              requiredMark={false}
              className="space-y-2.5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <Form.Item name="full_name" rules={[{ required: true, message: "Enter name" }]} className="!mb-0">
                  <Input placeholder="Enter Your Name *" size="middle" className="!rounded-md" />
                </Form.Item>
                <Form.Item name="email" rules={[{ required: true, type: "email", message: "Enter email" }]} className="!mb-0">
                  <Input placeholder="Enter Your Email *" size="middle" className="!rounded-md" />
                </Form.Item>
                <Form.Item name="phone" rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: "Valid 10 digits" }]} className="!mb-0">
                  <Input prefix="+91" placeholder="Enter 10-digit Mobile *" maxLength={10} size="middle" className="!rounded-md" />
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <Form.Item name="course" rules={[{ required: true, message: "Select course" }]} className="!mb-0">
                  <Select placeholder="Select Your Course *" options={courses} size="middle" className="w-full" />
                </Form.Item>
                <Form.Item name="state" rules={[{ required: true, message: "Select state" }]} className="!mb-0">
                  <Select placeholder="Select Your State *" options={stateOptions} showSearch size="middle" className="w-full" />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="!bg-[#ffd200] hover:!bg-[#ffc107] !text-[#08417b] !font-bold !h-8 sm:!h-9 !rounded-md !border-none !shadow-xs text-xs sm:text-sm"
                >
                  Submit
                </Button>
              </div>

              <Form.Item name="terms" valuePropName="checked" className="!mb-0 !mt-1">
                <Checkbox className="text-[11px] text-white/95 leading-tight">
                  I consent to receive advisory updates as mentioned in the{" "}
                  <button type="button" onClick={() => onOpenDisclaimer?.()} className="underline text-white font-semibold cursor-pointer">
                    Disclaimer
                  </button>
                </Checkbox>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
