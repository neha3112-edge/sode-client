"use client";

import React from "react";
import { ArrowRight, FileText } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function BottomCTA({
  onApply,
  onBrochure,
  whatsappPhone = "917065777755",
  whatsappMessage = "I want to know more about the online degree and certification courses offered by SODE.",
  brochureButtonText = "Get Brochure",
  applyButtonText = "Apply Now",
}) {
  const handleWhatsApp = () => {
    const cleanPhoneNumber = whatsappPhone.replace(/\D/g, "");
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${cleanPhoneNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full items-center rounded-t-2xl bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.2)] md:hidden">
      {/* WhatsApp / Brochure Button */}
      <button
        type="button"
        onClick={onBrochure || handleWhatsApp}
        className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-tl-2xl bg-[#25D366] py-3.5 text-sm font-bold text-white transition hover:bg-[#20bd5a]"
      >
        {onBrochure ? (
          <FileText size={18} aria-hidden="true" />
        ) : (
          <FaWhatsapp size={18} aria-hidden="true" />
        )}
        <span>{brochureButtonText}</span>
      </button>

      {/* Apply Button */}
      <button
        type="button"
        onClick={onApply}
        className="group flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-tr-2xl bg-[#FFC107] py-3.5 text-sm font-bold text-black transition hover:bg-[#e5ad00]"
      >
        <span>{applyButtonText}</span>
        <ArrowRight
          size={18}
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </div>
  );
}
