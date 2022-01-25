import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../helpers/axios.helpers';

const MOVIE_SHOW = 'movie/show';
const MOVIE_CREATE = 'movie/create';
const MOVIE_UPDATE = 'movie/update';
const MOVIE_DELETE = 'movie/delete';

const show = createAsyncThunk(MOVIE_SHOW, async (thunkAPI) => {
  try {
    const { data } = await axios.get('/movie');
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const create = createAsyncThunk(MOVIE_CREATE, async (payload, thunkAPI) => {
  try {
    const { data } = await axios.post('/movie', payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const update = createAsyncThunk(MOVIE_UPDATE, async (payload, thunkAPI) => {
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

export { show, create, update, deleteMovie };
