import { useLoadingStore } from "@/zustanstore/loading/loading.store";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { getSession, useSession } from "next-auth/react";
import Swal from "sweetalert2";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
export const tramiteApi = axios.create({
  baseURL: API_URL,
});
tramiteApi.interceptors.request.use(async (config: any) => {
  // const { data: session } = await useSession();

  const session = await getSession();
  // console.log(session?.user.access_token);
  useLoadingStore.getState().showLoading();
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${session?.user.access_token}`,

    ide_dbe: 1,
  };

  return config;
});
tramiteApi.interceptors.response.use(
  (response) => {
    useLoadingStore.getState().hideLoading();
    console.log("interceptor", response);
    return response;
  },
  (error) => {
    useLoadingStore.getState().hideLoading();
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
