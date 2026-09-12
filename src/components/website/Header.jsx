"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Layout, Menu, Dropdown, Drawer, Badge, Collapse } from "antd";
import { DownOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { getAssetPath } from "@/lib/utils";
import { useToolWizard } from "@/components/tool/ToolWizardContext";

const { Header: AntHeader } = Layout;

const goldBtnStyle = {
  background: "linear-gradient(180deg, #F6DE95 0%, #EEC471 100%)",
  color: "#072C50",
  borderColor: "rgba(238, 196, 113, 0.6)",
  fontWeight: 700,
};

const navyBtnStyle = {
  backgroundColor: "#072C50",
  color: "#ffffff",
  borderColor: "#072C50",
  fontWeight: 700,
};

function resolveImg(mediaObj, fallback = "/assets/images/new_sode_tm_logo.png") {
  if (!mediaObj) return getAssetPath(fallback);
  if (typeof mediaObj === "string") return mediaObj.startsWith("http") ? mediaObj : getAssetPath(mediaObj, fallback);
  if (mediaObj.url) return mediaObj.url.startsWith("http") ? mediaObj.url : getAssetPath(mediaObj.url);
  return getAssetPath(fallback);
}

function AiToolButton({ label = "AI Tools", badge = "NEW", onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-100/80 hover:bg-sky-200/80 text-[#0284c7] hover:text-[#0369a1] border border-sky-200/90 font-bold text-xs transition-all duration-200 cursor-pointer group shadow-none ${className}`}
    >
      <span className="text-sky-500 font-extrabold text-xs leading-none group-hover:rotate-12 transition-transform">✦</span>
      <span className="text-slate-800 font-semibold">{label}</span>
      <span className="absolute -top-1.5 -right-1 px-1 py-0.2 text-[8px] font-black uppercase tracking-wider rounded-full bg-linear-to-r from-amber-400 to-amber-500 text-slate-950 border border-white leading-none">
        {badge}
      </span>
    </button>
  );
}

function MenuCard({ card, catSlug, isUni, isMobile, onNavigate }) {
  const logo = card.logo?.url ? card.logo.url : resolveImg(card.logo, null);
  const title = card.name || card.label;
  const cardSlug = card.slug || card._id || card.name;

  const exploreUrl =
    card.url ||
    (isUni
      ? `/courses?university=${encodeURIComponent(cardSlug)}`
      : `/courses?category=${encodeURIComponent(catSlug || cardSlug)}&subcategory=${encodeURIComponent(cardSlug)}`);

  const uniCourseUrl = isUni
    ? `/courses?university=${encodeURIComponent(cardSlug)}`
    : `/universities?course=${encodeURIComponent(cardSlug)}`;

  if (isMobile) {
    return (
      <div className="p-2 rounded-xl border border-slate-200/90 bg-white hover:border-[#0B3B7E]/40 flex flex-col justify-between gap-2 shadow-none transition-all">
        <div className="flex items-start gap-1.5">
          <div className="w-7 h-7 flex items-center justify-center shrink-0">
            {logo ? (
              <Image src={logo} alt={title || "Logo"} width={24} height={24} unoptimized className="w-full h-full object-contain" />
            ) : (
              <span className="text-xs font-black text-[#072C50]">{(title || "P").charAt(0)}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11.5px] font-bold text-[#072C50] leading-snug truncate">{title}</div>
            <div className="text-[9.5px] text-slate-500 font-medium leading-snug truncate mt-0.5">
              {card.description || card.location || ""}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 pt-1.5 border-t border-slate-100">
          <Button
            size="small"
            onClick={() => onNavigate(exploreUrl)}
            style={{ ...goldBtnStyle, fontSize: "10px", height: "24px", padding: "0 4px" }}
          >
            Explore
          </Button>
          <Button
            size="small"
            onClick={() => onNavigate(uniCourseUrl)}
            style={{ ...navyBtnStyle, fontSize: "10px", height: "24px", padding: "0 4px" }}
          >
            {isUni ? "Courses" : "Unis"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 hover:border-[#0B3B7E]/40 hover:shadow-md rounded-xl p-3 shadow-none transition-all duration-200 flex flex-col justify-between group">
      <div className="flex items-start gap-2.5 mb-2.5">
        <div className="w-9 h-9 flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
          {logo ? (
            <Image src={logo} alt={title || "Logo"} width={32} height={32} unoptimized className="w-full h-full object-contain" />
          ) : (
            <span className="text-xs font-black text-[#072C50]">{(title || "P").charAt(0)}</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs sm:text-[13px] font-bold text-[#072C50] group-hover:text-[#0B3B7E] transition-colors m-0 leading-tight truncate">
            {title}
          </h4>
          <p className="text-[10.5px] text-slate-500 font-medium m-0 mt-0.5 line-clamp-1 leading-tight">
            {card.description || card.location || ""}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2.5 border-t border-slate-100">
        <Button
          type="primary"
          shape="round"
          size="middle"
          onClick={() => onNavigate(exploreUrl)}
          style={{ ...goldBtnStyle, fontSize: "12px", flex: 1, boxShadow: "none" }}
        >
          Explore
        </Button>
        <Button
          shape="round"
          size="middle"
          onClick={() => onNavigate(uniCourseUrl)}
          style={{ ...navyBtnStyle, fontSize: "12px", flex: 1, boxShadow: "none" }}
        >
          {isUni ? "View Courses" : "View Universities"}
        </Button>
      </div>
    </div>
  );
}

export function Header({ initialHeaderData = null, siteLogo = null }) {
  const router = useRouter();
  const { openTool } = useToolWizard();
  const headerData = initialHeaderData?.result || initialHeaderData || {};
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveKeys, setMobileActiveKeys] = useState([]);

  const headerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoUrl = resolveImg(headerData?.logo || siteLogo, "/assets/images/new_sode_tm_logo.png");
  const logoAlt = headerData?.logo_alt || "School of Online & Distance Education (SODE)";

  const rawMenuItems = useMemo(() => {
    return Array.isArray(headerData?.menu_items) ? headerData.menu_items.filter((item) => item.enabled !== false) : [];
  }, [headerData]);

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

  const closeMobile = (url) => {
    setMobileMenuOpen(false);
    setMobileActiveKeys([]);
    if (url) router.push(url);
  };

  const announcement = headerData?.announcement_bar;
  const bgColor = headerData?.bg_color || "#ffffff";
  const textColor = headerData?.text_color || "#072C50";

  const aiMenuItem = rawMenuItems.find(
    (m) =>
      m.is_highlighted ||
      (m.label && m.label.toLowerCase().includes("ai tool")) ||
      m.badge?.toLowerCase().includes("new")
  );

  const { desktopMenuItems, mobileCollapseItems, mobileLinkItems } = useMemo(() => {
    const desktop = [];
    const mobileCollapse = [];
    const mobileLinks = [];

    rawMenuItems.forEach((item, idx) => {
      const menuId = item._id || idx;
      const strId = String(menuId);
      const isAi =
        item.is_highlighted ||
        (item.label && item.label.toLowerCase().includes("ai tool")) ||
        item.badge?.toLowerCase().includes("new");
      const hasMega = Array.isArray(item.mega_menu) && item.mega_menu.length > 0;
      const hasDropdownItems = Array.isArray(item.dropdown_items) && item.dropdown_items.length > 0;
      const hasDropdown = item.has_dropdown && (hasMega || hasDropdownItems);
      const isOpen = activeMenuId === menuId;
      const isUni = Boolean(item.label && item.label.toLowerCase().includes("universit"));

      if (isAi) {
        desktop.push({
          key: `ai-tools-${menuId}`,
          className: "!p-0 !bg-transparent !border-b-0",
          label: <AiToolButton label={item.label || "AI Tools"} badge={item.badge || "NEW"} onClick={handleToolClick} />,
        });
        return;
      }

      if (hasMega) {
        desktop.push({
          key: strId,
          className: "!border-b-0 !px-2",
          label: (
            <div
              onClick={() => setActiveMenuId(isOpen ? null : menuId)}
              style={{ color: isOpen ? "#996633" : textColor }}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold hover:text-[#996633] transition-colors py-0.5 cursor-pointer tracking-tight select-none"
            >
              <span>{item.label}</span>
              <DownOutlined className={`text-[10px] text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#996633]" : ""}`} />
            </div>
          ),
        });
      } else if (hasDropdownItems) {
        desktop.push({
          key: strId,
          className: "!border-b-0 !px-2",
          label: (
            <Dropdown
              menu={{
                items: item.dropdown_items.map((sub, sIdx) => ({
                  key: String(sub._id || sIdx),
                  label: (
                    <Link
                      href={sub.url || "#"}
                      onClick={() => setActiveMenuId(null)}
                      className="flex items-center justify-between px-3 py-1.5 text-xs font-medium text-slate-800 hover:text-[#072C50]"
                    >
                      <span>{sub.label}</span>
                      {sub.badge && <Badge count={sub.badge} style={{ backgroundColor: "#FEF3C7", color: "#92400E", fontSize: "9px" }} />}
                    </Link>
                  ),
                })),
              }}
              trigger={["click", "hover"]}
              placement="bottom"
            >
              <span
                style={{ color: textColor }}
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold hover:text-[#996633] transition-colors py-0.5 cursor-pointer tracking-tight select-none"
              >
                <span>{item.label}</span>
                <DownOutlined className="text-[10px] text-slate-500" />
              </span>
            </Dropdown>
          ),
        });
      } else {
        desktop.push({
          key: strId,
          className: "!border-b-0 !px-2",
          label: (
            <Link
              href={item.url || "#"}
              target={item.target || "_self"}
              style={{ color: textColor }}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold hover:text-[#996633] transition-colors py-0.5 cursor-pointer tracking-tight"
            >
              {item.label}
            </Link>
          ),
        });
      }

      if (hasDropdown) {
        const groups = hasMega ? item.mega_menu : [{ category: { name: item.label }, items: item.dropdown_items || [] }];
        mobileCollapse.push({
          key: strId,
          label: (
            <span
              onClick={(e) => {
                e.stopPropagation();
                setMobileActiveKeys((prev) => (prev.includes(strId) ? prev.filter((k) => k !== strId) : [strId]));
              }}
              className="flex items-center gap-2 font-extrabold text-[15px] text-[#072C50] w-full select-none cursor-pointer"
            >
              <span>{item.label}</span>
              {item.badge && <Badge count={item.badge} style={{ backgroundColor: "#F59E0B", color: "#0F172A", fontSize: "9px", fontWeight: 900 }} />}
            </span>
          ),
          children: (
            <div className="space-y-3.5 pt-1">
              {groups.map((grp, gIdx) => (
                <div key={grp.category?._id || gIdx} className="pt-2 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[12px] font-black uppercase text-[#0B3B7E] tracking-wider">{grp.category?.name}</span>
                    <span className="text-[10.5px] font-bold text-slate-400">{grp.items?.length || 0} items</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {grp.items?.map((card, cIdx) => (
                      <MenuCard
                        key={card._id || cIdx}
                        card={card}
                        catSlug={grp.category?.slug || grp.category?._id}
                        isUni={isUni}
                        isMobile={true}
                        onNavigate={closeMobile}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ),
        });
      } else {
        mobileLinks.push(item);
      }
    });

    return { desktopMenuItems: desktop, mobileCollapseItems: mobileCollapse, mobileLinkItems: mobileLinks };
  }, [rawMenuItems, activeMenuId, textColor]);

  const activeMegaMenu = useMemo(() => {
    if (!activeMenuId) return null;
    const item = rawMenuItems.find((m, idx) => (m._id || idx) === activeMenuId);
    if (!item || !Array.isArray(item.mega_menu) || item.mega_menu.length === 0) return null;
    return item;
  }, [rawMenuItems, activeMenuId]);

  return (
    <>
      {announcement?.enabled && announcement?.text && (
        <div
          style={{ backgroundColor: announcement.bg_color || "#1e2f4d", color: announcement.text_color || "#ffffff" }}
          className="w-full text-center py-1.5 px-4 text-xs font-medium"
        >
          {announcement.url ? <Link href={announcement.url} className="hover:underline">{announcement.text}</Link> : <span>{announcement.text}</span>}
        </div>
      )}

      <AntHeader
        ref={headerRef}
        style={{ backgroundColor: bgColor, height: "auto", lineHeight: "normal", padding: 0, margin: 0 }}
        className="w-full bg-white border-b border-slate-100 z-50 relative select-none"
      >
        <Container className="flex items-center justify-between h-14 sm:h-15">
          <Link href={headerData?.logo_url || "/"} className="flex items-center group shrink-0" onClick={() => setActiveMenuId(null)}>
            <div style={{ height: "52px" }} className="relative w-36 sm:w-44 md:w-48 flex items-center justify-start transition-transform group-hover:scale-105">
              <Image
                src={logoUrl}
                alt={logoAlt}
                fill
                priority
                loading="eager"
                fetchPriority="high"
                unoptimized
                sizes="(max-width: 768px) 180px, 240px"
                className="object-contain object-left cursor-pointer"
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-1 justify-end">
            <Menu
              mode="horizontal"
              selectedKeys={[]}
              disabledOverflow={true}
              className="flex items-center border-b-0 bg-transparent [&_.ant-menu-item::after]:border-b-0! [&_.ant-menu-submenu::after]:border-b-0! [&_.ant-menu-item-selected::after]:border-b-0! [&_.ant-menu-item-active::after]:border-b-0! [&_.ant-menu-item]:!border-b-0 [&_.ant-menu-submenu]:border-b-0! [&_.ant-menu-item::after]:content-none! [&_.ant-menu-submenu::after]:content-none! [&_.ant-menu-item-selected]:border-b-0! [&_.ant-menu-item-active]:border-b-0!"
              style={{ background: "transparent", borderBottom: "none", lineHeight: "normal" }}
              items={desktopMenuItems}
            />

            {rawFeaturedButtons.map((btn, idx) => (
              <Button
                key={btn._id || idx}
                onClick={() => router.push(btn.url || "/compare")}
                style={{ ...goldBtnStyle, fontSize: "12px", boxShadow: "none", height: "32px", padding: "0 16px", borderRadius: "6px" }}
                className="hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
              >
                {btn.text || "Compare Universities"}
              </Button>
            ))}
          </div>

          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <AiToolButton
              label={aiMenuItem?.label || "AI Tools"}
              badge={aiMenuItem?.badge || "NEW"}
              onClick={handleToolClick}
              className="whitespace-nowrap shrink-0"
            />

            {rawFeaturedButtons[0] && (
              <Button
                size="small"
                onClick={() => router.push(rawFeaturedButtons[0]?.url || "/compare")}
                style={{ ...goldBtnStyle, fontSize: "12px", boxShadow: "none", borderRadius: "6px", height: "28px", padding: "0 10px" }}
                className="whitespace-nowrap shrink-0 shadow-none"
              >
                {rawFeaturedButtons[0]?.text?.replace(/universities/i, "").trim() || "Compare"}
              </Button>
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

        {activeMegaMenu && (() => {
          const menuId = activeMegaMenu._id || 0;
          const groups = activeMegaMenu.mega_menu;
          const currentCatIdx = activeCategoryIndex[menuId] || 0;
          const currentGroup = groups[currentCatIdx] || groups[0];
          const isUni = Boolean(activeMegaMenu.label && activeMegaMenu.label.toLowerCase().includes("universit"));

          return (
            <div className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 w-[94vw] max-w-5xl xl:max-w-6xl bg-white border border-slate-200/90 rounded-2xl shadow-2xl z-50 p-0 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="flex flex-col">
                <div className="w-full grid grid-flow-col auto-cols-fr bg-slate-50 border-b border-slate-200 divide-x divide-slate-200 rounded-t-2xl overflow-hidden">
                  {groups.map((group, gIdx) => {
                    const isActive = currentCatIdx === gIdx;
                    return (
                      <button
                        key={group.category?._id || gIdx}
                        type="button"
                        onClick={() => setActiveCategoryIndex((prev) => ({ ...prev, [menuId]: gIdx }))}
                        className={`h-9 sm:h-9.5 md:h-10 flex items-center justify-center gap-1.5 px-2.5 sm:px-3 text-xs sm:text-[12.5px] font-bold transition-colors cursor-pointer select-none text-center ${isActive ? "bg-[#0B3B7E] text-white font-extrabold" : "text-[#072C50] bg-slate-50 hover:bg-slate-100/90 hover:text-blue-700"
                          }`}
                      >
                        <span className="truncate">{group.category?.name}</span>
                        {group.category?.code && (
                          <span className={`px-1.5 py-0.2 rounded text-[8.5px] font-black shrink-0 ${isActive ? "bg-white/20 text-white" : "bg-blue-100 text-blue-800"}`}>
                            {group.category.code}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="w-full p-3.5 sm:p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 max-h-97.5 overflow-y-auto pr-1.5 scrollbar-thin [scrollbar-color:#cbd5e1_transparent]">
                    {currentGroup?.items?.map((card, cIdx) => (
                      <MenuCard
                        key={card._id || cIdx}
                        card={card}
                        catSlug={currentGroup?.category?.slug || currentGroup?.category?._id}
                        isUni={isUni}
                        isMobile={false}
                        onNavigate={(url) => {
                          setActiveMenuId(null);
                          if (url) router.push(url);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        <Drawer
          open={mobileMenuOpen}
          onClose={() => {
            setMobileMenuOpen(false);
            setMobileActiveKeys([]);
          }}
          placement="top"
          styles={{
            wrapper: { height: "auto", maxHeight: "85vh" },
            section: { height: "auto", maxHeight: "85vh", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" },
            header: { padding: "12px 16px", backgroundColor: "#f8fafc", borderBottom: "1px solid #f1f5f9" },
            body: { padding: "8px 16px", height: "auto", maxHeight: "calc(85vh - 60px)", overflowY: "auto" },
          }}
          title={
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
          }
          closeIcon={<CloseOutlined className="text-base text-slate-700 font-bold" />}
        >
          <div className="space-y-1 pb-2">
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
                className="block py-3.5 px-2 border-b border-slate-100 font-extrabold text-[15px] text-[#072C50] hover:text-[#0B3B7E]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </Drawer>
      </AntHeader>
    </>
  );
}

export default Header;