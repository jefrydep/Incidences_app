import { TypeAmbientes } from "@/interface/Ambientes";
import { MetDAT } from "@/interface/TypeIncidents";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ambienteStore {
  ambientes: TypeAmbientes[];

  setAmbientes: (ambientes: TypeAmbientes[]) => void;
  updateAmbienteCheck: (id: number, newActInaValue: boolean | number) => void;
}
export const useAmbienteStore = create<ambienteStore>()(
  persist(
    (set) => ({
      ambientes: [],
      setAmbientes: (ambientes) => set({ ambientes: ambientes }),
      updateAmbienteCheck: (id, newActInaValue) =>
        set((state) => ({
          ambientes: state.ambientes.map((ambiente) =>
            ambiente.ide_ted === id
              ? { ...ambiente, act_ina: newActInaValue }
              : ambiente
          ),
        })),
    }),
    { name: "ambiente-storage" }
  )
);
