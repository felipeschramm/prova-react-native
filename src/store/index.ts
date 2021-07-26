import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/userSlice";
import gamesReducer from "./Games/gamesSlice";
import cartReducer from './Cart/cartSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    games: gamesReducer,
    cart: cartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
