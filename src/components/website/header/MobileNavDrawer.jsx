"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Drawer } from "antd";
import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { FakeUniversityIcon } from "@/components/common/FakeUniversityIcon";
import { FAKE_UNIVERSITIES_SLUG } from "@/constants/fakeUniversitiesData";

function resolveImg(mediaObj, fallback = "/assets/images/new_sode_tm_logo.png") {
  if (!mediaObj) return fallback;
  if (typeof mediaObj === "string") return mediaObj;
  return mediaObj.url || mediaObj.src || mediaObj.path || fallback;
}

const getAccreditationTitle = (acc) => {
  if (!acc) return "Recognized Universities";
  const name = (acc.name || acc.title || acc.code || "").trim();
  const slug = (acc.slug || "").toLowerCase();
  const combined = `${name} ${slug}`.toLowerCase();

  if (combined.includes("fake")) {
    return "List of Fake Universities";
  }
  if (combined.includes("naac")) {
    return "NAAC Accredited Universities";
  }
  if (combined.includes("nirf")) {
    return "NIRF Ranked Universities";
  }
  if (combined.includes("aicte")) {
    return "AICTE Approved Universities";
  }
  if (combined.includes("wes")) {
    return "WES Recognized Universities";
  }
  if (combined.includes("ugc") || combined.includes("deb")) {
    return "UGC-DEB Approved Universities";
  }
  return name ? `${name} Approved Universities` : "Approved Universities";
};

const getAccreditationBadge = (acc, title = "") => {
  const slug = (acc?.slug || "").toLowerCase();
  const lower = `${title} ${slug}`.toLowerCase();
  if (lower.includes("fake")) return "UGC Listed";
  if (lower.includes("naac")) return "NAAC Grade";
  if (lower.includes("nirf")) return "NIRF Top Ranked";
  if (lower.includes("ugc")) return "UGC-DEB Approved";
  if (lower.includes("aicte")) return "AICTE Approved";
  if (lower.includes("wes")) return "WES Recognized";
  return "Govt. Approved";
};

const formatCategoryDisplayName = (name = "", type = "programs") => {
  if (!name) return "";
  if (type === "programs") {
    const cleaned = name.replace(/\b(online|distance)\b/gi, "").trim().replace(/\s+/g, " ");
    return cleaned || name;
  }
  return name;
};

const formatCourseDisplayName = (prog, currentGroup) => {
  if (!prog) return "";
  let name = (typeof prog === "string" ? prog : (prog.name || prog.title || "")).trim();
  name = name.replace(/\b(courses?)\b/gi, "").trim().replace(/\s+/g, " ");

  const hasMode = /^(online|distance)\b/i.test(name);
  if (hasMode) {
    return name;
  }

  const isDistance = (typeof prog === "object" && prog?.slug ? prog.slug : "").toLowerCase().startsWith("distance-") ||
    /distance/i.test(currentGroup?.category?.name || "") ||
    /distance/i.test(currentGroup?.name || "");
  const mode = isDistance ? "Distance" : "Online";

  return `${mode} ${name}`.trim();
};

function renderCategoryIcon(categoryName = "", type = "programs") {
  const name = (categoryName || "").toLowerCase();

  if (type === "accreditations" || name.includes("accredit") || name.includes("approval") || name.includes("recognition")) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
      </svg>
    );
  }

  if (name.includes("city")) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.75a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21" />
      </svg>
    );
  }

  if (name.includes("state")) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    );
  }

  if (name.includes("master") || name.includes("post graduate") || name.includes("pg")) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    );
  }

  if (name.includes("bachelor") || name.includes("under graduate") || name.includes("ug")) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    );
  }

  if (name.includes("diploma") || name.includes("certificate")) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  }

  if (name.includes("executive")) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7h-4V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3H4a1 1 0 00-1 1v11a2 2 0 002 2h14a2 2 0 002-2V8a1 1 0 00-1-1zM10 5h4v2h-4V5zm10 14H4V9h16v10z" />
      </svg>
    );
  }

  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

