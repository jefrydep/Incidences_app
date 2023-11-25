"use client";
import { DetailsIncidences } from "@/interface/AvailableIncidences";
import {
  getAvailableIncidences,
  getDetailIncidents,
  getIncidences,
  sendIncidencesSaved,
} from "@/services/incidencias";
import { useIncidenciasStore } from "@/zustanstore";
import { useAvailableIncidencesStore } from "@/zustanstore/availableIncidences/availableIncidense.store";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useIncidences = (ide_eje: number) => {
  const setDetailsByIncidence = useAvailableIncidencesStore(
    (state) => state.setDetailsByIncidence
  );

  const setIncidences = useIncidenciasStore((state) => state.setIncidencias);
  const [busqueda, setBusqueda] = useState<string>("");
  const incidences = useIncidenciasStore((state) => state.incidencias);
  const [incidencesFiltered, setIncidencesFiltered] = useState(incidences);
  // const [detailsByIncident, setDetailsByIncident] = useState<
  //   DetailsIncidences[]
  // >([]);

  useEffect(() => {
    setIncidencesFiltered(incidences);
  }, [incidences]);
  const getData = async () => {
    const response = await getIncidences(ide_eje);

    const { met_dat } = response.data;

    setIncidences(met_dat);
  };

  const handleIncidenceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const nuevaBusqueda = event.target.value;
    setBusqueda(nuevaBusqueda);

    const datosFiltrados = incidences.filter((incidencia) =>
      incidencia.des_ted.toLowerCase().includes(nuevaBusqueda.toLowerCase())
    );

    setIncidencesFiltered(datosFiltrados);
  };

  const checkedIncidences = incidencesFiltered.filter(
    (item) => item.act_ina === 1
  );
  const unCheckedIncidences = incidencesFiltered.filter(
    (item) => item.act_ina !== 1
  );

  const sendIncidents = async () => {
    // if (token) {
    const response = await sendIncidencesSaved(incidences);
    const res = response.data;
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

  const getAllDetailIncidents = async (ide_eve: number, ide_per: number) => {
    const { data } = await getDetailIncidents(ide_eve, ide_per);
    if (data) {
      setDetailsByIncidence(data);
    }

    console.log(data);
  };

  return {
    getData,
    handleIncidenceChange,
    checkedIncidences,
    unCheckedIncidences,
    sendIncidents,
    busqueda,
    getAllDetailIncidents,
    // detailsByIncident,
  };
};

export default useIncidences;
