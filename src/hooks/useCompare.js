"use client";

import { useSyncExternalStore, useCallback, useMemo, useState, useEffect } from "react";

const STORAGE_KEY = "sode_compare_universities";

let cachedRaw = "";
let cachedList = [];

function getSnapshot() {
  if (typeof window === "undefined") return "[]";
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || "[]";
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedList = JSON.parse(raw);
    }
    return cachedRaw;
  } catch (e) {
    return "[]";
  }
}

function getServerSnapshot() {
  return "[]";
}

function subscribe(callback) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("sode:compare-updated", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("sode:compare-updated", callback);
    window.removeEventListener("storage", callback);
  };
}

function saveListToStorage(list) {
  if (typeof window === "undefined") return;
  try {
    const raw = JSON.stringify(list);
    localStorage.setItem(STORAGE_KEY, raw);
    cachedRaw = raw;
    cachedList = list;
    window.dispatchEvent(new CustomEvent("sode:compare-updated"));
  } catch (e) {}
}

let isDrawerOpen = false;
const drawerListeners = new Set();

function getDrawerSnapshot() {
  return isDrawerOpen;
}

function subscribeDrawer(callback) {
  drawerListeners.add(callback);
  return () => drawerListeners.delete(callback);
}

function setDrawerOpen(open) {
  isDrawerOpen = typeof open === "function" ? open(isDrawerOpen) : Boolean(open);
  drawerListeners.forEach((fn) => fn());
}

export function useCompare() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isCompareDrawerOpen = useSyncExternalStore(subscribeDrawer, getDrawerSnapshot, () => false);

  const compareList = useMemo(() => {
    if (!mounted) return [];
    return cachedList;
  }, [cachedRaw, mounted]);

  const isInCompare = useCallback(
    (identifier) => {
      if (!identifier) return false;
      const targetKey = String(identifier).toLowerCase().trim();
      return (cachedList || []).some((item) => {
        const keys = [item._id, item.id, item.slug, item.name, item.title].filter(Boolean);
        return keys.some((k) => String(k).toLowerCase().trim() === targetKey);
      });
    },
    []
  );

  const addToCompare = useCallback((university) => {
    if (!university) return;
    const uniId = String(university._id || university.id || university.slug || university.name || university.title).toLowerCase();
    const current = cachedList || [];
    const exists = current.some(
      (u) => String(u._id || u.id || u.slug || u.name || u.title).toLowerCase() === uniId
    );
    if (exists) return;

    let next = [];
    if (current.length >= 3) {
      next = [...current.slice(1), university];
    } else {
      next = [...current, university];
    }
    saveListToStorage(next);
  }, []);

  const removeFromCompare = useCallback((identifier) => {
    if (!identifier) return;
    const targetKey = String(identifier).toLowerCase().trim();
    const current = cachedList || [];
    const next = current.filter((u) => {
      const keys = [u._id, u.id, u.slug, u.name, u.title].filter(Boolean);
      return !keys.some((k) => String(k).toLowerCase().trim() === targetKey);
    });
    saveListToStorage(next);
  }, []);

  const toggleCompare = useCallback(
    (item) => {
      if (!item) return;
      const key = item._id || item.id || item.slug || item.name || item.title;
      if (isInCompare(key)) {
        removeFromCompare(key);
      } else {
        addToCompare(item);
      }
    },
    [isInCompare, removeFromCompare, addToCompare]
  );

  const clearCompare = useCallback(() => {
    saveListToStorage([]);
  }, []);

  const updateCompareList = useCallback((list) => {
    saveListToStorage(list || []);
  }, []);

  return {
    compareList,
    isCompareDrawerOpen,
    setIsCompareDrawerOpen: setDrawerOpen,
    isInCompare,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    clearCompare,
    updateCompareList,
  };
}
