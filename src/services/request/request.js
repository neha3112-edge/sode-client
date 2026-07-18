import { API_BASE_URL } from "@/config";
import axios from "axios";
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;
import errorHandler from "./error";
import successHandler from "./success";

const request = {
  dynamicList: async ({
    entity,
    endPoint,
    options = {},
    notifyOnFailed,
    notifyOnSuccess,
  }) => {
    try {
      const response = await axios.get(`${entity}/${endPoint}`, {
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
};

export default request;
