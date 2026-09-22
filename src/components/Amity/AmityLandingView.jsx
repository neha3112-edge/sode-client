"use client";

import React from "react";
import UniversityLandingView from "@/components/landing/UniversityLandingView";
import { amityData } from "@/data/landing/amity";

export default function AmityLandingView() {
  return <UniversityLandingView data={amityData} />;
}
