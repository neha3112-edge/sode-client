"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Drawer } from "antd";
import { getAssetPath } from "@/lib/utils";
import { getWebsiteHeaders } from "@/services/api";

export function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [headerTree, setHeaderTree] = useState([]);
  const [siteLogo, setSiteLogo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);

  // Fetch dynamic parent-children header tree & site logo strictly from backend Mongoose DB
  useEffect(() => {
    getWebsiteHeaders()
      .then((data) => {
        if (data) {
          if (Array.isArray(data.tree)) {
            setHeaderTree(data.tree);
          } else if (Array.isArray(data)) {
            setHeaderTree(data);
          }
          if (data.siteLogo) {
            setSiteLogo(data.siteLogo);
          }
        }
      })
      .catch((err) => console.error("Error fetching website headers:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const toggleMobileSubmenu = (id) => {
    setOpenMobileSubmenu((prev) => (prev === id ? null : id));
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-row-reverse lg:flex-row items-center justify-between h-20">

        {/* 1. LOGO FROM BACKEND MONGOOSE HEADER MODEL */}
        <Link href="/" className="flex items-center">
          <div className="relative h-14 w-28 md:h-16 md:w-32 flex items-center">
            <Image
              src={getAssetPath(siteLogo || "/assets/images/new_sode_tm_logo.png")}
              alt="SODE Logo"
              fill
              sizes="150px"
              priority
              className="object-contain object-right lg:object-left cursor-pointer"
            />
          </div>
        </Link>

        {/* 2. DESKTOP NAVIGATION (100% Dynamic Backend Mongoose Data) */}
        <nav className="hidden lg:flex items-center text-sm text-gray-900 font-semibold tracking-wide gap-1">
          {headerTree.map((item, index) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            const isExecutive = item.label === "Executive Programs" || item.isPremium || item.premium;

            return (
              <div key={item._id || item.slug} className="relative group flex items-center">
                
                {/* Single Link or Dropdown Parent */}
                {isExecutive ? (
                  <Link
                    href={item.href || "#"}
                    className="mr-3 px-4 py-2 bg-gradient-to-r from-[#EEC471] via-[#F3CD73] to-[#FADA9A] text-[#102441] rounded-lg flex items-center gap-2 transition-all duration-200 shadow-xs font-extrabold hover:shadow-md"
                  >
                    <Image
                      src={getAssetPath("/assets/images/premium-icon.png")}
                      alt="Premium Icon"
                      width={16}
                      height={16}
                      priority
                      className="object-contain cursor-pointer"
                    />
                    <span>{item.label}</span>
                    {hasChildren && <ChevronDown className="w-3.5 h-3.5 text-[#102441] transition-transform group-hover:rotate-180" />}
                  </Link>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="px-3.5 py-2 hover:text-[#A66E38] transition-colors flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md uppercase">
                        {item.badge}
                      </span>
                    )}
                    {hasChildren && <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform group-hover:rotate-180" />}
                  </Link>
                )}

                {/* 🔽 NESTED CHILDREN DROPDOWN MENU */}
                {hasChildren && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-left scale-95 group-hover:scale-100">
                    <div className="flex flex-col space-y-1">
                      {item.children.map((child) => {
                        const showChildLogo = child.showLogo !== false && child.logoSrc;

                        return (
                          <Link
                            key={child._id || child.slug}
                            href={child.href || "#"}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors group/child"
                          >
                            {/* Logo Thumbnail (With Logo Mode) */}
                            {showChildLogo && (
                              <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                                <img
                                  src={getAssetPath(child.logoSrc)}
                                  alt={child.label}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                  }}
                                />
                              </div>
                            )}

                            {/* Label & Href details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-bold text-xs text-slate-800 group-hover/child:text-[#A66E38] transition-colors truncate">
                                  {child.label}
                                </span>
                                {child.badge && (
                                  <span className="bg-emerald-50 text-emerald-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase shrink-0">
                                    {child.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {index !== headerTree.length - 1 && (
                  <span className="text-gray-200 font-normal">|</span>
                )}
              </div>
            );
          })}
        </nav>

        {/* 3. MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label="Open navigation menu"
          className="lg:hidden p-2 text-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all cursor-pointer"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* 📱 MOBILE NAVIGATION DRAWER WITH ACCORDION SUBMENUS */}
      <Drawer
        title={
          <div className="flex items-center justify-between w-full">
            <div className="relative h-10 w-24">
              <Image
                src={getAssetPath("/assets/images/new_sode_tm_logo.png")}
                alt="SODE Logo"
                fill
                sizes="100px"
                className="object-contain object-left"
              />
            </div>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 text-gray-500 hover:text-gray-900 transition-colors rounded-md cursor-pointer flex items-center justify-center"
            >
              <X size={20} />
            </button>
          </div>
        }
        closeIcon={null}
        placement="left"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        className="lg:hidden"
        styles={{ body: { padding: 0 } }}
        style={{ width: 300 }}
      >
        <div className="flex flex-col divide-y divide-gray-100 font-semibold text-gray-800">
          {headerTree.map((item) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            const isOpen = openMobileSubmenu === (item._id || item.slug);

            return (
              <div key={item._id || item.slug} className="flex flex-col">
                <div className="flex items-center justify-between px-5 py-3 hover:bg-slate-50">
                  <Link
                    href={item.href || "#"}
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex-1 font-bold text-sm text-slate-800 hover:text-[#A66E38]"
                  >
                    {item.label}
                  </Link>

                  {hasChildren && (
                    <button
                      type="button"
                      onClick={() => toggleMobileSubmenu(item._id || item.slug)}
                      className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>

                {/* Submenu Accordion */}
                {hasChildren && isOpen && (
                  <div className="bg-slate-50 border-t border-slate-100 py-1 pl-4 pr-2 space-y-1">
                    {item.children.map((child) => {
                      const showChildLogo = child.showLogo !== false && child.logoSrc;

                      return (
                        <Link
                          key={child._id || child.slug}
                          href={child.href || "#"}
                          onClick={() => setIsDrawerOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#A66E38] hover:bg-white transition-colors"
                        >
                          {showChildLogo && (
                            <img
                              src={getAssetPath(child.logoSrc)}
                              alt={child.label}
                              className="w-4 h-4 object-contain rounded-xs shrink-0"
                            />
                          )}
                          <span>{child.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Drawer>
    </header>
  );
}