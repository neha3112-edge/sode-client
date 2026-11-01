import React from "react";
import { request } from "@/services/request";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import { CoursesPageClientView } from "@/components/website";

export const revalidate = 300;

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/courses");
  return constructMetadata(pageMeta, {
    canonicalUrl: "https://sode.co.in/courses",
  });
}

export default async function CoursesPage({ searchParams }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  let initialCoursesData = { programs: [], total: 0, totalPages: 1, page: 1, filterOptions: null };
  let initialFilterOptions = null;

  const queryOptions = {
    page: resolvedSearchParams.page || 1,
    items: 10,
    category: resolvedSearchParams.category || undefined,
    subcategory: resolvedSearchParams.subcategory || resolvedSearchParams.subCategory || undefined,
    subcourse: resolvedSearchParams.subcourse || resolvedSearchParams.subCourse || resolvedSearchParams.subcourseId || resolvedSearchParams.specialization || resolvedSearchParams.specializationId || undefined,
    course: resolvedSearchParams.course || resolvedSearchParams.courseId || undefined,
    university: resolvedSearchParams.university || resolvedSearchParams.universityId || undefined,
    duration: resolvedSearchParams.duration || undefined,
    fee: resolvedSearchParams.fee || undefined,
    search: resolvedSearchParams.search || resolvedSearchParams.q || undefined,
  };

  try {
    const coursesRes = await request.dynamicList({
      entity: "courses",
      endPoint: "v1/list",
      options: queryOptions,
      revalidate: 300, // ISR cached 5 mins
    });

    const programs = coursesRes?.result || coursesRes?.programs || [];
    initialFilterOptions = coursesRes?.filters || coursesRes?.filter || coursesRes?.filterOptions || null;
    initialCoursesData = {
      programs,
      total: coursesRes?.pagination?.total ?? programs.length,
      totalPages: coursesRes?.pagination?.pages ?? 1,
      page: coursesRes?.pagination?.page ?? 1,
      filters: initialFilterOptions,
      filterOptions: initialFilterOptions,
    };
  } catch (err) {
    console.error("[Courses Page] Server fetch error:", err.message);
  }

  return (
    <div className="w-full">
      <CoursesPageClientView
        initialCoursesData={initialCoursesData}
        initialFilterOptions={initialFilterOptions}
      />
    </div>
  );
}
