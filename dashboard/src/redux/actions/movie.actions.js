import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../helpers/axios.helpers';

const MOVIE_SHOW = 'movie/show';
const MOVIE_URL = 'movie/getSlug';
const MOVIE_CREATE = 'movie/create';
const MOVIE_UPDATE = 'movie/update';
const MOVIE_DELETE = 'movie/delete';

const showMovie = createAsyncThunk(MOVIE_SHOW, async (thunkAPI) => {
  try {
    const { data } = await axios.get('/movie');
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
const showUrl = createAsyncThunk(MOVIE_URL, async (payload, thunkAPI) => {
  try {
    const { data } = await axios.get(`/movie/${payload}`);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const createMovie = createAsyncThunk(MOVIE_CREATE, async (payload, thunkAPI) => {
  try {
    const { data } = await axios.post('/movie', payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const updateMovie = createAsyncThunk(MOVIE_UPDATE, async (payload, thunkAPI) => {
  try {
    const { data } = await axios.put(`/movie/${payload._id}`, payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const deleteMovie = createAsyncThunk(MOVIE_DELETE, async (payload, thunkAPI) => {
  try {
    const { data } = await axios.delete(`/movie/${payload}`);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export { showMovie, createMovie, updateMovie, deleteMovie, showUrl };
