import { createApi } from "@reduxjs/toolkit/query/react";
import { request } from "@/services/request"; // Aapka existing request wrapper

// Axios base query wrapper jo errorHandler aur successHandler ko manage karega
const axiosBaseQuery =
  () =>
  async ({ entity, endPoint, options, notifyOnFailed, notifyOnSuccess }) => {
    try {
      const data = await request.dynamicList({
        entity,
        endPoint,
        options,
        notifyOnFailed,
        notifyOnSuccess,
      });

      // Agar server error response response.data.success = false bhej raha hai
      if (data && data.success === false) {
        return { error: data };
      }

      return { data };
    } catch (axiosError) {
      return {
        error: {
          success: false,
          message: axiosError.message || "Network Error",
        },
      };
    }
  };

export const dynamicApi = createApi({
  reducerPath: "dynamicApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["DynamicList"],
  endpoints: (builder) => ({
    getDynamicList: builder.query({
      // Arguments component se directly pass honge query function mein
      query: ({
        entity,
        endPoint,
        options = {},
        notifyOnFailed = false,
        notifyOnSuccess = false,
      }) => ({
        entity,
        endPoint,
        options,
        notifyOnFailed,
        notifyOnSuccess,
      }),
      // Response ko transform karke standardized formatting dena
      transformResponse: (response, meta, arg) => {
        if (response && response.success) {
          const serverCurrentPage =
            response.pagination?.currentPage ||
            response.pagination?.current ||
            arg.options?.page ||
            1;

          const serverTotalCount =
            response.pagination?.totalCount ||
            response.pagination?.total ||
            response.count ||
            0;

          const extra = {};
          const defaultKeys = ["success", "message", "result", "pagination"];

          Object.keys(response).forEach((key) => {
            if (!defaultKeys.includes(key)) {
              extra[key] = response[key];
            }
          });

          return {
            items: response.result || [],
            pagination: {
              current: parseInt(serverCurrentPage, 10) || 1,
              pageSize: parseInt(arg.options?.items, 10) || 500,
              total: parseInt(serverTotalCount, 10) || 0,
            },
            extra,
          };
        }
        return response;
      },
      providesTags: ["DynamicList"],
    }),
  }),
});

export const { useGetDynamicListQuery } = dynamicApi;
