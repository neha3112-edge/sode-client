"use client";

import React from "react";
import { Phone, Download, Sparkles, Scale } from "lucide-react";
import { Button } from "antd";

export default function LandingStickyCtas({
  brand = {},
  onOpenApply,
  onOpenBrochure,
  onOpenScholarship,
  onOpenCompare,
}) {
  const phone = brand.phone || "7065777755";
  const whatsappText = encodeURIComponent(`I want to Download ${brand.name || "University"} Online Brochure`);

  return (
    <>
      {/* Floating Desktop Widgets (Right Edge) */}
      <div className="fixed bottom-6 right-6 z-30 hidden lg:flex flex-col gap-2.5">
        <Button
          type="primary"
          icon={<Sparkles className="w-4 h-4" />}
          onClick={() => onOpenScholarship?.()}
          className="!bg-[#e91e63] hover:!bg-[#d81b60] !text-white !font-bold !h-11 !px-5 !rounded-full !shadow-lg !border-none flex items-center gap-2"
        >
          Check Scholarship
        </Button>
        <Button
          type="default"
          icon={<Scale className="w-4 h-4" />}
          onClick={() => onOpenCompare?.()}
          className="!bg-white hover:!bg-slate-50 !text-[#08417b] !font-bold !h-11 !px-5 !rounded-full !shadow-lg !border !border-slate-300 flex items-center gap-2"
          style={{ color: brand.primaryColor || "#08417b" }}
        >
          Compare
        </Button>
      </div>

      {/* Floating Call Button on mobile right above footer sticky */}
      <a
        href={`tel:${phone.replace(/\D/g, "")}`}
        aria-label="Call Expert"
        className="lg:hidden fixed bottom-20 right-3 z-40 w-12 h-12 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform"
      >
        <Phone className="w-6 h-6 fill-white text-white" />
      </a>

      {/* Sticky Bottom Bar on Mobile/Tablet matching .footer_sticky_buttons */}
      <div
        className="footer_sticky_buttons lg:hidden fixed bottom-0 left-0 right-0 z-50 p-2.5 grid grid-cols-2 gap-2 shadow-2xl transition-colors"
        style={{ backgroundColor: brand.primaryColor || "#08417b" }}
      >
        {/* Left: WhatsApp / Brochure Green Pill */}
        <a
          href={`https://api.whatsapp.com/send/?phone=+91${phone.replace(/\D/g, "").slice(-10)}&text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="wp_btn flex items-center justify-center gap-2 py-2 px-3 rounded-full bg-[#25d366] text-white font-bold text-sm no-underline shadow-sm active:opacity-90"
        >
          <Download className="w-4 h-4" />
          <span>Get Brochure</span>
        </a>

        {/* Right: Apply Now Yellow Pill */}
        <button
          type="button"
          onClick={() => onOpenApply?.()}
          className="apply_btn flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#ffd508] text-black font-bold text-sm border-none shadow-sm cursor-pointer active:opacity-90"
        >
          <span>Apply Now</span>
          <span className="text-base leading-none">»</span>
        </button>
      </div>
    </>
  );
}
