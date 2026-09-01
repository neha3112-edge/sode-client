import { cache } from "react";
import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";
import CourseClientView from "@/components/website/CourseClientView";

export const revalidate = 900;

function normalizeCourseData(pageRes) {
  if (!pageRes) return null;
  if (
    pageRes.universityId ||
    pageRes.courseId ||
    pageRes.offeringId ||
    pageRes.isOfferingPage ||
    pageRes.overviewSection
  ) {
    const uni = pageRes.universityId?.name
      ? pageRes.universityId
      : pageRes.offeringId?.universityId || {};
    const courseObj = pageRes.courseId?.name
      ? pageRes.courseId
      : pageRes.offeringId?.courseId || {};
    const sub = pageRes.subCourseId?.name
      ? pageRes.subCourseId
      : pageRes.offeringId?.subCourseId || {};
    const feesObj = pageRes.fees || pageRes.offeringId?.fees || null;
    const durationObj = pageRes.duration || pageRes.offeringId?.duration || null;

    return {
      _id: pageRes._id,
      slug: pageRes.slug,
      isOfferingPage: true,
      offeringPage: pageRes,
      title: courseObj.title || courseObj.name || pageRes.slug,
      description: pageRes.overviewSection?.description || courseObj.description || "",
      categories: courseObj.categories || courseObj.category || [],
      universityOfferings: [
        {
          _id: pageRes._id,
          university: uni,
          subcourses: sub._id ? [sub] : [],
          duration: durationObj,
          fees: feesObj,
          fee: feesObj,
        },
      ],
      heroMedia: pageRes.heroMedia,
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
  return pageRes?.program || pageRes;
}

const getCourseData = cache(async (slug) => {
  if (!slug) return null;
  try {
    const res = await request.dynamicRead({
      entity: "university-offerings",
      endPoint: "v1/list",
      id: encodeURIComponent(slug),
      revalidate: 900,
    });
    const pageRes = res?.result || res;
    return normalizeCourseData(pageRes);
  } catch (err) {
    console.error(`[Server Component] Error pre-fetching course ${slug}:`, err.message);
    return null;
  }
});

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
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
    const rawImage =
      course.heroMedia?.url ||
      course.heroMedia ||
      course.universityOfferings?.[0]?.university?.bannerImg?.url ||
      course.universityOfferings?.[0]?.university?.bannerImg;
    const ogImage = rawImage ? getAssetPath(rawImage) : "https://mysode.com/og-image.jpg";
    const canonical = `https://mysode.com/courses/${course.slug || slug}`;

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

  const initialData = await getCourseData(slug);

  return <CourseClientView initialData={initialData} slug={slug} />;
}
