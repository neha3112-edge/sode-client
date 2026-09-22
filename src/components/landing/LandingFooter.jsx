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
    <footer className="bg-white text-slate-600 pt-10 border-t border-slate-200 text-xs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        {/* Big Official Logo */}
        <div className="flex justify-center">
          <Link href="/" className="inline-block" aria-label="Distance Education School / SODE">
            <div className="relative w-64 sm:w-80 h-16 sm:h-20">
              <Image
                src="/assets/images/sode_full_logo.webp"
                alt="Distance Education School - School of Online & Distance Education"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 256px, 320px"
              />
            </div>
          </Link>
        </div>

        {/* Agency Disclaimer Text */}
        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed max-w-3xl mx-auto m-0">
          SODE Counselling Services LLP acts as a marketing agency. All university names, logos, and trademarks mentioned are used for informational purposes only. We are not a university or an admission authority. Users are encouraged to verify information on the official website of the University before making decisions.
        </p>

        {/* Policy Links */}
        <div className="flex items-center justify-center gap-3 text-[11px] text-slate-600 pb-4">
          <button type="button" onClick={() => onOpenDisclaimer?.()} className="hover:text-blue-600 underline cursor-pointer">
            Disclaimer
          </button>
          <span>|</span>
          <button type="button" onClick={() => onOpenTerms?.()} className="hover:text-blue-600 underline cursor-pointer">
            Terms & Conditions
          </button>
          <span>|</span>
          <button type="button" onClick={() => onOpenPrivacy?.()} className="hover:text-blue-600 underline cursor-pointer">
            Privacy Policy
          </button>
        </div>
      </div>

      {/* Dark Bottom Bar */}
      <div className="bg-[#082b4e] text-white/90 text-center py-2.5 px-4 text-[11px] font-normal">
        © {new Date().getFullYear()} SODE Counselling Services LLP
      </div>
    </footer>
  );
}
