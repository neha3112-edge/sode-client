import React from "react";
import { ContactView } from "@/components/website/contact/ContactView";
import { request } from "@/services/request";

export const revalidate = 300;

export default async function ContactUsPage() {
  let tenantData = null;
  let coursesData = [];
  let statesData = [];

  try {
    const [tenantRes, coursesRes, statesRes] = await Promise.all([
      request.dynamicRead({
        entity: "tenants",
        endPoint: "public/current",
        revalidate: 300,
      }),
      request.dynamicOptions({
        entity: "courses",
        endPoint: "v1/options",
        revalidate: 300,
      }),
      request.dynamicOptions({
        entity: "state",
        endPoint: "v1/options",
        revalidate: 300,
      }),
    ]);

    tenantData = tenantRes?.result ?? tenantRes ?? null;
    coursesData = coursesRes?.result ?? (Array.isArray(coursesRes) ? coursesRes : []);
    statesData = statesRes?.result ?? (Array.isArray(statesRes) ? statesRes : []);
  } catch (e) {
    console.error("Error fetching data for contact us page:", e);
  }

  return (
    <ContactView
      initialTenantData={tenantData}
      initialCourses={coursesData}
      initialStates={statesData}
    />
  );
}
