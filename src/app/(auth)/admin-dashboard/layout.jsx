"use client";

import { useEffect, useState } from "react";

export default function AdminDashboardLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Client-side local storage validation tracking
    const auth = window.localStorage.getItem("auth");
    const isLogout = window.localStorage.getItem("isLogout");

    if (!auth || isLogout === "true") {
      // Dummy check fail hone par safe backup fallback redirect route
      window.location.href = "/login";
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
        <p className="text-zinc-500 font-medium">Checking authorizations...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-100 font-sans text-black">
      {/* Dynamic Navigation Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 hidden md:flex">
        <h2 className="text-xl font-black tracking-wider text-[#FADA9A] mb-8">
          SODE CRM
        </h2>
        <nav className="flex-1 space-y-3 text-sm">
          <a
            href="/admin-dashboard"
            className="block px-4 py-2.5 bg-slate-800 rounded-md font-semibold text-white"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block px-4 py-2.5 hover:bg-slate-800 rounded-md text-zinc-400 hover:text-white transition"
          >
            Leads
          </a>
          <a
            href="#"
            className="block px-4 py-2.5 hover:bg-slate-800 rounded-md text-zinc-400 hover:text-white transition"
          >
            Courses
          </a>
        </nav>
      </aside>

      {/* Main Panel Area */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-6">
          <h1 className="text-lg font-bold text-zinc-800">Admin Area</h1>
          <button
            onClick={() => {
              window.localStorage.removeItem("auth");
              window.localStorage.setItem("isLogout", "true");
              window.location.href = "/login";
            }}
            className="text-xs font-bold text-red-600 hover:text-red-800 cursor-pointer border-none bg-transparent"
          >
            Logout
          </button>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
