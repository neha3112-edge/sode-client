"use client";

import React, { createContext, useContext, useState, useMemo, useSyncExternalStore } from "react";
import { messageService } from "@/services/request/messageService";

export const CompareContext = createContext(null);

const LISTENERS = new Set();
function subscribe(listener) {
  LISTENERS.add(listener);
  return () => LISTENERS.delete(listener);
}

function getSnapshot() {
  if (typeof window === "undefined") return "[]";
  try {
    return localStorage.getItem("sode_compare_universities") || "[]";
  } catch (e) {
    return "[]";
  }
}

function getServerSnapshot() {
  return "[]";
}

export function CompareProvider({ children }) {
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);

  const rawSaved = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const compareList = useMemo(() => {
    try {
      return JSON.parse(rawSaved);
    } catch (e) {
      return [];
    }
  }, [rawSaved]);

  // Sync state to localStorage
  const updateCompareList = (newList) => {
    try {
      localStorage.setItem("sode_compare_universities", JSON.stringify(newList));
    } catch (e) {
      console.error("Failed to save compare bucket:", e);
    }
    LISTENERS.forEach((l) => l());
  };

  const isInCompare = (identifier) => {
    if (!identifier) return false;
    const target = String(identifier).toLowerCase().trim();
    return compareList.some((item) => {
      const keys = [item.slug, item.id, item._id, item.title, item.name, item.uniSlug].filter(Boolean);
      return keys.some((k) => String(k).toLowerCase().trim() === target);
    });
  };

  const addToCompare = (item) => {
    if (!item) return;

    const id = item._id || item.id || item.slug;
    const slug = item.slug || id;

    if (isInCompare(slug) || isInCompare(id)) {
      return;
    }

    if (compareList.length >= 4) {
      messageService.message.warning("You can compare up to 4 items at a time!");
      return;
    }

    const uniObj = item.university || item;
    const uniName = typeof uniObj === "object" ? (uniObj?.name || item.uniName) : (item.uniName || "University");
    const uniSlug = typeof uniObj === "object" ? (uniObj?.slug || item.uniSlug) : (item.uniSlug || "");

    const rawLogo =
      uniObj?.logoSrc?.url ||
      uniObj?.logoSrc ||
      uniObj?.logoUrl ||
      item.logoUrl ||
      item.logo;

    const newItem = {
      _id: String(id),
      id: String(id),
      slug: slug,
      title: item.title || item.name || `${uniName} Program`,
      name: item.name || item.title || uniName,
      uniName: uniName,
      uniSlug: uniSlug,
      logoSrc: rawLogo,
      logoUrl: rawLogo,
      universityType: uniObj?.universityType || uniObj?.type || item.universityType || "Private",
      locationStr: uniObj?.locationStr || uniObj?.location || item.locationStr || "India",
      establishedYearStr: uniObj?.establishedYearStr || item.establishedYearStr || "2009",
      ratingNum: uniObj?.ratingNum || uniObj?.rating || item.ratingNum || 4.5,
      nirfRankingStr: uniObj?.nirfRankingStr || item.nirfRankingStr || "32",
      avgPlacementPackageStr: uniObj?.avgPlacementPackageStr || item.avgPlacementPackageStr || "5 LPA",
      placementAssistanceStr: uniObj?.placementAssistanceStr || item.placementAssistanceStr || "YES",
      emiAvailableStr: uniObj?.emiAvailableStr || item.emiAvailableStr || "YES",
      scholarshipAvailableStr: uniObj?.scholarshipAvailableStr || item.scholarshipAvailableStr || "YES",
      educationModeStr: uniObj?.educationModeStr || item.educationModeStr || "Online",
      examModeStr: uniObj?.examModeStr || item.examModeStr || "Online",
      approvalsStr: uniObj?.approvalsStr || item.approvalsStr || "AICTE, AIU, NAAC A+, NAAC A++, UGC",
      keyAdvantages: Array.isArray(uniObj?.keyAdvantages)
        ? uniObj.keyAdvantages
        : (Array.isArray(item.keyAdvantages) ? item.keyAdvantages : []),
      feeText: item.feeText || (item.fee?.title ? item.fee.title : "Fees on Request"),
      durationText: item.durationText || (item.duration?.title ? item.duration.title : "Flexible"),
      accreditation: item.accreditation || uniObj?.approvalsStr || "UGC, DEB, NAAC A+ Approved",
      programObj: item,
    };

    const updated = [...compareList, newItem];
    updateCompareList(updated);
    messageService.message.success(`Added "${newItem.title}" to compare!`);
  };

  const removeFromCompare = (identifier) => {
    if (!identifier) return;
    const target = String(identifier).toLowerCase().trim();
    const updated = compareList.filter((item) => {
      const keys = [item.slug, item.id, item._id, item.title, item.name, item.uniSlug].filter(Boolean);
      return !keys.some((k) => String(k).toLowerCase().trim() === target);
    });
    updateCompareList(updated);
  };

  const toggleCompare = (item) => {
    if (!item) return;
    const id = item._id || item.id || item.slug;
    if (isInCompare(id) || isInCompare(item.slug)) {
      removeFromCompare(id || item.slug);
    } else {
      addToCompare(item);
    }
  };

  const clearCompare = () => {
    updateCompareList([]);
  };

  const [compareVersion, setCompareVersion] = useState(0);

  const triggerExecuteCompare = () => {
    setCompareVersion((prev) => prev + 1);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        isInCompare,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        clearCompare,
        isCompareDrawerOpen,
        setIsCompareDrawerOpen,
        compareVersion,
        triggerExecuteCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}

export default CompareProvider;
