import React from "react";

// =========================================================
// DEFAULT MEDIA LOGOS FOR FOOTER 2
// =========================================================
export const DEFAULT_MEDIA_LOGOS = [
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
export const DEFAULT_SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/distanceeducationschool/",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/distance_school/",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/distanceeducationschool/",
    icon: (
      <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
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
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
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
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#111111" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    href: "https://in.pinterest.com/deducationschool/",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.94-.12-2.38.02-3.41l1.04-4.41s-.27-.53-.27-1.32c0-1.24.72-2.17 1.62-2.17.76 0 1.13.57 1.13 1.26 0 .77-.49 1.92-.74 2.99-.21.9.45 1.63 1.34 1.63 1.61 0 2.85-1.7 2.85-4.15 0-2.17-1.56-3.69-3.79-3.69-2.58 0-4.09 1.94-4.09 3.93 0 .78.3 1.62.68 2.07a.34.34 0 0 1 .08.33c-.09.37-.29 1.17-.33 1.33-.05.22-.17.27-.39.16-1.46-.68-2.37-2.82-2.37-4.54 0-3.69 2.68-7.09 7.74-7.09 4.07 0 7.23 2.9 7.23 6.78 0 4.04-2.55 7.3-6.09 7.3-1.19 0-2.31-.62-2.69-1.35l-.73 2.8c-.27 1.02-.99 2.3-1.48 3.08A12.01 12.01 0 1 0 12 0z" />
      </svg>
    ),
  },
];

// =========================================================
// DEFAULT FOOTER NAVIGATION LINKS
// =========================================================
export const DEFAULT_NAV_LINKS = [
  { label: "About Us", href: "https://distanceeducationschool.com/about-us/" },
  { label: "Blogs", href: "https://distanceeducationschool.com/blogs/" },
  { label: "Contact Us", href: "https://distanceeducationschool.com/contact-us/" },
  { label: "Reviews", href: "https://distanceeducationschool.com/distance-education-school-reviews/" },
  { label: "Refund Policy", href: "https://distanceeducationschool.com/refund-policy/" },
  { label: "Privacy Policy", href: "https://distanceeducationschool.com/privacy-policy/", isPrivacy: true },
  { label: "Terms & Condition", href: "https://distanceeducationschool.com/terms-and-conditions/", isTerms: true },
];

export const DEFAULT_ADDRESS =
  "Registered Office: Unit No. 1, 3rd Floor Vardhman Trade Centre, Nehru Place, New Delhi - 110019";

export const DEFAULT_CLASSIC_DISCLAIMER =
  "SODE Counselling Services LLP act as a marketing agency. All university names, logos, and trademarks mentioned are used for informational purposes only. We are not a university or an admission authority. Users are encouraged to verify information on the official website of the University before making decisions.";

export const DEFAULT_COPYRIGHT_TEXT = `© ${new Date().getFullYear()} SODE Counseling Services LLP`;

/**
 * Legacy Layout Map for Backward Compatibility
 */
export const LEGACY_FOOTER_LAYOUT_MAP = {
  mu: "footer2",
};

/**
 * Resolves which footer layout to render
 */
export function resolveFooterLayout(variant, version, brand = {}) {
  if (variant === "footer2" || variant === "v2" || version === 2) {
    return "footer2";
  }
  if (brand.footerLayout === "footer2" || brand.footerVersion === 2) {
    return "footer2";
  }
  if (brand.slug && LEGACY_FOOTER_LAYOUT_MAP[brand.slug]) {
    return LEGACY_FOOTER_LAYOUT_MAP[brand.slug];
  }
  return brand.footerLayout || "classic";
}
