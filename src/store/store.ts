import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from '../inventorySlice/inventorySlice';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer
  }
});

// Tipi per TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;