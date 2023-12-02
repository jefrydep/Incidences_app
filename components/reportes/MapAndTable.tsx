"use client";

import React from "react";
import { DataTable } from "../ui/data-table";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";
import { useAvailableIncidencesStore } from "@/zustanstore/availableIncidences/availableIncidense.store";
import { ArrowBigLeft, ArrowBigRight, Search } from "lucide-react";
import { Meta } from "@/interface/AvailableIncidences";
import { ErrorMessage, Form, Formik } from "formik";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useAvailableIncidences from "../hooks/useAvailableIncidences";
import { ColumnsReports } from "./Columns";
const DynamicMap = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
});

interface MapAndTableValues {
  getStartPage: () => void;
  getPreviusPage: () => void;
  getNexPage: () => void;
  getLastPage: () => void;
  statsIncidences: Meta;
  fch_ini: string;
  fch_fin: string;
  startTime: string;
  endTime: string;

  // getAllAvailableIncidences: () => Promise<void>;
  //   fch_ini: string;
  //   fch_fin: string;
  //   getAllAvailableIncidences: () => void;
}
const MapAndTable = ({
  statsIncidences,
  getNexPage,
  getStartPage,
  getPreviusPage,
  getLastPage,
  // getAllAvailableIncidences,
  fch_fin,
  fch_ini,
  startTime,
  endTime,
}: MapAndTableValues) => {
  const { getAllAvailableIncidences } = useAvailableIncidences();
  const availableIncidences = useAvailableIncidencesStore(
    (state) => state.availableIncidences
  );
  const selectedIncidence = useAvailableIncidencesStore(
    (state) => state.selectedIncidence
  );
  const detailsByIncidence = useAvailableIncidencesStore(
    (state) => state.detailsByIncidence
  );
  // console.log(statsIncidences);
  return (
    <>
      <div className="flex gap-8">
        <Formik
          initialValues={{
            fch_ini: fch_ini,
            fch_fin: fch_fin,
            // currentTime: currentTime,
            startTime: startTime,
            endTime: endTime,
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
                      name="fch_ini"
                      value={values.fch_ini}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      component="div"
                      name="startDate"
                      className="text-red-400 lg:hidden"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expedientes"> Hora Inicial</Label>
                    <Input
                      name="startTime"
                      className="lg:max-w-[12rem] w-full "
                      type="time"
                      value={values.startTime}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      component="div"
                      name="startTime"
                      className="text-red-400  lg:hidden"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expedientes"> Hasta</Label>
                    <Input
                      name="fch_fin"
                      className="lg:max-w-[12rem] w-full "
                      type="date"
                      value={values.fch_fin}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      component="div"
                      name="endDate"
                      className="text-red-400  lg:hidden"
                    />
                  </div>

                  <div>
                    <Label htmlFor="expedientes"> Hora Final</Label>
                    <Input
                      name="endTime"
                      className="lg:max-w-[12rem] w-full "
                      type="time"
                      value={values.endTime}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      component="div"
                      name="endTime"
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
      </div>
      <div className="flex gap-2 mt-2 ">
        {availableIncidences && (
          <div className=" h-[75vh]   overflow-scroll  ">
            <DataTable columns={ColumnsReports} data={availableIncidences} />
          </div>
        )}

        <div className=" ">
          <div className="flex gap-2 mb-2">
            <Button variant={"outline"} onClick={getStartPage}>
              Inicio
            </Button>
            <Button
              disabled={statsIncidences?.currentPage === 1 ? true : false}
              onClick={getPreviusPage}
            >
              <span>
                <ArrowBigLeft />
              </span>
              Anterior
            </Button>
            <Button
              disabled={
                statsIncidences?.totalPages === statsIncidences?.currentPage
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
              Último
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
                detailsIncidences={detailsByIncidence}
              />
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default MapAndTable;
