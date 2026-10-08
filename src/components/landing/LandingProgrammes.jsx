"use client";

import React from "react";
import GalgotiasGrid from "./programmes/GalgotiasGrid";
import LpuGrids from "./programmes/LpuGrids";
import VguGrid from "./programmes/VguGrid";
import ShooliniGrid from "./programmes/ShooliniGrid";
import MuGrid from "./programmes/MuGrid";
import LiverpoolProgrammes from "./programmes/LiverpoolProgrammes";
import RushfordProgrammes from "./programmes/RushfordProgrammes";
import EsgciProgrammes from "./programmes/EsgciProgrammes";
import GguProgrammes from "./programmes/GguProgrammes";
import IiitbProgrammes from "./programmes/IiitbProgrammes";
import UuProgrammes from "./programmes/UuProgrammes";
import SsbmProgrammes from "./programmes/SsbmProgrammes";
import ProgrammesCarousel from "./programmes/ProgrammesCarousel";

/**
 * Layout Aliases Map: Normalizes legacy and variant layout names to canonical keys.
 */
const PROGRAMME_LAYOUT_ALIASES = {
  "galgotias-grid": "galgotias",
  "lpu-grid": "lpu",
  "mu-tabs": "mu",
  tabs: "mu",
  mangalayatan: "mu",
  "vgu-cards": "vgu",
  "vgu-grid": "vgu",
  grid: "shoolini",
};

/**
 * Programme Layouts Registry Map:
 * Maps canonical layout identifiers to specialized presentation components.
 */
const PROGRAMME_LAYOUTS = {
  carousel: ProgrammesCarousel,
  galgotias: GalgotiasGrid,
  lpu: LpuGrids,
  liverpool: LiverpoolProgrammes,
  rushford: RushfordProgrammes,
  esgci: EsgciProgrammes,
  uu: UuProgrammes,
  iiitb: IiitbProgrammes,
  ssbm: SsbmProgrammes,
  ggu: GguProgrammes,
  mu: MuGrid,
  vgu: VguGrid,
  shoolini: ShooliniGrid,
};

/**
 * Reusable Landing Programmes Section Router
 * Resolves layout dynamically through registry map with backwards-compatible alias normalization.
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

  // Resolve raw layout identifier from brand config (with legacy slug fallback)
  const rawLayout = brand.programmesLayout || brand.slug || "carousel";

  // Normalize aliases (e.g. "galgotias-grid" -> "galgotias", "grid" -> "shoolini")
  const normalizedKey = PROGRAMME_LAYOUT_ALIASES[rawLayout] || rawLayout;

  // Lookup matched layout component from registry, falling back to reusable ProgrammesCarousel
  const ProgrammeComponent = PROGRAMME_LAYOUTS[normalizedKey] || ProgrammesCarousel;

  return (
    <ProgrammeComponent
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
