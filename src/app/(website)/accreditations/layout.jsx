import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/accreditations");
  return constructMetadata(pageMeta, {
    title: "Accreditations & Approvals - UGC, DEB, AICTE, NAAC & Global Equivalences",
    description:
      "Verify top higher education statutory approvals, institutional accreditations (UGC, AICTE, NAAC A++, DEB, NIRF, AIU, WES) and quality benchmarks for valid online degrees.",
    canonicalUrl: "https://distanceeducationschool.com/accreditations",
  });
}

export default function AccreditationsLayout({ children }) {
  return children;
}
