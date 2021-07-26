import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../Games/gamesSlice";

let initialCart: Game[] = [];

const cart = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    addGame(state, action: PayloadAction<Game>) {
      state.push(action.payload);
    },
    removeGame(state, action: PayloadAction<string>) {
      const index = action.payload;
      return state.filter((item: Game) => item.index !== index);
    },
    clear(state) {
      return (state = initialCart);
    },
  },
});

export const { addGame, removeGame, clear } = cart.actions;
export default cart.reducer;
