import { create } from "zustand";

interface ConfigState {
  useDemoData: boolean;
  apiBaseUrl: string;
  setUseDemoData: (value: boolean) => void;
  toggleDemoData: () => void;
}

const defaultDemoFlag =
  typeof import.meta !== "undefined" && typeof import.meta.env.VITE_USE_DEMO_DATA !== "undefined"
    ? import.meta.env.VITE_USE_DEMO_DATA !== "false"
    : true;

const apiBaseUrl =
  (typeof import.meta !== "undefined" && import.meta.env.VITE_API_BASE_URL) || "http://localhost:8000/api/v1";

export const useConfigStore = create<ConfigState>((set) => ({
  useDemoData: defaultDemoFlag,
  apiBaseUrl,
  setUseDemoData: (value) => set({ useDemoData: value }),
  toggleDemoData: () => set((state) => ({ useDemoData: !state.useDemoData }))
}));
