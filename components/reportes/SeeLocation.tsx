"use client";
import React from "react";
import useIncidences from "../hooks/useIncidences";
import useAvailableIncidences from "../hooks/useAvailableIncidences";
import { Button } from "../ui/button";
interface ValuesLocation {
  index: number;
}
const SeeLocation = ({ index }: ValuesLocation) => {
  const { handleLabelClick } = useAvailableIncidences();

  return (
    <Button onClick={() => handleLabelClick(index)}>
      {/* <Button>Ver Contactos */}
    </Button>
  );
};

export default SeeLocation;
