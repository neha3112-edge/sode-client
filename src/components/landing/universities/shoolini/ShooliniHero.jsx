"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Form, Input, Select, Checkbox, message } from "antd";
import { PhoneCall } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import { Container } from "@/components/common/Container";
import { shooliniImg, SHOOLINI_COURSES, INDIAN_STATES } from "./constants";

export default function ShooliniHero({ onOpenBrochure, onOpenDisclaimer }) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          university: "Shoolini University Online",
          pageSource: "Shoolini Landing Page Hero Form",
        }),
      });

      if (res.ok) {
        message.success("Enquiry submitted successfully! Our expert counselor will contact you soon.");
        form.resetFields();
      } else {
        message.error("Failed to submit enquiry. Please try again.");
      }
    } catch {
      message.error("Something went wrong. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .shoolini-hero-bg {
          background-color: #fcf1f1;
        }
        @media (min-width: 1024px) {
          .shoolini-hero-bg {
            background-color: #fff9f6;
            background-image: url('${shooliniImg("shoolini-bg-final.webp")}');
            background-size: cover;
            background-position: center top;
            background-repeat: no-repeat;
          }
        }
        @keyframes shooliniPhonePillShine {
          0% {
            left: -100%;
          }
          100% {
            left: 140%;
          }
        }
        .shoolini-phone-shine {
          position: relative; 
          overflow: hidden;
        }
        .shoolini-phone-shine::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.45) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          animation: shooliniPhonePillShine 2.6s infinite;
          pointer-events: none;
        }
      `}</style>

      <section
        id="hero"
        className="shoolini-hero-bg relative w-full pt-6 pb-8 sm:py-10 lg:py-12 flex items-center select-none overflow-hidden"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Content Column - Left aligned matching desktop & mobile */}
            <div className="lg:col-span-7 text-left max-w-[560px]">
              <p className="text-[#fd202a] font-bold text-xs sm:text-sm tracking-wide mb-1 sm:mb-2">
                #SecureCareerWithShoolini
              </p>

              <h1 className="text-[#fd202a] font-extrabold text-[28px] sm:text-[36px] md:text-[42px] leading-[1.15] tracking-tight m-0">
                Shoolini University Online
              </h1>

              <h2 className="text-gray-800 font-semibold text-[15px] sm:text-[17px] md:text-[19px] mt-2 mb-2 leading-snug">
                Globally Recognised, Outcome-Based Online Programs
              </h2>

              {/* Red Pill / Banner Card matching Reference */}
              <div className="block lg:inline-block w-full max-w-[340px] sm:max-w-[400px] lg:w-auto bg-[#fd202a] text-white font-bold text-[14.5px] sm:text-[15px] lg:text-xs py-2.5 sm:py-3 lg:py-1.5 px-4 rounded-xl lg:rounded-full my-2.5 shadow-xs text-center lg:text-left leading-snug">
                India&apos;s First Pay-After-Placement
                <span className="block lg:inline lg:ml-1">Online Degree Provider</span>
              </div>

              <div className="text-gray-900 font-bold text-sm sm:text-base tracking-wide my-2.5">
                MBA | MCA | MA | Msc | BCOM | BBA | BCA
              </div>

              {/* Download Brochure CTA Button */}
              <div className="flex justify-start my-3">
                <button
                  type="button"
                  onClick={() => onOpenBrochure?.("Hero Download Brochure")}
                  className="inline-flex items-center gap-2 bg-[#fd202a] hover:bg-[#e01620] text-white font-bold text-xs sm:text-sm py-2.5 px-6 rounded-md shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border-none"
                >
                  <span>Download Brochure</span>
                  <FaDownload className="text-xs" />
                </button>
              </div>

              {/* Mobile Campus Banner (Shown on mobile & tablet) */}
              <div className="block lg:hidden w-full mx-auto mt-4 mb-3">
                <div className="w-full rounded-[16px] overflow-hidden shadow-md relative h-[180px] sm:h-[210px]">
                  <Image
                    src={shooliniImg("university.webp")}
                    alt="Shoolini University Campus"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Lead Capture Form Card */}
            <div className="lg:col-span-5 w-full max-w-[420px] mx-auto lg:ml-auto">
              <div className="bg-white rounded-[18px] shadow-2xl p-5 sm:p-6 border border-gray-100">
                {/* Form Header */}
                <div className="text-center mb-3">
                  <h3 className="text-[#fd202a] font-extrabold text-xl sm:text-2xl m-0 leading-tight">
                    Cost Free Consultation
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1 mb-2 font-medium">
                    From Higher Experience Counselor
                  </p>

                  {/* Phone Shine Pill */}
                  <div className="flex justify-center">
                    <a
                      href="tel:07065777755"
                      className="shoolini-phone-shine inline-flex items-center gap-1.5 bg-[#fd202a] hover:bg-[#e01620] text-white text-xs sm:text-[13px] font-semibold py-1.5 px-4 rounded-full no-underline transition-colors shadow-xs"
                    >
                      <PhoneCall size={14} className="shrink-0" />
                      <span>+91 7065 7777 55</span>
                    </a>
                  </div>
                </div>

                {/* Form Fields */}
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  requiredMark={false}
                  className="space-y-2.5"
                >
                  {/* Name */}
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: "Please enter your name" }]}
                    className="mb-2"
                  >
                    <Input
                      placeholder="Enter Your Name"
                      size="large"
                      className="rounded-lg text-xs sm:text-sm"
                    />
                  </Form.Item>

                  {/* Email */}
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                    className="mb-2"
                  >
                    <Input
                      placeholder="Enter Your Email"
                      size="large"
                      className="rounded-lg text-xs sm:text-sm"
                    />
                  </Form.Item>

                  {/* Phone */}
                  <Form.Item
                    name="phone"
                    rules={[
                      { required: true, message: "Please enter phone number" },
                      {
                        pattern: /^[0-9]{10}$/,
                        message: "Enter valid 10-digit number",
                      },
                    ]}
                    className="mb-2"
                  >
                    <Input
                      prefix={
                        <span className="text-gray-500 font-medium text-xs sm:text-sm mr-1">
                          🇮🇳 +91
                        </span>
                      }
                      placeholder="Enter Your Number"
                      maxLength={10}
                      size="large"
                      className="rounded-lg text-xs sm:text-sm"
                    />
                  </Form.Item>

                  {/* Course Select */}
                  <Form.Item
                    name="course"
                    rules={[{ required: true, message: "Please select course" }]}
                    className="mb-2"
                  >
                    <Select
                      placeholder="Select Your Course"
                      size="large"
                      options={SHOOLINI_COURSES}
                      className="rounded-lg text-xs sm:text-sm"
                    />
                  </Form.Item>

                  {/* State Select */}
                  <Form.Item
                    name="state"
                    rules={[{ required: true, message: "Please select your state" }]}
                    className="mb-2"
                  >
                    <Select
                      placeholder="Select Your State"
                      size="large"
                      showSearch
                      optionFilterProp="label"
                      options={INDIAN_STATES.map((s) => ({ label: s, value: s }))}
                      className="rounded-lg text-xs sm:text-sm"
                    />
                  </Form.Item>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-1.5 text-[11px] text-gray-500 pt-0.5 leading-tight">
                    <Checkbox defaultChecked className="mt-0.5" />
                    <span>
                      I consent to receive university updates via email and mobile number.{" "}
                      <button
                        type="button"
                        onClick={onOpenDisclaimer}
                        className="text-[#fd202a] underline hover:text-[#b01417] p-0 bg-transparent border-none cursor-pointer inline font-medium"
                      >
                        Disclaimer
                      </button>
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#28a745] hover:bg-[#218838] text-white font-bold text-sm sm:text-base py-2.5 sm:py-3 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer border-none mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

