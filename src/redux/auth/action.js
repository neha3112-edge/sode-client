import { createApi } from "@reduxjs/toolkit/query/react";
import { message } from "antd";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import errorHandler from "@/request/error";
import successHandler from "@/request/success";

/* =========================================================
   RTK QUERY AXIOS BASE QUERY WRAPPER
========================================================= */
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

/* =========================================================
   AUTH RTK QUERY API SLICE
========================================================= */
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const mutableLoginData = { ...args.loginData };
        const result = await baseQuery({
          url: "auth/login",
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
            window.localStorage.setItem("auth", JSON.stringify(syncState));
            window.localStorage.setItem("isLoggedIn", "true");
            message.success("Logged in successfully!");
          }
          return { data: { ...serverData, isOTPVerified, user: userPayload } };
        }
        return { data: serverData };
      },
    }),

    verifyOTP: builder.mutation({
      query: (args) => ({
        url: "verify-otp",
        method: "POST",
        data: args.otpData,
      }),
      transformResponse: (response) => {
        if (response?.success) {
          const syncState = {
            current: {
              ...response.result.user,
              token: response.result.accessToken,
            },
            isLoggedIn: true,
            isOTPVerified: true,
          };
          window.localStorage.setItem("auth", JSON.stringify(syncState));
          window.localStorage.setItem("isLoggedIn", "true");
          message.success("OTP verified successfully!");
          return syncState;
        }
        return response;
      },
    }),

    register: builder.mutation({
      query: (args) => ({
        url: "register",
        method: "POST",
        data: args.registerData,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ id, jsonData }) => ({
        url: `auth/resetpassword/${id}`,
        method: "PUT",
        data: {
          newPassword: jsonData.newPassword,
          confirmPassword: jsonData.confirmPassword,
        },
      }),
    }),

    logout: builder.mutation({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: "auth/logout",
          method: "POST",
          withCredentials: true,
        });
        window.localStorage.removeItem("isLoggedIn");
        window.localStorage.removeItem("auth");
        message.info("Logged out successfully.");
        return result;
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyOTPMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApi;
