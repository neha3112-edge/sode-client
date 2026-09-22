"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Button, Checkbox, message } from "antd";
import { STATE_OPTIONS } from "@/constants/stateOptions";
import LandingContainer from "./LandingContainer";

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
      id="ftr-frm"
      className="py-8 text-white transition-colors"
      style={{ backgroundColor: brand.primaryColor || "#08417b" }}
    >
      <LandingContainer>
        {/* Header matching screenshot */}
        <div className="mb-5 text-left">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-normal text-[#fbcb12] m-0">
            Have Questions?
          </h3>
          <p className="text-xs sm:text-sm text-white mt-1.5 m-0 font-normal">
            Don&apos;t hesitate to contact us. Our academic experts are here to assist you!
          </p>
        </div>

        {/* 2-Row Antd Form matching screenshot */}
        <div id="form-ftr">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ terms: true }}
            className="space-y-3.5 [&_.ant-form-item-label_label]:text-white [&_.ant-form-item-label_label]:text-xs sm:[&_.ant-form-item-label_label]:text-sm [&_.ant-form-item-label_label]:font-medium [&_.ant-form-item-label]:pb-1 [&_.ant-form-item-required-mark]:text-red-400"
          >
            {/* Row 1: Name, Email, Phone with Flag */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <Form.Item
                label="Full Name"
                name="full_name"
                rules={[{ required: true, message: "Please enter your name" }]}
                className="mb-0"
              >
                <Input placeholder="Enter Your Name" />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[{ required: true, type: "email", message: "Please enter your email" }]}
                className="mb-0"
              >
                <Input placeholder="Enter Your Email" />
              </Form.Item>

              <Form.Item
                label="Mobile Number"
                name="phone"
                rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: "Enter 10-digit mobile" }]}
                className="mb-0"
              >
                <Input
                  prefix={
                    <span className="flex items-center gap-1 text-slate-700 text-xs font-semibold mr-1.5 select-none">
                      <span className="text-sm">🇮🇳</span>
                      <span>+91</span>
                      <span className="text-[9px] text-slate-500">▼</span>
                    </span>
                  }
                  placeholder="Enter 10-digit Mobile Number"
                  maxLength={10}
                />
              </Form.Item>
            </div>

            {/* Row 2: Course, State, Green Submit */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 items-end">
              <Form.Item
                label="Course"
                name="course"
                rules={[{ required: true, message: "Please select course" }]}
                className="mb-0"
              >
                <Select
                  placeholder="Select Your Course"
                  options={courses}
                  className="w-full"
                />
              </Form.Item>

              <Form.Item
                label="State"
                name="state"
                rules={[{ required: true, message: "Please select state" }]}
                className="mb-0"
              >
                <Select
                  placeholder="Select Your State"
                  options={stateOptions}
                  showSearch
                  className="w-full"
                />
              </Form.Item>

              <Form.Item
                label={<span className="invisible select-none hidden md:inline-block">&nbsp;</span>}
                className="mb-0"
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  id="frm-submit"
                  className="bg-[#28a745] hover:bg-[#218838] text-white font-medium text-[15px] border-none shadow-none w-full cursor-pointer"
                >
                  Submit
                </Button>
              </Form.Item>
            </div>

            {/* Row 3: Checkbox Disclaimer */}
            <div className="pt-1">
              <Form.Item name="terms" valuePropName="checked" className="mb-0">
                <Checkbox className="text-[11px] sm:text-[12px] text-white leading-normal [&_.ant-checkbox-inner]:rounded-[2px]">
                  I consent to receive university updates via email and mobile number.{" "}
                  <button
                    type="button"
                    onClick={() => onOpenDisclaimer?.()}
                    className="underline text-white font-semibold cursor-pointer ml-1 hover:text-amber-300"
                  >
                    Disclaimer
                  </button>
                </Checkbox>
              </Form.Item>
            </div>
          </Form>
        </div>
      </LandingContainer>
    </section>
  );
}
