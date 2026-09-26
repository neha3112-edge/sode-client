import React from "react";
import { AccreditationsView } from "@/components/website";
import { request } from "@/services/request";

export const revalidate = 600;

export default async function AccreditationsPage() {
  let accreditationsData = [];

  try {
    const res = await request.dynamicRead({
      entity: "approval",
      endPoint: "public",
      revalidate: 600,
    });

    accreditationsData = res?.result ?? res ?? [];
  } catch (err) {
    console.error("[AccreditationsPage] Error fetching active accreditations:", err?.message || err);
  }

  return <AccreditationsView initialAccreditations={accreditationsData} />;
}
