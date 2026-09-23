"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, Form, Checkbox, message } from "antd";
import { STATE_OPTIONS } from "@/constants/stateOptions";

// ======================================================
// INDIA FLAG
// ======================================================

const IndiaFlag = () => (
  <svg
    className="w-[20px] h-[14px] rounded-[1px] shadow-xs shrink-0 select-none"
    viewBox="0 0 640 480"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#FF9933" d="M0 0h640v160H0z" />
    <path fill="#FFFFFF" d="M0 160h640v160H0z" />
    <path fill="#128807" d="M0 320h640v160H0z" />

    <g transform="matrix(3.2 0 0 3.2 320 240)">
      <circle r="20" fill="none" stroke="#000080" strokeWidth="2.5" />
      <circle r="4" fill="#000080" />

      <path
        fill="none"
        stroke="#000080"
        strokeWidth="1"
        d="M0-20V20M-20 0H20M-14.1-14.1l28.2 28.2M-14.1 14.1L14.1-14.1M-18.5-7.7l37 15.4M-18.5 7.7l37-15.4M-7.7-18.5l15.4 37M7.7-18.5l-15.4 37"
      />
    </g>
  </svg>
);

// ======================================================
// PHONE INPUT
// ======================================================

const PhoneInputField = ({
  value,
  onChange,
  placeholder = "Enter your Number",
  maxLength = 10,
}) => (
  <div className="flex items-center w-full h-[42px] bg-white rounded-[6px] overflow-hidden shadow-xs focus-within:ring-2 focus-within:ring-cyan-400">
    <div className="flex items-center gap-1.5 h-full px-2.5 bg-[#f0f2f5] border-r border-[#d1d5db] select-none shrink-0">
      <IndiaFlag />

      <span className="text-slate-900 font-bold text-[13px] tracking-tight">
        +91
      </span>

      <span className="text-slate-600 text-[9px] leading-none">
        ▾
      </span>
    </div>

    <input
      type="tel"
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full h-full px-3 bg-white text-slate-800 placeholder:text-[#555] border-none outline-none text-[13.5px]"
    />
  </div>
);

// ======================================================
// CUSTOM SELECT
// ======================================================

const CustomSelectField = ({
  value,
  onChange,
  placeholder,
  options,
}) => (
  <div className="relative w-full">
    <select
      value={value || ""}
      onChange={onChange}
      className={`w-full h-[42px] px-3.5 pr-8 bg-white rounded-[6px] border-none outline-none text-[13.5px] font-normal appearance-none cursor-pointer shadow-xs focus:ring-2 focus:ring-cyan-400 ${value ? "text-slate-800" : "text-[#555]"
        }`}
    >
      <option value="" disabled className="text-[#555]">
        {placeholder}
      </option>

      {options.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
          className="text-slate-900"
        >
          {opt.label}
        </option>
      ))}
    </select>

    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-800">
      <svg
        className="w-3.5 h-3.5 stroke-[2.5]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
);

// ======================================================
// DEFAULT COURSES
// ======================================================

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

// ======================================================
// SCHOLARSHIP MODAL
// ======================================================

