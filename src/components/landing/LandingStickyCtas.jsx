"use client";

import React from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import confetti from "canvas-confetti";

export default function LandingStickyCtas({
  brand = {},
  onOpenApply,
  onOpenBrochure,
  onOpenScholarship,
  onOpenCompare,
}) {
  const phone = brand.phone || "7065777755";
  const rawPhone = phone.replace(/\D/g, "").slice(-10);
  const whatsappText = encodeURIComponent(
    `I want to Download ${brand.name || "University"} Online Brochure`
  );

  const handleGiftClick = (e) => {
    try {
      if (typeof window !== "undefined") {
        const rect = e?.currentTarget?.getBoundingClientRect();
        const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.9;
        const y = rect
          ? (rect.top + rect.height / 2) / window.innerHeight
          : 0.85;
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { x, y },
          zIndex: 99999,
          colors: ["#ff5722", "#ffb300", "#4caf50", "#ffd700", "#e91e63"],
        });
      }
    } catch {}
    onOpenScholarship?.();
  };

  const rightBtnBg =
    brand.stickyApplyBg ||
    (brand.slug === "ssbm" ? "#fd202a" : brand.primaryColor || "#01519a");
  const rightBtnColor = brand.stickyApplyTextColor || "#ffffff";

  const isUu = brand.slug === "uu";

  return (
    <>
      {/* Floating Action Buttons (Right Edge) - Call icon & Gift icon */}
      <div className="fixed bottom-14 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-center gap-2.5 sm:gap-3 pointer-events-auto">
        {/* Top: Call Icon (Visible on mobile for UU and SSBM as shown in screenshots) */}
        {!brand.hideMobileCallIcon && (
          <a
            href={`tel:+91${rawPhone}`}
            aria-label={`Call +91 ${rawPhone}`}
            className={`floating-call-btn ${
              isUu || brand.slug === "ssbm" ? "flex" : "hidden sm:flex"
            } relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden shadow-2xl items-center justify-center transition-transform hover:scale-110 active:scale-95 bg-white drop-shadow-lg`}
          >
            <Image
              src={brand.callGif || "/assets/images/call_icon.gif"}
              alt="Call Expert"
              fill
              unoptimized
              className="object-cover"
              sizes="64px"
            />
          </a>
        )}

        {/* Bottom: Gift Icon - opens Scholarship Coupon Code Modal */}
        {brand.showFloatingGift !== false && (
          <button
            type="button"
            onClick={handleGiftClick}
            aria-label="Get Scholarship Coupon Code"
            className="floating-gift-btn relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.18)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 bg-white border-none cursor-pointer p-1.5 drop-shadow-lg"
          >
            <Image
              src={brand.giftGif || "/assets/images/gift.gif"}
              alt="Gift Voucher"
              fill
              unoptimized
              className="object-contain p-1"
              sizes="64px"
            />
          </button>
        )}
      </div>

      {/* Sticky Bottom Bar on Mobile/Tablet */}
      {isUu ? (
        <div className="footer_sticky_buttons lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 py-2 bg-[#d32f2f] grid grid-cols-2 gap-2.5 shadow-2xl pb-[max(8px,env(safe-area-inset-bottom))]">
          {/* Left: WhatsApp / Brochure Green Pill */}
          <a
            href={`https://api.whatsapp.com/send/?phone=+91${rawPhone}&text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wp_btn flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#1ea84b] text-white font-bold text-[13.5px] no-underline shadow-sm active:opacity-90"
          >
            <FaWhatsapp className="w-4 h-4 text-white shrink-0" />
            <span>Get Brochure</span>
          </a>

          {/* Right: Apply Now White Pill */}
          <button
            type="button"
            onClick={() => onOpenApply?.()}
            className="apply_btn flex items-center justify-center gap-1 py-2 px-3 rounded-full bg-white text-[#d32f2f] font-bold text-[13.5px] border-none shadow-sm cursor-pointer active:opacity-90"
          >
            <span>Apply Now</span>
            <span className="text-[16px] leading-none font-bold">»</span>
          </button>
        </div>
      ) : (
        <div className="footer_sticky_buttons lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-stretch shadow-2xl p-0 h-[48px] pb-[env(safe-area-inset-bottom)] bg-transparent">
          {/* Left: WhatsApp / Brochure Green Button */}
          <a
            href={`https://api.whatsapp.com/send/?phone=+91${rawPhone}&text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wp_btn flex-1 flex items-center justify-center gap-2 bg-[#25d366] text-white font-bold text-[13.5px] sm:text-[14.5px] no-underline transition-opacity active:opacity-90 h-full m-0 border-none"
          >
            <FaWhatsapp className="w-[18px] h-[18px] text-white shrink-0" />
            <span>Get Brochure</span>
          </a>

          {/* Right: Apply Now University Primary/Theme Button */}
          <button
            type="button"
            onClick={() => onOpenApply?.()}
            className="apply_btn flex-1 flex items-center justify-center gap-1.5 text-white font-bold text-[13.5px] sm:text-[14.5px] border-none cursor-pointer transition-opacity active:opacity-90 h-full m-0"
            style={{
              backgroundColor: rightBtnBg,
              color: rightBtnColor,
            }}
          >
            <span>Apply Now</span>
            <span className="text-[17px] leading-none font-bold">»</span>
          </button>
        </div>
      )}
    </>
  );
}
