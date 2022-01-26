/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice } from '@reduxjs/toolkit';
import { showMovie, createMovie, updateMovie, deleteMovie } from '../actions/movie.actions';

const initialState = {
  movie: [],
  message: '',
  status: ''
};

const authSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: {
    [showMovie.fulfilled]: (state, action) => {
      state.movie = action.payload || [];
    },
    [createMovie.fulfilled]: (state, action) => {
      const { movie, message, status } = action.payload;
      state.movie = [...state.movie, movie];
      state.message = message;
      state.status = status;
    },
    [createMovie.rejected]: (state, action) => {
      const { message, status } = action.payload;
      state.message = message;
      state.status = status;
    },
    [updateMovie.fulfilled]: (state, action) => {
      const { message, status } = action.payload;
      state.movie = state.movie.map((movie) =>
        movie._id === action.payload.movie._id ? action.payload.movie : movie
      );
      state.message = message;
      state.status = status;
    },
    [updateMovie.rejected]: (state, action) => {
      const { message, status } = action.payload;
      state.message = message;
      state.status = status;
    },
    [deleteMovie.fulfilled]: (state, action) => {
      const { message, status } = action.payload;
      state.movie = state.movie.filter((movie) => movie._id !== action.payload.movie._id);
      state.message = message;
      state.status = status;
    },
    [deleteMovie.rejected]: (state, action) => {
      const { message, status } = action.payload;
      state.message = message;
      state.status = status;
    }
  }
});

export const responseMovie = (state) => state.movie;

export default authSlice.reducer;
