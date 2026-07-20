import { message } from "antd";

const errorHandler = (error) => {
  const showError = (content) => {
    message.error({
      content,
      duration: 5,
    });
  };

  if (typeof window !== "undefined" && !navigator.onLine) {
    const errorMessage =
      "Cannot connect to the Internet. Check your internet connection.";

    showError(errorMessage);

    return {
      success: false,
      result: null,
      message: errorMessage,
    };
  }

  const { response } = error || {};

  if (!response) {
    const errorMessage = "Cannot connect to the server. Try again later.";

    showError(errorMessage);

    return {
      success: false,
      result: null,
      message:
        "Cannot connect to the server. Contact your account administrator.",
    };
  }

  if (
    typeof window !== "undefined" &&
    (response?.status === 401 ||
      response?.data?.jwtExpired ||
      response?.data?.tokenExpired)
  ) {
    window.localStorage.removeItem("auth");
    window.localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("isLogout");
    window.location.href = "/login";
    return {
      success: false,
      result: null,
      message: "Session expired. Please log in again.",
    };
  }

  if (response?.status) {
    const { status, data } = response;
    const errorMessage =
      data?.message || "Something went wrong. Please try again.";
    showError(`Error ${status}: ${errorMessage}`);
    return {
      success: data?.success ?? false,
      result: data?.result ?? null,
      ...data,
      message: errorMessage,
    };
  }
  const fallbackMessage = "Something went wrong. Please try again later.";
  showError(fallbackMessage);
  return {
    success: false,
    result: null,
    message: fallbackMessage,
  };
};

export default errorHandler;
