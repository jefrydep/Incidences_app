import NextAuth from "next-auth/next";
declare module "next-auth" {
  interface Session {
    user: {
      mensaje: string;
      est_ado: number;
      tmp_blq: TmpBlq;
      ide_c_i: null;
      menu: any[];
      cta_alt: null;
      ide_e_s: number;
      data: Data;
      type_login: string;
      access_token: string;
    };
  }

  interface Data {
    abr_pro: string;
    act_ina: number;
    ano_eje: string;
    cer_dig: null;
    des_gru: string;
    ide_eje: number;
    ide_gru: number;
    ide_nem: null;
    ide_per: number;
    ide_trb: number;
    nlineno: number;
    nom_com: string;
    nro_doc: string;
    ambientes: Ambiente[];
    cdescribe: string;
    cidusuario: string;
    csuspendido: number;
    ide_p_c_wat: null;
  }

  export interface Ambiente {
    ano_eje: string;
    car_goo: string;
    cod_amb: string;
    flg_smt: number;
    ide_amb: number;
    ide_t_a: number;
    ide_trb: number;
    ide_u_o: number;
    m_p_vir: number;
    nom_amb: string;
    sig_laa: string;
    val_pag: number;
    flg_alt_trb: number;
    flg_exp_rst: number;
  }

  interface TmpBlq {
    anios: null;
    meses: null;
    dias: null;
    horas: null;
    minutos: null;
  }
}
