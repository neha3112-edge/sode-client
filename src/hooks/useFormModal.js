"use client";

import { useCallback } from "react";

/**
 * Lightweight hook to open/close Lead Capture Form Modal across the website
 */
export function useFormModal() {
  const openFormModal = useCallback((payload = {}) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("sode:open-form-modal", { detail: payload })
      );
    }
  }, []);
  const closeFormModal = useCallback(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sode:close-form-modal"));
    }
  }, []);

  return {
    openFormModal,
    closeFormModal,
    isOpen: false,
    openModal: openFormModal,
    closeModal: closeFormModal,
  };
}

export const useAppDrawer = useFormModal;
export default useFormModal;
