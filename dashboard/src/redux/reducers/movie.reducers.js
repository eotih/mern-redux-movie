/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice } from '@reduxjs/toolkit';
import { show, create, update, deleteMovie } from '../actions/movie.actions';

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
    [show.fulfilled]: (state, action) => {
      state.movie = action.payload || [];
    },
    [create.fulfilled]: (state, action) => {
      const { movie, message, status } = action.payload;
      state.movie = [...state.movie, movie];
      state.message = message;
      state.status = status;
    },
    [create.rejected]: (state, action) => {
      const { message, status } = action.payload;
      state.message = message;
      state.status = status;
    },
    [update.fulfilled]: (state, action) => {
      const { message, status } = action.payload;
      state.movie = state.movie.map((movie) =>
        movie._id === action.payload.movie._id ? action.payload.movie : movie
      );
      state.message = message;
      state.status = status;
    },
    [update.rejected]: (state, action) => {
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

export const response = (state) => state.movie;

export default authSlice.reducer;
