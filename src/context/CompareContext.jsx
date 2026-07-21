"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { message } from "antd";

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([]);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);

  // Load initial list from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sode_compare_universities");
      if (saved) {
        setCompareList(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load compare bucket:", e);
    }
  }, []);

  // Sync state to localStorage
  const updateCompareList = (newList) => {
    setCompareList(newList);
    try {
      localStorage.setItem("sode_compare_universities", JSON.stringify(newList));
    } catch (e) {
      console.error("Failed to save compare bucket:", e);
    }
  };

  const isInCompare = (slug) => {
    if (!slug) return false;
    return compareList.some((item) => item.slug === slug);
  };

  const addToCompare = (university) => {
    if (!university || !university.slug) return;

    if (isInCompare(university.slug)) {
      return;
    }

    if (compareList.length >= 4) {
      message.warning("You can compare up to 4 universities at a time!");
      return;
    }

    const newItem = {
      slug: university.slug,
      name: university.name || "University",
      logoSrc: university.logoSrc || null,
      location: university.location || "India / Global",
    };

    const updated = [...compareList, newItem];
    updateCompareList(updated);
  };

  const removeFromCompare = (slug) => {
    const updated = compareList.filter((item) => item.slug !== slug);
    updateCompareList(updated);
  };

  const toggleCompare = (university) => {
    if (!university || !university.slug) return;
    if (isInCompare(university.slug)) {
      removeFromCompare(university.slug);
    } else {
      addToCompare(university);
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
