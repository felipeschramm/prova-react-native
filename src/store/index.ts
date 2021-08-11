import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import cartSlice from "./Cart/cartSlice";
import gamesSlice from "./Games/gamesSlice";
import infoCartSlice from "./InfoCart/infoCartSlice";
import userSlice from "./User/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
  game: gamesSlice,
  info: infoCartSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
