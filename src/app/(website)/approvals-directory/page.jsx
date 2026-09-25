import React from "react";
import { ApprovalUniversityDirectory } from "@/components/website";

export const metadata = {
  title: "UGC-DEB Approved Online Universities List - January Session 2026",
  description:
    "Comprehensive list of UGC-DEB approved online universities with courses, HEI types, location and comparison.",
};

export default function ApprovalsDirectoryPage() {
  return (
    <div className="min-h-screen pt-2 sm:pt-3 pb-8 sm:pb-10">
      <ApprovalUniversityDirectory />
    </div>
  );
}
