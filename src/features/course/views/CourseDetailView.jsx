"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Breadcrumb, Spin } from "antd";
import {
  ArrowLeftOutlined,
  ClockCircleFilled,
  BankOutlined,
  CheckCircleFilled,
  BookFilled,
  DollarOutlined,
  LaptopOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
  BookOutlined,
  CreditCardOutlined,
  TeamOutlined,
  ApartmentOutlined,
  RightOutlined,
  RocketOutlined,
  BulbOutlined,
  ReadOutlined,
  VideoCameraOutlined,
  TrophyOutlined,
  StarFilled,
  PlusOutlined,
  MinusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import FormWrapper from "@/components/forms/FormWrapper";
import NotFoundPage from "@/components/website/NotFoundPage";
import { getAssetPath } from "@/lib/utils";
import { useFormModal } from "@/context/FormModalContext";



/* ─────────────────────────────────────────────────────────────
   Course content is now loaded dynamically from the CMS via SSR.
───────────────────────────────────────────────────────────── */


/* ─────────────────────────────────────────────────────────────
   FAQItem: controlled accordion item with smooth max-height animation
───────────────────────────────────────────────────────────── */
function FAQItem({ question, answer, isOpen, onToggle }) {
  const contentRef = React.useRef(null);

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-[#0C3058] shadow-md" : "border-slate-200 bg-white hover:border-slate-300"
        }`}
      style={{ background: isOpen ? "linear-gradient(135deg,#EFF6FF 0%,#F0F9FF 100%)" : "#ffffff" }}
    >
      {/* ── Header button ── */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer bg-transparent border-none outline-none"
      >
        <span className={`text-sm font-bold leading-snug transition-colors duration-200 ${isOpen ? "text-[#0C3058]" : "text-slate-800"
          }`}>
          {question}
        </span>
        <span
          className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 transition-all duration-300 ${isOpen ? "bg-[#0C3058] text-white rotate-0" : "bg-slate-100 text-slate-500"
            }`}
          style={{ transform: isOpen ? "rotate(0deg)" : "rotate(0deg)" }}
        >
          {isOpen
            ? <MinusOutlined className="text-xs" style={{ transition: "transform 0.3s" }} />
            : <PlusOutlined className="text-xs" style={{ transition: "transform 0.3s" }} />}
        </span>
      </button>

      {/* ── Animated content panel ── */}
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? (contentRef.current ? contentRef.current.scrollHeight + "px" : "500px") : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="px-5 pb-5 pt-1">
          <div className="h-px bg-[#0C3058]/10 mb-3" />
          <p className="text-sm text-slate-600 font-normal leading-relaxed m-0">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FAQAccordion: manages accordion state — only 1 item open at a time
───────────────────────────────────────────────────────────── */
function FAQAccordion({ faqs, title }) {
  const [activeFaqIdx, setActiveFaqIdx] = useState(null);
  const toggle = (idx) => setActiveFaqIdx(prev => prev === idx ? null : idx);
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
      <div>
        <h2 className="text-0.5xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3 flex items-center gap-2.5">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#FFF8E1] shrink-0">
            <QuestionCircleOutlined className="text-[#F59E0B] text-base" />
          </span>
          {title || "Frequently Asked Questions"}
        </h2>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <FAQItem
            key={idx}
            question={faq.question}
            answer={faq.answer}
            isOpen={activeFaqIdx === idx}
            onToggle={() => toggle(idx)}
          />
        ))}
      </div>
    </div>
  );
}

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

  const course = initialCourse;
  const [activeUniIdx, setActiveUniIdx] = useState(course && typeof course.activeOfferingIdx === "number" ? course.activeOfferingIdx : 0);

  if (!course) {
    return (
      <NotFoundPage 
        title="Course Not Found" 
        message="We couldn't find the course you're looking for. It might have been moved, renamed, or is currently unavailable."
        buttonText="Explore All Courses"
        redirectUrl="/courses"
      />
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

  // ── Dynamic content from CMS (heroSub) with fallbacks ──
  const overviewTitle = heroSub?.overviewTitle || "Course Overview";
  const overviewText = heroSub?.overviewDescription || heroSub?.content || heroSub?.description || course.description || "";
  
  const courseSnapshot = [];
  if (uniName) courseSnapshot.push({ icon: BankOutlined, label: "Institute", value: uniName });
  if (heroSub?.title) courseSnapshot.push({ icon: ApartmentOutlined, label: "Programme", value: heroSub.title });
  if (primaryDuration) courseSnapshot.push({ icon: ClockCircleFilled, label: "Duration", value: primaryDuration });
  
  const whyChooseTitle = heroSub?.whyChooseTitle || "Why Choose This Course?";
  const whyChooseDescription = heroSub?.whyChooseDescription || "";
  
  const highlightsList = Array.isArray(heroSub?.keyHighlights) && heroSub.keyHighlights.length > 0 
    ? heroSub.keyHighlights 
    : ((heroSub && Array.isArray(heroSub.modules) && heroSub.modules.length > 0) ? heroSub.modules : []);
    
  const whoCanApplyList = Array.isArray(heroSub?.whoCanApply) && heroSub.whoCanApply.length > 0 ? heroSub.whoCanApply : [];
  
  const admissionProcessList = Array.isArray(heroSub?.admissionProcess) && heroSub.admissionProcess.length > 0 ? heroSub.admissionProcess : [];
  
  const courseSnapshotBottom = Array.isArray(heroSub?.courseSnapshotBottom) && heroSub.courseSnapshotBottom.length > 0 
    ? heroSub.courseSnapshotBottom 
    : [];
    
  const skillsSection = heroSub?.skillsSection || { title: "", description: "", skillsGain: [], curriculumOverview: [] };
  const learningExperience = heroSub?.learningExperience || { title: "", description: "", learningFeatures: [] };
  const instituteSection = heroSub?.instituteSection || { title: "", description: "", certificateTitle: "", certificateDescription: "", certificateImage: "", whyItMatters: [] };
  const careerSection = heroSub?.careerSection || { title: "", description: "", careerOpportunities: [], industriesHiring: [] };
  const feeSection = heroSub?.feeSection || { title: "", description: "", financialSupport: [], footerNote: "" };
  const faqSection = heroSub?.faqSection || { title: "", faqs: [] };

  const rawLogo = uniObj?.logoSrc?.url || uniObj?.logoSrc;
  const logoUrl = getAssetPath(rawLogo, null);

  // ── Banner image: sourced from university image or course image ──
  const rawImage = uniObj?.imageSrc?.url || uniObj?.imageSrc || (typeof course.image === "object" ? course.image?.url : course.image);
  const imageUrl = getAssetPath(rawImage, "/media/images/2026/07/28/01abe8d532ba5872f3a6cdab896b9ccd.png");

  return (
    <div className="bg-[#F4F6F9] min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── Breadcrumb + Back Button ── */}
        <div className="hidden md:flex flex-wrap items-center justify-between gap-4">
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
        <div className="bg-gradient-to-r from-[#0F3759] via-[#103D6D] to-[#154E8A] rounded-3xl overflow-hidden shadow-xl text-white relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Content Area */}
            <div className="lg:col-span-7 space-y-5 p-6 pb-0 lg:pl-10 lg:py-10">
              <span className="bg-[#FAF0CA] text-[#0C3058] font-extrabold text-xs uppercase px-4 py-1.5 rounded-full inline-block tracking-wider shadow-2xs">
                {categoryName}
              </span>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight m-0">
                {displayHeroTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm font-semibold text-slate-200 pt-4">
                <span className="flex items-center gap-1.5">
                  <ClockCircleFilled className="text-[#FFC107] text-base" /> Duration: <strong className="text-white">{primaryDuration}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <ClockCircleFilled className="text-[#FFC107] text-base" /> Admission Deadline: <strong className="text-white">31-Jul-26</strong>
                </span>
              </div>

              <div className="flex items-center gap-4 pt-2">
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
                  className="bg-[#00B4D8] hover:bg-[#0096C7] text-white border-none font-bold text-sm px-4 rounded-xl shadow-md cursor-pointer flex items-center gap-1"
                >
                  Get Brochure ↓
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
                  className="bg-transparent hover:bg-white/10 text-white border-2 border-white/80 font-bold text-sm px-4 rounded-xl cursor-pointer"
                >
                  Get Counseling
                </Button>
              </div>
            </div>

            {/* Right Card Area (Matching Reference PDF Hero Graphic Card) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full text-slate-800 group overflow-hidden">
                {/* Banner image sourced from BANNER_IMAGES JSON (top of file) */}
                <div className="relative w-full h-100 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                  <Image
                    src={imageUrl}
                    alt={uniName}
                    fill
                    unoptimized
                    className="object-cover"
                  />
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
                {/* overviewTitle from COURSE_CONTENT JSON */}
                <h2 className="text-0.5xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3 flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#EBF4FF] shrink-0">
                    <RocketOutlined className="text-[#0C3058] text-base" />
                  </span>
                  {overviewTitle || "Course Overview"}
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base mt-4 m-0 font-medium">
                  {overviewText}
                </p>
              </div>

              {/* Course Snapshot — from COURSE_CONTENT JSON */}
              {courseSnapshot.length > 0 && (
                <div className="pt-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#0C3058] mb-3">Course Snapshot</h3>
                  <ul className="space-y-2 text-slate-700 text-sm font-medium">
                    {courseSnapshot.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 leading-snug">
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#EBF4FF] shrink-0">
                          <item.icon className="text-[#0C3058] text-sm" />
                        </span>
                        <span>
                          {item.value
                            ? <><strong className="text-slate-900">{item.label}:</strong> {item.value}</>
                            : <strong className="text-slate-900">{item.label}</strong>
                          }
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 1b. Why Choose + Key Highlights + Course Snapshot — 2-column grid layout */}
            {(whyChooseTitle || whyChooseDescription || highlightsList.length > 0) && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                {/* Section heading + description */}
                <div>
                  <h2 className="text-0.5xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3 flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#FFF8E1] shrink-0">
                      <BulbOutlined className="text-[#F59E0B] text-base" />
                    </span>
                    {whyChooseTitle}
                  </h2>
                  {whyChooseDescription && (
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base mt-4 m-0 font-medium">
                      {whyChooseDescription}
                    </p>
                  )}
                </div>

                {/* 2-column grid: Key Highlights (left) + Course Snapshot (right) */}
                {(highlightsList.length > 0 || courseSnapshotBottom.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">

                    {/* LEFT BOX — Key Highlights with circle checkboxes */}
                    {highlightsList.length > 0 && (
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                        <h3 className="text-base font-extrabold text-[#0C3058] m-0">Key Highlights</h3>
                        <ul className="space-y-2.5 pt-3">
                          {highlightsList.map((mod, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-light leading-snug">
                              <CheckCircleFilled className="text-[#22b425] text-base mt-0.5 shrink-0" />
                              <span>
                                <strong className="text-slate-900">{typeof mod === "object" ? mod.title : mod}</strong>
                                {typeof mod === "object" && mod.description ? ` — ${mod.description}` : ""}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* RIGHT BOX — Course Snapshot with right arrows */}
                    {courseSnapshotBottom.length > 0 && (
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                        <h3 className="text-base font-extrabold text-[#0C3058] m-0">Course Snapshot</h3>
                        <ul className="space-y-2.5 pt-3">
                          {courseSnapshotBottom.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium leading-snug">
                              <RightOutlined className="text-[#22b425] text-xs shrink-0" />
                              <span>
                                <strong className="text-slate-700 font-bold">{item.label}{" "}:</strong>{" "}
                                <span className="font-light">{item.value}</span>
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>
                )}
              </div>
            )}

            {/* ── REMOVE: Eligibility & Admission Process card removed per user request ── */}

            {/* 3. Skills You'll Learn & Curriculum Card */}
            {skillsSection.title && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                <div>
                  <h2 className="text-0.5xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3 flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#E8F5E9] shrink-0">
                      <ReadOutlined className="text-[#22b425] text-base" />
                    </span>
                    {skillsSection.title}
                  </h2>
                  {skillsSection.description && (
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base mt-4 m-0 font-medium">
                      {skillsSection.description}
                    </p>
                  )}
                </div>

                {(skillsSection.skillsGain.length > 0 || skillsSection.curriculumOverview.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* LEFT: Skills You'll Gain */}
                    {skillsSection.skillsGain.length > 0 && (
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                        <h3 className="text-base font-extrabold text-[#0C3058] m-0">Skills You'll Gain</h3>
                        <ul className="space-y-2.5 pt-3">
                          {skillsSection.skillsGain.map((skill, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-light leading-snug">
                              <CheckCircleFilled className="text-[#22b425] text-base mt-0.5 shrink-0" />
                              <strong className="text-slate-900">{skill}</strong>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* RIGHT: Curriculum Overview */}
                    {skillsSection.curriculumOverview.length > 0 && (
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                        <h3 className="text-base font-extrabold text-[#0C3058] m-0">Curriculum Overview</h3>
                        <ul className="space-y-2.5 pt-3">
                          {skillsSection.curriculumOverview.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium leading-snug">
                              <RightOutlined className="text-[#22b425] text-xs shrink-0" />
                              <span className="font-light text-slate-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 4. Learning Experience Card */}
            {learningExperience.title && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                <div>
                  <h2 className="text-0.5xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3 flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#EDE7F6] shrink-0">
                      <VideoCameraOutlined className="text-[#7B1FA2] text-base" />
                    </span>
                    {learningExperience.title}
                  </h2>
                  {learningExperience.description && (
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base mt-4 m-0 font-medium">
                      {learningExperience.description}
                    </p>
                  )}
                </div>

                {learningExperience.learningFeatures.length > 0 && (
                  <div className="pt-2">
                    <h3 className="text-base font-extrabold text-[#0C3058] m-0 mb-3">Learning Features</h3>
                    <div className="pb-5">
                      <ul className="space-y-2.5">
                        {learningExperience.learningFeatures.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-light leading-snug">
                            <CheckCircleFilled className="text-[#22b425] text-base mt-0.5 shrink-0" />
                            <strong className="text-slate-900">{feature}</strong>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. Institute & Certificate Card */}
            {instituteSection.title && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                <div>
                  <h2 className="text-0.5xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3 flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#EBF4FF] shrink-0">
                      <BankOutlined className="text-[#0C3058] text-base" />
                    </span>
                    {instituteSection.title}
                  </h2>
                  {instituteSection.description && (
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base mt-4 m-0 font-medium">
                      {instituteSection.description}
                    </p>
                  )}
                </div>

                {(instituteSection.certificateTitle || instituteSection.certificateImage || instituteSection.whyItMatters.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 items-center">
                    {/* LEFT: Earn a Certificate description */}
                    {instituteSection.certificateTitle && (
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3 h-full flex flex-col justify-center">
                        <h3 className="text-base font-extrabold text-[#0C3058] m-0 flex items-center gap-2">
                          {/* <StarFilled className="text-[#F59E0B] text-sm" /> */}
                          {instituteSection.certificateTitle}
                        </h3>
                        {instituteSection.certificateDescription && (
                          <p className="text-sm text-slate-600 font-light leading-relaxed mt-2">
                            {instituteSection.certificateDescription}
                          </p>
                        )}
                      </div>
                    )}
                    {/* RIGHT: Certificate Image replacing Why It Matters */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex items-center justify-center overflow-hidden h-full">
                      <img
                        src={instituteSection.certificateImage || "/media/images/2026/07/30/1a4f40f078b735f63422aad57d0c3ca3.webp"}
                        alt="Certificate Preview"
                        className="w-full h-auto object-contain rounded-xl max-h-[240px] shadow-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 6. Career Section Card */}
            {careerSection.title && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                <div>
                  <h2 className="text-0.5xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3 flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#FFF3E0] shrink-0">
                      <TrophyOutlined className="text-[#F59E0B] text-base" />
                    </span>
                    {careerSection.title}
                  </h2>
                  {careerSection.description && (
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base mt-4 m-0 font-medium">
                      {careerSection.description}
                    </p>
                  )}
                </div>

                {(careerSection.careerOpportunities.length > 0 || careerSection.industriesHiring.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* LEFT: Career Opportunities */}
                    {careerSection.careerOpportunities.length > 0 && (
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                        <h3 className="text-base font-extrabold text-[#0C3058] m-0">Career Opportunities</h3>
                        <ul className="space-y-2.5 pt-3">
                          {careerSection.careerOpportunities.map((opp, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-light leading-snug">
                              <CheckCircleFilled className="text-[#22b425] text-base mt-0.5 shrink-0" />
                              <strong className="text-slate-900">{opp}</strong>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* RIGHT: Industries Hiring */}
                    {careerSection.industriesHiring.length > 0 && (
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                        <h3 className="text-base font-extrabold text-[#0C3058] m-0">Industries Hiring</h3>
                        <ul className="space-y-2.5 pt-3">
                          {careerSection.industriesHiring.map((ind, idx) => (
                            <li key={idx} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium leading-snug">
                              <RightOutlined className="text-[#22b425] text-xs shrink-0" />
                              <span className="font-light text-slate-700">{ind}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 7. Flexible Fee & Payment Options Card */}
            {feeSection.title && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                <div>
                  <h2 className="text-0.5xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3 flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#E3F2FD] shrink-0">
                      <CreditCardOutlined className="text-[#1565C0] text-base" />
                    </span>
                    {feeSection.title}
                  </h2>
                  {feeSection.description && (
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base mt-4 m-0 font-medium">
                      {feeSection.description}
                    </p>
                  )}
                </div>

                {feeSection.financialSupport.length > 0 && (
                  <div className="pt-2">
                    <h3 className="text-base font-extrabold text-[#0C3058] m-0 mb-3">Financial Support</h3>
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
                      <ul className="space-y-2.5">
                        {feeSection.financialSupport.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-light leading-snug">
                            <CheckCircleFilled className="text-[#22b425] text-base mt-0.5 shrink-0" />
                            <strong className="text-slate-900">{item}</strong>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {feeSection.footerNote && (
                  <p className="text-sm text-slate-700 font-semibold m-0">
                    {feeSection.footerNote}
                  </p>
                )}
              </div>
            )}



            {/* 8. FAQ Section Card */}
            {faqSection.faqs.length > 0 && (
              <FAQAccordion faqs={faqSection.faqs} title={faqSection.title} />
            )}

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
