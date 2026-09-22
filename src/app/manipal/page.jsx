import React from "react";
import UniversityLandingView from "@/components/landing/UniversityLandingView";
import { manipalData } from "@/data/landing/manipal";

export const metadata = manipalData.meta;

export default function ManipalPage() {
  return <UniversityLandingView data={manipalData} />;
}
