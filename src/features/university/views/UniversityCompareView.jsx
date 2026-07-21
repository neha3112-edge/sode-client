"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Select, Tag, Switch, Breadcrumb, Spin, Empty, Card } from "antd";
import {
  CloseOutlined,
  PlusOutlined,
  CheckCircleFilled,
  ThunderboltFilled,
  EnvironmentFilled,
  PhoneFilled,
  SwapOutlined,
  ReloadOutlined,
  LoadingOutlined,
  StarFilled,
  RightOutlined
} from "@ant-design/icons";

import { useCompare } from "@/context/CompareContext";
import { getWebsiteUniversitiesCompare, getUniversities } from "@/services/api";
import { getAssetPath } from "@/lib/utils";
import FormWrapper from "@/components/forms/FormWrapper";

export default function UniversityCompareView() {
  const { compareList, addToCompare, removeFromCompare, clearCompare, compareVersion } = useCompare();

  const [compareData, setCompareData] = useState([]);
  const [allUniversities, setAllUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  // Form Modal State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedProgramTitle, setSelectedProgramTitle] = useState("University Comparison Inquiry");

  // Fetch all universities for the dropdown selection
  useEffect(() => {
    getUniversities()
      .then((data) => {
        if (Array.isArray(data)) setAllUniversities(data);
      })
      .catch((err) => console.error("Error fetching universities list:", err));
  }, []);

  // Fetch comparison dataset for active compareList items
  const fetchCompareDataset = (list) => {
    if (!list || list.length === 0) {
      setCompareData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const slugs = list.map((item) => item.slug);

    getWebsiteUniversitiesCompare(slugs)
      .then((data) => {
        setCompareData(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching comparison data from backend:", err))
      .finally(() => setIsLoading(false));
  };

  // Execute comparison on page load & when triggered via footer "Compare Now" button
  useEffect(() => {
    fetchCompareDataset(compareList);
  }, [compareVersion]);

  // Available options for "+ Add Another" selector
  const availableOptions = useMemo(() => {
    const activeSlugs = new Set(compareList.map((item) => item.slug));
    return allUniversities
      .map((uni) => {
        const slug = uni.slug || uni.university?.slug;
        const name = uni.name || uni.university?.name || uni.title || "University";
        const logoSrc = uni.logoSrc || uni.university?.logoSrc || null;
        return { slug, name, logoSrc };
      })
      .filter((uni) => uni.slug && !activeSlugs.has(uni.slug))
      .map((uni) => ({
        label: uni.name,
        value: uni.slug,
      }));
  }, [allUniversities, compareList]);

  // Selecting from dropdown adds to bucket (footer compare bar triggers execution)
  const handleSelectToAdd = (slug) => {
    if (!slug) return;

    const found = allUniversities.find((u) => (u.slug || u.university?.slug) === slug);
    let uniItem = { slug, name: slug };

    if (found) {
      const slugVal = found.slug || found.university?.slug;
      const nameVal = found.name || found.university?.name || found.title;
      const logoVal = found.logoSrc || found.university?.logoSrc;
      uniItem = { slug: slugVal, name: nameVal, logoSrc: logoVal };
    }

    addToCompare(uniItem);
  };

  const handleRemoveItem = (slug) => {
    removeFromCompare(slug);
    const newList = compareList.filter((item) => item.slug !== slug);
    fetchCompareDataset(newList);
  };

  const handleClearAll = () => {
    clearCompare();
    setCompareData([]);
  };

  const handleOpenCounseling = (uniName) => {
    setSelectedProgramTitle(`Admission Inquiry - ${uniName}`);
    setIsFormModalOpen(true);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pt-32 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Breadcrumb */}
        <Breadcrumb
          className="text-xs font-semibold"
          items={[
            { title: <Link href="/">Home</Link> },
            { title: <Link href="/universities">Universities</Link> },
            { title: "University Comparison" },
          ]}
        />

        {/* Banner Title */}
        <div className="bg-gradient-to-r from-[#1C3569] via-[#152a54] to-[#0d1d3d] rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold shadow-xs">
              <SwapOutlined />
              <span>Live Mongoose Database Comparison Engine</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold m-0 leading-tight">
              Compare Online &amp; Distance Universities Side-by-Side
            </h1>
            <p className="text-slate-300 text-xs md:text-sm font-medium m-0">
              Evaluate UGC &amp; WES accreditations, fees, eligibility, course options, and student reviews to select your ideal institution.
            </p>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700">
              Comparing <span className="text-[#A66E38] text-sm font-extrabold">{compareData.length}</span> of 4 Universities
            </span>

            {compareData.length > 0 && (
              <Button
                type="text"
                onClick={handleClearAll}
                icon={<ReloadOutlined className="text-red-500 text-xs" />}
                className="text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg h-8 px-2"
              >
                Clear All
              </Button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Highlight Differences Switch */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span>Highlight Differences</span>
              <Switch
                size="small"
                checked={highlightDifferences}
                onChange={(checked) => setHighlightDifferences(checked)}
              />
            </div>
          </div>
        </div>

        {/* Comparison Matrix Table / Empty State */}
        {isLoading ? (
          <div className="bg-white rounded-3xl p-20 text-center border border-slate-200 shadow-xs flex flex-col items-center justify-center gap-3">
            <Spin indicator={<LoadingOutlined className="text-4xl text-[#1C3569]" spin />} />
            <p className="text-slate-600 font-bold text-sm m-0">Fetching Live Mongoose Specs Dataset...</p>
          </div>
        ) : compareData.length > 0 ? (
          <div className="space-y-3">
            {/* Mobile Swipe Helper Banner */}
            <div className="md:hidden flex items-center justify-between bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2.5 rounded-2xl text-xs font-bold shadow-2xs">
              <span className="flex items-center gap-1.5">
                <span>👈</span>
                <span>Swipe table horizontally to compare all universities</span>
              </span>
              <SwapOutlined className="text-amber-600 text-sm" />
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-x-auto relative">
              <table className="w-full text-left border-collapse min-w-[700px]">

                {/* Header Row: University Name & Logo */}
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    <th className="p-4 md:p-6 w-48 text-xs font-extrabold uppercase text-slate-500 tracking-wider sticky left-0 bg-slate-100 z-20 shadow-[3px_0_10px_rgba(0,0,0,0.05)]">
                      University Specs
                    </th>
                    {compareData.map((uni) => (
                      <th key={uni._id} className="p-4 md:p-6 w-64 align-top relative border-l border-slate-200/80">

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(uni.slug)}
                          className="absolute top-3 right-3 text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-full transition-colors cursor-pointer"
                          title="Remove from comparison"
                        >
                          <CloseOutlined className="text-xs" />
                        </button>

                        <div className="flex flex-col items-center text-center space-y-2 pt-2">
                          {/* Logo */}
                          <div className="w-16 h-16 bg-white p-2 rounded-2xl shadow-xs border border-slate-200 flex items-center justify-center overflow-hidden">
                            <img
                              src={getAssetPath(uni.logoSrc)}
                              alt={uni.name}
                              className="w-full h-full object-contain p-0.5"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>

                          {/* Name */}
                          <Link href={`/universities/${uni.slug}`} className="hover:text-[#A66E38] transition-colors">
                            <h3 className="font-extrabold text-sm text-[#1C3569] leading-snug m-0">
                              {uni.name}
                            </h3>
                          </Link>

                          {/* Location Badge */}
                          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                            <EnvironmentFilled className="text-amber-600 text-[10px]" /> {uni.location}
                          </span>

                          <Button
                            type="primary"
                            size="small"
                            onClick={() => handleOpenCounseling(uni.name)}
                            className="bg-[#059669] hover:!bg-[#047857] text-white font-bold text-xs rounded-xl h-8 w-full mt-2 border-none cursor-pointer"
                          >
                            Request Advice
                          </Button>
                        </div>
                      </th>
                    ))}

                    {/* Empty Slot (+ Add Slot) */}
                    {compareData.length < 4 && (
                      <th className="p-6 w-56 border-l border-slate-200/80 align-middle text-center bg-slate-50/30">
                        <div className="flex flex-col items-center justify-center space-y-2.5 py-6">
                          <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                            <PlusOutlined />
                          </div>
                          <span className="text-xs font-bold text-slate-500">Add Another</span>

                          {availableOptions.length > 0 && (
                            <div className="w-full">
                              <Select
                                placeholder="Select..."
                                onChange={(val) => handleSelectToAdd(val)}
                                options={availableOptions}
                                className="w-full text-sm font-medium"
                                value={null}
                              />
                            </div>
                          )}
                        </div>
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {/* 1. Approvals & Accreditations */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 md:p-5 font-bold text-xs text-[#1C3569] sticky left-0 bg-white z-10 shadow-[3px_0_10px_rgba(0,0,0,0.04)]">
                      Approvals &amp; Accreditations
                    </td>
                    {compareData.map((uni) => (
                      <td key={uni._id} className="p-4 md:p-5 border-l border-slate-100 text-xs">
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(uni.approvals) && uni.approvals.map((app) => (
                            <Tag key={app} color="gold" className="rounded-md font-bold text-[10px] m-0">
                              {app}
                            </Tag>
                          ))}
                        </div>
                      </td>
                    ))}
                    {compareData.length < 4 && <td className="border-l border-slate-100 bg-slate-50/20" />}
                  </tr>

                  {/* 2. Established Year */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 md:p-5 font-bold text-xs text-[#1C3569] sticky left-0 bg-white z-10 shadow-[3px_0_10px_rgba(0,0,0,0.04)]">
                      Established Year
                    </td>
                    {compareData.map((uni) => (
                      <td key={uni._id} className="p-4 md:p-5 border-l border-slate-100 text-xs font-semibold text-slate-700">
                        ESTD. {uni.established}
                      </td>
                    ))}
                    {compareData.length < 4 && <td className="border-l border-slate-100 bg-slate-50/20" />}
                  </tr>

                  {/* 3. Rating & Reviews */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 md:p-5 font-bold text-xs text-[#1C3569] sticky left-0 bg-white z-10 shadow-[3px_0_10px_rgba(0,0,0,0.04)]">
                      Rating &amp; Reviews
                    </td>
                    {compareData.map((uni) => (
                      <td key={uni._id} className="p-4 md:p-5 border-l border-slate-100 text-xs">
                        <div className="flex items-center gap-1 font-bold text-amber-600">
                          <StarFilled className="text-amber-500" />
                          <span>{uni.rating} / 5.0</span>
                          <span className="text-[10px] font-normal text-slate-400 ml-1">({uni.reviewsCount}+ reviews)</span>
                        </div>
                      </td>
                    ))}
                    {compareData.length < 4 && <td className="border-l border-slate-100 bg-slate-50/20" />}
                  </tr>

                  {/* 4. Programs Offered */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 md:p-5 font-bold text-xs text-[#1C3569] sticky left-0 bg-white z-10 shadow-[3px_0_10px_rgba(0,0,0,0.04)]">
                      Programs Offered
                    </td>
                    {compareData.map((uni) => (
                      <td key={uni._id} className="p-4 md:p-5 border-l border-slate-100 text-xs space-y-1">
                        {Array.isArray(uni.courses) && uni.courses.length > 0 ? (
                          uni.courses.map((c) => (
                            <Link
                              key={c._id || c.slug}
                              href={`/courses/${c.slug}`}
                              className="block font-semibold text-slate-700 hover:text-[#A66E38] transition-colors truncate max-w-[200px]"
                            >
                              • {c.title}
                            </Link>
                          ))
                        ) : (
                          <span className="text-slate-400 italic">Master MBA, DBA &amp; MCA</span>
                        )}
                      </td>
                    ))}
                    {compareData.length < 4 && <td className="border-l border-slate-100 bg-slate-50/20" />}
                  </tr>

                  {/* 5. EMI Starts @ */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 md:p-5 font-bold text-xs text-[#1C3569] sticky left-0 bg-white z-10 shadow-[3px_0_10px_rgba(0,0,0,0.04)]">
                      EMI Financing Options
                    </td>
                    {compareData.map((uni) => (
                      <td key={uni._id} className="p-4 md:p-5 border-l border-slate-100 text-xs font-bold text-emerald-700">
                        {uni.emiStarts || "Starts @ ₹4,999/month (0% Interest)"}
                      </td>
                    ))}
                    {compareData.length < 4 && <td className="border-l border-slate-100 bg-slate-50/20" />}
                  </tr>

                  {/* 6. Examination Mode */}
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 md:p-5 font-bold text-xs text-[#1C3569] sticky left-0 bg-white z-10 shadow-[3px_0_10px_rgba(0,0,0,0.04)]">
                      Examination Mode
                    </td>
                    {compareData.map((uni) => (
                      <td key={uni._id} className="p-4 md:p-5 border-l border-slate-100 text-xs font-semibold text-slate-700">
                        {uni.examMode || "100% Online / Assignment-based"}
                      </td>
                    ))}
                    {compareData.length < 4 && <td className="border-l border-slate-100 bg-slate-50/20" />}
                  </tr>

                  {/* 7. Action Button Row */}
                  <tr>
                    <td className="p-4 md:p-5 font-bold text-xs text-[#1C3569] sticky left-0 bg-white z-10 shadow-[3px_0_10px_rgba(0,0,0,0.04)]">
                      Action
                    </td>
                    {compareData.map((uni) => (
                      <td key={uni._id} className="p-4 md:p-5 border-l border-slate-100 text-xs">
                        <Button
                          type="primary"
                          onClick={() => handleOpenCounseling(uni.name)}
                          className="w-full bg-[#1C3569] hover:!bg-[#0d1d3d] text-white font-bold h-9 rounded-xl border-none cursor-pointer"
                        >
                          Apply Now <RightOutlined className="text-[10px]" />
                        </Button>
                      </td>
                    ))}
                    {compareData.length < 4 && <td className="border-l border-slate-100 bg-slate-50/20" />}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Empty Bucket Placeholder */
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto text-2xl">
              <SwapOutlined />
            </div>
            <h2 className="text-xl font-extrabold text-[#1C3569] m-0">No Universities in Compare List</h2>
            <p className="text-slate-500 text-xs font-medium leading-relaxed m-0">
              Select 2 to 4 universities to compare UGC approvals, fee structures, curriculum, and reviews side-by-side.
            </p>

            {availableOptions.length > 0 && (
              <div className="space-y-3 pt-2">
                <Select
                  placeholder="Select University to Add..."
                  onChange={(val) => handleSelectToAdd(val)}
                  options={availableOptions}
                  size="large"
                  className="w-full text-xs font-semibold"
                  value={null}
                />
              </div>
            )}

            <div className="pt-2">
              <Link href="/universities">
                <Button type="default" className="font-bold rounded-xl h-10 px-6 border-slate-300 text-slate-700">
                  Browse All Universities
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Counseling Form Modal */}
      <FormWrapper
        isModal
        isOpen={isFormModalOpen}
        title="Request Expert Counseling"
        subtitle="Talk to senior university advisors for 1:1 guidance"
        onClose={() => setIsFormModalOpen(false)}
        defaultCourse={selectedProgramTitle}
      />
    </div>
  );
}
