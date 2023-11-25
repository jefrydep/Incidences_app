import {
  AvailableIncidences,
  DetailsIncidences,
  Item,
} from "@/interface/AvailableIncidences";
import { MetDAT } from "@/interface/TypeIncidents";
import { create } from "zustand";

interface AvailableIncidesStore {
  availableIncidences: Item[];
  selectedIncidence: Item[];
  detailsByIncidence: DetailsIncidences[];
  checkedIncidence: [];
  setAvailableIncidences: (availableIncidences: Item[]) => void;
  setSelectedIncidences: (selectedIncidence: Item[]) => void;
  setDetailsByIncidence: (DetailsIncidences: DetailsIncidences[]) => void;
  toggleSelectedIncidence: (id: number) => void;
}
export const useAvailableIncidencesStore = create<AvailableIncidesStore>()(
  (set) => ({
    availableIncidences: [],
    selectedIncidence: [],
    detailsByIncidence: [],
    checkedIncidence: [],
    setAvailableIncidences: (newAvailablesIncidences) =>
      set({ availableIncidences: newAvailablesIncidences }),
    setSelectedIncidences: (newSelectedIncidences) =>
      set({ selectedIncidence: newSelectedIncidences }),
    setDetailsByIncidence: (newDetailByIncidence) =>
      set({ detailsByIncidence: newDetailByIncidence }),
    toggleSelectedIncidence: (id) =>
      set((state) => {
        const updatedIncidences = state.availableIncidences.map((item) =>
          item.ide_eve === id ? { ...item, isSelected: !item.isSelected } : item
        );

        const checkedIncidence = updatedIncidences.filter(
          (item) => item.isSelected
        );

        return { availableIncidences: updatedIncidences, checkedIncidence };
      }),
  })
);
