import React from "react";
import { AboutView } from "@/components/website/about/AboutView";
import { request } from "@/services/request";

export const revalidate = 300;

export default async function AboutUsPage() {
  let aboutData = null;

  try {
    const aboutRes = await request.dynamicRead({
      entity: "about-us",
      endPoint: "public",
      revalidate: 300,
    });

    aboutData = aboutRes?.result ?? aboutRes ?? null;
  } catch (e) {
    console.error("Error fetching data for about us page:", e);
  }

  return <AboutView initialAboutData={aboutData} />;
}
