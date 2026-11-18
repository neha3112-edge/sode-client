import React, { Suspense } from "react";
import LandingThankYouView from "@/components/landing/LandingThankYouView";
import { THANK_YOU_UNIVERSITIES } from "@/components/landing/thankYouConfig";

const SLUG = "manipal";
const uni = THANK_YOU_UNIVERSITIES[SLUG];

export const metadata = {
  title: `Thank You | ${uni?.shortName || uni?.name || "Application Submitted"}`,
  description: uni?.headline || "Thank you for your interest. Our academic counselor will connect with you shortly.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-medium">
          Loading...
        </div>
      }
    >
      <LandingThankYouView universitySlug={SLUG} />
    </Suspense>
  );
}
