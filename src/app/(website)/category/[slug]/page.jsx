import React from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import { MobileBottomNav } from "@/components/website/MockupAdditions";
import { Container } from "@/components/ui/container";
import { getWebsiteCategoryBySlug, getWebsiteCoursesFilter } from "@/services/api";
import Image from "next/image";

export const revalidate = 60; // Next.js ISR: Revalidate cache every 60 seconds

// Dynamic Metadata for Category Page
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { category } = await getWebsiteCategoryBySlug(slug);

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
  const { category, children } = await getWebsiteCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  // Fetch courses under this category
  const coursesData = await getWebsiteCoursesFilter({ category: slug, limit: 20 });
  const programs = coursesData?.programs || [];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Header />

      <main className="flex-1">
        {/* ── HERO BANNER ── */}
        <section className="bg-gradient-to-b from-[#102441] to-[#0a1424] text-white py-14 md:py-20 px-4 text-center relative overflow-hidden border-b border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#EEC471]/10 rounded-full blur-3xl" />
          <Container className="max-w-4xl mx-auto z-10 relative">
            <span className="bg-[#EEC471]/15 text-[#EEC471] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-[#EEC471]/30">
              Category Overview
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white mt-4 mb-4 leading-tight tracking-tight">
              {category.title || category.name}
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {category.description || "Discover top executive management and technical certification programs from India's premier institutes."}
            </p>
          </Container>
        </section>

        {/* ── CHILD CATEGORIES GRID ── */}
        {children && children.length > 0 && (
          <section className="py-12 md:py-16 bg-white border-b border-slate-100">
            <Container>
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8 px-2">
                  <h2 className="text-xl md:text-2xl font-extrabold text-[#102441] flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-[#EEC471] rounded-full" />
                    Specializations & Institutes
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {children.map((child) => (
                    <div
                      key={child._id || child.slug}
                      className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl flex flex-col justify-between hover:shadow-md hover:border-[#EEC471]/60 transition-all duration-200 group"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-[#EEC471] bg-[#102441] px-2.5 py-1 rounded-md uppercase tracking-wider inline-block">
                          {child.name}
                        </span>
                        <h3 className="text-base font-bold text-[#102441] group-hover:text-blue-600 transition-colors">
                          {child.title || child.name}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {child.description || "Executive programs and specialized certifications."}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-blue-600">
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
        <section className="py-12 md:py-16 bg-[#f8fafc]">
          <Container>
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="flex items-center justify-between px-2">
                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-[#102441]">
                    Available Programs
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Accredited degrees and executive certifications under {category.name}
                  </p>
                </div>
              </div>

              {programs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {programs.map((program) => (
                    <div
                      key={program._id || program.slug}
                      className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                            {program.university?.name || "Partner Institute"}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            ⏱️ {program.duration?.title || "12 Months"}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-[#102441]">
                          {program.title}
                        </h3>

                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                          {program.description || "Designed for mid to senior professionals looking to upskill and advance their career trajectory."}
                        </p>
                      </div>

                      <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                        <a
                          href={`/courses?search=${encodeURIComponent(program.title)}`}
                          className="w-full text-center bg-[#102441] text-white font-bold text-xs py-2.5 rounded-xl hover:bg-[#163056] transition-colors"
                        >
                          View Program Details & Apply
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-slate-200 p-8 rounded-2xl text-center space-y-3 max-w-xl mx-auto">
                  <span className="text-3xl">🎓</span>
                  <h3 className="text-base font-bold text-slate-800">
                    Programs Coming Soon
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We are currently adding new accredited programs under {category.name}. Contact our admissions desk for early access and curriculum brochures.
                  </p>
                  <a
                    href="/courses"
                    className="inline-block bg-[#102441] text-white text-xs font-bold px-5 py-2.5 rounded-xl mt-2 hover:bg-[#163056] transition-colors"
                  >
                    Browse All Courses
                  </a>
                </div>
              )}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
