"use client";
import NavBar from "@/components/navbar/NavBar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
// import { CSSProperties, FunctionComponent } from "react";
// import { CSSObject } from "@emotion/serialize";
import Select, { ClearIndicatorProps } from "react-select";
import tramiteApi from "@/interceptors/tramiteApi";
import { AxiosInterceptor } from "@/interceptors/axios.interceptor";
import { useSession } from "next-auth/react";
import { DataTable } from "@/components/ui/data-table";
import { columnsTable } from "@/components/respuestas/columnsTable";
import { useIdeEjeStore, useIncidenciasStore } from "@/zustanstore";
import ButtonIcon from "@/components/customUI/ButtonIcon";
import { DeleteIcon, Save, Search } from "lucide-react";
import { getIncidences, sendIncidencesSaved } from "@/services/incidencias";
import { useLoadingStore } from "@/zustanstore/loading/loading.store";
import Loader from "@/components/loader/Loader";
export interface Incidencia {
  id: number;
  descripcion: string;
  activo: boolean;
}

const AnswerPage = () => {
  const ide_eje = useIdeEjeStore((state) => state.ide_eje);
  const { data: session, status, update } = useSession();
  const token = session?.user.access_token;
  const setIncidences = useIncidenciasStore((state) => state.setIncidencias);
  const incidences = useIncidenciasStore((state) => state.incidencias);
  const loading = useLoadingStore((state) => state.loading);
  const getData = async () => {
    const response = await getIncidences(ide_eje);

    const { met_dat } = response.data;

    setIncidences(met_dat);
  };
  useEffect(() => {
    if (ide_eje !== null) {
      getData();
    }
  }, [ide_eje]);

  const sendIncidents = async () => {
    if (token) {
      const response = await sendIncidencesSaved(incidences, token);
      const res = response.data;
      console.log(res);
    }
  };
  console.log(incidences);

  return (
    <div className="w-full  h-screen   pt-20 lg:pt-0">
      <NavBar />
      {loading && <Loader />}
      <section className="p-4 ">
        {incidences && <DataTable columns={columnsTable} data={incidences} />}
        <div className="flex justify-end mr-10 gap-10">
          <ButtonIcon
            nameButton="Guardar"
            icon={<Save />}
            onClick={sendIncidents}
          />
          <ButtonIcon
            nameButton="Cancelar"
            icon={<DeleteIcon />}
            bgColor="bg-red-500"
          />
        </div>
      </section>
    </div>
  );
};

export default AnswerPage;
