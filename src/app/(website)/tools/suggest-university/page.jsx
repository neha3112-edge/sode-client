import React from "react";
import AutoEngineToolPage from "@/components/tool/AutoEngineToolPage";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";

export const revalidate = 300;

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/tools/suggest-university");
  return constructMetadata(pageMeta, {
    title: "Suggest Me A University | AI University Recommender",
    description:
      "Find top UGC-DEB approved online and distance universities tailored to your career and budget.",
    canonicalUrl: "https://distanceeducationschool.com/tools/suggest-university",
  });
}

export default function SuggestUniversityPage() {
  return (
    <AutoEngineToolPage
      toolSlug="suggest-university"
      toolTitle="Suggest University - AI University Recommender"
      toolDescription="Discover top UGC-DEB approved online & distance universities matched with your goals"
    />
  );
}
