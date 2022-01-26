import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../helpers/axios.helpers';

const ACTOR_SHOW = 'actor/show';
const ACTOR_CREATE = 'actor/create';
const ACTOR_UPDATE = 'actor/update';
const ACTOR_DELETE = 'actor/delete';

const showActor = createAsyncThunk(ACTOR_SHOW, async (thunkAPI) => {
  try {
    const { data } = await axios.get('/actor');
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const createActor = createAsyncThunk(ACTOR_CREATE, async (payload, thunkAPI) => {
  try {
    const { data } = await axios.post('/actor', payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const updateActor = createAsyncThunk(ACTOR_UPDATE, async (payload, thunkAPI) => {
  try {
    const { data } = await axios.put(`/actor/${payload._id}`, payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const deleteActor = createAsyncThunk(ACTOR_DELETE, async (payload, thunkAPI) => {
  try {
    const { data } = await axios.delete(`/actor/${payload}`);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export { showActor, createActor, updateActor, deleteActor };
