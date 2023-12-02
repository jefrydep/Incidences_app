"use client";
import {
  getAnswerCorrelative,
  getAnswerCorrelative2,
  getAnswerCorrelative3,
} from "@/services/ambiente";
import { useIdeEjeStore } from "@/zustanstore";
import { useIdeAmbiente } from "@/zustanstore/ideAmb/ideAmb.store";
import React, { useState } from "react";
import qs from "qs";
import { sendGroupIncidences } from "@/services/incidencias";
import { useAvailableIncidencesStore } from "@/zustanstore/availableIncidences/availableIncidense.store";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const useGroupIncidence = () => {
  const ambiente = useIdeAmbiente((state) => state.ambiente);
  const ide_eje = useIdeEjeStore((state) => state.ide_eje);
  const router = useRouter();
  // const [ide_trb, setide_trb] = useState(ambiente[0].ide_trb);
  const [correlatives, setCorrelatives] = useState({
    nro_ate: "",
    nro_trb: "",
    nro_amb: "",
  });
  const [checkedToSend, setCheckedToSend] = useState([]);
  const selectedCheckedIncidences = useAvailableIncidencesStore(
    (state) => state.selectedCheckedIncidence
  );

  // console.log(selectedCheckedIncidences);
  // console.log(ambiente);
  const queryObjet1 = [
    { key: "ide_eje", value: String(ide_eje) },
    { key: "ano_eje", value: "2023" },
  ];
  const queryObjet2 = [
    { key: "ide_eje", value: String(ide_eje) },
    {
      key: "ano_eje",
      value: String(ambiente && ambiente[0] && ambiente[0].ano_eje),
    },
    {
      key: "ide_trb",
      value: String(ambiente && ambiente[0] && ambiente[0].ide_trb),
    },
  ];
  const queryObjet3 = [
    {
      key: "ide_eje",
      value: String(ide_eje),
    },
    {
      key: "ano_eje",
      value: String(ambiente && ambiente[0] && ambiente[0].ano_eje),
    },
    {
      key: "ide_amb",
      value: String(ambiente && ambiente[0] && ambiente[0].ide_amb),
    },
  ];
  // const queryObjet1 = {
  //   key: "ide_eje",
  //   value: ide_eje,
  // };

  // const queryObjet2 = {
  //   key: "ano_eje",
  //   value: ambiente[0].ano_eje,
  // };
  // // segunda peticion
  // const queryObjet3 = {
  //   key: "ide_eje",
  //   value: ide_eje,
  // };
  // const queryObjet4 = {
  //   key: "ano_eje",
  //   value: ambiente[0].ano_eje,
  // };
  // const queryObjet5 = {
  //   key: "ide_trb",
  //   value: ambiente[0].ide_trb,
  // };
  // // tercera peticion
  // const queryObjet6 = {
  //   key: "ide_eje",
  //   value: ide_eje,
  // };
  // const queryObjet7 = {
  //   key: "ano_eje",
  //   value: ambiente[0].ano_eje,
  // };
  // const queryObjet8 = {
  //   key: "ide_amb",
  //   value: ambiente[0].ide_amb,
  // };

  // const arrQueryObjet1 = encodeURIComponent(JSON.stringify(queryObjet1));
  // const arrQueryObjet2 = encodeURIComponent(JSON.stringify(queryObjet2));
  // const arrQueryObjet3 = encodeURIComponent(JSON.stringify(queryObjet3));
  // const arrQueryObjet4 = encodeURIComponent(JSON.stringify(queryObjet4));
  // const arrQueryObjet5 = encodeURIComponent(JSON.stringify(queryObjet5));
  // const arrQueryObjet6 = encodeURIComponent(JSON.stringify(queryObjet6));
  // const arrQueryObjet7 = encodeURIComponent(JSON.stringify(queryObjet7));
  // const arrQueryObjet8 = encodeURIComponent(JSON.stringify(queryObjet8));

  // const objeto = [arrQueryObjet1, arrQueryObjet2];
  // const objet1 = [arrQueryObjet3, arrQueryObjet4, arrQueryObjet5];
  // const objet2 = [arrQueryObjet6, arrQueryObjet7, arrQueryObjet8];

  // const queryParams = objeto.map((d) => `arr_par=${d}`).join("&");
  // const queryParams1 = objet1.map((d) => `arr_par=${d}`).join("&");
  // const queryParams2 = objet2.map((d) => `arr_par=${d}`).join("&");
  const params1 = `'${JSON.stringify(queryObjet1)}'`;
  const params2 = `'${JSON.stringify(queryObjet2)}'`;
  const params3 = `'${JSON.stringify(queryObjet3)}'`;
  // console.log(params1);
  // console.log(params2);
  // console.log(params3);
  const getAnswerCorrelatives = async () => {
    const [response, response1, response2] = await Promise.all([
      getAnswerCorrelative(params1),
      getAnswerCorrelative2(params2),
      getAnswerCorrelative3(params3),
    ]);

    const data = response.data;
    const data1 = response1.data;
    const data2 = response2.data;
    // const { data } = await getAnswerCorrelative(params1);

    // const { data: data1 } = await getAnswerCorrelative2(params2);
    // const { data: data2 } = await getAnswerCorrelative3(params3);

    if (data && data1 && data2) {
      setCorrelatives({
        nro_ate: data.nro_ate,
        nro_trb: data1.nro_trb,
        nro_amb: data2.nro_amb,
      });
    }
    // console.log(data1);
    // console.log(data2);
    // console.log(data);
  };

  interface GroupValues {
    ide_eje: number;
    ide_trb: number;
    ide_amb: number;
    fch_hra: string;
    gls_agr: string;
    ano_eje: string;
    nro_ate: string;
    nro_trb: string;
    nro_amb: string;
    flg_anu: number;
    amb_des: null;
    flg_cer: number;
  }

  const onSubmitGroupIncidences = async (values: GroupValues) => {
    const filterCheckedIncidences = selectedCheckedIncidences.map((inc) => ({
      ide_e_a: 0,
      ide_eve: inc.ide_eve,
    }));
    // console.log(filterCheckedIncidences);
    const dataToSend = { ...values, arr_agru_det: filterCheckedIncidences };
    // console.log(dataToSend);

    const { data, status } = await sendGroupIncidences(dataToSend);
    console.log(status);
    if (status === 201) {
      Swal.fire({
        icon: "success",
        title: "Incidencias Acogidas",
        text: "Las incidencias seleccionadas han sido acogidas satisfactoriamente",
      });
      // router.refresh();

      window.location.reload();
      // router.push(`/dashboard/reportes`);
    }
    // console.log(data);
  };
  return {
    getAnswerCorrelatives,
    correlatives,
    onSubmitGroupIncidences,
  };
};

export default useGroupIncidence;
