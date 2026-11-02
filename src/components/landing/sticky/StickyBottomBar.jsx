"use client";

import React from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

/**
 * Helper to resolve Apply Button colors (supports explicit brand colors and known presets)
 */
function getApplyButtonStyles(stickyBar) {
  const presets = {
    "white-red": { bg: "#ffffff", text: "#d32f2f" },
    "white-orange": { bg: "#ffffff", text: "#DC520A" },
    "white-accent": { bg: "#ffffff", text: "#f97316" },
    "white-pink": { bg: "#ffffff", text: "#f2167d" },
    "white-blue": { bg: "#ffffff", text: "#074a76" },
    "white-brand": { bg: "#ffffff", text: stickyBar.brandColor || "#003468" },
    "pink": { bg: "#f2167d", text: "#ffffff" },
    "red": { bg: "#c11f28", text: "#ffffff" },
    "orange": { bg: "#DC520A", text: "#ffffff" },
    "blue": { bg: "#01519a", text: "#ffffff" },
    "iiitb": { bg: "#01519a", text: "#ffffff" },
    "esgci": { bg: "#fff000", text: "#000000" },
    "yellow-esgci": { bg: "#fff000", text: "#000000" },
    "yellow": { bg: "#ffd508", text: "#000000" },
  };

  const preset = presets[stickyBar.applyStyle] || presets["yellow"];

  return {
    backgroundColor: stickyBar.applyBg || preset.bg,
    color: stickyBar.applyTextColor || preset.text,
  };
}

/**
 * Helper to resolve Brochure Button colors (supports explicit brand colors and default WhatsApp green)
 */
function getBrochureButtonStyles(stickyBar) {
  return {
    backgroundColor: stickyBar.brochureBg || "#25d366",
    color: stickyBar.brochureTextColor || "#ffffff",
  };
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

  const isSplit = Boolean(stickyBar.isSplit);
  const applyStyles = getApplyButtonStyles(stickyBar);
  const brochureStyles = getBrochureButtonStyles(stickyBar);

  if (isSplit) {
    return (
      <div
        className="footer_sticky_buttons lg:hidden fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 w-full p-0 gap-0 shadow-2xl pb-[max(0px,env(safe-area-inset-bottom))]"
        style={{ backgroundColor: stickyBar.background || "transparent" }}
      >
        {/* Left CTA: Get Brochure */}
        {stickyBar.brochureAction === "whatsapp" ? (
          <Link
            href={whatsappUrl}
            className="wp_btn flex items-center justify-center gap-2 h-[48px] font-normal text-[14.5px] no-underline border-none rounded-none cursor-pointer active:opacity-90"
            style={{
              backgroundColor: brochureStyles.backgroundColor,
              color: brochureStyles.color,
            }}
          >
            {stickyBar.brochureIcon === "download" ? (
              <Download className="w-4 h-4 shrink-0" style={{ color: brochureStyles.color }} />
            ) : (
              <FaWhatsapp className="w-5 h-5 shrink-0" style={{ color: brochureStyles.color }} />
            )}
            <span>{labels.brochure}</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => onOpenBrochure?.()}
            className="wp_btn flex items-center justify-center gap-2 h-[48px] font-normal text-[14.5px] border-none rounded-none cursor-pointer active:opacity-90"
            style={{
              backgroundColor: brochureStyles.backgroundColor,
              color: brochureStyles.color,
            }}
          >
            {stickyBar.brochureIcon === "download" ? (
              <Download className="w-4 h-4 shrink-0" style={{ color: brochureStyles.color }} />
            ) : (
              <FaWhatsapp className="w-5 h-5 shrink-0" style={{ color: brochureStyles.color }} />
            )}
            <span>{labels.brochure}</span>
          </button>
        )}

        {/* Right CTA: Apply Now Button */}
        <button
          type="button"
          onClick={() => onOpenApply?.()}
          className="apply_btn flex items-center justify-center gap-1.5 h-[48px] rounded-none font-normal text-[14.5px] border-none cursor-pointer active:opacity-90"
          style={{
            backgroundColor: applyStyles.backgroundColor,
            color: applyStyles.color,
          }}
        >
          <span>{labels.apply}</span>
          {!stickyBar.hideApplyArrow && (
            <span
              className="text-[22px] sm:text-[24px] leading-none font-bold -mt-0.5 ml-0.5 inline-block"
              style={{ color: applyStyles.color }}
            >
              »
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div
      className="footer_sticky_buttons lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 py-2 pb-[max(8px,env(safe-area-inset-bottom))] grid grid-cols-2 gap-2.5 shadow-2xl transition-colors"
      style={{ backgroundColor: stickyBar.background }}
    >
      {/* Left CTA: Get Brochure (WhatsApp Link or Modal Button) */}
      {stickyBar.brochureAction === "whatsapp" ? (
        <Link
          href={whatsappUrl}
          className="wp_btn flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full font-normal text-[15px] sm:text-[15.5px] no-underline shadow-sm active:opacity-90 border-none cursor-pointer"
          style={{
            backgroundColor: brochureStyles.backgroundColor,
            color: brochureStyles.color,
          }}
        >
          {stickyBar.brochureIcon === "download" ? (
            <Download className="w-4 h-4 shrink-0" style={{ color: brochureStyles.color }} />
          ) : (
            <FaWhatsapp className="w-5 h-5 shrink-0" style={{ color: brochureStyles.color }} />
          )}
          <span>{labels.brochure}</span>
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => onOpenBrochure?.()}
          className="wp_btn flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-3 rounded-full font-normal text-[15px] sm:text-[15.5px] border-none cursor-pointer shadow-sm active:opacity-90 relative z-10"
          style={{
            backgroundColor: brochureStyles.backgroundColor,
            color: brochureStyles.color,
          }}
        >
          {stickyBar.brochureIcon === "download" ? (
            <Download className="w-4 h-4 shrink-0" style={{ color: brochureStyles.color }} />
          ) : (
            <FaWhatsapp className="w-5 h-5 shrink-0" style={{ color: brochureStyles.color }} />
          )}
          <span>{labels.brochure}</span>
        </button>
      )}

      {/* Right CTA: Apply Now Button */}
      <button
        type="button"
        onClick={() => onOpenApply?.()}
        className="apply_btn flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full font-normal text-[15px] sm:text-[15.5px] border-none shadow-sm cursor-pointer active:opacity-90"
        style={{
          backgroundColor: applyStyles.backgroundColor,
          color: applyStyles.color,
        }}
      >
        <span>{labels.apply}</span>
        {!stickyBar.hideApplyArrow && (
          <span
            className="text-[22px] sm:text-[24px] leading-none font-bold -mt-0.5 ml-0.5 inline-block"
            style={{ color: applyStyles.color }}
          >
            »
          </span>
        )}
      </button>
    </div>
  );
}

