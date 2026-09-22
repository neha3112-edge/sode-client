"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Button, Checkbox, message } from "antd";
import { STATE_OPTIONS } from "@/constants/stateOptions";

export default function LandingFooterForm({ brand = {}, courses = [], onOpenDisclaimer }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const universityName = brand.name || "University Online";
  const stateOptions = STATE_OPTIONS.map((st) =>
    typeof st === "string" ? { value: st, label: st } : st
  );

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const leadPayload = {
        name: values.full_name,
        email: values.email,
        phone: values.phone.replace(/\D/g, "").slice(-10),
        course: values.course,
        state: values.state,
        university: universityName,
        source: universityName,
        form_name: "Footer Horizontal Guidance Form",
        utm_source: searchParams.get("utm_source") || `${universityName}_LP`,
        utm_medium: searchParams.get("utm_medium") || "Direct",
        utm_campaign: searchParams.get("utm_campaign") || "Online_Admission_2026",
        page_url: window.location.href,
      };

      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      message.success("Thank you! Our expert counselor will contact you shortly.");
      form.resetFields();
      router.push("/thank-you");
    } catch {
      message.error("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="ftr-frm"
      className="mt-10 sm:mt-12 py-10 sm:py-12 text-white transition-colors"
      style={{ backgroundColor: brand.primaryColor || "#08417b" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching live site */}
        <div className="mb-6 text-center sm:text-left">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#fbcb12] m-0">
            Have Questions?
          </h3>
          <p className="text-sm sm:text-base text-white/95 mt-1 m-0">
            Don&apos;t hesitate to contact us. Our academic experts are here to assist you!
          </p>
        </div>

        {/* 2-Row Form matching live site */}
        <div id="form-ftr">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ terms: true }}
            requiredMark={false}
            className="space-y-3"
          >
            {/* Row 1: Name, Email, Phone */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Form.Item
                name="full_name"
                rules={[{ required: true, message: "Please enter your name" }]}
                className="!mb-0"
              >
                <Input
                  placeholder="Enter Your Name"
                  size="middle"
                  className="!rounded-[5px] !border-none !h-[38px] !text-[13px] !bg-white !text-slate-800"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[{ required: true, type: "email", message: "Please enter your email" }]}
                className="!mb-0"
              >
                <Input
                  placeholder="Enter Your Email"
                  size="middle"
                  className="!rounded-[5px] !border-none !h-[38px] !text-[13px] !bg-white !text-slate-800"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: "Enter 10-digit mobile" }]}
                className="!mb-0"
              >
                <Input
                  placeholder="Enter 10-digit Mobile Number"
                  maxLength={10}
                  size="middle"
                  className="!rounded-[5px] !border-none !h-[38px] !text-[13px] !bg-white !text-slate-800"
                />
              </Form.Item>
            </div>

            {/* Row 2: Course, State, Submit */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Form.Item
                name="course"
                rules={[{ required: true, message: "Please select course" }]}
                className="!mb-0"
              >
                <Select
                  placeholder="Select Your Course"
                  options={courses}
                  size="middle"
                  className="w-full !rounded-[5px] [&_.ant-select-selector]:!rounded-[5px] [&_.ant-select-selector]:!border-none [&_.ant-select-selector]:!h-[38px] [&_.ant-select-selection-item]:!leading-[38px] [&_.ant-select-selection-placeholder]:!leading-[38px]"
                />
              </Form.Item>

              <Form.Item
                name="state"
                rules={[{ required: true, message: "Please select state" }]}
                className="!mb-0"
              >
                <Select
                  placeholder="Select Your State"
                  options={stateOptions}
                  showSearch
                  size="middle"
                  className="w-full !rounded-[5px] [&_.ant-select-selector]:!rounded-[5px] [&_.ant-select-selector]:!border-none [&_.ant-select-selector]:!h-[38px] [&_.ant-select-selection-item]:!leading-[38px] [&_.ant-select-selection-placeholder]:!leading-[38px]"
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                id="frm-submit"
                className="!bg-[#ffd508] hover:!bg-[#e6c007] !text-[#08417b] !font-bold !h-[38px] !rounded-[5px] !border-none !text-[14px] !shadow-none w-full"
                style={{ color: brand.primaryColor || "#08417b" }}
              >
                Submit
              </Button>
            </div>

            {/* Row 3: Checkbox Disclaimer */}
            <div className="pt-1">
              <Form.Item name="terms" valuePropName="checked" className="!mb-0">
                <Checkbox className="text-[11px] sm:text-[12px] text-white leading-normal [&_.ant-checkbox-inner]:!rounded-[3px]">
                  I consent to receive university updates via email and mobile number.{" "}
                  <button
                    type="button"
                    onClick={() => onOpenDisclaimer?.()}
                    className="underline text-white font-medium hover:text-[#fbcb12] cursor-pointer ml-1"
                  >
                    Disclaimer
                  </button>
                </Checkbox>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
}
