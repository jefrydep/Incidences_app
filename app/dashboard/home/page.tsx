"use client";
import NavBar from "@/components/navbar/NavBar";
import { DataTable } from "@/components/ui/data-table";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MdAddLocation, MdCancel } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import L, { IconOptions, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { getAvailableIncidences } from "@/services/incidencias";
import useAvailableIncidences from "@/components/hooks/useAvailableIncidences";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowBigLeft,
  ArrowBigRight,
  FileHeart,
  Leaf,
  Search,
} from "lucide-react";
import useIncidences from "@/components/hooks/useIncidences";
import { useLoadingStore } from "@/zustanstore/loading/loading.store";
import Loader from "@/components/loader/Loader";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAvailableIncidencesStore } from "@/zustanstore/availableIncidences/availableIncidense.store";
import CustomMolal from "@/components/customUI/CustomModal";
import { useAmbienteStore } from "@/zustanstore/ambiente/ambiente.store";
import { useIdeAmbiente } from "@/zustanstore/ideAmb/ideAmb.store";
import useGroupIncidence from "@/components/hooks/useGroupIncidence";
import { useIdeEjeStore } from "@/zustanstore";
import * as Yup from "yup";
import NewIncidenceModal from "@/components/reportes/NewIncidenceModal";
import MapAndTable from "@/components/reportes/MapAndTable";
import { ColumnsReports } from "@/components/reportes/Columns";
import { ColumnsChecked } from "@/components/reportes/ColumnsChecked";

