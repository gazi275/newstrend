import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface NewsItem {
  title: string;
  description: string;
  image_url: string;
  content: string;
}

interface NewsState {
  news: NewsItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  status: "idle",
  error: null,
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await axios.get<{ results: NewsItem[] }>(
    "https://newsdata.io/api/1/news?apikey=pub_751513a05ec93131197a5ac200044ef1f71a8&language=en"
  );
  console.log(response.data);
  return response.data.results;
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch news";
      });
  },
});

export default newsSlice.reducer;