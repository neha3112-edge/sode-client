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

  if (layout === "galgotias" || layout === "galgotias-grid" || brand.slug === "galgotias") {
    return (
      <GalgotiasGrid
        programmes={programmes}
        brand={brand}
        onSelectCourseForBrochure={onSelectCourseForBrochure}
      />
    );
  }

  if (layout === "lpu" || layout === "lpu-grid" || brand.slug === "lpu") {
    return (
      <LpuGrids
        programmes={programmes}
        onSelectCourseForBrochure={onSelectCourseForBrochure}
      />
    );
  }

  if (layout === "liverpool" || brand.slug === "liverpool") {
    return (
      <LiverpoolProgrammes
        programmes={programmes}
        brand={brand}
        onSelectCourseForBrochure={onSelectCourseForBrochure}
        onOpenApply={onOpenApply}
      />
    );
  }

  if (layout === "rushford" || brand.slug === "rushford") {
    return (
      <RushfordProgrammes
        programmes={programmes}
        brand={brand}
        onOpenApply={onOpenApply}
      />
    );
  }

  if (layout === "esgci" || brand.slug === "esgci") {
    return (
      <EsgciProgrammes
        programmes={programmes}
        brand={brand}
        onOpenApply={onOpenApply}
      />
    );
  }

  if (layout === "uu" || brand.slug === "uu") {
    return (
      <UuProgrammes
        programmes={programmes}
        onSelectCourseForBrochure={onSelectCourseForBrochure}
        onOpenApply={onOpenApply}
      />
    );
  }

  if (layout === "iiitb" || brand.slug === "iiitb") {
    return (
      <IiitbProgrammes
        programmes={programmes}
        brand={brand}
        onSelectCourseForBrochure={onSelectCourseForBrochure}
        onOpenApply={onOpenApply}
      />
    );
  }

  if (layout === "ssbm" || brand.slug === "ssbm") {
    return (
      <SsbmProgrammes
        programmes={programmes}
        brand={brand}
        onOpenApply={onOpenApply}
      />
    );
  }

  if (layout === "ggu" || brand.slug === "ggu") {
    return (
      <GguProgrammes
        programmes={programmes}
        brand={brand}
        universityName={universityName}
        onSelectCourseForBrochure={onSelectCourseForBrochure}
        onOpenApply={onOpenApply}
      />
    );
  }

  if (
    layout === "mu-tabs" ||
    layout === "mu" ||
    brand.slug === "mu" ||
    brand.slug === "mangalayatan"
  ) {
    return (
      <MuGrid
        programmes={programmes}
        brand={brand}
        onSelectCourseForBrochure={onSelectCourseForBrochure}
        onOpenApply={onOpenApply}
      />
    );
  }

  if (
    layout === "vgu-cards" ||
    layout === "vgu-grid" ||
    (brand.slug === "vgu" && layout !== "carousel")
  ) {
    return (
      <VguGrid
        programmes={programmes}
        brand={brand}
        onSelectCourseForBrochure={onSelectCourseForBrochure}
        onOpenApply={onOpenApply}
      />
    );
  }

  if (layout === "grid" || brand.slug === "shoolini") {
    return (
      <ShooliniGrid
        programmes={programmes}
        brand={brand}
        universityName={universityName}
        onSelectCourseForBrochure={onSelectCourseForBrochure}
        onOpenApply={onOpenApply}
      />
    );
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
