"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import FormWrapper from "@/components/forms/FormWrapper";

export const FormModalContext = createContext(null);

export function FormModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({});

  const openFormModal = useCallback((config = {}) => {
    setModalConfig(config);
    setIsOpen(true);
  }, []);

  const closeFormModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      openFormModal,
      closeFormModal,
      modalConfig,
    }),
    [isOpen, openFormModal, closeFormModal, modalConfig]
  );

  return (
    <FormModalContext.Provider value={value}>
      {children}
      <FormWrapper
        isModal
        isOpen={isOpen}
        onClose={closeFormModal}
        title={modalConfig.title || "Book 1:1 Counselling"}
        subtitle={
          modalConfig.subtitle ||
          "Select your course and our academic experts will assist you"
        }
        submitButtonText={modalConfig.submitButtonText || "Book Counselling"}
        isBrochureForm={Boolean(modalConfig.isBrochureForm)}
        brochureUrl={modalConfig.brochureUrl || ""}
        defaultCourse={modalConfig.defaultCourse || ""}
        formNameOverride={modalConfig.formNameOverride || ""}
        hideCourseField={Boolean(modalConfig.hideCourseField)}
        {...modalConfig}
      />
    </FormModalContext.Provider>
  );
}

export function useFormModal() {
  const context = useContext(FormModalContext);
  if (!context) {
    throw new Error("useFormModal must be used within a FormModalProvider");
  }
  return context;
}

export default FormModalProvider;
