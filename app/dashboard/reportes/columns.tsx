"use client";

import useAvailableIncidences from "@/components/hooks/useAvailableIncidences";
import useIncidences from "@/components/hooks/useIncidences";
import SeeLocation from "@/components/reportes/SeeLocation";
import { Button } from "@/components/ui/button";
import { Item } from "@/interface/AvailableIncidences";
import { ColumnDef } from "@tanstack/react-table";

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
];
