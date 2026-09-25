"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Button, message } from "antd";
import { STATE_OPTIONS } from "@/constants/stateOptions";
import { Phone } from "lucide-react";
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

  const isSmu =
    brand.slug === "smu" ||
    brand.name?.toLowerCase().includes("sikkim") ||
    brand.footerFormLayout === "smu-split";

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

  // ==========================================
  // SMU Layout: Horizontal Blue Band with Card Floating Over Top and Bottom into White Space
  // ==========================================
  if (isSmu) {
    return (
      <section
        id="ftr-frm"
        className="w-full bg-white pt-14 sm:pt-20 pb-14 sm:pb-20 relative overflow-visible select-none"
      >
        {/* Navy Blue Horizontal Band */}
        <div className="w-full bg-[#074a76] relative overflow-visible">
          <div className="max-w-[1240px] xl:max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[190px] sm:min-h-[220px]">
              {/* Left Column: Heading & Subtitle */}
              <div className="lg:col-span-7 text-left text-white py-8 sm:py-10 space-y-2.5">
                <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-white tracking-tight leading-[1.2] m-0">
                  Get Expert Guidance
                </h2>
                <div className="space-y-0.5 text-[13.5px] sm:text-[14.5px] text-white/95 leading-[1.6] font-normal max-w-lg">
                  <p className="m-0">Confused about courses or universities?</p>
                  <p className="m-0">
                    Share your details, and our education experts will guide you with the right information.
                  </p>
                </div>
              </div>

              {/* Right Column: Floating White Card Overlapping Top and Bottom */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end -my-14 sm:-my-20 lg:-my-24 relative z-20">
                <div className="w-full max-w-[420px] bg-white rounded-[16px] sm:rounded-[20px] p-5 sm:p-6 shadow-[0_12px_45px_rgba(0,0,0,0.16)] border border-slate-200/90 text-slate-900">
                  {/* Card Title */}
                  <h3 className="text-[20px] sm:text-[22px] font-bold text-[#074a76] text-center tracking-tight m-0">
                    Get 100% Free Counselling
                  </h3>
                  <p className="text-[12px] sm:text-[13px] text-slate-600 text-center mt-1 mb-2 font-normal">
                    Academic Experts will assist you!
                  </p>

                  {/* Orange Call Pill Button */}
                  <div className="flex justify-center mb-3">
                    <a
                      href={`tel:${(brand.phone || "+91 7065 7777 55").replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-1.5 bg-[#f78d2d] hover:bg-[#ea7d1d] text-white font-bold text-[12.5px] sm:text-[13px] px-4 py-1.5 rounded-full shadow-xs transition-colors cursor-pointer no-underline"
                    >
                      <Phone className="w-3.5 h-3.5 fill-current" />
                      <span>{brand.phoneDisplay || "+91 7065 7777 55"}</span>
                    </a>
                  </div>

                  {/* Form Fields */}
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="space-y-2.5"
                  >
                    {/* Name */}
                    <Form.Item
                      name="full_name"
                      rules={[{ required: true, message: "Please enter your name" }]}
                      className="mb-0"
                    >
                      <Input
                        placeholder="Enter Your Name"
                        className="h-[38px] text-[13px] rounded-[6px] border-slate-300 hover:border-slate-400 focus:border-[#074a76]"
                      />
                    </Form.Item>

                    {/* Email */}
                    <Form.Item
                      name="email"
                      rules={[{ required: true, type: "email", message: "Please enter your email" }]}
                      className="mb-0"
                    >
                      <Input
                        placeholder="Enter Your Email"
                        className="h-[38px] text-[13px] rounded-[6px] border-slate-300 hover:border-slate-400 focus:border-[#074a76]"
                      />
                    </Form.Item>

                    {/* Phone */}
                    <Form.Item
                      name="phone"
                      rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: "Enter 10-digit mobile" }]}
                      className="mb-0"
                    >
                      <Input
                        prefix={
                          <span className="flex items-center text-slate-700 text-xs font-semibold mr-1.5 select-none">
                            <IndiaFlag />
                            <span>+91 ▾</span>
                          </span>
                        }
                        placeholder="Enter Your Number"
                        maxLength={10}
                        className="h-[38px] text-[13px] rounded-[6px] border-slate-300 hover:border-slate-400 focus:border-[#074a76]"
                      />
                    </Form.Item>

                    {/* Course */}
                    <Form.Item
                      name="course"
                      rules={[{ required: true, message: "Please select course" }]}
                      className="mb-0"
                    >
                      <Select
                        placeholder="Select Your Course"
                        options={courses}
                        className="w-full h-[38px] text-[13px]"
                      />
                    </Form.Item>

                    {/* State */}
                    <Form.Item
                      name="state"
                      rules={[{ required: true, message: "Please select state" }]}
                      className="mb-0"
                    >
                      <Select
                        placeholder="Select Your State"
                        options={stateOptions}
                        showSearch
                        className="w-full h-[38px] text-[13px]"
                      />
                    </Form.Item>

                    {/* Disclaimer Checkbox */}
                    <div className="pt-0.5">
                      <label className="flex items-start gap-1.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          className="mt-0.5 w-[13px] h-[13px] rounded-[2px] border border-slate-400 accent-[#2cc36c] cursor-pointer shrink-0"
                        />
                        <span className="text-[10px] sm:text-[10.5px] text-slate-600 leading-tight">
                          I consent to receive university updates via email and mobile number.{" "}
                          <button
                            type="button"
                            onClick={() => onOpenDisclaimer?.()}
                            className="font-semibold underline cursor-pointer bg-transparent border-none p-0 inline text-blue-600 hover:text-blue-800"
                          >
                            Disclaimer
                          </button>
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-1">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="bg-[#2cc36c] hover:bg-[#25ab5e] text-white font-bold text-[15px] border-none shadow-none w-full h-[40px] sm:h-[42px] cursor-pointer rounded-lg transition-colors"
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
