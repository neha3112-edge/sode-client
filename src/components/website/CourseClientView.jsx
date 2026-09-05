"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Breadcrumb, Tabs, Skeleton } from "antd";
import {
  ArrowLeftOutlined,
  ClockCircleFilled,
  BankOutlined,
  CheckCircleFilled,
  RightOutlined,
  RocketOutlined,
  BulbOutlined,
  ReadOutlined,
  VideoCameraOutlined,
  TrophyOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  CreditCardOutlined,
  BookOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import FormWrapper from "@/components/forms/FormWrapper";
import NotFoundPage from "@/components/website/NotFoundPage";
import { getAssetPath } from "@/lib/utils";
import { useFormModal } from "@/hooks/useFormModal";
import { request } from "@/services/request";

function FAQItem({ question, answer, isOpen, onToggle }) {
  const contentRef = React.useRef(null);

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${
        isOpen ? "border-[#0C3058]" : "border-gray-200 bg-white hover:border-gray-300"
      }`}
      style={{ background: isOpen ? "linear-gradient(135deg,#EFF6FF 0%,#F0F9FF 100%)" : "#ffffff" }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left cursor-pointer bg-transparent border-none outline-none"
      >
        <span
          className={`text-xs sm:text-sm font-semibold leading-snug transition-colors duration-200 ${
            isOpen ? "text-[#0C3058]" : "text-gray-800"
          }`}
        >
          {question}
        </span>
        <span
          className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 transition-all duration-200 ${
            isOpen ? "bg-[#0C3058] text-white" : "bg-gray-100 text-gray-500"
          }`}
        >
          {isOpen ? (
            <MinusOutlined className="text-[10px]" />
          ) : (
            <PlusOutlined className="text-[10px]" />
          )}
        </span>
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? "1000px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="px-4 pb-4 pt-1">
          <div className="h-px bg-[#0C3058]/10 mb-2.5" />
          <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed m-0">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQAccordion({ faqs, title }) {
  const [activeFaqIdx, setActiveFaqIdx] = useState(null);
  const toggle = (idx) => setActiveFaqIdx((prev) => (prev === idx ? null : idx));
  return (
    <div id="section-faqs" className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 space-y-4">
      <div className="border-b border-gray-200 pb-3">
        <h2 className="text-base sm:text-lg font-semibold text-[#0C3058] m-0 flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFF8E1] shrink-0">
            <QuestionCircleOutlined className="text-[#F59E0B] text-sm" />
          </span>
          {title || "Frequently Asked Questions"}
        </h2>
      </div>
      <div className="space-y-2.5">
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

export default function CourseClientView({ initialData = null, slug = "" }) {
  const router = useRouter();
  const { openFormModal } = useFormModal();
  const [activeUniIdx, setActiveUniIdx] = useState(
    typeof initialData?.activeOfferingIdx === "number" ? initialData.activeOfferingIdx : 0
  );
  const [activeSemesterIdx, setActiveSemesterIdx] = useState(0);

  const course = initialData;

  const offerings = Array.isArray(course?.universityOfferings) ? course.universityOfferings : [];
  const activeOffering = offerings[activeUniIdx] || offerings[0] || null;
  const uniObj = activeOffering?.university || null;
  const uniName = uniObj?.name || "Partner University";

  const slugify = (text) =>
    (text || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const activeSubcourses =
    Array.isArray(activeOffering?.subcourses) && activeOffering.subcourses.length > 0
      ? activeOffering.subcourses
      : [];
  const heroSub =
    (course?.activeSubcourseSlug &&
      activeSubcourses.find((sub) => slugify(sub.title || "") === course?.activeSubcourseSlug)) ||
    activeSubcourses[0] ||
    null;
  const heroSubTitle = heroSub?.title || "";

  const cleanTitle = course?.title || "Program";
  const categoryName =
    Array.isArray(course?.categories) && course.categories.length > 0
      ? course.categories[0]?.name || "Certification"
      : "Certification";

  let displayHeroTitle = cleanTitle;
  if (course?.activeSubcourseSlug && heroSubTitle) {
    displayHeroTitle = heroSubTitle;
    if (uniName && !displayHeroTitle.toLowerCase().includes(uniName.toLowerCase())) {
      displayHeroTitle = `${displayHeroTitle} from ${uniName}`;
    }
  } else {
    if (uniName && !cleanTitle.toLowerCase().includes(uniName.toLowerCase())) {
      displayHeroTitle = `${cleanTitle} from ${uniName}`;
    }
  }

  const primaryDuration =
    (course?.activeSubcourseSlug && heroSub?.duration?.title) ||
    (typeof activeOffering?.duration === "string" ? activeOffering.duration : null) ||
    activeOffering?.duration?.name ||
    activeOffering?.duration?.title ||
    (typeof course?.duration === "string" ? course.duration : null) ||
    course?.duration?.name ||
    course?.duration?.title ||
    "3 Years";

  const displayFee =
    course?.fullFee ||
    (course?.fees?.name ? (course.fees.name.includes("₹") ? course.fees.name : `₹ ${course.fees.name}`) : null) ||
    (course?.amount ? `₹ ${Number(course.amount).toLocaleString("en-IN")}` : null) ||
    (course?.feeSection?.tuitionFee ? `₹ ${Number(course.feeSection.tuitionFee).toLocaleString("en-IN")}` : null) ||
    (activeOffering?.fee?.amount ? `₹ ${Number(activeOffering.fee.amount).toLocaleString("en-IN")}` : null);

  const overviewTitle = course?.overviewSection?.title || heroSub?.overviewTitle || "Course Overview";
  const overviewText =
    course?.overviewSection?.description ||
    heroSub?.overviewDescription ||
    heroSub?.content ||
    heroSub?.description ||
    course?.description ||
    "";

  const courseSnapshot =
    Array.isArray(course?.overviewSection?.courseSnapshot) &&
    course.overviewSection.courseSnapshot.length > 0
      ? course.overviewSection.courseSnapshot
      : [
          ...(uniName ? [{ label: "Institute", value: uniName }] : []),
          ...(heroSub?.title ? [{ label: "Programme", value: heroSub.title }] : []),
          ...(primaryDuration ? [{ label: "Duration", value: primaryDuration }] : []),
          ...(displayFee ? [{ label: "Course Fee", value: displayFee }] : []),
        ];

  const whyChooseTitle = course?.whyChooseSection?.title || heroSub?.whyChooseTitle || "Why Choose This Course?";
  const whyChooseDescription = course?.whyChooseSection?.description || heroSub?.whyChooseDescription || "";

  const highlightsList =
    Array.isArray(course?.whyChooseSection?.keyHighlights) &&
    course.whyChooseSection.keyHighlights.length > 0
      ? course.whyChooseSection.keyHighlights
      : Array.isArray(heroSub?.keyHighlights) && heroSub.keyHighlights.length > 0
        ? heroSub.keyHighlights
        : heroSub && Array.isArray(heroSub.modules) && heroSub.modules.length > 0
          ? heroSub.modules
          : [];

  const whoCanApplyList =
    Array.isArray(course?.admissionSection?.whoCanApply) &&
    course.admissionSection.whoCanApply.length > 0
      ? course.admissionSection.whoCanApply
      : Array.isArray(heroSub?.whoCanApply) && heroSub.whoCanApply.length > 0
        ? heroSub.whoCanApply
        : [];

  const admissionProcessList =
    Array.isArray(course?.admissionSection?.admissionProcess) &&
    course.admissionSection.admissionProcess.length > 0
      ? course.admissionSection.admissionProcess
      : Array.isArray(heroSub?.admissionProcess) && heroSub.admissionProcess.length > 0
        ? heroSub.admissionProcess
        : [];

  const courseSnapshotBottom =
    Array.isArray(course?.whyChooseSection?.courseSnapshotBottom) &&
    course.whyChooseSection.courseSnapshotBottom.length > 0
      ? course.whyChooseSection.courseSnapshotBottom
      : Array.isArray(heroSub?.courseSnapshotBottom) && heroSub.courseSnapshotBottom.length > 0
        ? heroSub.courseSnapshotBottom
        : [];

  const skillsSection = course?.skillsSection || heroSub?.skillsSection || null;
  const learningExperience = course?.learningExperience || heroSub?.learningExperience || null;
  const instituteSection = course?.instituteSection || heroSub?.instituteSection || null;
  const careerSection = course?.careerSection || heroSub?.careerSection || null;
  const feeSection = course?.feeSection || heroSub?.feeSection || null;
  const faqSection = course?.faqSection || heroSub?.faqSection || null;

  const dynamicNavSections = [
    ...(overviewTitle || overviewText ? [{ id: "section-overview", label: "Overview" }] : []),
    ...(whyChooseTitle || whyChooseDescription || highlightsList.length > 0
      ? [{ id: "section-why-choose", label: "Why Choose" }]
      : []),
    ...(whoCanApplyList.length > 0 ||
    admissionProcessList.length > 0 ||
    course?.admissionSection?.eligibilityCriteria?.length > 0 ||
    course?.admissionSection?.documentsRequired?.length > 0
      ? [{ id: "section-admission", label: "Admission" }]
      : []),
    ...(skillsSection &&
    (skillsSection.title ||
      skillsSection.skillsGain?.length > 0 ||
      skillsSection.curriculumOverview?.length > 0 ||
      skillsSection.semesters?.length > 0)
      ? [{ id: "section-curriculum", label: "Curriculum" }]
      : []),
    ...(learningExperience &&
    (learningExperience.title || learningExperience.learningFeatures?.length > 0)
      ? [{ id: "section-experience", label: "Experience" }]
      : []),
    ...(instituteSection &&
    (instituteSection.title ||
      instituteSection.certificateTitle ||
      instituteSection.whyItMatters?.length > 0 ||
      instituteSection.instituteHighlights?.length > 0)
      ? [{ id: "section-certificate", label: "Certificate" }]
      : []),
    ...(careerSection &&
    (careerSection.title ||
      careerSection.careerOpportunities?.length > 0 ||
      careerSection.industriesHiring?.length > 0 ||
      careerSection.jobRoles?.length > 0)
      ? [{ id: "section-career", label: "Career" }]
      : []),
    ...(feeSection &&
    (feeSection.title ||
      feeSection.financialSupport?.length > 0 ||
      feeSection.paymentOptions?.length > 0 ||
      feeSection.feeBreakdown?.length > 0)
      ? [{ id: "section-fees", label: "Fee Details" }]
      : []),
    ...(faqSection && faqSection.faqs && faqSection.faqs.length > 0
      ? [{ id: "section-faqs", label: "FAQs" }]
      : []),
  ];

  const [activeSection, setActiveSection] = useState("section-overview");
  const [showTopBar, setShowTopBar] = useState(false);

  const isManualScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 300) {
        setShowTopBar(true);
      } else {
        setShowTopBar(false);
      }

      if (!isManualScrollingRef.current && dynamicNavSections.length > 0) {
        const offset = 120;
        const sectionElements = dynamicNavSections
          .map((sec) => document.getElementById(sec.id))
          .filter(Boolean);

        let currentSection = dynamicNavSections[0]?.id || "";
        for (let i = 0; i < sectionElements.length; i++) {
          const el = sectionElements[i];
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            currentSection = el.id;
          }
        }
        if (currentSection) {
          setActiveSection(currentSection);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dynamicNavSections]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      setActiveSection(id);
      isManualScrollingRef.current = true;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });

      scrollTimeoutRef.current = setTimeout(() => {
        isManualScrollingRef.current = false;
      }, 700);
    }
  };

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

  const uniLogoUrl = uniObj?.logo?.url || uniObj?.logo
    ? getAssetPath(uniObj.logo?.url || uniObj.logo)
    : null;

  // University Banner Image ('bannerImg' in University model - exactly like university page)
  const uniBannerImage =
    uniObj?.bannerImg?.url ||
    uniObj?.bannerImg ||
    (typeof course?.universityId?.bannerImg === "object"
      ? course?.universityId?.bannerImg?.url
      : course?.universityId?.bannerImg) ||
    course?.heroMedia?.url ||
    course?.heroMedia ||
    uniObj?.image?.url ||
    uniObj?.image ||
    null;

  const rawImage = uniBannerImage;
  const imageUrl = rawImage ? getAssetPath(rawImage) : null;

  const rawCertImage =
    instituteSection?.certificateImage?.url || instituteSection?.certificateImage;

  const certificateImageUrl = rawCertImage ? getAssetPath(rawCertImage) : null;

  return (
    <div className="bg-[#F1F4F9] min-h-screen py-5 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-5">
        {/* Breadcrumb + Back Button */}
        <div className="hidden md:flex flex-wrap items-center justify-between gap-3">
              <Breadcrumb
                className="text-xs font-medium text-gray-500"
                items={[
                  { title: <Link href="/" className="hover:text-blue-600">Home</Link> },
                  { title: <Link href="/courses" className="hover:text-blue-600">Courses</Link> },
                  ...(course?.activeSubcourseSlug && heroSubTitle
                    ? [
                        {
                          title: (
                            <Link href={`/courses/${course?.slug || ""}`} className="hover:text-blue-600">
                              {cleanTitle}
                            </Link>
                          ),
                        },
                        { title: <span className="text-gray-800 font-semibold">{heroSubTitle}</span> },
                      ]
                    : [{ title: <span className="text-gray-800 font-semibold">{cleanTitle}</span> }]),
                ]}
              />
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => router.push("/courses")}
                className="bg-white border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer h-8 px-3"
              >
                Back to Courses
              </Button>
            </div>

            {/* Hero Banner */}
            <div className="bg-linear-to-r from-[#0F3759] via-[#103D6D] to-[#154E8A] rounded-3xl overflow-hidden text-white relative border border-gray-200">
              <div className="flex flex-col lg:flex-row items-stretch justify-between">
                <div className="flex-1 space-y-4 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                  <div>
                    <span className="bg-[#FAF0CA] text-[#0C3058] font-semibold text-xs uppercase px-4 py-1.5 rounded-full inline-block tracking-wider">
                      {categoryName}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight tracking-tight m-0">
                    {displayHeroTitle}
                  </h1>

                  {course?.subTitle && (
                    <p className="text-white/85 text-xs sm:text-sm font-normal leading-relaxed m-0 pt-0.5">
                      {course.subTitle}
                    </p>
                  )}

                  {Array.isArray(uniObj?.approvals) && uniObj.approvals.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {uniObj.approvals.slice(0, 5).map((app, aIdx) => (
                        <span
                          key={aIdx}
                          className="bg-white/15 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-md border border-white/20 flex items-center gap-1"
                        >
                          <CheckCircleFilled className="text-[#00E5FF] text-[10px]" />
                          {app.name || app.code}
                        </span>
                      ))}
                      {course?.rating && (
                        <span className="bg-amber-400/20 text-amber-200 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-amber-400/30 flex items-center gap-1">
                          ★ {course.rating} / 5.0
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm font-medium text-gray-200 pt-2">
                    <span className="flex items-center gap-1.5">
                      <ClockCircleFilled className="text-[#FFC107] text-base" /> Duration:{" "}
                      <span className="text-white font-semibold">{primaryDuration}</span>
                    </span>
                    {displayFee && (
                      <span className="flex items-center gap-1.5">
                        <CreditCardOutlined className="text-[#FFC107] text-base" /> Total Fee:{" "}
                        <span className="text-white font-semibold">{displayFee}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <ClockCircleFilled className="text-[#FFC107] text-base" /> Admission Deadline:{" "}
                      <span className="text-white font-semibold">
                        {course?.admissionDeadline || "31-Jul-2026"}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <Button
                      type="primary"
                      size="large"
                      onClick={() => {
                        openFormModal &&
                          openFormModal({
                            title: `Download Brochure - ${cleanTitle}`,
                            subtitle: "Fill details to receive instant access to brochure",
                            defaultCourse: displayHeroTitle,
                            submitButtonText: "Download Brochure",
                          });
                      }}
                      className="bg-[#00B4D8] hover:bg-[#0096C7] text-white border-none font-semibold text-sm px-4 rounded-xl cursor-pointer flex items-center gap-1"
                    >
                      Get Brochure ↓
                    </Button>
                    <Button
                      size="large"
                      onClick={() => {
                        openFormModal &&
                          openFormModal({
                            title: "Get 100% FREE Counseling",
                            subtitle: "Speak directly with our senior academic counselors",
                            defaultCourse: displayHeroTitle,
                            submitButtonText: "Request Counseling",
                          });
                      }}
                      className="bg-transparent hover:bg-white/10 text-white border-2 border-white/80 font-semibold text-sm px-4 rounded-xl cursor-pointer"
                    >
                      Get Counseling
                    </Button>
                  </div>
                </div>

                {/* Right Column: Flush edge-to-edge banner image with compact width */}
                <div className="relative w-full lg:w-72 xl:w-80 min-h-[220px] lg:min-h-full shrink-0 overflow-hidden">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={uniName}
                      fill
                      unoptimized
                      priority
                      className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Fixed Top Bar (Ant Design Tabs) */}
            <div
              className={`fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300 transform ${
                showTopBar
                  ? "translate-y-0 opacity-100 pointer-events-auto"
                  : "-translate-y-full opacity-0 pointer-events-none"
              }`}
            >
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
                <Tabs
                  activeKey={activeSection}
                  onChange={(key) => scrollToSection(key)}
                  tabBarGutter={20}
                  className="[&_.ant-tabs-nav]:mb-0 [&_.ant-tabs-tab-btn]:font-medium [&_.ant-tabs-tab-btn]:text-xs sm:[&_.ant-tabs-tab-btn]:text-sm [&_.ant-tabs-tab-btn]:text-gray-700 [&_.ant-tabs-tab-btn]:hover:text-[#0c3058] [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:text-[#0c3058]! [&_.ant-tabs-ink-bar]:bg-[#0c3058]! [&_.ant-tabs-ink-bar]:h-0.75 [&_.ant-tabs-nav-wrap]:py-1"
                  items={dynamicNavSections.map((sec) => ({
                    key: sec.id,
                    label: sec.label,
                  }))}
                />
              </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Left Main Content Column */}
              <div className="lg:col-span-8 space-y-4">
                {/* Overview */}
                <div
                  id="section-overview"
                  className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-200 space-y-2.5"
                >
                  <div className="border-b border-gray-200 pb-1.5">
                    <h2 className="text-sm sm:text-[15px] font-semibold text-[#0C3058] m-0 flex items-center gap-1.5">
                      <span className="flex items-center justify-center w-5 h-5 rounded bg-[#EBF4FF] shrink-0">
                        <RocketOutlined className="text-[#0C3058] text-[11px]" />
                      </span>
                      {overviewTitle || "Course Overview"}
                    </h2>
                  </div>

                  <p className="text-gray-600 leading-relaxed text-xs sm:text-sm m-0 font-normal">
                    {overviewText}
                  </p>

                  {courseSnapshot.length > 0 && (
                    <div className="pt-0.5">
                      <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] mb-1.5">
                        Course Snapshot
                      </h3>
                      <ul className="space-y-1.5 text-gray-700 text-xs sm:text-sm font-medium p-0 m-0 list-none">
                        {courseSnapshot.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 leading-snug">
                            <span className="flex items-center justify-center w-4 h-4 rounded bg-[#EBF4FF] shrink-0">
                              {item.icon ? (
                                <item.icon className="text-[#0C3058] text-[9px]" />
                              ) : (
                                <RightOutlined className="text-[#0C3058] text-[8px]" />
                              )}
                            </span>
                            <span>
                              {item.value ? (
                                <>
                                  <span className="text-gray-900 font-semibold">{item.label}:</span>{" "}
                                  <span className="text-gray-700 font-normal">{item.value}</span>
                                </>
                              ) : (
                                <span className="text-gray-900 font-semibold">{item.label}</span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Why Choose */}
                {(whyChooseTitle || whyChooseDescription || highlightsList.length > 0) && (
                  <div
                    id="section-why-choose"
                    className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-200 space-y-2.5"
                  >
                    <div className="border-b border-gray-200 pb-1.5">
                      <h2 className="text-sm sm:text-[15px] font-semibold text-[#0C3058] m-0 flex items-center gap-1.5">
                        <span className="flex items-center justify-center w-5 h-5 rounded bg-[#FFF8E1] shrink-0">
                          <BulbOutlined className="text-[#F59E0B] text-[11px]" />
                        </span>
                        {whyChooseTitle}
                      </h2>
                    </div>

                    {whyChooseDescription && (
                      <p className="text-gray-600 leading-relaxed text-xs sm:text-sm m-0 font-normal">
                        {whyChooseDescription}
                      </p>
                    )}

                    {(highlightsList.length > 0 || courseSnapshotBottom.length > 0) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-0.5">
                        {highlightsList.length > 0 && (
                          <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-3 space-y-1.5">
                            <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] m-0">
                              Key Highlights
                            </h3>
                            <ul className="space-y-1 pt-0.5 p-0 m-0 list-none">
                              {highlightsList.map((mod, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-1.5 text-xs sm:text-sm text-gray-700 font-normal leading-snug"
                                >
                                  <CheckCircleFilled className="text-[#22b425] text-xs mt-0.5 shrink-0" />
                                  <span>
                                    <span className="text-gray-900 font-semibold">
                                      {typeof mod === "object" ? mod.title : mod}
                                    </span>
                                    {typeof mod === "object" && mod.description
                                      ? ` — ${mod.description}`
                                      : ""}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {courseSnapshotBottom.length > 0 && (
                          <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-3 space-y-1.5">
                            <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] m-0">
                              Course Snapshot
                            </h3>
                            <ul className="space-y-1 pt-0.5 p-0 m-0 list-none">
                              {courseSnapshotBottom.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-700 font-normal leading-snug"
                                >
                                  <RightOutlined className="text-[#22b425] text-[8px] shrink-0" />
                                  <span>
                                    <span className="text-gray-800 font-semibold">
                                      {item.label} :
                                    </span>{" "}
                                    <span className="text-gray-600">{item.value}</span>
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

                {/* Admission */}
                {(whoCanApplyList.length > 0 ||
                  admissionProcessList.length > 0 ||
                  course?.admissionSection?.eligibilityCriteria?.length > 0 ||
                  course?.admissionSection?.documentsRequired?.length > 0) && (
                  <div
                    id="section-admission"
                    className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-200 space-y-3"
                  >
                    <div className="border-b border-gray-200 pb-1.5">
                      <h2 className="text-sm sm:text-[15px] font-semibold text-[#0C3058] m-0 flex items-center gap-1.5">
                        <span className="flex items-center justify-center w-5 h-5 rounded bg-[#EBF4FF] shrink-0">
                          <UserOutlined className="text-[#0C3058] text-[11px]" />
                        </span>
                        Eligibility & Admission Process
                      </h2>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm m-0 font-normal">
                      {course?.admissionSection?.description ||
                        "The programme is designed for high school graduates and working professionals seeking an accredited undergraduate degree."}
                    </p>

                    {/* Eligibility Criteria Cards */}
                    {Array.isArray(course?.admissionSection?.eligibilityCriteria) &&
                      course.admissionSection.eligibilityCriteria.length > 0 && (
                        <div className="space-y-1.5">
                          <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] m-0">
                            Key Eligibility Criteria
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                            {course.admissionSection.eligibilityCriteria.map((item, idx) => (
                              <div
                                key={idx}
                                className="bg-gray-50/70 border border-gray-200 rounded-xl p-3 space-y-1"
                              >
                                <h4 className="text-xs font-bold text-gray-900 m-0 flex items-center gap-1.5">
                                  <CheckCircleFilled className="text-[#22b425] text-xs shrink-0" />
                                  {item.title}
                                </h4>
                                <p className="text-xs text-gray-600 m-0 leading-relaxed font-normal">
                                  {item.criteria || item.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-0.5">
                      {whoCanApplyList.length > 0 && (
                        <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-3 space-y-1.5">
                          <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] m-0">
                            Who Can Apply?
                          </h3>
                          <ul className="space-y-1 pt-0.5 p-0 m-0 list-none">
                            {whoCanApplyList.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-1.5 text-xs sm:text-sm text-gray-700 font-normal leading-snug"
                              >
                                <CheckCircleFilled className="text-[#22b425] text-xs mt-0.5 shrink-0" />
                                <span className="text-gray-900 font-semibold">
                                  {typeof item === "object" ? item.title || item.name : item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {admissionProcessList.length > 0 && (
                        <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-3 space-y-1.5">
                          <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] m-0">
                            Admission Steps
                          </h3>
                          <ol className="space-y-1.5 pt-0.5 list-none p-0 m-0">
                            {admissionProcessList.map((step, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 font-normal leading-snug"
                              >
                                <span className="w-4 h-4 rounded-full bg-[#0C3058] text-white text-[9px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                                  {step.stepNumber || idx + 1}
                                </span>
                                <div>
                                  <span className="font-semibold text-gray-800 block">
                                    {typeof step === "object" ? step.title || step.name : step}
                                  </span>
                                  {step.description && (
                                    <span className="text-gray-500 text-[11px] block mt-0.5">
                                      {step.description}
                                    </span>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>

                    {/* Documents Required */}
                    {Array.isArray(course?.admissionSection?.documentsRequired) &&
                      course.admissionSection.documentsRequired.length > 0 && (
                        <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-3 space-y-1.5">
                          <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] m-0 flex items-center gap-1.5">
                            <FileTextOutlined className="text-[#0C3058]" /> Documents Required for Verification
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
                            {course.admissionSection.documentsRequired.map((doc, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-700 font-normal"
                              >
                                <RightOutlined className="text-[#22b425] text-[8px] shrink-0" />
                                <span className="text-gray-800 font-medium">{doc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                )}

                {/* Curriculum */}
                {skillsSection &&
                  (skillsSection.title ||
                    skillsSection.skillsGain?.length > 0 ||
                    skillsSection.curriculumOverview?.length > 0 ||
                    skillsSection.semesters?.length > 0) && (
                    <div
                      id="section-curriculum"
                      className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-200 space-y-3"
                    >
                      <div className="border-b border-gray-200 pb-1.5">
                        <h2 className="text-sm sm:text-[15px] font-semibold text-[#0C3058] m-0 flex items-center gap-1.5">
                          <span className="flex items-center justify-center w-5 h-5 rounded bg-[#E8F5E9] shrink-0">
                            <ReadOutlined className="text-[#22b425] text-[11px]" />
                          </span>
                          {skillsSection.title || "Skills You'll Learn & Curriculum"}
                        </h2>
                      </div>

                      {skillsSection.description && (
                        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm m-0 font-normal">
                          {skillsSection.description}
                        </p>
                      )}

                      {/* Skills Gain & Curriculum Overview */}
                      {((skillsSection.skillsGain && skillsSection.skillsGain.length > 0) ||
                        (skillsSection.curriculumOverview &&
                          skillsSection.curriculumOverview.length > 0)) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-0.5">
                          {skillsSection.skillsGain && skillsSection.skillsGain.length > 0 && (
                            <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-3 space-y-1.5">
                              <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] m-0">
                                Skills You&apos;ll Gain
                              </h3>
                              <ul className="space-y-1 pt-0.5 p-0 m-0 list-none">
                                {skillsSection.skillsGain.map((skill, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-1.5 text-xs sm:text-sm text-gray-700 font-normal leading-snug"
                                  >
                                    <CheckCircleFilled className="text-[#22b425] text-xs mt-0.5 shrink-0" />
                                    <span className="text-gray-900 font-semibold">{skill}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {skillsSection.curriculumOverview &&
                            skillsSection.curriculumOverview.length > 0 && (
                              <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-3 space-y-1.5">
                                <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] m-0">
                                  Curriculum Overview
                                </h3>
                                <ul className="space-y-1 pt-0.5 p-0 m-0 list-none">
                                  {skillsSection.curriculumOverview.map((item, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-700 font-normal leading-snug"
                                    >
                                      <RightOutlined className="text-[#22b425] text-[8px] shrink-0" />
                                      <span className="text-gray-700">
                                        {typeof item === "object" ? item.title || item.name : item}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </div>
                      )}

                      {/* Detailed Semester-wise Curriculum */}
                      {Array.isArray(skillsSection?.semesters) &&
                        skillsSection.semesters.length > 0 && (
                          <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-3 sm:p-4 space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-2">
                              <h3 className="text-xs sm:text-sm font-bold text-[#0C3058] m-0 flex items-center gap-1.5">
                                <BookOutlined className="text-[#22b425]" /> Semester-wise Detailed Syllabus
                              </h3>
                              <span className="text-xs text-gray-500 font-medium">
                                {skillsSection.semesters.length} Semesters • Complete Curriculum
                              </span>
                            </div>

                            {/* Semester Selector Tabs */}
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                              {skillsSection.semesters.map((sem, sIdx) => (
                                <button
                                  key={sIdx}
                                  type="button"
                                  onClick={() => setActiveSemesterIdx(sIdx)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all cursor-pointer border ${
                                    activeSemesterIdx === sIdx
                                      ? "bg-[#0C3058] text-white border-[#0C3058] shadow-xs"
                                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                                  }`}
                                >
                                  Sem {sem.semesterNumber || sIdx + 1}
                                </button>
                              ))}
                            </div>

                            {/* Active Semester Subjects List */}
                            {skillsSection.semesters[activeSemesterIdx] && (
                              <div className="space-y-2 pt-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-xs sm:text-sm font-bold text-gray-800 m-0">
                                    {skillsSection.semesters[activeSemesterIdx].semesterTitle ||
                                      `Semester ${activeSemesterIdx + 1}`}
                                  </h4>
                                  <span className="text-[11px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-md border border-emerald-200">
                                    {skillsSection.semesters[activeSemesterIdx].subjects?.length || 0} Subjects
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 gap-1.5 pt-1">
                                  {skillsSection.semesters[activeSemesterIdx].subjects?.map(
                                    (sub, subIdx) => (
                                      <div
                                        key={subIdx}
                                        className="bg-white border border-gray-200 rounded-lg p-2.5 flex items-center justify-between gap-3 hover:border-blue-300 transition-colors"
                                      >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                          {sub.subjectCode && (
                                            <span className="shrink-0 bg-blue-50 text-blue-700 font-bold text-[11px] px-2 py-0.5 rounded-md border border-blue-200">
                                              {sub.subjectCode}
                                            </span>
                                          )}
                                          <span className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                                            {sub.subjectName}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                          {sub.credits && (
                                            <span className="text-[11px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                                              {sub.credits} Credits
                                            </span>
                                          )}
                                          {sub.isElective ? (
                                            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                                              Elective
                                            </span>
                                          ) : (
                                            <span className="text-[10px] font-semibold text-gray-500 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded">
                                              Core
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                    </div>
                  )}

                {/* Experience */}
                {learningExperience &&
                  (learningExperience.title || learningExperience.learningFeatures?.length > 0) && (
                    <div
                      id="section-experience"
                      className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-200 space-y-2.5"
                    >
                      <div className="border-b border-gray-200 pb-1.5">
                        <h2 className="text-sm sm:text-[15px] font-semibold text-[#0C3058] m-0 flex items-center gap-1.5">
                          <span className="flex items-center justify-center w-5 h-5 rounded bg-[#EDE7F6] shrink-0">
                            <VideoCameraOutlined className="text-[#7B1FA2] text-[11px]" />
                          </span>
                          {learningExperience.title ||
                            "An Interactive & Flexible Learning Experience"}
                        </h2>
                      </div>

                      {learningExperience.description && (
                        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm m-0 font-normal">
                          {learningExperience.description}
                        </p>
                      )}

                      {/* Delivery Mode Callouts */}
                      {(learningExperience.deliveryMode ||
                        learningExperience.studyPace ||
                        learningExperience.studentSupport) && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0.5">
                          {learningExperience.deliveryMode && (
                            <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-3 space-y-0.5">
                              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">
                                Learning Mode
                              </span>
                              <p className="text-xs font-bold text-purple-950 m-0">
                                {learningExperience.deliveryMode}
                              </p>
                            </div>
                          )}
                          {learningExperience.studyPace && (
                            <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3 space-y-0.5">
                              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                                Study Pace
                              </span>
                              <p className="text-xs font-bold text-blue-950 m-0">
                                {learningExperience.studyPace}
                              </p>
                            </div>
                          )}
                          {learningExperience.studentSupport && (
                            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3 space-y-0.5">
                              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                                Student Support
                              </span>
                              <p className="text-xs font-bold text-emerald-950 m-0">
                                {learningExperience.studentSupport}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {learningExperience.learningFeatures &&
                        learningExperience.learningFeatures.length > 0 && (
                          <div className="pt-0.5">
                            <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] m-0 mb-1.5">
                              Learning Features
                            </h3>
                            <ul className="space-y-1 p-0 m-0 list-none">
                              {learningExperience.learningFeatures.map((feature, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-1.5 text-xs sm:text-sm text-gray-700 font-normal leading-snug"
                                >
                                  <CheckCircleFilled className="text-[#22b425] text-xs mt-0.5 shrink-0" />
                                  <span className="text-gray-900 font-semibold">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  )}

                {/* Certificate */}
                {instituteSection &&
                  (instituteSection.title ||
                    instituteSection.certificateTitle ||
                    instituteSection.whyItMatters?.length > 0 ||
                    instituteSection.instituteHighlights?.length > 0) && (
                    <div
                      id="section-certificate"
                      className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-200 space-y-3"
                    >
                      <div className="border-b border-gray-200 pb-1.5">
                        <h2 className="text-sm sm:text-[15px] font-semibold text-[#0C3058] m-0 flex items-center gap-1.5">
                          <span className="flex items-center justify-center w-5 h-5 rounded bg-[#EBF4FF] shrink-0">
                            <BankOutlined className="text-[#0C3058] text-[11px]" />
                          </span>
                          {instituteSection.title ||
                            `Learn from One of India's Premier Management Institutes`}
                        </h2>
                      </div>

                      {instituteSection.description && (
                        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm m-0 font-normal">
                          {instituteSection.description}
                        </p>
                      )}

                      {/* Institute Highlights Grid */}
                      {Array.isArray(instituteSection?.instituteHighlights) &&
                        instituteSection.instituteHighlights.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-0.5">
                            {instituteSection.instituteHighlights.map((hl, idx) => (
                              <div
                                key={idx}
                                className="bg-gray-50/70 border border-gray-200 rounded-xl p-3 space-y-1"
                              >
                                <h4 className="text-xs font-bold text-gray-900 m-0 flex items-center gap-1">
                                  <CheckCircleFilled className="text-[#22b425] text-xs shrink-0" />
                                  {hl.title}
                                </h4>
                                <p className="text-[11px] text-gray-600 m-0 leading-relaxed font-normal">
                                  {hl.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                      {(instituteSection.certificateTitle ||
                        certificateImageUrl ||
                        (instituteSection.whyItMatters &&
                          instituteSection.whyItMatters.length > 0)) && (
                        <div
                          className={`grid grid-cols-1 ${
                            instituteSection.certificateTitle && certificateImageUrl
                              ? "md:grid-cols-2"
                              : "grid-cols-1"
                          } gap-3 pt-0.5 items-center`}
                        >
                          {instituteSection.certificateTitle && (
                            <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-3 space-y-1.5 h-full flex flex-col justify-center">
                              <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] m-0 flex items-center gap-1.5">
                                <SafetyCertificateOutlined className="text-[#22b425]" />
                                {instituteSection.certificateTitle}
                              </h3>
                              {instituteSection.certificateDescription && (
                                <p className="text-xs text-gray-600 font-normal leading-relaxed mt-0.5 m-0">
                                  {instituteSection.certificateDescription}
                                </p>
                              )}
                            </div>
                          )}
                          {certificateImageUrl && (
                            <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-2 flex items-center justify-center overflow-hidden h-full">
                              <Image
                                src={certificateImageUrl}
                                alt="Certificate Preview"
                                width={440}
                                height={280}
                                unoptimized
                                className="w-full h-auto object-contain rounded-lg max-h-56 transition-transform duration-300 hover:scale-102"
                                style={{ width: "auto", height: "auto" }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Why Degree Matters Checklist */}
                      {Array.isArray(instituteSection?.whyItMatters) &&
                        instituteSection.whyItMatters.length > 0 && (
                          <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-3 space-y-1.5">
                            <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] m-0">
                              Why This Degree Matters
                            </h3>
                            <ul className="space-y-1.5 pt-0.5 p-0 m-0 list-none">
                              {instituteSection.whyItMatters.map((point, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-1.5 text-xs sm:text-sm text-gray-700 font-normal leading-snug"
                                >
                                  <CheckCircleFilled className="text-[#22b425] text-xs mt-0.5 shrink-0" />
                                  <span className="text-gray-800 font-medium">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  )}

                {/* Career */}
                {careerSection &&
                  (careerSection.title ||
                    careerSection.careerOpportunities?.length > 0 ||
                    careerSection.industriesHiring?.length > 0 ||
                    careerSection.jobRoles?.length > 0) && (
                    <div
                      id="section-career"
                      className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-200 space-y-3"
                    >
                      <div className="border-b border-gray-200 pb-1.5">
                        <h2 className="text-sm sm:text-[15px] font-semibold text-[#0C3058] m-0 flex items-center gap-1.5">
                          <span className="flex items-center justify-center w-5 h-5 rounded bg-[#FFF3E0] shrink-0">
                            <TrophyOutlined className="text-[#F59E0B] text-[11px]" />
                          </span>
                          {careerSection.title || "Advance Your Career with In-Demand Skills"}
                        </h2>
                      </div>

                      {careerSection.description && (
                        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm m-0 font-normal">
                          {careerSection.description}
                        </p>
                      )}

                      {/* Job Roles with Salaries Grid */}
                      {Array.isArray(careerSection?.jobRoles) &&
                        careerSection.jobRoles.length > 0 && (
                          <div className="space-y-1.5 pt-0.5">
                            <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] m-0">
                              Top Job Roles & Salary Packages
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                              {careerSection.jobRoles.map((role, idx) => (
                                <div
                                  key={idx}
                                  className="bg-gray-50/70 border border-gray-200 rounded-xl p-3 space-y-1.5"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 m-0 truncate">
                                      {role.roleName || role.title}
                                    </h4>
                                    {role.avgSalary && (
                                      <span className="shrink-0 bg-emerald-50 text-emerald-700 font-bold text-xs px-2 py-0.5 rounded-md border border-emerald-200">
                                        {role.avgSalary}
                                      </span>
                                    )}
                                  </div>
                                  {role.demand && (
                                    <span className="inline-block text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                                      {role.demand}
                                    </span>
                                  )}
                                  {role.description && (
                                    <p className="text-xs text-gray-600 m-0 leading-relaxed font-normal">
                                      {role.description}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Salary Trends by Experience */}
                      {Array.isArray(careerSection?.salaryTrends) &&
                        careerSection.salaryTrends.length > 0 && (
                          <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-3 space-y-1.5">
                            <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] m-0 flex items-center gap-1.5">
                              <RiseOutlined className="text-[#22b425]" /> Experience-wise Salary Growth
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                              {careerSection.salaryTrends.map((trend, idx) => (
                                <div
                                  key={idx}
                                  className="bg-white border border-gray-200 rounded-lg p-2.5 text-center space-y-0.5"
                                >
                                  <p className="text-xs text-gray-500 font-medium m-0">
                                    {trend.experienceLevel}
                                  </p>
                                  <p className="text-sm font-bold text-[#0C3058] m-0">
                                    {trend.salaryRange}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {((careerSection.careerOpportunities &&
                        careerSection.careerOpportunities.length > 0) ||
                        (careerSection.industriesHiring &&
                          careerSection.industriesHiring.length > 0)) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-0.5">
                          {careerSection.careerOpportunities &&
                            careerSection.careerOpportunities.length > 0 && (
                              <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-3 space-y-1.5">
                                <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] m-0">
                                  Career Opportunities
                                </h3>
                                <ul className="space-y-1 pt-0.5 p-0 m-0 list-none">
                                  {careerSection.careerOpportunities.map((opp, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-1.5 text-xs sm:text-sm text-gray-700 font-normal leading-snug"
                                    >
                                      <CheckCircleFilled className="text-[#22b425] text-xs mt-0.5 shrink-0" />
                                      <span className="text-gray-900 font-semibold">{opp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          {careerSection.industriesHiring &&
                            careerSection.industriesHiring.length > 0 && (
                              <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-3 space-y-1.5">
                                <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] m-0">
                                  Industries Hiring
                                </h3>
                                <ul className="space-y-1 pt-0.5 p-0 m-0 list-none">
                                  {careerSection.industriesHiring.map((ind, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-700 font-normal leading-snug"
                                    >
                                      <RightOutlined className="text-[#22b425] text-[8px] shrink-0" />
                                      <span className="text-gray-700">{ind}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </div>
                      )}
                    </div>
                  )}

                {/* Fees */}
                {feeSection &&
                  (feeSection.title ||
                    feeSection.financialSupport?.length > 0 ||
                    feeSection.paymentOptions?.length > 0 ||
                    feeSection.feeBreakdown?.length > 0) && (
                    <div
                      id="section-fees"
                      className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-200 space-y-3"
                    >
                      <div className="border-b border-gray-200 pb-1.5">
                        <h2 className="text-sm sm:text-[15px] font-semibold text-[#0C3058] m-0 flex items-center gap-1.5">
                          <span className="flex items-center justify-center w-5 h-5 rounded bg-[#E3F2FD] shrink-0">
                            <CreditCardOutlined className="text-[#1565C0] text-[11px]" />
                          </span>
                          {feeSection.title || "Flexible Fee & Payment Options"}
                        </h2>
                      </div>

                      {feeSection.description && (
                        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm m-0 font-normal">
                          {feeSection.description}
                        </p>
                      )}

                      {/* Payment Plans Cards */}
                      {((Array.isArray(feeSection.paymentOptions) &&
                        feeSection.paymentOptions.length > 0) ||
                        (Array.isArray(feeSection.feeBreakdown) &&
                          feeSection.feeBreakdown.length > 0)) && (
                        <div className="space-y-1.5 pt-0.5">
                          <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] m-0">
                            Available Payment Plans & EMI
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {(
                              feeSection.paymentOptions || feeSection.feeBreakdown
                            ).map((plan, idx) => (
                              <div
                                key={idx}
                                className="bg-white border-2 border-[#0C3058]/10 hover:border-[#0C3058] rounded-xl p-3.5 space-y-2 transition-all flex flex-col justify-between shadow-xs"
                              >
                                <div className="space-y-1">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block">
                                    Option {idx + 1}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 m-0">
                                    {plan.title || plan.label}
                                  </h4>
                                  <div className="text-lg sm:text-xl font-extrabold text-[#0C3058]">
                                    {typeof plan.amount === "number"
                                      ? `₹ ${plan.amount.toLocaleString("en-IN")}`
                                      : plan.amount}
                                  </div>
                                  {plan.period && (
                                    <p className="text-[11px] text-gray-500 font-medium m-0">
                                      {plan.period}
                                    </p>
                                  )}
                                  {plan.description && (
                                    <p className="text-xs text-gray-600 font-normal leading-relaxed m-0 pt-0.5">
                                      {plan.description}
                                    </p>
                                  )}
                                </div>
                                <Button
                                  type="primary"
                                  size="small"
                                  onClick={() => {
                                    openFormModal &&
                                      openFormModal({
                                        title: `Enroll with ${plan.title || plan.label}`,
                                        subtitle:
                                          "Our counselor will guide you through registration & zero-cost EMI",
                                        defaultCourse: displayHeroTitle,
                                        submitButtonText: "Enroll with this Plan",
                                      });
                                  }}
                                  className="w-full mt-2 bg-[#0C3058] hover:bg-[#154E8A] text-white text-xs font-semibold rounded-lg h-7 cursor-pointer"
                                >
                                  Select Plan
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {feeSection.financialSupport && feeSection.financialSupport.length > 0 && (
                        <div className="pt-0.5">
                          <h3 className="text-xs sm:text-sm font-semibold text-[#0C3058] m-0 mb-1">
                            Financial Support & Scholarships
                          </h3>
                          <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-3">
                            <ul className="space-y-1 p-0 m-0 list-none">
                              {feeSection.financialSupport.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-1.5 text-xs sm:text-sm text-gray-700 font-normal leading-snug"
                                >
                                  <CheckCircleFilled className="text-[#22b425] text-xs mt-0.5 shrink-0" />
                                  <span className="text-gray-900 font-semibold">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {feeSection.footerNote && (
                        <p className="text-xs text-gray-500 font-medium m-0">
                          {feeSection.footerNote}
                        </p>
                      )}
                    </div>
                  )}

                {/* FAQs */}
                {faqSection && faqSection.faqs && faqSection.faqs.length > 0 && (
                  <FAQAccordion faqs={faqSection.faqs} title={faqSection.title} />
                )}
              </div>

              {/* Right Sidebar Column */}
              <div className="lg:col-span-4 sticky top-6">
                <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-200">
                  <FormWrapper
                    title="Enquire Now"
                    subtitle="Academic Experts will assist you!"
                    defaultCourse={displayHeroTitle}
                    formNameOverride={`CourseDetailPage_${course?.slug || ""}`}
                  />
                </div>
              </div>
            </div>
      </div>
    </div>
  );
}
