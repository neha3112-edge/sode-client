"use client";

import React from "react";
import ClassicAbout from "./about/ClassicAbout";
import LpuAbout from "./about/LpuAbout";
import IimAbout from "./about/IimAbout";
import UuAbout from "./about/UuAbout";
import SsbmAbout from "./about/SsbmAbout";
import GalgotiasAbout from "./about/GalgotiasAbout";
import LiverpoolAbout from "./about/LiverpoolAbout";
import RushfordAbout from "./about/RushfordAbout";
import EsgciAbout from "./about/EsgciAbout";
import GguAbout from "./about/GguAbout";
import MuAbout from "./about/MuAbout";
import VguAbout from "./about/VguAbout";
import SmuAbout from "./about/SmuAbout";
import ManipalAbout from "./about/ManipalAbout";

/**
 * Reusable Registry of About Section Layouts.
 * Decouples university brand identity (slug) from visual layout rendering.
 */
const ABOUT_LAYOUTS = {
  classic: ClassicAbout,
  imageRight: ClassicAbout,
  lpu: LpuAbout,
  galgotias: GalgotiasAbout,
  iim: IimAbout,
  uu: UuAbout,
  ssbm: SsbmAbout,
  liverpool: LiverpoolAbout,
  rushford: RushfordAbout,
  esgci: EsgciAbout,
  ggu: GguAbout,
  mu: MuAbout,
  vgu: VguAbout,
  "vgu-banner": VguAbout,
  smu: SmuAbout,
  "smu-banner": SmuAbout,
  campusStats: ManipalAbout,
  manipal: ManipalAbout,
};

/**
 * LandingAbout Router & Container Component
 * Validates data, determines layout from JSON config, and delegates rendering.
 */
export default function LandingAbout({
  about = {},
  brand = {},
  leader = null,
  stats = [],
  onOpenApply,
}) {
  // 1. Validate data
  if (!about || Object.keys(about).length === 0 || brand.hideAbout) {
    return null;
  }

  // 2. Resolve layout from JSON configuration
  const layout = brand?.aboutLayout || about?.layout || "classic";
  const AboutComponent = ABOUT_LAYOUTS[layout] || ClassicAbout;

  // 3. Render matched layout component
  return (
    <AboutComponent
      about={about}
      brand={brand}
      leader={leader}
      stats={stats}
      onOpenApply={onOpenApply}
    />
  );
}
