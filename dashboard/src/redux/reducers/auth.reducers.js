/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice } from '@reduxjs/toolkit';
import { login } from '../actions/auth.actions';

const initialState = {
  message: '',
  status: ''
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem('token');
    }
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const { token, message, status } = action.payload;
      state.message = message;
      state.status = status;
      localStorage.setItem('token', token);
    },
    [login.rejected]: (state, action) => {
      const { message, status } = action.payload;
      state.message = message;
      state.status = status;
    }
  }
});

export const response = (state) => state.authentication;

export default authSlice.reducer;
