"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Breadcrumb, Spin } from "antd";
import {
  ArrowLeftOutlined,
  ClockCircleFilled,
  BankOutlined,
  CheckCircleFilled,
  BookFilled,
  DollarOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import FormWrapper from "@/components/forms/FormWrapper";
import { getAssetPath } from "@/lib/utils";
import { useFormModal } from "@/context/FormModalContext";

/* ─────────────────────────────────────────────────────────────
   SpecializationCard: collapsible card per specialization
───────────────────────────────────────────────────────────── */
function SpecializationCard({ title, tagline, content, fee, duration, eligibility, modules }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow duration-200">
      {/* Card Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex-1">
            <span className="text-base font-extrabold text-[#0C3058]">🎓 {title}</span>
            {tagline && (
              <p className="text-xs font-semibold text-[#00B4D8] m-0 mt-1 leading-snug">{tagline}</p>
            )}
          </div>
        </div>

        {content && (
          <p className="text-xs text-slate-600 leading-relaxed mt-3 m-0 font-normal">{content}</p>
        )}

        {eligibility && (
          <div className="mt-3 flex items-start gap-2">
            <CheckCircleFilled className="text-emerald-500 text-xs mt-0.5 shrink-0" />
            <span className="text-xs text-slate-500 font-medium">{eligibility}</span>
          </div>
        )}
      </div>

      {/* Collapsible Curriculum Modules */}
      {modules.length > 0 && (
        <div className="border-t border-slate-100">
          <button
            onClick={() => setExpanded(prev => !prev)}
            className="w-full flex items-center justify-between px-5 py-3 text-xs font-bold text-[#0C3058] bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <BookFilled className="text-[#00B4D8]" />
              Curriculum ({modules.length} Modules)
            </span>
            <span className={`transition-transform duration-200 text-slate-500 ${expanded ? "rotate-180" : ""}`}>▼</span>
          </button>

          {expanded && (
            <div className="px-5 pb-5 pt-2 space-y-2">
              {modules.map((mod, mIdx) => (
                <div key={mIdx} className="flex items-start gap-3 py-2.5 border-b border-slate-100 last:border-0">
                  <span className="w-6 h-6 rounded-full bg-[#0C3058] text-white text-[10px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                    {mIdx + 1}
                  </span>
                  <div>
                    <p className="text-xs font-extrabold text-slate-800 m-0">{mod.title}</p>
                    {mod.description && (
                      <p className="text-[11px] text-slate-500 m-0 mt-0.5 font-normal">{mod.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────── */
export default function CourseDetailView({ slug: propSlug, initialCourse }) {
  const params = useParams();
  const router = useRouter();
  const slug = propSlug || params?.slug;
  const { openFormModal } = useFormModal();

  const [course, setCourse] = useState(initialCourse || null);
  const [loading, setLoading] = useState(!initialCourse);
  const [activeUniIdx, setActiveUniIdx] = useState(initialCourse && typeof initialCourse.activeOfferingIdx === "number" ? initialCourse.activeOfferingIdx : 0);

  useEffect(() => {
    if (initialCourse) {
      setCourse(initialCourse);
      setLoading(false);
      if (typeof initialCourse.activeOfferingIdx === "number") {
        setActiveUniIdx(initialCourse.activeOfferingIdx);
      } else {
        setActiveUniIdx(0);
      }
    }
  }, [initialCourse]);

  useEffect(() => {
    if (!initialCourse && slug) {
      setLoading(true);
      fetch(`/api/website/courses/${encodeURIComponent(slug)}`)
        .then((res) => res.json())
        .then((json) => {
          const data = json?.result ?? json;
          setCourse(data);
          if (data && typeof data.activeOfferingIdx === "number") {
            setActiveUniIdx(data.activeOfferingIdx);
          }
        })
        .catch((err) => console.error("Error loading course:", err))
        .finally(() => setLoading(false));
    }
  }, [slug, initialCourse]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <Spin size="large" tip="Loading course details..." />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center p-8 bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800">Course Not Found</h2>
        <p className="text-slate-500">The requested course could not be retrieved.</p>
        <Button icon={<ArrowLeftOutlined />} onClick={() => router.push("/courses")}>Return to Courses</Button>
      </div>
    );
  }

  const offerings = Array.isArray(course.universityOfferings) ? course.universityOfferings : [];
  const activeOffering = offerings[activeUniIdx] || offerings[0] || null;
  const uniObj = activeOffering?.university || null;
  const uniName = uniObj?.name || "Partner University";

  const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // Hero subcourse = first subcourse of active offering or matching subcourse
  const activeSubcourses = Array.isArray(activeOffering?.subcourses) && activeOffering.subcourses.length > 0
    ? activeOffering.subcourses : [];
  const heroSub = (course.activeSubcourseSlug && activeSubcourses.find(sub => slugify(sub.title || "") === course.activeSubcourseSlug)) || activeSubcourses[0] || null;
  const heroSubTitle = heroSub?.title || "";

  const fullProgramTitle = heroSubTitle
    ? `${uniName} - ${course.title || "Course"} - ${heroSubTitle}`
    : `${uniName} - ${course.title || "Course"}`;

  const cleanTitle = course.title || "Program";
  const categoryName = Array.isArray(course.categories) && course.categories.length > 0
    ? (course.categories[0]?.name || "Certification") : "Certification";

  // Clean Hero Title - show subcourse title when navigated via subcourse slug
  let displayHeroTitle = cleanTitle;
  if (course.activeSubcourseSlug && heroSubTitle) {
    // Navigated from subcourse card — show subcourse-specific title
    displayHeroTitle = heroSubTitle;
    if (uniName && !displayHeroTitle.toLowerCase().includes(uniName.toLowerCase())) {
      displayHeroTitle = `${displayHeroTitle} from ${uniName}`;
    }
  } else {
    if (uniName && !cleanTitle.toLowerCase().includes(uniName.toLowerCase())) {
      displayHeroTitle = `${cleanTitle} from ${uniName}`;
    }
  }

  const primaryDuration = (course.activeSubcourseSlug && heroSub?.duration?.title)
    ? heroSub.duration.title
    : (activeOffering?.duration?.title || "6 Months");

  const domainName = heroSubTitle || course.title || "Management";

  const overviewText = heroSub?.content || heroSub?.description || course.description || "";

  const highlightsList = (heroSub && Array.isArray(heroSub.keyHighlights) && heroSub.keyHighlights.length > 0)
    ? heroSub.keyHighlights
    : ((heroSub && Array.isArray(heroSub.modules) && heroSub.modules.length > 0) ? heroSub.modules : []);

  const whoCanApplyList = (heroSub && Array.isArray(heroSub.whoCanApply) && heroSub.whoCanApply.length > 0)
    ? heroSub.whoCanApply
    : [];

  const admissionProcessList = (heroSub && Array.isArray(heroSub.admissionProcess) && heroSub.admissionProcess.length > 0)
    ? heroSub.admissionProcess
    : [];

  const rawLogo = uniObj?.logoSrc?.url || uniObj?.logoSrc;
  const logoUrl = getAssetPath(rawLogo, null);
  const rawImage = uniObj?.imageSrc?.url || uniObj?.imageSrc || (typeof course.image === "object" ? course.image?.url : course.image);
  const imageUrl = getAssetPath(rawImage, "/assets/images/Blue banner man image.webp");

  return (
    <div className="bg-[#F4F6F9] min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── Breadcrumb + Back Button ── */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Breadcrumb
            className="text-xs sm:text-sm font-semibold text-slate-500"
            items={[
              { title: <Link href="/" className="hover:text-blue-600">Home</Link> },
              { title: <Link href="/courses" className="hover:text-blue-600">Courses</Link> },
              ...(course.activeSubcourseSlug && heroSubTitle ? [
                { title: <Link href={`/courses/${course.slug}`} className="hover:text-blue-600">{cleanTitle}</Link> },
                { title: <span className="text-slate-800 font-bold">{heroSubTitle}</span> },
              ] : [
                { title: <span className="text-slate-800 font-bold">{cleanTitle}</span> },
              ]),
            ]}
          />
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push("/courses")}
            className="bg-white border-slate-300 rounded-lg text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50"
          >
            Back to Courses
          </Button>
        </div>

        {/* ── Hero Banner (Matching Reference PDF UI) ── */}
        <div className="bg-gradient-to-r from-[#0F3759] via-[#103D6D] to-[#154E8A] rounded-3xl overflow-hidden shadow-xl text-white relative p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Content Area */}
            <div className="lg:col-span-7 space-y-5">
              <span className="bg-[#FAF0CA] text-[#0C3058] font-extrabold text-xs uppercase px-4 py-1.5 rounded-full inline-block tracking-wider shadow-2xs">
                {categoryName}
              </span>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight m-0">
                {displayHeroTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm font-semibold text-slate-200 pt-1">
                <span className="flex items-center gap-1.5">
                  <ClockCircleFilled className="text-[#FFC107] text-base" /> Duration: <strong className="text-white">{primaryDuration}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <ClockCircleFilled className="text-[#FFC107] text-base" /> Admission Deadline: <strong className="text-white">31-Jul-26</strong>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    openFormModal && openFormModal({
                      title: `Download Brochure - ${cleanTitle}`,
                      subtitle: "Fill details to receive instant access to brochure",
                      defaultCourse: displayHeroTitle,
                      submitButtonText: "Download Brochure",
                    });
                  }}
                  className="bg-[#00B4D8] hover:bg-[#0096C7] text-white border-none font-bold text-sm px-6 h-11 rounded-xl shadow-md cursor-pointer flex items-center gap-1"
                >
                  Download Brochure ↓
                </Button>
                <Button
                  size="large"
                  onClick={() => {
                    openFormModal && openFormModal({
                      title: "Get 100% FREE Counseling",
                      subtitle: "Speak directly with our senior academic counselors",
                      defaultCourse: displayHeroTitle,
                      submitButtonText: "Request Counseling",
                    });
                  }}
                  className="bg-transparent hover:bg-white/10 text-white border-2 border-white/80 font-bold text-sm px-6 h-11 rounded-xl cursor-pointer"
                >
                  Get 100% FREE Counseling
                </Button>
              </div>
            </div>

            {/* Right Card Area (Matching Reference PDF Hero Graphic Card) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-white rounded-2xl p-4 shadow-2xl max-w-sm w-full border border-white/20 text-slate-800 group overflow-hidden">
                <div className="relative w-full h-64 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                  {imageUrl ? (
                    <Image src={imageUrl} alt={uniName} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : logoUrl ? (
                    <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                      <img src={logoUrl} alt={uniName} className="max-h-24 max-w-full object-contain" />
                      <h3 className="font-extrabold text-slate-800 text-base m-0">{uniName}</h3>
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <BankOutlined className="text-5xl text-slate-400 mb-2" />
                      <h3 className="font-extrabold text-slate-800 text-lg m-0">{uniName}</h3>
                    </div>
                  )}
                </div>
                <div className="pt-3 text-center">
                  <span className="text-xs font-extrabold text-[#0C3058] uppercase tracking-wider block">{uniName}</span>
                  <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">Official Academic Partner</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Main Grid Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">

          {/* Left Main Content Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">

            {/* 1. Course Overview Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3">
                  Course Overview
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base mt-4 m-0 font-medium">
                  {overviewText}
                </p>
              </div>

              <div className="pt-2">
                <h3 className="text-base sm:text-lg font-bold text-[#0C3058] mb-3">Key Highlights</h3>
                <ul className="space-y-2.5 text-slate-700 text-sm font-medium pl-5 list-disc marker:text-[#00B4D8]">
                  {highlightsList.map((mod, idx) => (
                    <li key={idx} className="leading-snug">
                      <strong className="text-slate-900">{typeof mod === "object" ? mod.title : mod}</strong>
                      {typeof mod === "object" && mod.description ? ` — ${mod.description}` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 2. Eligibility & Admission Process Card (Matching PDF Image 3) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3">
                  Eligibility &amp; Admission Process
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base mt-4 m-0 font-medium">
                  The programme is designed for graduates and working professionals who want to develop expertise in {domainName}. Whether you're beginning your career journey or aiming for leadership roles, this programme provides the right blend of management concepts and practical skills. The admission process is simple, with dedicated counsellors available to guide you at every step.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Who Can Apply? Sub-Card */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                  <h3 className="text-base font-extrabold text-[#0C3058] m-0">Who Can Apply?</h3>
                  <ul className="space-y-2 text-xs sm:text-sm font-medium text-slate-700 list-disc pl-4 marker:text-[#00B4D8]">
                    {whoCanApplyList.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Admission Process Sub-Card */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                  <h3 className="text-base font-extrabold text-[#0C3058] m-0">Admission Process</h3>
                  <ol className="space-y-2 text-xs sm:text-sm font-medium text-slate-700 list-decimal pl-4">
                    {admissionProcessList.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* 3. University Offerings & Specializations or Course Curriculum */}
            {(() => {
              let isSingleOfferingDuplicate =
                offerings.length === 1 &&
                (() => {
                  const off = offerings[0];
                  const subList = Array.isArray(off?.subcourses) ? off.subcourses : [];
                  return (
                    subList.length === 1 &&
                    (subList[0].title || subList[0].name || subList[0].subcourse?.title || "")
                      .trim()
                      .toLowerCase() === (course.title || "").trim().toLowerCase()
                  );
                })();

              if (isSingleOfferingDuplicate) {
                const singleSub = offerings[0].subcourses[0];
                const subModules = Array.isArray(singleSub?.modules) ? singleSub.modules : [];
                if (subModules.length > 0) {
                  return (
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3 flex items-center gap-2">
                          <BookFilled className="text-[#00B4D8]" />
                          Course Curriculum
                        </h2>
                      </div>
                      <div className="space-y-2.5">
                        {subModules.map((mod, mIdx) => (
                          <div key={mIdx} className="flex items-start gap-3 py-2.5 border-b border-slate-100 last:border-0 font-medium">
                            <span className="w-6 h-6 rounded-full bg-[#0C3058] text-white text-[10px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                              {mIdx + 1}
                            </span>
                            <div>
                              <p className="text-xs font-extrabold text-slate-800 m-0">{mod.title}</p>
                              {mod.description && (
                                <p className="text-[11px] text-slate-500 m-0 mt-0.5 font-normal leading-relaxed">{mod.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              }

              if (offerings.length > 0) {
                return (
                  <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
                    {/* Section header */}
                    <div className="p-6 sm:p-8 border-b border-slate-200">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C3058] m-0">
                        University Offerings &amp; Specializations
                      </h2>
                      <p className="text-slate-500 text-sm mt-1 m-0">Select a university partner to explore specializations</p>
                    </div>

                    {/* University Tab Switcher */}
                    {offerings.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto px-6 sm:px-8 pt-5 pb-0">
                        {offerings.map((off, idx) => {
                          const tabUni = off.university || {};
                          const tabLogo = getAssetPath(tabUni?.logoSrc?.url || tabUni?.logoSrc, null);
                          return (
                            <button
                              key={idx}
                              onClick={() => setActiveUniIdx(idx)}
                              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer
                                ${activeUniIdx === idx
                                  ? "bg-[#0C3058] text-white border-[#0C3058] shadow-md"
                                  : "bg-white text-slate-600 border-slate-200 hover:border-[#0C3058] hover:text-[#0C3058]"
                                }`}
                            >
                              {tabLogo && <img src={tabLogo} alt={tabUni.name} className="w-5 h-5 object-contain rounded shrink-0" />}
                              {tabUni.name || `Option ${idx + 1}`}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Active University Detail */}
                    {(() => {
                      const off = offerings[activeUniIdx] || offerings[0];
                      if (!off) return null;
                      const uni = off.university || {};
                      const uniLogo = getAssetPath(uni?.logoSrc?.url || uni?.logoSrc, null);
                      const fee = off.fee;
                      const dur = off.duration;
                      const eligibility = off.eligibility;

                      // Filter specializations list if activeSubcourseSlug is present
                      const rawSubcoursesList = Array.isArray(off.subcourses) && off.subcourses.length > 0 ? off.subcourses : [];
                      const subList = rawSubcoursesList.filter(sub => {
                        if (!course.activeSubcourseSlug) return true;
                        const sTitle = sub.title || sub.name || sub.subcourse?.title || "";
                        return slugify(sTitle) === course.activeSubcourseSlug;
                      });

                      const feeTitle = fee?.title || (fee?.amount ? `₹${Number(fee.amount).toLocaleString("en-IN")}` : null);

                      return (
                        <div className="p-6 sm:p-8 space-y-6">
                          {/* University Header */}
                          <div className="flex items-center justify-between gap-4 flex-wrap bg-slate-50 border border-slate-200 rounded-2xl p-4">
                            <div className="flex items-center gap-3">
                              {uniLogo ? (
                                <img src={uniLogo} alt={uni.name} className="w-14 h-14 object-contain rounded-xl border bg-white p-1.5 shrink-0 shadow-sm" />
                              ) : (
                                <div className="w-14 h-14 rounded-xl border bg-slate-100 flex items-center justify-center shrink-0">
                                  <BankOutlined className="text-2xl text-slate-400" />
                                </div>
                              )}
                              <div>
                                <h3 className="font-extrabold text-slate-800 text-lg m-0">{uni.name || "University"}</h3>
                                <div className="flex flex-wrap items-center gap-3 mt-1">
                                  {dur?.title && (
                                    <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                                      <ClockCircleFilled className="text-[#FFC107] text-base" /> {dur.title}
                                    </span>
                                  )}
                                  {eligibility?.title && (
                                    <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                                      <CheckCircleFilled className="text-emerald-500" /> {eligibility.title}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            {feeTitle && (
                              <div className="text-right shrink-0">
                                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Total Fee</span>
                                <span className="text-2xl font-extrabold text-[#D81B60]">{feeTitle}</span>
                              </div>
                            )}
                          </div>

                          {/* Specialization Cards */}
                          {subList.length > 0 && (
                            <div className="space-y-4">
                              <h4 className="text-sm font-extrabold text-[#0C3058] uppercase tracking-wider flex items-center gap-2 m-0">
                                <BookFilled className="text-[#00B4D8]" />
                                Specializations ({subList.length})
                              </h4>

                              <div className="space-y-4">
                                {subList.map((sub, sIdx) => {
                                  if (typeof sub !== "object" || !sub) return null;
                                  const sTitle = sub.title || sub.name || sub.subcourse?.title || "";
                                  if (!sTitle) return null;
                                  return (
                                    <SpecializationCard
                                      key={sIdx}
                                      title={sTitle}
                                      tagline={sub.shortDescription || ""}
                                      content={sub.content || sub.description || ""}
                                      fee={sub.fee?.title || (sub.fee?.amount ? `₹${Number(sub.fee.amount).toLocaleString("en-IN")}` : null)}
                                      duration={sub.duration?.title || null}
                                      eligibility={sub.eligibility?.title || null}
                                      modules={Array.isArray(sub.modules) ? sub.modules : []}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                );
              }

              return null;
            })()}

          </div>

          {/* Right Sidebar Column (4 cols): Enquire Now */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md">
              <FormWrapper
                title="Enquire Now"
                subtitle="Academic Experts will assist you!"
                defaultCourse={displayHeroTitle}
                formNameOverride={`CourseDetailPage_${course.slug}`}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
