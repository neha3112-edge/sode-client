import React from "react";
import MuLandingView from "@/components/landing/universities/mu/MuLandingView";

export const metadata = {
  title: "Mangalayatan University Online Courses, Fees, Admission 2026",
  description:
    "Mangalayatan University Online Degree Courses: MBA, MCA, M.Com, M.Sc, M.A, BBA, BCA, BA. Find Admission Fees, Eligibility, Syllabus, and UGC-DEB, NAAC A+ Approved Degrees.",
  keywords: [
    "Mangalayatan University Online",
    "MU Online",
    "Mangalayatan Online MBA",
    "Mangalayatan Online MCA",
    "Mangalayatan University Admission 2026",
    "MU Distance Education",
    "Mangalayatan University Online Courses",
  ],
  alternates: {
    canonical: "https://distanceeducationschool.com/mu/",
  },
  openGraph: {
    title: "Mangalayatan University Online Courses, Fees, Admission 2026",
    description:
      "Mangalayatan University Online Degree Courses: MBA, MCA, M.Com, M.Sc, M.A, BBA, BCA, BA. Find Admission Fees, Eligibility, Syllabus, and UGC-DEB, NAAC A+ Approved Degrees.",
    url: "https://distanceeducationschool.com/mu/",
    siteName: "Distance Education School",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mangalayatan University Online Courses, Fees, Admission 2026",
    description:
      "Mangalayatan University Online Degree Courses: MBA, MCA, M.Com, M.Sc, M.A, BBA, BCA, BA. Find Admission Fees, Eligibility, Syllabus, and UGC-DEB, NAAC A+ Approved Degrees.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MuPage() {
  return <MuLandingView />;
}

