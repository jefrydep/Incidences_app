"use client";
import { getAmbiente, sendAmbienteSelected } from "@/services/ambiente";
import { useIdeEjeStore } from "@/zustanstore";
import { useAmbienteStore } from "@/zustanstore/ambiente/ambiente.store";
import { useIdeAmbiente } from "@/zustanstore/ideAmb/ideAmb.store";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useAmbiente = () => {
  const ide_eje = useIdeEjeStore((state) => state.ide_eje);
  const incidensSelected = useAmbienteStore((state) => state.ambientes);
  const ide_amb = useIdeAmbiente((state) => state.ide_amb);
  const { data: session, status, update } = useSession();
  const [ambienteFiltered, setAmbienteFiltered] = useState(incidensSelected);
  const [busqueda, setBusqueda] = useState<string>("");
  const [dataTosend, setDataTosend] = useState([]);
  console.log(incidensSelected);

  useEffect(() => {
    setAmbienteFiltered(incidensSelected);
  }, [incidensSelected]);

  const handleAmbienteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaBusqueda = event.target.value;
    setBusqueda(nuevaBusqueda);

    const datosFiltrados = incidensSelected.filter((incidencia) =>
      incidencia.des_ted.toLowerCase().includes(nuevaBusqueda.toLowerCase())
    );

    setAmbienteFiltered(datosFiltrados);
  };
  const checkedIncidences = ambienteFiltered.filter(
    (item) => item.act_ina === 1
  );
  const unCheckedIncidences = ambienteFiltered.filter(
    (item) => item.act_ina !== 1
  );

  const sendAmbientes = async () => {
    // if (token) {

    const addingIdAmb = incidensSelected.map((amb) => ({
      ...amb,
      ide_amb: ide_amb,
    }));
    const objetWithData = {
      data: addingIdAmb,
    };

    console.log(objetWithData);
    const response = await sendAmbienteSelected(objetWithData);
    const res = response.data;
    console.log(res);
    if (res) {
      Swal.fire({
        icon: "success",
        title: "Cambios Guardados",
        text: "Los cambios han sido guardados satisfactoriamente",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron guardar los cambios",
      });
    }
  };

  return {
    checkedIncidences,
    unCheckedIncidences,
    busqueda,
    handleAmbienteChange,
    sendAmbientes,
    // getIncidencesByPlatform, const incidensSelected = useAmbienteStore((state) => state.ambientes);
    // ide_amb,
  };
};

export default useAmbiente;
