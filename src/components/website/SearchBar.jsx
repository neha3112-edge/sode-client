"use client";
import { Container } from "@/components/common/Container";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Select, Drawer, Button } from "antd";

// Search Bar Component (With smooth enter & exit top slide-down filter drawer)
export function SearchBar({
  categories = [],
  universities = [],
  subcourses = [],
  durations = [],
  fees = [],
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcourse, setSelectedSubcourse] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedFee, setSelectedFee] = useState("all");

  // Helper to deduplicate items by label
  const deduplicate = (items) => {
    const seen = new Set();
    return (items || []).filter((item) => {
      if (!item || !item.label) return false;
      const key = item.label.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const dynamicCategories = deduplicate([
    { id: "all", label: "All Categories" },
    ...(categories || [])
      .map((c) => {
        const cLabel = c.label || c.name || c.title || "";
        const formatted = cLabel ? cLabel.charAt(0).toUpperCase() + cLabel.slice(1) : "";
        return { id: (c.slug || c._id || c.name || "").toLowerCase(), label: formatted };
      })
      .filter((c) => c.label && c.label.trim() !== ""),
  ]);

  const dynamicSubcourses = deduplicate([
    { id: "all", label: "All Specializations" },
    ...(subcourses || [])
      .map((sc) => {
        const scLabel = sc.label || sc.title || sc.name || "";
        return { id: sc.slug || sc._id, label: scLabel };
      })
      .filter((sc) => sc.label && sc.label.trim() !== ""),
  ]);

  const dynamicPartners = deduplicate([
    { id: "all", label: "All Partners" },
    ...(universities || [])
      .map((u) => {
        const uLabel = u.label || u.name || u.title || u.fullname || (typeof u.university === "object" ? u.university?.name || u.university?.title : "") || "";
        return { id: u.slug || u._id, label: uLabel };
      })
      .filter((u) => u.label && u.label.trim() !== ""),
  ]);

  const dynamicDurations = deduplicate([
    { id: "all", label: "All Durations" },
    ...(durations || [])
      .map((d) => {
        const dLabel = d.label || d.title || d.name || (d.months ? `${d.months} Months` : "");
        return { id: d.slug || d._id, label: dLabel };
      })
      .filter((d) => d.label && d.label.trim() !== ""),
  ]);

  const dynamicFees = deduplicate([
    { id: "all", label: "All Budgets" },
    ...(fees || [])
      .map((f) => {
        let fLabel = f.label || f.title || f.name || "";
        if (!fLabel && (f.minAmount || f.maxAmount)) {
          fLabel = f.minAmount && f.maxAmount ? `₹${f.minAmount.toLocaleString()} - ₹${f.maxAmount.toLocaleString()}` : `₹${(f.minAmount || f.maxAmount).toLocaleString()}`;
        }
        return { id: f.slug || f._id, label: fLabel };
      })
      .filter((f) => f.label && f.label.trim() !== ""),
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/courses?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleOpenFilters = () => {
    setIsFilterOpen(true);
  };

  const handleCloseFilters = () => {
    setIsFilterOpen(false);
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
    let queryParams = [];
    if (searchTerm.trim()) queryParams.push(`search=${encodeURIComponent(searchTerm)}`);
    if (selectedCategory !== "all") queryParams.push(`category=${selectedCategory}`);
    if (selectedSubcourse !== "all") queryParams.push(`subcourse=${selectedSubcourse}`);
    if (selectedType !== "all") queryParams.push(`university=${selectedType}`);
    if (selectedDuration !== "all") queryParams.push(`duration=${selectedDuration}`);
    if (selectedFee !== "all") queryParams.push(`fee=${selectedFee}`);

    const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    router.push(`/courses${queryString}`);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedSubcourse("all");
    setSelectedType("all");
    setSelectedDuration("all");
    setSelectedFee("all");
  };

  return (
    <>
      <div className="w-full bg-white py-4 md:py-6 px-4 border-b border-slate-50 relative z-40">
        <Container>
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search programs, institutes or courses..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xs"
              />
            </div>

            <button
              type="button"
              onClick={handleOpenFilters}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors shadow-xs cursor-pointer focus:outline-none"
              aria-label="Filter courses"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>
            </button>
          </form>
        </Container>
      </div>

      {/* ── TOP SLIDE-DOWN DRAWER FOR FILTERS (ANT DESIGN DRAWER) ── */}
      <Drawer
        title={
          <div>
            <h3 className="text-lg font-bold text-[#1d3557]">Filter Programs</h3>
            <p className="text-xs text-gray-500 font-medium">
              Narrow down programs matching your interests
            </p>
          </div>
        }
        placement="top"
        onClose={handleCloseFilters}
        open={isFilterOpen}
        size="default"
        styles={{
          header: { borderBottom: "1px solid #f0f0f0", padding: "16px 24px" },
          body: { padding: "20px 24px" },
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Filter Options (Antd Select Dropdowns Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            {/* 1. Category */}
            <div className="space-y-1.5">
              <label className="text-slate-700 text-xs font-medium uppercase tracking-wider block">
                Course Category
              </label>
              <Select
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
                className="w-full font-medium"
                size="middle"
                options={dynamicCategories.map((cat) => ({
                  value: cat.id,
                  label: cat.label,
                }))}
              />
            </div>

            {/* 2. Specialization / Subcourse */}
            {dynamicSubcourses.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-slate-700 text-xs font-medium uppercase tracking-wider block">
                  Specialization / Subcourse
                </label>
                <Select
                  value={selectedSubcourse}
                  onChange={(value) => setSelectedSubcourse(value)}
                  className="w-full font-medium"
                  size="middle"
                  options={dynamicSubcourses.map((sc) => ({
                    value: sc.id,
                    label: sc.label,
                  }))}
                />
              </div>
            )}

            {/* 3. Institute / Partner */}
            <div className="space-y-1.5">
              <label className="text-slate-700 text-xs font-medium uppercase tracking-wider block">
                Institute / Partner
              </label>
              <Select
                value={selectedType}
                onChange={(value) => setSelectedType(value)}
                className="w-full font-medium"
                size="middle"
                options={dynamicPartners.map((t) => ({
                  value: t.id,
                  label: t.label,
                }))}
              />
            </div>

            {/* 4. Program Duration */}
            <div className="space-y-1.5">
              <label className="text-slate-700 text-xs font-medium uppercase tracking-wider block">
                Program Duration
              </label>
              <Select
                value={selectedDuration}
                onChange={(value) => setSelectedDuration(value)}
                className="w-full font-medium"
                size="middle"
                options={dynamicDurations.map((d) => ({
                  value: d.id,
                  label: d.label,
                }))}
              />
            </div>

            {/* 5. Fee Range / Budget */}
            {dynamicFees.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-slate-700 text-xs font-medium uppercase tracking-wider block">
                  Fee Range / Budget
                </label>
                <Select
                  value={selectedFee}
                  onChange={(value) => setSelectedFee(value)}
                  className="w-full font-medium"
                  size="middle"
                  options={dynamicFees.map((f) => ({
                    value: f.id,
                    label: f.label,
                  }))}
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <Button size="middle" onClick={handleResetFilters} className="font-medium">
              Reset Filters
            </Button>
            <Button
              type="primary"
              size="middle"
              onClick={handleApplyFilters}
              className="bg-[#1d3557] hover:bg-[#152a47] font-medium"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
