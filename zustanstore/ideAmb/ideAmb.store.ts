import { create } from "zustand";
import { persist } from "zustand/middleware";
interface ideAmbStore {
  ide_amb: number;
  setIdeAmb: (ide_amb: number) => void;
  nom_amb: string;

  setNomAmb: (nom_amb: string) => void;
}
export const useIdeAmbiente = create<ideAmbStore>()(
  persist(
    (set) => ({
      ide_amb: 0,
      setIdeAmb: (ide_amb) => set({ ide_amb }),
      nom_amb: "",
      setNomAmb: (nom_amb) => set({ nom_amb }),
    }),
    { name: "ide_amb-storage" }
  )
);
