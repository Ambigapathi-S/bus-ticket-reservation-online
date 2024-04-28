import axios from "axios";
import { getToken } from "./AuthService";

const AUTH_REST_API_URL = "http://localhost:8080/api/booking";

axios.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const saveBooking = (data: any) =>
  axios.post(AUTH_REST_API_URL, data);

export const getAllBooking = () =>
  axios.get(AUTH_REST_API_URL);

export const getBookingById = (id:number) =>
axios.get(AUTH_REST_API_URL + "/" + id);

export const updateBooking = (id: number, data:{}) =>
  axios.put(AUTH_REST_API_URL + "/update/" + id, data);

export const deleteBooking = (id: number) =>
  axios.delete(AUTH_REST_API_URL + "/delete/" + id);

export const getBookingByUserId = (id:number) =>
  axios.get(AUTH_REST_API_URL + "/user/" + id);