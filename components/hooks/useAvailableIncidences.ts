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
import { dateToStringWithTime } from "@/utils/dateToString";
import { useIdeAmbiente } from "@/zustanstore/ideAmb/ideAmb.store";
import React, { useState } from "react";
import useIncidences from "./useIncidences";
import { useAvailableIncidencesStore } from "@/zustanstore/availableIncidences/availableIncidense.store";

const useAvailableIncidences = () => {
  const setAvailableIncidences = useAvailableIncidencesStore(
    (state) => state.setAvailableIncidences
  );
  const availableIncidences = useAvailableIncidencesStore(
    (state) => state.availableIncidences
  );
  const setSelectedIncidence = useAvailableIncidencesStore(
    (state) => state.setSelectedIncidences
  );
  const selectedIncidence = useAvailableIncidencesStore(
    (state) => state.selectedIncidence
  );

  // const [availableIncidenceFs, setAvailableIncidences] = useState<Item[]>();
  // const [selectedIncidence, setSelectedIncidence] = useState<Item[]>();
  const [paginationIncidences, setPaginationIncidence] = useState<Links>();
  const [statsIncidences, setstatsIncidences] = useState<Meta>();
  const ide_amb = useIdeAmbiente((state) => state.ide_amb);
  const currentDate = new Date();
  const startDateValue = new Date();
  startDateValue.setDate(currentDate.getDate() - 31);
  const fch_ini = dateToStringWithTime(startDateValue);
  const fch_fin = dateToStringWithTime(currentDate);
  console.log(fch_ini);
  console.log(fch_fin);

  const offset = 1;
  const limit = 9;

  const getAllAvailableIncidences = async () => {
    const { data } = await getAvailableIncidences(
      fch_ini,
      fch_fin,
      ide_amb,
      offset,
      limit
    );
    const IncidencesIsChecked = data.items.map((inc: Item) => ({
      ...inc,
      isSelected: false,
    }));

    setAvailableIncidences(IncidencesIsChecked);
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

  console.log(availableIncidences);

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
    fch_ini,
    fch_fin,
  };
};

export default useAvailableIncidences;
