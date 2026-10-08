"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Button, Checkbox, message } from "antd";
import { Building2, ChevronDown, ChevronRight, GraduationCap, Link2, Mail, Share2, User, X } from "lucide-react";
import { getAssetPath } from "@/lib/utils";
import { STATE_OPTIONS } from "@/constants/stateOptions";
import { DEFAULT_COURSE_OPTIONS } from "@/constants/courseOptions";
import { PartnerLogoIcon, CourseIcon, getItemSlug, isObjectId } from "@/components/website/category/CategoryIcons";

export default function BlogSidebar({
  title = "",
  categories = null,
  author,
  relatedBlogs = [],
  recentBlogs = [],
  popularBlogs = [],
  currentSlug = "",
}) {
  const [leadForm] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [coursesExpanded, setCoursesExpanded] = useState(false);
  const [unisExpanded, setUnisExpanded] = useState(false);

  // Extract Course List and University List directly from server props
  const { courseList, uniList } = useMemo(() => {
    const rawCategories = Array.isArray(categories?.result)
      ? categories.result
      : Array.isArray(categories?.categories)
      ? categories.categories
      : Array.isArray(categories)
      ? categories
      : [];

    const sections = Array.isArray(categories?.sections)
      ? categories.sections
      : [];

    let foundCourses = [];
    const courseSec = sections.find(
      (s) =>
        Array.isArray(s.items) &&
        s.items.length > 0 &&
        (s.sectionType === "COURSES" ||
          s.featuredType === "COURSES" ||
          s.featuredType === "TRENDING_COURSES" ||
          s.title?.toLowerCase().includes("course"))
    );
    if (courseSec && Array.isArray(courseSec.items) && courseSec.items.length > 0) {
      foundCourses = courseSec.items;
    } else {
      const courseCat = rawCategories.find(
        (c) =>
          (Array.isArray(c.courses) && c.courses.length > 0) ||
          c.sectionType === "COURSES" ||
          c.name?.toLowerCase().includes("course")
      );
      if (courseCat) {
        foundCourses = courseCat.courses || courseCat.children || courseCat.items || [];
      }
    }

    let foundUnis = [];
    // 1. Gather universities from all sections that actually contain items
    const uniSections = sections.filter(
      (s) =>
        Array.isArray(s.items) &&
        s.items.length > 0 &&
        (s.sectionType === "UNIVERSITIES" ||
          s.sectionType === "DOMESTIC" ||
          s.featuredType?.includes("UNIV") ||
          s.featuredType === "DOMESTIC" ||
          s.featuredType === "UNIVERSITIES" ||
          s.title?.toLowerCase().includes("universit"))
    );

    if (uniSections.length > 0) {
      uniSections.forEach((s) => {
        s.items.forEach((item) => {
          if (
            !foundUnis.some(
              (u) =>
                (u._id && u._id === item._id) ||
                (u.slug && u.slug === item.slug)
            )
          ) {
            foundUnis.push(item);
          }
        });
      });
    }

    // 2. Check topCategories if sections didn't provide universities
    if (foundUnis.length === 0 && Array.isArray(categories?.topCategories)) {
      categories.topCategories.forEach((c) => {
        if (
          (c.modalType === "UNIVERSITIES" ||
            c.name?.toLowerCase().includes("universit")) &&
          Array.isArray(c.items) &&
          c.items.length > 0
        ) {
          c.items.forEach((item) => {
            if (
              !foundUnis.some(
                (u) =>
                  (u._id && u._id === item._id) ||
                  (u.slug && u.slug === item.slug)
              )
            ) {
              foundUnis.push(item);
            }
          });
        }
      });
    }

    // 3. Check rawCategories as a fallback
    if (foundUnis.length === 0) {
      const uniCat = rawCategories.find(
        (c) =>
          (Array.isArray(c.universities) && c.universities.length > 0) ||
          ((c.sectionType === "UNIVERSITIES" ||
            c.name?.toLowerCase().includes("universit")) &&
            Array.isArray(c.items) &&
            c.items.length > 0)
      );
      if (uniCat) {
        foundUnis =
          uniCat.universities || uniCat.items || uniCat.children || [];
      }
    }

    return {
      courseList: foundCourses,
      uniList: foundUnis,
    };
  }, [categories]);

  const handleCourseClick = (course) => {
    const cleanSlug = getItemSlug(course);
    if (course.targetUrl && !/[0-9a-fA-F]{24}/.test(course.targetUrl)) {
      router.push(course.targetUrl);
    } else if (course.targetUrl && cleanSlug && !isObjectId(cleanSlug)) {
      router.push(course.targetUrl.replace(/[0-9a-fA-F]{24}/g, encodeURIComponent(cleanSlug)));
    } else {
      router.push(`/courses?course=${encodeURIComponent(cleanSlug)}`);
    }
  };

  const handleUniClick = (uni) => {
    const cleanSlug = getItemSlug(uni);
    router.push(`/universities/${encodeURIComponent(cleanSlug)}`);
  };

  // Normalize course options
  const courseSelectOptions = (DEFAULT_COURSE_OPTIONS || [])
    .filter((c) => !c.disabled && c.value && !c.value.startsWith("__"))
    .map((c) => ({
      value: c.label || c.value,
      label: c.label || c.value,
    }));

  const stateSelectOptions = (STATE_OPTIONS || []).map((s) => ({
    value: s,
    label: s,
  }));

  // Handle Free Counseling Lead Submission
  const handleLeadSubmit = async (values) => {
    setSubmitting(true);
    try {
      const fullPhone = values.number
        ? `+91${String(values.number).replace(/\D/g, "")}`
        : "";

      const payload = {
        name: values.name?.trim(),
        email: values.email?.trim(),
        phone: fullPhone,
        course: values.course,
        state: values.state,
        form_name: "Blog Sidebar - Free Counseling",
        source: "SODE",
        page_url: typeof window !== "undefined" ? window.location.href : "",
        utm_source: "Blog Sidebar",
        utm_medium: "Organic",
      };

      const res = await fetch(getAssetPath("/api/lead"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success !== false) {
        message.success(
          "Thank you! Your free counseling request has been received. Our expert advisor will call you shortly."
        );
        leadForm.resetFields();
      } else {
        message.error(data?.message || "Failed to submit. Please try again.");
      }
    } catch (err) {
      message.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Newsletter Subscribe
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subscribedEmail || !subscribedEmail.includes("@")) {
      message.warning("Please enter a valid email address.");
      return;
    }
    setSubscribing(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      message.success("Thank you for subscribing to education updates!");
      setSubscribedEmail("");
    } catch {
      message.error("Failed to subscribe. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  // Handle Social Sharing
  const handleSocialShare = (platform) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareText = title || "Check out this article on SODE";

    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else if (platform === "whatsapp") {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + url)}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else if (platform === "instagram") {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        message.success("Link copied! Open Instagram to share.");
      }
      window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    } else if (platform === "copy") {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        message.success("Link copied to clipboard!");
      } else {
        message.info(url);
      }
    }
  };

  // Filter out current blog from lists
  const filteredRelated = (relatedBlogs || [])
    .filter((b) => b && b.slug !== currentSlug)
    .slice(0, 5);

  const filteredRecent = (recentBlogs || [])
    .filter((b) => b && b.slug !== currentSlug)
    .slice(0, 5);

  const filteredPopular = (popularBlogs || [])
    .filter((b) => b && b.slug !== currentSlug)
    .slice(0, 5);

  // Author Data
  const authorName =
    author?.fullname ||
    author?.name ||
    (typeof author === "string" ? author : "Amritanjali Singh");
  const authorBio =
    author?.bio ||
    "Our editorial team creates educational guides covering Online Degrees, Distance Education, university programmes, admissions and career-related topics.";
  const authorAvatar =
    author?.avatar || author?.image || author?.profileImage || null;

  return (
    <div className="space-y-5 w-full">
      {/* ─── CARD 1: BOOK 100% FREE COUNSELING FORM ─── */}

      <div id="free-counseling" className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5 sm:p-6 relative scroll-mt-24">
        {/* Header */}
        <div className="text-center mb-4">
          <h3 className="text-base sm:text-lg font-extrabold text-[#0C2B4E] tracking-tight m-0">
            Book 100% Free Counseling
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 m-0">
            Get 1 to 1 Expert Guidance from SODE™
          </p>
        </div>

        <Form
          form={leadForm}
          layout="vertical"
          onFinish={handleLeadSubmit}
          requiredMark={false}
          className="space-y-3"
        >
          {/* Name */}
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
            className="mb-3"
          >
            <Input
              placeholder="Enter Your Name"
              className="rounded-lg border-slate-200 hover:border-[#0C2B4E] focus:border-[#0C2B4E]"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
            className="mb-3"
          >
            <Input
              placeholder="Enter Your Email"
              className="rounded-lg border-slate-200 hover:border-[#0C2B4E] focus:border-[#0C2B4E]"
            />
          </Form.Item>

          {/* Phone Number with +91 [India] prefix */}
          <Form.Item
            name="number"
            rules={[
              { required: true, message: "Please enter your mobile number" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Enter valid 10-digit number",
              },
            ]}
            className="mb-3"
          >
            <Input
              prefix={
                <span className="font-semibold text-slate-600 text-xs pr-2 mr-1 border-r border-slate-200 select-none">
                  IN +91 ▾
                </span>
              }
              placeholder="Enter Your Number"
              maxLength={10}
              className="rounded-lg border-slate-200 hover:border-[#0C2B4E] focus:border-[#0C2B4E]"
            />
          </Form.Item>

          {/* Select Course */}
          <Form.Item
            name="course"
            rules={[{ required: true, message: "Please select a course" }]}
            className="mb-3"
          >
            <Select
              placeholder="Select Course"
              options={courseSelectOptions}
              showSearch
              optionFilterProp="label"
              className="w-full"
            />
          </Form.Item>

          {/* Select State */}
          <Form.Item
            name="state"
            rules={[{ required: true, message: "Please select your state" }]}
            className="mb-3"
          >
            <Select
              placeholder="Select State"
              options={stateSelectOptions}
              showSearch
              optionFilterProp="label"
              className="w-full"
            />
          </Form.Item>

          {/* Consent Disclaimer Checkbox */}
          <Form.Item
            name="consent"
            valuePropName="checked"
            initialValue={true}
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Please accept terms")),
              },
            ]}
            className="mb-3"
          >
            <Checkbox className="text-xs text-slate-500 leading-tight select-none">
              I consent to share my details with SODE™ to receive counseling and
              updates for UGC-DEB approved universities.{" "}
              <Link
                href="/disclaimer"
                className="text-blue-600 hover:underline inline"
              >
                Disclaimer
              </Link>
            </Checkbox>
          </Form.Item>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            block
            className="h-11 bg-[#0C2B4E] hover:bg-[#08203b] text-white font-bold text-sm uppercase tracking-wider rounded-lg shadow-xs transition-all active:scale-[0.99] border-none"
          >
            SUBMIT
          </Button>
        </Form>
      </div>

      {/* ─── CARD 2: ABOUT THE AUTHOR ─── */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5">
        <div className="border-b border-gray-100 pb-2.5 mb-3.5">
          <h3 className="text-sm sm:text-[14.5px] font-bold text-slate-800 m-0">
            About the Author
          </h3>
        </div>

        <div className="flex items-center gap-3 mb-2.5">
          {authorAvatar ? (
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200 relative">
              <Image
                src={getAssetPath(authorAvatar)}
                alt={authorName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0C2B4E] flex items-center justify-center font-bold text-sm shrink-0">
              {authorName.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 m-0 leading-tight">
              {authorName}
            </h4>
            <span className="text-[11px] text-slate-500 font-normal">
              Senior Education Editor
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 font-normal mb-3.5 m-0">
          {authorBio}
        </p>

        <Link
          href="/about-us"
          className="inline-flex items-center justify-center px-4 py-1.5 rounded-md bg-[#F4D068] hover:bg-[#ebc557] text-[#0C2B4E] text-xs font-bold transition-all shadow-2xs no-underline active:scale-95"
        >
          View Profile
        </Link>
      </div>

      {/* ─── CARD 3: RELATED BLOGS ─── */}
      {filteredRelated.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5">
          <div className="border-b border-gray-100 pb-2.5 mb-3">
            <h3 className="text-sm sm:text-[14.5px] font-bold text-slate-800 m-0">
              Related Blogs
            </h3>
          </div>

          <div className="space-y-3.5">
            {filteredRelated.map((item, idx) => {
              const coverImg = item.coverImage || item.featuredImage;
              const imgUrl = coverImg ? getAssetPath(coverImg) : null;
              const title = item.title || item.headline || "Online Degree Guide";

              return (
                <div
                  key={item._id || item.slug || idx}
                  className="flex items-start gap-3 group"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/blogs/${item.slug}`}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200/70 relative block"
                  >
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100 text-xs font-bold group-hover:scale-105 transition-transform duration-300">
                        SODE
                      </div>
                    )}
                  </Link>

                  {/* Title & Link */}
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/blogs/${item.slug}`}
                      className="text-xs font-bold text-slate-800 group-hover:text-blue-700 leading-snug line-clamp-2 transition-colors no-underline block"
                    >
                      {title}
                    </Link>
                    <Link
                      href={`/blogs/${item.slug}`}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-0.5 mt-1 no-underline transition-colors"
                    >
                      <span>Read Now</span>
                      <ChevronRight size={12} strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── CARD 4: GET EDUCATION UPDATES (SUBSCRIBE) ─── */}
      <div className="bg-[#0C2B4E] text-white rounded-2xl p-5 shadow-xs">
        <h3 className="text-sm sm:text-[15px] font-bold text-white tracking-tight m-0">
          Get Education Updates
        </h3>
        <p className="text-xs text-blue-100/80 font-normal mt-1.5 mb-3.5 m-0">
          Subscribe to receive updates about Online Degree courses, university
          admissions, scholarships and educational opportunities.
        </p>

        <form onSubmit={handleSubscribe} className="space-y-2.5">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Mail size={15} />
            </span>
            <input
              type="email"
              value={subscribedEmail}
              onChange={(e) => setSubscribedEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-white text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:border-[#F4D068] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={subscribing}
            className="w-full py-2 px-4 rounded-full bg-[#F4D068] hover:bg-[#ebc557] text-[#0C2B4E] text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-70 border-none"
          >
            {subscribing ? "SUBSCRIBING..." : "SUBSCRIBE"}
          </button>
        </form>
      </div>

      {/* ─── CARD 5: RECENT BLOGS ─── */}
      {filteredRecent.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5">
          <div className="border-b border-gray-100 pb-2.5 mb-3">
            <h3 className="text-sm sm:text-[14.5px] font-bold text-slate-800 m-0">
              Recent Blogs
            </h3>
          </div>

          <div className="space-y-3.5">
            {filteredRecent.map((item, idx) => {
              const coverImg = item.coverImage || item.featuredImage;
              const imgUrl = coverImg ? getAssetPath(coverImg) : null;
              const title = item.title || item.headline || "Recent Education Guide";

              return (
                <div
                  key={item._id || item.slug || idx}
                  className="flex items-start gap-3 group"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/blogs/${item.slug}`}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200/70 relative block"
                  >
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100 text-xs font-bold group-hover:scale-105 transition-transform duration-300">
                        SODE
                      </div>
                    )}
                  </Link>

                  {/* Title & Link */}
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/blogs/${item.slug}`}
                      className="text-xs font-bold text-slate-800 group-hover:text-blue-700 leading-snug line-clamp-2 transition-colors no-underline block"
                    >
                      {title}
                    </Link>
                    <Link
                      href={`/blogs/${item.slug}`}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-0.5 mt-1 no-underline transition-colors"
                    >
                      <span>Read Now</span>
                      <ChevronRight size={12} strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── CARD 6: POPULAR BLOGS ─── */}
      {filteredPopular.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5">
          <div className="border-b border-gray-100 pb-2.5 mb-3">
            <h3 className="text-sm sm:text-[14.5px] font-bold text-slate-800 m-0">
              Popular Blogs
            </h3>
          </div>

          <div className="space-y-3.5">
            {filteredPopular.map((item, idx) => {
              const coverImg = item.coverImage || item.featuredImage;
              const imgUrl = coverImg ? getAssetPath(coverImg) : null;
              const title = item.title || item.headline || "Popular Education Guide";

              return (
                <div
                  key={item._id || item.slug || idx}
                  className="flex items-start gap-3 group"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/blogs/${item.slug}`}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200/70 relative block"
                  >
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100 text-xs font-bold group-hover:scale-105 transition-transform duration-300">
                        SODE
                      </div>
                    )}
                  </Link>

                  {/* Title & Link */}
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/blogs/${item.slug}`}
                      className="text-xs font-bold text-slate-800 group-hover:text-blue-700 leading-snug line-clamp-2 transition-colors no-underline block"
                    >
                      {title}
                    </Link>
                    <Link
                      href={`/blogs/${item.slug}`}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-0.5 mt-1 no-underline transition-colors"
                    >
                      <span>Read Now</span>
                      <ChevronRight size={12} strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── CARD 7: POPULAR ONLINE COURSES ─── */}
      {courseList.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-gray-100">
            <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <GraduationCap size={15} />
            </div>
            <h3 className="text-sm sm:text-[14.5px] font-bold text-slate-800 m-0">
              Popular Online Courses
            </h3>
          </div>

          {/* 3 Columns Course Grid */}
          <div className="grid grid-cols-3 gap-2">
            {(coursesExpanded ? courseList : courseList.slice(0, 9)).map((course, idx) => (
              <div
                key={course._id || course.slug || idx}
                onClick={() => handleCourseClick(course)}
                className="w-full aspect-square bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-blue-400 rounded-xl p-1.5 min-[360px]:p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-2xs group min-w-0"
              >
                <div className="mb-1 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                  <CourseIcon course={course} />
                </div>
                <div className="w-full min-w-0 flex items-center justify-center">
                  <span className="line-clamp-1 text-center uppercase font-bold text-[10px] min-[360px]:text-[11px] text-slate-700 group-hover:text-blue-600 transition-colors w-full px-0.5">
                    {course.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* View More / View Less */}
          {courseList.length > 9 && (
            <div className="flex justify-center mt-3 pt-1 border-t border-gray-50">
              <button
                type="button"
                onClick={() => setCoursesExpanded(!coursesExpanded)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-[#0B3B7E] bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 transition-all cursor-pointer border-none shadow-none"
              >
                <span>{coursesExpanded ? "View Less" : "View More"}</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    coursesExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ─── CARD 8: TOP ONLINE & DISTANCE UNIVERSITIES ─── */}
      {uniList.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-gray-100">
            <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Building2 size={15} />
            </div>
            <h3 className="text-sm sm:text-[14.5px] font-bold text-slate-800 m-0">
              Top Online & Distance Universities
            </h3>
          </div>

          {/* 3 Columns University Grid */}
          <div className="grid grid-cols-3 gap-2">
            {(unisExpanded ? uniList : uniList.slice(0, 12)).map((uni, idx) => (
              <div
                key={uni._id || uni.slug || idx}
                onClick={() => handleUniClick(uni)}
                className="w-full aspect-square bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-blue-400 rounded-xl p-1.5 min-[360px]:p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-2xs group min-w-0"
              >
                <div className="mb-1 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                  <PartnerLogoIcon partner={uni} />
                </div>
                <div className="w-full min-w-0 flex items-center justify-center h-6 sm:h-7">
                  <span className="line-clamp-2 text-center uppercase font-bold text-[8.5px] min-[360px]:text-[9px] sm:text-[9.5px] text-slate-700 group-hover:text-blue-600 transition-colors w-full px-0.5 leading-tight">
                    {uni.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* View More / View Less */}
          {uniList.length > 12 && (
            <div className="flex justify-center mt-3 pt-1 border-t border-gray-50">
              <button
                type="button"
                onClick={() => setUnisExpanded(!unisExpanded)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-[#0B3B7E] bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 transition-all cursor-pointer border-none shadow-none"
              >
                <span>{unisExpanded ? "View Less" : "View More"}</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    unisExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ─── CARD 9: SHARE THIS PAGE ─── */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs p-5">
        {/* Header with blue share icon */}
        <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-gray-100">
          <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Share2 size={14} className="stroke-[2.5]" />
          </div>
          <h3 className="text-sm sm:text-[14.5px] font-bold text-slate-800 m-0">
            Share This Page
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 font-normal mb-4 m-0">
          Share this article with someone who may find it useful.
        </p>

        {/* Social Share Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Facebook */}
          <button
            type="button"
            onClick={() => handleSocialShare("facebook")}
            aria-label="Share on Facebook"
            title="Facebook"
            className="w-8 h-8 rounded-full bg-[#1877F2] hover:bg-[#0d65d9] text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer border-none shadow-2xs"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>

          {/* WhatsApp */}
          <button
            type="button"
            onClick={() => handleSocialShare("whatsapp")}
            aria-label="Share on WhatsApp"
            title="WhatsApp"
            className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer border-none shadow-2xs"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </button>

          {/* Instagram */}
          <button
            type="button"
            onClick={() => handleSocialShare("instagram")}
            aria-label="Share on Instagram"
            title="Instagram"
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90 text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer border-none shadow-2xs"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </button>

        {/* Twitter / X */}
        <button
          type="button"
          onClick={() => handleSocialShare("twitter")}
          aria-label="Share on Twitter"
          title="Twitter"
          className="w-8 h-8 rounded-full bg-[#1877F2] hover:bg-[#188dd5] text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer border-none shadow-2xs"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
          </svg>
        </button>

        {/* Copy Link */}
        <button
          type="button"
          onClick={() => handleSocialShare("copy")}
          aria-label="Copy Page Link"
          title="Copy Link"
          className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer border-none shadow-2xs"
        >
          <Link2 size={15} className="stroke-[2.5]" />
        </button>
      </div>
    </div>
  </div>
);
}
