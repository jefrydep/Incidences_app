import tramiteApi from "@/interceptors/tramiteApi";
import { MetDAT } from "@/interface/TypeIncidents";

export const getIncidences = (ide_eje: number) => {
  return tramiteApi.get(
    `/smart/funciones/fn_obt_ejecutora_tip_inc?ide_eje=${ide_eje}`
  );
};
export const sendIncidencesSaved = (incidences: MetDAT[], token: string) => {
  return tramiteApi.post(`/smart/ejecutora_tip_inc/maintenance`, incidences, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
