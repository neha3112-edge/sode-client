"use client";

import React from "react";

const VARIANTS = {
  primary: {
    classes: "font-bold shadow-xs hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer rounded-[6px]",
    style: { background: "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)", color: "#ffffff", border: "none" },
  },
  submit: {
    classes: "text-white font-bold shadow-sm hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer border-none rounded-[5px]",
    style: { background: "#28a745" },
  },
  phone: {
    classes: "rounded-full font-bold shadow-xs hover:opacity-95 active:scale-[0.97] transition-all cursor-pointer border-none select-none no-underline text-white",
    style: { backgroundColor: "#ff5500" },
  },
  outline: {
    classes: "border-2 border-white text-white font-bold hover:bg-white hover:text-slate-900 transition-all rounded-[6px] cursor-pointer",
    style: {},
  },
};
VARIANTS.brochure = VARIANTS.primary;

/**
 * Reusable Landing Page Button & Action Link
 */
export default function LandingButton({
  children,
  type = "button",
  variant = "primary",
  icon,
  iconPosition = "right",
  loading = false,
  disabled = false,
  skewEffect = false,
  onClick,
  href,
  className = "",
  style = {},
  ...props
}) {
  const v = VARIANTS[variant] || { classes: "font-bold rounded-[6px] cursor-pointer transition-all", style: {} };
  const hasSkew = skewEffect || variant === "phone";
  const Comp = href ? "a" : "button";

  return (
    <Comp
      {...(href ? { href } : { type, disabled: disabled || loading })}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 select-none ${
        hasSkew ? "relative overflow-hidden" : ""
      } ${v.classes} ${
        disabled || loading ? "opacity-60 cursor-not-allowed pointer-events-none" : ""
      } ${className}`}
      style={{
        ...v.style,
        ...(style.backgroundColor && !style.background ? { background: style.backgroundColor } : {}),
        ...style,
      }}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {hasSkew && <span className="moving-light-green-box" />}
          {icon && iconPosition === "left" && <span className="relative z-10 shrink-0">{icon}</span>}
          <span className="relative z-10">{children}</span>
          {icon && iconPosition === "right" && <span className="relative z-10 shrink-0">{icon}</span>}
        </>
      )}
    </Comp>
  );
}

