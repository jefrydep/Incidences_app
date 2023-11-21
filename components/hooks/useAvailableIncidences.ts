"use client";
import StartPage from "@/app/start/page";
import tramiteApi from "@/interceptors/tramiteApi";
import {
  AvailableIncidences,
  Item,
  Links,
  Meta,
} from "@/interface/AvailableIncidences";
import { getAvailableIncidences } from "@/services/incidencias";
import { useIdeAmbiente } from "@/zustanstore/ideAmb/ideAmb.store";
import React, { useState } from "react";

const useAvailableIncidences = (
  fch_ini: string,
  fch_fin: string,
  offset: number,
  limit: number
) => {
  const [availableIncidences, setAvailableIncidences] = useState<Item[]>();
  const [selectedIncidence, setSelectedIncidence] = useState<Item[]>();
  const [paginationIncidences, setPaginationIncidence] = useState<Links>();
  const [statsIncidences, setstatsIncidences] = useState<Meta>();

  const ide_amb = useIdeAmbiente((state) => state.ide_amb);
  console.log(ide_amb);

  const getAllAvailableIncidences = async () => {
    const { data } = await getAvailableIncidences(
      fch_ini,
      fch_fin,
      ide_amb,
      offset,
      limit
    );
    setAvailableIncidences(data.items);
    setSelectedIncidence(data.items);
    setPaginationIncidence(data.links);
    setstatsIncidences(data.meta);

    console.log(data);
  };

  const getPreviusPage = async () => {
    const prev = paginationIncidences?.previous;
    const { data } = await tramiteApi.get(
      `/${prev}&fch_ini=${fch_ini}&fch_fin=${fch_fin}&ide_amb=${ide_amb}`
    );
    console.log(data);
    if (data) {
      setAvailableIncidences(data.items);
      setSelectedIncidence(data.items);
      setPaginationIncidence(data.links);
      setstatsIncidences(data.meta);
    }
  };
  const getNexPage = async () => {
    const next = paginationIncidences?.next;
    const { data } = await tramiteApi.get(
      `/${next}&fch_ini=${fch_ini}&fch_fin=${fch_fin}&ide_amb=${ide_amb}`
    );
    console.log(data);
    if (data) {
      setAvailableIncidences(data.items);
      setSelectedIncidence(data.items);
      setPaginationIncidence(data.links);
      setstatsIncidences(data.meta);
    }
  };
  const getLastPage = async () => {
    const last = paginationIncidences?.last;
    const { data } = await tramiteApi.get(
      `/${last}&fch_ini=${fch_ini}&fch_fin=${fch_fin}&ide_amb=${ide_amb}`
    );
    console.log(data);
    if (data) {
      setAvailableIncidences(data.items);
      setSelectedIncidence(data.items);
      setPaginationIncidence(data.links);
      setstatsIncidences(data.meta);
    }
  };
  const getStartPage = async () => {
    const start = paginationIncidences?.first;
    const { data } = await tramiteApi.get(
      `/${start}&fch_ini=${fch_ini}&fch_fin=${fch_fin}&ide_amb=${ide_amb}`
    );
    console.log(data);
    if (data) {
      setAvailableIncidences(data.items);
      setSelectedIncidence(data.items);
      setPaginationIncidence(data.links);
      setstatsIncidences(data.meta);
    }
  };
  return {
    getAllAvailableIncidences,
    availableIncidences,
    setAvailableIncidences,
    selectedIncidence,
    setSelectedIncidence,
    paginationIncidences,
    getLastPage,
    getNexPage,
    getPreviusPage,
    statsIncidences,
    getStartPage,
  };
};

export default useAvailableIncidences;
