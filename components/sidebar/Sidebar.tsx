"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  Book,
  BookA,
  HomeIcon,
  LogOut,
  UserCog,
  Users2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Input } from "../ui/input";
import axios from "axios";
import Loader from "../loader/Loader";
import { MdCancel } from "react-icons/md";
import { useIdeEjeStore } from "@/zustanstore/ideEje/ideEje.store";
import { useMenuStore } from "@/zustanstore/menuMovil/menuMovil.store";
import LinkButton from "../linkButton/LinkButton";
const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { data: session, status, update } = useSession();
  const ide_eje = useIdeEjeStore((state) => state.ide_eje);
  console.log(ide_eje);
  const isOpen = useMenuStore((state) => state.isOpen);

  const permissions = [
    {
      customers: true,
      ventas: false,
    },
  ];

  const routerMenu = [
    {
      id: 0,
      href: "/dashboard/home",
      icon: <HomeIcon />,
      name: "Inicio",
    },
    {
      id: 1,
      href: "/dashboard/customers",
      icon: <Users2Icon />,
      name: "Clientes",
    },
    {
      id: 2,
      href: "/dashboard/respuestas",
      icon: <BookA />,
      name: "Respuestas",
    },
  ];

  return (
    <section
      className={` ${
        isOpen ? "grid" : "hidden"
      } lg:flex w-[70vw] pt-10 lg:pt-0    z-[35] fixed lg:relative  bottom-0 top-0  lg:w-[15rem]  lg:h-screen  bgSidebarMenu`}
    >
      {isLoading && <Loader />}

      <div
        className={` flex    relative flex-col w-full textSidebarMenu   "
        }`}
      >
        {/* <div className="mt-5 hidden   lg:grid  justify-center">
          {company.length > 0 && (
            <img
              width={155}
              src={`${process.env.NEXT_PUBLIC_API_URL}/ppto/ejecutora/${ide_eje}/${company[0].pat_img}`}
              alt=""
            />
          )}
        </div> */}

        <nav className="lg:mt-20 flex  flex-col gap-1 lg:gap-4   ">
          {routerMenu.map((route) => (
            <div key={route.id}>
              <LinkButton {...route} />
            </div>
          ))}

          <hr />

          <Button
            onClick={async () => {
              const result = await Swal.fire({
                title: "¿Cerrar sesión?",
                text: "¿Estás seguro?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#333a9a",
                cancelButtonColor: "#d33",
                confirmButtonText: "¡Si!, ¡Cerrar!",
                cancelButtonText: "Cancelar",
              });

              if (result.isConfirmed) {
                setIsLoading(true);

                await signOut({
                  redirect: false,
                });

                router.replace(`/login/${ide_eje}`);

                setIsLoading(false);
              }
            }}
            className="flex px-2 gap-6 w-full  justify-start"
            variant={"ghost"}
          >
            <LogOut className="hover:bg-blue-500" />
            <span>Cerrar Sesión</span>
          </Button>
        </nav>
        <div className=" lg:absolute flex lg:gap-4  content-center justify-center items-center border lg:bottom-5 w-full containerProfile p-3">
          <div className="flex  flex-col lg:gap-2 ">
            <h4 className="text-xs">{session?.user.data.nom_com}</h4>
            <span className="text-xs">{session?.user.data.nro_doc}</span>
            {/* <span className="text-xs">{session?.user.cor_ele}</span> */}
          </div>
          <Avatar>
            <AvatarImage
            //   src={`${API_URL}/siam/personas/fot_per/${session?.user.ide_per}/${session?.user.ide_per}`}
            />

            <AvatarFallback>
              {session?.user.data.nom_com.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
