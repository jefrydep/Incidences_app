"use client";

import { Ambiente } from "@/interface/LoginResponse";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";

export const columns: ColumnDef<Ambiente>[] = [
  {
    accessorKey: "ano_eje",
    header: "Año",
  },
  {
    accessorKey: "car_goo",
    header: "Cargo",
  },
  {
    accessorKey: "cod_amb",
    header: "Código de ambiente",
  },

  {
    accessorKey: "nom_amb",
    header: "Nombre de ambiente",
  },
  {
    accessorKey: "sig_laa",
    header: " Siglas",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return <Button>Seleccionar Ambiente</Button>;
    },
  },
];
