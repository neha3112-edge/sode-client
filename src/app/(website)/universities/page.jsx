import React, { Suspense } from "react";
import { request } from "@/services/request";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import { UniversitiesPageClientView } from "@/components/website";

export const revalidate = 900;

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/universities");
  return constructMetadata(pageMeta, {
    canonicalUrl: "https://sode.co.in/universities",
  });
}

export default async function UniversitiesPage() {
  let initialUniversities = [];
  let initialOptions = null;

  try {
    const [uniRes, optionsRes] = await Promise.allSettled([
      request.dynamicList({
        entity: "universities",
        endPoint: "v1/list",
        options: { items: 100 },
        revalidate: 900,
      }),
      request.dynamicList({
        entity: "universities",
        endPoint: "v1/list/options",
        revalidate: 900,
      }),
    ]);

    if (uniRes.status === "fulfilled" && uniRes.value) {
      initialUniversities = Array.isArray(uniRes.value?.result)
        ? uniRes.value.result
        : Array.isArray(uniRes.value)
        ? uniRes.value
        : [];
    }

    if (optionsRes.status === "fulfilled" && optionsRes.value) {
      initialOptions = optionsRes.value?.result || null;
    }
  } catch (err) {
    console.error("[Universities Page] Server fetch error:", err.message);
  }

  return (
    <Suspense fallback={null}>
      <UniversitiesPageClientView
        initialUniversities={initialUniversities}
        initialOptions={initialOptions}
      />
    </Suspense>
  );
}
