import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DEFAULT_CLASSIC_DISCLAIMER } from "./footerDefaults";

/**
 * Footer Variant 1: Classic SODE Large Logo + Disclaimer Bar + Copyright Bar
 */
export default function FooterClassic({
  brand = {},
  disclaimerText,
  copyrightText,
  onOpenDisclaimer,
  onOpenTerms,
  onOpenPrivacy,
}) {
  const footerText =
    disclaimerText || brand.footerDisclaimer || DEFAULT_CLASSIC_DISCLAIMER;

  const footerBgClass = brand.footerSectionBg || "bg-white";

  const footerLogoSrc =
    brand.footerLogo ||
    brand.desLogo ||
    brand.sodeFooterLogo ||
    (brand.sodeLogo &&
    !brand.sodeLogo.includes("icon") &&
    !brand.sodeLogo.includes("tm")
      ? brand.sodeLogo
      : "/assets/all_universities_images/ggu/new-des-logo.webp");

  const handleScrollTop = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const copyrightContent =
    copyrightText ||
    brand.footerCopyright ||
    `© ${new Date().getFullYear()} SODE Counseling Services LLP`;

  return (
    <footer
      className={`mini-footer ${footerBgClass} text-[#777777] pt-0 sm:pt-1 pb-0 relative select-none`}
      style={{ backgroundColor: brand.footerSectionBgColor || "#ffffff" }}
      id="footer-v1"
    >
      <div className="w-full max-w-full mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
        {/* SODE / Distance Education School Official Full Logo */}
        <div className="footer_sode_logo_container flex justify-center items-center mb-3 sm:mb-4">
          <Link
            href="#hero"
            onClick={handleScrollTop}
            className="inline-block cursor-pointer"
            aria-label="Back to Top"
          >
            <div className="relative w-[340px] sm:w-[500px] md:w-[600px] lg:w-[680px] xl:w-[720px] h-[85px] sm:h-[125px] md:h-[150px] lg:h-[170px] xl:h-[180px]">
              <Image
                src={footerLogoSrc}
                alt="Distance Education School - SODE School of Online & Distance Education"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 340px, (max-width: 768px) 500px, (max-width: 1024px) 600px, 720px"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Agency Disclaimer Text */}
        <div
          id="footer-bottom-bar"
          className="mt-2.5 sm:mt-3 px-2 sm:px-6 w-full max-w-[1320px] mx-auto text-center"
        >
          <p className="m-0 text-[11px] sm:text-[12px] md:text-[12.5px] text-[#444444] leading-relaxed font-semibold">
            {footerText}
          </p>

          {/* Legal Links */}
          <div className="mt-2 sm:mt-2.5 mb-3 sm:mb-4 text-[12px] sm:text-[13px] md:text-[13.5px] font-bold text-[#111111] flex items-center justify-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => onOpenDisclaimer?.()}
              className="hover:underline hover:text-black cursor-pointer font-bold text-[#111111] border-none bg-transparent p-0 transition-colors"
            >
              Disclaimer
            </button>
            <span className="text-[#888888] font-normal" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => onOpenTerms?.()}
              className="hover:underline hover:text-black cursor-pointer font-bold text-[#111111] border-none bg-transparent p-0 transition-colors"
            >
              Terms & Conditions
            </button>
            <span className="text-[#888888] font-normal" aria-hidden="true">
              |
            </span>
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

      {/* Brand Navy Copyright Bar (reusable across all landing pages) */}
      {!brand.hideFooterCopyright && (
        <div
          className="mini-footer-bottom mt-3 sm:mt-5 text-white pt-2.5 pb-[76px] lg:pb-2.5 px-4 sm:px-8 text-[12px] sm:text-[14px] tracking-wide font-normal transition-colors"
          style={{
            backgroundColor:
              brand.footerBottomBg ||
              brand.primaryColor ||
              brand.footerBg ||
              "#003468",
          }}
        >
          <div className="max-w-[1380px] mx-auto text-center">
            {copyrightContent}
          </div>
        </div>
      )}
    </footer>
  );
}
