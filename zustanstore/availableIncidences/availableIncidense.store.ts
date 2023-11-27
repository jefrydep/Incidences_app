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
  // checkedINcidences
  checkedIncidence: Item[];
  selectedCheckedIncidence: Item[];
  detailsBycheckedIncidence: DetailsIncidences[];
  setAvailableIncidences: (availableIncidences: Item[]) => void;
  setSelectedIncidences: (selectedIncidence: Item[]) => void;
  setDetailsByIncidence: (DetailsIncidences: DetailsIncidences[]) => void;
  setSelectedCheckedIncidence: (selectedCheckedIncidence: Item[]) => void;
  setDetailsByCheckedIncidences: (
    detailsBycheckedIncidence: DetailsIncidences[]
  ) => void;
  toggleSelectedIncidence: (id: number) => void;
}
export const useAvailableIncidencesStore = create<AvailableIncidesStore>()(
  (set) => ({
    availableIncidences: [],
    selectedIncidence: [],
    detailsByIncidence: [],
    checkedIncidence: [],
    selectedCheckedIncidence: [],
    detailsBycheckedIncidence: [],

    setAvailableIncidences: (newAvailablesIncidences) =>
      set({ availableIncidences: newAvailablesIncidences }),
    setSelectedIncidences: (newSelectedIncidences) =>
      set({ selectedIncidence: newSelectedIncidences }),
    setDetailsByIncidence: (newDetailByIncidence) =>
      set({ detailsByIncidence: newDetailByIncidence }),
    setSelectedCheckedIncidence: (newCheckedSelectedIncidence) =>
      set({ selectedCheckedIncidence: newCheckedSelectedIncidence }),
    setDetailsByCheckedIncidences: (newCheckedByIncidence) =>
      set({ detailsBycheckedIncidence: newCheckedByIncidence }),

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
