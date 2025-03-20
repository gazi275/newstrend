import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface NewsItem {
  news_id: string;
  title: string;
  content: string;
  image_url?: string;
  link?: string;
  description?: string;
  comments: string[];
  reaction?: string;
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

// 🔹 Fetch News Data
export const fetchNews = createAsyncThunk("news/fetchNews", async (_, { rejectWithValue }) => {
  try {
    const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
    console.log(API_KEY); // ✅ Check Environment Variable
    const API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=bd&language=en`;
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await axios.get<{ results: NewsItem[] }>(API_URL);

    if (!response.data.results) {
      throw new Error("No news data available");
    }

    return (response.data.results || []).map((news) => ({
      ...news,
      news_id: news.news_id || Math.random().toString(36).substr(2, 9), // ✅ Ensure `news_id` exists
      image_url: news.image_url || "https://via.placeholder.com/300",
      comments: news.comments || [],
    }));
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch news");
  }
});

// 🔹 Redux Slice
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<{ newsId: string; comment: string }>) => {
      const { newsId, comment } = action.payload;
      const newsItem = state.news.find((item) => item.news_id === newsId);
      if (newsItem) {
        newsItem.comments.push(comment);
      }
    },
    addReaction: (state, action: PayloadAction<{ newsId: string; reaction: string }>) => {
      const { newsId, reaction } = action.payload;
      const newsItem = state.news.find((item) => item.news_id === newsId);
      if (newsItem) {
        newsItem.reaction = reaction; // Set new reaction
      }
    },
  },
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
        state.error = action.payload as string;
      });
  },
});

export const { addComment, addReaction } = newsSlice.actions;
export default newsSlice.reducer;
