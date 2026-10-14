"use client";

import React from "react";
import FooterClassic from "./footer/FooterClassic";
import FooterMedia from "./footer/FooterMedia";
import { resolveFooterLayout } from "./footer/footerDefaults";

/**
 * Universal Data-Driven Landing Footer Component
 *
 * Primary layout resolution is data-driven via:
 * - brand.footerLayout: "classic" | "footer2"
 * - brand.footerVersion: 1 | 2
 * - variant prop: "classic" | "footer2" | "v2"
 * - version prop: 1 | 2
 *
 * Backward-compatible with legacy slug mappings (e.g. brand.slug === "mu" -> "footer2").
 */
export default function LandingFooter({
  brand = {},
  variant,
  version,
  showMediaStrip = true,
  mediaLogos,
  socialLinks,
  footerLinks,
  registeredAddress,
  disclaimerText,
  copyrightText,
  onOpenDisclaimer,
  onOpenTerms,
  onOpenPrivacy,
  onOpenCompare,
}) {
  const layout = resolveFooterLayout(variant, version, brand);

  if (layout === "footer2") {
    return (
      <FooterMedia
        brand={brand}
        showMediaStrip={showMediaStrip}
        mediaLogos={mediaLogos}
        socialLinks={socialLinks}
        footerLinks={footerLinks}
        registeredAddress={registeredAddress}
        disclaimerText={disclaimerText}
        copyrightText={copyrightText}
        onOpenDisclaimer={onOpenDisclaimer}
        onOpenTerms={onOpenTerms}
        onOpenPrivacy={onOpenPrivacy}
      onOpenCompare={onOpenCompare}
      />
    );
  }

==================================================
  // VARIANT 1 (DEFAULT): Classic SODE Large Logo + Disclaimer Bar
  // =========================================================
  const footerText =
    disclaimerText ||
    brand.footerDisclaimer ||
    "SODE Counselling Services LLP act as a marketing agency. All university names, logos, and trademarks mentioned are used for informational purposes only. We are not a university or an admission authority. Users are encouraged to verify information on the official website of the University before making decisions.";

  const footerBgClass = brand.footerSectionBg || "bg-white";
  const footerLogoSrc =
    brand.footerLogo ||
    brand.desLogo ||
    brand.sodeFooterLogo ||
    (brand.sodeLogo && !brand.sodeLogo.includes("icon") && !brand.sodeLogo.includes("tm")
      ? brand.sodeLogo
      : "/assets/all_universities_images/ggu/new-des-logo.webp");

  const isCu = brand.slug === "cu";

  return (
    <footer
      className={`mini-footer ${footerBgClass} text-[#777777] pt-2 sm:pt-4 pb-0 relative select-none`}
      style={{ backgroundColor: brand.footerSectionBgColor || "#ffffff" }}
      id="footer-v1"
    >
      <div className="w-full max-w-full mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
        {/* SODE / Distance Education School Official Full Logo */}
        <div className="footer_sode_logo_container flex justify-center items-center mb-3 sm:mb-4">
          <button
            type="button"
            onClick={
              (brand.slug === "cu" || brand.slug === "galgotias") && onOpenCompare
                ? () => onOpenCompare()
                : handleScrollTop
            }
            className="inline-block cursor-pointer bg-transparent border-none p-0 transition-opacity hover:opacity-90"
            aria-label="Distance Education School"
          >
            <div className="relative w-[440px] sm:w-[620px] md:w-[740px] lg:w-[860px] xl:w-[960px] h-[110px] sm:h-[155px] md:h-[185px] lg:h-[215px] xl:h-[240px]">
              <Image
                src={footerLogoSrc}
                alt="Distance Education School - SODE School of Online & Distance Education"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 440px, (max-width: 768px) 620px, (max-width: 1024px) 860px, 960px"
                priority
              />
            </div>
          </button>
        </div>

        {/* Agency Disclaimer Text */}
        <div id="footer-bottom-bar" className="mt-2 sm:mt-3 px-3 sm:px-6 w-full max-w-[1100px] mx-auto text-center">
          <p className="m-0 text-[11px] sm:text-[12px] md:text-[12.5px] text-[#666666] leading-relaxed font-normal">
            {footerText}
          </p>

          {/* Legal Links */}
          <div className="mt-3 sm:mt-3.5 mb-2 sm:mb-3 text-[12.5px] sm:text-[13px] md:text-[13.5px] font-semibold text-[#111111] flex items-center justify-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => onOpenDisclaimer?.()}
              className="hover:underline hover:text-black cursor-pointer font-semibold text-[#111111] border-none bg-transparent p-0 transition-colors"
            >
              Disclaimer
            </button>
            <span className="text-[#888888] font-normal">|</span>
            <button
              type="button"
              onClick={() => onOpenTerms?.()}
              className="hover:underline hover:text-black cursor-pointer font-semibold text-[#111111] border-none bg-transparent p-0 transition-colors"
            >
              Terms & Conditions
            </button>
            <span className="text-[#888888] font-normal">|</span>
            <button
              type="button"
              onClick={() => onOpenPrivacy?.()}
              className="hover:underline hover:text-black cursor-pointer font-semibold text-[#111111] border-none bg-transparent p-0 transition-colors"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      {/* Brand Navy Copyright Bar (reusable across all landing pages) */}
      {!brand.hideFooterCopyright && (
        <div
          className="mini-footer-bottom mt-4 sm:mt-5 text-white py-2.5 pb-20 md:pb-2.5 px-4 sm:px-8 text-[12.5px] sm:text-[13px] tracking-wide font-normal transition-colors"
          style={{
            backgroundColor:
              brand.footerBottomBg ||
              "#0b3c66",
          }}
        >
          <div className="max-w-[1380px] mx-auto text-center">
            © {new Date().getFullYear()} SODE Counseling Services LLP
          </div>
        </div>
      )}
    </footer>
=======
  return (
    <FooterClassic
      brand={brand}
      disclaimerText={disclaimerText}
      copyrightText={copyrightText}
      onOpenDisclaimer={onOpenDisclaimer}
      onOpenTerms={onOpenTerms}
      onOpenPrivacy={onOpenPrivacy}
      onOpenCompare={onOpenCompare}
    />

  );
}
