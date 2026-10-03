"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Button, message } from "antd";
import { STATE_OPTIONS } from "@/constants/stateOptions";
import { Phone } from "lucide-react";
import LandingContainer from "./LandingContainer";
import LandingButton from "./LandingButton";

const IndiaFlag = () => (
  <svg className="w-[18px] h-[12px] rounded-[1px] shadow-xs shrink-0 select-none mr-1" viewBox="0 0 640 480">
    <path fill="#FF9933" d="M0 0h640v160H0z" />
    <path fill="#FFFFFF" d="M0 160h640v160H0z" />
    <path fill="#128807" d="M0 320h640v160H0z" />
    <g transform="matrix(3.2 0 0 3.2 320 240)">
      <circle r="20" fill="none" stroke="#000080" strokeWidth="2.5" />
      <circle r="4" fill="#000080" />
      <path fill="none" stroke="#000080" strokeWidth="1" d="M0-20V20M-20 0H20M-14.1-14.1l28.2 28.2M-14.1 14.1L14.1-14.1M-18.5-7.7l37 15.4M-18.5 7.7l37-15.4M-7.7-18.5l15.4 37M7.7-18.5l-15.4 37" />
    </g>
  </svg>
);

const DEFAULT_SMU_COURSES = [
  { value: "BA", label: "BA" },
  { value: "BCOM", label: "BCOM" },
  { value: "MBA", label: "MBA" },
  { value: "MA", label: "MA" },
  { value: "MCOM", label: "MCOM" },
  { value: "MCA", label: "MCA" },
];

