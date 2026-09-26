import { cache } from "react";
import { notFound } from "next/navigation";
import { request } from "@/services/request";
import LegalPolicyView from "@/components/website/legal/LegalPolicyView";
import { SITE_NAME, SITE_URL } from "@/constants/pageMetaData";

export const revalidate = 600;

/**
 * 🌐 Fetch Legal Policy directly from Backend API (MongoDB / Redis)
 */
export const getPolicyData = cache(async (slug) => {
  if (!slug) return null;
  try {
    const res = await request.dynamicRead({
      entity: "legal-policy",
      endPoint: "public/by-slug",
      slug: encodeURIComponent(slug),
      revalidate: 600,
    });

    const policy = res?.result ?? res ?? null;
    if (policy && (policy.title || policy.slug) && !policy.error) {
      return policy;
    }
  } catch (err) {
    console.error(`[LegalPolicy] Error fetching policy for slug "${slug}":`, err?.message || err);
  }
  return null;
});

/**
 * 🏷️ Dynamic SEO Metadata generated strictly from Database Document
 */
export async function createPolicyMetadata(slug) {
  const policy = await getPolicyData(slug);

  const title = policy?.meta_title || policy?.title
    ? `${policy.title} | ${SITE_NAME}`
    : `Legal Policy | ${SITE_NAME}`;

  const description =
    policy?.meta_description ||
    policy?.summary?.replace(/<[^>]+>/g, "").slice(0, 160) ||
    `Official ${policy?.title || "Legal Policy"} of ${SITE_NAME}.`;

  const canonicalUrl = `${SITE_URL}/${slug}`;

  return {
    title,
    description,
    keywords: policy?.meta_keywords?.length
      ? policy.meta_keywords.join(", ")
      : `${policy?.title || "Policy"}, legal, terms, privacy`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * 📄 Legal Policy Page Server Component
 */
export default async function LegalPolicyPageRenderer({ slug }) {
  const policy = await getPolicyData(slug);

  if (!policy) {
    notFound();
  }

  return <LegalPolicyView policy={policy} />;
}
