import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  isLoggedIn: boolean;
  userInfo: null;
  token: null;
}

const initialState: UserState = {
  isLoggedIn: false,
  userInfo: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state: UserState, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
    },
    updateUser: (state: UserState, action) => {
      state.userInfo = action.payload.updatedUser;
      console.log(state.userInfo);
    },
    logoutUser: (state: UserState) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.token = null;
    },
  },
});

export const { loginUser, updateUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
