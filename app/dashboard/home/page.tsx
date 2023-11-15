"use client";

import ButtonIcon from "@/components/customUI/ButtonIcon";
import CustomMolal from "@/components/customUI/CustomModal";
import { columns } from "@/components/home/colums";
import CustomCard from "@/components/home/typeWork/CustomCard";
import useAmbiente from "@/components/hooks/useAmbiente";
import Loader from "@/components/loader/Loader";
import NavBar from "@/components/navbar/NavBar";
import TableIncidences from "@/components/respuestas/TableIncidences";
import TitleIncidences from "@/components/respuestas/TitleIncidences";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAmbienteStore } from "@/zustanstore/ambiente/ambiente.store";
import { useLoadingStore } from "@/zustanstore/loading/loading.store";
import { DeleteIcon, Save } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";

const HomePage = () => {
  const { data: session, status, update } = useSession();

  const incidensSelected = useAmbienteStore((state) => state.ambientes);
  console.log(incidensSelected);
  const {
    ambientes,
    busqueda,
    checkedIncidences,
    unCheckedIncidences,
    handleAmbienteChange,
    sendAmbientes,
  } = useAmbiente();
  const loading = useLoadingStore((state) => state.loading);

  // console.log(session);

  return (
    <div className="w-full overflow-y-auto h-screen   pt-20 lg:pt-0 ">
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
            onChange={handleAmbienteChange}
          />
        </div>

        <div className="grid lg:grid-cols-2 lg:h-[73vh]  lg:overflow-scroll    lg:gap-4">
          <div className="shadow-md ">
            <h4 className="text-center font-bold mb-3">Incidencias Activas</h4>
            <TitleIncidences />

            {checkedIncidences.map((incid) => (
              <TableIncidences
                ambiente={true}
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
                ambiente={true}
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
            onClick={sendAmbientes}
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

export default HomePage;
