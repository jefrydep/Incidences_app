"use client";

import SeeLocationChecked from "@/components/reportes/SeeLocationChecked";
import { Item } from "@/interface/AvailableIncidences";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const ColumnsChecked: ColumnDef<Item>[] = [
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
  {
    // accessorKey: "sd",
    header: "Marcador",
    cell: ({ row }) => {
      return (
        <SeeLocationChecked index={row.index} />
        // <Button onClick={() => handleLabelClick(row.index)}>
        //   {/* <Button>Ver Contactos */}
        // </Button>
      );
    },
  },
  //   {
  //     accessorKey: "isSelected",
  //     header: "Seleccionar",
  //     cell: ({ row }) => {
  //       const [selectedIncidences, setSelectedIncidences] = useState<Item[]>([]);
  //       const setAvailableIncidence = useAvailableIncidencesStore(
  //         (state) => state.setAvailableIncidences
  //       );
  //       const availableIncidences = useAvailableIncidencesStore(
  //         (state) => state.availableIncidences
  //       );
  //       const togleIncidence = useAvailableIncidencesStore(
  //         (state) => state.toggleSelectedIncidence
  //       );
  //       // console.log(values);
  //       const handleChangeSelectIncidence = (ide_eve: number) => {
  //         // const selectedIncidence = availableIncidences[index];
  //         togleIncidence(ide_eve);
  //         // setAvailableIncidence(newdata);
  //       };

  //       return (
  //         <input
  //           type="checkbox"
  //           checked={row.original.isSelected}
  //           onChange={() => handleChangeSelectIncidence(row.original.ide_eve)}
  //         />
  //       );
  //     },
  //   },
];
