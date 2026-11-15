"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Form, Input, Select, Checkbox, message } from "antd";
import { DownloadOutlined, PhoneOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { vguImg, VGU_COURSES, INDIAN_STATES } from "./constants";

export default function VguHero({ onOpenBrochure, onOpenDisclaimer }) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          course: values.course,
          state: values.state,
          source: "vgu-landing-hero",
          university: "Vivekananda Global University Online",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      setSuccess(true);
      message.success("Thank you! Your enquiry has been received.");
      form.resetFields();
    } catch {
      message.error("Submission failed. Please call our helpline directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Background image & Shines matching Amity, MU & CU references */}
      <style>{`
        .vgu-hero-banner-bg {
          background-color: #811811;
        }
        @media (min-width: 1024px) {
          .vgu-hero-banner-bg {
            background-image: url('${vguImg("vgu-desktop.webp")}');
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
            rgba(255, 255, 255, 0.45) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          animation: heroPhoneShine 2.5s infinite;
          pointer-events: none;
        }
      `}</style>

      <section
        id="hero"
        className="vgu-hero-banner-bg relative w-full pt-6 pb-8 sm:py-10 lg:py-12 flex items-center select-none overflow-hidden"
      >
        <Container className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 w-full">
          {/* Left Column: Text Content */}
          <div className="w-full lg:w-[48%] xl:w-[46%] shrink-0 text-left text-white">
            <h1 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-white leading-tight sm:leading-[1.15] m-0 mb-2 sm:mb-3">
              Vivekananda Global <span className="block">University</span>
              <span className="block text-white text-[22px] sm:text-[30px] lg:text-[36px] font-bold mt-0.5">
                Online Degree Programs
              </span>
            </h1>

            <p className="text-white/90 text-xs sm:text-sm lg:text-[14.5px] leading-snug sm:leading-[1.35] m-0 mb-3 sm:mb-4 max-w-[440px] font-normal">
              Empowering professionals with career-focused education, modern curriculum, and
              industry-aligned learning at Vivekananda Global University.
            </p>

            <div className="text-white font-bold text-xs sm:text-[14px] lg:text-[15.5px] tracking-wide m-0 mb-4 sm:mb-6 leading-snug sm:leading-[1.35] max-w-[420px]">
              MBA | MSC | MA | MCA | <br className="hidden sm:inline" />
              MA-JMC | BBA | BCA | BA
            </div>

            <div className="w-full flex justify-start">
              <button
                type="button"
                onClick={() => onOpenBrochure?.("VGU Main Brochure")}
                className="inline-flex items-center gap-2 bg-[#25a244] hover:bg-[#1f8b39] text-white font-bold py-2.5 sm:py-3 px-6 sm:px-7 rounded-md shadow-sm hover:shadow-md transition-all cursor-pointer border-none text-xs sm:text-sm"
              >
                <span>Download Brochure</span>
                <DownloadOutlined className="text-xs sm:text-sm" />
              </button>
            </div>

            {/* Mobile Campus Photo - Exact match to media_1794769111296_633f81fb.jpg */}
            <div className="block lg:hidden w-full max-w-[380px] mx-auto mt-4 mb-2">
              <div className="w-full rounded-[16px] overflow-hidden shadow-sm relative h-[185px] sm:h-[210px]">
                <Image
                  src={vguImg("university.webp")}
                  alt="Vivekananda Global University Campus"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 380px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Enquire Now Form */}
          <div className="w-full lg:w-[340px] xl:w-[350px] shrink-0 mt-2 lg:mt-0 max-w-[380px] mx-auto lg:mx-0">
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-gray-100 text-center">
              <h3 className="text-[#811811] font-bold text-xl sm:text-2xl leading-tight m-0">
                Enquire Now
              </h3>
              <p className="text-gray-500 text-xs sm:text-[13px] mt-1 mb-3 font-medium">
                Academic Experts will assist you!
              </p>

              {/* Red Phone Pill with Infinite Shine */}
              <div className="mb-3.5">
                <a
                  href="tel:+917065777755"
                  className="hero-phone-shine inline-flex items-center gap-1.5 text-white text-xs sm:text-[13px] font-bold py-1.5 px-4 rounded-full shadow-xs transition-all cursor-pointer no-underline bg-[#811811] hover:bg-[#6b140e]"
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
                      size="large"
                      className="rounded-lg text-xs sm:text-sm py-1.5"
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
                      className="rounded-lg text-xs sm:text-sm py-1.5"
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
                      type="tel"
                      maxLength={10}
                      placeholder="Enter 10-digit Mobile Number"
                      size="large"
                      className="rounded-lg text-xs sm:text-sm"
                      prefix={
                        <span className="flex items-center gap-1.5 text-gray-700 text-xs sm:text-sm font-medium pr-2 mr-1 border-r border-gray-200 select-none">
                          <span className="text-sm">🇮🇳</span>
                          <span>+91</span>
                        </span>
                      }
                    />
                  </Form.Item>

                  {/* Course Dropdown */}
                  <Form.Item
                    name="course"
                    rules={[{ required: true, message: "Please select course" }]}
                    className="mb-2"
                  >
                    <Select
                      placeholder="Select Your Course"
                      size="large"
                      className="w-full rounded-lg text-xs sm:text-sm"
                      options={VGU_COURSES}
                    />
                  </Form.Item>

                  {/* State Dropdown */}
                  <Form.Item
                    name="state"
                    rules={[{ required: true, message: "Please select state" }]}
                    className="mb-2.5"
                  >
                    <Select
                      placeholder="Select Your State"
                      size="large"
                      className="w-full rounded-lg text-xs sm:text-sm"
                      options={INDIAN_STATES.map((st) => ({ label: st, value: st }))}
                    />
                  </Form.Item>

                  {/* Consent */}
                  <Form.Item
                    name="consent"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(new Error("Please accept terms")),
                      },
                    ]}
                    className="mb-3 text-[11px] text-gray-500"
                  >
                    <Checkbox className="text-[11px] leading-tight">
                      <span className="text-gray-500 text-[10.5px] leading-tight">
                        I consent to receive university updates via email and mobile number.{" "}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onOpenDisclaimer?.();
                          }}
                          className="text-[#811811] underline hover:text-[#6b140e] cursor-pointer bg-transparent border-none p-0 inline text-[10.5px]"
                        >
                          Disclaimer
                        </button>
                      </span>
                    </Checkbox>
                  </Form.Item>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#811811] hover:bg-[#6b140e] text-white font-bold py-2.5 px-4 rounded-lg shadow-md transition-all cursor-pointer border-none text-sm sm:text-base active:scale-98 disabled:opacity-70"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </Form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

