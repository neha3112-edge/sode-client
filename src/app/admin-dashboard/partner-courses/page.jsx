"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPartnerCoursesPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin-dashboard/courses");
  }, [router]);

  return null;
}
