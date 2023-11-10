"use client";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button } from "../ui/button";
import { LockKeyhole, User2Icon, UserIcon } from "lucide-react";
import InputFormWithIcon from "../customUI/InputFormWithIcon";
import PasswordInput from "../customUI/InputFormSeePassword";
import Swal from "sweetalert2";
import React, { useEffect } from "react";
import useLoginForm from "../hooks/useLoginForm";
import { useIdeEjeStore } from "@/zustanstore/ideEje/ideEje.store";
import Loader from "../loader/Loader";
const validationSchema = Yup.object().shape({
  cidusuario: Yup.string().required("Usuario es requerido"),
  ccpassword: Yup.string().required("Contraseña es requerida"),
});

interface PropsLogin {
  ide_eje: number;
}

const LoginForm = ({ ide_eje }: PropsLogin) => {
  const { onLogin, isLoadingLogin } = useLoginForm();
  const setIdeEje = useIdeEjeStore((state) => state.setIdeEje);
  useEffect(() => {
    setIdeEje(ide_eje);
  }, [ide_eje]);

  return (
    <div className="  z-50 ">
      {isLoadingLogin && <Loader />}
      <section className="border grid lg:grid-cols-2 gap-3  lg:w-[50rem]  shadow-xl  rounded-lg">
        <div className="hidden lg:block">
          <div className="w-full h-full bg-green-500 relative rounded-r-full">
            <div className="w-[90%] h-full bg-green-300 absolute   rounded-r-full ">
              My image
            </div>
          </div>
        </div>
        <div className="p-3">
          <h4>Bienvenido Ingresa tus credenciales</h4>
          <div>
            <Formik
              initialValues={{
                cidusuario: "",
                ccpassword: "",
                login: "usuarios",
                ide_eje: ide_eje,
                ano_eje: "2023",
                ide_apl: 56,
                i_p_equ: "192.168.1.198",
              }}
              validationSchema={validationSchema}
              onSubmit={onLogin}
            >
              <Form className="flex flex-col gap-4 px-2 py-5 z-30">
                <InputFormWithIcon
                  type="text"
                  icon={<UserIcon color="green" />}
                  label="Usuario"
                  maxLength={20}
                  name="cidusuario"
                  placeholder="Ingresa tu nombre de usuario"
                />

                <PasswordInput
                  label="Contraseña"
                  icon={<LockKeyhole color="green" />}
                  name="ccpassword"
                  placeholder="Ingresa tu nueva contraseña"
                />

                <Button type="submit">Ingresar</Button>
              </Form>
            </Formik>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
