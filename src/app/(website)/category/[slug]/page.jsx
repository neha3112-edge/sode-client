import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";
import { request } from "@/services/request";

export const revalidate = 60;

// Dynamic Metadata for Category Page
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const catRes = await request.dynamicRead({
    entity: "category",
    endPoint: "website-read",
    options: { slug },
    revalidate: 900,
  });
  const category = catRes?.result?.category || catRes?.category;
  if (!category) {
    return {
      title: "Category Not Found | SODE",
    };
  }
  return {
    title: category.title || `${category.name} | SODE`,
    description: category.description || `Explore ${category.name} certification programs at SODE.`,
  };
}

export default async function CategoryDetailPage({ params }) {
  const { slug } = await params;
  const catRes = await request.dynamicRead({
    entity: "category",
    endPoint: "website-read",
    options: { slug },
    revalidate: 900,
  });

  const category = catRes?.result?.category || catRes?.category;
  const children = catRes?.result?.children || catRes?.children || [];

  if (!category) {
    notFound();
  }

  // Fetch courses under this category
  const coursesRes = await request.dynamicList({
    entity: "university-offerings",
    endPoint: "v1/list",
    options: { category: slug, items: 20 },
    revalidate: 300,
  });
  const programs = coursesRes?.result || coursesRes?.programs || [];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-700">
      <main className="flex-1">
        {/* ── HERO BANNER ── */}
        <section className="bg-white border-b border-gray-200 py-12 md:py-16 text-center">
          <Container className="max-w-4xl mx-auto space-y-4">
            <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full border border-blue-200 inline-block">
              Category Overview
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
              {category.title || category.name}
            </h1>
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {category.description || "Discover top executive management and technical certification programs from premier institutes."}
            </p>
          </Container>
        </section>

        {/* ── CHILD CATEGORIES GRID ── */}
        {children && children.length > 0 && (
          <section className="py-10 md:py-14 bg-gray-50 border-b border-gray-200">
            <Container>
              <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                    Specializations & Institutes
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {children.map((child) => (
                    <div
                      key={child._id || child.slug}
                      className="bg-white border border-gray-200 p-5 rounded-2xl flex flex-col justify-between hover:border-blue-500 transition-colors duration-200 group"
                    >
                      <div className="space-y-2">
                        <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md inline-block">
                          {child.name}
                        </span>
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-500 transition-colors">
                          {child.title || child.name}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {child.description || "Executive programs and specialized certifications."}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-blue-500">
                        <span>Explore Programs</span>
                        <span className="group-hover:translate-x-1 transition-transform">&gt;</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* ── CATEGORY COURSES & PROGRAMS LIST ── */}
        <section className="py-10 md:py-14 bg-white">
          <Container>
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="flex items-center justify-between px-2">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    Available Programs
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Accredited degrees and executive certifications under {category.name}
                  </p>
                </div>
              </div>

              {programs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {programs.map((program, idx) => {
                    const uniName = program.universityId?.name || program.university?.name || "Partner Institute";
                    const courseName = program.courseId?.name || program.title || program.name || "Program";
                    const subcourseName = program.subCourseId?.name || "";
                    const cardTitle = subcourseName && !courseName.toLowerCase().includes(subcourseName.toLowerCase())
                      ? `${courseName} - ${subcourseName}`
                      : courseName;
                    const durationText = program.duration?.name || (program.duration?.months ? `${program.duration.months} Months` : (program.duration?.title || "12 Months"));
                    const descText = program.subCourseId?.description || program.courseId?.description || program.description || "Designed for professionals looking to upskill and advance their career trajectory.";
                    const itemSlug = program.subCourseId?.slug || program.courseId?.slug || program.slug || program._id;

                    return (
                      <div
                        key={program._id || `${cardTitle}-${idx}`}
                        className="bg-white border border-gray-200 p-6 rounded-2xl hover:border-blue-500 transition-colors flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                              {uniName}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">
                              ⏱️ {durationText}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-gray-900">
                            {cardTitle}
                          </h3>

                          <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                            {descText}
                          </p>
                        </div>

                        <div className="pt-4 mt-6 border-t border-gray-100 flex items-center justify-between">
                          <Link
                            href={itemSlug ? `/courses/${encodeURIComponent(itemSlug)}` : `/courses`}
                            className="w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold text-xs py-2.5 rounded-xl transition-colors"
                          >
                            View Program Details & Apply
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white border border-gray-200 p-8 rounded-2xl text-center space-y-3 max-w-xl mx-auto">
                  <span className="text-3xl">🎓</span>
                  <h3 className="text-base font-bold text-gray-800">
                    Programs Coming Soon
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    We are currently adding new accredited programs under {category.name}. Contact our admissions desk for early access and curriculum brochures.
                  </p>
                  <Link
                    href="/courses"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl mt-2 transition-colors"
                  >
                    Browse All Courses
                  </Link>
                </div>
              )}
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
