import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import modalReducer from "@/features/Modals/modalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// will contain the ui global state, X remote
