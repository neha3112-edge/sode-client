import React, { Suspense } from "react";
import { request } from "@/services/request";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import CoursesPageClientView from "@/components/website/CoursesPageClientView";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/courses");
  return constructMetadata(pageMeta, {
    canonicalUrl: "https://sode.co.in/courses",
  });
}

export default async function CoursesPage({ searchParams }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  let initialCategories = [];
  let initialUniversities = [];
  let initialCoursesData = { programs: [], total: 0, totalPages: 1, page: 1 };

  const queryOptions = {
    page: resolvedSearchParams.page || 1,
    items: 10,
    category: resolvedSearchParams.category || undefined,
    subcategory: resolvedSearchParams.subcategory || resolvedSearchParams.subCategory || resolvedSearchParams.subcourse || undefined,
    course: resolvedSearchParams.course || resolvedSearchParams.courseId || undefined,
    university: resolvedSearchParams.university || resolvedSearchParams.universityId || undefined,
    duration: resolvedSearchParams.duration || undefined,
    fee: resolvedSearchParams.fee || undefined,
    search: resolvedSearchParams.search || resolvedSearchParams.q || undefined,
  };

  try {
    const [catRes, unisRes, coursesRes] = await Promise.all([
      request.dynamicList({
        entity: "category",
        endPoint: "v1/list",
        revalidate: 600, // 10 min — categories rarely change
      }),
      request.dynamicOptions({
        entity: "universities",
        endPoint: "v1/options",
        revalidate: 600, // 10 min — university list rarely changes
      }),
      request.dynamicList({
        entity: "courses",
        endPoint: "v1/list",
        options: queryOptions,
        revalidate: 0, // search results always fresh
      }),
    ]);

    initialCategories = catRes?.result || catRes?.categories || catRes?.topCategories || (Array.isArray(catRes) ? catRes : []);
    initialUniversities = unisRes?.result || unisRes || [];
    const programs = coursesRes?.result || coursesRes?.programs || [];
    initialCoursesData = {
      programs,
      total: coursesRes?.pagination?.total ?? programs.length,
      totalPages: coursesRes?.pagination?.pages ?? 1,
      page: coursesRes?.pagination?.page ?? 1,
    };
  } catch (err) {
    console.error("[Courses Page] Server fetch error:", err.message);
  }

  return (
    <Suspense fallback={null}>
      <CoursesPageClientView
        initialCoursesData={initialCoursesData}
        initialCategories={initialCategories}
        initialUniversities={initialUniversities}
      />
    </Suspense>
  );
}
