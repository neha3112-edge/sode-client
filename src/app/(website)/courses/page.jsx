import React, { Suspense } from "react";
import { request } from "@/services/request";
import CoursesPageClientView from "@/components/website/CoursesPageClientView";

export const revalidate = 900;

export const metadata = {
  title: "Online Degree & Executive Courses | SODE",
  description:
    "Explore accredited online MBA, MCA, BBA, BCA, and executive certification courses from top UGC-DEB approved universities in India. Compare syllabus, fees, and apply online.",
  alternates: {
    canonical: "https://mysode.com/courses",
  },
  openGraph: {
    title: "Online Degree & Executive Courses | SODE",
    description:
      "Explore accredited online MBA, MCA, BBA, BCA, and executive certification courses from top UGC-DEB approved universities.",
    url: "https://mysode.com/courses",
    siteName: "SODE",
    type: "website",
  },
};

export default async function CoursesPage() {
  let initialCategories = [];
  let initialUniversities = [];
  let initialCoursesData = { programs: [], total: 0, totalPages: 1, page: 1 };

  try {
    const [catRes, unisRes, coursesRes] = await Promise.all([
      request.dynamicList({
        entity: "category",
        endPoint: "v1/list",
        revalidate: 900,
      }),
      request.dynamicOptions({
        entity: "universities",
        endPoint: "v1/options",
        revalidate: 900,
      }),
      request.dynamicList({
        entity: "university-offerings",
        endPoint: "v1/list",
        options: { page: 1, items: 10 },
        revalidate: 900,
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
