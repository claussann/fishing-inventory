import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InventoryItem = {
  item: string;
  size: string;
  type: string;
  photo: string;
  id: number;
};

type InventoryState = {
  items: InventoryItem[];
};

const initialState: InventoryState = {
  items: []
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<InventoryItem>) => {
      state.items.push(action.payload);
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },

    clearItems: (state) => {
      state.items = [];
    }
  }
});

export const { addItem, removeItem, clearItems } = inventorySlice.actions;
export default inventorySlice.reducer;
