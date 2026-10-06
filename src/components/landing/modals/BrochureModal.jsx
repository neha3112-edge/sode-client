"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal, Form, Input, Select, Button, message } from "antd";
import { STATE_OPTIONS } from "@/constants/stateOptions";
import { triggerFormConfetti } from "@/lib/confetti";

const DEFAULT_COURSES = [
  { value: "MBA", label: "MBA" },
  { value: "MCA", label: "MCA" },
  { value: "MCOM", label: "MCOM" },
  { value: "MA", label: "MA" },
  { value: "MSC", label: "MSC" },
  { value: "BBA", label: "BBA" },
  { value: "BCA", label: "BCA" },
  { value: "BCOM", label: "BCOM" },
  { value: "BA", label: "BA" },
];

const COUNTRY_CODES = [
  { value: "+91", label: "IN +91" },
  { value: "+1", label: "US +1" },
  { value: "+44", label: "UK +44" },
  { value: "+971", label: "AE +971" },
  { value: "+65", label: "SG +65" },
  { value: "+61", label: "AU +61" },
  { value: "+966", label: "SA +966" },
  { value: "+974", label: "QA +974" },
  { value: "+968", label: "OM +968" },
  { value: "+965", label: "KW +965" },
];

/**
 * Global AntDesign Brochure Download Modal
 * Used across all landing pages on clicking Brochure / Get Brochure buttons.
 */
