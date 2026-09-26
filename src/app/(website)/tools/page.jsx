import React from "react";
import { ToolsView } from "@/components/website";
import { request } from "@/services/request";

export const revalidate = 300;

export default async function ToolsPage() {
  let toolsData = [];

  try {
    const res = await request.dynamicList({
      entity: "category",
      endPoint: "v1/list",
      revalidate: 300,
    });

    const categories = Array.isArray(res?.result)
      ? res.result
      : Array.isArray(res?.categories)
      ? res.categories
      : Array.isArray(res)
      ? res
      : [];

    const toolsParent = categories.find(
      (c) =>
        c.featuredType === "TOOLS" ||
        c.featuredType === "FEATURED_TOOLS" ||
        (c.name && c.name.toLowerCase().includes("tool")) ||
        (c.title && c.title.toLowerCase().includes("tool"))
    );

    if (toolsParent && Array.isArray(toolsParent.children) && toolsParent.children.length > 0) {
      toolsData = toolsParent.children;
    }
  } catch (err) {
    console.error("[ToolsPage] Error fetching tools category:", err?.message || err);
  }

  return <ToolsView initialTools={toolsData} />;
}
