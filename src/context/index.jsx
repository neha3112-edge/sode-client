"use client";

import React from "react";
import { AppContextProvider as AppContextProviderBase, useAppContext } from "./app";
import { CrudContextProvider, useCrudContext } from "./crud";
import { NavContextProvider, useNavContext } from "./nav";
import { CompareProvider, useCompare } from "./compare";
import { FormModalProvider, useFormModal } from "./form-modal";

/**
 * AppContextProvider - Master Combined Context Provider for SODE Application
 * Consolidates all subfolder Context APIs under `@/context`:
 *  - `@/context/app`        -> AppContext (CMS nav menu state, sidebar collapse, app UI state)
 *  - `@/context/crud`       -> CrudContext (CMS datatable & form state)
 *  - `@/context/nav`        -> NavContext (Admin navigation state)
 *  - `@/context/compare`    -> CompareContext (University side-by-side compare bucket)
 *  - `@/context/form-modal` -> FormModalContext (Lead capture modal & counselling popup)
 */
export function AppContextProvider({ children }) {
  return (
    <AppContextProviderBase>
      <CrudContextProvider>
        <NavContextProvider>
          <FormModalProvider>
            <CompareProvider>
              {children}
            </CompareProvider>
          </FormModalProvider>
        </NavContextProvider>
      </CrudContextProvider>
    </AppContextProviderBase>
  );
}

export { AppContextProvider as AppContextProviderBase, useAppContext } from "./app";
export { CrudContextProvider, useCrudContext } from "./crud";
export { NavContextProvider, useNavContext } from "./nav";
export { CompareProvider, useCompare, CompareContext } from "./compare";
export { FormModalProvider, useFormModal, useFormModal as useAppDrawer, FormModalContext } from "./form-modal";

export default AppContextProvider;
