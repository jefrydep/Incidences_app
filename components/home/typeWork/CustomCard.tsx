import React from "react";

interface CardInteface {
  año: string;
  cargo: string;
  nombreDeAmbiente: string;
  siglas: string;
}
const CustomCard = ({ año, cargo, nombreDeAmbiente, siglas }: CardInteface) => {
  const onSelectTypeWork = () => {
    // console.log(año, cargo);
  };

  return (
    <div
      onClick={onSelectTypeWork}
      className="rounded-xl border relative cursor-pointer hover:scale-105 shadow-lg border-sky-600  p-3 text-sm w-full"
    >
      <div className="flex justify-between border rounded-lg p-2   bg-sky-600">
        <li className=" flex text-start text-white">Nombre de ambiente</li>
        <span className="text-end">{nombreDeAmbiente}</span>
      </div>
      <div className="flex justify-between">
        <li className=" flex text-start text-blue-500">Cargo</li>
        <span className="text-end">{cargo}</span>
      </div>
      <div className="flex justify-between">
        <li className=" flex text-start text-green-500"> Año</li>
        <span className="text-end">{año}</span>
      </div>
      <div className="flex justify-between">
        <li className=" flex text-start text-teal-600">Siglas</li>
        <span className="text-end">{siglas}</span>
      </div>
      {/* <div className="bg-orange absolute top-0 left-0 rounded-r-[4rem]   bg-orange-400 w-[4rem] h-full"></div> */}
    </div>
  );
};

export default CustomCard;
