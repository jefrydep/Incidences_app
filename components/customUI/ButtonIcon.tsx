import React, { ReactNode, MouseEvent } from "react";
import { Button } from "../ui/button";
interface ButtonProps {
  icon: ReactNode;
  nameButton: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  bgHover?: string;
  bgColor?: string;
}
const ButtonIcon = ({
  icon,
  nameButton,
  bgColor,

  onClick,
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`flex px-2 gap-6  ${bgColor} max-w-xs   justify-start`}
      //   variant={`${d && "destructive"}`}
    >
      {icon}

      <span>{nameButton}</span>
    </Button>
  );
};

export default ButtonIcon;
