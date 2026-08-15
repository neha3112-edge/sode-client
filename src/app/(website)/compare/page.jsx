"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Breadcrumb, Button, Select, Tag, Empty, Skeleton } from "antd";
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  DeleteOutlined,
  CloseOutlined,
  BankOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  DollarOutlined,
  BookOutlined,
} from "@ant-design/icons";

import { useCompare, useAppDrawer } from "@/context";
import { getUniversities, getCourses as getWebsiteCourses } from "@/services/api";
import { getAssetPath } from "@/lib/utils";

const AVATAR_COLORS = [
  "#1C3569", "#4F46E5", "#0369A1", "#047857", "#B45309",
  "#7C3AED", "#BE185D", "#0E7490", "#9A3412", "#374151",
];

function getAvatarColor(name = "") {
  const idx = (name || "U").charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

function resolveMediaUrl(media) {
  if (!media) return null;
  return getAssetPath(media, null);
}

export default function ComparePage() {
  const router = useRouter();
  const { compareList, removeFromCompare, clearCompare, addToCompare } = useCompare();
  const { openFormModal } = useAppDrawer();

  const [allCourses, setAllCourses] = useState([]);
  const [allUniversities, setAllUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      getWebsiteCourses().catch(() => []),
      getUniversities().catch(() => []),
    ])
      .then(([coursesRes, unisRes]) => {
        if (!isMounted) return;
        const cList = Array.isArray(coursesRes) ? coursesRes : (coursesRes?.courses || coursesRes?.result || []);
        const uList = Array.isArray(unisRes) ? unisRes : (unisRes?.universities || unisRes?.result || []);
        setAllCourses(cList);
        setAllUniversities(uList);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const selectOptions = useMemo(() => {
    const opts = [];
    if (Array.isArray(allCourses)) {
      allCourses.forEach((c) => {
        if (c && c.name) {
          opts.push({
            value: `course_${c.slug || c._id}`,
            label: `[Course] ${c.name}`,
            itemObj: {
              type: "course",
              id: c._id,
              slug: c.slug,
              title: c.name,
              name: c.name,
              logoUrl: resolveMediaUrl(c.logo),
              university: c.university || (c.universityIds && c.universityIds[0]) || null,
              category: c.category,
              duration: c.duration,
              fees: c.fees,
              approvals: c.approvals || [],
              naac_rating: c.naac_rating,
              nirf_rank: c.nirf_rank,
              advantages: c.advantages || ["Interactive live & recorded sessions", "Industry-recognized certification"],
            },
          });
        }
      });
    }

    if (Array.isArray(allUniversities)) {
      allUniversities.forEach((u) => {
        if (u && u.name) {
          opts.push({
            value: `uni_${u.slug || u._id}`,
            label: `[University] ${u.name}`,
            itemObj: {
              type: "university",
              id: u._id,
              slug: u.slug,
              title: u.name,
              name: u.name,
              logoUrl: resolveMediaUrl(u.logoSrc || u.logo),
              universityType: u.type || "Private",
              location: u.location || [u.city?.name, u.state?.name].filter(Boolean).join(", "),
              approvals: u.approvals || [],
              naac_rating: u.naac_rating,
              nirf_rank: u.nirf_rank,
              rating: u.rating || u.avg_rating || 4.8,
              coursesCount: u.coursesCount || u.courses?.length || 0,
              advantages: ["100% Online & Flexible Learning", "Globally Recognized Curriculum", "Dedicated Career Support"],
            },
          });
        }
      });
    }
    return opts;
  }, [allCourses, allUniversities]);

  const handleSelectAdd = (optValue) => {
    const selectedOpt = selectOptions.find((o) => o.value === optValue);
    if (selectedOpt && selectedOpt.itemObj) {
      addToCompare(selectedOpt.itemObj);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-8 px-4 sm:px-6 md:px-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div>
            <Breadcrumb
              className="text-xs font-semibold mb-1"
              items={[
                { title: <Link href="/">Home</Link> },
                { title: <Link href="/courses">Courses</Link> },
                { title: <span className="font-bold text-slate-800">Compare</span> },
              ]}
            />
          </div>

          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={clearCompare}
                className="font-bold rounded-xl h-9 text-xs cursor-pointer"
              >
                Clear All ({compareList.length})
              </Button>
            )}
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => router.push("/courses")}
              className="font-bold rounded-xl h-9 text-xs border-slate-300 text-slate-700 cursor-pointer"
            >
              Browse All Courses
            </Button>
          </div>
        </div>

        {/* Add More Items to Compare Select Bar */}
        {compareList.length < 4 && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <span className="text-xs font-bold text-slate-600">
              Add up to 4 courses or universities to compare ({compareList.length}/4 selected):
            </span>
            <Select
              showSearch
              placeholder="Search course or university to compare..."
              className="w-full sm:w-96 text-xs font-semibold"
              size="middle"
              options={selectOptions.filter((opt) => !compareList.some((item) => item.slug === opt.itemObj?.slug || item._id === opt.itemObj?._id))}
              onChange={handleSelectAdd}
              value={null}
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
            />
          </div>
        )}

        {/* 🌟 Shimmer / Skeleton Comparison Table vs Real Content */}
        {loading ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-100 flex flex-col gap-4 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <Skeleton.Avatar active size="large" shape="square" style={{ borderRadius: 12 }} />
                    <div className="flex-1">
                      <Skeleton.Input active size="small" style={{ width: "80%", height: 18 }} />
                      <Skeleton.Input active size="small" style={{ width: "50%", height: 14, marginTop: 4 }} />
                    </div>
                  </div>
                  <Skeleton active paragraph={{ rows: 5, width: ["100%", "85%", "90%", "75%", "60%"] }} />
                  <Skeleton.Button active size="small" style={{ width: "100%", height: 36, borderRadius: 12, marginTop: "auto" }} />
                </div>
              ))}
            </div>
          </div>
        ) : compareList.length > 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[750px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 w-52 text-xs font-black text-slate-500 uppercase tracking-wider border-r border-slate-200">
                      Feature / Criteria
                    </th>
                    {compareList.map((item, idx) => {
                      const title = item.title || item.name || "Program";
                      const uniName = item.uniName || item.university?.name || item.name || "University";
                      const logoUrl = item.logoUrl || item.logoSrc || resolveMediaUrl(item.university?.logoSrc);
                      const itemKey = item.slug || item.id || item._id || `col-${idx}`;

                      return (
                        <th key={itemKey} className="p-4 w-72 border-r border-slate-200 last:border-0 relative group align-top">
                          <button
                            onClick={() => removeFromCompare(itemKey)}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-200 hover:bg-red-500 text-slate-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none"
                            title="Remove from Compare"
                          >
                            <CloseOutlined className="text-xs" />
                          </button>

                          <div className="flex flex-col items-center text-center space-y-2 pt-2">
                            <div className="w-16 h-16 rounded-2xl border border-slate-200 bg-white p-2 flex items-center justify-center relative shadow-2xs">
                              {logoUrl ? (
                                <Image
                                  src={getAssetPath(logoUrl)}
                                  alt={uniName}
                                  fill
                                  unoptimized
                                  className="object-contain p-1"
                                />
                              ) : (
                                <span className="text-lg font-black text-[#1C3569]">
                                  {uniName.charAt(0)}
                                </span>
                              )}
                            </div>
                            <h3 className="text-sm font-bold text-[#1C3569] m-0 line-clamp-2 leading-snug">
                              {title}
                            </h3>
                            <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                              {uniName}
                            </span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium">
                  {/* Institution Type */}
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-slate-50/50 border-r border-slate-200">
                      <BankOutlined className="mr-1.5 text-blue-600" /> Institution Type
                    </td>
                    {compareList.map((item, idx) => (
                      <td key={idx} className="p-4 border-r border-slate-200 last:border-0 text-center">
                        <Tag className="bg-blue-50 border-blue-200 text-blue-800 font-bold px-2.5 py-0.5 rounded-full">
                          {item.universityType || item.type || "Private"}
                        </Tag>
                      </td>
                    ))}
                  </tr>

                  {/* Location */}
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-slate-50/50 border-r border-slate-200">
                      Location / Campus
                    </td>
                    {compareList.map((item, idx) => (
                      <td key={idx} className="p-4 border-r border-slate-200 last:border-0 text-center text-slate-600">
                        {item.location || "Online Pan-India"}
                      </td>
                    ))}
                  </tr>

                  {/* Approvals */}
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-slate-50/50 border-r border-slate-200">
                      <SafetyCertificateOutlined className="mr-1.5 text-blue-600" /> Approvals
                    </td>
                    {compareList.map((item, idx) => {
                      const approvals = item.approvals || [];
                      const naac = item.naac_rating;
                      return (
                        <td key={idx} className="p-4 border-r border-slate-200 last:border-0 text-center">
                          <div className="flex flex-wrap items-center justify-center gap-1">
                            {naac && (
                              <Tag color="gold" className="font-bold text-[10px] m-0">
                                NAAC {typeof naac === "object" ? naac.grade || naac.name : naac}
                              </Tag>
                            )}
                            {approvals.map((a, i) => (
                              <Tag key={i} color="blue" className="font-bold text-[10px] m-0">
                                {typeof a === "object" ? a.name || a.code : a}
                              </Tag>
                            ))}
                            {!naac && approvals.length === 0 && (
                              <span className="text-slate-400">UGC-DEB Approved</span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Program Duration */}
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-slate-50/50 border-r border-slate-200">
                      <ClockCircleOutlined className="mr-1.5 text-blue-600" /> Duration
                    </td>
                    {compareList.map((item, idx) => {
                      const dur = item.duration;
                      const text = dur ? (typeof dur === "object" ? dur.name || `${dur.months} Months` : dur) : "2 Years";
                      return (
                        <td key={idx} className="p-4 border-r border-slate-200 last:border-0 text-center font-bold text-slate-700">
                          {text}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Total Fee */}
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-slate-50/50 border-r border-slate-200">
                      <DollarOutlined className="mr-1.5 text-blue-600" /> Total Fee
                    </td>
                    {compareList.map((item, idx) => {
                      const feeObj = item.fees;
                      let feeStr = "Contact Counselor";
                      if (feeObj) {
                        if (typeof feeObj === "object") {
                          const amt = feeObj.amount || feeObj.min || feeObj.max;
                          if (amt) feeStr = `₹${Number(amt).toLocaleString("en-IN")}`;
                        } else if (typeof feeObj === "number" || typeof feeObj === "string") {
                          feeStr = `₹${Number(feeObj).toLocaleString("en-IN")}`;
                        }
                      }
                      return (
                        <td key={idx} className="p-4 border-r border-slate-200 last:border-0 text-center font-extrabold text-emerald-700 text-sm">
                          {feeStr}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Key Advantages */}
                  <tr>
                    <td className="p-4 font-bold text-slate-700 bg-slate-50/50 border-r border-slate-200">
                      <BookOutlined className="mr-1.5 text-blue-600" /> Key Highlights
                    </td>
                    {compareList.map((item, idx) => {
                      const advs = item.advantages || ["100% Online Learning", "Industry Recognized Degree"];
                      return (
                        <td key={idx} className="p-4 border-r border-slate-200 last:border-0 text-left">
                          <ul className="space-y-1.5 m-0 p-0 list-none text-[11px] text-slate-600">
                            {advs.map((adv, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-1.5">
                                <CheckOutlined className="text-emerald-500 text-[10px] mt-0.5 shrink-0" />
                                <span>{adv}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Actions */}
                  <tr className="bg-slate-50/40">
                    <td className="p-4 font-bold text-slate-700 bg-slate-50/50 border-r border-slate-200">
                      Actions
                    </td>
                    {compareList.map((item, idx) => {
                      const itemTitle = item.title || item.name || "Program";
                      const uniSlug = item.uniSlug || item.slug || "";
                      const itemSlug = item.slug || "";

                      return (
                        <td key={idx} className="p-4 border-r border-slate-200 last:border-0">
                          <div className="flex flex-col gap-2">
                            <Button
                              type="primary"
                              onClick={() => {
                                openFormModal({
                                  title: `Apply Now - ${itemTitle}`,
                                  subtitle: "Fill your details to get free expert 1:1 counseling",
                                  defaultCourse: itemTitle,
                                });
                              }}
                              className="bg-[#009F93] hover:bg-[#008278] border-none font-bold text-xs rounded-xl h-9 w-full cursor-pointer"
                            >
                              Apply Now
                            </Button>

                            <Link href={itemSlug ? `/courses/${itemSlug}` : (uniSlug ? `/universities/${uniSlug}` : "/courses")} className="w-full">
                              <Button className="bg-[#1C3569] text-white hover:bg-[#122449] border-none font-bold text-xs rounded-xl h-9 w-full cursor-pointer">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-4 shadow-sm">
            <Empty description={<span className="text-slate-500 font-bold text-base">No items in comparison bucket yet.</span>} />
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Search and select courses or universities from the dropdown above or click &quot;+ Add to Compare&quot; on any course card to evaluate them side-by-side.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
