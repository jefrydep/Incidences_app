"use client";
import NavBar from "@/components/navbar/NavBar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useIdeEjeStore, useIncidenciasStore } from "@/zustanstore";
import ButtonIcon from "@/components/customUI/ButtonIcon";
import { DeleteIcon, Save, Search } from "lucide-react";
import { getIncidences, sendIncidencesSaved } from "@/services/incidencias";
import { useLoadingStore } from "@/zustanstore/loading/loading.store";
import Loader from "@/components/loader/Loader";
import TableIncidences from "@/components/respuestas/TableIncidences";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useIncidences from "@/components/hooks/useIncidences";
import TitleIncidences from "@/components/respuestas/TitleIncidences";
export interface Incidencia {
  id: number;
  descripcion: string;
  activo: boolean;
}

const AnswerPage = () => {
  const ide_eje = useIdeEjeStore((state) => state.ide_eje);

  const {
    getData,
    checkedIncidences,
    handleIncidenceChange,
    sendIncidents,
    unCheckedIncidences,
    busqueda,
  } = useIncidences(ide_eje);
  const loading = useLoadingStore((state) => state.loading);

  useEffect(() => {
    if (ide_eje !== null) {
      getData();
    }
  }, [ide_eje]);

  return (
    <div className="w-full  h-screen   pt-20 lg:pt-0">
      <NavBar />
      {loading && <Loader />}
      <section className="p-4 ">
        <div className="mb-3 ">
          <div className="mb-2">
            <Label>Buscar Incidencia</Label>
          </div>
          <Input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={handleIncidenceChange}
          />
        </div>

        <div className="grid lg:grid-cols-2 lg:h-[73vh]  lg:overflow-scroll    lg:gap-4">
          <div className="shadow-md ">
            <h4 className="text-center font-bold mb-3">Incidencias Activas</h4>
            <TitleIncidences />

            {checkedIncidences.map((incid) => (
              <TableIncidences
                key={incid.ide_ted}
                ideTed={incid.ide_ted}
                incidencia={incid.des_ted}
                isChecked={incid.act_ina}
              />
            ))}
          </div>
          <div className="shadow-md">
            <h4 className="text-center font-bold mb-3">
              Incidencias Inactivas
            </h4>
            <TitleIncidences />
            {unCheckedIncidences.map((incid) => (
              <TableIncidences
                key={incid.ide_ted}
                ideTed={incid.ide_ted}
                incidencia={incid.des_ted}
                isChecked={incid.act_ina}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end mr-3 mt-3 gap-3">
          <ButtonIcon
            nameButton="Guardar Cambios"
            icon={<Save />}
            onClick={sendIncidents}
          />

          <Button
            variant="destructive"
            className={`flex px-2 gap-6    max-w-xs   justify-start`}
          >
            <span>
              <DeleteIcon />
            </span>
            Cancelar
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AnswerPage;
