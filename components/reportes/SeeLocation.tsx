"use client";
import React, { useEffect, useRef } from "react";
import useIncidences from "../hooks/useIncidences";
import useAvailableIncidences from "../hooks/useAvailableIncidences";
import { Button } from "../ui/button";
import { useAvailableIncidencesStore } from "@/zustanstore/availableIncidences/availableIncidense.store";
interface ValuesLocation {
  index: number;
}

import { MapContainer as LeafletMapContainer, useMap } from "react-leaflet";
const SeeLocation = ({ index }: ValuesLocation) => {
  const availableIncidences = useAvailableIncidencesStore(
    (state) => state.availableIncidences
  );
  const setSelectedIncidence = useAvailableIncidencesStore(
    (state) => state.setSelectedIncidences
  );

  const { getAllDetailIncidents } = useIncidences(1769);
  // const mapRef = useRef<LeafletMapContainer>(null);
  const HandleSelectedIncidence = (index: number) => {
    //
    console.log("hola esd");
    if (availableIncidences && availableIncidences[index]) {
      const selected = availableIncidences[index];
      console.log(selected);
      setSelectedIncidence([selected]);
      getAllDetailIncidents(selected.ide_eve, selected.ide_per);
      // const markerPosition = [selected.lat_eve, selected.lon_eve];
      // mapRef.current.panTo(markerPosition);
    }
  };

  return (
    <Button type="button" onClick={() => HandleSelectedIncidence(index)}>
      {/* <Button>Ver Contactos */}
      Ver marcador
    </Button>
  );
};

export default SeeLocation;
