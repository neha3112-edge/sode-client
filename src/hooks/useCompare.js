"use client";

import { useSyncExternalStore, useCallback, useMemo } from "react";

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
  const rawStore = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isCompareDrawerOpen = useSyncExternalStore(subscribeDrawer, getDrawerSnapshot, () => false);

  const compareList = useMemo(() => {
    try {
      return JSON.parse(rawStore);
    } catch {
      return cachedList;
    }
  }, [rawStore]);

  const isInCompare = useCallback(
    (...identifiers) => {
      const list = compareList && compareList.length > 0 ? compareList : (cachedList || []);
      if (!list || !list.length) return false;

      const flatTargets = identifiers.flat().filter(Boolean);
      if (!flatTargets.length) return false;

      const queryKeys = [];
      for (const t of flatTargets) {
        if (typeof t === "object") {
          const keys = [t._id, t.id, t.rawId, t.slug, t.uniSlug, t.name, t.uniName, t.title, t.universityName]
            .filter(Boolean)
            .map((k) => String(k).toLowerCase().trim());
          queryKeys.push(...keys);
        } else {
          queryKeys.push(String(t).toLowerCase().trim());
        }
      }

      if (!queryKeys.length) return false;

      return list.some((item) => {
        if (!item) return false;
        const itemKeys = [
          item._id,
          item.id,
          item.rawId,
          item.slug,
          item.uniSlug,
          item.name,
          item.uniName,
          item.title,
          item.universityName,
        ]
          .filter(Boolean)
          .map((k) => String(k).toLowerCase().trim());

        return queryKeys.some((qk) => itemKeys.includes(qk));
      });
    },
    [compareList]
  );

  const addToCompare = useCallback((university) => {
    if (!university) return;
    const current = cachedList || [];

    const queryKeys = (
      typeof university === "object"
        ? [
            university._id,
            university.id,
            university.rawId,
            university.slug,
            university.uniSlug,
            university.name,
            university.uniName,
            university.title,
            university.universityName,
          ]
        : [university]
    )
      .filter(Boolean)
      .map((k) => String(k).toLowerCase().trim());

    const exists = current.some((u) => {
      const keys = [u._id, u.id, u.rawId, u.slug, u.uniSlug, u.name, u.uniName, u.title, u.universityName]
        .filter(Boolean)
        .map((k) => String(k).toLowerCase().trim());
      return queryKeys.some((qk) => keys.includes(qk));
    });

    if (exists) return;

    let next = [];
    if (current.length >= 3) {
      next = [...current.slice(1), university];
    } else {
      next = [...current, university];
    }
    saveListToStorage(next);
  }, []);

  const removeFromCompare = useCallback((target) => {
    if (!target) return;
    const queryKeys = (
      typeof target === "object"
        ? [
            target._id,
            target.id,
            target.rawId,
            target.slug,
            target.uniSlug,
            target.name,
            target.uniName,
            target.title,
            target.universityName,
          ]
        : [target]
    )
      .filter(Boolean)
      .map((k) => String(k).toLowerCase().trim());

    if (!queryKeys.length) return;

    const current = cachedList || [];
    const next = current.filter((u) => {
      const keys = [u._id, u.id, u.rawId, u.slug, u.uniSlug, u.name, u.uniName, u.title, u.universityName]
        .filter(Boolean)
        .map((k) => String(k).toLowerCase().trim());
      return !queryKeys.some((qk) => keys.includes(qk));
    });
    saveListToStorage(next);
  }, []);

  const toggleCompare = useCallback(
    (item) => {
      if (!item) return;
      if (isInCompare(item)) {
        removeFromCompare(item);
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
