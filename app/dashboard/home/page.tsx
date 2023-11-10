"use client";

import CustomMolal from "@/components/customUI/CustomModal";
import { columns } from "@/components/home/colums";
import CustomCard from "@/components/home/typeWork/CustomCard";
import NavBar from "@/components/navbar/NavBar";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { MdCancel } from "react-icons/md";

const HomePage = () => {
  const { data: session, status, update } = useSession();
  const [isOpen, setIsOpen] = useState(true);
  const ambientes = session?.user.data.ambientes;
  // console.log(ambientes);

  // console.log(session);
  return (
    <div className="w-full overflow-y-auto h-screen   pt-20 lg:pt-0 ">
      <NavBar />
      <Button onClick={() => setIsOpen(true)}>Seleccionar Ambiente</Button>
      <CustomMolal isOpen={isOpen}>
        <section className="bg-white w-[50rem]   p-2 lg:p-8 shadow-lg rounded-xl">
          <div className="flex w-full  justify-end ">
            <div
              className="cursor-pointer"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <MdCancel
                title="Cerrar
                          "
                className="hover:text-red-400 text-red-600"
                size={45}
              />
            </div>
          </div>
          <h4 className="font-bold mb-4  text-center">
            Selecciona el ambiente que deseas trabajar
          </h4>
          <div className=" flex    flex-col gap-3">
            {ambientes?.map((amb) => (
              <CustomCard
                año={amb.ano_eje}
                cargo={amb.car_goo}
                nombreDeAmbiente={amb.nom_amb}
                siglas={amb.sig_laa}
              />
            ))}

            {/* {ambientes && <DataTable columns={columns} data={ambientes} />} */}
          </div>
        </section>
      </CustomMolal>
    </div>
  );
};

export default HomePage;
