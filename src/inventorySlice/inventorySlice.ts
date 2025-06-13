import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InventoryItem = {
  item: string;
  size: string;
  type: string;
  photo: string
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
    clearItems: (state) => {
      state.items = [];
    }
  }
});

export const { addItem, clearItems } = inventorySlice.actions;
export default inventorySlice.reducer;
