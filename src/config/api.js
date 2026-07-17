import { env } from "./env";

const shouldUseRemoteServer = env.isProduction || env.devRemote === "remote";
export const BASE_URL = shouldUseRemoteServer
  ? env.remoteBackendServer
  : env.localBackendServer;
export const API_BASE_URL = `${BASE_URL}/api/`;
export const DOWNLOAD_BASE_URL = `${BASE_URL}/download/`;
export const ACCESS_TOKEN_NAME = env.accessTokenName;
