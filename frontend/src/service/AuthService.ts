import axios from "axios";

const AUTH_REST_API_URL = "http://localhost:8080/api/auth";
const AUTH_REST_API_URL_USER = "http://localhost:8080/api/user/profile";
export const RegisterApi = (data: any) =>
  axios.post(AUTH_REST_API_URL + "/register", data);

export const LoginApi = (email: string, password: string) =>
  axios.post(AUTH_REST_API_URL + "/login", { email, password });

export const findUserByEmail = (email: string | null) =>
  axios.get(AUTH_REST_API_URL_USER + "?email=" + email);

export const findUserById = (id: number) =>
  axios.get(AUTH_REST_API_URL_USER + "/" + id);

export const updateUserDetails = (id: number, data: any) =>
  axios.put(AUTH_REST_API_URL_USER + "/" + id, data);



export const storeToken = (token: any) =>
  localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (username: string, role: string) => {
  localStorage.setItem("authenticatedUser", username);
  localStorage.setItem("role", role);
};


export const isAdminUser = () => {
  const role = localStorage.getItem("role");

  if (role != null && role === "ROLE_ADMIN") {
    return true;
  } else {
    return false;
  }
};


export const isUserLoggedIn = () => {
  const username = localStorage.getItem("authenticatedUser");
  if (username == null) {
    return false;
  } else {
    return true;
  }
};

export const getLoggedInUser = () => {
  return localStorage.getItem("authenticatedUser");
};

export const logout = () => {
  localStorage.clear();
};






