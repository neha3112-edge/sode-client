import React from "react";
import UniversityLandingView from "@/components/landing/UniversityLandingView";
import { amityData } from "@/data/landing/amity";

export const metadata = amityData.meta;

export default function AmityV2Page() {
  return <UniversityLandingView data={amityData} />;
}