export default function LandingFooterForm({ brand = {}, courses = [], onOpenDisclaimer }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isSmu =
    brand.slug === "smu" ||
    brand.name?.toLowerCase().includes("sikkim") ||
    brand.footerFormLayout === "smu-split";

  const universityName = brand.name || "University Online";
  const stateOptions = STATE_OPTIONS.map((st) => (typeof st === "string" ? { value: st, label: st } : st));
  const activeCourses = courses?.length > 0
    ? courses.map((c) => (typeof c === "string" ? { value: c, label: c } : c))
    : DEFAULT_SMU_COURSES;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
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
  // SMU Layout: Horizontal Blue Band with Floating Ivory Card
  // ==========================================
  if (isSmu) {
    return (
      <section id="ftr-frm" className="w-full bg-white pt-14 sm:pt-20 pb-14 sm:pb-20 relative overflow-visible select-none">
        <div className="w-full bg-[#074a76] relative overflow-visible">
          <div className="max-w-[1240px] xl:max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[190px] sm:min-h-[220px]">
              {/* Left Column */}
              <div className="lg:col-span-7 text-left text-white py-8 sm:py-10 space-y-2.5">
                <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-bold text-white tracking-tight leading-[1.2] m-0">
                  Get Expert Guidance
                </h2>
                <div className="space-y-0.5 text-[13.5px] sm:text-[14.5px] text-white/95 leading-[1.6] font-normal max-w-lg">
                  <p className="m-0">Confused about courses or universities?</p>
                  <p className="m-0">Share your details, and our education experts will guide you with the right information.</p>
                </div>
              </div>

              {/* Right Column: Floating Ivory Card */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end -my-14 sm:-my-20 lg:-my-24 relative z-20">
                <div
                  className="w-full max-w-[390px] sm:max-w-[400px] text-slate-900"
                  style={{
                    backgroundColor: "#faf8f5",
                    borderRadius: "22px",
                    padding: "24px 22px 22px 22px",
                    boxShadow: "0 14px 40px rgba(0, 0, 0, 0.18)",
                    border: "1px solid rgba(226, 232, 240, 0.85)",
                  }}
                >
                  <h3 className="text-[21px] sm:text-[22px] font-bold text-[#004b7a] text-center tracking-tight m-0">
                    Get 100% Free Counselling
                  </h3>
                  <p className="text-[13px] text-[#222222] text-center mt-1 mb-3 font-medium">
                    Academic Experts will assist you!
                  </p>

                  {/* Phone Pill */}
                  <div className="flex justify-center mb-3.5">
                    <LandingButton
                      href={`tel:${(brand.phone || "+91 7065 7777 55").replace(/\s+/g, "")}`}
                      variant="phone"
                      skewEffect={true}
                      icon={<Phone className="w-3.5 h-3.5 fill-white text-white stroke-[2.5]" />}
                      iconPosition="left"
                      className="px-5 py-1.5 text-[13px] sm:text-[13.5px] rounded-full shadow-xs"
                      style={{ background: "#f78d2d", color: "#ffffff" }}
                    >
                      <span className="tracking-tight font-bold">{brand.phoneDisplay || "+91 7065 7777 55"}</span>
                    </LandingButton>
                  </div>

                  <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-2.5">
                    <Form.Item name="full_name" rules={[{ required: true, message: "Please enter your name" }]} className="!mb-2.5">
                      <Input placeholder="Enter Your Name" className="w-full !h-[40px] !text-[13.5px] !rounded-[6px] !bg-white !border !border-[#d1d5db] hover:!border-slate-400 focus:!border-[#004b7a] focus:!shadow-none !px-3.5" />
                    </Form.Item>

                    <Form.Item name="email" rules={[{ required: true, message: "Please enter your email" }, { type: "email", message: "Please enter a valid email" }]} className="!mb-2.5">
                      <Input type="email" placeholder="Enter Your Email" className="w-full !h-[40px] !text-[13.5px] !rounded-[6px] !bg-white !border !border-[#d1d5db] hover:!border-slate-400 focus:!border-[#004b7a] focus:!shadow-none !px-3.5" />
                    </Form.Item>

                    <Form.Item name="phone" rules={[{ required: true, message: "Please enter mobile number" }, { pattern: /^[6-9]\d{9}$/, message: "Enter 10-digit mobile" }]} className="!mb-2.5">
                      <Input
                        prefix={
                          <div className="flex items-center gap-1.5 pr-2 mr-1.5 border-r border-[#d1d5db] select-none shrink-0">
                            <IndiaFlag />
                            <span className="text-slate-800 font-bold text-[12.5px] tracking-tight">+91</span>
                            <span className="text-slate-500 text-[9px] leading-none">▾</span>
                          </div>
                        }
                        placeholder="Enter Your Number"
                        maxLength={10}
                        className="w-full !h-[40px] !text-[13.5px] !rounded-[6px] !bg-white !border-[#d1d5db] hover:!border-slate-400 focus-within:!border-[#004b7a]"
                      />
                    </Form.Item>

                    <Form.Item name="course" rules={[{ required: true, message: "Please select course" }]} className="!mb-2.5">
                      <Select
                        placeholder="Select Your Course"
                        options={activeCourses}
                        className="w-full !h-[40px] text-[13.5px] [&_.ant-select-selector]:!h-[40px] [&_.ant-select-selector]:!rounded-[6px] [&_.ant-select-selector]:!border-[#d1d5db] hover:[&_.ant-select-selector]:!border-slate-400 focus-within:[&_.ant-select-selector]:!border-[#004b7a] [&_.ant-select-selection-item]:!leading-[38px] [&_.ant-select-selection-placeholder]:!leading-[38px] [&_.ant-select-selector]:!bg-white [&_.ant-select-arrow]:!text-slate-600"
                      />
                    </Form.Item>

                    <Form.Item name="state" rules={[{ required: true, message: "Please select state" }]} className="!mb-2.5">
                      <Select
                        placeholder="Select Your State"
                        options={stateOptions}
                        showSearch
                        optionFilterProp="label"
                        className="w-full !h-[40px] text-[13.5px] [&_.ant-select-selector]:!h-[40px] [&_.ant-select-selector]:!rounded-[6px] [&_.ant-select-selector]:!border-[#d1d5db] hover:[&_.ant-select-selector]:!border-slate-400 focus-within:[&_.ant-select-selector]:!border-[#004b7a] [&_.ant-select-selection-item]:!leading-[38px] [&_.ant-select-selection-placeholder]:!leading-[38px] [&_.ant-select-selector]:!bg-white [&_.ant-select-arrow]:!text-slate-600"
                      />
                    </Form.Item>

                    <div className="pt-0.5 pb-1">
                      <label className="flex items-start gap-2 cursor-pointer select-none">
                        <input type="checkbox" defaultChecked={false} className="mt-0.5 w-[13px] h-[13px] rounded-[2px] bg-white border border-slate-300 accent-[#22c55e] cursor-pointer shrink-0" />
                        <span className="text-[10.5px] sm:text-[11px] text-slate-700 leading-tight">
                          I consent to receive university updates via email and mobile number.{" "}
                          <button type="button" onClick={() => onOpenDisclaimer?.()} className="font-semibold underline cursor-pointer bg-transparent border-none p-0 inline text-blue-600 hover:text-blue-800">
                            Disclaimer
                          </button>
                        </span>
                      </label>
                    </div>

                    <div className="pt-1">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="w-full !h-[42px] sm:!h-[44px] !bg-[#22c55e] hover:!bg-[#1ea750] !text-white !font-bold !text-[15px] sm:!text-[16px] !rounded-[8px] !border-none !shadow-xs transition-all cursor-pointer flex items-center justify-center tracking-wide"
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

  // ==========================================
  // Default Layout: Full-Width Colored Horizontal Bar
  // ==========================================
  return (
    <section
      id="ftr-frm"
      className="py-8 sm:py-10 text-white transition-colors"
      style={{ background: brand.footerFormBg || brand.primaryColor || "#08417b" }}
    >
      <LandingContainer>
        <div className="mb-5 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#fbcb12] m-0">
            {brand.footerFormTitle || "Have Questions?"}
          </h3>
          <p className="text-xs sm:text-sm text-white/90 mt-1 m-0 font-normal">
            {brand.footerFormSubtitle || "Don't hesitate to contact us. Our academic experts are here to assist you!"}
          </p>
        </div>

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
              <Form.Item label="Full Name" name="full_name" rules={[{ required: true, message: "Please enter your name" }]} className="mb-0">
                <Input placeholder="Enter Your Name" className="h-[40px] text-[13.5px] rounded-[6px]" />
              </Form.Item>

              <Form.Item label="Email Address" name="email" rules={[{ required: true, type: "email", message: "Please enter your email" }]} className="mb-0">
                <Input placeholder="Enter Your Email" className="h-[40px] text-[13.5px] rounded-[6px]" />
              </Form.Item>

              <Form.Item label="Mobile Number" name="phone" rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: "Enter 10-digit mobile" }]} className="mb-0 sm:col-span-2 md:col-span-1">
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
              <Form.Item label="Course" name="course" rules={[{ required: true, message: "Please select course" }]} className="mb-0">
                <Select placeholder="Select Your Course" options={activeCourses} className="w-full h-[40px] text-[13.5px]" />
              </Form.Item>

              <Form.Item label="State" name="state" rules={[{ required: true, message: "Please select state" }]} className="mb-0">
                <Select placeholder="Select Your State" options={stateOptions} showSearch className="w-full h-[40px] text-[13.5px]" />
              </Form.Item>

              <Form.Item className="mb-0 sm:col-span-2 md:col-span-1">
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
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input type="checkbox" defaultChecked className="mt-0.5 w-[14px] h-[14px] rounded-[2px] bg-white border border-slate-300 accent-[#28a745] cursor-pointer shrink-0" />
                <span className="text-[11px] sm:text-[11.5px] text-white/90 leading-tight">
                  I consent to receive university updates via email and mobile number.{" "}
                  <button type="button" onClick={() => onOpenDisclaimer?.()} className="font-bold underline cursor-pointer bg-transparent border-none p-0 inline text-white hover:text-amber-300">
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

