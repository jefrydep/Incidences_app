"use client";

import { Ambiente } from "@/interface/LoginResponse";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Incidencia } from "@/app/dashboard/respuestas/page";
import { MetDAT, TypeIncidents } from "@/interface/TypeIncidents";
import { useState } from "react";

export const columnsTable: ColumnDef<MetDAT>[] = [
  {
    accessorKey: "des_ted",
    header: "Incidencia",
  },
  {
    accessorKey: "act_ina",
    header: "Estado",
    cell: ({ row }) => {
      const [modifiedData, setModifiedData] = useState<MetDAT>(row.original);
      const handleCheckboxChange = (index) => {
        const newData = [...modifiedData];

        newData[index].act_ina = !newData[index].act_ina;

        setModifiedData(newData);
      };
      const isChecked =
        row.original.act_ina === null || row.original.act_ina === 0
          ? false
          : true;
      return <Checkbox checked={isChecked} onChange={handleCheckboxChange} />;
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
            !value;
          }}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
