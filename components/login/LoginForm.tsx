"use client";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button } from "../ui/button";
import { LockKeyhole, User2Icon, UserIcon } from "lucide-react";
import InputFormWithIcon from "../customUI/InputFormWithIcon";
import PasswordInput from "../customUI/InputFormSeePassword";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import useLoginForm from "../hooks/useLoginForm";
import { useIdeEjeStore } from "@/zustanstore/ideEje/ideEje.store";
import Loader from "../loader/Loader";
import axios from "axios";
import useEntieties from "../hooks/useEntieties";
const validationSchema = Yup.object().shape({
  cidusuario: Yup.string().required("Usuario es requerido"),
  ccpassword: Yup.string().required("Contraseña es requerida"),
});

interface PropsLogin {
  ide_eje: number;
}

const LoginForm = ({ ide_eje }: PropsLogin) => {
  const { onLogin, isLoadingLogin } = useLoginForm();
  const [ipClient, setIpClient] = useState<string>();
  const { entitie, getEntietieByIdEje } = useEntieties();
  useEffect(() => {
    getEntietieByIdEje();
  }, []);

  const setIdeEje = useIdeEjeStore((state) => state.setIdeEje);
  useEffect(() => {
    setIdeEje(ide_eje);
  }, [ide_eje]);
  const getIpClient = async () => {
    const api = await axios.get(`https://api.ipify.org`);
    const res = api.data;
    setIpClient(res);
    console.log(res);
  };
  useEffect(() => {
    getIpClient();
  }, []);

  const nom_eje = entitie && entitie[0].nom_eje;
  const pathImg = entitie && entitie[0]?.pat_img;
  const ruc_eje = entitie && entitie[0]?.ruc_eje;
  console.log(entitie);
  return (
    <div className="  z-50 ">
      {isLoadingLogin && <Loader />}
      <section className="border grid lg:grid-cols-2 gap-3  lg:w-[50rem]  shadow-xl  rounded-lg">
        <div className="hidden lg:block">
          <div className="w-full h-full bg-green-500 relative rounded-r-full">
            <div className="w-[90%] h-full bg-green-300     rounded-r-full ">
              <section className="bgLoginForm  px-2   py-4 flex-col  shadow-2xl lg:rounded-l-3xl">
                <h4 className="text-center mb-3 font-bold">{nom_eje}</h4>
                <div className="w-full flex justify-center">
                  {entitie && (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/ppto/ejecutora/${ide_eje}/${ide_eje}.png`}
                      alt=""
                    />
                  )}
                </div>
              </section>
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
                // i_p_equ: ipClient && ipClient,
                i_p_equ: ipClient || "192.168.1.198",
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
