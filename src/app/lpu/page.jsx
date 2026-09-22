import React from "react";
import UniversityLandingView from "@/components/landing/UniversityLandingView";
import { lpuData } from "@/data/landing/lpu";

export const metadata = lpuData.meta;

export default function LpuPage() {
  return <UniversityLandingView data={lpuData} />;
}
