/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice } from '@reduxjs/toolkit';
import axios from '../../helpers/axios.helpers';

const initialState = {
  message: '',
  status: ''
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login: async (state, action) => {
      const { data } = await axios.post('/auth/login', action.payload);
      state.message = data.message;
      state.status = data.status;
    },
    register: async (state, action) => {
      const { data } = await axios.post('/auth/register', action.payload);
      state.message = data.message;
      state.status = data.status;
    }
  }
});

export const { login, register } = authSlice.actions;

export const response = (state) => state.authentication;

export default authSlice.reducer;
