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
import { getAssetPath } from "@/lib/utils";
import { useFormModal } from "@/context/FormModalContext";

/* ─────────────────────────────────────────────────────────────
   BANNER_IMAGES — JSON config for right-side hero card images.
   Key  : course slug (string)
   Value: absolute URL or path to the banner image
   Use  : Add/update entries here to change banner per course.
   "default" is used when no slug match is found.
───────────────────────────────────────────────────────────── */
const BANNER_IMAGES = {
  // Example entries — replace slugs and URLs as needed:
  // "executive-development-programme-in-human-resource-management": "/assets/images/banners/hrm-banner.webp",
  // "post-graduate-diploma-in-management": "/assets/images/banners/pgdm-banner.webp",

  // ── Default fallback image (shown when no slug matches) ──
  default: "/media/images/2026/07/28/01abe8d532ba5872f3a6cdab896b9ccd.png",
};

/* ─────────────────────────────────────────────────────────────
   COURSE_CONTENT — Static JSON for all page content sections.
   Key  : course slug (string)
   Each entry has: overviewTitle, overviewDescription, courseSnapshot,
                   whyChooseTitle, whyChooseDescription, keyHighlights,
                   whoCanApply, admissionProcess, courseSnapshotBottom
   "default" is used when no slug match is found.
───────────────────────────────────────────────────────────── */
const COURSE_CONTENT = {
  "executive-development-programme-in-human-resource-management": {
    overviewTitle: "Build Future-Ready HR Leadership Skills with IIM Kozhikode",
    overviewDescription:
      "Transform your HR career with the IIM Kozhikode HR Analytics Course, designed to help professionals master people analytics, workforce planning, and strategic HR decision-making. Learn through live online sessions, industry case studies, and practical projects while earning a prestigious certificate from IIM Kozhikode.",
    courseSnapshot: [
      { icon: BankOutlined, label: "Institute", value: "IIM Kozhikode" },
      { icon: ApartmentOutlined, label: "Programme", value: "Professional Certificate Programme" },
      { icon: ClockCircleFilled, label: "Duration", value: "6 Months" },
      { icon: LaptopOutlined, label: "Learning Mode", value: "Live Online" },
      { icon: SafetyCertificateOutlined, label: "Certificate from IIM Kozhikode", value: null },
      { icon: CreditCardOutlined, label: "EMI Options Available", value: null },
      { icon: TeamOutlined, label: "Expert Faculty", value: null },
      { icon: BookOutlined, label: "Industry-Relevant Curriculum", value: null },
    ],
    whyChooseTitle: "Why Choose the IIM Kozhikode HR Analytics Course?",
    whyChooseDescription:
      "The IIM Kozhikode HR Analytics Course is designed for professionals who want to combine HR expertise with data-driven decision-making. The programme equips learners with practical knowledge of HR analytics, workforce planning, talent management, and business strategy through live classes, real-world case studies, and hands-on learning. Whether you're looking to advance in HR or transition into analytics-focused roles, this programme helps you build industry-relevant skills that organizations value.",
    keyHighlights: [
      "Learn from IIM Kozhikode's industry-focused curriculum",
      "Live online sessions with experienced faculty",
      "Real-world HR case studies and practical assignments",
      "Hands-on capstone project",
      "Flexible learning for working professionals",
      "Prestigious IIM Kozhikode certificate",
      "Practical HR analytics and people analytics skills",
      "Career-focused learning approach",
    ],
    whoCanApply: [
      "Working HR professionals seeking career advancement",
      "Graduates aspiring to enter HR domain",
      "Business managers handling people functions",
      "Entrepreneurs managing workforce decisions",
    ],
    admissionProcess: [
      "Fill online application form",
      "Speak with academic counsellor",
      "Submit documents & pay fee",
      "Get admission confirmation",
    ],
    courseSnapshotBottom: [
      { label: "Duration", value: "6 Months" },
      { label: "Mode", value: "Live Online" },
      { label: "Learning Format", value: "Interactive Sessions" },
      { label: "Projects", value: "Capstone Project" },
      { label: "Certificate", value: "IIM Kozhikode" },
      { label: "EMI", value: "Available" },
    ],
    skillsSection: {
      title: "Skills You'll Learn & Curriculum",
      description: "The curriculum is carefully designed to help learners understand modern HR practices while building analytical capabilities. Covering everything from HR fundamentals to workforce analytics and business insights, the programme combines theory with practical applications so learners can confidently solve real workplace challenges.",
      skillsGain: [
        "HR Analytics",
        "People Analytics",
        "Workforce Planning",
        "HR Metrics & KPIs",
        "Talent Acquisition Analytics",
        "Employee Performance Analytics",
        "Strategic HR Management",
        "HR Dashboards",
        "Business Decision-Making",
        "Leadership & Organizational Effectiveness",
      ],
      curriculumOverview: [
        "Module 1 – HR Management Fundamentals",
        "Module 2 – Introduction to HR Analytics",
        "Module 3 – Workforce Planning & Talent Analytics",
        "Module 4 – Performance & Compensation Analytics",
        "Module 5 – Employee Engagement & Retention",
        "Module 6 – HR Dashboards & Business Insights",
        "Module 7 – Capstone Project",
      ],
    },
    learningExperience: {
      title: "An Interactive & Flexible Learning Experience",
      description: "Learn from anywhere without interrupting your professional commitments. The programme combines live faculty sessions with recorded lectures, industry projects, and collaborative learning to provide a practical and engaging educational experience.",
      learningFeatures: [
        "Live Online Interactive Classes",
        "Recorded Sessions for Revision",
        "Industry Case Studies",
        "Practical Assignments",
        "Capstone Project",
        "Peer Learning Opportunities",
        "Faculty Guidance",
        "Dedicated Student Support",
        "Flexible Weekend Learning",
      ],
    },
    instituteSection: {
      title: "Learn from One of India's Premier Management Institutes",
      description: "IIM Kozhikode is recognized for academic excellence, innovative management education, and industry-oriented programmes. This programme reflects the institute's commitment to preparing professionals with future-ready business and leadership skills.",
      certificateTitle: "Earn a Prestigious Certificate",
      certificateDescription: "Upon successful completion, participants receive a Professional Certificate in HR Management & Analytics from IIM Kozhikode, adding credibility to their professional profile and demonstrating expertise in modern HR practices.",
      certificateImage: "/media/images/2026/07/30/1a4f40f078b735f63422aad57d0c3ca3.webp",
      whyItMatters: [],
    },
    careerSection: {
      title: "Advance Your Career with In-Demand HR Analytics Skills",
      description: "Organizations are increasingly seeking HR professionals who can use data to improve workforce performance and business outcomes. This programme prepares learners with practical HR analytics knowledge that can support career growth across multiple industries and organizational functions.",
      careerOpportunities: [
        "HR Analyst",
        "People Analytics Specialist",
        "HR Business Partner",
        "Talent Acquisition Manager",
        "Workforce Planning Analyst",
        "Learning & Development Manager",
        "HR Operations Manager",
        "HR Manager",
      ],
      industriesHiring: [
        "Information Technology",
        "Consulting",
        "BFSI",
        "Healthcare",
        "Manufacturing",
        "Retail",
        "E-commerce",
        "Startups",
      ],
    },
    feeSection: {
      title: "Flexible Fee & Payment Options",
      description: "Invest in your professional growth with flexible payment plans that make quality education more accessible. Learners can explore EMI options and available financial assistance while receiving guidance from programme advisors throughout the enrollment process.",
      financialSupport: [
        "Affordable EMI Options",
        "Flexible Payment Plans",
        "Scholarship Support (If Applicable)",
        "Corporate Sponsorship Assistance",
        "Dedicated Admission Guidance",
      ],
      footerNote: "Need help with fees? Speak with our admission counsellors for the latest fee structure, scholarships, and EMI options.",
    },
    faqSection: {
      title: "Frequently Asked Questions (FAQs)",
      faqs: [
        {
          question: "1. Who is eligible for this programme?",
          answer: "The programme is designed for working professionals who want to build expertise in HR Management and HR Analytics. Applicants should have a Bachelor's degree with at least 2 years of work experience, or a Master's degree. Admission is based on the application review and the programme's selection criteria.",
        },
        {
          question: "2. Is the course fully online?",
          answer: "Yes. The programme is delivered in a fully online learning format, making it convenient for working professionals. It includes self-paced learning, interactive live sessions, industry-led discussions, case studies, projects, and doubt-resolution sessions that can be accessed remotely.",
        },
        {
          question: "3. Will I receive a certificate from IIM Kozhikode?",
          answer: "Yes. Upon successfully completing the programme and meeting all academic requirements, learners receive a Professional Certificate Programme in HR Management and Analytics from IIM Kozhikode. The programme also includes additional industry-recognized certifications, where applicable.",
        },
        {
          question: "4. What is the duration of the programme?",
          answer: "The programme is 6 months long and is structured for working professionals. Learners are generally expected to dedicate 6–8 hours per week to lectures, assignments, projects, and live sessions.",
        },
        {
          question: "5. Are live classes recorded?",
          answer: "Yes. Live sessions are conducted by faculty and industry experts, and recordings are generally made available so learners can revisit the content or catch up on missed sessions at their convenience.",
        },
        {
          question: "6. Is EMI available?",
          answer: "Yes. The programme offers No Cost EMI and flexible financing options through leading banking partners, making it easier for learners to pay the programme fee in affordable monthly installments, subject to eligibility and bank terms.",
        },
        {
          question: "7. How do I apply?",
          answer: "You can apply online by submitting the application form. The admissions team reviews your educational background and work experience. If shortlisted, you will receive an offer letter, after which you can confirm your admission by paying the seat-blocking amount and completing the enrollment process.",
        },
        {
          question: "8. Will I receive career guidance?",
          answer: "Yes. The programme provides comprehensive career support, including 1:1 career coaching, AI-powered profile building, interview preparation, career readiness modules, networking opportunities, mock interviews, and post-programme career support to help learners advance their careers.",
        },
      ],
    },
  },

  // ── Add more course slugs below ──

  default: {
    overviewTitle: "",
    overviewDescription: "",
    courseSnapshot: [],
    whyChooseTitle: "",
    whyChooseDescription: "",
    keyHighlights: [],
    whoCanApply: [],
    admissionProcess: [],
    courseSnapshotBottom: [],
    skillsSection: { title: "", description: "", skillsGain: [], curriculumOverview: [] },
    learningExperience: { title: "", description: "", learningFeatures: [] },
    instituteSection: { title: "", description: "", certificateTitle: "", certificateDescription: "", certificateImage: "", whyItMatters: [] },
    careerSection: { title: "", description: "", careerOpportunities: [], industriesHiring: [] },
    feeSection: { title: "", description: "", financialSupport: [], footerNote: "" },
    faqSection: { title: "", faqs: [] },
  },
};

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

  // ── Static content from COURSE_CONTENT JSON (keyed by course slug) ──
  const staticContent = COURSE_CONTENT[course.slug] || COURSE_CONTENT["default"];
  const overviewText = staticContent.overviewDescription || heroSub?.content || heroSub?.description || course.description || "";
  const overviewTitle = staticContent.overviewTitle || "Course Overview";
  const courseSnapshot = staticContent.courseSnapshot || [];
  const whyChooseTitle = staticContent.whyChooseTitle || "Why Choose This Course?";
  const whyChooseDescription = staticContent.whyChooseDescription || "";
  const highlightsList = staticContent.keyHighlights.length > 0
    ? staticContent.keyHighlights
    : ((heroSub && Array.isArray(heroSub.keyHighlights) && heroSub.keyHighlights.length > 0)
      ? heroSub.keyHighlights
      : ((heroSub && Array.isArray(heroSub.modules) && heroSub.modules.length > 0) ? heroSub.modules : []));
  const whoCanApplyList = staticContent.whoCanApply.length > 0
    ? staticContent.whoCanApply
    : ((heroSub && Array.isArray(heroSub.whoCanApply) && heroSub.whoCanApply.length > 0) ? heroSub.whoCanApply : []);
  const admissionProcessList = staticContent.admissionProcess.length > 0
    ? staticContent.admissionProcess
    : ((heroSub && Array.isArray(heroSub.admissionProcess) && heroSub.admissionProcess.length > 0) ? heroSub.admissionProcess : []);
  const courseSnapshotBottom = staticContent.courseSnapshotBottom || [];
  const skillsSection = staticContent.skillsSection || { title: "", description: "", skillsGain: [], curriculumOverview: [] };
  const learningExperience = staticContent.learningExperience || { title: "", description: "", learningFeatures: [] };
  const instituteSection = staticContent.instituteSection || { title: "", description: "", certificateTitle: "", certificateDescription: "", certificateImage: "", whyItMatters: [] };
  const careerSection = staticContent.careerSection || { title: "", description: "", careerOpportunities: [], industriesHiring: [] };
  const feeSection = staticContent.feeSection || { title: "", description: "", financialSupport: [], footerNote: "" };
  const faqSection = staticContent.faqSection || { title: "", faqs: [] };

  const rawLogo = uniObj?.logoSrc?.url || uniObj?.logoSrc;
  const logoUrl = getAssetPath(rawLogo, null);

  // ── Banner image: first look up BANNER_IMAGES JSON by slug, then fallback chain ──
  const bannerFromJson = BANNER_IMAGES[course.slug] || BANNER_IMAGES["default"];
  const rawImage = uniObj?.imageSrc?.url || uniObj?.imageSrc || (typeof course.image === "object" ? course.image?.url : course.image);
  const imageUrl = getAssetPath(rawImage, null) || bannerFromJson;

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
