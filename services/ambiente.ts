import tramiteApi from "@/interceptors/tramiteApi";
import { TypeAmbientes } from "@/interface/Ambientes";

export const getAmbiente = (ide_eje: number, ide_amb: number) => {
  return tramiteApi.get(
    `/smart/funciones/fn_obt_filtro_x_inc?ide_eje=${ide_eje}&ide_amb=${ide_amb}`
  );
};
export const sendAmbienteSelected = (ambiente: {}) => {
  return tramiteApi.post(`/smart/filtro_x_inc/maintenance`, ambiente);
};

export const getAnswerCorrelative = (objeto: string) => {
  console.log(objeto);
  return tramiteApi.get(
    `/siam/funciones/fn_gen_nro_doc?sch_tab=smart.evento_agrupa&nro_cor=nro_ate&arr_par=${objeto}`
  );
};

export const getAnswerCorrelative2 = (objeto: string) => {
  return tramiteApi.get(
    // `/siam/funciones/fn_gen_nro_doc?sch_tab=smart.evento_agrupa&nro_trb=${nro_trb}&arr_par=${objeto}`
    `/siam/funciones/fn_gen_nro_doc?sch_tab=smart.evento_agrupa&nro_cor=nro_trb&arr_par=${objeto}`
  );
};
export const getAnswerCorrelative3 = (objeto: string) => {
  return tramiteApi.get(
    `/siam/funciones/fn_gen_nro_doc?sch_tab=smart.evento_agrupa&nro_cor=nro_amb&arr_par=${objeto}`
  );
};
// /siam/funciones/fn_gen_nro_doc?sch_tab=smart.evento_agrupa&nro_cor=nro_ate&arr_par=
