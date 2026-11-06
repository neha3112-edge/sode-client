import React from "react";
import LpuLandingView from "@/components/landing/universities/lpu/LpuLandingView";

export const metadata = {
  title: "LPU University Online & Distance Education Courses, Fees | MBA MCA MA BCA BBA BA",
  description:
    "LPU University Online and Distance Education Courses, Fees | MBA MCA MA MCOM BCA BBA BA | UGC Approved LPU Online Degree Syllabus, Eligibility, & Admissions 2026",
  keywords: [
    "LPU Online",
    "Lovely Professional University Online",
    "LPU Online MBA",
    "LPU Online MCA",
    "LPU Distance Education",
    "LPU Online Admission 2026",
    "LPU Online Courses Fees",
  ],
  alternates: {
    canonical: "https://distanceeducationschool.com/lpu/",
  },
  openGraph: {
    title: "LPU University Online & Distance Education Courses, Fees | MBA MCA MA BCA BBA BA",
    description:
      "LPU University Online and Distance Education Courses, Fees | MBA MCA MA MCOM BCA BBA BA | UGC Approved LPU Online Degree Syllabus, Eligibility, & Admissions 2026",
    url: "https://distanceeducationschool.com/lpu/",
    siteName: "Distance Education School",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LPU University Online & Distance Education Courses, Fees | MBA MCA MA BCA BBA BA",
    description:
      "LPU University Online and Distance Education Courses, Fees | MBA MCA MA MCOM BCA BBA BA | UGC Approved LPU Online Degree Syllabus, Eligibility, & Admissions 2026",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LpuPage() {
  return <LpuLandingView />;
}

