import React from "react";
import AutoEngineToolPage from "@/components/tool/AutoEngineToolPage";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";

export const revalidate = 300;

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/tools/suggest-course");
  return constructMetadata(pageMeta, {
    title: "Suggest Me A Course | AI Course Wizard",
    description:
      "Discover the best online and distance degree programs aligned with your aspirations.",
    canonicalUrl: "https://distanceeducationschool.com/tools/suggest-course",
  });
}

export default function SuggestCoursePage() {
  return (
    <AutoEngineToolPage
      toolSlug="suggest-course"
      toolTitle="Suggest Course - AI Course Wizard"
      toolDescription="Discover accredited degree and diploma programs matched to your background"
    />
  );
}
