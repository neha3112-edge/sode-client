"use client";

import React from "react";
import Image from "next/image";
import { triggerGiftConfetti } from "./stickyCtaUtils";

/**
 * Reusable Floating Action Buttons (Right Edge: Call & Gift Icons)
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
    <div className="fixed bottom-14 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-center gap-2.5 sm:gap-3 pointer-events-auto">
      {/* Top: Call Icon */}
      {floatingCall.enabled && (
        <a
          href={callHref}
          aria-label={labels.callAria}
          title={labels.callAria}
          className={`floating-call-btn ${
            floatingCall.mobile ? "flex" : "hidden sm:flex"
          } relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden shadow-2xl items-center justify-center transition-transform hover:scale-110 active:scale-95 bg-white drop-shadow-lg`}
        >
          <Image
            src={floatingCall.image}
            alt={floatingCall.alt}
            fill
            unoptimized
            className="object-cover"
            sizes="64px"
          />
        </a>
      )}

      {/* Bottom: Gift Icon */}
      {floatingGift.enabled && (
        <button
          type="button"
          onClick={handleGiftClick}
          aria-label={labels.giftAria}
          className="floating-gift-btn relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 bg-white border-none cursor-pointer p-1.5 drop-shadow-lg"
        >
          <Image
            src={floatingGift.image}
            alt="Gift Voucher"
            fill
            unoptimized
            className="object-contain p-1"
            sizes="64px"
          />
        </button>
      )}
    </div>
  );
}
