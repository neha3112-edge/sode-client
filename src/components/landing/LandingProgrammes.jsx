"use client";

import React from "react";
import GalgotiasGrid from "./programmes/GalgotiasGrid";
import LpuGrids from "./programmes/LpuGrids";
import VguGrid from "./programmes/VguGrid";
import ShooliniGrid from "./programmes/ShooliniGrid";
import ProgrammesCarousel from "./programmes/ProgrammesCarousel";
import MuGrid from "./programmes/MuGrid";

/**
 * Reusable Landing Programmes Section Router
 * Delegates rendering to modular sub-components based on brand configuration.
 */
export default function LandingProgrammes({
  programmes = [],
  universityName = "University Online",
  brand = {},
  title = "Online Degree Courses",
  intervalTime = 3500,
  onSelectCourseForBrochure,
  onOpenApply,
}) {
  if (!programmes?.length) return null;

  const layout = brand.programmesLayout || brand.slug;

  if (layout === "mu" || brand.slug === "mu") {
    return <MuGrid programmes={programmes} brand={brand} onSelectCourseForBrochure={onSelectCourseForBrochure} onOpenApply={onOpenApply} />;
  }

  if (layout === "galgotias" || layout === "galgotias-grid") {
    return <GalgotiasGrid programmes={programmes} brand={brand} onSelectCourseForBrochure={onSelectCourseForBrochure} />;
  }

  if (layout === "lpu" || layout === "lpu-grid") {
    return <LpuGrids programmes={programmes} onSelectCourseForBrochure={onSelectCourseForBrochure} />;
  }

  if (layout === "vgu-cards" || layout === "vgu-grid" || (brand.slug === "vgu" && layout !== "carousel")) {
    return <VguGrid programmes={programmes} brand={brand} onSelectCourseForBrochure={onSelectCourseForBrochure} onOpenApply={onOpenApply} />;
  }

  if (layout === "grid" || brand.slug === "shoolini") {
    return <ShooliniGrid programmes={programmes} brand={brand} universityName={universityName} onSelectCourseForBrochure={onSelectCourseForBrochure} onOpenApply={onOpenApply} />;
  }

  return (
    <ProgrammesCarousel
      programmes={programmes}
      universityName={universityName}
      brand={brand}
      title={title}
      intervalTime={intervalTime}
      onSelectCourseForBrochure={onSelectCourseForBrochure}
      onOpenApply={onOpenApply}
    />
  );
}
