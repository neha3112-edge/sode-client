"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Form, Input, Select, Checkbox, Button } from "antd";
import { PhoneOutlined, DownloadOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { lpuImg, LPU_COURSES, INDIAN_STATES } from "./constants";

export default function LpuHero({ onOpenBrochure, onOpenDisclaimer, onOpenApply }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    if (loading) return;

    if (!values.consent) {
      setError("Please accept the terms to continue.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const searchParams =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();

      const leadPayload = {
        name: values.fullName?.trim() || "",
        email: values.email?.trim() || "",
        phone: String(values.phone || "").replace(/\D/g, "").slice(-10),
        course: values.course || "",
        state: values.state || "",
        form_name: "LPU Hero Form",
        source: "LPU",
        sub_source: "LPU Online",
        page_url: typeof window !== "undefined" ? window.location.href : "",
        utm_source: searchParams.get("utm_source") || undefined,
        utm_medium: searchParams.get("utm_medium") || undefined,
        utm_campaign: searchParams.get("utm_campaign") || undefined,
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      const resData = await res.json().catch(() => ({}));

      if (!res.ok || !resData.success) {
        throw new Error(resData.message || "Something went wrong.");
      }

      setSuccess(true);
      form.resetFields();
    } catch (err) {
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderEnquireForm = () => (
    <div className="bg-white rounded-[14px] p-5 sm:p-5.5 shadow-[0_4px_24px_rgba(0,0,0,0.08)] max-w-[360px] w-full text-center border border-gray-100">
      <h3 className="text-[#f58220] font-bold text-[22px] sm:text-[24px] leading-tight m-0">
        Free Counseling
      </h3>
      <p className="text-[#555555] text-[12px] sm:text-[12.5px] leading-tight mt-1 mb-2.5">
        Have Doubt? Talk FREE to Our Expert
      </p>

      {/* Phone Pill with Infinite Shine */}
      <div className="mb-3">
        <a
          href="tel:07065777755"
          className="hero-phone-shine inline-flex items-center gap-1.5 text-white text-[12.5px] font-bold py-1.5 px-4 rounded-full shadow-xs transition-all cursor-pointer select-none no-underline bg-[#f58220] hover:brightness-105"
        >
          <PhoneOutlined className="rotate-90 text-[12px] relative z-10" />
          <span className="relative z-10">+91 7065 7777 55</span>
        </a>
      </div>

      {success ? (
        <div className="bg-[#22c55e] text-white p-3.5 rounded-[8px] text-[13px] font-medium my-2">
          Thank you! Your enquiry has been received. Our counselor will contact you shortly.
        </div>
      ) : (
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{ consent: true }}
          layout="vertical"
          className="w-full text-left"
        >
          {/* Name */}
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: "Please enter your name" }]}
            className="mb-2"
          >
            <Input
              placeholder="Enter Your Name"
              className="w-full h-[38px] rounded-[6px] text-[13px] border border-gray-300 placeholder:text-gray-400 focus:border-[#f58220]"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter valid email" },
            ]}
            className="mb-2"
          >
            <Input
              type="email"
              placeholder="Enter Your Email"
              className="w-full h-[38px] rounded-[6px] text-[13px] border border-gray-300 placeholder:text-gray-400 focus:border-[#f58220]"
            />
          </Form.Item>

          {/* Phone */}
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please enter phone number" },
              { pattern: /^[6-9]\d{9}$/, message: "Enter 10-digit mobile" },
            ]}
            className="mb-2"
          >
            <Input
              type="tel"
              maxLength={10}
              placeholder="Enter your phone number"
              prefix={
                <span className="flex items-center gap-1 text-gray-700 text-[12.5px] font-medium pr-2 mr-1 border-r border-gray-200 select-none">
                  <span className="text-[13px]">🇮🇳</span>
                  <span>+91</span>
                  <span className="text-[9px] text-gray-400">▾</span>
                </span>
              }
              className="w-full h-[38px] rounded-[6px] text-[13px] border border-gray-300 placeholder:text-gray-400 focus:border-[#f58220]"
            />
          </Form.Item>

          {/* Course */}
          <Form.Item
            name="course"
            rules={[{ required: true, message: "Please select course" }]}
            className="mb-2"
          >
            <Select
              placeholder="Select Your Course"
              options={LPU_COURSES}
              className="w-full h-[38px] text-[13px] [&_.ant-select-selector]:h-[38px] [&_.ant-select-selector]:rounded-[6px] [&_.ant-select-selection-item]:leading-[36px] [&_.ant-select-selection-placeholder]:leading-[36px] [&_.ant-select-selector]:border-gray-300"
              getPopupContainer={(trigger) => trigger.parentElement || document.body}
            />
          </Form.Item>

          {/* State */}
          <Form.Item
            name="state"
            rules={[{ required: true, message: "Please select state" }]}
            className="mb-2"
          >
            <Select
              placeholder="Select Your State"
              options={INDIAN_STATES.map((s) => ({ value: s, label: s }))}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
              className="w-full h-[38px] text-[13px] [&_.ant-select-selector]:h-[38px] [&_.ant-select-selector]:rounded-[6px] [&_.ant-select-selection-item]:leading-[36px] [&_.ant-select-selection-placeholder]:leading-[36px] [&_.ant-select-selector]:border-gray-300"
              getPopupContainer={(trigger) => trigger.parentElement || document.body}
            />
          </Form.Item>

          {/* Consent */}
          <div className="mb-2.5">
            <Form.Item name="consent" valuePropName="checked" className="mb-0">
              <Checkbox className="text-[11px] text-gray-600 leading-tight [&_.ant-checkbox-checked_.ant-checkbox-inner]:bg-[#f58220] [&_.ant-checkbox-checked_.ant-checkbox-inner]:border-[#f58220] select-none">
                <span>
                  I consent to receive university updates via email and mobile number.{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDisclaimer?.();
                    }}
                    className="text-[#0066cc] underline hover:text-blue-800 cursor-pointer ml-0.5 inline bg-transparent border-none p-0 text-[11px]"
                  >
                    Disclaimer
                  </button>
                </span>
              </Checkbox>
            </Form.Item>

            {error && (
              <span className="text-red-500 text-[11.5px] font-medium mt-1 block">
                {error}
              </span>
            )}
          </div>

          {/* Submit */}
          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-[38px] bg-[#f58220] hover:bg-[#e07115] border-none text-white font-bold text-[14px] rounded-[6px] transition-colors shadow-none cursor-pointer flex items-center justify-center select-none"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );

  return (
    <>
      {/* Infinite Phone Shine Keyframes matching Manipal and Amity */}
      <style>{`
        @keyframes heroPhoneShine {
          0% { left: -75%; }
          100% { left: 135%; }
        }
        .hero-phone-shine {
          position: relative;
          overflow: hidden;
        }
        .hero-phone-shine::before {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(120deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%);
          transform: skewX(-25deg);
          animation: heroPhoneShine 2.5s infinite;
          pointer-events: none;
        }
      `}</style>

      <section
        id="hero"
        className="relative w-full py-5 sm:py-7 lg:py-8 flex items-center overflow-hidden bg-[#fff8f2]"
      >
        {/* Desktop Background Image with Man smiling */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src={lpuImg("new-desktop-front-bg.webp")}
            alt="LPU Online Hero Background"
            fill
            priority
            sizes="(min-width: 1024px) 100vw, 1px"
            className="hidden lg:block object-cover object-center"
          />
        </div>

        <Container className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 w-full">
          {/* Left Column: Hero Content */}
          <div className="w-full lg:max-w-[450px] xl:max-w-[480px] shrink-0 text-left pt-1 lg:pt-0">
            {/* 1. Brand Tag */}
            <h1 className="text-[#333333] font-bold text-[30px] sm:text-[36px] lg:text-[40px] leading-none tracking-tight m-0 select-none">
              <span className="border-b-[3px] border-[#f58220] pb-0.5 inline-block">
                LPU Online
              </span>
            </h1>

            {/* 2. Punchline */}
            <div className="text-[26px] sm:text-[32px] lg:text-[36px] font-bold leading-tight mt-2 mb-1.5 select-none">
              <span className="text-[#111111]">Career ka </span>
              <span className="text-[#f58220] font-black">Turning Point</span>
            </div>

            {/* 3. Subtitle */}
            <p className="text-[#666666] font-medium text-[13.5px] sm:text-[14.5px] leading-tight m-0 mb-3 select-none">
              LPU Online &amp; Distance Education Courses
            </p>

            {/* 4. Course Strips in Orange Badges */}
            <div className="flex flex-col gap-1.5 my-3 select-none">
              <div className="bg-[#f58220] text-white font-bold text-[14px] sm:text-[16px] px-3.5 py-1.5 rounded-[4px] shadow-xs inline-block w-fit">
                MBA | MCA | MA | MSc Maths
              </div>
              <div className="bg-[#f58220] text-white font-bold text-[14px] sm:text-[16px] px-3.5 py-1.5 rounded-[4px] shadow-xs inline-block w-fit">
                MCOM | BCA | BBA | BA
              </div>
            </div>

            {/* 5. Fees & EMI */}
            <div className="flex items-center gap-6 my-3.5 text-left select-none">
              <div>
                <p className="text-[#888888] text-[11.5px] font-medium leading-none m-0 mb-1">
                  Fees Starting at
                </p>
                <p className="text-[#111111] font-extrabold text-[17px] sm:text-[19px] leading-none m-0">
                  ₹20,000/- Sem
                </p>
              </div>

              <div className="h-8 w-px bg-gray-300" />

              <div>
                <p className="text-[#888888] text-[11.5px] font-medium leading-none m-0 mb-1">
                  Zero Cost
                </p>
                <p className="text-[#111111] font-extrabold text-[17px] sm:text-[19px] leading-none m-0">
                  EMI Available
                </p>
              </div>
            </div>

            {/* 6. Download Brochure Button */}
            <div className="pt-1.5 sm:pt-2">
              <button
                type="button"
                onClick={onOpenBrochure}
                className="bg-[#333333] hover:bg-[#222222] text-white font-semibold text-[13.5px] sm:text-[14px] px-5 py-2.5 rounded-[4px] shadow-sm transition-all flex items-center gap-2 cursor-pointer border-none select-none active:scale-95"
              >
                <span>Download Brochure</span>
                <DownloadOutlined className="text-[13px]" />
              </button>
            </div>

            {/* 7. Mobile Campus Image (Visible only on < lg) */}
            <div className="w-full mt-4 mb-2 rounded-[14px] overflow-hidden lg:hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100">
              <Image
                src={lpuImg("university.webp")}
                alt="LPU Campus"
                width={924}
                height={433}
                priority
                sizes="(max-width: 1023px) 100vw, 500px"
                style={{ width: "100%", height: "auto" }}
                className="w-full h-auto object-cover rounded-[14px] block"
              />
            </div>
          </div>

          {/* Right Column: Free Counseling Card Form */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-end mt-2 lg:mt-0">
            {renderEnquireForm()}
          </div>
        </Container>
      </section>

      {/* Admissions Open Banner Strip */}
      <section className="w-full bg-[#fdfbf9] border-y border-orange-100 py-3 sm:py-3.5 px-4 text-center select-none shadow-2xs">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4">
          <p className="text-[#111827] font-bold text-[14px] sm:text-[16px] m-0">
            Admissions are Open!{" "}
            <span className="text-[#f58220]">
              LPU Online Degree Courses - 2026 Batch
            </span>
          </p>

          <button
            type="button"
            onClick={onOpenApply}
            className="bg-[#f58220] hover:bg-[#e07115] text-white font-bold text-[13px] px-5 py-1.5 rounded-full shadow-xs transition-all cursor-pointer border-none active:scale-95"
          >
            Apply Now
          </button>
        </div>
      </section>
    </>
  );
}

