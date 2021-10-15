import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// API fetcher
import axios from "axios";

const initialState = {
  status: null,
  error: null,
  books: [],
  search: null,
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ rejectWithValue }) => {
    try {
      const { data } = await axios.get(process.env.REACT_APP_PUBLIC_DATA_URL);
      return data;
    } catch (err) {
      console.log(err.reponse.data);
      return rejectWithValue("Unable to load books.");
    }
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialState,

  reducers: {
    fetch_books: (state, action) => {
      return {
        ...state,
        books: action.payload,
      };
    },

    search_books: (state, action) => {
      return {
        ...state,
        search: action.payload,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "success";
        state.books = action.payload;
        state.search = "";
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const { fetch_books, search_books } = booksSlice.actions;

export default booksSlice.reducer;
