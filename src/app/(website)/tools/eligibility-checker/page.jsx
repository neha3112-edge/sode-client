import React from "react";
import AutoEngineToolPage from "@/components/tool/AutoEngineToolPage";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";

export const revalidate = 300;

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/tools/eligibility-checker");
  return constructMetadata(pageMeta, {
    title: "AI Eligibility Checker | Distance Education School",
    description:
      "Check your academic qualifications, marks, and eligibility for UGC-DEB approved online degrees.",
    canonicalUrl: "https://distanceeducationschool.com/tools/eligibility-checker",
  });
}

export default function EligibilityCheckerPage() {
  return (
    <AutoEngineToolPage
      toolSlug="check-eligibility"
      toolTitle="Check Eligibility - AI Admissions Checker"
      toolDescription="Evaluate your qualifications against official UGC-DEB admission criteria"
    />
  );
}
