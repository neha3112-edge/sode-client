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
    const tags = options?.tags || (typeof path === "string" ? [path.split("/")[0]] : []);
    const fetchOptions = {
      next: {
        revalidate,
        tags: Array.isArray(tags) ? tags : [tags],
      },
    };
    const res = await fetch(url, fetchOptions);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

async function postToApi(path, body = {}, options = {}) {
  try {
    const base = API_BASE_URL.replace(/\/+$/, "");
    const url = `${base}/${path}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(body),
    });
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

  dynamicPost: ({ entity, endPoint = "", body = {}, options = {} }) =>
    postToApi([entity, endPoint].filter(Boolean).join("/"), body, options),
};

export const dynamicRead = request.dynamicRead;
export const dynamicList = request.dynamicList;
export const dynamicOptions = request.dynamicOptions;
export const dynamicPost = request.dynamicPost;

export default request;
