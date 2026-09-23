import React from "react";
import { request } from "@/services/request";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import { CompareUniversityClientView } from "@/components/website";

export const revalidate = 1800; // Next.js ISR: 30 minutes (30 * 60 = 1800 seconds)

export async function generateMetadata({ searchParams }) {
  const resolvedParams = searchParams ? await searchParams : {};
  const urlIds =
    resolvedParams.university ||
    resolvedParams.universityid ||
    resolvedParams.ids ||
    resolvedParams.universities ||
    "";

  const pageMeta = await getPageMetaData("/compare-university");
  const dynamicTitle = urlIds
    ? `Compare ${urlIds.split(",").join(" vs ")} | Online Degree Comparison`
    : pageMeta?.metaTitle || "Compare Top Online Universities & Courses";

  return constructMetadata(pageMeta, {
    canonicalUrl: `https://sode.co.in/compare-university${urlIds ? `?university=${encodeURIComponent(urlIds)}` : ""}`,
    title: dynamicTitle,
  });
}

export default async function CompareUniversityPage({ searchParams }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const urlIds =
    resolvedSearchParams.university ||
    resolvedSearchParams.universityid ||
    resolvedSearchParams.ids ||
    resolvedSearchParams.universities ||
    "";

  let initialComparedData = [];
  let initialAllUniversities = [];
  let initialAllCourses = [];
  let initialAllModes = [];
  let initialCompareCategories = [];
  let initialAllStates = [];
  let initialAllApprovals = [];

  try {
    const [comparedRes, unisRes, coursesRes, modesRes, catRes, statesRes, approvalsRes] =
      await Promise.all([
        urlIds
          ? request.dynamicRead({
              entity: "universities",
              endPoint: "v1/compare",
              options: { university: urlIds },
              revalidate: 1800,
            })
          : Promise.resolve(null),
        request.dynamicOptions({
          entity: "universities",
          endPoint: "v1/options",
          revalidate: 1800,
        }),
        request.dynamicOptions({
          entity: "courses",
          endPoint: "v1/options",
          revalidate: 1800,
        }),
        request.dynamicOptions({
          entity: "modeinfo",
          endPoint: "v1/options",
          revalidate: 1800,
        }),
        request.dynamicList({
          entity: "category",
          endPoint: "v1/list",
          revalidate: 1800,
        }),
        request.dynamicOptions({
          entity: "states",
          endPoint: "v1/options",
          revalidate: 1800,
        }),
        request.dynamicOptions({
          entity: "approvals",
          endPoint: "v1/options",
          revalidate: 1800,
        }),
      ]);

    initialComparedData = Array.isArray(comparedRes?.result)
      ? comparedRes.result
      : Array.isArray(comparedRes)
      ? comparedRes
      : [];

    initialAllUniversities = Array.isArray(unisRes?.result)
      ? unisRes.result
      : Array.isArray(unisRes)
      ? unisRes
      : [];

    initialAllCourses = Array.isArray(coursesRes?.result)
      ? coursesRes.result
      : Array.isArray(coursesRes)
      ? coursesRes
      : [];

    initialAllModes = Array.isArray(modesRes?.result)
      ? modesRes.result
      : Array.isArray(modesRes)
      ? modesRes
      : [];

    const rawCats = Array.isArray(catRes?.data)
      ? catRes.data
      : Array.isArray(catRes?.result)
      ? catRes.result
      : [];
    initialCompareCategories = rawCats.filter((c) => c.showOnCompare);

    initialAllStates = Array.isArray(statesRes?.result)
      ? statesRes.result
      : Array.isArray(statesRes)
      ? statesRes
      : [];

    initialAllApprovals = Array.isArray(approvalsRes?.result)
      ? approvalsRes.result
      : Array.isArray(approvalsRes)
      ? approvalsRes
      : [];
  } catch (err) {
    console.error("❌ Error prefetching compare-university data on server:", err);
  }

  return (
    <CompareUniversityClientView
      initialComparedData={initialComparedData}
      initialAllUniversities={initialAllUniversities}
      initialAllCourses={initialAllCourses}
      initialAllModes={initialAllModes}
      initialCompareCategories={initialCompareCategories}
      initialAllStates={initialAllStates}
      initialAllApprovals={initialAllApprovals}
    />
  );
}
