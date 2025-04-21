import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AccountState {
  showValues: boolean;
  toggleShowValues: () => void;
}

export const useAccount = create<AccountState>()(
  persist(
    (set) => ({
      showValues: false,
      toggleShowValues: () =>
        set((state) => ({ showValues: !state.showValues })),
    }),
    {
      name: 'account-storage'
    }
  )
);
