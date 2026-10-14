"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";
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
  const whatsappText = encodeURIComponent(`I want to Download ${brand.name || "University"} Online Brochure`);

  const handleGiftClick = (e) => {
    try {
      if (typeof window !== "undefined") {
        const rect = e?.currentTarget?.getBoundingClientRect();
        const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.9;
        const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.85;
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { x, y },
          zIndex: 99999,
          colors: ["#ff5722", "#ffb300", "#4caf50", "#ffd700", "#e91e63"],
        });
      }
    } catch { }
    onOpenScholarship?.();
  };

  const isCuOrGalgotias =
    brand.slug === "cu" ||
    brand.stickyLayout === "cu" ||
    brand.slug === "galgotias" ||
    brand.stickyLayout === "galgotias";

  if (isCuOrGalgotias) {
    const defaultCallGif = brand.slug === "galgotias" ? "/assets/galgotias/call_icon.gif" : "/assets/cu/call_icon.gif";
    const defaultGiftGif = brand.slug === "galgotias" ? "/assets/galgotias/gift.gif" : "/assets/cu/gift.gif";
    return (
      <>
        <div className="sticky_btn_Section block md:hidden">
          <div className="footer_sticky_buttons">
            <a
              href={`https://api.whatsapp.com/send/?phone=+91${rawPhone}&text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="wp_btn cursor-pointer flex items-center justify-center gap-1.5"
            >
              <FaWhatsapp className="w-4 h-4 mr-0.5 inline" /> Get Brochure
            </a>
            <button
              type="button"
              className="apply_btn enquireNowBtn flex items-center justify-center gap-1 cursor-pointer"
              onClick={() => onOpenApply?.()}
            >
              Apply Now &raquo;
            </button>
          </div>
        </div>

        <a className="call_fix_image" href={`tel:${phone}`} aria-label="Call Expert">
          <img src={brand.callGif || defaultCallGif} alt="Call Now" />
        </a>

        {brand.showFloatingGift !== false && (
          <button
            type="button"
            className="coupon-btn"
            onClick={handleGiftClick}
            aria-label="Get Scholarship Coupon Code"
          >
            <img src={brand.giftGif || defaultGiftGif} alt="Scholarship Coupon" />
          </button>
        )}
      </>
    );
  }

  if (brand.slug === "iim") {
    return (
      <>
        <div className="sticky_btn_Section">
          <div className="footer_sticky_buttons">
            <button
              type="button"
              onClick={() => onOpenBrochure?.()}
              className="wp_btn cursor-pointer border-none flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-1 inline stroke-[2.5]" /> Get Brochure
            </button>
            <button
              type="button"
              className="apply_btn enquireNowBtn"
              onClick={() => onOpenApply?.()}
            >
              Apply Now &raquo;
            </button>
          </div>
        </div>

        <a className="call_fix_image" href="tel:07065777755" aria-label="Call Expert">
          <img src={brand.callGif || "/assets/iim/call_icon.gif"} alt="Call Now" />
        </a>

        {brand.showFloatingGift !== false && (
          <button
            type="button"
            className="coupon-btn"
            onClick={handleGiftClick}
            aria-label="Get Scholarship Coupon Code"
          >
            <img src={brand.giftGif || "/assets/iim/gift.gif"} alt="Scholarship Coupon" />
          </button>
        )}
      </>
    );
  }

  // UPES layout matching DES (Fixed call on left, Fixed gift on right, no bottom sticky bar)
  if (brand.slug === "upes" || brand.stickyLayout === "upes") {
    return (
      <>
        {/* Floating Call Button (Bottom Left) */}
        {!brand.hideMobileCallIcon && (
          <a
            className="fixed bottom-5 left-4 sm:left-6 z-40 w-14 h-14 sm:w-16 sm:h-16 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            href={rawPhone ? `tel:+91${rawPhone}` : "tel:07065777755"}
            aria-label="Call Expert"
          >
            <img
              src={brand.callGif || brand.callIcon || "/assets/upes/call_icon.gif"}
              alt="Call Now"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </a>
        )}

        {/* Floating Gift Coupon Button (Bottom Right) */}
        {brand.showFloatingGift !== false && (
          <button
            type="button"
            className="fixed bottom-5 right-4 sm:right-6 z-40 w-14 h-14 sm:w-16 sm:h-16 bg-transparent border-none p-0 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            onClick={handleGiftClick}
            aria-label="Get Scholarship Coupon Code"
          >
            <img
              src={brand.giftGif || "/assets/upes/gift.gif"}
              alt="Scholarship Coupon"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </button>
        )}
      </>
    );
  }

  const isUu = brand.slug === "uu";
  const isVgu = brand.slug === "vgu" || brand.stickyLayout === "vgu";
  const isLpu = brand.slug === "lpu";
  const isSmu = brand.slug === "smu" || brand.stickyLayout === "smu";

  return (
    <>
      {/* Floating Action Buttons (Right Edge) - Call/WhatsApp GIF icon & Gift GIF icon */}
      <div className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-center gap-4 sm:gap-4.5 pointer-events-auto">
        {/* Top: Call / WhatsApp Animated GIF Icon */}
        <a
          href={brand.whatsappUrl || (rawPhone ? `https://api.whatsapp.com/send/?phone=+91${rawPhone}&text=${whatsappText}` : `tel:+91${rawPhone}`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp / Call +91 ${rawPhone}`}
          title={`WhatsApp / Call (+91 ${rawPhone})`}
          className="floating-call-btn relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden shadow-[0_8px_24px_rgba(37,211,102,0.35)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 bg-white cursor-pointer"
        >
          <Image
            src={brand.callGif || brand.callIcon || (isSmu ? "/assets/smu/call_icon.gif" : "/assets/images/call_icon.gif")}
            alt="WhatsApp / Call Expert"
            fill
            unoptimized
            className="object-cover"
            sizes="64px"
          />
        </a>

        {/* Bottom: Gift Icon - opens Scholarship Coupon Code Modal */}
        {brand.showFloatingGift !== false && (
          <button
            type="button"
            onClick={handleGiftClick}
            aria-label="Get Scholarship Coupon Code"
            className="floating-gift-btn relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.16)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 bg-white border-none cursor-pointer drop-shadow-lg p-0"
          >
            <Image
              src={brand.giftGif || (isSmu ? "/assets/smu/gift.gif" : "/assets/images/gift.gif")}
              alt="Scholarship Gift"
              fill
              unoptimized
              className="object-contain p-1"
              sizes="64px"
            />
          </button>
        )}
      </div>

      {/* Sticky Bottom Bar on Mobile/Tablet */}
      {isLpu ? (
        <div className="footer_sticky_buttons lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 py-2 bg-[#f58220] grid grid-cols-2 gap-2.5 shadow-2xl pb-[max(8px,env(safe-area-inset-bottom))]">
          {/* Left: WhatsApp / Brochure Green Pill */}
          <a
            href={brand.whatsappUrl || `https://api.whatsapp.com/send/?phone=+91${rawPhone}&text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wp_btn flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#25d366] text-white font-bold text-[13.5px] no-underline shadow-sm active:opacity-90"
          >
            <FaWhatsapp className="w-4 h-4 text-white shrink-0" />
            <span>Get Brochure</span>
          </a>

          {/* Right: Apply Now White Pill */}
          <button
            type="button"
            onClick={() => onOpenApply?.()}
            className="apply_btn flex items-center justify-center gap-1 py-2 px-3 rounded-full bg-white text-[#f58220] font-bold text-[13.5px] border-none shadow-sm cursor-pointer active:opacity-90"
          >
            <span>Apply Now</span>
            <span className="text-[16px] leading-none font-bold">»</span>
          </button>
        </div>
      ) : isVgu ? (
        <div className="footer_sticky_buttons lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 py-2 bg-[#d11c1f] grid grid-cols-2 gap-2.5 shadow-2xl pb-[max(8px,env(safe-area-inset-bottom))]">
          {/* Left: WhatsApp / Brochure Green Pill */}
          <a
            href={`https://api.whatsapp.com/send/?phone=+91${rawPhone}&text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wp_btn flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#25d366] text-white font-bold text-[13.5px] no-underline shadow-sm active:opacity-90"
          >
            <FaWhatsapp className="w-4 h-4 text-white shrink-0" />
            <span>Get Brochure</span>
          </a>

          {/* Right: Apply Now White Pill */}
          <button
            type="button"
            onClick={() => onOpenApply?.()}
            className="apply_btn flex items-center justify-center gap-1 py-2 px-3 rounded-full bg-white text-[#d11c1f] font-bold text-[13.5px] border-none shadow-sm cursor-pointer active:opacity-90"
          >
            <span>Apply Now</span>
            <span className="text-[16px] leading-none font-bold">»</span>
          </button>
        </div>
      ) : isUu ? (
        <div className="footer_sticky_buttons lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 py-2 bg-[#d32f2f] grid grid-cols-2 gap-2.5 shadow-2xl pb-[max(8px,env(safe-area-inset-bottom))]">
          {/* Left: WhatsApp / Brochure Green Pill */}
          <a
            href={`https://api.whatsapp.com/send/?phone=+91${rawPhone}&text=${whatsappText}`}
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
      ) : isSmu ? (
        <div className="footer_sticky_buttons lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 py-2 bg-[#074a76] grid grid-cols-2 gap-2.5 shadow-2xl pb-[max(8px,env(safe-area-inset-bottom))]">
          {/* Left: WhatsApp / Brochure Green Pill */}
          <a
            href={`https://api.whatsapp.com/send/?phone=+91${rawPhone}&text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wp_btn flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#25d366] text-white font-bold text-[13.5px] no-underline shadow-sm active:opacity-90"
          >
            <FaWhatsapp className="w-4 h-4 text-white shrink-0" />
            <span>Get Brochure</span>
          </a>

          {/* Right: Apply Now White Pill */}
          <button
            type="button"
            onClick={() => onOpenApply?.()}
            className="apply_btn flex items-center justify-center gap-1 py-2 px-3 rounded-full bg-white text-[#074a76] font-bold text-[13.5px] border-none shadow-sm cursor-pointer active:opacity-90"
          >
            <span>Apply Now</span>
            <span className="text-[16px] leading-none font-bold">»</span>
          </button>
        </div>
      ) : (
        <div
          className="footer_sticky_buttons lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 py-2.5 grid grid-cols-2 gap-2.5 shadow-2xl transition-colors pb-[max(10px,env(safe-area-inset-bottom))]"
          style={{ backgroundColor: brand.primaryColor || "#08417b" }}
        >
          {/* Left: Get Brochure Green Pill */}
          <button
            type="button"
            onClick={() => onOpenBrochure?.()}
            className="wp_btn flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-[#25d366] text-white font-bold text-[13.5px] sm:text-sm border-none cursor-pointer shadow-sm active:opacity-90"
          >
            <Download className="w-4 h-4" />
            <span>Get Brochure</span>
          </button>

          {/* Right: Apply Now Yellow Pill */}
          <button
            type="button"
            onClick={() => onOpenApply?.()}
            className="apply_btn flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#ffd508] text-black font-bold text-[13.5px] sm:text-sm border-none shadow-sm cursor-pointer active:opacity-90"
          >
            <span>Apply Now</span>
            <span className="text-base leading-none">»</span>
          </button>
        </div>
      )}
    </>
  );
}
