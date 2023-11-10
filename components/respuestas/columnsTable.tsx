"use client";

import { Ambiente } from "@/interface/LoginResponse";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Incidencia } from "@/app/dashboard/respuestas/page";
import { MetDAT, TypeIncidents } from "@/interface/TypeIncidents";

export const columnsTable: ColumnDef<MetDAT>[] = [
  {
    accessorKey: "des_ted",
    header: "Incidencia",
  },
  {
    accessorKey: "act_ina",
    header: "Estado",
    cell: ({ row }) => {
      const isChecked =
        row.original.act_ina === null || row.original.act_ina === 0
          ? false
          : true;
      return <Checkbox checked={isChecked} onChange={} />;
    },
  },

  {
    accessorKey: "act_inca",
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
        />
      );
    },
    cell: ({ row }) => {
      const isChecked =
        row.original.act_ina === null || row.original.act_ina === 0
          ? false
          : true;
      return (
        <Checkbox
          checked={isChecked}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
