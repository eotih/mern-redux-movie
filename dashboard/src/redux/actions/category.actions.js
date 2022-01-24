import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../helpers/axios.helpers';

const CATEGORY_SHOW = 'category/show';
const CATEGORY_CREATE = 'category/create';
const CATEGORY_UPDATE = 'category/update';
const CATEGORY_DELETE = 'category/delete';

const show = createAsyncThunk(CATEGORY_SHOW, async (thunkAPI) => {
  try {
    const { data } = await axios.get('/category');
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const create = createAsyncThunk(CATEGORY_CREATE, async (payload, thunkAPI) => {
  try {
    const { data } = await axios.post('/category', payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const update = createAsyncThunk(CATEGORY_UPDATE, async (payload, thunkAPI) => {
  try {
    const { data } = await axios.put(`/category/${payload._id}`, payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const deleteCategory = createAsyncThunk(CATEGORY_DELETE, async (payload, thunkAPI) => {
  try {
    const { data } = await axios.delete(`/category/${payload}`);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export { show, create, update, deleteCategory };
