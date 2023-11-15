import { getIncidences, sendIncidencesSaved } from "@/services/incidencias";
import { useIncidenciasStore } from "@/zustanstore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useIncidences = (ide_eje: number) => {
  const setIncidences = useIncidenciasStore((state) => state.setIncidencias);
  const [busqueda, setBusqueda] = useState<string>("");
  const incidences = useIncidenciasStore((state) => state.incidencias);
  const [incidencesFiltered, setIncidencesFiltered] = useState(incidences);

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
  return {
    getData,
    handleIncidenceChange,
    checkedIncidences,
    unCheckedIncidences,
    sendIncidents,
    busqueda,
  };
};

export default useIncidences;