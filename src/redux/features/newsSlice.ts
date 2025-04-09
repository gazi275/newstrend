/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const EXPIRY_TIME = 12 * 60 * 60 * 1000; // 12 hours

// Utility functions to store and retrieve data from localStorage
const getStoredData = (key: string) => {
  const data = JSON.parse(localStorage.getItem(key) || "null");
  if (data && Date.now() - data.timestamp < EXPIRY_TIME) {
    return data.items;
  }
  return null;
};

const storeData = (key: string, items: any) => {
  localStorage.setItem(key, JSON.stringify({ items, timestamp: Date.now() }));
};

export interface NewsItem {
  news_id: string;
  title: string;
  content: string;
  image_url?: string;
  link?: string;
  description?: string;
  comments: string[];
  userReaction?: string;
  reactions: { [key: string]: number };
  type: string;
}

interface User {
  id: string;
  username: string;
  email: string;
}

interface NewsState {
  news: NewsItem[];
  internationalNews: NewsItem[];
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  loading: boolean;
  internationalStatus: string;
  internationalError: string | null;
}

const initialState: NewsState = {
  news: getStoredData("localNews") || [],
  internationalNews: getStoredData("internationalNews") || [],
  user: getStoredData("user") || null,
  status: "idle",
  error: null,
  loading: false,
  internationalStatus: "idle",
  internationalError: null,
};

// Fetch local news from your backend
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { rejectWithValue }) => {
    try {
      const storedNews = getStoredData("localNews");
      if (storedNews) return storedNews;

      const response = await axios.get<{ results: any[] }>("https://news-backend-sigma.vercel.app/api/v1/news/bangladesh");
      const newsList = response.data.results || [];

      const formattedNews = newsList.map((news: any) => ({
        news_id: news.article_id || news.link || Math.random().toString(36).substr(2, 9),
        title: news.title,
        content: news.content || "No content available",
        image_url: news.image_url || "https://media.istockphoto.com/id/1693840855/vector/blank-newspaper-front-page-template.jpg?s=2048x2048&w=is&k=20&c=I1U5L8yLW0EKRftclWcMwBSHWbYfN1LmFcefw2-9H7E=",
        link: news.link,
        description: news.description || "No description available",
        comments: [],
        userReaction: undefined,
        reactions: {},
        type: "local",
      }));

      storeData("localNews", formattedNews);
      return formattedNews;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch local news");
    }
  }
);

// Fetch international news from your backend
export const fetchInternationalNews = createAsyncThunk(
  "news/fetchInternationalNews",
  async (_, { rejectWithValue }) => {
    try {
      const storedNews = getStoredData("internationalNews");
      if (storedNews) return storedNews;

      const response = await axios.get("https://news-backend-sigma.vercel.app/api/v1/news/international");
      const formattedNews = (response.data as { articles: any[] }).articles.map((news: any) => ({
        news_id: news.url || Math.random().toString(36).substr(2, 9),
        title: news.title,
        content: news.content || "No content available",
        image_url: news.urlToImage || "https://media.istockphoto.com/id/1693840855/vector/blank-newspaper-front-page-template.jpg?s=2048x2048&w=is&k=20&c=I1U5L8yLW0EKRftclWcMwBSHWbYfN1LmFcefw2-9H7E=",
        link: news.url,
        description: news.description || "No description available",
        comments: [],
        userReaction: undefined,
        reactions: {},
        type: "international",
      }));

      storeData("internationalNews", formattedNews);
      return formattedNews;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch international news");
    }
  }
);

// Login user and handle user authentication
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post<{ data: any; user: User }>(
        "https://news-backend-sigma.vercel.app/api/v1/auth/login",
        credentials
      );
      const user = response.data.data.user;

      storeData("user", user);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to login");
    }
  }
);

// Signup user and handle user registration
export const signupUser = createAsyncThunk(
  "user/signup",
  async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post<{ user: User }>(
        "https://news-backend-sigma.vercel.app/api/v1/auth/signup",
        userData
      );
      storeData("user", response.data.user);
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to signup");
    }
  }
);

// Create a slice for handling news, user login, and sign-up actions
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<{ newsId: string; comment: string; type: string }>) => {
      const newsList = action.payload.type === "local" ? state.news : state.internationalNews;
      const newsItem = newsList.find((news) => news.news_id === action.payload.newsId);
      if (newsItem) {
        newsItem.comments.push(action.payload.comment);
        storeData(`${action.payload.type}News`, newsList);
      }
    },
    addReaction: (state, action: PayloadAction<{ newsId: string; reaction: string; type: string }>) => {
      const newsList = action.payload.type === "local" ? state.news : state.internationalNews;
      const newsItem = newsList.find((news) => news.news_id === action.payload.newsId);
      if (newsItem) {
        if (newsItem.userReaction) {
          newsItem.reactions[newsItem.userReaction] -= 1;
          if (newsItem.reactions[newsItem.userReaction] === 0) {
            delete newsItem.reactions[newsItem.userReaction];
          }
        }
        newsItem.userReaction = action.payload.reaction;
        newsItem.reactions[action.payload.reaction] = (newsItem.reactions[action.payload.reaction] || 0) + 1;
        storeData(`${action.payload.type}News`, newsList);
      }
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
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
      })
      .addCase(fetchInternationalNews.pending, (state) => {
        state.internationalStatus = "loading";
      })
      .addCase(fetchInternationalNews.fulfilled, (state, action) => {
        state.internationalStatus = "succeeded";
        state.internationalNews = action.payload;
      })
      .addCase(fetchInternationalNews.rejected, (state, action) => {
        state.internationalStatus = "failed";
        state.internationalError = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addComment, addReaction, logoutUser } = newsSlice.actions;
export default newsSlice.reducer;
