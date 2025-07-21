import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  email: string;
  username: string | null;
  isLoggedIn: boolean;
  avatarUrl: string | null;
  firstName: string;
  lastName: string;
  bio: string;
}

const initialState: UserState = {
  id: "",
  email: "",
  username: null,
  isLoggedIn: false,
  avatarUrl: null,
  firstName: "",
  lastName: "",
  bio: "",
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
        avatarUrl: string | null;
        firstName: string;
        lastName: string;
        bio: string;
      }>
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.isLoggedIn = true;
      state.avatarUrl = action.payload.avatarUrl;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.bio = action.payload.bio;
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
