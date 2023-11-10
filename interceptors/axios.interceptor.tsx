import axios from "axios";
import { error } from "console";
import { useState } from "react";

export const AxiosInterceptor = () => {
  console.log("iniciandos");
  axios.interceptors.response.use(
    (response) => {
      console.log("axiosinterceptor doit");
      console.log(response);
      return response;
    },
    (error) => {
      const errorMessage = error.code;

      console.log(errorMessage);
      console.log("erorreee", error);
      return Promise.reject(error);
    }
  );
};
