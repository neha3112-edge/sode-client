import { API_BASE_URL } from "@/config";

async function fetchFromApi(path, options = {}, revalidate = 900) {
  try {
    const params = new URLSearchParams();
    if (options && typeof options === "object") {
      Object.entries(options).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "" && v !== "all") {
          params.append(k, Array.isArray(v) ? v.filter(Boolean).join(",") : v);
        }
      });
    }
    const query = params.toString();
    const base = API_BASE_URL.replace(/\/+$/, "");
    const url = `${base}/${path}${query ? `?${query}` : ""}`;
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export const request = {
  dynamicRead: ({ entity, endPoint = "", id = "", slug = "", options = {}, revalidate = 900 }) =>
    fetchFromApi([entity, endPoint, id || slug].filter(Boolean).join("/"), options, revalidate),

  dynamicList: ({ entity, endPoint = "v1/list", options = {}, revalidate = 900 }) =>
    fetchFromApi([entity, endPoint].filter(Boolean).join("/"), options, revalidate),

  dynamicOptions: ({ entity, endPoint = "v1/options", options = {}, revalidate = 900 }) =>
    fetchFromApi([entity, endPoint].filter(Boolean).join("/"), options, revalidate),
};

export const dynamicRead = request.dynamicRead;
export const dynamicList = request.dynamicList;
export const dynamicOptions = request.dynamicOptions;

export default request;
