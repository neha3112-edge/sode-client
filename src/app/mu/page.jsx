import React from "react";
import UniversityLandingView from "@/components/landing/UniversityLandingView";
import { muData } from "@/data/landing/mu";

export const metadata = muData.meta;

export default function MuPage() {
  return <UniversityLandingView data={muData} />;
}
