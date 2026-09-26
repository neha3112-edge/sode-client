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
    <footer className="mini-footer bg-[#f6f8fa] text-[#777777] pt-4 sm:pt-6 relative select-none">
      <div className="w-full max-w-full mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
        {/* SODE / Distance Education School Official Full Logo (Large like First Image) */}
        <div className="footer_sode_logo_container flex justify-center items-center">
          <Link
            href="#hero"
            onClick={handleScrollTop}
            className="inline-block cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
            aria-label="Back to Top"
          >
            <div className="relative w-[320px] sm:w-[520px] md:w-[600px] lg:w-[640px] h-[95px] sm:h-[155px] md:h-[180px] lg:h-[190px]">
              <Image
                src={brand.sodeLogo || "/assets/images/new-des-logo.webp"}
                alt="Distance Education School - SODE School of Online & Distance Education"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 320px, (max-width: 768px) 520px, 640px"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Agency Disclaimer Text (Grey & 2-line layout matching First Image) */}
        <div id="footer-bottom-bar" className="mt-2 sm:mt-2.5 px-2 sm:px-6 w-full max-w-[1240px] mx-auto text-center">
          <p className="m-0 text-[11.5px] sm:text-[12.5px] text-[#777777] leading-relaxed font-normal">
            {footerText}
          </p>

          {/* Legal Links matching live reference */}
          <div className="mt-2.5 sm:mt-3 text-[12px] sm:text-[13px] font-bold text-[#111111] flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => onOpenDisclaimer?.()}
              className="hover:underline hover:text-black cursor-pointer font-bold text-[#111111] border-none bg-transparent p-0 transition-colors"
            >
              Disclaimer
            </button>
            <span className="text-[#888888] font-normal">|</span>
            <button
              type="button"
              onClick={() => onOpenTerms?.()}
              className="hover:underline hover:text-black cursor-pointer font-bold text-[#111111] border-none bg-transparent p-0 transition-colors"
            >
              Terms & Conditions
            </button>
            <span className="text-[#888888] font-normal">|</span>
            <button
              type="button"
              onClick={() => onOpenPrivacy?.()}
              className="hover:underline hover:text-black cursor-pointer font-bold text-[#111111] border-none bg-transparent p-0 transition-colors"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      {/* Dark Navy Copyright Bar */}
      <div
        className="mini-footer-bottom mt-5 sm:mt-6 text-white text-center py-2.5 px-4 text-[13px] sm:text-[14px] pb-20 md:pb-2.5 tracking-wide font-normal"
        style={{ backgroundColor: brand.footerBg || "#010d2a" }}
      >
        © {new Date().getFullYear()} SODE Counseling Services LLP
      </div>
    </footer>
  );
}
