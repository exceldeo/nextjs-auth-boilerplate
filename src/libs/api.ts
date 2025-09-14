import { getToken } from "./auth";

export interface Item {
  id: number;
  name: string;
}
export interface ItemsResponse {
  success: boolean;
  message: string;
  data: { items: Item[] };
}

export interface AuthSuccess<
  User = { id: number; email: string; name: string }
> {
  success: true;
  token: string;
  user: User;
}
export interface AuthFail {
  success: false;
  message: string;
}
export type LoginResponse = AuthSuccess | AuthFail;
export type RegisterResponse = AuthSuccess | AuthFail;

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string> | undefined),
    },
    ...options,
  };

  const response = await fetch(url, config);
  const data = (await response.json()) as T | { message?: string };

  if (!response.ok) {
    const msg =
      (data as { message?: string } | undefined)?.message ||
      "Something went wrong";
    throw new Error(msg);
  }

  return data as T;
}

export async function authenticatedApiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found");
  }
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers as Record<string, string> | undefined),
    },
    ...options,
  };
  return apiRequest<T>(endpoint, config);
}

export const fetchPublicData = () => apiRequest<ItemsResponse>("/public");
export const fetchProtectedData = () =>
  authenticatedApiRequest<ItemsResponse>("/protected");
export const loginUser = (email: string, password: string) =>
  apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
export const registerUser = (name: string, email: string, password: string) =>
  apiRequest<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
export const logoutUser = () =>
  apiRequest<{ success: boolean; message: string }>("/auth/logout", {
    method: "POST",
  });
