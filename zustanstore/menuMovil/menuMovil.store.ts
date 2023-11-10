import { create } from "zustand";
type MenuStore = {
  isOpen: boolean;
  toggleMenu: () => void;
};
export const useMenuStore = create<MenuStore>()((set) => ({
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));
