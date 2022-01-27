import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../helpers/axios.helpers';

const USER_SHOW = 'user/show';
const USER_UPDATE = 'user/update';
const USER_DELETE = 'user/delete';

const showUser = createAsyncThunk(USER_SHOW, async (thunkAPI) => {
  try {
    const { data } = await axios.get('/user');
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const updateUser = createAsyncThunk(USER_UPDATE, async (payload, thunkAPI) => {
  try {
    const { data } = await axios.put(`/user/${payload._id}`, payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const deleteUser = createAsyncThunk(USER_DELETE, async (payload, thunkAPI) => {
  try {
    const { data } = await axios.delete(`/user/${payload}`);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export { showUser, updateUser, deleteUser };
