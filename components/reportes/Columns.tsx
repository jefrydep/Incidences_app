"use client";

import useAvailableIncidences from "@/components/hooks/useAvailableIncidences";
import useIncidences from "@/components/hooks/useIncidences";
import SeeLocation from "@/components/reportes/SeeLocation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Item } from "@/interface/AvailableIncidences";
import { useAvailableIncidencesStore } from "@/zustanstore/availableIncidences/availableIncidense.store";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import Checked from "./Checked";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const ColumnsReports: ColumnDef<Item>[] = [
  {
    // accessorKey: "sd",
    header: "Detalles",
    cell: ({ row }) => {
      return (
        <article className="shadow-lg rounded-lg p-2 border flex flex-col gap-2">
          <div className=" flex justify-between ">
            <h5 className="mr-3 font-bold">Descripcion:</h5>
            <span className=" ">{row.original.des_ted}</span>
          </div>
          <div className=" flex justify-between  ">
            <h5 className="mr-3 font-bold">Reportante:</h5>
            <span>{row.original.nom_com}</span>
          </div>
          <div className=" flex justify-between   ">
            <h5 className="mr-3 font-bold">Direccion:</h5>
            <span>{row.original.dir_eve}</span>
          </div>
          <div className=" flex justify-between  ">
            <h5 className="mr-3 font-bold">Hora:</h5>
            <span>{row.original.fch_hra_txt}</span>
          </div>
        </article>
        // <Button onClick={() => handleLabelClick(row.index)}>
        //   {/* <Button>Ver Contactos */}
        // </Button>
      );
    },
  },
  // {
  //   accessorKey: "nom_com",
  //   header: "Nombre",
  // },
  // {
  //   accessorKey: "des_ted",
  //   header: "Descripción",
  // },
  // {
  //   accessorKey: "dir_eve",
  //   header: "Dirección",
  // },
  // {
  //   accessorKey: "fch_hra_txt",
  //   header: "Hora",
  // },
  {
    // accessorKey: "sd",
    header: "Marcador",
    cell: ({ row }) => {
      return (
        <SeeLocation index={row.index} />
        // <Button onClick={() => handleLabelClick(row.index)}>
        //   {/* <Button>Ver Contactos */}
        // </Button>
      );
    },
  },
  {
    accessorKey: "isSelected",
    header: "Seleccionar",
    cell: ({ row }) => {
      return (
        <Checked
          isSelected={
            row.original.isSelected !== undefined && row.original.isSelected
          }
          ide_eve={row.original.ide_eve}
        />
      );
    },
  },

  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <input
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <input
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
];
