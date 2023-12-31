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
import {
  dateToString,
  dateToStringWithTime,
  getStartTime,
} from "@/utils/dateToString";
import { useIdeAmbiente } from "@/zustanstore/ideAmb/ideAmb.store";
import { useState } from "react";
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
  const currentDateFormated = dateToString(currentDate);
  // const fch_ini = dateToStringWithTime(startDateValue);
  const fch_ini = dateToString(startDateValue);
  const fch_fin = dateToString(currentDate);
  // const fch_fin = dateToStringWithTime(currentDate);
  const currentTime = dateToStringWithTime(currentDate, true);

  const startTimeCero = getStartTime(currentDate);
  const startTime = startTimeCero;
  const endTime = currentTime;

  // console.log(currentTime);
  // console.log(fch_ini);
  // console.log(fch_fin);

  const offset = 1;
  const limit = 10;

  interface FormValuesIncidence {
    fch_ini: string;
    fch_fin: string;
    startTime: string;
    endTime: string;
    // currentTime: string;
  }
  const getAllAvailableIncidences = async ({
    fch_fin,
    fch_ini,
    startTime,
    endTime,
  }: // currentTime,
  FormValuesIncidence) => {
    const { data } = await getAvailableIncidences(
      fch_ini,
      fch_fin,
      startTime,
      endTime,
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
  };
  // no0ta pasar incidencias checked a toas las funciones paginadas
  const getPreviusPage = async () => {
    const prev = paginationIncidences?.previous;
    const { data } = await tramiteApi.get(
      `/${prev}&fch_ini=${`${fch_ini} ${startTime}`}&fch_fin=${`${fch_fin} ${endTime}`}&ide_amb=${ide_amb}`
    );
    const IncidencesIsChecked = data.items.map((inc: Item) => ({
      ...inc,
      isSelected: false,
    }));
    // console.log(data);
    if (data) {
      setAvailableIncidences(IncidencesIsChecked);
      setSelectedIncidence(data.items);
      setPaginationIncidence(data.links);
      setstatsIncidences(data.meta);
    }
  };
  const getNexPage = async () => {
    const next = paginationIncidences?.next;
    const { data } = await tramiteApi.get(
      `/${next}&fch_ini=${`${fch_ini} ${startTime}`}&fch_fin=${`${fch_fin} ${endTime}`}&ide_amb=${ide_amb}`
    );
    console.log(data);
    const IncidencesIsChecked = data.items.map((inc: Item) => ({
      ...inc,
      isSelected: false,
    }));
    if (data) {
      setAvailableIncidences(IncidencesIsChecked);
      setSelectedIncidence(data.items);
      setPaginationIncidence(data.links);
      setstatsIncidences(data.meta);
    }
  };
  const getLastPage = async () => {
    const last = paginationIncidences?.last;
    const { data } = await tramiteApi.get(
      `/${last}&fch_ini=${`${fch_ini} ${startTime}`}&fch_fin=${`${fch_fin} ${endTime}`}&ide_amb=${ide_amb}`
    );
    const IncidencesIsChecked = data.items.map((inc: Item) => ({
      ...inc,
      isSelected: false,
    }));
    if (data) {
      setAvailableIncidences(IncidencesIsChecked);
      setSelectedIncidence(data.items);
      setPaginationIncidence(data.links);
      setstatsIncidences(data.meta);
    }
  };
  const getStartPage = async () => {
    const start = paginationIncidences?.first;
    const { data } = await tramiteApi.get(
      `/${start}&fch_ini=${`${fch_ini} ${startTime}`}&fch_fin=${`${fch_fin} ${endTime}`}&ide_amb=${ide_amb}`
    );
    const IncidencesIsChecked = data.items.map((inc: Item) => ({
      ...inc,
      isSelected: false,
    }));
    if (data) {
      setAvailableIncidences(IncidencesIsChecked);
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
    fch_ini,
    fch_fin,
    currentDateFormated,
    // currentTime,
    startTime,
    endTime,
  };
};

export default useAvailableIncidences;
