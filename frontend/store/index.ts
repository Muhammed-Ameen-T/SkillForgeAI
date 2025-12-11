/**
 * @fileoverview Redux store configuration for SkillForge AI.
 * Sets up the Redux store with all slices and middleware.
 * Updated for Next.js 16 (Server-Side Safety).
 */

import { configureStore } from '@reduxjs/toolkit';
import roadmapReducer from './slices/roadmapSlice';
import authReducer from './slices/authSlice';

/**
 * Creates a new Redux store instance.
 * REQUIRED for Next.js to prevent state pollution between requests on the server.
 */
export const makeStore = () => {
  return configureStore({
    reducer: {
      roadmap: roadmapReducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types for serialization check
          ignoredActions: ['auth/login/fulfilled'],
        },
      }),
    // Use standard Node environment check
    devTools: process.env.NODE_ENV !== 'production', 
  });
};

/**
 * Type representing the store instance.
 */
export type AppStore = ReturnType<typeof makeStore>;

/**
 * Type representing the complete Redux state tree.
 */
export type RootState = ReturnType<AppStore['getState']>;

/**
 * Type representing the store's dispatch function.
 */
export type AppDispatch = AppStore['dispatch'];