import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // <<<<<< OVO TREBA

export const store = configureStore({
  reducer: {
    user: userReducer, // <<<<<< OVO TREBA
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
