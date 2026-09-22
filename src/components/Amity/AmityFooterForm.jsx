"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Button, Checkbox, message } from "antd";
import { AMITY_COURSE_OPTIONS, AMITY_STATE_OPTIONS } from "./AmityLeadForm";

export default function AmityFooterForm({ onOpenDisclaimer }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const payload = {
        name: values.full_name,
        email: values.email,
        phone: values.phone.replace(/\D/g, "").slice(-10),
        course: values.course,
        state: values.state,
        university: "Amity University Online",
        source: "Amity",
        form_name: "Footer Have Questions Form",
        utm_source: searchParams.get("utm_source") || "Amity_Landing_Page",
        utm_medium: searchParams.get("utm_medium") || "Direct",
        utm_campaign: searchParams.get("utm_campaign") || "Amity_Online_2026",
        page_url: window.location.href,
      };

      try {
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn("API lead submission error:", err);
      }

      message.success("Thank you! Academic experts will connect with you soon.");
      router.push("/thank-you");
    } catch (err) {
      console.error(err);
      message.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="footer-form" className="py-10 sm:py-14 bg-[#08417b] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Titles */}
        <div className="mb-5 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[#ffd200] tracking-tight leading-tight">
            Have Questions?
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-white/95 font-normal">
            Don't hesitate to contact us. Our academic experts are here to assist you!
          </p>
        </div>

        {/* Form Container */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ disclaimer: true }}
          requiredMark={false}
          className="amity-footer-form-grid"
        >
          {/* Row 1: Name, Email, Phone (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-3.5">
            <Form.Item
              name="full_name"
              rules={[{ required: true, message: "Please enter your name" }]}
              className="!mb-0"
            >
              <Input
                placeholder="Enter Your Name"
                className="!h-[38px] sm:!h-[42px] !rounded-md !bg-white !text-slate-900 !text-xs sm:!text-[13px] !font-normal placeholder:!text-slate-500 !border-0"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter valid email" },
              ]}
              className="!mb-0"
            >
              <Input
                placeholder="Enter Your Email"
                className="!h-[38px] sm:!h-[42px] !rounded-md !bg-white !text-slate-900 !text-xs sm:!text-[13px] !font-normal placeholder:!text-slate-500 !border-0"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Please enter 10-digit mobile" },
                { pattern: /^[0-9]{10}$/, message: "Must be 10 digits" },
              ]}
              className="!mb-0"
            >
              <Input
                prefix={
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-700 flex items-center gap-1 pr-1 border-r border-slate-300 mr-1 select-none">
                    <span>🇮🇳</span>
                    <span>+91 ▾</span>
                  </span>
                }
                placeholder="Enter 10-digit Mobile Number"
                maxLength={10}
                className="!h-[38px] sm:!h-[42px] !rounded-md !bg-white !text-slate-900 !text-xs sm:!text-[13px] !font-normal placeholder:!text-slate-500 !border-0"
              />
            </Form.Item>
          </div>

          {/* Row 2: Course, State, Submit Button (3 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-3">
            <Form.Item
              name="course"
              rules={[{ required: true, message: "Please select course" }]}
              className="!mb-0"
            >
              <Select
                placeholder="Select Your Course"
                options={AMITY_COURSE_OPTIONS}
                className="w-full !h-[38px] sm:!h-[42px] [&_.ant-select-selector]:!h-[38px] sm:[&_.ant-select-selector]:!h-[42px] [&_.ant-select-selector]:!flex [&_.ant-select-selector]:!items-center [&_.ant-select-selector]:!rounded-md [&_.ant-select-selector]:!bg-white [&_.ant-select-selector]:!border-0 !text-xs sm:!text-[13px]"
              />
            </Form.Item>

            <Form.Item
              name="state"
              rules={[{ required: true, message: "Please select state" }]}
              className="!mb-0"
            >
              <Select
                placeholder="Select Your State"
                options={AMITY_STATE_OPTIONS}
                className="w-full !h-[38px] sm:!h-[42px] [&_.ant-select-selector]:!h-[38px] sm:[&_.ant-select-selector]:!h-[42px] [&_.ant-select-selector]:!flex [&_.ant-select-selector]:!items-center [&_.ant-select-selector]:!rounded-md [&_.ant-select-selector]:!bg-white [&_.ant-select-selector]:!border-0 !text-xs sm:!text-[13px]"
              />
            </Form.Item>

            <div className="flex items-center">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full !h-[38px] sm:!h-[42px] !rounded-md !bg-[#28a745] hover:!bg-[#218838] !text-white !font-bold !text-sm !shadow-md !border-0 cursor-pointer transition-colors"
              >
                Submit
              </Button>
            </div>
          </div>

          {/* Row 3: Disclaimer Checkbox */}
          <div className="pt-1">
            <Form.Item
              name="disclaimer"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error("Please agree")),
                },
              ]}
              className="!mb-0"
            >
              <Checkbox className="!text-[11px] sm:!text-xs !text-white [&_.ant-checkbox-inner]:!rounded-xs">
                <span>I consent to receive university updates via email and mobile number. </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDisclaimer?.();
                  }}
                  className="underline cursor-pointer hover:text-amber-200 font-semibold text-white"
                >
                  Disclaimer
                </span>
              </Checkbox>
            </Form.Item>
          </div>
        </Form>
      </div>
    </section>
  );
}
