"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function LandingFooter({
  onOpenDisclaimer,
  onOpenTerms,
  onOpenPrivacy,
}) {
  return (
    <footer className="mini-footer bg-[#f6f8fa] text-[#777] pt-6 relative border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        {/* SODE / Distance Education School Logo */}
        <div className="footer_sode_logo_container flex justify-center items-center">
          <Link href="/" className="inline-block" aria-label="Distance Education School">
            <div className="relative w-56 sm:w-72 h-14 sm:h-16">
              <Image
                src="/assets/images/sode_full_logo.webp"
                alt="Distance Education School"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 224px, 288px"
              />
            </div>
          </Link>
        </div>

        {/* Agency Disclaimer Text & Legal Links */}
        <div id="footer-bottom-bar" className="px-2 sm:px-6 text-[12px] sm:text-[13px] text-[#666] leading-relaxed">
          <p className="m-0 mb-3">
            SODE Counselling Services LLP act as a marketing agency. All university names, logos, and trademarks mentioned are used for informational purposes only. We are not a university or an admission authority. Users are encouraged to verify information on the official website of the University before making decisions.
          </p>
          <p className="m-0 text-[12px] sm:text-[13px] text-slate-700">
            <button
              type="button"
              onClick={() => onOpenDisclaimer?.()}
              className="text-[#08417b] hover:underline font-medium cursor-pointer"
            >
              Disclaimer
            </button>
            <span className="mx-2 text-slate-400">|</span>
            <button
              type="button"
              onClick={() => onOpenTerms?.()}
              className="text-[#08417b] hover:underline font-medium cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span className="mx-2 text-slate-400">|</span>
            <button
              type="button"
              onClick={() => onOpenPrivacy?.()}
              className="text-[#08417b] hover:underline font-medium cursor-pointer"
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </div>

      {/* Blue copyright bar */}
      <div className="mini-footer-bottom mt-6 bg-[#0b3c66] text-white text-center py-2 px-4 text-[12px] sm:text-[13px] pb-[75px] md:pb-2">
        © {new Date().getFullYear()} SODE Counselling Services LLP
      </div>
    </footer>
  );
}
