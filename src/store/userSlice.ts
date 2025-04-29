import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  email: string;
  username: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: "",
  email: "",
  username: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (
      state,
      action: PayloadAction<{
        id: string;
        email: string;
        username: string | null;
      }>
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.id = "";
      state.email = "";
      state.username = null;
      state.isLoggedIn = false;
    },
  },
});

export const { saveUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
