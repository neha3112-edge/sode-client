// app/storeProvider.js ya src/app/storeProvider.js (Jahan aapki layout file hai)
"use client";

import { Provider } from "react-redux";
import { store } from "@/store/redux/store";

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
