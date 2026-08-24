const getId = (value) => {
    if (!value) return null;

    if (typeof value === "object") {
        return value._id || value.id || value.value || null;
    }

    return value;
};

/**
 * Mongo -> Antd Form
 * Preserves populated object properties (name, title, logo) for live header watchers
 * while Antd Form.Item getValueProps (singleObjProp / multiObjProp) extracts string IDs for Select controls.
 */
export function normalizeCourseForForm(course = {}) {
    return {
        ...course,
        logo: course.logo,
        image: course.image,
        brochureUrl: course.brochureUrl,
        categories: course.categories || [],

        universityOfferings: (course.universityOfferings || []).map((offering) => ({
            ...(typeof offering === "object" ? offering : {}),

            university: typeof offering === "object" ? offering.university : offering,
            workspace: typeof offering === "object" ? offering.workspace : null,
            fee: typeof offering === "object" ? offering.fee : null,
            duration: typeof offering === "object" ? offering.duration : null,
            eligibility: typeof offering === "object" ? offering.eligibility : null,
            brochureUrl: typeof offering === "object" ? offering.brochureUrl : null,

            category: typeof offering === "object" ? (offering.category || []) : [],

            subcourses: (typeof offering === "object" && Array.isArray(offering.subcourses) ? offering.subcourses : []).map((sub) => ({
                ...(typeof sub === "object" ? sub : {}),

                subcourse: typeof sub === "object" ? sub.subcourse : sub,
                fee: typeof sub === "object" ? sub.fee : null,
                duration: typeof sub === "object" ? sub.duration : null,
                eligibility: typeof sub === "object" ? sub.eligibility : null,
                category: typeof sub === "object" ? sub.category : null,

                modules: typeof sub === "object" ? (sub.modules || []) : [],
                keyHighlights: typeof sub === "object" ? (sub.keyHighlights || []) : [],
                whoCanApply: typeof sub === "object" ? (sub.whoCanApply || []) : [],
                admissionProcess: typeof sub === "object" ? (sub.admissionProcess || []) : [],

                courseSnapshotBottom: typeof sub === "object" ? (sub.courseSnapshotBottom || []) : [],

                instituteSection: typeof sub === "object" ? (sub.instituteSection || {}) : {},
            })),
        })),

        keyHighlights: course.keyHighlights || [],
        admissionProcess: course.admissionProcess || [],
    };
}

/**
 * Antd Form -> Mongo Payload
 * Converts Form values (objects or string IDs) to clean MongoDB ObjectIds before sending to backend API.
 * Omits _id from embedded offering and subcourse subdocuments so the backend's generic crud.controller
 * passes full objects to Mongoose instead of mapping them down to bare _id strings.
 */
export function serializeCourseForApi(values = {}) {
    const rawOfferings = Array.isArray(values.universityOfferings) ? values.universityOfferings : [];

    const cleanOfferings = rawOfferings
        .map((offering) => {
            if (!offering || typeof offering !== "object") return null;

            const uniId = getId(offering.university);
            if (!uniId) return null;

            const rawSubcourses = Array.isArray(offering.subcourses) ? offering.subcourses : [];
            const cleanSubcourses = rawSubcourses
                .map((sub) => {
                    if (!sub || typeof sub !== "object") return null;
                    const { _id, id, ...restSub } = sub;
                    return {
                        ...restSub,
                        subcourse: getId(sub.subcourse),
                        fee: getId(sub.fee),
                        duration: getId(sub.duration),
                        eligibility: getId(sub.eligibility),
                        category: getId(sub.category),

                        modules: sub.modules || [],
                        keyHighlights: sub.keyHighlights || [],
                        whoCanApply: sub.whoCanApply || [],
                        admissionProcess: sub.admissionProcess || [],

                        courseSnapshotBottom: (sub.courseSnapshotBottom || []).map((item) => {
                            const { _id: itemId, id: itemId2, ...restItem } = typeof item === "object" && item !== null ? item : {};
                            return {
                                ...restItem,
                                iconMedia: getId(item?.iconMedia),
                            };
                        }),

                        instituteSection: sub.instituteSection ? {
                            ...sub.instituteSection,
                            certificateImage: getId(sub.instituteSection?.certificateImage),
                        } : sub.instituteSection,
                    };
                })
                .filter(Boolean);

            const { _id, id, ...restOffering } = offering;

            return {
                ...restOffering,
                university: uniId,
                workspace: getId(offering.workspace),
                fee: getId(offering.fee),
                duration: getId(offering.duration),
                eligibility: getId(offering.eligibility),
                brochureUrl: getId(offering.brochureUrl),
                category: (offering.category || []).map(getId).filter(Boolean),
                subcourses: cleanSubcourses,
            };
        })
        .filter(Boolean);

    return {
        ...values,

        logo: getId(values.logo),
        image: getId(values.image),
        brochureUrl: getId(values.brochureUrl),

        categories: (values.categories || []).map(getId).filter(Boolean),

        universityOfferings: cleanOfferings,
    };
}
