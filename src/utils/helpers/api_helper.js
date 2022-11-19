import axios from "axios";
import { BASE_URL } from "../constants/global";

const urlParamsBuilder = (url, params, urlHasQueryKey) => {
  if (!params) return url;

  let urlParams = "";
  Object.keys(params).forEach((key) => (urlParams += `${key}=${params[key]}&`));
  urlParams = urlParams.slice(0, -1); // remove last & in urlParams

  return urlHasQueryKey ? url + "&" + urlParams : url + "?" + urlParams;
};

const axiosApi = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const get = (url, config = {}) =>
  axiosApi.get(url, { ...config }).then((response) => response.data);

export { urlParamsBuilder, get };
