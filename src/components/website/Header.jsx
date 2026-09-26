"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Layout, Dropdown, Drawer, Collapse } from "antd";
import { DownOutlined, MenuOutlined, CloseOutlined, RightOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { getAssetPath } from "@/lib/utils";
import { useToolWizard } from "@/components/tool/ToolWizardContext";

const { Header: AntHeader } = Layout;

// Golden Yellow CTA Button Style
const goldBtnStyle = {
  background: "linear-gradient(180deg, #F6DE95 0%, #EEC471 100%)",
  color: "#072C50",
  borderColor: "rgba(238, 196, 113, 0.6)",
  fontWeight: 700,
};

function resolveImg(mediaObj, fallback = "/assets/images/new_sode_tm_logo.png") {
  if (!mediaObj) return getAssetPath(fallback);
  if (typeof mediaObj === "string") return mediaObj.startsWith("http") ? mediaObj : getAssetPath(mediaObj, fallback);
  if (mediaObj.url) return mediaObj.url.startsWith("http") ? mediaObj.url : getAssetPath(mediaObj.url);
  return getAssetPath(fallback);
}

// ✦ AI Tools Button with Sparkling Effect & NEW Badge
function AiToolButton({ label = "AI Tools", badge = "NEW", onClick, href, className = "" }) {
  const content = (
    <>
      <span className="text-[#0B57D0] font-extrabold text-sm leading-none group-hover:rotate-12 transition-transform">✦</span>
      <span className="text-[#072C50] font-bold text-[12.5px]">{label}</span>
      {badge && (
        <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 text-[8px] font-black uppercase tracking-wider rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border border-white leading-none shadow-xs">
          {badge}
        </span>
      )}
    </>
  );

  const baseClasses = `relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FE] hover:bg-[#DCEBFD] text-[#0B57D0] border border-blue-200/80 font-bold text-xs transition-all duration-200 cursor-pointer group shadow-xs ${className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClasses}
    >
      {content}
    </button>
  );
}

// ==========================================
// 🎨 PASTEL ICONS FOR COURSES (Matching Screenshot 2)
// ==========================================
function getCoursePastelStyle(courseName = "") {
  const name = (courseName || "").toUpperCase();
  if (name.includes("MBA")) {
    return {
      text: "text-[#E65100]",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7h-4V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3H4a1 1 0 00-1 1v11a2 2 0 002 2h14a2 2 0 002-2V8a1 1 0 00-1-1zM10 5h4v2h-4V5zm10 14H4V9h16v10z" />
        </svg>
      ),
    };
  }
  if (name.includes("MCA")) {
    return {
      text: "text-[#7B1FA2]",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    };
  }
  if (name.includes("MCOM") || name.includes("BCOM")) {
    return {
      text: "text-[#0277BD]",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    };
  }
  if (name.includes("MA") || name.includes("BA")) {
    return {
      text: "text-[#00695C]",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4 5 5 0 015-5h2a5 5 0 015 5 4 4 0 01-4 4M12 3a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ),
    };
  }
  if (name.includes("MLIS") || name.includes("BLIS") || name.includes("LIB")) {
    return {
      text: "text-[#C2185B]",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    };
  }
  if (name.includes("MJMC") || name.includes("JOURN")) {
    return {
      text: "text-[#2E7D32]",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
    };
  }
  if (name.includes("MSW") || name.includes("BSW")) {
    return {
      text: "text-[#5E35B1]",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
    };
  }
  return {
    text: "text-[#1565C0]",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  };
}

// 🏛️ Dynamic Category Icon Renderer
function renderCategoryIcon(categoryName = "", type = "programs") {
  const name = (categoryName || "").toLowerCase();
  if (type === "universities") {
    if (name.includes("global") || name.includes("international")) {
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    if (name.includes("iit") || name.includes("iim") || name.includes("top")) {
      return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    );
  }

  // Programs / Courses icons
  if (name.includes("master") || name.includes("post graduate") || name.includes("pg")) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5" />
      </svg>
    );
  }
  if (name.includes("bachelor") || name.includes("under graduate") || name.includes("ug")) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    );
  }
  if (name.includes("doctor") || name.includes("phd")) {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5" />
    </svg>
  );
}

export function Header({ initialHeaderData = null, siteLogo = null }) {
  const router = useRouter();
  const { openTool } = useToolWizard();
  const headerData = initialHeaderData?.result || initialHeaderData || {};
  const [activeMenuKey, setActiveMenuKey] = useState(null); // Key of the currently opened menu item
  const [activeCategoryIndex, setActiveCategoryIndex] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveKeys, setMobileActiveKeys] = useState([]);

  const headerRef = useRef(null);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveMenuKey(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoUrl = resolveImg(headerData?.logo || siteLogo, "/assets/images/new_sode_tm_logo.png");
  const logoAlt = headerData?.logo_alt || "School of Online & Distance Education (SODE)";

  const rawMenuItems = useMemo(() => {
    return Array.isArray(headerData?.menu_items)
      ? headerData.menu_items.filter((item) => item.enabled !== false)
      : [];
  }, [headerData]);

  const rawFeaturedButtons = useMemo(() => {
    return Array.isArray(headerData?.featured_buttons)
      ? headerData.featured_buttons.filter((b) => b.enabled !== false)
      : headerData?.featured_button?.enabled !== false && headerData?.featured_button?.text
        ? [headerData.featured_button]
        : [{ text: "Compare Universities", url: "/compare-university" }];
  }, [headerData]);

  const handleToolClick = (e) => {
    e?.preventDefault();
    setActiveMenuKey(null);
    openTool("suggest-me-a-university", { tool_mode: "Suggest University" });
  };

  const closeMobile = (url) => {
    setMobileMenuOpen(false);
    setMobileActiveKeys([]);
    if (url) router.push(url);
  };

  const announcement = headerData?.announcement_bar;
  const bgColor = headerData?.bg_color || "#ffffff";

  // Active MenuItem currently open in Mega Menu
  const activeMenuItem = useMemo(() => {
    if (!activeMenuKey) return null;
    return rawMenuItems.find(
      (m) => (m._id || m.label) === activeMenuKey
    );
  }, [activeMenuKey, rawMenuItems]);

  // Resolve Active Mega Menu Data 100% dynamically from backend
  const currentMegaMenuData = useMemo(() => {
    if (!activeMenuItem) return null;

    const labelLower = (activeMenuItem.label || "").toLowerCase();
    const isUniversities = labelLower.includes("universit");
    const isPrograms = labelLower.includes("program") || labelLower.includes("course");

    const groups = Array.isArray(activeMenuItem.mega_menu) ? activeMenuItem.mega_menu : [];
    const validGroups = groups.filter((g) => g.category && (g.items?.length > 0 || g.category.name));

    const itemKey = activeMenuItem._id || activeMenuItem.label;
    const currentIdx = activeCategoryIndex[itemKey] || 0;
    const currentGroup = validGroups[currentIdx] || validGroups[0] || null;

    return {
      itemKey,
      type: isUniversities ? "universities" : isPrograms ? "programs" : "generic",
      sidebarHeaderTitle: isUniversities
        ? "Top Universities"
        : isPrograms
          ? "Professional Courses"
          : activeMenuItem.label,
      sidebarIcon: isUniversities ? (
        <div className="w-7 h-7 rounded-full bg-[#0B57D0] text-white flex items-center justify-center shrink-0 shadow-xs">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 8.87L4.72 9 12 5.04 19.28 9 12 11.87zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
          </svg>
        </div>
      ) : (
        <div className="w-7 h-7 rounded-full bg-[#0B57D0] text-white flex items-center justify-center shrink-0 shadow-xs">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
          </svg>
        </div>
      ),
      groups: validGroups,
      currentGroup,
      currentIdx,
    };
  }, [activeMenuItem, activeCategoryIndex]);

  // Mobile Drawer Menu structure built 100% dynamically from rawMenuItems
  const { mobileCollapseItems, mobileLinkItems } = useMemo(() => {
    const mobileCollapse = [];
    const mobileLinks = [];

    rawMenuItems.forEach((item, idx) => {
      const itemKey = item._id || item.label || `item-${idx}`;
      const hasMega = item.has_dropdown && Array.isArray(item.mega_menu) && item.mega_menu.length > 0;
      const hasDropdownItems = item.has_dropdown && Array.isArray(item.dropdown_items) && item.dropdown_items.length > 0;

      if (hasMega) {
        mobileCollapse.push({
          key: itemKey,
          label: (
            <span className="flex items-center gap-2 font-bold text-[14.5px] text-[#072C50]">
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-[9px] bg-amber-100 text-amber-900 font-extrabold px-1.5 py-0.5 rounded-full uppercase">
                  {item.badge}
                </span>
              )}
            </span>
          ),
          children: (
            <div className="space-y-4 pt-1">
              {item.mega_menu.map((grp) => (
                <div key={grp.category?._id || grp.category?.name} className="space-y-2">
                  <span className="text-[12px] font-extrabold uppercase text-[#0B57D0] tracking-wider block">
                    {grp.category?.name}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {grp.items?.map((subItem) => {
                      const isUni = !!subItem.location || subItem.courses_count !== undefined;
                      const subSlug = (subItem.slug && !/^[0-9a-fA-F]{24}$/.test(subItem.slug))
                        ? subItem.slug
                        : (subItem.name ? subItem.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : String(subItem._id || ""));

                      let subUrl = subItem.url;
                      if (subUrl && /[0-9a-fA-F]{24}/.test(subUrl)) {
                        subUrl = subUrl.replace(/[0-9a-fA-F]{24}/g, encodeURIComponent(subSlug));
                      }
                      if (!subUrl) {
                        subUrl = isUni
                          ? `/universities/${encodeURIComponent(subSlug)}`
                          : `/courses?course=${encodeURIComponent(subSlug)}`;
                      }
                      return (
                        <Link
                          key={subItem._id || subItem.slug}
                          href={subUrl}
                          onClick={() => closeMobile()}
                          className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between cursor-pointer hover:border-blue-300 transition-colors"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900">{subItem.name}</div>
                            {(subItem.duration || subItem.courses_count || subItem.approval) && (
                              <div className="text-[10px] text-slate-500">
                                {subItem.duration && <span>{subItem.duration}</span>}
                                {subItem.approval && <span> • {subItem.approval}</span>}
                                {subItem.courses_count > 0 && <span> • {subItem.courses_count}+ Courses</span>}
                              </div>
                            )}
                          </div>
                          <RightOutlined className="text-[10px] text-slate-400" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ),
        });
      } else if (hasDropdownItems) {
        mobileCollapse.push({
          key: itemKey,
          label: (
            <span className="flex items-center gap-2 font-bold text-[14.5px] text-[#072C50]">
              <span>{item.label}</span>
            </span>
          ),
          children: (
            <div className="space-y-1.5 pt-1">
              {item.dropdown_items.map((subItem) => (
                <Link
                  key={subItem._id || subItem.url}
                  href={subItem.url || "#"}
                  onClick={() => closeMobile()}
                  className="flex items-center justify-between p-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-50 hover:text-[#0B57D0]"
                >
                  <span>{subItem.label}</span>
                  {subItem.badge && (
                    <span className="text-[9px] bg-amber-100 text-amber-900 font-extrabold px-1.5 py-0.5 rounded-full uppercase">
                      {subItem.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ),
        });
      } else {
        mobileLinks.push(item);
      }
    });

    return { mobileCollapseItems: mobileCollapse, mobileLinkItems: mobileLinks };
  }, [rawMenuItems]);

  return (
    <>
      {/* Top Announcement Bar (if enabled in CMS) */}
      {announcement?.enabled && (
        <div
          style={{
            backgroundColor: announcement.bg_color || "#1e2f4d",
            color: announcement.text_color || "#ffffff",
          }}
          className="text-xs text-center py-1.5 px-4 font-medium transition-colors"
        >
          {announcement.url ? (
            <Link href={announcement.url} className="hover:underline">
              {announcement.text}
            </Link>
          ) : (
            <span>{announcement.text}</span>
          )}
        </div>
      )}

      {/* Main Navbar Header */}
      <AntHeader
        ref={headerRef}
        style={{ backgroundColor: bgColor, height: "auto", lineHeight: "normal", padding: 0, margin: 0 }}
        className="w-full bg-white border-b border-slate-200/80 z-50 relative select-none"
      >
        <Container className="flex items-center justify-between h-15 sm:h-16">
          {/* Brand Logo (Left) */}
          <Link
            href={headerData?.logo_url || "/"}
            className="flex items-center group shrink-0"
            onClick={() => setActiveMenuKey(null)}
          >
            <div style={{ height: "48px" }} className="relative w-36 sm:w-44 flex items-center justify-start transition-transform group-hover:scale-102">
              <Image
                src={logoUrl}
                alt={logoAlt}
                fill
                priority
                loading="eager"
                fetchPriority="high"
                unoptimized
                sizes="(max-width: 768px) 160px, 200px"
                className="object-contain object-left cursor-pointer"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links (Center / Right) — 100% Dynamic */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-end h-full">
            {rawMenuItems.map((item, idx) => {
              const itemKey = item._id || item.label || `item-${idx}`;
              const isMegaOpen = activeMenuKey === itemKey;
              const hasMegaDropdown = item.has_dropdown && item.dropdown_type === "mega_menu";
              const hasFlatDropdown = item.has_dropdown && item.dropdown_type === "flat_list";

              // 1. Highlighted Tool Button (e.g. AI Tools)
              if (item.is_highlighted) {
                const isAiTool = (item.label || "").toLowerCase().includes("tool") || (item.url || "").includes("suggest");
                return (
                  <AiToolButton
                    key={itemKey}
                    label={item.label}
                    badge={item.badge || "NEW"}
                    href={isAiTool ? undefined : (item.url || "#")}
                    onClick={isAiTool ? handleToolClick : () => setActiveMenuKey(null)}
                    className="ml-1"
                  />
                );
              }

              // 2. Mega Menu Trigger Item
              if (hasMegaDropdown) {
                return (
                  <div key={itemKey} className="relative flex items-center h-full">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMenuKey((prev) => (prev === itemKey ? null : itemKey))
                      }
                      className={`inline-flex items-center gap-1.5 text-[14.5px] font-bold transition-colors py-2 cursor-pointer select-none ${isMegaOpen ? "text-[#072C50]" : "text-slate-700 hover:text-[#072C50]"
                        }`}
                    >
                      <span>{item.label}</span>
                      <DownOutlined
                        className={`text-[10px] transition-transform duration-200 ${isMegaOpen ? "rotate-180 text-[#0B57D0]" : "text-slate-500"
                          }`}
                      />
                    </button>
                    {/* Active Blue Indicator Underline */}
                    {isMegaOpen && (
                      <div className="absolute -bottom-px left-0 right-0 h-[3px] bg-[#0B57D0] rounded-t-full shadow-xs" />
                    )}
                  </div>
                );
              }

              // 3. Flat Dropdown Item
              if (hasFlatDropdown && Array.isArray(item.dropdown_items) && item.dropdown_items.length > 0) {
                const menuItems = item.dropdown_items.map((sub, sIdx) => ({
                  key: sub._id || sIdx,
                  label: (
                    <Link
                      href={sub.url || "#"}
                      onClick={() => setActiveMenuKey(null)}
                      className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-slate-800 hover:text-[#072C50]"
                    >
                      <span>{sub.label}</span>
                      {sub.badge && (
                        <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                          {sub.badge}
                        </span>
                      )}
                    </Link>
                  ),
                }));

                return (
                  <div key={itemKey} className="relative flex items-center h-full">
                    <Dropdown
                      menu={{ items: menuItems }}
                      trigger={["click", "hover"]}
                      placement="bottom"
                    >
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-[14.5px] font-bold text-slate-700 hover:text-[#072C50] transition-colors py-2 cursor-pointer select-none"
                      >
                        <span>{item.label}</span>
                        <DownOutlined className="text-[10px] text-slate-500" />
                      </button>
                    </Dropdown>
                  </div>
                );
              }

              // 4. Standard Direct Link
              return (
                <div key={itemKey} className="relative flex items-center h-full">
                  <Link
                    href={item.url || "#"}
                    onClick={() => setActiveMenuKey(null)}
                    className="text-[14.5px] font-bold text-slate-700 hover:text-[#072C50] transition-colors py-2"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-1 text-[9px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </div>
              );
            })}

            {/* Featured Buttons (e.g. Compare Universities) */}
            {rawFeaturedButtons.map((btn, idx) => (
              <Link
                key={btn._id || idx}
                href={btn.url || "/compare-university"}
                onClick={() => setActiveMenuKey(null)}
                style={{
                  ...(btn.variant === "gold" || !btn.bg_color ? goldBtnStyle : {}),
                  ...(btn.bg_color ? { backgroundColor: btn.bg_color } : {}),
                  ...(btn.text_color ? { color: btn.text_color } : {}),
                  fontSize: "13px",
                  height: "36px",
                  padding: "0 18px",
                  borderRadius: "8px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
                className="inline-flex items-center justify-center font-bold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap ml-1 select-none"
              >
                {btn.text || "Compare Universities"}
              </Link>
            ))}
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <AiToolButton
              label="AI Tools"
              badge="NEW"
              onClick={handleToolClick}
              className="whitespace-nowrap shrink-0"
            />

            {rawFeaturedButtons[0] && (
              <Link
                href={rawFeaturedButtons[0].url || "/compare-university"}
                style={{ ...goldBtnStyle, fontSize: "11px", borderRadius: "6px", height: "28px", padding: "0 10px" }}
                className="inline-flex items-center justify-center whitespace-nowrap shrink-0 shadow-none font-bold select-none"
              >
                {rawFeaturedButtons[0].text?.split(" ")[0] || "Compare"}
              </Link>
            )}

            <Button
              type="text"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              icon={mobileMenuOpen ? <CloseOutlined className="text-lg text-[#072C50]" /> : <MenuOutlined className="text-lg text-[#072C50]" />}
              className="p-1 flex items-center justify-center cursor-pointer"
              aria-label="Toggle menu"
            />
          </div>
        </Container>

        {/* =====================================================
            🌟 DYNAMIC MEGA MENU POPUP WINDOW (Matches Mockups)
        ====================================================== */}
        {currentMegaMenuData && (
          <>
            {/* Subtle Overlay Backdrop */}
            <div
              className="fixed inset-0 top-16 bg-slate-900/15 backdrop-blur-[1px] z-40 transition-opacity"
              onClick={() => setActiveMenuKey(null)}
            />

            {/* Floating White Mega Menu Card */}
            <div className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl bg-white border border-slate-200/90 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="flex flex-col lg:flex-row min-h-[380px]">
                {/* ── LEFT SIDEBAR: DYNAMIC CATEGORIES LIST ── */}
                <div className="w-full lg:w-68 xl:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-100 p-4 bg-white flex flex-col justify-start">
                  {/* Top Section Header */}
                  <div className="flex items-center gap-2.5 pb-3 mb-2 border-b border-slate-100/80">
                    {currentMegaMenuData.sidebarIcon}
                    <h3 className="text-[14px] font-bold text-[#072C50] m-0">
                      {currentMegaMenuData.sidebarHeaderTitle}
                    </h3>
                  </div>

                  {/* Vertical Categories List */}
                  <div className="space-y-1">
                    {currentMegaMenuData.groups.map((grp, gIdx) => {
                      const isActive = currentMegaMenuData.currentIdx === gIdx;
                      return (
                        <button
                          key={grp.category?._id || gIdx}
                          type="button"
                          onClick={() =>
                            setActiveCategoryIndex((prev) => ({
                              ...prev,
                              [currentMegaMenuData.itemKey]: gIdx,
                            }))
                          }
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-[12.5px] transition-all cursor-pointer select-none ${isActive
                              ? "bg-[#EBF3FE] text-[#0B57D0] font-bold shadow-xs"
                              : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium"
                            }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={isActive ? "text-[#0B57D0]" : "text-slate-400"}>
                              {renderCategoryIcon(grp.category?.name, currentMegaMenuData.type)}
                            </span>
                            <span className="truncate">{grp.category?.name}</span>
                          </div>
                          <RightOutlined
                            className={`text-[9.5px] shrink-0 ml-1 transition-transform ${isActive ? "text-[#0B57D0] font-bold translate-x-0.5" : "text-slate-400"
                              }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── RIGHT CONTENT AREA: 3-COLUMN CARDS GRID ── */}
                <div className="flex-1 p-5 bg-white overflow-y-auto max-h-[460px] scrollbar-thin [scrollbar-color:#cbd5e1_transparent]">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
                    {/* A. DYNAMIC UNIVERSITY CARDS (Screenshot 1) */}
                    {currentMegaMenuData.type === "universities" &&
                      currentMegaMenuData.currentGroup?.items?.map((uni, idx) => {
                        const uniSlug = uni.slug || uni._id || uni.name;
                        const logoUrl = uni.logo?.url || (typeof uni.logo === "string" ? uni.logo : null);
                        const detailUrl = uni.url || `/universities/${encodeURIComponent(uniSlug)}`;
                        const coursesUrl = `/courses?university=${encodeURIComponent(uniSlug)}`;

                        return (
                          <div
                            key={uni._id || idx}
                            className="bg-white border border-slate-200/90 rounded-xl p-3 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
                          >
                            <div>
                              <div className="flex items-start gap-2.5">
                                {/* University Logo */}
                                <Link
                                  href={detailUrl}
                                  onClick={() => setActiveMenuKey(null)}
                                  className="relative w-10 h-10 flex items-center justify-start shrink-0 group-hover:scale-105 transition-transform"
                                >
                                  {logoUrl ? (
                                    <Image
                                      src={logoUrl}
                                      alt={uni.name || "University Logo"}
                                      fill
                                      unoptimized
                                      sizes="40px"
                                      className="object-contain object-left"
                                    />
                                  ) : (
                                    <span className="text-xs font-black text-[#072C50]">
                                      {(uni.name || "U").charAt(0)}
                                    </span>
                                  )}
                                </Link>

                                {/* University Details */}
                                <div className="min-w-0 flex-1">
                                  <Link
                                    href={detailUrl}
                                    onClick={() => setActiveMenuKey(null)}
                                    className="block group-hover:text-[#0B57D0] transition-colors"
                                  >
                                    <h4
                                      className="text-[13px] font-bold text-slate-900 leading-snug truncate m-0 group-hover:text-[#0B57D0] transition-colors"
                                      title={uni.name}
                                    >
                                      {uni.name}
                                    </h4>
                                  </Link>

                                  {/* Dynamic Badges: Approvals & Course Count */}
                                  <div className="flex items-center gap-3 mt-1">
                                    {uni.approval && (
                                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                                        <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {uni.approval}
                                      </span>
                                    )}
                                    {uni.courses_count > 0 && (
                                      <Link
                                        href={coursesUrl}
                                        onClick={() => setActiveMenuKey(null)}
                                        className="inline-flex items-center gap-1 text-[10px] text-slate-500 hover:text-[#0B57D0] font-medium transition-colors"
                                      >
                                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        {uni.courses_count}+ Courses
                                      </Link>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons Row */}
                            <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-100/80">
                              <Link
                                href={detailUrl}
                                onClick={() => setActiveMenuKey(null)}
                                className="px-3 py-1 text-[11px] font-semibold text-slate-700 bg-white border border-slate-300 rounded-2xl hover:bg-slate-50 hover:border-slate-400 transition inline-block select-none"
                              >
                                Know More
                              </Link>

                              <Link
                                href={coursesUrl}
                                onClick={() => setActiveMenuKey(null)}
                                className="text-[11px] font-bold text-slate-900 hover:text-[#0B57D0] flex items-center gap-1 transition select-none"
                              >
                                <span>View Courses</span>
                                <span className="text-[12px] leading-none">→</span>
                              </Link>
                            </div>
                          </div>
                        );
                      })}

                    {/* B. DYNAMIC COURSE / PROGRAM CARDS (Screenshot 2) */}
                    {currentMegaMenuData.type === "programs" &&
                      currentMegaMenuData.currentGroup?.items?.map((prog, idx) => {
                        const progSlug = (prog.slug && !/^[0-9a-fA-F]{24}$/.test(prog.slug))
                          ? prog.slug
                          : (prog.name ? prog.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : String(prog._id || ""));

                        const catSlug = (currentMegaMenuData.currentGroup?.category?.slug && !/^[0-9a-fA-F]{24}$/.test(currentMegaMenuData.currentGroup.category.slug))
                          ? currentMegaMenuData.currentGroup.category.slug
                          : (currentMegaMenuData.currentGroup?.category?.name ? currentMegaMenuData.currentGroup.category.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : "");

                        const pastel = getCoursePastelStyle(prog.name);

                        // Ensure detailUrl never contains a 24-character ObjectId
                        let detailUrl = prog.url;
                        if (detailUrl && /[0-9a-fA-F]{24}/.test(detailUrl)) {
                          detailUrl = detailUrl.replace(/[0-9a-fA-F]{24}/g, encodeURIComponent(progSlug));
                        }
                        if (!detailUrl) {
                          detailUrl = catSlug
                            ? `/courses?category=${encodeURIComponent(catSlug)}&course=${encodeURIComponent(progSlug)}`
                            : `/courses?course=${encodeURIComponent(progSlug)}`;
                        }
                        const unisUrl = `/universities?course=${encodeURIComponent(progSlug)}`;

                        // Prioritise header_logo for header, fallback to course logo, then pastel icon
                        const headerLogoObj = prog.header_logo || prog.effective_logo || prog.logo;
                        const headerLogoUrl = headerLogoObj?.url ? resolveImg(headerLogoObj) : null;

                        return (
                          <div
                            key={prog._id || idx}
                            className="bg-white border border-slate-200/90 rounded-xl p-3 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
                          >
                            <div>
                              <div className="flex items-start gap-2.5">
                                {/* Course Icon or Header / Course Logo */}
                                <Link
                                  href={detailUrl}
                                  onClick={() => setActiveMenuKey(null)}
                                  className={`relative w-9 h-9 ${pastel.text} flex items-center justify-start shrink-0 group-hover:scale-105 transition-transform`}
                                >
                                  {headerLogoUrl ? (
                                    <Image
                                      src={headerLogoUrl}
                                      alt={prog.name || "Course Logo"}
                                      fill
                                      unoptimized
                                      sizes="36px"
                                      className="object-contain object-left"
                                    />
                                  ) : (
                                    pastel.icon
                                  )}
                                </Link>

                                {/* Course Details */}
                                <div className="min-w-0 flex-1">
                                  <Link
                                    href={detailUrl}
                                    onClick={() => setActiveMenuKey(null)}
                                    className="block group-hover:text-[#0B57D0] transition-colors"
                                  >
                                    <h4
                                      className="text-[13px] font-bold text-slate-900 leading-snug truncate m-0 group-hover:text-[#0B57D0] transition-colors"
                                      title={prog.name}
                                    >
                                      {prog.name}
                                    </h4>
                                  </Link>

                                  {/* Metadata: Dynamic Duration & Specialisations */}
                                  <div className="flex items-center gap-2 mt-1">
                                    {prog.duration && (
                                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                                        <svg className="w-3 h-3 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        {prog.duration}
                                      </span>
                                    )}
                                    {prog.specialisations_count > 0 && (
                                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                                        <svg className="w-3 h-3 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                                          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                        </svg>
                                        {prog.specialisations_count} Specialisation
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons Row */}
                            <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-100/80">
                              <Link
                                href={detailUrl}
                                onClick={() => setActiveMenuKey(null)}
                                className="px-3 py-1 text-[11px] font-semibold text-slate-700 bg-white border border-slate-300 rounded-2xl hover:bg-slate-50 hover:border-slate-400 transition inline-block select-none"
                              >
                                Know More
                              </Link>

                              <Link
                                href={unisUrl}
                                onClick={() => setActiveMenuKey(null)}
                                className="text-[11px] font-bold text-slate-900 hover:text-[#0B57D0] flex items-center gap-1 transition select-none"
                              >
                                <span>View Universities</span>
                                <span className="text-[12px] leading-none">→</span>
                              </Link>
                            </div>
                          </div>
                        );
                      })}

                    {/* Empty State for category with no items */}
                    {(!currentMegaMenuData.currentGroup?.items || currentMegaMenuData.currentGroup.items.length === 0) && (
                      <div className="col-span-full py-12 text-center text-slate-400 font-medium text-xs">
                        No items found in this category currently.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Mobile Navigation Drawer — 100% Dynamic */}
        <Drawer
          open={mobileMenuOpen}
          onClose={() => {
            setMobileMenuOpen(false);
            setMobileActiveKeys([]);
          }}
          placement="top"
          styles={{
            wrapper: { height: "auto", maxHeight: "88vh" },
            section: { height: "auto", maxHeight: "88vh", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" },
            header: { padding: "12px 16px", backgroundColor: "#f8fafc", borderBottom: "1px solid #f1f5f9" },
            body: { padding: "8px 16px", height: "auto", maxHeight: "calc(88vh - 60px)", overflowY: "auto" },
          }}
          title={
            <div className="relative w-36 h-9">
              <Image
                src={logoUrl}
                alt={logoAlt}
                fill
                priority
                loading="eager"
                fetchPriority="high"
                unoptimized
                sizes="(max-width: 768px) 150px, 180px"
                className="object-contain object-left"
              />
            </div>
          }
          closeIcon={<CloseOutlined className="text-base text-slate-700 font-bold" />}
        >
          <div className="space-y-1 pb-4">
            {mobileCollapseItems.length > 0 && (
              <Collapse
                ghost
                accordion
                activeKey={mobileActiveKeys}
                onChange={(keys) => {
                  setMobileActiveKeys(typeof keys === "string" ? (keys ? [keys] : []) : keys);
                }}
                expandIconPlacement="end"
                items={mobileCollapseItems}
                className="border-none [&_.ant-collapse-item]:border-b [&_.ant-collapse-item]:border-slate-100 [&_.ant-collapse-header]:py-3.5! [&_.ant-collapse-header]:px-2! [&_.ant-collapse-content-box]:p-2! cursor-pointer"
              />
            )}

            {mobileLinkItems.map((item, idx) => (
              <Link
                key={item._id || idx}
                href={item.url || "#"}
                onClick={() => closeMobile()}
                className="block py-3.5 px-2 border-b border-slate-100 font-bold text-[14.5px] text-[#072C50] hover:text-[#0B57D0]"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 flex flex-col gap-2.5">
              <Button
                block
                onClick={() => {
                  closeMobile();
                  openTool("suggest-me-a-university", { tool_mode: "Suggest University" });
                }}
                className="h-10 font-bold text-xs bg-[#EBF3FE] text-[#0B57D0] border-blue-200 rounded-lg flex items-center justify-center gap-1.5"
              >
                <span>✦ Explore AI Tools</span>
              </Button>

              {rawFeaturedButtons.map((btn, idx) => (
                <Link
                  key={btn._id || idx}
                  href={btn.url || "/compare-university"}
                  onClick={() => closeMobile()}
                  style={{ ...goldBtnStyle, height: "40px", borderRadius: "8px" }}
                  className="w-full flex items-center justify-center font-bold text-xs shadow-xs select-none"
                >
                  {btn.text || "Compare Universities"}
                </Link>
              ))}
            </div>
          </div>
        </Drawer>
      </AntHeader>
    </>
  );
}

export default Header;