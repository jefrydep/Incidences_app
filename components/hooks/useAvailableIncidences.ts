"use client";
import { AvailableIncidences, Item } from "@/interface/AvailableIncidences";
import { getAvailableIncidences } from "@/services/incidencias";
import { useIdeAmbiente } from "@/zustanstore/ideAmb/ideAmb.store";
import React, { useState } from "react";

const useAvailableIncidences = (fch_ini: string, fch_fin: string) => {
  const [availableIncidences, setAvailableIncidences] = useState<Item[]>();
  const [selectedIncidence, setSelectedIncidence] = useState<Item[]>();

  const ide_amb = useIdeAmbiente((state) => state.ide_amb);
  console.log(ide_amb);

  const getAllAvailableIncidences = async () => {
    const { data } = await getAvailableIncidences(
      fch_ini,
      fch_fin,
      ide_amb,
      1,
      10
    );
    setAvailableIncidences(data.items);
    setSelectedIncidence(data.items);
    console.log(data);
  };

  return {
    getAllAvailableIncidences,
    availableIncidences,
    setAvailableIncidences,
    selectedIncidence,
    setSelectedIncidence,
  };
};

export default useAvailableIncidences;
