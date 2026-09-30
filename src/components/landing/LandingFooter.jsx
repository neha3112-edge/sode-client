"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// =========================================================
// DEFAULT MEDIA LOGOS FOR FOOTER 2
// =========================================================
const DEFAULT_MEDIA_LOGOS = [
  {
    src: "/assets/media/hindustan-times.webp",
    alt: "Hindustan Times",
    width: 170,
    height: 38,
  },
  {
    src: "/assets/media/mid-day.webp",
    alt: "Mid-day",
    width: 130,
    height: 38,
  },
  {
    src: "/assets/media/latestly.webp",
    alt: "LATESTLY",
    width: 145,
    height: 38,
  },
  {
    src: "/assets/media/the-print.webp",
    alt: "ThePrint",
    width: 140,
    height: 38,
  },
  {
    src: "/assets/media/ani-news.png",
    alt: "ANI - South Asia Leading Multimedia News Agency",
    width: 135,
    height: 38,
  },
];

// =========================================================
// DEFAULT SOCIAL ICONS FOR FOOTER 2
// =========================================================
const DEFAULT_SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/distanceeducationschool/",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/distance_school/",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/distanceeducationschool/",
    icon: (
      <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://in.linkedin.com/company/distanceeducationschool/",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCw9KLsERm_EzL2js_s7GbLQ/",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#111111" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    href: "https://in.pinterest.com/deducationschool/",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.94-.12-2.38.02-3.41l1.04-4.41s-.27-.53-.27-1.32c0-1.24.72-2.17 1.62-2.17.76 0 1.13.57 1.13 1.26 0 .77-.49 1.92-.74 2.99-.21.9.45 1.63 1.34 1.63 1.61 0 2.85-1.7 2.85-4.15 0-2.17-1.56-3.69-3.79-3.69-2.58 0-4.09 1.94-4.09 3.93 0 .78.3 1.62.68 2.07a.34.34 0 0 1 .08.33c-.09.37-.29 1.17-.33 1.33-.05.22-.17.27-.39.16-1.46-.68-2.37-2.82-2.37-4.54 0-3.69 2.68-7.09 7.74-7.09 4.07 0 7.23 2.9 7.23 6.78 0 4.04-2.55 7.3-6.09 7.3-1.19 0-2.31-.62-2.69-1.35l-.73 2.8c-.27 1.02-.99 2.3-1.48 3.08A12.01 12.01 0 1 0 12 0z" />
      </svg>
    ),
  },
];

