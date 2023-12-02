"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import CustomMolal from "@/components/customUI/CustomModal";
import { CompanyResponse } from "@/interface/CompanyResponse";
import useEntieties from "@/components/hooks/useEntieties";
import CustomButton from "@/components/customUI/CustomButton";
import { useLoadingStore } from "@/zustanstore/loading/loading.store";
import Loader from "@/components/loader/Loader";

const StartPage = () => {
  const isLoading = useLoadingStore((state) => state.loading);
  // const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/ppto/ejecutora/funciones/fn_obt_ejecutoras_web_dsd_con_fig/19`;
  // const { entities, error, loading } = useAxios<CompanyResponse[]>(API_URL);
  // const [companies, setCompanies] = useState<CompanyResponse[] | null>(entities);
  const router = useRouter();
  const { companies, entities, getAllEntities, setCompanies } = useEntieties();
  useEffect(() => {
    setCompanies(entities);
  }, [entities]);

  useEffect(() => {
    getAllEntities();
  }, []);

  interface PropsSearch {
    nameCompany: string;
  }
  // if (loading) {
  //   return <Loader />;
  // }
  const handleSelectCompany = (ide_eje: number) => {
    router.push(`login/${ide_eje}`);
  };
  const handleSearchComapanie = ({ nameCompany }: PropsSearch) => {
    const entitiesFiltered = entities?.filter((entities) =>
      (entities.nom_eje + " " + entities.ruc_eje)
        .toLowerCase()
        .includes(nameCompany.toLowerCase())
    );
    setCompanies(entitiesFiltered || entities);
  };

  return (
    <CustomMolal isOpen={true}>
      {isLoading && <Loader />}
      <div className="bg-gray-100 rounded-lg w-[80rem] px-4  h-[95vh] overflow-scroll">
        <h4 className="text-center mt-3 text-black font-bold mb-4">
          Seleccione una unidad Ejecutora/Empresa
        </h4>

        <label htmlFor="">Buscar: RUC/EJECUTORA</label>
        <input
          className=" block w-full mb-3 rounded-3xl border borderInput    focus:border-second focus:outline-none focus:ring-1 focus:ring-second py-1 px-3 text-gray-500"
          type="text"
          onChange={(e) => {
            handleSearchComapanie({ nameCompany: e.target.value });
          }}
        />
        {entities &&
          companies?.map((company) => (
            <section key={company.ide_eje} className="px-2 py-1 ">
              <div className="grid grid-cols-3 border md:grid-cols-9 lg:h-[3.5rem]   bg-white shadow-md rounded-lg   content-center items-center px-3 py-3 md:py-1   justify-between    gap-5">
                <div className=" ">
                  <Image
                    alt={company.nom_eje}
                    src={`http://www.documentosvirtuales.com:3006/ppto/ejecutora/${company.ide_eje}/${company.pat_img}`}
                    width={32}
                    height={32}
                    priority
                  />
                </div>
                <span className="col-span-2 text-xs">
                  Ruc:{company.ruc_eje}
                </span>
                <span className="col-span-3 text-xs text-center font-bold ">
                  {company.nom_eje}
                </span>
                <div className="col-span-3 text-xs">
                  <CustomButton
                    onClick={() => handleSelectCompany(company.ide_eje)}
                    nameButton={"Seleccionar"}
                    color={"bgButton"}
                  />
                </div>
              </div>
            </section>
          ))}
      </div>
    </CustomMolal>
  );
};

export default StartPage;