export default function ScholarshipModal({
  isOpen,
  onClose,
  universityName = "Amity University Online",
  courses = [],
  brand,
  onOpenDisclaimer,
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ======================================================
  // COURSE OPTIONS
  // ======================================================

  const rawCourses =
    courses && courses.length > 0 ? courses : DEFAULT_COURSES;

  const courseOptions = rawCourses.map((course) =>
    typeof course === "string"
      ? {
        value: course,
        label: course,
      }
      : course
  );

  // ======================================================
  // STATE OPTIONS
  // ======================================================

  const stateOptions = STATE_OPTIONS.map((state) =>
    typeof state === "string"
      ? {
        value: state,
        label: state,
      }
      : state
  );

  // ======================================================
  // FORM SUBMIT
  // ======================================================

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

        phone: String(values.phone || "")
          .replace(/\D/g, "")
          .slice(-10),

        course: values.course,

        state: values.state,

        university: universityName,

        source: universityName,

        form_name: "Scholarship Coupon Modal",

        utm_source:
          searchParams.get("utm_source") ||
          `${universityName}_LP`,

        utm_medium:
          searchParams.get("utm_medium") || "Direct",

        utm_campaign:
          searchParams.get("utm_campaign") ||
          "Online_Admission_2026",

        page_url:
          typeof window !== "undefined"
            ? window.location.href
            : "",
      };

      await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadPayload),
      });

      message.success(
        "Thank you! Our expert counselor will contact you shortly."
      );

      form.resetFields();

      onClose?.();

      router.push("/thank-you");
    } catch {
      message.error(
        "Failed to submit enquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // MODAL
  // ======================================================

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        centered
        width={570}
        closeIcon={null}
        destroyOnHidden
        className="scholarship-coupon-modal"
        rootClassName="scholarship-coupon-root"
        styles={{
          root: {
            background: "transparent",
            backgroundColor: "transparent",
          },

          mask: {
            backgroundColor: "rgba(0, 0, 0, 0.55)",
          },

          container: {
            background: "transparent",
            backgroundColor: "transparent",
            boxShadow: "none",
            padding: 0,
          },

          content: {
            background: "transparent",
            backgroundColor: "transparent",
            boxShadow: "none",
            padding: 0,
            border: "none",
          },

          body: {
            background: "transparent",
            backgroundColor: "transparent",
            boxShadow: "none",
            padding: 0,
          },

          footer: {
            background: "transparent",
          },
        }}
        modalRender={(modal) => (
          <div className="scholarship-modal-transparent-wrapper">
            {modal}
          </div>
        )}
      >
        {/* ==================================================
            FORCE ANT DESIGN CONTAINERS TO TRANSPARENT
            ================================================== */}

        <style jsx global>{`
          /* Root */
          .scholarship-coupon-root {
            background: transparent !important;
          }

          /* Modal wrapper */
          .scholarship-coupon-root .ant-modal-wrap {
            background: transparent !important;
          }

          /* Modal itself */
          .scholarship-coupon-root .ant-modal {
            background: transparent !important;
            padding: 0 !important;
            margin: 0 auto !important;
          }

          /* IMPORTANT:
             This is the white box you were seeing */
          .scholarship-coupon-root .ant-modal-content,
          .scholarship-coupon-root .ant-modal-container,
          .scholarship-coupon-root .ant-modal-body {
            background: transparent !important;
            background-color: transparent !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
          }

          /* Modal custom wrapper */
          .scholarship-modal-transparent-wrapper {
            background: transparent !important;
            background-color: transparent !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          /* Prevent any pseudo element from creating background */
          .scholarship-coupon-root .ant-modal-content::before,
          .scholarship-coupon-root .ant-modal-content::after {
            display: none !important;
            background: transparent !important;
          }

          /* Desktop */
          @media (min-width: 576px) {
            .scholarship-coupon-root .ant-modal {
              max-width: 570px !important;
            }
          }

          /* Mobile */
          @media (max-width: 575px) {
            .scholarship-coupon-root .ant-modal {
              width: calc(100% - 24px) !important;
              max-width: none !important;
            }

            .scholarship-coupon-root .ant-modal-content {
              width: 100% !important;
            }
          }
        `}</style>

        {/* ==================================================
            BLUE SCHOLARSHIP CARD
            ================================================== */}

        <div
          className="relative w-full max-w-[550px] mx-auto rounded-[18px] p-6 sm:p-7 text-white select-none"
          style={{
            backgroundColor:
              brand?.hero?.formBackground ||
              brand?.primaryColor ||
              "#08417b",

            boxShadow:
              "0 0 35px rgba(0, 180, 216, 0.45), 0 25px 50px -12px rgba(0, 0, 0, 0.7)",

            border:
              "1px solid rgba(0, 180, 216, 0.25)",
          }}
        >
          {/* ==================================================
              CLOSE BUTTON
              ================================================== */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-50 text-[#00c988] hover:text-[#00e699] active:scale-90 bg-transparent border-none cursor-pointer p-1 transition-transform"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* ==================================================
              HEADER
              ================================================== */}

          <div className="text-center mb-4">
            <h2 className="m-0 text-[22px] sm:text-[24px] font-extrabold text-[#ffd200] tracking-tight leading-tight">
              Get Scholarship Coupon Code
            </h2>

            <p className="m-0 mt-1 text-[13px] text-white font-medium leading-normal">
              Academic Experts will assist you!
            </p>
          </div>

          {/* ==================================================
              FORM
              ================================================== */}

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              terms: false,
            }}
            className="space-y-2.5 [&_.ant-form-item]:!mb-2.5 [&_.ant-form-item-label]:hidden [&_.ant-form-item-explain-error]:!text-red-200 [&_.ant-form-item-explain-error]:!text-[11px] [&_.ant-form-item-explain-error]:!pt-1"
          >
            {/* ==================================================
                NAME
                ================================================== */}

            <Form.Item
              name="full_name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <input
                type="text"
                placeholder="Enter Your Name"
                className="w-full h-[42px] px-3.5 bg-white text-slate-800 placeholder:text-[#555] rounded-[6px] text-[13.5px] border-none outline-none shadow-xs focus:ring-2 focus:ring-cyan-400"
              />
            </Form.Item>

            {/* ==================================================
                EMAIL
                ================================================== */}

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                {
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full h-[42px] px-3.5 bg-white text-slate-800 placeholder:text-[#555] rounded-[6px] text-[13.5px] border-none outline-none shadow-xs focus:ring-2 focus:ring-cyan-400"
              />
            </Form.Item>

            {/* ==================================================
                PHONE
                ================================================== */}

            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please enter your mobile number",
                },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit number",
                },
              ]}
            >
              <PhoneInputField
                placeholder="Enter your Number"
              />
            </Form.Item>

            {/* ==================================================
                COURSE
                ================================================== */}

            <Form.Item
              name="course"
              rules={[
                {
                  required: true,
                  message: "Please select a course",
                },
              ]}
            >
              <CustomSelectField
                placeholder="Select Your Course"
                options={courseOptions}
              />
            </Form.Item>

            {/* ==================================================
                STATE
                ================================================== */}

            <Form.Item
              name="state"
              rules={[
                {
                  required: true,
                  message: "Please select your state",
                },
              ]}
            >
              <CustomSelectField
                placeholder="Select Your State"
                options={stateOptions}
              />
            </Form.Item>

            {/* ==================================================
                CONSENT
                ================================================== */}

            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                        new Error(
                          "Please agree to the terms"
                        )
                      ),
                },
              ]}
            >
              <Checkbox
                className="text-white text-[11px] leading-[1.3] [&_.ant-checkbox-inner]:!border-white [&_.ant-checkbox-checked_.ant-checkbox-inner]:!bg-[#22c55e] [&_.ant-checkbox-checked_.ant-checkbox-inner]:!border-[#22c55e]"
              >
                <span className="text-white select-none">
                  I consent to receive university updates via
                  email and mobile number.{" "}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDisclaimer?.();
                    }}
                    className="underline cursor-pointer font-medium hover:text-amber-300"
                  >
                    Disclaimer
                  </span>
                </span>
              </Checkbox>
            </Form.Item>

            {/* ==================================================
                SUBMIT
                ================================================== */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[44px] rounded-[8px] bg-[#22c55e] hover:bg-[#16a34a] active:scale-[0.98] text-white font-bold text-[15.5px] border-none shadow-md transition-all cursor-pointer flex items-center justify-center tracking-tight mt-1"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </Form>
        </div>
      </Modal>
    </>
  );
}