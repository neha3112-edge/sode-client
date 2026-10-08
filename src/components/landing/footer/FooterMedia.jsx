import React from "react";
import FooterMediaLogos from "./FooterMediaLogos";
import FooterSocialLinks from "./FooterSocialLinks";
import FooterNavigation from "./FooterNavigation";
import {
  DEFAULT_MEDIA_LOGOS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_ADDRESS,
  DEFAULT_COPYRIGHT_TEXT,
} from "./footerDefaults";

/**
 * Footer Variant 2: Media Strip + Dark Layout + Social Links + Nav Links + Address + Disclaimer
 */
export default function FooterMedia({
  brand = {},
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
}) {
  const universityName = brand.shortName || brand.name || "the University";

  const activeMediaLogos =
    mediaLogos || brand.footerMediaLogos || DEFAULT_MEDIA_LOGOS;

  const activeSocialLinks =
    socialLinks || brand.footerSocialLinks || DEFAULT_SOCIAL_LINKS;

  const activeAddress =
    registeredAddress || brand.footerAddress || DEFAULT_ADDRESS;

  const activeDisclaimer =
    disclaimerText ||
    brand.footerDisclaimer ||
    `This information is provided by SODE Counselling Services LLP. All university names, logos, and trademarks mentioned are used for informational purposes only. We are not a university or an admission authority. Users are encouraged to verify information on the official website of ${universityName} before making decisions.`;

  const activeCopyright =
    copyrightText || brand.footerCopyright || DEFAULT_COPYRIGHT_TEXT;

  return (
    <footer className="footer-version-2 w-full select-none" id="footer-v2">
      {/* 1. Media Publications Strip */}
      {showMediaStrip && activeMediaLogos?.length > 0 && (
        <FooterMediaLogos mediaLogos={activeMediaLogos} />
      )}

      {/* 2. Main Dark Footer Section */}
      <div
        className={
          brand.footerMainClassName ||
          "mini-footer-dark bg-[#111111] text-[#777777] pt-4 sm:pt-5 pb-3.5 sm:pb-4 px-3 sm:px-6"
        }
      >
        <div className="w-full max-w-[1380px] mx-auto text-center flex flex-col items-center">
          {/* Social Icons */}
          <FooterSocialLinks socialLinks={activeSocialLinks} />

          {/* Footer Navigation Links */}
          <FooterNavigation
            footerLinks={footerLinks || brand.footerNavLinks}
            onOpenPrivacy={onOpenPrivacy}
            onOpenTerms={onOpenTerms}
          />

          {/* Registered Office Address */}
          <p className="footer-address text-[12.5px] sm:text-[13.5px] text-[#777777] font-normal leading-normal m-0 max-w-[800px]">
            {activeAddress}
          </p>

          {/* Divider Line In Between */}
          <div
            className="w-full border-t border-[#808080] mt-7 mb-5"
            style={{ borderColor: brand.footerDividerColor || "#262626" }}
          />

          {/* Legal / University Disclaimer */}
          <div className="footer-disclaimer-content text-center w-full max-w-[1360px] mx-auto px-2">
            <p className="text-[13px] sm:text-[13.8px] text-[#ffffff] leading-[1.5] font-normal m-0">
              {activeDisclaimer}
            </p>

            {/* Clickable Orange Disclaimer Link */}
            <button
              type="button"
              onClick={() => onOpenDisclaimer?.()}
              className="disclaimer-orange-btn text-[#f97316] font-bold text-[14px] sm:text-[14.5px] underline hover:text-[#fb923c] cursor-pointer inline-block mt-1 transition-colors border-none bg-transparent p-0"
            >
              Disclaimer
            </button>
          </div>
        </div>
      </div>

      {/* 3. Navy Blue Copyright Bar */}
      <div
        className={
          brand.footerBottomClassName ||
          "mini-footer-bottom bg-[#0b3c66] text-white text-center pt-2.5 pb-[76px] lg:pb-2.5 px-4 text-[12px] sm:text-[14px] font-normal tracking-wide"
        }
        style={{ backgroundColor: brand.footerBottomBg || "#0b3c66" }}
      >
        {activeCopyright}
      </div>
    </footer>
  );
}
