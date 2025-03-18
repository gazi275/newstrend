import { configureStore } from '@reduxjs/toolkit';
// Adjust the path as needed
import newsReducer from './features/newsSlice'; // Adjust the path to the actual location of newsReducer

const store = configureStore({
    reducer: {
      news: newsReducer,
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  export default store;