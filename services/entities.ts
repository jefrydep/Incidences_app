import tramiteApi from "@/interceptors/tramiteApi";

// const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/ppto/ejecutora/funciones/fn_obt_ejecutoras_web_dsd_con_fig/19`;
export const getEntities = () => {
  return tramiteApi.get(
    `/ppto/ejecutora/funciones/fn_obt_ejecutoras_web_dsd_con_fig/23`
  );
};
export const getEntitieById = (ide_eje: number) => {
  return tramiteApi.get(
    `/ppto/ejecutora/funciones/fn_obt_ejecutoras_web_dsd_con_fig/23/${ide_eje}`
  );
};
