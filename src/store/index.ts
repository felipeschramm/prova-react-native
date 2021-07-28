import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/userSlice";
import gamesReducer from "./Games/gamesSlice";
import cartReducer from './Cart/cartSlice'
import infoCartReducer from "./InfoCart/infoCartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    games: gamesReducer,
    cart: cartReducer,
    infoCart:infoCartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
