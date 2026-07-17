import { message } from "antd";

const successHandler = (
  response,
  options = {
    notifyOnSuccess: false,
    notifyOnFailed: true,
  },
) => {
  const { data, status } = response || {};

  if (data?.success === true) {
    const successText = data?.message || "Request completed successfully.";
    if (options.notifyOnSuccess) {
      message.success({
        content: successText,
        duration: 5,
      });
    }
    return data;
  }

  const errorText = data?.message || "An error occurred.";
  if (options.notifyOnFailed) {
    message.error({
      content: errorText,
      duration: 5,
    });
  }
  return data;
};

export default successHandler;
