import axios from "axios";
import cookies from "js-cookie";
import { baseDomain,} from "./impUrl";

function getToken() {
  const userID = cookies.get("token");
  if (userID) {
    return userID;
  } else {
    return null;
  }
}

// var token = getToken();

export const customHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "access-control-allow-headers":
    "Origin, X-Requested-With, content type, Authorization, Accept",
};

export const baseUrl = `${baseDomain}`;

axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

axios.defaults.baseURL = baseUrl;

axios.interceptors.request.use(
  (config) => {
    const storage = cookies.get("token");
    let auth_token = "";
    if (storage) {
      auth_token = cookies.get("token");
    }
    config.headers["Authorization"] = `Bearer ${auth_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
// axios.interceptors.response.use(
//   (response) => {
//     if (window.location.pathname === "/login") {
//       window.location.href = "/";
//     }
//     return response;
//   },
//   (error) => {
//     console.log("error", error.response);
//     console.log("url", window.location.pathname);
//     const originalRequest = error.config;
//     if (
//       error.response.status === 401 &&
//       window.location.pathname !== "/login"
//     ) {
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default axios;