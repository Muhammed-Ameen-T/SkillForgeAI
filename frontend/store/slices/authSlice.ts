/**
 * @fileoverview Redux slice for managing authentication state.
 * Handles user login, logout, and session management.
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance, { setAuthToken, removeAuthToken } from '@/lib/axios';
import type { User, LoginCredentials, AuthResponse } from '@/types';

/**
 * State shape for the auth slice.
 */
export interface AuthState {
  /** Currently authenticated user */
  user: User | null;
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  /** Loading state for auth operations */
  isLoading: boolean;
  /** Error message from failed auth operations */
  error: string | null;
}

/**
 * Initial state for the auth slice.
 */
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/**
 * Async thunk for user login.
 * Authenticates user and stores the JWT token.
 * 
 * @param credentials - User email and password
 * @returns Authenticated user data
 * @throws Error if authentication fails
 */
export const loginUser = createAsyncThunk<
  User,
  LoginCredentials,
  { rejectValue: string }
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation
      if (credentials.email === 'demo@skillforge.ai' && credentials.password === 'demo123') {
        const mockResponse: AuthResponse = {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: 'user-1',
            email: credentials.email,
            name: 'Demo User',
            avatar: undefined,
            createdAt: new Date().toISOString(),
          },
        };
        
        setAuthToken(mockResponse.token);
        return mockResponse.user;
      }
      
      throw new Error('Invalid email or password');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      return rejectWithValue(message);
    }
  }
);

/**
 * Async thunk for user logout.
 * Clears authentication token and resets state.
 */
export const logoutUser = createAsyncThunk<void, void>(
  'auth/logout',
  async () => {
    removeAuthToken();
  }
);

/**
 * Async thunk to check existing session on app load.
 * Validates stored token and retrieves user data.
 * 
 * @returns User data if session is valid
 */
export const checkSession = createAsyncThunk<
  User | null,
  void,
  { rejectValue: string }
>(
  'auth/checkSession',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('skillforge_auth_token');
      
      if (!token) {
        return null;
      }
      
      // Simulate session validation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock user data (in real app, would validate token with API)
      const mockUser: User = {
        id: 'user-1',
        email: 'demo@skillforge.ai',
        name: 'Demo User',
        createdAt: new Date().toISOString(),
      };
      
      return mockUser;
    } catch (error) {
      removeAuthToken();
      return null;
    }
  }
);

/**
 * Redux slice for authentication state management.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Clears authentication error state.
     */
    clearAuthError: (state) => {
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
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      // Check session
      .addCase(checkSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload;
        }
      })
      .addCase(checkSession.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
