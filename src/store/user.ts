import { create } from "zustand";
import type { userData } from "../api/user/user-res";

interface UserState {
  userData:  userData
  setUserData: (data: userData) => void
  removeAllData: () => void
}

const useUserStore = create<UserState>((set) => ({
  userData: {} as userData,
  setUserData: (data: userData) => set((state) => ({ ...state, userData: data })),
  removeAllData: () => set({ userData: {} as userData }),
}));

export default useUserStore;