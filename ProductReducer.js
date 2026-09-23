import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
  },
  reducers: {
    getProducts: (state, action) => {
      if (!state.product.some((item) => item.id === action.payload.id)) {
        state.product.push({ ...action.payload });
      }
    },
    incrementQty: (state, action) => {
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id,
      );
      if (itemPresent) itemPresent.quantity++;
    },
    decrementQty: (state, action) => {
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id,
      );
      if (itemPresent)
        itemPresent.quantity = Math.max(0, itemPresent.quantity - 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase("cart/cleanCart", (state) => {
      state.product.forEach((item) => {
        item.quantity = 0;
      });
    });
  },
});

export const { getProducts, incrementQty, decrementQty } = productSlice.actions;

export default productSlice.reducer;
