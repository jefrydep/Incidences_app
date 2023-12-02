import { CompanyResponse } from "@/interface/CompanyResponse";
import { getEntitieById, getEntities } from "@/services/entities";
import { useIdeEjeStore } from "@/zustanstore";
import React, { useState } from "react";

const useEntieties = () => {
  const [entities, setEntities] = useState<CompanyResponse[]>();
  const [entitie, setEntitie] = useState<CompanyResponse[]>();
  const [companies, setCompanies] = useState<CompanyResponse[] | undefined>(
    entities
  );
  const ide_eje = useIdeEjeStore((state) => state.ide_eje);
  // const [companies, setCompanies] = useState<CompanyResponse[] | null>(data);
  const getAllEntities = async () => {
    const { data } = await getEntities();
    if (data) {
      setEntities(data);
    }
    // console.log(data);
  };
  const getEntietieByIdEje = async () => {
    const { data, status } = await getEntitieById(ide_eje);
    console.log(status);
    if (data) {
      setEntitie(data);
    }
    console.log(data);
  };

  //   const nom_eje = data && data[0].nom_eje;
  //   const pathImg = data && data[0]?.pat_img;
  //   const ruc_eje = data && data[0]?.ruc_eje;
  return {
    companies,
    entities,
    getAllEntities,
    setCompanies,
    getEntietieByIdEje,
    entitie,
  };
};

export default useEntieties;
