import { useAvailableIncidencesStore } from "@/zustanstore/availableIncidences/availableIncidense.store";
import useIncidences from "../hooks/useIncidences";
import { Button } from "../ui/button";
import { getDetailIncidents } from "@/services/incidencias";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LocateFixedIcon } from "lucide-react";

interface ValuesLocation {
  index: number;
}
const SeeLocationChecked = ({ index }: ValuesLocation) => {
  const checkedIncidences = useAvailableIncidencesStore(
    (state) => state.checkedIncidence
  );
  const setSelectedCheckedIncidence = useAvailableIncidencesStore(
    (state) => state.setSelectedCheckedIncidence
  );
  const setDetailsBycheckedIncidence = useAvailableIncidencesStore(
    (state) => state.setDetailsByCheckedIncidences
  );
  const { getAllDetailIncidents } = useIncidences(1769);

  // const mapRef = useRef<LeafletMapContainer>(null);
  const HandleSelectedCheckedIncidence = async (index: number) => {
    //
    console.log("hola");
    if (checkedIncidences && checkedIncidences[index]) {
      const selected = checkedIncidences[index];
      console.log(selected);
      setSelectedCheckedIncidence([selected]);
      //   getAllDetailIncidents(selected.ide_eve, selected.ide_per);
      const { data } = await getDetailIncidents(
        selected.ide_eve,
        selected.ide_per
      );
      console.log(data);
      setDetailsBycheckedIncidence(data);
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
              onClick={() => HandleSelectedCheckedIncidence(index)}
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

export default SeeLocationChecked;
