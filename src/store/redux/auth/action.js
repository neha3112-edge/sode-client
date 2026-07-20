import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import errorHandler from "@/services/request/error";
import successHandler from "@/services/request/success";
import { dynamicApi } from "../dynamic/action";

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, withCredentials = false }) => {
    try {
      if (withCredentials) {
        axios.defaults.withCredentials = true;
      }
      const targetUrl = url.startsWith("http")
        ? url
        : `${API_BASE_URL.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;

      const response = await axios({
        url: targetUrl,
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
              window.localStorage.clear();
              window.localStorage.setItem("auth", JSON.stringify(syncState));
              window.localStorage.setItem("isLoggedIn", "true");
            }
          }
          return { data: { ...serverData, isOTPVerified, user: userPayload } };
        }
        return { data: serverData };
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
        withCredentials: true,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error(
            "Server logout failed, clearing local state anyway:",
            err,
          );
        } finally {
          if (typeof window !== "undefined") {
            window.localStorage.clear();
          }
          dispatch(dynamicApi.util.resetApiState());
          dispatch(authApi.util.resetApiState());
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
