"use client";
import { TypeAmbientes } from "@/interface/Ambientes";
import { getAmbiente } from "@/services/ambiente";
import { useIdeEjeStore } from "@/zustanstore";
import { useAmbienteStore } from "@/zustanstore/ambiente/ambiente.store";
import { useIdeAmbiente } from "@/zustanstore/ideAmb/ideAmb.store";
import { Ambiente } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";

interface CardInteface {
  año: string;
  cargo: string;
  nombreDeAmbiente: string;
  siglas: string;
  ide_amb: number;
  ambiente: Ambiente[];
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
interface CarInterface {
  ambiente: Ambiente[];
}
const CustomCard = ({
  año,
  cargo,
  nombreDeAmbiente,
  siglas,
  ide_amb,
  setIsOpenModal,
  ambiente,
}: CardInteface) => {
  const ide_eje = useIdeEjeStore((state) => state.ide_eje);
  const setAmbientes = useAmbienteStore((state) => state.setAmbientes);
  const setIdeAmb = useIdeAmbiente((state) => state.setIdeAmb);
  const setAmbiente = useIdeAmbiente((state) => state.setAmbiente);
  const { data: session, status, update } = useSession();
  console.log(ambiente);
  const getIncidencesByPlatform = async () => {
    // console.log(ide_amb);
    setIsOpenModal(false);
    setIdeAmb(ide_amb);
    if (session?.user) {
      if (ide_amb) {
        const ambienteSelected = ambiente.filter(
          (amb) => amb.ide_amb === ide_amb
        );
        setAmbiente(ambienteSelected);
      }
      // setAmbiente()
      // setNomAmb(nombreDeAmbiente);

      const response = await getAmbiente(ide_eje, ide_amb);

      const res = response.data;
      if (res) {
        setAmbientes(res.met_dat);
      }
      console.log(res);
    }
  };

  return (
    <div
      onClick={getIncidencesByPlatform}
      className="rounded-xl border relative cursor-pointer hover:scale-105 shadow-lg border-sky-600  p-3 text-sm w-full"
    >
      <div className="flex justify-between border rounded-lg p-2   bg-sky-600">
        <li className=" flex text-start text-white">Nombre de ambiente</li>
        <span className="text-end">{nombreDeAmbiente}</span>
      </div>
      <div className="flex justify-between">
        <li className=" flex text-start text-blue-500">Cargo</li>
        <span className="text-end">{cargo}</span>
      </div>
      <div className="flex justify-between">
        <li className=" flex text-start text-green-500"> Año</li>
        <span className="text-end">{año}</span>
      </div>
      <div className="flex justify-between">
        <li className=" flex text-start text-teal-600">Siglas</li>
        <span className="text-end">{siglas}</span>
      </div>
      {/* <div className="bg-orange absolute top-0 left-0 rounded-r-[4rem]   bg-orange-400 w-[4rem] h-full"></div> */}
    </div>
  );
};

export default CustomCard;