const DynamicMap = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
});
const ReportesPage = () => {
  const [isOpenModal, setisOpenModal] = useState(false);
  const [isOpenNewModal, setIsOpenNewModal] = useState(false);
  const {
    availableIncidences,
    fch_ini,
    fch_fin,
    statsIncidences,
    getAllAvailableIncidences,
    // currentTime,
    startTime,
    endTime,
    getLastPage,
    getPreviusPage,
    getStartPage,

    getNexPage,
    currentDateFormated,
  } = useAvailableIncidences();
  const ide_eje = useIdeEjeStore((state) => state.ide_eje);
  const ide_amb = useIdeAmbiente((state) => state.ide_amb);
  const detailsByIncidence = useAvailableIncidencesStore(
    (state) => state.detailsByIncidence
  );
  const detailsByCheckedIncidence = useAvailableIncidencesStore(
    (state) => state.detailsBycheckedIncidence
  );
  const setSelectedCheckedIncidence = useAvailableIncidencesStore(
    (state) => state.setSelectedCheckedIncidence
  );
  const selectedCheckedIncidence = useAvailableIncidencesStore(
    (state) => state.selectedCheckedIncidence
  );
  const ambiente = useIdeAmbiente((state) => state.ambiente);
  // console.log(ambiente);
  const validationSchema = Yup.object().shape({
    gls_agr: Yup.string().required("Descripción es requerida"),
    // ccpassword: Yup.string().required("Contraseña es requerida"),
  });
  const loading = useLoadingStore((state) => state.loading);
  const checkedIncidences = useAvailableIncidencesStore(
    (state) => state.checkedIncidence
  );
  const { getAnswerCorrelatives, correlatives, onSubmitGroupIncidences } =
    useGroupIncidence();
  const buttonSubmit = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    getAllAvailableIncidences({ fch_fin, fch_ini, startTime, endTime });
  }, []);
  useEffect(() => {
    if (checkedIncidences) {
      setSelectedCheckedIncidence(checkedIncidences);
    }
  }, [checkedIncidences]);

  const openModal = () => {
    setIsOpenNewModal(true);
  };

  const closeModal = () => {
    setIsOpenNewModal(false);
  };
  // console.log(correlatives);
  //
  const saveSelectedIncidences = () => {
    getAnswerCorrelatives();
    setisOpenModal(true);
  };
  return (
    // nro_gor
    <div className="w-full  h-screen overflow-y-auto pt-20 lg:pt-0 ">
      {/* <div className="w-full overflow-y-auto    lg:h-screen    "></div> */}
      <NavBar />
      {/* <h4>Reportes </h4> */}
      <section className="px-2">
        {loading && <Loader />}
        <Tabs defaultValue="reportadas" className="">
          <TabsList>
            <TabsTrigger value="reportadas">
              Incidencias Reportadas-{statsIncidences?.totalItems}
            </TabsTrigger>
            <TabsTrigger className="" value="reportes">
              Incidencias Acogidas
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
                  columns={ColumnsReports}
                  data={availableIncidences}
                />
              )}
            </section>{" "}
          </TabsContent>
          <TabsContent value="reportadas">
            <div className="  flex flex-col justify-end">
              <Button
                disabled={selectedCheckedIncidence.length >= 1 ? false : true}
                onClick={saveSelectedIncidences}
              >
                <span>({selectedCheckedIncidence.length})-</span>
                Guardar Seleccion
              </Button>
            </div>
            <section className="border rounded-lg p-3 mb-2">
              {/* <div className="flex gap-8">
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
              </div> */}

              <div className=" ">
                <CustomMolal isOpen={isOpenModal}>
                  <section className="bg-white w-[88vw] px-2 rounded-lg ">
                    <div className="flex w-full  justify-end ">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setisOpenModal(false);
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
                    <section className="flex gap-3">
                      <article className=" w-96  p-2   border shadow rounded-md mb-2">
                        <h4 className="font-bold mb-1">
                          Detalles de Seleccion
                        </h4>
                        <div className="grid     grid-cols-2 gap-2">
                          <div className="flex  justify-between">
                            <h5 className="font-bold">Nro De Atención</h5>
                            <span> {correlatives.nro_ate}</span>
                          </div>
                          <div className="flex justify-between">
                            <h5 className="font-bold">Nro De Ambiente</h5>
                            <span> {correlatives.nro_amb}</span>
                          </div>
                          <div className="flex justify-between">
                            <h5 className="font-bold">Nro De Trb</h5>
                            <span> {correlatives.nro_trb}</span>
                          </div>
                        </div>
                      </article>
                      <section className=" mb-2">
                        <Formik
                          validationSchema={validationSchema}
                          onSubmit={onSubmitGroupIncidences}
                          initialValues={{
                            ide_eje: +ide_eje,
                            ide_trb:
                              ambiente && ambiente[0] && ambiente[0].ide_trb,
                            ide_amb,
                            fch_hra: `${currentDateFormated} ${startTime}`,
                            gls_agr: "",
                            ano_eje:
                              ambiente && ambiente[0] && ambiente[0].ano_eje,
                            nro_ate: correlatives && correlatives.nro_ate,
                            nro_trb: correlatives && correlatives.nro_trb,
                            nro_amb: correlatives && correlatives.nro_amb,
                            flg_anu: 0,
                            amb_des: null,
                            flg_cer: 0,
                          }}
                        >
                          <Form className=" flex    items-end   gap-2">
                            <div className=" flex flex-col gap-2">
                              <div className="flex">
                                <label>Observaciones</label>

                                <Field
                                  as={Input}
                                  className=" "
                                  name="gls_agr"
                                />
                              </div>
                              <ErrorMessage
                                name={`gls_agr`}
                                component="div"
                                className="text-red-500 text-sm font-bold"
                              />
                            </div>
                            <Button type="submit">Guardar</Button>
                          </Form>
                        </Formik>
                      </section>
                      <section>
                        <Button onClick={openModal}>Agregar más</Button>
                        {statsIncidences !== undefined && (
                          <NewIncidenceModal
                            endTime={endTime}
                            fch_fin={fch_fin}
                            fch_ini={fch_ini}
                            startTime={startTime}
                            getLastPage={getLastPage}
                            getNexPage={getNexPage}
                            getPreviusPage={getPreviusPage}
                            getStartPage={getStartPage}
                            // getAvailableIncidences={getAllAvailableIncidences}
                            statsIncidences={statsIncidences && statsIncidences}
                            isOpen={isOpenNewModal}
                            onClose={closeModal}
                          />
                        )}
                      </section>
                    </section>

                    <div className=" grid grid-cols-3">
                      <div className="col-span-1  h-[75vh]   overflow-scroll  ">
                        <DataTable
                          columns={ColumnsChecked}
                          data={checkedIncidences}
                        />
                      </div>
                      <div className="col-span-2">
                        <DynamicMap
                          position={selectedCheckedIncidence}
                          detailsIncidences={detailsByCheckedIncidence}
                        />
                      </div>
                    </div>
                    {/* <Button type="submit">Guardar</Button> */}
                  </section>
                </CustomMolal>
              </div>
              {statsIncidences !== undefined && (
                <MapAndTable
                  endTime={endTime}
                  startTime={startTime}
                  fch_ini={fch_ini}
                  fch_fin={fch_fin}
                  // getAllAvailableIncidences={getAllAvailableIncidences}
                  getLastPage={getLastPage}
                  getPreviusPage={getPreviusPage}
                  getStartPage={getStartPage}
                  getNexPage={getNexPage}
                  statsIncidences={statsIncidences && statsIncidences}
                />
              )}
            </section>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default ReportesPage;
