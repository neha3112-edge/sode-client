import React from "react";
import UniversityLandingView from "@/components/landing/UniversityLandingView";
import { cuData } from "@/data/landing/cu";

export const metadata = cuData.meta;

export default function CuPage() {
  return <UniversityLandingView data={cuData} />;
}
