import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../helpers/axios.helpers';

const AUTHENTICATION_LOGIN = 'authentication/login';

export const login = createAsyncThunk(AUTHENTICATION_LOGIN, async (payload, thunkAPI) => {
  try {
    const { data } = await axios.post('/auth/login', payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
