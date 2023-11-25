"use client";

import useAvailableIncidences from "@/components/hooks/useAvailableIncidences";
import useIncidences from "@/components/hooks/useIncidences";
import SeeLocation from "@/components/reportes/SeeLocation";
import { Button } from "@/components/ui/button";
import { Item } from "@/interface/AvailableIncidences";
import { useAvailableIncidencesStore } from "@/zustanstore/availableIncidences/availableIncidense.store";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsReports: ColumnDef<Item>[] = [
  {
    accessorKey: "nom_com",
    header: "Nombre",
  },
  {
    accessorKey: "des_ted",
    header: "Descripción",
  },
  {
    accessorKey: "dir_eve",
    header: "Dirección",
  },
  {
    accessorKey: "fch_hra_txt",
    header: "Hora",
  },
  {
    // accessorKey: "sd",
    header: "Contactos",
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
      const [selectedIncidences, setSelectedIncidences] = useState<Item[]>([]);
      const setAvailableIncidence = useAvailableIncidencesStore(
        (state) => state.setAvailableIncidences
      );
      const availableIncidences = useAvailableIncidencesStore(
        (state) => state.availableIncidences
      );
      const togleIncidence = useAvailableIncidencesStore(
        (state) => state.toggleSelectedIncidence
      );
      // console.log(values);
      const handleChangeSelectIncidence = (ide_eve: number) => {
        // const selectedIncidence = availableIncidences[index];
        togleIncidence(ide_eve);
        // setAvailableIncidence(newdata);
      };

      return (
        <input
          type="checkbox"
          checked={row.original.isSelected}
          onChange={() => handleChangeSelectIncidence(row.original.ide_eve)}
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
