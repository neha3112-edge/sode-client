"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Form, Input, Select, Checkbox, Button } from "antd";
import { PhoneOutlined, DownloadOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { muImg, MU_COURSES, INDIAN_STATES } from "./constants";

export default function MuHero({ onOpenBrochure, onOpenDisclaimer }) {
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
        source: "mu_hero_form",
        university: "Mangalayatan University Online",
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
      <style jsx>{`
        .mu-hero-banner {
          background-image: url(${muImg("bg-mobile.webp")});
          background-size: cover;
          background-position: top center;
        }
        @media (min-width: 1024px) {
          .mu-hero-banner {
            background-image: url(${muImg("mangalayatan-hero-desktop.webp")});
            background-position: center;
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
        className="mu-hero-banner relative w-full pt-6 pb-8 sm:py-12 lg:py-14 flex items-center overflow-hidden bg-[#13294b] select-none"
      >
        {/* Subtle dark overlay on mobile */}
        <div className="absolute inset-0 bg-[#13294b]/30 lg:bg-transparent pointer-events-none" />

        <Container className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10">
            {/* Left Hero Content - Matches live mobile & desktop */}
            <div className="w-full lg:w-[48%] xl:w-[46%] text-center lg:text-left text-white shrink-0">
              <p className="text-white text-[13px] sm:text-[15px] lg:text-[17px] font-normal m-0 tracking-normal leading-normal">
                Build Your Career with Mangalayatan University
              </p>

              <h1
                className="text-[28px] sm:text-[36px] lg:text-[44px] font-normal tracking-wide leading-tight text-[#F97316] m-0 mt-1 sm:mt-2 mb-1 uppercase"
                style={{ fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif" }}
              >
                Mangalayatan University
              </h1>

              <h2 className="text-[20px] sm:text-[24px] lg:text-[27px] font-bold text-white tracking-tight leading-tight m-0 mb-2 sm:mb-3">
                Online Degree Courses
              </h2>

              <p className="text-white text-[12px] sm:text-[14px] lg:text-[16px] leading-[18px] sm:leading-[1.35] m-0 mb-4 sm:mb-6 max-w-[340px] sm:max-w-[440px] font-normal mx-auto lg:mx-0">
                Earn Accredited UG &amp; PG Degrees Online{" "}
                <span className="block sm:inline lg:block">
                  Designed for Working Professionals &amp; Students
                </span>
              </p>

              <div>
                <button
                  type="button"
                  onClick={() => onOpenBrochure?.("Mangalayatan University Main Brochure")}
                  className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#ea580c] text-white font-medium py-2 sm:py-2.5 px-6 sm:px-7 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border-none text-[13px] sm:text-[16px]"
                >
                  <span>Download Brochure</span>
                  <DownloadOutlined className="text-xs sm:text-base" />
                </button>
              </div>
            </div>

            {/* Right Side on Mobile: Student image directly above form matching live site */}
            <div className="w-full lg:w-auto flex flex-col items-center justify-center lg:justify-end">
              {/* Mobile Student Photo right above the Form */}
              <div className="block lg:hidden w-full max-w-[320px] sm:max-w-[360px] mx-auto -mt-2 -mb-8 sm:-mb-12 relative z-0">
                <Image
                  src={muImg("mangalayatan-hero-mobile.webp")}
                  alt="Mangalayatan University Student"
                  width={340}
                  height={440}
                  sizes="(max-width: 640px) 320px, 360px"
                  className="w-full h-auto object-contain mx-auto"
                  priority
                />
              </div>

              {/* Enquire Form Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-2xl max-w-[370px] w-full text-center border border-gray-100 mx-auto relative z-10">
                <h3 className="text-[#193579] font-bold text-xl sm:text-2xl leading-tight m-0">
                  Enquire Now
                </h3>
                <p className="text-[#666666] text-xs sm:text-[13px] leading-tight mt-1 mb-3">
                  Academic Experts will assist you!
                </p>

                {/* Blue Phone Pill with Infinite Shine */}
                <div className="mb-3.5">
                  <a
                    href="tel:+919582828828"
                    className="hero-phone-shine inline-flex items-center gap-1.5 text-white text-xs sm:text-[13px] font-bold py-1.5 px-4 rounded-full shadow-xs transition-all cursor-pointer no-underline bg-[#193579] hover:brightness-110"
                  >
                    <PhoneOutlined className="rotate-90 text-xs" />
                    <span>+91 9582 828 828</span>
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
                        className="w-full h-9 rounded-md text-xs sm:text-sm border border-gray-300 placeholder:text-gray-400 focus:border-[#193579]"
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
                        className="w-full h-9 rounded-md text-xs sm:text-sm border border-gray-300 placeholder:text-gray-400 focus:border-[#193579]"
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
                        placeholder="Enter your Number"
                        prefix={
                          <span className="flex items-center gap-1 text-gray-700 text-xs sm:text-sm font-medium pr-2 mr-1 border-r border-gray-200 select-none">
                            <span>🇮🇳</span>
                            <span>+91</span>
                          </span>
                        }
                        className="w-full h-9 text-xs sm:text-sm border border-gray-300 placeholder:text-gray-400 focus:border-[#193579]"
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
                        options={MU_COURSES}
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
                        className="w-full h-9 text-xs sm:text-sm"
                        showSearch
                        options={INDIAN_STATES.map((s) => ({ value: s, label: s }))}
                      />
                    </Form.Item>

                    {/* Disclaimer Checkbox */}
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
                      className="w-full h-10 rounded-lg text-sm sm:text-base font-bold bg-[#F97316] hover:bg-[#ea580c] border-none text-white shadow-md active:scale-98 transition-all cursor-pointer"
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

