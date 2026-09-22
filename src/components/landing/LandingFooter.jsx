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
    <footer className="mini-footer bg-[#f6f8fa] text-[#777] pt-4 sm:pt-6 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* SODE / Distance Education School Official Full Logo */}
        <div className="footer_sode_logo_container flex justify-center items-center">
          <Link href="/" className="inline-block" aria-label="Distance Education School">
            <div className="relative w-75 sm:w-110 md:w-120 h-22.5 sm:h-32.5">
              <Image
                src="/assets/images/new-des-logo.webp"
                alt="Distance Education School - SODE School of Online & Distance Education"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 300px, (max-width: 768px) 440px, 480px"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Agency Disclaimer Text */}
        <div id="footer-bottom-bar" className="mt-2 sm:mt-3 px-2 sm:px-8">
          <p className="m-0 text-[11px] sm:text-[12.5px] text-[#555] leading-relaxed max-w-4xl mx-auto">
            SODE Counselling Services LLP act as a marketing agency. All university names, logos, and trademarks mentioned are used for informational purposes only. We are not a university or an admission authority. Users are encouraged to verify information on the official website of the University before making decisions.
          </p>

          {/* Legal Links matching screenshot */}
          <div className="mt-3 text-[12px] sm:text-[13px] font-bold text-black flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => onOpenDisclaimer?.()}
              className="hover:underline cursor-pointer font-bold text-black border-none bg-transparent p-0"
            >
              Disclaimer
            </button>
            <span className="text-[#888] font-normal">|</span>
            <button
              type="button"
              onClick={() => onOpenTerms?.()}
              className="hover:underline cursor-pointer font-bold text-black border-none bg-transparent p-0"
            >
              Terms & Conditions
            </button>
            <span className="text-[#888] font-normal">|</span>
            <button
              type="button"
              onClick={() => onOpenPrivacy?.()}
              className="hover:underline cursor-pointer font-bold text-black border-none bg-transparent p-0"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      {/* Dark Navy Copyright Bar */}
      <div className="mini-footer-bottom mt-5 sm:mt-6 bg-[#082b4e] text-white text-center py-2 px-4 text-[11px] sm:text-[12px] pb-[75px] md:pb-2 tracking-wide font-normal">
        © {new Date().getFullYear()} SODE Counseling Services LLP
      </div>
    </footer>
  );
}
