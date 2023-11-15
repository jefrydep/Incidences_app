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
