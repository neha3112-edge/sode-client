"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";

const BreadcrumbStateContext = createContext(null);
const BreadcrumbDispatchContext = createContext(null);

export function BreadcrumbProvider({ children }) {
  const [customBreadcrumb, setCustomBreadcrumb] = useState(null);
  const pathname = usePathname();

  // Reset custom breadcrumb automatically on pathname change
  useEffect(() => {
    setCustomBreadcrumb(null);
  }, [pathname]);

  const setBreadcrumb = useCallback((data) => {
    setCustomBreadcrumb((prev) => {
      try {
        if (JSON.stringify(prev) === JSON.stringify(data)) {
          return prev;
        }
      } catch (e) {}
      return data;
    });
  }, []);

  const resetBreadcrumb = useCallback(() => {
    setCustomBreadcrumb(null);
  }, []);

  const dispatchValue = useMemo(
    () => ({
      setBreadcrumb,
      resetBreadcrumb,
    }),
    [setBreadcrumb, resetBreadcrumb]
  );

  return (
    <BreadcrumbDispatchContext.Provider value={dispatchValue}>
      <BreadcrumbStateContext.Provider value={customBreadcrumb}>
        {children}
      </BreadcrumbStateContext.Provider>
    </BreadcrumbDispatchContext.Provider>
  );
}

export function useBreadcrumbState() {
  return useContext(BreadcrumbStateContext);
}

export function useBreadcrumbDispatch() {
  return useContext(BreadcrumbDispatchContext);
}

// Backward compatibility helper
export function useBreadcrumbContext() {
  const customBreadcrumb = useContext(BreadcrumbStateContext);
  const dispatch = useContext(BreadcrumbDispatchContext);
  return useMemo(
    () => ({
      customBreadcrumb,
      setBreadcrumb: dispatch?.setBreadcrumb,
      resetBreadcrumb: dispatch?.resetBreadcrumb,
    }),
    [customBreadcrumb, dispatch]
  );
}

/**
 * Hook for pages/components to dynamically set custom breadcrumbs
 * @param {Object} options - { items: [{ label, href }], backButton: { label, href, onClick }, hidden?: boolean }
 * @param {Array} deps - dependency array for updating breadcrumbs
 */
export function useBreadcrumb(options, deps = []) {
  const dispatch = useContext(BreadcrumbDispatchContext);
  const pathname = usePathname();
  const setBreadcrumb = dispatch?.setBreadcrumb;

  const optionsRef = useRef(options);
  optionsRef.current = options;

  const optionsKey = useMemo(() => {
    try {
      return JSON.stringify(options);
    } catch {
      return "";
    }
  }, [options]);

  useEffect(() => {
    if (!setBreadcrumb || !optionsRef.current) return;
    setBreadcrumb(optionsRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setBreadcrumb, pathname, optionsKey, ...deps]);
}