export default function BrochureModal({
  isOpen,
  onClose,
  universityName = "University Online",
  courses = [],
  selectedCourse = "MBA",
  brand = {},
  onOpenDisclaimer,
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  useEffect(() => {
    if (isOpen) {
      triggerFormConfetti();
      form.setFieldsValue({
        course: selectedCourse || undefined,
      });
    }
  }, [isOpen, selectedCourse, form]);

  const activeUniversity = universityName || brand?.name || "University Online";
  const rawCourses = courses && courses.length > 0 ? courses : DEFAULT_COURSES;
  const courseOptions = rawCourses.map((c) =>
    typeof c === "string" ? { value: c, label: c } : { value: c.value, label: c.label || c.value }
  );

  const stateOptions = STATE_OPTIONS.map((st) =>
    typeof st === "string" ? { value: st, label: st } : st
  );

  const titleColor = brand.hero?.enquireColor || brand.primaryColor || "#003399";
  const submitBtnBg =
    brand.hero?.submitButtonBackground ||
    brand.hero?.submitBtnBg ||
    brand.submitBtnBg ||
    "#62B239";

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const searchParams =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();

      const leadPayload = {
        name: values.full_name,
        email: values.email,
        phone: `${countryCode}${String(values.phone || "").replace(/\D/g, "").slice(-10)}`,
        course: values.course,
        state: values.state,
        university: activeUniversity,
        source: activeUniversity,
        form_name: "Brochure Download Modal",
        utm_source: searchParams.get("utm_source") || `${activeUniversity}_LP`,
        utm_medium: searchParams.get("utm_medium") || "Direct",
        utm_campaign: searchParams.get("utm_campaign") || "Brochure_Download_2026",
        page_url: typeof window !== "undefined" ? window.location.href : "",
      };

      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      message.success("Thank you! Brochure has been sent to your email & WhatsApp.");
      form.resetFields();
      onClose?.();
      router.push("/thank-you");
    } catch {
      message.error("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
      destroyOnHidden
      className="p-0 overflow-hidden max-w-[calc(100vw-24px)] mx-auto rounded-[14px]"
      styles={{
        content: {
          padding: "24px 22px 20px",
          borderRadius: "14px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.22)",
        },
      }}
    >
      <div className="select-none">
        {/* Header */}
        <div className="text-center mb-3">
          <h2
            className="text-[22px] sm:text-[25px] font-bold tracking-tight leading-tight m-0"
            style={{ color: titleColor }}
          >
            Download Brochure
          </h2>
          <p
            className="text-[13.5px] sm:text-[14.5px] font-medium m-0 mt-1"
            style={{ color: titleColor }}
          >
            Academic Experts will assist you!
          </p>
          <div className="w-full border-t border-slate-200 mt-3.5 mb-4" />
        </div>

        {/* Ant Design Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ course: selectedCourse || undefined }}
          className="space-y-3 [&_.ant-form-item]:!mb-3 [&_.ant-form-item-explain-error]:!text-red-500 [&_.ant-form-item-explain-error]:!text-[11px] [&_.ant-form-item-explain-error]:!pt-0.5"
        >
          {/* Full Name */}
          <Form.Item
            name="full_name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              placeholder="Enter Your Name"
              className="h-[40px] sm:h-[42px] rounded-[6px] text-[13px] sm:text-[13.5px] border-slate-300 hover:border-[#003399] focus:border-[#003399]"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              placeholder="Enter Your Email"
              className="h-[40px] sm:h-[42px] rounded-[6px] text-[13px] sm:text-[13.5px] border-slate-300 hover:border-[#003399] focus:border-[#003399]"
            />
          </Form.Item>

          {/* Phone Number with Country Code */}
          <div className="flex gap-2 items-start w-full">
            <div className="w-[105px] shrink-0">
              <Select
                value={countryCode}
                onChange={setCountryCode}
                options={COUNTRY_CODES}
                className="w-full h-[40px] sm:h-[42px] [&_.ant-select-selector]:!h-[40px] sm:[&_.ant-select-selector]:!h-[42px] [&_.ant-select-selector]:!rounded-[6px] [&_.ant-select-selection-item]:!leading-[38px] sm:[&_.ant-select-selection-item]:!leading-[40px] [&_.ant-select-selection-item]:!text-[12.5px] sm:[&_.ant-select-selection-item]:!text-[13px] [&_.ant-select-selection-item]:!font-medium"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: "Please enter your number" },
                  { pattern: /^[6-9]\d{9}$/, message: "Enter valid 10-digit number" },
                ]}
                className="!mb-0"
              >
                <Input
                  placeholder="Enter Your Number"
                  maxLength={10}
                  className="h-[40px] sm:h-[42px] rounded-[6px] text-[13px] sm:text-[13.5px] border-slate-300 hover:border-[#003399] focus:border-[#003399]"
                />
              </Form.Item>
            </div>
          </div>

          {/* Course Select */}
          <Form.Item
            name="course"
            rules={[{ required: true, message: "Please select your course" }]}
          >
            <Select
              placeholder="Select Your Course"
              options={courseOptions}
              className="w-full h-[40px] sm:h-[42px] [&_.ant-select-selector]:!h-[40px] sm:[&_.ant-select-selector]:!h-[42px] [&_.ant-select-selector]:!rounded-[6px] [&_.ant-select-selection-item]:!leading-[38px] sm:[&_.ant-select-selection-item]:!leading-[40px] [&_.ant-select-selection-placeholder]:!leading-[38px] sm:[&_.ant-select-selection-placeholder]:!leading-[40px] [&_.ant-select-selection-item]:!text-[13px] [&_.ant-select-selection-placeholder]:!text-[13px]"
            />
          </Form.Item>

          {/* State Select */}
          <Form.Item
            name="state"
            rules={[{ required: true, message: "Please select your state" }]}
          >
            <Select
              placeholder="Select Your State"
              showSearch
              optionFilterProp="label"
              options={stateOptions}
              className="w-full h-[40px] sm:h-[42px] [&_.ant-select-selector]:!h-[40px] sm:[&_.ant-select-selector]:!h-[42px] [&_.ant-select-selector]:!rounded-[6px] [&_.ant-select-selection-item]:!leading-[38px] sm:[&_.ant-select-selection-item]:!leading-[40px] [&_.ant-select-selection-placeholder]:!leading-[38px] sm:[&_.ant-select-selection-placeholder]:!leading-[40px] [&_.ant-select-selection-item]:!text-[13px] [&_.ant-select-selection-placeholder]:!text-[13px]"
            />
          </Form.Item>

          {/* Submit Button */}
          <div className="pt-1">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-[42px] sm:h-[44px] text-white font-bold text-[15px] sm:text-[16px] rounded-[6px] border-none shadow-md cursor-pointer transition-all active:scale-[0.98] flex items-center justify-center"
              style={{
                backgroundColor: submitBtnBg,
              }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
