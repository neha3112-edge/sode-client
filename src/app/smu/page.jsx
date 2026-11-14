import React from "react";
import SmuLandingView from "@/components/landing/universities/smu/SmuLandingView";

export const metadata = {
  title: "Sikkim Manipal University Online Courses, Fees | BA BCOM MA MBA MCOM MCA",
  description:
    "Sikkim Manipal University Online Courses, Fees, Syllabus, Eligibility, and Admissions 2026. Explore UGC-DEB approved BA, B.Com, MA, MBA, M.Com, and MCA degree programs.",
  keywords: [
    "Sikkim Manipal University Online",
    "SMU Online",
    "SMU Online MBA",
    "SMU Online MCA",
    "SMU Distance Education",
    "Sikkim Manipal University Admission 2026",
    "SMU Online Courses Fees",
  ],
  alternates: {
    canonical: "https://distanceeducationschool.com/smu/",
  },
  openGraph: {
    title: "Sikkim Manipal University Online Courses, Fees | BA BCOM MA MBA MCOM MCA",
    description:
      "Sikkim Manipal University Online Courses, Fees, Syllabus, Eligibility, and Admissions 2026. Explore UGC-DEB approved BA, B.Com, MA, MBA, M.Com, and MCA degree programs.",
    url: "https://distanceeducationschool.com/smu/",
    siteName: "Distance Education School",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sikkim Manipal University Online Courses, Fees | BA BCOM MA MBA MCOM MCA",
    description:
      "Sikkim Manipal University Online Courses, Fees, Syllabus, Eligibility, and Admissions 2026. Explore UGC-DEB approved BA, B.Com, MA, MBA, M.Com, and MCA degree programs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SmuPage() {
  return <SmuLandingView />;
}

