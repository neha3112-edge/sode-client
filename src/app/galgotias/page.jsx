import React from "react";
import UniversityLandingView from "@/components/landing/UniversityLandingView";
import { galgotiasData } from "@/data/landing/galgotias";

export const metadata = galgotiasData.meta;

export default function GalgotiasPage() {
  return <UniversityLandingView data={galgotiasData} />;
}
