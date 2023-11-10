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

const NavBar = () => {
  const toggleMenu = useMenuStore((state) => state.toggleMenu);
  const isOpen = useMenuStore((state) => state.isOpen);
  const { data: session, status, update } = useSession();
  return (
    <nav className="navBar h-16 fixed lg:sticky grid items-center right-0 left-0  z-30 top-0">
      <div className=" px-4   flex items-center  justify-between content-center lg:justify-start  gap-2  ">
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

      <div className="absolute     right-5 grid content-center items-center     ">
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
      </div>
    </nav>
  );
};

export default NavBar;
