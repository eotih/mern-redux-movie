/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice } from '@reduxjs/toolkit';
import { showActor, createActor, updateActor, deleteActor } from '../actions';

const initialState = {
  actor: [],
  message: '',
  status: ''
};

const authSlice = createSlice({
  name: 'actor',
  initialState,
  reducers: {},
  extraReducers: {
    [showActor.fulfilled]: (state, action) => {
      state.actor = action.payload || [];
    },
    [createActor.fulfilled]: (state, action) => {
      const { actor, message, status } = action.payload;
      state.actor = [...state.actor, actor];
      state.message = message;
      state.status = status;
    },
    [createActor.rejected]: (state, action) => {
      const { message, status } = action.payload;
      state.message = message;
      state.status = status;
    },
    [updateActor.fulfilled]: (state, action) => {
      const { message, status } = action.payload;
      state.actor = state.actor.map((actor) =>
        actor._id === action.payload.actor._id ? action.payload.actor : actor
      );
      state.message = message;
      state.status = status;
    },
    [updateActor.rejected]: (state, action) => {
      const { message, status } = action.payload;
      state.message = message;
      state.status = status;
    },
    [deleteActor.fulfilled]: (state, action) => {
      const { message, status } = action.payload;
      state.actor = state.actor.filter((actor) => actor._id !== action.payload.actor._id);
      state.message = message;
      state.status = status;
    },
    [deleteActor.rejected]: (state, action) => {
      const { message, status } = action.payload;
      state.message = message;
      state.status = status;
    }
  }
});

export const responseActor = (state) => state.actor;

export default authSlice.reducer;
