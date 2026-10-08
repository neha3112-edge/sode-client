import React from "react";
import { Form, Input, Select, Button, Checkbox } from "antd";
import IndiaFlag from "./IndiaFlag";

/**
 * Reusable Full Name Field
 */
export function FieldName({
  label,
  placeholder = "Enter Your Name",
  className = "mb-0",
  inputClassName = "h-[40px] text-[13px] rounded-[5px]",
}) {
  return (
    <Form.Item
      label={label}
      name="full_name"
      rules={[{ required: true, message: "Please enter your name" }]}
      className={className}
    >
      <Input placeholder={placeholder} className={inputClassName} />
    </Form.Item>
  );
}

/**
 * Reusable Email Field
 */
export function FieldEmail({
  label,
  placeholder = "Enter Your Email",
  className = "mb-0",
  inputClassName = "h-[40px] text-[13px] rounded-[5px]",
}) {
  return (
    <Form.Item
      label={label}
      name="email"
      rules={[{ required: true, type: "email", message: "Please enter your email" }]}
      className={className}
    >
      <Input placeholder={placeholder} className={inputClassName} />
    </Form.Item>
  );
}

/**
 * Reusable Mobile Number Field (with Indian flag prefix)
 */
export function FieldPhone({
  label,
  placeholder = "Enter 10-digit Mobile Number",
  className = "mb-0",
  inputClassName = "h-[40px] text-[13px] rounded-[5px]",
  hasDropdownArrow = false,
}) {
  return (
    <Form.Item
      label={label}
      name="phone"
      rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: "Enter 10-digit mobile" }]}
      className={className}
    >
      <Input
        prefix={
          <span className="flex items-center text-slate-700 text-xs font-semibold mr-1.5 select-none">
            <IndiaFlag />
            <span>{hasDropdownArrow ? "+91 ▾" : "+91"}</span>
          </span>
        }
        placeholder={placeholder}
        maxLength={10}
        className={inputClassName}
      />
    </Form.Item>
  );
}

/**
 * Reusable Course Select Field
 */
export function FieldCourse({
  label,
  courses = [],
  placeholder = "Select Your Course",
  className = "mb-0",
  selectClassName = "w-full h-[40px] text-[13px]",
}) {
  return (
    <Form.Item
      label={label}
      name="course"
      rules={[{ required: true, message: "Please select course" }]}
      className={className}
    >
      <Select
        placeholder={placeholder}
        options={courses}
        className={selectClassName}
      />
    </Form.Item>
  );
}

/**
 * Reusable State Select Field
 */
export function FieldState({
  label,
  stateOptions = [],
  placeholder = "Select Your State",
  className = "mb-0",
  selectClassName = "w-full h-[40px] text-[13px]",
}) {
  return (
    <Form.Item
      label={label}
      name="state"
      rules={[{ required: true, message: "Please select state" }]}
      className={className}
    >
      <Select
        placeholder={placeholder}
        options={stateOptions}
        showSearch
        className={selectClassName}
      />
    </Form.Item>
  );
}

/**
 * Reusable Consent Checkbox with Disclaimer Trigger
 */
export function FieldConsent({
  onOpenDisclaimer,
  className = "text-[11px] sm:text-[11.5px] [&_.ant-checkbox+span]:!text-white/90 leading-tight select-none",
  disclaimerBtnClassName = "font-bold underline cursor-pointer bg-transparent border-none p-0 inline text-white hover:text-amber-300",
  text = "I consent to receive university updates via email and mobile number.",
}) {
  return (
    <div className="pt-0.5 sm:pt-1">
      <Checkbox defaultChecked className={className}>
        <span>
          {text}{" "}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDisclaimer?.();
            }}
            className={disclaimerBtnClassName}
          >
            Disclaimer
          </button>
        </span>
      </Checkbox>
    </div>
  );
}

/**
 * Reusable Submit Button
 */
export function FieldSubmitButton({
  loading = false,
  text = "Submit",
  id,
  className = "font-bold text-[15px] border-none shadow-none w-full h-[40px] cursor-pointer rounded-[5px] hover:opacity-95",
  style = {},
  formItemClassName = "mb-0",
}) {
  return (
    <Form.Item className={formItemClassName}>
      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        id={id}
        className={className}
        style={style}
      >
        {text}
      </Button>
    </Form.Item>
  );
}
