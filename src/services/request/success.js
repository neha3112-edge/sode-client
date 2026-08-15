import { messageService } from "@/services/request/messageService";

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
      messageService.message.success({
        content: successText,
        duration: 5,
      });
    }
    return data;
  }

  const errorText = data?.message || "An error occurred.";
  if (options.notifyOnFailed) {
    messageService.message.error({
      content: errorText,
      duration: 5,
    });
  }
  return data;
};

export default successHandler;