export default function MobileNavDrawer({
  open,
  onClose,
  headerData,
  logoUrl,
  logoAlt,
  mobileMegaSections = [],
}) {
  const router = useRouter();
  const [selectedMobileCategory, setSelectedMobileCategory] = useState(null);
  const [expandedMobileCategories, setExpandedMobileCategories] = useState({});

  const resetDrawerScroll = () => {
    if (typeof document !== "undefined") {
      const drawerBody = document.querySelector(".ant-drawer-body");
      if (drawerBody) {
        drawerBody.scrollTop = 0;
      }
      const drawerContent = document.querySelector(".ant-drawer-content");
      if (drawerContent) {
        drawerContent.scrollTop = 0;
      }
    }
  };

  const handleSelectMobileCategory = (catData) => {
    let items = catData?.items || [];
    const isApproval =
      catData?.type === "accreditations" ||
      (catData?.title || "").toLowerCase().includes("approval") ||
      (catData?.title || "").toLowerCase().includes("accredit") ||
      items.some((it) => it.is_approval);

    if (isApproval) {
      const hasFake = items.some((it) => (it.slug || it.name || it.title || "").toLowerCase().includes("fake"));
      if (!hasFake) {
        items = [
          ...items,
          {
            _id: "ugc-deb-fake-universities-mobile-item",
            name: "List of Fake Universities",
            title: "List of Fake Universities",
            slug: FAKE_UNIVERSITIES_SLUG,
            is_approval: true,
            isFake: true,
          },
        ];
      }
    }

    setSelectedMobileCategory({
      ...catData,
      items,
    });
    resetDrawerScroll();
    setTimeout(resetDrawerScroll, 10);
    setTimeout(resetDrawerScroll, 50);
  };

  useEffect(() => {
    resetDrawerScroll();
  }, [selectedMobileCategory]);

  const closeMobile = (url) => {
    setSelectedMobileCategory(null);
    onClose();
    if (url) router.push(url);
  };

  return (
    <Drawer
      open={open}
      onClose={() => {
        setSelectedMobileCategory(null);
        onClose();
      }}
      placement="top"
      closable={false}
      className="mobile-nav-drawer"
      styles={{
        wrapper: { height: "auto", maxHeight: "92vh" },
        header: { padding: "8px 16px", backgroundColor: "#ffffff", borderBottom: "1px solid #f1f5f9" },
        body: {
          padding: 0,
          height: "auto",
          maxHeight: "calc(92vh - 64px)",
          overflowY: "auto",
        },
      }}
      title={
        <div className="flex items-center justify-between w-full">
          {/* Logo on Left */}
          <Link
            href={headerData?.logo_url || "/"}
            onClick={() => closeMobile()}
            className="flex items-center"
          >
            <div style={{ height: "48px" }} className="relative w-36 sm:w-44 flex items-center justify-start">
              <Image
                src={logoUrl}
                alt={logoAlt}
                fill
                sizes="(max-width: 640px) 144px, 176px"
                className="object-contain object-left cursor-pointer"
              />
            </div>
          </Link>

          {/* Close Button on Right */}
          <button
            type="button"
            onClick={() => closeMobile()}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors border-none cursor-pointer p-0 shrink-0"
            aria-label="Close"
          >
            <CloseOutlined className="text-[13px] font-bold" />
          </button>
        </div>
      }
    >
      {!selectedMobileCategory ? (
        /* ── VIEW 1: CATEGORIES OVERVIEW ── */
        <div className="p-4 space-y-6">
          {mobileMegaSections.map((section) => (
            <div key={section._id}>
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#0B57D0] text-white flex items-center justify-center shrink-0 shadow-xs">
                  {section.icon}
                </div>
                <p className="font-extrabold text-[15px] text-[#072C50] m-0 tracking-tight">
                  {section.title}
                </p>
              </div>

              <div className="space-y-1">
                {section.categories.map((cat, cIdx) => {
                  const hasSub = Array.isArray(cat.subcategories) && cat.subcategories.length > 0;
                  const isExpanded = !!expandedMobileCategories[cat._id];

                  return (
                    <div key={cat._id || cIdx} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (hasSub) {
                            setExpandedMobileCategories((prev) => ({
                              ...prev,
                              [cat._id]: !prev[cat._id],
                            }));
                          } else {
                            handleSelectMobileCategory({
                              title: cat.name,
                              type: section.type,
                              items: cat.items || [],
                            });
                          }
                        }}
                        className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-[#F0F6FE] active:bg-[#E2EDFC] transition-colors text-left border-none bg-transparent cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[#0B57D0] text-base group-hover:scale-110 transition-transform">
                            {renderCategoryIcon(cat.name, section.type)}
                          </span>
                          <span className="font-semibold text-slate-800 text-[13.5px] group-hover:text-[#0B57D0]">
                            {cat.name}
                          </span>
                        </div>
                        <RightOutlined
                          className={`text-[10px] text-slate-400 group-hover:text-[#0B57D0] transition-transform ${
                            hasSub && isExpanded ? "rotate-90 text-[#0B57D0]" : "group-hover:translate-x-0.5"
                          }`}
                        />
                      </button>

                      {hasSub && isExpanded && (
                        <div className="pl-4 space-y-1 py-0.5">
                          {cat.subcategories.map((sub, sIdx) => (
                            <button
                              key={sub.category?._id || sIdx}
                              type="button"
                              onClick={() =>
                                handleSelectMobileCategory({
                                  title: sub.category?.name || `${cat.name} - Subcategory`,
                                  type: section.type,
                                  items: sub.items || [],
                                })
                              }
                              className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-[#F0F6FE] active:bg-[#E2EDFC] transition-colors text-left border-none bg-transparent cursor-pointer group"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-[#0B57D0] text-base group-hover:scale-110 transition-transform">
                                  {renderCategoryIcon(formatCategoryDisplayName(sub.category?.name, section.type), section.type)}
                                </span>
                                <span className="font-semibold text-slate-800 text-[13.5px] group-hover:text-[#0B57D0]">
                                  {formatCategoryDisplayName(sub.category?.name, section.type)}
                                </span>
                              </div>
                              <RightOutlined className="text-[10px] text-slate-400 group-hover:text-[#0B57D0] group-hover:translate-x-0.5 transition-all" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ── VIEW 2: 2-COLUMN CARDS GRID ── */
        <div>
          <div className="sticky top-0 bg-white z-30 flex items-center justify-between px-4 py-2.5 border-b border-slate-100 shadow-[0_2px_6px_rgba(0,0,0,0.03)]">
            <button
              type="button"
              onClick={() => {
                setSelectedMobileCategory(null);
                resetDrawerScroll();
                setTimeout(resetDrawerScroll, 10);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B57D0] hover:text-[#072C50] transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              <LeftOutlined className="text-[11px]" />
              <span>Back</span>
            </button>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full line-clamp-1 max-w-[170px]">
              {selectedMobileCategory.title}
            </span>
          </div>

          <div className="p-4 pt-3">
            <div className="grid grid-cols-2 gap-2.5 pb-4">
              {selectedMobileCategory.items.map((item, idx) => {
                const itemSlug = item.slug || item._id || item.name;
                const isAcc = selectedMobileCategory.type === "accreditations" || !!item.is_approval;
                const isProg = selectedMobileCategory.type === "programs";
                const isUni = !isAcc && !isProg && (selectedMobileCategory.type === "universities" || !!item.location || item.courses_count !== undefined);
                const logoSrc = item.header_logo || item.logo || item.image || null;
                const detailUrl = isAcc
                  ? (item.url || `/accreditations/${encodeURIComponent(itemSlug)}`)
                  : isUni
                    ? (item.url || `/universities/${encodeURIComponent(itemSlug)}`)
                    : (item.url || `/courses/${encodeURIComponent(itemSlug)}`);
                const secondaryUrl = isAcc
                  ? "/universities"
                  : isUni
                    ? `/courses?university=${encodeURIComponent(itemSlug)}`
                    : `/universities?course=${encodeURIComponent(itemSlug)}`;
                const secondaryLabel = isAcc
                  ? "View Unis"
                  : isUni
                    ? "View Courses"
                    : "View Unis";

                if (item.is_dynamic_listing) {
                  return (
                    <Link
                      key={item._id || idx}
                      href={detailUrl}
                      onClick={() => closeMobile()}
                      className="col-span-2 flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors group select-none text-left"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#072C50] group-hover:bg-[#0B57D0] shrink-0 transition-transform group-hover:scale-125" />
                      <span className="text-[12.5px] font-medium text-[#072C50] group-hover:text-[#0B57D0] transition-colors leading-snug truncate">
                        {item.name || item.title}
                      </span>
                    </Link>
                  );
                }

                if (item.is_approval) {
                  const currentYear = new Date().getFullYear();
                  const cardTitle = getAccreditationTitle(item);
                  const badgeText = getAccreditationBadge(item, cardTitle);
                  const cardUrl = item.slug ? `/accreditations/${item.slug}` : (item.url || "/accreditations");

                  return (
                    <div
                      key={item._id || idx}
                      className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-blue-300 transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          {logoSrc ? (
                            <Link
                              href={cardUrl}
                              onClick={() => closeMobile()}
                              className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center"
                            >
                              <Image
                                src={resolveImg(logoSrc)}
                                alt={cardTitle}
                                fill
                                sizes="36px"
                                className="object-contain"
                              />
                            </Link>
                          ) : item.isFake || cardTitle.toLowerCase().includes("fake") ? (
                            <Link
                              href={cardUrl}
                              onClick={() => closeMobile()}
                              className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center"
                            >
                              <FakeUniversityIcon size={32} />
                            </Link>
                          ) : (
                            <Link
                              href={cardUrl}
                              onClick={() => closeMobile()}
                              className="flex items-center justify-center shrink-0 mt-0.5"
                            >
                              <span className="w-2 h-2 rounded-full bg-[#0B57D0]" />
                            </Link>
                          )}

                          <div className="flex-1 min-w-0 text-left">
                            <Link
                              href={cardUrl}
                              onClick={() => closeMobile()}
                              className="block hover:text-[#0B57D0]"
                            >
                              {item.isFake || cardTitle.toLowerCase().includes("fake") ? (
                                <p className="text-[11.5px] font-bold leading-tight m-0">
                                  <span className="block text-[#072C50]">List of Fake</span>
                                  <span className="block text-[#0284c7]">Universities</span>
                                </p>
                              ) : (
                                <p className="text-[11.5px] font-bold text-[#072C50] leading-snug line-clamp-2 m-0">
                                  {cardTitle}
                                </p>
                              )}
                            </Link>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-1.5 mt-1.5 text-[9.5px] min-w-0">
                          <span className="inline-flex items-center gap-1 text-slate-600 font-semibold min-w-0 truncate">
                            <svg className="w-3 h-3 text-emerald-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="truncate">{badgeText}</span>
                          </span>
                          <span className="inline-flex items-center text-[9px] font-bold text-[#351C00] bg-[#E4BE75]/80 px-1.5 py-0.5 rounded-full leading-none whitespace-nowrap shrink-0">
                            List {currentYear}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-end pt-2 mt-2 border-t border-slate-100">
                        <Link
                          href={cardUrl}
                          onClick={() => closeMobile()}
                          className="text-[10px] font-bold text-[#072C50] hover:text-[#0B57D0] flex items-center gap-0.5 transition"
                        >
                          <span>View List</span>
                          <span className="text-[11px]">→</span>
                        </Link>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={item._id || idx}
                    className="bg-white border border-slate-200/90 rounded-2xl p-2 sm:p-2.5 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-blue-300 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        {logoSrc ? (
                          <Link
                            href={detailUrl}
                            onClick={() => closeMobile()}
                            className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center"
                          >
                            <Image
                              src={resolveImg(logoSrc)}
                              alt={item.name || item.title || "Logo"}
                              fill
                              sizes="36px"
                              className="object-contain"
                            />
                          </Link>
                        ) : (
                          <Link
                            href={detailUrl}
                            onClick={() => closeMobile()}
                            className="flex items-center justify-center shrink-0 mt-0.5"
                          >
                            <span className="w-2 h-2 rounded-full bg-[#0B57D0]" />
                          </Link>
                        )}

                        <div className="flex-1 min-w-0 text-left">
                          <Link
                            href={detailUrl}
                            onClick={() => closeMobile()}
                            className="block hover:text-[#0B57D0]"
                          >
                            <p className="text-[11.5px] font-bold text-[#072C50] leading-snug line-clamp-2 m-0">
                              {selectedMobileCategory?.type === "programs" ? formatCourseDisplayName(item, selectedMobileCategory) : (item.name || item.title)}
                            </p>
                          </Link>
                        </div>
                      </div>

                      {isProg && (item.duration || item.specialisations_count > 0) && (
                        <div className="flex items-center justify-start gap-1.5 mt-1 text-[8.5px] sm:text-[9px] min-w-0 overflow-hidden w-full text-left">
                          {item.duration && (
                            <span className="inline-flex items-center gap-0.5 text-slate-500 font-medium shrink-0 whitespace-nowrap">
                              <svg className="w-2.5 h-2.5 text-slate-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                              </svg>
                              <span>{item.duration}</span>
                            </span>
                          )}
                          {item.specialisations_count > 0 && (
                            <span className="inline-flex items-center gap-0.5 text-slate-500 font-medium min-w-0 truncate whitespace-nowrap">
                              <svg className="w-2.5 h-2.5 text-slate-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                              </svg>
                              <span className="truncate">{item.specialisations_count} Specialisation</span>
                            </span>
                          )}
                        </div>
                      )}

                      {!isProg && !item.is_dynamic_listing && (item.approval || item.courses_count > 0) && (
                        <div className="flex items-center gap-2 mt-1.5 text-[9.5px] flex-wrap">
                          {item.approval && (
                            <span className="inline-flex items-center gap-1 text-slate-600 font-semibold whitespace-nowrap">
                              <svg className="w-3 h-3 text-emerald-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="truncate">{item.approval}</span>
                            </span>
                          )}
                          {item.courses_count > 0 && (
                            <span className="inline-flex items-center gap-1 text-slate-500 font-medium whitespace-nowrap">
                              <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              <span className="truncate">{item.courses_count}+ Courses</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                      <Link
                        href={detailUrl}
                        onClick={() => closeMobile()}
                        className="inline-flex items-center justify-center px-2 py-1 text-[9.5px] font-bold text-[#072C50] hover:text-[#0B57D0] border border-slate-300 rounded-2xl bg-white hover:bg-slate-50 transition-colors whitespace-nowrap"
                      >
                        Know More
                      </Link>
                      {!item.is_dynamic_listing && (
                        <Link
                          href={secondaryUrl}
                          onClick={() => closeMobile()}
                          className="inline-flex items-center gap-0.5 text-[9.5px] font-bold text-[#072C50] hover:text-[#0B57D0] transition-colors whitespace-nowrap overflow-hidden"
                        >
                          <span className="truncate">{secondaryLabel}</span>
                          <RightOutlined className="text-[6.5px] shrink-0" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedMobileCategory.items.length === 0 && (
              <div className="py-8 text-center text-slate-400 text-xs">
                No items found in this category.
              </div>
            )}
          </div>
        </div>
      )}
    </Drawer>
  );
}

