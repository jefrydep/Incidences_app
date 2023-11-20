import tramiteApi from "@/interceptors/tramiteApi";
import { MetDAT } from "@/interface/TypeIncidents";

export const getIncidences = (ide_eje: number) => {
  return tramiteApi.get(
    `/smart/funciones/fn_obt_ejecutora_tip_inc?ide_eje=${ide_eje}`
  );
};
export const sendIncidencesSaved = (incidences: MetDAT[]) => {
  return tramiteApi.post(`/smart/ejecutora_tip_inc/maintenance`, incidences);
};

export const getAvailableIncidences = (
  fch_ini: string,
  fch_fin: string,
  ide_amb: number,
  page?: number,
  limit?: number
) => {
  return tramiteApi.get(
    `/smart/smart-vistas/Vw_api_evento_cab/ambiente?fch_ini=${fch_ini}&fch_fin=${fch_fin}&ide_amb=${ide_amb}&page=${page}&limit=${limit}`
  );
};
