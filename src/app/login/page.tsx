"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePublicData } from "@/hooks/usePublicData";
import { useProtectedData } from "@/hooks/useProtectedData";
import LoginForm from "@/components/auth/LoginForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RegisterForm from "@/components/auth/RegisterForm";
export default function LoginPage() {
  const { isAuthenticated, user, logout, initializeAuth } = useAuth();
  const { data: publicData, isLoading: publicLoading } = usePublicData();
  const {
    data: protectedData,
    isLoading: protectedLoading,
    refetch: fetchProtectedData,
    error: protectedError,
  } = useProtectedData();
  useEffect(() => {
    if (isAuthenticated) {
      fetchProtectedData();
    }
  }, [isAuthenticated, fetchProtectedData]);
  useEffect(() => {
    if (isAuthenticated) {
      fetchProtectedData();
    }
  }, [isAuthenticated, fetchProtectedData]);
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Login</h2>
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
}
