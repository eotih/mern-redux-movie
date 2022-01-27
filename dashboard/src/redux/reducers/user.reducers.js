/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice } from '@reduxjs/toolkit';
import { showUser, updateUser, deleteUser } from '../actions';

const initialState = {
  user: [],
  message: '',
  status: ''
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [showUser.fulfilled]: (state, action) => {
      state.user = action.payload || [];
    },
    [updateUser.fulfilled]: (state, action) => {
      const { message, status } = action.payload;
      state.user = state.user.map((user) =>
        user._id === action.payload.user._id ? action.payload.user : user
      );
      state.message = message;
      state.status = status;
    },
    [updateUser.rejected]: (state, action) => {
      const { message, status } = action.payload;
      state.message = message;
      state.status = status;
    },
    [deleteUser.fulfilled]: (state, action) => {
      const { message, status } = action.payload;
      state.user = state.user.filter((user) => user._id !== action.payload.user._id);
      state.message = message;
      state.status = status;
    },
    [deleteUser.rejected]: (state, action) => {
      const { message, status } = action.payload;
      state.message = message;
      state.status = status;
    }
  }
});

export const responseUser = (state) => state.user;

export default authSlice.reducer;
