import axios from "axios";
import { getToken } from "./AuthService";

const AUTH_REST_API_URL = "http://localhost:8080/api/bus";

axios.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const saveBus = (data: any) => axios.post(AUTH_REST_API_URL, data);

export const getAllBus = () => axios.get(AUTH_REST_API_URL);

export const getBusById = (id: number) =>
  axios.get(AUTH_REST_API_URL + "/" + id);

export const updateBus = (id: number, data: {}) =>
  axios.put(AUTH_REST_API_URL + "/update/" + id, data);

export const deleteBus = (id: number) =>
  axios.delete(AUTH_REST_API_URL + "/delete/" + id);

export const searchBusByLocation = (
  source: string,
  destination: string,
) => axios.get(AUTH_REST_API_URL + "/search?source=" + source + "&destination=" + destination);
