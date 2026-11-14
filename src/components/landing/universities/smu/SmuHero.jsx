"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Form, Input, Select, Checkbox, Button } from "antd";
import {
  PhoneOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { smuImg, SMU_COURSES, INDIAN_STATES } from "./constants";

export default function SmuHero({
  onOpenBrochure,
  onOpenApply,
  onOpenDisclaimer,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    try {
      setLoading(true);
      setError("");

      const leadPayload = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        course: values.course,
        state: values.state,
        source: "smu_hero_form",
        university: "Sikkim Manipal University Online",
      };

      const res = await fetch("/api/leads", {
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
    <div className="bg-white rounded-[12px] p-5 sm:p-5.5 shadow-[0_6px_28px_rgba(0,0,0,0.15)] max-w-[360px] w-full text-center border border-gray-100">
      <h3 className="text-[#074a76] font-bold text-[21px] sm:text-[23px] leading-tight m-0">
        Get 100% Free Counselling
      </h3>
      <p className="text-[#666666] text-[12px] sm:text-[12.5px] leading-tight mt-1 mb-2.5">
        Academic Experts will assist you!
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
              className="w-full h-[38px] rounded-[6px] text-[13px] border border-gray-300 placeholder:text-gray-400 focus:border-[#074a76]"
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
              className="w-full h-[38px] rounded-[6px] text-[13px] border border-gray-300 placeholder:text-gray-400 focus:border-[#074a76]"
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
              placeholder="Enter Your Number"
              prefix={
                <span className="flex items-center gap-1 text-gray-700 text-[12.5px] font-medium pr-2 mr-1 border-r border-gray-200 select-none">
                  <span className="text-[13px]">🇮🇳</span>
                  <span>+91</span>
                  <span className="text-[9px] text-gray-400">▾</span>
                </span>
              }
              className="w-full h-[38px] rounded-[6px] text-[13px] border border-gray-300 placeholder:text-gray-400 focus:border-[#074a76]"
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
              options={SMU_COURSES}
              className="w-full h-[38px] text-[13px] [&_.ant-select-selector]:h-[38px] [&_.ant-select-selector]:rounded-[6px] [&_.ant-select-selector]:border-gray-300"
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
              className="w-full h-[38px] text-[13px] [&_.ant-select-selector]:h-[38px] [&_.ant-select-selector]:rounded-[6px] [&_.ant-select-selector]:border-gray-300"
              getPopupContainer={(trigger) => trigger.parentElement || document.body}
            />
          </Form.Item>

          {/* Consent Checkbox */}
          <Form.Item
            name="consent"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error("Accept disclaimer")),
              },
            ]}
            className="mb-2.5"
          >
            <Checkbox className="text-[10px] leading-tight text-gray-500 [&_.ant-checkbox-inner]:rounded-[3px]">
              <span>
                I consent to receive university updates via email and mobile number.{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenDisclaimer?.();
                  }}
                  className="text-blue-600 underline cursor-pointer bg-transparent border-none p-0 inline text-[10px]"
                >
                  Disclaimer
                </button>
              </span>
            </Checkbox>
          </Form.Item>

          {/* Submit Button (Green matching media_1793988644788_b93a1660.jpg) */}
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full h-[40px] rounded-[6px] text-[14px] font-bold text-white shadow-xs border-none cursor-pointer active:scale-95 transition-all"
            style={{
              background: "linear-gradient(135deg, #28a745 0%, #218838 100%)",
            }}
          >
            Submit
          </Button>

          {error && (
            <p className="text-red-500 text-[11px] leading-tight text-center mt-2 m-0">
              {error}
            </p>
          )}
        </Form>
      )}
    </div>
  );

  return (
    <>
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
        className="relative w-full py-6 sm:py-8 lg:py-10 flex items-center overflow-hidden bg-[#074a76]"
      >
        {/* Desktop Background Image with smiling student */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src={smuImg("smu-front-desktop.webp")}
            alt="Sikkim Manipal University Online Hero Background"
            fill
            priority
            sizes="(min-width: 1024px) 100vw, 1px"
            className="hidden lg:block object-cover object-center"
          />
        </div>

        <Container className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 w-full">
          {/* Left Column: Hero Content */}
          <div className="w-full lg:max-w-[460px] xl:max-w-[500px] shrink-0 text-left pt-1 lg:pt-0">
            {/* 1. Tagline */}
            <p className="text-white/85 font-medium text-[13px] sm:text-[14px] leading-tight m-0 mb-1.5 select-none">
              #WhereAmbitionsFindTheirWings
            </p>

            {/* 2. Main Title */}
            <h1 className="text-[#f58220] font-extrabold text-[28px] sm:text-[34px] lg:text-[40px] leading-tight tracking-tight m-0 select-none">
              Sikkim Manipal University Online
            </h1>

            {/* 3. Subtitle */}
            <p className="text-white font-medium text-[14px] sm:text-[16px] leading-tight mt-2 mb-3 select-none">
              Learn Without Limits with SMU Online
            </p>

            {/* 4. Course Strips */}
            <div className="my-3 select-none">
              <span className="text-white font-bold text-[15px] sm:text-[17px] tracking-wide inline-block">
                BA | BCOM | MA | MBA | MCOM | MCA
              </span>
            </div>

            {/* 5. Download Brochure Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenBrochure}
                className="bg-[#f58220] hover:bg-[#e07115] text-white font-semibold text-[13.5px] sm:text-[14px] px-5 py-2.5 rounded-[5px] shadow-sm transition-all flex items-center gap-2 cursor-pointer border-none select-none active:scale-95"
              >
                <span>Download Brochure</span>
                <DownloadOutlined className="text-[13px]" />
              </button>
            </div>

            {/* 6. Mobile Campus Image (Visible only on < lg) */}
            <div className="w-full mt-4 mb-2 rounded-[14px] overflow-hidden lg:hidden shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-blue-900/40">
              <Image
                src={smuImg("university.webp")}
                alt="SMU Campus"
                width={800}
                height={400}
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
    </>
  );
}

