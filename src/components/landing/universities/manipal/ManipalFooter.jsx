"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Form, Input, Select, Checkbox, Button } from "antd";
import { Container } from "@/components/common/Container";
import {
  manipalImg,
  MANIPAL_COURSES,
  INDIAN_STATES,
} from "./constants";

export default function ManipalFooter({
  onOpenBrochure,
  onOpenScholarship,
  onOpenCompare,
  onOpenDisclaimer,
  onOpenTerms,
  onOpenPrivacy,
}) {
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
        form_name: "Footer Enquiry Form",
        source: "Manipal",
        sub_source: "Manipal University Online",
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

  return (
    <footer className="w-full bg-white select-none">
      {/* 1. Get Expert Guidance Lead Form Section */}
      <section
        id="enroll-frm"
        className="w-full py-10 sm:py-12 text-white"
        style={{
          background: "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)",
        }}
      >
        <Container>
          <div className="w-full text-left">
            <h3 className="text-white font-bold text-[24px] sm:text-[28px] md:text-[32px] leading-tight m-0 mb-1.5">
              Get Expert Guidance
            </h3>
            <p className="text-white text-[13px] sm:text-[14px] leading-relaxed m-0 mb-6 font-normal max-w-[750px] opacity-95">
              Confused about courses or universities? Share your details, and our education experts
              will guide you with the right information.
            </p>

            {success ? (
              <div className="bg-[#22c55e] text-white p-4 rounded-[6px] text-center font-medium my-4">
                Thank you! Your inquiry has been submitted successfully. Our counselor will contact you shortly.
              </div>
            ) : (
              <Form
                form={form}
                onFinish={onFinish}
                initialValues={{ consent: true }}
                layout="vertical"
                className="w-full text-left"
              >
                {/* Row 1: Name, Email, Phone */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-3.5 sm:mb-4">
                  <Form.Item
                    name="fullName"
                    rules={[{ required: true, message: "Please enter your name" }]}
                    className="mb-0"
                  >
                    <Input
                      placeholder="Enter Your Name"
                      className="w-full h-[42px] rounded-[5px] text-[13.5px] border border-gray-200 placeholder:text-gray-400 focus:border-[#ffd508]"
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                    className="mb-0"
                  >
                    <Input
                      type="email"
                      placeholder="Enter Your Email"
                      className="w-full h-[42px] rounded-[5px] text-[13.5px] border border-gray-200 placeholder:text-gray-400 focus:border-[#ffd508]"
                    />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    rules={[
                      { required: true, message: "Please enter 10-digit mobile number" },
                      { pattern: /^[6-9]\d{9}$/, message: "Enter valid 10-digit mobile number" },
                    ]}
                    className="mb-0"
                  >
                    <Input
                      type="tel"
                      maxLength={10}
                      placeholder="Enter Mobile Number"
                      prefix={
                        <span className="flex items-center gap-1.5 text-gray-700 text-[13px] font-medium pr-2.5 mr-1 border-r border-gray-200 select-none">
                          <span className="text-[14px]">🇮🇳</span>
                          <span>+91</span>
                        </span>
                      }
                      className="w-full h-[42px] rounded-[5px] text-[13.5px] border border-gray-200 placeholder:text-gray-400 focus:border-[#ffd508]"
                    />
                  </Form.Item>
                </div>

                {/* Row 2: Course, State, Submit Button */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-3">
                  <Form.Item
                    name="course"
                    rules={[{ required: true, message: "Please select your course" }]}
                    className="mb-0"
                  >
                    <Select
                      placeholder="Select Your Course"
                      options={MANIPAL_COURSES}
                      className="w-full h-[42px] text-[13.5px] [&_.ant-select-selector]:h-[42px] [&_.ant-select-selector]:rounded-[5px] [&_.ant-select-selection-item]:leading-[40px] [&_.ant-select-selection-placeholder]:leading-[40px] [&_.ant-select-selector]:border-gray-200"
                      getPopupContainer={(trigger) => trigger.parentElement || document.body}
                    />
                  </Form.Item>

                  <Form.Item
                    name="state"
                    rules={[{ required: true, message: "Please select your state" }]}
                    className="mb-0"
                  >
                    <Select
                      placeholder="Select Your State"
                      options={INDIAN_STATES.map((s) => ({ value: s, label: s }))}
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                      }
                      className="w-full h-[42px] text-[13.5px] [&_.ant-select-selector]:h-[42px] [&_.ant-select-selector]:rounded-[5px] [&_.ant-select-selection-item]:leading-[40px] [&_.ant-select-selection-placeholder]:leading-[40px] [&_.ant-select-selector]:border-gray-200"
                      getPopupContainer={(trigger) => trigger.parentElement || document.body}
                    />
                  </Form.Item>

                  <Form.Item className="mb-0">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      className="w-full h-[42px] bg-[#f7b314] hover:bg-[#e5a20c] border-none text-[#111827] font-bold text-[15px] rounded-[5px] transition-colors shadow-none cursor-pointer flex items-center justify-center select-none"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </div>

                {/* Row 3: Consent Checkbox & Error message */}
                <div className="flex flex-col gap-1 text-left mt-2">
                  <Form.Item
                    name="consent"
                    valuePropName="checked"
                    className="mb-0"
                  >
                    <Checkbox className="text-white text-[11px] sm:text-[11.5px] [&_.ant-checkbox+span]:text-white [&_.ant-checkbox-checked_.ant-checkbox-inner]:bg-[#f7b314] [&_.ant-checkbox-checked_.ant-checkbox-inner]:border-[#f7b314] select-none">
                      <span className="text-white">
                        I consent to receive university updates via email and mobile number.{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenDisclaimer?.();
                          }}
                          className="text-[#ffd200] underline hover:text-white cursor-pointer ml-1 inline bg-transparent border-none p-0"
                        >
                          Disclaimer
                        </button>
                      </span>
                    </Checkbox>
                  </Form.Item>

                  {error && (
                    <span className="text-yellow-200 text-[12px] font-medium mt-1">
                      {error}
                    </span>
                  )}
                </div>
              </Form>
            )}
          </div>
        </Container>
      </section>

      {/* 2. Still Confused? Comparison Card Section */}
      <section className="w-full bg-[#f6f8fa] px-5 sm:px-10 lg:px-[60px] pt-8 sm:pt-10 pb-0">
        <div
          className="w-full rounded-[20px] px-6 py-8 sm:py-10 flex flex-col items-center justify-center text-center text-white relative shadow-sm"
          style={{
            background: "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)",
          }}
        >
          <h2 className="text-white font-bold text-[24px] sm:text-[28px] md:text-[32px] leading-tight m-0">
            Still Confused?
          </h2>
          <h4 className="text-white font-normal text-[14px] sm:text-[15px] leading-snug mt-2 mb-2 sm:mb-3">
            Compare Manipal University Online with Top UGC-DEB Approved Universities
          </h4>

          {/* Yellow Circular Downward Arrow (Overlapping Bottom) */}
          <button
            type="button"
            onClick={onOpenCompare}
            aria-label="Compare Universities"
            className="absolute -bottom-8 sm:-bottom-9 left-1/2 -translate-x-1/2 cursor-pointer transition-transform duration-200 hover:scale-105 select-none bg-transparent border-none p-0 focus:outline-none"
          >
            <div className="relative w-[66px] h-[66px] sm:w-[70px] sm:h-[70px] rounded-full overflow-hidden">
              <Image
                src={manipalImg("arrow.gif")}
                alt="Compare University"
                fill
                sizes="70px"
                className="object-contain"
                unoptimized
              />
            </div>
          </button>
        </div>
      </section>

      {/* 3. SODE Logo, Legal Disclaimer & Copyright */}
      <section className="w-full bg-white pt-6 sm:pt-8 pb-0 text-center">
        {/* SODE Logo */}
        <div className="w-full flex justify-center mb-2.5 sm:mb-3 px-5">
          <button
            type="button"
            onClick={onOpenCompare}
            className="cursor-pointer bg-transparent border-none p-0 inline-block focus:outline-none"
          >
            <div className="relative w-[300px] sm:w-[380px] md:w-[420px] h-[75px] sm:h-[95px] md:h-[105px]">
              <Image
                src={manipalImg("new-des-logo.webp")}
                alt="Distance Education School - SODE"
                fill
                sizes="(max-width: 640px) 300px, 420px"
                className="object-contain"
              />
            </div>
          </button>
        </div>

        {/* Disclaimer Paragraph & Legal Links - Full width edge-to-edge */}
        <div className="w-full px-4 sm:px-8 lg:px-10 pt-1 pb-6 sm:pb-7 text-center">
          <p className="text-[#555555] text-[11px] sm:text-[12px] md:text-[12.5px] leading-[1.32] sm:leading-[1.38] m-0 mb-2 max-w-full">
            SODE Counselling Services LLP act as a marketing agency. All university names, logos,
            and trademarks mentioned are used for informational purposes only. We are not a
            university or an admission authority. Users are encouraged to verify information on
            the official website of the University before making decisions.
          </p>

          <div className="flex items-center justify-center gap-2 text-[12px] sm:text-[12.5px] text-[#222222] font-semibold">
            <button
              type="button"
              onClick={onOpenDisclaimer}
              className="hover:underline text-[#222222] cursor-pointer bg-transparent border-none p-0 font-semibold"
            >
              Disclaimer
            </button>
            <span className="text-gray-400">|</span>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:underline text-[#222222] cursor-pointer bg-transparent border-none p-0 font-semibold"
            >
              Terms &amp; Conditions
            </button>
            <span className="text-gray-400">|</span>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:underline text-[#222222] cursor-pointer bg-transparent border-none p-0 font-semibold"
            >
              Privacy Policy
            </button>
          </div>
        </div>

        {/* Bottom Dark Copyright Strip */}
        <div className="w-full bg-[#f35a06] py-2.5 sm:py-3 pb-16 md:pb-3 text-center text-white text-[12px] sm:text-[13px] font-normal tracking-wide">
          © 2026 SODE Counseling Services LLP
        </div>
      </section>

      {/* 4. Floating Fixed Call & Scholarship Buttons (Hidden on mobile as bottom sticky CTA bar is present) */}
      <div className="hidden md:flex fixed bottom-5 right-4 sm:right-6 z-40 flex-col items-center gap-2.5 sm:gap-3">
        {/* Call Floating Button */}
        <a
          href="tel:07065777755"
          aria-label="Call Now"
          className="relative w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-full overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-transform duration-200 hover:scale-110 flex items-center justify-center bg-[#25d366]"
        >
          <Image
            src={manipalImg("call_icon.gif")}
            alt="Call Us"
            fill
            sizes="56px"
            className="object-cover rounded-full"
            unoptimized
          />
        </a>

        {/* Scholarship Floating Gift Button */}
        <button
          type="button"
          onClick={onOpenScholarship}
          aria-label="Open Scholarship Coupon"
          className="relative w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-full overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-transform duration-200 hover:scale-110 flex items-center justify-center bg-[#fbcb12] border-none cursor-pointer p-0"
        >
          <Image
            src={manipalImg("gift.gif")}
            alt="Scholarship Gift"
            fill
            sizes="56px"
            className="object-cover rounded-full"
            unoptimized
          />
        </button>
      </div>

      {/* 5. Mobile Sticky Bottom Action Bar (<= md) */}
      <div
        className="block md:hidden fixed bottom-0 left-0 right-0 z-50 p-2 shadow-[0_-4px_20px_rgba(0,0,0,0.18)]"
        style={{
          background: "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)",
        }}
      >
        <div className="grid grid-cols-2 gap-2">
          {/* WhatsApp Get Brochure */}
          <a
            href="https://api.whatsapp.com/send/?phone=+917065777755&text=I%20want%20to%20Download%20Online%20Manipal%20Brochure"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25d366] text-white font-bold text-[13.5px] py-2 px-3 rounded-full flex items-center justify-center gap-1.5 no-underline shadow-sm"
          >
            <span>💬 Get Brochure</span>
          </a>

          {/* Apply Now Popup Button */}
          <button
            type="button"
            onClick={onOpenBrochure}
            className="bg-white text-[#ee3024] font-bold text-[13.5px] py-2 px-3 rounded-full flex items-center justify-center gap-1 border-none cursor-pointer shadow-sm hover:bg-gray-50 active:scale-95"
          >
            <span>Apply Now »</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

