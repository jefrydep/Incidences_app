import { create } from "zustand";
import { persist } from "zustand/middleware";
interface ideEjeStore {
  ide_eje: number;
  setIdeEje: (ide_eje: number) => void;
}
export const useIdeEjeStore = create<ideEjeStore>()(
  persist(
    (set) => ({
      ide_eje: 0,
      setIdeEje: (ide_eje) => set({ ide_eje }),
    }),
    { name: "ide_eje-storage" }
  )
);
