import { create } from 'zustand';

type practiceModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const usePracticeModal = create<practiceModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
