"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { triggerGiftConfetti } from "./stickyCtaUtils";

/**
 * Reusable Floating Action Buttons (Right Edge: Call, WhatsApp & Gift Icons)
 */
export default function StickyFloatingActions({
  config,
  onOpenScholarship,
}) {
  const { floatingCall, floatingGift, callHref, labels } = config;

  const handleGiftClick = (e) => {
    triggerGiftConfetti(e);
    onOpenScholarship?.();
  };

  return (
    <div className="fixed bottom-[80px] lg:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-center gap-2.5 sm:gap-3 pointer-events-auto">
      {/* 1. Call Button */}
      {floatingCall?.enabled && (
        <Link
          href={callHref}
          aria-label={labels.callAria}
          title={labels.callAria}
          className={`floating-call-btn ${
            floatingCall.mobile ? "flex" : "hidden sm:flex"
          } relative w-16 h-16 sm:w-[68px] sm:h-[68px] lg:w-[72px] lg:h-[72px] rounded-full overflow-hidden shadow-2xl items-center justify-center transition-transform hover:scale-110 active:scale-95 bg-white drop-shadow-lg`}
        >
          <Image
            src={floatingCall.image}
            alt={floatingCall.alt || "Call Expert"}
            fill
            unoptimized
            className="object-cover"
            sizes="72px"
          />
        </Link>
      )}

      {/* Bottom: Gift Icon */}
      {floatingGift?.enabled && (
        <button
          type="button"
          onClick={handleGiftClick}
          aria-label={labels.giftAria}
          title={labels.giftAria}
          className="floating-gift-btn relative w-16 h-16 sm:w-[68px] sm:h-[68px] lg:w-[72px] lg:h-[72px] rounded-full overflow-hidden shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 bg-white border-none cursor-pointer p-1.5 drop-shadow-lg"
        >
          <Image
            src={floatingGift.image}
            alt="Gift Voucher"
            fill
            unoptimized
            className="object-contain p-1"
            sizes="72px"
          />
        </button>
      )}
    </div>
  );
}