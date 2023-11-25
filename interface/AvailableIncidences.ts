export interface AvailableIncidences {
  items: Item[];
  meta: Meta;
  links: Links;
}

export interface Item {
  isSelected?: boolean;
  ide_eve: number;
  ano_eje: string;
  ide_ted: number;
  act_ina: number;
  nro_itm: number;
  nom_com: string;
  des_ted: string;
  fch_hra: Date;
  fch_hra_txt: string;
  lat_eve: string;
  lon_eve: string;
  gls_eve: string;
  ide_dis: number;
  dir_eve: string;
  ide_per: number;
  contactos: [];
}

export interface Links {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface DetailsIncidences {
  ide_ede: number;
  ide_eve: number;
  des_ede: null;
  pes_arc: string;
  nom_img: string;
}
