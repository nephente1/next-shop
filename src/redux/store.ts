'use client';

import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { rootReducer } from './rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

//*** configuration to avoid error: redux-persist failed to create sync storage. falling back to noop storage. ***//
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(value: unknown) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

// create alternative storage:
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();
//*** end ***/

// Configuration redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const defaultMiddlewareConfig = {
  serializableCheck: false,
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(defaultMiddlewareConfig),
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export const persistor = persistStore(store);
