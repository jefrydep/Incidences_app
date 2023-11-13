"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./button";
import { useState } from "react";
import tramiteApi from "@/interceptors/tramiteApi";
import { useSession } from "next-auth/react";
import { TypeIncidents } from "@/interface/TypeIncidents";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // const [rowSelection, setRowSelection] = useState({});
  // const [dataToSend, setDataToSend] = useState([]);
  // const { data: session, status, update } = useSession();
  // const getSelectedData = (indices: { [key: number]: boolean }, data: any) => {
  //   return Object.keys(indices)
  //     .filter((index) => indices[parseInt(index, 10)])
  //     .map((index) => {
  //       const objeto = data[parseInt(index, 10)];
  //       return { ...objeto, act_ina: 1 };
  //     });
  // };
  // const objetosSeleccionados = getSelectedData(rowSelection, data);
  // // console.log(objetosSeleccionados);

  // const sendIncidents = async () => {
  //   "enviando incidencias";
  //   const response = await tramiteApi.post(
  //     `/smart/ejecutora_tip_inc/maintenance`,
  //     objetosSeleccionados,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${session?.user.access_token}`,
  //       },
  //     }
  //   );
  //   const res = response.data;
  //   console.log(res);
  // };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // onRowSelectionChange: setRowSelection,

    // state: {
    //   rowSelection,
    // },
  });

  return (
    // table shadcn
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className=" bgSidebarMenu ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="textTitleTable" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className=" text-xs lg:text-sm">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin datos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* pagination  */}
      <div className="flex items-center justify-start space-x-2 py-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={!table.getCanPreviousPage()}
                size={"sm"}
                onClick={() => {
                  table.previousPage();
                }}
              >
                {"<"}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white">
              <p>Atras</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div>
          {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={!table.getCanNextPage()}
                size={"sm"}
                onClick={() => {
                  table.nextPage();
                }}
              >
                {">"}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white">
              <p>Siguiente</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
