import React, { Suspense } from "react";
import { request } from "@/services/request";
import UniversitiesPageClientView from "@/components/website/UniversitiesPageClientView";

export const revalidate = 900;

export const metadata = {
  title: "Top Accredited Universities in India | SODE",
  description:
    "Explore and compare UGC-DEB approved online & distance learning universities in India. Find degrees, fee structures, NAAC ratings, and placement reports.",
  alternates: {
    canonical: "https://mysode.com/universities",
  },
  openGraph: {
    title: "Top Accredited Universities in India | SODE",
    description:
      "Explore and compare UGC-DEB approved online & distance learning universities in India.",
    url: "https://mysode.com/universities",
    siteName: "SODE",
    type: "website",
  },
};

export default async function UniversitiesPage() {
  let initialUniversities = [];

  try {
    const res = await request.dynamicList({
      entity: "universities",
      endPoint: "v1/list",
      options: { items: 100 },
      revalidate: 900,
    });
    initialUniversities = Array.isArray(res?.result)
      ? res.result
      : Array.isArray(res)
      ? res
      : [];
  } catch (err) {
    console.error("[Universities Page] Server fetch error:", err.message);
  }

  return (
    <Suspense fallback={null}>
      <UniversitiesPageClientView initialUniversities={initialUniversities} />
    </Suspense>
  );
}
