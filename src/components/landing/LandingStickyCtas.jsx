"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Download } from "lucide-react";

export default function LandingStickyCtas({
  brand = {},
  onOpenApply,
  onOpenBrochure,
  onOpenScholarship,
  onOpenCompare,
}) {
  const rawPhone = (brand.phone || "7065777755").replace(/\D/g, "").slice(-10);
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=+91${rawPhone}&text=${encodeURIComponent(
    `Hi, I want to know more about ${brand.name || "University"} Online courses and admission.`
  )}`;

  const slug = (brand.slug || "smu").toLowerCase();
  const whatsappGifDefault =
    brand.callIcon ||
    brand.callGif ||
    `/assets/all_universities_images/all_universities_images/${slug}/call_icon.gif`;

  const giftGifDefault =
    brand.giftGif ||
    `/assets/all_universities_images/all_universities_images/${slug}/gift.gif`;

  const [whatsappSrc, setWhatsappSrc] = React.useState(whatsappGifDefault);
  const [giftSrc, setGiftSrc] = React.useState(giftGifDefault);

  React.useEffect(() => {
    setWhatsappSrc(whatsappGifDefault);
  }, [whatsappGifDefault]);

  React.useEffect(() => {
    setGiftSrc(giftGifDefault);
  }, [giftGifDefault]);

  return (
    <>
      {/* Floating Action Buttons (Bottom-Right) */}
      <div className="fixed bottom-24 sm:bottom-8 right-3 sm:right-6 z-40 flex flex-col items-center gap-3.5 select-none">
        {/* Top: WhatsApp animated GIF button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp +91 ${rawPhone}`}
          title={`Chat on WhatsApp (+91 ${rawPhone})`}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_22px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer border border-slate-100/80"
        >
          <Image
            src={whatsappSrc}
            alt="WhatsApp"
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain pointer-events-none rounded-full"
            unoptimized
            onError={() => {
              setWhatsappSrc("/assets/all_universities_images/all_universities_images/smu/call_icon.gif");
            }}
          />
        </a>

        {/* Bottom: Gift animated GIF button */}
        <button
          type="button"
          onClick={() => {
            if (onOpenScholarship) onOpenScholarship();
            else if (onOpenApply) onOpenApply();
          }}
          aria-label="Claim Scholarship"
          title={brand.couponButtonText || "Scholarship Coupon Code"}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_22px_rgba(255,180,0,0.35)] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer border border-slate-100/80"
        >
          <Image
            src={giftSrc}
            alt="Scholarship Gift"
            width={44}
            height={44}
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain pointer-events-none"
            unoptimized
            onError={() => {
              setGiftSrc("/assets/all_universities_images/all_universities_images/smu/gift.gif");
            }}
          />
        </button>
      </div>

      {/* Sticky Bottom Bar on Mobile/Tablet */}
      <div
        className="footer_sticky_buttons lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 py-2.5 grid grid-cols-2 gap-2.5 shadow-2xl transition-colors pb-[max(10px,env(safe-area-inset-bottom))]"
        style={{ backgroundColor: brand.primaryColor || "#002b49" }}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="wp_btn flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-[#25d366] text-white font-bold text-[13.5px] sm:text-sm no-underline shadow-sm active:opacity-90"
        >
          <Download className="w-4 h-4" />
          <span>Get Brochure</span>
        </a>

        <button
          type="button"
          onClick={() => onOpenApply?.()}
          className="apply_btn flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#ffd508] text-black font-bold text-[13.5px] sm:text-sm border-none shadow-sm cursor-pointer active:opacity-90"
        >
          <span>Apply Now</span>
          <span className="text-base leading-none">→</span>
        </button>
      </div>
    </>
  );
}

