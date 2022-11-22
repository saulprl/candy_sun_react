import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalItems: 0,
  },
  reducers: {
    resetCart: (state) => {
      state.cart = [];
      state.totalItems = 0;
    },
    setCart: (state, action) => {
      state.cart = action.payload.cart;
      state.totalItems = action.payload.totalItems;
    },
    addItem: (state, action) => {
      const existingIndex = state.cart.findIndex(
        (item) => item.prodId === action.payload.prodId
      );
      const existingItem = state.cart[existingIndex];

      if (existingItem) {
        if (existingItem.quantity < action.payload.maxQuantity) {
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          };

          state.cart[existingIndex] = updatedItem;
          state.totalItems += 1;
        }
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
        });
        state.totalItems += 1;
      }
    },
    removeItem: (state, action) => {
      const existingIndex = state.cart.findIndex(
        (p) => p.prodId === action.payload.prodId
      );
      const existingItem = state.cart[existingIndex];

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cart = state.cart.filter(
            (p) => p.prodId !== action.payload.prodId
          );
        } else {
          existingItem.quantity -= 1;
        }

        state.totalItems -= 1;
      }
    },
  },
});

export const { addItem, removeItem, setCart, resetCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectTotalItems = (state) => state.cart.totalItems;

export default cartSlice.reducer;
