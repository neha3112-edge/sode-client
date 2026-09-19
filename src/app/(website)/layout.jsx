import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import MobileBottomNav from "@/components/website/MobileBottomNav";
import GlobalBreadcrumb from "@/components/common/GlobalBreadcrumb";
import { request } from "@/services/request";

export const revalidate = 300;

export default async function WebsiteLayout({ children }) {
  const [headerRes, footerRes, legalPoliciesRes] = await Promise.all([
    request.dynamicRead({
      entity: "header",
      endPoint: "public/by-slug",
      slug: "global",
      revalidate: 300,
    }).catch(() => null),
    request.dynamicList({
      entity: "footer",
      endPoint: "v1/list",
      revalidate: 300,
    }).catch(() => null),
    request.dynamicList({
      entity: "legal-policy",
      endPoint: "v1/list",
      revalidate: 300,
    }).catch(() => null),
  ]);

  const headerData = headerRes?.result || headerRes;
  const footerData = footerRes?.result || footerRes;
  const legalPolicies = legalPoliciesRes?.result || [];

  return (
    <div className="flex flex-col min-h-screen">
      <Header initialHeaderData={headerData} />
      <GlobalBreadcrumb />
      <main className="grow pb-16 lg:pb-0">{children}</main>
      <Footer
        initialHeaderData={headerData}
        initialFooterData={footerData}
        initialLegalPolicies={legalPolicies}
      />
      <MobileBottomNav />
    </div>
  );
}
