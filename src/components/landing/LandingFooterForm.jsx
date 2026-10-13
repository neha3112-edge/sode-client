"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Button, Checkbox, message } from "antd";
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
    const defaultCourses = [
      { value: "MBA", label: "Master of Business Administration (MBA)" },
      { value: "MCA", label: "Master of Computer Applications (MCA)" },
      { value: "MCOM", label: "Master of Commerce (M.Com)" },
      { value: "MA", label: "Master of Arts (MA)" },
      { value: "BBA", label: "Bachelor of Business Administration (BBA)" },
      { value: "BCA", label: "Bachelor of Computer Applications (BCA)" },
      { value: "BCOM", label: "Bachelor of Commerce (B.Com)" },
      { value: "BA", label: "Bachelor of Arts (BA)" },
    ];

    const courseOptions =
      Array.isArray(courses) && courses.length > 0
        ? courses.map((c) => {
            if (typeof c === "string") return { value: c, label: c };
            return {
              value: c.code || c.value || c.title || c.name,
              label: c.title || c.label || c.name || c.code,
            };
          })
        : defaultCourses;

    return (
      <section
        id="ftr-frm"
        className="w-full bg-white pt-6 sm:pt-10 lg:pt-32 pb-3 sm:pb-5 lg:pb-36 relative select-none scroll-mt-24 overflow-visible"
      >
        {/* Full-Width Navy Blue Horizontal Band */}
        <div className="w-full bg-[#074a76] relative py-12 sm:py-14 lg:py-16">
          <div className="max-w-[1240px] xl:max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[260px] lg:min-h-[300px]">
              {/* Left Column: Heading & Subtitle */}
              <div className="lg:col-span-7 text-left text-white">
                <h2 className="text-[36px] sm:text-[42px] lg:text-[46px] xl:text-[50px] font-semibold text-white tracking-tight leading-[1.18] mb-3 sm:mb-4 m-0">
                  Get Expert Guidance
                </h2>
                <div className="space-y-1.5 text-[16px] sm:text-[18px] lg:text-[19.5px] text-white leading-[1.6] font-normal max-w-2xl">
                  <p className="m-0">Confused about courses or universities?</p>
                  <p className="m-0">
                    Share your details, and our education experts will guide you with the right information.
                  </p>
                </div>
              </div>

              {/* Right Column: Floating Form Card matching user's reference image */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
                <div className="w-full max-w-[440px] bg-[#faf9f5] rounded-[20px] px-6 sm:px-7 pt-9 sm:pt-10 pb-8 sm:pb-9 shadow-[0_14px_45px_rgba(0,0,0,0.14)] border-2 border-[#cfcfc6] text-slate-900 lg:-my-28 xl:-my-32 relative z-20">
                  {/* Card Title */}
                  <h3 className="text-[22px] sm:text-[24px] font-bold text-[#074a76] text-center tracking-tight m-0 leading-tight">
                    Get 100% Free Counselling
                  </h3>
                  <p className="text-[13px] sm:text-[13.5px] text-slate-700 text-center mt-1.5 mb-3.5 font-normal leading-normal">
                    Academic Experts will assist you!
                  </p>

                  {/* Orange Call Pill Button */}
                  <div className="flex justify-center mb-4">
                    <a
                      href={`tel:${(brand.phone || "+91 7065 7777 55").replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-2 bg-[#f37021] hover:bg-[#e46316] text-white font-bold text-[13px] sm:text-[13.5px] px-6 py-2 rounded-full shadow-xs transition-colors cursor-pointer no-underline tracking-wide"
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
                    className="space-y-3.5"
                  >
                    {/* Name */}
                    <Form.Item
                      name="full_name"
                      rules={[{ required: true, message: "Please enter your name" }]}
                      className="mb-0"
                    >
                      <Input
                        placeholder="Enter Your Name"
                        className="h-[44px] text-[14px] rounded-[7px] border-[#c5c5be] hover:border-slate-400 focus:border-[#074a76] bg-white placeholder:text-slate-400"
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
                        className="h-[44px] text-[14px] rounded-[7px] border-[#c5c5be] hover:border-slate-400 focus:border-[#074a76] bg-white placeholder:text-slate-400"
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
                            <span className="ml-1 text-[13.5px] font-medium text-slate-800">+91</span>
                            <span className="ml-1 text-[9px] text-slate-500">▾</span>
                            <span className="mx-2 h-4.5 w-[1px] bg-slate-200" />
                          </span>
                        }
                        placeholder="Enter Your Number"
                        maxLength={10}
                        className="h-[44px] text-[14px] rounded-[7px] border-[#c5c5be] hover:border-slate-400 focus:border-[#074a76] bg-white placeholder:text-slate-400"
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
                        options={courseOptions}
                        className="w-full h-[44px] text-[14px] [&_.ant-select-selector]:!h-[44px] [&_.ant-select-selector]:!items-center [&_.ant-select-selector]:!rounded-[7px] [&_.ant-select-selector]:!border-[#c5c5be] [&_.ant-select-selection-placeholder]:!text-slate-400 [&_.ant-select-selection-placeholder]:!text-[14px]"
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
                        className="w-full h-[44px] text-[14px] [&_.ant-select-selector]:!h-[44px] [&_.ant-select-selector]:!items-center [&_.ant-select-selector]:!rounded-[7px] [&_.ant-select-selector]:!border-[#c5c5be] [&_.ant-select-selection-placeholder]:!text-slate-400 [&_.ant-select-selection-placeholder]:!text-[14px]"
                      />
                    </Form.Item>

                    {/* Disclaimer Checkbox */}
                    <div className="pt-0.5">
                      <Checkbox
                        defaultChecked
                        className="text-[10px] sm:text-[10.5px] text-slate-600 leading-tight select-none"
                      >
                        <span>
                          I consent to receive university updates via email and mobile number.{" "}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenDisclaimer?.();
                            }}
                            className="font-medium underline cursor-pointer bg-transparent border-none p-0 inline text-blue-600 hover:text-blue-800"
                          >
                            Disclaimer
                          </button>
                        </span>
                      </Checkbox>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-1.5">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="bg-[#2cc36c] hover:bg-[#25ab5e] text-white font-bold text-[16px] border-none shadow-none w-full h-[46px] sm:h-[48px] cursor-pointer rounded-[8px] transition-colors"
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
      style={{ background: brand.footerFormBg || brand.primaryColor || "#08417b" }}
    >
      <LandingContainer>
        {/* Header */}
        <div className="mb-5 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#fbcb12] m-0">
            {brand.footerFormTitle || "Have Questions?"}
          </h3>
          <p className="text-xs sm:text-sm text-white/90 mt-1 m-0 font-normal">
            {brand.footerFormSubtitle || "Don't hesitate to contact us. Our academic experts are here to assist you!"}
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

            {/* Row 2: Course, State, Submit */}
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
                  className="font-bold text-[15px] border-none shadow-none w-full h-[40px] cursor-pointer rounded-[6px] hover:opacity-95"
                  style={{
                    background: brand.footerSubmitBtnBg || "#28a745",
                    color: brand.footerSubmitBtnText || "#ffffff",
                  }}
                >
                  Submit
                </Button>
              </Form.Item>
            </div>

            {/* Row 3: Checkbox Disclaimer */}
            <div className="pt-1">
              <Checkbox defaultChecked className="text-[11px] sm:text-[11.5px] [&_.ant-checkbox+span]:!text-white/90 leading-tight select-none">
                <span>
                  I consent to receive university updates via email and mobile number.{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDisclaimer?.();
                    }}
                    className="font-bold underline cursor-pointer bg-transparent border-none p-0 inline text-white hover:text-amber-300"
                  >
                    Disclaimer
                  </button>
                </span>
              </Checkbox>
            </div>
          </Form>
        </div>
      </LandingContainer>
    </section>
  );
}
