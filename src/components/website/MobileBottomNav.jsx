"use client";

import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FormModalContext } from "@/context";

export function MobileBottomNav() {
  const pathname = usePathname() || "";
  const formModalCtx = useContext(FormModalContext);
  const openFormModal = formModalCtx?.openFormModal ?? (() => { });

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      active: pathname === "/",
    },
    {
      label: "Courses",
      href: "/courses",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      active: pathname.startsWith("/courses"),
    },
    {
      label: "Universities",
      href: "/universities",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
        </svg>
      ),
      active: pathname.startsWith("/universities") && !pathname.includes("compare"),
    },
    {
      label: "Compare",
      href: "/universities/compare",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-6-6 6 6 6-6M6 9l6-6 6 6" />
        </svg>
      ),
      active: pathname.includes("compare"),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-999 bg-[#102441] border-t border-white/10 flex items-center justify-around py-2.5 px-2 text-white shadow-2xl lg:hidden">
      {navItems.map((item, idx) => (
        <Link
          key={idx}
          href={item.href}
          className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer focus:outline-none transition-colors duration-150 ${item.active ? "text-[#EEC471]" : "text-white hover:text-[#EEC471]"
            }`}
        >
          {item.icon}
          <span className="text-[9px] font-bold tracking-wide">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default MobileBottomNav;
