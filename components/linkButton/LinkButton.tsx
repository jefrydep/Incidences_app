import Link from "next/link";
import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { HomeIcon } from "lucide-react";

interface LinkInterface {
  href: string;
  icon: ReactNode;
  name: string;
}
const LinkButton = ({ href, icon, name }: LinkInterface) => {
  const pathName = usePathname();

  return (
    <Link className="   " href={`${href}`}>
      <Button
        //   onClick={toggleMenu}
        className="flex px-2 gap-6 w-full mb-3  justify-start"
        variant={`${pathName === `${href}` ? "secondary" : "ghost"}`}
      >
        {icon}

        <span>{name}</span>
      </Button>
    </Link>
  );
};

export default LinkButton;
