/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice } from '@reduxjs/toolkit';
import {
  showMovie,
} from '../actions/movie.actions';

const initialState = {
  movie: [],
  message: '',
  status: ''
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: {
    [showMovie.fulfilled]: (state, action) => {
      state.movie = action.payload || [];
    }
  }
});

export const responseMovie = (state) => state.movie;

export default movieSlice.reducer;
