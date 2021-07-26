import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Game {
  index:string,
  numbers: string;
  date: string;
  price: number;
  type: string;
  'max-number': number;
  color: string;
}

let initialGames: Game[] = [];

const games = createSlice({
  name: "games",
  initialState: initialGames,
  reducers: {
    saveGame(state, action: PayloadAction<Game[]>) {
      action.payload.forEach((item) => {
        state.push(item);
      });
    },
  },
});

export const { saveGame } = games.actions;
export default games.reducer;
