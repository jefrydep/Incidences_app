import {
  getAnswerCorrelative,
  getAnswerCorrelative2,
  getAnswerCorrelative3,
} from "@/services/ambiente";
import { useIdeEjeStore } from "@/zustanstore";
import { useIdeAmbiente } from "@/zustanstore/ideAmb/ideAmb.store";
import React, { useState } from "react";

const useGroupIncidence = () => {
  const ambiente = useIdeAmbiente((state) => state.ambiente);
  const ide_eje = useIdeEjeStore((state) => state.ide_eje);
  const [ide_trb, setide_trb] = useState(ambiente[0].ide_trb);
  const queryObjet1 = [
    {
      key: "ide_eje",
      value: ide_eje,
    },
    {
      key: "ano_eje",
      value: ambiente[0].ano_eje,
    },
  ];
  const queryObjet2 = [
    {
      key: "ide_eje",
      value: ide_eje,
    },
    {
      key: "ano_eje",
      value: ambiente[0].ano_eje,
    },
    {
      key: "ide_trb",
      value: ambiente[0].ide_trb,
    },
  ];
  const queryObjet3 = [
    {
      key: "ide_eje",
      value: ide_eje,
    },
    {
      key: "ano_eje",
      value: ambiente[0].ano_eje,
    },
    {
      ke: "ide_amb",
      value: ambiente[0].ide_amb,
    },
  ];
  const arrQueryObjet1 = encodeURIComponent(JSON.stringify(queryObjet1));
  const arrQueryObjet2 = encodeURIComponent(JSON.stringify(queryObjet2));
  const arrQueryObjet3 = encodeURIComponent(JSON.stringify(queryObjet3));

  const getAnswerCorrelatives = async () => {
    const { data } = await getAnswerCorrelative(arrQueryObjet1);

    const { data: data1 } = await getAnswerCorrelative2(
      ide_trb,
      arrQueryObjet2
    );
    const { data: data2 } = await getAnswerCorrelative3(
      ambiente[0].ide_amb,
      arrQueryObjet3
    );
    console.log(data);
    console.log(data1);
    console.log(data2);
  };

  return {
    getAnswerCorrelatives,
  };
};

export default useGroupIncidence;
