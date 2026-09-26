import React from "react";
import { AccreditationsView } from "@/components/website";
import { request } from "@/services/request";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";

export const revalidate = 600;

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/accreditations");
  return constructMetadata(pageMeta, {
    title: "University Accreditations & Approvals - Distance Education School",
    description:
      "Verify top higher education statutory approvals, institutional accreditations and quality benchmarks for valid online degrees.",
    canonicalUrl: "https://distanceeducationschool.com/accreditations",
  });
}

export default async function AccreditationsPage() {
  let accreditationsData = [];

  try {
    const res = await request.dynamicRead({
      entity: "accreditations",
      endPoint: "public",
      revalidate: 600,
    });

    accreditationsData = res?.result ?? res ?? [];
  } catch (err) {
    console.error("[AccreditationsPage] Error fetching active accreditations:", err?.message || err);
  }

  return <AccreditationsView initialAccreditations={accreditationsData} />;
}
