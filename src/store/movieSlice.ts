import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IMovie } from "../models/movie.model";
import { StorageCache } from "../utils/LocalStorage";

interface MovieState {
  movieList: IMovie[];
  bookmarks: IMovie[];
}

// 1 year = 365 days * 24 hours * 60 minutes * 60 seconds * 1000 ms
const ONE_YEAR_TTL = 365 * 24 * 60 * 60 * 1000;
const bookmarkCache = new StorageCache<IMovie[]>("bookmarkedMovies", ONE_YEAR_TTL);



const initialState: MovieState = {
  movieList: [],
  bookmarks: bookmarkCache.get() || [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovieList(state, action: PayloadAction<IMovie[]>) {
      state.movieList = action.payload;
    },
    toggleBookmark: (state, action: PayloadAction<IMovie>) => {
      const exists = state.bookmarks.find(m => m.id === action.payload.id);
      if (exists) {
        state.bookmarks = state.bookmarks.filter(m => m.id !== action.payload.id);
      } else {
        state.bookmarks.push(action.payload);
      }
      // persist after update
      bookmarkCache.set(state.bookmarks);
    },
    deleteBookmark: (state, action: PayloadAction<IMovie>) => {
      state.bookmarks = state.bookmarks.filter(m => m.id !== action.payload.id);
      // persist after update
      bookmarkCache.set(state.bookmarks);
    },
  },
});

export const { setMovieList, toggleBookmark, deleteBookmark } = movieSlice.actions;
export default movieSlice.reducer;
