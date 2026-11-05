import React from "react";
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

export default async function UniversitiesPage({ searchParams }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  let initialUniversities = [];
  let initialOptions = null;

  const queryOptions = {
    items: 100,
    category: resolvedSearchParams.category || resolvedSearchParams.type || resolvedSearchParams.top || undefined,
    course: resolvedSearchParams.course || undefined,
    state: resolvedSearchParams.state || undefined,
    search: resolvedSearchParams.search || resolvedSearchParams.q || undefined,
  };

  try {
    const [uniRes, optionsRes] = await Promise.allSettled([
      request.dynamicList({
        entity: "universities",
        endPoint: "v1/list",
        options: queryOptions,
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
      if (uniRes.value?.filters || uniRes.value?.filterOptions) {
        initialOptions = uniRes.value.filters || uniRes.value.filterOptions;
      }
    }

    if (!initialOptions && optionsRes.status === "fulfilled" && optionsRes.value) {
      initialOptions = optionsRes.value?.result || optionsRes.value?.filters || null;
    }
  } catch (err) {
    console.error("[Universities Page] Server fetch error:", err.message);
  }

  return (
    <div className="w-full">
      <UniversitiesPageClientView
        initialUniversities={initialUniversities}
        initialOptions={initialOptions}
      />
    </div>
  );
}
