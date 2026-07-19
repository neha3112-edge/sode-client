import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import errorHandler from "@/services/request/error";
import successHandler from "@/services/request/success";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, withCredentials = false }) => {
    try {
      if (withCredentials) {
        axios.defaults.withCredentials = true;
      }
      const response = await axios({
        url: API_BASE_URL + url,
        method,
        data,
        params,
      });

      successHandler(
        { data: response.data, status: response.status },
        { notifyOnSuccess: true, notifyOnFailed: true },
      );

      return { data: response.data };
    } catch (axiosError) {
      const errorParsed = errorHandler(axiosError);
      return { error: errorParsed };
    }
  };

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const mutableLoginData = { ...args.loginData };
        const result = await baseQuery({
          url: "user/login",
          method: "POST",
          data: mutableLoginData,
        });

        if (result.error) return { error: result.error };

        const serverData = result.data;
        if (serverData?.success) {
          const isOTPVerified = !serverData.requiresOTP;
          const userPayload = {
            ...serverData.result.user,
            token: serverData.result.accessToken,
          };

          if (isOTPVerified) {
            const syncState = {
              current: userPayload,
              isLoggedIn: true,
              isOTPVerified: true,
            };
            if (typeof window !== "undefined") {
              window.localStorage.setItem("auth", JSON.stringify(syncState));
              window.localStorage.setItem("isLoggedIn", "true");
            }
          }
          return { data: { ...serverData, isOTPVerified, user: userPayload } };
        }
        return { data: serverData };
      },
    }),

    // 🎯 FIXED & OPTIMIZED: अब लॉगआउट की पूरी जिम्मेदारी Redux Lifecycle की है
    logout: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
        withCredentials: true,
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          // API कॉल के पूरा होने का इंतज़ार करें
          await queryFulfilled;
        } catch (err) {
          console.error(
            "Server logout failed, clearing local state anyway:",
            err,
          );
        } finally {
          // 🧠 सेंट्रलाइज्ड क्लीनअप: चाहे API सक्सेस हो या फेल (सर्वर डाउन हो), लोकल स्टोरेज हमेशा साफ होगा
          if (typeof window !== "undefined") {
            window.localStorage.removeItem("isLoggedIn");
            window.localStorage.removeItem("auth");
          }
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
