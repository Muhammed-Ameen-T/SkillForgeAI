/**
 * @fileoverview Typed Redux hooks for use throughout the application.
 * These hooks provide proper TypeScript types for dispatch and selector functions.
 */

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/**
 * Typed version of useDispatch hook.
 * Use this instead of plain `useDispatch` for proper type inference with async thunks.
 * 
 * @returns Typed dispatch function
 * 
 * @example
 * const dispatch = useAppDispatch();
 * dispatch(loginUser({ email: 'user@example.com', password: 'password' }));
 */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

/**
 * Typed version of useSelector hook.
 * Use this instead of plain `useSelector` for proper state type inference.
 * 
 * @returns Typed selector hook
 * 
 * @example
 * const { isAuthenticated, user } = useAppSelector((state) => state.auth);
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
