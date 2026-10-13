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
      />
    );
  }

  return (
    <FooterClassic
      brand={brand}
      disclaimerText={disclaimerText}
      copyrightText={copyrightText}
      onOpenDisclaimer={onOpenDisclaimer}
      onOpenTerms={onOpenTerms}
      onOpenPrivacy={onOpenPrivacy}
    />
  );
}
