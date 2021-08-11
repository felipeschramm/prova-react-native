import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Game {
  index: string;
  numbers: string;
  date: string;
  price: number;
  type: string;
  "max-number": number;
  color: string;
}

let initialState = {
  bets: [] as Game[],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addGame(state, action) {
      try{
      const newBet: Game = action.payload;
      console.log(JSON.stringify(newBet));
      state.bets.push(newBet);
      }catch(err){
        console.log(err)
      }
    },
    removeGame(state, action) {
      const index = action.payload;
      state.bets = state.bets.filter((item: Game) => item.index !== index);
    },
    clear(state) {
      state.bets = [];
    },
  },
});

export const { addGame, removeGame, clear } = cartSlice.actions;
export default cartSlice.reducer;
