import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./features/newsSlice"; // Redux Slice import

export const store = configureStore({
  reducer: {
    news: newsReducer, // Reducers added here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; // ✅ Default export added
