"use client";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePublicData } from "@/hooks/usePublicData";
import { useProtectedData } from "@/hooks/useProtectedData";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function Home() {
  const { isAuthenticated, user, logout, initializeAuth } = useAuth();
  const { data: publicData, isLoading: publicLoading } = usePublicData();
  const {
    data: protectedData,
    isLoading: protectedLoading,
    refetch: fetchProtectedData,
    error: protectedError,
  } = useProtectedData();
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  const handleFetchProtectedData = () => {
    fetchProtectedData();
  };
  const handleLogout = () => {
    logout();
  };
  const renderPublicContent = () => {
    if (publicLoading) {
      return <p>Loading public data...</p>;
    }
    if (publicData) {
      return (
        <div>
          <p className="text-gray-700 mb-4">{publicData.message}</p>
          <ul className="space-y-2">
            {publicData.data.items.map((item) => (
              <li key={item.id} className="p-2 bg-gray-100 rounded">
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return <p>No public data available</p>;
  };
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">
            Next.js Authentication Boilerplate
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LoginForm />
            <RegisterForm />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              Welcome, {user?.name || user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Public Data Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Public Data</h2>
            {renderPublicContent()}
          </div>
          {/* Protected Data Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Protected Data</h2>
            <button
              onClick={handleFetchProtectedData}
              disabled={protectedLoading}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {protectedLoading ? "Loading..." : "Fetch Protected Data"}
            </button>

            {protectedError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {protectedError.message}
              </div>
            )}

            {protectedData ? (
              <div>
                <p className="text-gray-700 mb-4">{protectedData.message}</p>
                <ul className="space-y-2">
                  {protectedData.data.items.map((item) => (
                    <li key={item.id} className="p-2 bg-gray-100 rounded">
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500">
                Click the button to fetch protected data
              </p>
            )}
          </div>
        </div>
        {/* Example of Protected Route */}
        <div className="mt-8">
          <ProtectedRoute>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">
                Protected Route Content
              </h2>
              <p className="text-gray-700">
                This content is only visible to authenticated users.
              </p>
            </div>
          </ProtectedRoute>
        </div>
      </div>
    </div>
  );
}
