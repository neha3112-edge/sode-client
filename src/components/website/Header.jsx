"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import * as LucideIcons from "lucide-react"; // ✅ सभी Lucide आइकॉन्स को एक साथ इंपोर्ट करें
import { useGetDynamicListQuery } from "@/store/redux/dynamic/action";
import { cn } from "@/lib/utils";

// 🌍 यूनिवर्सल डायनेमिक आइकन कंपोनेंट
function DynamicIcon({ iconConfig, className }) {
  if (!iconConfig || !iconConfig.name) return null;

  const { name, library } = iconConfig;

  // 1. अगर लाइब्रेरी Lucide है
  if (library === "lucide" || !library) {
    const IconComponent = LucideIcons[name];
    if (IconComponent) {
      return <IconComponent className={cn("w-4 h-4", className)} />;
    }
  }

  // 2. भविष्य में अगर आप react-icons/fa डालना चाहें तो यहाँ केस जोड़ सकते हैं:
  // if (library === "fa") { ... }

  return null;
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);

  // RTK Query से सीधे डायनेमिक नेस्टेड ट्री डेटा फ़ेच करना
  const { data: headerData, isLoading } = useGetDynamicListQuery({
    entity: "header",
    endPoint: "tree",
    options: { items: 500 },
  });

  const navItems = headerData?.items || [];

  const toggleMobileSubmenu = (id) => {
    setActiveMobileSubmenu(activeMobileSubmenu === id ? null : id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-20">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-90"
        >
          <Image
            src="/assets/images/new_sode_tm_logo.png"
            alt="Company Logo"
            width={80}
            height={80}
            priority
            className="object-contain cursor-pointer"
          />
        </Link>

        {/* ✅ Desktop Navigation */}
        <nav className="hidden lg:flex items-center text-sm font-medium gap-1 text-gray-500">
          {isLoading ? (
            // Shadcn Shimmer Skeleton Effect
            <div className="flex items-center gap-5 animate-pulse">
              <div className="w-36 h-9 bg-gray-200 rounded-md mr-1"></div>
              <span className="text-gray-200">|</span>
              <div className="w-20 h-4 bg-gray-200 rounded-sm"></div>
              <span className="text-gray-200">|</span>
              <div className="w-20 h-4 bg-gray-200 rounded-sm"></div>
              <span className="text-gray-200">|</span>
              <div className="w-24 h-4 bg-gray-200 rounded-sm"></div>
            </div>
          ) : (
            navItems.map((item, index) => {
              const hasChildren = item.children && item.children.length > 0;
              const isPremium = item.premium === true;

              return (
                <div
                  key={item._id}
                  className="flex items-center relative group py-6"
                >
                  {/* पैरेंट लिंक/बटन ट्रिगर */}
                  {isPremium ? (
                    <Link
                      href={item.href}
                      className="mr-3 px-3 py-2 bg-linear-to-r from-[#EEC471] via-[#F3CD73] to-[#FADA9A] text-[#102441] rounded-md flex items-center gap-2 transition-all duration-300 hover:brightness-105 shadow-xs font-semibold"
                    >
                      {/* 🛠️ डायनेमिक आइकन रेंडरर (प्रीमियम बटन इमेज के स्थान पर) */}
                      {item.icon && item.icon.name ? (
                        <DynamicIcon
                          iconConfig={item.icon}
                          className="text-[#102441]"
                        />
                      ) : (
                        <Image
                          src="/assets/images/premium-icon.png"
                          alt="Premium"
                          width={16}
                          height={16}
                          priority
                          className="object-contain"
                        />
                      )}
                      <span>{item.label}</span>
                      {hasChildren && (
                        <ChevronDown
                          size={14}
                          className="ml-0.5 transition-transform duration-200 group-hover:rotate-180"
                        />
                      )}
                    </Link>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-3 py-1.5 rounded-md text-gray-700 hover:text-black hover:bg-gray-100/60 flex items-center gap-1 transition-all duration-200"
                    >
                      {/* सामान्य आइटम्स के लिए डायनेमिक आइकन */}
                      <DynamicIcon
                        iconConfig={item.icon}
                        className="text-gray-400"
                      />
                      <span>{item.label}</span>
                      {hasChildren && (
                        <ChevronDown
                          size={14}
                          className="text-gray-400 transition-transform duration-200 group-hover:rotate-180"
                        />
                      )}
                    </Link>
                  )}

                  {/* 🚨 DROPDOWN PANEL EFFECT */}
                  {hasChildren && (
                    <div className="absolute top-[85%] left-0 mt-1 w-60 bg-white text-gray-900 border border-gray-100 shadow-md rounded-lg opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 py-2">
                      <div className="px-1 space-y-0.5">
                        {item.children.map((child) => (
                          <Link
                            key={child._id}
                            href={child.href}
                            target={child.openInNewTab ? "_blank" : "_self"}
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md font-normal text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                          >
                            <DynamicIcon
                              iconConfig={child.icon}
                              className="text-gray-400 w-3.5 h-3.5"
                            />
                            <span>{child.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Separator Line */}
                  {index !== navItems.length - 1 && (
                    <span className="text-gray-200 font-light select-none mx-1">
                      |
                    </span>
                  )}
                </div>
              );
            })
          )}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-50 text-gray-900 transition-colors flex items-center justify-center cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          disabled={isLoading}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ✅ Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white border-b border-gray-200",
          isMenuOpen ? "max-h-[85vh] overflow-y-auto border-t" : "max-h-0",
        )}
      >
        <div className="flex flex-col px-6 py-4 space-y-1 text-sm font-medium text-gray-900">
          {isLoading ? (
            <div className="space-y-4 w-full animate-pulse py-2">
              <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
            </div>
          ) : (
            navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isSubmenuOpen = activeMobileSubmenu === item._id;

              return (
                <div
                  key={item._id}
                  className="flex flex-col w-full border-b border-gray-100/60 last:border-0 py-1.5"
                >
                  <div className="flex items-center justify-between w-full">
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 hover:text-black transition-colors flex-grow py-1"
                    >
                      <DynamicIcon
                        iconConfig={item.icon}
                        className="text-gray-500"
                      />
                      <span>{item.label}</span>
                    </Link>
                    {hasChildren && (
                      <button
                        onClick={() => toggleMobileSubmenu(item._id)}
                        className="p-2 text-gray-400 hover:text-black rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform duration-300",
                            isSubmenuOpen && "rotate-180",
                          )}
                        />
                      </button>
                    )}
                  </div>

                  {/* MOBILE SUBMENU SLIDE ACTION */}
                  {hasChildren && (
                    <div
                      className={cn(
                        "flex flex-col pl-4 space-y-1 mt-1 transition-all duration-300 ease-in-out overflow-hidden border-l border-gray-100 ml-1.5",
                        isSubmenuOpen
                          ? "max-h-96 opacity-100 py-1"
                          : "max-h-0 opacity-0",
                      )}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child._id}
                          href={child.href}
                          target={child.openInNewTab ? "_blank" : "_self"}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-2 text-gray-500 hover:text-black py-1.5 font-normal text-xs transition-colors"
                        >
                          <DynamicIcon
                            iconConfig={child.icon}
                            className="text-gray-400 w-3.5 h-3.5"
                          />
                          <span>{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </header>
  );
}
