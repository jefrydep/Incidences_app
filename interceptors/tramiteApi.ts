import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import Swal from "sweetalert2";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
export const tramiteApi = axios.create({
  baseURL: API_URL,
});
console.log(API_URL);
tramiteApi.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    // 'x-token': localStorage.getItem('token')
    // ide_bde: localStorage.getItem("ide_eje-storage"),
  };
  //   console.log(localStorage.getItem("ide_eje-storage"));

  return config;
});
tramiteApi.interceptors.response.use(
  (response) => {
    console.log("interceptor", response);
    console.log("axiosinterceptor doit");
    return response;
  },
  (error) => {
    const errorMessage = error.code;
    Swal.fire({
      icon: "error",
      text: errorMessage,
    });
    console.error(errorMessage);
    console.log("intercpetor", error);
    return Promise.reject(error);
  }
);

export default tramiteApi;
