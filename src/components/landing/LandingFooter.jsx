"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function LandingFooter({
  brand = {},
  disclaimerText,
  onOpenDisclaimer,
  onOpenTerms,
  onOpenPrivacy,
}) {
  const footerText =
    disclaimerText ||
    brand.footerDisclaimer ||
    "SODE Counselling Services LLP act as a marketing agency. All university names, logos, and trademarks mentioned are used for informational purposes only. We are not a university or an admission authority. Users are encouraged to verify information on the official website of the University before making decisions.";

  const handleScrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mini-footer bg-[#f6f8fa] text-[#777] pt-4 sm:pt-6 relative">
      <div className="max-w-full mx-auto px-4 sm:px-11 text-center">
        {/* SODE / Distance Education School Official Full Logo */}
        <div className="footer_sode_logo_container flex justify-center items-center">
          <Link
            href="#hero"
            onClick={handleScrollTop}
            className="inline-block cursor-pointer"
            aria-label="Back to Top"
          >
            <div className="relative w-75 sm:w-210 h-28 sm:h-48">
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
          <p className="m-0 text-[11px] sm:text-[12.5px] text-[#555] leading-relaxed max-w-full mx-auto">
            {footerText}
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
      <div className="mini-footer-bottom mt-5 sm:mt-6 bg-[#082b4e] text-white text-center py-2 px-4 text-[11px] sm:text-[12px] pb-18.75 md:pb-2 tracking-wide font-normal">
        © {new Date().getFullYear()} SODE Counseling Services LLP
      </div>
    </footer>
  );
}
