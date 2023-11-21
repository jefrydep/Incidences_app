"use client";
import NavBar from "@/components/navbar/NavBar";
import { DataTable } from "@/components/ui/data-table";
import React, { useEffect, useState } from "react";
import { columnsReports } from "./columns";
import { Button } from "@/components/ui/button";
import { MdAddLocation } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import L, { IconOptions, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { getAvailableIncidences } from "@/services/incidencias";
import useAvailableIncidences from "@/components/hooks/useAvailableIncidences";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf } from "lucide-react";

const DynamicMap = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
});
const ReportesPage = () => {
  const fch_ini = "2023-11-02 14:30:45";
  const fch_fin = "2023-11-20 14:30:45";
  const {
    getAllAvailableIncidences,
    availableIncidences,
    selectedIncidence,
    setSelectedIncidence,
  } = useAvailableIncidences(fch_ini, fch_fin);
  // const [position, setPosition] = useState<LatLngExpression>([
  //   -15.512906567247873, -70.1288912112806,
  // ]);
  useEffect(() => {
    getAllAvailableIncidences();
  }, []);
  const handleLabelClick = (index: number) => {
    //
    if (availableIncidences && availableIncidences[index]) {
      const selected = availableIncidences[index];
      console.log(selected);
      setSelectedIncidence([selected]);
      // setAvailableIncidences([lat_eve, lon_eve]);
    }
  };
  return (
    <div className="w-full  h-screen pt-20 lg:pt-0 ">
      <NavBar />
      {/* <h4>Reportes </h4> */}

      <section className="px-2">
        <Tabs defaultValue="reportes" className="w-full">
          <TabsList>
            <TabsTrigger className="" value="reportes">
              Incidencias Acogidas
            </TabsTrigger>
            <TabsTrigger value="reportadas">Incidencias Reportadas</TabsTrigger>
          </TabsList>
          <TabsContent value="reportes">
            <div className="m-2">
              <Button>
                <span>
                  <MdAddLocation />
                </span>
                Agregar nuevo reporte
              </Button>
            </div>
            <section>
              <DataTable columns={columnsReports} data={[]} />
            </section>{" "}
          </TabsContent>
          <TabsContent value="reportadas">
            <section className="border rounded-lg p-3 mb-2">
              <div>
                <Input type="text" />
              </div>
              <div className="flex ">
                <div>
                  {/* <h1>Incidencias Reportadas</h1> */}
                  <div className="flex flex-wrap">
                    {availableIncidences &&
                      availableIncidences.map((inc, idx) => (
                        <div
                          key={idx}
                          className="bg-blue-500 m-2  min-w-[10rem] rounded-md p-2  cursor-pointer"
                          onClick={() => handleLabelClick(idx)}
                        >
                          <Label>{inc.des_ted}</Label>
                          <input className="mr-3" type="checkbox" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </section>
            {selectedIncidence && <DynamicMap position={selectedIncidence} />}
            {/* {<DynamicMap />} */}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default ReportesPage;
