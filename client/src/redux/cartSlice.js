import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      if (state.products.find((p) => p._id === action.payload._id)) {
        state.products = state.products.map((p) =>
          p._id === action.payload._id
            ? { ...p, amount: p.amount + action.payload.amount }
            : p
        );
      } else {
        state.products.push(action.payload);
      }
      state.total = state.products.reduce(
        (sum, p) => sum + p.amount * p.price,
        0
      );
    },
    removeProduct: (state, action) => {
      const product = state.products.find((p) => p._id === action.payload.id);

      if (product) {
        if (product.amount <= action.payload.amount) {
          state.products = state.products.filter(
            (p) => p._id !== action.payload.id
          );
        } else {
          state.products = state.products.map((p) =>
            p._id === action.payload.id
              ? { ...p, amount: p.amount - action.payload.amount }
              : p
          );
        }
      }

      state.total = state.products.reduce(
        (sum, p) => sum + p.amount * p.price,
        0
      );
    },
    clearCart: (state) => {
      state.products = [];
      state.total = 0;
    },
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
