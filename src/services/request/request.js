import { API_BASE_URL } from "@/config";
import axios from "axios";
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;
import errorHandler from "./error";
import successHandler from "./success";

const request = {
  dynamicCreate: async ({
    entity,
    endPoint = "",
    jsonData,
    withUpload = false,
    notifyOnSuccess = true,
    notifyOnFailed = true,
  }) => {
    try {
      const cleanEntity = String(entity || "").replace(/^\/+|\/+$/g, "");
      const cleanEndPoint = String(endPoint || "").replace(/^\/+|\/+$/g, "");
      const targetUrl = cleanEndPoint
        ? `${cleanEntity}/${cleanEndPoint}`
        : cleanEntity;

      // withUpload=true → multipart/form-data (supports File fields)
      // withUpload=false → application/json (normal data)
      const headers = withUpload
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" };

      // If withUpload and jsonData is plain object, auto-convert to FormData
      let body = jsonData;
      if (withUpload && jsonData && !(jsonData instanceof FormData)) {
        const fd = new FormData();
        Object.entries(jsonData).forEach(([key, val]) => {
          if (val !== undefined && val !== null) {
            if (Array.isArray(val)) {
              val.forEach((v) => fd.append(key, v));
            } else {
              fd.append(key, val);
            }
          }
        });
        body = fd;
      }

      const response = await axios.post(targetUrl, body, { headers });

      successHandler(response, { notifyOnSuccess, notifyOnFailed });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  uploadMedia: async ({
    formData,
    notifyOnSuccess = true,
    notifyOnFailed = true,
  }) => {
    try {
      const response = await axios.post("media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      successHandler(response, { notifyOnSuccess, notifyOnFailed });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  dynamicRead: async ({
    entity,
    endPoint = "",
    id,
    options = {},
    notifyOnSuccess = false,
    notifyOnFailed = false,
  }) => {
    try {
      const cleanEntity = String(entity || "").replace(/^\/+|\/+$/g, "");
      const cleanEndPoint = String(endPoint || "").replace(/^\/+|\/+$/g, "");

      let targetUrl = cleanEndPoint
        ? `${cleanEntity}/${cleanEndPoint}`
        : cleanEntity;
      if (id !== undefined && id !== null && id !== "") {
        targetUrl = cleanEndPoint
          ? `${cleanEntity}/${cleanEndPoint}/${id}`
          : `${cleanEntity}/${id}`;
      }

      const response = await axios.get(targetUrl, {
        params: options,
      });

      successHandler(response, {
        notifyOnSuccess,
        notifyOnFailed,
      });

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  dynamicList: async ({
    entity,
    endPoint = "",
    options = {},
    notifyOnSuccess = false,
    notifyOnFailed = false,
  }) => {
    try {
      const cleanEntity = String(entity || "").replace(/^\/+|\/+$/g, "");
      const cleanEndPoint = String(endPoint || "").replace(/^\/+|\/+$/g, "");

      const targetUrl = cleanEndPoint
        ? `${cleanEntity}/${cleanEndPoint}`
        : cleanEntity;

      const response = await axios.get(targetUrl, {
        params: options,
      });

      successHandler(response, {
        notifyOnSuccess,
        notifyOnFailed,
      });

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  dynamicOptions: async ({
    entity,
    endPoint = "options",
    options = {},
    notifyOnSuccess = false,
    notifyOnFailed = false,
  }) => {
    try {
      const cleanEntity = String(entity || "").replace(/^\/+|\/+$/g, "");
      const cleanEndPoint = String(endPoint || "").replace(/^\/+|\/+$/g, "");

      const targetUrl = cleanEndPoint
        ? `${cleanEntity}/${cleanEndPoint}`
        : `${cleanEntity}/options`;

      const response = await axios.get(targetUrl, {
        params: options,
      });

      successHandler(response, {
        notifyOnSuccess,
        notifyOnFailed,
      });

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  dynamicUpdate: async ({
    entity,
    endPoint = "",
    id,
    jsonData,
    params = {},
    withUpload = false,
    notifyOnSuccess = true,
    notifyOnFailed = true,
  }) => {
    try {
      const cleanEntity = String(entity || "").replace(/^\/+|\/+$/g, "");
      const cleanEndPoint = String(endPoint || "").replace(/^\/+|\/+$/g, "");

      if (!cleanEntity) {
        throw new Error("Entity is required for dynamicUpdate");
      }

      let targetUrl = cleanEndPoint
        ? `${cleanEntity}/${cleanEndPoint}`
        : cleanEntity;
      if (id !== undefined && id !== null && id !== "") {
        targetUrl = cleanEndPoint
          ? `${cleanEntity}/${cleanEndPoint}/${id}`
          : `${cleanEntity}/${id}`;
      }

      // withUpload=true → multipart/form-data, withUpload=false → JSON
      const headers = withUpload
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" };

      // Auto-convert plain object to FormData when withUpload=true
      let body = jsonData;
      if (withUpload && jsonData && !(jsonData instanceof FormData)) {
        const fd = new FormData();
        Object.entries(jsonData).forEach(([key, val]) => {
          if (val !== undefined && val !== null) {
            if (Array.isArray(val)) {
              val.forEach((v) => fd.append(key, v));
            } else {
              fd.append(key, val);
            }
          }
        });
        body = fd;
      }

      const response = await axios.put(targetUrl, body, { headers, params });

      successHandler(response, { notifyOnSuccess, notifyOnFailed });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  dynamicDelete: async ({
    entity,
    endPoint = "",
    id,
    params = {},
    data = {},
    notifyOnSuccess = true,
    notifyOnFailed = true,
  }) => {
    try {
      const cleanEntity = String(entity || "").replace(/^\/+|\/+$/g, "");
      const cleanEndPoint = String(endPoint || "").replace(/^\/+|\/+$/g, "");

      let targetUrl = cleanEndPoint
        ? `${cleanEntity}/${cleanEndPoint}`
        : cleanEntity;
      if (id !== undefined && id !== null && id !== "") {
        targetUrl = cleanEndPoint
          ? `${cleanEntity}/${cleanEndPoint}/${id}`
          : `${cleanEntity}/${id}`;
      }

      const response = await axios.delete(targetUrl, {
        params,
        data,
      });

      successHandler(response, {
        notifyOnSuccess,
        notifyOnFailed,
      });

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
};

export default request;
