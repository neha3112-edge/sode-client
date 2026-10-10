"use client";

import React from "react";
import { Download } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

/**
 * Helper to resolve Apply Button color classes based on configuration
 */
function getApplyButtonClasses(applyStyle) {
  switch (applyStyle) {
    case "red":
      return "bg-[#c11f28] text-white";
    case "white-red":
      return "bg-white text-[#d32f2f]";
    case "white-accent":
      return "bg-white text-[#f97316]";
    case "yellow":
    default:
      return "bg-[#ffd508] text-black";
  }
}

/**
 * Responsive Mobile/Tablet Sticky Bottom Bar (2-Column CTA Strip)
 */
export default function StickyBottomBar({
  config,
  onOpenApply,
  onOpenBrochure,
}) {
  const { stickyBar, whatsappUrl, labels } = config;

  if (!stickyBar.enabled) {
    return null;
  }

  const isWhiteRed = stickyBar.applyStyle === "white-red";
  const paddingClasses = isWhiteRed
    ? "py-2 pb-[max(8px,env(safe-area-inset-bottom))]"
    : "py-2.5 pb-[max(10px,env(safe-area-inset-bottom))]";

  return (
    <div
      className={`footer_sticky_buttons lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 ${paddingClasses} grid grid-cols-2 gap-2.5 shadow-2xl transition-colors`}
      style={{ backgroundColor: stickyBar.background }}
    >
      {/* Left CTA: Get Brochure (WhatsApp Link or Modal Button) */}
      {stickyBar.brochureAction === "whatsapp" ? (
        <a
          href={whatsappUrl}
          className="wp_btn flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#1ea84b] text-white font-bold text-[13.5px] no-underline shadow-sm active:opacity-90"
        >
          <FaWhatsapp className="w-4 h-4 text-white shrink-0" />
          <span>{labels.brochure}</span>
        </a>
      ) : (
        <button
          type="button"
          onClick={() => onOpenBrochure?.()}
          className="wp_btn flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-3 rounded-full bg-[#25d366] text-white font-bold text-[13.5px] sm:text-sm border-none cursor-pointer shadow-sm active:opacity-90 relative z-10"
        >
          {stickyBar.brochureIcon === "whatsapp" ? (
            <FaWhatsapp className="w-[18px] h-[18px] text-white shrink-0" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>{labels.brochure}</span>
        </button>
      )}

      {/* Right CTA: Apply Now Button */}
      <button
        type="button"
        onClick={() => onOpenApply?.()}
        className={`apply_btn flex items-center justify-center gap-1.5 py-2 px-3 rounded-full ${getApplyButtonClasses(
          stickyBar.applyStyle
        )} font-bold text-[13.5px] sm:text-sm border-none shadow-sm cursor-pointer active:opacity-90`}
      >
        <span>{labels.apply}</span>
        <span className={isWhiteRed ? "text-[16px] leading-none font-bold" : "text-base leading-none"}>
          »
        </span>
      </button>
    </div>
  );
}
