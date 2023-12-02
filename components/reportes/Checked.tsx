import { useAvailableIncidencesStore } from "@/zustanstore/availableIncidences/availableIncidense.store";
import { Checkbox } from "@/components/ui/checkbox";
interface CheckedValue {
  isSelected: boolean;
  ide_eve: number;
}
const Checked = ({ isSelected, ide_eve }: CheckedValue) => {
  const togleIncidence = useAvailableIncidencesStore(
    (state) => state.toggleSelectedIncidence
  );
  // console.log(values);
  const handleChangeSelectIncidence = (ide_eve: number) => {
    // const selectedIncidence = availableIncidences[index];
    togleIncidence(ide_eve);
    // setAvailableIncidence(newdata);
  };
  return (
    <Checkbox
      className="w-[1.4rem]  h-[1.4rem]"
      // type="checkbox"

      checked={isSelected}
      onCheckedChange={() => handleChangeSelectIncidence(ide_eve)}
    />
  );
};

export default Checked;
