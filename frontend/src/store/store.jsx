// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Use localForage which works better with modern setups
import localForage from 'localforage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: localForage,
};

const persistedReducer = persistReducer(persistConfig, productReducer);

export const makeStore = (preloadedState) =>
  configureStore({
    reducer: { product: persistedReducer },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

export const store = makeStore();

// Only create persistor in the browser
export const persistor = typeof window !== 'undefined' ? persistStore(store) : null;