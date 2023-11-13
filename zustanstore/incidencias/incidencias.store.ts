import { create } from "zustand";

interface incidenciasStore {
  incidencias: [];

  setIncidencias: (incidencias: []) => void;
}
export const useIncidenciasStore = create<incidenciasStore>()((set) => ({
  incidencias: [],
  setIncidencias: () => set((state) => ({ incidencias: state.incidencias })),
}));
