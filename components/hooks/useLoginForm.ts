"use client";
import { ValuesLogin } from "@/interface/ValuesLogin";
import { error } from "console";
import { FormikHelpers } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

const useLoginForm = () => {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const router = useRouter();
  const onLogin = async (
    {
      cidusuario,
      ccpassword,
      login,
      ide_eje,
      ano_eje,
      ide_apl,
      i_p_equ,
    }: ValuesLogin,
    actions: FormikHelpers<ValuesLogin>
  ) => {
    console.log(cidusuario, ccpassword, login, ide_eje, ano_eje, ide_apl);
    try {
      setIsLoadingLogin(true);
      const res = await signIn("credentials", {
        cidusuario,
        ccpassword,
        login,
        ide_eje,
        ano_eje,
        ide_apl,
        i_p_equ,
        redirect: false,
      });
      setIsLoadingLogin(false);
      if (res?.error) {
        let { error } = res as any;
        error = JSON.parse(error);

        Swal.fire({
          confirmButtonColor: "#01D",
          icon: "error",
          title: "Acceso no autorizado",
          text: error?.mensaje || "Credenciales incorrectas",
          confirmButtonText: "Aceptar",
        });
        console.error("Error de autenticación:", error?.mensaje);
        actions.resetForm();
        // setTimeout(() => {
        //   actions.resetForm();
        // }, 2000);
        return;
      } else if (res?.ok) {
        router.push("/dashboard/home");

        // setIsLoading(false);
      }
    } catch (error) {
      setIsLoadingLogin(false);
      console.error(error);
    }
  };

  return { onLogin, isLoadingLogin };
};

export default useLoginForm;
