"use client";

import React from "react";
import { Button } from "antd";

/**
 * Solid download icon exactly matching Image 1
 * (FontAwesome solid download tray icon with tray dots)
 */
const DefaultBrochureIcon = () => (
  <svg
    viewBox="0 0 512 512"
    className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0 inline-block align-middle"
    aria-hidden="true"
  >
    <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
  </svg>
);

/**
 * Reusable Ant Design Landing Button
 *
 * Used for ALL buttons across Landing Pages (Hero brochure button, form submit, action buttons, pills, etc.).
 * Base Ant Design button layout, structure, size, padding, and hover/active animations are standardized here.
 * Only the text (children/label/text) and color (background, textColor, border) come dynamically from the Landing Page JSON data.
 */
export default function LandingButton({
  children,
  text,
  label,
  type = "button",
  htmlType,
  variant = "primary", // "brochure" | "primary" | "submit" | "pill" | "phone" | "outline"
  bg,
  bgColor,
  background,
  color,
  textColor,
  border,
  borderColor,
  icon,
  iconPosition = "right", // "left" | "right"
  loading = false,
  disabled = false,
  skewEffect = false,
  onClick,
  href,
  className = "",
  style = {},
  ...props
}) {
  // Base classes and default styles per variant
  let variantClasses = "";
  let defaultStyle = {};

  switch (variant) {
    case "brochure":
      variantClasses =
        "!font-semibold shadow-md hover:!opacity-95 active:scale-[0.98] transition-all cursor-pointer !rounded-[5px] py-2 sm:py-2.5 px-5 sm:px-6 text-[16px] sm:text-[17px] !h-auto";
      defaultStyle = {
        background: "#ffffff",
        backgroundColor: "#ffffff",
        color: "#004172",
        border: "1.8px solid #004172",
      };
      break;

    case "primary":
      variantClasses =
        "!font-bold shadow-md hover:!opacity-95 active:scale-[0.98] transition-all cursor-pointer !rounded-[6px] py-2 sm:py-2.5 px-6 sm:px-7 text-[14px] sm:text-[15px] !h-auto";
      defaultStyle = {
        background: "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)",
        color: "#ffffff",
        border: "none",
      };
      break;

    case "submit":
      variantClasses =
        "!font-bold shadow-sm hover:!opacity-95 active:scale-[0.98] transition-all cursor-pointer rounded-[6px] text-[14px] sm:text-[15px] h-[38px] sm:h-[40px]";
      defaultStyle = {
        background: "#28a745",
        color: "#ffffff",
        border: "none",
      };
      break;

    case "pill":
      variantClasses =
        "!font-bold text-xs sm:text-[13px] px-3.5 sm:px-4 py-1.5 !h-auto rounded-[6px] transition-colors cursor-pointer !border-none shadow-2xs";
      defaultStyle = {
        background: "#dff3fd",
        backgroundColor: "#dff3fd",
        color: "#006da8",
      };
      break;

    case "phone":
      variantClasses =
        "rounded-full !font-bold shadow-xs hover:!opacity-95 active:scale-[0.97] transition-all cursor-pointer !border-none select-none !no-underline";
      defaultStyle = {
        backgroundColor: "#ff5500",
        color: "#ffffff",
      };
      break;

    case "outline":
      variantClasses =
        "!border-2 !font-bold hover:!opacity-90 active:scale-[0.98] transition-all rounded-[6px] cursor-pointer py-2 px-5 text-[14px]";
      defaultStyle = {
        background: "transparent",
        color: "#ffffff",
        border: "2px solid #ffffff",
      };
      break;

    default:
      variantClasses =
        "!font-bold rounded-[6px] cursor-pointer transition-all";
      break;
  }

  // Resolved colors & radius: LP JSON data props override default styles
  const resolvedBg =
    background ||
    bgColor ||
    bg ||
    style.background ||
    style.backgroundColor ||
    defaultStyle.background ||
    defaultStyle.backgroundColor;

  const resolvedColor =
    textColor ||
    color ||
    style.color ||
    defaultStyle.color;

  const resolvedBorder =
    border ||
    (borderColor ? `2px solid ${borderColor}` : undefined) ||
    style.border ||
    defaultStyle.border;

  const resolvedRadius =
    props.radius ||
    props.borderRadius ||
    style.borderRadius ||
    style.radius;

  const mergedStyle = {
    ...defaultStyle,
    ...style,
    ...(resolvedBg ? { background: resolvedBg, backgroundColor: resolvedBg } : {}),
    ...(resolvedColor ? { color: resolvedColor } : {}),
    ...(resolvedBorder !== undefined ? { border: resolvedBorder } : {}),
    ...(resolvedRadius !== undefined ? { borderRadius: resolvedRadius } : {}),
  };

  const combinedClasses = [
    "inline-flex items-center justify-center gap-2 select-none",
    skewEffect ? "relative overflow-hidden" : "",
    variantClasses,
    disabled || loading
      ? "opacity-60 cursor-not-allowed pointer-events-none"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedHtmlType =
    htmlType ||
    (type === "submit"
      ? "submit"
      : type === "reset"
        ? "reset"
        : "button");

  const buttonContent = children ?? label ?? text;

  // Automatically supply the brochure icon if not explicitly passed
  const resolvedIcon =
    icon !== undefined
      ? icon
      : variant === "brochure"
        ? <DefaultBrochureIcon />
        : null;

  return (
    <Button
      href={href}
      htmlType={resolvedHtmlType}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
      style={mergedStyle}
      {...props}
    >
      {skewEffect && (
        <span
          key="btn-skew"
          className="moving-light-green-box"
          aria-hidden="true"
        />
      )}

      {resolvedIcon && iconPosition === "left" && (
        <span
          key="btn-icon-left"
          className="relative z-10 shrink-0 inline-flex items-center"
        >
          {resolvedIcon}
        </span>
      )}

      <span key="btn-content" className="relative z-10">
        {buttonContent}
      </span>

      {resolvedIcon && iconPosition === "right" && (
        <span
          key="btn-icon-right"
          className="relative z-10 shrink-0 inline-flex items-center"
        >
          {resolvedIcon}
        </span>
      )}
    </Button>
  );
}
