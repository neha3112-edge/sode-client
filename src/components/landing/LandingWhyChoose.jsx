"use client";

import React from "react";
import LpuWhyChoose from "./whychoose/LpuWhyChoose";
import GalgotiasWhyChoose from "./whychoose/GalgotiasWhyChoose";
import VguWhyChoose from "./whychoose/VguWhyChoose";
import ShooliniWhyChoose from "./whychoose/ShooliniWhyChoose";
import SmuWhyChooseCarousel from "./whychoose/SmuWhyChooseCarousel";
import SliderWhyChoose from "./whychoose/SliderWhyChoose";
import MuWhyChoose from "./whychoose/MuWhyChoose";
import LiverpoolWhyChoose from "./whychoose/LiverpoolWhyChoose";
import RushfordWhyChoose from "./whychoose/RushfordWhyChoose";
import EsgciWhyChoose from "./whychoose/EsgciWhyChoose";
import GguWhyChoose from "./whychoose/GguWhyChoose";
import IimWhyChoose from "./whychoose/IimWhyChoose";
import IiitbWhyChoose from "./whychoose/IiitbWhyChoose";
import UuWhyChoose from "./whychoose/UuWhyChoose";
import SsbmWhyChoose from "./whychoose/SsbmWhyChoose";
import ClassicWhyChoose from "./whychoose/ClassicWhyChoose";

/**
 * Registry of available Why Choose layouts.
 * Separates layout rendering strategy from university identity (slug).
 */
const WHY_CHOOSE_LAYOUTS = {
  lpu: LpuWhyChoose,
  iim: IimWhyChoose,
  uu: UuWhyChoose,
  iiitb: IiitbWhyChoose,
  ssbm: SsbmWhyChoose,
  galgotias: GalgotiasWhyChoose,
  "galgotias-grid": GalgotiasWhyChoose,
  liverpool: LiverpoolWhyChoose,
  rushford: RushfordWhyChoose,
  esgci: EsgciWhyChoose,
  ggu: GguWhyChoose,
  mu: MuWhyChoose,
  "mu-cards": MuWhyChoose,
  vgu: VguWhyChoose,
  "vgu-grid": VguWhyChoose,
  checkerboard: ShooliniWhyChoose,
  shoolini: ShooliniWhyChoose,
  "smu-advantages": SmuWhyChooseCarousel,
  smu: SmuWhyChooseCarousel,
  slider: SliderWhyChoose,
  manipal: SliderWhyChoose,
  classic: ClassicWhyChoose,
};

/**
 * Reusable Why Choose / Key Features Section Router & Container
 * Validates data, looks up layout from registry, and delegates rendering to modular layout component.
 */
export default function LandingWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  // 1. Guard against empty data before layout resolution
  if (!Array.isArray(whyChoose) || whyChoose.length === 0) {
    return null;
  }

  // 2. Resolve layout purely from configuration
  const layout = brand?.whyChooseLayout || "classic";
  const WhyChooseComponent = WHY_CHOOSE_LAYOUTS[layout] || ClassicWhyChoose;

  // 3. Render matched layout component
  return (
    <WhyChooseComponent
      whyChoose={whyChoose}
      brand={brand}
      onOpenApply={onOpenApply}
    />
  );
}
