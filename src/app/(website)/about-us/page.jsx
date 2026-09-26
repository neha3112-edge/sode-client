import React from "react";
import { AboutView } from "@/components/website/about/AboutView";
import { request } from "@/services/request";

export const revalidate = 300;

export default async function AboutUsPage() {
  let aboutData = null;
  let reviewsData = [];

  try {
    const [aboutRes, reviewsRes] = await Promise.all([
      request.dynamicRead({
        entity: "about-us",
        endPoint: "public",
        revalidate: 300,
      }),
      request.dynamicList({
        entity: "student-review",
        endPoint: "v1/list",
        options: { page: 1, items: 8 },
        revalidate: 300,
      }),
    ]);

    aboutData = aboutRes?.result ?? aboutRes ?? null;
    reviewsData =
      reviewsRes?.result?.items ??
      reviewsRes?.result ??
      (Array.isArray(reviewsRes) ? reviewsRes : []);
  } catch (e) {
    console.error("Error fetching data for about us page:", e);
  }

  return (
    <AboutView
      initialAboutData={aboutData}
      initialReviews={reviewsData}
    />
  );
}
