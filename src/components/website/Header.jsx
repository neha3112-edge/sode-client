"use client";

import React, { useState, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { Container } from "@/components/common/Container";
import { getAssetPath } from "@/lib/utils";
import { useToolWizard } from "@/components/tool/ToolWizardContext";

export function Header({ initialHeaderData = null, siteLogo = null }) {
  const router = useRouter();
  const { openTool } = useToolWizard();

  const headerData = initialHeaderData?.result || initialHeaderData || {};

  // Active mega menu dropdown tracking
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState({}); // { [menuId]: categoryIdx }
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedId, setMobileExpandedId] = useState(null);

  const menuTimeoutRef = useRef(null);

  const handleMouseEnter = (menuId) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenuId(menuId);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenuId(null);
    }, 150);
  };

  const resolveImageUrl = (mediaObj, fallback = "/assets/images/new_sode_tm_logo.png") => {
    if (!mediaObj) return fallback;
    if (typeof mediaObj === "string") return mediaObj.startsWith("http") ? mediaObj : getAssetPath(mediaObj, fallback);
    if (mediaObj.url) return mediaObj.url;
    return fallback;
  };

  const logoUrl = resolveImageUrl(headerData?.logo || siteLogo, "/assets/images/new_sode_tm_logo.png");
  const logoAlt = headerData?.logo_alt || "School of Online & Distance Education (SODE)";

  // 1. Dynamic Navigation Menu Items from Header API
  const rawMenuItems = useMemo(() => {
    return Array.isArray(headerData?.menu_items)
      ? headerData.menu_items.filter((item) => item.enabled !== false)
      : [];
  }, [headerData]);

  // 2. Dynamic Featured Buttons from Header API
  const rawFeaturedButtons = useMemo(() => {
    return Array.isArray(headerData?.featured_buttons)
      ? headerData.featured_buttons.filter((b) => b.enabled !== false)
      : headerData?.featured_button?.enabled !== false && headerData?.featured_button?.text
      ? [headerData.featured_button]
      : [];
  }, [headerData]);

  const handleToolClick = (e) => {
    e?.preventDefault();
    setActiveMenuId(null);
    openTool("suggest-me-a-university", { tool_mode: "Suggest University" });
  };

  const announcement = headerData?.announcement_bar;
  const bgColor = headerData?.bg_color || "#ffffff";
  const textColor = headerData?.text_color || "#072C50";

  return (
    <>
      {/* Optional Top Announcement Bar */}
      {announcement?.enabled && announcement?.text && (
        <div
          style={{ backgroundColor: announcement.bg_color || "#1e2f4d", color: announcement.text_color || "#ffffff" }}
          className="w-full text-center py-1.5 px-4 text-xs font-medium"
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

      {/* Main Original Navbar UI */}
      <header
        style={{ backgroundColor: bgColor }}
        className="w-full bg-white border-b border-slate-100 z-50 relative shadow-2xs select-none"
        onMouseLeave={handleMouseLeave}
      >
        <Container className="flex items-center justify-between h-13 sm:h-14 md:h-15">
          {/* 1. BRAND LOGO ON THE LEFT (PROMINENT SIZING) */}
          <Link
            href={headerData?.logo_url || "/"}
            className="flex items-center group shrink-0"
            onClick={() => setActiveMenuId(null)}
          >
            <div
              style={{ height: "52px" }}
              className="relative w-36 sm:w-44 md:w-48 flex items-center justify-start transition-transform group-hover:scale-105"
            >
              <Image
                src={logoUrl}
                alt={logoAlt}
                fill
                sizes="(max-width: 768px) 180px, 240px"
                priority
                fetchPriority="high"
                className="object-contain object-left cursor-pointer"
              />
            </div>
          </Link>

          {/* 2. DESKTOP NAVIGATION MENU ITEMS (ORIGINAL STYLING & EXACT NAMES) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
            {rawMenuItems.map((item, idx) => {
              const menuId = item._id || idx;
              const isAiTools =
                item.is_highlighted ||
                (item.label && item.label.toLowerCase().includes("ai tool")) ||
                item.badge?.toLowerCase().includes("new");

              // Special Pill for AI Tools with "NEW" Badge (Original Design)
              if (isAiTools) {
                return (
                  <button
                    key={menuId}
                    type="button"
                    onClick={handleToolClick}
                    className="relative inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-100/80 hover:bg-sky-200/80 text-[#0284c7] hover:text-[#0369a1] border border-sky-200/90 font-bold text-xs transition-all duration-200 cursor-pointer group shadow-none"
                  >
                    <span className="text-sky-500 font-extrabold text-xs leading-none group-hover:rotate-12 transition-transform">✦</span>
                    <span className="text-slate-800 font-semibold">{item.label || "AI Tools"}</span>
                    <span className="absolute -top-1.5 -right-1 px-1 py-0.2 text-[8px] font-black uppercase tracking-wider rounded-full bg-linear-to-r from-amber-400 to-amber-500 text-slate-950 border border-white leading-none">
                      {item.badge || "NEW"}
                    </span>
                  </button>
                );
              }

              const hasDropdown = item.has_dropdown && ((Array.isArray(item.mega_menu) && item.mega_menu.length > 0) || (Array.isArray(item.dropdown_items) && item.dropdown_items.length > 0));
              const isOpen = activeMenuId === menuId;

              // Menu Item with Dropdown / Dynamic Mega Menu
              if (hasDropdown) {
                return (
                  <div
                    key={menuId}
                    className="relative py-1 cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(menuId)}
                    onClick={() => setActiveMenuId(isOpen ? null : menuId)}
                  >
                    <div
                      style={{ color: isOpen ? "#996633" : textColor }}
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#072C50] hover:text-[#996633] transition-colors py-0.5 cursor-pointer tracking-tight"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-3 h-3 text-slate-500 group-hover:text-[#996633] transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#996633]" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                );
              }

              // Standard Link
              return (
                <Link
                  key={menuId}
                  href={item.url || "#"}
                  target={item.target || "_self"}
                  style={{ color: textColor }}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#072C50] hover:text-[#996633] transition-colors py-0.5 cursor-pointer tracking-tight"
                >
                  {item.label}
                </Link>
              );
            })}

            {/* 3. DYNAMIC FEATURED ACTION BUTTON (ORIGINAL GOLD GRADIENT THEME) */}
            {rawFeaturedButtons.map((btn, idx) => (
              <Link
                key={btn._id || idx}
                href={btn.url || "/compare"}
                style={{
                  background: "linear-gradient(180deg, #F6DE95 0%, #EEC471 100%)",
                  color: "#072C50",
                }}
                className="inline-flex items-center justify-center px-4 py-1.5 rounded-md font-bold text-xs sm:text-[13px] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap border border-[#EEC471]/60 shadow-none"
              >
                {btn.text || "Compare Universities"}
              </Link>
            ))}
          </nav>

          {/* 4. MOBILE NAVBAR QUICK ACTIONS & HAMBURGER */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            {/* Mobile AI Tools Pill */}
            <button
              type="button"
              onClick={handleToolClick}
              className="relative inline-flex items-center gap-1 px-2 py-1 rounded-full bg-sky-50 text-[#0284c7] border border-sky-200 text-[11px] font-bold cursor-pointer shadow-none"
            >
              <span className="text-sky-500 font-extrabold text-[10px]">✦</span>
              <span>AI Tools</span>
              <span className="px-1 py-0.2 text-[7.5px] font-black uppercase rounded-full bg-amber-400 text-slate-950">
                NEW
              </span>
            </button>

            {/* Mobile Compare Button */}
            {rawFeaturedButtons[0] && (
              <Link
                href={rawFeaturedButtons[0]?.url || "/compare"}
                style={{
                  background: "linear-gradient(180deg, #F6DE95 0%, #EEC471 100%)",
                  color: "#072C50",
                }}
                className="px-2.5 py-1 rounded-md font-bold text-[11px] border border-[#EEC471]/60 whitespace-nowrap shadow-none"
              >
                {rawFeaturedButtons[0]?.text?.replace(/universities/i, "").trim() || "Compare"}
              </Link>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6 text-[#072C50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-[#072C50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </Container>

        {/* ========================================================================= */}
        {/* 🌟 DESKTOP MEGA MENU (REF-ID DRIVEN)                                      */}
        {/* ========================================================================= */}
        {rawMenuItems.map((item, idx) => {
          const menuId = item._id || idx;
          if (activeMenuId !== menuId || !item.has_dropdown) return null;

          const megaMenuGroups = Array.isArray(item.mega_menu) && item.mega_menu.length > 0 ? item.mega_menu : null;
          const isUniversitiesMenu = item.label && item.label.toLowerCase().includes("universit");

          if (megaMenuGroups) {
            const currentCatIdx = activeCategoryIndex[menuId] || 0;
            const currentGroup = megaMenuGroups[currentCatIdx] || megaMenuGroups[0];
            const currentItems = currentGroup?.items || [];

            return (
              <div
                key={`megamenu-${menuId}`}
                className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 w-[94vw] max-w-5xl xl:max-w-6xl bg-white border border-slate-200/90 rounded-2xl shadow-2xl z-50 p-0 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200"
                onMouseEnter={() => handleMouseEnter(menuId)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex flex-col">
                  {/* ── TOP FULL-FLUSH EDGE-TO-EDGE SEGMENTED HEADER TABS (COMPACT HEIGHT) ── */}
                  <div className="w-full grid grid-flow-col auto-cols-fr bg-slate-50 border-b border-slate-200 divide-x divide-slate-200 rounded-t-2xl overflow-hidden">
                    {megaMenuGroups.map((group, gIdx) => {
                      const isActive = currentCatIdx === gIdx;
                      return (
                        <button
                          key={group.category?._id || gIdx}
                          type="button"
                          onClick={() => setActiveCategoryIndex((prev) => ({ ...prev, [menuId]: gIdx }))}
                          onMouseEnter={() => setActiveCategoryIndex((prev) => ({ ...prev, [menuId]: gIdx }))}
                          className={`h-9 sm:h-9.5 md:h-10 flex items-center justify-center gap-1.5 px-2.5 sm:px-3 text-xs sm:text-[12.5px] font-bold transition-colors cursor-pointer select-none text-center ${
                            isActive
                              ? "bg-[#0B3B7E] text-white font-extrabold"
                              : "text-[#072C50] bg-slate-50 hover:bg-slate-100/90 hover:text-blue-700"
                          }`}
                        >
                          <span className="truncate">{group.category?.name}</span>
                          {group.category?.code && (
                            <span
                              className={`px-1.5 py-0.2 rounded text-[8.5px] font-black shrink-0 ${
                                isActive ? "bg-white/20 text-white" : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {group.category.code}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* ── FULL-WIDTH DYNAMIC ITEMS GRID (WITH PADDING INSIDE) ── */}
                  <div className="w-full p-3.5 sm:p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[390px] overflow-y-auto pr-1.5 scrollbar-thin [scrollbar-color:#cbd5e1_transparent]">
                      {currentItems.map((card, cIdx) => {
                        const logoUrl = card.logo?.url ? card.logo.url : resolveImageUrl(card.logo, null);

                        return (
                          <div
                            key={card._id || cIdx}
                            className="bg-white border border-slate-200 hover:border-[#0B3B7E]/40 hover:shadow-md rounded-xl p-3 shadow-none transition-all duration-200 flex flex-col justify-between group"
                          >
                            {/* Top Card Identity */}
                            <div className="flex items-start gap-2.5 mb-2.5">
                              <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform p-1">
                                {logoUrl ? (
                                  <Image
                                    src={logoUrl}
                                    alt={card.name || "Logo"}
                                    width={26}
                                    height={26}
                                    unoptimized
                                    className="w-full h-full object-contain"
                                  />
                                ) : (
                                  <span className="text-xs font-black text-[#072C50]">
                                    {(card.name || "P").charAt(0)}
                                  </span>
                                )}
                              </div>

                              <div className="min-w-0 flex-1">
                                <h4 className="text-xs sm:text-[13px] font-bold text-[#072C50] group-hover:text-[#0B3B7E] transition-colors m-0 leading-tight truncate">
                                  {card.name}
                                </h4>
                                <p className="text-[10.5px] text-slate-500 font-medium m-0 mt-0.5 line-clamp-1 leading-tight">
                                  {card.description || card.location || currentGroup.category?.name}
                                </p>
                              </div>
                            </div>

                            {/* Bottom Action Buttons (Ant Design Buttons - No Shadow) */}
                            <div className="flex items-center gap-2 pt-2.5 border-t border-slate-100">
                              <Button
                                type="primary"
                                shape="round"
                                size="middle"
                                onClick={() => {
                                  setActiveMenuId(null);
                                  router.push(card.url || "/courses");
                                }}
                                style={{
                                  background: "linear-gradient(180deg, #F6DE95 0%, #EEC471 100%)",
                                  color: "#072C50",
                                  borderColor: "#EEC471",
                                  fontWeight: 700,
                                  fontSize: "12px",
                                  flex: 1,
                                  boxShadow: "none",
                                }}
                              >
                                Explore
                              </Button>
                              <Button
                                shape="round"
                                size="middle"
                                onClick={() => {
                                  setActiveMenuId(null);
                                  router.push(
                                    isUniversitiesMenu
                                      ? `/courses?university=${encodeURIComponent(card.slug || card.name)}`
                                      : `/universities?course=${encodeURIComponent(card.slug || card.name)}`
                                  );
                                }}
                                style={{
                                  backgroundColor: "#072C50",
                                  color: "#ffffff",
                                  borderColor: "#072C50",
                                  fontWeight: 700,
                                  fontSize: "12px",
                                  flex: 1,
                                  boxShadow: "none",
                                }}
                              >
                                {isUniversitiesMenu ? "View Courses" : "View Universities"}
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Flat Dropdown Fallback
          return (
            <div
              key={`megamenu-flat-${menuId}`}
              className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50"
              onMouseEnter={() => handleMouseEnter(menuId)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                {item.dropdown_items?.map((sub, sIdx) => (
                  <Link
                    key={sub._id || sIdx}
                    href={sub.url || "#"}
                    onClick={() => setActiveMenuId(null)}
                    className="flex items-center justify-between px-3.5 py-2 hover:bg-amber-50/60 text-slate-800 hover:text-[#072C50] text-xs font-medium transition-colors"
                  >
                    <span>{sub.label}</span>
                    {sub.badge && (
                      <span className="px-1.5 py-0.5 text-[8px] font-bold rounded bg-amber-100 text-amber-900 border border-amber-200">
                        {sub.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* ========================================================================= */}
        {/* 📱 TOP-DOWN MOBILE DRAWER (SLIDES DOWN FROM THE TOP)                       */}
        {/* ========================================================================= */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[1000] flex flex-col justify-start">
            {/* Backdrop Blur Overlay */}
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-Down Drawer Container (From Top) */}
            <div className="relative w-full max-h-[82vh] bg-white rounded-b-3xl shadow-2xl z-[1001] flex flex-col overflow-hidden animate-in slide-in-from-top duration-300 border-b border-slate-200">
              {/* Drawer Top Header */}
              <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/90">
                <div className="relative w-40 sm:w-44 h-10">
                  <Image
                    src={logoUrl}
                    alt={logoAlt}
                    fill
                    priority
                    loading="eager"
                    fetchPriority="high"
                    unoptimized
                    sizes="(max-width: 768px) 180px, 200px"
                    className="object-contain object-left"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-700 font-bold cursor-pointer transition-colors"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-8">
                <div className="space-y-2.5">
                  {rawMenuItems.map((item, idx) => {
                    const menuId = item._id || idx;
                    const isAiTools =
                      item.is_highlighted ||
                      (item.label && item.label.toLowerCase().includes("ai tool")) ||
                      item.badge?.toLowerCase().includes("new");

                    if (isAiTools) return null;

                    const hasDropdown =
                      item.has_dropdown &&
                      ((Array.isArray(item.mega_menu) && item.mega_menu.length > 0) ||
                        (Array.isArray(item.dropdown_items) && item.dropdown_items.length > 0));
                    const isExpanded = mobileExpandedId === menuId;
                    const isUniversitiesMenu = item.label && item.label.toLowerCase().includes("universit");

                    if (hasDropdown) {
                      const groups =
                        item.mega_menu || [{ category: { name: item.label }, items: item.dropdown_items || [] }];

                      return (
                        <div
                          key={`mob-${menuId}`}
                          className="border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs bg-white"
                        >
                          <button
                            type="button"
                            onClick={() => setMobileExpandedId(isExpanded ? null : menuId)}
                            className={`w-full flex items-center justify-between p-4 font-extrabold text-[15px] text-[#072C50] transition-colors cursor-pointer ${
                              isExpanded ? "bg-[#072C50] text-white" : "bg-slate-50/90 hover:bg-slate-100"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span>{item.label}</span>
                              {item.badge && (
                                <span className="px-2 py-0.5 text-[9px] font-black rounded-full bg-amber-400 text-slate-950">
                                  {item.badge}
                                </span>
                              )}
                            </span>
                            <svg
                              className={`w-4.5 h-4.5 transition-transform duration-200 ${
                                isExpanded ? "rotate-180 text-white" : "text-slate-500"
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {isExpanded && (
                            <div className="p-3.5 space-y-4 max-h-[60vh] overflow-y-auto divide-y divide-slate-100">
                              {groups.map((grp, gIdx) => (
                                <div key={grp.category?._id || gIdx} className="pt-3.5 first:pt-0 space-y-2.5">
                                  <div className="flex items-center justify-between px-1">
                                    <span className="text-[13px] font-black uppercase text-[#0B3B7E] tracking-wider">
                                      {grp.category?.name}
                                    </span>
                                    <span className="text-[11px] font-bold text-slate-400">
                                      {grp.items?.length || 0} items
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2.5">
                                    {grp.items?.map((card, cIdx) => {
                                      const logoUrl = card.logo?.url ? card.logo.url : resolveImageUrl(card.logo, null);

                                      return (
                                        <div
                                          key={card._id || cIdx}
                                          className="p-2.5 rounded-xl border border-slate-200/90 bg-white hover:border-[#0B3B7E]/40 flex flex-col justify-between gap-2.5 shadow-none transition-all"
                                        >
                                          {/* Card Header (Icon + Name) */}
                                          <div className="flex items-start gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 p-1">
                                              {logoUrl ? (
                                                <Image
                                                  src={logoUrl}
                                                  alt={card.name || "Logo"}
                                                  width={24}
                                                  height={24}
                                                  unoptimized
                                                  className="w-full h-full object-contain"
                                                />
                                              ) : (
                                                <span className="text-xs font-black text-[#072C50]">
                                                  {(card.name || "P").charAt(0)}
                                                </span>
                                              )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                              <div className="text-[13px] font-bold text-[#072C50] leading-snug truncate">
                                                {card.name}
                                              </div>
                                              <div className="text-[10.5px] text-slate-500 font-medium leading-snug truncate mt-0.5">
                                                {card.description || card.location || grp.category?.name}
                                              </div>
                                            </div>
                                          </div>

                                          {/* Card Actions (2 Clear Action Buttons) */}
                                          <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-100">
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setMobileMenuOpen(false);
                                                router.push(card.url || "/courses");
                                              }}
                                              style={{
                                                background: "linear-gradient(180deg, #F6DE95 0%, #EEC471 100%)",
                                                color: "#072C50",
                                              }}
                                              className="w-full py-1.5 px-1 rounded-md text-[11px] font-bold border border-[#EEC471]/60 text-center cursor-pointer truncate shadow-none"
                                            >
                                              Explore
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setMobileMenuOpen(false);
                                                router.push(
                                                  isUniversitiesMenu
                                                    ? `/courses?university=${encodeURIComponent(card.slug || card.name)}`
                                                    : `/universities?course=${encodeURIComponent(card.slug || card.name)}`
                                                );
                                              }}
                                              className="w-full py-1.5 px-1 rounded-md bg-[#072C50] text-white text-[11px] font-bold text-center cursor-pointer truncate shadow-none"
                                            >
                                              {isUniversitiesMenu ? "Courses" : "Unis"}
                                            </button>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={`mob-${menuId}`}
                        href={item.url || "#"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block p-4 rounded-2xl border border-slate-200 font-bold text-[15px] text-[#072C50] hover:bg-slate-50 transition-colors"
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;