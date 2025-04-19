import { create } from 'zustand';

interface AccountState {
  showValues: boolean;
  toggleShowValues: () => void;
}

export const useAccount = create<AccountState>((set) => ({
  showValues: false,
  toggleShowValues: () =>
    set((state) => ({ showValues: !state.showValues })),
}));
