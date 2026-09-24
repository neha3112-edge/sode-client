import { cache } from "react";
import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";
import { getPageMetaData, constructMetadata } from "@/constants/pageMetaData";
import { UniversityClientView, CourseClientView } from "@/components/website";

export const revalidate = 900;

function normalizeCourseData(pageRes) {
  if (!pageRes) return null;
  const raw = pageRes.result || pageRes;

  const durationStr =
    typeof raw.duration === "string"
      ? raw.duration
      : raw.duration?.name || (raw.duration?.months ? `${raw.duration.months} Months` : "");

  const feeStr =
    typeof raw.fees === "string"
      ? raw.fees
      : raw.fees?.name || (raw.fees?.amount ? `₹${Number(raw.fees.amount).toLocaleString("en-IN")}` : "");

  return {
    ...raw,
    _id: raw._id,
    slug: raw.slug || raw._id,
    name: raw.name || raw.title || "Course",
    fullName: raw.fullName || "",
    duration: durationStr,
    fees: feeStr,
    ledger: raw.ledger || null,
    feesLedger: raw.feesLedger || null,
    emi: raw.emi || raw.feesLedger?.emi || raw.ledger?.emi || null,
    eligibility: raw.eligibility || "",
    admissionDeadline: raw.admissionDeadline || "",
    coursepageimage: raw.coursepageimage || null,
    bannerImage: raw.coursepageimage || raw.bannerImage || raw.bannerImg || null,
    mobileBannerImage: raw.bannerImageMobile || raw.mobileBannerImage || raw.mobileBannerImg || null,
    logo: raw.logo || null,
    location: raw.location || "",
    established: raw.established || "",
    approvalsTitle: raw.approvalsTitle || (raw.universityName ? `Rankings & Accreditations of ${raw.universityName}` : "Rankings & Accreditations"),
    approvals: Array.isArray(raw.approvals) ? raw.approvals : [],
    overviewTitle: raw.overviewTitle || (raw.name ? `${raw.name} Course Overview` : "Course Overview"),
    overview: raw.overview || raw.description || "",
    keyHighlights: Array.isArray(raw.keyHighlights) ? raw.keyHighlights : [],
    faqs: Array.isArray(raw.faqs) ? raw.faqs : [],
    subCourses: Array.isArray(raw.subCourses) ? raw.subCourses : [],
    universityName: raw.universityName || "",
    curriculum: Array.isArray(raw.curriculum) ? raw.curriculum : [],
    syllabus: Array.isArray(raw.syllabus) ? raw.syllabus : [],
    paymentType: raw.paymentType || null,
    fullFee: raw.fullFee || null,
    customContent: raw.customContent || "",
    topUniversities: Array.isArray(raw.topUniversities) ? raw.topUniversities : [],
  };
}

const getUniversityData = cache(async (slug) => {
  if (!slug) return null;
  try {
    const res = await request.dynamicRead({
      entity: "universities",
      endPoint: "v1/list",
      id: encodeURIComponent(slug),
      revalidate: 900,
    });
    return res?.result || res || null;
  } catch (err) {
    console.error(`[Server Component] Error pre-fetching university ${slug}:`, err.message);
    return null;
  }
});

const getCourseData = cache(async (slug) => {
  if (!slug) return null;
  const slugPath = Array.isArray(slug) ? slug.map((s) => encodeURIComponent(s)).join("/") : encodeURIComponent(slug);
  try {
    const res = await request.dynamicRead({
      entity: "courses",
      endPoint: "v1/list",
      id: slugPath,
      revalidate: 300, // 5 min ISR — data from backend, NOT static
    });
    const pageRes = res?.result || res;
    return normalizeCourseData(pageRes);
  } catch (err) {
    console.error(`[Server Component] Error pre-fetching course ${slugPath}:`, err.message);
    return null;
  }
});

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug;
  const slugArray = Array.isArray(rawSlug) ? rawSlug : [rawSlug].filter(Boolean);

  if (!slugArray.length) {
    return {};
  }

  // 1 segment -> University Page
  if (slugArray.length === 1) {
    const uniSlug = slugArray[0];
    try {
      const [data, pageMeta] = await Promise.all([
        getUniversityData(uniSlug),
        getPageMetaData(`/universities/${uniSlug}`),
      ]);

      const uni = (data && typeof data.universityId === "object" ? data.universityId : data) || {};
      const uniName = uni.name || data?.tagline || "";
      const rawImage =
        pageMeta?.ogImage ||
        uni.bannerImg?.url ||
        uni.bannerImg ||
        data?.heroMedia?.url ||
        data?.heroMedia ||
        uni.image?.url ||
        uni.image;

      return constructMetadata(pageMeta, {
        title: uniName,
        canonicalUrl: `https://sode.co.in/universities/${data?.slug || uniSlug}`,
        ogImage: rawImage ? getAssetPath(rawImage) : null,
      });
    } catch (error) {
      return {};
    }
  }

  // 2+ segments -> Course under University (e.g. /universities/amity-university/bjmc or /university/amity-university/ba)
  const slugStr = slugArray.join("/");
  try {
    const [course, pageMeta] = await Promise.all([
      getCourseData(slugArray),
      getPageMetaData(`/universities/${slugStr}`),
    ]);

    const cleanTitle = course?.name || "";
    const uniName = course?.universityName || "";
    const uniBannerImage = pageMeta?.ogImage || course?.bannerImage || course?.logo || null;

    return constructMetadata(pageMeta, {
      title: cleanTitle ? `${cleanTitle}${uniName ? ` from ${uniName}` : ""}` : "",
      canonicalUrl: `https://sode.co.in/universities/${course?.slug || slugStr}`,
      ogImage: uniBannerImage ? getAssetPath(uniBannerImage) : null,
    });
  } catch (error) {
    return {};
  }
}

export default async function UniversityOrCourseDetailPage({ params }) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams?.slug;
  const slugArray = Array.isArray(rawSlug) ? rawSlug : [rawSlug].filter(Boolean);

  // 1 segment -> University Page
  if (slugArray.length <= 1) {
    const uniSlug = slugArray[0] || "";
    const initialData = await getUniversityData(uniSlug);
    return <UniversityClientView initialData={initialData} slug={uniSlug} />;
  }

  // 2+ segments -> Course under University
  const slugStr = slugArray.join("/");
  const initialData = await getCourseData(slugArray);
  const initialCourses =
    Array.isArray(initialData?.topUniversities) && initialData.topUniversities.length > 0
      ? initialData.topUniversities
      : [];

  return (
    <CourseClientView
      initialData={initialData}
      initialCourses={initialCourses}
      slug={slugStr}
    />
  );
}
