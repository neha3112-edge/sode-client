import React from "react";
import { request } from "@/services/request";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import { CompareUniversityClientView } from "@/components/website";

export const revalidate = 900;

export async function generateMetadata({ searchParams }) {
  const resolvedParams = searchParams ? await searchParams : {};
  const urlIds =
    resolvedParams.university ||
    resolvedParams.universityid ||
    resolvedParams.ids ||
    resolvedParams.universities ||
    "";

  const pageMeta = await getPageMetaData("/tools/compare-universities");
  const dynamicTitle = urlIds
    ? `Compare ${urlIds.split(",").join(" vs ")} | Online Degree Comparison`
    : pageMeta?.metaTitle || "Compare Top Online Universities & Courses";

  return constructMetadata(pageMeta, {
    canonicalUrl: `https://distanceeducationschool.com/tools/compare-universities${urlIds ? `?university=${encodeURIComponent(urlIds)}` : ""}`,
    title: dynamicTitle,
  });
}

export default async function CompareUniversitiesToolPage({ searchParams }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const urlIds =
    resolvedSearchParams.university ||
    resolvedSearchParams.universityid ||
    resolvedSearchParams.ids ||
    resolvedSearchParams.universities ||
    "";

  const rawCourseParam = resolvedSearchParams.course || "";
  let courseParam = rawCourseParam
    ? rawCourseParam
        .replace(/^[()]/g, "")
        .replace(/[()]$/g, "")
        .replace(/^(online|distance|hybrid|regular|open|executive|odl)\s+/i, "")
        .replace(/\s+(course|program|programme|degree)$/i, "")
        .trim()
    : "";



  // ── Single API call to /api/universities/v1/compare ──────────────────────
  // - With university=X,Y → returns result (comparison data)
  // - With course=X (no university) → returns universities[] + courses + states + approvals
  // - With nothing → returns courses + states + approvals
  let compareRes = null;
  try {
    const options = {};
    if (urlIds) options.university = urlIds;
    if (courseParam) options.course = courseParam;

    compareRes = await request.dynamicRead({
      entity: "universities",
      endPoint: "v1/compare",
      options,
      revalidate: 900,
    });
  } catch (err) {
    console.error("[CompareUniversitiesToolPage] Compare API error:", err);
  }

  // ── Extract data from the single API response ────────────────────────────
  const initialComparedData = Array.isArray(compareRes?.result)
    ? compareRes.result
    : [];

  const initialCourseUniversities = Array.isArray(compareRes?.universities)
    ? compareRes.universities
    : [];

  const initialCourseMessage = compareRes?.message || "";

  const initialAllCourses = Array.isArray(compareRes?.courses)
    ? compareRes.courses
    : [];

  const initialAllStates = Array.isArray(compareRes?.states)
    ? compareRes.states
    : [];

  const initialAllApprovals = Array.isArray(compareRes?.approvals)
    ? compareRes.approvals
    : [];

  return (
    <div className="w-full bg-slate-50">
      <CompareUniversityClientView
        initialComparedData={initialComparedData}
        initialAllCourses={initialAllCourses}
        allCourses={initialAllCourses}
        initialAllStates={initialAllStates}
        allStates={initialAllStates}
        initialAllApprovals={initialAllApprovals}
        allApprovals={initialAllApprovals}
        initialCourseUniversities={initialCourseUniversities}
        initialCourseMessage={initialCourseMessage}
        initialSelectedCourse={courseParam}
        initialSelectedIds={urlIds}
      />
    </div>
  );
}
