"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Form, Input, Select, message } from "antd";
import { PhoneCall } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import { Container } from "@/components/common/Container";
import { uuImg, UU_COURSES, INDIAN_STATES } from "./constants";

export default function UuHero({ onOpenBrochure, onOpenDisclaimer }) {
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
          university: "Uttaranchal University Online",
          pageSource: "UU Landing Page Hero Form",
        }),
      });

      if (res.ok) {
        message.success("Enquiry submitted successfully! Our expert will contact you soon.");
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
        .uu-hero-bg {
          background-color: #0a3c7d;
          background-image: url('${uuImg("UTTRANCHAL-BG.webp")}');
          background-size: cover;
          background-position: left top;
        }
        @keyframes phonePillShine {
          0% {
            left: -100%;
          }
          100% {
            left: 140%;
          }
        }
        .phone-shine-pill {
          position: relative;
          overflow: hidden;
        }
        .phone-shine-pill::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          animation: phonePillShine 2.6s infinite;
          pointer-events: none;
        }
      `}</style>

      <section
        id="hero"
        className="uu-hero-bg relative w-full pt-6 pb-8 sm:py-10 lg:py-14 flex items-center select-none overflow-hidden"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Content Column - Left aligned matching mobile reference */}
            <div className="lg:col-span-7 text-white text-left">
              <h1 className="text-white font-extrabold text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] leading-[1.1] tracking-tight uppercase m-0">
                UTTARANCHAL UNIVERSITY
                <span className="block text-[#62B239] mt-0.5">ONLINE</span>
              </h1>

              <h2 className="text-white font-semibold text-[17px] sm:text-[20px] md:text-[22px] tracking-wide mt-2 sm:mt-2.5 mb-2.5 sm:mb-3">
                BBA | BCA | BA | MBA | MCA
              </h2>

              <p className="text-white/95 text-[12.5px] sm:text-[13.5px] md:text-[14.5px] leading-relaxed max-w-[540px] mb-4 sm:mb-5">
                Enhance your skills and pursue your passion with our diverse online education programs designed for success.
              </p>

              {/* Get Brochure CTA Button */}
              <div className="flex justify-start mb-4">
                <button
                  type="button"
                  onClick={() => onOpenBrochure?.("Hero Get Brochure")}
                  className="inline-flex items-center gap-2 bg-[#d11c1f] hover:bg-[#b01417] text-white font-bold text-sm sm:text-base py-2.5 px-6 rounded-md shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border-none"
                >
                  <span>Get Brochure</span>
                  <FaDownload className="text-sm" />
                </button>
              </div>

              {/* Mobile Campus Image Banner (Shown on mobile & tablet) */}
              <div className="block lg:hidden w-full mx-auto mt-4 mb-4">
                <div className="w-full rounded-[20px] overflow-hidden shadow-lg relative h-[185px] sm:h-[220px]">
                  <Image
                    src={uuImg("university.webp")}
                    alt="Uttaranchal University Campus"
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
                <div className="text-center mb-4">
                  <h3 className="text-[#003399] font-bold text-xl sm:text-2xl m-0 leading-tight">
                    Enquire Now
                  </h3>
                  <p className="text-[#003399] text-xs sm:text-sm mt-1 mb-2 font-medium">
                    Academic Experts will assist you!
                  </p>

                  {/* Phone Shine Pill */}
                  <div className="flex justify-center">
                    <a
                      href="tel:07065777755"
                      className="phone-shine-pill inline-flex items-center gap-1.5 bg-[#003399] hover:bg-[#002266] text-white text-xs sm:text-[13px] font-semibold py-1.5 px-4 rounded-full no-underline transition-colors shadow-xs"
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

                  {/* Phone with clean Prefix */}
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
                      placeholder="Enter Your Phone Number"
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
                      className="w-full text-xs sm:text-sm rounded-lg"
                      options={UU_COURSES}
                    />
                  </Form.Item>

                  {/* State Dropdown */}
                  <Form.Item
                    name="state"
                    rules={[{ required: true, message: "Please select state" }]}
                    className="mb-3"
                  >
                    <Select
                      showSearch
                      placeholder="Select Your State"
                      size="large"
                      className="w-full text-xs sm:text-sm rounded-lg"
                      options={INDIAN_STATES.map((state) => ({
                        label: state,
                        value: state,
                      }))}
                    />
                  </Form.Item>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#62B239] hover:bg-[#529e2f] text-white font-bold py-2.5 px-4 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer border-none text-sm sm:text-base disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>

                  {/* Disclaimer Note */}
                  <div className="text-center pt-1.5">
                    <p className="text-[10.5px] text-gray-400 m-0">
                      By submitting, you agree to our{" "}
                      <button
                        type="button"
                        onClick={onOpenDisclaimer}
                        className="text-gray-500 underline hover:text-gray-700 cursor-pointer bg-transparent border-none p-0 inline"
                      >
                        Disclaimer
                      </button>
                    </p>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

