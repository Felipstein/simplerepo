import { create } from 'zustand';

export interface DebugModeStore {
  enabled: boolean;
  toggleDebugMode(): void;
}

export const useDebugModeStore = create<DebugModeStore>((set) => ({
  enabled: false,

  toggleDebugMode: () => set(({ enabled }) => ({ enabled: !enabled })),
}));
