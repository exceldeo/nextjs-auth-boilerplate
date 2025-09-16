"use client";

import LoginForm from "@/components/auth/LoginForm";
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}
