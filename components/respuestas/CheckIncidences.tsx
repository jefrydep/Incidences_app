import { MetDAT } from "@/interface/TypeIncidents";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { useIncidenciasStore } from "@/zustanstore";
import { Input } from "../ui/input";
interface CheckInterface {
  row: MetDAT;
  index: number;
}
const CheckIncidences = React.memo(({ row, index }: CheckInterface) => {
  const setIncidences = useIncidenciasStore((state) => state.setIncidencias);
  const updateActIna = useIncidenciasStore((state) => state.updateActIna);

  // const isChecked = row.act_ina === null || row.act_ina === 0 ? false : true;
  const [isChecked, setIsChecked] = useState(
    row.act_ina === null || row.act_ina === 0 ? false : true
  );
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newActInaValue = row.act_ina === 1 ? 0 : 1;
    updateActIna(row.ide_ted, newActInaValue);
  };
  useEffect(() => {
    setIsChecked(row.act_ina === null || row.act_ina === 0 ? false : true);
  }, [row.act_ina]);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </form>
  );
});

export default CheckIncidences;
