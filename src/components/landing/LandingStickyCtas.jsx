"use client";

import React from "react";
import { resolveStickyCtaConfig } from "./sticky/stickyCtaConfig";
import StickyFloatingActions from "./sticky/StickyFloatingActions";
import StickyBottomBar from "./sticky/StickyBottomBar";
import IimStickyCta from "./sticky/IimStickyCta";

/**
 * Global Configuration-Driven Landing Sticky CTAs Component
 *
 * Normalizes brand and page configuration to drive:
 * - Layout variants ("default" | "iim")
 * - Floating Call button (responsive mobile/desktop visibility & custom images)
 * - Floating Scholarship Gift button (confetti animation & custom vouchers)
 * - Sticky Bottom Action Strip (brochure action/icon & apply button styling)
 *
 * All university-specific identity checks (e.g. brand.slug === "...") have been
 * eliminated from JSX in favor of declarative configuration.
 */
export default function LandingStickyCtas({
  brand = {},
  onOpenApply,
  onOpenBrochure,
  onOpenScholarship,
  onOpenCompare,
}) {
  const config = resolveStickyCtaConfig(brand);

  if (config.layout === "iim") {
    return (
      <IimStickyCta
        config={config}
        onOpenApply={onOpenApply}
        onOpenBrochure={onOpenBrochure}
        onOpenScholarship={onOpenScholarship}
      />
    );
  }

  return (
    <>
      <StickyFloatingActions
        config={config}
        onOpenScholarship={onOpenScholarship}
      />
      <StickyBottomBar
        config={config}
        onOpenApply={onOpenApply}
        onOpenBrochure={onOpenBrochure}
      />
    </>
  );
}
