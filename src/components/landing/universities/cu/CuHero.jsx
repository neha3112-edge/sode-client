"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Form, Input, Select, Checkbox, Button } from "antd";
import { PhoneOutlined, DownloadOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { cuImg, CU_COURSES, INDIAN_STATES } from "./constants";

export default function CuHero({ onOpenBrochure, onOpenDisclaimer, onOpenScholarship }) {
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
        source: "cu_hero_form",
        university: "Chandigarh University Online",
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

  return (
    <>
      {/* Background image & Shines matching Amity, MU & CU references */}
      <style>{`
        .cu-hero-banner-bg {
          background-color: #ffffff;
        }
        @media (min-width: 1024px) {
          .cu-hero-banner-bg {
            background-image: url('${cuImg("CU-ODC.webp")}');
            background-position: 53% top;
            background-size: cover;
            background-repeat: no-repeat;
          }
        }
        @keyframes heroPhoneShine {
          0% {
            left: -75%;
          }
          100% {
            left: 135%;
          }
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
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          animation: heroPhoneShine 2.5s infinite;
          pointer-events: none;
        }
      `}</style>

      <section
        id="hero"
        className="cu-hero-banner-bg relative w-full pt-5 pb-8 sm:py-10 lg:py-12 flex items-center bg-white select-none overflow-hidden"
      >
        <Container className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 w-full">
          {/* Left Column: Text Content (Centered on mobile, left-aligned on desktop) */}
          <div className="w-full lg:w-[48%] xl:w-[46%] shrink-0 text-center lg:text-left flex flex-col items-center lg:items-start">
            <p className="text-gray-600 font-medium text-xs sm:text-sm lg:text-[15px] tracking-wide m-0 mb-1.5 sm:mb-2 leading-snug">
              #Discover.Learn.Empower
            </p>

            <h1 className="text-[32px] sm:text-[40px] lg:text-[45px] font-extrabold text-[#d11c1f] leading-tight sm:leading-[1.12] m-0 mb-2 sm:mb-3">
              Chandigarh <span className="block">University Online</span>
            </h1>

            <p className="text-gray-700 text-xs sm:text-sm lg:text-[14.5px] leading-snug sm:leading-[1.35] m-0 mb-3 sm:mb-4 max-w-[400px] font-normal mx-auto lg:mx-0">
              Redefine your future and elevate your potential with CU Online.
            </p>

            <div className="text-gray-900 font-bold text-xs sm:text-[14px] lg:text-[15.5px] tracking-wide m-0 mb-4 sm:mb-6 leading-snug sm:leading-[1.35] max-w-[420px] mx-auto lg:mx-0">
              BBA | BCA | BA-JMC | MBA | MCA <br className="inline sm:hidden" />
              | MA-JMC | MSC | MA
            </div>

            <div className="w-full flex justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => onOpenBrochure?.("Chandigarh University Main Brochure")}
                className="inline-flex items-center gap-2 bg-[#d11c1f] hover:bg-[#b01619] text-white font-bold py-2.5 sm:py-3 px-6 sm:px-7 rounded-md shadow-sm hover:shadow-md transition-all cursor-pointer border-none text-xs sm:text-sm"
              >
                <span>Download Brochure</span>
                <DownloadOutlined className="text-xs sm:text-sm" />
              </button>
            </div>

            {/* Mobile Campus Photo & Coupon Button - Exact match to media_1794766779264_96a585c3.jpg */}
            <div className="block lg:hidden w-full max-w-[380px] mx-auto mt-4 mb-2">
              <div className="w-full rounded-[16px] overflow-hidden shadow-sm relative h-[185px] sm:h-[210px] mb-3">
                <Image
                  src={cuImg("university.webp")}
                  alt="Chandigarh University Campus"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 380px"
                  className="object-cover"
                />
              </div>

              {/* Mobile Green Scholarship Coupon Code Button */}
              <button
                type="button"
                onClick={onOpenScholarship}
                className="header-coupon-shine w-full inline-flex items-center justify-center gap-2 bg-[#25a244] hover:bg-[#1f8b39] text-white font-bold text-sm py-2.5 px-4 rounded-md shadow-sm border-none cursor-pointer"
              >
                <span className="relative w-5 h-5 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-xs p-0.5">
                  <Image
                    src={cuImg("gift.gif")}
                    alt="Scholarship Gift"
                    width={18}
                    height={18}
                    className="object-contain rounded-full"
                    unoptimized
                  />
                </span>
                <span>Scholarship Coupon Code</span>
              </button>
            </div>
          </div>

          {/* Right Column: Free Counseling Form */}
          <div className="w-full lg:w-[340px] xl:w-[350px] shrink-0 mt-2 lg:mt-0 max-w-[380px] mx-auto lg:mx-0">
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-gray-100 text-center">
              <h3 className="text-[#d11c1f] font-bold text-xl sm:text-2xl leading-tight m-0">
                Free Counseling
              </h3>
              <p className="text-gray-500 text-xs sm:text-[13px] mt-1 mb-3">
                Request a call back Now
              </p>

              {/* Red Phone Pill with Infinite Shine */}
              <div className="mb-3.5">
                <a
                  href="tel:+917065777755"
                  className="hero-phone-shine inline-flex items-center gap-1.5 text-white text-xs sm:text-[13px] font-bold py-1.5 px-4 rounded-full shadow-xs transition-all cursor-pointer no-underline bg-[#d11c1f] hover:bg-[#b01619]"
                >
                  <PhoneOutlined className="rotate-90 text-xs" />
                  <span>+91 7065 7777 55</span>
                </a>
              </div>

              {success ? (
                <div className="bg-[#22c55e] text-white p-3.5 rounded-lg text-xs sm:text-sm font-medium my-2">
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
                      className="w-full h-9 rounded-md text-xs sm:text-sm border border-gray-300 placeholder:text-gray-400 focus:border-[#d11c1f]"
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
                      className="w-full h-9 rounded-md text-xs sm:text-sm border border-gray-300 placeholder:text-gray-400 focus:border-[#d11c1f]"
                    />
                  </Form.Item>

                  {/* Phone */}
                  <Form.Item
                    name="phone"
                    rules={[
                      { required: true, message: "Please enter phone number" },
                      { pattern: /^[0-9]{10}$/, message: "Enter valid 10-digit number" },
                    ]}
                    className="mb-2"
                  >
                    <Input
                      type="tel"
                      maxLength={10}
                      placeholder="Enter Your Number"
                      prefix={
                        <span className="flex items-center gap-1 text-gray-700 text-xs sm:text-sm font-medium pr-2 mr-1 border-r border-gray-200 select-none">
                          <span>🇮🇳</span>
                          <span>+91</span>
                        </span>
                      }
                      className="w-full h-9 text-xs sm:text-sm border border-gray-300 placeholder:text-gray-400 focus:border-[#d11c1f]"
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
                      className="w-full h-9 text-xs sm:text-sm"
                      options={CU_COURSES}
                    />
                  </Form.Item>

                  {/* State */}
                  <Form.Item
                    name="state"
                    rules={[{ required: true, message: "Please select state" }]}
                    className="mb-2"
                  >
                    <Select
                      placeholder="Select State"
                      className="w-full h-9 text-xs sm:text-sm"
                      showSearch
                      options={INDIAN_STATES.map((s) => ({ value: s, label: s }))}
                    />
                  </Form.Item>

                  {/* Consent Checkbox */}
                  <Form.Item
                    name="consent"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(new Error("Please agree to receive updates")),
                      },
                    ]}
                    className="mb-3"
                  >
                    <Checkbox className="text-[11px] leading-tight text-gray-600">
                      <span>I consent to receive university updates via email and mobile number. </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onOpenDisclaimer?.();
                        }}
                        className="text-blue-600 underline font-semibold hover:text-blue-800 p-0 border-none bg-transparent cursor-pointer inline"
                      >
                        Disclaimer
                      </button>
                    </Checkbox>
                  </Form.Item>

                  {error && (
                    <div className="text-red-500 text-xs mb-2 text-center font-medium">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full h-10 rounded-md text-sm sm:text-base font-bold bg-[#d11c1f] hover:bg-[#b01619] border-none text-white shadow-md active:scale-98 transition-all cursor-pointer"
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
