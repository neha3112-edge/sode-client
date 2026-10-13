"use client";

import React from "react";
import { APPROVAL_LAYOUTS } from "./approvalLayouts";

/**
 * Clean & Modular Landing Approvals Component
 *
 * ARCHITECTURE:
 * - 100% University-agnostic and data-driven.
 * - Uses a Layout Registry (`APPROVAL_LAYOUTS`) instead of chained if/else statements.
 * - Individual layout implementations are isolated in `./layouts/`.
 * - Approval data is normalized through `ApprovalCard` utilities.
 */
export default function LandingApprovals({
  approvals = [],
  keyHighlights = [],
  universityName,
  brand = {},
  title = "Recognition and Approvals",
  bannerBg,
  showTags = false,
}) {
  if (!approvals || approvals.length === 0) return null;

  const layoutKey =
    brand?.approvalsLayout ||
    brand?.slug ||
    "classic";

  const LayoutComponent =
    APPROVAL_LAYOUTS[layoutKey] ||
    APPROVAL_LAYOUTS.classic;

  const activeUni = universityName || brand?.name || "University Online";
  const activeTitle = brand?.approvalsTitle || title;
  const subtitle = brand?.approvalsSubtitle || brand?.approvalsDescription || null;

  return (
    <LayoutComponent
      approvals={approvals}
      keyHighlights={keyHighlights}
      universityName={activeUni}
      activeUniversity={activeUni}
      brand={brand}
      title={activeTitle}
      activeTitle={activeTitle}
      subtitle={subtitle}
      bannerBg={bannerBg}
      showTags={showTags}
    />
  );
}
