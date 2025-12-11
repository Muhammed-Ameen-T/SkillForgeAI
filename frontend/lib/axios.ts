/**
 * @fileoverview Axios singleton instance configuration.
 * Provides a pre-configured Axios instance with request/response interceptors
 * for authentication token handling and global error management.
 */

import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiError } from '@/types';

/** LocalStorage key for storing authentication token */
const TOKEN_KEY = 'skillforge_auth_token';

/**
 * Singleton Axios instance configured with base URL and default headers.
 * All HTTP requests in the application should use this instance.
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor that attaches the authentication token to outgoing requests.
 * Retrieves the token from localStorage and adds it to the Authorization header.
 * 
 * @param config - Axios request configuration object
 * @returns Modified configuration with auth header if token exists
 */
const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem(TOKEN_KEY);
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
};

/**
 * Request error handler for interceptor.
 * 
 * @param error - The error that occurred during request setup
 * @returns Rejected promise with the error
 */
const requestErrorHandler = (error: AxiosError): Promise<never> => {
  console.error('[Axios Request Error]:', error.message);
  return Promise.reject(error);
};

/**
 * Response success handler.
 * Passes through successful responses without modification.
 * 
 * @param response - The successful Axios response
 * @returns The response unchanged
 */
const responseSuccessHandler = (response: AxiosResponse): AxiosResponse => {
  return response;
};

/**
 * Response error handler that manages global error scenarios.
 * Handles 401 unauthorized errors by clearing tokens and redirecting to login.
 * 
 * @param error - The Axios error from the response
 * @returns Rejected promise with formatted error
 */
const responseErrorHandler = (error: AxiosError<ApiError>): Promise<never> => {
  const { response } = error;
  
  if (response) {
    const { status, data } = response;
    
    // Handle 401 Unauthorized - Token expired or invalid
    if (status === 401) {
      console.warn('[Auth] Token expired or invalid. Redirecting to login.');
      localStorage.removeItem(TOKEN_KEY);
      
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    // Log error for debugging
    console.error(`[API Error ${status}]:`, data?.message || error.message);
  } else if (error.request) {
    // Request made but no response received (network error)
    console.error('[Network Error]: No response received from server');
  } else {
    // Error in request setup
    console.error('[Request Setup Error]:', error.message);
  }
  
  return Promise.reject(error);
};

// Attach interceptors to the Axios instance
axiosInstance.interceptors.request.use(requestInterceptor, requestErrorHandler);
axiosInstance.interceptors.response.use(responseSuccessHandler, responseErrorHandler);

/**
 * Sets the authentication token in localStorage.
 * 
 * @param token - The JWT token to store
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Removes the authentication token from localStorage.
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Retrieves the current authentication token.
 * 
 * @returns The stored token or null if not present
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Checks if user is currently authenticated (has a token).
 * 
 * @returns True if token exists in localStorage
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export default axiosInstance;
