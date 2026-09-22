"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";

function PhoneIconSvg({ className = "w-5 h-5 text-white" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z" />
    </svg>
  );
}

function GiftIconSvg({ className = "w-7 h-7" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Box base */}
      <rect
        x="13"
        y="27"
        width="38"
        height="27"
        rx="2"
        fill="#FFB703"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Vertical Ribbon */}
      <rect
        x="27"
        y="27"
        width="10"
        height="27"
        fill="#EC4899"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Horizontal Ribbon */}
      <rect
        x="13"
        y="37"
        width="38"
        height="7"
        fill="#EC4899"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Open Lid (Tilted upwards) */}
      <g transform="rotate(-18 14 22)">
        {/* Lid base */}
        <rect
          x="10"
          y="18"
          width="44"
          height="10"
          rx="2"
          fill="#FFD166"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Lid Ribbon */}
        <rect
          x="27"
          y="18"
          width="10"
          height="10"
          fill="#EC4899"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Bow on top */}
        <path
          d="M24 13C20 9 22 5 26 6C30 7 31 16 32 18C33 16 34 7 38 6C42 5 44 9 40 13C37 16 33 18 32 18C31 18 27 16 24 13Z"
          fill="#EC4899"
          stroke="#1E293B"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export default function AmityStickyCtas({
  onOpenApply,
  onOpenBrochure,
  onOpenScholarship,
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating Buttons Stack on Right */}
      <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 flex flex-col items-center gap-3">
        {/* 1. Floating Call Helpline Button */}
        <a
          href="tel:07065777755"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:shadow-[0_8px_25px_rgba(32,201,151,0.45)] hover:scale-110 active:scale-95 transition-all duration-300"
          title="Call Helpline"
          aria-label="Call Helpline"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#20c997] flex items-center justify-center shadow-xs">
            <PhoneIconSvg className="w-5 h-5 text-white" />
          </div>
        </a>

        {/* 2. Floating Scholarship / Gift Button */}
        <button
          onClick={() => onOpenScholarship?.()}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:shadow-[0_8px_25px_rgba(255,183,3,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          title="Get Scholarship / Offer"
          aria-label="Get Scholarship / Offer"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
            <GiftIconSvg className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
        </button>
      </div>

      {/* Sticky Bottom Bar for Mobile & Tablet */}
      {isVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-2xl lg:hidden animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2 max-w-md mx-auto">
            {/* WhatsApp Brochure Link */}
            <a
              href="https://api.whatsapp.com/send/?phone=917065777755&text=I%20want%20to%20Download%20Amity%20Online%20Brochure"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Get Brochure</span>
            </a>

            {/* Apply Button */}
            <button
              onClick={() => onOpenApply?.()}
              className="flex-1 flex items-center justify-center gap-1 py-3 px-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-black text-xs shadow-md transition cursor-pointer"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
