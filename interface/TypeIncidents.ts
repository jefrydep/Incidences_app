export interface TypeIncidents {
  est_ado: boolean;
  mes_age: null;
  met_dat: MetDAT[];
}

export interface MetDAT {
  act_ina: number | null;
  des_ted: string;
  ide_eje: number | null;
  ide_t_e: number;
  ide_ted: number;
  ide_tin: number | null;
  nro_itm: number;
  nro_ver: number;
}
