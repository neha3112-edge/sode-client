import { useReducer, createContext, useMemo, useContext } from "react";
import { initialState, contextReducer } from "./ruducer"; // ⚡ स्पेलिंग './ruducer' से './reducer' कर दी
import contextActions from "./action";
import contextSelectors from "./selectors";

const CrudContext = createContext(null); // ⚡ यहाँ null पास किया

function CrudContextProvider({ children }) {
  const [state, dispatch] = useReducer(contextReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <CrudContext.Provider value={value}>{children}</CrudContext.Provider>;
}

function useCrudContext() {
  const context = useContext(CrudContext);

  // ⚡ FIXED: !context करने से undefined और null दोनों सुरक्षित तरीके से कैच हो जाएंगे
  if (!context) {
    throw new Error("useCrudContext must be used within a CrudContextProvider");
  }

  const { state, dispatch } = context;
  const crudContextAction = contextActions(dispatch);
  const crudContextSelector = contextSelectors(state);

  return {
    state,
    crudContextAction,
    crudContextSelector,
  };
}

export { CrudContextProvider, useCrudContext };
