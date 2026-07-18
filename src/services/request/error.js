import { message } from "antd";

const errorHandler = (error) => {
  const showError = (content) => {
    message.error({
      content,
      duration: 5,
    });
  };

  if (!navigator.onLine) {
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

  if (response?.data?.jwtExpired) {
    const auth = window.localStorage.getItem("auth");
    const logoutData = window.localStorage.getItem("isLogout");

    let isLogout = false;

    try {
      if (logoutData) {
        const parsedLogoutData = JSON.parse(logoutData);
        isLogout = parsedLogoutData?.isLogout || false;
      }
    } catch (parseError) {
      console.error("Failed to parse logout data:", parseError);
    }

    window.localStorage.removeItem("auth");
    window.localStorage.removeItem("isLogout");

    if (auth || isLogout) {
      window.location.href = "/";
    }
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
