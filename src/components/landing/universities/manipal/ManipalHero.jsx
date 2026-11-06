"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Form, Input, Select, Checkbox, Button } from "antd";
import { PhoneOutlined, DownloadOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import {
  manipalImg,
  MANIPAL_COURSES,
  INDIAN_STATES,
} from "./constants";

export default function ManipalHero({ onOpenBrochure, onOpenDisclaimer }) {
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
        form_name: "Hero Enquire Form",
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
    <>
      {/* Infinite Phone Shine Keyframes */}
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
        className="relative w-full py-4 sm:py-5 lg:py-6 flex items-center overflow-hidden bg-[#0c2844]"
      >
        {/* Next.js Background Images */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {/* Desktop Background Image (>= 1024px) */}
          <Image
            src={manipalImg("banner-manipal-des-final.webp")}
            alt="Manipal University Online"
            fill
            priority
            sizes="(min-width: 1024px) 100vw, 1px"
            className="hidden lg:block object-cover object-top"
          />
          {/* Mobile & Tablet Background Image (< 1024px) */}
          <Image
            src={manipalImg("banner-muj-mobile1.webp")}
            alt="Manipal University Online Mobile"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 1px"
            className="block lg:hidden object-cover object-top"
          />
        </div>

        <Container className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8 w-full">
          {/* Left Column: Hero Content */}
          <div className="w-full lg:max-w-[430px] xl:max-w-[460px] shrink-0 text-left pt-1 sm:pt-2 lg:pt-0">
            {/* 1. Hashtag */}
            <p className="text-white font-medium text-[13px] sm:text-[14px] tracking-wide mb-1 select-none">
              #EmpowerToLeadTomorrow
            </p>

            {/* 2. Headline in bold condensed style */}
            <h1 className="text-white font-extrabold sm:font-bold text-[28px] xs:text-[32px] sm:text-[38px] lg:text-[42px] xl:text-[45px] leading-[1.05] tracking-tight whitespace-nowrap mb-1.5 sm:mb-2 select-none">
              Manipal University Online
            </h1>

            {/* 3. Tagline split into 2 lines */}
            <h2 className="text-white font-bold text-[18px] sm:text-[21px] lg:text-[23px] leading-[1.25] max-w-[440px] my-2 sm:my-3 select-none whitespace-pre-line">
              {"Education that empowers your\nambition"}
            </h2>

            {/* 4. Course Strip (Responsive wrapping matching mobile and desktop) */}
            <div className="my-2.5 sm:my-3.5 text-[15px] sm:text-[18px] lg:text-[20px] font-bold text-white tracking-wide leading-snug select-none">
              <p className="m-0 block sm:hidden">
                MBA | MCA | MCOM | MA-JMC | MA<br />
                | BBA | BCOM | BCA | MSC
              </p>
              <p className="m-0 hidden sm:block">
                MBA | MCA | MCOM | MA-JMC | MA |<br />
                BBA | BCOM | BCA | MSC
              </p>
            </div>

            {/* 5. Download Brochure CTA Button with gradient */}
            <div className="pt-1.5 sm:pt-2">
              <button
                type="button"
                onClick={onOpenBrochure}
                className="text-white font-semibold text-[14px] sm:text-[14.5px] px-5 sm:px-6 py-2.5 rounded-[5px] shadow-[0_4px_14px_rgba(238,48,36,0.35)] transition-all flex items-center gap-2 cursor-pointer border-none select-none hover:brightness-105 active:scale-95"
                style={{
                  background:
                    "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)",
                }}
              >
                <span>Download Brochure</span>
                <DownloadOutlined className="text-[14px]" />
              </button>
            </div>

            {/* 6. Mobile University Campus Image Card (Shown only on mobile & tablet < lg) */}
            <div className="w-full mt-4 mb-1 rounded-[14px] overflow-hidden lg:hidden shadow-[0_8px_30px_rgba(0,0,0,0.18)] border border-white/20">
              <Image
                src={manipalImg("university.webp")}
                alt="Manipal University Jaipur Campus"
                width={926}
                height={433}
                priority
                sizes="(max-width: 1023px) 100vw, 500px"
                style={{ width: "100%", height: "auto" }}
                className="w-full h-auto object-cover rounded-[14px] block"
              />
            </div>
          </div>

          {/* Right Column: Enquire Now Card Form */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-end mt-2 lg:mt-0">
            <div className="bg-white rounded-[14px] p-4 sm:p-5 lg:p-5.5 shadow-[0_12px_40px_rgba(0,0,0,0.22)] max-w-[365px] w-full text-center">
              <h3 className="text-[#ee3024] font-bold text-[23px] sm:text-[25px] leading-tight m-0">
                Enquire Now
              </h3>
              <p className="text-[#555555] text-[12px] sm:text-[12.5px] leading-tight mt-1 mb-2.5">
                Take a step towards your success today
              </p>

              {/* Phone Clickable Pill with gradient & infinite shine */}
              <div className="mb-3">
                <a
                  href="tel:07065777755"
                  className="hero-phone-shine inline-flex items-center gap-1.5 text-white text-[12.5px] font-bold py-1.5 px-4 rounded-full shadow-sm transition-all cursor-pointer select-none no-underline hover:brightness-105"
                  style={{
                    background:
                      "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)",
                  }}
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
                      className="w-full h-[38px] rounded-[6px] text-[13px] border border-gray-300 placeholder:text-gray-400 focus:border-[#ee3024]"
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
                      className="w-full h-[38px] rounded-[6px] text-[13px] border border-gray-300 placeholder:text-gray-400 focus:border-[#ee3024]"
                    />
                  </Form.Item>

                  {/* Mobile Phone */}
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
                      placeholder="Enter Mobile Number"
                      prefix={
                        <span className="flex items-center gap-1 text-gray-700 text-[12.5px] font-medium pr-2 mr-1 border-r border-gray-200 select-none">
                          <span className="text-[13px]">🇮🇳</span>
                          <span>+91</span>
                          <span className="text-[9px] text-gray-400">▾</span>
                        </span>
                      }
                      className="w-full h-[38px] rounded-[6px] text-[13px] border border-gray-300 placeholder:text-gray-400 focus:border-[#ee3024]"
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
                      options={MANIPAL_COURSES}
                      className="w-full h-[38px] text-[13px] [&_.ant-select-selector]:h-[38px] [&_.ant-select-selector]:rounded-[6px] [&_.ant-select-selection-item]:leading-[36px] [&_.ant-select-selection-placeholder]:leading-[36px] [&_.ant-select-selector]:border-gray-300"
                      getPopupContainer={(trigger) => trigger.parentElement || document.body}
                    />
                  </Form.Item>

                  {/* State Select */}
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

                  {/* Consent Checkbox */}
                  <div className="mb-2.5">
                    <Form.Item
                      name="consent"
                      valuePropName="checked"
                      className="mb-0"
                    >
                      <Checkbox className="text-[11px] text-gray-600 leading-tight [&_.ant-checkbox-checked_.ant-checkbox-inner]:bg-[#22c55e] [&_.ant-checkbox-checked_.ant-checkbox-inner]:border-[#22c55e] select-none">
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

                  {/* Submit Button */}
                  <Form.Item className="mb-0">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      className="w-full h-[38px] bg-[#22c55e] hover:bg-[#16a34a] border-none text-white font-bold text-[14px] rounded-[6px] transition-colors shadow-none cursor-pointer flex items-center justify-center select-none"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

