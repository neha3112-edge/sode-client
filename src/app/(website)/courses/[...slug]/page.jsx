import { cache } from "react";
import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";
import CourseClientView from "@/components/website/CourseClientView";

export const revalidate = 900;

function normalizeCourseData(pageRes) {
  if (!pageRes) return null;

  const uniList = Array.isArray(pageRes.universityIds)
    ? pageRes.universityIds
    : pageRes.universityId
      ? (Array.isArray(pageRes.universityId) ? pageRes.universityId : [pageRes.universityId])
      : [];

  const courseObj = pageRes.courseId?.name
    ? pageRes.courseId
    : pageRes.name
      ? pageRes
      : {};

  const sub = pageRes.subCourseId?.name
    ? pageRes.subCourseId
    : pageRes.courseId
      ? pageRes
      : {};

  const feesObj = pageRes.fees || null;
  const durationObj = pageRes.duration || null;

  const offerings = uniList.map((u, i) => ({
    _id: `${pageRes._id}-${u._id || i}`,
    university: u,
    subcourses: sub._id || sub.name ? [sub] : [],
    duration: durationObj,
    fees: feesObj,
    fee: feesObj,
  }));

  const mainTitle = pageRes.title || courseObj.name || pageRes.name || pageRes.slug;

  return {
    _id: pageRes._id,
    slug: pageRes.slug || pageRes._id,
    isOfferingPage: true,
    offeringPage: pageRes,
    title: mainTitle,
    fees: feesObj,
    fullFee: pageRes.fullFee,
    amount: pageRes.amount,
    duration: durationObj,
    durationMonths: pageRes.durationMonths,
    description: pageRes.overviewSection?.description || pageRes.description || courseObj.description || "",
    categories: pageRes.categories || pageRes.category || courseObj.category || [],
    universityOfferings: offerings.length > 0 ? offerings : [
      {
        _id: pageRes._id,
        university: pageRes.universityId || {},
        subcourses: sub._id ? [sub] : [],
        duration: durationObj,
        fees: feesObj,
        fee: feesObj,
      },
    ],
    heroMedia: pageRes.heroMedia || pageRes.logo,
    subTitle: pageRes.subTitle,
    rating: pageRes.rating,
    brochurePdf: pageRes.brochurePdf,
    admissionDeadline: pageRes.admissionDeadline,
    overviewSection: pageRes.overviewSection,
    whyChooseSection: pageRes.whyChooseSection,
    admissionSection: pageRes.admissionSection,
    skillsSection: pageRes.skillsSection,
    learningExperience: pageRes.learningExperience,
    instituteSection: pageRes.instituteSection,
    careerSection: pageRes.careerSection,
    feeSection: pageRes.feeSection,
    faqSection: pageRes.faqSection,
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
      revalidate: 900,
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

    if (!course) {
      return {
        title: "Course Not Found | mysode",
        description: "The requested course could not be found.",
      };
    }

    const cleanTitle = course.title || "Executive Programme";
    const uniName =
      course.universityOfferings?.[0]?.university?.name ||
      course.offeringPage?.universityId?.name ||
      "Partner University";
    const displayTitle = `${cleanTitle} from ${uniName} - Syllabus, Fees & Admission | mysode`;
    const description =
      course.overviewSection?.description?.slice(0, 160) ||
      course.description?.slice(0, 160) ||
      `Enroll in ${cleanTitle} from ${uniName}. Check eligibility criteria, fee structure, duration, career scope, and apply online.`;
    const keywords = `${cleanTitle}, ${cleanTitle} ${uniName}, ${cleanTitle} online fees, ${cleanTitle} syllabus, ${cleanTitle} admission`;
    const uniBannerImage =
      course.universityOfferings?.[0]?.university?.bannerImg?.url ||
      course.universityOfferings?.[0]?.university?.bannerImg ||
      course.offeringPage?.universityId?.bannerImg?.url ||
      course.offeringPage?.universityId?.bannerImg ||
      course.universityOfferings?.[0]?.university?.image?.url ||
      course.universityOfferings?.[0]?.university?.image ||
      null;
    const ogImage = uniBannerImage ? getAssetPath(uniBannerImage) : "https://mysode.com/og-image.jpg";
    const canonical = `https://mysode.com/courses/${course.slug || slugStr}`;

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

  return <CourseClientView initialData={initialData} slug={slugStr} />;
}
