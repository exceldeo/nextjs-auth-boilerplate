import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  loginUser,
  registerUser,
  initializeAuth,
  logout,
  clearError,
} from "@/store/authSlice";
import type { RootState } from "@/store/store";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: RootState) => state.auth);

  const handleLogin = (credentials: { email: string; password: string }) => {
    dispatch(loginUser(credentials));
  };

  const handleRegister = (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    dispatch(registerUser(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleInitializeAuth = () => {
    dispatch(initializeAuth());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    ...auth,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    initializeAuth: handleInitializeAuth,
    clearError: handleClearError,
  };
};
