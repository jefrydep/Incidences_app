import React, { useState } from "react";
import CustomMolal from "../customUI/CustomModal";
import { MdCancel } from "react-icons/md";
import { Meta } from "@/interface/AvailableIncidences";
import MapAndTable from "./MapAndTable";
import { getAvailableIncidences } from "@/services/incidencias";
interface NewIncidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  getLastPage: () => void;
  getNexPage: () => void;
  getPreviusPage: () => void;
  getStartPage: () => void;
  // getAvailableIncidences: () => void;
  statsIncidences: Meta;
  fch_ini: string;
  fch_fin: string;
  startTime: string;
  endTime: string;
}
const NewIncidenceModal = ({
  isOpen,
  onClose,
  getLastPage,
  getNexPage,
  getPreviusPage,
  getStartPage,

  statsIncidences,
  fch_ini,
  fch_fin,
  startTime,
  endTime,
}: // getAvailableIncidences,
NewIncidenceModalProps) => {
  return (
    <section>
      <CustomMolal isOpen={isOpen}>
        <section className="bg-white w-[88vw] px-2 rounded-lg">
          <div className="flex w-full  justify-end ">
            <div className="cursor-pointer" onClick={onClose}>
              <MdCancel
                title="Cerrar
                          "
                className="hover:text-red-400 text-red-600"
                size={45}
              />
            </div>
          </div>
          <section>
            <MapAndTable
              fch_fin={fch_fin}
              fch_ini={fch_ini}
              // getAllAvailableIncidences={getAvailableIncidences}
              startTime={startTime}
              endTime={endTime}
              getLastPage={getLastPage}
              getNexPage={getNexPage}
              getPreviusPage={getPreviusPage}
              getStartPage={getStartPage}
              statsIncidences={statsIncidences}
            />
          </section>
        </section>
      </CustomMolal>
    </section>
  );
};

export default NewIncidenceModal;
