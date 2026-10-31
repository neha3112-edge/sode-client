import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DEFAULT_CLASSIC_DISCLAIMER,
  DEFAULT_DISCLAIMER_CONTAINER_CLASS,
  DEFAULT_DISCLAIMER_TEXT_CLASS,
} from "./footerDefaults";

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

  const footerBgClass = brand.footerSectionBg || "bg-[#f6f8fa]";
  const footerBgColor =
    brand.footerSectionBgColor && brand.footerSectionBgColor !== "#ffffff"
      ? brand.footerSectionBgColor
      : "#f6f8fa";

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
      className={`mini-footer ${footerBgClass} text-[#777777] pt-4 sm:pt-6 pb-0 relative select-none`}
      style={{ backgroundColor: footerBgColor }}
      id="footer-v1"
    >
      <div className="w-full max-w-full mx-auto px-0 sm:px-0 text-center flex flex-col items-center">
        {/* SODE / Distance Education School Official Full Logo */}
        <div className="footer_sode_logo_container flex justify-center items-center mb-3 sm:mb-4">
          <Link
            href="#hero"
            onClick={handleScrollTop}
            className="inline-block cursor-pointer"
            aria-label="Back to Top"
          >
            <div className="relative w-[260px] sm:w-[340px] md:w-[420px] lg:w-[680px] xl:w-[740px] 2xl:w-[780px] h-[70px] sm:h-[90px] md:h-[110px] lg:h-[178px] xl:h-[194px] 2xl:h-[204px]">
              <Image
                src={footerLogoSrc}
                alt="Distance Education School - SODE School of Online & Distance Education"
                fill
                className="object-contain"
                sizes="(max-width: 639px) 360px, (max-width: 767px) 520px, (max-width: 1023px) 640px, (max-width: 1399px) 620px, 920px"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Agency Disclaimer Text */}
        <div
          id="footer-bottom-bar"
          className={
            brand.disclaimerContainerClassName ||
            DEFAULT_DISCLAIMER_CONTAINER_CLASS
          }
        >
          <p
            className={
              brand.disclaimerTextClassName ||
              DEFAULT_DISCLAIMER_TEXT_CLASS
            }
          >
            {footerText}
          </p>

          {/* Legal Links */}
          <div className="mt-3.5 sm:mt-4 md:mt-4 lg:mt-4 mb-3.5 sm:mb-4 md:mb-5 lg:mb-2.5 text-[15px] sm:text-[13.5px] md:text-[13.5px] lg:text-[14.5px] font-medium text-[#111111] flex items-center justify-center flex-wrap gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={() => onOpenDisclaimer?.()}
              className="hover:underline hover:text-black cursor-pointer  text-[#000000] border-none bg-transparent p-0 transition-colors tracking-tight"
            >
              Disclaimer
            </button>
            <span className="text-[#888888] font-normal px-1" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => onOpenTerms?.()}
              className="hover:underline hover:text-black cursor-pointer  text-[#000000] border-none bg-transparent p-0 transition-colors tracking-tight"
            >
              Terms & Conditions
            </button>
            <span className="text-[#888888] font-normal px-1" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => onOpenPrivacy?.()}
              className="hover:underline hover:text-black cursor-pointer  text-[#000000] border-none bg-transparent p-0 transition-colors tracking-tight"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      {/* Brand Navy Copyright Bar (reusable across all landing pages) */}
      {!brand.hideFooterCopyright && (
        <div
          className="mini-footer-bottom text-white pt-2 pb-[76px] lg:pb-2 px-4 sm:px-8 text-[13.5px] sm:text-[12px] lg:text-[14px] tracking-wide font-normal transition-colors"
          style={{
            backgroundColor:
              brand.footerBottomBg ||
              "#0b3c66",
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
