"use client";
import NavBar from "@/components/navbar/NavBar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
// import { CSSProperties, FunctionComponent } from "react";
// import { CSSObject } from "@emotion/serialize";
import Select, { ClearIndicatorProps } from "react-select";
import tramiteApi from "@/interceptors/tramiteApi";
import { AxiosInterceptor } from "@/interceptors/axios.interceptor";
import { useIdeEjeStore } from "@/zustanstore/ideEje/ideEje.store";
import { useSession } from "next-auth/react";
import { DataTable } from "@/components/ui/data-table";
import { columnsTable } from "@/components/respuestas/columnsTable";
export interface Incidencia {
  id: number;
  descripcion: string;
  activo: boolean;
}

const AnswerPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  1;
  const arrayDeIncidencias: Incidencia[] = [
    { id: 1, descripcion: "Problema de red", activo: false },
    { id: 2, descripcion: "Error de servidor", activo: false },
    { id: 3, descripcion: "Problema de seguridad", activo: false },
    { id: 4, descripcion: "Error de aplicación", activo: false },
  ];
  const [reportes, setReportes] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  // const ide_eje = useIdeEjeStore((state) => state.ide_eje);
  const ide_eje = useIdeEjeStore((state) => state.ide_eje);
  const { data: session, status, update } = useSession();
  const [incidentsToSend, setIncidentsToSend] = useState([]);
  const getData = async () => {
    const response = await tramiteApi.get(
      `/smart/funciones/fn_obt_ejecutora_tip_inc?ide_eje=${ide_eje}`
    );
    // const response = await axios.get(`${API_URL}/smart/tip-ent-det?act_ina=1`);
    const { met_dat } = response.data;
    // const resSelect = met_dat.map((rep: any) => ({
    //   ...rep,
    //   value: rep.ide_ted,
    //   label: rep.des_ted,
    //   // isDisabled: doc.des_rut.includes("SOLICITUD"),
    // }));
    setReportes(met_dat);
  };
  useEffect(() => {
    if (ide_eje !== null) {
      getData();
    }
  }, [ide_eje]);
  // const handleChange = (selectedOption: any) => {
  //   setSelectedOptions(selectedOption);
  // };
  // const filterData = selectedOptions.map((data: any) => ({
  //   ide_eje,
  //   ide_ted: data.ide_ted,
  //   act_ina: data.act_ina,
  //   ide_tin: data.ide_tin,
  // }));
  // console.log(filterData);
  // console.log(selectedOptions);
  console.log(reportes);

  return (
    <div className="w-full  h-screen   pt-20 lg:pt-0">
      <NavBar />
      <section className="p-4 ">
        {/* <h4>Respuestas</h4> */}

        {/* <div>
          <Button>Nuevo</Button>
        </div> */}
        {/* <Select
          id="uniqui"
          isMulti
          options={reportes}
          // value={selectedOptions}
          onChange={handleChange}
          isSearchable={true}
          // components={{ ClearIndicator }}
          // styles={{ clearIndicator: ClearIndicatorStyles }}
          // defaultValue={"Divorcio"}
          // inputValue={`${asunto ? asunto : ""}`}
          className="w-full"
          // name="ide_rut"
          // placeholder="Buscar tipo de solicitud"
          // onChange={() => {}}
        />

        {selectedOptions.length > 0 && (
          <div className="mt-11">
            <Button onClick={sendIncidents}>Enviar incidencias</Button>
          </div>
        )} */}
        {reportes && <DataTable columns={columnsTable} data={reportes} />}
      </section>
    </div>
  );
};

export default AnswerPage;
