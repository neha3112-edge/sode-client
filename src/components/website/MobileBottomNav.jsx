"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useFormModal } from "@/hooks/useFormModal";

export function MobileBottomNav() {
  const pathname = usePathname() || "";
  const { openFormModal } = useFormModal();

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      active: pathname === "/" || pathname === "",
    },
    {
      label: "Courses",
      href: "/courses",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      active: pathname.startsWith("/courses") || pathname.startsWith("/course"),
    },
    {
      label: "Universities",
      href: "/universities",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
        </svg>
      ),
      active: (pathname.startsWith("/universities") || pathname.startsWith("/university")) && !pathname.includes("compare"),
    },
    {
      label: "Tools",
      href: "/tools",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.07a4.5 4.5 0 0 0 4.486-6.32l-3.27 3.27-2.5-2.5 3.27-3.27a4.5 4.5 0 0 0-6.32 4.486c.118.58.094 1.193-.07 1.743" />
        </svg>
      ),
      active: pathname.startsWith("/tools"),
    },
    {
      label: "Call",
      href: "tel:07065777755",
      isExternal: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
      ),
      active: false,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-999 bg-[#102441] border-t border-white/10 flex items-center justify-around py-2.5 px-2 text-white shadow-2xl lg:hidden">
      {navItems.map((item, idx) => {
        if (item.isExternal) {
          return (
            <a
              key={idx}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer focus:outline-none transition-colors duration-150 ${item.active ? "text-[#EEC471]" : "text-white/80 hover:text-[#EEC471]"
                }`}
            >
              {item.icon}
              <span className={`text-[9px] tracking-wide ${item.active ? "font-bold text-[#EEC471]" : "font-medium"}`}>
                {item.label}
              </span>
            </a>
          );
        }

        return (
          <Link
            key={idx}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer focus:outline-none transition-colors duration-150 ${item.active ? "text-[#EEC471]" : "text-white/80 hover:text-[#EEC471]"
              }`}
          >
            {item.icon}
            <span className={`text-[9px] tracking-wide ${item.active ? "font-bold text-[#EEC471]" : "font-medium"}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default MobileBottomNav;
