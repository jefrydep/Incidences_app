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
import { ArrowBigLeft, ArrowBigRight, Leaf, Search } from "lucide-react";
import useIncidences from "@/components/hooks/useIncidences";
import { useLoadingStore } from "@/zustanstore/loading/loading.store";
import Loader from "@/components/loader/Loader";
import { ErrorMessage, Form, Formik } from "formik";

const DynamicMap = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
});
const ReportesPage = () => {
  const {
    getAllAvailableIncidences,
    availableIncidences,
    selectedIncidence,
    setSelectedIncidence,
    paginationIncidences,
    getLastPage,
    getNexPage,
    getPreviusPage,
    statsIncidences,
    getStartPage,
    fch_ini,
    fch_fin,
  } = useAvailableIncidences();

  const { getAllDetailIncidents, detailsByIncident } = useIncidences(1769);
  const loading = useLoadingStore((state) => state.loading);

  useEffect(() => {
    getAllAvailableIncidences();
  }, []);

  const handleLabelClick = (index: number) => {
    //
    if (availableIncidences && availableIncidences[index]) {
      const selected = availableIncidences[index];
      console.log(selected);
      setSelectedIncidence([selected]);
      getAllDetailIncidents(selected.ide_eve, selected.ide_per);
    }
  };
  console.log(availableIncidences);
  console.log(fch_ini);
  return (
    <div className="w-full  h-screen pt-20 lg:pt-0 ">
      <NavBar />
      {/* <h4>Reportes </h4> */}

      <section className="px-2">
        {loading && <Loader />}
        <Tabs defaultValue="reportes" className="">
          <TabsList>
            <TabsTrigger className="" value="reportes">
              Incidencias Acogidas
            </TabsTrigger>
            <TabsTrigger value="reportadas">
              Incidencias Reportadas-{statsIncidences?.totalItems}
            </TabsTrigger>
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
              {availableIncidences && (
                <DataTable
                  columns={columnsReports}
                  data={availableIncidences}
                />
              )}
            </section>{" "}
          </TabsContent>
          <TabsContent value="reportadas">
            <section className="border rounded-lg p-3 mb-2">
              {/* <div className="flex gap-2">
                <Input
                  className="lg:w-[15rem]"
                  type="date"
                  placeholder="Fecha inicial"
                />
                <Input
                  className="lg:w-[15rem]"
                  type="date"
                  placeholder="Fecha final"
                />
                <Button>Buscar</Button>
              </div> */}
              <Formik
                initialValues={{
                  startDate: fch_ini,
                  endDate: fch_fin,
                }}
                onSubmit={getAllAvailableIncidences}
                // validationSchema={validationSchemaDate}
              >
                {({ values, handleChange }) => (
                  <Form className=" flex gap-2 flex-col lg:flex-row  ">
                    <div>
                      <section className="flex flex-col lg:flex-row gap-3    ">
                        <div>
                          <Label htmlFor="expedientes"> Desde</Label>
                          <Input
                            className="lg:max-w-[12rem] w-full "
                            type="date"
                            name="startDate"
                            value={values.startDate}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            component="div"
                            name="startDate"
                            className="text-red-400 lg:hidden"
                          />
                        </div>
                        <div>
                          <Label htmlFor="expedientes"> Hasta</Label>
                          <Input
                            name="endDate"
                            className="lg:max-w-[12rem] w-full "
                            type="date"
                            value={values.endDate}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            component="div"
                            name="endDate"
                            className="text-red-400  lg:hidden"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button className="w-full" type="submit">
                            <span>
                              <Search />
                            </span>
                            Buscar
                          </Button>
                        </div>
                      </section>
                      <ErrorMessage
                        component="div"
                        name="startDate"
                        className="text-red-400 hidden lg:block"
                      />
                      <ErrorMessage
                        component="div"
                        name="endDate"
                        className="text-red-400 hidden lg:block"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="flex gap-2 ">
                {availableIncidences && (
                  <DataTable
                    columns={columnsReports}
                    data={availableIncidences}
                  />
                )}
                {/* <div>
                  <div className="flex flex-row flex-wrap">
                    {availableIncidences &&
                      availableIncidences.map((inc, idx) => (
                        <div
                          key={idx}
                          className="bg-blue-500 m-2 text-white flex gap-2 w-full justify-between lg:w-max    lg:min-w-[10rem] px-4 py-1 rounded-md lg:p-2  cursor-pointer"
                          onClick={() => handleLabelClick(idx)}
                        >
                          <Label className="cursor-pointer">
                            {inc.des_ted}
                          </Label>
                          <input className="mr-3" type="checkbox" />
                        </div>
                      ))}
                  </div>
                </div> */}
                <div>
                  <div className="flex gap-2 mb-2">
                    <Button variant={"outline"} onClick={getStartPage}>
                      Inicio
                    </Button>
                    <Button
                      disabled={
                        statsIncidences?.currentPage === 1 ? true : false
                      }
                      onClick={getPreviusPage}
                    >
                      <span>
                        <ArrowBigLeft />
                      </span>
                      Anterior
                    </Button>
                    <Button
                      disabled={
                        statsIncidences?.totalPages ===
                        statsIncidences?.currentPage
                          ? true
                          : false
                      }
                      onClick={getNexPage}
                    >
                      Siguiente
                      <span>
                        <ArrowBigRight />
                      </span>
                    </Button>
                    <Button variant={"outline"} onClick={getLastPage}>
                      Ultimo
                    </Button>
                  </div>
                  <section>
                    <div>
                      <h5>
                        Página {statsIncidences?.currentPage}de
                        {statsIncidences?.totalPages}
                      </h5>
                    </div>
                    {selectedIncidence && (
                      <DynamicMap
                        position={selectedIncidence}
                        detailsIncidences={detailsByIncident}
                      />
                    )}
                  </section>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default ReportesPage;
