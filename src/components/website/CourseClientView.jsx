"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  CreditCard,
  Download,
  MapPin,
  Building,
  Building2,
  ShieldCheck,
  BadgeCheck,
  User,
  GraduationCap,
  Briefcase,
  ShoppingCart,
  Database,
  UserCog,
  MessageSquare,
  Award,
  Plus,
  Minus,
  Check,
  BookOpen,
} from "lucide-react";
import { useFormModal } from "@/hooks/useFormModal";
import { useCompare } from "@/hooks/useCompare";
import { Container } from "@/components/common/Container";
import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";

export default function CourseClientView({
  initialData = null,
  initialCourses = [],
  slug = "",
}) {
  const { openFormModal } = useFormModal();
  const { toggleCompare, isInCompare, setIsCompareDrawerOpen } = useCompare();
  const [openFaq, setOpenFaq] = useState(0);
  const [rawCourses, setRawCourses] = useState(
    Array.isArray(initialCourses) && initialCourses.length > 0 ? initialCourses : []
  );
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    if (rawCourses && rawCourses.length > 0) return;
    request
      .dynamicList({
        entity: "courses",
        endPoint: "v1/list",
        options: { items: 24 },
      })
      .then((res) => {
        const list = res?.result || res?.programs || [];
        if (list.length > 0) {
          setRawCourses(list);
        }
      })
      .catch((err) => {
        console.error("Courses list fetch error:", err);
      });
  }, [rawCourses]);

  const DEFAULT_COURSES = [
    { uniName: "Manipal University Online", cardTitle: "Online Master of Business Administration (MBA)", feeText: "₹ 1,75,000 INR", durationText: "2 Years", slug: "manipal-university-online-mba" },
    { uniName: "Amity University Online", cardTitle: "Online MBA with Global Specialisations", feeText: "₹ 1,99,000 INR", durationText: "2 Years", slug: "amity-university-online-mba" },
    { uniName: "Shoolini University", cardTitle: "Online MBA (Dual Specialisation)", feeText: "₹ 1,40,000 INR", durationText: "2 Years", slug: "shoolini-university-online-mba" },
    { uniName: "Sikkim Manipal University", cardTitle: "Online MBA (UGC-DEB Approved)", feeText: "₹ 1,20,000 INR", durationText: "2 Years", slug: "sikkim-manipal-university-online-mba" },
    { uniName: "Jain University", cardTitle: "Online MBA in Management Studies", feeText: "₹ 1,60,000 INR", durationText: "2 Years", slug: "jain-university-online-mba" },
    { uniName: "Chandigarh University", cardTitle: "Online MBA with Electives", feeText: "₹ 1,50,000 INR", durationText: "2 Years", slug: "chandigarh-university-online-mba" },
    { uniName: "Vivekananda Global University", cardTitle: "Online Master of Business Administration", feeText: "₹ 1,30,000 INR", durationText: "2 Years", slug: "vgu-online-mba" },
    { uniName: "Lovely Professional University", cardTitle: "Online MBA (NAAC A++ Accredited)", feeText: "₹ 1,56,000 INR", durationText: "2 Years", slug: "lpu-online-mba" },
    { uniName: "DU SOL", cardTitle: "Master of Business Administration (Distance)", feeText: "₹ 1,10,000 INR", durationText: "2 Years", slug: "du-sol-mba" },
    { uniName: "IGNOU University", cardTitle: "Distance Master of Business Administration", feeText: "₹ 62,000 INR", durationText: "2 Years", slug: "ignou-mba" },
  ];

  const processedPrograms = useMemo(() => {
    const list = [];
    const sourceList = Array.isArray(rawCourses) && rawCourses.length > 0 ? rawCourses : DEFAULT_COURSES;
    sourceList.forEach((item, index) => {
      if (!item) return;

      const uni = item.universityId || item.university || {};
      const course = item.courseId || item.course || {};
      const subcourse = item.subCourseId || item.subcourse || {};

      const uniName = uni.name || item.uniName || item.name || "Partner University";
      const courseName = course.name || item.courseName || "";
      const fullDisplayName =
        item.displayName || course.displayName || course.displayNames?.[0]?.name || "";
      const effectiveCourseName =
        (course.showDisplayName || item.showDisplayName) && fullDisplayName
          ? fullDisplayName
          : courseName;

      const cardTitle = item.title || effectiveCourseName || item.name || "Online MBA";
      const displayName = fullDisplayName;

      const fees = item.fees || {};
      const duration = item.duration || {};
      const partnerObj =
        uni.viaPartner ||
        item.viaPartner ||
        (Array.isArray(item.partner) && item.partner.length > 0 ? item.partner[0] : null);
      const isPartnerActive = Boolean(
        partnerObj && partnerObj.name && (partnerObj.show === true || partnerObj.showOnWebsite === true)
      );
      const providerName = isPartnerActive ? partnerObj.name : null;

      const rawLogo =
        uni.logo?.url ||
        uni.logo?.path ||
        uni.logoSrc?.url ||
        uni.logoSrc ||
        uni.logo ||
        item.logoUrl;
      const logoUrl = getAssetPath(rawLogo, null);

      let durationText = null;
      if (typeof duration === "string" && duration.trim()) {
        durationText = duration;
      } else if (duration?.name) {
        durationText = duration.name;
      } else if (duration?.months) {
        durationText = `${duration.months} Months`;
      } else if (item.duration) {
        durationText =
          typeof item.duration === "string"
            ? item.duration
            : item.duration.name || (item.duration.months ? `${item.duration.months} Months` : null);
      } else if (item.durationMonths) {
        durationText = `${item.durationMonths} Months`;
      }

      let feeText = null;
      if (fees?.amount) {
        feeText = `₹ ${Number(fees.amount).toLocaleString("en-IN")} INR`;
      } else if (fees?.name) {
        feeText = fees.name.includes("₹") ? `${fees.name} INR` : `₹ ${fees.name} INR`;
      } else if (item.fullFee) {
        feeText = item.fullFee.includes("₹") ? `${item.fullFee} INR` : `₹ ${item.fullFee} INR`;
      } else if (item.amount) {
        feeText = `₹ ${Number(item.amount).toLocaleString("en-IN")} INR`;
      } else if (item.fee) {
        feeText = `${item.fee} INR`;
      }

      const slugify = (text) =>
        (text || "")
          .toString()
          .toLowerCase()
          .trim()
          .replace(/[\s_]+/g, "-")
          .replace(/[^\w-]+/g, "")
          .replace(/--+/g, "-")
          .replace(/^-+|-+$/g, "");

      const uniSlug = uni?.slug || slugify(uniName);
      const courseSlug = course?.slug || slugify(course?.shortName || course?.name || courseName);
      const subcourseSlug = subcourse?.slug || (subcourse?.name ? slugify(subcourse.name) : "");

      let courseDetailHref = "/courses";
      if (uniSlug && courseSlug && subcourseSlug) {
        courseDetailHref = `/courses/${encodeURIComponent(uniSlug)}/${encodeURIComponent(courseSlug)}/${encodeURIComponent(subcourseSlug)}`;
      } else if (uniSlug && courseSlug) {
        courseDetailHref = `/courses/${encodeURIComponent(uniSlug)}/${encodeURIComponent(courseSlug)}`;
      } else if (courseSlug && subcourseSlug) {
        courseDetailHref = `/courses/${encodeURIComponent(courseSlug)}/${encodeURIComponent(subcourseSlug)}`;
      } else if (courseSlug) {
        courseDetailHref = `/courses/${encodeURIComponent(courseSlug)}`;
      } else if (item.slug) {
        courseDetailHref = `/courses/${encodeURIComponent(item.slug)}`;
      }

      list.push({
        ...item,
        _uniqueKey: `${item._id || item.slug || cardTitle || "program"}-${index}`,
        title: cardTitle,
        cardTitle,
        displayName,
        uniName,
        logoUrl,
        providerName,
        durationText,
        feeText,
        courseDetailHref,
        subcourses: item.subcourses || [],
      });
    });

    return list;
  }, [rawCourses]);

  const handleOpenLead = (actionType = "Download Brochure", uni = "Manipal University") => {
    openFormModal({
      course: "Online MBA",
      university: uni,
      action: actionType,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 antialiased font-sans pb-10">
      <div className="w-full bg-white border-b border-gray-200">
        <Container className="py-2 sm:py-1.5 flex items-center justify-between gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden min-w-0 flex-1">
            <Link href="/" className="hover:text-blue-600 transition-colors shrink-0">
              Home
            </Link>
            <span className="text-gray-400 shrink-0">/</span>
            <Link href="/courses" className="hover:text-blue-600 transition-colors shrink-0">
              Courses
            </Link>
            <span className="text-gray-400 shrink-0">/</span>
            <span className="text-gray-800 font-semibold truncate">
              Online Bachelor of Arts (BA) in English
            </span>
          </div>
          <Link
            href="/courses"
            className="bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-blue-600 font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md shadow-2xs flex items-center gap-1 sm:gap-1.5 shrink-0 ml-2 sm:ml-4 transition-all text-[11px] sm:text-xs whitespace-nowrap"
          >
            ← Back to Courses
          </Link>
        </Container>
      </div>

      <div className="pt-4 space-y-6 max-w-6xl mx-auto px-3 sm:px-4 md:px-0">
        <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-[#0C2B4E] flex flex-col md:grid md:grid-cols-12 min-h-80 md:min-h-90">
          {/* Mobile Image (Top) / Desktop Image (Right) */}
          <div className="order-1 md:order-2 md:col-span-6 relative w-full h-64 sm:h-72 md:h-auto min-h-64 sm:min-h-72 md:min-h-full overflow-hidden rounded-b-2xl md:rounded-b-none md:rounded-l-4xl">
            <Image
              src="/assets/manipal_hero_crop.png"
              alt="Manipal University Campus"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Text Content */}
          <div className="order-2 md:order-1 md:col-span-6 text-white p-5 sm:p-7 md:py-9 md:px-9 flex flex-col justify-center space-y-4 md:space-y-5">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white m-0 leading-tight">
                Online MBA
              </h1>
              <p className="text-sm sm:text-base text-blue-100/90 font-medium m-0">
                ( Master of Business Administration)
              </p>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm font-medium text-white/95">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-amber-400 shrink-0" />
                  <span>24 months</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold text-sm sm:text-base">₹</span>
                  <span>INR 35,000/- Semester</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white">
                <Clock size={16} className="text-amber-400 shrink-0" />
                <span>Admission Deadline : 15 September 2026</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 pt-2 w-full">
              <button
                type="button"
                onClick={() => handleOpenLead("Download Broucher")}
                className="flex-1 sm:flex-initial bg-[#E5A93C] hover:bg-[#D4982B] text-gray-950 font-bold px-2.5 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 text-center leading-tight whitespace-nowrap"
              >
                <span>Download Broucher</span>
                <Download size={14} className="shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => handleOpenLead("Get 100% FREE Counseling")}
                className="flex-1 sm:flex-initial bg-transparent border border-white/80 hover:bg-white/10 text-white font-semibold px-2.5 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm transition-all cursor-pointer active:scale-95 flex items-center justify-center text-center leading-tight whitespace-nowrap"
              >
                Get 100% FREE Counseling
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Location */}
            <div className="flex items-start gap-2.5 sm:gap-3">
              <MapPin size={22} className="text-[#0D5CAD] fill-[#0D5CAD] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-gray-600 font-medium block">Location</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight">
                  Jaipur, Rajasthan
                </span>
              </div>
            </div>

            {/* Established */}
            <div className="flex items-start gap-2.5 sm:gap-3">
              <Building2 size={22} className="text-[#0D5CAD] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-gray-600 font-medium block">Established</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight">
                  2011
                </span>
              </div>
            </div>

            {/* Approvals */}
            <div className="flex items-start gap-2.5 sm:gap-3">
              <BadgeCheck size={22} className="text-white fill-[#0D5CAD] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-gray-600 font-medium block">Approvals :</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight">
                  UGC | NAAC A+ | NIRF- 58 | AICTE | WES
                </span>
              </div>
            </div>

            {/* Eligibility */}
            <div className="flex items-start gap-2.5 sm:gap-3">
              <User size={22} className="text-[#0D5CAD] fill-[#0D5CAD] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-gray-600 font-medium block">Eligibility</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight">
                  Graduation with 50%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200/90 p-6 sm:p-4 text-center space-y-3 shadow-xs">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight m-0">
              Manipal Online MBA Course Overview
            </h2>
            <div className="w-full max-w-2xl mx-auto h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-4xl mx-auto m-0 text-center">
            The MBA Duration is 2 years (which is divided into four semesters), ensuring a structured and comprehensive approach to business education. The MBA Course Fees at Manipal University are Rs 45,000 per semester, making it an affordable choice for quality education. Students can also explore scholarships and EMI options for financial ease. Graduates of the Online MBA Course from Manipal University can pursue careers in finance, marketing, human resources, operations, and business consulting. With placement assistance and a strong alumni network, students can secure leadership roles in top corporations, startups, and multinational companies.
          </p>
        </div>

        {/* Rankings & Accreditations */}
        <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-5 sm:mb-7 m-0">
            Rankings & Accreditations of Manipal Online University
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-5 flex flex-col items-center text-center space-y-2 sm:space-y-3 shadow-2xs hover:border-blue-200 transition-colors">
              <div className="h-14 sm:h-16 flex items-center justify-center">
                <Image
                  src="/assets/rankings/ugc.png"
                  alt="UGC-Approved"
                  width={65}
                  height={65}
                  className="object-contain max-h-12 sm:max-h-16 w-auto"
                />
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 m-0">UGC-Approved</h3>
              <p className="text-[11px] sm:text-xs text-gray-500 leading-snug sm:leading-relaxed m-0">
                The online MBA course is University Grant Commission approved.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-5 flex flex-col items-center text-center space-y-2 sm:space-y-3 shadow-2xs hover:border-blue-200 transition-colors">
              <div className="h-14 sm:h-16 flex items-center justify-center">
                <Image
                  src="/assets/rankings/aicte.png"
                  alt="AICTE-Approved"
                  width={65}
                  height={65}
                  className="object-contain max-h-12 sm:max-h-16 w-auto"
                />
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 m-0">AICTE-Approved</h3>
              <p className="text-[11px] sm:text-xs text-gray-500 leading-snug sm:leading-relaxed m-0">
                The online MBA course is University Grant Commission approved.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-5 flex flex-col items-center text-center space-y-2 sm:space-y-3 shadow-2xs hover:border-blue-200 transition-colors">
              <div className="h-14 sm:h-16 flex items-center justify-center">
                <Image
                  src="/assets/rankings/naac.png"
                  alt="NAAC A+ Accredited"
                  width={72}
                  height={65}
                  className="object-contain max-h-12 sm:max-h-16 w-auto"
                />
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 m-0">NAAC A+ Accredited</h3>
              <p className="text-[11px] sm:text-xs text-gray-500 leading-snug sm:leading-relaxed m-0">
                The online MBA course is University Grant Commission approved.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-5 flex flex-col items-center text-center space-y-2 sm:space-y-3 shadow-2xs hover:border-blue-200 transition-colors">
              <div className="h-14 sm:h-16 flex items-center justify-center">
                <Image
                  src="/assets/rankings/nirf.png"
                  alt="NIRF Ranking - 58"
                  width={95}
                  height={60}
                  className="object-contain max-h-12 sm:max-h-16 w-auto"
                />
              </div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 m-0">NIRF Ranking - 58</h3>
              <p className="text-[11px] sm:text-xs text-gray-500 leading-snug sm:leading-relaxed m-0">
                The online MBA course is University Grant Commission approved.
              </p>
            </div>
          </div>
        </div>

        {/* Key Highlights Table Card */}
        <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-5 sm:mb-7 m-0">
            Key Highlights of Online MBA Course at Manipal University 2026
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border border-gray-300 border-collapse">
              <thead>
                <tr className="bg-[#102A45] text-white font-bold">
                  <th className="py-2.5 px-4 sm:px-5 w-[25%] sm:w-[22%] border-r border-white/20">Category</th>
                  <th className="py-2.5 px-4 sm:px-5">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 text-gray-700 bg-white">
                <tr className="border-b border-gray-300 hover:bg-gray-50/40 transition-colors">
                  <td className="py-2.5 px-4 sm:px-5 font-bold text-gray-900 border-r border-gray-300">University</td>
                  <td className="py-2.5 px-4 sm:px-5">Manipal University</td>
                </tr>
                <tr className="border-b border-gray-300 hover:bg-gray-50/40 transition-colors">
                  <td className="py-2.5 px-4 sm:px-5 font-bold text-gray-900 border-r border-gray-300">Program Name</td>
                  <td className="py-2.5 px-4 sm:px-5">Online Master of Business Administration (MBA)</td>
                </tr>
                <tr className="border-b border-gray-300 hover:bg-gray-50/40 transition-colors">
                  <td className="py-2.5 px-4 sm:px-5 font-bold text-gray-900 border-r border-gray-300">Degree</td>
                  <td className="py-2.5 px-4 sm:px-5">- Master</td>
                </tr>
                <tr className="border-b border-gray-300 hover:bg-gray-50/40 transition-colors">
                  <td className="py-2.5 px-4 sm:px-5 font-bold text-gray-900 border-r border-gray-300">Full Form</td>
                  <td className="py-2.5 px-4 sm:px-5">- Master of Business Administration</td>
                </tr>
                <tr className="border-b border-gray-300 hover:bg-gray-50/40 transition-colors">
                  <td className="py-2.5 px-4 sm:px-5 font-bold text-gray-900 border-r border-gray-300">Eligibility</td>
                  <td className="py-2.5 px-4 sm:px-5">— Candidate needs to complete graduation from any Recognised University</td>
                </tr>
                <tr className="border-b border-gray-300 hover:bg-gray-50/40 transition-colors">
                  <td className="py-2.5 px-4 sm:px-5 font-bold text-gray-900 border-r border-gray-300">Semester Fee</td>
                  <td className="py-2.5 px-4 sm:px-5">- Rs. 45,000</td>
                </tr>
                <tr className="border-b border-gray-300 hover:bg-gray-50/40 transition-colors">
                  <td className="py-2.5 px-4 sm:px-5 font-bold text-gray-900 border-r border-gray-300">Duration</td>
                  <td className="py-2.5 px-4 sm:px-5">- 2 years (4 semesters)</td>
                </tr>
                <tr className="border-b border-gray-300 hover:bg-gray-50/40 transition-colors">
                  <td className="py-2.5 px-4 sm:px-5 font-bold text-gray-900 border-r border-gray-300">Mode of Study</td>
                  <td className="py-2.5 px-4 sm:px-5">Online</td>
                </tr>
                <tr className="border-b border-gray-300 hover:bg-gray-50/40 transition-colors">
                  <td className="py-2.5 px-4 sm:px-5 font-bold text-gray-900 border-r border-gray-300">Key Features</td>
                  <td className="py-2.5 px-4 sm:px-5">Industry-Aligned Curriculum, 100% Online Learning, Dedicated Placement Cell, Access to Coursera</td>
                </tr>
                <tr className="border-b border-gray-300 hover:bg-gray-50/40 transition-colors">
                  <td className="py-2.5 px-4 sm:px-5 font-bold text-gray-900 border-r border-gray-300">Ranking & Approvals</td>
                  <td className="py-2.5 px-4 sm:px-5">UGC NAAC A+, NIRF- 58, AICTE, WES</td>
                </tr>
                <tr className="border-b border-gray-300 hover:bg-gray-50/40 transition-colors">
                  <td className="py-2.5 px-4 sm:px-5 font-bold text-gray-900 border-r border-gray-300">NIRF Ranking 2026</td>
                  <td className="py-2.5 px-4 sm:px-5">58</td>
                </tr>
                <tr className="border-b border-gray-300 hover:bg-gray-50/40 transition-colors">
                  <td className="py-2.5 px-4 sm:px-5 font-bold text-gray-900 border-r border-gray-300">Application Process</td>
                  <td className="py-2.5 px-4 sm:px-5">Online application followed by document verification</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Amity Online MBA Course Specialisations */}
        <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-5 sm:mb-7 m-0">
            Amity Online MBA Course Specialisations
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4">
            {[
              { icon: Briefcase, title: "MBA in General Managment" },
              { icon: Briefcase, title: "MBA in General Managment" },
              { icon: Briefcase, title: "MBA in General Managment" },
              { icon: ShoppingCart, title: "MBA in General Managment" },
              { icon: ShoppingCart, title: "MBA in General Managment" },
              { icon: ShoppingCart, title: "MBA in General Managment" },
              { icon: Database, title: "MBA in General Managment" },
              { icon: Database, title: "MBA in General Managment" },
              { icon: Database, title: "MBA in General Managment" },
              { icon: UserCog, title: "MBA in General Managment" },
              { icon: UserCog, title: "MBA in General Managment" },
              { icon: UserCog, title: "MBA in General Managment" },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleOpenLead(item.title)}
                  className="bg-white rounded-xl border border-gray-200 p-2.5 sm:p-3.5 md:p-4 flex items-center gap-2 sm:gap-3.5 cursor-pointer hover:border-blue-400 transition-colors"
                >
                  <IconComponent className="text-[#205493] shrink-0 w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
                  <span className="text-[11px] sm:text-xs md:text-[13.5px] font-bold text-gray-900 tracking-tight leading-snug">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Online MBA Course Updated Syllabus */}
        <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-5 sm:mb-8 m-0">
            Online MBA Course Updated Syllabus 2026 at Manipal University
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {["Semester 1", "Semester 2", "Semester 3", "Semester 4"].map((sem, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200/90 p-3 sm:p-5 shadow-2xs flex flex-col items-center hover:border-blue-200 transition-colors"
              >
                <div className="bg-[#0066CC] text-white px-3 sm:px-5 py-1 rounded-full text-[11px] sm:text-sm font-medium mb-2 tracking-tight shadow-xs">
                  {sem}
                </div>

                <div className="w-full h-px bg-gray-100 mb-3 sm:mb-4" />

                <ul className="w-full text-left space-y-1.5 sm:space-y-2 text-[11px] sm:text-[13px] text-gray-700 m-0 p-0 list-none">
                  <li className="flex items-start gap-1.5 sm:gap-2 leading-snug">
                    <span className="text-gray-900 font-bold shrink-0">•</span>
                    <span>Management Process</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2 leading-snug">
                    <span className="text-gray-900 font-bold shrink-0">•</span>
                    <span>Business Communication</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2 leading-snug">
                    <span className="text-gray-900 font-bold shrink-0">•</span>
                    <span>Statistics for Management</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2 leading-snug">
                    <span className="text-gray-900 font-bold shrink-0">•</span>
                    <span>Financial and Management</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2 leading-snug">
                    <span className="text-gray-900 font-bold shrink-0">•</span>
                    <span>Managerial Economics</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2 leading-snug">
                    <span className="text-gray-900 font-bold shrink-0">•</span>
                    <span>Human Resource Management</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* University Courses Offering Cards Section - 2 per row on Mobile, 5 per row on Desktop */}
        <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-6 sm:mb-8 m-0">
            Top Universities Offering Online MBA
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {processedPrograms.slice(0, visibleCount).map((item, index) => {
              const uniName = item.uniName || "Partner University";
              const cardTitle = item.cardTitle || item.title || "Course Program";
              const logoUrl = item.logoUrl;
              const providerName = item.providerName || null;
              const durationText = item.durationText || null;
              const feeText = item.feeText || null;
              const courseDetailHref = item.courseDetailHref || `/courses`;

              return (
                <div
                  key={item._uniqueKey || `${cardTitle}-${index}`}
                  className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 hover:border-blue-400 p-2.5 sm:p-3.5 hover:shadow-md transition-all flex flex-col items-center justify-between text-center relative group min-w-0 shadow-2xs"
                >
                  {/* Top Right Corner Pinned Provider Badge */}
                  {Boolean(providerName) && (
                    <div className="absolute top-0 right-0 z-10 pointer-events-none">
                      <span className="bg-[#FFF0F3] border-b border-l border-[#FFE4E6] text-[#E52E2E] text-[8.5px] sm:text-[9.5px] font-bold px-1.5 py-0.5 rounded-bl-lg rounded-tr-xl">
                        {providerName}
                      </span>
                    </div>
                  )}

                  {/* University Logo */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full p-1 sm:p-1.5 flex items-center justify-center bg-white border border-gray-100 shadow-2xs relative my-1 shrink-0">
                    {logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt={uniName}
                        fill
                        sizes="(max-width: 768px) 48px, 64px"
                        loading={index < 5 ? "eager" : "lazy"}
                        className="object-contain p-1"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xs uppercase">
                        {uniName.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* University Name & Fee/Duration grouped tightly */}
                  <div className="w-full space-y-1 my-1">
                    <h4 className="text-[11px] sm:text-xs font-bold text-[#0a2540] line-clamp-2 leading-tight m-0 w-full text-center">
                      {uniName}
                    </h4>

                    {(feeText || durationText) && (
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-center w-full flex-wrap pt-0.5">
                        {feeText && (
                          <span className="text-[11px] sm:text-xs font-extrabold text-[#0D3B66] tracking-tight">
                            {feeText.replace(/\s*INR$/, "")}
                          </span>
                        )}
                        {feeText && durationText && (
                          <span className="text-gray-300 text-[10px]">•</span>
                        )}
                        {durationText && (
                          <div className="text-[10px] sm:text-[11px] text-gray-500 font-medium flex items-center gap-1 shrink-0">
                            <Clock className="w-2.5 h-2.5 shrink-0 text-gray-400" />
                            <span>{durationText}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Full-width Compare Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const targetItem = {
                        _id: item._id || item.slug,
                        slug: item.slug || item._id,
                        title: cardTitle,
                        uniName: uniName,
                        logoUrl: logoUrl,
                        feeText: feeText,
                        durationText: durationText,
                      };
                      toggleCompare(targetItem);
                      setIsCompareDrawerOpen(true);
                    }}
                    className={`w-full py-1.5 px-2 rounded-md sm:rounded-lg text-[10px] sm:text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-2.5 border ${
                      isInCompare(item._id || item.slug || cardTitle)
                        ? "bg-teal-50 border-teal-300 text-teal-700 font-bold"
                        : "bg-gray-50/90 hover:bg-gray-100 border-gray-200 text-gray-700 hover:text-[#0D3B66]"
                    }`}
                  >
                    {isInCompare(item._id || item.slug || cardTitle) ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>Added to Compare</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                        <span>Add to Compare</span>
                      </>
                    )}
                  </button>

                  {/* Action Buttons in Flex Row */}
                  <div className="w-full flex items-center gap-1.5 sm:gap-2 mt-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        openFormModal({
                          title: "Apply for Course",
                          subtitle: cardTitle,
                          defaultCourse: cardTitle,
                          university: uniName,
                          formNameOverride: `CourseCard_${item.slug || uniName}`,
                          submitButtonText: "Apply Now",
                        });
                      }}
                      className="flex-1 bg-[#F4D068] hover:bg-[#ebc557] text-gray-900 text-[10px] sm:text-xs font-bold py-1.5 px-1 rounded-md sm:rounded-lg border-none cursor-pointer transition-colors shadow-2xs active:scale-95 flex items-center justify-center whitespace-nowrap"
                    >
                      Apply Now
                    </button>
                    <Link
                      href={courseDetailHref}
                      className="flex-1 bg-white hover:bg-gray-50 text-[#0a2540] hover:text-blue-600 border border-gray-200 text-[10px] sm:text-xs font-semibold py-1.5 px-1 rounded-md sm:rounded-lg text-center no-underline transition-colors flex items-center justify-center shadow-2xs whitespace-nowrap"
                    >
                      Know More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View More Button (hides when all cards are visible) - Matching Category.jsx styling */}
          {visibleCount < processedPrograms.length && (
            <div className="flex justify-center mt-3 pt-1">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 5)}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold text-[#0B3B7E] bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 transition-all cursor-pointer shadow-none group"
              >
                <span>View More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-6 sm:p-8 text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-5 sm:mb-7 m-0">
            FAQs on Online MBA Degree at Manipal University
          </h2>

          <div className="space-y-3">
            {Array(5).fill("Q1. Is an Online MBA Degree from Manipal University Recognized?").map((question, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#F1F3F6] rounded-xl overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full px-5 sm:px-6 py-4 flex items-center justify-between text-left cursor-pointer transition-colors"
                  >
                    <span className="font-bold text-[#0D3B66] text-xs sm:text-sm tracking-tight pr-4">
                      {question}
                    </span>
                    <span className="text-[#0D3B66] shrink-0 flex items-center justify-center">
                      {isOpen ? (
                        <Minus size={20} className="stroke-[3]" />
                      ) : (
                        <Plus size={20} className="stroke-[3]" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-0 text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                      Yes, the Online MBA Course from Manipal University is UGC-DEB approved and holds NAAC A+ accreditation, making it valid and widely accepted by employers across industries.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#102E52] text-white rounded-xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <h3 className="text-sm sm:text-base font-bold text-white m-0">
              Need clarification?
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 m-0">
              Interact with experts, Get free consultation.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleOpenLead("Talk to Experts")}
            className="bg-white hover:bg-gray-100 text-[#102E52] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
          >
            <MessageSquare size={15} />
            Talk to Experts
          </button>
        </div>
      </div>
    </div>
  );
}
