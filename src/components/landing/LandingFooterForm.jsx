"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Button, message } from "antd";
import { STATE_OPTIONS } from "@/constants/stateOptions";
import LandingContainer from "./LandingContainer";

const IndiaFlag = () => (
  <svg
    className="w-[18px] h-[12px] rounded-[1px] shadow-xs shrink-0 select-none mr-1"
    viewBox="0 0 640 480"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#FF9933" d="M0 0h640v160H0z" />
    <path fill="#FFFFFF" d="M0 160h640v160H0z" />
    <path fill="#128807" d="M0 320h640v160H0z" />
    <g transform="matrix(3.2 0 0 3.2 320 240)">
      <circle r="20" fill="none" stroke="#000080" strokeWidth="2.5" />
      <circle r="4" fill="#000080" />
      <path
        fill="none"
        stroke="#000080"
        strokeWidth="1"
        d="M0-20V20M-20 0H20M-14.1-14.1l28.2 28.2M-14.1 14.1L14.1-14.1M-18.5-7.7l37 15.4M-18.5 7.7l37-15.4M-7.7-18.5l15.4 37M7.7-18.5l-15.4 37"
      />
    </g>
  </svg>
);

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
      const searchParams = typeof window !== "undefined"
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
        form_name: "Footer Guidance Form",
        utm_source: searchParams.get("utm_source") || `${universityName}_LP`,
        utm_medium: searchParams.get("utm_medium") || "Direct",
        utm_campaign: searchParams.get("utm_campaign") || "Online_Admission_2026",
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

  return (
    <section
      id="ftr-frm"
      className="py-8 sm:py-10 text-white transition-colors"
      style={{ backgroundColor: brand.primaryColor || "#08417b" }}
    >
      <LandingContainer>
        {/* Header */}
        <div className="mb-5 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#fbcb12] m-0">
            Have Questions?
          </h3>
          <p className="text-xs sm:text-sm text-white/90 mt-1 m-0 font-normal">
            Don&apos;t hesitate to contact us. Our academic experts are here to assist you!
          </p>
        </div>

        {/* Responsive Form */}
        <div id="form-ftr">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ terms: true }}
            className="space-y-3.5 [&_.ant-form-item-label_label]:text-white [&_.ant-form-item-label_label]:text-xs sm:[&_.ant-form-item-label_label]:text-sm [&_.ant-form-item-label_label]:font-medium [&_.ant-form-item-label]:pb-1"
          >
            {/* Row 1: Name, Email, Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <Form.Item
                label="Full Name"
                name="full_name"
                rules={[{ required: true, message: "Please enter your name" }]}
                className="mb-0"
              >
                <Input placeholder="Enter Your Name" className="h-[40px] text-[13.5px] rounded-[6px]" />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[{ required: true, type: "email", message: "Please enter your email" }]}
                className="mb-0"
              >
                <Input placeholder="Enter Your Email" className="h-[40px] text-[13.5px] rounded-[6px]" />
              </Form.Item>

              <Form.Item
                label="Mobile Number"
                name="phone"
                rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: "Enter 10-digit mobile" }]}
                className="mb-0 sm:col-span-2 md:col-span-1"
              >
                <Input
                  prefix={
                    <span className="flex items-center text-slate-700 text-xs font-semibold mr-1.5 select-none">
                      <IndiaFlag />
                      <span>+91</span>
                    </span>
                  }
                  placeholder="Enter 10-digit Mobile Number"
                  maxLength={10}
                  className="h-[40px] text-[13.5px] rounded-[6px]"
                />
              </Form.Item>
            </div>

            {/* Row 2: Course, State, Green Submit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 items-end">
              <Form.Item
                label="Course"
                name="course"
                rules={[{ required: true, message: "Please select course" }]}
                className="mb-0"
              >
                <Select
                  placeholder="Select Your Course"
                  options={courses}
                  className="w-full h-[40px] text-[13.5px]"
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
                  className="w-full h-[40px] text-[13.5px]"
                />
              </Form.Item>

              <Form.Item
                className="mb-0 sm:col-span-2 md:col-span-1"
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  id="frm-submit"
                  className="bg-[#28a745] hover:bg-[#218838] text-white font-bold text-[15px] border-none shadow-none w-full h-[40px] cursor-pointer rounded-[6px]"
                >
                  Submit
                </Button>
              </Form.Item>
            </div>

            {/* Row 3: Checkbox Disclaimer */}
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-0.5 w-[14px] h-[14px] rounded-[2px] bg-white border border-slate-300 accent-[#28a745] cursor-pointer shrink-0"
                />
                <span className="text-[11px] sm:text-[11.5px] text-white/90 leading-tight">
                  I consent to receive university updates via email and mobile number.{" "}
                  <button
                    type="button"
                    onClick={() => onOpenDisclaimer?.()}
                    className="font-bold underline cursor-pointer bg-transparent border-none p-0 inline text-white hover:text-amber-300"
                  >
                    Disclaimer
                  </button>
                </span>
              </label>
            </div>
          </Form>
        </div>
      </LandingContainer>
    </section>
  );
}
