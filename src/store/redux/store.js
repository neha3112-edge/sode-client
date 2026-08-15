import { configureStore } from "@reduxjs/toolkit";
import { dynamicApi } from "./dynamic/action";
import { authApi } from "./auth/action";
import crudReducer from "./crud/slice";

export const store = configureStore({
  reducer: {
    crud: crudReducer,
    [dynamicApi.reducerPath]: dynamicApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(dynamicApi.middleware)
      .concat(authApi.middleware),
});
