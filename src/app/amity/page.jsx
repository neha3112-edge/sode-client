import React from "react";
import UniversityLandingView from "@/components/landing/UniversityLandingView";
import { amityData } from "@/data/landing/amity";

export const metadata = amityData.meta;

export default function AmityPage() {
  return <UniversityLandingView data={amityData} />;
}
