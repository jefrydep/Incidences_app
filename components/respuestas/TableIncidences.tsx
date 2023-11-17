"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useIncidenciasStore } from "@/zustanstore";
import Swal from "sweetalert2";
import { useAmbienteStore } from "@/zustanstore/ambiente/ambiente.store";

interface IncidencesProps {
  incidencia: string;
  isChecked: boolean | number | null;
  ideTed: number;
  ambiente?: boolean;
}
const TableIncidences = ({
  incidencia,
  isChecked,
  ideTed,
  ambiente,
}: IncidencesProps) => {
  const updateActIna = useIncidenciasStore((state) => state.updateActIna);
  const updateAmbienteChecked = useAmbienteStore(
    (state) => state.updateAmbienteCheck
  );
  const [isCheckedVAlue, setIsCheckedValue] = useState(
    isChecked === null || isChecked === 0 ? false : true
  );

  const handleCheckboxChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: `¿Quieres cambiar el estado de estado de ${incidencia}?`,
      text: "¿Estás seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#333a9a",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si!, Cambiar!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const newActInaValue = isChecked === 1 ? 0 : 1;
      if (ambiente) {
        updateAmbienteChecked(ideTed, newActInaValue);
      } else {
        updateActIna(ideTed, newActInaValue);
      }
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsCheckedValue(isChecked === null || isChecked === 0 ? false : true);
    }
  }, [isChecked]);

  return (
    <div className="grid grid-cols-2 items-center px-3   border overflow-hidden ">
      {/* <div className="    ">{incidencia}</div> */}

      <input
        className=" "
        type="checkbox"
        checked={isCheckedVAlue}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default TableIncidences;
