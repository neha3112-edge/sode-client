// Bypass SSL altname mismatch for remote CRM API server in development/node runtime
if (typeof process !== "undefined" && process.env.NODE_TLS_REJECT_UNAUTHORIZED !== "0") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const requiredPublicEnv = {
  appName: process.env.NEXT_PUBLIC_APP_NAME,
  devRemote: process.env.NEXT_PUBLIC_DEV_REMOTE,
  localBackendServer: process.env.NEXT_PUBLIC_LOCAL_BACKEND_SERVER,
  remoteBackendServer: process.env.NEXT_PUBLIC_REMOTE_BACKEND_SERVER,
  accessTokenName: process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME,
};

function removeTrailingSlash(value = "") {
  return String(value).replace(/\/+$/, "");
}

function validateEnvironment() {
  const missingVariables = Object.entries(requiredPublicEnv)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing public environment variables: ${missingVariables.join(", ")}`,
    );
  }
}

validateEnvironment();

export const env = {
  appName: requiredPublicEnv.appName,
  devRemote: requiredPublicEnv.devRemote,
  localBackendServer: removeTrailingSlash(requiredPublicEnv.localBackendServer),
  remoteBackendServer: removeTrailingSlash(
    requiredPublicEnv.remoteBackendServer,
  ),
  accessTokenName: requiredPublicEnv.accessTokenName,
  isProduction: process.env.NODE_ENV === "production",
};
