import { Ambiente } from "next-auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface ideAmbStore {
  ide_amb: number;
  setIdeAmb: (ide_amb: number) => void;
  // nom_amb: string;
  // setNomAmb: (nom_amb: string) => void;
  ambiente: Ambiente[];
  setAmbiente: (ambiente: Ambiente[]) => void;
}
export const useIdeAmbiente = create<ideAmbStore>()(
  persist(
    (set) => ({
      ide_amb: 0,
      setIdeAmb: (ide_amb) => set({ ide_amb }),
      ambiente: [],
      setAmbiente: (ambiente) => set({ ambiente }),
      // nom_amb: "",
      // setNomAmb: (nom_amb) => set({ nom_amb }),
    }),
    { name: "ide_amb-storage" }
  )
);
