"use client";

import React from "react";
import { Phone } from "lucide-react";

export default function CallCTA() {
  const phoneNumber = "+917065777755";

  return (
    <a
      href={`tel:${phoneNumber}`}
      aria-label="Call SODE counsellor"
      title="Call Now"
      className="relative mb-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#005382] text-white shadow-lg transition duration-300 hover:scale-110 hover:bg-[#003f63]"
    >
      <Phone size={26} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-[#005382]/4-[#005382] opacity-75"
      />
    </a>
  );
}
