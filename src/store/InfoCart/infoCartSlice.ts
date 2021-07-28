import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialCart = {
  totalPrice: 0,
  totalQtt: 0,
};

const infoCart = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    addGameCart(state, action: PayloadAction<number>) {
      state.totalPrice += action.payload;
      state.totalQtt++;
    },
    removeGameCart(state, action: PayloadAction<number>) {
      state.totalQtt--;
      state.totalPrice -= action.payload;
    },
    clearGameCart(state) {
      state.totalQtt = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addGameCart, removeGameCart, clearGameCart } = infoCart.actions;
export default infoCart.reducer;
