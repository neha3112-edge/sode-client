"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import FormWrapper from "@/components/forms/FormWrapper";
import { getAssetPath } from "@/lib/utils";

export default function FloatingButton({
  title = "Get Scholarship Coupon Code",
  subtitle = "Select your course and our academic experts will contact you",
  formNameOverride = "SODE Scholarship Floating Form",
  submitButtonText = "Get Coupon Code",
  autoOpenAtScrollPercent = 45,
  autoOpenSessionKey = "sode-scholarship-form-auto-opened",
  showConfettiOnAutoOpen = true,
  ...formProps
}) {
  const [isOpen, setIsOpen] = useState(false);

  /* =========================================================
     CONFETTI ANIMATION TRIGGER
  ========================================================= */

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        zIndex: 999999,
      });

      window.setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.65 },
          zIndex: 999999,
        });

        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.65 },
          zIndex: 999999,
        });
      }, 300);
    } catch (e) {
      console.warn("Confetti error:", e);
    }
  };

  /* =========================================================
     AUTO-OPEN ON 45% SCROLL (ONCE PER SESSION)
  ========================================================= */

  useEffect(() => {
    if (typeof window === "undefined" || !autoOpenAtScrollPercent) return;

    const hasOpened = sessionStorage.getItem(autoOpenSessionKey);
    if (hasOpened) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (scrollHeight <= 0) return;

      const currentScrollPercent = (scrollTop / scrollHeight) * 100;

      if (currentScrollPercent >= autoOpenAtScrollPercent) {
        sessionStorage.setItem(autoOpenSessionKey, "true");
        setIsOpen(true);
        if (showConfettiOnAutoOpen) {
          triggerConfetti();
        }
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [autoOpenAtScrollPercent, autoOpenSessionKey, showConfettiOnAutoOpen]);

  /* =========================================================
     MANUAL CLICK HANDLER
  ========================================================= */

  const handleManualClick = () => {
    triggerConfetti();
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating Gift Scholarship Button */}
      <button
        type="button"
        onClick={handleManualClick}
        aria-label="Get scholarship coupon code"
        title="Get Scholarship Coupon Code"
        className="
          relative
          flex h-14 w-14 shrink-0
          cursor-pointer items-center justify-center
          rounded-full bg-white
          shadow-md
          transition-all duration-300
          hover:scale-110
          hover:shadow-lg
          focus:outline-none
          focus:ring-4
          focus:ring-[#1C3569]/20
        "
      >
        <Image
          src={getAssetPath("/assets/images/unnamed (1).gif")}
          alt="Get scholarship coupon code"
          width={48}
          height={48}
          unoptimized
          className="h-12 w-12 rounded-full object-contain"
        />
      </button>

      {/* Form Modal */}
      <FormWrapper
        isModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={triggerConfetti}
        title={title}
        subtitle={subtitle}
        formNameOverride={formNameOverride}
        submitButtonText={submitButtonText}
        {...formProps}
      />
    </>
  );
}
