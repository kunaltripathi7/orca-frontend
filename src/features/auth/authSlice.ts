import { UserProfile } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: UserProfile;
}

const initialState: AuthState = {
  user: {
    id: "",
    name: "",
    imageUrl: "",
    email: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    inflate: (state, action: PayloadAction<UserProfile>) => {
      const userObj = action.payload;
      state.user.id = userObj.id;
      state.user.name = userObj.name;
      state.user.imageUrl = userObj.imageUrl;
      state.user.email = userObj.email;
    },
  },
});

export const { inflate } = authSlice.actions;
export default authSlice.reducer;
