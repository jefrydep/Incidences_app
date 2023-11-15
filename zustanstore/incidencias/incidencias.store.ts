import { MetDAT } from "@/interface/TypeIncidents";
import { create } from "zustand";

interface incidenciasStore {
  incidencias: MetDAT[];

  setIncidencias: (incidencias: MetDAT[]) => void;
  updateActIna: (id: number, newActInaValue: boolean | number) => void;
  // setIncidences: (prevIncidences: MetDAT[]) => void;
}
export const useIncidenciasStore = create<incidenciasStore>()((set) => ({
  incidencias: [],
  setIncidencias: (nuevasIncidencias) =>
    set({ incidencias: nuevasIncidencias }),
  updateActIna: (id, newActInaValue) =>
    set((state) => ({
      incidencias: state.incidencias.map((incidence) =>
        incidence.ide_ted === id
          ? { ...incidence, act_ina: newActInaValue }
          : incidence
      ),
    })),
}));
