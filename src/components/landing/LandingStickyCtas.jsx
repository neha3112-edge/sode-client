"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";

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

  return (
    <>
      {/* Floating Action Buttons (Right Edge) - Call icon & Gift icon */}
      <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-center gap-2.5 sm:gap-3">
        {/* Top: Call / WhatsApp Icon */}
        <a
          href={`tel:+91${rawPhone}`}
          aria-label={`Call +91 ${rawPhone}`}
          className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 bg-white drop-shadow-lg"
        >
          <Image
            src="/assets/amitylp/call_icon.gif"
            alt="Call Expert"
            fill
            unoptimized
            className="object-cover"
            sizes="64px"
          />
        </a>

        {/* Bottom: Gift Icon - opens Scholarship Coupon Code Modal */}
        <button
          type="button"
          onClick={() => onOpenScholarship?.()}
          aria-label="Get Scholarship Coupon Code"
          className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 bg-white border-none cursor-pointer p-1.5 drop-shadow-lg"
        >
          <Image
            src="/assets/amitylp/gift.gif"
            alt="Gift Voucher"
            fill
            unoptimized
            className="object-contain p-1"
            sizes="64px"
          />
        </button>
      </div>

      {/* Sticky Bottom Bar on Mobile/Tablet */}
      <div
        className="footer_sticky_buttons lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 py-2.5 grid grid-cols-2 gap-2.5 shadow-2xl transition-colors pb-[max(10px,env(safe-area-inset-bottom))]"
        style={{ backgroundColor: brand.primaryColor || "#08417b" }}
      >
        {/* Left: WhatsApp / Brochure Green Pill */}
        <a
          href={`https://api.whatsapp.com/send/?phone=+91${rawPhone}&text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="wp_btn flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-[#25d366] text-white font-bold text-[13.5px] sm:text-sm no-underline shadow-sm active:opacity-90"
        >
          <Download className="w-4 h-4" />
          <span>Get Brochure</span>
        </a>

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
    </>
  );
}
