import React from "react";
import { request } from "@/services/request";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import { ApprovalUniversityDirectory } from "@/components/website";

export const revalidate = 900;

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/approvals-directory");
  return constructMetadata(pageMeta, {
    title: "UGC-DEB Approved Online Universities List - January Session 2026",
    description:
      "Comprehensive list of UGC-DEB approved online universities with courses, HEI types, location and comparison.",
    canonicalUrl: "https://distanceeducationschool.com/ugc-deb-approved-online-universities/",
  });
}

export default async function ApprovalsDirectoryPage() {
  let initialData = null;

  try {
    const res = await request.dynamicList({
      entity: "universities",
      endPoint: "v1/approval-directory/ugc-deb-approved-online-universities",
      options: {},
      revalidate: 900,
    });

    if (res && res.success !== false) {
      initialData = res;
    }
  } catch (err) {
    console.error("[ApprovalsDirectoryPage] Server fetch error:", err?.message);
  }

  return (
    <div className="min-h-screen pt-2 sm:pt-3 pb-8 sm:pb-10">
      <ApprovalUniversityDirectory initialData={initialData} />
    </div>
  );
}
