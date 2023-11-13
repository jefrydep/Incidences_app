"use client";

import { Ambiente } from "@/interface/LoginResponse";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Incidencia } from "@/app/dashboard/respuestas/page";
import { MetDAT, TypeIncidents } from "@/interface/TypeIncidents";
import { useState } from "react";
import CheckIncidences from "./CheckIncidences";
const Incidences: MetDAT[] = [];
// let setIncidences
export const columnsTable: ColumnDef<MetDAT>[] = [
  {
    accessorKey: "des_ted",
    header: "Incidencia",
  },
  {
    accessorKey: "act_ina",
    header: "Estado",
    cell: ({ row }) => {
      return <CheckIncidences row={row.original} index={row.index} />;
    },
  },
];
