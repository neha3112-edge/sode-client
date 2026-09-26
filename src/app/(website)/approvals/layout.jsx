import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/approvals");
  return constructMetadata(pageMeta, {
    title: "University Approvals & Accreditations - Distance Education School",
    description:
      "Verify top higher education statutory approvals, institutional accreditations and quality benchmarks for valid online degrees.",
    canonicalUrl: "https://distanceeducationschool.com/approvals",
  });
}

export default function ApprovalsLayout({ children }) {
  return children;
}
