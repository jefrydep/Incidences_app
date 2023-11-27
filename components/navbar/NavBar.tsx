"use client";
import { useMenuStore } from "@/zustanstore/menuMovil/menuMovil.store";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MenuIcon, X } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomMolal from "../customUI/CustomModal";
import { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import CustomCard from "../home/typeWork/CustomCard";
import { Button } from "../ui/button";
import { useAmbienteStore } from "@/zustanstore/ambiente/ambiente.store";
import { useIdeAmbiente } from "@/zustanstore/ideAmb/ideAmb.store";

const NavBar = () => {
  const toggleMenu = useMenuStore((state) => state.toggleMenu);
  const isOpen = useMenuStore((state) => state.isOpen);
  const { data: session, status, update } = useSession();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const selectedAmbiente = useIdeAmbiente((state) => state.ambiente);
  const ambientes = session?.user.data.ambientes;
  // useEffect(() => {
  //   if (!selectedAmbiente) {
  //     setIsOpenModal(true);
  //   }
  // }, [selectedAmbiente]);

  // console.log(ambientes);
  console.log(selectedAmbiente);
  console.log(ambientes);
  return (
    // <nav className="navBar h-16 fixed lg:sticky grid items-center right-0 left-0  z-30 top-0">
    <nav className="navBar h-16 fixed lg:sticky grid items-center right-0 left-0 z-30 lg:z-[60] top-0">
      <div className=" px-4   flex items-center  justify-between content-center lg:justify-start  gap-2  ">
        {session?.user && (
          <div>
            <div>
              <Button onClick={() => setIsOpenModal(true)}>
                {selectedAmbiente.length > 0 && selectedAmbiente[0].nom_amb}{" "}
              </Button>
            </div>
            <CustomMolal isOpen={isOpenModal}>
              <section className=" bg-white w-[50rem]  text-black p-2 lg:p-8 shadow-lg rounded-xl">
                <div className="flex w-full  justify-end ">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setIsOpenModal(false);
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
                  {ambientes &&
                    ambientes?.map((amb, index) => (
                      <CustomCard
                        ambiente={ambientes}
                        setIsOpenModal={setIsOpenModal}
                        key={index}
                        ide_amb={amb.ide_amb}
                        año={amb.ano_eje}
                        cargo={amb.car_goo}
                        nombreDeAmbiente={amb.nom_amb}
                        siglas={amb.sig_laa}
                      />
                    ))}
                </div>
              </section>
            </CustomMolal>
          </div>
        )}
        {/* {company.length > 0 && (
          <>
            <div>
              <img
                width={40}
                src={`${process.env.NEXT_PUBLIC_API_URL}/ppto/ejecutora/${ideEje}/${company[0].pat_img}`}
                alt=""
              />
            </div>
            <div>
              <span className="text-xs lg:text-base">{company[0].nom_eje}</span>
            </div>
          </>
        )} */}
        <div onClick={toggleMenu} className="grid   items-center  lg:hidden">
          {isOpen ? <X size={55} /> : <MenuIcon size={55} />}
        </div>
      </div>

      {/* <div className="absolute     right-5 grid content-center items-center     ">
        <DropdownMenu>
          <DropdownMenuTrigger className="  rounded-full h-12 w-12 containerProfile   ">
            {" "}
            <Avatar className="  grid items-center content-center">
              <AvatarImage
              //   src={`${API_URL}/siam/personas/fot_per/${session?.user.ide_per}/${session?.user.ide_per}`}
              />

              <AvatarFallback>
                {session?.user.data.nom_com.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
    </nav>
  );
};

export default NavBar;
