"use client";
import React, { useEffect, useRef } from "react";
import useIncidences from "../hooks/useIncidences";
import useAvailableIncidences from "../hooks/useAvailableIncidences";
import { Button } from "../ui/button";
import { useAvailableIncidencesStore } from "@/zustanstore/availableIncidences/availableIncidense.store";
interface ValuesLocation {
  index: number;
}
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { MapContainer as LeafletMapContainer, useMap } from "react-leaflet";
import { LocateFixedIcon } from "lucide-react";
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
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              onClick={() => HandleSelectedIncidence(index)}
            >
              {/* <Button>Ver Contactos */}
              <LocateFixedIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ver marcador</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default SeeLocation;
