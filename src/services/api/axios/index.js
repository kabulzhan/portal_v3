import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  // baseURL: "portal.starkandbau.ru:3212",
  baseURL: "http://80.78.248.55:3212",
  // baseURL: "http://nestjs-boilerplate-test.herokuapp.com/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get("auth-token");

    if (authToken) {
      config.headers.authorization = `Bearer ${authToken}`;
      // console.log('authToken авторизировались ', authToken);
      // console.log(Cookies, 'Cookies');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
