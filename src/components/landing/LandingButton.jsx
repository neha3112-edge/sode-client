"use client";

import React from "react";

/**
 * Reusable Landing Page Button
 * Used across LandingHero, LandingLeadForm, and other landing components.
 */
export default function LandingButton({
  children,
  type = "button",
  variant = "primary", // "primary" | "brochure" | "submit" | "phone" | "outline"
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
  const isLink = Boolean(href);

  // Variant-specific styles
  let variantClasses = "";
  let defaultStyle = {};

  switch (variant) {
    case "brochure":
    case "primary":
      variantClasses =
        "text-white font-bold shadow-md hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer border-none rounded-[6px]";
      defaultStyle = {
        background: "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)",
      };
      break;

    case "submit":
      variantClasses =
        "text-white font-bold shadow-sm hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer border-none rounded-[5px]";
      defaultStyle = {
        background: "#28a745",
      };
      break;

    case "phone":
      variantClasses =
        "rounded-full font-bold shadow-xs hover:opacity-95 active:scale-[0.97] transition-all cursor-pointer border-none select-none no-underline text-white";
      defaultStyle = {
        backgroundColor: "#ff5500",
      };
      break;

    case "outline":
      variantClasses =
        "border-2 border-white text-white font-bold hover:bg-white hover:text-slate-900 transition-all rounded-[6px] cursor-pointer";
      break;

    default:
      variantClasses = "font-bold rounded-[6px] cursor-pointer transition-all";
      break;
  }

  const combinedClasses = `inline-flex items-center justify-center gap-1.5 select-none ${
    skewEffect ? "relative overflow-hidden" : ""
  } ${variantClasses} ${
    disabled || loading ? "opacity-60 cursor-not-allowed pointer-events-none" : ""
  } ${className}`;

  const mergedStyle = { ...defaultStyle, ...style };

  const content = (
    <>
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {skewEffect && <span className="moving-light-green-box" />}
          {icon && iconPosition === "left" && <span className="relative z-10 shrink-0">{icon}</span>}
          <span className="relative z-10">{children}</span>
          {icon && iconPosition === "right" && <span className="relative z-10 shrink-0">{icon}</span>}
        </>
      )}
    </>
  );

  if (isLink) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={combinedClasses}
        style={mergedStyle}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={combinedClasses}
      style={mergedStyle}
      {...props}
    >
      {content}
    </button>
  );
}
