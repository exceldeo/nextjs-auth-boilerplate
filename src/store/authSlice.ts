import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getToken, removeToken, setToken } from "@/libs/auth";
import {
  loginUser as loginApi,
  registerUser as registerApi,
  type LoginResponse,
  type RegisterResponse,
} from "@/libs/api";

// Types
export interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = (await loginApi(email, password)) as LoginResponse;
      if (response.success) {
        const { token, user } = response;
        setToken(token);
        return { token, user } as { token: string; user: User };
      }
      return rejectWithValue(response.message || "Login failed");
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "An error occurred during login"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = (await registerApi(
        name,
        email,
        password
      )) as RegisterResponse;
      if (response.success) {
        const { token, user } = response;
        setToken(token);
        return { token, user } as { token: string; user: User };
      }
      return rejectWithValue(response.message || "Registration failed");
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "An error occurred during registration"
      );
    }
  }
);

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (token) {
        // In a real app, validate token and fetch user with the token
        return {
          token,
          user: {
            id: 1,
            email: "user@example.com",
            name: "John Doe",
          } as User,
        };
      }
      return rejectWithValue("No token found");
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Initialization failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      removeToken();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? "Login failed";
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) ?? "Registration failed";
      })
      // Initialize
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        initializeAuth.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addCase(initializeAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
