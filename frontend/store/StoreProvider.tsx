/**
 * @fileoverview Redux Provider wrapper component.
 * Provides the Redux store to the React component tree.
 * Updated for Next.js 16 (Client-Side Singleton Pattern).
 */
'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './index';

/**
 * Props for the StoreProvider component.
 */
interface StoreProviderProps {
  /** Child components that will have access to the Redux store */
  children: React.ReactNode;
}

/**
 * Redux Provider wrapper component.
 * Wrap your application root with this component to enable Redux state management.
 * * Uses useRef to ensure the store is created only once per client session
 * but remains isolated during server-side rendering.
 */
export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  // 1. Create a ref to hold the store instance. Initial is null.
  const storeRef = useRef<AppStore | null>(null);

  // 2. Create the store instance ONLY if it doesn't exist yet.
  // This ensures we don't re-create the store on every re-render.
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  // 3. Pass the persistent store instance to the Provider.
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;