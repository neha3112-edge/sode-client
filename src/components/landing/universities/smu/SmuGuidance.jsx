"use client";

import React, { useState } from "react";
import { Form, Input, Select, Checkbox, Button } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { SMU_COURSES, INDIAN_STATES } from "./constants";

export default function SmuGuidance({ onOpenDisclaimer }) {
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
        source: "smu_guidance_form",
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

  return (
    <section className="w-full relative py-4 sm:py-5 lg:py-6 bg-[linear-gradient(to_bottom,#ffffff_0%,#ffffff_6%,#074a76_6%,#074a76_82%,#ffffff_82%,#ffffff_100%)] lg:bg-[linear-gradient(to_bottom,#ffffff_0%,#ffffff_30%,#074a76_30%,#074a76_70%,#ffffff_70%,#ffffff_100%)] select-none">
      <style jsx>{`
        @keyframes guidancePhoneShine {
          0% {
            left: -75%;
          }
          100% {
            left: 135%;
          }
        }
        .guidance-phone-shine {
          position: relative;
          overflow: hidden;
        }
        .guidance-phone-shine::before {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          animation: guidancePhoneShine 2.5s infinite;
          pointer-events: none;
        }
      `}</style>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Text Content - Vertically centered inside the compact blue strip */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-2.5 pt-6 lg:pt-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight m-0">
              Get Expert Guidance
            </h2>
            <p className="text-gray-100 text-sm sm:text-base leading-relaxed m-0 font-normal">
              Confused about courses or universities?<br className="hidden sm:inline" />
              {" "}Share your details, and our education experts will guide you with the right information.
            </p>
          </div>

          {/* Right Form Card - Overhangs above and below the blue band */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-end">
            <div className="bg-[#faf9f5] rounded-xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.14)] max-w-[370px] w-full text-center border border-gray-200">
              <h3 className="text-[#074a76] font-bold text-xl sm:text-2xl leading-tight m-0">
                Get 100% Free Counselling
              </h3>
              <p className="text-[#666666] text-xs sm:text-[13px] leading-tight mt-1 mb-3">
                Academic Experts will assist you!
              </p>

              {/* Phone Pill with Infinite Shine */}
              <div className="mb-3.5">
                <a
                  href="tel:07065777755"
                  className="guidance-phone-shine inline-flex items-center gap-1.5 text-white text-xs sm:text-[13px] font-bold py-1.5 px-4 rounded-full shadow-xs transition-all cursor-pointer no-underline bg-[#f58220] hover:brightness-105"
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
                      className="w-full h-9 rounded-md text-xs sm:text-sm border border-gray-300 placeholder:text-gray-400 focus:border-[#074a76]"
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
                      className="w-full h-9 rounded-md text-xs sm:text-sm border border-gray-300 placeholder:text-gray-400 focus:border-[#074a76]"
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
                        <span className="flex items-center gap-1.5 text-gray-700 text-xs sm:text-sm font-medium pr-2 mr-1 border-r border-gray-200 select-none">
                          <span className="text-sm">🇮🇳</span>
                          <span>+91</span>
                        </span>
                      }
                      className="w-full h-9 text-xs sm:text-sm border border-gray-300 placeholder:text-gray-400 focus:border-[#074a76]"
                    />
                  </Form.Item>

                  {/* Course Dropdown */}
                  <Form.Item
                    name="course"
                    rules={[{ required: true, message: "Please select your course" }]}
                    className="mb-2"
                  >
                    <Select
                      placeholder="Select Your Course"
                      className="w-full h-9 text-xs sm:text-sm custom-landing-select"
                      options={SMU_COURSES}
                    />
                  </Form.Item>

                  {/* State Dropdown */}
                  <Form.Item
                    name="state"
                    rules={[{ required: true, message: "Please select your state" }]}
                    className="mb-2"
                  >
                    <Select
                      placeholder="Select Your State"
                      className="w-full h-9 text-xs sm:text-sm custom-landing-select"
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
                    <Checkbox className="text-[11px] leading-tight text-gray-600 custom-checkbox-item">
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
                    className="w-full h-10 rounded-lg text-sm sm:text-base font-bold bg-[#28a745] hover:bg-[#218838] border-none text-white shadow-md active:scale-98 transition-all cursor-pointer"
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
