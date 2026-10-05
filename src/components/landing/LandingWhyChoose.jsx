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
import ClassicWhyChoose from "./whychoose/ClassicWhyChoose";

/**
 * Reusable Why Choose / Key Features Section Router
 * Delegates rendering to modular sub-components based on brand layout.
 */
export default function LandingWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const layout = brand.whyChooseLayout || brand.slug;

  // 1. LPU Pedagogy & Support Services
  if (layout === "lpu" || brand.slug === "lpu") {
    return <LpuWhyChoose whyChoose={whyChoose} brand={brand} />;
  }

  // IIM Kozhikode Eligibility / Benefits
  if (layout === "iim" || brand.slug === "iim") {
    return <IimWhyChoose whyChoose={whyChoose} brand={brand} onOpenApply={onOpenApply} />;
  }

  if (!whyChoose?.length) return null;

  // 2. Galgotias Advantages Grid
  if (layout === "galgotias" || layout === "galgotias-grid" || brand.slug === "galgotias") {
    return <GalgotiasWhyChoose whyChoose={whyChoose} brand={brand} />;
  }

  // 3. Liverpool Stand Out
  if (layout === "liverpool" || brand.slug === "liverpool") {
    return <LiverpoolWhyChoose whyChoose={whyChoose} brand={brand} />;
  }

  // 4. Rushford Endless Benefits
  if (layout === "rushford" || brand.slug === "rushford") {
    return <RushfordWhyChoose whyChoose={whyChoose} brand={brand} onOpenApply={onOpenApply} />;
  }

  // 5. ESGCI Professional Advantages
  if (layout === "esgci" || brand.slug === "esgci") {
    return <EsgciWhyChoose whyChoose={whyChoose} brand={brand} onOpenApply={onOpenApply} />;
  }

  // 6. GGU Learning Outcomes
  if (layout === "ggu" || brand.slug === "ggu") {
    return <GguWhyChoose whyChoose={whyChoose} brand={brand} />;
  }

  // 7. Mangalayatan University (MU) Cards
  if (layout === "mu" || layout === "mu-cards" || brand.slug === "mu") {
    return <MuWhyChoose whyChoose={whyChoose} brand={brand} />;
  }

  // 8. VGU 3x2 Icons Grid
  if (layout === "vgu" || layout === "vgu-grid" || brand.slug === "vgu") {
    return <VguWhyChoose whyChoose={whyChoose} brand={brand} />;
  }

  // 9. Shoolini Checkerboard Grid
  if (layout === "checkerboard" || brand.slug === "shoolini") {
    return <ShooliniWhyChoose whyChoose={whyChoose} brand={brand} />;
  }

  // 10. SMU 3-Card Interactive Carousel
  if (layout === "smu-advantages" || brand.slug === "smu") {
    return <SmuWhyChooseCarousel whyChoose={whyChoose} brand={brand} />;
  }

  // 11. Manipal Infinite Slider
  if (layout === "slider" || brand.slug === "manipal") {
    return <SliderWhyChoose whyChoose={whyChoose} brand={brand} />;
  }

  // 12. Classic 2-Column with Student Image (Amity, etc.)
  return <ClassicWhyChoose whyChoose={whyChoose} brand={brand} onOpenApply={onOpenApply} />;
}
