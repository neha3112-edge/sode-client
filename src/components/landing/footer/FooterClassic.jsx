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
  onOpenCompare,
}) {
  const footerText =
    disclaimerText || brand.footerDisclaimer || DEFAULT_CLASSIC_DISCLAIMER;

  const footerBgClass = brand.footerSectionBg || "bg-[#f6f8fa]";
  const footerBgColor =
    brand.footerSectionBgColor && brand.footerSectionBgColor !== "#ffffff"
      ? brand.footerSectionBgColor
      : (brand.footerSectionBgColor || "#f6f8fa");

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
    if ((brand.slug === "cu" || brand.slug === "galgotias") && onOpenCompare) {
      onOpenCompare();
    } else if (typeof window !== "undefined") {
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
      <div className="w-full max-w-full mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
        {/* SODE / Distance Education School Official Full Logo */}
        <div className="footer_sode_logo_container flex justify-center items-center mb-3 sm:mb-4">
          <Link
            href="#hero"
            onClick={handleScrollTop}
            className="inline-block cursor-pointer"
            aria-label="Back to Top"
          >
            <div className={`relative ${brand.footerLogoContainerClassName || "w-[240px] sm:w-[320px] md:w-[420px] lg:w-[480px] xl:w-[540px] h-[63px] sm:h-[84px] md:h-[110px] lg:h-[125px] xl:h-[141px]"}`}>
              <Image
                src={footerLogoSrc}
                alt="Distance Education School - SODE School of Online & Distance Education"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 360px, (max-width: 768px) 520px, (max-width: 1024px) 640px, 780px"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Agency Disclaimer Text */}
        <div
          id="footer-bottom-bar"
          className={`mt-1.5 sm:mt-2 px-2 sm:px-6 w-full ${brand.footerDisclaimerContainerClassName || "max-w-[1090px] lg:max-w-none"} mx-auto text-center`}
        >
          <p className={`m-0 text-[11px] sm:text-[11.5px] md:text-[12px] ${brand.footerDisclaimerClassName || "lg:text-[10px] xl:text-[11px] min-[1400px]:text-[11.5px] min-[1600px]:text-[12px] lg:whitespace-nowrap"} text-[#666666] leading-[1.62] font-normal tracking-[0.15px]`}>
            {footerText}
          </p>

          {/* Legal Links */}
          <div className="mt-3.5 sm:mt-4 mb-3.5 sm:mb-4 text-[13px] sm:text-[14px] font-normal text-[#111111] flex items-center justify-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => onOpenDisclaimer?.()}
              className="hover:underline hover:text-black cursor-pointer font-normal text-[#111111] border-none bg-transparent p-0 transition-colors"
            >
              Disclaimer
            </button>
            <span className="text-[#999999] font-normal px-0.5" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => onOpenTerms?.()}
              className="hover:underline hover:text-black cursor-pointer font-normal text-[#111111] border-none bg-transparent p-0 transition-colors"
            >
              Terms & Conditions
            </button>
            <span className="text-[#999999] font-normal px-0.5" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              onClick={() => onOpenPrivacy?.()}
              className="hover:underline hover:text-black cursor-pointer font-normal text-[#111111] border-none bg-transparent p-0 transition-colors"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      {/* Brand Navy Copyright Bar (reusable across all landing pages) */}
      {!brand.hideFooterCopyright && (
        <div
          className="mini-footer-bottom text-white pt-2.5 pb-[78px] lg:pb-2.5 px-4 sm:px-8 text-[13.5px] sm:text-[14px] tracking-wide font-normal transition-colors"
          style={{
            backgroundColor:
              brand.footerBottomBg ||
              brand.primaryColor ||
              brand.footerBg ||
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
