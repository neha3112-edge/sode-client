"use client";

import React from "react";
import { SWRConfig } from "swr";

/**
 * Global SWR Fetcher
 * Automatically prepends /api/website/ if given a relative path or uses full URL.
 */
export const defaultFetcher = async (url) => {
  const targetUrl = url.startsWith("http") || url.startsWith("/api/")
    ? url
    : `/api/website/${url.replace(/^\/+/, "")}`;

  const res = await fetch(targetUrl);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.status = res.status;
    throw error;
  }
  const json = await res.json();
  return json?.result ?? json;
};

export default function SWRProvider({ children, value = {} }) {
  return (
    <SWRConfig
      value={{
        fetcher: defaultFetcher,
        revalidateOnFocus: false, // Don't refetch on window focus
        revalidateIfStale: true,
        dedupingInterval: 5000,   // Deduplicate requests within 5 seconds
        keepPreviousData: true,   // Keep showing previous data while loading next page/filter
        fallback: value.fallback || {},
      }}
    >
      {children}
    </SWRConfig>
  );
}
