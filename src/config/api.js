import { env } from "./env";

const isClient = typeof window !== "undefined";
const shouldUseRemoteServer = env.isProduction || env.devRemote === "remote";
export const BASE_URL = isClient
  ? ""
  : (shouldUseRemoteServer ? env.remoteBackendServer : env.localBackendServer);
export const API_BASE_URL = isClient ? "/api/" : `${BASE_URL}/api/`;
export const DOWNLOAD_BASE_URL = isClient ? "/download/" : `${BASE_URL}/download/`;
export const ACCESS_TOKEN_NAME = env.accessTokenName;
