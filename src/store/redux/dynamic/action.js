import { createApi } from "@reduxjs/toolkit/query/react";
import { request } from "@/services/request";

// Axios base query wrapper jo Sabhi Dynamic operations (CRUD & Options) ko handle karega
const axiosBaseQuery =
  () =>
  async ({
    method = "dynamicList",
    entity,
    endPoint,
    id,
    jsonData,
    options,
    params,
    withUpload = false,
    data: bodyData,
    notifyOnFailed,
    notifyOnSuccess,
  }) => {
    try {
      let resData;
      switch (method) {
        case "dynamicCreate":
          resData = await request.dynamicCreate({
            entity,
            endPoint,
            jsonData,
            withUpload,
            notifyOnFailed,
            notifyOnSuccess,
          });
          break;

        case "uploadDynamic":
          resData = await request.uploadMedia({
            formData: jsonData || bodyData,
            notifyOnFailed,
            notifyOnSuccess,
          });
          break;

        case "dynamicRead":
          resData = await request.dynamicRead({
            entity,
            endPoint,
            id,
            options,
            notifyOnFailed,
            notifyOnSuccess,
          });
          break;

        case "dynamicOptions":
          resData = await request.dynamicOptions({
            entity,
            endPoint,
            options,
            notifyOnFailed,
            notifyOnSuccess,
          });
          break;

        case "dynamicUpdate":
          resData = await request.dynamicUpdate({
            entity,
            endPoint,
            id,
            jsonData,
            params,
            withUpload,
            notifyOnFailed,
            notifyOnSuccess,
          });
          break;

        case "dynamicDelete":
          resData = await request.dynamicDelete({
            entity,
            endPoint,
            id,
            params,
            data: bodyData,
            notifyOnFailed,
            notifyOnSuccess,
          });
          break;

        case "dynamicList":
        default:
          resData = await request.dynamicList({
            entity,
            endPoint,
            options,
            notifyOnFailed,
            notifyOnSuccess,
          });
          break;
      }

      if (resData && resData.success === false) {
        return { error: resData };
      }

      return { data: resData };
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
      query: ({
        entity,
        endPoint,
        options = {},
        notifyOnFailed = false,
        notifyOnSuccess = false,
      }) => ({
        method: "dynamicList",
        entity,
        endPoint,
        options,
        notifyOnFailed,
        notifyOnSuccess,
      }),
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

    getDynamicRead: builder.query({
      query: ({
        entity,
        endPoint,
        id,
        options = {},
        notifyOnFailed = false,
        notifyOnSuccess = false,
      }) => ({
        method: "dynamicRead",
        entity,
        endPoint,
        id,
        options,
        notifyOnFailed,
        notifyOnSuccess,
      }),
      providesTags: ["DynamicList"],
    }),

    getDynamicOptions: builder.query({
      query: ({
        entity,
        endPoint = "options",
        options = {},
        notifyOnFailed = false,
        notifyOnSuccess = false,
      }) => ({
        method: "dynamicOptions",
        entity,
        endPoint,
        options,
        notifyOnFailed,
        notifyOnSuccess,
      }),
      transformResponse: (response) => {
        if (response && response.success) {
          return response.result || [];
        }
        return response;
      },
      providesTags: ["DynamicList"],
    }),

    createDynamic: builder.mutation({
      query: ({
        entity,
        endPoint = "",
        jsonData,
        withUpload = false,
        notifyOnFailed = true,
        notifyOnSuccess = true,
      }) => ({
        method: "dynamicCreate",
        entity,
        endPoint,
        jsonData,
        withUpload,
        notifyOnFailed,
        notifyOnSuccess,
      }),
      invalidatesTags: ["DynamicList"],
    }),

    updateDynamic: builder.mutation({
      query: ({
        entity,
        endPoint = "",
        id,
        jsonData,
        params = {},
        withUpload = false,
        notifyOnFailed = true,
        notifyOnSuccess = true,
      }) => ({
        method: "dynamicUpdate",
        entity,
        endPoint,
        id,
        jsonData,
        params,
        withUpload,
        notifyOnFailed,
        notifyOnSuccess,
      }),
      invalidatesTags: ["DynamicList"],
    }),

    deleteDynamic: builder.mutation({
      query: ({
        entity,
        endPoint = "",
        id,
        params = {},
        data = {},
        notifyOnFailed = true,
        notifyOnSuccess = true,
      }) => ({
        method: "dynamicDelete",
        entity,
        endPoint,
        id,
        params,
        data,
        notifyOnFailed,
        notifyOnSuccess,
      }),
      invalidatesTags: ["DynamicList"],
    }),

    uploadDynamic: builder.mutation({
      query: ({
        formData,
        notifyOnFailed = true,
        notifyOnSuccess = true,
      }) => ({
        method: "uploadDynamic",
        jsonData: formData,
        notifyOnFailed,
        notifyOnSuccess,
      }),
      invalidatesTags: ["DynamicList"],
    }),
  }),
});

export const {
  useGetDynamicListQuery,
  useGetDynamicReadQuery,
  useGetDynamicOptionsQuery,
  useCreateDynamicMutation,
  useUpdateDynamicMutation,
  useDeleteDynamicMutation,
  useUploadDynamicMutation,
} = dynamicApi;
