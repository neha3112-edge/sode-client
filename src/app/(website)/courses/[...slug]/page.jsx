import { cache } from "react";
import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";
import CourseClientView from "@/components/website/CourseClientView";

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
    _id: raw._id,
    slug: raw.slug || raw._id,
    name: raw.name || raw.title || "Course",
    fullName: raw.fullName || "",
    duration: durationStr,
    fees: feeStr,
    eligibility: raw.eligibility || "",
    admissionDeadline: raw.admissionDeadline || "",
    bannerImage: raw.bannerImage || raw.bannerImg || null,
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
    topUniversities: Array.isArray(raw.topUniversities) ? raw.topUniversities : [],
  };
}

const getCourseData = cache(async (slug) => {
  if (!slug) return null;
  const slugPath = Array.isArray(slug) ? slug.map((s) => encodeURIComponent(s)).join("/") : encodeURIComponent(slug);
  try {
    const res = await request.dynamicRead({
      entity: "courses",
      endPoint: "v1/list",
      id: slugPath,
      options: { refresh: "true" },
      revalidate: 0,
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
  const slug = resolvedParams?.slug;
  const slugStr = Array.isArray(slug) ? slug.join("/") : slug;

  if (!slugStr) {
    return {
      title: "Course Details | mysode",
      description: "Explore top accredited online & executive programmes.",
    };
  }

  try {
    const course = await getCourseData(slug);
    const cleanTitle = course?.name || (slugStr ? slugStr.replace(/[-/]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "Online Course");
    const uniName = course?.universityName || "Partner University";
    const displayTitle = `${cleanTitle}${uniName ? ` from ${uniName}` : ""} - Syllabus, Fees & Admission | mysode`;
    const description =
      course?.overview?.slice(0, 160) ||
      `Enroll in ${cleanTitle} from ${uniName}. Check eligibility criteria, fee structure, duration, career scope, and apply online.`;
    const keywords = `${cleanTitle}, ${cleanTitle} ${uniName}, ${cleanTitle} online fees, ${cleanTitle} syllabus, ${cleanTitle} admission`;
    const uniBannerImage = course?.bannerImage || course?.logo || null;
    const ogImage = uniBannerImage ? getAssetPath(uniBannerImage) : "https://mysode.com/og-image.jpg";
    const canonical = `https://mysode.com/courses/${course?.slug || slugStr}`;

    return {
      title: displayTitle,
      description,
      keywords,
      alternates: {
        canonical,
      },
      openGraph: {
        title: displayTitle,
        description,
        url: canonical,
        siteName: "mysode",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: displayTitle,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: displayTitle,
        description,
        images: [ogImage],
      },
    };
  } catch (error) {
    return {
      title: "Course Details | mysode",
      description: "Explore top accredited online & executive programmes.",
    };
  }
}

export default async function CourseDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";
  const slugStr = Array.isArray(slug) ? slug.join("/") : slug;

  const initialData = await getCourseData(slug);
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

