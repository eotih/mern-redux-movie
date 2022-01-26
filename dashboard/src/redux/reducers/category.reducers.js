/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice } from '@reduxjs/toolkit';
import { showCategory, createCategory, updateCategory, deleteCategory } from '../actions';

const initialState = {
  category: [],
  message: '',
  status: ''
};

const authSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: {
    [showCategory.fulfilled]: (state, action) => {
      state.category = action.payload || [];
    },
    [createCategory.fulfilled]: (state, action) => {
      const { category, message, status } = action.payload;
      state.category = [...state.category, category];
      state.message = message;
      state.status = status;
    },
    [createCategory.rejected]: (state, action) => {
      const { message, status } = action.payload;
      state.message = message;
      state.status = status;
    },
    [updateCategory.fulfilled]: (state, action) => {
      const { message, status } = action.payload;
      state.category = state.category.map((category) =>
        category._id === action.payload.category._id ? action.payload.category : category
      );
      state.message = message;
      state.status = status;
    },
    [updateCategory.rejected]: (state, action) => {
      const { message, status } = action.payload;
      state.message = message;
      state.status = status;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      const { message, status } = action.payload;
      state.category = state.category.filter(
        (category) => category._id !== action.payload.category._id
      );
      state.message = message;
      state.status = status;
    },
    [deleteCategory.rejected]: (state, action) => {
      const { message, status } = action.payload;
      state.message = message;
      state.status = status;
    }
  }
});

export const responseCategory = (state) => state.category;

export default authSlice.reducer;
