import React from "react";
import AmityLandingView from "@/components/landing/universities/amity/AmityLandingView";

export const metadata = {
  title: "Amity University Online Degree Course Fees & Admission 2026",
  description:
    "Amity University Online Degree Course Fees & Admission Open Jan 2026. MBA, MCA, MA, BCA, BBA, BA, B.Com, M.Com. Find UGC Approved Program Syllabus, Eligibility and EMI details.",
  keywords: [
    "Amity University Online",
    "Amity Online MBA",
    "Amity Online MCA",
    "Amity Distance Education",
    "Amity Online Fees",
    "Amity Admission 2026",
  ],
  alternates: {
    canonical: "https://distanceeducationschool.com/amity/",
  },
  openGraph: {
    title: "Amity University Online Degree Course Fees & Admission 2026",
    description:
      "Amity University Online Degree Course Fees & Admission Open Jan 2026. MBA, MCA, MA, BCA, BBA, BA, B.Com, M.Com.",
    url: "https://distanceeducationschool.com/amity/",
    siteName: "Distance Education School",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amity University Online Degree Course Fees & Admission 2026",
    description:
      "Amity University Online Degree Course Fees & Admission Open Jan 2026. MBA, MCA, MA, BCA, BBA, BA, B.Com, M.Com.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AmityPage() {
  return <AmityLandingView />;
}
