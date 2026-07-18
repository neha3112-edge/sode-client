"use client";

import React from "react";
import { usePathname } from "next/navigation";
import componentMap from "./ComponentMap";

export default function AppRouter() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  let routeKey = "dashboard";

  if (pathParts[0] === "admin-dashboard" && pathParts.length > 1) {
    routeKey = pathParts[1];
  }

  let resolvedComponent = componentMap[routeKey] || componentMap.dashboard;

  // 🛡️ Turbopack Dynamic Module Unwrapper Loop
  while (
    resolvedComponent &&
    typeof resolvedComponent === "object" &&
    resolvedComponent.default
  ) {
    resolvedComponent = resolvedComponent.default;
  }

  if (!resolvedComponent) {
    return (
      <div className="rounded border border-red-200 bg-red-50 p-4 font-bold text-red-500">
        Component configuration error for: &quot;{routeKey}&quot;
      </div>
    );
  }

  return React.createElement(resolvedComponent);
}
