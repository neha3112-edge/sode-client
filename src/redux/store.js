import { configureStore } from "@reduxjs/toolkit";
import { dynamicApi } from "./dynamic/action";
import { authApi } from "./auth/action"; // 👈 Auth API slice import kiya

export const store = configureStore({
  reducer: {
    // Dono API services ke reducers yahan register ho gaye
    [dynamicApi.reducerPath]: dynamicApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  // Dono API slices ke caching aur stream middlewares ko sequence mein inject kiya
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(dynamicApi.middleware)
      .concat(authApi.middleware),
});