/**
 * Universal Landing Footer Component
 * 
 * Supports both Footer 1 (Classic SODE) and Footer 2 (Media Strip + Dark Multi-link Footer)
 * controlled via:
 * - variant="footer2" OR version={2}
 * - brand.footerLayout === "footer2" OR brand.footerVersion === 2 OR brand.slug === "mu"
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
}) {
  const universityName = brand.shortName || brand.name || "the University";

  // Check if Footer 2 (Media Strip + Dark Layout) is requested
  const isFooter2 =
    variant === "footer2" ||
    variant === "v2" ||
    version === 2 ||
    brand.footerLayout === "footer2" ||
    brand.footerVersion === 2 ||
    brand.slug === "mu";

  const handleScrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // =========================================================
  // VARIANT 2: Media Strip + Dark Layout + Social Icons + Address
  // =========================================================
  if (isFooter2) {
    const activeMediaLogos = mediaLogos || brand.footerMediaLogos || DEFAULT_MEDIA_LOGOS;
    const activeSocialLinks = socialLinks || brand.footerSocialLinks || DEFAULT_SOCIAL_LINKS;

    const defaultFooterLinks = [
      { label: "About Us", href: "https://distanceeducationschool.com/about-us/" },
      { label: "Blogs", href: "https://distanceeducationschool.com/blogs/" },
      { label: "Contact Us", href: "https://distanceeducationschool.com/contact-us/" },
      { label: "Reviews", href: "https://distanceeducationschool.com/distance-education-school-reviews/" },
      { label: "Refund Policy", href: "https://distanceeducationschool.com/refund-policy/" },
      {
        label: "Privacy Policy",
        href: "https://distanceeducationschool.com/privacy-policy/",
        onClick: onOpenPrivacy ? (e) => { e.preventDefault(); onOpenPrivacy(); } : undefined,
      },
      {
        label: "Terms & Condition",
        href: "https://distanceeducationschool.com/terms-and-conditions/",
        onClick: onOpenTerms ? (e) => { e.preventDefault(); onOpenTerms(); } : undefined,
      },
    ];

    const activeFooterLinks = footerLinks || brand.footerNavLinks || defaultFooterLinks;

    const activeAddress =
      registeredAddress ||
      brand.footerAddress ||
      "Registered Office: Unit No. 1, 3rd Floor Vardhman Trade Centre, Nehru Place, New Delhi - 110019";

    const activeDisclaimer =
      disclaimerText ||
      brand.footerDisclaimer ||
      `This information is provided by SODE Counselling Services LLP. All university names, logos, and trademarks mentioned are used for informational purposes only. We are not a university or an admission authority. Users are encouraged to verify information on the official website of ${universityName} before making decisions.`;

    const activeCopyright =
      copyrightText ||
      brand.footerCopyright ||
      `© ${new Date().getFullYear()} SODE Counseling Services LLP`;

    return (
      <footer className="footer-version-2 w-full select-none" id="footer-v2">
        {/* 1. Media Publications Strip */}
        {showMediaStrip && activeMediaLogos?.length > 0 && (
          <section className="media-footer-strip bg-[#fafafa] border-t border-[#eeeeee] py-5 px-4 sm:px-6">
            <div className="media-footer-container max-w-[1200px] mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-6 sm:gap-8">
              {activeMediaLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="media-logo flex items-center justify-center flex-1 min-w-[100px] sm:min-w-[120px] max-w-[190px]"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt || "Media Logo"}
                    width={logo.width || 150}
                    height={logo.height || 36}
                    className="h-7 sm:h-8 md:h-9 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </section>
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
            <div className="social-icons flex items-center justify-center gap-3.5 sm:gap-4 mb-2">
              {activeSocialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="text-white hover:text-[#f97316] transition-colors p-1 inline-flex items-center justify-center hover:scale-110 duration-200"
                >
                  <span className="flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
                    {item.icon}
                  </span>
                </a>
              ))}
            </div>

            {/* Footer Navigation Links */}
            <div className="footer-links flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-5 gap-y-1 mb-1.5 text-[14px] sm:text-[14.5px]">
              {activeFooterLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href || "#"}
                  onClick={link.onClick}
                  target={link.onClick ? undefined : "_blank"}
                  rel={link.onClick ? undefined : "noopener noreferrer"}
                  className="text-[#1e90ff] hover:text-[#60a5fa] hover:underline font-normal transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

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
            "mini-footer-bottom bg-[#0b3c66] text-white text-center py-2.5 px-4 text-[13px] sm:text-[14px] pb-20 md:pb-2.5 font-normal tracking-wide"
          }
          style={{ backgroundColor: brand.footerBottomBg || "#0b3c66" }}
        >
          {activeCopyright}
        </div>
      </footer>
    );
  }

  // =========================================================
  // VARIANT 1 (DEFAULT): Classic SODE Large Logo + Disclaimer Bar
  // =========================================================
  const footerText =
    disclaimerText ||
    brand.footerDisclaimer ||
    "SODE Counselling Services LLP act as a marketing agency. All university names, logos, and trademarks mentioned are used for informational purposes only. We are not a university or an admission authority. Users are encouraged to verify information on the official website of the University before making decisions.";

  return (
    <footer className="mini-footer bg-[#f6f8fa] text-[#777777] pt-4 sm:pt-6 relative select-none" id="footer-v1">
      <div className="w-full max-w-full mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
        {/* SODE / Distance Education School Official Full Logo */}
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

        {/* Agency Disclaimer Text */}
        <div id="footer-bottom-bar" className="mt-2 sm:mt-2.5 px-2 sm:px-6 w-full max-w-[1240px] mx-auto text-center">
          <p className="m-0 text-[11.5px] sm:text-[12.5px] text-[#777777] leading-relaxed font-normal">
            {footerText}
          </p>

          {/* Legal Links */}
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
