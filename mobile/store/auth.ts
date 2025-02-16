import { create } from 'zustand';

type UserRole = 'patient' | 'doctor' | null;

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  // Additional fields for doctors
  specialization?: string;
  licenseNumber?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  userRole: UserRole;
  userInfo: UserInfo | null;
  setAuthenticated: (value: boolean) => void;
  setUserRole: (role: UserRole) => void;
  setUserInfo: (info: UserInfo) => void;
  updateUserInfo: (info: Partial<UserInfo>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userRole: null,
  userInfo: null,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setUserRole: (role) => set({ userRole: role }),
  setUserInfo: (info) => set({ userInfo: info }),
  updateUserInfo: (info) =>
    set((state) => ({
      userInfo: state.userInfo ? { ...state.userInfo, ...info } : info,
    })),
}));
