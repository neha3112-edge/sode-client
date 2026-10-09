/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Download } from "lucide-react";
import { triggerGiftConfetti } from "./stickyCtaUtils";

/**
 * Dedicated Layout Variant for IIM Landing Page
 *
 * Preserves the exact DOM structure and CSS class hooks required by .landing-page--iim:
 * - .sticky_btn_Section > .footer_sticky_buttons
 * - .call_fix_image
 * - .coupon-btn
 */
export default function IimStickyCta({
  config,
  onOpenApply,
  onOpenBrochure,
  onOpenScholarship,
}) {
  const { floatingCall, floatingGift, callHref, labels } = config;

  const handleGiftClick = (e) => {
    triggerGiftConfetti(e);
    onOpenScholarship?.();
  };

  return (
    <>
      {/* IIM Sticky Bottom Buttons Strip */}
      <div className="sticky_btn_Section">
        <div className="footer_sticky_buttons">
          <button
            type="button"
            onClick={() => onOpenBrochure?.()}
            className="wp_btn cursor-pointer border-none flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-1 inline stroke-[2.5]" /> {labels.brochure}
          </button>
          <button
            type="button"
            className="apply_btn enquireNowBtn"
            onClick={() => onOpenApply?.()}
          >
            {labels.apply} &raquo;
          </button>
        </div>
      </div>

      {/* Floating Call Image Link */}
      {floatingCall.enabled && (
        <a className="call_fix_image" href={callHref} aria-label={labels.callAria}>
          <img src={floatingCall.image} alt={floatingCall.alt || "Call Now"} />
        </a>
      )}

      {/* Floating Scholarship Coupon Button */}
      {floatingGift.enabled && (
        <button
          type="button"
          className="coupon-btn"
          onClick={handleGiftClick}
          aria-label={labels.giftAria}
        >
          <img src={floatingGift.image} alt={floatingGift.alt || "Scholarship Coupon"} />
        </button>
      )}
    </>
  );
}
